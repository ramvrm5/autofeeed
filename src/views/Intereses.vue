<template>
  <div class="container">
    <!-- <br /> -->
    <div class="row mt-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <h2>Mis intereses</h2>
      </div>
    </div>
<!--     <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <form
          class="form-inline"
          @submit.prevent="editarTags({ tags: tags, email: usuario.email })"
        >
          <div class="row">
            <div class="col-12 col-sm-7 col-md-8 col-lg-8">
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
            </div>
            <div class="col-12 col-sm-4 col-md-2 col-lg-2">
              <button type="submit" class="btn btn-primary mb-2">
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div> -->
<!--     <div class="row">
      <div class="col-12">
        <h2>Sistema de alertas</h2>
      </div>
    </div> -->
    <div class="row">
      <div class="col-12">
        <p>
          {{selectedLan == 'es'
              ? $Note_es
              : selectedLan == 'pt'
              ? $Note_pt
              : selectedLan == 'ar'
              ? $Note_ar
              : $Note_en}}
        </p>
      </div>
    </div>

    <form
      class="form-inline"
      @submit.prevent="addTagsTemp"
    >
      <div class="input-group mb-2 mr-sm-2">
      <!--   <div class="input-group-prepend">
          <div class="input-group-text">Alerta actual</div>
        </div> -->
        <input
          id="addedTag"
          placeholder="Escribe un tag"
          class="form-control"
          type="text"
          v-model="addedTag"
        />
      </div>
      <div class="input-group mb-2 mr-sm-2">
          <b-form-select
            id="typeOfTrend"
            v-model="typeOfTrend"
            :options="
              selectedLan == 'es'
                ? $Trend_es
                : selectedLan == 'pt'
                ? $Trend_pt
                : selectedLan == 'ar'
                ? $Trend_ar
                : $Trend_en
            "
          ></b-form-select>
      </div>
      <button type="submit" :disabled="!addedTag" class="btn btn-primary mb-2">Añadir etiqueta</button>
      
    </form>
    

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

    <!-- COLUMNA NUEVA CON INTERESES Y ALARMAS -->
    <div class="row">
      <div class="col-12">
        <b-table
      responsive 
      :fields="fields"
      :items="items2">
          <template v-slot:cell(name)="data">
            <b onchange='alert("Hola")' id="tagtabla">{{ data.value }}</b>
          </template>
          <template v-slot:cell(typeOfTag)="data">
            <button
              :id="'button_' + data.index"
              class="btn btn-primary"
              @click="onToggle(data.value, data.index)"
            >
              {{ data.value ? data.value : "Leisure" }}
            </button>
          </template>
          <template v-slot:cell(typeOfTrend)="data">
            <button
              :id="'button_Trend_' + data.index"
              class="btn btn-primary"
              @click="onToggleTrend(data.value, data.index)"
            >
              {{ data.value ? data.value : "Neutral" }}
              <span v-if="data.value == 'Up'"
                ><i class="fa fa-arrow-up" aria-hidden="true"></i
              ></span>
              <span v-if="data.value == 'Down'"
                ><i class="fa fa-arrow-down" aria-hidden="true"></i
              ></span>
            </button>
          </template>

          <!-- TEXTO DE ALARMA -->
          <template v-slot:cell(alarma)="data">
            <div style="width: 310px">
              <b-form-tags
                v-model="data.value"
                placeholder=""
                type="text"
                remove-on-delete
                add-on-enter
                style="width: 200px; float: left; margin-right: 3%"
              ></b-form-tags>
              <button
                class="btn btn-primary mb-2"
                style="width: 100px"
                @click="
                  setAlertalocal2(
                    data.value,
                    data.item.name,
                    data.item.typeOfTag,
                    data.item.typeOfTrend,
                    data.index
                  )
                "
              >
                Actualizar
              </button>
            </div>
          </template>
          <template  v-slot:cell(action)="data">
            <i style="cursor:pointer" class="fa fa-times ml-3" aria-hidden="true"               
             @click=" deleteTag(data.item,data.index)"></i>
          </template>
        </b-table>
      </div>
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

<!--     <p>
          {{selectedLan == 'es'
              ? $SessionStartedAs_es
              : selectedLan == 'pt'
              ? $SessionStartedAs_pt
              : selectedLan == 'ar'
              ? $SessionStartedAs_ar
              : $SessionStartedAs_en}}: {{ usuario.email }}</p> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from "vuex";
