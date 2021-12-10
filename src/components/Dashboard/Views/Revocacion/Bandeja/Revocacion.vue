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
        <p class="card-category fuente">En esta bandeja podrás revocar el acceso a las pérsonas que consideres pertinente.</p><br>
      </div>
      </div> 
      </template>
      <div class="row fuente m-t-10 mb-2">
      <div class="col-md-4">
       <label>Seleccione N° de Expediente</label>
        <select class="form-control imp-fue mb-3" v-on:change="validPerson()" v-model="exp">
        <option :value="selectExped" disabled>-- Seleccione expediente --</option>
        <option v-for="expedientes in options" v-bind:value="expedientes">
          {{ expedientes.cnumExpediente }}
        </option> 
        </select>
      </div>
     </div> 
    <transition name="fade" mode="out-in">  
    <div class="m-t-10" v-if="show">
    <label>Lista de personas autorizadas al expediente por la parte</label>
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
             @filtered="onFiltered">
    <template slot="item" slot-scope="data">
      {{data.item.item}}
    </template>
    <template slot="numSolicitud" slot-scope="data">
      {{data.item.cnumSolicitud}}
    </template>   
    <template slot="txtExpediente" slot-scope="data">
      {{data.item.cnumExpediente}}
    </template> 
    <template slot="dfecCreacion" slot-scope="data">
      {{data.item.dfecCreacion}}
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
    <template slot="ver" slot-scope="data"> 
      <router-link :to="{ path: '/cuadernillo'}">
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
        <h5 class="alert-heading regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>REVOCA AQUÍ A LAS PERSONAS QUE YA NO TENDRÁN ACCESO A TUS EXPEDIENTES!</h5>
        <p class="fuente2 regEstilo5 m-t-20" align="justify">
          Recuerda usar esta bandeja para revocar aquellas personas que ya no tendrán acceso a tus expedientes. Si tienes inconveniente para hacerlo puedes ver nuestro video tutorial que te hemos preparado.
        </p>
      <!--<button @click="showModal()" style="width:250px; font-size: 13px" class="alertTuto-form-btn fuente m-t-30 m-b-20"><i class="fa fa-video-camera m-r-8"></i> VER VIDEO TUTORIAL</button>-->
    </card>
    </div>
   </div>
  </div>
  </transition>
  <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
    <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/9UucrqMAEN8?rel=0" allowfullscreen></b-embed>
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
  name: 'revocacion',
  data () {
    return {
      name: 'revocacion',
      texto: 'Revocación de solicitudes', 
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
      selectExped: {
        nidExpediente: null,
        cnumExpediente: null,
        ctxtTipoParte: null
      },
      exp: {
        nidExpediente: null,
        cnumExpediente: null,
        ctxtTipoParte: null
      },
      auto: [],
      lists: [],
      options: [],
      validate: [],
      resultData: [],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      pageOptions: [ 10, 25, 50 ],
      sortBy: null,
      filter: null,
      selected: null,
      sortDesc: false,
      show: false,
      alert: false,
      servicio: 3,
      carga: false
    }
  },
  mounted: function () { 
    this.viewRevocacion(); 
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
      this.viewRevocacion();
    },
    viewRevocacion(){
      if(this.$store.state.numExpParam2 == null){
        this.cargaRegistros();
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
      this.$store.state.idExpParam2 = null;
      this.$store.state.numExpParam = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.nomSolicitud = null;
      this.$store.state.partEscrito = null;
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
      this.currentPage = this.$store.state.pagTableFormRev
    },
    oculAlert(){
      this.alert = false;
    },
    verExped(){
      if(this.$store.state.idExpParam3 != null && 
        this.$store.state.numExpParam2 != null && 
        this.$store.state.tipoParte){
        this.exp.ctxtTipoParte = this.$store.state.tipoParte;
        this.exp.cnumExpediente = this.$store.state.numExpParam2;
        this.exp.nidExpediente = this.$store.state.idExpParam3;
        this.expedPerson();
        this.validPerson();
      }else{
        this.expedPerson();
      }
    },
    expedPerson: function(){   
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/expediente/*/cbo')
      .then((response) => {
        this.options = response.data; 
        this.carga = true;
        this.alert = true;
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
    validPerson: function(){
      swal({
        title: "Cargando solicitudes",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/validar/exp',
      {
        cnumExpediente: this.exp.cnumExpediente,
        nidExpediente: this.exp.nidExpediente,
        cnomUsuario: this.$session.get('user'),
        cnumIp: this.$session.get('ip'),
        cnomCiudad: this.$session.get('city'),
        cnomPais: this.$session.get('country'),
      }
      ).then((response) => {
        this.validate = response.data;
        if (this.validate.codRpta == 1) {
          this.solicitudData();
          swal.close();
        }else if (this.validate.codRpta == 0){
          this.$store.dispatch("denegadoNotification");
          this.show = false;
          swal.close();
        }else if (this.validate.codRpta == 2){
          this.$store.dispatch("errorDataNotification");
          this.show = false;
          swal.close();
        }else{} 
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
    solicitudData(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/revocacion/listAcceso',
      {
        cnumExpediente: this.exp.cnumExpediente,
        nidExpediente: this.exp.nidExpediente,
        cnomUsuario: this.$session.get('user'),
        cnumIp: this.$session.get('ip'),
        cnomCiudad: this.$session.get('city'),
        cnomPais: this.$session.get('country'),
      }
      ).then((response) => {
        this.lists = response.data;
        this.alert = false;
        this.show = true;
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
    setIdExp (vidExp, vidNum, vidParte) {  
      this.$store.state.tipoParte = this.exp.ctxtTipoParte;
      this.$store.commit('newValue3', vidExp);
      this.$store.commit('newValueExp2', vidNum);
      this.$store.commit('newServicio', this.servicio);
      this.$store.commit('setPagTableFormRev', this.currentPage);
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
        axios.post(this.$store.state.serverOfi + '/revocacion',
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
            this.validPerson();
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
     Card
  }
}
</script>
<style lang="scss">
</style>