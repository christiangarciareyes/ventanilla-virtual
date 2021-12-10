<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-8">
          <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
          <p class="card-category">Esta ventana muestra todos los datos del expediente y los actos procesales del mismo.</p><br>
        </div>
        <div class="col-md-4">
          <button @click="$router.go(-1)" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
        </div>
        </div> 
        </template>
       <div class="row m-t-10">
       <div class="col-md-12">
       <vue-tabs>
        <v-tab title="DATOS DEL EXPEDIENTE">
          <div class="row">
           <div class="col-md-12">
              <DatIngreso>
              </DatIngreso>
           </div>
         </div>
          <div class="row">
           <div class="col-md-12">
              <Procedencia>
              </Procedencia>
           </div>
         </div>
         <div class="row">
           <div class="col-md-12">
              <Resolucion>
              </Resolucion>
           </div>
         </div>
         <div class="row">
           <div class="col-md-12">
              <Estado>
              </Estado>
           </div>
         </div>
        </v-tab>
        <v-tab title="ACTOS PROCESALES">
         <div class="row">
           <div class="col-md-12">
              <VistaCausa>
              </VistaCausa>
           </div>
         </div>
          <div class="row">
           <div class="col-md-12">
              <Resoluciones>
              </Resoluciones>
           </div>
         </div>
         <div class="row">
           <div class="col-md-12">
              <Notificaciones>
              </Notificaciones>
           </div>
         </div> 
        </v-tab>
      </vue-tabs><br>
      </div>
  </div>
  </card>
</div>
</div>

</template>

<script>

  import axios from 'axios'

  import Card from 'src/components/UIComponents/Cards/Card'
  import DatIngreso from 'src/components/Dashboard/Views/Expedientes/Detalle/Inputs/DatIngreso'
  import Estado from 'src/components/Dashboard/Views/Expedientes/Detalle/Inputs/Estado'
  import Procedencia from 'src/components/Dashboard/Views/Expedientes/Detalle/Inputs/Procedencia'
  import Resolucion from 'src/components/Dashboard/Views/Expedientes/Detalle/Inputs/Resolucion'
  import VistaCausa from 'src/components/Dashboard/Views/Expedientes/Detalle/Tablas/VistaCausa'
  import Resoluciones from 'src/components/Dashboard/Views/Expedientes/Detalle/Tablas/Resoluciones'
  import Notificaciones from 'src/components/Dashboard/Views/Expedientes/Detalle/Tablas/Notificaciones'

  import { actions } from "vuex";

  export default {
    components: {
      Card,
      DatIngreso,
      Estado,
      Procedencia,
      Resolucion,
      VistaCausa,
      Resoluciones,
      Notificaciones
    },
    data () {
    return {
      texto: 'Detalle del expediente',
      lists: [],
      idPersona: 0,
      idExpPar: null
     }
    },
    mounted: function () { 
     this.$store.state.alerts = 0;
     this.$store.state.idSolicitud = null;
     this.$store.state.numServicio = null; 
     this.idPersona = this.$session.get('idPersona'); 
     this.idExpPar = this.$store.state.idExpParam;
    },
  }

</script>