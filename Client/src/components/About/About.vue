<template>
  <div class="about-wrapper container-fluid">
    <div class="row">
      <div class="col-xs-6 image">
        <img v-bind:src="this.image" />
      </div>
      <div class="col-xs-6 about-text">
        <div class="page-tile">Weather Forcast </div>
        <p>
          Weather forecasts are made by collecting as much data as possible about the current state of the atmosphere (particularly the temperature,
          humidity and wind) and using understanding of atmospheric processes (through meteorology).
        </p>
        <p>
            This Project is Developed only for learning purpose , Sometimes API's giving the wrong result.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import image from "./../../assets/Capture.png";
export default {
  name: "About",
  data() {
    return {
      image: image
    };
  }
};
</script>

<style lang="sass" scoped>
@import './About.scss'
</style>