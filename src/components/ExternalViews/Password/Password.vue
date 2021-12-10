<template>
  <transition name="slide-fade">
  <div class="limiter">
    <div class="container-login100 fuente">
      <Logo></Logo>
      <div class="wrap-login100">
      <div class="wrap-logo"> 
      <a href="https://www.tc.gob.pe" target="_blank">
        <img src="https://tc.gob.pe/intranet/iconos/imgLogoRojo.png" alt="escudo"><br>
        <img src="https://tc.gob.pe/intranet/iconos/txtLogoRojo.png" alt="escudo">
      </a><br>
      </div>
        <div class="login100-form m-t-30 validate-form">
          <span class="login100-form-title fuente">
            Solicita tu contraseña
          </span>
          <span class="txt1 p-t-10 p-b-11">
            Ingresa tu N° de DNI
          </span>
          <div class="wrap-input100 validate-input m-b-25" requerid>
            <span class="btn-show-pass">
               <i class="fa fa-indent"></i>
            </span> 
            <the-mask class="input100 imp-fue" mask="########" v-model="dni"/>
            <span class="focus-input100"></span>
          </div>
          <div class="container-form-btn m-t-10">
            <div class="p-signup__form-link">
               <label>Para continuar, por favor completa la operación</label>
            </div>
          </div>
          <div class="container-form-btn m-t-10">
            <card style="border: 1px solid #888888">
            <div class="input-group">
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="numIni" disabled />
              <b-form-input :style="estiOper" class=" text-center mb-2" type="text" v-model="oper" disabled />
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="numFin" disabled />
              <b-form-input style="font-size: 20px; color: red; width: 50px" class="text-center mb-2" type="text" v-model="igual" disabled />
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="resuOper" />
            </div>
            </card>
          </div>
          <div class="container-form-btn">
            <button @click="valiDatos()" class="login-form-btn fuente"><i class="fa fa-envelope"></i> ENVIAR</button>
          </div>
          <div class="text-center p-t-30 p-b-20">
            <p align="justify" class="txt4">
              Al ingresar su DNI se enviará su nueva contraseña. Revise la bandeja de entrada de su correo o los mensajes de texto de su número celular ya registrado anteriormente.
            </p>
            <div class="p-t-10">
              <router-link to="/login">
              <a class="txt3 nounderline" href="#">
                <i class="fa fa-sign-in m-l-5" aria-hidden="true"></i>
                 Regresar a Login
              </a>
              </router-link>
            </div>
            <div class="p-t-20">
              <router-link to="/">
              <a class="txt3 nounderline" href="#">
                <i class="fa fa-home m-l-5" aria-hidden="true"></i>
                Regresar al Portal
              </a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>

import axios from 'axios'
import Card from "src/components/UIComponents/Cards/Card";
import Logo from "src/components/Dashboard/Layout/Textual/Logo";

import { actions } from 'vuex';

export default {
    data (router) {
    return {
      dni: '',
      numIni: '',
      oper: '',
      numFin: '',
      igual: '',
      resuOper: '',
      estiOper: '',
      lists: [],
      lists2: []
    }
  },
  mounted: function () {
    this.$store.state.tutorial = 0;
    this.$notify({group: 'auth', clean: true});
    if (!this.$session.exists()) {
      this.$router.push('/password')
      this.antiRobot();
      this.returnIp();
    } else {
      this.$router.push('/inicio')
    }  
  },
  methods:{
    antiRobot(){
      var arrayDiv = new Array(2, 4, 6, 8, 10);
      var arrayOper = new Array('+', '-', 'x', '/');
      var alea1 = Math.round(Math.random()*10);
      var alea2 = Math.round(Math.random()*10);
      var operando = arrayOper[Math.floor(Math.random()*arrayOper.length)];
      var numDiv = arrayDiv[Math.floor(Math.random()*arrayDiv.length)];
      this.numIni = alea1
      this.numFin = alea2
      this.oper = operando
      this.igual = '='
      if(this.oper == '+'){
        this.estiOper = 'font-size: 20px; color: red; width: 50px';
        this.resuOper2 = this.numIni + this.numFin;
      }else if(this.oper == '-'){
        this.estiOper = 'font-size: 20px; color: red; width: 50px';
        if(this.numIni >= this.numFin){
          this.resuOper2 = this.numIni - this.numFin;
        }else{
          var conIni = this.numFin
          var conFin = this.numIni
          this.numIni = conIni
          this.numFin = conFin
          this.resuOper2 = this.numIni - this.numFin;
        }
      }else if(this.oper == 'x'){
        this.estiOper = 'font-size: 13px; color: red; width: 50px';
        this.resuOper2 = this.numIni * this.numFin;
      }else if(this.oper == '/'){
        this.oper = '÷'
        this.numIni = numDiv
        this.numFin = numDiv / 2
        this.estiOper = 'font-size: 20px; color: red; width: 50px';
        this.resuOper2 = this.numIni / this.numFin;
      }else{}
    },
    returnIp(){
     axios.get(this.$store.state.apiIp) 
     .then((response) => {
      this.lists = response.data;
      this.ip = this.lists.ip;
      this.city = this.lists.city;
      this.country = this.lists.country_name;
     });
    },
    valiDatos(){
      if(this.dni == ''){
        this.faltaDatNotification();
      }else if(this.dni.length != 8){
        this.completaNotification();
      }else if (this.resuOper2 != this.resuOper){
        this.$store.dispatch('aritmeticaNotification');
      }else{
        this.veriDni();
      }
    },
    veriDni(){
      swal({
        title: "Verificando datos",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.post(this.$store.state.serverOfi + '/solResetPassword',
      {
        'cnomParam': this.dni,
        'cnumIp': this.ip,
        'cnomCiudad': this.city,
        'cnomPais': this.country
      }
      ).then((response) => {
        this.lists2 = response.data;
        swal.close();
        if (this.lists2.codRpta == 1) {
          swal({
            title: "Correo enviado",
            text: this.lists2.desRpta,
            icon: "warning",
            buttons: [null, "Aceptar"],
            closeOnClickOutside: false
          }).then(value => {
            if (value == true) {
             this.$router.push("/login");
            }else{this.$router.push("/login");}
          })
        }else if (this.lists2.codRpta == 0){
          swal.close();
          this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Error, consulte con el administrador!',
            type: 'error',
          });
        }else if (this.lists2.codRpta == 4){
          swal.close();
          this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'El número de DNI no esta registrado!',
            type: 'info',
          });
        }else if (this.lists2.codRpta == 2 || this.lists2.codRpta == 3 || this.lists2.codRpta == 6){
          swal.close();
          this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Error, el sistema no esta disponible!',
            type: 'error',
          });
        }else{} 
      },(error) => {
        swal.close();
        this.$store.dispatch("alertaError");
      });
    },
    recaptchaNotification(){
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Código CAPTCHA no verificado!',
          type: 'error',
        });
    },
    faltaDatNotification(){
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Ingrese su número de DNI!',
          type: 'info',
      });
    },
    completaNotification(){
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, ingrese su DNI correctamente!',
          type: 'error',
      });
    }
  },
  components: {
     Card, 
     Logo
  }
}
</script>
<style lang="css">
</style>