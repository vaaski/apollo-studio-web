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
          <div v-for="(image, index) in IMAGES" :id="`image-${index}`" :key="image">
            <img :src="image" alt="Apollo Studio Screenshot" />
          </div>
        </div>
        <div class="navigation">
          <a v-for="(_, index) in IMAGES" :key="_" :href="`#image-${index}`">
            <div class="dot"></div
          ></a>
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

.navigation {
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    padding: 5px;

    > .dot {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--color-foreground-dim);
    }

    &:active > .dot,
    &:focus > .dot {
      background-color: var(--color-accent);
    }
  }
}

.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scroll-snap-points-x: repeat(var(--slider-size));
  scroll-snap-type: mandatory;

  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
  }
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
