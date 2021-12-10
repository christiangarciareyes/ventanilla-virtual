<template>
  <div class="content">
  <div class="container-fluid">
    <div class="row" v-if="solicitudes">
      <div class="col-md-12">
      <card v-if="carga">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">{{ texto }}</h5>
          <p class="card-category fuente">Esta bandeja contiene las listas de solicitudes atendidas y pendientes de la institución.</p><br>
        </div>
        </div> 
      </template>
       <div class="row m-t-10">
       <div class="col-md-12">
       <vue-tabs>
        <v-tab title="SOLICITUDES ATENDIDAS">
         <div class="row m-t-30">
          <div class="col-md-12">
          <div class="row fuente">
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
            <label>Listado de Solicitudes Atendidas</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listAtendidas"
                     :fields="fieldAtendidas"
                     :current-page="currentPage2"
                     :per-page="perPage2"
                     :filter="filter2"
                     :sort-by.sync="sortBy2"
                     :sort-desc.sync="sortDesc2"
                     @filtered="onFiltered2">    
		    <template slot="item" slot-scope="data">
		      {{data.item.item}}
		    </template>  
		    <template slot="numero" slot-scope="data">
		      {{data.item.cnumSolicitud}}
		    </template>
		    <template slot="solicitante" slot-scope="data">
		      {{data.item.cnomNombres + ' '+ data.item.capePat + ' ' + data.item.capeMat}}
          <div style="margin-top: 5px">
            <label>Expedientes:</label><br>
            <div class="subcontent">
              {{data.item.nroExpedientes}}
            </div>
          </div>
		    </template>
		    <template slot="dni" slot-scope="data">
		      {{data.item.cnumDni}}
		    </template>
		    <template slot="correo" slot-scope="data">
		      {{data.item.ctxtCorreo}}
		    </template>
		    <template slot="celular" slot-scope="data">
		      {{data.item.cnumCelular}}
		    </template>
		    <template slot="fecha" slot-scope="data">
		      {{data.item.dfecCreacion}}
		    </template>
		   <template slot="ver" slot-scope="data"> 
		      <router-link :to="{path: '/presentados/detPresentado'}">
		        <button @click="setItemSolicitud(data.item.cnumSolicitud, data.item.nidSolicitud, data.item.cnumDni)" type="button" class="btn-primary-circle btn btn-md" v-tooltip.top-center="tooltip.detalle" ><i class="fa fa-external-link p-t-5 p-r-2"></i></button>
		      </router-link>
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
        <v-tab title="SOLICITUDES PENDIENTES">
         <div class="row">
           <div class="col-md-12">
          <div class="row m-t-30">
           <div class="col-md-12">
           <div class="row fuente">
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
            <label>Listado de Solicitudes Pendientes</label>
            <b-table bordered class="m-t-10"
                     show-empty
                     stacked="lg"
                     :items="listPendientes"
                     :fields="fieldPendientes"
                     :current-page="currentPage3"
                     :per-page="perPage3"
                     :filter="filter3"
                     :sort-by.sync="sortBy3"
                     :sort-desc.sync="sortDesc3"
                     @filtered="onFiltered3">    
		    <template slot="item" slot-scope="data">
		      {{data.item.item}}
		    </template>  
		    <template slot="numero" slot-scope="data">
		      {{data.item.cnumSolicitud}}
		    </template>
		    <template slot="solicitante" slot-scope="data">
		      {{data.item.cnomNombres + ' '+ data.item.capePat + ' ' + data.item.capeMat}}
          <div style="margin-top: 5px">
            <label>Expedientes:</label><br>
            <div class="subcontent">
              {{data.item.nroExpedientes}}
            </div>
          </div>
		    </template>
		    <template slot="dni" slot-scope="data">
		      {{data.item.cnumDni}}
		    </template>
		    <template slot="correo" slot-scope="data">
		      {{data.item.ctxtCorreo}}
		    </template>
		    <template slot="celular" slot-scope="data">
		      {{data.item.cnumCelular}}
		    </template>
		    <template slot="fecha" slot-scope="data">
		      {{data.item.dfecCreacion}}
		    </template>
		   <template slot="ver" slot-scope="data"> 
		      <router-link :to="{path: '/presentados/detPresentado'}">
		        <button @click="setItemSolicitud(data.item.cnumSolicitud, data.item.nidSolicitud, data.item.cnumDni)" type="button" class="btn-primary-circle btn btn-md" v-tooltip.top-center="tooltip.detalle" ><i class="fa fa-external-link p-t-5 p-r-2"></i></button>
		      </router-link>
		   </template>
            </b-table>
            <div class="row">
              <div class="col-md-12 mb-3">
                <br><br><b-pagination :total-rows="totalRows3" :per-page="perPage3" v-model="currentPage3" class="my-0 pull-right" />
              </div>
            </div>
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
  <div class="row">
  <div class="col-md-12">
   <card v-if="report">
      <template slot="header">
        <div class="row" style="border-bottom: 1px solid #D6DBDF">
        <div class="col-md-12">
          <h5 style="font-size: 18px" class="card-title fuente">EMITIR REPORTE</h5>
          <p class="card-category fuente">Completa la información para descargar.</p><br>
        </div>
        </div> 
      </template>
      <div class="row m-t-20">
       <div class="col-md-4"> 
          <label>Fecha Inicial</label>
          <b-form-input class="imp-fue" type="date" v-model="fechaIni" /><br>
          <label>Fecha Final</label>
          <b-form-input class="imp-fue" type="date" v-model="fechaFin" /><br>
        </div>
        <div class="col-md-4"> 
        <label>Estado</label>
        <b-form-group>
          <b-form-checkbox-group stacked style="margin-left: -30px; text-indent: 20px" class="m-t-10" id="checkboxes1" name="flavour1" v-model="estado" :options="listEstado"></b-form-checkbox-group>
        </b-form-group>
        </div>
        <div class="col-md-4"> 
        <label>Colegiados</label>
        <b-form-group>
          <b-form-checkbox-group stacked style="margin-left: -30px; text-indent: 20px" class="m-t-10" id="checkboxes2" name="flavour2" v-model="tipo" :options="listTipo"></b-form-checkbox-group>
        </b-form-group><br>
        </div>
      </div>
      <div class="container-form-btn">
        <button style="width:250px" @click="reporte()" class="guardar-form-btn mb-3 mt-3 fuente" type="submit"><i class="fa fa-cloud-download mr-1"></i> DESCARGAR PDF</button>
      </div>
   </card>
  </div>
  </div>

    <div class="container-form-btn">
     <button align="center" @click="showReporte()" style="width: 250px; font-size: 13px" class="alertTuto2-form-btn fuente m-t-10 m-b-20"><i class="fa fa-file-pdf-o m-r-8"></i>{{myReporte}}</button>
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
  name: 'accesos',
  data () {
    return {
      name: 'solicitudes',
      texto: 'Bandeja de Solicitudes en General', 
      fieldAtendidas: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'numero', label: 'NÚMERO', sortable: true },
        { key: 'solicitante', label: 'SOLICITANTE', sortable: true },
        { key: 'dni', label: 'DNI', sortable: true },
        { key: 'correo', label: 'CORREO', sortable: true },
        { key: 'celular', label: 'CELULAR', sortable: true },
        { key: 'fecha', label: 'FECHA DE INGRESO' },
        { key: 'ver', label: 'VER' }
      ],
      fieldPendientes: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'numero', label: 'NÚMERO', sortable: true },
        { key: 'solicitante', label: 'SOLICITANTE', sortable: true },
        { key: 'dni', label: 'DNI', sortable: true },
        { key: 'correo', label: 'CORREO', sortable: true },
        { key: 'celular', label: 'CELULAR', sortable: true },
        { key: 'fecha', label: 'FECHA DE INGRESO' },
        { key: 'ver', label: 'VER' }
      ],
      tooltip: {
        detalle: 'Ver Detalle',
        limpiar: 'Limpiar Datos'
      },
      auto: [],
      listAtendidas: [],
      listPendientes: [],
      currentPage2: 1,
      perPage2: 10,
      totalRows2: length,
      pageOptions2: [10, 25, 50],
      sortBy2: null,
      sortDesc2: false,
      filter2: null,
      currentPage3: 1,
      perPage3: 10,
      totalRows3: length,
      pageOptions3: [10, 25, 50],
      sortBy3: null,
      sortDesc3: false,
      filter3: null,
      carga: false,
      report: false,
      myReporte: 'ACTIVAR REPORTE',
      listTipo: [
        { value: '1', text: 'SALA 1' },
        { value: '2', text: 'SALA 2' },
        { value: '3', text: 'PLENO' },
      ],
      listEstado: [
        { value: '0', text: 'PENDIENTES' },
        { value: '1', text: 'ATENDIDOS' },
        { value: '2', text: 'TODOS' },
      ],
      fechaIni: '',
      fechaFin: '',
      tipo: ["1"],
      estado: '2',
      reportePDF: '',
      solicitudes: true
    }
  },
  mounted: function () {
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    if(dd<10) {dd='0'+ dd} 
    if(mm<10) {mm='0'+ mm} 
    this.fechaFin = yyyy +'-'+ mm +'-'+ dd;
    var fecha = hoy.setDate(hoy.getDate() - 7) 
    var antes = new Date(fecha)
    var da = antes.getDate();
    var ma = antes.getMonth() + 1;
    var yyya = antes.getFullYear();
    if(da<10) {da='0'+ da} 
    if(ma<10) {ma='0'+ ma} 
    this.fechaIni = yyya +'-'+ ma +'-'+ da;
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
      this.$notify({group: 'custom-template4', clean: true});
    },
    onFiltered2 (filteredItems) {
      this.totalRows2 = filteredItems.length
      this.currentPage2 = 1
    },
    onFiltered3 (filteredItems) {
      this.totalRows3 = filteredItems.length
      this.currentPage3 = 1
    },
    cargaData (){
      this.limpiarParam();
      this.accesoPerson();
      this.securPerson();
    },
    accesoPerson: function(){
        axios.defaults.headers.common['Authorization'] = this.$session.get('token')
        axios.post(this.$store.state.serverOfi + '/solicitud/atendidasadm',
        {
          nflgEstado: '1',
          cnumDni: this.$session.get('dni')
        }).then((response) => {
          this.listAtendidas = response.data;
          this.carga = true;
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
    securPerson: function(){
	  axios.defaults.headers.common['Authorization'] = this.$session.get('token')
	  axios.post(this.$store.state.serverOfi + '/solicitud/porautorizaradm',
	  {
        nflgEstado: '1',
        cnumDni: this.$session.get('dni')
	  }).then((response) => {
        this.listPendientes = response.data;
        this.carga = true;
        swal.close();  
      },(error) => {
        if (error.response.status === 401) {
          this.$session.destroy();
          this.$router.push('/logout');
          this.$store.dispatch("tokenVencido");
        }else{
          swal.close();
          this.errorCargaPass();
        }
      });
    },
    setItemSolicitud(numSolicitud, itemSolicitud, dniSolicitud) { 
     this.$store.commit('setNumSolicitud', numSolicitud); 
     this.$store.commit('setNidSolicitud', itemSolicitud);
     this.$store.commit('setDniSolicitud', dniSolicitud);
     this.$store.commit('setPagTableFormPre', this.currentPage);
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
    errorCargaPass(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Error en la carga de datos de seguridad!',
        type: 'error',
      });
    },
    errorReporte(){
      this.$notify({
        group: 'auth',
        title: 'VENTANILLA JURISDICCIONAL',
        text: 'Debe completar los datos solicitados!',
        type: 'error',
      });
    },
    showReporte() {
      if(this.report == true){
        this.lista = 'col-md-12';
        this.report = false;
        this.solicitudes = true;
        this.myReporte = 'ACTIVAR REPORTE'
      }else{
        this.lista = 'col-md-9';
        this.solicitudes = false
        this.report = true;
        this.myReporte = 'DESACTIVAR REPORTE'
      }
    },
    reporte(){
     if(this.fechaIni == '' || this.fechaFin == '' || this.estado == '' || this.tipo == ''){
       this.errorReporte();
     }else{
      swal({
        title: "Descargando reporte",
        text: "Espere por favor...",
        buttons: false,
        dangerMode: true,
        icon: "static/img/loader.gif",
        closeOnClickOutside:false,
      })
      axios.defaults.headers.common['Authorization'] = this.$session.get('token')
      axios({
        url: this.$store.state.serverOfi + '/solicitudesPDF?usuario=' + this.$session.get('user') + '&flgEstado=' + this.estado + '&txtColegiado=' + this.tipo + '&fecIni=' + this.fechaIni + '&fecFin=' + this.fechaFin + '&flgDescarga=' + 1,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', 'Reporte.pdf');
         document.body.appendChild(link);
         link.click();
         swal.close();
         this.tipo = ["1"];
         this.estado = '2';
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
     }
     }
  },
  components: {
     LTable,
     Card
  }
}
</script>
