<template>
  <div class="container-fluid">
    <!-- <h2 style="margin-top:1em"> Mis datos </h2> style="height: 65vh !important; width: 100%"-->
    <b-row class="align-items-center">
      <b-col class="col-11 col-sm-11 col-md-11 col-lg-11 vh-50 mx-auto">
        <form
          class="form-inline"
          @submit.prevent="
            editarTarea2({
              nombre: nombre,
              apellidos: apellidos,
              teléfono: teléfono,
              email: usuario.email,
              selectedLan: selectedLan,
              address: address,
              city: city,
              psCode: psCode,
              email: email,
            })
          "
        >
          <div
            class="input-group mt-2 mb-2 mr-sm-2 col-12 col-sm-12 col-md-12 col-lg-12"
          >
            <img
              style="
                max-width: 180px;
                border-radius: 15px;
                margin-left: auto;
                margin-right: auto;
              "
              onclick="document.getElementById('inputavatar').click()"
              id="imguser"
              src="../assets/avatar-01.png"
              onerror="this.onerror=null;this.src='https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2Favatar-01.png?alt=media&token=296aa880-816b-429a-bc08-b88197e6934f';"
            />
          </div>
          <span class="border border-dark rounded mb-2">
            <h4 class="ml-3 mt-3 mb-3">My account</h4>
            <div style="background-color: #f7fafc">
              <hr class="w-100 text-light" />
              <h6 class="heading-small text-muted mb-4 ml-3">
                USER INFORMATION
              </h6>
              <div class="row mx-auto">
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">Nick</div>
                  </div>
                  <input
                    @change="setNombrelocal"
                    id="nombreid"
                    class="form-control"
                    type="text"
                    v-model="nombre"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">Email</div>
                  </div>
                  <input
                    @change="setEmaillocal"
                    id="emailid"
                    ref="emailid"
                    class="form-control"
                    type="email"
                    v-model="email"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">Idioma</div>
                  </div>
                  <b-form-select
                    v-model="selectedLan"
                    id="selectedLanid"
                    ref="selectedLanid"
                    :options="options"
                    size="sm"
                    style="height: 37px !important"
                    @change="getlanguage"
                  ></b-form-select>
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">Teléfono</div>
                  </div>
                  <input
                    @change="setTeléfonolocal;"
                    id="teléfonoid"
                    ref="teléfonoid"
                    class="form-control"
                    type="number"
                    v-model="teléfono"
                  />
                </div>
              </div>

              <hr class="w-100 text-light" />
              <h6 class="heading-small text-muted mb-4 ml-3">
                CONTACT INFORMATION
              </h6>
              <div class="row mx-auto">
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-12 col-lg-12"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">Address</div>
                  </div>
                  <input
                    @change="setAddresslocal"
                    id="addressid"
                    ref="addressid"
                    class="form-control"
                    type="text"
                    v-model="address"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-4 col-lg-4"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">City</div>
                  </div>
                  <input
                    @change="setCitylocal"
                    id="cityid"
                    ref="cityid"
                    class="form-control"
                    type="text"
                    v-model="city"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-4 col-lg-4"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">País</div>
                  </div>
                  <input
                    @change="setApellidoslocal"
                    id="apellidosid"
                    ref="apellidosid"
                    class="form-control"
                    type="text"
                    v-model="apellidos"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-4 col-lg-4"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">Postal code</div>
                  </div>
                  <input
                    @change="setPsCodelocal;"
                    id="psCodeid"
                    ref="psCodeid"
                    class="form-control"
                    type="number"
                    v-model="psCode"
                  />
                </div>
              </div>
              <div class="row mx-auto">
                <div
                  class="input-group mt-2 col-0 col-sm-0 col-md-0 col-lg-5"
                ></div>
                <div
                  class="input-group mt-2 col-0 col-sm-0 col-md-0 col-lg-5"
                ></div>

                <div
                  class="input-group mt-2 col-12 col-sm-12 col-md-12 col-lg-2"
                >
                  <button
                    type="submit"
                    class="btn btn-primary mb-2"
                    style="margin-left: auto; margin-right: auto"
                  >
                    Actualizar datos
                  </button>
                </div>
              </div>
            </div>
          </span>

          <div style="display: none" class="input-field">
            <input
              accept="image/*;"
              @change="subiravatar(this)"
              id="inputavatar"
              name="uploaded_file"
              type="file"
              class="validate"
              style="display: none"
            />
          </div>
        </form>
      </b-col>
    </b-row>
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

