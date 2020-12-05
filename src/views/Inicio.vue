<template>
  <div class="home">
    <div>
      <div class="row mt-4 w-100">
        <div class="col-4 col-sm-4 col-md-3 col-lg-3 pl-4 pr-0">
          <cool-select  :value="selectedUserInfo()" :placeholder="
              selectedLan == 'es'
                ? $searchUser_es
                : selectedLan == 'pt'
                ? $searchUser_pt
                : selectedLan == 'ar'
                ? $searchUser_ar
                : $searchUser_en
            "
             @search="searchUserText" :loading="loading" item-text="firstName" v-model="selectedUser" :items="searchUseritems">      
            <template style="ox-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);" v-if="loading" #input-end>
            <img src="https://i.imgur.com/mTNe6tr.gif" class="loading-indicator">
            </template>
          </cool-select>
        </div>        
        <div class="col-3 col-sm-3 col-md-1 col-lg-1 pr-1 pl-0">
          <b-form-select
            id="input-3"
            v-model="searchType"
            :options="
              selectedLan == 'es'
                ? $searchType_es
                : selectedLan == 'pt'
                ? $searchType_pt
                : selectedLan == 'ar'
                ? $searchType_ar
                : $searchType_en
            "
            required
            @change="seacrhInputChange"
          ></b-form-select>
        </div>
        <div class="d-none d-sm-none d-md-block d-lg-block col-md-4 col-lg-4"></div>
        <div class="col-5 col-sm-5 col-md-4 col-lg-4 pr-2">
          <b-form-select
            id="input-3"
            :value="getCurrentFilter()"
            :disabled="checkWhichSelected()"
            :options="
              selectedLan == 'es'
                ? $rangeDateOptions_es
                : selectedLan == 'pt'
                ? $rangeDateOptions_pt
                : selectedLan == 'ar'
                ? $rangeDateOptions_ar
                : $rangeDateOptions_en
            "
            required
            @change="rangeTimeSelectChnage"
          ></b-form-select>
        </div>
      </div>
      <b-card-group
        columns
        style="padding-left: 1em; padding-right: 1em; padding-top: 1em"
      >
        <b-card :key="index" v-for="(item, index) in noticias" no-body>
          <b-card-img-lazy
            :id="'cardImage_' + index"
            class="card-img-top"
            img-alt="Image"
            img-top
            :src="getImage(item, item.tags)"
            @error.native="error(index)"
          />
          <b-card-body :key="index" :id="index" :title="item.titulo">
            <button
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
              type="button" class="btn btn-lg btn-primary"
              :aria-disabled="checkTranslateButton(item,index)">
              <i
                style="color: #007bff; font-size: 25px;background-color: rgb(245 245 245);"
                class="fa fa-language"
                aria-hidden="true"
              ></i>
            </button>
            <b-card-text>{{ item.cuerpo.substring(0, 140)+'...' }}</b-card-text>
            <div class="row">
              <div class="col-5">
                <router-link
                  :to="{ name: 'Comment', params: { id: item.id } }"
                  style="text-decoration: none; color: unset; color: white"
                >
                  <b-button
                    :id="'comment-' + index"
                    style="float: right; margin-right: 3%"
                    target="_blank"
                    class="btn-primary2"
                    variant="primary"
                  >
                    <span
                      >{{ item.comentarios ? item.comentarios.length : 0 }}
                    </span>
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
              </div>
              <div class="col-7 text-center">
                <b-button  class="btn-primary2" variant="primary"><a target="_blank" :href="item.url?item.url:''" style="color: white;text-decoration: none;">{{
                  selectedLan == "es"
                    ? $see_more_es
                    : selectedLan == "pt"
                    ? $see_more_pt
                    : selectedLan == "ar"
                    ? $see_more_ar
                    : $see_more_en
                }}</a></b-button>
              </div>
            </div>
            <div class="mt-2 row">
              <div
                class="col-12 col-sm-12 col-md-10 col-lg-10 mx-auto text-center"
              >
                <v-rating
                  :value="ratingAverageCalculate(item, index, '')"
                  :half-increments="halfIncrements"
                  dense
                  hover
                  @input="On5ratingClick(item, index, item.id, $event)"
                  length="5"
                  size="28"
                ></v-rating>
              </div>
            </div>
            <div class="row text-center">
              <div
                class="col-6 col-sm-6 col-md-6 col-lg-6 mx-auto text-secondary mt-n4"
              >
                ({{ item.ratingArray ? item.ratingArray.length : 0 }} Votes)
              </div>
            </div>
          </b-card-body>
          <b-card-footer>
            <div v-if="item.fecha">
              <small class="text-muted"
                >{{
                  selectedLan == "es"
                    ? $Date_es
                    : selectedLan == "pt"
                    ? $Date_pt
                    : selectedLan == "ar"
                    ? $Date_ar
                    : $Date_en
                }}: {{ item.fechaClasica.split("T")[0] }}</small
              >
            </div>
            <div v-if="item.tags">
              <small class="text-muted"
                >{{
                  selectedLan == "es"
                    ? $Interests_es
                    : selectedLan == "pt"
                    ? $Interests_pt
                    : selectedLan == "ar"
                    ? $Interests_ar
                    : $Interests_en
                }}:
                {{
                  item.tags.join(", ").replace("que,", "").replace(" ,", "")
                }}</small
              >
            </div>
            <div v-if="!item.tags">
              <small class="text-muted">Intereses: indefinidos</small>
            </div>
            <div class="d-none" v-if="item.fuente">
              <small class="text-muted"
                >{{
                  selectedLan == "es"
                    ? $Source_es
                    : selectedLan == "pt"
                    ? $Source_pt
                    : selectedLan == "ar"
                    ? $Source_ar
                    : $Source_en
                }}: {{ item.fuente }}</small
              >
            </div>
          </b-card-footer>
        </b-card>
      </b-card-group>
    </div>
    <b-button id="botonmodal" style="display: none" v-b-modal.modal-1
      >Launch demo modal</b-button
    >
    <b-modal id="modal-1" :title="selectedLan == 'es'? $TakeNote_es: selectedLan == 'pt'? $TakeNote_pt: selectedLan == 'ar'? $TakeNote_ar: $TakeNote_en" hide-footer>
      <p class="my-4">
        {{selectedLan == "es"? $ThereAreCurrently_es: selectedLan == "pt"? $ThereAreCurrently_pt: selectedLan == "ar"? $ThereAreCurrently_ar: $ThereAreCurrently_en}}
      </p>
      <p id="keywordsid" class="my-4">
        <b>{{ keywordactual }}</b>
      </p>
      <p class="my-4">
        {{selectedLan == "es"? $AlreadyStarted_es: selectedLan == "pt"? $AlreadyStarted_pt: selectedLan == "ar"? $AlreadyStarted_ar: $AlreadyStarted_en}}
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
      >{{
        selectedLan == "es"
          ? $PreparingNewsText_es
          : selectedLan == "pt"
          ? $PreparingNewsText_pt
          : selectedLan == "ar"
          ? $PreparingNewsText_ar
          : $PreparingNewsText_en
      }}
      </h4>
    </center>
	<button @click="previous" class="btn pmd-btn-fab pmd-ripple-effect btn-primary btn-primary2" style="      font-weight: 900;font-size: larger;line-height: 0px;  position: fixed;display: block;bottom: 30px;left: 10px;width: 50px;height: 50px;border-radius: 25px;color: white;z-index: 99999999999999;" type="button"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
    <button @click="next" class="btn pmd-btn-fab pmd-ripple-effect btn-primary btn-primary2" style="      font-weight: 900;font-size: larger;line-height: 0px;  position: fixed;display: block;bottom: 30px;right: 20px;width: 50px;height: 50px;border-radius: 25px;color: white;z-index: 99999999999999;" type="button"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>

	<div
      v-if="noticias.length > 0"
      class="row mt-2 pt-1 pb-1"
      style="
        border-top: 1px solid #d6d6d6;
        box-shadow: 2px -4px 19px #ded9d9;
        background: white;
        z-index: 9999999;
        bottom: 0;
		display:none;
        position: sticky;
      "
    >
      <div class="col-2 col-sm-2 col-md-4 col-lg-4"></div>
      <div class="col-4 col-sm-4 col-md-2 col-lg-2" @click="previous">
        <b-button
          :disabled="previousCount == 0 || paginationCount == 0"
          style="width: 100% !important"
          size="sm"
          variant="primary"
          >{{
            selectedLan == "es"
              ? $previous_page_es
              : selectedLan == "pt"
              ? $previous_page_pt
              : selectedLan == "ar"
              ? $previous_page_ar
              : $previous_page_en
          }}</b-button
        >
      </div>
      <div class="col-4 col-sm-4 col-md-2 col-lg-2" @click="next">
        <b-button
          :disabled="
            previousCount == noticiasLength || paginationCount == noticiasLength
          "
          style="width: 100% !important"
          size="sm"
          variant="primary"
          >{{
            selectedLan == "es"
              ? $Next_page_es
              : selectedLan == "pt"
              ? $Next_page_pt
              : selectedLan == "ar"
              ? $Next_page_ar
              : $Next_page_en
          }}</b-button
        >
        <!-- <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select> -->
      </div>
      <div class="col-2 col-sm-2 col-md-4 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import Vue from "vue";
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
import { CoolSelect } from 'vue-cool-select';
import { TranslatorTextClient, TranslatorTextModels} from "@azure/cognitiveservices-translatortext";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

