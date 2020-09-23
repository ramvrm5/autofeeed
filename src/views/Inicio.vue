<template>
  <div class="home">
    <!-- <router-link to="/agregar">
       <button class="btn btn-success btn-block">Actualizar</button>
    </router-link>-->

    <!--columns or deck-->
    <div>
      <b-card-group columns style="padding-left:1em; padding-right:1em;padding-top:1em">
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
            :id="'translate_'+index"
            style="position: absolute;z-index: 999;top: 2px;right: 1px;background-color: rgba(255, 255, 255, 0);border: none;box-shadow: none;background-color:white;"
            @click="toggleTranslate(item,index)"
            variant="primary"
            :class="translate_lan"
          >
            <i
              style="color: #007bff;font-size: 35px;"
              class="fa fa-language"
              aria-hidden="true"
            ></i>
          </b-button>
          <b-card-text>{{item.cuerpo}}</b-card-text>

          <b-button style="float:right" target="_blank" :href="item.url" variant="primary">Ver más</b-button>

          <b-button
            :class="[classA, !(typeof item.correos_like3 !='undefined' && (item.correos_like3).includes(usuario.email)) ? classB : 'likepulsado']"
            :id="item.fecha"
            @click="darlike(item.url, item.fecha)"
            variant="primary"
          >
            <span v-if="!item.likes">0</span>
            <span v-if="item.likes">{{item.likes}}</span>

            <svg
              style="bottom:2px;position:relative"
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

          <!-- Comments Modal Start  -->
          <b-modal
            :id="'modal-comment-'+index"
            ref="modal"
            title="Comments"
            modal-class="comments-modal"
            body-class="body-class-modal"
            @hidden="resetModalll"
          >
            <b-container fluid style="padding: 0px;">
              <b-row class="mb-1">
                <b-col
                  cols="8"
                  class="comments-scrollBar"
                  style="max-height: 440px;overflow-y:scroll;padding: 0px;"
                >
                  <b-card
                    :key="index"
                    :id="index"
                    :title="item.titulo"
                    :img-src="item.img"
                    img-alt="Image"
                    img-top
                    tag="article"
                  >
                    <b-card-text>{{item.cuerpo}}</b-card-text>
                    <template v-slot:footer>
                      <div v-if="item.fecha">
                        <small class="text-muted">Fecha: {{(item.fechaClasica).split("T")[0]}}</small>
                      </div>
                      <div v-if="item.tags">
                        <small
                          class="text-muted"
                        >Intereses: {{item.tags.join(", ").replace('que,','').replace(' ,','')}}</small>
                      </div>
                      <div v-if="!item.tags">
                        <small class="text-muted">Intereses: indefinidos</small>
                      </div>
                      <div v-if="item.fuente">
                        <small class="text-muted">Fuente: {{(item.fuente).split("T")[0]}}</small>
                      </div>
                    </template>
                  </b-card>
                  <!-- <b-form-select v-model="headerBgVariant" :options="variants"></b-form-select> -->
                </b-col>
                <b-col cols="4" style="padding: 0px;">
                  <b-row class="ml-0 mr-1" style="border-bottom: 2px solid rgb(223 223 223)">
                    <b-col cols="4 pr-0">
                      <img
                        id="profilepic"
                        class="rounded-circle"
                        :src="imageProfile"
                        onerror="this.onerror=null;this.src='../assets/avatar-01.png';"
                        style="width: 58%;margin-bottom: 8px;margin-top: 8px;border: 2px solid #c5c1c140;"
                      />
                    </b-col>
                    <b-col cols="8 pl-0 mt-3">
                      <b>{{username}}</b>
                    </b-col>
                  </b-row>
                  <b-row
                    v-if="item.comentarios && item.comentarios.length > 0"
                    style="max-height: 298px;overflow-y: scroll;"
                    class="comments-scrollBar ml-0 mr-1"
                    id="commentSection"
                  >
                    <b-row
                      v-for="(comments, i) in item.comentarios"
                      :key="i"
                      :id="i"
                      class="mt-2 mr-0 ml-0"
                      style="border-bottom: 1px solid #dfdfdf;"
                    >
                      <b-col cols="3">
                        <img
                          id="avtarPic"
                          class="rounded-circle"
                          :src="comments.image?comments.image:avtarPic"
                          onerror="this.onerror=null;this.src='../assets/avatar-01.png';"
                          style="width: 90%;margin-bottom: 8px;margin-top: 8px;border: 2px solid #c5c1c140;"
                        />
                      </b-col>
                      <b-col cols="9 pl-0">
                        <b-row>
                          <b-col
                            cols="4 pl-3"
                            style="padding-left: 27px;text-transform:capitalize;font-weight: 700;"
                          >{{comments.name}}</b-col>
                          <b-col
                            cols="8 pl-0 pr-0"
                            style="font-size: 13px;color: #969191;"
                          >{{comments.time}} {{comments.date}}</b-col>
                          <b-col cols="12" style="font-weight: 500;">{{comments.comment}}</b-col>
                        </b-row>
                      </b-col>
                    </b-row>
                  </b-row>
                  <b-row
                    v-if="!item.comentarios || item.comentarios.length == 0"
                    style="max-height: 298px;overflow-y: scroll;color: #afaeae;"
                    class="comments-scrollBar ml-0 mr-1 mt-5 text-center"
                    id="commentSection"
                  >
                    <b-col cols="12">No comments yet</b-col>
                  </b-row>
                  <b-row style="position: absolute;bottom: 0px;width: 308px;">
                    <b-col cols="12">
                      <b-form-textarea
                        id="addComments-input"
                        v-model="addComent"
                        name="addComent"
                        placeholder="Añadir comentarios"
                      ></b-form-textarea>
                      <b-button
                        @click="postCommets(item,index,noticias,commentsArray)"
                        :disabled="!addComent"
                        class="post-Button"
                        variant="primary"
                      >Post</b-button>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-container>

            <template v-slot:modal-footer>
              <div class="w-100"></div>
            </template>
          </b-modal>
          <!-- Comments Modal Start -->

          <b-button
            v-b-modal="'modal-comment-' + index"
            style="float:right;margin-right:3%"
            target="_blank"
            variant="primary"
            @click="setProfileImage()"
          >
            <span>{{item.comentarios?item.comentarios.length:0}}</span>
            <svg
              style="bottom:2px;position:relative"
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
          <template v-slot:footer>
            <div v-if="item.fecha">
              <small class="text-muted">Fecha: {{(item.fechaClasica).split("T")[0]}}</small>
            </div>
            <div v-if="item.tags">
              <small
                class="text-muted"
              >Intereses: {{item.tags.join(", ").replace('que,','').replace(' ,','')}}</small>
            </div>
            <div v-if="!item.tags">
              <small class="text-muted">Intereses: indefinidos</small>
            </div>
            <div v-if="item.fuente">
              <small class="text-muted">Fuente: {{(item.fuente).split("T")[0]}}</small>
            </div>
          </template>
        </b-card>
      </b-card-group>
    </div>

    <!-- Create News Modal START-->
    <span id="modal-create-news" style="display:none" v-b-modal.modal-create-news>Open Modal</span>
    <b-modal
      id="modal-create-news"
      ref="modal"
      title="Crea tus noticias"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- Title Start -->
        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="title-group-1-input-"
          label="Titulo * :"
          label-for="title-input"
        >
          <b-form-input
            id="title-input"
            v-model="form.title"
            name="title-input"
            v-validate="{ required: true }"
            :state="validateState('title-input')"
            aria-describedby="title-input-live-feedback-1"
            data-vv-as="titulo"
            placeholder="Entrar titulo"
          ></b-form-input>
          <b-form-invalid-feedback
            id="title-input-live-feedback-1"
          >{{ veeErrors.first('title-input') }}</b-form-invalid-feedback>
        </b-form-group>
        <!-- Title End -->

        <!-- Description Start -->
        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="description-input"
          label="Cuerpo * :"
          label-for="description-input"
        >
          <b-form-textarea
            id="description-input"
            v-model="form.description"
            name="description-input"
            v-validate="{ required: true }"
            :state="validateState('description-input')"
            aria-describedby="description-input-live-feedback-2"
            data-vv-as="Cuerpo"
            placeholder="Entrar cuerpo"
          ></b-form-textarea>
          <b-form-invalid-feedback
            id="description-input-live-feedback-2"
          >{{ veeErrors.first('description-input') }}</b-form-invalid-feedback>
        </b-form-group>
        <!-- Description End -->

        <!-- Source Start -->
        <!--         <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="email-input"
          label="Fuente * :"
          label-for="email-input"
        >
          <b-form-input
            id="email-input"
            v-model="form.source"
            name="email-input"
            v-validate="'required|email'"
            :state="validateState('email-input')"
            aria-describedby="email-input-live-feedback-2"
            data-vv-as="Fuente"
            placeholder="Entrar Fuente"
          ></b-form-input>
          <b-form-invalid-feedback
            id="email-input-live-feedback-2"
          >{{ veeErrors.first('email-input') }}</b-form-invalid-feedback>
        </b-form-group>


        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="emailId-input"
          label="FuenteId * :"
          label-for="emailId-input"
        >
          <b-form-input
            id="emailId-input"
            v-model="form.sourceId"
            name="emailId-input"
            v-validate="'required|email'"
            :state="validateState('emailId-input')"
            aria-describedby="emailId-input-live-feedback-2"
            data-vv-as="FuenteId"
            placeholder="Entrar FuenteId"
          ></b-form-input>
          <b-form-invalid-feedback
            id="emailId-input-live-feedback-2"
          >{{ veeErrors.first('emailId-input') }}</b-form-invalid-feedback>
        </b-form-group>-->
        <!-- SourceId End -->

        <!-- Language Start -->
        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="Language-input"
          label="Idioma * :"
          label-for="Language-input"
        >
          <b-form-input id="Language-input" v-model="language" name="Language-input" disabled></b-form-input>
        </b-form-group>
        <!-- Language End -->

        <!-- Tags Start -->
        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="Tags-input"
          label="Tags * :"
          label-for="Tags-input"
        >
          <b-form-tags
            id="Tags-input"
            v-model="form.tags"
            name="Tags-input"
            v-validate="'required'"
            :state="validateState('Tags-input')"
            aria-describedby="Tags-input-live-feedback-2"
            data-vv-as="Tags"
            remove-on-delete
            add-on-enter
            placeholder="Añadir tag"
          ></b-form-tags>
          <b-form-text id="tags-remove-on-delete-help" class="mt-2">
            Prensa
            <kbd>Icono de retroceso / Cruz</kbd> para borrar la última etiqueta ingresada / Presione
            <kbd>Botón Entrar / Agregar</kbd> para agregar la etiqueta ingresada
          </b-form-text>
          <b-form-invalid-feedback
            id="Tags-input-live-feedback-2"
          >{{ veeErrors.first('Tags-input') }}</b-form-invalid-feedback>
        </b-form-group>
        <!-- Tags End -->

        <!-- Image Start -->
        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="img-input"
          label="Image"
          label-for="img-input"
        >
          <b-form-file
            id="img-input-Image"
            v-model="form.img"
            name="img-input-Image"
            v-validate="'image'"
            :state="validateState('img-input-Image')"
            aria-describedby="img-input-live-feedback-2"
            data-vv-as="Image"
            accept=".jpg"
            placeholder="Elija un archivo o suéltelo aquí"
            drop-placeholder="Suelta el archivo aquí"
          ></b-form-file>
          <b-form-invalid-feedback
            id="img-input-live-feedback-2"
          >{{ veeErrors.first('img-input-Image') }}</b-form-invalid-feedback>
        </b-form-group>
        <!-- Image End -->

        <!-- URL Start -->
        <b-form-group
          label-cols-sm="3"
          label-cols-lg="3"
          id="url-input"
          label="URL"
          label-for="url-input"
        >
          <b-form-input
            id="url-input"
            v-model="form.url"
            name="url-input"
            v-validate="{url: {require_protocol: true }}"
            :state="validateState('url-input')"
            aria-describedby="url-input-live-feedback-2"
            data-vv-as="URL"
            placeholder="Agregar URL de noticias"
          ></b-form-input>
          <b-form-invalid-feedback id="url-input-live-feedback-2">{{ veeErrors.first('url-input') }}</b-form-invalid-feedback>
        </b-form-group>
        <!-- Image End -->
      </form>
    </b-modal>
    <!-- Create News Modal END-->

    <b-button id="botonmodal" style="display:none" v-b-modal.modal-1>Launch demo modal</b-button>
    <b-modal id="modal-1" title="Tomo nota!" hide-footer>
      <p class="my-4">Actualmente no hay noticias registradas relacionadas con tu interés en:</p>
      <p id="keywordsid" class="my-4">
        <b>{{keywordactual}}</b>
      </p>
      <p
        class="my-4"
      >Pero ya hemos empezado a buscarlas para ti, mañana las tendrás disponibles en tu feed!</p>
      <b-button
        class="mt-3"
        block
        style="color: #fff;background-color: #28a745;border-color: #28a745;"
        @click="$bvModal.hide('modal-1')"
      >Genial</b-button>
    </b-modal>

    <div class="text-center">
      <center>
        <b-spinner
          id="cargandoid"
          style="display:none;width: 3rem; height: 3rem;"
          variant="primary"
          label="Text Centered"
        ></b-spinner>
      </center>
    </div>
    <center>
      <h4
        style="margin-left: auto; margin-right: auto; width: 80%;"
        id="noticiasid"
      >Preparando tus noticias personalizadas</h4>
    </center>
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
import "firebase/storage";
import Swal from "sweetalert2";
import $ from "jquery";

