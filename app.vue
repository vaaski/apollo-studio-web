<script setup lang="ts">
import "@acab/reset.css"
import "~/assets/base.scss"
import "@fontsource-variable/outfit"
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

  @media screen and (max-width: 800px) {
    --nav-height: 5rem;
  }
}

.nav-bar {
  height: var(--nav-height);
}

#page {
  margin-top: var(--nav-height);
}
</style>