/* const projectId = "AIzaSyBXtt9PQb2FR3yGFn4pDwLIS3LJ0cZ5qHs";
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({ projectId }); */
export default {
  components: { CoolSelect },
  data() {
    return {
      //urlHeroku:"https://autofeed-translate.herokuapp.com/translate/getText?text=",
      urlHeroku:"http://localhost:3000/translate/getText?text=",
      searchType: "user",
      loading: false,
      firstTimeTagSelected: false,
      searchUseritems:[],
      selectedUser: null,
      searchUserValue:false,
      searchUser: null,
      halfIncrements: true,
      page: 1,
      imageProfile: "../assets/avatar-01.png",
      avtarPic: "img/avatar-01.6b36b5f2.png",
      name: "Inicio",
      classA: null,
      previousCount: 0,
      rangeDate: this.$store.state.changeRangeDate
        ? this.$store.state.changeRangeDate
        : "today",
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
    this.getLocation();
    if(this.keywordactual == "todos" || this.keywordactual == ""){
     this.getNoticias({
      rangedateChoosen: this.rangeDate,
      yesterdayDate: "",
      type: "next",
      limit: 10,
      selectedTag: this.$store.state.selectedTag,
    });
    }
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
      "getGoogleTranslateToken",
    ]),
    error(index) {
      $("#cardImage_" + index).attr(
        "src",
        "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/img%2Fwhitelogo.png?alt=media&token=e9002688-358a-4997-94b0-31b460635c01"
      );
    },
    getCurrentFilter() {
      return this.$store.state.changeRangeDate
        ? this.$store.state.changeRangeDate
        : this.rangeDate;
    },
    checkWhichSelected() {
      return this.$store.state.changeRangeDate ? true : false;
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      let user = firebase.auth().currentUser;
      let Latitude = position.coords.latitude;
      let Longitude = position.coords.longitude;
      let geoLocation = {
        Latitude,
        Longitude,
      };
      db.collection("usuarios")
        .doc(user.email)
        .update({
          geoLocation: geoLocation,
        })
        .then(() => {
          console.log("Updated Lat and Long");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ratingAverageCalculate(item, index, value) {
      if (item.ratingArray && item.ratingArray.length > 0) {
        let getrating = item.ratingArray.reduce(function (sum, current) {
          return sum + current.rating;
        }, 0);
        return getrating / item.ratingArray.length.toFixed(2);
      } else {
        return 0;
      }
    },
    async On5ratingClick(item, index, id, value) {
      let user = firebase.auth().currentUser;
      if (item.ratingArray && item.ratingArray.length > 0) {
        let userRatingfind = item.ratingArray.some(
          (element) => user.email == element.email
        );
        if (userRatingfind) {
          let updatedRatingArray = item.ratingArray.forEach(function (
            object,
            i,
            array
          ) {
            if (user.email == object.email) {
              array[i].rating = value;
              return;
            }
          });
        } else {
          item.ratingArray.push({ email: user.email, rating: value });
          item.ratingArrayAccounts.push(user.email);
        }
      } else {
        item["ratingArray"] = [{ email: user.email, rating: value }];
        item["ratingArrayAccounts"] = [user.email];
      }
      const noticiasRef = db.collection("noticias");
      const snapshot = await noticiasRef.where("id", "==", id).get();
      if (snapshot.empty) {
        console.log("No matching documents");
        return;
      }
      snapshot.forEach((doc) => {
        db.collection("noticias")
          .doc(doc.id)
          .update({
            ratingArray: item.ratingArray,
            ratingArrayAccounts: item.ratingArrayAccounts,
          })
          .then(() => {
            console.log("updated");
          });
      });
      Vue.set(item, item.ratingArray, item.ratingArray);
      this.ratingAverageCalculate(item, value);
    },
    rangeTimeSelectChnage() {
      this.previousCount = 0;
      this.getNoticias({
        rangedateChoosen: this.rangeDate,
        yesterdayDate: "",
        type: "next",
        limit: 10,
        selectedTag: this.$store.state.selectedTag,
      });
    },
    previous() {
      this.previousCount -= 1;
      var arrayItem;
      arrayItem = this.noticias[this.noticias.length - this.noticias.length];
      this.getNoticias({
        rangedateChoosen: this.rangeDate,
        yesterdayDate: arrayItem.fecha,
        type: "previous",
        limit: 10,
        selectedTag: this.$store.state.selectedTag,
      });
    },
    next() {
      this.previousCount += 1;
      var arrayItem;
      arrayItem = this.noticias[this.noticias.length - 1];
      this.getNoticias({
        rangedateChoosen: this.rangeDate,
        yesterdayDate: arrayItem.fecha,
        type: "next",
        limit: 10,
        selectedTag: this.$store.state.selectedTag,
      });
    },
    selectedUserInfo(){
      if(this.selectedUser && this.searchType == "user"){
        this.$router.push('/timeline/'+this.selectedUser.email);
      }else if(this.selectedUser && !this.firstTimeTagSelected && this.searchType == "tag"){
        this.firstTimeTagSelected = true;
        this.filtrarporKeyword(this.selectedUser);
      }
    },
   searchUserText(searchtext){
      this.searchUseritems = []
      var items = []
      this.loading = searchtext.length > 0?true:false
      let noticiasRef 
      if(this.searchType == "user"){
        noticiasRef = db.collection("usuarios").orderBy("firstName").startAt(searchtext).get();
        noticiasRef.then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            var dataTemp = doc.data();
            items.push(dataTemp)
          });
          this.loading = false
          this.searchUseritems = searchtext.length > 0?items:[];
        }.bind(this));
      }else if(this.searchType == "tag"){
        noticiasRef = db.collection("noticias").where("tags", "array-contains", searchtext).orderBy("tags").startAt(searchtext).limit(1).get();
        noticiasRef.then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            var dataTemp = doc.data();
            var tags
            if(dataTemp.tags.length == 0){
              tags = dataTemp.tags; 
            }else{
              tags = dataTemp.tags.filter(object => object == searchtext);
            }
            items.push({"firstName":tags[0]})
          });
          this.loading = false
          this.searchUseritems = searchtext.length > 0?items:[];
        }.bind(this));
      }if((searchtext.length == 0) && this.firstTimeTagSelected && this.searchType == "tag"){
        this.firstTimeTagSelected = false;
        this.selectedUser = null;
        this.filtrarporKeyword("todos");
      }
    },
    seacrhInputChange(){
      this.searchUseritems = [];
    },
    getImage(item, tagsArray) {
      if (item.fuente === "Google" || item.fuente === "seekingalpha"  || item.fuente === "twitter") {
       if (tagsArray.length > 0) {
         let tagIndex = tagsArray.findIndex(element => element.length > 1)
          if (tagIndex >= 0) {
              return (
                "https://40.69.2.143/autofeedImages/default_img/" +
                tagsArray[tagIndex] +
                ".png"
              );
            } else {
              return "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/img%2Fwhitelogo.png?alt=media&token=e9002688-358a-4997-94b0-31b460635c01";
            }
/*            for (let i = 0; tagsArray.length > 0; i++) {
            if (tagsArray[i].length > 0) {
              return (
                "https://40.69.2.143/autofeedImages/default_img/" +
                tagsArray[i] +
                ".png"
              );
            } else if (tagsArray.length == i + 1) {
              return "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/img%2Fwhitelogo.png?alt=media&token=e9002688-358a-4997-94b0-31b460635c01";
            }
          } */ 
        } else {
          return "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/img%2Fwhitelogo.png?alt=media&token=e9002688-358a-4997-94b0-31b460635c01";
        }
      } else if(item.image !== null){
        return item.img;
      } else if(item.image == null){
        return "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/img%2Fwhitelogo.png?alt=media&token=e9002688-358a-4997-94b0-31b460635c01";
      }
    },
    darlike(id) {
      let contador_veces = 0;
      let user = firebase.auth().currentUser;
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
                  document.getElementById(id).classList.remove("likepulsado");
                  document.getElementById(id).style.color = "#ffffff";
                  document.getElementById(id).style.backgroundColor = "#007bff";
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
              document.getElementById(id).style.backgroundColor = "#ffffff";
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
  async checkTranslateButton(item,index) {
    let tlt = null;
    let dsr = null;
    let defaultLanguageOfuser = this.selectedLan?this.selectedLan:"en";
      if(! $('#translate_'+index).hasClass( "verified" )){
        if (item.idioma == defaultLanguageOfuser) {
                $('#translate_'+index).addClass('verified');
                $('#translate_'+index).prop('disabled', true);
                //$('#translate_'+index).css('opacity','0.5 !important');
                tlt = item.titulo;
                dsr = item.cuerpo;
                let translatedTitleText = [];
                //let translationArray = [tlt, dsr];
                if(item.fuente == "twitter"){
                  const translatorTextKey = '083901d0e39f47a0a92c4d09e554cc6c';
                  const translatorTextEndPoint = "https://api.cognitive.microsofttranslator.com";
                  const cognitiveServiceCredentials = new CognitiveServicesCredentials(translatorTextKey);
                  const client = new TranslatorTextClient(cognitiveServiceCredentials,translatorTextEndPoint);
                  const text = [{
                      text: dsr
                  }];
                  client.credentials.inHeader = {'Ocp-Apim-Subscription-Key': '083901d0e39f47a0a92c4d09e554cc6c',
                    'Ocp-Apim-Subscription-Region': 'northeurope',
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuidv4().toString()}
                  client.translator.translate([item.idioma], text).then(result => {
                  console.log("The result is: ");
                  console.log(result);
                  var titleTranslate = result[0].translations[0].text;
                  translatedTitleText.push(titleTranslate);
                  this.$store.state.totalRequest += 1
                  this.$store.state.totalChars += translatedTitleText[0].length
                  db.collection('translationLogs').doc("totalRequestLog").update({
                    totalChars: this.$store.state.totalChars,
                    totalRequests: this.$store.state.totalRequest,
                  }).then(() => {
                    console.log("translated character updated")
                  }).catch((error) => {
                    console.log(error)
                  })
                  item.cuerpo = translatedTitleText[0];
                  }).catch((error) => {
                    console.log(error)
                  })
                }else{          
                  const translatorTextKey = '083901d0e39f47a0a92c4d09e554cc6c';
                  const translatorTextEndPoint = "https://api.cognitive.microsofttranslator.com";
                  const cognitiveServiceCredentials = new CognitiveServicesCredentials(translatorTextKey);
                  const client = new TranslatorTextClient(cognitiveServiceCredentials,translatorTextEndPoint);
                  const text = [{
                        text: tlt
                      },
                      {
                        text: dsr
                      }];
                  client.credentials.inHeader = {'Ocp-Apim-Subscription-Key': '083901d0e39f47a0a92c4d09e554cc6c',
                    'Ocp-Apim-Subscription-Region': 'northeurope',
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuidv4().toString()}
                  client.translator.translate([item.idioma], text).then(result => {
                  console.log("The result is: ");
                  console.log(result);
                  var titleTranslate = result[0].translations[0].text;
                  translatedTitleText.push(titleTranslate);
                  var descTranslate = result[1].translations[0].text;
                  translatedTitleText.push(descTranslate);
                  this.$store.state.totalRequest +=1
                  this.$store.state.totalChars += translatedTitleText[0].length
                  this.$store.state.totalChars += translatedTitleText[1].length
                  db.collection('translationLogs').doc("totalRequestLog").update({
                    totalChars: this.$store.state.totalChars,
                    totalRequests: this.$store.state.totalRequest,
                  }).then(() => {
                    console.log("translated character updated")
                  }).catch((error) => {
                    console.log(error)
                  })
                  item.titulo = translatedTitleText[0];
                  item.cuerpo = translatedTitleText[1];
                  }).catch((error) => {
                    console.log(error)
                  })
                }
              } else if (item.idioma !== this.selectedLan) {
                $('#translate_'+index).addClass('verified');
                $('#translate_'+index).prop('disabled', false);
              }
      }
    },

    async toggleTranslate(item, index) {
      let target = "";
      let languageTemp = this.selectedLan?this.selectedLan:"en";
      if ($("#translate_" + index).hasClass(languageTemp)) {
        $("#translate_" + index).removeClass(languageTemp);
        target = item.idioma;
      } else if ($("#translate_" + index).not(languageTemp)) {
        $("#translate_" + index).addClass(languageTemp);
        target = languageTemp;
      }
      if(item.fuente == "twitter"){
        let languageExistTW = false;
        if(item.languageCheck && item.languageCheck.length > 0){
           languageExistTW = item.languageCheck.some(object => object.language == target);
        }else{
           languageExistTW = false;
        }
        if (!languageExistTW) {
            let dsr = item.cuerpo;
            let translatedTitleText = [];
            let translationArray = [dsr];
          const translatorTextKey = '083901d0e39f47a0a92c4d09e554cc6c';
          const translatorTextEndPoint = "https://api.cognitive.microsofttranslator.com";
          const cognitiveServiceCredentials = new CognitiveServicesCredentials(translatorTextKey);
          const client = new TranslatorTextClient(cognitiveServiceCredentials,translatorTextEndPoint);
          const text = [{
                text: dsr
              }];
        client.credentials.inHeader = {'Ocp-Apim-Subscription-Key': '083901d0e39f47a0a92c4d09e554cc6c',
                'Ocp-Apim-Subscription-Region': 'northeurope',
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString() }
          client.translator.translate([target], text).then(result => {
          console.log("The result is: ");
          console.log(result);
          var titleTranslate = result[0].translations[0].text;
          translatedTitleText.push(titleTranslate);
          this.$store.state.totalRequest +=1
          this.$store.state.totalChars += translatedTitleText[0].length
          db.collection('translationLogs').doc("totalRequestLog").update({
            totalChars: this.$store.state.totalChars,
            totalRequests: this.$store.state.totalRequest,
          }).then(() => {
            console.log("translated character updated")
          }).catch((error) => {
            console.log(error)
          })
          item.cuerpo = translatedTitleText[0];
          if(item.languageCheck && item.languageCheck.length > 0){
            item.languageCheck.push({
              language: target,
              title:translatedTitleText[0],
              decription:translatedTitleText[1],
            })
            db.collection("noticias").doc(item.documentId).update({
              languageCheck: item.languageCheck,
            })
            .then(() => {
              console.log("updated");
            });
          }else{
            item["languageCheck"] = {
              language: target,
              decription:translatedTitleText[1],
            }
            db.collection("noticias").doc(item.documentId).update({
                languageCheck: item.languageCheck,
              })
              .then(() => {
                console.log("added translated values");
              }).catch((error) => {
                console.log("error in updating translating values")
            })
          }
          }).catch(err => {
          console.log("An error occurred:");
          //console.error(err);
          });
        }else{
         var querryRef1 = db.collection("noticias").where("id", "==", item.id).get();
          querryRef1.then(res => {
            res.forEach(doc => {
              let dataTemp = doc.data();
              if(dataTemp.languageCheck.length > 0){
                for(let i=0;dataTemp.languageCheck.length > i;i++){
                  if(dataTemp.languageCheck[i].language == target){
                      item.cuerpo = dataTemp.languageCheck[i].decription;
                  }
                }
              }else{
                      item.cuerpo = dataTemp.languageCheck[0].decription;
              }
            })
          })
        }
      }else{
        let languageExist = false;
        if(item.languageCheck && item.languageCheck.length > 0){
           languageExist = item.languageCheck.some(object => object.language == target);
        }else{
           languageExist = false;
        }
        if (!languageExist) {
          let tlt = item.titulo;
          let dsr = item.cuerpo;
          let translatedTitleText = [];
          let translationArray = [tlt, dsr];
          const translatorTextKey = '083901d0e39f47a0a92c4d09e554cc6c';
          const translatorTextEndPoint = "https://api.cognitive.microsofttranslator.com";
          const cognitiveServiceCredentials = new CognitiveServicesCredentials(translatorTextKey);
          const client = new TranslatorTextClient(cognitiveServiceCredentials,translatorTextEndPoint);
          const text = [{
                text: tlt
              },
              {
                text: dsr
              }];
            client.credentials.inHeader = {'Ocp-Apim-Subscription-Key': '083901d0e39f47a0a92c4d09e554cc6c',
                    'Ocp-Apim-Subscription-Region': 'northeurope',
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuidv4().toString() }
            client.translator.translate([target], text).then(result => {
              console.log("The result is: ");
              console.log(result);
              var titleTranslate = result[0].translations[0].text;
              translatedTitleText.push(titleTranslate);
              var descTranslate = result[1].translations[0].text;
              translatedTitleText.push(descTranslate);
              this.$store.state.totalRequest +=1
              this.$store.state.totalChars += translatedTitleText[0].length
              this.$store.state.totalChars += translatedTitleText[1].length
              db.collection('translationLogs').doc("totalRequestLog").update({
                totalChars: this.$store.state.totalChars,
                totalRequests: this.$store.state.totalRequest,
              }).then(() => {
                console.log("translated character updated")
              }).catch((error) => {
                console.log(error)
              })
              item.titulo = translatedTitleText[0];
              item.cuerpo = translatedTitleText[1];
                if(item.languageCheck && item.languageCheck.length > 0){
                  item.languageCheck.push({
                    language: target,
                    title:item.titulo,
                    decription:item.cuerpo,
                  })
                  db.collection("noticias").doc(item.documentId).update({
                      languageCheck: item.languageCheck,
                    })
                    .then(() => {
                      console.log("updated");
                    });
              }else if(!item.languageCheck){
                item["languageCheck"] = [{
                  language: target,
                  title:item.titulo,
                  decription:item.cuerpo,
                }]
                db.collection("noticias").doc(item.documentId).update({
                    languageCheck: item.languageCheck,
                  })
                  .then(() => {
                    console.log("added translated values");
                  }).catch((error) => {
                    console.log("error in updating translating values")
                })
              }
          }).catch(err => {
            console.log("An error occurred:");
            console.error(err);
          });
        }else{
         var querryRef = db.collection("noticias").where("id", "==", item.id).get();
          querryRef.then(res => {
            res.forEach(doc => {
              let dataTemp = doc.data();
              if(dataTemp.languageCheck.length > 0){
                for(let i=0;dataTemp.languageCheck.length > i;i++){
                  if(dataTemp.languageCheck[i].language == target){
                    item.titulo = dataTemp.languageCheck[i].title;
                    item.cuerpo = dataTemp.languageCheck[i].decription;
                  }
                }
              }else{
                item.titulo = dataTemp.languageCheck[0].title;
                item.cuerpo = dataTemp.languageCheck[0].decription;
              }
            })
          })
        }
      }
    },

  },
  computed: {
    ...mapState([
      "tareas",
      "noticias",
      "noticiasTemp",
      "noticiasLength",
      "selectedLan",
      "keywordactual",
      "changeRangeDate",
      "selectedTag",
      "paginationCount",
    ]),
    ...mapState(["usuario", "keywordactual"]),
  },
};