const projectId = "AIzaSyBXtt9PQb2FR3yGFn4pDwLIS3LJ0cZ5qHs";
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({ projectId });
export default {
  data() {
    return {
      imageProfile: "../assets/avatar-01.png",
      avtarPic: "img/avatar-01.6b36b5f2.png",
      name: "Inicio",
      classA: "likepulsado",
      classB: "likepulsado",
      translate_lan: "es",
      addComent: null,
      submittedNews: [],
      language: "es",
      imageURL: null,
      username: "",
      form: {
        title: null,
        description: null,
        /* source: null,
        sourceId: null, */
        tags: [],
        img: null,
        url: null,
      },
    };
  },
  created() {
    //this.getTareas()
    //this.getAlertas()
    this.getNoticias();
  },
  methods: {
    ...mapActions([
      "getNoticias",
      "filtrarporKeyword",
      "translateText",
      "saveCreatedNews",
    ]),
    setProfileImage() {
      let user = firebase.auth().currentUser;
      let fecha2 = new Date();
      this.username = user.email;
      var imgurl2 =
        "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
        encodeURIComponent(user.email) +
        ".jpg?alt=media&time=" +
        fecha2.getTime();
      this.imageProfile = imgurl2;
      //this.avtarPic = imgurl2;
      setTimeout(() => {
        let scrollToBottom = document.getElementById("commentSection");
        scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
      }, 100);
    },
    darlike(href, idelemento) {
      let contador_veces = 0;

      let user = firebase.auth().currentUser;

      let url = encodeURIComponent(href);
      url = url.replace("%3A", ":");
      const increment = firebase.firestore.FieldValue.increment(1);
      const decrement = firebase.firestore.FieldValue.increment(-1);

      db.collection("noticias")
        .where("url", "==", href)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let data2 = doc.data();
            let correos_like = data2.correos_like3;
            let correos_like_vacio = [];
            let correos_like2 = [];

            if (typeof correos_like != "undefined") {
              if (correos_like.includes(user.email)) {
                if (contador_veces == 0) {
                  //cuidado porque pasa varias veces
                  let likes_elemento = document
                    .getElementById(idelemento)
                    .getElementsByTagName("span")[0].innerText;
                  //alert(likes_elemento)
                  document
                    .getElementById(idelemento)
                    .classList.remove("likepulsado");
                  document.getElementById(idelemento).style.color = "#ffffff";
                  document.getElementById(idelemento).style.backgroundColor =
                    "#007bff";
                  let likesmasuno = parseInt(likes_elemento) - 1;
                  document
                    .getElementById(idelemento)
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
                .getElementById(idelemento)
                .getElementsByTagName("span")[0].innerText;
              //alert(likes_elemento)
              document.getElementById(idelemento).style.color = "#007bff";
              document.getElementById(idelemento).style.backgroundColor =
                "#ffffff";
              let likesmasuno = parseInt(likes_elemento) + 1;
              document
                .getElementById(idelemento)
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
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    async postCommets(object, index, comentArray) {
      let doc_id = null;
      let user_name = this.username.split("@")[0];
      let currentDate = moment(new Date()).format("L");
      let currenttime = moment(new Date()).format("HH:mm");
      if (object.comentarios) {
        object.comentarios.push({
          name: user_name,
          comment: this.addComent,
          date: currentDate,
          time: currenttime,
          image: this.imageProfile,
        });
      } else {
        object["comentarios"] = [
          {
            name: user_name,
            comment: this.addComent,
            date: currentDate,
            time: currenttime,
            image: this.imageProfile,
          },
        ];
      }
      this.addComent = null;
      let scrollToBottom = document.getElementById("commentSection");
      scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
      const noticiasRef = db.collection("noticias");
      const snapshot = await noticiasRef.where("id", "==", object.id).get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data());
        db.collection("noticias")
          .doc(doc.id)
          .update({
            comentarios: object.comentarios,
          })
          .then(() => {
            console.log("updated");
          });
      });
    },
    resetModalll() {
      this.addComent = null;
    },
    async toggleTranslate(item, index) {
      let target = "";
      if ($("#translate_" + index).hasClass("es")) {
        target = "es";
        $("#translate_" + index).removeClass("es");
        $("#translate_" + index).addClass("en");
      } else if ($("#translate_" + index).hasClass("en")) {
        target = "en";
        $("#translate_" + index).removeClass("en");
        $("#translate_" + index).addClass("es");
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
    hideComentsmodal(id) {
      this.$bvModal.hide(id);
    },
    resetModal() {
      (this.imageURL = null),
        (this.form = {
          title: null,
          description: null,
          tags: [],
          img: null,
          url: null,
        });
      this.$nextTick(() => {
        this.$validator.reset();
        this.$bvModal.hide("modal-create-news");
      });
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    handleSubmit() {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return;
        }
        let uniquieId = uuidv4();
        let photo = document.getElementById("img-input-Image");
        if (photo.files.length > 0) {
          let file = photo.files[0];
          let fileName = photo.files[0].name;
          let name = "create-news-image-" + fileName;
          let storageRef = firebase.storage().ref();
          let image = new FormData();
          image.append("file", file);
          let fecha2 = new Date();
          let mountainsRef = storageRef.child("avatares/" + name + ".jpg");
          this.imageURL =
            "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
            encodeURIComponent(name) +
            ".jpg?alt=media&time=" +
            fecha2.getTime();
          mountainsRef.put(file).then(function (snapshot) {});
        }
        let user = firebase.auth().currentUser;
        let email = user.email;
        this.submittedNews.push({
          id: uniquieId,
          title: this.form.title,
          description: this.form.description,
          date: parseInt(moment(new Date()).format("x") / 1000),
          classicDate: new Date().toISOString(),
          source: email,
          sourceId: email,
          language: this.language,
          tags: this.form.tags,
          img: this.form.img ? this.imageURL : null,
          url: this.form.url ? this.form.url : null,
        });
        this.saveCreatedNews(this.submittedNews);
        this.resetModal();
        Swal.fire("News!", "News created successfully!", "success");
      });
    },
  },
  computed: {
    ...mapState(["tareas", "noticias"]),
    ...mapState(["usuario", "keywordactual"]),
    translated: {
      get() {
        return this.$store.state.translated;
      },
    },
  },
  // components: {
  //   HelloWorld
  // }
};
</script>
<style>
.comments-modal .modal-dialog.modal-md {
  max-width: 840px !important;
  margin: 2% 0px 0px 19%;
}
.comments-modal .modal-dialog.modal-md .modal-content .modal-body {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
/* width */
.comments-scrollBar::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.comments-scrollBar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.comments-scrollBar::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.comments-scrollBar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.post-Button {
  /*   style="position: absolute;top: 18%;right: 20px;background-color: snow;color: #0075dc;font-weight: 700;box-shadow: none;border: none;" */
  position: absolute;
  top: 18%;
  right: 20px;
  background-color: #ffffff00;
  color: #0075dc;
  font-weight: 700;
  box-shadow: none;
  border: none;
}
.post-Button:hover {
  color: #64aaf5;
  background-color: unset;
  border-color: unset;
}
.post-Button.disabled,
.post-Button:disabled {
  color: #64aaf5;
  background-color: unset;
  border-color: unset;
}
.post-Button:focus {
  box-shadow: unset;
}
.post-Button:not(:disabled):not(.disabled):active {
  color: #0075dc;
  background-color: unset;
  border-color: unset;
}
</style>