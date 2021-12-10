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
      <p class="fuente" align="justify" style="font-size: 12px; margin-right: 70px">Hola, esto es una alerta sobre la opción Escritos.<br><br>Lamentamos informarte que por el momento la opción para subir escritos se encuentra desactivada por motivos de mantenimiento. Se recomienda subir sus escritos por medio de nuestro sistema <a style="color: #fff; border-bottom: 1px solid #fff" href="#" class="fuente" @click="confi()">Mesa de Partes Virtual</a>. 
      <br><br>Disculpe las molestias y esperamos su comprensión.
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
      this.$notify({group: 'custom-template5', clean: true});
    },
    confi(){
      window.open("https://mesadepartes.sedetc.gob.pe", "_blank")
      //this.$router.push('/configuracion');
    }
  }
}
</script>