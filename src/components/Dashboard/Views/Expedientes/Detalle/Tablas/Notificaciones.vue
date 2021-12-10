<template>
 <div class="container-fluid">
  <div class="content"><br>
    <b-card-group deck>
        <b-card header-tag="header">
        <div style="border: 1px solid #D6DBDF">
          <h5 class="text-center detExp fuente2">{{ texto }}</h5>
        </div>
    <br><b-table bordered 
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
    <template slot="cdesDocumento" slot-scope="data">
      {{data.item.cdesDocumento}}
    </template>
    <template slot="ctxtNroNotificacion" slot-scope="data">
      {{data.item.ctxtNroNotificacion}}
    </template>
    <template slot="cdesEntrega" slot-scope="data">
     <div style="max-width: 300px">
      <label>Destinatario:</label><br>
      <div class="subcontent">
        {{data.item.ctxtDestinatario}}
      </div>
      <label class="m-t-5">Dirección:</label><br>
      <div class="subcontent">
        {{data.item.cdirDestino}}
      </div>
      <label class="m-t-5">Entregado a Courier:</label><br>
      <div class="subcontent">
        {{data.item.dfecCreacion}}
      </div>
    </div>
    </template>
    <template slot="cdesNotificacion" slot-scope="data">
      <label>Devuelto por Courier</label><br>
      <div class="subcontent">
        {{data.item.dfecDevCourier}}
      </div>
      <label class="m-t-5">Recibido por la Parte:</label><br>
      <div class="subcontent">
        {{data.item.dfecRecParte}}
      </div>
      <label class="m-t-5">Forma de Notificación:</label><br>
      <div class="subcontent">
        {{data.item.cdesFormaEntregaNot}}
      </div>
    </template>
    </b-table>
     <div class="row">
      <div class="col-md-12 mb-3">
        <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
      </div>
    </div>
  </b-card>
</b-card-group>
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
      texto: 'NOTIFICACIONES',
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'cdesDocumento', label: 'DOCUMENTO', sortable: true },
        { key: 'ctxtNroNotificacion', label: 'NÚMERO', sortable: true },
        { key: 'cdesEntrega', label: 'DE LA ENTREGA A COURIER', sortable: true },
        { key: 'cdesNotificacion', label: 'NOTIFICACIÓN A LA PARTE', sortable: true }
      ],
      lists: [],
      currentPage: 1,
      perPage: 10,
      totalRows: length,
      pageOptions: [ 10, 25, 50 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  mounted: function () {
   this.idExp = this.$store.state.idExpParam;
   if(this.idExp != null){
    this.getNotificacionesporExpediente();  
   }else{
    this.$router.push('/expedientes')
   } 
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
    getNotificacionesporExpediente: function(){ 
        if(this.$store.state.idExpParam == null){
           this.$router.push('/expedientes')
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
        axios.post(this.$store.state.serverOfi + '/cuadernillo/notificaciones',
          {
          'nidExpediente': this.$store.state.idExpParam
          }
          ).then((response) => {
            this.lists = response.data;
            swal.close(); 
          },(error) => {
            if (error.response.status === 401) {
              this.$session.destroy();
              this.$router.push('/logout');
              this.$store.dispatch("tokenVencido");
            }else{
              swal.close();
              this.$store.dispatch("notifiNotification");
            }
          });
        }  
    },
    setIdExp (id) { 
     this.$store.commit('newValue', id)
    }
  },
  components: {
     LTable,
     Card
    }
}
</script>

<style> 
</style>
