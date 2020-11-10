<template>
  <b-container fluid>
    <b-row style="height: 90vh !important" class="align-items-center">
      
        <div style="left: 25px;top: 113px;position: absolute;z-index: 9999;">
            <a style="color: #007bff;cursor: pointer;" @click="$router.go(-1)"><i class="fa fa-chevron-left" aria-hidden="true"></i> {{selectedLan == 'es'
              ? $Back_es
              : selectedLan == 'pt'
              ? $Back_pt
              : selectedLan == 'ar'
              ? $Back_ar
              : $Back_en}}</a>
        </div>
      <b-col cols="8 mx-auto h-75">
        <form @submit.stop.prevent="handleSubmit">
          <!-- Title Start -->
          <b-form-group
            label-cols-sm="3"
            label-cols-lg="3"
            id="title-input"
            :label="
            selectedLan == 'es'
              ? $Title_es + '* :'
              : selectedLan == 'pt'
              ? $Title_pt + '* :'
              : selectedLan == 'ar'
              ? $Title_ar + '* :'
              : $Title_en+ ' * :'"
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
              :placeholder="
            selectedLan == 'es'
              ? $Enter_title_es
              : selectedLan == 'pt'
              ? $Enter_title_pt
              : selectedLan == 'ar'
              ? $Enter_title_ar
              : $Enter_title_en"
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
            :label="
            selectedLan == 'es'
              ? $description_es +' * :'
              : selectedLan == 'pt'
              ? $description_pt +' * :'
              : selectedLan == 'ar'
              ? $description_ar +' * :'
              : $description_en +' * :'"
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
              :placeholder="
            selectedLan == 'es'
              ? $Enter_description_es
              : selectedLan == 'pt'
              ? $Enter_description_pt
              : selectedLan == 'ar'
              ? $Enter_description_ar
              : $Enter_description_en"
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
            :label="
            selectedLan == 'es'
              ? $Language_es +' * :'
              : selectedLan == 'pt'
              ? $Language_pt +' * :'
              : selectedLan == 'ar'
              ? $Language_ar +' * :'
              : $Language_en +' * :'"
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
            :label="
            selectedLan == 'es'
              ? $Tags_es +' * :'
              : selectedLan == 'pt'
              ? $Tags_pt +' * :'
              : selectedLan == 'ar'
              ? $Tags_ar +' * :'
              : $Tags_en +' * :'"
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
              :placeholder="
            selectedLan == 'es'
              ? $Add_tag_es
              : selectedLan == 'pt'
              ? $Add_tag_pt
              : selectedLan == 'ar'
              ? $Add_tag_ar
              : $Add_tag_en"
            ></b-form-tags>
            <b-form-text id="tags-remove-on-delete-help" class="mt-2">
              {{selectedLan == 'es'
              ? $Tags1_es
              : selectedLan == 'pt'
              ? $Tags1_pt
              : selectedLan == 'ar'
              ? $Tags1_a
              : $Tags1_en}}
              <kbd>{{selectedLan == 'es'
              ? $Tags2_es
              : selectedLan == 'pt'
              ? $Tags2_pt
              : selectedLan == 'ar'
              ? $Tags2_ar
              : $Tags2_en}}</kbd> {{selectedLan == 'es'
              ? $Tags3_es
              : selectedLan == 'pt'
              ? $Tags3_pt
              : selectedLan == 'ar'
              ? $Tags3_ar
              : $Tags3_en}}
              <kbd>{{selectedLan == 'es'
              ? $Tags4_es
              : selectedLan == 'pt'
              ? $Tags4_pt
              : selectedLan == 'ar'
              ? $Tags4_ar
              : $Tags4_en}}</kbd> {{selectedLan == 'es'
              ? $Tags5_es
              : selectedLan == 'pt'
              ? $Tags5_pt
              : selectedLan == 'ar'
              ? $Tags5_ar
              : $Tags5_en}}
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
            :label="selectedLan == 'es'
              ? $Image_es
              : selectedLan == 'pt'
              ? $Image_pt
              : selectedLan == 'ar'
              ? $Image_ar
              : $Image_en"
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
              :placeholder="selectedLan == 'es'
              ? $Choose_a_file_or_drop_es
              : selectedLan == 'pt'
              ? $Choose_a_file_or_drop_pt
              : selectedLan == 'ar'
              ? $Choose_a_file_or_drop_ar
              : $Choose_a_file_or_drop_en"
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
              :placeholder="selectedLan == 'es'
              ? $Add_news_URL_es
              : selectedLan == 'pt'
              ? $Add_news_URL_pt
              : selectedLan == 'ar'
              ? $Add_news_URL_ar
              : $Add_news_URL_en"
            ></b-form-input>
            <b-form-invalid-feedback id="url-input-live-feedback-2">{{
              veeErrors.first("url-input")
            }}</b-form-invalid-feedback>
          </b-form-group>
          <!-- Image End -->

          <!-- URL Start -->
          <b-form-group
            label-cols-sm="3"
            label-cols-lg="3"
            id="typeOfPost-input"
            label="Categoría *"
            label-for="typeOfPost-input"
          >
          <b-form-select
            id="typeOfPost-input"
            v-model="form.typeOfPost"
            name="typeOfPost-input"
            v-validate="'required'"
            :state="validateState('typeOfPost-input')"
            aria-describedby="typeOfPost-input-live-feedback-2"
            data-vv-as="Type Of Post"
            :options="
              selectedLan == 'es'
                ? $typeOfPost_es
                : selectedLan == 'pt'
                ? $typeOfPost_pt
                : selectedLan == 'ar'
                ? $typeOfPost_ar
                : $typeOfPost_en
            "
          ></b-form-select>
            <b-form-invalid-feedback id="typeOfPost-input-live-feedback-2">{{
              veeErrors.first("typeOfPost-input")
            }}</b-form-invalid-feedback>
          </b-form-group>
          <!-- Image End -->
          <div class="text-center">
            <b-button type="submit" class="mb-2" style="color:white" size="lg" variant="primary"
              >{{selectedLan == 'es'
              ? $Submit_es
              : selectedLan == 'pt'
              ? $Submit_pt
              : selectedLan == 'ar'
              ? $Submit_ar
              : $Submit_en}}</b-button
            >
          </div>
        </form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from 'vue'
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
        typeOfPost: "News",
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
          typeOfPost: null,
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
          typeOfPost: this.form.typeOfPost,
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
            typeOfPost: temparray[0].typeOfPost,
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
  computed: {
    ...mapState(["selectedLan"]),
  },
};

