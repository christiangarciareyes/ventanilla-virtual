<template>
  <ul style="margin-top: 10px;" class="nav nav-mobile-menu">
    <li class="nav-item">
      <a href="#" class="nav-link">
        <i class="nc-icon nc-single-02 m-b-15"></i><br>
        <span class="d-lg-block fuente"> {{ demo.name }}</span>
      </a>
    </li>
    <router-link to="/mensajes">
    <li class="nav-item">
      <a href="#" class="nav-link">
        <i class="pe-7s-chat"></i>
        <span class="d-lg-block fuente"> MENSAJES</span>
<!--        
        <span class="form-wizard-c__step-alert m-l-5">8</span>
-->
      </a>
    </li>
    </router-link>
    <router-link to="/modPassword">
    <li class="nav-item">
      <a href="#" class="nav-link">
        <i class="pe-7s-lock"></i>
        <span class="d-lg-block fuente"> Contraseña</span>
      </a>
    </li>
    </router-link>
    <li class="nav-item" @click="cerrarSesion()">
      <a href="#" class="nav-link">
        <i class="pe-7s-power"></i>
        <span class="d-lg-block fuente"> Salir</span>
      </a>
    </li>
  </ul>
</template>
<script>
  import DropDown from 'src/components/UIComponents/Dropdown/Dropdown'

  export default {
    components: {
      DropDown
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
         this.$router.push('/logout')
    }
    },
    methods: {
      cerrarSesion: function () {
        swal({
          title: "¿Desea salir del sistema?",
          text: "Cerrara sesión en la Ventanilla Jurisdiccional",
          icon: "warning",
          buttons: ["No", "Si"],
          closeOnClickOutside: false,
          })
          .then((value) => {
            if(value == true){
            this.$session.destroy()
            this.$router.push('/logout')
            }else{}
          });
      },
      infoNotification() {
        notify({
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Sesión cerrada exitosamente!',
          type: 'info',
        });
    }
    },
    computed: {
      demo () {
      return {
        name: this.$session.get('nomUsuario')
      }
      }
    },
  }

</script>

<style>
</style>
