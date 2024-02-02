<script setup lang="ts">
useSeoMeta({
  title: "Apollo Studio",
  description: "A standalone editor and live playback engine for Launchpad light effects",
})
</script>

<template>
  <div class="landing">
    <ApolloHero />
    <BottomCredits />
  </div>
</template>

<style scoped lang="scss">
.landing {
  display: flex;
  flex: 1;
}

.bottom-credits {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.1;
  transition: 100ms;

  &:hover {
    opacity: 0.5;
  }
}
</style>
