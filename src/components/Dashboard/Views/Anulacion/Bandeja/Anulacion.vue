<template>
  <div class="content">
  <div class="container-fluid">
   <div class="row">
    <div class="col-12">
      <card v-if="carga">
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
          <p class="card-category fuente">Esta bandeja contiene todos los expedientes que ya han sido asignados a los usuarios.</p><br>
        </div>
        </div> 
        </template>
      <div class="row m-t-10 fuente">
      <div class="col-md-4">
          <label>Búsqueda por N° de Expediente</label>
          <b-input-group class="mb-4">
             <the-mask class="form-control imp-fue" mask="#####-####-AA" v-model="filter" placeholder="Ejem: 01015-2018-AA"/>
             <b-btn :disabled="!filter" @click="soliExped()" v-tooltip.top-center="tooltip.buscar"><i class="fa fa-search"></i></b-btn>
          </b-input-group>
      </div>
     </div>
    <transition name="fade" mode="out-in">    
    <div v-if="show">
    <label>Lista de personas autorizadas al expediente</label>
    <b-table bordered class="mt-3"
             show-empty
             stacked="lg"
             :items="lists"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
             v-if="show">
    <template slot="item" slot-scope="data">
      {{data.item.item}}
    </template>  
    <template slot="numSolicitud" slot-scope="data">
      {{data.item.cnumSolicitud}}
    </template>   
    <template slot="txtExpediente" slot-scope="data">
      {{data.item.cnumExpediente}}
    </template>  
    <template slot="txtDni" slot-scope="data">
      {{data.item.cnumDni}}
    </template>   
    <template slot="txtPersona" slot-scope="data">
      {{data.item.cnomPersona}}
    </template>
    <template slot="txtParte" slot-scope="data">
      {{data.item.ctxtParte}}
    </template>
    <template slot="dfecCreacion" slot-scope="data">
      {{data.item.dfecCreacion}}
    </template>
    <template slot="ver" slot-scope="data"> 
      <router-link :to="{ path: 'cuadernillo'}">
        <button @click="setIdExp(data.item.nidExpediente, data.item.cnumExpediente)" type="button" class="btn-info-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-folder-open-o p-r-3"></i></button>
      </router-link>
    </template>
   <template slot="acciones" slot-scope="data"> 
    <b-form-select style="border-radius: 0px" v-model="data.item.nidMotivoAnulacion" class="m-t-10" v-on:change="updateRevoca(data.item)">
      <option :value="null" disabled>-- Seleccione --</option>
      <option v-for="mot in data.item.listaMotivo" v-bind:key="mot.nidMotivoAutorizacion" v-bind:value="mot.nidMotivoAutorizacion">
        {{ mot.ctxtValor }}
      </option> 
    </b-form-select> 
   </template>
   </b-table>
   </div>
   </transition>
    <div class="row" v-if="show">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
      </div>
    </div>
  </card>
  <transition name="fade" mode="out-in">
  <div v-if="alert" class="row m-t-15">
  <div class="col-md-2"></div>
  <div class="col-md-8">
    <div class="container-form-btn">  
    <card class="regEstilo7">
      <i style="color: #fff;" class="fa fa-times m-t-1 pull-right" @click="oculAlert()"></i>
      <h5 class="alert-heading regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>REVOCA AQUÍ A LAS PERSONAS QUE YA NO TENDRÁN ACCESO A LOS EXPEDIENTES!</h5>
      <p class="fuente2 regEstilo5" align="justify">
        Recuerda usar esta bandeja para revocar aquellas personas que ya no tendrán acceso a los expedientes. Si tienes inconveniente para hacerlo puedes ver nuestro video tutorial que te hemos preparado.
      </p>
      <!--<button @click="showModal()" style="width:250px; font-size: 13px" class="alertTuto-form-btn fuente m-t-30 m-b-20"><i class="fa fa-video-camera m-r-8"></i> VER VIDEO TUTORIAL</button>-->
    </card>
  </div>
  </div>
  </div>
  </transition>
  <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
    <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/PkOye4_wKlo?rel=0" allowfullscreen></b-embed>
  </modal>
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
  name: 'anulacion',
  data () {
    return {
      name: 'anulacion',
      texto: 'Revocación de Expedientes Asignados', 
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'numSolicitud', label: 'N° Solicitud', sortable: true },
        { key: 'txtExpediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'dfecCreacion', label: 'FECHA DE CREACIÓN', sortable: true },
        { key: 'txtDni', label: 'DNI', sortable: true },
        { key: 'txtPersona', label: 'NOMBRES', sortable: true },
        { key: 'txtParte', label: 'PARTE', sortable: true },
        { key: 'ver', label: 'VER', sortable: true },
        { key: 'acciones', label: 'ACCIONES', sortable: true }
      ],
      tooltip: {
        detalle: 'Ver Detalle',
        ver: 'Ver Cuadernillo',
        buscar: 'Buscar Expediente'
      },
      modalInfo: { title: '', content: '' },
      auto: [],
      lists: [],
      resultData: [],
      pageOptions: [ 10, 25, 50 ],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      sortBy: null,
      filter: null,
      sortDesc: false,
      selected: null,
      show: false,
      alert: false,
      servicio: 2,
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
      this.viewAnulacion();
    },
    viewAnulacion(){
      if(this.$store.state.numExpParam == null){
        this.verVista();
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
        .then((response) => {
          this.auto = response.data;
          if(this.auto.codError == 1){
            this.limpiarParam();
            this.verExped(); 
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
      }else{
        this.limpiarParam();
        this.verExped(); 
      }
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
      this.$store.state.numServicio = null;
      this.$store.state.idExpParam3 = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.numExpParam2 = null;
      this.$store.state.nomSolicitud = null;
      this.$store.state.partEscrito = null;
      this.$store.state.tipoParte = null;
      this.$store.state.pagTableFormPre = null;
      this.$store.state.pagTableFormNot = null;
      this.$store.state.pagTableFormAut = null;
      this.$store.state.pagTableFormExp = null;
      this.$store.state.pagTableFormRev = null;
      this.$notify({group: 'auth', clean: true});
      this.$notify({group: 'custom-template2', clean: true});
      this.$notify({group: 'custom-template3', clean: true});
      this.$notify({group: 'custom-template4', clean: true});
    },
    verExped(){
      if(this.$store.state.numExpParam != null){
        this.filter = this.$store.state.numExpParam;
        var exped6 = this.filter.substring(0, 5);
        var exped3 = this.filter.substring(6, 10);
        var exped1 = this.filter.substring(11, 13);
        this.filter = exped6 + exped3 + exped1;
        this.soliExped();
        this.carga = true;
        this.alert = true;
      }else{
        this.carga = true;
        this.alert = true;
        swal.close(); 
      }
    },
    oculAlert(){
      this.alert = false;
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
      this.currentPage = this.$store.state.pagTableFormAnu
    },
    soliExped: function(){
      this.cargaSolicitudes();
      var exped5 = this.filter.substring(0, 5);
      var exped4 = this.filter.substring(5, 9);
      var exped2 = this.filter.substring(9, 12);
      this.filter = exped5 + "-" + exped4 + "-" + exped2;
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/revocacion/list',
        {
          cnumExpediente: this.filter,
          cnomUsuario: this.$session.get('user'),
          cnumIp: this.$session.get('ip'),
          cnomCiudad: this.$session.get('city'),
          cnomPais: this.$session.get('country'),
        }
        ).then((response) => {
          this.alert = false;
          this.show = true;
          this.lists = response.data;
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
    setIdExp (vidExp, vidNum) {  
      this.$store.commit('newValue2', vidExp);
      this.$store.commit('newValueExp', vidNum);
      this.$store.commit('newServicio', this.servicio);
      this.$store.commit('setPagTableFormAnu', this.currentPage);
    },
    updateRevoca(vitem){
      swal({
        title: "¿Desea revocar el expediente?",
        text: "El expediente se revocará de la solicitud",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/revocacion/update',
        {
          param: vitem,
          cnomUsuario: this.$session.get('user'),
          cnumIp: this.$session.get('ip'),
          cnomCiudad: this.$session.get('city'),
          cnomPais: this.$session.get('country'),
        }
        ).then((response) => {
          this.resultData = response.data;
          if (this.resultData.codRpta == 1) {
            this.$notify({
              group: 'auth',
              title: 'VENTANILLA JURISDICCIONAL',
              text: 'Expediente revocado correctamente!',
              type: 'success',
            });
            var exped6 = this.filter.substring(0, 5);
            var exped3 = this.filter.substring(6, 10);
            var exped1 = this.filter.substring(11, 13);
            this.filter = exped6 + exped3 + exped1;
            this.soliExped();
          }else{
            this.$notify({
              group: 'auth',
              title: 'VENTANILLA JURISDICCIONAL',
              text: 'Error, expediente no revocado!',
              type: 'error',
            });
          }
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
        }else {}
      });
    },
   verVista(){
      swal({
        title: "Verificando datos",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
    },
    cargaSolicitudes(){
      swal({
        title: "Cargando Solicitudes",
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
     Card
  }
}
</script>
<style lang="scss">
</style>