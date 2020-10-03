<template>
  <div id="app"><!--class container-->
    <div class="text-center">
      
      </div>
      



      <div id="nav" class="topmenu">
  <b-navbar toggleable="lg" type="dark" variant="info">
     <router-link to="/"><img style="width: 40px;height: 40px;" src="./assets/logoblanco.png"></router-link>
    <b-navbar-brand class="pagina_actual" href="#">{{this.$route.name}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item   v-if="this.$route.name!='Mi Mundo'" :to="{name: 'Mi Mundo'}">Mi Mundo</b-nav-item>
        <b-nav-item   v-if="this.$route.name!='Nosotros'" :to="{name: 'Nosotros'}">Nosotros</b-nav-item>
        <b-nav-item  :to="{name: 'Nosotros'}">v 1.37</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item @click="mostrarAlarmas()"  id="alarmaid1" > <font-awesome-icon id="alarmaid" icon="bell" /></b-nav-item>

        <b-nav-item @click="mostrarAlarmas()" > <span id="alarmatexto">No hay alarmas</span></b-nav-item>
        <b-nav-item v-if="existeUsuario"> <router-link to="/createNews" style="text-decoration: none;color: unset;color: white;">Crear noticias</router-link></b-nav-item>


<b-dropdown  v-if="existeUsuario" id="ddCommodity"
                  name="filtrarKeyword"
                  text="Intereses"
                  variant="primary"
                  class="claseintereses" >
                  <!--v-on:change="changeItem"-->
      <!-- <b-dropdown-item value="0"  @click="filtrarporKeyword('Crear noticias')">Crear noticias </b-dropdown-item> -->
      <!-- <b-dropdown-item> <router-link to="/createNews" style="text-decoration: none;color: unset;">Crear noticias</router-link></b-dropdown-item> -->
      <b-dropdown-item value="0"  @click="filtrarporKeyword('todos')">Ver todos </b-dropdown-item>
   <b-dropdown-item  v-for="(item, index) in tags"  :key="index"
                    :value="item"
                    @click="filtrarporKeyword(item)">
                     {{item}}
        </b-dropdown-item>
 </b-dropdown> 

       <!-- Buscador
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar..."></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>-->

        <!-- <b-nav-item-dropdown  v-if="existeUsuario" class="colorblanco" text="Idioma" right>
          <b-dropdown-item  @click="cambiarIdioma('es')">Español</b-dropdown-item>
          <b-dropdown-item @click="cambiarIdioma('en')" >Inglés</b-dropdown-item>
          <b-dropdown-item @click="cambiarIdioma('zh')" >Chino</b-dropdown-item>
        </b-nav-item-dropdown> -->

<b-nav-item > <router-link style="color:white" to="/registro" v-if="!existeUsuario">Crear cuenta</router-link></b-nav-item>
        <b-nav-item-dropdown id="loginid" right>
          <!-- Using 'button-content' slot -->
          <template  v-slot:button-content>
            <em  style="color:white"><img id="imgmenu"  src="./assets/avatar-01.png" onerror="this.onerror=null;this.src='./assets/avatar-01.png';"></em>
          </template>
          <!-- <span id="nombreUsuario"></span> -->
          <b-dropdown-item><router-link style="color:#212529" to="/miperfil" v-if="existeUsuario">{{nombre}}</router-link></b-dropdown-item>
          <b-dropdown-item> <router-link style="color:#212529" to="/login" v-if="!existeUsuario">Login</router-link></b-dropdown-item>
          <b-dropdown-item> <router-link style="color:#212529" to="/registro" v-if="!existeUsuario">Registro</router-link></b-dropdown-item>
          <b-dropdown-item><div style="color:#212529" @click="filtrarporKeyword('todos')"  v-if="existeUsuario">Todas las noticias</div></b-dropdown-item>
          <b-dropdown-item><div style="color:#212529" @click="filtrarporLikes()"  v-if="existeUsuario">Favoritos</div></b-dropdown-item>
          <b-dropdown-item><router-link style="color:#212529" to="/intereses" v-if="existeUsuario">Intereses y Alertas</router-link></b-dropdown-item>
          <b-dropdown-item @click="cerrarSesion"  v-if="existeUsuario" >Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
         
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>


<!--panel de usuario logueado-->
   <!-- <div id="nav">
      <router-link to="/">Inicio</router-link> |

       <router-link to="/inicio" v-if="existeUsuario">Usuario</router-link> |
      <router-link to="/about">Nosotros</router-link> |
      <router-link to="/registro"  v-if="!existeUsuario" >Registro</router-link> |
       <router-link to="/login" v-if="!existeUsuario">Login</router-link> |
       <button @click="cerrarSesion"  v-if="existeUsuario" >Cerrar sesión</button>
    </div>-->

    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState  } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import {auth} from '../firebase'
import firebase from 'firebase/app';
library.add(faBell)
export default {
  imgurl3: '',
   watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'Youddly.com - Tu propio internet'
                //aqui se puede poner to.meta.title para poner diferentes
                //segun los metas del archivo de router
            }
        },
    },
        created()
    {
    },
    methods:{
      ...mapActions(['cerrarSesion', 'filtrarporKeyword', 'filtrarporLikes', 'cambiarIdioma', 'mostrarAlarmas']),
        cambiarimagen(imagen)
       {
         document.getElementById('imgmenu').src=imagen; 
       },
    },
     mounted:function(){
        
        setTimeout(function(){
  
        let user = firebase.auth().currentUser;
       let fecha2 = new Date();
     
        var imgurl2 = "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F"+ encodeURIComponent(user.email) + ".jpg?alt=media&time="+fecha2.getTime();
    
        this.imgurl3 = imgurl2;
        document.getElementById('imgmenu').src=imgurl2; 
        //this.cambiarimagen(this.imgurl3) //method1 will execute at pageload
          
          }, 100);
      
  },
      computed:{
      ...mapGetters(['existeUsuario']),
      ...mapState(['usuario', 'tags', 'nombre'])
    }
  }
</script>