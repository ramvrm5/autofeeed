<template>
  <div class="home">
    <!-- <router-link to="/agregar">
       <button class="btn btn-success btn-block">Actualizar</button>
    </router-link>-->

    <!--columns or deck-->
    <div>
      <div class="row mt-4">
        <div class="col-4 col-sm-4 col-md-8 col-lg-8"></div>
        <div class="col-8 col-sm-8 col-md-4 col-lg-4">
          <b-form-select
            id="input-3"
            v-model="rangeDate"
            :options="rangeDateOptions"
            required
            @change="rangeTimeSelectChnage"
          ></b-form-select>
        </div>
      </div>
      <b-card-group
        columns
        style="padding-left: 1em; padding-right: 1em; padding-top: 1em"
      >
        <b-card
          v-for="(item, index) in noticias"
          :key="index"
          :id="index"
          :title="item.titulo"
          :img-src="item.img"
          img-alt="Image"
          img-top
          tag="article"
        >
          <b-button
            :id="'translate_' + index"
            style="
              position: absolute;
              z-index: 999;
              top: 2px;
              right: 1px;
              background-color: rgba(255, 255, 255, 0);
              border: none;
              box-shadow: none;
              background-color: #ffffff00;
            "
            @click="toggleTranslate(item, index)"
            aria-disabled="true"
            variant="primary"
            :disabled="checkTranslateButton(item)"
            ><!-- :class="translate_lan" -->
            <i
              style="color: #007bff; font-size: 35px"
              class="fa fa-language"
              aria-hidden="true"
            ></i>
          </b-button>
          <b-card-text>{{ item.cuerpo }}</b-card-text>

          <b-button
            style="float: right"
            target="_blank"
            :href="item.url"
            variant="primary"
            >Ver más</b-button
          >

          <b-button
            :class="[
              classA,
              !(
                typeof item.correos_like3 != 'undefined' &&
                item.correos_like3.includes(usuario.email)
              )
                ? classB
                : 'likepulsado',
            ]"
            :id="item.id"
            @click="darlike(item.id)"
            variant="primary"
          >
            <span v-if="!item.likes">0</span>
            <span v-if="item.likes">{{ item.likes }}</span>

            <svg
              style="bottom: 2px; position: relative"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-hand-thumbs-up"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
              />
            </svg>
          </b-button>
          <router-link
            :to="{ name: 'Comment', params: { id: item.id } }"
            style="text-decoration: none; color: unset;color: white;"
          >
            <!-- @click="setProfileImage()" --><b-button
              :id="'comment-' + index"
              style="float: right; margin-right: 3%"
              target="_blank"
              variant="primary"
            >
              <span>{{ item.comentarios ? item.comentarios.length : 0 }} </span>
              <svg
                style="bottom: 2px; position: relative"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-chat-left-text"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </b-button>
          </router-link>
          <template v-slot:footer>
            <div v-if="item.fecha">
              <small class="text-muted"
                >Fecha: {{ item.fechaClasica.split("T")[0] }}</small
              >
            </div>
            <div v-if="item.tags">
              <small class="text-muted"
                >Intereses:
                {{
                  item.tags.join(", ").replace("que,", "").replace(" ,", "")
                }}</small
              >
            </div>
            <div v-if="!item.tags">
              <small class="text-muted">Intereses: indefinidos</small>
            </div>
            <div v-if="item.fuente">
              <small class="text-muted">Fuente: {{ item.fuente }}</small>
            </div>
          </template>
        </b-card>
      </b-card-group>
    </div>

    <b-button id="botonmodal" style="display: none" v-b-modal.modal-1
      >Launch demo modal</b-button
    >
    <b-modal id="modal-1" title="Tomo nota!" hide-footer>
      <p class="my-4">
        Actualmente no hay noticias registradas relacionadas con tu interés en:
      </p>
      <p id="keywordsid" class="my-4">
        <b>{{ keywordactual }}</b>
      </p>
      <p class="my-4">
        Pero ya hemos empezado a buscarlas para ti, mañana las tendrás
        disponibles en tu feed!
      </p>
      <b-button
        class="mt-3"
        block
        style="color: #fff; background-color: #28a745; border-color: #28a745"
        @click="$bvModal.hide('modal-1')"
        >Genial</b-button
      >
    </b-modal>

    <div class="text-center">
      <center>
        <b-spinner
          id="cargandoid"
          style="display: none; width: 3rem; height: 3rem"
          variant="primary"
          label="Text Centered"
        ></b-spinner>
      </center>
    </div>

    <center>
      <h4
        v-if="noticias.length == noticiasLength"
        style="margin-left: auto; margin-right: auto; width: 80%"
        id="noticiasid"
      >
        Preparando tus noticias personalizadas
      </h4>
    </center>
    <div
      class="row mt-2 pt-1 pb-1"
      style="
        border-top: 1px solid #d6d6d6;
        box-shadow: 2px -4px 19px #ded9d9;
        background: white;
        z-index: 9999999;
        bottom: 0;
        position: sticky;
      "
    >
      <div class="col-4"></div>
      <div class="col-2" @click="previous">
        <b-button
          :disabled="previousCount == 0"
          style="width: 100% !important"
          size="sm"
          variant="primary"
          >Previous Page</b-button
        >
      </div>
      <div class="col-2" @click="next">
        <b-button
          :disabled="previousCount == noticiasLength"
          style="width: 100% !important"
          size="sm"
          variant="primary"
          >Next Page</b-button
        >
        <!-- <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select> -->
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import SPANISH_LANGUAGE from "../contants/language.js";
import "firebase/storage";
import Swal from "sweetalert2";
import $ from "jquery";

