import VTooltip from 'v-tooltip'
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

import 'vue-notifyjs/themes/default.scss'
import './assets/sass/style-oficina.scss'
import './assets/css/demo.css'
import 'es6-promise/auto'

export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(VTooltip)
  }
}
