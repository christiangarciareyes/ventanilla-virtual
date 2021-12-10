<template>
  <div class="content">
  <div class="container-fluid">
  <card>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333; font-family:'Raleway';"
                controls
                indicators
                background="#ababab"
                :interval="3000"
                img-width="1170"
                img-height="529"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">   
      <b-carousel-slide
        img-src="static/img/expediente.jpg">
        <h3 class="fuente">Expedientes</h3>
        <h4 class="fuente">Consulta tus expedientes y realiza su seguimiento.</h4>
      </b-carousel-slide>
      <b-carousel-slide
        img-src="static/img/cuadernillo.jpg">
        <h3 class="fuente">Cuadernillo</h3>
        <h4 class="fuente">Visualiza los cuadernillos digitales de tus expedientes.</h4>
      </b-carousel-slide>
      <b-carousel-slide
        img-src="static/img/casilla.jpg">
        <h3 class="fuente">Casilla</h3>
        <h4 class="fuente">Mantente alerta con las notificaciones que te enviemos.</h4>
      </b-carousel-slide>
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" 
             height="480" src="static/img/escrito.jpg" alt="image slot">
        <h3 class="fuente">Escritos</h3>     
        <h4 class="fuente">Presenta tus escritos de manera online, confiable y segura.</h4>
      </b-carousel-slide>
    </b-carousel>
    <div class="container-fluid">
    <div class="row m-t-30">
    <div class="col-md-4 m-t-10 m-b-20" v-if="item.adIcono != ''" v-for="item in listaOper" :key="item.idOperacion">
      <div class="m-home-center__section">
        <router-link style="text-decoration:none;" :to="item.enlaceWeb">
        <span :class="item.adIcono"></span><br>
        <a style="text-decoration:none;" href="#" class="m-home-center__section-name">{{item.adTitulo}}</a>
        </router-link>
        <div class="m-home-center__section-desc">
        <br>{{item.adDescripcion}}<br><br>
        </div>
      </div>
    </div>   
    </div>
   </div>
   <div class="m-home-center__content-heading m-t-10 instruc">
    <i style="font-size: 80px; color: #fff" class="pe-7s-culture m-t-30 m-b-5"></i>
    <h2 class="fuente regEstilo4 m-t-20" align="center">Política y ayuda del sistema</h2>
    <p class="fuente regEstilo2 m-t-20 m-b-40 m-l-30 p-r-30" align="center">Visualiza la política de uso y seguridad del sistema, como tambien el video instructivo que hemos preparado para ti y tu uso de la Ventanilla Jurisdiccional de TC.</p>
   <div class="row">
    <div class="col-md-12 m-b-20">
     <router-link to="/politica">
      <button style="width:250px;" class="inicio-form-btn fuente m-l-15 m-r-15 m-b-15"><i class="fa fa-bookmark"></i> VER POLÍTICA</button>
     </router-link>
     <router-link to="/help">
      <button style="width:250px;" class="inicio-form-btn fuente m-l-15 m-r-15 m-b-15"><i class="fa fa-question-circle"></i> IR A AYUDA</button>
     </router-link>
    </div>
   </div>
  </div>
  <div class="row">
  <div class="col-md-2"></div>
  <div class="col-md-8">
  <div class="m-home-center__submit m-b-30">
   <div class="row"> 
    <div class="col-md-2 m-t-14">
      <span class="m-home-center__submit-icon2 pe-7s-box2"></span><br><br>
    </div> 
    <div class="col-md-10 m-t-10"> 
      <div class="fuente" align="justify">{{ parrafo }}</div>
    </div> 
   </div>  
  </div>
  </div>
  </div>
 </card>
</div>
</div>
</template>
<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
  name: 'inicio',
  data () {
    return {
      texto: 'Bienvenidos a la Plataforma Web de la Ventanilla Jurisdiccional del Tribunal Constitucional',
      titulo: 'CONSULTA TUS EXPEDIENTES Y DOCUMENTOS',
      parrafo: 'El sistema web de la Ventanilla Jurisdiccional te permité acceder a tus expedientes desde cualquier lugar de manera rápida, sencilla y segura. Puedes consultar la lista de expedientes en las cuales estas asignado como tambien revisar los fólios e incluso el cuadernillo completo de tus expedientes. Actualiza tus datos principales como correo y celular para mantenerte registrado de manera correcta en la base de datos y recibir todo tipo de notificaciones de la institución del TC.',
      slide: 0,
      sliding: null,
      listaOper: []
    }
  },
  mounted: function () {
    this.listaOper = this.$session.get('operUser');
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
      this.$store.state.partEscrito = null;
      this.$store.state.tipoParte = null;
      this.$store.state.pagTableFormPre = null;
      this.$store.state.pagTableFormNot = null;
      this.$store.state.pagTableFormAut = null;
      this.$store.state.pagTableFormExp = null;
      this.$store.state.pagTableFormRev = null;
      this.$store.state.pagTableFormAnu = null;
      this.$store.state.nomSolicitud = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.idExpParam = null;
      this.$store.state.idExpParam2 = null;
      this.$store.state.idExpParam3 = null;
      this.$store.state.numExpParam = null;
      this.$store.state.numExpParam2 = null;
      this.$store.state.numServicio = null;
      this.$notify({group: 'auth', clean: true});
      this.$notify({group: 'custom-template3', clean: true});
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  components: {
      Card
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
