<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
      <card>
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title">{{ texto }}</h5>
          <p class="card-category">Realiza consultas de los usuarios y expedientes por medio de solicitudes, audiencia públicas o vistas de causa.</p><br>
        </div>
        </div> 
      </template>
      <div>
      <div class="row m-t-10">
       <div class="col-md-12">
       <vue-tabs v-model="tabName">
        <v-tab title="CONSULTA DE USUARIOS">
            <div class="row m-t-30">
              <div class="col-md-4">
                <label>Ingrese el N° de Expediente</label>
                <the-mask class="form-control imp-fue" mask="#####" v-model="expediente" placeholder="#####"/><br>
              </div>
              <div class="col-md-4">
                <label>Ingrese el Año del Expediente</label>
                <the-mask class="form-control imp-fue" mask="####" v-model="periodo" placeholder="####"/><br>
              </div>
              <div class="col-md-4">
                <label>Ingrese el Tipo de Proceso</label>
              <b-form-select style="border-radius: 0px;" class="form-control imp-fue mb-3" v-model="proceso" :options="options" /><br>
              </div>
            </div>
            <div class="container-form-btn m-t-10">
              <button v-on:click="consulAccesos" style="width: 250px" class="guardar-form-btn m-r-10 m-l-10 mb-3 fuente"><i class="fa fa-search m-r-5" aria-hidden="true"></i> BUSCAR EXPEDIENTE</button>
            </div>
            <div v-if="carga">
            <div class="row m-t-30">
            <div class="col-md-12">
            <vue-tabs>
              <v-tab title="ACCESOS DE USUARIOS">
                  <div class="row m-t-30">
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
                      <b-form-select style="border-radius: 0px;" class="imp-fue" :options="pageOptions" v-model="perPage" />
                      <br><br>
                  </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                <label>Listado de Acceso de Usuarios</label>
                <b-table bordered class="m-t-10"
                        show-empty
                        stacked="lg"
                        :items="listAccesos"
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
                    <template slot="persona" slot-scope="data">
                      {{data.item.nombres + ' ' + data.item.paterno + ' ' + data.item.materno}}
                    </template>
                    <template slot="usuario" slot-scope="data">
                      {{data.item.usuario}}
                    </template>
                    <template slot="cnumExpediente" slot-scope="data">
                      {{data.item.cnumExpediente}}
                    </template>
                    <template slot="ctxtAccion" slot-scope="data">
                      {{data.item.ctxtAccion}}
                    </template>
                    <template slot="ctxtObservacion" slot-scope="data">
                      {{data.item.ctxtObservacion}}
                    </template>
                    <template slot="dfecCreacion" slot-scope="data">
                      {{data.item.dfecCreacion}}
                    </template>
                </b-table>
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <br><br><b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right"/>
                  </div>
                </div>
              </div>
              </div>
              </v-tab>
              <v-tab title="LISTA DE SOLICITUDES">
                  <div class="row m-t-30">
                  <div class="col-md-4">
                    <label>Búsqueda Rápida</label>
                    <b-input-group>
                      <b-form-input class="imp-fue" v-model="filter2" placeholder="Escriba texto de búsqueda" />
                      <b-btn :disabled="!filter2" @click="filter2 = ''" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh"></i></b-btn>
                    </b-input-group><br>
                  </div>
                  <div class="col-md-4"></div>
                  <div class="col-md-4">
                      <label>Listar Registros</label>
                      <b-form-select style="border-radius: 0px;" class="imp-fue" :options="pageOptions2" v-model="perPage2" />
                      <br><br>
                  </div>
                </div>
                <div class="row">
                <div class="col-md-12">
                <label>Listado de Solicitudes del Expediente</label>
                <b-table bordered class="m-t-10"
                        show-empty
                        stacked="lg"
                        :items="listSolicitudes"
                        :fields="fields2"
                        :current-page="currentPage2"
                        :per-page="perPage2"
                        :filter="filter2"
                        :sort-by.sync="sortBy2"
                        :sort-desc.sync="sortDesc2"
                        @filtered="onFiltered2">    
                    <template slot="item" slot-scope="data">
                      {{data.item.item}}
                    </template>
                    <template slot="expediente" slot-scope="data">
                      {{data.item.cnumExpediente}}
                    </template>
                    <template slot="representante" slot-scope="data">
                      {{data.item.ctxtRepresenta}}
                    </template>
                    <template slot="parte" slot-scope="data">
                      {{data.item.ctxtParte}}
                    </template>
                    <template slot="motivo" slot-scope="data">
                      {{data.item.ctxtMotivo}}
                    </template>
                    <template slot="colegiado" slot-scope="data">
                      <div v-if="data.item.nidColegiado === '1'" >SALA 1</div>
                      <div v-if="data.item.nidColegiado === '2'" >SALA 2</div>
                      <div v-if="data.item.nidColegiado === '3'" >PLENO</div>
                    </template>
                    <template slot="usuario" slot-scope="data">
                      {{data.item.cnomUsuarioMotivo}}
                    </template>
                    <template slot="dfecCreacion" slot-scope="data">
                      {{data.item.dfecCreacion}}
                    </template>
                </b-table>
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <br><br><b-pagination :total-rows="totalRows2" :per-page="perPage2" v-model="currentPage2" class="my-0 pull-right"/>
                  </div>
                </div>
              </div>
              </div>
              </v-tab>
            </vue-tabs>
            </div>
            </div>
          </div>
        </v-tab>
        <v-tab title="CONSULTA DE EXPEDIENTES" :selected="true">
          <div class="row m-t-30 fuente">
            <div class="col-md-4">
                <label>Ingrese Fecha</label>
                <b-form-input class="form-control imp-fue mb-3" type="date" v-model="fecha"></b-form-input>
            </div>
            <div class="col-md-4">
                <label>Tipo de Búsqueda</label>
                <b-form-select style="border-radius: 0px;" class="form-control imp-fue" :options="listatipo" v-model="tipo" />
            </div>
            <div class="col-md-4">
              <div class="container-form-btn m-t-25">
                <button v-on:click="buscarExped()" class="guardar-form-btn fuente" style="width:250px;"><i class="fa fa-envelope-open-o m-r-5"></i> BUSCAR EXPEDIENTES</button>
              </div>
            </div>
          </div>
          <div v-if="carga2">
          <div class="row m-t-30">
            <div class="col-md-4">
              <label>Búsqueda Rápida</label>
              <b-input-group>
                <b-form-input class="imp-fue" v-model="filter3" placeholder="Escriba texto de búsqueda" />
                <b-btn :disabled="!filter3" @click="filter3 = ''" v-tooltip.top-center="tooltip.limpiar"><i class="fa fa-refresh"></i></b-btn>
              </b-input-group><br>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <label>Listar Registros</label>
                <b-form-select style="border-radius: 0px;" class="imp-fue" :options="pageOptions3" v-model="perPage3" />
                <br><br>
            </div>
          </div>
          <div class="row">
          <div class="col-md-12">
          <label>Listado de Expedientes</label>
          <b-table bordered class="m-t-10"
                  show-empty
                  stacked="lg"
                  :items="listExpedientes"
                  :fields="fields3"
                  :current-page="currentPage3"
                  :per-page="perPage3"
                  :filter="filter3"
                  :sort-by.sync="sortBy3"
                  :sort-desc.sync="sortDesc3"
                  @filtered="onFiltered3">    
          <template slot="cnumExpediente" slot-scope="data">
            <div style="width:100px">
            {{data.item.cnumExpediente}}
            <div style="margin-top: 5px">
              <label>EXPEDIENTE PJ:</label><br>
              <div class="subcontent">
                {{data.item.cnumExpPj}}
              </div>
            </div>
            </div>
          </template>
          <template slot="ctxtDemandante" slot-scope="data">
            {{data.item.ctxtDemandante}}
            <div style="margin-top: 5px">
              <label>ABOGADO DEMANDANTE:</label><br>
              <div class="subcontent">
                {{data.item.cnomAboDemandante}}
              </div>
            </div>
          </template>
          <template slot="ctxtDemandado" slot-scope="data">
            {{data.item.ctxtDemandado}}
            <div style="margin-top: 5px">
              <label>ABOGADO DEMANDADO:</label><br>
              <div class="subcontent">
                {{data.item.cnomAboDemandado}}
              </div>
            </div>
          </template>
          <template slot="cdesColegiado" slot-scope="data">
            {{data.item.cdesColegiado}}
            <div style="margin-top: 5px">
              <label>FECHA AUDIENCIA PÚBLICA:</label><br>
              <div class="subcontent">
                {{data.item.cfecVista}}
              </div><br>
              <label>FECHA VISTA DE CAUSA:</label><br>
              <div class="subcontent">
                {{data.item.cfecVista2}}
              </div>
            </div>
          </template>
          <template slot="cdesTipoProceso" slot-scope="data">
            {{data.item.cdesTipoProceso}}
            <div style="margin-top: 5px">
              <label>SENTIDO:</label><br>
              <div class="subcontent">
                {{data.item.cdesSentido}}
              </div><br>
              <label>FALLO:</label><br>
              <div class="subcontent">
                {{data.item.cdesFallo}}
              </div>
            </div>
          </template>
          <template slot="ctxtProcedencia" slot-scope="data">
            {{data.item.ctxtProcedencia}}
            <div style="margin-top: 5px">
              <label>MATERIA:</label><br>
              <div class="subcontent">
                {{data.item.cdesMateria}}
              </div><br>
              <label>SUBMATERIA:</label><br>
              <div class="subcontent">
                {{data.item.cdesSubMateria}}
              </div>
            </div>
          </template>
          <template slot="dfecIngreso" slot-scope="data">
            <div style="width:300px;">
            {{data.item.dfecIngreso}}
            <div style="margin-top: 5px">
              <label>INTEGRANTES:</label><br>
              <div class="subcontent">
                {{data.item.cdesIntegrantes}}
              </div><br>
              <label>REMITENTE PJ:</label><br>
              <div class="subcontent">
                {{data.item.cdesRemitentePj}}
              </div>
              <label>OBSERVACIÓN:</label><br>
              <div class="subcontent">
                {{data.item.ctxtObservacion}}
              </div>
            </div>
            </div>
          </template>
          <template slot="ver" slot-scope="row"> 
            <router-link :to="{ path: '/cuadernillo'}">
              <button @click="setIdExp(row.item.nidExpediente, row.item.cnumExpediente)" type="button" class="btn-info-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-folder-open-o p-r-4"></i></button>
            </router-link>
          </template>
          </b-table>
          <div class="row">
            <div class="col-md-12 mb-3">
              <br><br><b-pagination :total-rows="totalRows3" :per-page="perPage3" v-model="currentPage3" class="my-0 pull-right"/>
            </div>
          </div>
        </div>
        </div>
        </div>
        </v-tab>
      </vue-tabs>
      </div>
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
  name: 'consultas',
  data () {
    return {
      name: 'consultas',
      texto: 'Consultas de Salas', 
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },   
        { key: 'persona', label: 'PERSONA', sortable: true },
        { key: 'usuario', label: 'USUARIO', sortable: true }, 
        { key: 'cnumExpediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'ctxtAccion', label: 'ACCIÓN', sortable: true },
        { key: 'ctxtObservacion', label: 'OBSERVACIÓN', sortable: true },
        { key: 'dfecCreacion', label: 'FEC. CONSULTA', sortable: true },
      ],
      fields2: [
        { key: 'item', label: 'ITEM', sortable: true },   
        { key: 'expediente', label: 'EXPEDIENTE', sortable: true },
        { key: 'representante', label: 'REPRESENTANTE', sortable: true }, 
        { key: 'parte', label: 'TIPO D EPARTE', sortable: true },
        { key: 'motivo', label: 'MOTIVO', sortable: true },
        { key: 'colegiado', label: 'COLEGIADO', sortable: true },
        { key: 'usuario', label: 'USUARIO AUTORIZADOR', sortable: true },
        { key: 'dfecCreacion', label: 'FEC. SOLICITUD', sortable: true },
      ],
      fields3: [
        { key: 'cnumExpediente', label: 'NÚMERO', sortable: true },
        { key: 'ctxtDemandante', label: 'DEMANDANTE', sortable: true },
        { key: 'ctxtDemandado', label: 'DEMANDADO', sortable: true },
        { key: 'cdesColegiado', label: 'COLEGIADO', sortable: true },
        { key: 'cdesTipoProceso', label: 'PROCESO', sortable: true },
        { key: 'ctxtProcedencia', label: 'PROCEDENCIA', sortable: true },
        { key: 'dfecIngreso', label: 'FEC. INGRESO', sortable: true },
        { key: 'ver', label: 'VER' }
      ],
      options: [
        { value: 'AMPARO', text: 'ACCIÓN DE AMPARO' },
        { value: 'CUMPLIMIENTO', text: 'ACCIÓN DE CUMPLIMIENTO' },
        { value: 'INCONSTITUCIONALIDAD', text: 'ACCIÓN DE INCONSTITUCIONALIDAD' },
        { value: 'COMPETENCIA', text: 'CONFLICTO DE COMPETENCIA' },
        { value: 'CORPUS', text: 'HÁBEAS CORPUS' },
        { value: 'DATA', text: 'HÁBEAS DATA' },
        { value: 'QUEJA', text: 'QUEJA' },
      ],
      listatipo: [
        { value: '0', text: 'AUDIENCIA PÚBLICA' },
        { value: '1', text: 'VISTA DE CAUSA' }
      ],
      tipo: '0',
      tooltip: {
        limpiar: 'Limpiar Datos',
        ver: 'Ver Cuadernillo',
      },
      auto: [],
      listAccesos: [],
      listSolicitudes: [],
      listExpedientes: [],
      perPage: 10,
      currentPage: 1,
      totalRows: length,
      pageOptions: [10, 25, 50],
      sortBy: null,
      filter: null,
      sortDesc: false,
      perPage2: 10,
      currentPage2: 1,
      totalRows2: length,
      pageOptions2: [10, 25, 50],
      sortBy2: null,
      filter2: null,
      sortDesc2: false,
      perPage3: 10,
      currentPage3: 1,
      totalRows3: length,
      pageOptions3: [10, 25, 50],
      sortBy3: null,
      filter3: null,
      sortDesc3: false,
      servicio: 5,
      carga: false,
      carga2: false,
      proceso: 'AMPARO',
      expediente: '',
      periodo: '',
      param: '',
      proceso2: '',
      fecha: ''
    }
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  mounted: function () {
    this.cargaView();
  },
  methods: {
    cargaView(){
      this.viewMantenimiento();
    },
    viewMantenimiento(){
      this.cargaRegistros();
      this.mosAlert = this.$store.state.alerts;
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios.get(this.$store.state.serverCas + '/operaciones//app/OFIV/' + this.name)
      .then((response) => {
        this.auto = response.data;
        if(this.auto.codError == 1){
          this.limpiarParam();
          swal.close();
          this.validCarga();
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
    onFiltered3 (filteredItems) {
      this.totalRows3 = filteredItems.length
      this.currentPage3 = this.$store.state.pagTableFormExp
    },
    consulAccesos: function(){
    	if(this.expediente != '' && this.periodo != ''){
        this.cargaRegistros();
        this.validarExpediente();
        this.validarProceso();
        this.param = this.expediente + "-" + this.periodo + "-" + this.proceso2;
	      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
	      axios.get(this.$store.state.serverOfi + '/acciones/general/' + this.param)
	       .then((response) => {
	          this.listAccesos = response.data;
            this.consulSolicitudes(); 
	       },(error) => {
	        if (error.response.status === 401) {
	          this.$session.destroy();
	          this.$router.push('/logout');
	          this.$store.dispatch("tokenVencido");
	        }else{
	          swal.close();
	          this.errorCargaConsul();
	        }
	      });
        }else{
	       this.$store.dispatch("incorrecNotification");
    	}
    },
    consulSolicitudes: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.get(this.$store.state.serverOfi + '/acciones/solicitudes/' + this.param)
         .then((response) => {
            this.listSolicitudes = response.data;
            this.carga = true;
            swal.close();  
         },(error) => {
          if (error.response.status === 401) {
            this.$session.destroy();
            this.$router.push('/logout');
            this.$store.dispatch("tokenVencido");
          }else{
            swal.close();
            this.errorCargaConsul();
          }
        });
    },
    buscarExped: function(){
    	if(this.fecha != ''){
        this.cargaRegistros();
	      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
	      axios.get(this.$store.state.serverOfi + '/expediente/lista5/' + this.fecha + '/' + this.tipo)
	       .then((response) => {
	          this.listExpedientes = response.data;
            this.carga2 = true;
            swal.close(); 
	       },(error) => {
	        if (error.response.status === 401) {
	          this.$session.destroy();
	          this.$router.push('/logout');
	          this.$store.dispatch("tokenVencido");
	        }else{
	          swal.close();
	          this.errorCargaConsul();
	        }
	      });
      }else{
        this.$store.dispatch("incorrecNotification");
      }
      this.$store.state.consultas_fecha = this.fecha 
      this.$store.state.consultas_tipo = this.tipo
    },
    setIdExp (vidExp, vidNum) {  
      this.$store.commit('newValue5', vidExp);
      this.$store.commit('newValueExp4', vidNum);
      this.$store.commit('newServicio', this.servicio);
      this.$store.commit('setPagTableFormExp', this.currentPage3);
    },
    cargaRegistros(){
      swal({
        title: "Cargando registros",
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
    errorCargaConsul(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de datos de consultas!',
        type: 'error',
      });
    },
    validarProceso(){
    	if(this.proceso == 'AMPARO'){
          this.proceso2 = 'AA'
    	}else if(this.proceso == 'CUMPLIMIENTO'){
          this.proceso2 = 'AC'
    	}else if(this.proceso == 'INCONSTITUCIONALIDAD'){
          this.proceso2 = 'AI'
    	}else if(this.proceso == 'COMPETENCIA'){
          this.proceso2 = 'CC'
    	}else if(this.proceso == 'CORPUS'){
          this.proceso2 = 'HC'
    	}else if(this.proceso == 'DATA'){
          this.proceso2 = 'HD'
    	}else if(this.proceso == 'QUEJA'){
          this.proceso2 = 'Q'
    	}
    },
    validarExpediente(){
      if(this.expediente.length == 4){
         this.expediente = '0' + this.expediente
      }else if(this.expediente.length == 3){
         this.expediente = '00' + this.expediente
      }else if(this.expediente.length == 2){
         this.expediente = '000' + this.expediente
      }else if(this.expediente.length == 1){
         this.expediente = '0000' + this.expediente
      }else{}
    },
    validCarga(){
      if(this.$store.state.consultas_tipo != ''){
         this.fecha = this.$store.state.consultas_fecha
         this.tipo = this.$store.state.consultas_tipo
         this.tabName = "CONSULTA DE EXPEDIENTES"
         this.buscarExped();
      }else{}
    }
  },
  components: {
     LTable,
     Card
  }
}
</script>
