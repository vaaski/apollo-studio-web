<template lang="pug">
.post
  .inner(v-if="$store.state.posts[$route.params.id]" v-html="$store.state.posts[$route.params.id].content")
</template>

<script>
export default {
  name: "apollo-post",
  mounted() {
    if (!this.$store.state.posts[this.$route.params.id])
      console.log("gotta fetch post")
  },
}
</script>

<style lang="stylus">
.post
  max-width: 100%
  overflow-x: hidden

  .inner
    font-size: 1.2em
    padding: 0 3vw

    .markdown-body h1, .markdown-body h2
      border-bottom: 1px solid #424242
      padding-bottom: 0.3em

    h1, h2, h3, h4, h5, h6
      font-family: "Roboto Mono", monospace
      color: white

    a
      color: #66afef
      text-decoration: none

    a.anchor
      margin-right: 8px

      .octicon.octicon-link
        fill: #DCDCDC

    >#file>article
      max-width: 100vw
</style>
