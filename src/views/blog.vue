<template lang="pug">
.blog
  .posts
    .post(v-for="(art, i) in $store.state.posts" v-if="art.content && art.preview" @click="$router.push(`/post/${art.id}`)")
      .title.mono {{ art.title }}
      .preview(v-html="art.preview")
</template>

<script>
export default {
  name: "blog",
  data: () => ({
    posts: {},
  }),
  async mounted() {
    window.blog = this
    const self = this

    const posts = (await self.axios(
      "https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/contents"
    )).data

    const getposts = () => {
      console.log("getting posts")
      posts.forEach(async (art, i, arr) => {
        const id = art.path.replace(".md", "")
        if (!self.posts[id]) self.posts[id] = { id }

        const text = (await self.axios(
          `https://raw.githubusercontent.com/mat1jaczyyy/apollo-studio-blog/master/${art.path}`
        )).data
        self.posts[id].title = text.split("\n\n")[0].replace("#", "")

        console.log(text)

        self.posts[id].content = (await self.axios({
          url: `https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/contents/${id}.md`,
          headers: { Accept: "application/vnd.github.v3.html" },
        })).data

        self.posts[id].preview = (await self.axios.post(
          "https://api.github.com/markdown",
          {
            text: text.split("\n\n")[1],
            mode: "gfm",
            context: "mat1jaczyyy/apollo-studio",
          }
        )).data

        if (i === arr.length - 1)
          self.$store.commit("set", ["posts", self.posts])
        self.$forceUpdate()
      })
    }

    if (!self.$store.state.posts) getposts()
    else
      posts.forEach(art => {
        const id = art.path.replace(".md", "")
        if (!self.$store.state.posts[id]) getposts()
      })
  },
}
</script>

<style lang="stylus">
.blog
  width: 100%

  .posts
    max-width: 100%
    padding: 64px 3vw 0 3vw

    @media only screen and (min-width: 1000px)
      padding: 32px 7vw 64px 7vw

    .post
      box-shadow: 1px 1px 15px -5px rgba(0, 0, 0, 0.5)
      padding: 32px 3vw
      border-radius: 5px
      cursor: pointer

      .title
        font-size: 2em
        margin-bottom: 4px

      .preview > p
        margin-bottom: 0
        font-size: 1.25em
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        // white-space: nowrap
        overflow: hidden
        // text-overflow: ellipsis
</style>
