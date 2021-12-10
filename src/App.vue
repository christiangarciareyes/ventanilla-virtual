<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications group="custom-template" position="top right" animation-type="velocity">
      <template slot="body" slot-scope="props">
       <AlertRegistro></AlertRegistro>
      </template>
    </notifications>
    <notifications group="custom-template2" position="top left" animation-type="velocity">
      <template slot="body" slot-scope="props">
       <AlertInicio></AlertInicio>
      </template>
    </notifications>
    <notifications group="custom-template4" position="top right" animation-type="velocity">
      <template slot="body" slot-scope="props">
       <AlertMensajes></AlertMensajes>
      </template>
    </notifications>
    <notifications group="custom-template3" position="top right" animation-type="velocity">
      <template slot="body" slot-scope="props">
       <AlertExpediente></AlertExpediente>
      </template>
    </notifications>
    <notifications group="custom-template5" position="top center" animation-type="velocity">
      <template slot="body" slot-scope="props">
       <AlertSubidas></AlertSubidas>
      </template>
    </notifications>
    <notifications group="custom-template6" position="top center" animation-type="velocity">
      <template slot="body" slot-scope="props">
       <AlertInicio2></AlertInicio2>
      </template>
    </notifications>
    <notifications group="auth" position="top left" animation-name="v-fade-left"></notifications>
    <router-view></router-view>
  </div>
</template>

<script>

import AlertSubidas from 'src/components/Dashboard/Views/Alertas/AlertSubidas.vue'
import AlertExpediente from 'src/components/Dashboard/Views/Alertas/AlertExpediente.vue'
import AlertRegistro from 'src/components/Dashboard/Views/Alertas/AlertRegistro.vue'
import AlertMensajes from 'src/components/Dashboard/Views/Alertas/AlertMensajes.vue'
import AlertInicio from 'src/components/Dashboard/Views/Alertas/AlertInicio.vue'
import AlertInicio2 from 'src/components/Dashboard/Views/Alertas/AlertInicio2.vue'

export default {
  components: {
     AlertSubidas,
     AlertExpediente,
     AlertRegistro,
     AlertInicio,
     AlertInicio2,
     AlertMensajes
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
