<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>
  <<style lang="sass" scoped>
  
  
  </style>