<template>
 <div class="container-fluid">
  <div class="content"><br>
    <b-card-group deck>
        <b-card header-tag="header">
        <div style="border: 1px solid #D6DBDF">
          <h5 class="text-center detExp fuente2">{{ texto }}</h5>
        </div>   
    <br><b-table bordered
             responsive
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
    <template slot="dfecVista" slot-scope="data">
      {{data.item.dfecVista}}
    </template>
    <template slot="cdesLugar" slot-scope="data">
      {{data.item.cdesLugar}}
    </template>
    <template slot="cdesColegiado" slot-scope="data">
      {{data.item.cdesColegiado}}
    </template>
    <template slot="cdesAbogado" slot-scope="data">
      <label>Demandante:</label><br>
      <div class="subcontent">
        {{data.item.ctxtAbogDte}}
      </div>
      <label class="m-t-5">Demandado:</label><br>
      <div class="subcontent">
        {{data.item.ctxtAbogDdo}}
      </div>
    </template>
    <template slot="ctxtHechos" slot-scope="data">
      <label>Demandante:</label><br>
      <div class="subcontent">
        {{data.item.ctxtInfhDte}}
      </div>
      <label class="m-t-5">Demandado:</label><br>
      <div class="subcontent">
        {{data.item.ctxtInfhDdo}}
      </div>
    </template>
    <template slot="ctxtMagistrados" slot-scope="data">
      <label>Participantes:</label><br>
      <div class="subcontent">
        {{data.item.ctxtMagParticipan}}
      </div>
      <label class="m-t-5">Dirección:</label><br>
      <div class="subcontent">
        {{data.item.ctxtDireccion}}
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

export default {
  data () {
    return {
      texto: 'VISTAS DE AUDIENCIA',
      tooltip: {
       ver: 'Ver Video',
      },
      fields: [
        { key: 'dfecVista', label: 'FECHA DE VISTA', sortable: true },
        { key: 'cdesLugar', label: 'LUGAR DE VISTA', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'cdesAbogado', label: 'ABOGADO', sortable: true },
        { key: 'ctxtHechos', label: 'INFO. HECHOS', sortable: true },
        { key: 'ctxtMagistrados', label: 'MAG. PARTICIPANTES', sortable: true }
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
    this.getVistasporExpediente();  
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
    getVistasporExpediente: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/cuadernillo/vistas',
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
              this.$store.dispatch("vistasNotification");
            }
          });
    },
    verVideo: function (url){
      window.open(url, "Video-TC")
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
