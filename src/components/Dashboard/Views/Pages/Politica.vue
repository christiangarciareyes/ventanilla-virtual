<template>
  <div class="content">
  <div class="container-fluid">
  <card>
  <div class="wrappe spotlight">
  <div class="m-home-center__section2 m-t-20">
    <header class="special contentIcon">
      <span class="m-home-center__section-icon pe-7s-notebook"></span><br>
    </header>
    <a style="text-decoration:none;" class="m-home-center__section-name">{{titulo}}</a>
    <div class="m-home-center__section-desc">
    <br>Infórmate sobre nuestra política de uso y seguirdad en la Ventanilla Jurisdiccional.<br>
    </div>
  </div>
    <div class="m-l-10 m-r-10">
    <div class="inner">
    <a href="#" class="image"><img src="static/img/pic02.jpg" alt="" /></a>
    <div class="content">
    <div class="m-task__desc">
      <div class="m-task__desc-header">
        <h3 class="m-task__desc-heading p-t-5 p-b-5 fuente2">INTRODUCCIÓN</h3>
      </div>
      <div class="m-task__desc-text fuente" align="justify">
        El Tribunal Constitucional del Perú (TC) pone a disposición del administrado un servicio de información denominado "Ventanilla Jurisdiccional", en la cual se podrán registrar todos los interesados que  tengan un proceso en trámite en el TC, los que podrán consultar información relacionada al estado situacional del expediente, lectura del cuadernillo digitalizado, notificaciones de movimientos del expediente por correo electrónico y/o teléfono móvil, entre otros aspectos. El acceso a estas consultas está regulado por la presente Política, Términos de Uso del Portal así como por la Ley No. 30096, sobre "Ley de Delitos Informáticos".</div>
    </div>
    <div class="m-task__desc">
      <div class="m-task__desc-header">
        <h3 class="m-task__desc-heading p-t-5 p-b-5 fuente2">OBJETIVOS</h3>
      </div>
      <div class="m-task__desc-text fuente" align="justify">
        Regular el uso adecuado de los recursos de información que se disponen en la Ventanilla Jurisdiccional del Tribunal Constitucional.</div>
    </div>
    </div>
    </div>
   </div>
  </div>
    <div class="m-l-10 m-r-10">
    <div class="m-task__desc">
      <div class="m-task__desc-header">
        <h3 class="m-task__desc-heading p-t-5 p-b-5 fuente2">ALCANCE</h3>
      </div>
      <div class="m-task__desc-text fuente" align="justify">
        Todos los usuarios que requieran acceso, se encuentren registrados y/o utilizan la Ventanilla Jurisdiccional del Tribunal Constitucional.</div>
    </div>
    <div class="m-task__desc">
      <div class="m-task__desc-header">
        <h3 class="m-task__desc-heading p-t-5 p-b-5 fuente2">REQUISITOS PARA REGISTRARSE COMO USUARIO</h3>
      </div>
      <div class="m-task__desc-text fuente m-t-15" align="justify">
       <ul class="m-l-20">
        <li>Poseer una cuenta de correo electrónico activa.</li>
        <li>Poseer un documento de identidad.</li>
        <li>Contar con trámite vigente en el Tribunal Constitucional.</li>
       </ul>
      </div>
    </div>
    <div class="m-task__desc">
      <div class="m-task__desc-header">
        <h3 class="m-task__desc-heading p-t-5 p-b-5 fuente2">REQUISITOS PARA EL ACCESO</h3>
      </div>
      <div class="m-task__desc-text fuente m-t-15" align="justify">
      <ul class="m-l-20">
        <li>Completar el formulario de "Solicitud de Acceso a la Ventanilla Jurisdiccional" según con los requerimientos detallados en el "Instructivo para registro de usuarios de Ventanilla Jurisdiccional".</li>
        <li>Solicitud aprobada por la Secretaría Relatoría del Tribunal Constitucional.</li>
      </ul>
      </div>
    </div>
    <div class="m-task__desc">
      <div class="m-task__desc-header">
        <h3 class="m-task__desc-heading p-t-5 p-b-5 fuente2">USO DE LAS CUENTAS Y CLAVES DE LOS USUARIOS</h3>
      </div>
      <div class="m-task__desc-text fuente m-t-15 m-b-30" align="justify">
        <ul class="m-l-20">
         <li>Está prohibido a los Usuarios, ceder bajo cualquier motivo, su cuenta de usuario y clave de acceso a la Ventanilla Jurisdiccional.</li> 
         <li>Todas las actividades y consultas realizadas en la Ventanilla Jurisdiccional, serán registradas y monitoreadas continuamente.</li>
         <li>Las contraseñas de las cuentas de usuarios tienen una vigencia de 60 días calendarios, por lo que deberán cambiarlas a partir de cuando reciban su notificación de vencimiento.</li>
         <li>En caso que el Tribunal Constitucional detecte un mal uso de las cuentas de usuario, se reserva el derecho de bloquear la cuenta, comunicando al usuario de dicha acción realizada. Si así sucediera, el usuario tendrá que realizar el trámite de "Reactivación de Acceso a la Ventanilla Jurisdiccional".</li>
        </ul>
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
  name: 'politica',
  data () {
    return {
      titulo: 'POLÍTICA DE USO Y SEGURIDAD'
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
