<template>
  <nav class="navbar navbar-expand-lg">
    <!--
    <a style="color: #333" class="mobil fuente">TRIBUNAL CONSTITUCIONAL DEL PERÚ</a>
    <a style="color: #333" class="laptop fuente">TC</a>
    -->
    <a class="mobil nounderline" href="https://www.tc.gob.pe" target="_blank">
      <img src="https://tc.gob.pe/intranet/iconos/txtLogoRojo.png" alt="escudo">
      <!--<img src="https://tc.gob.pe/intranet/iconos/admin-text-dark.png" alt="tribunal"/>-->
    </a>
    <a class="laptop nounderline m-r-20" href="https://www.tc.gob.pe" target="_blank">
      <img src="https://tc.gob.pe/intranet/iconos/txtRecorteRojo.png" alt="escudo">
    </a>
      <button type="button"
              class="navbar-mytoggler navbar-mytoggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-mytoggler-bar burger-lines"></span>
        <span class="navbar-mytoggler-bar burger-lines"></span>
        <span class="navbar-mytoggler-bar burger-lines"></span>
      </button>
      <!-- <div class="collapse navbar-collapse justify-content-end"> -->
      <div class="justify-content-end mynav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i style="font-size: 20px" class="nc-icon nc-single-02"></i>
              <span class="d-lg-block fuente p-t-3" style="text-transform: uppercase;">&nbsp;{{ name }}</span>
            </a>
          </li>
<!--          
          <router-link to="/mensajes">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i style="font-size: 25px" class="nc-icon pe-7s-chat"></i>
              <span class="d-lg-block fuente p-t-6 p-l-15">MENSAJES</span>
              <span class="form-wizard-c__step-nav m-l-3">8</span>
            </a>
          </li>
          </router-link>
-->
          <router-link to="/mensajes">
          <li class="nav-item">
            <a href="#" class="nav-link" style="color: #FF6700">
              <i style="font-size: 25px" class="nc-icon pe-7s-chat"></i>
              <span class="d-lg-block fuente p-t-6 p-l-6">MENSAJES</span>
            </a>
          </li>
          </router-link>
          <router-link to="/modPassword">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <!--<i class="nc-icon nc-lock-circle-open"></i>-->
              <i style="font-size: 20px" class="nc-icon pe-7s-lock"></i>
              <span class="d-lg-block fuente p-t-3">&nbsp;CONTRASEÑA</span>
            </a>
          </li>
          </router-link>
          <li class="nav-item" @click="cerrarSesion()">
            <a href="#" class="nav-link">
              <i style="font-size: 20px" class="nc-icon pe-7s-power"></i>
              <span class="d-lg-block fuente p-t-3">&nbsp;SALIR</span>
            </a>
          </li>
        </ul>
      </div>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        activeNotifications: false,
        name: this.$session.get('nomUsuario'),
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
         this.$router.push('/logout')
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      changeloading () {
        this.$store.commit('TOGGLE_SEARCHING')
      },
      cerrarSesion: function () {
        swal({
          title: "¿Desea salir del sistema?",
          text: "Cerrará sesión en la Ventanilla Jurisdiccional",
          icon: "warning",
          buttons: ["No", "Si"],
          closeOnClickOutside: false,
        })
        .then((value) => {
          if(value == true){
          this.$store.state.logout = this.$session.get('logout');
          this.$session.destroy()
          this.$router.push('/logout')
          this.infoNotification()
          }else{}
        });
      },
      infoNotification() {
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Sesión cerrada exitosamente!',
          type: 'info',
        });
      }
    }
  }

</script>
<style lang="scss">
</style>
