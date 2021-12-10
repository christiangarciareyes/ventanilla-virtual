<template>
<transition name="slide-fade">
  <div class="content-center fuente">
  <div class="registrar-header" style="background-image: url('/static/img/cover.jpg')">
  <div class="content-center index">
  <nav class="navbar navbar-expand-lg" style="border-bottom: 0px">
<!--
    <a style="color: #fff" class="mobil fuente">TRIBUNAL CONSTITUCIONAL DEL PERÚ</a>
    <a style="color: #fff" class="laptop fuente">TC</a>
-->
    <a class="mobil nounderline" href="https://www.tc.gob.pe" target="_blank">
      <img src="https://tc.gob.pe/intranet/iconos/txtLogoBlancoMin.png" alt="escudo">
    </a>
    <a class="laptop nounderline" href="https://www.tc.gob.pe" target="_blank">
      <img src="https://tc.gob.pe/intranet/iconos/txtRecorteBlanco.png" alt="escudo">
    </a>
      <span class="settings-panel-control-menu">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar burger-menu"></span>
        <span class="navbar-toggler-bar burger-menu"></span>
        <span class="navbar-toggler-bar burger-menu"></span>
      </button>
      </span>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <router-link to="/">
          <li class="nav-item myhover m-r-10">
            <a href="#" class="nav-link">
              <i style="font-weight: 400; font-size: 20px; color: #fff" class="nc-icon pe-7s-home"></i>
              <span style="color: #fff" class="d-lg-block fuente p-t-2">&nbsp;PORTAL</span>
            </a>
          </li>
          </router-link>
          <router-link to="/login">
          <li class="nav-item myhover m-r-10">
            <a href="#" class="nav-link">
              <i style="font-weight: 400; font-size: 23px; color: #fff" class="nc-icon pe-7s-user"></i>
              <span style="color: #fff" class="d-lg-block fuente p-t-4">&nbsp;ACCEDER</span>
            </a>
          </li>
          </router-link>
        </ul>
      </div>
   </nav>
  <div class="content-center">
  <div class="container text-center m-t-100 m-b-100 fuente">
    <h1 class="titulo fuente">Ventanilla Jurisdiccional del TC</h1>
    <h2 class="text-port fuente">
      Registro de Solicitud para Expedientes
    </h2>
  </div>
  </div>
  </div>
  </div>
  <b-progress class="m-b-5" height="2px" :value="counter" :max="max" variant="info"></b-progress>
  <div class="content m-t-18">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
        <card>
          <div class="row">
            <div class="col-md-1"></div>
            <transition name="fade" mode="out-in">
            <div v-if="sig1" class="col-md-10 m-t-30">
            <div class="m-home-center__section2">
              <header class="special contentIcon">
                <span class="m-home-center__section-icon pe-7s-add-user"></span><br>
              </header>
              <a style="text-decoration:none;" class="m-home-center__section-name"><span class="form-wizard-c__step-point">1</span>REGISTRA TUS DATOS</a>
              <div class="m-home-center__section-desc">
              <br>Ingresa tus datos personales para iniciar con el proceso de registro.<br>
              </div>
            </div>
            </div>
            </transition>
            <transition name="fade" mode="out-in">
            <div v-if="sig2" class="col-md-10 m-t-20">
            <div class="m-home-center__section2">
              <header class="special contentIcon">
                <span class="m-home-center__section-icon pe-7s-copy-file"></span><br>
              </header>
              <a style="text-decoration:none;" class="m-home-center__section-name"><span class="form-wizard-c__step-point">2</span>INGRESA TUS EXPEDIENTES</a>
              <div class="m-home-center__section-desc">
              <br>Registra aquí los expedientes a los que deseas acceder.<br>
              </div>
            </div>
            </div>
            </transition>
            <transition name="fade" mode="out-in">
            <div v-if="sig3" class="col-md-10 m-t-20">
            <div class="m-home-center__section2">
              <header class="special contentIcon">
                <span class="m-home-center__section-icon pe-7s-ribbon"></span><br>
              </header>
              <a style="text-decoration:none;" class="m-home-center__section-name"><span class="form-wizard-c__step-point">3</span>VISUALIZA TU SOLICITUD</a>
              <div class="m-home-center__section-desc">
              <br>Vista previa de la solicitud a presentar<br>
              </div>
            </div>
            </div>
            </transition>
          </div>
        <transition name="fade" mode="out-in">
        <div v-if="validar">
          <div class="row m-t-40">
          <div class="col-lg-1"></div>
           <div class="form-group col-lg-2">
              <label>N° de DNI</label>
              <the-mask class="form-control imp-fue" mask="########" v-model="dni" placeholder="Ejem: 48091151"/>
           </div>
           <div class="form-group col-lg-2">
              <label>Nacimiento</label>
              <b-form-input type="date" v-model="naci"></b-form-input>
           </div>
           <div class="form-group col-lg-3">
              <label>Correo</label>
              <b-form-input type="text" class="imp-fue" :state= errorType v-model="email" placeholder="Ejem: tucorreo@electronico.com" />
           </div>
           <div class="form-group col-lg-3">
              <label>Celular</label>&nbsp;<label style="color: #2E86C1;"> (Opcional)</label>
              <the-mask class="form-control imp-fue m-b-10" mask="###-###-###" v-model="cel" placeholder="Ejem: 963258741"/>
           </div>
          </div>

          <div class="row m-b-30">
           <div class="col-lg-1"></div>
           <div class="form-group col-lg-4">
              <label>Nombres</label>
              <b-form-input type="text" v-model="nameNew" style="text-transform: uppercase" :formatter="formatter"></b-form-input>
           </div>
           <div class="form-group col-lg-3">
              <label>Apellido Paterno</label>
              <b-form-input type="text" v-model="pateNew" style="text-transform: uppercase" :formatter="formatter"></b-form-input>
           </div>
           <div class="form-group col-lg-3">
              <label>Apellido Materno</label>
              <b-form-input type="text" v-model="mateNew" style="text-transform: uppercase" :formatter="formatter"></b-form-input>
           </div>
          </div>
          <div class="row m-t-10"> 
          <div class="col-md-1"></div>
          <div class="col-md-10 instruc">
            <div align="center" class="col-md-12 m-t-50 m-l-30 p-r-60">
            <h2 align="center" class="alert-heading fuente m-r-10 regEstilo1"><i style="font-size: 80px; color: #fff" class="pe-7s-bookmarks m-t-10 m-b-5 m-r-10"></i>Instrucciones</h2>
            </div>
            <div class="col-md-12 m-t-30 m-b-40 m-l-30 p-r-60">
              <ul class="m-l-20 m-r-20 fuente regEstilo2" align="justify">
                <li class="m-b-10 text-justify">El horario de registro en nuestra plataforma es de 8:00 am hasta las 8:00 pm.</li>
                <li class="m-b-10 text-justify">Ingrese correctamente su número de DNI. En caso se equivoque por tres veces consecutivas, no podrá volver a intentar un nuevo registro hasta el día siguiente.</li>
                <li class="m-b-10 text-justify">Luego de finalizado este proceso de registro, se le enviará una copia digital de su solicitud (en formato PDF) al correo que aquí registre, así mismo toda notificación sobre el trámite.</li>
                <li class="m-b-10 text-justify">Cuando su solicitud haya sido autorizada por el órgano competente del Tribunal Constitucional, se le enviará un SMS al teléfono móvil que aquí registre, notificándole que ya puede ingresar a la Ventanilla Jurisdiccional.</li>
                <li class="m-b-10 text-justify">Recuerde que si sale  del proceso de registro, se perderán todos los datos ya ingresados y tendrá que realizar nuevamente la solicitud.</li>
                <li class="m-b-10 text-justify">Dispone como máximo de 1 hora para completar su solicitud.</li>
              </ul>
              <div class="container-form-btn">
                <!-- <button @click="verManual()" style="width:300px" class="tutorial-form-btn fuente m-t-30 m-r-10"><i class="fa fa-file-pdf-o m-r-8"></i> VER MANUAL PDF</button> -->
                <button @click="showModal()" style="width:300px;" class="tutorial-form-btn fuente m-t-30 m-b-20 m-l-10 m-r-20"><i class="fa fa-video-camera m-r-8"></i> VER VIDEO TUTORIAL</button>
              </div>
            </div>
          </div>
        </div>
          <div class="row">
          <div class ="col-md-3"></div>
          <div class ="col-md-6">
          <div class="container-form-btn m-t-30 m-b-18">
            <div class="m-home-center__section-desc">
              <br>Para continuar, realice el siguiente cálculo<br>
            </div>
          </div>
          <div class="container-form-btn m-t-10">
            <card style="border: 1px solid #888888">
            <div class="input-group">
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="numIni" disabled />
              <b-form-input :style="estiOper" class=" text-center mb-2" type="text" v-model="oper" disabled />
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="numFin" disabled />
              <b-form-input style="font-size: 20px; color: red; width: 50px" class="text-center mb-2" type="text" v-model="igual" disabled />
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="resuOper" />
            </div>
            </card>
          </div>
          <div class="container-form-btn m-b-20">
            <button v-on:click="valiDat" class="guardar-form-btn fuente" style="width:300px"><i class="fa fa-arrow-circle-right m-r-5"></i> CONTINUAR</button>
          </div>
          </div>
          </div>
        </div>
        </transition>
        <transition name="fade" mode="out-in">
        <div v-if="consultar">
        <div class="text-center p-signup__form-link fuente m-t-40">
          Estimado(a) <strong>{{ datosCompletos }}</strong>, completa los siguientes datos.
        </div>
        <div class="p-signup__form-links">
          <div class="p-signup__form-link">
            <a @click="volver()" class="txt3 nounderline" href="#" style="color: #CB4335">
             ¿Te equivocastes de correo o no son tus datos?, haz clic aquí para regresar a la opción anterior.
            </a>               
          </div>
        </div><br>
         <div class="row m-t-20 m-b-10">
          <div class="col-md-1"></div>
          <div class="col-md-5">
          <label>Ingresa tu Número de Expediente</label>
          <div class="input-group m-b-20">
            <the-mask class="form-control imp-fue" mask="#####" v-model="expedi1" placeholder="#####"/>
            <the-mask class="form-control imp-fue" mask="####" v-model="expedi2" placeholder="####"/>
            <select class="form-control imp-fue" v-model="expedi3">
              <option v-for="list in lista">{{list.value}}</option>
            </select>
          </div>
          <p class="txt3 m-t-5">Ingrese los 5 primeros dígitos completos del número de expediente, incluyendo los ceros. Por ejemplo: 00025-2018-AA.</p>
          </div>
          <div class="form-group col-md-5">
          <label>Selecciona tu Tipo de Parte</label>
          <select class="form-control imp-fue" v-model="selected">
          <option :value="null" disabled>-- Selecciona tu parte --</option>
          <option v-for="parte in listParte" v-bind:key="parte.ctxtValor" v-bind:value="parte.ctxtValor">
              {{ parte.ctxtValor }}
          </option> 
          </select> 
          </div>
         </div>
          <div class="container-form-btn m-t-20 m-b-50">
            <button v-on:click="agreDat()" style="width:250px;" class="editar-form-btn fuente"><i class="fa fa-plus m-r-5"></i> AGREGAR</button>
          </div>
          <transition name="fade" mode="out-in">
          <div class="row" v-if="show">
          <div class="form-group col-md-1"></div> 
          <div class="form-group col-md-10">
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
          <div class="container-form-btn m-t-50 m-b-20">
            <button @click="volver()" style="width:250px;" class="cancelar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-arrow-circle-left m-r-3"></i> REGRESAR</button>
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
         <div class="row m-t-40">
          <div class="col-md-1"></div>
          <div class="form-group col-md-10">
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
        <div class="row">
        <div class="col-md-1"></div>
          <div class="col-md-10"><hr>
          <div class="stats">
            <i class="fa fa-key"></i> Usted esta visualizando esta solicitud bajo los estándares de seguridad establecidos.<br><br> 
          </div>
        </div>
        </div>
      </div>     
      <div class="row m-t-50">
      <div class="col-md-1"></div>
      <div class="col-md-10 instruc">
      <div align="center" class="col-md-12 m-t-40 m-l-30 p-r-60">
        <h2 align="center" class="alert-heading fuente m-r-10 regEstilo1"><i style="font-size: 80px; color: #fff" class="pe-7s-bookmarks m-t-10 m-b-5 m-r-10"></i>Instrucciones</h2>
       </div>
      <div class="col-md-12 m-t-30 m-b-60 m-l-30 p-r-60">
         <ul class="m-l-20 m-r-20 fuente regEstilo2" align="justify">
          <li class="m-b-10 text-justify">Si no cuenta con DNI electrónico, presione el botón FIRMAR POR EL SISTEMA, donde nuestra aplicación informática lo firmará por usted y finalizará el proceso de presentación. Usted acepta las condiciones de utilizar esta modalidad de firma digital.</li>
          <li class="m-b-10 text-justify">Si cuenta con DNI electrónico y desea firmar la solicitud digitalmente, presione el botón FIRMAR CON DNI-e, luego de lo cual finalizará el proceso de presentación. Para esta modalidad de firma debe contar con Lector de tarjeta inteligente y <a style="color: #fff" href="https://tc.gob.pe/firmadigital/4identity_1.9.9_tc_p11.exe" class="fuente regEstilo8 nounderline" @click="showModal()">descargado el software cliente de firma digital</a>.</li>
          <li class="m-b-10 text-justify">Si desea corregir algunos datos en el contenido de la solicitud, presione el botón REGRESAR para retornar al paso anterior.</li>
        </ul>
      </div>
    </div>
    </div>
    </div>
    <div class="container-form-btn m-t-50 m-b-30">
      <b-form-checkbox v-model="status"
                       value="accepted"
                       unchecked-value="not_accepted">
        <a class="m-l-25" style="color: #333; font-size: 12px">Acepto los<a style="color: #5499C7" class="fuente nounderline" href="https://sedetc.gob.pe/documentos/Oficina_Virtual_Terminos_Condiciones_Uso.pdf" target="_blank"> Términos y Condiciones de Uso</a>.</a>
      </b-form-checkbox>
    </div>
    <div class="p-signup__form-content">
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
  <div class="text-center p-t-10 p-b-40">
    <router-link to="/">
    <a class="txt3 nounderline" href="#">
      <i class="fa fa-home m-l-5" aria-hidden="true"></i>
      Regresar al Portal
    </a>
    </router-link>
  </div>
  </div>
  <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
      <b-embed type="iframe" aspect="16by9" src="https://ventanillajurisdiccional.sedetc.gob.pe/videos/ventanillavirtual.mp4" allowfullscreen></b-embed>
  </modal>
  </div>
 </div>
