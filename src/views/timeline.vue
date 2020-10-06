<template>
  <b-container fluid>
    <b-row style="height: 90vh !important" class="bg-light align-items-center">
      <b-col style="height: 80vh !important" class="col-10 mx-auto">
        <VueTimeline :timeline-items="timelineItems" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VueTimeline from "bs-vue-timeline";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/storage";
import Swal from "sweetalert2";
import $ from "jquery";

export default {
  components: {
    VueTimeline,
  },
  data() {
    return {
      timelineItems: [],
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
          var date = new Date(data.fechaClasica);
          var year = date.getFullYear()
          var day = date.getMonth()
          var dateToday = new Date();
          var yearToday = dateToday.getFullYear()
          var dayToday = dateToday.getMonth()
          noticasArray.push({
            from: new Date(year,day),
            to: new Date(yearToday,dayToday),
            title: data.titulo,
            subtitle: data.fuente,
            content: data.description,
            image: "timeline.png",
          });
        }
      });
      this.timelineItems = noticasArray;
      console.log(noticasArray);
    },
  },
};
</script>