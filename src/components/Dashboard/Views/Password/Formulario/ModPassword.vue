<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
            <card>
            <div class="m-home-center__section2 m-t-20">
              <header class="special contentIcon">
                <span class="m-home-center__section-icon pe-7s-unlock"></span><br>
              </header>
              <a style="text-decoration:none;" class="m-home-center__section-name">CAMBIA TU CONTRASEÑA</a>
              <div class="m-home-center__section-desc">
              <br>Genera tu nueva contraseña para acceder al sistema.<br>
              </div>
            </div>
            <div class="text-center p-signup__form-link fuente m-t-30">
              Estimado(a) <strong>{{ datosCompletos }}</strong>, proceda a cambiar su contraseña.
            </div>
              <div class="row m-t-40">
               <div class="col-md-1"></div>
               <div class="col-md-5">
                <label>Ingrese la Contraseña</label>
                <password v-model="pass1" :toggle="true" @score="showScore" class="form-control mb-3 imp-fue"></password>
               </div>
              <div class="col-md-5">
                <label>Repita la Contraseña</label>
                <b-input-group>
                  <input :type="passwordFieldType" class="form-control imp-fue" v-model="pass2"/>
                  <b-btn v-tooltip.top-center="tooltip" @click="switchVisibility" id="contraseña"><i class="fa fa-eye"></i></b-btn>
                </b-input-group>
                <transition name="fade" mode="out-in">
                  <div v-if="showAlert" :class="colorAlerta">
                    <p style="height:15px; font-size:14px;" class="fuente m-t-8">{{ alerta }}</p>
                  </div>
                </transition>
               </div>
              </div>
            <div class="container-form-btn m-t-30 m-b-10">
              <button v-on:click="getPaswword" style="width:300px;" class="guardar-form-btn fuente m-l-10 m-r-10"><i class="fa fa-floppy-o m-r-5"></i> GUARDAR CAMBIOS</button>
            </div>
            <div class="row m-t-40 m-b-20"> 
            <div class="col-md-1"></div> 
            <div class="col-md-10 instruc"> 
              <div align="center" class="col-md-12 m-t-50 m-b-20 m-l-30 p-r-60">
                <h2 align="center" class="fuente regEstilo1 m-b-30 m-r-10"><i style="font-size: 80px; color: #fff" class="pe-7s-bookmarks m-r-10 m-b-5"></i>Instrucciones</h2>
                <p class="fuente m-r-10 regEstilo2" align="justify">Recuerda usar esta ventana cuando desees mejorar la seguridad de tu contraseña. Para que tu contraseña sea segura deberá contar con estos requisitos:
                </p>
              </div>
              <div class="col-md-12 m-b-60 m-l-30 p-r-60">
                <ul class="m-t-30 m-l-20 m-r-20 fuente regEstilo2">
                  <li class="m-b-10">Debe contener números aleatorios.</li>
                  <li class="m-b-10">Debe contener mínimo 8 caracteres.</li>
                  <li class="m-b-10">Utilice caracteres en mayúsculas.</li>
                  <li class="m-b-10">Tambien puedes usar solo estos simbolos $#)</li>
                </ul>
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

import axios from 'axios'
import Card from 'src/components/UIComponents/Cards/Card'
import Password from 'src/components/UIComponents/Password/Password'
import { actions } from 'vuex';

