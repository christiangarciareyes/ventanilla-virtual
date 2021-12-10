<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
            <div class="row" style="border-bottom: 1px solid #D6DBDF">
            <div class="col-md-8">
              <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
              <p class="card-category fuente">Esta bandeja permite visualizar el estado de cada expediente contenido en la solicitud.</p><br>
            </div>
            <div class="col-md-4">
             <button @click="retornar()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
            </div>
            </div> 
            </template>
            <label style="font-size: 15px; color: #333" class="m-t-10 mb-3">Solicitud de Acceso: <a style="color: #57AACD; font-family: Verdana;">{{numeroSoli}}</a></label>
            <div class="row fuente">
            <div class="col-md-4">
                <label>Búsqueda Rápida</label>
                <b-input-group>
                  <b-form-input class="imp-fue" v-model="filter" placeholder="Escriba texto de búsqueda" />
                  <b-btn :disabled="!filter" @click="filter = ''" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh"></i></b-btn>
                </b-input-group><br>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <label>Listar Registros</label>
                <b-form-select style="border-radius: 0px" class="imp-fue" :options="pageOptions" v-model="perPage" /><br><br>
            </div>
           </div>
    <label>Listado de Expedientes</label>
    <b-table bordered class="m-t-10"
             show-empty
             stacked="lg"
             :items="lists"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered">    
    <template slot="item" slot-scope="data">
      {{data.item.item}}
    </template>
    <template slot="cnumExpediente" slot-scope="data">
      {{data.item.cnumExpediente}}
    </template>
    <template slot="ctxtParte" slot-scope="data">
      {{data.item.ctxtParte}}
    </template>
    <template slot="ctxtRepresenta" slot-scope="data">
      <div style="max-width: 350px">
      {{data.item.ctxtRepresenta}}
      </div>
    </template>
    <template slot="ctxtMotivo" slot-scope="data">
      {{data.item.ctxtEstado}}
    </template>
    <template slot="ctxtAutorizacion" slot-scope="data">
      {{data.item.ctxtMotivo + ' ' + data.item.dfecMotivo}}
    </template>
    <template slot="ctxtRevocacion" slot-scope="data">
      {{data.item.dfecEstadoAnu}}
      <div class="m-t-10">
        {{data.item.ctxtEstadoAnu}}
      </div>
    </template>
    <template slot="ctxtEstado" slot-scope="data">
      {{data.item.ctxtEstado}}
    </template>
    </b-table>
      <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
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

import { actions } from "vuex";

export default {
  data () {
    return {
      texto: 'Detalle del Documento', 
      tooltip: {
       ver: 'Ver Cuadernillo',
       detalle: 'Ver Detalle',
       resumen: 'Ver Resumen'
      },
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'cnumExpediente', label: 'NÚMERO', sortable: true },
        { key: 'ctxtParte', label: 'TIPO DE PARTE', sortable: true },
        { key: 'ctxtRepresenta', label: 'REPRESENTA A', sortable: true },
        { key: 'ctxtMotivo', label: 'ESTADO', sortable: true },
        { key: 'ctxtAutorizacion', label: 'DE LA AUTORIZACIÓN', sortable: true },
        { key: 'ctxtRevocacion', label: 'DE LA REVOCACIÓN', sortable: true },
      ],
      lists: [],
      currentPage: 1,
      perPage: 5,
      totalRows: length,
      pageOptions: [ 5, 10, 20 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' },
      idPersona: 0,
      selected: null,
      numeroSoli: null,
      codSoli: null,
      dniSoli: null,
      result: []
    }
  },
  mounted: function () {
    this.numeroSoli = this.$store.state.numSolicitud;
    this.codSoli = this.$store.state.nidSolicitud;
    this.dniSoli = this.$store.state.dniSolicitante;
    this.detalleSolicitud(); 
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    info (item, index, button) {
      this.modalInfo.title = 'Datos del Registro'
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    retornar(){
      this.$router.go(-1);
    },
    detalleSolicitud: function(){
      if(this.codSoli == null){   
        this.$router.push('/presentados')
      }else{
        swal({
          title: "Cargando registros",
          text: "Espere por favor...",
          buttons: false,
          dangerMode: true,
          icon: "static/img/loader.gif",
          closeOnClickOutside:false,
        })
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/solicitud/detallevista',
        {
          nidSolicitud: this.codSoli,
          cnumDni: this.dniSoli,
          cnomUsuario: this.$session.get('user')
        }).then((response) => {
            this.lists = response.data;
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
      }
    },
    infoNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Existen solicitudes sin seleccionar!',
          type: 'info',
        });
    },
    errorNotification() {
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, consulte con el administrador!',
          type: 'info',
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