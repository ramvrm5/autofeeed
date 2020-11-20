<template>
  <div>
    <div class="fondo">
      <div
        class="loginpc"
        style="
          margin-top: 10vh;
          position: relative;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <!--<h1 style="text-align:center">Bienvenido</h1>-->
        <img
          class="imagenlogin"
          style="width: 100%"
          src="../assets/logoblanco.png"
        />
        <form
          @submit.prevent="ingresoUsuario({ email: email, password: pass })"
        >
          <b-form-group
            id="input-group-1"
            label="Correo electrónico"
            style="color: white; text-shadow: 1px 1px 3px #000000"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="Introduce tu correo"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            style="color: white !important; text-shadow: 1px 1px 3px #000000"
            id="input-group-2"
            label="Contraseña:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="pass"
              type="password"
              placeholder="Introduce contraseña"
            ></b-form-input>
          </b-form-group>

          <!--
            <input 
                type="email" 
                placeholder="Ingrese email"
                v-model="email"
            >
            <input 
                type="password" 
                placeholder="Ingrese contraseña"
                v-model="pass"
            >-->
          <b-button type="submit" variant="primary" @click="onClick" style="color:white" :disabled="!desactivar"
            >Acceder <b-spinner v-if="emailloader" small  label="Spinning"></b-spinner></b-button
          >
          <b-button
          :disabled="registerDisable"
            type="reset"
            style="
              color: white;
              margin-left: 1em;
              border-color: green;
              background-color: green;
            "
            ><router-link 
            id="register"
          :disabled="registerDisable" style="color: white" to="/registro"
              >Registrarse</router-link
            ></b-button
          >
          <!-- <button type="submit" :disabled='!desactivar'>Acceder</button>-->
        </form>

        <p>{{ error }}</p>
        <!--error.code dice el codigo de error para traducciones -->
      </div>
      <p
        @click="cambiarcontraseña({ email })"
        style="position: fixed; right: 18px; bottom: 5px"
      >
        Recuperar contraseña
      </p>
    </div>
    <img
      src="../assets/fondoc1.jpg"
      id="fondoid"
      class="fondopc"
      style="
        position: absolute;
        top: 0px;
        height: 100%;
        object-fit: cover;
        z-index: -1;
        width: 100%;
      "
    />
  </div>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons';
import { mapActions, mapState, mapGetters } from "vuex";
import image1 from "../assets/fondoc1.jpg";
import image2 from "../assets/fondoc2.jpg";
import image3 from "../assets/fondoc3.jpg";
import image4 from "../assets/fondoc4.jpg";
import image5 from "../assets/fondoc5.jpg";
import image6 from "../assets/fondoc6.jpg";
import $ from "jquery";
export default {
  name: "Acceso",
  data() {
    return {
      emailloader:false,
      registerDisable:false,
      email: "",
      pass: "",
    };
  },
  created() {},
  mounted() {
    var numerofondo = Math.floor(Math.random() * 5) + 1;
    if (numerofondo == 1) document.getElementById("fondoid").src = image1;
    if (numerofondo == 2) document.getElementById("fondoid").src = image2;
    if (numerofondo == 3) document.getElementById("fondoid").src = image3;
    if (numerofondo == 4) document.getElementById("fondoid").src = image4;
    if (numerofondo == 5) document.getElementById("fondoid").src = image5;
    if (numerofondo == 6) document.getElementById("fondoid").src = image6;
  },
  methods: {
    ...mapActions(["ingresoUsuario", "cambiarcontraseña"]),
    onClick(){
      if(this.email && this.pass){
        this.emailloader = true;
        this.registerDisable = true;
        $("#register").css("cursor", "no-drop");
      }
      setTimeout(() => {
      var error = this.error.message;
        if(error){
          this.emailloader = false;
          this.registerDisable = false;
        }else{
          this.emailloader = true;
          this.registerDisable = true;
        }
      }, 1000);
    },
  },
  computed: {
    ...mapState(["error", "usuario"]),
    desactivar() {
      return true;
    },
  },
};
</script>