export default {
  name: 'modPassword',
  data: function () {
    return {
      pass1: null,
      pass2: '',
      token: '',   
      tooltip: 'Ver Contraseña',   
      datosCompletos: this.$session.get('nomUsuario'),
      onVerify: '',
      onExpired: '',
      tootltip: 'Validar',
      titulo: "ACTUALIZA TU CONTRASEÑA",
      texto: "Ingresa tu nueva contraseña para proteger tu acceso a la VENTANILLA JURISDICCIONAL.",
      items: [],
      puntaje:'',
      alerta:'',
      showAlert: false,
      colorAlerta:'',
      scorePass: '',
      alert: true,
      passwordFieldType: 'password',
    }
  },    
  mounted: function () { 
    this.$store.state.itemNoty = [];
    this.$store.state.adjEscrito = [];
    this.$store.state.contadorFile = 0;
    this.$store.state.sumiEscrito = ''; 
    this.$store.state.conteEscrito = ''; 
    this.$store.state.nomSolicitud = null;
    this.$store.state.idSolicitud = null;
    this.$store.state.idExpParam = null;
    this.$store.state.idExpParam2 = null;
    this.$store.state.idExpParam3 = null;
    this.$store.state.numExpParam = null;
    this.$store.state.numExpParam2 = null;
    this.$store.state.numServicio = null;
    this.$store.state.expEscrito = null;
    this.$store.state.nidEscrito = null;
    this.$store.state.segEscrito = null;
    this.$store.state.newEscrito = null;
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
  methods: { 
   resetPassword(){
    axios.defaults.headers.common['Authorization'] = this.$session.get('token')
    axios.post(this.$store.state.serverOfi + '/configUser/resetPasswordInt',
    { 
     cnumDni: this.$session.get('dni'),
     ctxtClave: this.pass1,
     cnumIp: this.$session.get('ip'),
     cnomCiudad: this.$session.get('city'),
     cnomPais: this.$session.get('country'),
    }
    ).then((response) => {
      this.items = response.data;
      if(this.items.codRpta == 1){
        swal.close();
        swal({
          title: "Correo enviado",
          text: this.items.desRpta,
          buttons: [false, false],
          icon: "success",
          timer: '3000',
        });
        this.pass1 = '';
        this.pass2 = '';
      }else if(this.items.codRpta == 5){
        this.$store.dispatch("alertaError");
      }else{
        this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, consulte con el administrador!',
          type: 'error'
        });
        this.pass1 = '';
        this.pass2 = '';
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
   returnToken(){
    this.datUrl = window.location.hash.split("#/resetPassword?")[1];
    if(this.datUrl != null){
     this.dni = this.datUrl.substr(0,8);
     this.token = this.datUrl.substr(9);
    }else{
      this.$router.push('/')
    }
   },
   validPassA(){
    if(this.pass1 == '' || this.pass2 == ''){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Complete los campos solicitados!',
        type: 'error'
      });
      this.pass1 =''; this.pass2 = '';
      this.showAlert = false;
    }else if(this.pass1 != this.pass2){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Las contraseñas no coinciden!',
        type: 'error'
      });
      this.pass1 = ''; this.pass2 = '';
      this.showAlert = false;
    }else if(this.pass1 == this.pass2){
        if(this.scorePass == 4 || this.scorePass == 3){
          this.$store.dispatch("cargandoDatos2");
          this.resetPassword();
        }else if(this.scorePass == 2 || this.scorePass == 1 ||  this.scorePass == 0){
          this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'La contraseña generada no es segura!',
            type: 'error'
          });
        }else{} 
    }else{}
   },
   validPassB(){
     this.showAlert = true;
     if(this.puntaje == 4){
       this.alerta = 'Contraseña muy segura';
       this.colorAlerta = 'w3-panel w3-green';
       this.scorePass = this.puntaje;
     }if (this.puntaje == 3){
       this.alerta = 'Contraseña segura';
       this.colorAlerta = 'w3-panel w3-green';
      this.scorePass = this.puntaje;
     }if (this.puntaje == 2){
       this.alerta = 'Contraseña simple';
       this.colorAlerta = 'w3-panel w3-red';
       this.scorePass = this.puntaje;
     }if (this.puntaje == 1){
       this.alerta = 'Contraseña insegura';
       this.colorAlerta = 'w3-panel w3-red';
     }if (this.puntaje == 0){
       this.alerta = 'Contraseña muy insegura';
       this.colorAlerta = 'w3-panel w3-red';
       this.scorePass = this.puntaje;
     }
   },
   showScore(score) {
      this.puntaje = score;
      this.validPassB();
      if(this.pass1 == ''){
         this.showAlert = false;
      }
   },
   getPaswword: function(){ 
      this.validPassA();
   },
   switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  },
  components: {
      Card,
      Password
  }
}

</script>

<style lang="css">
</style>