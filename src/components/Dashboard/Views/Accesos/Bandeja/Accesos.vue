<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      <card v-if="carga">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
          <p class="card-category fuente">Esta bandeja contiene un historial de tus últimas 50 operaciones que hayas realizado en el sistema.</p><br>
        </div>
        </div> 
      </template>
       <div class="row m-t-10">
       <div class="col-md-12">
       <vue-tabs>
        <v-tab title="CONSULTA DE REGISTROS">
          <div class="row m-t-30">
           <div class="col-md-12">
            <label>Listado de las últimas consultas realizadas</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listConsul"
                     :fields="fieldConsul"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     @filtered="onFiltered">    
            <template slot="item" slot-scope="data">
              {{data.item.item}}
            </template>
            <template slot="cnumExpediente" slot-scope="data">
              {{data.item.cnumExpediente}}
            </template>
            <template slot="ctxtAccion" slot-scope="data">
              {{data.item.ctxtAccion}}
            </template>
            <template slot="ctxtObservacion" slot-scope="data">
              {{data.item.ctxtObservacion}}
            </template>
            <template slot="ctxtError" slot-scope="data">
              {{data.item.ctxtError}}
            </template>
            <template slot="dfecCreacion" slot-scope="data">
              {{data.item.dfecCreacion}}
            </template>
            <template slot="cnumIp" slot-scope="data">
              {{data.item.cnumIp}}
            </template>
            <template slot="cnomCiudad" slot-scope="data">
              {{data.item.cnomCiudad}}
            </template>
            <template slot="cnomPais" slot-scope="data">
              {{data.item.cnomPais}}
            </template>
            </b-table>
            <div class="row">
              <div class="col-md-12 mb-3">
                <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
              </div>
            </div>
           </div>
         </div>
        </v-tab>
        <v-tab title="ACCESOS AL SISTEMA">
         <div class="row m-t-30">
           <div class="col-md-12">
            <label>Listado de los últimos accesos al sistema</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listAcce"
                     :fields="fieldAcce"
                     :current-page="currentPage2"
                     :per-page="perPage2"
                     :filter="filter2"
                     :sort-by.sync="sortBy2"
                     :sort-desc.sync="sortDesc2"
                     @filtered="onFiltered2">    
            <template slot="item" slot-scope="data">
              {{data.item.item}}
            </template>
            <template slot="ctxtAccion" slot-scope="data">
              {{data.item.ctxtAccion}}
            </template>
            <template slot="ctxtObservacion" slot-scope="data">
              {{data.item.ctxtObservacion}}
            </template>
            <template slot="ctxtError" slot-scope="data">
              {{data.item.ctxtError}}
            </template>
            <template slot="dfecCreacion" slot-scope="data">
              {{data.item.dfecCreacion}}
            </template>
            <template slot="cnumIp" slot-scope="data">
              {{data.item.cnumIp}}
            </template>
            <template slot="cnomCiudad" slot-scope="data">
              {{data.item.cnomCiudad}}
            </template>
            <template slot="cnomPais" slot-scope="data">
              {{data.item.cnomPais}}
            </template>
            </b-table>
            <div class="row">
              <div class="col-md-12 mb-3">
                <br><br><b-pagination :total-rows="totalRows2" :per-page="perPage2" v-model="currentPage2" class="my-0 pull-right" />
              </div>
            </div>
           </div>
         </div> 
        </v-tab>
        <v-tab title="CAMBIOS DE CLAVE">
         <div class="row">
           <div class="col-md-12">
          <div class="row m-t-30">
           <div class="col-md-12">
            <label>Listado de los últimos cambios de contraseña</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listPass"
                     :fields="fieldPass"
                     :current-page="currentPage3"
                     :per-page="perPage3"
                     :filter="filter3"
                     :sort-by.sync="sortBy3"
                     :sort-desc.sync="sortDesc3"
                     @filtered="onFiltered3">    
            <template slot="item" slot-scope="data">
              {{data.item.item}}
            </template>
            <template slot="ctxtAccion" slot-scope="data">
              {{data.item.ctxtAccion}}
            </template>
            <template slot="ctxtObservacion" slot-scope="data">
              {{data.item.ctxtObservacion}}
            </template>
            <template slot="ctxtError" slot-scope="data">
              {{data.item.ctxtError}}
            </template>
            <template slot="dfecCreacion" slot-scope="data">
              {{data.item.dfecCreacion}}
            </template>
            <template slot="cnumIp" slot-scope="data">
              {{data.item.cnumIp}}
            </template>
            <template slot="cnomCiudad" slot-scope="data">
              {{data.item.cnomCiudad}}
            </template>
            <template slot="cnomPais" slot-scope="data">
              {{data.item.cnomPais}}
            </template>
            </b-table>
            <div class="row">
              <div class="col-md-12 mb-3">
                <br><br><b-pagination :total-rows="totalRows3" :per-page="perPage3" v-model="currentPage3" class="my-0 pull-right" />
              </div>
            </div>
           </div>
         </div>
        </div>
        </div> 
      </v-tab>
      </vue-tabs>
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

