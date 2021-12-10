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
          <p class="card-category">Esta bandeja contiene la lista de escritos que han sido ingresados al Tribunal Constitucional por este medio.</p><br>
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
    <label>Listado de Escritos</label>
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
    <template slot="item" slot-scope="data">
      {{data.item.item}}
    </template>
    <template slot="cnumDni" slot-scope="data">
      {{data.item.cnumDni}}
    </template>
    <template slot="presentadoPor" slot-scope="data">
      {{data.item.presentadoPor}}
    </template>
    <template slot="expediente" slot-scope="data">
      {{data.item.expediente}}
    </template>
    <template slot="parte" slot-scope="data">
      {{data.item.parte}}
    </template>
    <template slot="tipoSolicitud" slot-scope="data">
      {{data.item.tipoSolicitud}}
    </template>
    <template slot="fecha" slot-scope="data">
      {{data.item.fecha}}
    </template>
   <template slot="ver" slot-scope="row"> 
      <router-link :to="{ path: '/listEscritos/resumenEscrito'}">
        <button @click="setNombreSolicitud(row.item.cnomArchivo, row.item.codigo)" type="button" class="btn-danger-circle btn btn-xs" v-tooltip.top-center="tooltip.solicitud" ><i class="fa fa-file-pdf-o p-r-3"></i></button>
      </router-link>
   </template>
    </b-table>
    <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
      </div>
    </div>
    <div class="container-form-btn">
     <button align="center" @click="reporte()" style="width: 250px; font-size: 13px" class="alertTuto2-form-btn fuente m-t-30 m-b-20"><i class="fa fa-file-pdf-o m-r-8"></i>DESCARGAR PDF</button>
    </div>
  </card>
</div>
</div>
</div>
  <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
      <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/PkOye4_wKlo?rel=0" allowfullscreen></b-embed>
  </modal>
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
  name: 'listEscritos',
  data () {
    return {
      name: 'listEscritos',
      texto: 'Bandeja de escritos', 
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'cnumDni', label: 'DNI', sortable: true },
        { key: 'presentadoPor', label: 'PRESENTADO POR', sortable: true },
        { key: 'expediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'parte', label: 'PARTE', sortable: true },
        { key: 'tipoSolicitud', label: 'TIPO SOLICITUD', sortable: true },
        { key: 'fecha', label: 'FECHA', sortable: true },
        { key: 'ver', label: 'VER' }
      ],
      tooltip: {
        ver: 'Ver Cuadernillo',
      },
      auto: [],
      lists: [],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      pageOptions: [10, 25, 50],
      sortBy: null,
      filter: null,
      sortDesc: false,
      servicio: 1,
      carga: false,
      mosAlert: null,
      isLoading: false
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
      this.viewEscritos();
    },
    viewEscritos(){
      this.cargaRegistros();
      this.mosAlert = this.$store.state.alerts;
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.limpiarParam();
          this.expedPerson(); 
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
    expedPerson: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/escritos/presentadosadm')
        .then((response) => {
          this.lists = response.data;
          this.carga = true;
          this.$store.state.alerts = 1; 
          //this.isLoading = false 
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
    },
    errorReporte(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe completar los datos solicitados!',
        type: 'error',
      });
    },
    reporte(){
      swal({
        title: "Descargando reporte",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios({
        url: this.$store.state.serverOfi + '/escritospresentadosPDF?flgDescarga=' + 1,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', 'Reporte.pdf');
         document.body.appendChild(link);
         link.click();
         swal.close();
      },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorCargaConsul();
        }
      });
     },
    setNombreSolicitud(nombreSolicitud, itemSolicitud) {  
     this.$store.commit('setNomSolicitud', nombreSolicitud);
     this.$store.commit('setNidSolicitud', itemSolicitud);
     this.$store.commit('setPagTableFormPre', this.currentPage);
    },
  },
  components: {
     LTable,
     Card,
     Loading
  }
}
</script>
