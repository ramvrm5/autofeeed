<template>
  <div class="home">
    <h3>Inicio</h3>
    <router-link to="/agregar">
       <button class="btn btn-success btn-block">Agregar</button>
    </router-link>
   
    <ul class="list.group mt-5">
      <li class="list-group-item" v-for="(item, index) in tareas"  :key="index">
      {{item.nombre}} - {{item.id}}

<div class="float-right">
      <router-link :to="{name: 'Editar', params: {id: item.id}}">
      <button class="btn btn-warning btn-sm mr-2">Editar</button>
      </router-link>
</div>


      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import {mapActions, mapState} from 'vuex'
export default {
  name: 'Home',
  created(){
    this.getTareas()
  },
  methods:{
    ...mapActions(['getTareas'])
  },
  computed:{
    ...mapState(['tareas'])
  }
 // components: {
 //   HelloWorld
 // }
}
</script>
