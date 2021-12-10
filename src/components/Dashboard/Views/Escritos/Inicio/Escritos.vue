<template>
  <div class="content">
    <div class="container-fluid">
      <card v-if="carga">
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-8">
          <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
          <p class="card-category">Presente los siguientes escritos a través de nuestra plataforma.</p><br>
        </div>
        <div v-if="!visible" class="col-md-4">
          <button @click="mostrar()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
        </div>
        </div> 
        </template>
        <div class="container-fluid">
          <div v-if="visible" class="row m-t-20">
          <div class="col-md-4">
            <div class="order-collapse blue">
              <a class="order-collapse__header">
                <h4 class="card-title">Consigna de Correo Electrónico</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Registra o actualiza tu correo electrónico para la institución.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse green">
              <a class="order-collapse__header">
                <h4 class="card-title">Designa de Abogado</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Designa tu abogado en la institución por este medio de manera virtual.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse purple">
              <a class="order-collapse__header">
                <h4 class="card-title">Solicitud de Informe Escrito</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Solicita un escrito referente a diversas solicitudes.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="visible" class="row">
          <div class="col-md-4">
            <div class="order-collapse gray">
              <a class="order-collapse__header">
                <h4 class="card-title">Solicitud de Informe Oral</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Solicita un informe oral sobre tu caso en la institución.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse coral">
              <a class="order-collapse__header">
                <h4 class="card-title">Lectura del Expediente</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Solicita lectura de tu expediente que tengas en la institución.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse marengo">
              <a class="order-collapse__header">
                <h4 class="card-title">Señale Fecha de Visita</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Señala tu fecha de visita de acuerdo a tus casos en el tribunal.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="visible"  class="row">
          <div class="col-md-4">
            <div class="order-collapse orange">
              <a class="order-collapse__header">
                <h4 class="card-title">Solicitud de Copia de Video</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Presenta un escrito solicitando copia de videos referente a tu proceso.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse celest">
              <a class="order-collapse__header">
                <h4 class="card-title">Solicitud de Copias</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Solicita diversas copias mendiante un escrito por este medio digital.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse ambar">
              <a class="order-collapse__header">
                <h4 class="card-title">Uso de la Palabra</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Presenta un escrito para optar por el uso de la palabra.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!visible" class="row">
          <div class="col-md-4">
            <div class="order-collapse orange">
              <a class="order-collapse__header">
                <h4 class="card-title">Crear Escrito</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">Utiliza esta opción para crear un escrito junto con sus archivos adjuntos. Este escrito obtendrá la firma digital de nuestra institución.</p>
              </div>
              <router-link to="/escritos/createEscrito">
                <button style="width:250px" @click="setNewEscrito()" class="guardar-form-btn pull-right mb-3 fuente" type="submit"><i class="fa fa-check mr-1"></i> CREAR ESCRITO</button>
              </router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="order-collapse celest">
              <a class="order-collapse__header">
                <h4 class="card-title">Subir Escrito</h4>
              </a>
              <div class="collapse show order-collapse-inner">
                <p class="card-category">En esta opción podrás subir tu escrito previamente elaborado, el cual deberá contar con tu firma digital propia de la RENIEC.</p>
              </div>
              <button style="width:250px" @click="mostrarSubida()" class="editar-form-btn pull-right mb-3 fuente" type="submit"><i class="fa fa-check mr-1"></i> SUBIR ESCRITO</button>           
            </div>
          </div>
        </div>
        <div v-if="visible" class="col-md-12">
            <button style="width:250px" @click="mostrar()" class="guardar-form-btn pull-right mb-3 fuente" type="submit"><i class="fa fa-check mr-1"></i> INICIAR PROCESO</button>
        </div>
        <!--
        <div class="col-md-12">
            <button style="width:250px" @click="setNewEscrito()" class="guardar-form-btn pull-right mb-3 fuente" type="submit"><i class="fa fa-check mr-1"></i> INICIAR PROCESO</button>
        </div>
        -->
      </div>
    </card>
    <card v-if="subida">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-8">
          <h5 style="font-size: 18px" class="card-title">Subida de escrito</h5>
          <p class="card-category">Adjunte el escrito asociado al expediente para subir al sistema. </p><br>
        </div>
        <div class="col-md-4">
          <button @click="mostrarSubida()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
        </div>
        </div> 
      </template>
      <div class="row m-t-10">
        <div class="col-md-6 fuente">
            <label>Seleccione N° de Expediente</label>
              <select class="form-control imp-fue mb-3" v-model="exp">
              <option :value="selectExped" disabled>-- Seleccione expediente --</option>
              <option v-for="expedientes in options" v-bind:value="expedientes">
                {{ expedientes.cnumExpediente }}
              </option> 
              </select>
            <label v-if="verte">Adjunta tu Archivo PDF</label>
            <span v-if="verte" style="font-size: 13px" class="btn btn-file fuente alertTuto2-form-btn"><i class="fa fa-cloud-upload m-r-8"></i> SELECCIONA TU ARCHIVO AQUÍ
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </span>
            <card v-if="!verte">
            <ul class="btn-upload__files">
              <li class="btn-upload__file">{{model.documento + " / " + model.tamano + " KB / "}}
                <i @click="limpiarArchivo()" class="fa fa-times" style="color:#CB4335;" v-tooltip.top-center="tooltip.anular"></i>
              </li>
            </ul>
            </card>
        </div>
        <div class="col-md-6">
            <transition name="fade" mode="out-in">
              <div v-if="alert" class="row m-t-20">
                <div class="col-md-12">
                  <div class="container-form-btn"> 
                    <card class="regEstilo7">
                      <i style="color: #fff;" class="fa fa-times m-t-1 pull-right" @click="oculAlert()"></i>
                      <h5 class="alert-heading regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>DATO IMPORTANTE!</h5>
                      <p class="fuente2 regEstilo5 m-t-20" align="justify">
                        La visualización del escrito estará disponible 30 min despues de haberse subido al sistema. Recuerda tambien subir el archivo firmado con tu firma digital de RENIEC. Por otro lado, el archivo adjuntado no debe superar el tamaño de 10 MB que equivale aproximadamente 10000 KB.
                      </p>
                    </card>
                  </div>
                </div>
              </div>
            </transition>
        </div>
      </div>
      <div class="p-signup__form-content m-t-30">
          <div class="container-form-btn">
            <button @click="corregir()" style="width:300px;" class="cancelar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-arrow-circle-left m-r-3"></i> CANCELAR</button>
            <button @click="subirArchivoEsc()" style="width:300px;" class="editar-form-btn m-l-10 m-r-10 m-b-20 fuente"><i class="fa fa-paper-plane m-r-5"></i> ENVIAR ESCRITO</button>
          </div>
      </div>
  </card>
