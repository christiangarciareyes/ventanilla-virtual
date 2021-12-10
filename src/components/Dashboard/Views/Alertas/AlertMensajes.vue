<template>
<div class="custom-templateOt">
  <div class="custom-template-icon">
    <i class="fa fa-home fa-2x"></i>
  </div>
  <div class="custom-template-content">
    <div class="custom-template-title fuente">
      <i style="color: #fff" class="fa fa-bell fa-2x m-b-20"></i>
      <i style="color: #fff" class="fa fa-times m-l-210" @click="oculAlert()"></i>
      <br>VENTANILLA JURISDICCIONAL
      <p class="fuente" align="justify" style="font-size: 12px; margin-right: 70px">Recuerda revisar tu bandeja de mensajes.<br><br>En esta bandeja mostraremos mensajes informativos como tambien de urgencia para nuestros usuarios.
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
      this.$notify({group: 'custom-template4', clean: true});
    }
  }
}
</script>