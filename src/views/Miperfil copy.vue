<template>
  <div class="container">
   <h2 style="margin-top:1em"> Mis datos </h2>
    <form class="form-inline" @submit.prevent="editarTarea2({nombre:nombre, apellidos:apellidos, email:usuario.email})">

  <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">Nombre</div>
    </div>
 <input  @change="setNombrelocal"  id="nombreid"  class="form-control" type="text" v-model="nombre">  
 </div>
  <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">Apellidos</div>
    </div>
 <input @change="setApellidoslocal" id="apellidosid" ref="apellidosid" class="form-control" type="text" v-model="apellidos">  
 </div>
  <button type="submit" class="btn btn-primary mb-2">Guardar</button>

</form>
<br>
   <h2> Mis intereses </h2>
    <form class="form-inline" @submit.prevent="editarTags({tags:tags1, email:usuario.email})">
  <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">Tags</div>
    </div>
 <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags1 = newTags"
    />
  </div>
 

   
 </div>
  <button type="submit" class="btn btn-primary mb-2">Actualizar</button>
  
    </form>

     <div class="text-center">
  <b-spinner id="cargandoid" style="display:none;width: 3rem; height: 3rem;" variant="primary" label="Text Centered"></b-spinner>
</div>



   <p>Información para desarrolladores: {{usuario.email}} </p>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters } from 'vuex'
import store from '../store'

export default {
    name: 'Miperfil',
    data(){
        return{
            id: this.$route.params.id,
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
             tag: '',
    tags1: [],
    autocompleteItems: [{
      text: 'Compruebe el autocompletado "8"',
    }, {
      text: 'demasaido corto',
    }, {
      text: 'Válido',
    }, {
      text: 'No añadido',
    }, {
      text: 'No válido debido a "{"',
    }],
    validation: [{
      classes: 'min-length',
      rule: tag => tag.text.length < 3,
    }, {
      classes: 'no-numbers',
      rule: /^([^0-9]*)$/,
    }, {
      classes: 'avoid-item',
      rule: /^(?!Cannot).*$/,
      disableAdd: true,
    }, {
      classes: 'no-braces',
      rule: ({ text }) => text.indexOf('{') !== -1 || text.indexOf('}') !== -1,
    }],
    }

    },
    created()
    {
      //console.log("path" ,(window.location.href ));
      //funciona console.log(this.$route.name);
        console.log('entramos',this.usuario.email)
        this.getDatos(this.usuario.email)
        console.log('entramos 2',this.apellidos)
        document.getElementById("nombreid").value = "New text!";
        console.log("aqui")
        //store.dispatch('getDatos', this.usuario.email)

    },
      mounted()
    {
      
  
       // document.getElementById("nombreid").value = "New text!";
        console.log("aqui2")
       

    },
    methods:{
        ...mapActions(['detectarUsuario', 'getDatos', 'editarTags', 'editarTarea2']),
        setNombrelocal()
        {
          store.commit('setNombre', document.getElementById("nombreid").value)
        },
         setApellidoslocal()
        {
          store.commit('setApellido', document.getElementById("apellidosid").value)
        }
    },
    computed:{
        ...mapState(['usuario', 'nombre', 'apellidos', 'tags', 'tag'])
    }
}

  function load() {
       //document.getElementById("nombreid").value = "New text!";
      }
      window.onload = load;

</script>
