<template>
<transition name="slide-fade">
<div class="wrapper">
    <div class="page-header" style="background-image: url('/static/img/cover.jpg')">
      <div class="content-center index">
      <div class="container">
      <div class="title-brand">
      <div class="wrap-logo m-t-15"> 
      <a href="https://www.tc.gob.pe" target="_blank">
        <img width="180" src="https://tc.gob.pe/intranet/iconos/imgLogoBlanco.png" alt="escudo"><br>
        <img width="250" src="https://tc.gob.pe/intranet/iconos/txtLogoBlanco.png" alt="escudo">
      </a><br>
      <!--
        <a><img src="https://tc.gob.pe/intranet/iconos/tc_logo_escudo.png" alt="escudo"></a>
        <a class="myPorta fuente m-l-5">TRIBUNAL CONSTITUCIONAL DEL PERÚ</a>
      -->
      </div>
      <h1 class="titulo m-t-60 m-b-20 fuente">Ventanilla Jurisdiccional del TC</h1>
      <p class="text-port fuente">Consulta tus expedientes de manera rápida, sencilla y segura. Ingresa al sistema para empezar!</p><br>
      <div class="row">
       <div class="col-md-6">
          <p align="center" class="text-porta fuente">Registro de Solicitud</p>
          <router-link to="/registrar">
            <button class="portada2-form-btn m-r-5 m-l-5 m-b-30">REGISTRAR</button>
          </router-link>
       </div>
       <!-- <div class="col-md-1 div_porta"></div> -->
       <div class="col-md-6">
          <p align="center" class="text-porta fuente">Acceso al Sistema</p>
          <router-link to="/login">
            <button class="portada-form-btn m-r-5 m-l-5 m-b-30">INGRESAR</button>
          </router-link>
      </div>
      </div>
      <div class="row">
      <div class="col-md-6">
          <p align="center" class="text-porta fuente">Consulta de Procesos Orgánicos</p>
          <router-link to="/consultar">
            <button class="portada3-form-btn m-r-5 m-l-5 m-b-30">CONSULTAR</button>
          </router-link>         
       </div>
       <div class="col-md-6">
          <p align="center" class="text-porta fuente">Consulta de Tutela de Derechos</p>
          <router-link to="/tutelas">
            <button class="portada4-form-btn m-r-5 m-l-5 m-b-30">CONSULTAR</button>
          </router-link>         
       </div>
      </div>
     <div class="footer-portada">
        <p class="fuente">COMPATIBLE CON</p>
        <i class="fa fa-chrome fa-2x m-r-30 m-l-20 m-b-20" v-tooltip.top-center="tooltip.chrome"></i>
        <i class="fa fa-firefox fa-2x m-r-30 m-b-20" v-tooltip.top-center="tooltip.firefox"></i>
        <i class="fa fa-edge fa-2x m-r-30 m-b-20" v-tooltip.top-center="tooltip.edge"></i>
        <i class="fa fa-safari fa-2x m-r-30 m-b-20" v-tooltip.top-center="tooltip.safari"></i>
        <i class="fa fa-android fa-2x m-r-30" v-tooltip.top-center="tooltip.android"></i>
        <!-- <i class="fa fa-apple fa-2x m-r-30" v-tooltip.top-center="tooltip.apple"></i> -->
        <br>
      </div>
   </div>
  </div>
    <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
      <!-- <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/PkOye4_wKlo?rel=0" allowfullscreen></b-embed> -->
      <b-embed type="iframe" aspect="16by9" src="https://ventanillajurisdiccional.sedetc.gob.pe/videos/ventanillavirtual.mp4" allowfullscreen></b-embed>
      <div class="container-form-btn m-t-10 m-b-10">
        <button @click="hide()" class="modalTuto-form-btn"><i class="fa fa-thumbs-o-up m-r-5"></i>VER MAS TARDE</button>
      </div>
    </modal>
  </div>
  </div>
  </div>
</transition>
</template>

<script>

export default {
  data () {
    return {
      tooltip: {
       chrome: 'Chrome 10.0+',
       firefox: 'Firefox 10.0+',
       edge: 'Microsoft Edge 10.0+',
       safari:'Safari 5.0+',
       android:'Jelly Bean 4.1+',
       apple:'iOS 7.0+'
      }
    }
  },
  mounted: function () {
    if(this.$store.state.tutorial == null){
      // this.$modal.show('tuto');
    }
    this.$notify({group: 'auth', clean: true});
    this.$notify({group: 'custom-template', clean: true});
    this.$notify({group: 'custom-template6', clean: true});
    if (!this.$session.exists()) {
      this.$router.push('/')
    } else {
      this.$router.push('/inicio')
    }  
  },
  methods: {
    hide () {
      this.$modal.hide('tuto');
    }
  }
}
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}
</style>
