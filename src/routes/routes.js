import Portada from '../components/ExternalViews/Pages/Portada'
import Login from '../components/ExternalViews/Session/Login'
import Logout from '../components/ExternalViews/Session/Logout'
import Password from '../components/ExternalViews/Password/Password'
import Registrar from '../components/ExternalViews/Formularios/Registrar'
import Consultar from '../components/ExternalViews/Formularios/Consultar'
import Tutelas from '../components/ExternalViews/Formularios/Tutelas'
import Finalizado from '../components/ExternalViews/Pages/Finalizado'
import Reset from '../components/ExternalViews/Password/Reset'
import DashboardLayout from '../components/Dashboard/Layout/Admin'
import NotFound from '../components/GeneralViews/NotFoundPage'
import Inicio from '../components/Dashboard/Views/Pages/Inicio'
import Politica from '../components/Dashboard/Views/Pages/Politica'
import Help from '../components/Dashboard/Views/Pages/Help'
import Expedientes from '../components/Dashboard/Views/Expedientes/Bandeja/Expedientes'
import DetExpediente from '../components/Dashboard/Views/Expedientes/Detalle/DetExpediente'
import ResExpediente from '../components/Dashboard/Views/Expedientes/Detalle/ResExpediente'
import Cuadernillo from '../components/Dashboard/Views/Cuadernillos/Cuadernillo'
import Presentados from '../components/Dashboard/Views/Presentados/Bandeja/Presentados'
import DetPresentado from '../components/Dashboard/Views/Presentados/Detalle/DetPresentado'
import ResPresentado from '../components/Dashboard/Views/Presentados/Detalle/ResPresentado'
import Casilla from '../components/Dashboard/Views/Casilla/Bandeja/Casilla'
import DetCasilla from '../components/Dashboard/Views/Casilla/Detalle/DetCasilla'
import ModPassword from '../components/Dashboard/Views/Password/Formulario/ModPassword'
import Mensajes from '../components/Dashboard/Views/Mensajes/Timeline/Mensajes'
import Notificador from '../components/Dashboard/Views/Notificador/Bandeja/Notificador'
import Mensajeria from '../components/Dashboard/Views/Mensajes/Administrador/Mensajeria'
import RegSolicitud from '../components/Dashboard/Views/Solicitudes/Formulario/RegSolicitud'
import CompletSolicitud from '../components/Dashboard/Views/Solicitudes/CompletSolicitud'
import Escritos from '../components/Dashboard/Views/Escritos/Inicio/Escritos'
import ListEscritos from '../components/Dashboard/Views/Escritos/Administrador/ListEscritos'
import ResumenEscrito from '../components/Dashboard/Views/Escritos/Administrador/ResumenEscrito'
import CompletEscrito from '../components/Dashboard/Views/Escritos/CompletEscrito'
import CreateEscrito from '../components/Dashboard/Views/Escritos/Formulario/CreateEscrito'
import DocEscrito from '../components/Dashboard/Views/Escritos/Documento/DocEscrito'
import Configuracion from '../components/Dashboard/Views/Configuracion/Formulario/Configuracion'
import Autorizacion from '../components/Dashboard/Views/Autorizacion/Bandeja/Autorizacion'
import Atendidas from '../components/Dashboard/Views/Atendidas/Bandeja/Atendidas'
import Solicitudes from '../components/Dashboard/Views/Autorizadas/Bandeja/Solicitudes'
import Anulacion from '../components/Dashboard/Views/Anulacion/Bandeja/Anulacion'
import Revocacion from '../components/Dashboard/Views/Revocacion/Bandeja/Revocacion'
import Accesos from '../components/Dashboard/Views/Accesos/Bandeja/Accesos'
import Consultas from '../components/Dashboard/Views/Mantenimiento/Bandeja/Consultas'
import Documentario from '../components/Dashboard/Views/Documentario/Bandeja/Documentario'
import Sugerencias from '../components/Dashboard/Views/Sugerencias/Bandeja/Sugerencias'
import DetSolicitud from '../components/Dashboard/Views/Autorizacion/Detalle/DetSolicitud'
import ListExpedientes from '../components/Dashboard/Views/Magistrados/ListExpedientes'
import Contactos from '../components/Dashboard/Views/Contactos/Listado'

