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
          <p class="card-category">Esta bandeja contiene la lista de expedientes en los que se encuentra apersonado ante el Tribunal Constitucional.</p><br>
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
    <template slot="cnumExpediente" slot-scope="data">
      <div style="width:100px;">
      {{data.item.cnumExpediente}}
      </div>
    </template>
    <template slot="ctxtDemandante" slot-scope="data">
      {{data.item.ctxtDemandante}}
    </template>
    <template slot="ctxtDemandado" slot-scope="data">
      {{data.item.ctxtDemandado}}
    </template>
    <template slot="cdesColegiado" slot-scope="data">
      {{data.item.cdesColegiado}}
    </template>
    <template slot="dfecIngreso" slot-scope="data">
      <div style="width:100px;">
      {{data.item.dfecIngreso}}
      </div>
    </template>
   <template slot="detalle" slot-scope="row"> 
      <router-link :to="{path: '/expedientes/detExpediente'}">
        <button @click="setIdExp(row.item.nidExpediente)" type="button" class="btn-primary-circle btn btn-md" v-tooltip.top-center="tooltip.detalle" ><i class="fa fa-envelope-open-o p-r-5"></i></button>
      </router-link>
   </template>
   <template slot="resumen" slot-scope="row">
      <router-link :to="{ path: '/expedientes/resExpediente'}">
        <button @click="setIdExp(row.item.nidExpediente)" type="button" class="btn-danger-circle btn btn-xs" v-tooltip.top-center="tooltip.resumen" ><i class="fa fa-file-pdf-o p-r-3"></i></button>
      </router-link>
   </template>
   <template slot="ver" slot-scope="row"> 
      <router-link :to="{ path: '/cuadernillo'}">
        <button @click="setIdExp(row.item.nidExpediente)" type="button" class="btn-info-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-folder-open-o p-r-4"></i></button>
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
  name: 'expedientes',
  data () {
    return {
      name: 'expedientes',
      texto: 'Bandeja de expedientes', 
      fields: [
        { key: 'cnumExpediente', label: 'NÚMERO', sortable: true },
        { key: 'ctxtDemandante', label: 'DEMANDANTE', sortable: true },
        { key: 'ctxtDemandado', label: 'DEMANDADO', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'dfecIngreso', label: 'FEC. INGRESO', sortable: true },
        { key: 'detalle', label: 'DETALLE' },
        { key: 'resumen', label: 'RESUMEN' },
        { key: 'ver', label: 'VER' }
      ],
      tooltip: {
        ver: 'Ver Cuadernillo',
        detalle: 'Ver Detalle',
        resumen: 'Ver Resumen',
        limpiar: 'Limpiar Datos'
      },
      modalInfo: { title: '', content: '' },
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
    },
    info (item, index, button) {
      this.modalInfo.title = 'Datos del Registro'
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = this.$store.state.pagTableFormExp
    },
    expedPerson: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/expediente/*')
        .then((response) => {
          if(this.mosAlert == 1){
            this.$store.dispatch("datosExpediente");
          }
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
    setIdExp (vidExp, numServicio) {  
      this.$store.commit('newValue', vidExp);
      this.$store.commit('newServicio', this.servicio);
      this.$store.commit('setPagTableFormExp', this.currentPage);
    },
    cargaRegistros(){
      //this.isLoading = true; 
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
