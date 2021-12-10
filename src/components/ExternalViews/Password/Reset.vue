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
              <i style="font-weight: 400; font-size: 20px; color: #fff" class="nc-icon pe-7s-user"></i>
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
      Servicio de Actualización de Contraseña
    </h2>
  </div>
  </div>
  </div>
  </div>
  <div class="content m-t-18">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
        <card>
          <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10 m-t-30">
            <div class="m-home-center__section2">
            <header class="special contentIcon">
              <span class="m-home-center__section-icon pe-7s-lock"></span><br>
            </header>
            <a style="text-decoration:none;" class="m-home-center__section-name">CAMBIA TU CONTRASEÑA</a>
            <div class="m-home-center__section-desc">
            <br>Genera tu nueva contraseña para acceder al sistema.<br>
            </div>
          </div>
          </div>
        </div>
        <div class="text-center p-signup__form-link m-t-40">
          Estimado(a) <strong>{{ datosCompletos }}</strong>, proceda a cambiar su contraseña.
        </div>
        <div class="row m-t-50">
        <div class="col-md-2"></div>
         <div class="col-md-4">
          <label>Ingrese la Contraseña</label>
          <password v-model="pass1" :toggle="true" @score="showScore" class="form-control mb-3 imp-fue"></password>
         </div>
         <div class="col-md-4">
          <label>Repita la Contraseña</label>
          <b-input-group>
            <input :type="passwordFieldType" class="form-control imp-fue" v-model="pass2"/>
            <b-btn style="border-radius: 0 4px 4px 0;" v-tooltip.top-center="tooltip" @click="switchVisibility" id="contraseña"><i class="fa fa-eye"></i></b-btn>
          </b-input-group>
          <transition name="fade" mode="out-in">
            <div v-if="showAlert" :class="colorAlerta">
              <p style="height:15px; font-size:14px;" class="fuente m-t-8">{{ alerta }}</p>
            </div>
          </transition>
         </div>
        </div>
          <div class="row m-t-30"> 
          <div class="col-md-1"></div>
          <div class="col-md-10 instruc">
            <div align="center" class="col-md-12 m-t-50 m-l-60 p-r-120">
             <h2 align="center" class="alert-heading fuente m-b-20 m-r-10 regEstilo1"><i style="font-size: 80px; color: #fff" class="pe-7s-bookmarks m-t-10 m-b-15 m-r-10"></i>Instrucciones</h2>
            </div>
            <div class="col-md-12 m-t-30 m-b-50 m-l-30 p-r-60">
                <p class="fuente regEstilo2 m-r-10" align="justify">Esta ventana tiene un determinado tiempo de duración por lo que tendrás que cambiar tu contraseña ahora. Recuerda usar esta ventana para actualizar tu contraseña cuando se te haya olvidado. Para que tu contraseña sea segura deberá contar con estos requisitos:
                </p>
              <ul class="m-t-30 m-l-20 m-r-20 regEstilo2 fuente">
                <li class="m-b-10">Debe contener números aleatorios.</li>
                <li class="m-b-10">Debe contener mínimo 8 caracteres.</li>
                <li class="m-b-10">Utilice caracteres en mayúsculas.</li>
                <li class="m-b-10">Tambien puedes usar solo estos simbolos $#)</li>
              </ul>
            </div>
          </div>
        </div>
          <div class="row m-t-30 m-b-10">
           <div class="col-md-12">
            <div class="container-form-btn m-t-10">
              <router-link to="/">
               <button style="width: 300px" class="editar-form-btn fuente m-b-15 m-l-10 m-r-10"><i class="fa fa-home m-r-5"></i> VOLVER AL PORTAL</button>
              </router-link>
              <button v-on:click="getPaswword" style="width: 300px" class="guardar-form-btn fuente m-l-10 m-r-10 m-b-20"><i class="fa fa-floppy-o mr-1"></i> GUARDAR CAMBIOS</button>
            </div>
           </div>
          </div>
        </card>
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

import axios from 'axios'
import SwipeMenu from 'src/components/Dashboard/Layout/Contenido/Menu'
import Footer from 'src/components/Dashboard/Layout/Footer/RegFooter'
import Card from 'src/components/UIComponents/Cards/Card'
import Password from 'src/components/UIComponents/Password/Password'
import { actions } from 'vuex';

