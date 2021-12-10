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
          <p class="card-category">Esta bandeja contiene la lista de solicitudes atendidas por colegiado de la institución.</p><br>
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
    <label>Listado de Solicitudes Atendidas</label>
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
    <template slot="numero" slot-scope="data">
      {{data.item.cnumSolicitud}}
    </template>
    <template slot="solicitante" slot-scope="data">
      {{data.item.cnomNombres + ' '+ data.item.capePat + ' ' + data.item.capeMat}}
      <div style="margin-top: 5px">
        <label>Expedientes:</label><br>
        <div class="subcontent">
          {{data.item.nroExpedientes}}
        </div>
      </div>
    </template>
    <template slot="dni" slot-scope="data">
      {{data.item.cnumDni}}
    </template>
    <template slot="correo" slot-scope="data">
      {{data.item.ctxtCorreo}}
    </template>
    <template slot="celular" slot-scope="data">
      {{data.item.cnumCelular}}
    </template>
    <template slot="fecha" slot-scope="data">
      {{data.item.dfecCreacion}}
    </template>
   <template slot="ver" slot-scope="data"> 
      <router-link :to="{path: '/presentados/detPresentado'}">
        <button @click="setItemSolicitud(data.item.cnumSolicitud, data.item.nidSolicitud, data.item.cnumDni)" type="button" class="btn-primary-circle btn btn-md" v-tooltip.top-center="tooltip.detalle" ><i class="fa fa-external-link p-t-5 p-r-2"></i></button>
      </router-link>
   </template>
    </b-table>
    <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
      </div>
    </div>
    <!--<div class="container-form-btn">
     <button align="center" @click="showModal()" style="width: 250px; font-size: 13px" class="alertTuto2-form-btn fuente m-t-30 m-b-20"><i class="fa fa-video-camera m-r-8"></i> VER VIDEO TUTORIAL</button>
    </div>-->
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
  name: 'atendidas',
  data () {
    return {
      name: 'atendidas',
      texto: 'Bandeja de Solicitudes Atendidas', 
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'numero', label: 'NÚMERO', sortable: true },
        { key: 'solicitante', label: 'SOLICITANTE', sortable: true },
        { key: 'dni', label: 'DNI', sortable: true },
        { key: 'correo', label: 'CORREO', sortable: true },
        { key: 'celular', label: 'CELULAR', sortable: true },
        { key: 'fecha', label: 'FECHA DE INGRESO' },
        { key: 'ver', label: 'VER' }
      ],
      tooltip: {
        detalle: 'Ver Detalle'
      },
      modalInfo: { title: '', content: '' },
      auto: [],
      lists: [],
      perPage: 5,
      currentPage: 1,
      totalRows: length,
      pageOptions: [5, 10, 20],
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
      this.viewExpediente();
    },
    viewExpediente(){
      this.cargaRegistros();
      this.mosAlert = this.$store.state.alerts;
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.limpiarParam();
          this.atendidas(); 
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
      this.$store.state.idExpParam = null;
      this.$store.state.idExpParam2 = null;
      this.$store.state.idExpParam3 = null;
      this.$store.state.numExpParam = null;
      this.$store.state.numExpParam2 = null;
      this.$store.state.numServicio = null;
      this.$store.state.nomSolicitud = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.partEscrito = null;
      this.$store.state.tipoParte = null;
      this.$store.state.pagTableFormPre = null;
      this.$store.state.pagTableFormNot = null;
      this.$store.state.pagTableFormExp = null;
      this.$store.state.pagTableFormRev = null;
      this.$store.state.pagTableFormAnu = null;
      this.$notify({group: 'auth', clean: true});
      this.$notify({group: 'custom-template2', clean: true});
      this.$notify({group: 'custom-template3', clean: true});
      this.$notify({group: 'custom-template4', clean: true});
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = this.$store.state.pagTableFormExp
    },
    atendidas: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/solicitud/atendidas',
        {
          nflgEstado: '1',
          cnumDni: this.$session.get('dni')
        }).then((response) => {
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
    setItemSolicitud(numSolicitud, itemSolicitud, dniSolicitud) { 
     this.$store.commit('setNumSolicitud', numSolicitud); 
     this.$store.commit('setNidSolicitud', itemSolicitud);
     this.$store.commit('setDniSolicitud', dniSolicitud);
     this.$store.commit('setPagTableFormPre', this.currentPage);
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
    showModal () {
      this.$modal.show('tuto');
    },
    hideModal () {
      this.$modal.hide('tuto');
    }
  },
  components: {
     LTable,
     Card,
     Loading
  }
}
</script>