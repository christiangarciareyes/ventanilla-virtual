<template>
 <div class="container-fluid">
  <div class="content"><br>
    <b-card-group deck>
        <b-card border-variant="default" header-tag="header">
        <div style="border: 1px solid #D6DBDF">
          <h5 class="text-center m-t-15 m-b-15 detExp fuente2">{{ texto }}</h5>
        </div>
          <div class="row m-t-20 fuente">
          <div class="col-md-6">
              <label>Sentido</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.cdesSentido" disabled>
              <label>N° de Oficio Devuelve</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.ctxtReferenciaDevPj" disabled>
          </div>
          <div class="col-md-6">
              <label>Fallo</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.cdesFallo" disabled>
              <label>Fecha de Oficio</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.dfecDevolPj" disabled>
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

  export default {
    components: {
      Card
    },
    data () {
    return {
      texto: 'RESOLUCIÓN FINAL EN EL TC',
      lists: []
     }
    },
    mounted: function () { 
     this.idExp = this.$store.state.idExpParam;
     if(this.idExp != null){
      this.getResolucionPorExpediente();  
     }else{
      this.$router.push('/expedientes')
     }  
    },
    methods: {
    getResolucionPorExpediente: function(){
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/expediente/data/3',
          {
          'nidExpediente': this.$store.state.idExpParam
          }
          )
          .then((response) => {
            this.lists = response.data; 
          },(error) => {
            if (error.response.status === 401) {
              this.$session.destroy();
              this.$router.push('/logout');
              this.$store.dispatch("tokenVencido");
            }else{
              swal.close();
              this.$store.dispatch("resolucionNotification");
            }
          });
    }
  }
  }
</script>

<style> 
</style>