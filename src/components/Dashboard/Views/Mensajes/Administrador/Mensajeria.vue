<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
      <card v-if="carga">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-8">
          <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
          <p class="card-category fuente">En esta bandeja podrás crear y gestionar los mensajes para los usuarios.</p><br>
        </div>
        <div class="col-md-4">
         <button @click="actualizar()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-refresh fa-2x"></i></button>
        </div>
        </div> 
      </template>
       <div class="row m-t-10">
       <div class="col-md-12">
       <vue-tabs>
        <v-tab title="CREAR NUEVO MENSAJE">
          <div class="row m-t-30">
	      <div class="col-md-6 fuente">
	        <label>Título</label>
	          <b-form-input type="text" class="imp-fue mb-3" v-model="titulo" placeholder="Ingresa el título" />
	        <label>Tipo de Mensaje</label>
	          <b-form-select v-model="selected" :options="options" class="form-control imp-fue mb-3" />
          <label>Link de Contenido</label>
	          <b-form-input type="text" class="imp-fue mb-3" v-model="link" placeholder="Ingresa el link" />
	         <label>Fecha de Caducidad</label>
	          <b-form-input type="date" v-model="cadu" class="mb-3"></b-form-input>
	      </div>
	      <div class="col-md-6 fuente">
	         <label>Contenido</label>
	         <textarea id="text" class="form-control fuente"
	               style="max-height:240px"
	               v-model="content"
	               placeholder="Escribe tu mensaje"
	               no-resize
	               :rows="50"
	               :max-rows="100"
	               maxlength="300"
	               v-on:keyup="cuenta">
	         </textarea>
	         <p v-bind:class="{'text-danger': error }" style="color: #2E86C1; font-size: 13px;" class="m-t-5 mb-3 fuente">Máximo {{recorreCount}} caracteres</p>
	      </div>
		     <div class="container-form-btn m-t-40 m-b-30">
	          <button @click="subMess()" style="width:300px;" class="firmar-form-btn m-l-10 m-r-10 fuente"><i class="fa fa-paper-plane"></i> SUBIR NUEVO MENSAJE</button>
	        </div>
         </div>
        </v-tab>
        <v-tab title="LISTA DE MENSAJES">
         <div class="row m-t-30">
           <div class="col-md-12">
            <label>Listado de mensajes caducados y disponibles</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="lista"
                     :fields="fieldRevSuger"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     @filtered="onFiltered">    
            <template slot="item" slot-scope="data">
              {{data.item.item}}
            </template>
            <template slot="titulo" slot-scope="data">
              {{data.item.titulo}}
            </template>
            <template slot="contenido" slot-scope="data">
              {{data.item.contenido}}
            </template>
            <template slot="link" slot-scope="data">
              {{data.item.link}}
            </template>
            <template slot="creacion" slot-scope="data">
              {{data.item.creacion}}
            </template>
            <template slot="caducidad" slot-scope="data">
            <div style="width: 300px">
              <div class="input-group" v-if="data.item.nid != nidEditable">
                <b-form-input type="date" v-model="data.item.caducidad" class="mb-3" disabled></b-form-input>
                <button @click="editar(data.item.nid)" style="height: 37px" class="configNum-form-btn fuente" type="submit" v-tooltip.top-center="tooltip.editar"><i class="fa fa-edit" aria-hidden="true"></i></button>
              </div>
              <div class="input-group" v-if="data.item.nid == nidEditable">
                <b-form-input type="date" v-model="data.item.caducidad" class="mb-3"></b-form-input>
                <button @click="update(data.item.nid, data.item.caducidad)" style="height: 38px" class="configCorr-form-btn fuente" type="submit" v-tooltip.top-center="tooltip.guardar"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                <button @click="remover(data.item.nid)" style="height: 38px" class="configError-form-btn fuente" type="submit" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh" aria-hidden="true"></i></button>
              </div>
            </div>
            </template>
            <!-- <template slot="usuario" slot-scope="data">
              {{data.item.usuario}}
            </template> -->
            </b-table>
            <div class="row">
              <div class="col-md-12 mb-3">
                <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
              </div>
            </div>
           </div>
         </div> 
        </v-tab>
      </vue-tabs>
      </div>
      </div>
   </card>
  </div>
 </div>
</div>
</div>

</template>

<script>

import LTable from 'src/components/UIComponents/Tables/Table'
import Card from 'src/components/UIComponents/Cards/Card'
import datasource from 'vue-resource'
import axios from 'axios'