import LTable from 'src/components/UIComponents/Tables/Table'
import Card from 'src/components/UIComponents/Cards/Card'
import datasource from 'vue-resource'
import axios from 'axios'

export default {
  name: 'accesos',
  data () {
    return {
      name: 'accesos',
      texto: 'Control de accesos y consultas', 
      fieldAcce: [
        { key: 'item', label: 'ITEM', sortable: true },       
        { key: 'ctxtAccion', label: 'ACCIÓN', sortable: true },
        { key: 'ctxtObservacion', label: 'OBSERVACIÓN', sortable: true },
        { key: 'ctxtError', label: 'ESTADO', sortable: true },
        { key: 'dfecCreacion', label: 'FEC. CONSULTA', sortable: true },
        { key: 'cnumIp', label: 'DIRECCIÓN IP', sortable: true },
        { key: 'cnomCiudad', label: 'CIUDAD', sortable: true },
        { key: 'cnomPais', label: 'PAÍS', sortable: true }
      ],
      fieldConsul: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'cnumExpediente', label: 'EXPEDIENTE', sortable: true },        
        { key: 'ctxtAccion', label: 'ACCIÓN', sortable: true },
        { key: 'ctxtObservacion', label: 'OBSERVACIÓN', sortable: true },
        { key: 'ctxtError', label: 'ESTADO', sortable: true },
        { key: 'dfecCreacion', label: 'FEC. CONSULTA', sortable: true },
        { key: 'cnumIp', label: 'DIRECCIÓN IP', sortable: true },
        { key: 'cnomCiudad', label: 'CIUDAD', sortable: true },
        { key: 'cnomPais', label: 'PAÍS', sortable: true }
      ],
      fieldPass: [
        { key: 'item', label: 'ITEM', sortable: true },      
        { key: 'ctxtAccion', label: 'ACCIÓN', sortable: true },
        { key: 'ctxtObservacion', label: 'OBSERVACIÓN', sortable: true },
        { key: 'ctxtError', label: 'ESTADO', sortable: true },
        { key: 'dfecCreacion', label: 'FEC. CONSULTA', sortable: true },
        { key: 'cnumIp', label: 'DIRECCIÓN IP', sortable: true },
        { key: 'cnomCiudad', label: 'CIUDAD', sortable: true },
        { key: 'cnomPais', label: 'PAÍS', sortable: true }
      ],
      auto: [],
      listConsul: [],
      listAcce: [],
      listPass: [],
      currentPage: 1,
      perPage: 10,
      totalRows: length,
      pageOptions: [10, 25, 50],
      sortBy: null,
      sortDesc: false,
      filter: null,
      currentPage2: 1,
      perPage2: 10,
      totalRows2: length,
      pageOptions2: [10, 25, 50],
      sortBy2: null,
      sortDesc2: false,
      filter2: null,
      currentPage3: 1,
      perPage3: 10,
      totalRows3: length,
      pageOptions3: [10, 25, 50],
      sortBy3: null,
      sortDesc3: false,
      filter3: null,
      carga: false
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
      this.viewControl();
    },
    viewControl(){
      this.cargaRegistros();
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.cargaData();
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
      this.$store.state.pagTableFormAut = null;
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
      this.currentPage = 1
    },
    onFiltered2 (filteredItems) {
      this.totalRows2 = filteredItems.length
      this.currentPage2 = 1
    },
    onFiltered3 (filteredItems) {
      this.totalRows3 = filteredItems.length
      this.currentPage3 = 1
    },
    cargaData (){
      this.limpiarParam();
      this.consulPerson();
      this.accesoPerson();
      this.securPerson();
    },
    consulPerson: function(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/acciones/list')
       .then((response) => {
          this.listConsul = response.data;
          this.carga = true;
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
    accesoPerson: function(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverCas + '/operaciones/acciones/listacceso', 
      {
        'ctxtSiglaApp': 'OFIV'
      }
      ).then((response) => {
        this.listAcce = response.data;
        this.carga = true;
        swal.close();  
       },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorCargaAcceso();
        }
       });
    },
    securPerson: function(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverCas + '/operaciones/acciones/listpass', 
      {
        'ctxtSiglaApp': 'OFIV'
      }
      ).then((response) => {
        this.listPass = response.data;
        this.carga = true;
        swal.close();  
      },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorCargaPass();
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
    errorCargaConsul(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de datos de consultas!',
        type: 'error',
      });
    },
    errorCargaAcceso(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de datos de accesos!',
        type: 'error',
      });
    },
    errorCargaPass(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de datos de seguridad!',
        type: 'error',
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
     Card
  }
}
</script>
