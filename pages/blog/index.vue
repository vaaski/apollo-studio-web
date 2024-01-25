<script setup lang="ts">
useSeoMeta({
  title: "Apollo Studio // Blog",
  description: "Read about the latest updates to Apollo Studio",
})

const { data: navigation } = await useAsyncData("blog-entries", () => {
  return queryContent("blog").find()
})
if (!navigation.value) throw new Error("No navigation")

const entries = [...navigation.value]
  .filter((entry) => entry._path)
  .sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
})
</script>

<template>
  <div class="blog">
    <ol>
      <template v-for="entry in entries" :key="entry._path">
        <li>
          <RouterLink :to="entry._path!">
            <h3>{{ entry.title }}</h3>
            <span v-if="entry.date">{{ formatter.format(entry.date * 1e3) }}</span>

            <p>{{ entry.description }}</p>
          </RouterLink>
        </li>
      </template>
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
  margin: 1rem auto;
  max-width: min(1000px, var(--max-content-width));
  box-shadow: 0 0 0 1px var(--color-foreground-dim);
  border-radius: 0.5rem;

  a {
    display: inline-block;
    padding: 2rem 3rem;
  }

  h3 {
    font-size: 1.25em;
    color: var(--color-text-bright);
  }

  span {
    color: var(--color-foreground-dim);
  }

  p {
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
