<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row" v-if="solicitudes">
    <div class="col-12">
      <card v-if="carga">
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
          <p class="card-category fuente">Esta bandeja contiene todas las solicitudes pendientes de autorización. El sistema notifica esta acción por correo electrónico al solicitante.</p><br>
        </div>
        </div> 
        </template>
      <div class="row m-t-10 fuente">
      <div class="col-md-4">
          <label>Búsqueda por DNI</label>
          <b-input-group class="mb-4">
          <the-mask class="form-control imp-fue" mask="########" v-model="filter" placeholder="Ingrese N° de DNI"/>
          <b-btn :disabled="!filter" @click="filter = ''" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh"></i></b-btn>
          </b-input-group>
      </div>
     </div>
    <div><label>Lista de solicitudes pendientes a atender</label></div>
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
      <i v-if="data.item.ctxtTipoEnvio === 'D'" style="color: #A31915" v-tooltip.top-center="tooltip.firma" class="fa fa-bookmark p-l-10"></i>
    </template>
    <template slot="dfecCreacion" slot-scope="data">
      {{data.item.dfecCreacion}}
    </template>    
    <template slot="txtDni" slot-scope="data">
      {{data.item.cnumDni}}
    </template>
    <template slot="txtSolicitante" slot-scope="data">
      {{data.item.capePat + " " + data.item.capeMat + " " + data.item.cnomNombres}}
      <div style="margin-top: 5px">
        <label>Expedientes:</label><br>
        <div class="subcontent">
          {{data.item.nroExpedientes}}
        </div>
      </div>
    </template>
    <template slot="txtCorreo" slot-scope="data">
      {{data.item.ctxtCorreo}}
    </template>
    <template slot="txtCelular" slot-scope="data">
      {{data.item.cnumCelular}}
    </template>
   <template slot="detalle" slot-scope="row"> 
      <router-link :to="{path: '/autorizacion/detSolicitud'}">
        <button @click="setDatosSolicitud(row.item)" type="button" class="btn-primary-circle btn btn-md" v-tooltip.top-center="tooltip.detalle" ><i class="fa fa-envelope-open-o p-r-5"></i></button>
      </router-link>
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
  <div class="row">
  <div class="col-md-12">
   <card v-if="report">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">EMITIR REPORTE</h5>
          <p class="card-category fuente">Completa la información para descargar.</p><br>
        </div>
        </div> 
      </template>
      <div class="row m-t-20">
       <div class="col-md-4"> 
          <label>Fecha Inicial</label>
          <b-form-input class="imp-fue" type="date" v-model="fechaIni" /><br>
          <label>Fecha Final</label>
          <b-form-input class="imp-fue" type="date" v-model="fechaFin" /><br>
        </div>
        <div class="col-md-4"> 
        <label>Estado</label>
        <b-form-group>
          <b-form-checkbox-group stacked style="margin-left: -30px; text-indent: 20px" class="m-t-10" id="checkboxes1" name="flavour1" v-model="estado" :options="listEstado"></b-form-checkbox-group>
        </b-form-group>
        </div>
        <div class="col-md-4"> 
        <label>Colegiados</label>
        <b-form-group>
          <b-form-checkbox-group stacked style="margin-left: -30px; text-indent: 20px" class="m-t-10" id="checkboxes2" name="flavour2" v-model="tipo" :options="listTipo"></b-form-checkbox-group>
        </b-form-group><br>
        </div>
      </div>
      <div class="container-form-btn">
        <button style="width:250px" @click="reporte()" class="guardar-form-btn mb-3 mt-3 fuente" type="submit"><i class="fa fa-cloud-download mr-1"></i> DESCARGAR PDF</button>
      </div>
   </card>
  </div>
  </div>
    <div class="container-form-btn">
     <button align="center" @click="showReporte()" style="width: 250px; font-size: 13px" class="alertTuto2-form-btn fuente m-t-10 m-b-20"><i class="fa fa-file-pdf-o m-r-8"></i>{{myReporte}}</button>
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
  name: 'autorizacion',
  data () {
    return {
      name: 'autorizacion',
      texto: 'Autorización de solicitudes', 
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'numSolicitud', label: 'N° SOLICITUD', sortable: true },
        { key: 'dfecCreacion', label: 'FECHA DE CREACIÓN', sortable: true },
        { key: 'txtDni', label: 'DNI', sortable: true },
        { key: 'txtSolicitante', label: 'SOLICITANTE', sortable: true },
        { key: 'txtCorreo', label: 'CORREO', sortable: true },
        { key: 'txtCelular', label: 'CELULAR', sortable: true },
        { key: 'detalle', label: 'DETALLE' }
      ],
      tooltip: {
        detalle: 'Ver Detalle',
        limpiar: 'Limpiar Datos',
        firma: 'Firmado Digitalmente'
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
      report: false,
      myReporte: 'ACTIVAR REPORTE',
      listTipo: [
        { value: '1', text: 'SALA 1' },
        { value: '2', text: 'SALA 2' },
        { value: '3', text: 'PLENO' },
      ],
      listEstado: [
        { value: '0', text: 'PENDIENTES' },
        { value: '1', text: 'ATENDIDOS' },
        { value: '2', text: 'TODOS' },
      ],
      fechaIni: '',
      fechaFin: '',
      tipo: ["1"],
      estado: '2',
      reportePDF: '',
      solicitudes: true
    }
  },
  mounted: function () {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    if(dd<10) {dd='0'+ dd} 
    if(mm<10) {mm='0'+ mm} 
    this.fechaFin = yyyy +'-'+ mm +'-'+ dd;
    var fecha = hoy.setDate(hoy.getDate() - 7) 
    var antes = new Date(fecha)
    var da = antes.getDate();
    var ma = antes.getMonth() + 1;
    var yyya = antes.getFullYear();
    if(da<10) {da='0'+ da} 
    if(ma<10) {ma='0'+ ma} 
    this.fechaIni = yyya +'-'+ ma +'-'+ da;
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
      this.viewAutorizacion();
    },
    viewAutorizacion(){
      this.cargaRegistros();
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
      this.currentPage = this.$store.state.pagTableFormAut
    },
    expedPerson: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/solicitud/porautorizar',
        {
          nflgEstado: '0',
          cnumDni: '0'
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
    setDatosSolicitud (lists) {  
      this.$store.commit('setIdSolicitud', lists.nidSolicitud);
      this.$store.commit('setDniSolicitud', lists.cnumDni);
      this.$store.commit('setNombreSolicitud', lists.capePat + " " + lists.capeMat + " " + lists.cnomNombres);
      this.$store.commit('setPagTableFormAut', this.currentPage);
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
    showReporte() {
      if(this.report == true){
        this.lista = 'col-md-12';
        this.report = false;
        this.solicitudes = true;
        this.myReporte = 'ACTIVAR REPORTE'
      }else{
        this.lista = 'col-md-9';
        this.solicitudes = false
        this.report = true;
        this.myReporte = 'DESACTIVAR REPORTE'
      }
    },
    reporte(){
     if(this.fechaIni == '' || this.fechaFin == '' || this.estado == '' || this.tipo == ''){
       this.errorReporte();
     }else{
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
        url: this.$store.state.serverOfi + '/solicitudesPDF?usuario=' + this.$session.get('user') + '&flgEstado=' + this.estado + '&txtColegiado=' + this.tipo + '&fecIni=' + this.fechaIni + '&fecFin=' + this.fechaFin + '&flgDescarga=' + 1,
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
         this.tipo = ["1"];
         this.estado = '2';
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
     }
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