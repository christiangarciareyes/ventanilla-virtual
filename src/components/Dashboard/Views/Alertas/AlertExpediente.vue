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
      <p class="fuente" align="justify" style="font-size: 12px; margin-right: 70px">Estás en la bandeja de expedientes.<br><br>Recuerda que deberás agregar tus correos electrónicos y números telefónicos de cada expediente que tengas asignado, para que puedas recibir notificaciones. Para ello deberás hacerlo en la opción <a style="color: #fff; border-bottom: 1px solid #fff" href="#" class="fuente" @click="confi()">Configuración</a>.
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
      this.$notify({group: 'custom-template3', clean: true});
    },
    confi(){
      this.$router.push('/configuracion');
    }
  }
}
</script>