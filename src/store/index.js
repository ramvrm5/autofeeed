import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../firebase';
import { auth } from '../firebase';
import router from '../router';
import $ from "jquery";
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    usuario: null,
    nombre_y_apellidos: { nombre: '', apellidos: '' },
    nombre: null,
    apellidos: null,
    alerta: null,
    tags: [],
    tags_array: [],
    tags_array_completo: [],
    tag: '',
    error: null,
    tarea: { nombre: '', id: '' },
    tareas: [],
    noticias_backup: [],
    noticias_backupES: [],
    noticias_alerta: [],
    noticias_like: [],
    keywordactual: [],
    items2: [],
    noticias: [],
    translated: [],
  },
  mutations: {
    setTareas(state, payload) {
      state.tareas = payload
    },
    set_items2(state, payload) {
      state.items2 = payload
    },
    setNoticiasLikes(state, payload) {
      state.noticias_like = payload
    },
    setNoticias(state, payload) {
      state.noticias = payload
    },
    setTranslated(state, payload) {
      state.translated = payload
    },
    setNoticiasBackup(state, payload) {
      state.noticias_backup = payload
    },
    setNoticiasAlerta(state, payload) {
      state.noticias_alerta = payload
    },
    setNoticiasBackupES(state, payload) {
      state.noticias_backupES = payload
    },
    setKeywordactual(state, payload) {
      state.keywordactual = payload
    },
    setTarea(state, payload) {
      state.tarea = payload
    },
    setNombre(state, payload) {
      state.nombre = payload
    },
    setApellido(state, payload) {
      state.apellidos = payload
    },
    setAlerta(state, payload) {
      state.alerta = payload
    },
    setTags(state, payload) {
      state.tags = payload
    },
    setTags_array(state, payload) {
      state.tags_array = payload
    },
    setTags_array_completo(state, payload) {
      state.tags_array_completo = payload
      console.log("este es el payload de ags completos", payload)
    },
    setTag(state, payload) {
      state.tag = payload
    },
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setError(state, payload) {
      state.error = payload
    }
  },
  actions: {

    crearUsuario({ commit }, usuario) {
      console.log("CREAR USUARIO 3?")
      var tagsoriginal = ["noticias", "news"]
      var idiomas_defecto = ["es", "en", "zh", "pt", "de", "ru", "fr"]
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid
          }
          db.collection('usuarios').doc(res.user.email).set({
            nombre: 'Tu nombre',
            tags: tagsoriginal,
            languages: idiomas_defecto
          }).then(doc => {
            console.log("CREAR USUARIO 4")
            alert("usuario creado")
            commit('setUsuario', usuarioCreado)
            router.push('/miperfil')
          }).catch(error => console.log(error))

        })
        .catch(error => {
          router.push('/')
          console.log(error)
          commit('setError', error)

        })
    },

    ingresoUsuario({ commit }, usuario) {
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuarioLogueado = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('setUsuario', usuarioLogueado)
          router.push('/')
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },

    cerrarSesion({ commit }) {
      auth.signOut()
        .then(() => {
          router.push('/login')
        })
    },

    detectarUsuario({ commit }, usuario) {

      console.log("DECTAR USUARIO DOS")




      //alert(usuario)

      if (usuario != null) {
        commit('setUsuario', usuario)

        console.log("DECTAR USUARIO DOS diferente de null")

        let tags = []
        /* Descomentar por si queremos coger todos los datos desde main.js
        y queremos para los tags*/

        db.collection('usuarios').doc(usuario.email).get()
          .then(doc => {


            console.log("data leida:", doc.data())
            let datos = doc.data()

            if (typeof datos !== "undefined") {


              console.log("nombre:", datos.nombre)
              commit('setNombre', datos.nombre)
              commit('setApellido', datos.apellidos)
              commit('setAlerta', datos.alerta)
              console.log("ponemos la alerta " + datos.alerta)
            }
            else {
              commit('setNombre', "Escribe tu nombre")
              commit('setApellido', "Tus apellidos")
            }



            let items2 = []




            if (typeof datos != "undefined") {
              let taglist = (datos.tags[0]).split(";");
              let alarmas_lista = datos.alerta;
              if (typeof alarmas_lista != "undefined") {
                var alarmas_lista2 = alarmas_lista.split("//");
              }
              let n = 0;

              taglist.forEach(function (entry) {


                let alarmaponer = ""
                console.log("cada tag por separado:", entry);
                tags.push(entry)


                if (typeof alarmas_lista != "undefined") {
                  alarmas_lista2.forEach(element => {
                    let alarmas_lista3 = element.split(";");

                    if (alarmas_lista3[1] == entry)
                      alarmaponer = alarmas_lista3[0]
                  });
                }



                let obj = {
                  alarmas: "0",
                  name: entry,
                  alarma: alarmaponer,
                  Publicaciones: "25"
                };

                items2.push(obj)
                n++;
              });


              commit('set_items2', items2)
              console.log("tags todos", datos.tags)


              commit('setTags_array_completo', datos.tags)
              commit('setTags_array', tags)
              commit('setTags', taglist)

            }
            else {
              var tagsoriginal = ["noticias", "news"]
              var tagsarray = ["noticias"]
              commit('setTags_array_completo', tagsoriginal)

              commit('setTags_array', tagsarray)

              commit('setTags', tagsarray)

            }

            let nombreUsuario = usuario.email.split("@")
            //var inicial = (nombreUsuario[0].substring(0, 1)).toUpperCase()
            //document.getElementById("nombreUsuario").innerHTML = nombreUsuario[0] + "  "


          })
      }

    },






    cambiarcontraseña({ commit }, correo) {
      console.log(correo)
      alert('Hemos enviado un correo a ' + correo.email + ' con las intrucciones para cambiar tu contraseña')
      auth().sendPasswordResetEmail(correo.email)
    },

     getTareas({ commit }) {
      const tareas = []
      db.collection('datos').get()
        .then(res => {
          res.forEach(doc => {
            //console.log(doc.id)
            //console.log(doc.data())
            let tarea = doc.data()
            tarea.id = doc.id
            tareas.push(tarea)
          })
          commit('setTareas', tareas)
        })
    },



    cambiarIdioma({ commit }, language) {



      let noticias_compuestas2 = this.state.noticias_backup


      const ordered = {}

      const b = [language];

      const c = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
        .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));

      console.log(c);



      commit('setNoticias', c)
      console.log(c)
      router.push('/') //volver a inicio


    },




    filtrarporLikes({ commit }) {



      let noticias_compuestas2 = this.state.noticias_like

      /*
      const ordered = {}
      
      const b = [language];
      
      const c = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
                 .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));
                 
      console.log(c);*/



      commit('setNoticias', noticias_compuestas2)
      console.log(noticias_compuestas2)
      router.push('/') //volver a inicio


    },



    mostrarAlarmas({ commit }) {

      let noticias_compuestas3 = this.state.noticias_alerta;

      console.log(noticias_compuestas3);
      /*
            const ordered = {}
            
            const b = [language];
            
            const c = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
                       .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));
                       
            console.log(c);*/

      commit('setNoticias', noticias_compuestas3)
      console.log(noticias_compuestas3)
      router.push('/') //volver a inicio

      document.getElementById("noticiasid").style.display = "none";

    },






    filtrarporKeyword({ commit }, keyword) {
      if (keyword == "todos") {
        let noticias_compuestas = this.state.noticias_backupES
        commit('setNoticias', noticias_compuestas)
      }
      else if (keyword == "Crear noticias") {
        document.getElementById("modal-create-news").click()
      }
      else {
        let noticias_compuestas = this.state.noticias_backup

        //console.log(JSON.stringify(noticias_compuestas));
        // → '{"b":"foo","c":"bar","a":"baz"}'

        const ordered = {}
        if (keyword.split(' ').length == 1) {
          let b = [keyword];

          let c = noticias_compuestas.filter(({ tags }) => b.includes(tags[0]))
            .sort(({ tags: r }, { tags: t }) => b.indexOf(r) - b.indexOf(t));
          //console.log(JSON.stringify(c))



          if (c.length < 1) {
            router.push('/') //volver a inicio
            commit('setKeywordactual', keyword)
            document.getElementById("botonmodal").click()


          }

          else { commit('setNoticias', c) }
          console.log(noticias_compuestas)
          //console.log(noticias_compuestas)
        }


        if (keyword.split(' ').length == 2) {
          let keywords = keyword.split(' ');
          let b = keywords[0]
          let b2 = keywords[1]
          let c = [];
          console.log("keywords: " + b + "  " + b2)

          noticias_compuestas.forEach(function (valor, indice, array) {
            console.log("En el índice " + indice + " hay este valor: " + valor.tags);
            if ((JSON.stringify(valor.tags).includes(b)) || (JSON.stringify(valor.tags).includes(b2))) {
              c.push(valor);
            }
          });




          /*
          let c1 = noticias_compuestas.filter(({ tags }) => b.includes(tags[0]))
             .sort(({ tags: r }, { tags: t }) => b.indexOf(r) - b.indexOf(t));
  
          let c2 = noticias_compuestas.filter(({ tags }) => b2.includes(tags[0]))
             .sort(({ tags: r }, { tags: t }) => b2.indexOf(r) - b2.indexOf(t));
             */

          // let c = c1.push(...c2)
          console.log("aqui estamos")
          console.log(JSON.stringify(c))
          commit('setNoticias', c)

          if (c.length < 1) {
            document.getElementById("botonmodal").click()
            router.push('/') //volver a inicio
            commit('setKeywordactual', keyword)
            //document.getElementById("keywordsid").innerHTML = JSON.stringify(keyword)

          }
          else { commit('setNoticias', c) }
          router.push('/') //volver a inicio
          console.log(noticias_compuestas)

        }



        /*
        Object.keys(noticias_compuestas).sort().forEach(function(key) {
          ordered[key] = noticias_compuestas[key];
        });*/





        //sin ordenar commit('setNoticias', noticias_compuestas)

      }

    },

    saveCreatedNews({ commit }, array) {
      let temparray = array
      let unique_id = db.collection('noticias').doc().id;
      db.collection('noticias').doc(unique_id).set({
        id:temparray[0].id,
        titulo: temparray[0].title,
        cuerpo: temparray[0].description,
        description: temparray[0].description,
        fecha: temparray[0].date,
        fechaClasica: temparray[0].classicDate,
        autor: temparray[0].source,
        fuente: temparray[0].source,
        fuenteId: temparray[0].sourceId,
        idioma: temparray[0].language,
        tags: temparray[0].tags,
        img: temparray[0].img,
        url: temparray[0].url,
      }).then(doc => {
        console.log(doc)
      }).catch(error => console.log(error))
    },



    getNoticias({ commit }) {
      const noticias_compuestas = []
      var noticias_alerta = []
      var noticias_alerta_2 = []
      var noticias_like = []
      let alerta_usuario = this.state.alerta;


      //console.log("tag_array_noticias", this.tags_array)

      let tags = []


      /* Descomentar por si queremos coger todos los datos desde main.js
      y queremos para los tags*/

      auth.onAuthStateChanged(user => {
        if (user) {


          document.getElementById("cargandoid").style.display = "block";

          db.collection('usuarios').doc(user.email).get()
            .then(doc => {

              let datos = doc.data()
              let objeto_tags = datos.tags;

              //Antigua forma de convertir string tags a array tags

              let taglist = (datos.tags[0]).split(";");
              taglist.forEach(function (entry) {
                console.log("cada tag por separado:", entry);
                tags.push(entry)
              });



              commit('setTags_array', tags)


              var yesterday = Math.round(new Date(new Date().setDate(new Date().getDate() - 1)).getTime() / 1000);
              var monthago = Math.round(new Date(new Date().setDate(new Date().getDate() - 20)).getTime() / 1000);





              db.collection('noticias').where("fecha", ">", yesterday).where("idioma", "==", "es").get()
                .then(res => {
                  res.forEach(doc => {
                    //console.log(doc.id)
                    //console.log(doc.data())
                    let noticia_leida = doc.data()
                    let titulo = noticia_leida.titulo;
                    let correos_like = noticia_leida.correos_like3;
                    let cuerpo = noticia_leida.cuerpo;
                    let texto_noticia = titulo + cuerpo;
                    let idioma = noticia_leida.idioma;
                    let url = noticia_leida.tags;
                    let img = noticia_leida.img;
                    let noticia_compuesta = "<h3>" + titulo + "</h3><p>" + cuerpo + "</p>";
                    noticias_compuestas.push(noticia_leida)

                    if (texto_noticia.includes(alerta_usuario)) {
                      noticias_alerta.push(noticia_leida)
                    }


                    if (typeof correos_like != "undefined") {
                      if (correos_like.includes(user.email)) {
                        noticias_like.push(noticia_leida)
                      }
                    }




                  })


                  //console.log(JSON.stringify(noticias_compuestas));








                  /*ponemos solo en español de base aunque leemos todas*/
                  let noticias_compuestas2 = noticias_compuestas
                  const ordered = {}
                  const b = ['es']
                  const c2 = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
                    .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));

                  //console.log(c2);



                  let tags_filtrar = this.state.tags
                  console.log("tags filtrarrrr", tags_filtrar)

                  console.log("tags filtrarrrr", c2)

                  let c_filtradas = [];

                  c2.forEach(function (valor1, indice1, array1) {

                    for (let index = 0; index < tags_filtrar.length; ++index) {
                      if (typeof valor1.tags != "undefined") {
                        if (JSON.stringify(valor1.tags).includes(tags_filtrar[index])) {
                          c_filtradas.push(valor1);
                        }
                      }

                    }

                  });



                  //este era el commit en español commit('setNoticias', c2)
                  c_filtradas = c_filtradas.reverse()
                  commit('setNoticias', c_filtradas)
                  commit('setNoticiasBackupES', c_filtradas)
                  commit('setNoticiasLikes', noticias_like)
                  /*fin de poner solo en español*/


                  //para poner todos los idiomas a la vez commit('setNoticias', noticias_compuestas)
                  commit('setNoticiasBackup', noticias_compuestas)

                  //console.log(noticias_compuestas)
                  console.log("entramos en getnoticias3")
                  console.log("alerta del usuario: " + this.state.alerta);

                  document.getElementById("cargandoid").style.display = "none";
                  if (c_filtradas.length < 1) {
                    document.getElementById("noticiasid").innerHTML = "Aún no hay noticias registradas para tus intereses, pero en unas horas las tendremos preparadas para ti"
                  }
                  else {

                    var alerta_usuario = this.state.alerta;
                    console.log(alerta_usuario)
                    var aviso_alarma = (c_filtradas.indexOf(alerta_usuario));
                    var aviso_alarma2 = c_filtradas.find(element => (element.cuerpo).includes(alerta_usuario))
                    console.log(aviso_alarma2)
                    //console.log(aviso_alarma2.length)
                    if (aviso_alarma2 != null) {
                      noticias_alerta_2.push(aviso_alarma2)
                      document.getElementById("alarmatexto").textContent = "¡Hay alarmas!"
                      document.getElementById("alarmatexto").style.color = "rgb(255 255 255)"
                      document.getElementById("alarmaid").style.color = "rgba(255,255,255,1)"
                      document.getElementById("alarmaid1").style.color = "rgba(255,255,255,1)"


                      //alert("Alerta! Se ha detectado tu texto en la siguiente noticia: \n" + aviso_alarma2.titulo + "\n" +aviso_alarma2.cuerpo +"\nURL: " + aviso_alarma2.url);
                    }
                    document.getElementById("noticiasid").innerHTML = "Hasta aquí por ahora, regresa en unas horas a por más noticias"
                  }

                  commit('setNoticiasAlerta', noticias_alerta_2)


                })


            })
        }
        else {
          console.log("no hay usuario logueado");
        }

      })



    },





    getTarea({ commit }, idTarea) {
      const tareas = []
      db.collection('datos').doc(idTarea).get()
        .then(doc => {

          console.log(doc.id)
          console.log(doc.data())
          let tarea = doc.data()
          tarea.id = doc.id
          console.log("Tarea enviada a setTarea", tarea)
          commit('setTarea', tarea)
        })
    },

    getDatos({ commit }, email) {
      console.log("aqui llegamos")
      console.log(email)
      let tags = []
      db.collection('usuarios').doc(email).get()
        .then(doc => {


          console.log(doc.data())
          let datos = doc.data()
          commit('setNombre', datos.nombre)
          commit('setApellido', datos.apellidos)
          let taglist = (datos.tags[0]).split(";");
          taglist.forEach(function (entry) {
            tags.push(entry)
          });
          commit('setTags', taglist)
        })
    },


    editarTags({ commit }, objeto_tags) {






      let tags_db = []
      let tags_get = []

      db.collection('tagTranslations').get()
        .then(res => {
          res.forEach(doc => {


            //console.log(doc.id)
            //console.log(doc.data())
            let tarea = doc.data()
            console.log(tarea.es)
            tags_db.push(tarea.es)
            //tarea.id = doc.id

          })
          //aqui al acabar el then poner todo lo de abajo





          let tags3 = []
          let tags_enviar = []
          //console.log(this.tags)
          //console.log(this.state.tags)
          //console.log(objeto_tags.tags[0].text)
          //console.log(objeto_tags.tags)
          //console.log((objeto_tags.tags).length)


          const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' }

          objeto_tags.tags.forEach(function (entry) {

            if ((entry.text != "") && ((entry.text).length > 2)) {
              let guardartag = (entry.text).toLowerCase();
              //esta version quita la ñ
              //guardartag = guardartag.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              guardartag = guardartag.split('').map(letra => acentos[letra] || letra).join('').toString();


              var firstWord = guardartag.replace(/ .*/, '');



              if (firstWord.includes("acciones")) {
                guardartag = guardartag.replace("acciones ", "")
              }








              //console.log(guardartag)
              if (!(tags_db.indexOf(guardartag) > -1)) {
                tags_get.push(guardartag)
              }

              if ((guardartag != "que") && (guardartag != "hola") && (guardartag != "con") && (guardartag != "unas") && (guardartag != "unos") && (guardartag != "por") && (guardartag != "para") && (guardartag != "cuando") && (guardartag != "donde") && (guardartag != "porque") && (guardartag != "when") && (guardartag != "where") && (guardartag != "because") && (guardartag != "cause") && (guardartag != "why") && (guardartag != "" && (guardartag != null)))
                tags3.push(guardartag)
            }
          });


          //para quitar duplicados con 2 lineas

          //no estaba funcionado porqeu esta comparando 
          //los idiomas como 3 tags compuestos de tags
          console.log("tags enviar1", tags3)
          let uniqueSet = new Set(tags3)

          tags3 = [...uniqueSet]
          console.log("tags enviar2", uniqueSet)
          console.log("tags enviar3", tags3)
          //hasta aquí quitar duplicados


          const tags2 = (tags3).join(";")

          let contador = 0;

          //console.log("LEEMOS LOS TAGS",this.state.tags_array_completo)

          this.state.tags_array_completo.forEach(function (entry) {
            if (contador == 0) tags_enviar.push(tags2)
            else tags_enviar.push(entry)
            contador++
          });

          var tags_get_preparados = (tags_get).join(",")




          db.collection('usuarios').doc(objeto_tags.email).update({
            tags: tags_enviar
            //Funciona tags:[tags2, this.tags_array_completo[1], this.tags_array_completo[2]]

          }).then(() => {
            //console.log('tags editados', tags2)
            let url2 = 'https://bit4block.es/autofeed/autofeed_translate_tags.php'
            console.log(url2)
            let url3 = 'https://bit4block.es/autofeed/autofeed_news_factory.php?tags=' + encodeURIComponent(tags_get_preparados)
            let urlbaidu = 'https://bit4block.es/autofeed/autofeed_baidu_factory.php?lang=zh&tags=' + encodeURIComponent(tags_get_preparados)
            let urlec = 'https://bit4block.es/autofeed/autofeed_eleconomista_factory.php?tags=' + encodeURIComponent(tags_get_preparados)

            //document.getElementById("cargandoid").style.display = "block";

            var pcg = 30;
            document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
            document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');


            fetch(url2, { mode: 'no-cors' })
              .then(response => {
                console.log("bien1", response.text())

                pcg = 50;
                document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
                document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');

                if (tags_get.length > 0) {


                  console.log(url3)
                  fetch(url3, { mode: 'no-cors' })
                    .then(response => {
                      console.log("bien1", response.text())
                    })
                    .then((data) => {
                      pcg = 75;
                      document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
                      document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');

                      //aqui llama al economista
                      console.log(urlec)
                      fetch(urlec, { mode: 'no-cors' })
                        .then(response => {
                          console.log("bien1", response.text())
                        })
                        .then((data) => {
                          console.log("bien", data)


                          //y aqui llama a baidu


                          console.log(urlbaidu)
                          fetch(urlbaidu, { mode: 'no-cors' })
                            .then(response => {
                              console.log("bien1", response.text())
                            })
                            .then((data) => {
                              console.log("bien", data)

                              pcg = 100;
                              document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
                              document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');


                              //document.getElementById("cargandoid").style.display = "none";
                              document.getElementById("barraid").style.display = "none";
                              console.log("recargar")
                              location.reload();


                            })
                            .catch((error) => {
                              console.log(error)
                            })

                          //fin llamada a baidu

                        })
                        .catch((error) => {
                          console.log(error)
                        })
                      //fin del economista
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                  //fin de newsapi




                }







              })
              .then((data) => {
                console.log("bien", data)
              })
              .catch((error) => {
                console.log(error)
              })



            /*fecth bien
                fetch(url2, { mode: 'no-cors'})
            .then(response => {
              console.log("bien1",response.text())
            })
            .then((data) => {
              console.log("bien", data)
            })
            .catch((error) => {
              console.log(error)
            })
  
            */

            //https://bit4block.es/autofeed/autofeed_baidu_factory.php
            //https://bit4block.es/autofeed/autofeed_eleconomista_factory.php


          })

















        })//aqui se cierra el then de leer los tags en español  db.collection('tagTranslations').get().then




    },


    editarTarea({ commit }, tarea) {
      const tareas = []
      db.collection('datos').doc(tarea.id).update({
        nombre: tarea.nombre

      }).then(() => {
        console.log('tarea editada')
        router.push('/') //volver a la ruta raiz
      })

    },


    editarTarea2({ commit }, objeto_recibido) {
      console.log(objeto_recibido.nombre)
      console.log(objeto_recibido.apellidos)
      db.collection('usuarios').doc(this.state.usuario.email).update({
        nombre: objeto_recibido.nombre,
        apellidos: objeto_recibido.apellidos

      }).then(() => {
        alert("Nombre y apellidos actualizados")
        console.log('Nombre y apellidos editados')
        router.push('/miperfil') //volver a la ruta raiz
      })

    },


    editarAlertas({ commit }, objeto_recibido) {
      console.log(objeto_recibido.alerta)
      commit('setAlerta', objeto_recibido.alerta)

      db.collection('usuarios').doc(this.state.usuario.email).update({
        alerta: objeto_recibido.alerta

      }).then(() => {
        alert("Alerta actualizada correctamente " + objeto_recibido.alerta)
        console.log('Alerta editada correctamente')
        //router.push('/miperfil') //volver a la ruta raiz
      })

    },




    agregarTarea({ commit }, nombreTarea) {
      db.collection('datos').add(
        //.doc('usuario').set()
        {
          nombre: nombreTarea
        })
        .then(doc => {
          console.log(doc.id)
          router.push('/')
          //console.log(doc.data())
        })

    },



  },


  getters: {
    existeUsuario(state) {
      console.log("estado", state)
      console.log(state.usuario === null)
      if (state.usuario === null) {
        return false
      }
      else {
        return true
      }
    }
  },
  modules: {
  }
})
