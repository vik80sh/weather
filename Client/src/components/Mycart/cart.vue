<template>
  <div class="cart-wrapper">
    <div v-for="(dataValue , index) in data" :key="index" class="city-added">
     <p> {{dataValue.city}}</p>
     <p> {{dataValue.country}}</p>
     <p>Long:  {{dataValue.lon}}</p>
     <p>Lat:  {{dataValue.lat}}</p>

      <span @click="remove(dataValue)"><strong>Remove</strong></span>
    </div>
    {{this.message}}
  </div>
</template>
<script>
import { HelpersFunction } from "./../../HelperFunctions/index";
export default {
  name: "Cart",
  data() {
    return {
      data: "",
      message: ""
    };
  },
  async created() {
    let token = localStorage.getItem("userToken");
    if (token) {
      let res = await HelpersFunction.getCartData(token);
      if (res.statusCode === "fail") {
        this.message = res.message
          ? res.message
          : "Something went wrong please refresh the page";
      } else {
        this.data = res.data;
        this.message =
          res.data.length == 0
            ? "No data in your card Please add some city "
            : "";
      }
    } else {
      this.$router.push("/form");
    }
  },
  methods: {
    async remove(data) {
      let token = localStorage.getItem("userToken");
      if (token) {
        let res = await HelpersFunction.removeFromCart(data,token);
        if (res.statusCode === "fail") {
          this.message = res.message
            ? res.message
            : "Something went wrong please refresh the page";
        } else {
          this.data = this.data.filter(dataValue=> (dataValue.city !== data.city && dataValue.country!==data.country))
        }
      } else {
        this.$router.push("/form");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./cart.scss";
</style>