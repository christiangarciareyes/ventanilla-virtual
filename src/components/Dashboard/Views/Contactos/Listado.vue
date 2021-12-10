<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
      <card v-if="carga">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
          <p class="card-category">Esta bandeja contiene la lista de contactos actuales que tienen acceso a notificaciones acerca de sus expedientes.</p><br>
        </div>
        </div> 
      </template>
      <div class="row m-t-10 fuente">
      <div class="col-md-4">
        <label>Búsqueda Rápida</label>
        <b-input-group>
          <b-form-input class="imp-fue" v-model="filter" placeholder="Escriba texto de búsqueda" />
          <b-btn :disabled="!filter" @click="filter = ''" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh"></i></b-btn>
        </b-input-group><br>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-4">
          <label>Listar Registros</label>
          <b-form-select style="border-radius: 0px;" class="imp-fue" :options="pageOptions" v-model="perPage" />
          <br><br>
      </div>
     </div>
    <label>Listado de Expedientes</label>
    <label class="m-r-10">Listado de Notificaciones enviadas por el TC</label><label style="color: #FF6700">(Total de {{totalRows}} registros)</label>
    <b-table bordered class="m-t-10"
             show-empty
             stacked="lg"
             :items="lists"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered">    
    </b-table>
    <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
      </div>
    </div>
    <label class="m-r-10">Buscador de Contactos Másivo</label><label style="color: #FF6700">(Debes ingresar los expedientes separados por comas ",")</label>
    <textarea id="text" class="form-control fuente"
        style="max-height:100px"
        v-model="expedientes"
        placeholder="Ingresa los expedientes"
        no-resize
        :rows="50"
        :max-rows="100">
    </textarea>
    <button style="width:250px" @click="mostrar()" class="guardar-form-btn pull-right mb-3 mt-3 fuente" type="submit"><i class="fa fa-search mr-1"></i> BUSCAR CONTACTOS</button>
    <b-table bordered class="m-t-10"
             show-empty
             stacked="lg"
             :items="lists2"
             :fields="fields2"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc">    
    </b-table>
    <download-excel 
        style="width:250px; cursor: pointer" 
        class="editar-form-btn pull-right mb-3 fuente" 
        :data="lists2" 
        :fields="json_fields" 
        worksheet="Lista de Contactos" 
        name="Contactos.xls">
        <i class="fa fa-list mr-1"></i> GENERAR EXCEL
    </download-excel>        
  </card>
</div>
</div>
</div>
</div>

</template>

<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

import LTable from 'src/components/UIComponents/Tables/Table'
import Card from 'src/components/UIComponents/Cards/Card'
import datasource from 'vue-resource'
import axios from 'axios'

export default {
  name: 'contactos',
  data () {
    return {
      name: 'contactos',
      texto: 'Lista de contactos', 
      fields: [
        { key: 'cnumExpediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'cnomNombres', label: 'PERSONA', sortable: true },
        { key: 'cnumDni', label: 'N° DE DNI', sortable: true },
        { key: 'ctxtValor', label: 'DATOS DE CONTACTO', sortable: true }
      ],
      fields2: [
        { key: 'cnumExpediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'cnomNombres', label: 'PERSONA', sortable: true },
        { key: 'cnumDni', label: 'N° DE DNI', sortable: true },
        { key: 'ctxtValor', label: 'DATOS DE CONTACTO', sortable: true }
      ],
      tooltip: {
        ver: 'Ver Cuadernillo',
        detalle: 'Ver Detalle',
        resumen: 'Ver Resumen',
        limpiar: 'Limpiar Datos'
      },
      auto: [],
      lists: [],
      lists2: [],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      pageOptions: [10, 25, 50],
      sortBy: null,
      filter: null,
      sortDesc: false,
      carga: false,
      isLoading: false,
      expedientes: '',
      json_fields: {
        "EXPEDIENTE": "cnumExpediente",
        "COLEGIADO": "cdesColegiado",
        "PERSONA": "cnomNombres",
        "DOCUMENTO": "cnumDni",
        "DATOS DE CONTACTO": "ctxtValor",

      },
      json_meta: [
        [
            {
            key: "charset",
            value: "utf-8",
            },
        ],
      ]
    }
  },
  mounted: function () {
    this.cargaView();
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    cargaView(){
      this.viewRegistros();
    },
    viewRegistros(){
      this.cargaRegistros();
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.limpiarParam();
          this.listarContactos(); 
        }else{
          this.errorView();
          this.$router.go(-1);
        }
      },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else if(error.response.status === 403){
          this.errorView();
          this.$router.go(-1);
        }else{
          swal.close();
          this.$store.dispatch("alertaError");
        }
     });
    },
    limpiarParam(){
      this.$store.state.itemNoty = [];
      this.$store.state.adjEscrito = [];
      this.$store.state.contadorFile = 0;
      this.$store.state.sumiEscrito = ''; 
      this.$store.state.conteEscrito = ''; 
      this.$store.state.expEscrito = null;
      this.$store.state.nidEscrito = null;
      this.$store.state.segEscrito = null;
      this.$store.state.newEscrito = null;
      this.$store.state.numServicio = null;
      this.$store.state.idExpParam2 = null;
      this.$store.state.idExpParam3 = null;
      this.$store.state.numExpParam = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.numExpParam2 = null;
      this.$store.state.nomSolicitud = null;
      this.$store.state.partEscrito = null;
      this.$store.state.tipoParte = null;
      this.$store.state.pagTableFormPre = null;
      this.$store.state.pagTableFormNot = null;
      this.$store.state.pagTableFormAut = null;
      this.$store.state.pagTableFormRev = null;
      this.$store.state.pagTableFormAnu = null;
      this.$notify({group: 'auth', clean: true});
      this.$notify({group: 'custom-template2', clean: true});
      this.$notify({group: 'custom-template3', clean: true});
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = this.$store.state.pagTableFormExp
    },
    listarContactos: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/reporteContactos/listContactosGen')
        .then((response) => {
          this.lists = response.data;
          this.carga = true;
          swal.close();
        },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            swal.close();
            this.$store.dispatch("alertaError");
          }
        });
    },
    mostrar(){
        if(this.expedientes !== "" && this.expedientes !== null){
            this.lists2 = [];
            var list1 = this.expedientes.replace(/ /g, "");
            var list2 = list1.split(',');
            for (var i = 0; i < list2.length; i++) { 
                const resultado = this.lists.filter( contacto => contacto.cnumExpediente === list2[i] );
                for (var f = 0; f < resultado.length; f++) { 
                    this.lists2.push(resultado[f]);
                }
            }
            this.expedientes = '';
        }
    },
    cargaRegistros(){
      swal({
        title: "Cargando registros",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
    },
    errorView(){
      swal({
        title: "Advertencia de permisos",
        text: "Ud. no tiene permisos para esta opción",
        buttons: [false, false],
        icon: "warning",
        timer: '3000',
      });
    }
  },
  components: {
     LTable,
     Card,
     Loading
  }
}
</script>