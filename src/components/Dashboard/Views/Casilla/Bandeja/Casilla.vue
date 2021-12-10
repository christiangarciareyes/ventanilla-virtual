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
          <p class="card-category fuente">Esta bandeja contiene todas las notificaciones relacionadas a sus expedientes y/o actos procesales.</p><br>
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
          <b-form-select style="border-radius: 0px" class="imp-fue" :options="pageOptions" v-model="perPage" /><br><br>
      </div>
     </div>
    <label class="m-r-10">Listado de Notificaciones enviadas por el TC</label><label style="color: #FF6700">{{noty}}</label>
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
      <div style="width:100px">
        {{data.item.item}}
      </div>
    </template>
    <template slot="expediente" slot-scope="data">
      <div class="mb-2">
        {{data.item.expediente}}
        <i v-if="data.item.leido === '0' && data.item.adjunto === '1'" style="color: #A31915" v-tooltip.top-center="tooltip.firma" class="fa fa-bell p-l-10"></i>
        <i v-if="data.item.adjunto === '0'" style="color: #F1C40F" v-tooltip.top-center="tooltip.firma2" class="fa fa-bell p-l-10"></i>
      </div>
    </template>
    <template slot="adjuntos" slot-scope="data">
      <div v-if="data.item.adjunto === '0'" >
        Sin archivo adjunto
      </div>
      <div v-if="data.item.adjunto === '1'" >
        Con archivo adjunto
      </div>
    </template>
    <template slot="fechaEnvio" slot-scope="data">
      {{data.item.fecha}}
    </template>
    <template slot="fechaLectura" slot-scope="data">
      {{data.item.fecLeido}}
    </template>
   <template slot="notificacion" slot-scope="data">
      <div v-if="data.item.adjunto === '0'" >
        {{filtrarData(data.item.ruta) + " - (Revisa tu correo para visualizar la notificación)"}}
      </div>
      <div v-if="data.item.adjunto === '1'" >
        <router-link :to="{ path: '/casilla/detCasilla'}">
          <button @click="setDataItem(data.item)" type="button" class="btn-primary-circle btn btn-md" v-tooltip.top-center="tooltip.solicitud" ><i class="fa fa-envelope-open-o p-r-3"></i></button>
        </router-link>
      </div>
   </template>
   </b-table>
    <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
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
  name: 'casilla',
  data () {
    return {
      name: 'casilla',
      texto: 'Casilla Electrónica de Notificaciones', 
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'expediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'adjuntos', label: 'ADJUNTOS', sortable: true },
        { key: 'fechaEnvio', label: 'FECHA DE ENVÍO', sortable: true },
        { key: 'fechaLectura', label: 'FECHA DE LECTURA', sortable: true },
        { key: 'notificacion', label: 'NOTIFICACIÓN', sortable: true }
      ],
      tooltip: {
        solicitud: 'Ver Notificación',
        limpiar: 'Limpiar Datos',
        firma: 'Notificación con adjunto',
        firma2: 'Notificación sin adjunto'
      },
      modalInfo: { title: '', content: '' },
      auto: [],
      lists: [],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      pageOptions: [ 10, 25, 50 ],
      sortBy: null,
      filter: null,
      sortDesc: false,
      idPersona: 0,
      carga: false,
      listaNoty: [],
      contNoty: '',
      noty: ''
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
    filtrarData(ruta){
      var rutax = ruta.replace("Cuadernillo/", "");
      return rutax;
    },
    obtenerNoty: function() {
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/casilla/count')
      .then(response => {
        this.listaNoty = response.data;
        this.contNoty = this.listaNoty.txtInfo;
        if(this.contNoty == 1){
          this.noty = '(Usted tiene ' + this.contNoty + ' notificación sin leer)';
        }else if(this.contNoty > 1){
          this.noty = '(Usted tiene ' + this.contNoty + ' notificaciones sin leer)';
        }else{
          this.noty = '';
        }
      });
    },
    cargaView(){
      this.obtenerNoty();
      this.viewCasilla();
    },
    viewCasilla(){
      this.cargaRegistros();
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.idPersona = this.$session.get('idPersona');
          this.limpiarParam();
          this.soliPerson(); 
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
      this.$store.state.nidSolicitud = null;
      this.$store.state.partEscrito = null;
      this.$store.state.tipoParte = null;
      this.$store.state.dniSolicitante = null;
      this.$store.state.pagTableFormPre = null;
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
      this.currentPage = this.$store.state.pagTableFormNot
    },
    soliPerson: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/casilla',
        ).then((response) => {
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
    setDataItem(item) {  
     this.$store.commit('setitemNoty', item);
     this.$store.commit('setPagTableFormNot', this.currentPage);
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