Vue.prototype.$rangeDateOptions_es = [
  { text: "Hoy", value: "today" },
  { text: "hace 2 días", value: "2 days ago" },
  { text: "La semana pasada", value: "last week" },
];
Vue.prototype.$rangeDateOptions_pt = [
  { text: "Hoje", value: "today" },
  { text: "2 dias atrás", value: "2 days ago" },
  { text: "Semana Anterior", value: "last week" },
];
Vue.prototype.$rangeDateOptions_en = [
  { text: "Today", value: "today" },
  { text: "2 days ago", value: "2 days ago" },
  { text: "Last week", value: "last week" },
];
Vue.prototype.$rangeDateOptions_ar = [
  { text: "اليوم", value: "today" },
  { text: "2 منذ أيام", value: "2 days ago" },
  { text: "الاسبوع الماضي", value: "last week" },
];


Vue.prototype.$searchType_es = [
  { text: "Usuario", value: "user" },
  { text: "Interés", value: "tag" }
];
Vue.prototype.$searchType_pt = [
  { text: "Do utilizador", value: "user" },
  { text: "Tag", value: "tag" }
];
Vue.prototype.$searchType_en = [
  { text: "User", value: "user" },
  { text: "Tag", value: "tag" }
];
Vue.prototype.$searchType_ar = [
  { text: "المستعمل", value: "user" },
  { text: "بطاقة شعار", value: "tag" }
];
Vue.prototype.$searchUser_es = "Buscar...";
Vue.prototype.$searchUser_pt = "Pesquisar...";
Vue.prototype.$searchUser_en = "Search...";
Vue.prototype.$searchUser_ar = "ابحث عن المستخدم";
Vue.prototype.$previous_page_es = "Anterior";
Vue.prototype.$previous_page_pt = "Anterior";
Vue.prototype.$previous_page_en = "Previous";
Vue.prototype.$previous_page_ar = "الصفحة السابقة";
Vue.prototype.$Next_page_es = "Siguiente";
Vue.prototype.$Next_page_pt = "Seguinte";
Vue.prototype.$Next_page_en = "Next";
Vue.prototype.$Next_page_ar = "الصفحة التالية";
Vue.prototype.$see_more_es = "Ver más";
Vue.prototype.$see_more_pt = "Ver mais";
Vue.prototype.$see_more_en = "see more";
Vue.prototype.$see_more_ar = "شاهد المزيد";
Vue.prototype.$Source_es = "Fuente";
Vue.prototype.$Source_pt = "Fonte";
Vue.prototype.$Source_en = "Source";
Vue.prototype.$Source_ar = "مصدر";
Vue.prototype.$Date_es = "Fecha";
Vue.prototype.$Date_pt = "Encontro";
Vue.prototype.$Date_en = "Date";
Vue.prototype.$Date_ar = "تاريخ";
Vue.prototype.$Interests_es = "Intereses";
Vue.prototype.$Interests_pt = "Interesses";
Vue.prototype.$Interests_en = "Interests";
Vue.prototype.$Interests_ar = "الإهتمامات";
Vue.prototype.$Rating_es = "Clasificación";
Vue.prototype.$Rating_pt = "Avaliação";
Vue.prototype.$Rating_en = "Rating";
Vue.prototype.$Rating_ar = "تقييم";
Vue.prototype.$searchUser_es = "Buscar...";
Vue.prototype.$searchUser_pt = "Pesquisar...";
Vue.prototype.$searchUser_en = "Search...";
Vue.prototype.$searchUser_ar = "مستخدم البحث";
Vue.prototype.$ThereAreCurrently_es = "Actualmente no hay noticias registradas relacionadas con tu interés en:";
Vue.prototype.$ThereAreCurrently_pt = "No momento, não há notícias registradas relacionadas ao seu interesse em:";
Vue.prototype.$ThereAreCurrently_en = "There are currently no registered news related to your interest in:";
Vue.prototype.$ThereAreCurrently_ar = "لا يوجد حاليًا أي أخبار مسجلة تتعلق باهتمامك بـ:";
Vue.prototype.$AlreadyStarted_es = "Pero ya hemos empezado a buscarlas para ti, mañana las tendrás disponibles en tu feed!";
Vue.prototype.$AlreadyStarted_pt = "Mas já começamos a procurá-los para você, amanhã você os terá disponível no seu feed!";
Vue.prototype.$AlreadyStarted_en = "But we have already started looking for them for you, tomorrow you will have them available in your feed!";
Vue.prototype.$AlreadyStarted_ar = "لكننا بدأنا بالفعل في البحث عنهم من أجلك ، وستجدهم غدًا متوفر في خلاصتك!";
Vue.prototype.$TakeNote_es = "Tomo nota!";
Vue.prototype.$TakeNote_pt = "Tomo nota!";
Vue.prototype.$TakeNote_en = "Take note!";
Vue.prototype.$TakeNote_ar = "خذ ملاحظة!";
Vue.prototype.$PreparingNewsText_es = "Preparando tus noticias personalizadas";
Vue.prototype.$PreparingNewsText_pt = "Preparando suas notícias personalizadas";
Vue.prototype.$PreparingNewsText_en = "Preparing your personalized news";
Vue.prototype.$PreparingNewsText_ar = "اعداد اخبارك الشخصية";
</script>
<style>
.loading-indicator {
  width: 22px;
  margin-right: 9px;
  margin-bottom: 6px;
}
.IZ-select .IZ-select__input-wrap .IZ-select__input{
  box-shadow: unset !important;
}
</style>