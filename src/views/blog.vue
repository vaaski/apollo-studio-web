<template lang="pug">
.blog
  .articles
    .article(v-for="(art, i) in articles" v-if="art.content")
      .title {{ articles[i].content.split("\n\n")[0].replace("#", "") }}
      .preview {{ articles[i].content.split("\n\n")[1] }}
</template>

<script>
export default {
  name: "blog",
  data: () => ({
    articles: [],
  }),
  async mounted() {
    window.blog = this
    const self = this

    self.articles = (await self.axios(
      "https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/contents"
    )).data

    self.articles.forEach(async (art, i) => {
      self.articles[i].content = (await self.axios(
        `https://raw.githubusercontent.com/mat1jaczyyy/apollo-studio-blog/master/${art.path}`
      )).data
      self.$forceUpdate()
    })
  },
}
</script>

<style lang="stylus"></style>
