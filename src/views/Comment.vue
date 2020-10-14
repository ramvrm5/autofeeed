<template>
  <div class="home">
    <div>
      <b-container fluid style="padding: 0px">
        <b-row
          style="height: 90vh !important; width: 100%"
          class="bg-light align-items-center"
        >
          <div style="left: 25px; top: 60px; position: absolute; z-index: 9999">
            <router-link to="/"
              ><i class="fa fa-chevron-left" aria-hidden="true"></i>
              {{
                selectedLan == "es"
                  ? $Back_es
                  : selectedLan == "pt"
                  ? $Back_pt
                  : $Back_en
              }}
            </router-link>
          </div>
          <b-col
            class="col-lg-8 mx-auto pt-0 pb-0"
            style="height: 90%; border: 1px solid #cac5c5"
          >
            <b-row class="h-100">
              <b-col
                class="col-12 col-sm-12 col-md-6 col-lg-5 comments-scrollBar h-100"
                style="overflow-y: scroll; padding: 0px"
              >
                <b-card
                  :title="item.titulo"
                  :img-src="item.img"
                  img-alt="Image"
                  img-top
                  tag="article"
                >
                  <b-card-text>{{ item.cuerpo }}</b-card-text>
                  <template v-slot:footer>
                    <div v-if="item.fecha">
                      <small class="text-muted"
                        >{{
                          selectedLan == "es"
                            ? $Date_es
                            : selectedLan == "pt"
                            ? $Date_pt
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
                            : $Interests_en
                        }}:
                        {{
                          item.tags
                            .join(", ")
                            .replace("que,", "")
                            .replace(" ,", "")
                        }}</small
                      >
                    </div>
                    <div v-if="!item.tags">
                      <small class="text-muted">Intereses: indefinidos</small>
                    </div>
                    <!-- <div v-if="item.fuente">
                      <small class="text-muted"
                        >Fuente: {{ item.fuente.split("T")[0] }}</small
                      >
                    </div> -->
                    <!-- <div class="row text-center">
                      <div class="col-6 mx-auto text-secondary mt-n4">
                        ({{
                          item.ratingArray ? item.ratingArray.length : 0
                        }}
                        Votes)
                      </div>
                    </div> -->
                  </template>
                    <div class="mt-2 row" style="position: sticky;bottom: 0px;background-color: white;">
                      <div class="col-8 mx-auto">
                        <v-rating
                          :value="ratingAverageCalculate(item,  '')"
                          :half-increments="halfIncrements"
                          dense
                          hover
                          @input="On5ratingClick(item,  item.id, $event)"
                          length="5"
                          size="28"
                        ></v-rating>
                      </div>
                      <div class="col-6 mx-auto text-secondary mt-n4">
                        ({{
                          item.ratingArray ? item.ratingArray.length : 0
                        }}
                        Votes)
                      </div>
                    </div>
                </b-card>
              </b-col>
              <b-col
                class="col-12 col-sm-12 col-md-6 col-lg-7 h-100"
                style="padding: 0px"
              >
                <b-row
                  class="m-0 w-100 d-sm-none"
                  style="border-bottom: 2px solid rgb(223 223 223); height: 20%"
                >
                  <b-col
                    cols="4 h-100 d-block d-sm-block d-md-block d-lg-block"
                  >
                    <img
                      id="profilepic"
                      class="rounded-circle"
                      :src="imageProfile"
                      onerror="this.onerror=null;this.src='../assets/avatar-01.png';"
                      style="
                        border: 2px solid #c5c1c140;
                        height: 100% !important;
                      "
                    />
                  </b-col>
                  <b-col cols="8 d-block d-sm-block d-md-block d-lg-block mt-3">
                    <b>{{ username }}</b>
                  </b-col>
                </b-row>
                <b-row
                  v-if="item.comentarios && item.comentarios.length > 0"
                  style="height: 68%; overflow-y: scroll"
                  class="comments-scrollBar m-0 w-100"
                  id="commentSection"
                >
                  <b-row
                    v-for="(comments, i) in item.comentarios"
                    :key="i"
                    :id="i"
                    class="m-0 mt-2 w-100"
                    style="border-bottom: 1px solid #dfdfdf"
                  >
                    <b-col cols="3 d-block d-sm-block d-md-block d-lg-block ">
                      <img
                        id="avtarPic"
                        class="rounded-circle"
                        :src="comments.image ? comments.image : avtarPic"
                        onerror="this.onerror=null;this.src='../assets/avatar-01.png';"
                        style="
                          width: 90%;
                          margin-bottom: 8px;
                          margin-top: 8px;
                          border: 2px solid #c5c1c140;
                        "
                      />
                    </b-col>
                    <b-col
                      cols="9 d-block d-sm-block d-md-block d-lg-block pl-0"
                    >
                      <b-row>
                        <b-col
                          cols="4 pl-3"
                          style="
                            padding-left: 27px;
                            text-transform: capitalize;
                            font-weight: 700;
                            cursor:pointer;
                            color: #007BFF;
                          "
                          @click="openTimeLineOfuser(comments)"
                          >{{ comments.name }}</b-col
                        >
                        <b-col
                          cols="8 pl-0 pr-0"
                          style="font-size: 13px; color: #969191"
                          >{{ comments.time }} {{ comments.date }}</b-col
                        >
                        <b-col cols="12" style="font-weight: 500">{{
                          comments.comment
                        }}</b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-row>
                <b-row
                  v-if="!item.comentarios || item.comentarios.length == 0"
                  style="height: 68%; overflow-y: scroll; color: #afaeae"
                  class="comments-scrollBar ml-0 mr-1 pt-5 text-center"
                  id="commentSection"
                >
                  <b-col cols="12">No comments yet</b-col>
                </b-row>
                <b-row class="w-100 m-0" style="height: 12%">
                  <b-col cols="12 p-0">
                    <b-form-textarea
                      id="addComment"
                      v-model="addComent"
                      class="form-control"
                      style="border-radius: 0"
                      placeholder="Añadir comentarios"
                    ></b-form-textarea>
                    <b-button
                      @click="postCommets(item)"
                      :disabled="!addComent"
                      class="post-Button"
                      variant="primary"
                      >Post</b-button
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/storage";
import Swal from "sweetalert2";
import $ from "jquery";
export default {
  data() {
    return {
      halfIncrements: true,
      imageProfile: "../assets/avatar-01.png",
      avtarPic: "img/avatar-01.6b36b5f2.png",
      addComent: null,
      username: "",
      item: {},
    };
  },
  created() {},
  mounted: function () {
    this.details();
    setTimeout(() => {
      this.setProfileImage();
    }, 150);
  },
  methods: {
    openTimeLineOfuser(object){
      this.$router.push({ name: 'Timeline', params: { email:object.email } });
    },
    ratingAverageCalculate(item,  value) {
      if (item.ratingArray && item.ratingArray.length > 0) {
        let getrating = item.ratingArray.reduce(function (sum, current) {
          return sum + current.rating;
        }, 0);
        return getrating / item.ratingArray.length.toFixed(2);
      } else {
        return 0;
      }
    },
    
    async On5ratingClick(item,id, value) {
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
      Vue.set(item, item.ratingArray, item.ratingArray)
      this.ratingAverageCalculate(item, value);
    },
    details() {
      let id = this.$route.params.id;
      let dataTemp = "";
      const noticiasRef = db.collection("noticias");
      noticiasRef
        .where("id", "==", id)
        .get()
        .then(
          function (querySnapshot) {
            querySnapshot.forEach((doc) => {
              dataTemp = doc.data();
              this.item = dataTemp;
            });
          }.bind(this)
        );
    },
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
      }, 852);
    },

    async postCommets(object) {
      let doc_id = null;
      let commentArrayOfUsersEmail = [];
      if (object.commentsArray) {
        let comentariosarrayFind = object.some(
          (element) => element.commentsArray == this.username
        );
        if (!comentariosarrayFind) {
          object.commentsArray.push(this.username);
        }
      } else {
        commentArrayOfUsersEmail.push(this.username);
        object["comentariosArray"] = commentArrayOfUsersEmail;
      }
      let user_name = this.username.split("@")[0];
      let user_email = this.username;
      let currentDate = moment(new Date()).format("L");
      let currenttime = moment(new Date()).format("HH:mm");
      if (object.comentarios) {
        object.comentarios.push({
          name: user_name,
          comment: this.addComent,
          date: currentDate,
          time: currenttime,
          image: this.imageProfile,
          email: user_email,
        });
      } else {
        object["comentarios"] = [
          {
            name: user_name,
            comment: this.addComent,
            date: currentDate,
            time: currenttime,
            image: this.imageProfile,
            email: user_email,
          },
        ];
      }
      this.addComent = null;
      setTimeout(() => {
        let scrollToBottom = document.getElementById("commentSection");
        scrollToBottom.scrollTop = scrollToBottom.scrollHeight;
      }, 50);
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
            comentariosArray: object.comentariosArray,
          })
          .then(() => {
            console.log("updated");
          });
      });
    },
    resetModalll() {
      this.addComent = null;
    },
    hideComentsmodal(id) {
      this.$bvModal.hide(id);
    },
  },
  computed: {
    ...mapState(["selectedLan"]),
  },
};

Vue.prototype.$Back_es = "atrás";
Vue.prototype.$Back_pt = "Costas";
Vue.prototype.$Back_en = "Back";
Vue.prototype.$Date_es = "Fecha";
Vue.prototype.$Date_pt = "Encontro";
Vue.prototype.$Date_en = "Date";
Vue.prototype.$Interests_es = "Intereses";
Vue.prototype.$Interests_pt = "Interesses";
Vue.prototype.$Interests_en = "Interests";
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
/* article.card{
    height:100%;
} */
</style>