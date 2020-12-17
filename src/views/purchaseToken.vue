 <template>
 <b-overlay 
    id="overlay"
    :show="show"           
    variant="dark"
    opacity="0.64"
    rounded="lg">
  <b-row style="height: 93.56vh;background-color: rgb(223 226 243) !important;" class="align-items-center">
    <b-col class="col-10 col-sm-8 col-md-6 col-lg-4 mx-auto">  
        <b-form-select
            v-model="tokenNumber"
            id="optionsForTokenNUmberid"
            :options="options"
            size="sm"
            style="height: 37px !important"
        ></b-form-select>
        <p id="emptyPtag" class="mb-3"></p> 
        <span id="tokenRequireError" class="d-none text-danger mb-3">Number of token is required</span> 
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
        <button @click="submit" id="stripe_pay_button" class="purchaseToken"><span>Pay €{{amount / 100}}</span></button>
        <button disabled id="stripe_spinner" class="d-none purchaseToken"><span><b-spinner  small label="Small Spinner" variant="primary"></b-spinner></span> </button>
        <button disabled id="doneButton" class="d-none purchaseToken">Done </button>
        <p id="noteForWait" class="mt-2 d-none"><b>NOTE:-  Please wait it will take few minutes don't refresh or chnage url</b></p>
        <p id="tokenBuyDone" class="mt-2 d-none"><b>Token buy successfully done</b> <i class="fa fa-check-circle text-success" aria-hidden="true"></i></p>
      </div>
    </b-col>
  </b-row>
 </b-overlay>
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
      options: [
        { value: "500_tokens", text: "500" },
        { value: "1000_tokens", text: "1000" },
        { value: "2000_tokens", text: "2000" },
        { value: "5000_tokens", text: "5000" },
        { value: "10000_tokens", text: "10000" },
        { value: "20000_tokens", text: "20000" },
      ],
    tokenNumber:"500_tokens",
    show: false,
    loading: false,
    amount: 50,
    publishableKey: 'pk_test_51HyrzRFlz3SmLkoJ33hQ8bfmWYWnJwUWPSO6MMrNlT33fJunFmsZ29wsn0LvBIXqtN77SKS4DBgmwhz5n5yLOxwS00BhdG3IRP',
    token:null,
    charge:null,
    };
  },
  created() {},
  methods: {
    ...mapActions([
      "buyToken",
    ]),
    submit () {
        this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      $("#stripe_pay_button").addClass("d-none");
      $("#stripe_spinner").removeClass("d-none");
      $("#noteForWait").removeClass("d-none");
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
    enterToken (){
        switch (this.tokenNumber) {
            case "500_tokens":
                this.amount = 50;
                break;
            case "1000_tokens":
                this.amount = 100;
                break;
            case "2000_tokens":
                this.amount = 200;
                break;
            case "5000_tokens":
                this.amount = 500;
                break;
            case "10000_tokens":
                this.amount = 1000;
                break;
            case "20000_tokens":
                this.amount = 2000;
                break;
        }
        let amount = this.amount;
    },
    sendTokenToServer (charge) {
        this.buyToken({charge:this.charge,tokenNumber:this.tokenNumber})
    }
  },
 watch: {
    tokenNumber: function() {
      this.enterToken();
    }
  },
  mounted:async function () {

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
  button.purchaseToken{
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
    margin-top: -1rem;
    align-items: center;
    justify-content: center;
    width: 100%;

  }
</style>