import store from "../store";
import VueTagsInput from "@johmun/vue-tags-input";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
import "firebase/storage";
import sweetAlert from 'sweetalert2';
import $ from "jquery";

export default {
/*   components: {
    sweetAlert,
  }, */
  name: "Miperfil",
  imgurl3: "",
  data() {
    return {
      typeOfTrend:"Neutral",
      addedTag: null,
      fields: [
        { key: "action", label: this.selectedLan == 'es' ? "Borrar" : "Delete"},
        { key: "name", label: "Intereses" },
        { key: "typeOfTag", label: this.selectedLan == 'es' ? "Tipo" : "Type" },
        { key: "typeOfTrend", label: "Trend" },
        { key: "alarma", label: "Texto alarma" },
      ],
      items: [
        { alarmas: 0, name: "Intel", alarma: "Subida", Publicaciones: 42 },
        { alarmas: 0, name: "Rusia", alarma: "IPO", Publicaciones: 36 },
        { alarmas: 0, name: "Novacyt", alarma: "Tests", Publicaciones: 73 },
        { alarmas: 0, name: "Ikea", alarma: "Ofertas", Publicaciones: 62 },
      ],
      id: this.$route.params.id,
      tag: "",
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
      "addTags",
      "editarTarea2",
      "editarAlertas",
    ]),
    /* cambiarimagen(imagen) {
      setTimeout(() => {
        document.getElementById("imguser").src = imagen;
      }, 500);
    }, */
    deleteTag(array,index){
    sweetAlert.fire({
      title: this.selectedLan == 'es' ? this.$Areyousure_es : this.selectedLan == 'pt'? this.$Areyousure_pt : this.selectedLan == 'ar'? this.$Areyousure_ar : this.$Areyousure_en,
      text: this.selectedLan == 'es' ? this.$AbleToRevert_es : this.selectedLan == 'pt'? this.$AbleToRevert_pt : this.selectedLan == 'ar'? this.$AbleToRevert_ar : this.$AbleToRevert_en,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:this.selectedLan == 'es' ? this.$cancel_es : this.selectedLan == 'pt'? this.$cancel_pt : this.selectedLan == 'ar'? this.$cancel_ar : this.$cancel_en,
      confirmButtonText: this.selectedLan == 'es' ? this.$YouDelet_es : this.selectedLan == 'pt'? this.$YouDelet_pt : this.selectedLan == 'ar'? this.$YouDelet_ar : this.$YouDelet_en
    }).then((result) => {
      if (result.value) {
        var alerta = this.alerta.split("//");
        var alertaObject = this.alertaObject;
        var tags = this.rawTags.split(";");
        for(let i=0;alerta.length > i;i++){
          var alertaSplit = alerta[i].split(";")
            if(alertaSplit[1] == array.name){
              alerta.splice(i,1)
              break
            }
          }
        for(let m=0;tags.length > m;m++){
          if(tags[m] == array.name){
            tags.splice(m,1)
            break
          }
        }
        for(let j=0;alertaObject.length > j;j++){
          if(alertaObject[j].tag == array.name){
            alertaObject.splice(j,1)
            break
          }
        }
        alerta = alerta.join("//");
        alertaObject
        tags = tags.length > 1?tags.join(";"):tags;
        store.commit("setAlerta", alerta);
        store.commit("setAlertaObject", alertaObject);
        store.commit("setRawTags", tags);
      db.collection('usuarios').doc(this.usuario.email).update({
        tags: tags,
        alerta:alerta,
        alertaObject:alertaObject
      }).then(() => {
        this.items2.splice(index, 1);
         sweetAlert.fire(
              this.selectedLan == 'es' ? this.$Delete_es : this.selectedLan == 'pt'? this.$Delete_pt : this.selectedLan == 'ar'? this.$Delete_ar : this.$Delete_en,
              this.selectedLan == 'es' ? this.$ThisTag_es : this.selectedLan == 'pt'? this.$ThisTag_pt : this.selectedLan == 'ar'? this.$ThisTag_ar : this.$ThisTag_en+" "+`(${tags})`+" "+this.selectedLan == 'es' ? this.$IsDeleted_es : this.selectedLan == 'pt'? this.$IsDeleted_pt : this.selectedLan == 'ar'? this.$IsDeleted_ar : this.$IsDeleted_en,
              'success'
            )
      }).catch((error) => {
        console.log(error)
      })
      }
    })
    },
    addTagsTemp(){
      this.items2.push({
      Publicaciones: "25",
      alarma: [],
      alarmas: "0",
      name: this.addedTag,
      typeOfTag: "Ocio",
      typeOfTrend: this.typeOfTrend,
      });
      var addedTag = this.addedTag;
      var emptyArray = []
      var alertAppend = '//'+JSON.stringify(emptyArray)+';'+this.addedTag+';Ocio;'+this.typeOfTrend
      var alertTemp = this.alerta;
      if(alertTemp && alertTemp.length > 0){
      alertTemp += alertAppend;
      }else{
      alertTemp = alertAppend;
      }
      store.commit("setAlerta", alertTemp);
      this.addedTag = null;
      this.typeOfTrend = "Neutral"
      Vue.set(this.items2)
      db.collection("usuarios")
        .doc(this.usuario.email)
        .update({
          alerta: alertTemp,
        })
        .then(() => {
        console.log("updated")
      this.addTags({ addedTag: addedTag })
        }).catch((error) => {
        console.log(error)
      });
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
    onToggle(value, index) {
      let btnvalue = $("#button_" + index)
        .text()
        .trim();
      if (btnvalue == "Ocio") {
        btnvalue = "Profesional";
        value = "Profesional";
        $("#button_" + index).text("Profesional");
      } else if (btnvalue == "Profesional") {
        btnvalue = "Ocio";
        value = "Ocio";
        $("#button_" + index).text("Ocio");
      }
    },
    onToggleTrend(value, index) {
      let btnvalue = $("#button_Trend_" + index)
        .text()
        .trim();
      $("#button_Trend_down_" + index + " i").detach();
      if (btnvalue == "Neutral") {
        btnvalue = "Up";
        value = "Up";
        $("#button_Trend_" + index).text("Up");
        $("#button_Trend_" + index).append(
          " <i class='fa fa-arrow-up' aria-hidden='true'></i>"
        );
      } else if (btnvalue == "Up") {
        btnvalue = "Down";
        value = "Down";
        $("#button_Trend_" + index).text("Down");
        $("#button_Trend_" + index).append(
          " <i class='fa fa-arrow-down' aria-hidden='true'></i>"
        );
      } else if (btnvalue == "Down") {
        btnvalue = "Neutral";
        value = "Neutral";
        $("#button_Trend_" + index).text("Neutral");
        /* $('#button_Trend_'+index).append(" <i class='fa fa-arrows-h' aria-hidden='true'></i>"); */
      }
    },
    setAlertalocal2(alarma, elemento, typeOfTag, typeOfTrend, index) {
      typeOfTag = $("#button_" + index)
        .text()
        .trim();
      typeOfTrend = $("#button_Trend_" + index)
        .text()
        .trim();
      let repetido = 0;
      let nueva_alerta = "";
      if (this.alerta) {
        let alertarecorrer = this.alerta;
        let alertarecorrer2 = alertarecorrer.split("//");

        alertarecorrer2.forEach((element) => {
          let alertarecorrer3 = element.split(";");

          if (alertarecorrer3[1] == elemento) {
            repetido = 1;
            nueva_alerta +=
              "//" +
              JSON.stringify(alarma) +
              ";" +
              elemento +
              ";" +
              typeOfTag +
              ";" +
              typeOfTrend;
          } else {
            if (element) {
              nueva_alerta += "//" + element;
            }
          }
        });
      }
      if (repetido == 0 && this.alerta) {
        nueva_alerta =
          this.alerta +
          "//" +
          JSON.stringify(alarma) +
          ";" +
          elemento +
          ";" +
          typeOfTag +
          ";" +
          typeOfTrend;
      } else if (repetido == 0 && !this.alerta) {
        nueva_alerta =
          "//" + JSON.stringify(alarma) + ";" + elemento + ";" + typeOfTag + ";" + typeOfTrend;
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
              this.alertaObject[i].typeOfTrend = typeOfTrend;
            }
          }.bind(this)
        );
      } else if (this.alertaObject.length == 0) {
        this.alertaObject.push({
          alert: alarma,
          tag: elemento,
          typeOfTag: typeOfTag,
          typeOfTrend: typeOfTrend,
        });
        found = 1;
      }
      if (found == 0) {
        this.alertaObject.push({
          alert: alarma,
          tag: elemento,
          typeOfTag: typeOfTag,
          typeOfTrend: typeOfTrend,
        });
      }
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
   // this.cambiarimagen(this.imgurl3); //method1 will execute at pageload
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter((i) => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
    ...mapState([
      "selectedLan",
      "usuario",
      "nombre",
      "apellidos",
      "tags",
      "rawTags",
      "alerta",
      "alertaObject",
      "items2",
    ]),
  },
};
Vue.prototype.$Note_es = "Recuerda que si estás al tanto de alguna noticia concreta podemos hacerlo por ti, solo escribe el texto que quieras encontrar en todas tus noticias y te avisaremos.";
Vue.prototype.$Note_pt = "Lembre-se que caso você tenha conhecimento de alguma notícia específica nós podemos fazer isso por você, basta escrever o texto que deseja encontrar em todas as suas notícias e nós o avisaremos.";
Vue.prototype.$Note_en = "Remember that if you are aware of any specific news we can do it for you, just write the text you want to find in all your news and we will notify you.";
Vue.prototype.$Note_ar = "تذكر أنه إذا كنت على دراية بأي أخبار معينة ، فيمكننا القيام بذلك نيابة عنك ، فقط اكتب النص الذي تريد العثور عليه في جميع أخبارك وسنخطرك بذلك.";
Vue.prototype.$SessionStartedAs_es = "La sesión comenzó como";
Vue.prototype.$SessionStartedAs_pt = "Sessão iniciada como";
Vue.prototype.$SessionStartedAs_en = "Session started as";
Vue.prototype.$SessionStartedAs_ar = "بدأت الجلسة كـ";
Vue.prototype.$Trend_es = [
  { text: "Neutral", value: "Neutral" },
  { text: "Arriba", value: "Up" },
  { text: "Abajo", value: "Down" },
];
Vue.prototype.$Trend_pt = [
  { text: "Neutro", value: "Neutral" },
  { text: "Acima", value: "Up" },
  { text: "Baixo", value: "Down" },
];
Vue.prototype.$Trend_en = [
  { text: "Neutral", value: "Neutral" },
  { text: "Up", value: "Up" },
  { text: "Down", value: "Down" },
];
Vue.prototype.$Trend_ar = [
  { text: "محايد", value: "Neutral" },
  { text: "فوق", value: "Up" },
  { text: "أسفل", value: "Down" },
];
Vue.prototype.$Areyousure_es = "Estas segura";
Vue.prototype.$Areyousure_pt = "Você tem certeza?";
Vue.prototype.$Areyousure_en = "Are you sure?";
Vue.prototype.$Areyousure_ar = "هل أنت واثق؟";
Vue.prototype.$AbleToRevert_es = "¡No podrás revertir esto!";
Vue.prototype.$AbleToRevert_pt = "Você não poderá reverter isso!";
Vue.prototype.$AbleToRevert_en = "You won't be able to revert this!";
Vue.prototype.$AbleToRevert_ar = "لن تتمكن من التراجع عن هذا!";
Vue.prototype.$YouDelet_es = "¡Sí, bórralo!";
Vue.prototype.$YouDelet_pt = "Sim, exclua!";
Vue.prototype.$YouDelet_en = "Yes, Delete it!";
Vue.prototype.$YouDelet_ar = "نعم ، احذفها!";
Vue.prototype.$Delete_es = "¡Eliminada!";
Vue.prototype.$Delete_pt = "Excluída!";
Vue.prototype.$Delete_en = "Deleted!";
Vue.prototype.$Delete_ar = "تم الحذف!";
Vue.prototype.$ThisTag_es = "Esta etiqueta";
Vue.prototype.$ThisTag_pt = "Esta etiqueta";
Vue.prototype.$ThisTag_en = "This Tag";
Vue.prototype.$ThisTag_ar = "هذه العلامة";
Vue.prototype.$IsDeleted_es = "esta borrado.";
Vue.prototype.$IsDeleted_pt = "esta deletado.";
Vue.prototype.$IsDeleted_en = "is deleted.";
Vue.prototype.$IsDeleted_ar = "يتم حذف.";
Vue.prototype.$cancel_es = "cancelar";
Vue.prototype.$cancel_pt = "cancelar";
Vue.prototype.$cancel_en = "cancel";
Vue.prototype.$cancel_ar = "إلغاء";
</script>
