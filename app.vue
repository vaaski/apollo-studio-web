<script setup lang="ts">
import "@acab/reset.css"
import "~/assets/base.scss"
import "@fontsource-variable/outfit"

useSeoMeta({
  title: "Apollo Studio",
  description: "A standalone editor and live playback engine for Launchpad light effects",
})
</script>

<template>
  <div id="apollo">
    <NavBar class="nav-bar" />
    <NuxtPage id="page" />
  </div>
</template>

<style lang="scss">
#apollo {
  display: flex;
  flex-direction: column;

  --nav-height: 4rem;

  @media screen and (max-width: 600px) {
    --nav-height: 5rem;
  }
}

.nav-bar {
  height: var(--nav-height);
}

#page {
  margin-top: var(--nav-height);
  // max-height: calc(100vh - var(--nav-height));
}
</style>