///Contants

Vue.prototype.$Title_es = "Titulo";
Vue.prototype.$Title_pt = "Título";
Vue.prototype.$Title_en = "Title";
Vue.prototype.$Title_ar = "عنوان";
Vue.prototype.$Enter_title_es = "Entrar titulo";
Vue.prototype.$Enter_title_pt = "Digite o título";
Vue.prototype.$Enter_title_en = "Enter title";
Vue.prototype.$Enter_title_ar = "أدخل العنوان";
Vue.prototype.$description_es = "descripción";
Vue.prototype.$description_pt = "descrição";
Vue.prototype.$description_en = "description";
Vue.prototype.$description_ar = "وصف";
Vue.prototype.$Enter_description_es = "Entrar descripción";
Vue.prototype.$Enter_description_pt = "Insira a descrição";
Vue.prototype.$Enter_description_en = "Enter description";
Vue.prototype.$Enter_description_ar = "أدخل الوصف";
Vue.prototype.$Language_es = "Idioma";
Vue.prototype.$Language_pt = "Língua";
Vue.prototype.$Language_en = "Language";
Vue.prototype.$Language_ar = "لغة";
Vue.prototype.$Tags_es = "Etiquetas";
Vue.prototype.$Tags_pt = "Tag";
Vue.prototype.$Tags_en = "Tags";
Vue.prototype.$Tags_ar = "العلامات";
Vue.prototype.$Add_tag_es = "Añadir etiqueta";
Vue.prototype.$Add_tag_pt = "Adicionar etiqueta";
Vue.prototype.$Add_tag_en = "Add tag";
Vue.prototype.$Add_tag_ar = "إضافة علامة";
Vue.prototype.$Tags1_es = "Prensa";
Vue.prototype.$Tags1_pt = "pressione";
Vue.prototype.$Tags1_en = "Press";
Vue.prototype.$Tags1_ar = "صحافة";
Vue.prototype.$Tags2_es = "Icono de retroceso / Cruz";
Vue.prototype.$Tags2_pt = "Retrocesso / ícone de cruz";
Vue.prototype.$Tags2_en = "Backspace / Cross Icon";
Vue.prototype.$Tags2_ar = "مسافة للخلف / عبر أيقونة";
Vue.prototype.$Tags3_es = "para borrar la última etiqueta ingresada / Presione";
Vue.prototype.$Tags3_pt = "para excluir a última tag inserida / Pressione";
Vue.prototype.$Tags3_en = "to delete the last tag entered / Press";
Vue.prototype.$Tags3_ar = "لحذف آخر علامة تم إدخالها / صحافة";
Vue.prototype.$Tags4_es = "Botón Entrar / Agregar";
Vue.prototype.$Tags4_pt = "Botão Entrar / Adicionar";
Vue.prototype.$Tags4_en = "Enter / Add button";
Vue.prototype.$Tags4_ar = "أدخل / زر الإضافة";
Vue.prototype.$Tags5_es = "para agregar la etiqueta ingresada";
Vue.prototype.$Tags5_pt = "para adicionar a tag inserida";
Vue.prototype.$Tags5_en = "to add the entered tag";
Vue.prototype.$Tags5_ar = "لإضافة العلامة المدخلة";
Vue.prototype.$Image_es = "Imagen";
Vue.prototype.$Image_pt = "Imagem";
Vue.prototype.$Image_en = "Image";
Vue.prototype.$Image_ar = "صورة";
Vue.prototype.$Choose_a_file_or_drop_es = "Elija un archivo o suéltelo aquí";
Vue.prototype.$Choose_a_file_or_drop_pt = "Escolha um arquivo ou solte-o aqui";
Vue.prototype.$Choose_a_file_or_drop_en = "Choose a file or drop it here";
Vue.prototype.$Choose_a_file_or_drop_ar = "اختر ملفًا أو أسقطه هنا";
Vue.prototype.$URL = "URL";
Vue.prototype.$Add_news_URL_es = "Agregar URL de noticias";
Vue.prototype.$Add_news_URL_pt = "Adicionar URL de notícias";
Vue.prototype.$Add_news_URL_en = "Add news URL";
Vue.prototype.$Add_news_URL_ar = "إضافة عنوان URL للأخبار";
Vue.prototype.$Submit_es = "Enviar";
Vue.prototype.$Submit_pt = "Enviar";
Vue.prototype.$Submit_en = "Submit";
Vue.prototype.$Submit_ar = "إرسال";
Vue.prototype.$Back_es = "atrás";
Vue.prototype.$Back_pt = "Costas";
Vue.prototype.$Back_en = "Back";
Vue.prototype.$Back_ar = "عودة";
Vue.prototype.$typeOfPost_es = [
  { text: "Opinión", value: "Opinion" },
  { text: "Análisis", value: "Analysis" },
  { text: "Noticias", value: "News" },
];
Vue.prototype.$typeOfPost_pt = [
  { text: "Opinião", value: "Opinion" },
  { text: "Análise", value: "Analysis" },
  { text: "Notícia", value: "News" },
];
Vue.prototype.$typeOfPost_en = [
  { text: "Opinion", value: "Opinion" },
  { text: "Analysis", value: "Analysis" },
  { text: "News", value: "News" },
];
Vue.prototype.$typeOfPost_ar = [
  { text: "رأي", value: "Opinion" },
  { text: "تحليل", value: "Analysis" },
  { text: "أخبار", value: "News" },
];
</script>