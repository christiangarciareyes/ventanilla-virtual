<template>
<transition name="slide-fade">
  <div class="content-center fuente">
  <div class="registrar-header" style="background-image: url('/static/img/cover.jpg')">
  <div class="content-center index">
  <nav class="navbar navbar-expand-lg" style="border-bottom: 0px">
    <a class="mobil nounderline" href="https://www.tc.gob.pe" target="_blank">
      <img src="https://tc.gob.pe/intranet/iconos/txtLogoBlancoMin.png" alt="escudo">
    </a>
    <a class="laptop nounderline" href="https://www.tc.gob.pe" target="_blank">
      <img src="https://tc.gob.pe/intranet/iconos/txtRecorteBlanco.png" alt="escudo">
    </a>
      <span class="settings-panel-control-menu">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar burger-menu"></span>
        <span class="navbar-toggler-bar burger-menu"></span>
        <span class="navbar-toggler-bar burger-menu"></span>
      </button>
      </span>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <router-link to="/">
          <li class="nav-item myhover m-r-10">
            <a href="#" class="nav-link">
              <i style="font-weight: 400; font-size: 20px; color: #fff" class="nc-icon pe-7s-home"></i>
              <span style="color: #fff" class="d-lg-block fuente p-t-2">&nbsp;PORTAL</span>
            </a>
          </li>
          </router-link>
          <router-link to="/login">
          <li class="nav-item myhover m-r-10">
            <a href="#" class="nav-link">
              <i style="font-weight: 400; font-size: 23px; color: #fff" class="nc-icon pe-7s-user"></i>
              <span style="color: #fff" class="d-lg-block fuente p-t-4">&nbsp;ACCEDER</span>
            </a>
          </li>
          </router-link>
        </ul>
      </div>
   </nav>
  <div class="content-center">
  <div class="container text-center m-t-100 m-b-100 fuente">
    <h1 class="titulo fuente">Ventanilla Jurisdiccional del TC</h1>
    <h2 class="text-port fuente">
      Consulta de Procesos Orgánicos
    </h2>
  </div>
  </div>
  </div>
  </div>
  <b-progress class="m-b-5" height="2px" :value="counter" :max="max" variant="info"></b-progress>
  <div class="content m-t-18">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
        <card>
          <div class="row">
            <div class="col-md-1"></div>
            <transition name="fade" mode="out-in">
            <div class="col-md-10 m-t-30">
            <div class="m-home-center__section2">
              <header class="special contentIcon">
                <span class="m-home-center__section-icon pe-7s-ribbon"></span><br>
              </header>
              <a style="text-decoration:none;" class="m-home-center__section-name">CONSULTA DE PROCESOS ORGÁNICOS</a>
              <div class="m-home-center__section-desc">
              <br>Consulta expedientes y cuadernillos de los procesos orgánicos.<br>
              </div>
            </div>
            </div>
            </transition>
          </div>
        <div class="m-home-center__content-heading">
         <div class="row m-t-40 m-b-10">
          <div class="col-lg-2"></div>
          <div class="col-lg-3 mb-3">
            <label>Número de Expediente</label>
            <the-mask class="form-control imp-fue" mask="#####" v-model="expediente" placeholder="#####"/>
          </div>
          <div class="col-lg-2 mb-3">
            <label>Año de Expediente</label>
            <the-mask class="form-control imp-fue" mask="####" v-model="anio" placeholder="####"/>
          </div>
          <div class="col-lg-3">
            <label>Tipo de Proceso</label>
            <b-form-select class="form-control imp-fue" v-model="proceso" :options="lista"/>
          </div>
          <!-- <p class="txt3 m-t-5">Ingrese los 5 primeros dígitos completos del número de expediente, incluyendo los ceros. Por ejemplo: 00025-2018-AI.</p> -->
         </div>
         <div class="row m-t-20 m-b-10">
          <div class="col-lg-3"></div>
          <div class="col-lg-3">
              <label>Ingresa el Demandante</label>
              <div class="input-group m-b-20">
                <b-form-input type="text" v-model="demandante" ></b-form-input>
              </div>
          </div>
          <div class="col-lg-3">
              <label>Ingresa el Demandado</label>
              <div class="input-group m-b-20">
                <b-form-input type="text" v-model="demandado"></b-form-input>
              </div>
          </div>
         </div>
         <div class="container-form-btn m-t-20">
            <button @click="buscar()" style="width:250px" class="guardar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-search m-r-3"></i> BUSCAR</button>
            <button v-if="tabla2" @click="limpiar()" style="width:250px" class="editar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-refresh m-r-3"></i> LIMPIAR</button>
            <button v-if="show" @click="volver()" style="width:250px" class="cancelar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-arrow-circle-left m-r-3"></i> REGRESAR</button>
         </div>
      </div>
      <transition name="fade" mode="out-in">
      <div class="row" v-if="tabla">
          <div class="form-group col-md-1"></div> 
          <div class="form-group col-md-10">
          <label>Visualiza el Expediente Solicitado</label>
			<b-table bordered class="m-t-10"
			         show-empty
			         stacked="lg"
			         :items="lists"
			         :fields="fields">    
			<template slot="cnumExpediente" slot-scope="data">
			  {{data.item.cnumExpediente}}
			</template>
			<template slot="ctxtDemandante" slot-scope="data">
			  {{data.item.ctxtDemandante}}
			</template>
			<template slot="ctxtDemandado" slot-scope="data">
			  {{data.item.ctxtDemandado}}
			</template>
			<template slot="cdesColegiado" slot-scope="data">
			  {{data.item.cdesColegiado}}
			</template>
			<template slot="cdesTipoProceso" slot-scope="data">
			  {{data.item.cdesTipoProceso}}
			</template>
			<template slot="ctxtProcedencia" slot-scope="data">
			  {{data.item.ctxtProcedencia}}
			</template>
			<template slot="dfecIngreso" slot-scope="data">
			  {{data.item.dfecIngreso}}
			</template>
			<template slot="ver" slot-scope="row"> 
			   <button @click="setIdExp(row.item.nidExpediente, row.item.cnumExpediente)" type="button" class="btn-info-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-folder-open-o p-r-4"></i></button>
			</template>
			</b-table>
          </div>
      </div>
      </transition>
      <transition name="fade" mode="out-in">
      <div class="row" v-if="tabla2">
          <div class="form-group col-md-1"></div> 
          <div class="form-group col-md-10">
          <label>Visualiza la Lista de Cuadernillos</label>
      <b-table bordered class="m-t-10"
               show-empty
               stacked="lg"
               :items="lists2"
               :fields="fields2">    
      <template slot="cdesItem" slot-scope="data">
        {{data.item.cdesItem}}
      </template>
      <template slot="ctxtGrupoPiezaProcesal" slot-scope="data">
        {{data.item.ctxtGrupoPiezaProcesal}}
      </template>
      <template slot="ctxtPiezaProcesal" slot-scope="data">
        {{data.item.ctxtPiezaProcesal}}
      </template>
      <template slot="dfecCreacion" slot-scope="data">
        {{data.item.dfecCreacion}}
      </template>
      <template slot="dfecDocumento" slot-scope="data">
        {{data.item.dfecDocumento}}
      </template>
      <template slot="nnumFolios" slot-scope="data">
        {{data.item.nnumFolios}}
      </template>
      <template slot="ver" slot-scope="row"> 
         <button @click="verPDF(row.item.nidExpediente, row.item.cdesArchivo)" type="button" class="btn-success-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-file-pdf-o p-r-4"></i></button>
      </template>
      <template slot="descargar" slot-scope="row"> 
         <button @click="descargarPDF(row.item.cdesArchivo)" type="button" class="btn-danger-circle btn btn-xs" v-tooltip.top-center="tooltip.descargar" ><i class="fa fa-download p-r-4"></i></button>
      </template>
      </b-table>
          </div>
      </div>
      </transition>
      <transition name="fade" mode="out-in">
      <div class="content" v-if="vermypdf">
         <div class="row m-t-10">
          <div class="col-md-1"></div>
          <div class="form-group col-md-10">
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
      <div style="background-color: #fff" class="footer m-b-30">
        <div class="row">
        <div class="col-md-1"></div>
          <div class="col-md-10"><hr>
          <div class="stats">
            <i class="fa fa-key"></i> Usted esta visualizando este documento bajo los estándares de seguridad establecidos.<br><br> 
          </div>
        </div>
        </div>
      </div> 
    </div>
   </transition>
  </card>
  <div class="text-center p-t-10 p-b-40">
    <router-link to="/">
    <a class="txt3 nounderline" href="#">
      <i class="fa fa-home m-l-5" aria-hidden="true"></i>
      Regresar al Portal
    </a>
    </router-link>
  </div>
  <b-modal ref="my-modal" hide-footer title="Mantenimiento del Cuadernillo Digital">
      <div class="d-block">
        <h4>Estimado usuario, por motivos de mantenimiento para la mejora de nuestros sistemas; la opción del Cuadernillo Digital estará disponible de manera progresiva. 
          Es decir, los cuadernillos digitales de sus expedientes se iran visualizando por año de antiguedad durante el pasar de los días.</h4>
        <h4>Discúlpenos por el inconveniente y esperamos su comprensión.</h4>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModa">ACEPTAR</b-button>
  </b-modal>
  </div>
  </div>
 </div>
