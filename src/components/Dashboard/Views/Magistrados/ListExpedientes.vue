<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
      <card>
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
          <p class="card-category">Realiza la búsqueda de cualquier expediente y consulta su cuadernillo digita.</p><br>
        </div>
        </div> 
      </template>
      <div class="row m-t-10 fuente">
      <div class="col-md-4">
        <label>Ingrese el N° de Expediente</label>
        <the-mask class="form-control imp-fue" mask="#####" v-model="expediente" placeholder="#####"/><br>
      </div>
      <div class="col-md-4">
      	<label>Ingrese el Año del Expediente</label>
        <the-mask class="form-control imp-fue" mask="####" v-model="periodo" placeholder="####"/><br>
      </div>
      <div class="col-md-4">
        <label>Ingrese el Tipo de Proceso</label>
	    <b-form-select style="border-radius: 0px;" class="form-control imp-fue mb-3" v-model="proceso" :options="options" /><br>
      </div>
     </div>
      <div class="container-form-btn m-t-10">
        <button v-on:click="expedPerson" style="width: 250px" class="guardar-form-btn m-r-10 m-l-10 mb-3 fuente"><i class="fa fa-search m-r-5" aria-hidden="true"></i> BUSCAR EXPEDIENTE</button>
      </div>
      <div v-if="carga">
      <div class="row m-t-30 fuente">
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
    <template slot="cdesTipoProceso" slot-scope="data">
      {{data.item.cdesTipoProceso}}
    </template>
    <template slot="ctxtProcedencia" slot-scope="data">
      {{data.item.ctxtProcedencia}}
    </template>
    <template slot="dfecIngreso" slot-scope="data">
      <div style="width:100px;">
      {{data.item.dfecIngreso}}
      </div>
    </template>
    <template slot="ver" slot-scope="row"> 
      <router-link :to="{ path: '/cuadernillo'}">
        <button @click="setIdExp(row.item.nidExpediente, row.item.cnumExpediente)" type="button" class="btn-info-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-folder-open-o p-r-4"></i></button>
      </router-link>
    </template>
    </b-table>
    <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
      </div>
    </div>
    </div>
  </card>
</div>
</div>
</div>
</div>

</template>

<script>

import LTable from 'src/components/UIComponents/Tables/Table'
import Card from 'src/components/UIComponents/Cards/Card'
import datasource from 'vue-resource'
import axios from 'axios'

export default {
  name: 'listExpedientes',
  data () {
    return {
      name: 'listExpedientes',
      texto: 'Bandeja de expedientes', 
      fields: [
        { key: 'cnumExpediente', label: 'NÚMERO', sortable: true },
        { key: 'ctxtDemandante', label: 'DEMANDANTE', sortable: true },
        { key: 'ctxtDemandado', label: 'DEMANDADO', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'cdesTipoProceso', label: 'PROCESO', sortable: true },
        { key: 'ctxtProcedencia', label: 'PROCEDENCIA', sortable: true },
        { key: 'dfecIngreso', label: 'FEC. INGRESO', sortable: true },
        { key: 'ver', label: 'VER' }
      ],
      options: [
        { value: 'AMPARO', text: 'ACCIÓN DE AMPARO' },
        { value: 'CUMPLIMIENTO', text: 'ACCIÓN DE CUMPLIMIENTO' },
        { value: 'INCONSTITUCIONALIDAD', text: 'ACCIÓN DE INCONSTITUCIONALIDAD' },
        { value: 'COMPETENCIA', text: 'CONFLICTO DE COMPETENCIA' },
        { value: 'CORPUS', text: 'HÁBEAS CORPUS' },
        { value: 'DATA', text: 'HÁBEAS DATA' },
        { value: 'QUEJA', text: 'QUEJA' },
      ],
      tooltip: {
        ver: 'Ver Cuadernillo',
        limpiar: 'Limpiar Datos'
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
      servicio: 5,
      carga: false,
      proceso: 'AMPARO',
      expediente: '',
      periodo: '',
      param: '',
      proceso2: ''
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
          this.validCarga();
          swal.close();
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
      this.$notify({group: 'custom-template4', clean: true});
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = this.$store.state.pagTableFormExp
    },
    expedPerson: function(){
    	if(this.expediente != '' && this.periodo != ''){
        this.cargaRegistros();
        this.validarExpediente();
    		this.validarProceso();
    		this.param = this.expediente + "-" + this.periodo + "-" + this.proceso2;
	        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
	        axios.get(this.$store.state.serverOfi + '/expediente/lista/' + this.param)
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
      }else if(this.expediente == '' && this.periodo != ''){
          this.cargaRegistros();
          this.param = this.periodo;
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.get(this.$store.state.serverOfi + '/expediente/lista2/' +  this.param + '/' + this.proceso)
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
	    }else if(this.expediente != '' && this.periodo == ''){
          this.cargaRegistros();
          this.validarExpediente();
          this.param = this.expediente;
	        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
	        axios.get(this.$store.state.serverOfi + '/expediente/lista3/' +  this.param + '/' + this.proceso)
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
	    }else if(this.expediente == '' && this.periodo == ''){
          this.cargaRegistros();
          this.param = this.proceso;
	        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
	        axios.get(this.$store.state.serverOfi + '/expediente/lista4/' + this.proceso)
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
    	}else{
	       this.$store.dispatch("incorrecNotification");
    	}
      this.$store.state.expedMag = this.expediente 
      this.$store.state.perioMag = this.periodo
      this.$store.state.proceMag = this.proceso
    },
    setIdExp (vidExp, vidNum) {  
      this.$store.commit('newValue5', vidExp);
      this.$store.commit('newValueExp4', vidNum);
      this.$store.commit('newServicio', this.servicio);
      this.$store.commit('setPagTableFormExp', this.currentPage);
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
    validarProceso(){
    	if(this.proceso == 'AMPARO'){
          this.proceso2 = 'AA'
    	}else if(this.proceso == 'CUMPLIMIENTO'){
          this.proceso2 = 'AC'
    	}else if(this.proceso == 'INCONSTITUCIONALIDAD'){
          this.proceso2 = 'AI'
    	}else if(this.proceso == 'COMPETENCIA'){
          this.proceso2 = 'CC'
    	}else if(this.proceso == 'CORPUS'){
          this.proceso2 = 'HC'
    	}else if(this.proceso == 'DATA'){
          this.proceso2 = 'HD'
    	}else if(this.proceso == 'QUEJA'){
          this.proceso2 = 'Q'
    	}
    },
    validarExpediente(){
      if(this.expediente.length == 4){
         this.expediente = '0' + this.expediente
      }else if(this.expediente.length == 3){
         this.expediente = '00' + this.expediente
      }else if(this.expediente.length == 2){
         this.expediente = '000' + this.expediente
      }else if(this.expediente.length == 1){
         this.expediente = '0000' + this.expediente
      }else{}
    },
    validCarga(){
      if(this.$store.state.contaMag == 1){
         this.expediente = this.$store.state.expedMag
         this.periodo = this.$store.state.perioMag
         this.proceso = this.$store.state.proceMag
         this.expedPerson();
      }else{}
    }
  },
  components: {
     LTable,
     Card
  }
}
</script>
