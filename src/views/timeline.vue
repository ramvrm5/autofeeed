<template>
  <b-container fluid>
    <b-row class="bg-light">
      <b-col
        class="col-12 col-sm-12 col-md-4 col-lg-3 border comments-scrollBar"
        style="overflow-y: scroll"
      >
        <div class="row">
          <div class="col-10 mx-auto text-center">
            <img
              class="border"
              :src="profileImage"
              alt="avtar"
              style="width: 60% !important; border-radius: 50%"
            />
          </div>
        </div>
        <div class="row" v-if="isCurrentUser">
          <div class="col-6 mx-auto">
            <button
              class="btn btn-primary btn-sm w-100"
              @click="onFollowButtonCLick"
            >
              {{ currentFollowingText }}
            </button>
          </div>
        </div>
        <div class="row mt-1">
          <!-- <div class="col-6">
            <i class="fa fa-users text-primary" aria-hidden="true"></i><b class="text-secondary"> {{followingUsersArray.length}} Followers</b>
          </div> -->
          <div class="col-6" v-if="!isCurrentUser">
            <i class="fa fa-users text-primary" aria-hidden="true"></i
            ><b class="text-secondary">
              {{ followingUsersArray.length }} Following</b
            >
          </div>
          <div class="col-6" v-if="isCurrentUser">
            <i class="fa fa-users text-primary" aria-hidden="true"></i
            ><b class="text-secondary">
              {{ followingOnUsersPageArray.length }} Following</b
            >
          </div>
          <div class="col-6">
            <i class="fa fa-pencil-square-o text-primary" aria-hidden="true"></i
            ><b class="text-secondary"> {{ totalCreatedPost }} Posts</b>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label class="text-secondary"><b>Name</b></label>
          </div>
          <div class="col-8">
            <h5 class="text-capitalize">{{ name }}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label class="text-secondary"><b>Country</b></label>
          </div>
          <div class="col-8">
            <h5 class="text-capitalize">{{ country }}</h5>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <label class="text-secondary"><b>Language</b></label>
          </div>
          <div class="col-8">
            <h5 class="text-capitalize">{{ language }}</h5>
          </div>
        </div>
      </b-col>
      <b-col
        class="col-12 col-sm-12 col-md-8 col-lg-9 comments-scrollBar"
        style="overflow-y: scroll"
      >
        <div id="app" v-if="showTimelineItems">
          <v-app id="inspire">
            <v-timeline dense>
              <v-timeline-item
                v-for="(timelineItem, index) in timelineItems"
                :key="index"
                large
              >
                <template v-slot:icon>
                  <v-avatar>
                    <img :src="timelineItem.image" />
                  </v-avatar>
                </template>
                <template>
                  <span>{{ timelineItem.from }}</span>
                </template>
                <v-card class="elevation-2">
                  <v-card-title class="headline">
                    <router-link
                      :to="{ name: 'Comment', params: { id: timelineItem.id } }"
                      >{{ timelineItem.title }}</router-link
                    >
                  </v-card-title>
                  <v-card-text class="comment more">{{
                    timelineItem.content
                  }}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-app>
        </div>
      </b-col>
    </b-row>
    <div v-if="!showTimelineItems">
      <h5 class="text-secondary mt-5 text-center">No post to show</h5>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/storage";
import Swal from "sweetalert2";
import $ from "jquery";
import { fas } from "@fortawesome/free-solid-svg-icons";
/* import $ from "jquery"; */

