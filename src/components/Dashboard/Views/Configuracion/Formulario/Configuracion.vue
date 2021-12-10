<template>
  <div class="content">
    <div class="container-fluid">
    <card v-if="carga">
      <template slot="header">
      <div class="row" style="border-bottom: 1px solid #D6DBDF">
      <div class="col-md-12">
        <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
        <p class="card-category">Esta ventana permite registrar sus cuentas de correo y números telefónicos para notificarle cualquier actividad realizada sobre sus expedientes.</p><br>
      </div>
      </div> 
      </template>
      <div class="row m-t-10 fuente">
        <div class="col-md-4">
          <label>Usuario</label>
          <input type="text" class="form-control mb-3" v-model="nomUsuario" disabled>
        </div>
        <div class="col-md-4">
          <label>Correo</label>
          <input type="text" class="form-control mb-3" v-model="ctxtCorreo" :disabled="datosReg">
        </div>
        <div class="col-md-4"> 
          <label>Celular</label>
          <the-mask class="form-control imp-fue mb-2" mask="###-###-###" v-model="cnumCelular" :disabled="datosReg"/>
          <br>
        </div>
      </div> 
      <div class="row fuente m-b-10">
        <div class="col-md-12">
          <p class="card-category mb-3">El correo y celular que se visualiza arriba serán utilizados solo para los cambios de contraseña, nuevas solicitudes y escritos.</p>
        </div>
      </div>
      <div class="row fuente m-b-10">
        <div class="col-md-12">
          <button v-on:click="guardarDatos()" class="guardar-form-btn pull-right m-l-20 mb-3 fuente" :disabled="datosReg"><i class="fa fa-save m-r-5"></i> GUARDAR</button>
          <button v-if="edit" v-on:click="editarDatos()" class="editar-form-btn pull-right mb-3 fuente"><i class="fa fa-pencil m-r-5"></i> EDITAR</button>
          <button v-if="cancel" v-on:click="cancelarDatos()" class="cancelar-form-btn pull-right mb-3 fuente"><i class="fa fa-close m-r-5"></i> CANCELAR</button>
          <br><br>
          <br>
        </div>
      </div>
      <div class="row fuente">
        <div class="col-md-4">
          <label>Expedientes</label>
          <select class="form-control imp-fue mb-3" v-on:change="datExped(exp.idExpediente)" v-model="exp.idExpediente">
            <option :value="null" disabled>-- Seleccione un expediente --</option>
            <option v-for="expedientes in options" v-bind:key="expedientes.nidExpediente" v-bind:value="expedientes.nidExpediente">
            {{ expedientes.cnumExpediente }}
          </option> 
          </select>
        </div>
      </div>
      <transition name="fade" mode="out-in">
      <div class="row" v-if="ver">
      <div class="col-md-12">
          <div class="row">
            <div class="col-md-6">
              <label>Agregar Correo</label><br>
              <form @submit.prevent="guardarCorreo">
                <div class="input-group">
                  <b-form-input type="text" class="imp-fue" placeholder="Ingrese correo electrónico" :state="errorCorreo" v-model="correo" required />
                  <button class="configCorr-form-btn fuente" type="submit" v-tooltip.top-center="tooltip.correo"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
              </form>
                <br><label>Cuentas de Correo por Expediente</label><br>
                  <b-table bordered class="m-t-10"
                          responsive 
                          show-empty
                          stacked="xl"
                          :items="datCorreo"
                          :fields="fieldCorreo">    
                  <template slot="correos" slot-scope="data">
                    {{data.item.ctxtValor}}
                  </template>
                  <template slot="registro" slot-scope="data">
                    {{data.item.dfecCreacion}}
                  </template>
                  <template slot="delete" slot-scope="data">
                    <i @click="anularDatos(data.item)" v-tooltip.top-center="tooltip.anular" class="fa fa-times fa-2x" style="color:#CB4335;" aria-hidden="true"></i>
                  </template>
                  </b-table>
              </div>
              <div class="col-md-6">
                <label>Añadir Teléfono</label><br>
                <b-form @submit.prevent="guardarNumero">
                <div class="input-group">
                  <the-mask class="form-control imp-fue" mask="###-###-###" :state="errorNumero" v-model="numero" placeholder="Ingrese número celular" required/>
                  <button class="configNum-form-btn fuente" type="submit" v-tooltip.top-center="tooltip.numero"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                </b-form>
                <br><label>Números de Teléfono por Expediente</label><br>
                      <b-table bordered class="m-t-10"
                              responsive 
                              show-empty
                              stacked="xl"
                              :items="datNumero"
                              :fields="fieldNumero">    
                      <template slot="numeros" slot-scope="data">
                        {{data.item.ctxtValor}}
                      </template>
                      <template slot="registro" slot-scope="data">
                        {{data.item.dfecCreacion}}
                      </template>
                      <template slot="delete" slot-scope="data">
                        <i @click="anularDatos(data.item)" v-tooltip.top-center="tooltip.anular" class="fa fa-times fa-2x" style="color:#CB4335;" aria-hidden="true"></i>
                      </template>
                      </b-table>
                 </div>
               </div> 
            <br><p class="card-category">Solo se permite registrar 3 correos electrónicos y 2 números celulares por persona.</p><br>
          </div>
       </div>
     </transition>
    </card>
    <transition name="fade" mode="out-in">
      <div v-if="alert" class="row m-t-15">
      <div class="col-md-2"></div> 
      <div class="col-md-8"> 
      <div class="container-form-btn"> 
        <card class="regEstilo7">
          <i style="color: #fff;" class="fa fa-times m-t-1 pull-right" @click="oculAlert()"></i>
          <h5 class="alert-heading regEstilo6 fuente2"><i style="color: #fff;" class="fa fa-bell fa-2x m-t-10 m-b-5 m-r-30"></i>ACTUALIZA TU CORREO Y CELULAR PERSONAL O POR EXPEDIENTE!</h5>
          <p class="fuente2 regEstilo5 m-t-20" align="justify">
            Recuerda usar esta bandeja para modificar tus correos y celulares que utilizarás. En tus datos personales solo se permite tener un correo y un celular, mientras que para tus expedientes permitimos registrar 3 correos y 2 celulares.
          </p>
         <!--button @click="showModal()" style="width:250px; font-size: 13px" class="alertTuto-form-btn fuente m-t-30 m-b-20"><i class="fa fa-video-camera m-r-8"></i> VER VIDEO TUTORIAL</button>-->
        </card>
      </div>
    </div>
    </div>
    </transition>
  <modal transition="nice-modal-fade" height="auto" :reset="true" :adaptive="true" :draggable="true" name="tuto">
      <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/PkOye4_wKlo?rel=0" allowfullscreen></b-embed>
  </modal>
    </div>
