<template>
  <div class="content">
  <div class="container-fluid">
  <card>
  <template slot="header">
    <div class="row" style="border-bottom: 1px solid #D6DBDF">
    <div class="col-md-8">
      <h5 style="font-size: 18px" class="card-title">{{ titulo }}</h5>
      <p class="card-category">{{ texto}} </p><br>
    </div>
    <div class="col-md-4">
       <button v-if="doc" @click="volver()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
    </div>
    </div> 
  </template>
  <div v-if="doc" class="row m-t-10">
    <div class="col-md-6 fuente">
        <label>Seleccione N° de Expediente</label>
          <select class="form-control imp-fue mb-3" v-model="exp">
          <option :value="selectExped" disabled>-- Seleccione expediente --</option>
          <option v-for="expedientes in options" v-bind:value="expedientes">
            {{ expedientes.cnumExpediente }}
          </option> 
          </select>
         <label>Sumilla del Escrito</label>
         <textarea id="text" class="form-control fuente"
               style="max-height:100px"
               v-model="sumilla"
               placeholder="Escribe tu sumilla"
               no-resize
               :rows="50"
               :max-rows="100"
               maxlength="100"
               v-on:keyup="cuenta">
         </textarea>
         <p v-bind:class="{'text-danger': error }" style="color: #2E86C1; font-size: 13px;" class="m-t-5 mb-3 fuente">Máximo {{recorreCount}} caracteres</p>
         <label>Contenido del Escrito</label>
         <textarea id="text" class="form-control fuente"
               style="height:400px"
               v-model="contenido"
               placeholder="Escribe tu contenido"
               no-resize
               :rows="50"
               :max-rows="100"
               maxlength="900"
               v-on:keyup="cuenta2">
         </textarea>
         <p v-bind:class="{'text-danger': error2 }" style="color: #2E86C1; font-size: 13px;" class="m-t-5 mb-3 fuente">Máximo {{recorreCount2}} caracteres</p>
      </div>
    <div class="col-md-6">
      <label>Adjunta tus Archivos PDF</label><label style="color: #2E86C1" class="pull-right">{{ sumSize }} KB</label>
      <transition name="fade" mode="out-in">   
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving" class="m-b-30">
      <span style="font-size: 13px" class="btn btn-file fuente alertTuto2-form-btn"><i class="fa fa-cloud-upload m-r-8"></i> SELECCIONA TU ARCHIVO AQUÍ<input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="application/pdf" class="btn-file" v-if="isInitial">
      </span>
      </form>
      </transition>
      <transition name="fade" mode="out-in"> 
      <p class="text-center dropbox fuente m-b-30" v-if="isVerifing">
        Verificando archivo, espere por favor
        <i style="color: #AED6F1" class="fa fa-spinner fa-pulse fa-3x fa-fw m-l-35"></i>
        <span class="sr-only"></span>
      </p> 
      <p class="text-center dropbox fuente m-b-30" v-if="isSaving">
        Subiendo archivo, espere por favor
        <i style="color: #AED6F1" class="fa fa-spinner fa-pulse fa-3x fa-fw m-l-35"></i>
        <span class="sr-only"></span>
      </p>
     </transition>
     <transition name="fade" mode="out-in">   
     <div v-if="dataEscritos != ''">
      <card>
       <ul class="btn-upload__files">
        <li v-for="item, index in dataEscritos" class="btn-upload__file">{{item.name + " / " + item.size + " KB / "}}
        <i class="fa fa-arrow-up" @click="subir(index)" style="color: #2E86C1" v-tooltip.top-center="tooltip.subir"></i>{{" / "}}<i class="fa fa-arrow-down" @click="bajar(index)" style="color: #2E86C1" v-tooltip.top-center="tooltip.bajar"></i>{{" / "}}<i @click="remove(index)" class="fa fa-times" style="color:#CB4335;" v-tooltip.top-center="tooltip.anular"></i>{{" / "}}<i class="fa fa-file" @click="verPDF(index)" style="color: #2E86C1" v-tooltip.top-center="tooltip.ver"></i></li>
      </ul>
      </card>
      <p v-if="mostrar" style="color: #2E86C1; font-size: 13px" class="fuente">Se movió el archivo</p>
     </div>
    </transition>
      <div>
       <transition name="fade" mode="out-in">   
        <p v-if="isSuccess" class="dropbox text-center m-t-30">
          <a class="fuente" href="javascript:void(0)" @click="reset()">Desea subir otro archivo?</a>
        </p>
        <p v-if="isSuccess2" class="dropbox text-center m-t-30">
          <a class="fuente" href="javascript:void(0)" @click="reset()">Desea subir otro archivo?</a>
        </p>
        <p style="color: #CB4335" v-if="isFailed" class="dropbox text-center m-t-30">
          <a class="fuente" href="javascript:void(0)" @click="reset()">Error, vuelva a intentarlo, por favor!</a>
        </p>
      </transition>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="alert" class="row m-t-30">
        <div class="col-md-12">
        <div class="container-form-btn"> 
         <card class="regEstilo7">
          <i style="color: #fff;" class="fa fa-times m-t-1 pull-right" @click="oculAlert()"></i>
          <h5 class="alert-heading regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>DATO IMPORTANTE!</h5>
          <p class="fuente2 regEstilo5 m-t-20" align="justify">
            Recuerda subir de manera ordenada tus archivos ya que con ese orden se mostraran en el cuadernillo digital de tu expediente. Por otro lado, el total de los archivos adjuntados no debe superar el tamaño de 8 MB que equivale aproximadamente 8000 KB.
          </p>
          <!--<button @click="showModal()" style="width:250px; font-size: 13px" class="alertTuto-form-btn fuente m-t-30 m-b-20"><i class="fa fa-video-camera m-r-8"></i> VER VIDEO TUTORIAL</button>-->
         </card>
      </div>
      </div>
      </div>
      </transition>
      <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
      <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/PkOye4_wKlo?rel=0" allowfullscreen></b-embed>
      </modal>
      <div v-if="doc" class="col-md-12 mb-3">
        <br><button style="width:250px" @click="crearEscrito()" class="guardar-form-btn pull-right m-l-20 mb-3 fuente"><i class="fa fa-file m-r-5"></i> VISTA PREVIA</button>
        <button style="width:250px" @click="volver()" class="cancelar-form-btn pull-right mb-3 fuente"><i class="fa fa-times"></i> CANCELAR</button>
      </div>
   </div>
  </div>
  <transition name="fade" mode="out-in">
  <div v-if="previo" class="content">
       <template>
          <div class="row m-t-10 p-b-20">
          <div class="col-md-5 col-md-3">
            <label for="">Páginas</label>
            <div class="input-group">
              <input class="form-control" :max="numPages" min="1" v-model.number="page" type="text" style="height:35px;">
              <input class="form-control" v-model="numPages" type="text" style="height:35px; background-color:#EAEDED;" disabled>
              <button style="margin-left:10px; margin-right:8px;" @click="anterior" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.anterior"><i class="fa fa-chevron-left"></i></button>
              <button @click="siguiente" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.siguiente"><i class="fa fa-chevron-right"></i></button> 
            </div>
          </div>
          <div class="col-md-2"></div>
          <div class="col-md-5">
              <label>Herramientas</label><br>
              <button @click="rotate += 90" type="button" class="opciones-form-btn m-r-4 fuente" v-tooltip.top-center="tooltip.derecha"><i class="fa fa-repeat"></i></button>
              <button @click="rotate -= 90" type="button" class="opciones-form-btn fuente margin" v-tooltip.top-center="tooltip.izquierda"><i class="fa fa-undo"></i></button>
          </div>
         </div>
          <div v-if="loadedRatio > 0 && loadedRatio < 1" style="background-color: green; color: white; text-align: center" :style="{ width: loadedRatio * 100 + '%' }">{{ Math.floor(loadedRatio * 100) }}%
          </div>
          <pdf ref="pdf" style="border: 2px solid black" :src="pdfAdjunto" :page="page" :rotate="rotate"  @progress="loadedRatio = $event" @error="error" @num-pages="numPages = $event" @link-clicked="page = $event" loaded>
          </pdf>
       </template> 
        <div style="background-color: #fff" class="footer">
          <hr>
          <div class="row">
          <div class="col-md-10">
          <div class="stats">
            <i class="fa fa-key"></i> Usted esta visualizando este archivo bajo los estándares de seguridad establecidos.<br><br>
          </div>
          </div>
          <div class="col-md-2">
          <button style="margin-left:10px; margin-right:8px" @click="siguiente" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.siguiente"><i class="fa fa-chevron-right"></i></button>
          <button @click="anterior" type="button" class="opciones-form-btn fuente margin pull-right" v-tooltip.top-center="tooltip.anterior"><i class="fa fa-chevron-left"></i></button>
          </div>
          </div>
      </div>
      <div class="container-form-btn">
       <button align="center" @click="verDoc()" style="width:250px" class="cancelar-form-btn m-t-30 m-b-20 fuente"><i class="fa fa-arrow-circle-left m-r-5"></i> REGRESAR</button>
      </div>
  </div>
