<script setup lang="ts">
useSeoMeta({
  title: "Apollo Studio // Blog",
  description: "Read about the latest updates to Apollo Studio",
})

const { data: navigation } = await useAsyncData("blog-entries", () => {
  return queryContent("blog").find()
})
if (!navigation.value) throw new Error("No navigation")

const entries = [...navigation.value].filter((entry) => entry._path).reverse()
console.log(entries)
</script>

<template>
  <div class="blog">
    <ol>
      <li v-for="entry in entries" :key="entry._path">
        <RouterLink :to="entry._path!">
          <h3>{{ entry.title }}</h3>
          <p>{{ entry.description }}</p>
        </RouterLink>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.blog {
  display: flex;
  justify-content: center;
}

ol {
  padding: 1rem 0;
}

li {
  padding: 2rem 3rem;
  margin: 1rem auto;
  max-width: min(1000px, var(--max-content-width));
  box-shadow: 0 0 0 1px var(--color-foreground-dim);
  border-radius: 0.5rem;

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25em;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
