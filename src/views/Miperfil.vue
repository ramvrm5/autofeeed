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
              firstName: firstName,
              surname: surname,
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
          <span class="border rounded mb-2 clasecentro">
            <h4 class="ml-3 mt-3 mb-3">
              {{
                selectedLan == "es"
                  ? $My_account_es
                  : selectedLan == "pt"
                  ? $My_account_pt
                  : $My_account_en
              }}
            </h4>
            <div style="background-color: #f7fafc">
              <hr class="w-100 text-light" />
              <h6 class="heading-small text-muted mb-4 ml-3">
                {{
                  selectedLan == "es"
                    ? $USER_DATA_es
                    : selectedLan == "pt"
                    ? $USER_DATA_pt
                    : $USER_DATA_en
                }}
              </h6>
              <div class="row mx-auto">
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text" style="min-width: 4em">
                      {{
                        selectedLan == "es"
                          ? $Name_es
                          : selectedLan == "pt"
                          ? $Name_pt
                          : $Name_en
                      }}
                    </div>
                  </div>
                  <input
                    @change="setFirstNamelocal"
                    id="firstNameid"
                    class="form-control"
                    type="text"
                    v-model="firstName"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text" style="min-width: 4em">
                      {{
                        selectedLan == "es"
                          ? $Surname_es
                          : selectedLan == "pt"
                          ? $Surname_pt
                          : $Surname_en
                      }}
                    </div>
                  </div>
                  <input
                    @change="setSurnamelocal"
                    id="surnameid"
                    class="form-control"
                    type="text"
                    v-model="surname"
                  />
                </div>
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text" style="min-width: 4em">
                      {{
                        selectedLan == "es"
                          ? $Nick_es
                          : selectedLan == "pt"
                          ? $Nick_pt
                          : $Nick_en
                      }}
                    </div>
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
                    <div class="input-group-text">
                      {{
                        selectedLan == "es"
                          ? $Email_es
                          : selectedLan == "pt"
                          ? $Email_pt
                          : $Email_en
                      }}
                    </div>
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
                    <div class="input-group-text">
                      {{
                        selectedLan == "es"
                          ? $Language_es
                          : selectedLan == "pt"
                          ? $Language_pt
                          : $Language_en
                      }}
                    </div>
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
                    <div class="input-group-text">
                      {{
                        selectedLan == "es"
                          ? $Phone_es
                          : selectedLan == "pt"
                          ? $Phone_pt
                          : $Phone_en
                      }}
                    </div>
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
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-6 col-lg-6"
                >
                  <div class="input-group-prepend">
                    <div
                      class="input-group-text"
                      onclick="document.getElementById('subimtcardId').click()"
                    >
                      {{
                        selectedLan == "es"
                          ? $Proof_of_residence_es
                          : selectedLan == "pt"
                          ? $Proof_of_residence_pt
                          : $Proof_of_residence_en
                      }}
                    </div>
                  </div>
                  <input
                    accept="image/*;"
                    @change="subimtcardId(this)"
                    id="subimtcardId"
                    name="uploaded_file"
                    type="file"
                    class="validate"
                    style="display: none"
                  />
                  <small class="mt-2 ml-3">{{ name_card_id }}</small>
                </div>
              </div>

              <hr class="w-100 text-light" />
              <h6 class="heading-small text-muted mb-4 ml-3">
                {{
                  selectedLan == "es"
                    ? $CONTACT_INFORMATION_es
                    : selectedLan == "pt"
                    ? $CONTACT_INFORMATION_pt
                    : $CONTACT_INFORMATION_en
                }}
              </h6>
              <div class="row mx-auto">
                <div
                  class="input-group mt-2 mb-2 col-12 col-sm-12 col-md-12 col-lg-12"
                >
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      {{
                        selectedLan == "es"
                          ? $Direction_es
                          : selectedLan == "pt"
                          ? $Direction_pt
                          : $Direction_en
                      }}
                    </div>
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
                    <div class="input-group-text">
                      {{
                        selectedLan == "es"
                          ? $City_es
                          : selectedLan == "pt"
                          ? $City_pt
                          : $City_en
                      }}
                    </div>
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
                    <div class="input-group-text" style="min-width: 4em">
                      {{
                        selectedLan == "es"
                          ? $country_es
                          : selectedLan == "pt"
                          ? $country_pt
                          : $country_en
                      }}
                    </div>
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
                    <div class="input-group-text">
                      {{
                        selectedLan == "es"
                          ? $Postal_Code_es
                          : selectedLan == "pt"
                          ? $Postal_Code_pt
                          : $Postal_Code_en
                      }}
                      </div>
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
                    @click="cambiarcontraseña(email_password)"
                    class="btn btn-primary mb-2"
                    style="margin-left: auto; margin-right: auto;color:white"
                  >
                      {{
                        selectedLan == "es"
                          ? $password_es
                          : selectedLan == "pt"
                          ? $password_pt
                          : $password_en
                      }}
                  </button>
                  
                  <button
                    type="submit"
                    class="btn btn-primary mb-2"
                    style="margin-left: auto; margin-right: auto;color:white"
                  >
                      {{
                        selectedLan == "es"
                          ? $Update_data_es
                          : selectedLan == "pt"
                          ? $Update_data_pt
                          : $Update_data_en
                      }}
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
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import store from "../store";
import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  components: {},
  email: "",
  name: "Miperfil",
  imgurl3: "",
  data() {
    return {
      email_password: "",
      name_card_id: null,
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
    this.email = this.usuario.email;
    this.getDatos(this.usuario.email);

    let fecha2 = new Date();
    var imgurl2 =
      "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
      encodeURIComponent(this.usuario.email) +
      ".jpg?alt=media&time=" +
      fecha2.getTime();
    this.imgurl3 = imgurl2;
  },
  methods: {
    ...mapActions([
      "detectarUsuario",
      "getDatos",
      "editarTags",
      "cambiarIdioma",
      "editarTarea2",
      "editarAlertas",
      "cambiarcontraseña"
    ]),
    cambiarimagen(imagen) {
      setTimeout(() => {
        document.getElementById("imguser").src = imagen;
      }, 100);
    },
    subimtcardId(file1) {
      var photo = document.getElementById("subimtcardId");
      var file = photo.files[0];
      this.name_card_id = file.name;
      let user = firebase.auth().currentUser;
      var email3 = user.email;
      debugger;
      var storageRef = firebase.storage().ref();

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
      });
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
      var mountainsRef = storageRef.child("avatares/" + email3 + ".jpg");
      var imgurl2 =
        "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
        encodeURIComponent(email3) +
        ".jpg?alt=media&time=" +
        fecha2.getTime();
      mountainsRef.put(file).then(function (snapshot) {
        console.log("Uploaded a blob or file!" + imgurl2);
        setTimeout(function () {
          document.getElementById("imguser").src = imgurl2;
        }, 200);
      });
    },
    getlanguage() {
      store.commit(
        "setSelectedLan",
        document.getElementById("selectedLanid").value
      );
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
    setFirstNamelocal() {
      store.commit(
        "setFirstName",
        document.getElementById("firstNameid").value
      );
    },
    setSurnamelocal() {
      store.commit("setSurname", document.getElementById("surnameid").value);
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
    this.email_password = this.usuario.email;
    this.cambiarimagen(this.imgurl3); //method1 will execute at pageload
    document.getElementById("emailid").value = this.usuario.email;
    document.getElementById("emailid").placeholder = this.usuario.email;
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
      "firstName",
      "surname",
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
    surname: {
      get() {
        return this.$store.state.surname;
      },
      set(value) {
        this.$store.commit("setSurname", value);
      },
    },
    firstName: {
      get() {
        return this.$store.state.firstName;
      },
      set(value) {
        this.$store.commit("setFirstName", value);
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

//Constants
Vue.prototype.$My_account_es = "Mi cuenta";
Vue.prototype.$My_account_pt = "Minha conta";
Vue.prototype.$My_account_en = "My account";
Vue.prototype.$USER_DATA_es = "DATOS DE USUARIO";
Vue.prototype.$USER_DATA_pt = "DADOS DO USUÁRIO";
Vue.prototype.$USER_DATA_en = "USER DATA";
Vue.prototype.$Name_es = "Nombre";
Vue.prototype.$Name_pt = "Nome";
Vue.prototype.$Name_en = "Name";
Vue.prototype.$Surname_es = "Apellido";
Vue.prototype.$Surname_pt = "Sobrenome";
Vue.prototype.$Surname_en = "Surname";
Vue.prototype.$Nick_es = "Mella";
Vue.prototype.$Nick_pt = "usuario";
Vue.prototype.$Nick_en = "Nick";
Vue.prototype.$Email_es = "Correo electrónico";
Vue.prototype.$Email_pt = "Correio eletrônico";
Vue.prototype.$Email_en = "Email";
Vue.prototype.$Language_es = "Idioma";
Vue.prototype.$Language_pt = "Língua";
Vue.prototype.$Language_en = "Language";
Vue.prototype.$Phone_es = "Teléfono";
Vue.prototype.$Phone_pt = "telefone";
Vue.prototype.$Phone_en = "Phone";
Vue.prototype.$Proof_of_residence_es = "Prueba de residencia";
Vue.prototype.$Proof_of_residence_pt = "Comprovante de residência";
Vue.prototype.$Proof_of_residence_en = "Proof of residence";
Vue.prototype.$CONTACT_INFORMATION_es = "INFORMACIÓN DE CONTACTO";
Vue.prototype.$CONTACT_INFORMATION_pt = "INFORMAÇÃO DE CONTATO";
Vue.prototype.$CONTACT_INFORMATION_en = "CONTACT INFORMATION";
Vue.prototype.$Direction_es = "Dirección";
Vue.prototype.$Direction_pt = "Direção";
Vue.prototype.$Direction_en = "Direction";
Vue.prototype.$City_es = "Ciudad";
Vue.prototype.$City_pt = "Cidade";
Vue.prototype.$City_en = "City";
Vue.prototype.$country_es = "País";
Vue.prototype.$country_pt = "País";
Vue.prototype.$country_en = "country";
Vue.prototype.$Postal_Code_es = "Código Postal";
Vue.prototype.$Postal_Code_pt = "Código postal";
Vue.prototype.$Postal_Code_en = "Postal Code";
Vue.prototype.$Update_data_es = "Actualizar datos";
Vue.prototype.$Update_data_pt = "Dados de atualização";
Vue.prototype.$Update_data_en = "Update data";
Vue.prototype.$password_es = "Cambiar contraseña";
Vue.prototype.$password_pt = "Cambiar contrasinal";
Vue.prototype.$password_en = "Change password";
</script>
