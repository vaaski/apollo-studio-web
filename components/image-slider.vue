<script setup lang="ts">
import { useElementHover } from "@vueuse/core"

const IMAGES = [
  "/screenshots/pattern.png",
  "/screenshots/tracks.png",
  "/screenshots/start.png",
  "/screenshots/track0.png",
  "/screenshots/track1.png",
]

const SLIDE_DURATION = 3e3

const wait = (t: number): Promise<void> => new Promise((r) => setTimeout(r, t))
const slides = ref<HTMLDivElement[]>()
const slider = ref<HTMLDivElement>()
const sliderHovered = useElementHover(slider)

const hideScrollbar = ref(false)

let currentSlide = 0
const startSlider = async () => {
  if (!slides.value) return
  if (!slider.value) return
  hideScrollbar.value = true

  await wait(SLIDE_DURATION)
  while (!sliderHovered.value) {
    currentSlide = (currentSlide + 1) % slides.value.length

    slides.value[currentSlide]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })

    await wait(SLIDE_DURATION)
  }

  watch(sliderHovered, startSlider, { once: true })
}

onMounted(startSlider)
</script>

<template>
  <div class="slider">
    <div ref="slider" class="slides" :class="{ 'hide-scrollbar': hideScrollbar }">
      <div v-for="image in IMAGES" :key="image" ref="slides">
        <img :src="image" alt="Apollo Studio Screenshot" />
      </div>
    </div>
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

.slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.slides::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
.slides::-webkit-scrollbar-track {
  background: transparent;
}

.slides.hide-scrollbar::-webkit-scrollbar {
  display: none;
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
}
</style>
