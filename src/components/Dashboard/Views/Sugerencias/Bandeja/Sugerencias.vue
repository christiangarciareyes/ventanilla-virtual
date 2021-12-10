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
          <p class="card-category fuente">Esta bandeja contiene las sugerencias y calificaciones que nos envian los usuarios.</p><br>
        </div>
        <div class="col-md-4">
         <button @click="actualizar()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-refresh fa-2x"></i></button>
        </div>
        </div> 
      </template>
       <div class="row m-t-10">
       <div class="col-md-12">
       <vue-tabs>
        <v-tab title="NUEVAS SUGERENCIAS">
          <div class="row m-t-30">
           <div class="col-md-12">
            <label>Listado de sugerencias y calificaciones nuevas</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listNewSuger"
                     :fields="fieldNewSuger"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     @filtered="onFiltered">    
            <template slot="item" slot-scope="data">
              {{data.item.item}}
            </template>
            <template slot="revisar" slot-scope="data">
              <button @click="marcarLeido(data.item.nidSugerencia)" type="button" class="btn-success-circle btn btn-md" v-tooltip.top-center="tooltip" ><i class="fa fa-check p-r-5"></i></button>
            </template>
            <template slot="cnomUsuario" slot-scope="data">
              {{data.item.cnomUsuario}}
            </template>
            <template slot="ctxtDescripcion" slot-scope="data">
              {{data.item.ctxtDescripcion}}
            </template>
            <template slot="ctxtError" slot-scope="data">
              {{data.item.ctxtError}}
            </template>
            <template slot="dfecCreacion" slot-scope="data">
              {{data.item.dfecCreacion}}
            </template>
            </b-table>
            <div class="row">
            <div class="col-md-12 mb-3">
            <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
            </div>
            </div>
           </div>
         </div>
        </v-tab>
        <v-tab title="SUGERENCIAS REVISADAS">
         <div class="row m-t-30">
           <div class="col-md-12">
            <label>Listado de sugerencias y calificaciones revisadas</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listRevSuger"
                     :fields="fieldRevSuger"
                     :current-page="currentPage2"
                     :per-page="perPage2"
                     :filter="filter2"
                     :sort-by.sync="sortBy2"
                     :sort-desc.sync="sortDesc2"
                     @filtered="onFiltered2">    
            <template slot="item" slot-scope="data">
              {{data.item.item}}
            </template>
            <template slot="cnomUsuario" slot-scope="data">
              {{data.item.cnomUsuario}}
            </template>
            <template slot="cnomUsuarioRevisado" slot-scope="data">
              {{data.item.cnomUsuarioRevisado}}
            </template>
            <template slot="ctxtDescripcion" slot-scope="data">
              {{data.item.ctxtDescripcion}}
            </template>
            <template slot="dfecCreacion" slot-scope="data">
              {{data.item.dfecCreacion}}
            </template>
            <template slot="dfecRevisado" slot-scope="data">
              {{data.item.dfecRevisado}}
            </template>
            </b-table>
            <div class="row">
              <div class="col-md-12 mb-3">
                <br><br><b-pagination :total-rows="totalRows2" :per-page="perPage2" v-model="currentPage2" class="my-0 pull-right" />
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
  name: 'sugerencias',
  data () {
    return {
      name: 'sugerencias',
      texto: 'Sugerencias y Calificaciones', 
      fieldNewSuger: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'revisar', label: 'MARCAR', sortable: true },       
        { key: 'cnomUsuario', label: 'USUARIO', sortable: true },
        { key: 'ctxtDescripcion', label: 'MENSAJE', sortable: true },
        { key: 'dfecCreacion', label: 'FECHA DE ENVÍO', sortable: true }
      ],
      fieldRevSuger: [
        { key: 'item', label: 'ITEM', sortable: true },    
        { key: 'cnomUsuario', label: 'USUARIO', sortable: true },
        { key: 'cnomUsuarioRevisado', label: 'ADMINISTRADOR', sortable: true },
        { key: 'ctxtDescripcion', label: 'MENSAJE', sortable: true },
        { key: 'dfecCreacion', label: 'FECHA DE ENVÍO', sortable: true },
        { key: 'dfecRevisado', label: 'FECHA DE REVISIÓN', sortable: true }
      ],
      tooltip: 'Marcar como Leído',
      auto: [],
      listNewSuger: [],
      listRevSuger: [],
      listPass: [],
      leidos: [],
      currentPage: 1,
      perPage: 5,
      totalRows: length,
      pageOptions: [5, 10, 50],
      sortBy: null,
      sortDesc: false,
      filter: null,
      currentPage2: 1,
      perPage2: 10,
      totalRows2: length,
      pageOptions2: [10, 25, 50],
      sortBy2: null,
      sortDesc2: false,
      filter2: null,
      carga: false
    }
  },
  mounted: function () {
    this.cargaView();
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    cargaView(){
      this.viewControl();
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
    onFiltered2 (filteredItems) {
      this.totalRows2 = filteredItems.length
      this.currentPage2 = 1
    },
    cargaData (){
      this.limpiarParam();
      this.sugerNewPerson();
      this.sugerRevPerson();
    },
    marcarLeido: function(idSuger){
      swal({
        title: "Recibiendo sugerencia",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/sugerencia/upd', 
      {
        'ctxtParam': idSuger
      }
      ).then((response) => {
        this.leidos = response.data;
        if (this.leidos.codRpta == 1) {
          this.successLeido();
          this.sugerNewPerson();
          this.sugerRevPerson();
          swal.close();
        }else{
          this.errorLeido();
          swal.close(); 
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
    sugerNewPerson: function(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/sugerencia/list', 
      {
        'ctxtParam': 0
      }
      ).then((response) => {
          this.listNewSuger = response.data;
          swal.close();  
       },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            swal.close();
            this.errorNewSuger();
          }
       });
    },
    sugerRevPerson: function(){
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.post(this.$store.state.serverOfi + '/sugerencia/list', 
      {
        'ctxtParam': 1
      }
      ).then((response) => {
        this.listRevSuger = response.data;
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
    cargaRegistros(){
      swal({
        title: "Cargando sugerencias",
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
    errorNewSuger(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de sugerencias nuevas!',
        type: 'error',
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
    successLeido(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Sugerencia guardada como leída!',
        type: 'success',
      });
    },
    errorLeido(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error al marcar la sugerencia!',
        type: 'error',
      });
    },
    actualizar(){
      this.sugerNewPerson();
      this.sugerRevPerson();
    }
  },
  components: {
     LTable,
     Card
  }
}
</script>