</div>
</template>

<script>

  import Card from 'src/components/UIComponents/Cards/Card'
  import LTable from 'src/components/UIComponents/Tables/Table'
  import axios from 'axios'

  export default {
    name: 'configuracion',
    data () {
    return {
      name: 'configuracion',
      texto: 'Configuración personalizada de notificaciones',
      fieldCorreo: [
        { key: 'correos', label: 'CORREO', sortable: true },
        { key: 'registro', label: 'FECHA DE REGISTRO', sortable: true },
        { key: 'delete', label: 'ANULAR' }
      ],
      fieldNumero: [
        { key: 'numeros', label: 'NÚMERO', sortable: true },
        { key: 'registro', label: 'FECHA DE REGISTRO', sortable: true },
        { key: 'delete', label: 'ANULAR' }
      ],
      exp: {
        idExpediente: null,
        numExpediente: null
      },
      tooltip:{
        correo: 'Agregar Correo',
        numero: 'Agregar Celular',
        anular: "Anular Expediente",
        editar: 'Editar Registro',
        guardar: 'Guardar Cambio'
      },
      auto: [],
      options: [],
      datCorreo: [],
      datNumero: [],
      resultData: [],
      resultAnul: [],
      resultDatos: [],
      correo: '',
      numero: '',
      tipoDato: '',
      nomUsuario: '',
      ctxtCorreo: '',
      cnumCelular: '',
      ver: false,
      alert: false,
      datosReg: true,
      errorCorreo: null,
      errorNumero: null,
      carga: false,
      cancel: false,
      edit: true
     }
    },
    mounted: function () { 
      this.cargaView();
    },
    methods: {
      cargaView(){
        this.viewConfiguracion();
      },
      viewConfiguracion(){
        this.regla = 1;
        this.$store.dispatch("cargandoDatos2"); 
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
        .then((response) => {
          this.auto = response.data;
          if(this.auto.codError == 1){
            this.nomUsuario = this.$session.get('nomUsuario');
            this.limpiarParam();
            this.obtenerDatos();  
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
      limpiarParam(){
        this.$store.state.itemNoty = [];
        this.$store.state.adjEscrito = [];
        this.$store.state.contadorFile = 0;
        this.$store.state.sumiEscrito = ''; 
        this.$store.state.conteEscrito = ''; 
        this.$store.state.expEscrito = null;
        this.$store.state.nidEscrito = null;
        this.$store.state.segEscrito = null;
        this.$store.state.newEscrito = null;
        this.$store.state.idExpParam = null;
        this.$store.state.idExpParam2 = null;
        this.$store.state.idExpParam3 = null;
        this.$store.state.numExpParam = null;
        this.$store.state.numExpParam2 = null;
        this.$store.state.numServicio = null;
        this.$store.state.nomSolicitud = null;
        this.$store.state.idSolicitud = null;
        this.$store.state.partEscrito = null;
        this.$store.state.tipoParte = null;
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
      },
      obtenerDatos(){
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
            if(this.regla == 1){
              this.expedPerson();
            }
          }else{
            this.errorNotification();
          }                 
        },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            this.$store.dispatch("alertaError");
          }
        });
      },
      expedPerson(){ 
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/expediente/*/cbo')
        .then((response) => {
          this.options = response.data;
          this.carga = true;
          this.alert = true;
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
      errorView(){
        swal({
          title: "Advertencia de permisos",
          text: "Ud. no tiene permisos para esta opción",
          buttons: [false, false],
          icon: "warning",
          timer: '3000',
        });
      },
      editarDatos() {
        this.datosReg = false;
        this.edit = false
        this.cancel = true;
      },
      cancelarDatos() {
        this.datosReg = true;
        this.edit = true;
        this.cancel = false;
        this.ctxtCorreo = this.resultDatos.ctxtCorreo;
        this.cnumCelular = this.resultDatos.ctxtCelular;
      },
      guardarDatos(){
        if(this.ctxtCorreo == '' || this.cnumCelular == ''){
          this.errorNotification3();
        }else if(!this.validEmail(this.ctxtCorreo)){
          this.errorNotification2();
        }else if(!this.validNumero(this.cnumCelular)){
          this.errorNotification2();
        }else{
          swal({
            title: "¿Desea guardar los cambios?",
            text: "Se actualizarán los cambios en sus datos",
            icon: "warning",
            buttons: ["No", "Si"],
            closeOnClickOutside: false,
          })
          .then((value) => {
            if(value == true){
            axios.defaults.headers.common['Authorization'] = this.$session.get('token')
            axios.post(this.$store.state.serverCas2 + '/operaciones/persona/upd/datos',
            { 
              'cnomUsuario':this.$session.get('user'), 
              'ctxtCorreo': this.ctxtCorreo,
              'cnumCelular': this.cnumCelular,
            }).then((response) => {
              this.resultDatos = response.data;
              if(this.resultDatos.codError == 1){
                this.regla = 0;
                this.datosReg = true;
                this.edit = true;
                this.cancel = false;
                this.obtenerDatos();
                this.successNotification();
                this.datosReg = true;
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
            }else{
              this.datosReg = true;
            }
          });
        } 
      },
      guardarCorreo:function (){
      if(!this.validEmail(this.correo)){
           this.errorEmail();
        }else{
          this.correoNew = this.correo
          this.correoNew = this.correoNew.toUpperCase(),
          this.tipoDato = 'C';
          this.result = '',
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/configUser/insert',
           {
             'nidExpediente': this.exp.idExpediente,
             'ctxtTipo': this.tipoDato,
             'ctxtValor': this.correoNew,
             'cnomUsuario': this.$session.get('user'),
             'cnumIp': this.$session.get('ip'),
             'cnomCiudad': this.$session.get('city'),
             'cnomPais': this.$session.get('country')
           }
          ).then((response) => {
            this.resultData = response.data;
            if(this.resultData.codRpta == 1){
              this.errorCorreo = null;
              this.successNotification();
              this.datExped();
              this.limpiarCorreo();
            }else if(this.resultData.codRpta == 2){
              this.warningNotification();
              this.datExped();
              this.limpiarCorreo();
            }else if(this.resultData.codRpta == 3){
              this.warning2Notification();
              this.limpiarCorreo();
            }else {
              this.errorNotification();
              this.limpiarCorreo();
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
      }},
      guardarNumero:function (){
      if(!this.validNumero(this.numero)){
           this.errorNumber();
        }else{
          this.tipoDato = 'N';
          this.result = '',
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/configUser/insert',
           {
           'nidExpediente': this.exp.idExpediente,
           'ctxtTipo': this.tipoDato ,
           'ctxtValor': this.numero,
           'cnomUsuario': this.$session.get('user'),
           'cnumIp': this.$session.get('ip'),
           'cnomCiudad': this.$session.get('city'),
           'cnomPais': this.$session.get('country')
           }
          ).then((response) => {
            this.resultData = response.data;
            if(this.resultData.codRpta == 1){
              this.successNotification();
              this.datExped();
              this.limpiarCelular();
            }else if(this.resultData.codRpta == 2){
              this.warningNotification();
              this.datExped();
              this.limpiarCelular();
            }else if(this.resultData.codRpta == 3){
              this.warning2Notification();
              this.limpiarCelular();
            }else {
              this.errorNotification();
              this.limpiarCelular();
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
      }},
      datExped: function(){ 
      this.$store.dispatch("cargandoDatos2");  
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/configUser/list',
      {
        'nidExpediente': this.exp.idExpediente
      }
      ).then((response) => {
          this.result = response.data; 
          this.datCorreo = this.result.listCorreo;
          this.datNumero = this.result.listNumero; 
          this.alert = false;
          this.ver = true;
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
      anularDatos: function(item){
        swal({
          title: "¿Desea anular el registro?",
          text: "El registro dejara de recibir notificaciones",
          icon: "warning",
          buttons: ["No", "Si"],
          closeOnClickOutside: false,
        })
        .then((value) => {
          if(value == true){
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + '/configUser/delete',
          { 
            'nidUsuarioContacto':item.nidUsuarioContacto, 
            'nidExpediente': this.exp.idExpediente,
            'cnomUsuario': this.$session.get('user'),
            'cnumIp': this.$session.get('ip'),
            'cnomCiudad': this.$session.get('city'),
            'cnomPais': this.$session.get('country'),
            'ctxtInfo': item.ctxtValor,
            'ctxtTipo': item.ctxtTipo
          }
          ).then((response) => {
              this.resultAnul = response.data;
              this.result = response.data;
              if(this.result.codRpta == 1){
                this.infoNotification();
                this.datExped();
                this.limpiarDatos();
              }else{
                this.errorNotification();
                this.limpiarDatos();
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
          }else{}
        });
      },
      validEmail:function(correo) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(correo);
      },
      validNumero:function(numero) {
        var re = /^9[\d]{8}$/;
        return re.test(numero);
      },
      successNotification() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Registro guardado correctamente!',
            type: 'success',
        });
      },
      infoNotification() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Registro anulado correctamente!',
            type: 'info',
        });
      },
      warningNotification() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Cantidad de registros excedidos!',
            type: 'info',
        });
      },
      warning2Notification() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Registro ingresado ya existente!',
            type: 'info',
        });
      },
      errorNotification() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Error, consulte con el administrador!',
            type: 'error',
        });
      },
      errorEmail() {
        this.errorCorreo = false;
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'El correo electrónico ingresado es incorrecto!',
            type: 'error',
        });
      },
      errorNumber() {
        this.errorNumero = false;
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'El número celular ingresado es incorrecto!',
            type: 'error',
        });
      },
      errorNotification3() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Ingrese los datos solicitados!',
            type: 'error',
        });
      },
      limpiarCorreo(){
        this.correo = ''
      },
      limpiarCelular(){
        this.numero = ''
      },
      oculAlert(){
        this.alert = false;
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
      LTable
    }
  }

</script>
