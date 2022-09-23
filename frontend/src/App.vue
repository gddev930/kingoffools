<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {            
    // window.addEventListener("unload", this.saveState);
  },
  methods: {
  }
}
</script>
<style >
</style>
