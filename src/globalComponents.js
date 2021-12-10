import fgInput from './components/UIComponents/Inputs/FormGroupInput.vue'
import DropDown from './components/UIComponents/Dropdown/Dropdown'

const GlobalComponents = {
  install (Vue) {
    Vue.component('fg-input', fgInput)
    Vue.component('drop-down', DropDown)
  }
}

export default GlobalComponents
