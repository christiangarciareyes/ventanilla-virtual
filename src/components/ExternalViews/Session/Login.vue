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
      <!--
      <a href="https://www.tc.gob.pe" target="_blank">
        <img src="https://tc.gob.pe/intranet/iconos/admin-logo-dark.png" alt="escudo" class="m-r-5">
        <img src="https://tc.gob.pe/intranet/iconos/admin-text-dark.png" alt="tribunal"/><br><br>
      </a>
      -->
      </div>
        <form class="login100-form validate-form m-t-30" @submit.prevent="checkCreds">
          <span class="login100-form-title fuente">
            Accede para continuar
          </span>
          <span class="txt1 p-t-10">
            Usuario
          </span>
          <div class="wrap-input100 validate-input m-b-30" requerid>
              <span class="btn-show-pass">
                 <i class="fa fa-user"></i>
              </span> 
            <input class="input100 imp-fue" type="text" name="username" v-model="username">
            <span class="focus-input100"></span>
          </div>
          <span class="txt1">
            Contraseña
          </span>
          <div class="wrap-input100 validate-input m-b-25">
            <span class="btn-show-pass">
               <i type="password" class="fa fa-eye" @click="switchVisibility" id="contraseña" v-tooltip.top-center="tooltip"></i>
            </span>
            <input :type="passwordFieldType" class="input100 imp-fue" name="password" v-model="password">
            <span class="focus-input100"></span>
          </div>
          <transition name="fade" mode="out-in">
          <div class="container-form-btn" v-if="show">
          <div class="container-form-btn m-t-10">
            <div class="p-signup__form-link">
               <label>Para continuar, por favor completa la operación</label>
            </div>
          </div>
          <div class="container-form-btn m-t-10">
            <card style="border: 2px solid #D0F2E1">
            <div class="input-group">
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="numIni" disabled />
              <b-form-input :style="estiOper" class=" text-center mb-2" type="text" v-model="oper" disabled />
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="numFin" disabled />
              <b-form-input style="font-size: 20px; color: red; width: 50px" class="text-center mb-2" type="text" v-model="igual" disabled />
              <b-form-input style="width: 50px" class="text-center mb-2" type="text" v-model="resuOper" />
            </div>
            </card>
          </div>
          </div>
          </transition>
          <div class="container-form-btn">
            <transition name="fade" mode="out-in">
              <div v-if="showAlert" :class="colorAlerta" style="border-radius: 20px">
                <p style="height:15px; font-size:14px" class="text-center fuente m-t-12">{{ alerta }}</p>
              </div>
            </transition>
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            <button class="login-form-btn fuente"><i class="fa fa-check"></i> ACCEDER</button>
          </div>
          <div class="text-center p-t-30 p-b-20">
            <p align="justify" class="txt4">
              Ingrese el usuario y contraseña que le ha sido proporcionado. En caso que no cuente con estos datos, debe solicitarlo a la Oficina de Tecnologías de la Información.
            </p>
            <div class="p-t-10">
            <router-link to="/password">
            <a class="txt3 nounderline" href="#">
              <i class="fa fa-unlock-alt m-l-5" aria-hidden="true"></i>
              Olvidaste tu contraseña?
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
        </form>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>

import axios from 'axios'
import VueRecaptcha from 'vue-recaptcha';
import Card from "src/components/UIComponents/Cards/Card";
import Logo from "src/components/Dashboard/Layout/Textual/Logo";

import { actions } from "vuex";

