<template>
  <div class="content">
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      <card v-if="carga">
      <template slot="header">
      <div class="row" style="border-bottom: 1px solid #D6DBDF">
      <div class="col-md-12">
        <h5 style="font-size: 18px" class="card-title fuente">{{ titulo }}</h5>
        <p class="card-category fuente">{{ texto }}</p><br>
      </div>
      </div> 
      </template>
      <div class="text-center p-signup__form-link fuente m-t-30">
          Estimado(a) <strong>{{ datosCompletos }}</strong>, usted ha completado su registro de solicitud correctamente.
        </div>
        <div class="p-signup__form-links">
          <div class="p-signup__form-link">
	        <a class="txt3 nounderline" href="#" style="color: #2E86C1;">
	         Recuerda revisar la bandeja de entrada de tu correo electrónico {{ ctxtCorreo }} ya que estaremos informándote por dicho medio.
	        </a>              
          </div>
        </div>
        <div class="container-form-btn m-t-50 m-b-30">
         <router-link :to="{path: '/regSolicitud'}">
          <button style="width:300px;" class="editar-form-btn fuente"><i class="fa fa-arrow-circle-left m-r-5"></i> VOLVER A REGISTRAR</button>
         </router-link>
        </div><br>
      </card>
    </div>
  </div>
 </div>
</div>
</template>

<script>

import axios from "axios";
import Card from "src/components/UIComponents/Cards/Card";

export default {
  name: 'solicitud',
  data: function() {
    return {
      name: 'solicitud',
      resultDatos: [],
      return: [],
      titulo: 'Proceso Finalizado',
      texto: 'El proceso de registro de su solicitud finalizó correctamente.',
      ctxtCorreo: '',
      cnumCelular: '',
      token: null,
      carga: false,
      datosCompletos: this.$session.get('nomUsuario')
    }
  },
  mounted: function() {
    this.cargaView();
  },
  methods: {
  	  cargaView(){
	  	this.token = window.location.hash.split("#/completSolicitud?")[1];
	    if(this.token == null){
		    if(this.$session.get('tokService') == 1){
		      this.obtenerDatos();
		    }else{
		      this.$router.push('/regSolicitud');
		    }
	    }else{
        if(this.$session.get('tokService') == 1){
          this.returnFirma();
        }else{
          this.$router.push('/regSolicitud');
        }
	    }
  	  },
  	  returnFirma: function(){
	     axios.post(this.$store.state.serverOfi + '/finaliza',
	     { 
	       ctxtToken: this.token
	     }
	     ).then((response) => {
	       this.return = response.data;
	       if(this.return.codRpta == 1){
	         this.obtenerDatos();
	       }else{
	         if(this.token != null){
	           this.$store.dispatch("alertaError");
	       }
	     }   
	     },(error) => {
	        if (error.response.status === 401) {
	          this.$session.destroy();
	          this.$router.push('/logout');
	          this.$store.dispatch("tokenVencido");
	        }else{
	          swal.close();
	          this.$store.dispatch("alertaError");
	        }
	     });    
      },
      obtenerDatos(){
        this.$store.dispatch("entregadoCorreo2");
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverCas2 + '/operaciones/persona/datos',
        { 
         'cnomUsuario':this.$session.get('user')
        }
        ).then((response) => {
          this.resultDatos = response.data;
          if(this.resultDatos.codRpta == 1){
            this.ctxtCorreo = this.resultDatos.ctxtCorreo;
            this.cnumCelular = this.resultDatos.ctxtCelular;
            this.$session.set('tokService', 0)
            this.carga = true;
          }else{
            this.errorNotification();
          }                 
        },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            swal.close();
            this.$store.dispatch("alertaError");
          }
        });
    },
    errorNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, no se obtuvieron los datos!',
          type: 'error',
      });
    },
  },
  components: {
    Card
  }
};
</script>