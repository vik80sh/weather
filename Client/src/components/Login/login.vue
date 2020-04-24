<template>
  <div class="form-wrapper">
    <div class="header-container">
      <span @click="changeTab(1)">login</span>
      <span @click="changeTab(2)">signUp</span>
    </div>
    <div v-if="tab==1" class="login">
      <input type="text" v-model="username" placeholder="username" />
      <input type="text" v-model="password" placeholder="password" />
      <button @click="register('y')">Sumbit</button>
    </div>
    <div v-if="tab==2" class="signup">
      <input type="text" v-model="username" placeholder="username" />
      <input type="text" v-model="password" placeholder="password" />
      <input type="text" v-model="confPassword" placeholder="Retype password" />
      <button @click="register('x')">Sumbit</button>
    </div>
    <div class="error" v-if="error">
      <p @click="close">X</p>
      {{this.errormessage}}
    </div>
  </div>
</template>

<script>
import { HelpersFunction } from "./../../HelperFunctions/index";

export default {
  name: "Form",
  data() {
    return {
      tab: 1,
      username: "",
      password: "",
      confPassword: "",
      errormessage: "",
      error: false
    };
  },
  methods: {
    changeTab(tabvalue) {
      this.tab = tabvalue;
    },
    async register(data) {
     let res="";
      if (data === "x") {
        if (!(this.username && this.password && this.confPassword)) {
          this.errormessage = "Please fill all the filed";
          this.error = true;
        } else if (this.password !== this.confPassword) {
          this.errormessage = "Password is not matching";
          this.error = true;
        } else {
           res= await HelpersFunction.userLogin(
            this.username,
            this.password,
            "x"
          );
        }
      } else {
        if (!(this.username && this.password )) {
            this.errormessage = "Please fill all the filed";
            this.error = true;
        }  else {
          res =await HelpersFunction.userLogin(
            this.username,
            this.password,
            "y"
          );
        }
      }
      if(res.statusCode==="fail"){
          this.errormessage = res.message;
          this.error = true;
      }
      else{
          localStorage.setItem("userToken",res.data)
          this.$router.push('/')
          window.location.reload()
      }
    },
    close() {
      this.error = false;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./login.scss";
</style>