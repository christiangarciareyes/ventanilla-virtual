<template>
  <footer class="footer fuente">
    <div class="container-fluid fuente">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link class="fuente" style="font-size: 13px; text-decoration:none" :to="{path:'/inicio'}"><i class="fa fa-home" aria-hidden="true"></i> INICIO</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center fuente">
        &copy; 2018
        <i class="fa fa-bank"></i>
        <a class="nounderline fuente" href="https://www.tc.gob.pe" target="_blank" style="color: #5499C7">
        TRIBUNAL CONSTITUCIONAL</a>.
        DESARROLLADO POR LA OFICINA DE TECNOLOGÍAS DE LA INFORMACIÓN.
      </div>
    </div>
  </footer>
</template>

