<template>
  <div>
    <div class="loginpc">
      <h2 style="margin-top: 1em">Formulario de registro</h2>
      <p>Introduzca una contraseña de 6 o más caracteres</p>
      <form @submit.prevent="crearUsuario({ nombre: name,selectedLan: selectedLan,email: email, password: pass1,termsAndCondition:status })">
        <b-form-group
          id="input-group-1"
          label="Correo electrónico"
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
          id="input-group-1"
          label="Correo electrónico"
          label-for="input-1"
        >
        <b-form-select
          v-model="selectedLan"
          id="selectedLanid"
          ref="selectedLanid"
          :options="options"
          size="sm"
          style="height: 37px !important"
          @change="getlanguage"
        ></b-form-select>
        </b-form-group>   

        <b-form-group
          id="input-group-1"
          label="nombre"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="name"
            type="text"
            required
            placeholder="Nombre"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Contraseña:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="pass1"
            type="password"
            placeholder="Introduce contraseña"
          ></b-form-input>

          <br />
          <b-form-input
            id="input-3"
            v-model="pass2"
            type="password"
            placeholder="Repita la contraseña"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
          >
            I accept the <router-link to="/terms-conditions">Terms and Conditions</router-link>
          </b-form-checkbox>
        </b-form-group>

        <!-- <input 
                type="email" 
                placeholder="Ingrese email"
                v-model="email"
            >
            <input 
                type="password" 
                placeholder="Ingrese contraseña"
                v-model="pass1"
            >
            <input 
                type="password" 
                placeholder="Repita contraseña"
                v-model="pass2"
            >-->
        <!-- <button type="submit" :disabled='!desactivar'>Registrar</button>-->
        <b-button type="submit" variant="primary" :disabled="!desactivar"
          >Registrarse</b-button
        >
      </form>
      <p>{{ error }}</p>
      <!--error.code dice el codigo de error para traducciones -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Registro",
  data() {
    return {
    status: 'not_accepted',
      options: [
        { value: "en", text: "English" },
        { value: "es", text: "Spanish" },
        { value: "pt", text: "Portuguese" },
        { value: "ar", text: "Arabic" },
      ],
      selectedLan: "",
      email: "",
      name: "",
      pass1: "",
      pass2: "",
    };
  },
  created() {},
  methods: {
    ...mapActions(["crearUsuario"]),
  },
  computed: {
    ...mapState(["error"]),
    desactivar() {
      return (
        this.pass1 === this.pass2 &&
        this.pass1.trim() !== "" &&
        this.pass1.length > 5 && this.email && this.status == 'accepted'
      );
    },
  },
};
</script>