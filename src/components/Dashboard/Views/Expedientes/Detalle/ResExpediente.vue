<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
        <card>
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-8">
          <h5 style="font-size: 18px" class="card-title">Resumen del expediente</h5>
          <p class="card-category">Esta ventana muestra el resumen digital del expediente con ciertas funcionalidades.</p><br>
        </div>
        <div class="col-md-4">
          <button @click="$router.go(-1)" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
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
                      <button @click="abrirPdf()" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.abrir" :disabled="show == false"><i class="fa fa-external-link"></i></button>
                      <button @click="descargarPdf()" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.descargar" :disabled="show == false"><i class="fa fa-download"></i></button>
                      <button @click="imprimirPdf()" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.imprimir" :disabled="show == false"><i class="fa fa-print"></i></button>
                  </div>
                 </div>
                  <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%
                  </div>
                  <pdf v-if="show" ref="pdf" style="border: 2px solid black" :src="pdfSrc" :page="page" :rotate="rotate"  @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event" loaded>
                  </pdf>
            </template> 
        </div>
        <div style="background-color: #fff" class="footer m-b-10" v-if="show">
          <hr>
          <div class="row">
          <div class="col-md-10">
          <div class="stats">
            <i class="fa fa-key"></i> Usted esta visualizando este expediente bajo los estándares de seguridad establecidos.<br><br>
          </div>
          </div>
          <div class="col-md-2">
          <button style="margin-left:10px; margin-right:8px" @click="siguiente" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button> <button @click="anterior" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
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
      folios: 'Ver Folios',
      derecha: 'Derecha',
      izquierda: 'Izquierda',
      descargar: 'Descargar',
      contraer: 'Contraer',
      ampliar: 'Ampliar',
      siguiente: 'Siguiente',
      anterior: 'Anterior',
      imprimir: 'Imprimir',
      abrir: 'Abrir'
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
      options: [],
      idExpPar: null,
      error: '',
      exp: {
        idExpediente: null
      }
    }
  },
  mounted: function () {
     this.$store.state.alerts = 0;
     this.$store.state.idSolicitud = null; 
     this.$store.state.numServicio = null; 
     this.idExpPar = this.$store.state.idExpParam;
     this.getDatResumenExpediente(); 
  },
  components: {
     LTable,
     Card,
     pdf
  },
  methods: { 
    getDatResumenExpediente: function(){
      if(this.$store.state.idExpParam == null){
         this.$router.push('/expedientes')
      }else{
        swal({
          title: "Cargando documento",
          text: "Espere por favor...",
          buttons: false,
          dangerMode: true,
          icon: "static/img/loader.gif",
          closeOnClickOutside:false
        })
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/expediente/id',
        {
        'nidExpediente': this.idExpPar
        }
        )
        .then((response) => { 
          this.lists = response.data;
          this.fecha = this.lists.dfecha;
          this.hora = this.lists.dhora;
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/cuadernillo/movresumen',
          {
          'nidExpediente': this.idExpPar,
          'cnomUsuario': this.$session.get('user'),
          'cnumIp': this.$session.get('ip'),
          'cnomCiudad': this.$session.get('city'),
          'cnomPais': this.$session.get('country'),
          'ctxt_info': this.lists.cnumExpediente
          }
          ).then((response) => { 
            this.elements = response.data;
            this.createPdf();
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
    descargarPdf: function (){
      var fileName = this.lists.cnumExpediente;
      pdfMake.createPdf(this.documento).download(fileName);
      this.infoNotification();
    },
    imprimirPdf: function (){
      pdfMake.createPdf(this.documento).print();
    },
    abrirPdf: function (){
      pdfMake.createPdf(this.documento).open();
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
    createPdf(){
      var dataTable = this.elements;
      var bodyDocument = [];
      bodyDocument.push([{text: 'TIPO DE DOCUMENTO', fillColor:'#CCCCCC', alignment: 'center', width: 100, margin: [10, 10, 10, 10]},
      {text: 'DESCRIPCIÓN', fillColor:'#CCCCCC', alignment: 'center', margin: [10, 10, 10, 10]}]);
      for (var key in dataTable)
      {
        if (dataTable.hasOwnProperty(key))
        {
          var ctxtTipodocumento = dataTable[key]; 
          var ctxtDetalle = dataTable[key]; 
          var fila = new Array();
          fila.push(ctxtTipodocumento.ctxtTipodocumento.toString() ,ctxtDetalle.ctxtDetalle.toString());
          bodyDocument.push(fila);
        }
      }
      var userWater = this.$session.get('user');
      var entidad = 'TRIBUNAL CONSTITUCIONAL DEL PERÚ';
      var usuario = this.$session.get('nomUsuario');
      var expediente = this.lists.cnumExpediente;
      var greeting = entidad + '\n' + usuario + '\n' + 'EXPEDIENTE N° ' + expediente;
      var docDefinition = {
      watermark: {text: userWater, color: 'blue', opacity: 0.3, bold: true, italics: true },
         footer: function(currentPage, pageCount) {
             return {
               text: currentPage.toString() + ' de ' + pageCount,
               alignment: 'center',
               fontSize: 8,
               margin: [250, 20]
             }
         },
         header: {
             columns: [
              {
                width: 1200,
                height: 50,
                fontSize: 8,
                margin: [500, 10],
                text: [
                "Fecha  : " + " " + this.fecha + "\n",
                "Hora    : " + " " + this.hora
              ]
              },
              ]
         },
         content: [
              {
                columns: [
                  {   
                   width: 200,
                   stack: [
                   {
                     text: 'TRIBUNAL CONSTITUCIONAL DEL PERÚ', style: 'subheader'
                   },
                   {
                     text: 'VENTANILLA JURISDICCIONAL', style: 'subheader', color: 'gray' 
                   },
                   ]
                  },
                  {
                   width: 270,
                   text: ''
                  },
                  {
                   width: 50,
                   qr: greeting, fit: 60, alignment: 'right'
                  },
                ]
              },
              {
                stack: [
                  'RESUMEN DEL EXPEDIENTE ' + this.lists.cnumExpediente,
              ],
                  style: 'header'
              },
              {
                columns: [
                  {   
                   width: 200,
                   text: [
                   'Expediente N° ' + this.lists.cnumExpediente + '\n',
                   'Fecha de Ingreso: ' + this.lists.dfecIngreso + '\n',
                   'Sede de Origen: ' + this.lists.cdesSedeOrigen + '\n',
                   'Procedencia: ' + this.lists.ctxtProcedencia
                  ]
                  },
                  {
                   width: 50,
                   text: ''
                  },
                  {
                   width: 300,
                   text: [
                  'Colegiado: ' + this.lists.cdesColegiado
                  ]
                  },
                ]
              },
              {
                columns: [
                  {
                   width: 500,
                   margin: [0, 20],
                   text: [
                  {
                    text: [
                    'DATOS DEL PODER JUDICIAL\n\n'
                    ],
                  },
                    'Remitente: ' + this.lists.cdesRemitentePj + '\n',
                    'N° de Expediente: ' + this.lists.cnumExpPj + '\n',
                    'N° de Oficio: ' + this.lists.cnumOficioPj + '\n',
                    'Fallo 1° Instancia: ' + this.lists.ctxtFallo1 + '\n',
                    'Fallo 2° Instancia: ' + this.lists.ctxtFallo2 + '\n',
                    'Fecha de Oficio: ' + this.lists.dfecOficioPj
                    ]
                  },
                ]
              },
              {
                columns: [
                  {   
                    width: 200,
                    text: [
                  {
                    text: [
                      'PARTES PROCESALES\n\n'
                    ],
                  },
                    'Demandante: ' + this.lists.ctxtDemandante+ '\n',
                    'Abogado: ' + this.lists.cnomAboDemandante+ '\n',
                    'Demandado: ' + this.lists.ctxtDemandado+ '\n',
                    'Abogado: ' + this.lists.cnomAboDemandado
                    ]
                  },
                  {
                    width: 50,
                    text: ''
                  },
                  {
                    width: 250,
                    text: [
                  {
                    text: [
                      'CALIFICACIÓN\n\n'
                    ],
                  },
                    'Materia: ' + this.lists.cdesMateria+ '\n',
                    'SubMateria: ' + this.lists.cdesSubMateria + '\n',
                    'Especifica: ' + this.lists.cdesEspecifica + '\n',
                    'Observaciones: ' + this.lists.ctxtObservacion
                    ]
                  },
                ]
              },
              {
                columns: [
                  {
                  width: 550,
                  margin: [0, 20],
                  text: [
                  {
                    text: [
                      'VISTA DE LAS CAUSAS\n\n'
                    ],
                  },
                    'Fecha de Vista: ' + this.lists.cfecVista + '\n',
                    'Mag. Participantes: ' + this.lists.cdesIntegrantes
                    ]
                  },
                ]
              },
              {
                columns: [
                  {
                  width: 550,
                  margin: [0, 20],
                  text: [
                  {
                    text: [
                      'RESUMEN DETALLADO DEL EXPEDIENTE\n'
                    ],
                  },
                  ]
                  },
                ]
              },
              {         
              table: 
                { 
                  widths: [150, 350],
                  body: bodyDocument, 
                }
              }                     
           ],
           styles: {
             header: {
               fontSize: 15,
               bold: true,
               alignment: 'center',
               margin: [0, 20, 0, 30]
             },
             linea: {
               fontSize: 18,
               bold: true,
               alignment: 'left',
               margin: [0, 0, 0, 5]
             },
             subheader: {
               fontSize: 10,
               bold: true
             },
             superMargin: {
               margin: [20, 0, 40, 0],
               fontSize: 15
             }
           }
          }
        this.documento = docDefinition;
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBase64((bytes) => {
        var binaryVersionOfThePdf = base64ToString(bytes);
        this.pdfSrc = {data: binaryVersionOfThePdf}; 
        this.verifyPdf();
      });
    }
  }     
}
</script>




