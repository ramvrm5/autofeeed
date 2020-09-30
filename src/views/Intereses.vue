<template>
  <div class="container">
    <br />
    <h2>Mis intereses</h2>
    <form
      class="form-inline"
      @submit.prevent="editarTags({ tags: tags, email: usuario.email })"
    >
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Tags</div>
        </div>

        <div>
          <vue-tags-input
            id="tagsid"
            v-model="tag"
            :tags="tags"
            :autocomplete-items="filteredItems"
            :validation="validation"
            :addOnKey="[9, 13, 188]"
            @tags-changed="
              (newTags) => {
                settagslocal(newTags);
                tags = newTags;
              }
            "
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary mb-2">Actualizar</button>
    </form>
    <br />

    <h2>Sistema de alertas</h2>

    <p>
      Recuerda que si estás pendiente de alguna noticia en concreto podemos
      hacerlo por ti, tan solo escribe el texto que quieras buscar en todas tus
      noticias y nosotros nos encargamos de avisarte.
    </p>

    <form
      style="display: none"
      class="form-inline"
      @submit.prevent="editarAlertas({ alerta: alerta })"
    >
      <div class="input-group mb-2 mr-sm-2" style="min-width: 70%">
        <div class="input-group-prepend">
          <div class="input-group-text">Alerta actual</div>
        </div>
        <input
          @change="setAlertalocal"
          id="alertaid"
          ref="alertaid"
          class="form-control"
          type="text"
          v-model="alerta"
        />
      </div>

      <button type="submit" class="btn btn-primary mb-2">Añadir alerta</button>
    </form>

    <!-- COLUMNA NUEVA CON INTERESES Y ALARMAS -->
    <div>
      <b-table small :fields="fields" :items="items2" responsive="sm">
        <!-- A custom formatted column -->
        <template v-slot:cell(name)="data">
          <b onchange='alert("Hola")' id="tagtabla">{{ data.value }}</b>
          <!--<input v-model="data.value" size="5" type="text" class="table-control form-control" >-->
        </template>
        <template v-slot:cell(typeOfTag)="data">
          <button :id="'button_'+data.index" class="btn btn-primary w-50" @click="onToggle(data.value,data.index)">
            {{data.value?data.value : "Leisure"}}
          </button>
        </template>
        <!-- descomentar A virtual composite column 
      <template  v-slot:cell(nameage)="data" class="ancho">
        {{ data.item.alarmas }} 
      </template>-->

        <!-- TEXTO DE ALARMA -->
        <template v-slot:cell(alarma)="data">
          <div style="width: 100%">
            <input
              v-model="data.value"
              size="5"
              type="text"
              class="table-control form-control"
              style="width: 49%; float: left; margin-right: 3%"
            />
            <button
              class="btn btn-primary mb-2"
              style="width: 48%"
              @click="
                setAlertalocal2(data.value, data.item.name, data.item.typeOfTag,data.index)
              "
            >
              Activar
            </button>
          </div>
        </template>
      </b-table>
    </div>
    <!-- FIN DE COLUMNA NUEVA CON INTERESES Y ALARMAS -->

    <div class="text-center">
      <b-spinner
        id="cargandoid"
        style="display: none; width: 3rem; height: 3rem"
        variant="primary"
        label="Text Centered"
      ></b-spinner>
    </div>

    <div id="barraid" class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 0%"
      >
        <span class="sr-only">70% Complete</span>
      </div>
    </div>

    <p>Sesión iniciada como: {{ usuario.email }}</p>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import store from "../store";
import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/storage";
import $ from "jquery";


