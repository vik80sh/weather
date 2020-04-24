<template>
  <div class="navbar nav-extended indigo darken-2">
    <nav class="nav-extended">
      <div class="nav-content">
        <router-link :to="{name: 'Home'}">
          <span class="nav-title">
            <span class="material-icons">home</span> Weather System
          </span>
        </router-link>

        <span class="nav-about" @click="logout">{{login}}</span>

        <router-link :to="{name: 'Cart'}" class="cart" v-if="login=='Logout'">
          <span class="nav-about">Cart</span>
        </router-link>
        <router-link :to="{name: 'About'}" class="about">
          <span class="nav-about">About</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      login: "Login"
    };
  },
  async created() {
    let data = localStorage.getItem("userToken");
    if (data) this.login = "Logout";
  },
  methods: {
    logout() {
      if (this.login === "Login") {
        this.$router.push("/form");
      } else {
        localStorage.removeItem("userToken");
        this.login = "Login";
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./Navbar.scss";
</style>

