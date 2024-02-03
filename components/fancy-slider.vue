<script setup lang="ts">
const properties = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true,
  },
  slideDuration: {
    type: Number,
    required: false,
    default: 3e3,
  },
})
</script>

<template>
  <Carousel
    :autoplay="properties.slideDuration"
    :wrap-around="true"
    :pause-autoplay-on-hover="true"
  >
    <Slide v-for="image in properties.images" :key="image">
      <div class="carousel__item">
        <img :src="image" alt="Apollo Studio Screenshot" />
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
.carousel__prev,
.carousel__next {
  color: var(--color-foreground-dim);
}

.carousel__prev:hover,
.carousel__next:hover {
  color: var(--color-text);
}

.carousel__pagination-button::after {
  background-color: var(--color-foreground-dim);
}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: var(--color-accent);
}

.carousel__icon {
  filter: drop-shadow(0 0 5px black);
}

.carousel__item {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  margin: 0.5rem 1rem;
}
</style>
