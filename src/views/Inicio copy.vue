<template>
  <div class="home">
  
  
    <router-link to="/agregar">
       <button class="btn btn-success btn-block">Actualizar</button>
    </router-link>
   
    <ul class="list.group mt-5">
      <li class="list-group-item" v-for="(item, index) in noticias"  :key="index">

        
      {{item}}
      {{item.nombre}} - {{item.id}}

<div class="float-right">
      <router-link :to="{name: 'Editar', params: {id: item.id}}">
      <button class="btn btn-warning btn-sm mr-2">Editar</button>
      </router-link>
</div>


      </li>
    </ul>

      <center><h3>Bienvenido {{usuario.email}}</h3></center>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import {mapActions, mapState} from 'vuex'
export default {
  name: 'Inicio',
  created(){
    this.getTareas()
    this.getNoticias()
  },
  methods:{
    ...mapActions(['getTareas', 'getNoticias'])
  },
  computed:{
    ...mapState(['tareas', 'noticias']),
    ...mapState(['usuario'])
  }
 // components: {
 //   HelloWorld
 // }
}
</script>
