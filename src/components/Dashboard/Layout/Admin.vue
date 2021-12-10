<template>
<transition name="slide-fade">
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link v-for="item in listaOper" :to="item.enlaceWeb" :key="item.idOperacion">
        <i :class="item.icono"></i>
        <p class="fuente">{{item.descripcion}}</p>
        <span v-if="item.descripcion === 'Casilla Electrónica' && verNoty === true" class="form-wizard-c__step-alert m-l-5">+</span> 
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click="toggleSidebar">
      </dashboard-content>
      <content-footer></content-footer>
    </div>
      <span v-b-popover.hover="'¡Hola, envianos un comentario!'" class="settings-panel-control">
        <span class="pe-7s-light"></span>
      </span>
      <swipe-layout></swipe-layout>
  </div>
</transition>
</template>

<script>
  import TopNavbar from './Navbar/Navbar.vue'
  import ContentFooter from './Footer/Footer.vue'
  import DashboardContent from './Contenido/Content.vue'
  import MobileMenu from './Contenido/Mobile.vue'
  import SwipeLayout from './Contenido/Swipe.vue'

  import axios from 'axios'

  export default {
    data () {
     return {
      tooltip: 'Enviar Mensaje',
      tooltip2: 'Notificaciones Pendientes',
      listaOper: [],
      verNoty: false
     }
   },
   components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      SwipeLayout
   },
   mounted: function () {
     this.listaOper = this.$session.get('operUser');
     if(this.$session.get('contaNoty') >= 1){
       this.verNoty = true;
     }else{
       this.verNoty = false;
     }
   },
   methods: {
     toggleSidebar () {
       if (this.$sidebar.showSidebar) {
         this.$sidebar.displaySidebar(false)
       }
     }
   }
  }

</script>

<style lang="scss">

@import '/static/css/nucleo-icons.css';
@import '/static/css/pe-icon-7-stroke.css';
@import '/static/fonts/font-awesome/css/font-awesome.min.css';
@import '/static/css/font-family.css';
@import '/static/css/sweetalert2.css';
@import '/static/css/iconfont.css';
@import '/static/css/w3.css';

</style>
