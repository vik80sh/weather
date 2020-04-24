<template>
  <div class="nav-extended indigo darken-2 footer-wrapper">
      <div class="title">
          This is a demo project which is developed in VueJS by Mindtree Mind.
      </div>
      <div class="link-icon">
        Developed By :  <a :href= "github" class="icon">Github
          </a>
          <a :href= "linkedIn"  class="icon">LinkedIn
          </a>
      </div>
      <div class="copy-right"><footer>&copy; Copyright 2020 Mindtree  😋 😋</footer></div>
  </div> 
</template>
<script>
export default {
    name: "Footer",
    data(){
        return {
            github: "https://github.com",
            linkedIn:"https://www.linkedin.com",
        }
    }
}
</script>
<style lang="sass" scoped>
@import "./footer.scss";

</style>