</transition>
</card>
</div>
</div>

</template>

<script>

  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'
  import pdf from 'vue-pdf'

  import { upload } from 'src/components/UIComponents/Files/UploadService';
  import { wait } from 'src/components/UIComponents/Files/UtilsFile';

  var base64ToString = process.env.VUE_ENV === 'server' ? function(base64) { return Buffer.from(base64, 'base64').toString() } : window.atob;

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    data () {
    return {
      titulo: 'Registro de solicitud',
      texto: 'Registre el tipo de escrito que desea solicitar adjuntando los documentos correspondientes.',
      sumilla: this.$store.state.sumiEscrito,
      contenido: this.$store.state.conteEscrito,
      loadedRatio: 0,
      page: '',
      pages: 1,
      numPages: '',
      rotate: 0,
      selected: null,
      maxCount: 100,
      recorreCount: 100,
      error: false,
      maxCount2: 900,
      recorreCount2: 900,
      alert: true,
      error2: false,
      mostrar: false,
      sumSize: this.$store.state.contadorFile,
      options: [],
      files: [],
      doc: true,
      previo: false,
      isVerifing: false,
      isSuccess2: false,
      pdfAdjunto: '',
      selectExped: {
        nidExpediente: null,
        cnumExpediente: null,
        ctxtTipoParte: null
      },
      exp: {
        nidExpediente: null,
        cnumExpediente: null,
        ctxtTipoParte: null
      },
      tooltip: 
      {
      subir: 'Subir',
      bajar: 'Bajar',
      anular: 'Remover',
      derecha: 'Derecha',
      izquierda: 'Izquierda',
      siguiente: 'Siguiente',
      anterior: 'Anterior',
      ver: 'Ver Adjunto'
      },
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'data',
      dataEscritos: []
     }
    },
    computed: {
      isInitial() {
        this.isVerifing = true;
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        this.isVerifing = false;
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    mounted: function () {
      this.cargaData();
    },
    methods: { 
      oculAlert(){
        this.alert = false;
      },
      cargaData(){
        if(this.$store.state.adjEscrito != ''){
        this.variables();
        for (var i = 0; i < this.$store.state.adjEscrito.length; i++) { 
          this.dataEscritos.push({
            name: this.$store.state.adjEscrito[i].adjName,
            size: this.$store.state.adjEscrito[i].adjSize,
            url: this.$store.state.adjEscrito[i].adjUrl
          });
        }
        this.isSuccess2 = true;
        this.$store.state.adjEscrito = [];
      }else{
        if(this.$store.state.newEscrito == null){
          this.$router.push('/escritos')
        }else{
          this.reset();
          this.variables();
        }         
      }
      },
      variables(){
        this.$store.state.segEscrito = 1;
        this.exp.nidExpediente = this.$store.state.nidEscrito;
        this.exp.cnumExpediente = this.$store.state.expEscrito;
        this.exp.ctxtTipoParte = this.$store.state.partEscrito;
        this.expedPerson();
      },
      reset() {
        this.isSuccess2 = false;
        this.currentStatus = STATUS_INITIAL;
        this.uploadError = null;
      },
      actualiza(){
        this.currentStatus = STATUS_SUCCESS;
        this.uploadError = null;
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
      save(formData) {
        this.currentStatus = STATUS_SAVING;
        upload(formData)
          .then(wait(1500))
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            var suma = this.$store.state.contadorFile;
            var tamaño = this.uploadedFiles[0].fileSize.toFixed();
            var total = parseInt(suma) + parseInt(tamaño);
            this.$store.state.contadorFile = 0;
            if(total <= 10000){
              this.dataEscritos.push({
                name: this.uploadedFiles[0].fileName,
                size: this.uploadedFiles[0].fileSize.toFixed(2),
                url: this.uploadedFiles[0].url
              });
              this.$store.state.contadorFile = total;
              this.sumSize = this.$store.state.contadorFile;
              this.addFile();
            }else{
              var total2 = parseInt(total) - parseInt(tamaño); 
              this.$store.state.contadorFile = total2;
              this.veriSize();
            }
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        const formData = new FormData();
        if (!fileList.length) return;
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });
        this.save(formData);
      },
      cuenta() {
        this.recorreCount = this.maxCount - this.sumilla.length;
        this.error = this.recorreCount < 10;
      },
      cuenta2() {
        this.recorreCount2 = this.maxCount2 - this.contenido.length;
        this.error2 = this.recorreCount2 < 100;
      },
      crearEscrito(){
        if(this.exp.cnumExpediente == null){
          this.validExpediente();
        }else if(this.sumilla == ''){
          this.validSumilla();
        }else if(this.contenido == ''){
          this.validContenido();
        }else{
          this.$store.state.nidEscrito = this.exp.nidExpediente;
          this.$store.state.expEscrito = this.exp.cnumExpediente;
          this.$store.state.partEscrito = this.exp.ctxtTipoParte;
          this.$store.state.sumiEscrito = this.sumilla;
          this.$store.state.conteEscrito = this.contenido;
          for (var i = 0; i < this.dataEscritos.length; i++) { 
            this.$store.state.adjEscrito.push({
              adjName: this.dataEscritos[i].name,
              adjSize: this.dataEscritos[i].size,
              adjUrl: this.dataEscritos[i].url
            });
          } 
          this.$router.push('/escritos/createEscrito/docEscrito')
        }
      },
      verPDF: function(index){
        this.$notify({group: 'auth', clean: true});
        this.newAdjunto();
        var item = index;
        var binaryVersionOfThePdf = '';
        var pdfDesca = this.dataEscritos[item].url;
        var myPdf = pdfDesca.substring(28);
        binaryVersionOfThePdf = base64ToString(myPdf);
        this.pdfAdjunto = {data: binaryVersionOfThePdf}
        this.doc = false;
        this.previo = true;
        this.titulo = 'Vista del Archivo Adjunto';
        this.texto = 'Visualice el archivo que esta adjuntando a su escrito para dar conformidad.';
        this.page = 1;
      },
      verDoc(){
        this.previo = false;
        this.doc = true;
        this.pdfAdjunto = '';
        this.titulo = 'Registro de solicitud';
        this.texto = 'Registre el tipo de escrito que desea solicitar adjuntando los documentos correspondientes.';
      },
      subir: function(index){
        var temporal = [];
        var item = index;
        if(item != 0){
          this.mostrar = true;
          temporal = this.dataEscritos[item - 1];
          this.dataEscritos[item - 1] = this.dataEscritos[item];
          this.dataEscritos[item] = temporal;  
          this.mostrar = false;
        }else{} 
      },
      bajar: function(index){
        var temporal = [];
        var item = index;
        var length = this.dataEscritos.length;
        if(item + 1 != length ){
          this.mostrar = true;
          temporal = this.dataEscritos[item + 1];
          this.dataEscritos[item + 1] = this.dataEscritos[item];
          this.dataEscritos[item] = temporal;  
          this.mostrar = false;
        }else{} 
      },
      remove: function(index){
        swal({
          title: "¿Desea eliminar el adjunto?",
          text: "El adjunto se eliminará de la lista",
          icon: "warning",
          buttons: ["No", "Si"],
          closeOnClickOutside: false
        }).then(value => {
          if (value == true) {
            var suma = this.$store.state.contadorFile;
            var tam = this.dataEscritos[index].size;
            var tamaño = Math.round(tam);
            var total2 = parseInt(suma) - parseInt(tamaño); 
            this.$store.state.contadorFile = total2;
            this.sumSize = this.$store.state.contadorFile;
            this.dataEscritos.splice(index, 1);
            this.removeFile();
          } else {
          }
        });
      },
      expedPerson(){ 
        swal({
          title: "Cargando datos",
          text: "Espere por favor...",
          buttons: false,
          dangerMode: true,
          icon: "static/img/loader.gif",
          closeOnClickOutside:false
        })
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/expediente/*/cbo')
        .then((response) => {
          this.options = response.data;
          swal.close();            
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
      clearFiles () {
        this.$refs.fileinput.reset();
      },
      fileAdd (file){
        this.files.push(file);
      },
      validExpediente(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Debe seleccionar el expediente!',
          type: 'info',
        });
      },
      validSumilla(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Debe ingresar una sumilla al escrito!',
          type: 'info',
        });
      },
      validContenido(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Debe ingresar un contenido al escrito!',
          type: 'info',
        });
      },
      addFile(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Se agregó el archivo correctamente!',
          type: 'success',
        });
      },
      removeFile(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Se eliminó el archivo correctamente!',
          type: 'info',
        });
      },
      veriSize(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Ud. está superando el límite de tamaño!',
          type: 'error',
        });
      },
  	  newAdjunto() {
  		swal({
  	      title: "Vista del archivo adjunto",
  	      text: "Verifique el archivo que acaba de adjuntar para continuar con la presentación de su escrito",
  	      buttons: [false, false],
  	      icon: "success",
  	      timer: '4000',
  	    });
  	  },
      volver(){
        swal({
          title: "¿Desea cancelar el escrito?",
          text: "Se borraran los datos que haya ingresado",
          icon: "warning",
          buttons: ["No", "Si"],
          closeOnClickOutside: false,
        })
        .then((value) => {
          if(value == true){
            this.$router.push('/escritos')
          }else{}
        });
      },
      showModal () {
      this.$modal.show('tuto');
      },
      hideModal () {
        this.$modal.hide('tuto');
      }
    },
    components: {
      Card,
      pdf 
    },
 
  }
</script>
