 <template>
  <b-row style="height: 93.56vh;background-color: #212D63!important;" class="align-items-center">
    <b-col class="col-10 col-sm-8 col-md-6 col-lg-4 mx-auto">    
      <div class="ml-1">
    <a style="color:white;text-decoration:underline;cursor:pointer" @click="$router.go(-1)">{{selectedLan == 'es'
  ? $Back_es
  : selectedLan == 'pt'
  ? $Back_pt
  : selectedLan == 'ar'
  ? $Back_ar
  : $Back_en}}</a>
    </div>
      <div class="wrapper ">
          <stripe-elements
            ref="elementsRef"
            :pk="publishableKey"
            :amount="amount"
            locale="en"
            @token="tokenCreated"
            @loading="loading = $event"
        >
        </stripe-elements>
        <button @click="submit"><span id="stripe_pay_button">Pay €{{amount / 100}}</span><span id="stripe_spinner" class="d-none"><b-spinner  small label="Small Spinner" variant="primary"></b-spinner></span> </button>
      </div>
    </b-col>
  </b-row>
</template> 

<script>
import Vue from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { db } from "../firebase";
import { auth } from "../firebase";
import store from "../store";
import firebase from "firebase/app";
import $ from "jquery";
import { StripeElements } from 'vue-stripe-checkout';
export default {
  components: {
    StripeElements
  },
  data() {
    return {
    loading: false,
    amount: 1000,
    publishableKey: 'pk_test_lyuqxKSznf3JwIHkQNJCAT1b00miGKGAdj',
    token:null,
    charge:null,
    };
  },
  created() {},
  methods: {
    ...mapActions([
/*       "cerrarSesion", */
    ]),
     submit () {
       $("#stripe_pay_button").addClass("d-none");
        $("#stripe_spinner").removeClass("d-none");
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      //debugger
      this.sendTokenToServer(this.charge);
    },
  async sendTokenToServer (charge) {
      let settings = {
        async: true,
        crossDomain: true,
        url:"https://api.stripe.com/v1/charges",
        method: "POST",
        dataType: "json",
        data: {
        amount: this.charge.amount,
        currency: 'inr',
        source: this.charge.source,
        description: 'My First Test Charge (created for API docs)',
        },
        headers: { "Authorization": "Bearer sk_test_hTiB60KCZawl3ppLv9eVUwGH00BoqQ0tsX" },
      };
      let payment = this.charge.amount;
      let email = this.usuario.email;
      await $.ajax(settings).done(function (response) {
        if(response.status == "succeeded"){
        store.commit("setSubscription", "done");
         let subscribeObject ={
            amount:payment,
            balance_transaction:response.balance_transaction,
            currency:response.currency,
          }
          db.collection('usuarios').doc(email).update({
          subscribeStatus: true,
          subscribeObject:subscribeObject
          }).then(() => {
            $("#stripe_pay_button").removeClass("d-none");
            $("#stripe_spinner").addClass("d-none");
          }).catch((error) => {
            console.log(error)
            $("#stripe_pay_button").removeClass("d-none");
            $("#stripe_spinner").addClass("d-none");
          })
        }
      }).fail(function(data){
       $("#stripe_pay_button").removeClass("d-none");
      $("#stripe_spinner").addClass("d-none");
        alert("Try again !");
      });
    }
  },
  mounted:async function () {
/*   (this.imgurl3 = 'img/avatar-01.6b36b5f2.png'),
    setTimeout(function () {
      let user = firebase.auth().currentUser;
      if (user) {
        let fecha2 = new Date();

        var imgurl2 =
          "https://firebasestorage.googleapis.com/v0/b/autofeed2020.appspot.com/o/avatares%2F" +
          encodeURIComponent(user.email) +
          ".jpg?alt=media&time=" +
          fecha2.getTime();
        document.getElementById("imgmenu").src = imgurl2;
        //this.imgurl3 = imgurl2;
        //this.cambiarimagen(imgurl2) //method1 will execute at pageload
      }
    }, 400); */
  },
  computed: {
    ...mapGetters(["existeUsuario"]),
    ...mapState([ "usuario","subscribe", "selectedLan"]),
  },
};

///Constants
Vue.prototype.$Back_es = "atrás";
Vue.prototype.$Back_pt = "Costas";
Vue.prototype.$Back_en = "Back";
Vue.prototype.$Back_ar = "عودة";
</script>
<style>
  .wrapper{
    /* width:600px; */
    /* margin:0 auto; */
    /* height: 100%; */
    margin-top: -115px;
  }
  button{
    border: none;
    outline: none;
    color: #878EAE;
    background: #3A4B9B;
    white-space: nowrap;
    display: flex;
    line-height: 45px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0, .08);
    border-radius: 4px;
    text-decoration: none;
    transition: all 150ms ease;
    /* margin-top: 1rem; */
    align-items: center;
    justify-content: center;
    width: 100%;

  }
</style>
