<template>
  <div id="app">
    <Map />
  </div>
</template>

<script>
import Map from "./components/index.vue";

export default {
  name: "App",
  components: {
    Map,
  },
};
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
</style>