export default {
  name: 'admin',
  data (router) {
    return {
      tooltip: 'Ver Contraseña',
      passwordFieldType: 'password',
      section: 'admin',
      loading: '',
      username: '',
      password: '',
      response: '',
      onVerify: '',
      onExpired: '',
      lists: [],
      tokens: [],
      listIps: [],
      show: false,
      cambioClave: '',
      token: '',
      dni: '',
      showAlert: false,
      colorAlerta: 'alert-form w3-panel w3-green',
      alerta: '',
      numIni: '',
      oper: '',
      numFin: '',
      igual: '',
      resuOper: '',
      estiOper: '',
      operUser: [],
      logout: null,
      listaNoty:[]
    }
  },
  mounted: function(){
    this.$store.state.tutorial = 0;
    this.$notify({group: 'auth', clean: true});
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    } else {
      this.$router.push('/inicio')
    }
  },
  methods: {
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
    obtenerNoty: function() {
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/casilla/count')
      .then(response => {
        this.listaNoty = response.data;
        this.$session.set('contaNoty', this.listaNoty.txtInfo);
        this.logeo();
      });
    },
    obtenerIp: function() {
      axios.get(this.$store.state.apiIp).then(response => {
        this.listIps = response.data;
        this.ip = this.listIps.ip;
        this.city = this.listIps.city;
        this.country = this.listIps.country_name;
      });
    },
    checkCreds () {
    if (this.username == '' || this.password == ''){
       this.errorNotification2();
    }else if (this.show == true && this.resuOper2 != this.resuOper){
       this.$store.dispatch('aritmeticaNotification');
    }else{
      this.obtenerIp();
      const {username, password} = this
      this.resetResponse()
      axios.post(this.$store.state.serverCas + '/login',
        {
          'username': username,
          'password': password,
          'cnumIp': this.ip,
          'cnomPais': this.country,
          'cnomCiudad': this.city,
          'ctxtApp': 'OFIV'
        }
      ).then(response => {
        if (response.status === 200) {
          this.cargandoDatos();
          this.showAlert = true,
          this.alerta = 'Obteniendo datos'
          this.cargandoDatos();
          this.$session.start();
          this.$session.set('user', username)
          this.$session.set('token', response.headers.authorization)
          this.obtenerNoty();
        } else {
          this.errorNotification()
        }
      })
      .catch(error => {
        this.username = '';
        this.password = '';
        this.errorNotification();
      })
    }},
    logeo(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/colaboradores/postlogin') 
          .then((response) => {
          this.$session.set('nomUsuario', response.data[0].nombres)
          this.$session.set('dni', response.data[0].dni)
          this.$session.set('camClave', response.data[0].flgCambioClave)
          this.dni = this.$session.get('dni')
          this.token = this.$session.get('token')
          this.cambioClave = this.$session.get('camClave');
          this.alerta = 'Verificando acceso';
          if(this.cambioClave == 1){
            swal.close();
            axios.defaults.headers.common['Authorization'] = this.$session.get('token')
            axios.get(this.$store.state.serverCas + '/gentoken/' + this.dni) 
            .then((response) => {
              this.tokens = response.data;
              this.$session.destroy();
              this.$store.state.userName = this.username;
              this.$router.push('/reset' + '?' + 'C' + this.dni + '&' + this.tokens[0].desError);
              swal({
                title: "Debe cambiar su contraseña",
                text: "Por seguridad deberá cambiar su contraseña al iniciar sesión por primera vez",
                icon: "warning",
                buttons: false,
                timer: '5000',
              })
            },(error) => {
              swal.close();
              this.$store.dispatch("alertaError");
            })
          }else{
            this.alerta = 'Obteniendo permisos';
            axios.defaults.headers.common['Authorization'] = this.$session.get('token')
            axios.get(this.$store.state.serverCas + '/operaciones/app/OFIV') 
            .then((response) => {
              this.$session.set('ip', this.ip)
              this.$session.set('city', this.city)
              this.$session.set('country', this.country)
              this.$session.set('operUser', response.data)
              if (this.$session.get('operUser') != ''){
                this.$session.set('logout', 'P')
                this.alerta = 'Acceso autorizado';
                swal.close(); 
                this.$router.push('/inicio')
                if(this.$session.get('contaNoty') == 1){
                  this.alertNotifica(2);
                }else if(this.$session.get('contaNoty') > 1){
                  this.alertNotifica(1);
                }else{
                  this.alertNotifica(3);
                }
              }else{
                this.showAlert = false
                this.$store.state.logout = this.$session.get('logout');
                this.$session.destroy()
                swal.close();
                this.sinPermisos()
              }
            },(error) => {
              swal.close();
              this.$store.dispatch("alertaError");
            })
          } 
          },(error) => {
            swal.close();
            this.$store.dispatch("alertaError");
          });  
    },
    sinPermisos() {
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Usted no cuenta con permisos!',
        type: 'error',
      });
    },
    resetResponse () {
      this.response = ''
    },
    errorNotification() {
      this.antiRobot();
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Credenciales inválidas!',
        type: 'error',
      });
      this.show = true;
    },
    errorNotification2() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Ingrese los datos solicitados!',
          type: 'error',
      });
    },
    successNotification() {
    swal({
      title: "Ventanilla Jurisdiccional",
      text: "Ingreso al sistema autorizado!",
      buttons: [false, false],
      icon: "success",
      timer: '2000',
      });
    this.$store.dispatch("sistemaInicio");
    this.$store.dispatch("sistemaInicio2");
    },
    success2Notification() {
      this.$notify({
        group: 'foo',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Ingreso a la Ventanilla Jurisdiccional autorizado!',
        type: 'success',
      });
    },
    infoNotification() {
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, sesión cerrada por seguridad!',
        type: 'error',
      });
    },
    cargandoDatos(){
      swal({
        title: "Iniciando sesión",
        text: "Cargando datos de acceso",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside: false,
      })
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    myNoty1() {
      swal({
        title: "Alerta de notificaciones",
        text: "Usted tiene " + this.$session.get('contaNoty') + " notificaciones pendientes de leer!",
        icon: "warning",
        buttons: ["Leer más tarde", "Ir a la Casilla"],
        closeOnClickOutside: false,
      })
      .then((value) => {
        if(value == true){
        this.$router.push('/casilla')
        }else{
          this.$store.dispatch("sistemaInicio");
          this.$store.dispatch("sistemaInicio2");
        }
      });
    },
    myNoty2() {
      swal({
        title: "Alerta de notificaciones",
        text: "Usted tiene " + this.$session.get('contaNoty') + " notificación pendiente de leer!",
        icon: "warning",
        buttons: ["Leer más tarde", "Ir a la Casilla"],
        closeOnClickOutside: false,
      })
      .then((value) => {
        if(value == true){
        this.$router.push('/casilla')
        }else{
          this.$store.dispatch("sistemaInicio");
          this.$store.dispatch("sistemaInicio2");
        }
      });
    },
    alertNotifica(param) {
      swal({
        title: "Alerta de notificaciones",
        text: "Estimado usuario, recuerde que debe agregar al menos un correo y/o celular por expediente para ser notificado via correo electrónico y casilla virtual!",
        icon: "warning",
        buttons: ["Agregar más tarde", "Ir a Configuración"],
        closeOnClickOutside: false,
      })
      .then((value) => {
        if(value == true){
          this.$router.push('/configuracion')
        }else{
          if(param == 1){
            this.myNoty1(); 
          }else if(param == 2){
            this.myNoty2();
          }else{
            this.successNotification(); 
          }
        }
      });
    }
  },
  components: {
     Card,
     Logo
  }
}
</script>

<style lang="scss">
</style>