export default {
  data() {
    return {
      totalCreatedPost: 0,
      profileImage: "img/avatar-01.6b36b5f2.png",
      name: null,
      country: null,
      language: null,
      currentFollowingStatus: true,
      isCurrentUser: false,
      currentFollowingText: "Follow",
      dialog: false,
      followerfind: false,
      showTimelineItems: true,
      timelineItems: [],
      followingUsersArray: [],
      followingOnUsersPageArray: [],
      messageWhenNoItems: "There are not items",
      wherequery: [],
    };
  },
  mounted: function () {
    (this.timelineItems = []),
      (this.followingUsersArray = []),
      (this.followingOnUsersPageArray = []),
      (this.name = null),
      (this.country = null),
      (this.language = null),
      (this.currentFollowingStatus = true),
      (this.followerfind = false),
      (this.wherequery = [
        { where: "fuenteId", querry: "==", email: this.$route.params.email },
        {
          where: "comentariosArray",
          querry: "array-contains",
          email: this.$route.params.email,
        },
        {
          where: "ratingArrayAccounts",
          querry: "array-contains",
          email: this.$route.params.email,
        },
      ]),
      this.getCurrentUserInfo();
  },
  created() {
    let fecha2 = new Date();
    let email = this.$route.params.email;
    var imgurl2 =
      "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
      encodeURIComponent(email) +
      ".jpg?alt=media&time=" +
      fecha2.getTime();
    this.profileImage = imgurl2;
  },
  methods: {
    //...mapActions([""]),
    async getCurrentUserInfo() {
      let user = firebase.auth().currentUser;
      let email = this.$route.params.email;
      let FollowersArray = [];
      if (user.email == email) {
        this.isCurrentUser = false;
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then((doc) => {
            let datos = doc.data();
            this.name = datos.firstName + " " + datos.surname;
            this.country = datos.apellidos;
            this.language = datos.default_language;
            FollowersArray = datos.FollowersArray ? datos.FollowersArray : [];
            this.followingUsersArray = FollowersArray;
            if (FollowersArray && FollowersArray.length > 0) {
              FollowersArray.forEach(
                function (object, i, array) {
                  this.wherequery.push({
                    where: "fuenteId",
                    querry: "==",
                    email: object,
                  });
                }.bind(this)
              );
            }
            this.getNewscretedData();
          });
      } else {
        this.isCurrentUser = true;
        this.getCurrentUserfollowingStatus();
        db.collection("usuarios")
          .doc(email)
          .get()
          .then((doc) => {
            let datos = doc.data();
            this.name = datos.firstName + " " + datos.surname;
            this.country = datos.apellidos;
            this.language = datos.default_language;
            FollowersArray = datos.FollowersArray
              ? datos.FollowersArray
              : [];
            this.followingOnUsersPageArray = FollowersArray;
            if (this.currentFollowingStatus && this.followerfind) {
              this.currentFollowingText = "Unfollow";
              this.currentFollowingStatus = false;
            } else if (!this.currentFollowingStatus && !this.followerfind) {
              this.currentFollowingText = "Follow";
              this.currentFollowingStatus = true;
            }
            this.getNewscretedData();
          });
      }
    },
    getCurrentUserfollowingStatus() {
      let FollowersArray = [];
      let email = this.$route.params.email;
      let user = firebase.auth().currentUser;
      db.collection("usuarios")
        .doc(user.email)
        .get()
        .then((doc) => {
          let datos = doc.data();
          FollowersArray = datos.FollowersArray
            ? datos.FollowersArray
            : [];
          this.followingUsersArray = FollowersArray;
          if (FollowersArray && FollowersArray.length > 0) {
            this.followerfind = FollowersArray.some(
              (element) => email == element
            );
          }
        });
    },
    async getNewscretedData() {
      let user = firebase.auth().currentUser;
      let email = this.$route.params.email; //user.email;
      let noticasArray = [];
      let noticiasDB = await db.collection("noticias");
      let iterartion = 0;
      let arrayLength = this.wherequery.length;
      for (let i = 0; this.wherequery.length > i; i++) {
        let query = noticiasDB.where(
          this.wherequery[i].where,
          this.wherequery[i].querry,
          this.wherequery[i].email
        );
        query.get().then(
          async function (querySnapshot) {
            let documents = await querySnapshot.docs;
            for (let document of documents) {
              iterartion += i;
              var data = document.data();
              var date = moment(data.fechaClasica).format("LL");
              if (noticasArray.length > 0) {
                let arrayFind = noticasArray.some(
                  (element) => element.id == data.id
                );
                if (!arrayFind) {
                  noticasArray.push({
                    from: date,
                    id: data.id,
                    title: data.titulo,
                    subtitle: data.fuente,
                    content: data.cuerpo,
                    image: data.img,
                  });
                }
              } else {
                noticasArray.push({
                  from: date,
                  id: data.id,
                  title: data.titulo,
                  subtitle: data.fuente,
                  content: data.cuerpo,
                  image: data.img,
                });
              }
            }
            if (i == 0) {
              this.totalCreatedPost = noticasArray.length;
            }
            this.showTimelineItems = noticasArray.length > 0 ? true : false;
            this.timelineItems = noticasArray.reverse();
            if (arrayLength == i+1) {
              this.shortThePara();
            }
          }.bind(this)
        );
      }
    },
    onFollowButtonCLick() {
      let user = firebase.auth().currentUser;
      if (this.currentFollowingStatus) {
        this.currentFollowingText = "Unfollow";
        this.currentFollowingStatus = false;
        this.followingUsersArray.push(this.$route.params.email);
        db.collection("usuarios")
          .doc(user.email)
          .update({
            FollowersArray: this.followingUsersArray,
          })
          .then(() => {
            console.log("Updated in FollowersArray");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.currentFollowingText = "Follow";
        this.currentFollowingStatus = true;
        let followerOnWhichIndex = this.followingUsersArray.indexOf(
          this.$route.params.email
        );
        this.followingUsersArray.splice(followerOnWhichIndex, 1);
        db.collection("usuarios")
          .doc(user.email)
          .update({
            FollowersArray: this.followingUsersArray,
          })
          .then(() => {
            console.log("removed in FollowersArray");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    shortThePara() {
      //setTimeout(() => {
        $(document).ready(function () {
          var showChar = 100;
          var ellipsestext = "...";
          var moretext = "more";
          var lesstext = "less";
          $(".more").each(function () {
            var content = $(this).html();

            if (content.length > showChar) {
              var c = content.substr(0, showChar);
              var h = content.substr(showChar - 1, content.length - showChar);

              var html =
                c +
                '<span class="moreellipses">' +
                ellipsestext +
                '&nbsp;</span><span class="morecontent"><span>' +
                h +
                '</span>&nbsp;&nbsp;<a href="" class="morelink">' +
                moretext +
                "</a></span>";

              $(this).html(html);
            }
          });

          $(".morelink").click(function () {
            if ($(this).hasClass("less")) {
              $(this).removeClass("less");
              $(this).html(moretext);
            } else {
              $(this).addClass("less");
              $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
          });
        });
     // }, 3000);
    },
  },
};
</script>
<style>
a {
  color: #0254eb;
}
a:visited {
  color: #0254eb;
}
a.morelink {
  text-decoration: none;
  outline: none;
}
.morecontent span {
  display: none;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgb(0 0 0);
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
</style>