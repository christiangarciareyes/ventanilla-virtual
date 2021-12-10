export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_KEY_CAPTCHA (state, keyCaptcha) {
    state.keyCaptcha = keyCaptcha
  },
  SET_KEY_INVISIBLE (state, keyInvisible) {
    state.keyInvisible = keyInvisible
  },
  SET_API_IP (state, apiIp) {
    state.apiIp = apiIp
  },
  SET_API_FIRMA (state, apiFirma) {
    state.apiFirma = apiFirma
  },
  SET_SERVER_CAS2 (state, serverCas2) {
    state.serverCas2 = serverCas2
  },
  SET_SERVER_CAS (state, serverCas) {
    state.serverCas = serverCas
  },
  SET_SERVER_OFI (state, serverOfi) {
    state.serverOfi = serverOfi
  },
  exitLogout(state, value){
    state.logout = value;
  },
  modalTutorial(state, value){
    state.tutorial = value;
  },
  newAlerts(state, value){
    state.alerts = value;
  },
  newUserName(state, value){
    state.userName = value;
  },
  newValue(state, value){
    state.idExpParam = value;
  },
  newValue2(state, value){
    state.idExpParam2 = value;
  },
  newValue3(state, value){
    state.idExpParam3 = value;
  },
  newValue4(state, value){
    state.idExpParam4 = value;
  },
  newValue5(state, value){
    state.idExpParam5 = value;
  },
  newValueExp(state, value){
    state.numExpParam = value;
  },
  newValueExp2(state, value){
    state.numExpParam2 = value;
  },
  newValueExp3(state, value){
    state.numExpParam3 = value;
  },
  newValueExp4(state, value){
    state.numExpParam4 = value;
  },
  newServicio(state, value){
    state.numServicio = value;
  },
  setListDatExpediente(state, value){
    state.listDatExpediente = value;
  },
  setIdSolicitud(state, value){
    state.idSolicitud = value;
  },
  setDniSolicitud(state, value){
    state.dniSolicitante = value;
  },
  setNombreSolicitud(state, value){
    state.nombreSolicitante = value;
  },
  setPagTableFormPre(state, value){
    state.pagTableFormPre = value;
  },
  setPagTableFormNot(state, value){
    state.pagTableFormNot = value;
  },
  setPagTableFormAut(state, value){
    state.pagTableFormAut = value;
  },
  setPagTableFormAnu(state, value){
    state.pagTableFormAnu = value;
  },
  setPagTableFormRev(state, value){
    state.pagTableFormRev = value;
  },
  setPagTableFormExp(state, value){
    state.pagTableFormExp = value;
  },
  setNidSolicitud(state, value){
    state.nidSolicitud = value;
  },
  setNomSolicitud(state, value){
    state.nomSolicitud = value;
  },
  setNumSolicitud(state, value){
    state.numSolicitud = value;
  },
  setNewEscrito(state, value){
    state.newEscrito = value;
  },
  setSumiEscrito(state, value){
    state.sumiEscrito = value
  },
  setConteEscrito(state, value){
    state.conteEscrito = value
  },
  setExpEscrito(state, value){
    state.expEscrito = value
  },
  setNidEscrito(state, value){
    state.nidEscrito = value
  },
  setPartEscrito(state, value){
    state.partEscrito = value
  },
  setSegEscrito(state, value){
    state.segEscrito = value
  },
  setAdjEscrito(state, value){
    state.adjEscrito = value
  },
  setContadorFile(state, value){
    state.contadorFile = value
  },
  newTipoParte(state, value){
    state.tipoParte = value;
  },
  setitemNoty(state, value){
    state.itemNoty = value;
  },
  setreturnEscrito(state, value){
    state.returnEscrito = value;
  }
}
