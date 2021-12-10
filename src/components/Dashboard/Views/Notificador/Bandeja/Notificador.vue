<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row">
    <div class="col-12">
      <card v-if="carga">
        <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
          <p class="card-category fuente">En esta bandeja listaras a quienes se enviaron notificaciónes acerca de los procesos del TC.</p><br>
        </div>
        </div> 
        </template>
      <div class="row m-t-10 fuente">
      <div class="col-md-4">
          <label>Ingrese Fecha de Programación</label>
          <b-input-group class="mb-4">
          <b-form-input type="date" v-model="filter"></b-form-input>
          <b-btn :disabled="!filter" @click="filter = ''" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh"></i></b-btn>
          </b-input-group>
      </div>
       <div class="col-md-3">
        <div class="container-form-btn m-t-25">
          <button v-on:click="notificar()" class="guardar-form-btn fuente" style="width:250px;"><i class="fa fa-envelope-open-o m-r-5"></i> ENVIAR NOTIFICACIONES</button>
        </div>
      </div>
     </div>
    <div v-if="ver"><label>Lista de personas notificadas</label></div>
    <b-table bordered class="mt-3"
             show-empty
             stacked="lg"
             :items="lists2"
             :fields="fields"
             v-if="ver">
    <template slot="ctxtData" slot-scope="data">
      {{data.item.ctxtData}}
    </template> 
    <template slot="cnumDni" slot-scope="data">
      {{data.item.cnumDni}}
    </template>    
    <template slot="ctxtValor" slot-scope="data">
      {{data.item.ctxtValor}}
    </template>
    </b-table>
    <div class="row" v-if="ver">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
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
  name: 'notificador',
  data () {
    return {
      name: 'notificador',
      texto: 'Envío de Notificaciones', 
      fields: [
        { key: 'ctxtData', label: 'FECHA DE VISTA', sortable: true },
        { key: 'cnumDni', label: 'DNI', sortable: true },
        { key: 'ctxtValor', label: 'MEDIO DE ENVÍO', sortable: true },
      ],
      tooltip: {
        limpiar: 'Limpiar Datos'
      },
      ver: false,
      auto: [],
      lists: [],
      lists2: [],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      pageOptions: [ 10, 25, 50 ],
      sortBy: null,
      filter: '',
      sortDesc: false,
      idPersona: 0,
      carga: false,
    }
  },
  mounted: function () {
    this.cargaView();
  },
  methods: {
    cargaView(){
      this.viewAutorizacion();
    },
    viewAutorizacion(){
      this.cargaRegistros();
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.limpiarParam();
          this.carga = true;
          swal.close();  
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
      this.$store.state.pagTableFormExp = null;
      this.$store.state.pagTableFormRev = null;
      this.$store.state.pagTableFormAnu = null;
      this.$notify({group: 'auth', clean: true});
      this.$notify({group: 'custom-template2', clean: true});
      this.$notify({group: 'custom-template3', clean: true});
      this.$notify({group: 'custom-template4', clean: true});
    },
    notificar: function(){
      if(this.filter == ''){
        this.errorNotificador();
      }else{
    	  this.enviarNoty();
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.notifica + '/cron-generarnotificaciones/NOTIFICA/123456/4/' + this.filter)
        .then((response) => {
          this.lists = response.data;
          if(this.lists.codRpta == 1){
            axios.defaults.headers.common['Authorization'] = this.$session.get('token')
            axios.get(this.$store.state.notifica + '/cron-notificar/NOTIFICA/123456')
            .then((response) => {
              this.lists2 = response.data;
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
      }
    },
    errorNotificador(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe ingresar la fecha de Vista de Causa!',
        type: 'error',
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
    enviarNoty(){
      swal({
        title: "Enviando Notificaciones",
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
    }
  },
  components: {
     LTable,
     Card
  }
}
</script>
<style lang="scss">
</style>