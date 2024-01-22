<script setup lang="ts">
const route = useRoute()

const { data: navigation } = await useAsyncData("blog-entries", () => {
  return fetchContentNavigation(queryContent("blog"))
})
if (!navigation.value) throw new Error("No navigation")

const [results] = navigation.value
if (!results.children) throw new Error("No results")

const entries = [...results.children].reverse()
</script>

<template>
  <div>
    <h1>da blogger</h1>
    <p>Current route: {{ route.path }}</p>
    <RouterLink to="/">Go back</RouterLink>

    <hr>

    <ol>
      <li v-for="entry in entries" :key="entry._path">
        <RouterLink :to="entry._path">{{ entry.title }}</RouterLink>
      </li>
    </ol>
  </div>
</template>
