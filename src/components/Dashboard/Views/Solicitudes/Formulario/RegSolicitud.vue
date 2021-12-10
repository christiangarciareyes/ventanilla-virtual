<template>
  <div class="content">
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      <card v-if="carga">
      <template slot="header">
      <div class="row" style="border-bottom: 1px solid #D6DBDF">
      <div class="col-md-12">
        <h5 style="font-size: 18px" class="card-title fuente">{{ titulo }}</h5>
        <p class="card-category fuente">{{ texto }}</p><br>
      </div>
      </div> 
      </template>
      <transition name="fade" mode="out-in">
      <div v-if="consultar">
      <div class="text-center p-signup__form-link fuente m-t-25">
        Estimado(a) <strong>{{ datosCompletos }}</strong>, completa los siguientes datos.
      </div>
       <div class="row m-t-30 m-b-10">
        <div class="col-md-2"></div>
        <div class="col-md-4">
        <label>Ingresa tu Número de Expediente</label>
        <div class="input-group m-b-20">
          <the-mask class="form-control imp-fue" mask="#####" v-model="expedi1" placeholder="#####"/>
          <the-mask class="form-control imp-fue" mask="####" v-model="expedi2" placeholder="####"/>
          <select class="form-control imp-fue" v-model="expedi3">
            <option v-for="list in lista">{{list.value}}</option>
          </select>
        </div>
        </div>
        <div class="form-group col-md-4">
        <label>Selecciona tu Tipo de Parte</label>
        <select class="form-control imp-fue" v-model="selected">
        <option :value="null" disabled>-- Selecciona tu parte --</option>
        <option v-for="parte in listParte" v-bind:key="parte.ctxtValor" v-bind:value="parte.ctxtValor">
            {{ parte.ctxtValor }}
        </option> 
        </select> 
        </div>
       </div>
        <div class="container-form-btn m-t-30 m-b-40">
          <button v-on:click="agreDat()" class="editar-form-btn fuente" style="width:250px;"><i class="fa fa-plus m-r-5"></i> AGREGAR</button>
        </div>
        <transition name="fade" mode="out-in">
        <div class="row" v-if="show">
        <div class="form-group col-md-2"></div> 
        <div class="form-group col-md-8">
        <card>
        <label>Listado de Expedientes que Solicita Acceso</label>
        <table class="mytable m-t-10">
         <thead class="mythead">
          <tr class="mytr">
           <th class="myth" data-campo='EXPEDIENTE'>EXPEDIENTE</th>
           <th class="myth" data-campo='PARTE'>PARTE</th>
           <th class="myth" data-campo='ANULAR'>ANULAR</th>
          </tr>
         </thead>
         <tbody id="bar" class="mytbody">
          <tr v-if="items.length === 0">
            <td class="fuente p-t-20 p-l-20">
              No existen registros para mostrar
            </td>
          </tr>
          <tr class="mytr" v-for="item, index in items">
             <td class="mytd" data-campo='EXPEDIENTE'>{{ item.cnumExpediente }}</td>
             <td class="mytd" data-campo='PARTE'>{{ item.ctxtParte }}</td>
             <td class="mytd" data-campo='ANULAR'>
              <i @click="remove(index)" v-tooltip.top-center="tooltip.anular" class="fa fa-times fa-2x" style="color:#CB4335" aria-hidden="true">
              </i>
             </td>
          </tr>
         </tbody>
        </table>
        <div class="container-form-btn m-t-40 m-b-20">
         <button @click="consulDat()" style="width:250px;" class="login-form-btn m-l-10 m-r-10 m-b-10 fuente"><i class="fa fa-arrow-circle-right"></i> CONTINUAR</button>
        </div>
        </card>
        </div>
      </div>
      </transition>
      </div>
     </transition>
    <transition name="fade" mode="out-in">
    <div v-if="firmar">
    <div class="content">
    <template>
       <div class="row m-t-10 m-b-10">
        <div class="form-group col-md-12">
          <div class="row p-b-20">
          <div class="col-md-5 col-md-3">
            <label>Páginas</label>
            <div class="input-group">
              <input class="form-control" :max="numPages" min="1" v-model.number="page" type="text" style="height:35px;" :disabled="show == false">
              <input class="form-control" v-model="numPages" type="text" style="height:35px; background-color:#EAEDED;" disabled>
              <button style="margin-left:10px; margin-right:8px;" @click="anterior" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
              <button @click="siguiente" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button> 
            </div>
          </div>
          <div class="col-md-2"></div>
          <div class="col-md-5">
              <label>Herramientas</label><br>
              <button @click="rotate += 90" type="button" class="opciones-form-btn m-r-4 fuente" v-tooltip.top-center="tooltip.derecha" :disabled="show == false"><i class="fa fa-repeat"></i></button>
              <button @click="rotate -= 90" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.izquierda" :disabled="show == false"><i class="fa fa-undo"></i></button>
          </div>
          </div>
          <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%
          </div>
          <pdf v-if="show" ref="pdf" style="border: 2px solid black" :src="pdfSrc" :page="page" :rotate="rotate"  @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event" loaded></pdf>
        </div>
       </div>
    </template>
      <div style="background-color: #fff" class="footer">
        <hr>
        <div class="row">
        <div class="col-md-10">
        <div class="stats">
          <i class="fa fa-key"></i> Usted esta visualizando esta solicitud bajo los estándares de seguridad establecidos.<br><br>
        </div>
        </div>
        <div class="col-md-2">
        <button style="margin-left:10px; margin-right:8px;" @click="siguiente" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button>                
        <button @click="anterior" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
        </div>
        </div>
      </div>
    </div>
    <div class="p-signup__form-content m-t-30">
        <div class="container-form-btn">
          <button @click="corregir()" style="width:300px;" class="cancelar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-arrow-circle-left m-r-3"></i> REGRESAR</button>
          <!-- <button @click="enviarCorreo()" style="width:300px;" class="editar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-paper-plane m-r-5"></i> FIRMAR POR EL SISTEMA</button> -->
          <button @click="enviarCorreo()" style="width:300px;" class="editar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-paper-plane m-r-5"></i> FIRMAR Y ENVIAR</button>
          <!-- <button @click="firmarSoli()" style="width:300px;" class="firmar-form-btn m-l-10 m-r-10 fuente"><i class="fa fa-pencil"></i> FIRMAR CON DNI-e</button> -->
        </div>
    </div>
  </div>
  </transition>
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
        <h5 class="alert-heading regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>SOLICITA AQUÍ PARA ACCEDER A TUS EXPEDIENTES APERSONADOS!</h5>
        <p class="fuente2 regEstilo5 m-t-20" align="justify">
          Recuerda usar esta bandeja para consultar tus expedientes y completar el registro de solicitud de acceso. El tiempo de demora del registro de la solicitud a tus expedientes dependerá de las características de tu PC y la velocidad de tu internet.
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
</template>

