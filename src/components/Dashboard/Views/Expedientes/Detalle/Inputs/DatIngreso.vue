<template>
 <div class="container-fluid">
  <div class="content"><br>
    <b-card-group deck>
      <b-card border-variant="default" header-tag="header">
        <div style="border: 1px solid #D6DBDF">
          <h5 class="text-center fuente2 detExp">{{ texto }}</h5>
        </div>
        <div class="row m-t-20 fuente">
        <div class="col-md-6">
            <label>Tipo de proceso</label>
            <input type="text" class="form-control imp-fue mb-3" v-model="lists.cdesTipoProceso" disabled>
            <label>Sede de Origen</label>
            <input type="text" class="form-control imp-fue mb-3" v-model="lists.cdesSedeOrigen" disabled>
            <label>N° de Folios</label>
            <input type="text" class="form-control imp-fue mb-3" v-model="lists.ncntFolios" disabled>
        </div>
        <div class="col-md-6">
            <label>Fecha de Ingreso</label>
            <input type="text" class="form-control imp-fue mb-3" v-model="lists.dfecIngreso" disabled>
            <label>Procedencia</label>
            <input type="text" class="form-control imp-fue mb-3" v-model="lists.ctxtProcedencia" disabled>
            <label>N° de Anexos</label>
            <input type="text" class="form-control imp-fue mb-3" v-model="lists.ncntAnexos" disabled>
        </div>
      </div>
      </b-card>
    </b-card-group>
</div>
</div>
</template>

<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'

  import { actions } from "vuex";

  export default {       
    components: {
      Card
    },
    data () {
    return {
      texto: 'DATOS DE INGRESO',
      lists: []
     }
    },
    mounted: function () { 
     this.idExp = this.$store.state.idExpParam;
     if(this.idExp != null){
      this.getDatIngresoPorExpediente();  
     }else{
      this.$router.push('/expedientes')
     }
    },
    methods: {
    getDatIngresoPorExpediente: function(){
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/expediente/data/1',
          {
          'nidExpediente': this.$store.state.idExpParam,
          'cnomUsuario': this.$session.get('user'),
          'cnumIp': this.$session.get('ip'),
          'cnomCiudad': this.$session.get('city'),
          'cnomPais': this.$session.get('country'),
          'ctxt_info' : this.idPersona
          }
          ).then((response) => {
            this.lists = response.data; 
          },(error) => {
            if (error.response.status === 401) {
              this.$session.destroy();
              this.$router.push('/logout');
              this.$store.dispatch("tokenVencido");
            }else{
              swal.close();
              this.$store.dispatch("ingresoNotification");
            }
          });
    }
    }
  }
</script>

<style>	
</style>