const projectId = "AIzaSyBXtt9PQb2FR3yGFn4pDwLIS3LJ0cZ5qHs";
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({ projectId });
export default {
  data() {
    return {
      page: 1,
      imageProfile: "../assets/avatar-01.png",
      avtarPic: "img/avatar-01.6b36b5f2.png",
      name: "Inicio",
      classA: null,
      previousCount: 0,
      rangeDate: "today",
      rangeDateOptions: [
        { text: "Today", value: "today" },
        { text: "2 days ago", value: "2 days ago" },
        { text: "Last week", value: "last week" },
      ],
      classB: null,
      translate_lan: "es",
      imageURL: null,
      username: "",
      currentPage: 0,
    };
  },
  created() {
    //this.getTareas()
    //this.getAlertas()
    this.getNoticias({ rangedateChoosen:this.rangeDate,yesterdayDate: "", type: "next", limit: 10 });
  },
  mounted: function () {
    (this.classA = "likepulsado"), (this.classB = "likepulsado");
  },
  methods: {
    ...mapActions([
      "getNoticias",
      "filtrarporKeyword",
      "translateText",
      "saveCreatedNews",
    ]),
    rangeTimeSelectChnage() {
      this.previousCount = 0
      this.getNoticias({ rangedateChoosen:this.rangeDate,yesterdayDate: "", type: "next", limit: 10 });
    },
    previous() {
      this.previousCount -= 1;
      var arrayItem;
      arrayItem = this.noticias[this.noticias.length - this.noticias.length];
      this.getNoticias({
        rangedateChoosen:this.rangeDate,
        yesterdayDate: arrayItem.fecha,
        type: "previous",
        limit: 10,
      });
    },
    next() {
      this.previousCount += 1;
      var arrayItem;
      arrayItem = this.noticias[this.noticias.length - 1];
      this.getNoticias({
        rangedateChoosen:this.rangeDate,
        yesterdayDate: arrayItem.fecha,
        type: "next",
        limit: 10,
      });
    },
    darlike(id) {
      let contador_veces = 0;

      let user = firebase.auth().currentUser;

/*       let url = encodeURIComponent(href);
      url = url.replace("%3A", ":"); */
      const increment = firebase.firestore.FieldValue.increment(1);
      const decrement = firebase.firestore.FieldValue.increment(-1);
      db.collection("noticias")
        .where("id", "==", id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let data2 = doc.data();
            let correos_like = data2.correos_like3;
            let correos_like_vacio = [];
            let correos_like2 = [];
            if (typeof correos_like != "undefined" && correos_like.length > 0) {
              if (correos_like.includes(user.email)) {
                if (contador_veces == 0) {
                  //cuidado porque pasa varias veces
                  let likes_elemento = document
                    .getElementById(id)
                    .getElementsByTagName("span")[0].innerText;
                  //alert(likes_elemento)
                  document
                    .getElementById(id)
                    .classList.remove("likepulsado");
                  document.getElementById(id).style.color = "#ffffff";
                  document.getElementById(id).style.backgroundColor =
                    "#007bff";
                  let likesmasuno = parseInt(likes_elemento) - 1;
                  document
                    .getElementById(id)
                    .getElementsByTagName("span")[0].innerText = likesmasuno;

                  if (typeof correos_like != "undefined") {
                    correos_like.splice(correos_like.indexOf(user.email), 1);
                    correos_like2 = correos_like;
                  }

                  db.collection("noticias")
                    .doc(doc.id)
                    .update({
                      likes: decrement,
                      correos_like3: correos_like2,
                    })
                    .then(() => {
                      console.log("like");
                    });
                }
                contador_veces = 1;
              }
            } else {
              let likes_elemento = document
                .getElementById(id)
                .getElementsByTagName("span")[0].innerText;
              //alert(likes_elemento)
              document.getElementById(id).style.color = "#007bff";
              document.getElementById(id).style.backgroundColor =
                "#ffffff";
              let likesmasuno = parseInt(likes_elemento) + 1;
              document
                .getElementById(id)
                .getElementsByTagName("span")[0].innerText = likesmasuno;

              if (typeof correos_like != "undefined") {
                correos_like.push(user.email);
                correos_like2 = correos_like;
              } else {
                correos_like_vacio.push(user.email);
                correos_like2 = correos_like_vacio;
              }

              db.collection("noticias")
                .doc(doc.id)
                .update({
                  likes: increment,
                  correos_like3: correos_like2,
                })
                .then(() => {
                  console.log("like");
                });
            }
          });
        });
    },
    checkTranslateButton(item) {
      if (item.idioma == "en") {
        return true;
      } else if (item.idioma !== "en") {
        return false;
      }
    },
    async toggleTranslate(item, index) {
      let target = "";
      let languageTemp = this.selectedLan;
      if ($("#translate_" + index).hasClass(languageTemp)) {
        $("#translate_" + index).removeClass(languageTemp);
        target = item.idioma;
      } else if ($("#translate_" + index).not(languageTemp)) {
        $("#translate_" + index).addClass(languageTemp);
        target = languageTemp;
      }
      let tlt = item.titulo;
      let dsr = item.cuerpo;
      let translatedTitleText = [];
      let translationArray = [tlt, dsr];
      for (let object of translationArray) {
        let settings = {
          async: true,
          crossDomain: true,
          url:
            "https://translation.googleapis.com/language/translate/v2?key=AIzaSyBXtt9PQb2FR3yGFn4pDwLIS3LJ0cZ5qHs&q=" +
            object +
            "&target=" +
            target,
          method: "POST",
        };
        await $.ajax(settings).done(function (response) {
          translatedTitleText.push(
            response.data.translations[0].translatedText
          );
        });
      }
      item.titulo = translatedTitleText[0];
      item.cuerpo = translatedTitleText[1];
    },
  },
  computed: {
    ...mapState([
      "tareas",
      "noticias",
      "noticiasTemp",
      "noticiasLength",
      "selectedLan",
    ]),
    ...mapState(["usuario", "keywordactual"]),
  },
};
</script>