const routes = [
  {
    path: '/',
    name: 'Portada',
    component: Portada
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/inicio',
    children: [
      {
        path: 'inicio',
        name: 'Inicio',
        component: Inicio
      },
      {
        path: 'expedientes',
        name: 'Expedientes',
        component: Expedientes
      },
      {
        path: 'expedientes/detExpediente',
        name: 'DetExpediente',
        component: DetExpediente
      },
      {
        path: 'expedientes/resExpediente',
        name: 'ResExpediente',
        component: ResExpediente
      },
      {
        path: 'cuadernillo',
        name: 'Cuadernillo',
        component: Cuadernillo
      },
      {
        path: 'presentados',
        name: 'Presentados',
        component: Presentados
      },
      {
        path: 'presentados/detPresentado',
        name: 'DetPresentado',
        component: DetPresentado
      },
      {
        path: 'presentados/resPresentado',
        name: 'ResPresentado',
        component: ResPresentado
      },
      {
        path: 'notificador',
        name: 'Notificador',
        component: Notificador
      },
      {
        path: 'casilla',
        name: 'Casilla',
        component: Casilla
      },
      {
        path: 'casilla/detCasilla',
        name: 'DetCasilla',
        component: DetCasilla
      },
      {
        path: 'escritos',
        name: 'Escritos',
        component: Escritos
      },
      {
        path: 'listEscritos',
        name: 'ListEscritos',
        component: ListEscritos
      },
      {
        path: 'listEscritos/resumenEscrito',
        name: 'ResumenEscrito',
        component: ResumenEscrito
      },
      {
        path: 'escritos/createEscrito',
        name: 'CreateEscrito',
        component: CreateEscrito
      },
      {
        path: 'escritos/createEscrito/docEscrito',
        name: 'DocEscrito',
        component: DocEscrito
      },
      {
        path: 'configuracion',
        name: 'Configuración',
        component: Configuracion,
      },
      {
        path: 'politica',
        name: 'Politica',
        component: Politica
      },
      {
        path: 'help',
        name: 'Help',
        component: Help
      },
      {
        path: 'autorizacion',
        name: 'Autorizacion',
        component: Autorizacion
      },
      {
        path: 'atendidas',
        name: 'Atendidas',
        component: Atendidas
      },
      {
        path: 'solicitudes',
        name: 'Solicitudes',
        component: Solicitudes
      },
      {
        path: 'anulacion',
        name: 'Anulacion',
        component: Anulacion
      },
      {
        path: 'revocacion',
        name: 'Revocacion',
        component: Revocacion
      },
      {
        path: 'autorizacion/detSolicitud',
        name: 'DetSolicitud',
        component: DetSolicitud
      },
      {
        path: 'regSolicitud',
        name: 'RegSolicitud',
        component: RegSolicitud
      },
      {
        path: 'mensajeria',
        name: 'Mensajeria',
        component: Mensajeria
      },
      {
        path: 'mensajes',
        name: 'Mensajes',
        component: Mensajes
      },
      {
        path: 'modPassword',
        name: 'ModPassword',
        component: ModPassword
      },
      {
        path: 'accesos',
        name: 'Accesos',
        component: Accesos
      },
      {
        path: 'consultas',
        name: 'Consultas',
        component: Consultas
      },
      {
        path: 'documentario',
        name: 'Documentario',
        component: Documentario
      },
      {
        path: 'sugerencias',
        name: 'Sugerencias',
        component: Sugerencias
      },
      {
        path: 'completEscrito',
        name: 'CompletEscrito',
        component: CompletEscrito
      },
      {
        path: 'completSolicitud',
        name: 'CompletSolicitud',
        component: CompletSolicitud
      },
      {
        path: 'listExpedientes',
        name: 'ListExpedientes',
        component: ListExpedientes
      },
      {
        path: 'contactos',
        name: 'Contactos',
        component: Contactos
      }
    ]
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/password',
    name: 'Password',
    component: Password
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar
  },
  {
    path: '/consultar',
    name: 'Consultar',
    component: Consultar
  },
  {
    path: '/tutelas',
    name: 'Tutelas',
    component: Tutelas
  },
  {
    path: '/finalizado',
    name: 'Finalizado',
    component: Finalizado
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset
  },
  { path: '*', component: NotFound }
]

export default routes