<script>

import axios from "axios";
import LTable from "src/components/UIComponents/Tables/Table";
import Card from "src/components/UIComponents/Cards/Card";
import pdf from "vue-pdf";

import { actions } from "vuex";

var base64ToString = process.env.VUE_ENV === "server" ? function(base64) { return Buffer.from(base64, "base64").toString(); } : window.atob;

export default {
  name: 'regSolicitud',
  data: function() {
    return {
      name: 'regSolicitud',
      token: '',
      nombrePdf: '',
      pdfSrc: '',
      loadedRatio: 0,
      error: '',
      page: null,
      pages: 1,
      numPages: '',
      rotate: 0,
      sitekey: "6Lew0FcUAAAAACUVe8sgKiQvsFB4IIPqS7QsGmh6",
      dni: '',
      email: '',
      cel: '',
      apePaterno: '',
      apeMaterno: '',
      nombres: '',
      datosCompletos: '',
      consultar: true,
      firmar: false,
      onVerify: '',
      onExpired: '',
      tootltip: 'Validar',
      items: [],
      expReply: [],
      listParte: [],
      resultData: [],
      resultData2: [],
      resultData3: [],
      resultData4: [],
      resultData5: [],
      resultData6: [],
      newPdf: '',
      ctxtCorreo: '',
      cnumCelular: '',
      lista: [
        { value: 'AA' },
        { value: 'AC' },
        { value: 'AI' },
        { value: 'CC' },
        { value: 'HC' },
        { value: 'HD' },
        { value: 'Q' }
      ],
      expedi: '',
      expedi1: '',
      expedi2: '',
      expedi3: 'AA',
      selected: null,
      show: false,
      alert: false,
      carga: false,
      aviso: 0,
      titulo: 'Solicitud de Acceso a Expedientes',
      texto: 'Ingresa los números de expedientes en los que te encuentras apersonado.',
      field: [
        { key: 'expediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'parte', label: 'PARTE', sortable: true },
        { key: 'delete', label: 'ANULAR' }
      ],
      tooltip: {
        derecha: 'Derecha',
        izquierda: 'Izquierda',
        siguiente: 'Siguiente',
        anterior: 'Anterior',
        anular: 'Anular Expediente'
      },
      parte: {
        tipo: null,
        nombre: null
      }
    }
  },
  mounted: function() {
    this.cargaView();
  },
  methods: {
    cargaView(){
      this.$store.dispatch("cargandoDatos2");
      this.viewRegSolicitud();
    },
    viewRegSolicitud(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.dni = this.$session.get('dni');
          this.datosCompletos = this.$session.get('nomUsuario');
          this.limpiarParam();
          this.obtenerDatos(); 
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
    oculAlert(){
      this.alert = false;
    }, 
    obtenerDatos(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverCas2 + '/operaciones/persona/datos',
      { 
        'cnomUsuario':this.$session.get('user')
      }
      ).then((response) => {
        this.resultData6 = response.data;
        if(this.resultData6.codRpta == 1){
           this.ctxtCorreo = this.resultData6.ctxtCorreo;
           this.cnumCelular = this.resultData6.ctxtCelular;
           this.datPerson();
        }else{
          this.errorNotification();
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
    },
    datPerson: function() {
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverCas2 + "/solicitudInt", {
          cnumDni: this.dni,
          ctxtCorreo: this.ctxtCorreo,
          cnumCelular: this.cnumCelular,
          cnumIp: this.$session.get('ip'),
          cnomCiudad: this.$session.get('city'),
          cnomPais: this.$session.get('country_name')
        })
        .then(response => {
          this.resultData = response.data;
          if (this.resultData.codRpta == 1) {
            this.token = this.resultData.txtToken;
            this.comboParte();
          } else if ( this.resultData.codRpta == 0 || this.resultData.codRpta == 3) {
            this.errorNotification();
          } else if (this.resultData.codRpta == 2) {
            this.errorNotification2();
          } else if (this.resultData.codRpta == 4) {
            this.infoNotification2();
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
    },
    comboParte: function() {
      axios.post(this.$store.state.serverOfi + "/partes", {
          ctxtToken: this.token,
          cnumDni: this.dni
        })
        .then(response => {
          this.listParte = response.data;
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
    validarExpediente(){
      if(this.expedi1.length == 4){
         return this.expedi1 = '0' + this.expedi1
      }else if(this.expedi1.length == 3){
         return this.expedi1 = '00' + this.expedi1
      }else if(this.expedi1.length == 2){
         return this.expedi1 = '000' + this.expedi1
      }else if(this.expedi1.length == 1){
         return this.expedi1 = '0000' + this.expedi1
      }else{
         return this.expedi1
      }
    },
    agreDat() {
      this.expedi1 = this.validarExpediente();
      if(this.expedi1 != "" || this.expedi2 != "" || this.expedi3 != ""){
        this.expediente = this.expedi1 + "-" + this.expedi2 + "-" + this.expedi3;
        if (this.expediente == "" || this.selected == "") {
          this.$store.dispatch("infoNotification");
        } else if (!this.validExped(this.expediente)) {
          this.errorNotification();
        } else {
          this.$store.dispatch("cargandoDatos");
          axios.post(this.$store.state.serverOfi + "/consultaPorExp",
              {
                ctxtToken: this.token,
                cnumDni: this.dni,
                cnumExpediente: this.expediente,
                ctxtParte: this.selected
              }
            )
            .then(response => {
              this.resultData2 = response.data;
              if (this.resultData2.codRpta == 1) {
                this.add();
              } else if (this.resultData2.codRpta == 4 || this.resultData2.codRpta == 5) {
                this.errorNotification2();
              } else if (this.resultData2.codRpta == 2) {
                this.infoNotification3();
              } else if (this.resultData2.codRpta == 0) {
                this.infoNotification5();
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
        }
      }else{
        this.$store.dispatch("infoNotification");
      }
    },
    mosExped() {
      this.$notify({group: 'auth', clean: true});
      this.$store.dispatch("procesandoSolicitud");
      axios.post(this.$store.state.serverOfi + "/consulta", {
          ctxtToken: this.token,
          cnumDni: this.dni,
          listExp: this.items
        })
        .then(response => {
          this.resultData3 = response.data;
          this.fecha2 = this.resultData3[0].txtFecha;
          this.fecha = this.resultData3[0].dfecha;
          this.hora = this.resultData3[0].dhora;
          this.numero = '001-' + this.resultData3[0].cnumSolicitud;
          this.validar = false;
          this.consultar = false;
          this.firmar = true;
          this.titulo = "Vista previa de tu solicitud";
          this.texto = "En esta ventana visualizaras la solicitud que acabas de generar.";
          this.generarPdf();
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
    validExped: function(expediente) {
      var re = /(^([0-9]{5,5}\-[0-9]{4,4}\-[a-zA-Z]{1,2})|^)$/;
      return re.test(expediente);
    },
    consulDat: function() {
      if (this.items.length === 0) {
        this.$store.dispatch("infoNotification");
      } else {
        this.mosExped();
      }
    },
    volver: function() {
      if(this.show == false){
        this.alert = true;
      }
    },
    corregir: function() {
      this.validar = false;
      this.consultar = true;
      this.firmar = false;
      this.titulo = "Registra tus Expedientes";
      this.texto = "Registra aquí los expedientes a los que deseas acceder.";
    },
    remove: function(index) {
      swal({
        title: "¿Desea anular el registro?",
        text: "El registro se eliminará del listado",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          this.items.splice(index, 1);
          this.expReply.splice(index, 1);
          this.$store.dispatch("expedAnulado");
        } else {
        }
      });
    },
    add: function() {
      this.expedienteNew = this.expediente.toUpperCase();
      if (this.expReply.includes(this.expediente)) {
        this.errorNotification3();
      } else {
        this.items.push({
          cnumExpediente: this.expedienteNew,
          ctxtParte: this.selected
        });
        this.expReply.push(this.expediente);
        this.limpiarDatos2();
        this.show = true;
        swal.close();
        this.$store.dispatch("expedAgregado");
        this.alert = false;
      }
    },
    siguiente: function() {
      if (this.page < this.numPages) {
        this.page = this.page + this.pages;
      } else {
        this.page = this.numPages;
      }
    },
    anterior: function() {
      if (this.page > 1) {
        this.page = this.page - this.pages;
      } else {
        this.page = 1;
      }
    },
    infoNotification2() {
      this.$store.dispatch("limitesNotification");
      this.limpiarDatos();
    },
    infoNotification3() {
      this.$store.dispatch("replyNotification");
      this.limpiarDatos2();
    },
    infoNotification5() {
      this.$store.dispatch("incorrecNotification");
      this.limpiarDatos2();
    },
    dniNotification() {
      this.$store.dispatch("datIncoNotification");
      this.dni = "";
    },
    emailNotification() {
      this.$store.dispatch("datIncoNotification");
      this.visEmail = true;
      this.email = "";
    },
    celNotification() {
      this.$store.dispatch("datIncoNotification");
      this.cel = "";
    },
    errorNotification() {
      this.$store.dispatch("datIncoNotification");
      this.limpiarDatos2();
    },
    errorNotification2() {
      this.$store.dispatch("errorDataNotification");
      this.limpiarDatos2();
    },
    errorNotification3() {
      this.$store.dispatch("replyTabNotification");
      this.limpiarDatos2();
    },
    limpiarDatos2() {
      this.expedi1 = "";
      this.expedi2 = "";
      this.selected = null;
    },
    verifyPdf() {
      if (this.pdfSrc.data == "") {
        this.page = "";
        this.show = false;
        swal.close();
        this.$store.dispatch("warnNotification");
      } else {
        this.page = 1;
        this.show = true;
        swal.close();
        this.$store.dispatch("successNotification");
      }
    },
    finalizar(){
      this.$session.set('tokService', 1)
      this.$router.push('/completSolicitud')
    },
    generarPdf: function() {
      if (this.cel == "") {
        this.cel = "NO REGISTRADO";
      }
      var bodyDocument = [];
      var dataTable = this.resultData3;
      bodyDocument.push([
        {
          text: "N°",
          fillColor: "#CCCCCC",
          alignment: "center",
          margin: [10, 10, 10, 10]
        },
        {
          text: "EXPEDIENTE",
          fillColor: "#CCCCCC",
          alignment: "center",
          margin: [10, 10, 10, 10]
        },
        {
          text: "TIPO DE PARTE",
          fillColor: "#CCCCCC",
          alignment: "center",
          margin: [10, 10, 10, 10]
        },
        {
          text: "REPRESENTA A",
          fillColor: "#CCCCCC",
          alignment: "center",
          margin: [10, 10, 10, 10]
        }
      ]);
      for (var key in dataTable) {
        if (dataTable.hasOwnProperty(key)) {
          var item = dataTable[key];
          var cnumExpediente = dataTable[key];
          var ctxtParte = dataTable[key];
          var ctxtRepresenta = dataTable[key];
          var fila = new Array();
          fila.push(
            item.item.toString(),
            cnumExpediente.cnumExpediente.toString(),
            ctxtParte.ctxtParte.toString(),
            ctxtRepresenta.ctxtRepresenta.toString()
          );
          bodyDocument.push(fila);
        }
      }
      var solicitud = {
        watermark: {
          text: "Ventanilla Jurisdiccional",
          color: "blue",
          opacity: 0.3,
          bold: true,
          italics: true
        },
        footer: function(currentPage, pageCount) {
          return {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "center",
            fontSize: 8,
            margin: [250, 20]
          };
        },
        header: {
          columns: [
            {
              width: 1200,
              height: 50,
              fontSize: 8,
              margin: [500, 10],
              text: [
                "Fecha  : " + " " + this.fecha + "\n",
                "Hora    : " + " " + this.hora
              ]
            }
          ]
        },
        content: [
          {
            columns: [
              {
                width: 200,
                stack: [
                  {
                    text: "TRIBUNAL CONSTITUCIONAL DEL PERÚ",
                    style: "subheader"
                  },
                  {
                    text: "VENTANILLA JURISDICCIONAL",
                    style: "subheader",
                    color: "gray"
                  }
                ]
              },
              {
                width: 270,
                text: ""
              },
              {
                width: 50,
                qr:
                  "TRIBUNAL CONSTITUCIONAL DEL PERÚ" +
                  "\n" +
                  "SOLICITUD DE ACCESO" +
                  "\n" +
                  this.datosCompletos,
                fit: 60,
                alignment: "right"
              }
            ]
          },
          {
            stack: ["SOLICITUD DE ACCESO A EXPEDIENTES"],
            style: "header"
          },
          {
            columns: [
              {
                width: 1200,
                margin: [400, 20],
                text: [
                  { text: "N° " + this.numero + "\n" }
                ]
              }
            ]
          },
          {
            columns: [
              {
                width: 500,
                margin: [0, 20],
                alignment: "justify",
                text: [
                  {
                    text: ["SR. PRESIDENTE DEL TRIBUNAL CONSTITUCIONAL\n"]
                  }
                ]
              }
            ]
          },
          {
            columns: [
              {
                width: 500,
                alignment: "justify",
                text: [
                  { text: ".          ", style: "espaciado" },
                  "Yo, " +
                    this.datosCompletos +
                    " identificado con DNI Nro. " +
                    this.dni +
                    ", a Ud. respetuosamente digo:\n\n",
                  { text: ".          ", style: "espaciado" },
                  "Que, SOLICITO se me conceda acceso a la Ventanilla Jurisdiccional para revisar los expedientes que a continuación indico:\n\n\n"
                ]
              }
            ]
          },
          {
            table: {
              widths: [50, 100, 150, 200],
              body: bodyDocument
            }
          },
          {
            columns: [
              {
                width: 500,
                alignment: "justify",
                text: [
                  "\n\n",
                  { text: ".          ", style: "espaciado" },
                  "A fin de una mejor comunicación, proporciono el siguiente correo electrónico: " +
                    this.ctxtCorreo +
                    " a fin de enviarme las credenciales para el acceso a esta plataforma y el número móvil: " +
                    this.cnumCelular +
                    ", a fin de notificarme cuando se me conceda el acceso respectivo.\n\n",
                  { text: ".          ", style: "espaciado" },
                  "Asimismo declaro haber leído los términos y condiciones de uso de la plataforma los cuales acepto y me comprometo a cumplirlas en salvaguarda de la información que allí se expone.\n",
                  "POR TANTO:\n\n\n",
                  { text: ".          ", style: "espaciado" },
                  "A Ud. Señor Presidente ruego se sirva deferir a mi petición.\n\n\n",
                  this.$session.get('city') + ", " + this.fecha2 + "\n\n\n\n\n\n"
                ]
              }
            ]
          },
          {
            columns: [
              {
                width: 350,
                text: ""
              },
              {
                width: 200,
                text: [
                  { text: "ATTE.\n" },
                  { text: this.datosCompletos + "\n" },
                  { text: "DNI: " + this.dni }
                ]
              }
            ]
          },
        ],
        styles: {
          header: {
            fontSize: 15,
            bold: true,
            alignment: "center",
            margin: [0, 10, 0, 10]
          },
          linea: {
            fontSize: 18,
            bold: true,
            alignment: "left",
            margin: [0, 0, 0, 5]
          },
          subheader: {
            fontSize: 10,
            bold: true
          },
          superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15
          },
          signature: {
            bold: true,
            decoration: "overline",
            decorationStyle: "solid",
            decorationColor: "black"
          },
          espaciado: {
            color: "white"
          }
        }
      };
      this.documento = solicitud;
      const pdfDocGenerator = pdfMake.createPdf(solicitud);
      pdfDocGenerator.getBase64(bytes => {
        this.newPdf = bytes;
        var binaryVersionOfThePdf = base64ToString(bytes);
        this.pdfSrc = { data: binaryVersionOfThePdf };
        this.verifyPdf();
      });
    },
    enviarCorreo: function() {
      swal({
        title: "¿Desea finalizar el registro?",
        text: "Finalizado este proceso, recibirá una constancia de presentación al correo electrónico registrado.",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
      if (value == true) {
      this.$store.dispatch("finalizandoSolicitud");
      axios.post(this.$store.state.serverOfi + "/uploadPdf",
          {
            ctxtToken: this.token,
            cnumDni: this.dni,
            cnumCelular: this.cnumCelular,
            cnumSolicitud: this.resultData3[0].cnumSolicitud,
            nidTipoSolicitud: 1,
            ctxtTipoEnvio: 'M',
            listExp: this.resultData3,
            pdf: this.newPdf
          }
        )
        .then(response => {
          this.resultData4 = response.data;
          if (this.resultData4.codRpta == 1) {
            swal.close();
            this.finalizar();
          }else{
            swal.close();
            this.$store.dispatch("alertaError");
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
      } else {}
      });
    },
    firmarSoli: function() {
      swal({
        title: "¿Desea firmar la solicitud?",
        text: "Es necesario para el proceso que cuente con su DNI electrónico y que conecte su lector a la PC.",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          this.$store.dispatch("enviandoSolicitud");
          axios.post(this.$store.state.serverOfi + "/uploadPdf", 
            {
              ctxtToken: this.token,
              cnumDni: this.dni,
              cnumCelular: this.cnumCelular,
              cnumSolicitud: this.resultData3[0].cnumSolicitud,
              nidTipoSolicitud: 1,
              ctxtTipoEnvio: 'D2',
              listExp: this.resultData3,
              pdf: this.newPdf
            })
            .then(response => {
              this.resultData5 = response.data;
              if (this.resultData5.codRpta == 1) {
                var codUrl = this.resultData5.txtInfo;
                var url = this.$store.state.apiFirma + codUrl;
                this.$session.set('tokService', 1)
                swal.close();
                this.$notify({group: 'auth', clean: true});
                window.open(url, "_self");
              }else{
                swal.close();
                this.$store.dispatch("alertaError");
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
};
</script>

<style lang="css">
</style>