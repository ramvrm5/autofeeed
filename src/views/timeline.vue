<template>
  <b-container fluid>
    <b-row class="bg-light align-items-center">
      <b-col class="col-10 mx-auto p-0">
        <div id="app">
          <v-app id="inspire">
            <v-timeline>
              <v-timeline-item v-for="(timelineItem, index) in timelineItems"  :key="index" large>
                <template v-slot:icon>
                  <v-avatar>
                    <img
                      :src="timelineItem.image"
                    />
                  </v-avatar>
                </template>
                <template v-slot:opposite>
                  <span>{{timelineItem.from}}</span>
                </template>
                <v-card class="elevation-2">
                  <v-card-title class="headline"> {{timelineItem.title}} </v-card-title>
                  <v-card-text>{{timelineItem.content}}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-app>
        </div>
      </b-col>
    </b-row>
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

export default {
  data() {
    return {
      timelineItems: [],
      messageWhenNoItems: "There are not items",
    };
  },
  mounted: function () {
    (this.timelineItems = []),
      setTimeout(() => {
        this.getNewscretedData();
      }, 100);
  },
  created() {},
  methods: {
    //...mapActions([""]),
    async getNewscretedData() {
      let user = firebase.auth().currentUser;
      let email = user.email;
      let noticasArray = [];
      let noticiasDB = await db.collection("noticias");
      let wherequery = noticiasDB.where("fuenteId", "==", email);
      wherequery.get().then(async function (querySnapshot) {
        let documents = await querySnapshot.docs;
        for (let document of documents) {
          var data = document.data();
          var date = moment(data.fechaClasica).format("LL");
          noticasArray.push({
            from: date,
            title: data.titulo,
            subtitle: data.fuente,
            content: data.description,
            image: data.img,
          });
        }
      });
      this.timelineItems = noticasArray;
    },
  },
};
</script>