<template>
  <b-container fluid>
    <b-row style="height: 90vh !important" class="bg-light align-items-center">
      
        <div style="left: 25px;top: 60px;position: absolute;z-index: 9999;">
            <router-link to="/"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</router-link>
        </div>
      <b-col cols="8 mx-auto h-75">
        <form @submit.stop.prevent="handleSubmit">
          <!-- Title Start -->
          <b-form-group
            label-cols-sm="3"
            label-cols-lg="3"
            id="title-input"
            label="Titulo * :"
            label-for="title-input"
          >
            <b-form-input
              id="title-input"
              v-model="form.title"
              name="title-input"
              v-validate="'required'"
              :state="validateState('title-input')"
              aria-describedby="title-input-live-feedback-1"
              data-vv-as="titulo"
              placeholder="Entrar titulo"
            ></b-form-input>
            <b-form-invalid-feedback id="title-input-live-feedback-1">{{
              veeErrors.first("title-input")
            }}</b-form-invalid-feedback>
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
              v-validate="'required'"
              :state="validateState('description-input')"
              aria-describedby="description-input-live-feedback-2"
              data-vv-as="Cuerpo"
              placeholder="Entrar cuerpo"
            ></b-form-textarea>
            <b-form-invalid-feedback id="description-input-live-feedback-2">{{
              veeErrors.first("description-input")
            }}</b-form-invalid-feedback>
          </b-form-group>
          <!-- Description End -->

          <!-- Language Start -->
          <b-form-group
            label-cols-sm="3"
            label-cols-lg="3"
            id="Language-input"
            label="Idioma * :"
            label-for="Language-input"
          >
            <b-form-input
              id="Language-input"
              v-model="language"
              name="Language-input"
              disabled
            ></b-form-input>
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
              <kbd>Icono de retroceso / Cruz</kbd> para borrar la última
              etiqueta ingresada / Presione
              <kbd>Botón Entrar / Agregar</kbd> para agregar la etiqueta
              ingresada
            </b-form-text>
            <b-form-invalid-feedback id="Tags-input-live-feedback-2">{{
              veeErrors.first("Tags-input")
            }}</b-form-invalid-feedback>
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
            <b-form-invalid-feedback id="img-input-live-feedback-2">{{
              veeErrors.first("img-input-Image")
            }}</b-form-invalid-feedback>
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
              v-validate="{ url: { require_protocol: true } }"
              :state="validateState('url-input')"
              aria-describedby="url-input-live-feedback-2"
              data-vv-as="URL"
              placeholder="Agregar URL de noticias"
            ></b-form-input>
            <b-form-invalid-feedback id="url-input-live-feedback-2">{{
              veeErrors.first("url-input")
            }}</b-form-invalid-feedback>
          </b-form-group>
          <!-- Image End -->
          <div class="text-center">
            <b-button type="submit" size="lg" variant="primary"
              >Submit</b-button
            >
          </div>
        </form>
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
      submittedNews: [],
      language: "es",
      form: {
        title: null,
        description: null,
        tags: [],
        img: null,
        url: null,
      },
    };
  },
  created() {},
  methods: {
    ...mapActions(["saveCreatedNews"]),
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
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
        let fuente = this.$store.state.nombre
        debugger
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
        let temparray = this.submittedNews;
        let unique_id = db.collection("noticias").doc().id;
        db.collection("noticias")
          .doc(unique_id)
          .set({
            id: temparray[0].id,
            titulo: temparray[0].title,
            cuerpo: temparray[0].description,
            description: temparray[0].description,
            fecha: temparray[0].date,
            fechaClasica: temparray[0].classicDate,
            autor: temparray[0].source,
            fuente: fuente,
            fuenteId: temparray[0].sourceId,
            idioma: temparray[0].language,
            tags: temparray[0].tags,
            img: temparray[0].img,
            url: temparray[0].url,
          })
          .then((doc) => {
            this.resetModal();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "News Created Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              this.$router.push('/');
            }, 1600);
          })
          .catch((error) =>
            Swal.fire("News!", "Something went wrong!", "error")
          );
      });
    },
  },
};
</script>