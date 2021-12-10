<template> 
  <div class="settings-panel">
  <div class="settings-panel__header">
    <span class="settings-panel__close iconfont iconfont-modal-close" style="color: #fff"></span>
    <p class="titSwi card-category fuente2">Compártenos tus sugerencias!</p>
  </div>
    <div class="settings-panel__layout-options">
      <div class="row">
        <div class="col-md-12">
         <textarea id="text" class="form-control fuente"
           style="max-height:150px"
           v-model="mensaje"
           placeholder="Coméntanos..."
           no-resize
           :rows="50"
           :max-rows="100"
           maxlength="100"
           v-on:keyup="cuenta">
         </textarea>
        </div>
      </div>
      <p v-bind:class="{'text-danger': error }" style="color: #2E86C1; font-size: 13px;" class="m-t-5 fuente">Máximo {{recorreCount}} caracteres</p>
      <p style="color: red; font-size: 13px;" class="m-t-5 fuente">Recuerda usar esta opción para brindarnos una sugerencia y/o comentario acerca de nuestra aplicación y como deberíamos mejorarla!</p>
      <div class="container-form-btn m-t-10">
        <button v-on:click="valida()" class="guardar-form-btn fuente m-t-20 m-b-40" style="width:300px;"><i class="fa fa-envelope-open m-r-5"></i> ENVIAR</button>
      </div>
      <div class="box fuente">
         <div class="uploader-action">
          <div for="like" class="dz-message fuente">Califícanos con un Me Gusta!</div>
         </div>
         <div class="toolbox"></div>
         <button v-on:click="enviarCalifica('Me gusta')" class="reaction-like"><span class="legend-reaction">Me gusta</span></button>
         <button v-on:click="enviarCalifica('Me encanta')" class="reaction-love"><span class="legend-reaction">Me encanta</span></button>
         <button v-on:click="enviarCalifica('Me divierte')" class="reaction-haha"><span class="legend-reaction">Me divierte</span></button>
         <button v-on:click="enviarCalifica('Me asombra')" class="reaction-wow"><span class="legend-reaction">Me asombra</span></button>
         <button v-on:click="enviarCalifica('Me entristece')" class="reaction-sad"><span class="legend-reaction">Me entristece</span></button>
         <button v-on:click="enviarCalifica('Me enoja')" class="reaction-angry"><span class="legend-reaction">Me enoja</span></button>
      </div>
      <div class="wrap-logo m-t-100">
      <p v-if="emoCon" style="color: #2E86C1; font-size: 13px;" class="fuente">{{ contador}} personas han calificado!</p>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
  data () {
    return {
      tooltip: 'Enviar comentario',
      mensaje:'',
      maxCount: 100,
      recorreCount: 100,
      error: false,
      emoCon: false,
      contador: 0,
      envio: [],
      envio2: []
    }
  },
  created() {
   let jQuery = document.createElement('script')
   jQuery.setAttribute('src', './static/js/jQuery/jquery.min.js')
   document.head.appendChild(jQuery)
   let sPanel = document.createElement('script');    
   sPanel.setAttribute('src',"./static/js/swipeLayout/settings-panel.min.js");
   document.head.appendChild(sPanel);
  },
  methods: {
    cuenta() {
      this.recorreCount = this.maxCount - this.mensaje.length;
      this.error = this.recorreCount < 10;
    },
    valida(){
      if(this.mensaje == ''){
        this.validate();
      }else{
        this.enviarComent()
      }
    },
    enviarComent(){
      swal({
        title: "Enviando mensaje",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/sugerencia/add',
      {
        ctxtDescripcion: this.mensaje
      }
      ).then((response) => {
        this.envio = response.data;
        if (this.envio.codRpta == 1) {
          $('.settings-panel').removeClass('is-opened');
          this.enviado();
        }else{
          this.errorEnviado();
        } 
      },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorEnviado();
        }
      });
    },
    enviarCalifica(mensaje){
      swal({
        title: "Enviando calificación",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/calificacion/add',
      {
        ctxtDescripcion: mensaje
      }
      ).then((response) => {
        this.envio2 = response.data;
        if (this.envio2.codRpta == 1) {
          this.emoticon();
        }else{
          this.errorEnviado();
        } 
      },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorEnviado();
        }
      });
    },
    validate(){
      swal.close();
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe ingresar un mensaje para enviar!',
        type: 'info',
      });
    },
    enviado(){
      swal.close();
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Su mensaje fue enviado correctamente!',
        type: 'success',
      });
      this.mensaje = '';
      this.recorreCount = 100;
    },
    errorEnviado(){
      swal.close();
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error, intentenlo nuevamente en unos minutos!',
        type: 'error',
      });
    },
    emoticon(){
    this.contador = this.envio2.desRpta;
    this.emoCon = true;
    swal.close();
    swal({
        title: "Gracias por tu calificación",
        text: "Juntos mejoraremos cada día!",
        buttons: [false, false],
        icon: "success",
        timer: '3000',
    });
    },
   }
  } 
</script>