export default {
  data: function () {
    return {
      pass1: null,
      pass2: '',
      token: '',      
      datosCompletos: '',
      onVerify: '',
      onExpired: '',
      tooltip: 'Ver Contraseña',   
      tootltip: 'Validar',
      titulo: "Registra tu nueva contraseña para acceder",
      passwordFieldType: 'password',
      items: [],
      lists: [],
      datos: [],
      puntaje:'',
      alerta:'',
      showAlert: false,
      colorAlerta:'',
      scorePass: '',
      datUrl: '',
      dni: '',
      token: '',
      alert: true,
      operUser: [],
      logout: null,
      listaNoty:[]
    }
  },    
  mounted: function () {
    this.getObtenerIp();
    this.$store.state.tutorial = 0;
    this.$notify({group: 'auth', clean: true});
    if (!this.$session.exists()) {
      this.returnToken()
    }else {
      this.$router.push('/inicio')
    }
  },
  methods: {
    obtenerNoty: function() {
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/casilla/count')
      .then(response => {
        this.listaNoty = response.data;
        this.$session.set('contaNoty', this.listaNoty.txtInfo);
        this.logeo();
      });
    },
   returnToken(){
    this.username = this.$store.state.userName;
    this.datUrl = window.location.hash.split("#/reset?")[1];
    if(this.datUrl != null){
     this.ini = this.datUrl.substr(0,1);
      if(this.ini == 'C'){
        this.dni = this.datUrl.substr(1,8);
        this.token = this.datUrl.substr(10);
      }else{
        this.dni = this.datUrl.substr(0,8);
        this.token = this.datUrl.substr(9);
      }
      axios.post(this.$store.state.serverCas2 + '//nomxtoken',
      { 
       token: this.token,
      })
      .then(response => {
        this.datos = response.data;
        if (this.datos.codRpta == 1) {
        this.datosCompletos = this.datos.cnomNombre;
        }else{
          this.$store.dispatch("alertaError");
        }
      });
    }else{
      this.$router.push('/')
    }
   },
   getObtenerIp: function() {
    axios.get("https://ipapi.co/json/").then(response => {
      this.lists = response.data;
      this.ip = this.lists.ip;
      this.city = this.lists.city;
      this.country = this.lists.country_name;
    });
   },
   resetPassword(){
    axios.post(this.$store.state.serverOfi + '/resetPassword',
    { 
     cnumDni: this.dni,
     ctxtToken: this.token,
     ctxtClave: this.pass1,
     cnumIp: this.ip,
     cnomPais: this.country,
     cnomCiudad: this.city
    }
    ).then((response) => {
      this.items = response.data;
      if(this.items.codRpta == 1){
        swal.close();
        swal({
          title: "Correo enviado",
          text: this.items.desRpta,
          icon: "success",
          buttons: [null, "Aceptar"],
          closeOnClickOutside: false
        }).then(value => {
          if (value == true) {
            if(this.ini == 'C'){
              this.iniciaSesion();
            }else{
              this.$router.push('/login')
            }
          }else{
            if(this.ini == 'C'){
              this.iniciaSesion();
            }else{
              this.$router.push('/login')
            }
          }
        })
      }else if(this.items.codRpta == 5){
        this.$store.dispatch("alertaError");
      }else if(this.items.codRpta == 7){
        swal({
          title: "Tiempo agotado",
          text: this.items.desRpta,
          icon: "warning",
          buttons: false,
          dangerMode: true,
          timer: '5000',
        })
        this.$router.push("/password");
      }else{
        swal.close();
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
      swal.close();
      this.$store.dispatch("alertaError");
    });
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
   iniciaSesion(){
      this.enviandoSesion();
      axios.post(this.$store.state.serverCas + '/login',
      {
        'username': this.username,
        'password': this.pass1,
        'cnumIp': this.ip,
        'cnomPais': this.country,
        'cnomCiudad': this.city,
        'ctxtApp': 'OFIV'
      }
      ).then(response => {
        if (response.status === 200) {
          this.$session.start();
          this.$session.set('user', this.username)
          this.$session.set('token', response.headers.authorization)
          this.obtenerNoty();
        }else{
          this.$store.dispatch("alertaError");
          this.limpiarDatos();
        }               
     })
   },
   logeo(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/colaboradores/postlogin') 
      .then((response) => {
        this.$session.set('nomUsuario', response.data[0].nombres)
        this.$session.set('dni', response.data[0].dni)
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.get(this.$store.state.serverCas + '/operaciones/app/OFIV') 
            .then((response) => {
              this.$session.set('ip', this.ip)
              this.$session.set('city', this.city)
              this.$session.set('country', this.country)
              this.$session.set('operUser', response.data)
              if (this.$session.get('operUser') != ''){
                this.$session.set('logout', 'P')
                swal.close();
                this.$router.push('inicio')
                if(this.$session.get('contaNoty') == 1){
                  this.alertNotifica(2);
                }else if(this.$session.get('contaNoty') > 1){
                  this.alertNotifica(1);
                }else{
                  this.alertNotifica(3);
                }
              }else{
                this.$store.state.logout = this.$session.get('logout');
                this.$session.destroy()
                swal.close();
                this.$router.push('login')
                this.sinPermisos()
              }
            },(error) => {
              this.$store.dispatch("alertaError");
              this.limpiarDatos();
          })  
      },(error) => {
        this.$store.dispatch("alertaError");
        this.limpiarDatos();
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
   enviandoSesion(){
      swal({
        title: "Iniciando sesión",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
   },
   limpiarDatos(){
     this.pass1 = '';
     this.pass2 = '';
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
      SwipeMenu,
      Footer,
      Card,
      Password
  }
}

</script>
<style lang="scss">
  .myhover:hover{
    background-color: rgba(208, 211, 212, .2);
    border-radius: 5px;
  } 
</style>