</div>
</div>

</template>

<script>

  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'

  export default {
    name: 'escritos',
    components: {
      Card
    },
    data () {
    return {
      texto: 'Presentación de nuevo escrito',
      name: 'escritos',
      carga: false,
      visible: true,
      subida: false,
      alert: true,
      options: [],
      files: [],
      model: {
          documento: '',
          tamano: ''
      },
      exp: {
        nidExpediente: null,
        cnumExpediente: null,
        ctxtTipoParte: null
      },
      selectExped: {
        nidExpediente: null,
        cnumExpediente: null,
        ctxtTipoParte: null
      },
      tooltip: {
        anular: 'Remover'
      },
      verte: true
     }
    },
    mounted: function () {
      this.cargaView();
    },
    methods: {
      subirArchivoEsc: function() {
        if(this.exp.cnumExpediente !== null && this.exp.nidExpediente !== null && this.exp.ctxtTipoParte !== null){
          if(this.model.documento !='' && this.model.tamano !== ''){
            swal({
              title: "¿Desea finalizar el escrito?",
              text: "Luego de terminar revise su bandeja de entrada de su correo para obtener mayor información.",
              icon: "warning",
              buttons: ["No", "Si"],
              closeOnClickOutside: false
            }).then(value => {
              if (value == true) {
              this.$store.dispatch("finalizandoEscrito");
              let fromData = new FormData();
              fromData.append('newPdf', this.files)
              fromData.append('ctxtSumilla', "--")
              fromData.append('cnumExpediente', this.exp.cnumExpediente)
              fromData.append('nidExpediente', this.exp.nidExpediente)
              fromData.append('ctxtParte', this.exp.ctxtTipoParte)
              fromData.append('ctxtTipoEnvio', "M")
              fromData.append('cnumIp', this.$session.get('ip'))
              fromData.append('cnomCiudad', this.$session.get('city'))
              fromData.append('cnomPais', this.$session.get('country'))
              fromData.append('ctxtInfo', "0")
              fromData.append('usuario', this.$session.get('user'))
              axios.defaults.headers.common['Authorization'] = this.$session.get('token')
              axios.post(this.$store.state.serverOfi + "/es/uploadFileAdj", fromData,
              ).then(response => {
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
          }else{
             this.validArchivo();
          }
        }else{
           this.validExpediente();
        }
      },
      finalizar(){
        this.$session.set('tokService', 1)
        this.$router.push('/completEscrito')
      },
      handleFileUpload(){
        this.files = this.$refs.file.files[0];
        let name = this.files.name;
        let size = this.files.size;
        let type = this.files.type;
        if(size <= 10485760){
            if(type == 'application/pdf'){
                this.model.documento = name;
                this.model.tamano = size;
                this.verte = false;
            }else{
                this.errorArchivo();
            }
        }else{
            this.errorArchivo2();
        }
      },
      corregir(){
        swal({
          title: "¿Desea cancelar la subida?",
          text: "Regresará a la opción de selección de tipo de subida escrito",
          icon: "warning",
          buttons: ["No", "Si"],
          closeOnClickOutside: false,
        })
        .then((value) => {
          if(value == true){
            this.subida = false;
            this.carga = true;
          }else{}
        });
      },
      cargaView(){
        this.$store.state.newEscrito = null;
        if(this.$store.state.segEscrito == null){
           this.viewEscritos();
        }else{
           this.limpiarParam();
           this.carga = true; 
           swal.close();
        }
      },
      viewEscritos(){
        this.cargaRegistros();
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
        .then((response) => {
          this.auto = response.data;
          if(this.auto.codError == 1){
            this.limpiarParam();
          }else{
            this.errorView();
            this.$router.go(-1);
          }
        },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else if(error.response.status === 403){
            this.errorView();
            this.$router.go(-1);
          }else{
            swal.close();
            this.$store.dispatch("alertaError");
          }
        });
      },
      oculAlert(){
        this.alert = false;
      },
      mostrar(){
         if(this.visible == true){
           this.visible = false;
         }else{
           this.visible = true;
         }
      },
      mostrarSubida(){
         if(this.subida == true){
            this.subida = false;
            this.carga = true;
         }else{
            this.carga = false;
            this.subida = true;
         }
      },
      expedPerson(){ 
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/expediente/*/cbo')
        .then((response) => {
          this.options = response.data;
          this.carga = true; 
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
      limpiarParam(){
        this.$store.state.returnEscrito = 0;
        this.$store.state.itemNoty = [];
        this.$store.state.adjEscrito = [];
        this.$store.state.contadorFile = 0;
        this.$store.state.sumiEscrito = ''; 
        this.$store.state.conteEscrito = ''; 
        this.$store.state.expEscrito = null;
        this.$store.state.nidEscrito = null;
        this.$store.state.partEscrito = null;
        this.$store.state.tipoParte = null;
        this.$store.state.idExpParam = null;
        this.$store.state.idExpParam2 = null;
        this.$store.state.idExpParam3 = null;
        this.$store.state.numExpParam = null;
        this.$store.state.numExpParam2 = null;
        this.$store.state.numServicio = null;
        this.$store.state.nomSolicitud = null;
        this.$store.state.idSolicitud = null;
        this.$store.state.pagTableFormPre = null;
        this.$store.state.pagTableFormNot = null;
        this.$store.state.pagTableFormAut = null;
        this.$store.state.pagTableFormExp = null;
        this.$store.state.pagTableFormRev = null;
        this.$store.state.pagTableFormAnu = null;
        this.$notify({group: 'auth', clean: true});
        this.$notify({group: 'custom-template2', clean: true});
        this.$notify({group: 'custom-template3', clean: true});
        this.$notify({group: 'custom-template4', clean: true});
        this.expedPerson();
      },
      validExpediente(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Debe seleccionar el expediente!',
          type: 'info',
        });
      },
      validArchivo(){
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Debe seleccionar un archivo!',
          type: 'info',
        });
      },
      cargaRegistros(){
        swal({
          title: "Cargando datos",
          text: "Espere por favor...",
          buttons: false,
          dangerMode: true,
          icon: "static/img/loader.gif",
          closeOnClickOutside:false,
        })
      },
      errorView(){
        swal({
          title: "Error en el acceso",
          text: "Ud. no tiene permisos para esta opción",
          buttons: [false, false],
          icon: "error",
          timer: '3000',
        });
      },
      errorArchivo(){
        this.limpiarArchivo();
        swal({
          title: "Error en el archivo",
          text: "El archivo no cumple con el formato establecido",
          buttons: [false, false],
          icon: "error",
          timer: '3000',
        });
      },
      errorArchivo2(){
        this.limpiarArchivo();
        swal({
          title: "Error en el archivo",
          text: "El archivo excede el tamaño permitido",
          buttons: [false, false],
          icon: "error",
          timer: '3000',
        });
      },
      limpiarArchivo(){
        this.files = '';
        this.model.documento = '';
        this.model.tamano = '';
        this.verte = true;
      },
      setNewEscrito () {
        //this.$notify({group: 'custom-template5', clean: true});
        //this.$store.dispatch("alertSubidas");
        this.$store.commit('setNewEscrito', 1);
      }
    } 
  }

</script>

<style lang="scss">

</style>