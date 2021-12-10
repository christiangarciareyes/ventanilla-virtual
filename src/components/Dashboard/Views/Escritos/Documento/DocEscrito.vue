<template>
  <div class="content">
    <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      <card>
      <template slot="header">
      <div class="row" style="border-bottom: 1px solid #D6DBDF">
      <div class="col-md-8">
        <h5 style="font-size: 18px" class="card-title fuente">{{ titulo }}</h5>
        <p class="card-category fuente">{{ texto }}</p><br>
      </div>
      <div class="col-md-4">
         <button v-if="show" @click="corregir()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
      </div>
      </div> 
      </template>
    <div class="content" v-if="show">
    <template>
       <div class="row m-t-10 m-b-10">
        <div class="form-group col-md-12">
          <div class="row p-b-20">
          <div class="col-md-5 col-md-3">
            <label>Páginas</label>
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
          <pdf v-if="show" ref="pdf" style="border: 2px solid black" :src="pdfSrc" :page="page" :rotate="rotate"  @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event" loaded></pdf>
        </div>
       </div>
    </template>
      <div style="background-color: #fff" class="footer">
        <hr>
        <div class="row">
        <div class="col-md-10">
        <div class="stats">
        <i class="fa fa-key"></i> Usted esta visualizando este escrito bajo los estándares de seguridad establecidos.<br><br>
        </div>
        </div>
        <div class="col-md-2">
        <button style="margin-left:10px; margin-right:8px;" @click="siguiente" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.siguiente" :disabled="show == false"><i class="fa fa-chevron-right"></i></button>                
        <button @click="anterior" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.anterior" :disabled="show == false"><i class="fa fa-chevron-left"></i></button>
        </div>
        </div>
      </div>
    </div>
    <div v-if="show" class="p-signup__form-content m-t-30">
        <div class="container-form-btn">
          <button @click="corregir()" style="width:300px;" class="cancelar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-arrow-circle-left m-r-3"></i> REGRESAR</button>
          <button @click="enviarCorreo()" style="width:300px;" class="editar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-paper-plane m-r-5"></i> FIRMAR Y ENVIAR</button>
          <!-- <button @click="firmarEscri()" style="width:300px;" class="firmar-form-btn m-l-10 m-r-10 fuente"><i class="fa fa-pencil"></i> FIRMAR CON DNI-e</button> -->
        </div>
    </div>
   </card>
  </div>
  </div>
 </div>
</div>
</template>

<script>

import axios from "axios";
import LTable from "src/components/UIComponents/Tables/Table";
import Card from "src/components/UIComponents/Cards/Card";
import pdf from "vue-pdf";

import { actions } from "vuex";

var base64ToString = process.env.VUE_ENV === "server" ? function(base64) { return Buffer.from(base64, "base64").toString(); } : window.atob;