</div>
<SwipeMenu></SwipeMenu>
<Footer></Footer>
</div>
</transition>
</template>

<script>

import axios from "axios";
import SwipeMenu from 'src/components/Dashboard/Layout/Contenido/Menu'
import Footer from "src/components/Dashboard/Layout/Footer/RegFooter";
import LTable from "src/components/UIComponents/Tables/Table";
import Card from "src/components/UIComponents/Cards/Card";

import pdf from "vue-pdf";

import { actions } from "vuex";

var base64ToString = process.env.VUE_ENV === "server" ? function(base64) { return Buffer.from(base64, "base64").toString(); } : window.atob;

export default {
  data: function() {
    return {
      expediente: '',
      demandante: '',
      demandado: '',
      param: '',
      anio: '',
      tooltip: {
        derecha: "Derecha",
        izquierda: "Izquierda",
        siguiente: "Siguiente",
        anterior: "Anterior",
        ver: "Ver Cuadernillo",
        descargar: "Descargar"
      },
      counter: 0,
      max: 100,
      token: '',
      nombrePdf: '',
      pdfSrc: '',
      loadedRatio: 0,
      error: '',
      page: null,
      pages: 1,
      numPages: '',
      rotate: 0,
      newPdf: '',
      tabla: false,
      tabla2: false,
      lista: [
        { value: 'AI', text: 'ACCIÓN DE INCONSTITUCIONALIDAD' },
        { value: 'CC', text: 'CONFLICTO DE COMPETENCIA' }
      ],
      proceso: 'AI',
      selected: null,
      show: false,
      sig1: true,
      sig2: false,
      sig3: false,
      vermypdf: false,
      fields: [
        { key: 'cnumExpediente', label: 'NÚMERO', sortable: true },
        { key: 'ctxtDemandante', label: 'DEMANDANTE', sortable: true },
        { key: 'ctxtDemandado', label: 'DEMANDADO', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'cdesTipoProceso', label: 'PROCESO', sortable: true },
        { key: 'ctxtProcedencia', label: 'PROCEDENCIA', sortable: true },
        { key: 'dfecIngreso', label: 'FEC. INGRESO', sortable: true },
        { key: 'ver', label: 'VER' }
      ],
      fields2: [
        { key: 'cdesItem', label: 'ITEM', sortable: true },
        { key: 'ctxtGrupoPiezaProcesal', label: 'GRUPO PROCESAL', sortable: true },
        { key: 'ctxtPiezaProcesal', label: 'PIEZA PROCESAL', sortable: true },
        { key: 'dfecCreacion', label: 'FECHA DE CREACIÓN', sortable: true },
        { key: 'dfecDocumento', label: 'FECHA DE DOCUMENTO', sortable: true },
        { key: 'nnumFolios', label: 'N° DE FOLIOS', sortable: true },
        { key: 'ver', label: 'VER' },
        { key: 'descargar', label: 'DESCARGAR' }
      ],
      lists: [],
      lists2: []
    };
  },
  mounted: function() {
  	this.$store.state.tutorial = 0;
    this.$store.dispatch("registrarInicio");
    // this.showModa();
    if (!this.$session.exists()) {
      this.$router.push("/consultar");
    } else {
      this.$router.push("/inicio");
    }
  },
  methods: {
    showModa() {
      this.$refs['my-modal'].show()
    },
    hideModa() {
      this.$refs['my-modal'].hide()
    },
    toggleModa() {
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
  	volver(){
      this.show = false;
      this.vermypdf = false;
      this.pdfSrc.data == "";
      this.tabla = true;
      this.tabla2 = true;
    },
    validarExpediente(){
      if(this.expediente.length == 4){
         return this.expediente = '0' + this.expediente
      }else if(this.expediente.length == 3){
         return this.expediente = '00' + this.expediente
      }else if(this.expediente.length == 2){
         return this.expediente = '000' + this.expediente
      }else if(this.expediente.length == 1){
         return this.expediente = '0000' + this.expediente
      }else{
        return this.expediente
      }
    },
    buscar(){
      if(this.expediente != '' && this.anio != ''){
        this.expediente = this.validarExpediente();
        this.param = this.expediente + "-" + this.anio + "-" + this.proceso;
        if(this.demandante != ''){
          if(this.demandado != ''){
               this.buscar2(this.param, this.demandante, this.demandado);
          }else{
               this.buscar2(this.param, this.demandante, '0');
          }
        }else{
          if(this.demandado != ''){
              this.buscar2(this.param, '0', this.demandado);
          }else{
              this.buscar2(this.param, '0', '0');
          }
        }
      }else{
        if(this.demandante != ''){
          if(this.demandado != ''){
               this.buscar2('0', this.demandante, this.demandado);
          }else{
               this.buscar2('0', this.demandante, '0');
          }
        }else{
           if(this.demandado != ''){
               this.buscar2('0', '0', this.demandado);
           }else{
              this.$store.dispatch("incorrecNotification");
           }
        }
      }
    },
    buscar2(param, dte, ddo){
        this.cargaRegistros();
        axios.get(this.$store.state.serverOfi + '/public/listaProceso/' + param + '/'+ dte + '/' + ddo)
        .then((response) => {
          this.lists = response.data;
          if(this.lists != ''){
            this.tabla = true;
            this.limpiar2();
            swal.close();
          }else{
            swal.close();
            this.$store.dispatch("infoExpedientePub");
          }
        },(error) => {
            swal.close();
            this.$store.dispatch("alertaError");
        });
    },
    setIdExp (vidExp, numExp) { 
      this.$store.dispatch("cargaCuadernillo");
      axios.post(this.$store.state.serverOfi + '/public/listaCuadernillo',
      {
        'nidExpediente': vidExp
      }).then((response) => {
        this.lists2 = response.data;
          if(this.lists2 != ''){
            this.tabla2 = true;
            swal.close();
          }else{
            swal.close();
            this.$store.dispatch("infoCuadernilloPub");
          }
       },(error) => {
          swal.close();
          this.$store.dispatch("alertaError");
       });
    },
    descargarPDF(cdesArchi){
       var archivo = cdesArchi.replace('Cuadernillo/', '')
       window.open("https://gestordocumentaltc.sedetc.gob.pe/index.php/s/rtdZeybzmewpS5R/download?path=%2F&files=" + archivo, "_blank")
    },
    verPDF(vidExp, cdesArchi){
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      swal({
        title: "Cargando documento",
        text: "Espere por favor...",
        buttons: [false, "Cancelar"],
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false
      })
      .then((value) => {
        if(value == true){
          source.cancel();
          this.token = 'A';
          this.page = ''; 
          this.show = false; 
          this.vermypdf = false
          this.cancelNotification();
        }else{}
      });
      this.pdfSrc = '';
      this.page = '';
      axios.post(this.$store.state.serverOfi + '/public/getPdfOVPub',
        {
          'path': cdesArchi,
          'cnomUsuario': '',
          'cnumIp': '',
          'cnomCiudad': '',
          'cnomPais': '',
          'ctxtInfo': vidExp
        }, 
        {
          cancelToken: source.token
        }
        ).then((response) => {   
          var binaryVersionOfThePdf = '';
          this.pdfDesca = response.data;
          binaryVersionOfThePdf = base64ToString(response.data);
          this.pdfSrc = {data: binaryVersionOfThePdf} 
          this.verifyPdf();
        },(error) => {
            swal.close();
            if(this.token != 'A'){
              this.$store.dispatch("alertaErrorDes");
        }
      }); 
    },
    cargaRegistros(){
      swal({
        title: "Cargando registros",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
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
        this.page = ""
        this.show = false
        this.vermypdf = false
        swal.close();
        this.$store.dispatch("warnNotification");
      } else {
        this.page = 1
        this.show = true
        this.tabla = false
        this.tabla2 = false
        this.vermypdf = true
        swal.close();
        this.$store.dispatch("successNotification2");
      }
    },
    limpiar(){
      this.expediente = ''
      this.anio = ''
      this.proceso = 'AI'
      this.tabla = false
      this.tabla2 = false
      this.lists = ''
      this.lists2 = ''
    },
    limpiar2(){
      this.tabla2 = false
      this.lists2 = ''
    }
  },
  components: {
    SwipeMenu,
    Footer,
    LTable,
    Card,
    pdf
  }
};
</script>
<style lang="scss">
  .myhover:hover{
    background-color: rgba(208, 211, 212, .2);
    border-radius: 5px;
  } 
</style>