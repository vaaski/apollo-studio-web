<script setup lang="ts">
const IMAGES = [
  "/screenshots/pattern.png",
  "/screenshots/tracks.png",
  "/screenshots/start.png",
  "/screenshots/track0.png",
  "/screenshots/track1.png",
]

const SLIDE_DURATION = 3e3
</script>

<template>
  <div class="slider">
    <ClientOnly>
      <FancySlider :images="IMAGES" :slide-duration="SLIDE_DURATION" />

      <template #fallback>
        <div class="slides">
          <div v-for="image in IMAGES" :key="image">
            <img :src="image" alt="Apollo Studio Screenshot" />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.slider {
  --slider-size: min(500px, 85vw);

  text-align: center;
  overflow: hidden;
  width: var(--slider-size);
}

.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scroll-snap-points-x: repeat(var(--slider-size));
  scroll-snap-type: mandatory;
}

.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: var(--slider-size);
  margin-right: 50px;
  position: relative;

  display: flex;
  justify-content: center;
}

img {
  width: var(--slider-size);
  max-height: 300px;
  height: 100%;
  object-fit: contain;
  -webkit-user-drag: none;
}
</style>