export default {
  name: 'mensajeria',
  data () {
    return {
      name: 'mensajeria',
      texto: 'Administrador de Mensajes', 
      fieldRevSuger: [
        { key: 'item', label: 'ITEM', sortable: true },    
        { key: 'titulo', label: 'TITULO', sortable: true },
        { key: 'contenido', label: 'CONTENIDO', sortable: true },
        { key: 'link', label: 'LINK', sortable: true },
        { key: 'creacion', label: 'FECHA DE CREACIÓN', sortable: true },
        { key: 'caducidad', label: 'FECHA DE CADUCIDAD', sortable: true },
        // { key: 'usuario', label: 'USUARIO', sortable: true }
      ],
      options: [
        { value: 'A', text: 'INFORMATIVO' },
        { value: 'B', text: 'REGULADOR' },
        { value: 'C', text: 'OBLIGATORIO' },
        { value: 'D', text: 'URGENTE' }
      ],
      auto: [],
      titulo: '',
      cadu: '',
      content: '',
      selected: 'A',
      link: '',
      lista: [],
      resultDatos: [],
      currentPage: 1,
      perPage: 5,
      totalRows: length,
      pageOptions: [5, 10, 20],
      sortBy: null,
      sortDesc: false,
      filter: null,
      carga: false,
      maxCount: 300,
      recorreCount: 300,
      error: false,
      nidEditable: '',
      nidGrabable: '',
      tooltip:{
        editar: 'Editar',
        guardar: 'Guardar',
        limpiar: "Proteger"
      },
    }
  },
  mounted: function () {
    this.viewControl();
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    cuenta() {
      this.recorreCount = this.maxCount - this.content.length;
      this.error = this.recorreCount < 10;
    },
    subMess(){
      if(this.titulo == ''){
        this.validContenido();
      }else if(this.cadu == ''){
        this.validContenido();
      }else if(this.content == ''){
        this.validContenido();
      }else{
        this.guardarMess();
      }
    },
    guardarMess(){
        this.saveMess();
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/mensajes/insertar',
        { 
          'titulo':this.titulo, 
          'tipo': this.selected,
          'contenido': this.content,
          'link': this.link, 
          'caducidad': this.cadu,
          'usuario':this.$session.get('user')
        }).then((response) => {
          this.resultDatos = response.data;
          if(this.resultDatos.codRpta == 1){
            this.limpiarData();
            this.mensajes();
            swal.close();
            this.successNotification();
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
    },
    successNotification() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Mensaje enviado correctamente!',
            type: 'success',
        });
    },
    successNotification2() {
        this.$notify({
            group: 'auth',
            title: 'VENTANILLA JURISDICCIONAL',
            text: 'Mensaje actualizado correctamente!',
            type: 'success',
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
    viewControl(){
      this.cargaRegistros();
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.cargaData();
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
      this.$store.state.numServicio = null;
      this.$store.state.idExpParam2 = null;
      this.$store.state.idExpParam3 = null;
      this.$store.state.numExpParam = null;
      this.$store.state.idSolicitud = null;
      this.$store.state.numExpParam2 = null;
      this.$store.state.nomSolicitud = null;
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
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    cargaData (){
      this.limpiarParam();
      this.mensajes();
    },
    mensajes: function(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverOfi + '/mensajes', 
      ).then((response) => {
        this.lista = response.data;
        this.carga = true;
        swal.close();  
       },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorRevSuger();
        }
       });
    },
    saveMess(){
      swal({
        title: "Enviando mensaje",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
    },
    updateMess(){
      swal({
        title: "Cambiando caducidad",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
    },
    cargaRegistros(){
      swal({
        title: "Cargando mensajería",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
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
    validContenido(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe completar los datos solicitados!',
        type: 'info',
      });
    },
    errorRevSuger(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de sugerencias revisadas!',
        type: 'error',
      });
    },
    limpiarData(){
      this.titulo = '',
      this.content = '',
      this.link = '',
      this.cadu = '',
      this.selected = 'A'
    },
    actualizar(){
      this.cargaRegistros();
      this.mensajes();
    },
    editar(nid){
      this.nidEditable = nid
    },
    remover(nid){
      this.nidEditable = ''
    },
    update(nid, fecha){
      this.updateMess();
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/mensajes/update',
      { 
        'nid':nid, 
        'caducidad': fecha
      }).then((response) => {
        this.resultDatos = response.data;
        if(this.resultDatos.codRpta == 1){
          this.mensajes();
          swal.close();
          this.nidEditable = ''
          this.successNotification2();
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

    }
  },
  components: {
     LTable,
     Card
  }
}
</script>
