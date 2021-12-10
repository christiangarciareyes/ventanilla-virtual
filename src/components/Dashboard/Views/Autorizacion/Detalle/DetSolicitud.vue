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
                <p class="card-category fuente">En esta bandeja aprobaras las autorizaciones de los expedientes asignados a los usuarios.</p><br>
            </div>
            <div class="col-md-4">
             <button @click="retornar()" class="regresar-form-btn pull-right mb-3" type="submit"><i class="fa fa-reply fa-2x"></i></button>
            </div>
            </div> 
            </template>
    <div class="row m-t-10">
    <div class="col-md-12">
    <label>Listado de Expedientes que conforman la Solicitud de: <a style="color: blue">{{solicitante}}</a></label>
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
      {{data.item.cnumExpediente}}<br>
      <div style="margin-top: 5px">
        <label>Fecha de Vista de Causa:</label><br>
        <div class="subcontent">
          {{data.item.dfecVista}}
        </div>
        <label class="m-t-5">Fecha de Audiencia Pública:</label><br>
        <div class="subcontent">
          {{data.item.dfecAudiencia}}
        </div>
      </div>
    </template>
    <template slot="ctxtParte" slot-scope="data">
      {{data.item.ctxtParte}}
    </template>
    <template slot="ctxtRepresenta" slot-scope="data">
      <div style="max-width: 300px">
      {{data.item.ctxtRepresenta}}
      </div>
    </template>
    <template slot="datExpediente" slot-scope="data">
      <div style="max-width: 300px">
      <label>Demandante:</label><br>
      <div class="subcontent">
        {{data.item.ctxtDemandante}}
      </div>
      <label class="m-t-5">Abogado Demandante:</label><br>
      <div class="subcontent">
        {{data.item.cnomAboDemandante}}
      </div>
      <label class="m-t-5">Demandado:</label><br>
      <div class="subcontent">
        {{data.item.ctxtDemandado}}
      </div>
      <label class="m-t-5">Abogado Demandado:</label><br>
      <div class="subcontent">
        {{data.item.cnomAboDemandado}}
      </div>
      </div>
    </template>
   <template slot="ver" slot-scope="data"> 
      <router-link :to="{ path: '/cuadernillo'}">
        <button @click="setIdExp(data.item.nidExpediente, data.item.cnumExpediente)" type="button" class="btn-info-circle btn btn-xs" v-tooltip.top-center="tooltip.ver" ><i class="fa fa-folder-open-o p-r-3"></i></button>
      </router-link>
    </template>
   <template slot="acciones" slot-scope="data"> 
      <!-- <b-form-select style="border-radius: 0px" v-model="data.item.nidMotivoAutorizacion" class="m-t-10" :disabled="data.item.nidMotivoAutorizacion == 7">
        <option :value="null" disabled>-- Seleccione --</option>
        <option v-for="mot in data.item.listaMotivo" v-bind:key="mot.nidMotivoAutorizacion" v-bind:value="mot.nidMotivoAutorizacion">
          {{ mot.ctxtValor }}
        </option> 
      </b-form-select> -->
      <label class="m-t-5">Seleccione la acción:</label>
      <b-form-select style="border-radius: 0px" v-model="data.item.nidMotivoAutorizacion" class="m-t-10">
        <option v-for="mot in data.item.listaMotivo" v-bind:key="mot.nidMotivoAutorizacion" v-bind:value="mot.nidMotivoAutorizacion">
          {{ mot.ctxtValor }}
        </option> 
      </b-form-select>
   </template>
    </b-table>
    <br><button @click="guardarAuto()" style="min-width: 250px" class="guardar-form-btn mb-3 fuente pull-right" type="submit"><i class="fa fa-floppy-o mr-1"></i> GUARDAR CAMBIOS</button>
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
      texto: 'Detalle de solicitudes', 
      tooltip: {
       ver: 'Ver Cuadernillo'
      },
      fields: [
        { key: 'item', label: 'ITEM', sortable: true },
        { key: 'cnumExpediente', label: 'NÚMERO', sortable: true },
        { key: 'ctxtParte', label: 'PARTE', sortable: true },
        { key: 'ctxtRepresenta', label: 'REPRESENTA A', sortable: true },
        { key: 'datExpediente', label: 'DATOS DEL EXPEDIENTE', sortable: true },
        { key: 'ver', label: 'VER' },
        { key: 'acciones', label: 'ACCIONES' }
      ],
      lists: [],
      currentPage: 1,
      perPage: 100,
      totalRows: length,
      pageOptions: [ 10, 25, 50 ],
      sortBy: null,
      sortDesc: false,
      filter: null,
      modalInfo: { title: '', content: '' },
      idPersona: 0,
      selected: null,
      idSoli: null,
      servicio: 4,
      solicitante: '',
      result: []
    }
  },
  mounted: function () {
    this.$store.state.idExpParam = null;
    this.idSoli = this.$store.state.idSolicitud; 
    this.solicitante = this.$store.state.nombreSolicitante; 
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
    guardarAuto(){
      var listFil = [];
      for (var i = 0; i < this.lists.length; i++) { 
         listFil.push(this.lists[i].nidMotivoAutorizacion); 
      } 
      if(listFil.includes('')){
        this.infoNotification();
      }else{
      swal({
        title: "¿Desea guardar los cambios?",
        text: "Se autorizarán los expedientes seleccionados",
        icon: "warning",
        buttons: ["No", "Si"],
        closeOnClickOutside: false
      }).then(value => {
        if (value == true) {
          swal({
            title: "Atendiendo solicitudes",
            text: "Espere por favor...",
            buttons: false,
            dangerMode: true,
            icon: "static/img/loader.gif",
            closeOnClickOutside:false,
          })
          axios.defaults.headers.common['Authorization'] = this.$session.get('token')
          axios.post(this.$store.state.serverOfi + "/autorizacion/insert", 
            {
              nidSolicitud: this.$store.state.idSolicitud,
              cnumDni: this.$store.state.dniSolicitante,
              listaDetalle: this.lists,
              cnumIp: this.$session.get('ip'),
              cnomCiudad: this.$session.get('city'),
              cnomPais: this.$session.get('country')
            })
            .then((response) => {
              this.result = response.data;
              if (this.result.codRpta == 1) {
                swal.close();
                swal({
                    title: "Solicitudes atendidas",
                    text: "Las solicitudes ya no aparecerán en su bandeja",
                    icon: "warning",
                    buttons: [false, "Aceptar"],
                    closeOnClickOutside: false
                }).then(value => {
                    if (value == true) {
                      this.$router.push('/autorizacion')
                    }else {this.$router.push('/autorizacion')}
                });
              }else if (this.result.codRpta == 0) {
                this.errorNotification();
              }else{
                swal.close();
                this.$router.push('/autorizacion');
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
        } else {}
      });
     }
    },
    detalleSolicitud: function(){
      if(this.$store.state.idSolicitud == null){   
        this.$router.push('/autorizacion')
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
        axios.post(this.$store.state.serverOfi + '/solicitud/detalle',
        {
          nidSolicitud: this.idSoli,
          cnumDni: this.$store.state.dniSolicitante,
          nidTipoSolicitud: 1,
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
      swal.close(); 
      this.$notify({
          group: 'auth',
          title: 'VENTANILLA JURISDICCIONAL',
          text: 'Error, consulte con el administrador!',
          type: 'info',
      });
    },
    setIdExp (vidExp, vidNum) {  
      this.$store.commit('newValue4', vidExp);
      this.$store.commit('newValueExp3', vidNum);
      this.$store.commit('newServicio', this.servicio);
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