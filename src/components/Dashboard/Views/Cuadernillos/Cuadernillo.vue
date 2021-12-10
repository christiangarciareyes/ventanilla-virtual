<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5" v-if="cuadernillo">
        <card v-if="carga">
         <template slot="header">
          <div class="row" style="border-bottom: 1px solid #D6DBDF">
          <div class="col-md-12">
            <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
            <p class="card-category">Listado de documentos por expediente.</p><br> 
          </div>
         </div>
         </template>
        <div class="content m-t-10 p-b-32 fuente">
        <label>Expedientes</label>
        <b-form-input v-if="bajaImput" class="imp-fue" v-model="numExped" disabled/>
        <select v-if="bajaSelect" class="form-control imp-fue" v-on:change="cuaderExped(exp.idExpediente)" v-model="exp.idExpediente">
        <option :value="null" disabled>-- Seleccione un expediente --</option>
        <option v-for="expedientes in options" v-bind:key="expedientes.nidExpediente" v-bind:value="expedientes.nidExpediente">
            {{ expedientes.cnumExpediente }}
        </option> 
        </select>
        </div>
      <transition name="fade" mode="out-in">
      <div class="content" v-if="ver"> 
      <label>Cuadernillo del Expediente</label>
        <table class="mytable1">
         <thead class="mythead1">
          <tr class="mytr1">
           <th class="myth1" data-campo='VER'>VER</th>
           <th class="myth1" data-campo='PIEZA PROCESAL'>PIEZA PROCESAL</th>
           <th class="myth1" data-campo='FOLIOS'>FOLIOS</th>
           <th class="myth1" data-campo='FECHA'>FECHA</th>
           <th class="myth1" data-campo='DESCARGAR'>DESCARGAR</th>
          </tr>
         </thead>
         <tbody id="bar" class="mytbody1">
          <tr v-if="lists.length === 0">
            <td class="fuente p-t-20 p-l-20">
              No existen registros para mostrar
            </td>
          </tr>
          <tr class="mytr1" v-for="item in lists">
             <td class="mytd1" data-campo='VER'>
              <button v-if="item.cdesArchivo != expSelec" @click="verPdf(item)" type="button" class="btn-info-circle btn-xs" v-tooltip.top-center="tooltip.folios"><i class="fa fa-file-pdf-o"></i></button>
              <button v-if="item.cdesArchivo === expSelec" type="button" class="btn-success-circle btn-xs"><i class="fa fa-check"></i></button>
             </td>
             <td class="mytd1" data-campo='PIEZA PROCESAL'>        
              {{ item.ctxtPiezaProcesal }}<br>
              <div class="subcontent m-t-5">
                {{item.cdesItem}}
              </div>
             </td>
             <td class="mytd1" data-campo='FOLIOS'>{{ item.nnumFolios }}</td>
             <td class="mytd1" data-campo='FECHA'>{{ item.dfecDocumento }}</td>
             <td class="mytd1" data-campo='DESCARGAR'>
              <button @click="descargarPdf(item.cdesArchivo)" type="button" class="btn-danger-circle btn-xs" v-tooltip.top-center="tooltip.folios"><i class="fa fa-download"></i></button>
             </td>
          </tr>
         </tbody>
        </table>
    </div>
    </transition>
    </card>
  </div>
  <div :class="lista">
  <card v-if="carga">
    <template slot="header">
    <div class="row" style="border-bottom: 1px solid #D6DBDF">
    <div class="col-md-11">
      <h5 style="font-size: 18px" class="card-title">Visor del documento</h5>
      <p class="card-category">Visualización del documento en formato PDF.</p><br>
    </div>
    <div class="col-md-1">
      <button @click="$router.go(-1)" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
    </div>
    </div> 
    </template>
    <div class="content">
     <template>
        <div class="row m-t-10 p-b-22">
        <div class="col-md-5 col-md-3">
          <label>Páginas</label>
          <div class="input-group">
            <input class="form-control" :max="numPages" min="1" v-model.number="page" type="text" :disabled="show == false" style="height:35px;">
            <input class="form-control" v-model="numPages" type="text" style="height:35px; background-color:#EAEDED;" disabled>
            <button style="margin-left:10px; margin-right:8px;" @click="anterior" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
            <button @click="siguiente" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button>            
          </div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-5">
        <label>Herramientas</label><br>
        <button @click="ampliar" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.ampliar" :disabled="show == false"><i class="fa fa-expand"></i></button>
        <button @click="contraer" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.contraer" :disabled="show == false"><i class="fa fa-compress"></i></button>
        <button @click="rotate += 90" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.derecha" :disabled="show == false"><i class="fa fa-repeat"></i></button>
        <button @click="rotate -= 90" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.izquierda" :disabled="show == false"><i class="fa fa-undo"></i></button><br>
        </div>
       </div>
      <transition name="fade" mode="out-in">
      <div v-if="show">
       <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%
       </div>
       <pdf v-if="show" ref="pdf" style="border: 2px solid black" :src="pdfSrc" :page="page" :rotate="rotate" @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event" loaded>
       </pdf>
      </div>
      </transition>
      </template> 
    </div>
    <div style="background-color: #fff" class="footer m-b-10" v-if="show">
      <hr>
      <div class="row">
      <div class="col-md-8">
       <div class="stats">
        <i class="fa fa-key"></i> Usted esta visualizando este expediente bajo los estándares de seguridad establecidos.<br><br>
       </div>
      </div>
      <div class="col-md-4">
       <button style="margin-left:10px; margin-right:8px;" @click="siguiente" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button>   
       <button @click="anterior" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
      </div>
      </div>
    </div>
    </card>
  </div>
  </div>
  <transition name="fade" mode="out-in">
    <div v-if="alert" class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
    <div class="container-form-btn"> 
     <card class="regEstilo7">
      <i style="color: #fff;" class="fa fa-times m-t-1 pull-right" @click="oculAlert()"></i>
      <h5 class="regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>CONSULTA AQUÍ LOS CUADERNILLOS DE TUS EXPEDIENTES!</h5>
      <p class="fuente2 regEstilo5 m-t-20" align="justify">
        Recuerda usar esta bandeja para consultar tus expedientes y visualizar el cuadernillo que poseen. El tiempo de demora de la visualización de tu cuadernillo dependerá de las características de tu PC y la velocidad de tu internet.
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
  <b-modal ref="my-modal" hide-footer title="Mantenimiento del Cuadernillo Digital">
      <div class="d-block">
        <h4>Estimado usuario, por motivos de mantenimiento para la mejora de nuestros sistemas; la opción del Cuadernillo Digital estará disponible de manera progresiva. 
          Es decir, los cuadernillos digitales de sus expedientes se iran visualizando por año de antiguedad durante el pasar de los días.</h4>
        <h4>Discúlpenos por el inconveniente y esperamos su comprensión.</h4>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModa">ACEPTAR</b-button>
  </b-modal>
