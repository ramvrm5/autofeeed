<template>
  <div id="app">
    <!--class container-->
    <div class="text-center"></div>

    <div
      id="nav"
      class="topmenu"
      style="position: sticky; top: 0; z-index: 999999"
    >
      <b-navbar toggleable="lg" type="dark" variant="info">
        <router-link to="/"
          ><img 
          style="width: 50px; max-height: 41.89px" 
          src="./assets/logoblanco.png"
          onerror="this.onerror=null;this.src='./assets/logoblanco.png';"
        /></router-link>
        <b-navbar-brand class="pagina_actual" href="#">{{
          selectedRouter()
        }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              v-if="this.$route.name != 'Mi Mundo'"
              :to="{ name: 'Mi Mundo' }"
              >{{
                selectedLan == "es"
                  ? $My_world_es
                  : selectedLan == "pt"
                  ? $My_world_pt
                  : $My_world_en
              }}</b-nav-item
            >
            <b-nav-item v-if="existeUsuario && this.$route.name != 'Timeline'"
              ><router-link
                :to="{ name: 'Timeline', params: { email: emailId } }"
                style="text-decoration: none; color: unset"
                >{{
                  selectedLan == "es"
                    ? $Timeline_es
                    : selectedLan == "pt"
                    ? $Timeline_pt
                    : $Timeline_en
                }}</router-link
              ></b-nav-item
            >
            <b-nav-item
              v-if="this.$route.name != 'Nosotros'"
              :to="{ name: 'Nosotros' }"
              >{{
                selectedLan == "es"
                  ? $We_es
                  : selectedLan == "pt"
                  ? $We_pt
                  : $We_en
              }}</b-nav-item
            >
            <b-nav-item :to="{ name: 'Nosotros' }">v 1.02b</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="mostrarAlarmas()" id="alarmaid1">
              <font-awesome-icon id="alarmaid" icon="bell"
            /></b-nav-item>

            <b-nav-item @click="mostrarAlarmas()">
              <span id="alarmatexto">{{
                selectedLan == "es"
                  ? $No_alarms_es
                  : selectedLan == "pt"
                  ? $No_alarms_pt
                  : $No_alarms_en
              }}</span></b-nav-item
            >
            <b-nav-item v-if="existeUsuario">
              <router-link
                to="/createNews"
                style="text-decoration: none; color: unset; color: white"
                >{{
                  selectedLan == "es"
                    ? $Create_news_es
                    : selectedLan == "pt"
                    ? $Create_news_pt
                    : $Create_news_en
                }}</router-link
              ></b-nav-item
            >

            <b-dropdown
              style="text-decoration: none; color: unset; color: white"
              v-if="existeUsuario"
              id="ddCommodity"
              name="filtrarKeyword"
              :text="
                selectedLan == 'es'
                  ? $Interests_es
                  : selectedLan == 'pt'
                  ? $Interests_pt
                  : $Interests_en
              "
              variant="primary"
              class="claseintereses"
            >
              <b-dropdown-item
                value="todos"
                @click="filterOnTagsSellected('todos')"
                >{{
                  selectedLan == "es"
                    ? $See_all_es
                    : selectedLan == "pt"
                    ? $See_all_pt
                    : $See_all_en
                }}
              </b-dropdown-item>
              <b-dropdown-item
                v-for="(item, index) in tags"
                :key="index"
                :value="item"
                :id="'item_' + index"
                @click="filterOnTagsSellected(item, index, tags)"
              >
                {{ item }}
              </b-dropdown-item>
            </b-dropdown>

            <b-nav-item>
              <router-link
                style="color: white"
                to="/registro"
                v-if="!existeUsuario"
                >Crear cuenta</router-link
              ></b-nav-item
            >
            <b-nav-item-dropdown id="loginid" right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em style="color: white"
                  ><img
                    id="imgmenu"
                    :src="imgurl3"
                    onerror="this.onerror=null;this.src='./assets/avatar-01.png';"
                /></em>
              </template>
              <!-- <span id="nombreUsuario"></span> -->
              <b-dropdown-item
                ><router-link
                  style="color: #212529"
                  to="/miperfil"
                  v-if="existeUsuario"
                  >{{ nombre }}</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item>
                <router-link
                  style="color: #212529"
                  to="/login"
                  v-if="!existeUsuario"
                  >Login</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item>
                <router-link
                  style="color: #212529"
                  to="/registro"
                  v-if="!existeUsuario"
                  >Registro</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item
                ><div
                  style="color: #212529"
                  @click="filterOnAllNewsSelected('todos')"
                  v-if="existeUsuario"
                >
                  {{
                    selectedLan == "es"
                      ? $All_the_news_es
                      : selectedLan == "pt"
                      ? $All_the_news_pt
                      : $All_the_news_en
                  }}
                </div></b-dropdown-item
              >
              <b-dropdown-item
                ><div
                  style="color: #212529"
                  @click="filtrarporLikes()"
                  v-if="existeUsuario"
                >
                  {{
                    selectedLan == "es"
                      ? $Bookmarks_es
                      : selectedLan == "pt"
                      ? $Bookmarks_pt
                      : $Bookmarks_en
                  }}
                </div></b-dropdown-item
              >
              <b-dropdown-item
                ><router-link
                  style="color: #212529"
                  to="/intereses"
                  v-if="existeUsuario"
                  >{{
                    selectedLan == "es"
                      ? $Interests_and_Alerts_es
                      : selectedLan == "pt"
                      ? $Interests_and_Alerts_pt
                      : $Interests_and_Alerts_en
                  }}</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item @click="logout" v-if="existeUsuario">{{
                selectedLan == "es"
                  ? $Sign_off_es
                  : selectedLan == "pt"
                  ? $Sign_off_pt
                  : $Sign_off_en
              }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import firebase from "firebase/app";
import $ from "jquery";
library.add(faBell);
export default {
  data() {
    return {
      imgurl3: 'img/avatar-01.6b36b5f2.png',
      emailId: null,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "Youddly.com - Tu propio internet";
        //aqui se puede poner to.meta.title para poner diferentes
        //segun los metas del archivo de router
      },
    },
  },
  created() {},
  methods: {
    ...mapActions([
      "cerrarSesion",
      "filtrarporKeyword",
      "filtrarporLikes",
      "cambiarIdioma",
      "mostrarAlarmas",
    ]),
    logout() {
      this.cerrarSesion();
    },
    filterOnAllNewsSelected(value){
      this.$store.state.tags.forEach(function (object, index, array) {
        $("#item_" + index).css("background-color", "unset");
      });
      this.filtrarporKeyword(value);
    },
    filterOnTagsSellected(value, index, array) {
      this.$store.state.tags.forEach(function (object, index, array) {
        $("#item_" + index).css("background-color", "unset");
      });
      if (value !== "todos") {
        $("#item_" + index).css("background-color", "#007bff99");
        this.filtrarporKeyword(value);
      } else {
        this.filtrarporKeyword(value);
      }
    },
    cambiarimagen(imagen) {
      document.getElementById("imgmenu").src = imagen;
    },
    selectedRouter() {
      let routeNmae = this.$route.name;
      let user = firebase.auth().currentUser;
      if (user) {
        this.emailId = user.email;
      }
      if (routeNmae == "Mi Mundo") {
        return this.selectedLan == "es"
          ? this.$My_world_es
          : this.selectedLan == "pt"
          ? this.$My_world_pt
          : this.$My_world_en;
      } else if (routeNmae == "Mi Perfil") {
        return this.selectedLan == "es"
          ? this.$My_profile_es
          : this.selectedLan == "pt"
          ? this.$My_profile_pt
          : this.$My_profile_en;
      } else if (routeNmae == "Intereses") {
        return this.selectedLan == "es"
          ? this.$Interests_es
          : this.selectedLan == "pt"
          ? this.$Interests_pt
          : this.$Interests_en;
      } else if (routeNmae == "Timeline") {
        return this.selectedLan == "es"
          ? this.$Timeline_es
          : this.selectedLan == "pt"
          ? this.$Timeline_pt
          : this.$Timeline_en;
      } else if (routeNmae == "Comment") {
        return this.selectedLan == "es"
          ? this.$Comment_es
          : this.selectedLan == "pt"
          ? this.$Comment_pt
          : this.$Comment_en;
      } else if (routeNmae == "CreateNews") {
        return "CreateNews";
      } else if (routeNmae == "Nosotros") {
        return this.selectedLan == "es"
          ? this.$We_es
          : this.selectedLan == "pt"
          ? this.$We_pt
          : this.$We_en;
      }
    },
  },
  mounted: function () {
    (this.imgurl3 = 'img/avatar-01.6b36b5f2.png'),
    setTimeout(function () {
      let user = firebase.auth().currentUser;
      if (user) {
        let fecha2 = new Date();

        var imgurl2 =
          "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
          encodeURIComponent(user.email) +
          ".jpg?alt=media&time=" +
          fecha2.getTime();
        document.getElementById("imgmenu").src = imgurl2;
        //this.imgurl3 = imgurl2;
        //this.cambiarimagen(imgurl2) //method1 will execute at pageload
      }
    }, 400);
  },
  computed: {
    ...mapGetters(["existeUsuario"]),
    ...mapState(["usuario", "tags", "nombre", "selectedLan"]),
  },
};

///Constants

Vue.prototype.$My_profile_es = "Mi Perfil";
Vue.prototype.$My_profile_pt = "Meu perfil";
Vue.prototype.$My_profile_en = "My profile";
Vue.prototype.$My_world_es = "Mi Mundo";
Vue.prototype.$My_world_pt = "Meu mundo";
Vue.prototype.$My_world_en = "My world";
Vue.prototype.$Timeline_es = "Cronología";
Vue.prototype.$Timeline_pt = "Linha do tempo";
Vue.prototype.$Timeline_en = "Timeline";
Vue.prototype.$We_es = "Privacidad";
Vue.prototype.$We_pt = "Privacidade";
Vue.prototype.$We_en = "Privacy";
Vue.prototype.$No_alarms_es = "No hay alarmas";
Vue.prototype.$No_alarms_pt = "Sem alarmes";
Vue.prototype.$No_alarms_en = "No hay alarmas";
Vue.prototype.$Create_news_es = "Crear noticias";
Vue.prototype.$Create_news_pt = "Crie notícias";
Vue.prototype.$Create_news_en = "Create news";
Vue.prototype.$See_all_es = "Ver todos";
Vue.prototype.$See_all_pt = "Ver todos";
Vue.prototype.$See_all_en = "See all";
Vue.prototype.$Interests_es = "Interests";
Vue.prototype.$Interests_pt = "Interesses";
Vue.prototype.$Interests_en = "Interests";
Vue.prototype.$Comment_es = "Comentario";
Vue.prototype.$Comment_pt = "Comente";
Vue.prototype.$Comment_en = "Comment";
Vue.prototype.$All_the_news_es = "Todas las noticias";
Vue.prototype.$All_the_news_pt = "Todas as novidades";
Vue.prototype.$All_the_news_en = "All the news";
Vue.prototype.$Bookmarks_es = "Marcadores";
Vue.prototype.$Bookmarks_pt = "Favoritos";
Vue.prototype.$Bookmarks_en = "Bookmarks";
Vue.prototype.$Interests_and_Alerts_es = "Intereses y Alertas";
Vue.prototype.$Interests_and_Alerts_en = "Interesses e alertas";
Vue.prototype.$Interests_and_Alerts_pt = "Interests and Alerts";
Vue.prototype.$Sign_off_es = "Cerrar sesión";
Vue.prototype.$Sign_off_pt = "Fechar Sessão";
Vue.prototype.$Sign_off_en = "Sign off";
</script>
