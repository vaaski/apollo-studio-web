<template lang="pug">
.post
  .inner(v-if="content || $store.state.posts[$route.params.id]"
    v-html="content || $store.state.posts[$route.params.id].content")
</template>

<script>
export default {
  name: "apollo-post",
  data: () => ({
    content: false,
  }),
  async mounted() {
    const id = this.$route.params.id
    if (!this.$store.state.posts[id]) {
      this.content = (await this.axios({
        url: `https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/contents/${id}.md`,
        headers: { Accept: "application/vnd.github.v3.html" },
      })).data
    }
  },
}
</script>

<style lang="stylus">
.post
  max-width: 100%
  overflow-x: hidden

  .inner
    font-size: 1.2em

    p
      text-align: justify

    .markdown-body h1, .markdown-body h2
      border-bottom: 1px solid #424242
      padding-bottom: 0.3em

    h1, h2, h3, h4, h5, h6
      font-family: "Roboto Mono", monospace
      color: white

    a.anchor
      margin-right: 8px

      .octicon.octicon-link
        fill: #DCDCDC

    >#file>article
      max-width: 100vw
</style>