export default {
  name: 'solicitud',
  data: function() {
    return {
      name: 'solicitud',
      token: null,
      nombrePdf: '',
      pdfSrc: '',
      loadedRatio: 0,
      error: '',
      page: null,
      pages: 1,
      numPages: '',
      rotate: 0,
      items: [],
      return: [],
      resFecha: [],
      resultData: [],
      resultData2: [],
      dFecha: '',
      newPdf: '',
      ctxtCorreo: '',
      cnumCelular: '',
      show: false,
      final: false,
      aviso: 0,
      sumilla: '',
      contenido: '',
      expediente: '',
      token: '',
      aviso: '',
      tData: [],
      return: [],
      adjuntos: [],
      titulo: 'Vista Previa del Escrito',
      texto: 'Esta ventana muestra la solicitud de escrito que se presentará al TC.',
      tooltip: {
        derecha: 'Derecha',
        izquierda: 'Izquierda',
        siguiente: 'Siguiente',
        anterior: 'Anterior'
      },
      parte: {
        tipo: null,
        nombre: null
      }
    }
  },
  mounted: function() {
    if(this.$store.state.returnEscrito == 0){
     this.$notify({group: 'auth', clean: true});
     this.cargaData();
    }else{
      this.$router.push('/escritos');
    }

  },
  methods: {
      cargaView(){
        if(this.sumilla == '' && 
          this.contenido == '' &&
          this.expediente == null){
          this.$router.push('/escritos');
        }else{
          swal({
            title: "Cargando documento",
            text: "Espere por favor...",
            buttons: false,
            dangerMode: true,
            icon: "static/img/loader.gif",
            closeOnClickOutside:false
          })
          this.obtenerDatos();
        }
      },
      obtenerFecha(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/getFecha',
        ).then((response) => {
          this.resFecha = response.data;
          this.dFecha = this.resFecha.dfecha;
          this.txtFecha = this.resFecha.txtFecha;  
          this.dHora = this.resFecha.dhora; 
          this.generarPdf();            
        },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            this.errorNotification();
          }
        });
      },
      cargaData(){
        this.sumilla = this.$store.state.sumiEscrito; 
        this.contenido = this.$store.state.conteEscrito; 
        this.expediente = this.$store.state.expEscrito;
        this.nidExpediente = this.$store.state.nidEscrito;
        this.parteExpediente = this.$store.state.partEscrito;
        for (var i = 0; i < this.$store.state.adjEscrito.length; i++) { 
          this.adjuntos.push({
            name: this.$store.state.adjEscrito[i].adjName,
            size: this.$store.state.adjEscrito[i].adjSize + " KB",
            url: this.$store.state.adjEscrito[i].adjUrl
          });
        }
        this.cargaView();
      },
      obtenerDatos(){
        this.datosCompletos = this.$session.get('nomUsuario');
        this.dni = this.$session.get('dni');
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
            this.obtenerFecha();
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
    siguiente: function() {
      if (this.page < this.numPages) {
        this.page = this.page + this.pages;
      } else {
        this.page = this.numPages;
      }
    },
    anterior: function() {
      if (this.page > 1) {
        this.page = this.page - this.pages;
      } else {
        this.page = 1;
      }
    },
    verifyPdf() {
      if (this.pdfSrc.data == "") {
        this.page = "";
        this.show = false;
        swal.close();
        this.warnNotification() 

      } else {
        this.page = 1;
        this.show = true;
        swal.close();
        this.successNotification();
      }
    },
    finalizar(){
      this.$session.set('tokService', 1)
      this.$router.push('/completEscrito')
    },
    corregir(){
      swal({
        title: "¿Desea regresar al editor?",
        text: "Solo regrese si desea modificar los datos ingresados o desistir con el registro",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false,
      })
      .then((value) => {
        if(value == true){
          this.$router.push('/escritos/createEscrito')
        }else{}
      });
    },
    warnNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, el documento no fue creado!',
          type: 'error',
        });
    },
    successNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Documento disponible para visualizar!',
          type: 'success',
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
    generarPdf: function() {
      var bodyDocument = [];
      var dataTable = this.adjuntos;
      if(dataTable.length >= 1){
        for (var key in dataTable) {
          if (dataTable.hasOwnProperty(key)) {
            var name = dataTable[key];
            var size = dataTable[key];
            var fila = new Array();
            fila.push(
              name.name.toString(),
              size.size.toString(),
            );
            bodyDocument.push(fila);
          }
        }
      }else{
        this.adjuntos.push({
            name: 'Sin adjuntos',
            size: '0 KB'
        });
        var dataTable = this.adjuntos;
        for (var key in dataTable) {
          if (dataTable.hasOwnProperty(key)) {
            var name = dataTable[key];
            var size = dataTable[key];
            var fila = new Array();
            fila.push(
              name.name.toString(),
              size.size.toString(),
            );
            bodyDocument.push(fila);
          }
        }
      }
      var solicitud = {
        watermark: {
          text: "Ventanilla Jurisdiccional",
          color: "blue",
          opacity: 0.3,
          bold: true,
          italics: true
        },
        footer: function(currentPage, pageCount) {
          return {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "center",
            fontSize: 8,
            margin: [250, 20]
          };
        },
        header: {
          columns: [
            {
              width: 1200,
              height: 50,
              fontSize: 8,
              margin: [500, 10],
              text: [
                "Fecha  : " + " " + this.dFecha + "\n",
                "Hora    : " + " " + this.dHora
              ]
            }
          ]
        },
        content: [
          {
            columns: [
              {
                width: 200,
                stack: [
                  {
                    text: "TRIBUNAL CONSTITUCIONAL DEL PERÚ",
                    style: "subheader"
                  },
                  {
                    text: "VENTANILLA JURISDICCIONAL",
                    style: "subheader",
                    color: "gray"
                  },
                  {
                    text: "\n"
                  },
                  {
                    qr:
                      "TRIBUNAL CONSTITUCIONAL DEL PERÚ" +
                      "\n" +
                      "PRESENTACIÓN DE ESCRITO" +
                      "\n" +
                      this.datosCompletos,
                    fit: 60
                  }
                ]
              },
              {
                width: 180,
                text: ""
              },
              {
                width: 150,
                stack: [
                  {
                    text: "EXPEDIENTE:  " + this.$store.state.expEscrito,
                    style: "subheader2"
                  },
                  {
                    text: "SUMILLA:  " + this.$store.state.sumiEscrito,
                    style: "subheader2"
                  }
                ]
              },
            ]
          },
          {
            stack: ["PRESENTACIÓN DE ESCRITOS"],
            style: "header"
          },
          {
            columns: [
              {
                width: 500,
                margin: [0, 20],
                alignment: "justify",
                text: [
                  {
                    text: ["SR. PRESIDENTE DEL TRIBUNAL CONSTITUCIONAL\n"]
                  }
                ]
              }
            ]
          },
          {
            columns: [
              {
                width: 500,
                alignment: "justify",
                text: [
                  { text: ".          ", style: "espaciado" },
                  "Yo, " +
                    this.datosCompletos +
                    " identificado con DNI Nro. " +
                    this.dni +
                    ", a Ud. respetuosamente digo:\n\n",
                ]
              }
            ]
          },
          {
            columns: [
              {
                width: 500,
                alignment: "justify",
                text: [
                  { text: ".          ", style: "espaciado" }, 
                  "Que, " + this.$store.state.conteEscrito + ".\n\n",
                  { text: ".          ", style: "espaciado" },
                  "Asimismo declaro haber leído las políticas de uso de la plataforma las cuales acepto y me comprometo " +
                    "a cumplirlas en salvaguarda de la información que allí se expone.\n",
                  "POR TANTO:\n\n\n",
                  { text: ".          ", style: "espaciado" },
                  "A Ud. Señor Presidente ruego se sirva deferir a mi petición.\n\n\n",
                  this.$session.get('city') + ", " + this.txtFecha + ".\n\n\n\n",
                  "Archivos adjuntos:\n\n"
                ]
              }
            ]
          },
          {
            table: {
              widths: [250, 100],
              body: bodyDocument
            }
          },
          {
            columns: [
              {
                width: 350,
                text: ""
              },
              {
                width: 200,
                text: [
                  { text: "\n\n\n\n\n\n\n\n" },
                  { text: "ATTE.\n" },
                  { text: this.datosCompletos + "\n" },
                  { text: "DNI: " + this.dni }
                ]
              }
            ]
          },
        ],
        styles: {
          header: {
            fontSize: 15,
            bold: true,
            alignment: "center",
            margin: [0, 10, 0, 10]
          },
          linea: {
            fontSize: 18,
            bold: true,
            alignment: "left",
            margin: [0, 0, 0, 5]
          },
          subheader: {
            fontSize: 10,
            bold: true
          },
          subheader2: {
            fontSize: 9,
            margin: [0, 0, 0, 2]
          },
          superMargin: {
            margin: [20, 0, 40, 0],
            fontSize: 15
          },
          signature: {
            bold: true,
            decoration: "overline",
            decorationStyle: "solid",
            decorationColor: "black"
          },
          espaciado: {
            color: "white"
          }
        }
      };
      this.documento = solicitud;
      const pdfDocGenerator = pdfMake.createPdf(solicitud);
      pdfDocGenerator.getBase64(bytes => {
        this.newPdf = bytes;
        var binaryVersionOfThePdf = base64ToString(bytes);
        this.pdfSrc = { data: binaryVersionOfThePdf };
        this.verifyPdf();
      });
   },
   enviarCorreo: function() {
      swal({
        title: "¿Desea finalizar el escrito?",
        text: "Luego de terminar revise su bandeja de entrada de su correo para obtener mayor información.",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
      if (value == true) {
      this.$store.dispatch("finalizandoEscrito");
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + "/es/uploadFile",
          {
            ctxtSumilla: this.sumilla,
            cnumExpediente : this.expediente,
            nidExpediente: this.nidExpediente, 
            ctxtParte: this.parteExpediente, 
            ctxtTipoEnvio:'M', 
            cnumIp: this.$session.get('ip'),
            cnomCiudad: this.$session.get('city'),
            cnomPais: this.$session.get('country'),
            ctxtInfo: '0',
            listaAdjunto: this.adjuntos,
            newPdf: this.newPdf
          }
        )
        .then(response => {
          this.resultData = response.data;
          if (this.resultData.codRpta == 1) {
            swal.close();
            this.$notify({group: 'auth', clean: true});
            this.finalizar();
          }else{
            swal.close();
            this.$store.dispatch("alertaError");
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
      } else {}
      });
    },
    firmarEscri: function() {
      swal({
        title: "¿Desea firmar el escrito?",
        text: "Es necesario para el proceso que cuente con su DNI electrónico y que conecte su lector a la PC.",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          this.$store.dispatch("enviandoEscrito");
          axios.post(this.$store.state.serverOfi + "/es/uploadFile", 
            {
              ctxtSumilla: this.sumilla,
              cnumExpediente : this.expediente,
              nidExpediente: this.nidExpediente, 
              ctxtParte: this.parteExpediente,
              ctxtTipoEnvio:'D', 
              cnumIp: this.$session.get('ip'),
              cnomCiudad: this.$session.get('city'),
              cnomPais: this.$session.get('country'),
              ctxtInfo: '0',
              listaAdjunto: this.adjuntos,
              newPdf: this.newPdf
            })
            .then(response => {
              this.resultData2 = response.data;
              if (this.resultData2.codRpta == 1) {
                var codUrl = this.resultData2.desRpta;
                var url = this.$store.state.apiFirma + codUrl;
                this.$session.set('tokService', 1)
                swal.close();
                this.$notify({group: 'auth', clean: true});
                window.open(url, "_self");
              }else{
                swal.close();
                this.$store.dispatch("alertaError");
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
        }else {}
      });
    }
  },
  components: {
    LTable,
    Card,
    pdf
  }
};
</script>

<style lang="css">
</style>