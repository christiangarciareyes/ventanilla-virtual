<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
        <card>
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-8">
          <h5 style="font-size: 18px" class="card-title">Vista de la Notificación</h5>
          <p class="card-category">Esta ventana muestra tu notificación enviada a tu correo electrónico.</p><br>
        </div>
        <div class="col-md-4">
          <button @click="retornar()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
        </div>
        </div> 
        </template>
          <div class="content">
           <template>
              <div class="row m-t-10 p-b-20">
              <div class="col-md-5 col-md-3">
                <label for="">Páginas</label>
                <div class="input-group">
                  <input class="form-control" :max="numPages" min="1" v-model.number="page" type="text" style="height:35px;" :disabled="show == false">
                  <input class="form-control" v-model="numPages" type="text" style="height:35px; background-color:#EAEDED;" disabled>
                  <button style="margin-left:10px; margin-right:8px;" @click="anterior" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
                  <button @click="siguiente" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button> 
                </div>
              </div>
              <div class="col-md-2"></div>
              <div class="col-md-5">
                  <label>Herramientas</label><br>
                  <button @click="rotate += 90" type="button" class="opciones-form-btn m-r-4 fuente" v-tooltip.top-center="tooltip.derecha" :disabled="show == false"><i class="fa fa-repeat"></i></button>
                  <button @click="rotate -= 90" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.izquierda" :disabled="show == false"><i class="fa fa-undo"></i></button>
              </div>
             </div>
              <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%
              </div>
              <pdf v-if="show" ref="pdf" style="border: 2px solid black" :src="pdfSrc" :page="page" :rotate="rotate"  @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event" loaded>
              </pdf>
        </template> 
        </div>
        <div style="background-color: #fff" class="footer" v-if="show">
          <hr>
          <div class="row">
          <div class="col-md-10">
          <div class="stats">
            <i class="fa fa-key"></i> Usted esta visualizando esta solicitud bajo los estándares de seguridad establecidos.<br><br>
          </div>
          </div>
          <div class="col-md-2">
          <button style="margin-left:10px; margin-right:8px" @click="siguiente" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button>                
          <button @click="anterior" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
          </div>
          </div>
          </div>
          </card>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import Card from 'src/components/UIComponents/Cards/Card'
import LTable from 'src/components/UIComponents/Tables/Table'
import axios from 'axios'
import pdf from 'vue-pdf'
import { Base64 } from 'js-base64'

import { actions } from "vuex";

var base64ToString = process.env.VUE_ENV === 'server' ? function(base64) { return Buffer.from(base64, 'base64').toString() } : window.atob;

  export default {
  data: function () {
    return {
      tooltip: 
      {
      derecha: 'Derecha',
      izquierda: 'Izquierda',
      siguiente: 'Siguiente',
      anterior: 'Anterior',
      },
      lists: [],
      elements: [],
      selected: null,
      nombrePdf: '', 
      pdfSrc: '',
      show: false,
      loadedRatio: 0,
      page: '',
      pages: 1,
      numPages: '',
      rotate: 0,
      idPersona: 0,
      options: [],
      error: ''
    }
  },
  mounted: function () {
     this.nomNoty = this.$store.state.itemNoty.ruta;
     this.exped = this.$store.state.itemNoty.expediente;
     this.expCod = this.$store.state.itemNoty.codigo;
     this.verPdf(); 
  },
  components: {
     LTable,
     Card,
     pdf
  },
  methods: { 
    retornar(){
      this.$router.go(-1);
    },
    verPdf: function () {
      if(this.nomNoty == null){
        this.$router.push('/casilla')
      }else{
      swal({
        title: "Cargando notificación",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false
      })
      this.pdfSrc = '';
      this.page = '';
      this.nombrePdf = this.nomNoty;
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/getPdf',
        {
        'path': this.nomNoty,
        'cnomUsuario': this.$session.get('user'),
        'cnumIp': this.$session.get('ip'),
        'cnomCiudad': this.$session.get('city'),
        'cnomPais': this.$session.get('country'),
        'ctxtInfo': this.exped,
        'ctxtInfo2': this.expCod
        }
        ).then((response) => {    
            var binaryVersionOfThePdf = '';
            this.pdfDesca = response.data;
            binaryVersionOfThePdf = base64ToString(response.data);
            this.pdfSrc =  {data: binaryVersionOfThePdf} 
            this.verifyPdf();
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
      }   
    },
    siguiente:function(){
    if(this.page < this.numPages){
       this.page = this.page + this.pages;
    } else {
      this.page= numPages;
    }
    },
    anterior:function(){
    if(this.page > 1){
       this.page = this.page - this.pages;
    } else {
      this.page= 1;
    }
    },
    successNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Documento disponible para visualizar!',
          type: 'success',
        });
    },
    infoNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Documento descargado correctamente!',
          type: 'info',
        });
    },
    warnNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, el documento PDF no existe!',
          type: 'error',
        });
    },
    verifyPdf(){
      if(this.pdfSrc.data == ''){
        this.page= ''; 
        this.show= false; 
        swal.close();
        this.warnNotification() 
      }else{
        this.page= 1; 
        this.show= true; 
        swal.close();
        this.successNotification() 
      }
    },
  }     
}
</script>