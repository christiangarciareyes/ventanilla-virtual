<template>
<transition name="slide-fade">
  <div class="content-center fuente">
  <div class="registrar-header" style="background-image: url('/static/img/cover.jpg')">
  <div class="content-center index">
  <nav class="navbar navbar-expand-lg" style="border-bottom: 0px">
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
              <i style="font-weight: 400; font-size: 20px; color: #fff" class="nc-icon pe-7s-user"></i>
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
            <div class="row m-t-20">
            <div class="col-md-1"></div>
            <div class="col-md-10 m-t-20">
            <div class="m-home-center__section2">
              <header class="special contentIcon">
                <span class="m-home-center__section-icon pe-7s-check"></span><br>
              </header>
              <a style="text-decoration:none;" class="m-home-center__section-name"><span class="form-wizard-c__step-point">4</span>PROCESO FINALIZADO</a>
              <div class="m-home-center__section-desc">
              <br>Se ha completado correctamente su solicitud de acceso.<br>
              </div>
            </div>
            </div>
            </div>
          <div class="text-center p-signup__form-link fuente m-t-40">
            Estimado(a) <strong>{{ datosCompletos }}</strong>, usted ha completado su registro de solicitud correctamente.
          </div>
          <div class="p-signup__form-links">
            <div class="p-signup__form-link">
              <a class="txt3 nounderline" href="#" style="color: #2E86C1;">
               Recuerda revisar la bandeja de entrada de tu correo electrónico {{ correo }} ya que estaremos informándote por dicho medio.
              </a>               
            </div>
            </div>
            <div class="container-form-btn m-t-50 m-b-20">
              <router-link to="/">
              <button style="width: 300px" class="editar-form-btn fuente"><i class="fa fa-home m-r-5"></i> VOLVER AL PORTAL</button>
              </router-link>
            </div><br>
        </card>
      </div>
   </div>
 </div>
</div>
<SwipeMenu></SwipeMenu>
<Footer></Footer>
</div>
</transition>
</template>

<script>

import axios from 'axios'
import VueRecaptcha from 'vue-recaptcha'

import SwipeMenu from 'src/components/Dashboard/Layout/Contenido/Menu'
import Footer from 'src/components/Dashboard/Layout/Footer/RegFooter'
import Card from 'src/components/UIComponents/Cards/Card'

import pdf from 'vue-pdf'

import { actions } from 'vuex';

export default {
  data: function () {
    return {
      texto: 'Solicitud de acceso a expedientes completado',
      avanze: "Completado con éxito",
      counter: 100,
      max: 100,
      token: '',      
      datosCompletos: '',
      onVerify: '',
      onExpired: '',
      tootltip: 'Validar',
      pasos: 'Proceso Finalizado',
      token: '',
      items: [],
      correo: '',
      celular: ''
    }
  },   
  mounted: function () {
    this.$notify({group: 'auth', clean: true});
    this.returnFirma();
    if (!this.$session.exists()) {
      if(this.token == null){
        this.$router.push('/')
      }else{
        this.$router.push('/finalizado')
      }
    }else {
        this.$router.push('/inicio')
    } 
  },
  methods: {
   returnFirma: function(){
      this.token = window.location.hash.split("#/finalizado?")[1];
      axios.post(this.$store.state.serverOfi + '/finaliza',
      { 
       ctxtToken: this.token
      }
      ).then((response) => {
        this.items = response.data;
        if(this.items.codRpta == 1){
          var nombres = this.items.cnomNombres;
          var apePater = this.items.cnomApePat;
          var apeMater = this.items.cnomApeMat;
          this.correo = this.items.ctxtCorreo;
          this.celular = this.items.cnumCelular;
          this.datosCompletos = nombres + " " + apePater + " " + apeMater; 
        }else{
          this.$router.push('/')
        }   
      });    
   }
  },
  components: {
    SwipeMenu,
    Footer,
    Card
  }
}

</script>
<style lang="scss">
  .myhover:hover{
    background-color: rgba(208, 211, 212, .2);
    border-radius: 5px;
  } 
</style>