export default {
  components: {},
  name: "Miperfil",
  imgurl3: "",
  data() {
    return {
      fields: [
        // A column that needs custom formatting
        { key: "name", label: "Intereses" },
        // A regular column
        { key: "Publicaciones", label: "Posts", class: "ancho_publicaciones2" },
        // A regular column
        { key: "alarma", label: "Texto alarma" },
      ],
      items: [
        { alarmas: 0, name: "Intel", alarma: "Subida", Publicaciones: 42 },
        { alarmas: 0, name: "Rusia", alarma: "IPO", Publicaciones: 36 },
        { alarmas: 0, name: "Novacyt", alarma: "Tests", Publicaciones: 73 },
        { alarmas: 0, name: "Ikea", alarma: "Ofertas", Publicaciones: 62 },
      ],
      /* selectedLan: this.$store.state.selectedLan, */
      options: [
        { value: "en", text: "English" },
        { value: "es", text: "Spanish" },
        { value: "pt", text: "Portuguese" },
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
    //console.log("path" ,(window.location.href ));
    //funciona console.log(this.$route.name);
    console.log("entramos", this.usuario.email);
    this.getDatos(this.usuario.email);

    let fecha2 = new Date();
    var imgurl2 =
      "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/dnis%2F" +
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
      "cambiarIdioma",
      "editarTarea2",
      "editarAlertas",
    ]),
    getlanguage() {
      store.commit(
        "setSelectedLan",
        document.getElementById("selectedLanid").value
      );
      //this.cambiarIdioma(this.selectedLan)
    },
    cambiarimagen(imagen) {
      document.getElementById("imguser").src = imagen;
    },
    subiravatar(file1) {
      console.log(file1);
      //var file = $('#inputavatar').prop('files')[0];
      var photo = document.getElementById("inputavatar");
      var file = photo.files[0]; //aqui se puede ver el size
      console.log(photo);
      console.log(file);

      let user = firebase.auth().currentUser;
      var email3 = user.email;
      console.log(email3);
      var storageRef = firebase.storage().ref();
      console.log("aqui estamos");
      console.log(storageRef);

      var image = new FormData();
      image.append("file", file);
      let fecha2 = new Date();
      var mountainsRef = storageRef.child("dnis/" + email3 + ".jpg");
      var imgurl2 =
        "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/dnis%2F" +
        encodeURIComponent(email3) +
        ".jpg?alt=media&time=" +
        fecha2.getTime();
      mountainsRef.put(file).then(function (snapshot) {
        console.log("Uploaded a blob or file!" + imgurl2);
        setTimeout(function () {
          document.getElementById("imguser").src = imgurl2;
          //document.getElementById('imgusermenu').src=imgurl2;
        }, 200);
      });
    },
    setPsCodelocal() {
      store.commit("setPsCode", document.getElementById("psCodeid").value);
    },
    setEmaillocal() {
      store.commit("setEmail", document.getElementById("emailid").value);
    },
    setCitylocal() {
      store.commit("setCity", document.getElementById("cityid").value);
    },
    setAddresslocal() {
      store.commit("setAddress", document.getElementById("addressid").value);
    },
    setNombrelocal() {
      store.commit("setNombre", document.getElementById("nombreid").value);
    },
    settagslocal(newTags) {
      console.log(newTags);
      store.commit("setTags", newTags);
    },
    setApellidoslocal() {
      store.commit("setApellido", document.getElementById("apellidosid").value);
    },
    setTeléfonolocal() {
      store.commit("setTeléfono", document.getElementById("teléfonoid").value);
    },
    setAlertalocal() {
      store.commit("setAlerta", document.getElementById("alertaid").value);
      store.editarAlertas(document.getElementById("alertaid").value);
      alert(
        "Alerta activada correctamente: " +
          document.getElementById("alertaid").value
      );
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
      "teléfono",
      "psCode",
      "email",
      "selectedLan",
      "address",
      "city",
      "tags",
      "alerta",
      "items2",
    ]),
    selectedLan: {
      get() {
        return this.$store.state.selectedLan;
      },
      set(value) {
        this.$store.commit("setSelectedLan", value);
      },
    },

    apellidos: {
      get() {
        return this.$store.state.apellidos;
      },
      set(value) {
        this.$store.commit("setApellido", value);
      },
    },

    nombre: {
      get() {
        return this.$store.state.nombre;
      },
      set(value) {
        this.$store.commit("setNombre", value);
      },
    },

    teléfono: {
      get() {
        return this.$store.state.teléfono;
      },
      set(value) {
        this.$store.commit("setTeléfono", value);
      },
    },

    address: {
      get() {
        return this.$store.state.address;
      },
      set(value) {
        this.$store.commit("setAddress", value);
      },
    },

    city: {
      get() {
        return this.$store.state.city;
      },
      set(value) {
        this.$store.commit("setCity", value);
      },
    },

    email: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("setEmail", value);
      },
    },

    psCode: {
      get() {
        return this.$store.state.psCode;
      },
      set(value) {
        this.$store.commit("setPsCode", value);
      },
    },
  },
};
</script>
