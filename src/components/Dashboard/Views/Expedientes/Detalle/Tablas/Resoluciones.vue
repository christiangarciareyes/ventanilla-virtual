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
    <template slot="cdesTipoProyecto" slot-scope="data">
     {{data.item.cdesTipoProyecto}}
    </template>
    <template slot="dfecPublicacion" slot-scope="data">
     {{data.item.dfecPublicacion}}
    </template>
    <template slot="ctxtSentido" slot-scope="data">
    {{data.item.ctxtSentido}}
    </template>
    <template slot="ctxtFallo" slot-scope="data">
    {{data.item.ctxtFallo}}
    </template>
   <template slot="verPdf" slot-scope="data"> 
     <button @click="verDoc(data.item.cdesArchivoPdf)" type="button" class="btn-danger-circle btn btn-xs" v-tooltip.top-center="tooltip.ver"><i class="fa fa-file-pdf-o p-r-3"></i></button>
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

export default {
  data () {
    return {
      texto: 'RESOLUCIONES',
      contador: "5", 
      tooltip: {
       ver: 'Ver PDF',
      },
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'cdesTipoProyecto', label: 'TIPO DE RESOLUCIÓN', sortable: true },
        { key: 'dfecPublicacion', label: 'FECHA DE PUBLICACIÓN', sortable: true },
        { key: 'ctxtSentido', label: 'SENTIDO', sortable: true },
        { key: 'ctxtFallo', label: 'FALLO', sortable: true },
        { key: 'verPdf', label: 'VER PDF', sortable: true }
      ],
      lists: [],
      currentPage: 1,
      perPage: 10,
      totalRows: length,
      pageOptions: [ 10, 25, 50 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: ''}
    }
  },
  mounted: function () {
   this.idExp = this.$store.state.idExpParam;
   if(this.idExp != null){
    this.getResolucionesPorExpediente();  
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
    getResolucionesPorExpediente: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/cuadernillo/resoluciones',
          {
          'nidExpediente': this.$store.state.idExpParam
          }
          ).then((response) => {
            this.lists = response.data; 
          },(error) => {
            if (error.response.status === 401) {
              this.$session.destroy();
              this.$router.push('/logout');
              this.$store.dispatch("tokenVencido");
            }else{
              swal.close();
              this.$store.dispatch("resolucionesNotification");
            }
          });
    },
    verDoc: function (url){
      window.open(url, "Documento-TC")
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