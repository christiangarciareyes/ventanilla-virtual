<template>
  <transition name="slide-fade">
  <div class="limiter">
    <div class="container-login100 fuente">
      <Logo></Logo>
      <div class="wrap-login100"> 
      <div class="wrap-logo"> 
      <a href="https://www.tc.gob.pe" target="_blank">
        <img src="https://tc.gob.pe/intranet/iconos/imgLogoRojo.png" alt="escudo"><br>
        <img src="https://tc.gob.pe/intranet/iconos/txtLogoRojo.png" alt="escudo">
      </a><br>
      </div>
      <span class="login100-form-title m-t-30 fuente">
        Sesión Cerrada
      </span>
      <div class="wrap-input200 m-b-20"></div>
        <form class="login100-form validate-form">
          <div class="text-logout">
             <p class="txt3">
              Ha cerrado sesión correctamente en la<br> 
              Ventanilla Jurisdiccional del Tribunal Constitucional.
             </p>
          </div>
          <div class="wrap-input200 m-b-5"></div>
          <div class="container-form-btn">
           <router-link to="/">
            <br><button class="logout-form-btn fuente"><i class="fa fa-reply"></i> REGRESAR</button>
           </router-link>
          <div class="text-center p-t-30 p-b-20">
            <p class="txt4">
              Jr. Ancash N° 390 Cercado de Lima - Lima.<br>
              Calle Misti N° 102 Yanahuara - Arequipa.<br>
              Atención: Lunes a Viernes de 8:15 a 16:45<br>
              Copyright - Todos los derechos reservados.<br>
              No recomendado para Internet Explorer. 
            </p>
          </div>
         </div>
        </form>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>

import Logo from "src/components/Dashboard/Layout/Textual/Logo";

export default {
    data () {
    return {
      segSis: this.$store.state.logout
    }
  },
  mounted: function () {
    this.$notify({group: 'custom-template', clean: true});
    this.$notify({group: 'custom-template2', clean: true});
    this.$notify({group: 'custom-template3', clean: true});
    this.$notify({group: 'custom-template4', clean: true});
    if (!this.$session.exists()) {
      if(this.segSis == 'P'){
        this.$router.push('/logout')
        this.$store.state.logout = null;
      }else{
        this.$router.push('/login')
      }
    } else {
      this.$router.push('/inicio')
    }  
  },
    components: {
     Logo
  }
}
</script>
<style lang="css">
</style>