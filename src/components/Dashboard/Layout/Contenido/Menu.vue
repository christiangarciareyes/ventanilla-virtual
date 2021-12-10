<template> 
  <div class="settings-panel-menu">
  <span class="settings-panel-menu__close iconfont iconfont-modal-close optMenu"></span>
  <ul style="margin-top: 10px;" class="nav nav-mobile-menu">
    <router-link to="/">
    <li class="nav-item">
      <a href="#" class="nav-link optMenu p-l-50">
        <i style="font-size: 20px" class="nc-icon pe-7s-home"></i>
        <span class="d-lg-block fuente">&nbsp;PORTAL</span>
      </a>
    </li>
    </router-link>
  </ul>
  <ul style="margin-top: 10px;" class="nav nav-mobile-menu">
    <router-link to="/login">
    <li class="nav-item">
      <a href="#" class="nav-link optMenu p-l-50">
        <i style="font-size: 23px" class="nc-icon pe-7s-user"></i>
        <span class="d-lg-block fuente">&nbsp;ACCEDER</span>
      </a>
    </li>
    </router-link>
  </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  created() {
   let jQuery = document.createElement('script')
   jQuery.setAttribute('src', './static/js/jQuery/jquery.min.js')
   document.head.appendChild(jQuery)
   let sPanel = document.createElement('script');    
   sPanel.setAttribute('src',"./static/js/swipeLayout/settings-panel-menu.min.js");
   document.head.appendChild(sPanel);
  }
} 
</script>