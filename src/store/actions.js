import Vue from 'vue'

export default {
registrarInicio() {
    Vue.prototype.$notify({
        group: 'custom-template',
        duration: 10000
    });
},
alertarInicio() {
    Vue.prototype.$notify({
        group: 'custom-template6',
        duration: 10000
    });
},
sistemaInicio() {
    Vue.prototype.$notify({
        group: 'custom-template2',
        duration: 12000
    });
},
sistemaInicio2() {
    Vue.prototype.$notify({
        group: 'custom-template4',
        duration: 12000
    });
},
datosExpediente() {
    Vue.prototype.$notify({
        group: 'custom-template3',
        duration: 12000
    });
},
alertSubidas() {
    Vue.prototype.$notify({
        group: 'custom-template5',
        duration: 12000
    });
},
successNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Solicitud creada correctamente!',
        type: 'success'
    });
},
successNotification2() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Documento descargado correctamente!',
        type: 'success'
    });
},
warnNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error al crear la solicitud!',
        type: 'error'
    });
},
infoNotification() {
    Vue.prototype.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Debe ingresar los datos solicitados!',
            type: 'info'           
    });
},
recaptchaNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Código CAPTCHA no verificado!',
        type: 'error'
    });
},
limitesNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Ud. superó el límite de intentos por día!',
        type: 'info'
    });
    swal.close(); 
},
replyNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Ud. ya tiene acceso a este expediente!',
        type: 'info'
    });
    swal.close(); 
},
incorrecNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Expediente incorrecto o no existe!',
        type: 'info'
    });
    swal.close(); 
},
expedAgregado() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Expediente agregado correctamente!',
        type: 'info'
    });
    swal.close(); 
},
expedAnulado() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Expediente anulado correctamente!',
        type: 'info'
    });
    swal.close(); 
},
datIncoNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Datos ingresados incorrectos!',
        type: 'error'
    });
},
errorDniNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error con el ingreso de DNI!',
        type: 'error'
    });
    swal.close(); 
},
errorDataNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, por favor intente de nuevo!',
        type: 'error'
    });
    swal.close(); 
},
replyTabNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, expediente repetido en la tabla!',
        type: 'error',
    });
    swal.close(); 
},
aritmeticaNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe resolver la operación aritmética!',
        type: 'info',
    });
    swal.close(); 
},
cargandoDatos(){
    swal({
        title: "Verificando datos",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
cargandoDatos2(){
    swal({
        title: "Cargando datos",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
procesandoSolicitud(){
    swal({
        title: "Procesando solicitud",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
finalizandoSolicitud(){
    swal({
        title: "Finalizando solicitud",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
finalizandoEscrito(){
    swal({
        title: "Finalizando escrito",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
enviandoSolicitud(){
    swal({
        title: "Enviando solicitud",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
enviandoEscrito(){
    swal({
        title: "Enviando escrito",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
},
entregadoCorreo2(){
    swal({
        title: "Correo enviado",
        text: "Revise su bandeja de entrada",
        buttons: [false, false],
        icon: "success",
        timer: '3000',
    });
},
entregadoCorreo(){
    swal({
        title: "Correo enviado",
        text: "Revise su bandeja de entrada",
        buttons: [false, false],
        icon: "success",
        dangerMode: true,
        closeOnClickOutside:false,
    });
},
alertaError(){
    swal({
        title: "Error en la conexión",
        text: "Conexión fallida, intente nuevamente por favor",
        buttons: [false, false],
        icon: "error",
        timer: '5000',
    });
},
alertaErrorDes(){
    swal({
        title: "Visualización no completada",
        text: "El archivo es muy pesado, intente descargando el archivo",
        buttons: [false, false],
        icon: "error",
        timer: '5000',
    });
},
ingresoNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos de ingreso!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
procedenciaNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos de procedencia!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
resolucionNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos de resolución!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
estadoNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos del estado!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
vistasNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos de las vistas!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
resolucionesNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos de las resoluciones!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
notifiNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, no se cargaron los datos de las notificaciones!',
        type: 'error',
        duration: 12000
    });
    swal.close(); 
},
denegadoNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Ud. no tiene permisos para revocar expedientes!',
        type: 'info',
        duration: 12000
    });
    swal.close(); 
},
cargaCuadernillo(){
    swal({
      title: "Cargando cuadernillo",
      text: "Espere por favor...",
      buttons: false,
      dangerMode: true,
      icon: "static/img/loader.gif",
      closeOnClickOutside:false
    })
},
tokenVencido(){
    swal({
    title: "Sesión terminada",
    text: "Deberá volver a iniciar sesión",
    buttons: [false, false],
    icon: "warning",
    timer: '5000',
    });
},
terminosNotification() {
    Vue.prototype.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe aceptar los terminos y condiciones de uso!',
        type: 'error'
    });
},
infoExpedientePub() {
    Vue.prototype.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'El expediente no existe o no cuenta con permisos de visualización!',
            type: 'info'           
    });
},
infoCuadernilloPub() {
    Vue.prototype.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'No existen cuadernillos a mostrar!',
            type: 'info'           
    });
}
}
