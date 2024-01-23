<script setup lang="ts">
import "@acab/reset.css"
import "~/assets/base.scss"
import "@fontsource-variable/outfit"
</script>

<template>
  <div id="apollo">
    <NavBar />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
#apollo {
  display: flex;
  flex-direction: column;
}
</style>
