<template>
 <div class="container-fluid">
  <div class="content"><br>
    <b-card-group deck>
      <b-card border-variant="default" header-tag="header">
        <div style="border: 1px solid #D6DBDF">
          <h5 class="text-center m-t-15 m-b-15 detExp fuente2">{{ texto }}</h5>
        </div>
          <div class="row m-t-20 fuente">
          <div class="col-md-12">
              <label>Remitente</label>
              <b-form-textarea id="textarea1" class="imp-fue"
                  style="height:60px"
                  v-model="lists.cdesRemitentePj"
                  no-resize
                  :rows="50"
                  :max-rows="100"
                  disabled>
             </b-form-textarea><br>
          </div>
        </div>
          <div class="row">
          <div class="col-md-6">
              <label>N° de Expediente</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.cnumExpPj" disabled>
              <label>N° de Oficio Remitente</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.cnumOficioPj" disabled>
          </div>
          <div class="col-md-6">
              <label>Folios Anexos</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.cnumFoliosPj" disabled>
              <label>Fecha de Oficio</label>
              <input type="text" class="form-control imp-fue mb-3" v-model="lists.dfecOficioPj" disabled>
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
      texto: 'PROCEDENCIA (PJ)',
      lists: []
     }
    },
    mounted: function () { 
     this.idExp = this.$store.state.idExpParam;
     if(this.idExp != null){
      this.getProcedenciaPorExpediente();  
     }else{
      this.$router.push('/expedientes')
     }  
    },
    methods: {
    getProcedenciaPorExpediente: function(){
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/expediente/data/2',
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
              this.$store.dispatch("procedenciaNotification");
            }
         });
    }
  }
  }
</script>

<style> 
</style>