export default {
  components: {
    VueTagsInput,
  },
  name: "Miperfil",
  imgurl3: "",
  data() {
    return {
      fields: [
        // A column that needs custom formatting
        { key: "name", label: "Intereses" },
        { key: "typeOfTag", label: "Type of tag" },
        // A regular column
        //descomentar { key: 'Publicaciones', label: 'Posts', class: 'ancho_publicaciones2' },
        // A regular column
        { key: "alarma", label: "Texto alarma" },
      ],
      items: [
        { alarmas: 0, name: "Intel", alarma: "Subida", Publicaciones: 42 },
        { alarmas: 0, name: "Rusia", alarma: "IPO", Publicaciones: 36 },
        { alarmas: 0, name: "Novacyt", alarma: "Tests", Publicaciones: 73 },
        { alarmas: 0, name: "Ikea", alarma: "Ofertas", Publicaciones: 62 },
      ],

      id: this.$route.params.id,
      //nombre: this.state.nombre,
      //apellidos: this.state.apellidos,
      tag: "",
      //tags: [],
      autocompleteItems: [
        {
          text: "grafeno",
        },
        {
          text: "investigación",
        },
        {
          text: "china",
        },
        {
          text: "vacuna",
        },
        {
          text: "China",
        },
      ],

      validation: [
        {
          classes: "min-length",
          rule: (tag) => tag.text.length < 3,
        },
        {
          classes: "no-numbers",
          rule: /^([^0-9]*)$/,
        },
        {
          classes: "avoid-item",
          rule: /^(?!Cannot).*$/,
          disableAdd: true,
        },
        {
          classes: "no-braces",
          rule: ({ text }) =>
            text.indexOf("{") !== -1 || text.indexOf("}") !== -1,
        },
      ],
    };
  },
  created() {
    this.getDatos(this.usuario.email);

    let fecha2 = new Date();
    var imgurl2 =
      "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
      encodeURIComponent(this.usuario.email) +
      ".jpg?alt=media&time=" +
      fecha2.getTime();
    this.imgurl3 = imgurl2;
    //store.dispatch('getDatos', this.usuario.email)
  },
  methods: {
    ...mapActions([
      "detectarUsuario",
      "getDatos",
      "editarTags",
      "editarTarea2",
      "editarAlertas",
    ]),
    cambiarimagen(imagen) {
      setTimeout(() => {
        document.getElementById("imguser").src = imagen;
      }, 500);
    },
    subiravatar(file1) {
      //var file = $('#inputavatar').prop('files')[0];
      var photo = document.getElementById("inputavatar");
      var file = photo.files[0]; //aqui se puede ver el size

      let user = firebase.auth().currentUser;
      var email3 = user.email;
      var storageRef = firebase.storage().ref();

      var image = new FormData();
      image.append("file", file);
      let fecha2 = new Date();
      var mountainsRef = storageRef.child("avatares/" + email3 + ".jpg");
      var imgurl2 =
        "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
        encodeURIComponent(email3) +
        ".jpg?alt=media&time=" +
        fecha2.getTime();
      mountainsRef.put(file).then(function (snapshot) {
        setTimeout(function () {
          document.getElementById("imguser").src = imgurl2;
          //document.getElementById('imgusermenu').src=imgurl2;
        }, 200);
      });
    },
    setNombrelocal() {
      store.commit("setNombre", document.getElementById("nombreid").value);
    },
    settagslocal(newTags) {
      store.commit("setTags", newTags);
    },
    setApellidoslocal() {
      store.commit("setApellido", document.getElementById("apellidosid").value);
    },
    setAlertalocal() {
      store.commit("setAlerta", document.getElementById("alertaid").value);
      store.editarAlertas(document.getElementById("alertaid").value);
      alert(
        "Alerta activada correctamente: " +
          document.getElementById("alertaid").value
      );
    },
    onToggle(value,index) {
      let btnvalue = $('#button_'+index).text().trim()//value?value:"Leisure"
      if (btnvalue == "Leisure") {
        btnvalue = "Business";
        value = "Business";
        $('#button_'+index).text("Business")
      } else if (btnvalue == "Business") {
        btnvalue = "Leisure";
        value = "Leisure";
        $('#button_'+index).text("Leisure")
      }
    },
    setAlertalocal2(alarma, elemento, typeOfTag,index) {
      //typeOfTag = typeOfTag ? typeOfTag : "Leisure";
      typeOfTag = $('#button_'+index).text().trim();
      let repetido = 0;
      let nueva_alerta = "";
      if (this.alerta) {
        let alertarecorrer = this.alerta;
        let alertarecorrer2 = alertarecorrer.split("//");

        alertarecorrer2.forEach((element) => {
          let alertarecorrer3 = element.split(";");

          if (alertarecorrer3[1] == elemento) {
            repetido = 1;
            nueva_alerta += "//" + alarma + ";" + elemento + ";" + typeOfTag;
          } else {
            if (element) {
              nueva_alerta += "//" + element;
            }
          }
        });
      }
      if (repetido == 0 && this.alerta) {
        nueva_alerta =
          this.alerta + "//" + alarma + ";" + elemento + ";" + typeOfTag;
      } else if (repetido == 0 && !this.alerta) {
        nueva_alerta = "//" + alarma + ";" + elemento + ";" + typeOfTag;
      }
      let found = 0;
      if (this.alertaObject.length > 0) {
        this.alertaObject.forEach(
          function (object, i, array) {
            if (object.tag == elemento) {
              found = 1;
              this.alertaObject[i].alert = alarma;
              this.alertaObject[i].tag = elemento;
              this.alertaObject[i].typeOfTag = typeOfTag;
            }
          }.bind(this)
        );
      } else if (this.alertaObject.length == 0) {
        this.alertaObject.push({
          alert: alarma,
          tag: elemento,
          typeOfTag: typeOfTag,
        });
        found = 1;
      }
      if (found == 0) {
        this.alertaObject.push({
          alert: alarma,
          tag: elemento,
          typeOfTag: typeOfTag,
        });
      }
      this.alertaObject;
      nueva_alerta;
      store.commit("setAlerta", nueva_alerta);

      db.collection("usuarios")
        .doc(this.usuario.email)
        .update({
          alerta: nueva_alerta,
          alertaObject: this.alertaObject,
        })
        .then(() => {
          location.reload(true);
        });
    },
    ValidateSize(file) {},
  },
  mounted: function () {
    this.cambiarimagen(this.imgurl3); //method1 will execute at pageload
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter((i) => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    ...mapState([
      "usuario",
      "nombre",
      "apellidos",
      "tags",
      "alerta",
      "alertaObject",
      "items2",
    ]),
  },
};
</script>
