<template>
  <b-container fluid>
    <b-row class="bg-light align-items-center">
      <b-col class="col-10 mx-auto p-0">
        <div id="app" v-if="showTimelineItems">
          <v-app id="inspire">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown">
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
                <template v-slot:opposite>
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

export default {
  data() {
    return {
      dialog: false,
      showTimelineItems: true,
      timelineItems: [],
      messageWhenNoItems: "There are not items",
      wherequery: [],
    };
  },
  mounted: function () {
    (this.timelineItems = []),
      (this.wherequery = [
        { where: "fuenteId", querry: "==" },
        { where: "comentariosArray", querry: "array-contains" },
        { where: "ratingArrayAccounts", querry: "array-contains" },
      ]),
      setTimeout(() => {
        this.getNewscretedData();
      }, 100);
  },
  created() {},
  methods: {
    //...mapActions([""]),
    async getNewscretedData() {
      let user = firebase.auth().currentUser;
      let email = this.$route.params.email;//user.email;
      let noticasArray = [];
      let noticiasDB = await db.collection("noticias");
      let iterartion = 0;
      let arrayLength = this.wherequery.length;
      for (let i = 0; this.wherequery.length > i; i++) {
        let query = noticiasDB.where(
          this.wherequery[i].where,
          this.wherequery[i].querry,
          email
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
            this.showTimelineItems = noticasArray.length > 0 ? true : false;
            this.timelineItems = noticasArray.reverse();
            if (arrayLength == 3) {
              //this.shortThePara();
            }
          }.bind(this)
        );
      }
    },
    shortThePara() {
      setTimeout(() => {
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
      }, 3000);
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
/* .comment {
  width: 400px;
  background-color: #f0f0f0;
  margin: 10px;
} */
.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgb(0 0 0);
}
</style>