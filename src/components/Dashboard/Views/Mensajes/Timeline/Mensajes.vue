<template>
<div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
      <card>
        <div class="m-home-center__section2 m-t-20">
          <header class="special contentIcon">
            <span class="m-home-center__section-icon pe-7s-chat"></span><br>
          </header>
          <a style="text-decoration:none;" class="m-home-center__section-name">{{texto}}</a>
          <div class="m-home-center__section-desc">
          <br>Mensajes actualizados acerca de la Ventanilla Jurisdiccional.<br>
          </div>
        </div>
		<div class="row m-t-30">
          <div class="col-md-12">
            <b-form-input style="border-radius: 0px; width: 300px" class="pull-left mb-3" type="text" placeholder="Buscar mensaje" v-model="search"/> 
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" class="pull-right"></b-pagination>
          </div>
        </div>
		  <div class="timeline m-t-40">
		    <div class="timeline__divider">
		      <span class="timeline__divider-badge fuente">Lista de mensajes informativos</span>
		    </div>
            <div v-for="(item, index) in filteredList" :key="item.item" v-show="(currentPage - 1) * perPage <= index  && currentPage * perPage > index">
            <transition name="fade" mode="out-in">
		    <div :class="item.position">
		      <div class="timeline__badge timeline__badge--info">
		        <span class="timeline__badge-icon iconfont iconfont-bell"></span>
		      </div>
		      <div style="cursor:pointer" class="timeline__panel" @click="verDoc(item.link)">
		      	<div class="timeline__meetup-header fuente">{{item.titulo}}</div>
		        <div class="timeline__content">
		        <div align="justify" :class="item.color" data-notify="container">
		            <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
		                <i class="nc-icon nc-simple-remove"></i>
		            </button>
		            <span data-notify="icon" class="nc-icon nc-bell-55"></span>
		            <span data-notify="message" align="justify" class="m-t-10 m-b-10">{{item.contenido}}</span>
		        </div>
		        </div>
		      </div>
		      <div class="timeline__info">
		        <p class="timeline__date fuente">{{item.creacion}}</p>
		      </div>
		    </div>
		    </transition>
          </div>
		  </div>
	  </card>
      </div>
    </div>
    </div>
</div>
</template>
<script>

import Card from 'src/components/UIComponents/Cards/Card.vue'

import datasource from 'vue-resource'
import axios from 'axios'

export default {
  name: 'mensajes',
  data () {
    return {
	  texto: 'MENSAJES INFORMATIVOS',
	  lists: [],
	  lista: [],
	  alertAzul:'alert alert-info alert-with-icon fuente',
	  alertVerde: 'alert alert-success alert-with-icon fuente',
	  alertNaranja: 'alert alert-warning alert-with-icon fuente',
	  alertRojo: 'alert alert-danger alert-with-icon fuente',
	  positionDerecha:'timeline__block timeline__follow is-position-right',
	  positionIzquierda: 'timeline__block is-position-left',
	  search: '',
	  perPage: 10,
      currentPage: 1,
      rows: 1,
    }
  },
  mounted: function () {
    this.limpiarParam();
  },
  computed: {
    filteredList() {
        return this.lista.filter((item) => {
          this.currentPage = 1;
          return item.titulo.toLowerCase().includes(this.search.toLowerCase())
        })
    }
  },
  methods: {
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
	  this.mensajes();
	},
	verDoc: function (url){
		if(url != ''){
          window.open(url)
		}else{}
    },
	varColor(tipo){
		if(tipo == 'A'){
          return this.alertAzul;
		}else if(tipo == 'B'){
           return this.alertVerde;
		}else if(tipo == 'C'){
          return this.alertNaranja;
		}else{
          return this.alertRojo;			
		}
	},
	varFecha(date){
		var fecha = new Date(Date.UTC(date.substring(0,4),date.substring(5,7)-1,date.substring(8,10),date.substring(11,13),date.substring(14,16)));
		var semana = fecha.getDay()
        var dia = fecha.getDate()
        var mes = fecha.getMonth()
        var anio = fecha.getFullYear()
        var hora = date.substring(11,13)
		var min = date.substring(14,16)
		var seg = date.substring(17,19)
      
        switch(semana) {
          case 1:semana = 'Lunes' 
          break;
          case 2:semana = 'Martes'
          break;
          case 3:semana = 'Miercoles'
          break;
          case 4:semana = 'Jueves'
          break;
          case 5:semana = 'Viernes'
          break;
          case 6:semana = 'Sabado'
          break;
          case 7:semana = 'Domingo'
          break;
        }
        switch(mes) {
          case 0:mes = 'Enero' 
          break;
          case 1:mes = 'Febrero'
          break;
          case 2:mes = 'Marzo'
          break;
          case 3:mes = 'Abril'
          break;
          case 4:mes = 'Mayo'
          break;
          case 5:mes = 'Junio'
          break;
          case 6:mes = 'Julio'
          break;
          case 7:mes = 'Agosto'
          break;
          case 8:mes = 'Septiembre'
          break;
          case 9:mes = 'Octubre'
          break;
          case 10:mes = 'Noviembre'
          break;
          case 11:mes = 'Diciembre'
          break;
        }
        var dfec = semana + ', ' + dia + ' de ' + mes + ' del ' + anio + ' a las ' + hora + ':' + min
        return dfec
	},
	mensajes(){
		this.cargaRegistros();
		axios.defaults.headers.common['Authorization'] = this.$session.get('token')
		axios.get(this.$store.state.serverOfi + '/mensajeria')
		.then((response) => {
			this.lists = response.data;
			let listado = this.lists;
			for(var i = 0; i < listado.length; i++){
			if(i == 0 || i % 2 == 0){
				this.lista.push({ 
					titulo: listado[i].titulo, 
					contenido: listado[i].contenido, 
					link: listado[i].link, 
					creacion: this.varFecha(listado[i].creacion),
					position: this.positionIzquierda, 
					color: this.varColor(listado[i].tipo)
				});
			}else{
				this.lista.push({ 
					titulo: listado[i].titulo, 
					contenido: listado[i].contenido, 
					link: listado[i].link, 
					creacion: this.varFecha(listado[i].creacion),
					position: this.positionDerecha, 
					color: this.varColor(listado[i].tipo)
				});
			}
			}
			this.rows = this.lista.length;
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
	cargaRegistros(){
      swal({
        title: "Cargando mensajes",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
    },
  },
  components: {
      Card
  }
}
</script>
 
<style lang="scss">
</style>