</div>
</div>
</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card'
import LTable from 'src/components/UIComponents/Tables/Table'
import axios from 'axios'
import pdf from 'vue-pdf'
import { saveAs } from 'file-saver'
import { Base64 } from 'js-base64'

var base64ToString = process.env.VUE_ENV === 'server' ? function(base64) { return Buffer.from(base64, 'base64').toString() } : window.atob;

  export default {
  name: 'cuadernillo',
  data: function () {
    return {
      name: 'cuadernillo',
      bajaImput: true,
      bajaSelect: true,
      numExped: null,
      tooltip: 
      {
      folios: 'Ver Folios',
      derecha: 'Derecha',
      izquierda: 'Izquierda',
      descargar: 'Descargar',
      contraer: 'Contraer',
      ampliar: 'Ampliar',
      siguiente: 'Siguiente',
      anterior: 'Anterior',
      },
      cuadernillo: true,
      lista:'col-md-7',
      texto: 'Cuadernillo digital',
      lists: [],
      selected: null,
      nombrePdf: '', 
      pdfSrc: '',
      show: false,
      ver: false,
      loadedRatio: 0,
      page: '',
      pages: 1,
      numPages: '',
      rotate: 0,
      error: '',
      auto: [],
      options: [],
      pdfDesca: [],
      fields: [
        { key: 'documento', label: 'VER' },
        { key: 'ctxtPiezaProcesal', label: 'PIEZA PROCESAL', sortable: true },
        { key: 'nnumFolios', label: 'FOLIOS', sortable: true },
        { key: 'dfecDocumento', label: 'FECHA', sortable: true }
      ],
      exp: {
        idExpediente: null,
        numExpediente: null
      },
      alert: false,
      carga: false,
      expSelec: false,
      expIni: true,
      variador: ''
    }
  },
  mounted: function () {
    this.$store.state.alerts = 0;
    // this.showModa();
    this.cargaView();
  },
  methods: {
    descargarPdf(cdesArchi){
       var archivo = cdesArchi.replace('Cuadernillo/', '')
       window.open("https://gestordocumentaltc.sedetc.gob.pe/index.php/s/rtdZeybzmewpS5R/download?path=%2F&files=" + archivo, "_blank")
    },
    showModa() {
      this.$refs['my-modal'].show()
    },
    hideModa() {
      this.$refs['my-modal'].hide()
    },
    toggleModa() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    cargaView(){
      this.viewCuadernillo();
    },
    viewCuadernillo(){
      if(this.$store.state.numServicio == null){
        this.cargaRegistros();
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
        .then((response) => {
          this.auto = response.data;
          if(this.auto.codError == 1){
            this.cnomUsuario = this.$session.get('user');
            this.limpiarParam();
            this.verServicio(); 
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
        this.numServicio = this.$store.state.numServicio;
        this.cnomUsuario = this.$session.get('user');
        this.limpiarParam();
        this.verServicio(); 
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
      this.$store.state.nomSolicitud = null;
      this.$store.state.partEscrito = null;
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
    oculAlert(){
      this.alert = false;
    }, 
    verServicio(){
      if(this.numServicio == 1){
        this.expedPerson();
        this.bajaSelect = true;
        this.bajaImput = false;
        this.codExped = this.$store.state.idExpParam;
        this.cuaderExped(this.codExped);
      }else if(this.numServicio == 2){ 
        this.carga = true;
        this.bajaImput = true;
        this.bajaSelect = false;
        this.codExped = this.$store.state.idExpParam2;
        this.numExped = this.$store.state.numExpParam;
        this.cuaderExped(this.codExped);
      }else if(this.numServicio == 3){
        this.expedPerson();
        this.bajaSelect = true;
        this.bajaImput = false;
        this.codExped = this.$store.state.idExpParam3;
        this.cuaderExped(this.codExped);
      }else if(this.numServicio == 4){ 
        this.carga = true;
        this.bajaImput = true;
        this.bajaSelect = false;
        this.codExped = this.$store.state.idExpParam4;
        this.numExped = this.$store.state.numExpParam3;
        this.cuaderExped(this.codExped);
      }else if(this.numServicio == 5){ 
        this.carga = true;
        this.bajaImput = true;
        this.bajaSelect = false;
        this.codExped = this.$store.state.idExpParam5;
        this.numExped = this.$store.state.numExpParam4;
        this.$store.state.contaMag = 1;
        this.cuaderExped(this.codExped);
      }else if(this.numServicio == null){
        this.expedPerson();
        this.bajaSelect = true;
        this.bajaImput = false;
      }else{}
    },
    expedPerson: function(){    
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/expediente/*/cbo')
      .then((response) => {
        this.options = response.data; 
        this.carga = true;
        if(this.numServicio == null){
          this.alert = true; 
        }
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
    cuaderExped (vidExp){
      let api = "/cuadernillo/list"
      if(this.numServicio == 5){
        api = "/cuadernillo/listMag"
      }
      if(this.variador == ''){
        this.$store.dispatch("cargaCuadernillo");
      }
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + api,
      {
        'nidExpediente': vidExp,
        'cnomUsuario': this.cnomUsuario,
        'cnumIp': this.$session.get('ip'),
        'cnomCiudad': this.$session.get('city'),
        'cnomPais': this.$session.get('country'),
      }).then((response) => {
        this.lists = response.data;
        this.exp.idExpediente = vidExp;
        this.alert = false;
        this.ver = true;
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
    verPdf: function (id) {
      let api = "/cuadernillo/getPdfOV"
      if(this.numServicio == 5){
        api = "/cuadernillo/getPdfOVMag"
      }
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      swal({
        title: "Cargando documento",
        text: "Espere por favor...",
        buttons: [false, "Cancelar"],
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false
      })
      .then((value) => {
        if(value == true){
          source.cancel();
          this.token = 'A';
          this.page = ''; 
          this.show = false; 
          this.cancelNotification();
        }else{}
      });
      this.pdfSrc = '';
      this.page = '';
      this.nombrePdf = id.ctxtPiezaProcesal + ' Fecha: ' + id.dfecDocumento;
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + api,
        {
          'path': id.cdesArchivo,
          'cnomUsuario': this.$session.get('user'),
          'cnumIp': this.$session.get('ip'),
          'cnomCiudad': this.$session.get('city'),
          'cnomPais': this.$session.get('country'),
          'ctxtInfo': this.exp.idExpediente
        }, 
        {
          cancelToken: source.token
        }
        ).then((response) => {   
          var binaryVersionOfThePdf = '';
          this.pdfDesca = response.data;
          binaryVersionOfThePdf = base64ToString(response.data);
          this.pdfSrc = {data: binaryVersionOfThePdf} 
          this.verifyPdf(id);
        },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            swal.close();
            if(this.token != 'A'){
              this.$store.dispatch("alertaErrorDes");
            }
          }
        }); 
    },
    contraer:function(){
     this.cuadernillo = true;
     this.lista = 'col-md-7';
    },
    ampliar:function(){
    this.cuadernillo = false;
    this.lista = 'col-md-12';
    },
    siguiente:function(){
    if(this.page < this.numPages){
       this.page = this.page + this.pages;
    } else {
      this.page = numPages;
    }
    },
    anterior:function(){
    if(this.page > 1){
       this.page = this.page - this.pages;
    } else {
      this.page = 1;
    }
    },
    successNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Documento disponible para visualizar!',
          type: 'success',
        });
    },
    warnNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, el documento PDF no existe!',
          type: 'error',
        });
    },
    cancelNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Se canceló la consulta del cuadernillo!',
          type: 'warn',
        });
    },
    verifyPdf(id){
      if(this.pdfSrc.data == ''){
        this.page = ''; 
        this.show = false; 
        this.idSelec = id.nidExpediente;
        this.expSelec = '';
        this.variador = 'D';
        this.cuaderExped(this.idSelec)
        swal.close();
        this.warnNotification() 
        this.variador = '';
      }else{
        this.page = 1; 
        this.show = true; 
        this.idSelec = id.nidExpediente;
        this.expSelec = id.cdesArchivo;
        this.variador = 'D';
        this.cuaderExped(this.idSelec)
        swal.close();
        this.successNotification() 
        this.variador = '';
      }
    },
    cargaRegistros(){
      swal({
        title: "Cargando datos",
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
     pdf
  }
}
</script>

