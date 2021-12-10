<template>
  <div class="content">
  <div class="container-fluid">
  <card>
  <div class="m-home-center__section2 m-t-20">
    <header class="special contentIcon">
      <span class="m-home-center__section-icon pe-7s-help1"></span><br>
    </header>
    <a style="text-decoration:none;" class="m-home-center__section-name">{{titulo}}</a>
    <div class="m-home-center__section-desc">
    <br>Aprende de la Ventanilla Jurisdiccional con nuestro video instructivo.<br>
    </div>
  </div>
  <div class="row m-t-30 m-b-10">
    <div class ="col-md-2"></div>
    <transition name="fade" mode="out-in">
    <div class ="col-md-8">
      <b-embed type="iframe" aspect="16by9" src="https://ventanillajurisdiccional.sedetc.gob.pe/videos/ventanillavirtual.mp4" allowfullscreen></b-embed>
    </div>
    </transition> 
  </div><br>
  </card>
</div>
</div>
</template>
<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
  name: 'help',
  data () {
    return {
      titulo: 'AYUDA PARA USO DEL SISTEMA'
    }
  },
  mounted: function () {
    this.limpiarParam();
  },
  methods: {
    limpiarParam(){
      this.$store.state.itemNoty = [];
      this.$store.state.adjEscrito = [];
      this.$store.state.contadorFile = 0;
      this.$store.state.sumiEscrito = ''; 
      this.$store.state.conteEscrito = ''; 
      this.$store.state.expEscrito = null;
      this.$store.state.nidEscrito = null;
      this.$store.state.segEscrito = null;
      this.$store.state.newEscrito = null;
      this.$store.state.idExpParam = null;
      this.$store.state.idExpParam2 = null;
      this.$store.state.idExpParam3 = null;
      this.$store.state.numExpParam = null;
      this.$store.state.numExpParam2 = null;
      this.$store.state.numServicio = null;
      this.$store.state.nomSolicitud = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.partEscrito = null;
      this.$store.state.tipoParte = null;
      this.$store.state.pagTableFormPre = null;
      this.$store.state.pagTableFormNot = null;
      this.$store.state.pagTableFormAut = null;
      this.$store.state.pagTableFormExp = null;
      this.$store.state.pagTableFormRev = null;
      this.$store.state.pagTableFormAnu = null;
      this.$notify({group: 'auth', clean: true});
      this.$notify({group: 'custom-template2', clean: true});
      this.$notify({group: 'custom-template3', clean: true});
      this.$notify({group: 'custom-template4', clean: true});
    }
  },
  components: {
      Card
  }
}
</script>
 
<style lang="scss">
</style>