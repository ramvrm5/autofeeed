<template>
  <div class="container">
   <h2 style="margin-top:1em"> Mis datos </h2>
    <form class="form-inline" @submit.prevent="editarTarea2({nombre:nombre, apellidos:apellidos, email:usuario.email})">




  <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">Nick</div>
    </div>
 <input  @change="setNombrelocal"  id="nombreid"  class="form-control" type="text" v-model="nombre">  
 </div>
  <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">País</div>
    </div>
 <input @change="setApellidoslocal" id="apellidosid" ref="apellidosid" class="form-control" type="text" v-model="apellidos">  
 </div>

  <div class="input-group mb-2 mr-sm-2">
<img style="max-width: 180px;border-radius: 15px;margin-left: auto;margin-right: auto;" onclick="document.getElementById('inputavatar').click()" id="imguser"  src="../assets/avatar-01.png" onerror="this.onerror=null;this.src='https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2Favatar-01.png?alt=media&token=296aa880-816b-429a-bc08-b88197e6934f';">

 </div>

  <div class="input-group" style="margin-left: auto;margin-right: auto;">
  <button type="submit" class="btn btn-primary mb-2" style="margin-left: auto;margin-right: auto;">Actualizar datos</button>
 </div>




<div style="display:none" class="input-field">
<input accept="image/*;" @change="subiravatar(this)" id="inputavatar" name="uploaded_file" type="file" class="validate" style="display: none;">
</div>

</form>


  </div>
</template>

<script>
import {mapActions, mapState, mapGetters } from 'vuex'
import store from '../store'
import VueTagsInput from '@johmun/vue-tags-input'
import {db} from '../firebase'
import {auth} from '../firebase'
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
   components: {
   
  },
    name: 'Miperfil',
    imgurl3: '',
    data(){
        return{
           fields: [
          // A column that needs custom formatting
          { key: 'name', label: 'Intereses' },
          // A regular column
           { key: 'Publicaciones', label: 'Posts', class: 'ancho_publicaciones2' },
          // A regular column
          { key: 'alarma', label: 'Texto alarma' }
        ],
        items: [
          { alarmas: 0,  name: 'Intel', alarma: 'Subida', Publicaciones: 42 },
          { alarmas: 0,  name: 'Rusia', alarma: 'IPO', Publicaciones: 36 },
          { alarmas: 0, name: 'Novacyt', alarma: 'Tests', Publicaciones: 73 },
          { alarmas: 0, name: 'Ikea', alarma: 'Ofertas', Publicaciones: 62 }
        ],
      
    
            id: this.$route.params.id,
            //nombre: this.state.nombre,
            //apellidos: this.state.apellidos,
            tag: '',
      //tags: [],
      autocompleteItems: [{
        text: 'grafeno',
      }, {
        text: 'investigación',
      }, {
        text: 'china',
      }, {
        text: 'vacuna',
      }, {
        text: 'China',
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


    };

    },
    created()
    {
      //console.log("path" ,(window.location.href ));
      //funciona console.log(this.$route.name);
        console.log('entramos',this.usuario.email)
        this.getDatos(this.usuario.email)

        let fecha2 = new Date();
        var imgurl2 = "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F"+ encodeURIComponent(this.usuario.email) + ".jpg?alt=media&time="+fecha2.getTime();
        this.imgurl3 = imgurl2;
        //store.dispatch('getDatos', this.usuario.email)


    },
    methods:{
        ...mapActions(['detectarUsuario', 'getDatos', 'editarTags', 'editarTarea2', 'editarAlertas']),
       cambiarimagen(imagen)
       {
         document.getElementById('imguser').src=imagen; 
       },
       subiravatar(file1)
       {
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
        image.append('file', file);
        let fecha2 = new Date();
        var mountainsRef = storageRef.child('avatares/'+email3+'.jpg')
        var imgurl2 = "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F"+ encodeURIComponent(email3) + ".jpg?alt=media&time="+fecha2.getTime();
        mountainsRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!' + imgurl2);
        setTimeout(function()
          { 
          document.getElementById('imguser').src=imgurl2; 
         //document.getElementById('imgusermenu').src=imgurl2;
          }, 200);
          }); 
        },
        setNombrelocal()
        {
          store.commit('setNombre', document.getElementById("nombreid").value)
        },
          settagslocal(newTags)
        {
          console.log(newTags);
          store.commit('setTags', newTags)
        },
         setApellidoslocal()
        {
          store.commit('setApellido', document.getElementById("apellidosid").value)
        },
          setAlertalocal()
        {
          store.commit('setAlerta', document.getElementById("alertaid").value);
          store.editarAlertas(document.getElementById("alertaid").value);
          alert("Alerta activada correctamente: " + document.getElementById("alertaid").value)
        },
        ValidateSize(file) {
   
       }
      

    },
      mounted:function(){
        this.cambiarimagen(this.imgurl3) //method1 will execute at pageload
  },
    computed:{
      filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
      },
        ...mapState(['usuario', 'nombre', 'apellidos', 'tags', 'alerta', 'items2'])
    }
}



</script>
