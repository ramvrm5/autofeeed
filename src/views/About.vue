<template>
  <div>
    <div style="margin-left: 1em; margin-right: 1em" class="about">
      <center>
        <h2 style="margin-top: 10px">
          {{
            selectedLan == "es"
              ? $Faun_es
              : selectedLan == "pt"
              ? $Faun_pt
              : $Faun_en
          }}
        </h2>
      </center>
      <p>{{
          selectedLan == "es"
            ? $Welcome_to_your_own_internet_es
            : selectedLan == "pt"
            ? $Welcome_to_your_own_internet_pt
            : $Welcome_to_your_own_internet_en
        }}</p>
      <p>{{
          selectedLan == "es"
            ? $registerAndwrite_es
            : selectedLan == "pt"
            ? $registerAndwrite_pt
            : $registerAndwrite_en
        }}</p>
    </div>
    <img style="position: relative; width: 100vw" src="../assets/about.jpg" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Vue from 'vue'
export default {
  computed: {
    ...mapState(["selectedLan"]),
  },
};

Vue.prototype.$Faun_es = "Fauno";
Vue.prototype.$Faun_pt = "Fauno";
Vue.prototype.$Faun_en = "Fauno";
Vue.prototype.$Welcome_to_your_own_internet_es = "Bienvenido a tu propio internet!";
Vue.prototype.$Welcome_to_your_own_internet_pt = "Bem-vindo à sua própria internet!";
Vue.prototype.$Welcome_to_your_own_internet_en = "Welcome to your own internet!";
Vue.prototype.$registerAndwrite_es = "Regístrate y escribe cualquier interés que tengas, sin límites y mouse world empezará a buscar por todo internet por ti, en cualquier idioma y cualquier medio y te lo traducirá a tu idioma preferido";
Vue.prototype.$registerAndwrite_pt = "Cadastre-se e escreva qualquer interesse que você tenha, sem limites e o mundo do mouse começará a pesquisar por você em toda a internet, em qualquer idioma e em qualquer meio e irá traduzi-lo para o seu idioma preferido";
Vue.prototype.$registerAndwrite_en = "Register and write any interest you have, without limits and mouse world will start searching all over the internet for you, in any language and any medium and will translate it into your preferred language";
</script>
