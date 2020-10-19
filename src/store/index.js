import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { db } from '../firebase';
import { auth } from '../firebase';
import router from '../router';
import $ from "jquery";
import Swal from 'sweetalert2'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    paginationCount: null,
    usuario: null,
    nombre_y_apellidos: { nombre: '', apellidos: '', selectedLan: '' },
    nombre: null,
    firstName:null,
    surname:null,
    apellidos: null,
    teléfono: null,
    selectedTag:'Notselected',
    address: null,
    city: null,
    email: null,
    psCode: null,
    selectedLan: null,
    changeRangeDate: null,
    alerta: null,
    alertaObject: [],
    tags: [],
    tags_array: [],
    tags_array_completo: [],
    tag: '',
    error: null,
    noticiasLength: null,
    tarea: { nombre: '', id: '' },
    tareas: [],
    noticias_backup: [],
    noticias_backupES: [],
    noticias_alerta: [],
    noticias_like: [],
    keywordactual: [],
    items2: [],
    noticias: [],
    noticiasTemp: [],
    translated: [],
  },
  mutations: {
    setTareas(state, payload) {
      state.tareas = payload
    },
    setPaginationCount(state, payload) {
      state.paginationCount = payload
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
    setNoticiasLength(state, payload) {
      state.noticiasLength = payload
    },
    setNoticiasTemp(state, payload) {
      state.noticiasTemp = payload
    },
    setChangeRangeDate(state, payload) {
      state.changeRangeDate = payload
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
    setFirstName(state, payload) {
      state.firstName = payload
    },
    setSurname(state, payload) {
      state.surname = payload
    },
    setApellido(state, payload) {
      state.apellidos = payload
    },
    setTeléfono(state, payload) {
      state.teléfono = payload
    },
    setAddress(state, payload) {
      state.address = payload
    },
    setPsCode(state, payload) {
      state.psCode = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
    setCity(state, payload) {
      state.city = payload
    },
    setSelectedLan(state, payload) {
      state.selectedLan = payload
    },
    setAlerta(state, payload) {
      state.alerta = payload
    },
    setAlertaObject(state, payload) {
      state.alertaObject = payload
    },
    setTags(state, payload) {
      state.tags = payload
    },
    setTags_array(state, payload) {
      state.tags_array = payload
    },
    setTags_array_completo(state, payload) {
      state.tags_array_completo = payload
    },
    setTag(state, payload) {
      state.tag = payload
    },
    setSelectedTag(state, payload) {
      state.selectedTag = payload
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
            terms_condition: usuario.termsAndCondition,
            languages: idiomas_defecto
          }).then(doc => {
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
          //window.location.reload()
        })
    },

    detectarUsuario({ commit }, usuario) {

      if (usuario != null) {
        commit('setUsuario', usuario)


        let tags = []
        /* Descomentar por si queremos coger todos los datos desde main.js
        y queremos para los tags*/

        db.collection('usuarios').doc(usuario.email).get()
          .then(doc => {


            let datos = doc.data()

            if (typeof datos !== "undefined") {

              commit('setNombre', datos.nombre)
              commit('setSurname', datos.surname)
              commit('setFirstName', datos.firstName)
              commit('setApellido', datos.apellidos)
              commit('setCity', datos.city)
              commit('setAddress', datos.address)
              commit('setTeléfono', datos.teléfono)
              commit('setPsCode', datos.psCode)
              commit('setEmail', datos.email)
              commit('setSelectedLan', datos.default_language)
              commit('setAlerta', datos.alerta ? datos.alerta : "")
              commit('setAlertaObject', datos.alertaObject ? datos.alertaObject : [])
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
                let typeOfTag = ""
                let typeOfTrend = ""
                tags.push(entry)


                if (typeof alarmas_lista != "undefined") {
                  alarmas_lista2.forEach(element => {
                    let alarmas_lista3 = element.split(";");

                    if (alarmas_lista3[1] == entry) {
                      //alarmaponer = alarmas_lista3[0]
                      alarmaponer = alarmas_lista3[0] && alarmas_lista3[0].length > 0?JSON.parse(alarmas_lista3[0]):alarmas_lista3[0]
                      typeOfTag = alarmas_lista3[2] ? alarmas_lista3[2] : "Leisure";
                      typeOfTrend = alarmas_lista3[3] ? alarmas_lista3[3] : "Neutral";
                    }
                  });
                }

                let obj = {
                  alarmas: "0",
                  name: entry,
                  typeOfTag: typeOfTag,
                  typeOfTrend: typeOfTrend,
                  alarma: alarmaponer,
                  Publicaciones: "25"
                };

                items2.push(obj)
                n++;
              });


              commit('set_items2', items2)


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
      alert('Hemos enviado un correo a ' + correo.email + ' con las intrucciones para cambiar tu contraseña')
      auth.sendPasswordResetEmail(correo.email)
    },

    getTareas({ commit }) {
      const tareas = []
      db.collection('datos').get()
        .then(res => {
          res.forEach(doc => {
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
      debugger

      const c = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
        .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));




      commit('setNoticias', c)
      //router.push('/') //volver a inicio


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
      router.push('/') //volver a inicio


    },



    mostrarAlarmas({ commit }) {

      let noticias_compuestas3 = this.state.noticias_alerta;

      /*
            const ordered = {}
            
            const b = [language];
            
            const c = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
                       .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));
                       
            console.log(c);*/

      commit('setNoticias', noticias_compuestas3)
      router.push('/') //volver a inicio

      document.getElementById("noticiasid").style.display = "none";

    },






    filtrarporKeyword({ commit }, keyword) {
      commit('setPaginationCount',0 )
      if (keyword == "todos") {
        let ChangeRangeDate = null;
        let noticias_compuestas = this.state.noticias_backupES
        commit('setNoticias', noticias_compuestas)
        commit('setChangeRangeDate', ChangeRangeDate)
        commit('setSelectedTag', 'Notselected')
      }
      else if (keyword !== "todos") {
        commit('setKeywordactual', keyword)
        let lengthOfDocument = 0
        let ChangeRangeDate = 'last week';
        let noticias_compuestas = [];
        let yesterday = Math.round(new Date(new Date().setDate(new Date().getDate() - 7)).getTime() / 1000)
        db.collection('noticias').where("tags", "array-contains", keyword).where("fecha", ">", yesterday).get().then(snapshot => {
          lengthOfDocument = snapshot.size;
        })
        let querryRef = db.collection("noticias").where("tags", "array-contains", keyword).where("fecha", ">", yesterday).limit(10).get()
        querryRef.then(res => {
          res.forEach(doc => {
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
          })
          if (noticias_compuestas.length < 1) {
            router.push('/') //volver a inicio
            commit('setKeywordactual', keyword)
            document.getElementById("botonmodal").click()
          } else {
            let c_filtradas = noticias_compuestas.reverse()
            commit('setNoticias', c_filtradas)
            commit('setChangeRangeDate', ChangeRangeDate)
            commit('setNoticiasTemp', c_filtradas)
            commit('setNoticiasLength', lengthOfDocument)
            commit('setSelectedTag', 'selected')
          }
        })
       }
      else {
        let noticias_compuestas = this.state.noticias_backup

        // → '{"b":"foo","c":"bar","a":"baz"}'

        const ordered = {}
        if (keyword.split(' ').length == 1) {
          let b = [keyword];

          let c = noticias_compuestas.filter(({ tags }) => b.includes(tags[0]))
            .sort(({ tags: r }, { tags: t }) => b.indexOf(r) - b.indexOf(t));



          if (c.length < 1) {
            debugger
            router.push('/') //volver a inicio
            commit('setKeywordactual', keyword)
            document.getElementById("botonmodal").click()


          }

          else { commit('setNoticias', c) }
          console.log(noticias_compuestas)
        }
        if (keyword.split(' ').length == 2) {
          let keywords = keyword.split(' ');
          let b = keywords[0]
          let b2 = keywords[1]
          let c = [];

          noticias_compuestas.forEach(function (valor, indice, array) {
            if ((JSON.stringify(valor.tags).includes(b)) || (JSON.stringify(valor.tags).includes(b2))) {
              c.push(valor);
            }
          });
          commit('setNoticias', c)

          if (c.length < 1) {
            document.getElementById("botonmodal").click()
            router.push('/') //volver a inicio
            commit('setKeywordactual', keyword)

          }
          else { commit('setNoticias', c) }
          router.push('/') //volver a inicio
        }
      }

    },

    saveCreatedNews({ commit }, array) {
      let temparray = array
      let unique_id = db.collection('noticias').doc().id;
      db.collection('noticias').doc(unique_id).set({
        id: temparray[0].id,
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



    getNoticias({ commit }, objectdata) {
      
      commit('setPaginationCount', null)
      const noticias_compuestas = []
      var noticias_alerta = []
      var noticias_alerta_2 = []
      var noticias_like = []
      let alerta_usuario = this.state.alerta;



      let tags = []


      /* Descomentar por si queremos coger todos los datos desde main.js
      y queremos para los tags*/

      auth.onAuthStateChanged(user => {
        if (user) {


          document.getElementById("cargandoid").style.display = "block";

          db.collection('usuarios').doc(user.email).get()
            .then(doc => {
              let lengthOfDocument = 0
              let datos = doc.data()
              let objeto_tags = datos.tags;

              //Antigua forma de convertir string tags a array tags

              let taglist = (datos.tags[0]).split(";");
              taglist.forEach(function (entry) {
                tags.push(entry)
              });
              commit('setTags_array', tags)

              var today = Math.round(new Date(new Date().setDate(new Date().getDate())).getTime() / 1000);
              var yesterday
              if (objectdata.rangedateChoosen == "today") {
                yesterday = Math.round(new Date(new Date().setDate(new Date().getDate() - 1)).getTime() / 1000)
              } else if (objectdata.rangedateChoosen == "2 days ago") {
                yesterday = Math.round(new Date(new Date().setDate(new Date().getDate() - 2)).getTime() / 1000)
              }else if (objectdata.rangedateChoosen == "last week") {
                yesterday = Math.round(new Date(new Date().setDate(new Date().getDate() - 7)).getTime() / 1000)
              }
              var dateStartOEnd = objectdata.yesterdayDate ? objectdata.yesterdayDate : yesterday;
              var yeaterdayTemp = Math.round(new Date(new Date().setDate(new Date().getDate() - 1)).getTime() / 1000)
              var monthago = Math.round(new Date(new Date().setDate(new Date().getDate() - 20)).getTime() / 1000);
              let tags_filtrar = this.state.tags
              let firts10tags = tags.slice(0, 9);
              let querryRef
              if (objectdata.selectedTag == 'selected') {
                db.collection('noticias').where("tags", "array-contains", this.state.keywordactual).where("fecha", ">", yesterday).get().then(snapshot => {
                  lengthOfDocument = snapshot.size;
                })
                if (objectdata.type == "next") {
                  querryRef = db.collection("noticias").where("tags", "array-contains", this.state.keywordactual).where("fecha", ">", dateStartOEnd).limit(20).get()
                } else {
                  querryRef = db.collection("noticias").where("tags", "array-contains", this.state.keywordactual).where("fecha", ">", yesterday).where("fecha", "<", dateStartOEnd).limit(20).get()
                }
              } else if(objectdata.selectedTag == 'Notselected'){
                db.collection('noticias').where("tags", "array-contains-any", firts10tags).where("fecha", ">", yesterday).get().then(snapshot => {
                  lengthOfDocument = snapshot.size;
                })
                if (objectdata.type == "next") {
                  querryRef = db.collection("noticias").where("tags", "array-contains-any", firts10tags).where("fecha", ">", dateStartOEnd).limit(20).get()
                } else {
                  querryRef = db.collection("noticias").where("tags", "array-contains-any", firts10tags).where("fecha", ">", yesterday).where("fecha", "<", dateStartOEnd).limit(20).get()
                }
              }

              querryRef.then(res => {
                  res.forEach(doc => {
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

                    if (alerta_usuario) {
                      if (texto_noticia.includes(alerta_usuario)) {
                        noticias_alerta.push(noticia_leida)
                      }
                    }


                    if (typeof correos_like != "undefined") {
                      if (correos_like.includes(user.email)) {
                        noticias_like.push(noticia_leida)
                      }
                    }




                  })


                  //console.log(JSON.stringify(noticias_compuestas));








                  /*ponemos solo en español de base aunque leemos todas*/
                  //.slice(0, 100)
                  /*antiguos filtros
                          let noticias_compuestas2 = noticias_compuestas;
                          const ordered = {}
                          const b = ['es']
                          const c2 = noticias_compuestas2.filter(({ idioma }) => b.includes(idioma))
                            .sort(({ idioma: r }, { idioma: t }) => b.indexOf(r) - b.indexOf(t));
        
        
                  
                          let tags_filtrar = this.state.tags
        
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
                  */

                  let c2 = noticias_compuestas
                  let c_filtradas = noticias_compuestas.reverse()
                  commit('setNoticias', c_filtradas)
                  commit('setNoticiasTemp', c_filtradas)
                  commit('setNoticiasLength', lengthOfDocument)
                  commit('setNoticiasBackupES', c_filtradas)
                  commit('setNoticiasLikes', noticias_like)
                  /*fin de poner solo en español*/


                  //para poner todos los idiomas a la vez commit('setNoticias', noticias_compuestas)
                  commit('setNoticiasBackup', noticias_compuestas)


                  document.getElementById("cargandoid").style.display = "none";
                  if (c_filtradas.length < 1) {
                    document.getElementById("noticiasid").innerHTML = "Aún no hay noticias registradas para tus intereses, pero en unas horas las tendremos preparadas para ti"
                  }
                  else {

                    alerta_usuario = this.state.alerta;
                    var aviso_alarma = (c_filtradas.indexOf(alerta_usuario));
                    var aviso_alarma2 = c_filtradas.find(element => (element.cuerpo).includes(alerta_usuario))
                    if (aviso_alarma2 != null) {
                      noticias_alerta_2.push(aviso_alarma2)
                      document.getElementById("alarmatexto").textContent = "¡Hay alarmas!"
                      document.getElementById("alarmatexto").style.color = "rgb(255 255 255)"
                      document.getElementById("alarmaid").style.color = "rgba(255,255,255,1)"
                      document.getElementById("alarmaid1").style.color = "rgba(255,255,255,1)"


                      //alert("Alerta! Se ha detectado tu texto en la siguiente noticia: \n" + aviso_alarma2.titulo + "\n" +aviso_alarma2.cuerpo +"\nURL: " + aviso_alarma2.url);
                    }
                    //document.getElementById("noticiasid").innerHTML = "Hasta aquí por ahora, regresa en unas horas a por más noticias"
                  }

                  commit('setNoticiasAlerta', noticias_alerta_2)


                })


            })
        }
        /* else {
        } */

      })



    },





    getTarea({ commit }, idTarea) {
      const tareas = []
      db.collection('datos').doc(idTarea).get()
        .then(doc => {
          let tarea = doc.data()
          tarea.id = doc.id
          commit('setTarea', tarea)
        })
    },

    getDatos({ commit }, email) {
      let tags = []
      db.collection('usuarios').doc(email).get()
        .then(doc => {

          let datos = doc.data()
          commit('setNombre', datos.nombre)
          commit('setFirstName', datos.firstName)
          commit('setSurname', datos.surname)
          commit('setApellido', datos.apellidos)
          commit('setCity', datos.city)
          commit('setAddress', datos.address)
          commit('setTeléfono', datos.teléfono)
          commit('setPsCode', datos.psCode)
          commit('setEmail', datos.email)
          commit('setSelectedLan', datos.default_language)
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

            let tarea = doc.data()
            tags_db.push(tarea.es)
            //tarea.id = doc.id

          })
          //aqui al acabar el then poner todo lo de abajo





          let tags3 = []
          let tags_enviar = []


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
          let uniqueSet = new Set(tags3)

          tags3 = [...uniqueSet]
          //hasta aquí quitar duplicados


          const tags2 = (tags3).join(";")

          let contador = 0;

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
            let url2 = 'https://bit4block.es/autofeed/autofeed_translate_tags.php'
            let url3 = 'https://bit4block.es/autofeed/autofeed_news_factory.php?tags=' + encodeURIComponent(tags_get_preparados)
            let urlbaidu = 'https://bit4block.es/autofeed/autofeed_baidu_factory.php?lang=zh&tags=' + encodeURIComponent(tags_get_preparados)
            let urlec = 'https://bit4block.es/autofeed/autofeed_eleconomista_factory.php?tags=' + encodeURIComponent(tags_get_preparados)

            //document.getElementById("cargandoid").style.display = "block";

            var pcg = 30;
            document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
            document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');


            fetch(url2, { mode: 'no-cors' })
              .then(response => {

                pcg = 50;
                document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
                document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');

                if (tags_get.length > 0) {

                  fetch(url3, { mode: 'no-cors' })
                    .then(response => {
                    })
                    .then((data) => {
                      pcg = 75;
                      document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
                      document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');

                      //aqui llama al economista
                      fetch(urlec, { mode: 'no-cors' })
                        .then(response => {
                        })
                        .then((data) => {


                          //y aqui llama a baidu

                          fetch(urlbaidu, { mode: 'no-cors' })
                            .then(response => {
                            })
                            .then((data) => {

                              pcg = 100;
                              document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', pcg);
                              document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(pcg) + '%');


                              //document.getElementById("cargandoid").style.display = "none";
                              document.getElementById("barraid").style.display = "none";
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
              })
              .catch((error) => {
                console.log(error)
              })



            /*fecth bien
                fetch(url2, { mode: 'no-cors'})
            .then(response => {
            })
            .then((data) => {
            })
            .catch((error) => {
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
        router.push('/') //volver a la ruta raiz
      })

    },


    editarTarea2({ commit }, objeto_recibido) {
      db.collection('usuarios').doc(this.state.usuario.email).update({
        nombre: objeto_recibido.nombre?objeto_recibido.nombre:"",
        firstName: objeto_recibido.firstName?objeto_recibido.firstName:"",
        surname: objeto_recibido.surname?objeto_recibido.surname:"",
        apellidos: objeto_recibido.apellidos?objeto_recibido.apellidos:"",
        address: objeto_recibido.address?objeto_recibido.address:"",
        city: objeto_recibido.city?objeto_recibido.city:"",
        teléfono: objeto_recibido.teléfono?objeto_recibido.teléfono:"",
        psCode: objeto_recibido.psCode?objeto_recibido.psCode:"",
        email: objeto_recibido.email?objeto_recibido.email:"",
        default_language: objeto_recibido.selectedLan?objeto_recibido.selectedLan:"",

      }).then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your data has been updated',
          showConfirmButton: false,
          timer: 1500
        })
      })

    },


    editarAlertas({ commit }, objeto_recibido) {
      commit('setAlerta', objeto_recibido.alerta)

      db.collection('usuarios').doc(this.state.usuario.email).update({
        alerta: objeto_recibido.alerta

      }).then(() => {
        alert("Alerta actualizada correctamente " + objeto_recibido.alerta)
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
          router.push('/')
        })

    },



  },


  getters: {
    existeUsuario(state) {
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
