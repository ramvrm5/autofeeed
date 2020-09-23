<template>
  <div class="home">
  
  
    <router-link to="/agregar">
       <button class="btn btn-success btn-block">Actualizar</button>
    </router-link>
   
    <ul class="list.group mt-5">
      <li class="list-group-item" v-for="(item, index) in noticias"  :key="index">


  <b-card
    title="Card Title"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 100%;"
    class="mb-2"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>

        
 
      <h2>{{item.titulo}}</h2> 
     
      <img style="width:100%" :src=item.img>
    
      <p> {{item.cuerpo}}</p>

      <p style="font-weight:bold">Intereses: {{item.tags.replace(/;/g,',')}}</p>

<div style="float:right;display:contents">
     <a style="float:right" target="_blank" :href=item.url ><button class="btn btn-success btn-sm mr-2">Ver</button></a>
     <div> <router-link  :to="{name: 'Editar', params: {id: item.id}}">
      <button class="btn btn-warning btn-sm mr-2">Editar</button>
      </router-link></div>
      
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
