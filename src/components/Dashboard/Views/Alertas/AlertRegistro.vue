<template>
<div class="custom-template">
  <div class="custom-template-icon">
    <i class="fa fa-home fa-2x"></i>
  </div>
  <div class="custom-template-content">
    <div class="custom-template-title fuente">
      <i style="color: #fff" class="fa fa-bell fa-2x m-b-20"></i>
      <i style="color: #fff" class="fa fa-times m-l-210" @click="oculAlert()"></i>
      <br>VENTANILLA JURISDICCIONAL
      <p class="fuente" align="justify" style="font-size: 12px; margin-right: 70px">Hola, bienvenido al sistema de la Ventanilla Jurisdiccional del TC.<br><br>Recuerda que si ya cuentas con tus credenciales para acceder a la Ventanilla Jurisdiccional, deberás ingresar al sistema para registrar tus nuevas solicitudes de acceso a tus expedientes.
      </p>
    </div>
    <div class="custom-template-text"></div>
  </div>
  <div class="custom-template-close">
  </div>
</div>
</template>

<script>

export default {
  methods: {
    oculAlert(){
      this.$notify({group: 'custom-template', clean: true});
    }
  }
}
</script>