</div>
<SwipeMenu></SwipeMenu>
<Footer></Footer>
</div>
</transition>
</template>

<script>

import axios from "axios";
import SwipeMenu from 'src/components/Dashboard/Layout/Contenido/Menu'
import Footer from "src/components/Dashboard/Layout/Footer/RegFooter";
import LTable from "src/components/UIComponents/Tables/Table";
import Card from "src/components/UIComponents/Cards/Card";

import pdf from "vue-pdf";

import { actions } from "vuex";

var base64ToString = process.env.VUE_ENV === "server" ? function(base64) { return Buffer.from(base64, "base64").toString(); } : window.atob;

export default {
  data: function() {
    return {
      texto: 'Completa tu solicitud para acceder a expedientes',
      tooltip: {
        derecha: "Derecha",
        izquierda: "Izquierda",
        siguiente: "Siguiente",
        anterior: "Anterior",
        anular: "Retirar del Listado"
      },
      counter: 0,
      max: 100,
      token: '',
      nombrePdf: '',
      pdfSrc: '',
      loadedRatio: 0,
      error: '',
      page: null,
      pages: 1,
      numPages: '',
      rotate: 0,
      dni: '',
      naci: '',
      email: '',
      cel: '',
      visEmail: false,
      apePaterno: '',
      apeMaterno: '',
      nombres: '',
      pateNew: '',
      mateNew: '',
      nameNew: '',
      datosCompletos: '',
      validar: true,
      video: false,
      consultar: false,
      firmar: false,
      errorType: null,
      tootltip: "Validar",
      resultData: [],
      resultData2: [],
      resultData3: [],
      resultData4: [],
      resultData5: [],
      listParte: [],
      expReply: [],
      newPdf: '',
      status: 'not_accepted',
      parte: {
        tipo: null,
        nombre: null
      },
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
      sig1: true,
      sig2: false,
      sig3: false,
      numIni: '',
      oper: '',
      numFin: '',
      igual: '',
      resuOper: '',
      estiOper: '',
      field: [
        { key: "expediente", label: "EXPEDIENTE", sortable: true },
        { key: "parte", label: "PARTE", sortable: true },
        { key: "delete", label: "ANULAR" }
      ],
      items: []
    };
  },
  mounted: function() {
    this.$store.state.tutorial = 0;
    this.$store.dispatch("registrarInicio");
    //this.$store.dispatch("alertarInicio");
    this.antiRobot();
    this.obtenerIp();
    if (!this.$session.exists()) {
      this.$router.push("/registrar");
      // this.alertCuarentena();
    } else {
      this.$router.push("/inicio");
    }
  },
  methods: {
    /*
    alertCuarentena: function(index) {
      swal({
        title: "Alerta del Sistema",
        text: "El sistema de registro de la Ventanilla Jurisdiccional no se encuentra disponible por el momento, lamentamos los inconvenientes. Gracias.",
        icon: "warning",
        buttons: ["","Esta bien"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
           swal.close();
           this.$router.push("/");
        } else {
           swal.close();
           this.$router.push("/");
        }
      });
    },
    */
    toggleSidebar(){
      $('.settings-panel-menu').removeClass('is-opened');
    },
    formatter(value) {
        return value.toUpperCase()
    },
    antiRobot(){
      var arrayDiv = new Array(2, 4, 6, 8, 10);
      var arrayOper = new Array('+', '-', 'x', '/');
      var alea1 = Math.round(Math.random()*10);
      var alea2 = Math.round(Math.random()*10);
      var operando = arrayOper[Math.floor(Math.random()*arrayOper.length)];
      var numDiv = arrayDiv[Math.floor(Math.random()*arrayDiv.length)];
      this.numIni = alea1
      this.numFin = alea2
      this.oper = operando
      this.igual = '='
      if(this.oper == '+'){
        this.estiOper = 'font-size: 20px; color: red; width: 50px';
        this.resuOper2 = this.numIni + this.numFin;
      }else if(this.oper == '-'){
        this.estiOper = 'font-size: 20px; color: red; width: 50px';
        if(this.numIni >= this.numFin){
          this.resuOper2 = this.numIni - this.numFin;
        }else{
          var conIni = this.numFin
          var conFin = this.numIni
          this.numIni = conIni
          this.numFin = conFin
          this.resuOper2 = this.numIni - this.numFin;
        }
      }else if(this.oper == 'x'){
        this.estiOper = 'font-size: 13px; color: red; width: 50px';
        this.resuOper2 = this.numIni * this.numFin;
      }else if(this.oper == '/'){
        this.oper = '÷'
        this.numIni = numDiv
        this.numFin = numDiv / 2
        this.estiOper = 'font-size: 20px; color: red; width: 50px';
        this.resuOper2 = this.numIni / this.numFin;
      }else{}
    },
    obtenerIp: function() {
      axios.get(this.$store.state.apiIp).then(response => {
        this.lists = response.data;
        this.ip = this.lists.ip;
        this.city = this.lists.city;
        this.country = this.lists.country_name;
      });
    },
    datPerson: function() {
      this.visEmail = false;
      this.emailNew = this.email;
      this.$store.dispatch("cargandoDatos");
      axios.post(this.$store.state.serverCas2 + "/solicitud", {
          cnumDni: this.dni,
          dfecNac: this.naci,
          ctxtCorreo: (this.emailNew = this.emailNew.toUpperCase()),
          cnumCelular: this.cel,
          siglaSis: 'OFIV',
          cnumIp: this.ip,
          cnomPais: this.country,
          cnomCiudad: this.city,
          cnomApePat: this.pateNew,
          cnomApeMat: this.mateNew,
          cnomNombres: this.nameNew
        })
        .then(response => {
          this.resultData = response.data;
          if (this.resultData.codRpta == 1) {
            this.$notify({group: 'auth', clean: true});
            this.token = this.resultData.txtToken;
            // this.apePaterno = this.resultData.nomApePat;
            // this.apeMaterno = this.resultData.nomApeMat;
            // this.nombres = this.resultData.nomNombres;
            this.apePaterno = this.pateNew;
            this.apeMaterno = this.mateNew;
            this.nombres = this.nameNew;
            this.datosCompletos = this.apePaterno + " " + this.apeMaterno + " " + this.nombres;
            this.validar = false;
            this.consultar = true;
            this.firmar = false;
            this.sig1 = false;
            this.sig2 = true;
            this.avance = "40%";
            this.counter = 40;
            this.comboParte();
            if(this.items != ''){
            this.avance = "60%";
            this.counter = 60;}
            swal.close();
          } else if (
            this.resultData.codRpta == 0 || this.resultData.codRpta == 3) {
            this.errorNotification();
          } else if (this.resultData.codRpta == 2) {
            this.errorDniNotification();
            this.avance = "0%";
            this.counter = 0;
          } else if (this.resultData.codRpta == 4) {
            this.infoNotification2();
          } else if (this.resultData.codRpta == 5) {
            this.registrarNotification();
          } else if (this.resultData.codRpta == 6) {
            this.nacimientoNotification();
          } else if (this.resultData.codRpta == 7) {
            this.serverNotify();
          }
        },(error) => {
            swal.close();
            this.$store.dispatch("alertaError");
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
        this.error1Notification();
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
            } else if (
              this.resultData2.codRpta == 4 || this.resultData2.codRpta == 5) {
              this.errorNotification2();
            } else if (this.resultData2.codRpta == 2) {
              this.infoNotification3();
            } else if (this.resultData2.codRpta == 3) {
              this.infoNotification4();
            } else if (this.resultData2.codRpta == 0) {
              this.infoNotification5();
            }
          },(error) => {
              swal.close();
              this.$store.dispatch("alertaError");
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
          this.sig2 = false;
          this.sig3 = true;
          this.avance = "80%";
          this.counter = 80;
          this.generarPdf();
        },(error) => {
          swal.close();
          this.$store.dispatch("alertaError");
        });
    },
    comboParte: function() {
      axios.post(this.$store.state.serverOfi + "/partes", 
        {
          ctxtToken: this.token,
          cnumDni: this.dni
        })
        .then(response => {
          this.listParte = response.data;
        },(error) => {
          swal.close();
          this.$store.dispatch("alertaError");
        });
    },
    valiDat: function() {
      //this.$notify({group: 'custom-template6', clean: true});
      //this.$store.dispatch("alertarInicio");
      var año = '';
      var año2 = '';
      var restri = '';
      if(this.dni == "") {
        this.$store.dispatch("infoNotification");
      }else if(!this.validDni(this.dni)){
          this.dniNotification();
      }else{
        if (this.naci == "") {
          this.$store.dispatch("infoNotification");
        }else if(this.naci != "") {
          año = this.naci.substr(0,5)
          año2 = this.naci.substr(0,4)
          restri = año.substr(4,5)
           /*if(año2 <= 1900 || año2 > 2000){*/
           var aniodate = new Date();
           if(aniodate.getFullYear() - año2 <= 17){
              this.validNacimiento()
           }else if(restri != '-'){
              this.validNacimiento()
           }else{
              if (this.email == "") {
                this.$store.dispatch("infoNotification");
              }else if(!this.validEmail(this.email)) {
                this.emailNotification();
              }else{
                this.errorType = null;
                this.avance = "20%";
                this.counter = 20;
                if(this.cel == ""){
                  if(this.resuOper2 != this.resuOper){
                    this.$store.dispatch('aritmeticaNotification');
                  }else{
                    this.datPerson();
                  }              
                }else if(!this.validCelular(this.cel)) {
                  this.celNotification();
                }else if(this.resuOper2 != this.resuOper){
                  this.$store.dispatch('aritmeticaNotification');
                }else{
                  this.datPerson();
              }
            }
          }
        }
      }
    },
    validDni: function(dni) {
      var re = /(^([0-9]{8,8})|^)$/;
      return re.test(dni);
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validCelular: function(cel) {
      var re = /^9[\d]{8}$/;
      return re.test(cel);
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
    verManual() {
      var file = "";
      window.open(file, "_blank");
    },
    validNacimiento() {
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Fecha de nacimiento incorrecto!',
        type: 'error',
      });
    },
    nacimientoNotification(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'La fecha de nacimiento no coincide!',
        type: 'error',
      });
      swal.close();
    },
    serverNotify(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'No se ha podido validar identidad!',
        type: 'error',
      });
      swal.close();
    },
    volver: function() {
      this.errorType = null;
      this.validar = true;
      this.consultar = false;
      this.firmar = false;
      this.video = false;
      this.avance = "0%";
      this.counter = 0;
      this.sig1 = true;
      this.sig2 = false;
      this.limpiarDatos();
    },
    corregir: function() {
      this.validar = false;
      this.consultar = true;
      this.firmar = false;
      this.avance = "60%";
      this.counter = 60;
      this.sig2 = true;
      this.sig3 = false;
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
          if(this.items == ''){
            this.avance = "40%";
            this.counter = 40;
          }
        } else {
        }
      });
    },
    add: function() {
      this.expedienteNew = this.expediente.toUpperCase();
      if (this.expReply.includes(this.expediente)) {
        this.errorNotification3();
      } else {
        this.avance = "60%";
        this.counter = 60;
        this.items.push({
        cnumExpediente: this.expedienteNew,
        ctxtParte: this.selected
        });
        this.expReply.push(this.expediente);
        this.limpiarDatos2();
        this.show = true;
        swal.close();
        this.$store.dispatch("expedAgregado");
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
    infoNotification4() {
      swal({
        title: "Tiempo de registro agotado",
        text: "Regrese al Portal e inicie nuevamente",
        icon: "warning",
        buttons: [false, "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          this.$router.push("/");
        } else {
        }
      });
    },
    infoNotification5() {
      this.$store.dispatch("incorrecNotification");
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
      this.errorType = false;
      this.visEmail = true;
      this.email = "";
    },
    celNotification() {
      this.$store.dispatch("datIncoNotification");
      this.cel = "";
    },
    error1Notification() {
      this.$store.dispatch("datIncoNotification");
      this.limpiarDatos2();
    },
    errorNotification() {
      this.$store.dispatch("datIncoNotification");
      this.limpiarDatos();
    },
    errorNotification2() {
      this.$store.dispatch("errorDataNotification");
      this.limpiarDatos2();
    },
    errorDniNotification() {
      this.$store.dispatch("errorDniNotification");
      this.limpiarDatos2();
    },
    errorNotification3() {
      this.$store.dispatch("replyTabNotification");
      this.limpiarDatos2();
    },
    limpiarDatos() {
      this.dni = "";
      this.email = "";
      this.cel = "";
    },
    limpiarDatos2() {
      this.expedi1 = "";
      this.expedi2 = "";
      this.selected = "";
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
            stack: ["SOLICITUD DE ACCESO A LA VENTANILLA JURISDICCIONAL"],
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
                    this.emailNew +
                    " a fin de enviarme las credenciales para el acceso a esta plataforma y el número móvil: " +
                    this.cel +
                    ", a fin de notificarme cuando se me conceda el acceso respectivo.\n\n",
                  { text: ".          ", style: "espaciado" },
                  "Asimismo declaro haber leído los términos y condiciones de uso de la plataforma los cuales acepto y me comprometo a cumplirlas en salvaguarda de la información que allí se expone.\n",
                  "POR TANTO:\n\n\n",
                  { text: ".          ", style: "espaciado" },
                  "A Ud. Señor Presidente ruego se sirva deferir a mi petición.\n\n\n",
                  this.city + ", " + this.fecha2 + "\n\n\n\n\n\n"
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
      if(this.status == 'not_accepted'){
        this.$store.dispatch("terminosNotification");
      }else{
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
            cnumCelular: this.cel,
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
            this.$store.dispatch("entregadoCorreo2");
            this.$router.push("/finalizado" + "?" + this.token);
          }else{
            swal.close();
            this.$store.dispatch("alertaError");
          }
        },(error) => {
          swal.close();
          this.$store.dispatch("alertaError");
        });
      } else {}
      });
     } 
    },
    firmarSoli: function() {
      if(this.status == 'not_accepted'){
        this.$store.dispatch("terminosNotification");
      }else{
      swal({
        title: "¿Desea firmar la solicitud?",
        text: "Es necesario para el proceso que cuente con su DNI electrónico y que conecte su lector a la PC.",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          this.$store.dispatch("enviandoSolicitud");
          axios.post(this.$store.state.serverOfi + "/uploadPdf", {
              ctxtToken: this.token,
              cnumDni: this.dni,
              cnumCelular: this.cel,
              cnumSolicitud: this.resultData3[0].cnumSolicitud,
              nidTipoSolicitud: 1,
              ctxtTipoEnvio: 'D1',
              listExp: this.resultData3,
              pdf: this.newPdf
            })
            .then(response => {
              this.resultData5 = response.data;
              if (this.resultData5.codRpta == 1) {
                var codUrl = this.resultData5.txtInfo;
                var url = this.$store.state.apiFirma + codUrl;
                swal.close();
                window.open(url, "_self");
              }else{
                swal.close();
                this.$store.dispatch("alertaError");
              }
            },(error) => {
                swal.close();
                this.$store.dispatch("alertaError");
            });
        } else {}
      });
     }  
    },
    registrarNotification(){
      swal({
        title: "DNI ya registrado",
        text: "Ud. ya cuenta con un usuario para acceder, deberá continuar dentro de la Ventanilla Jurisdiccional",
        icon: "warning",
        buttons: [false, "Ir a la Ventanilla"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          this.$router.push("/login");
        } else {this.$router.push("/login");}
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
    SwipeMenu,
    Footer,
    LTable,
    Card,
    pdf
  }
};
</script>
<style lang="scss">
  .myhover:hover{
    background-color: rgba(208, 211, 212, .2);
    border-radius: 5px;
  } 
</style>