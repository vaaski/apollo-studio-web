<template lang="pug">
.blog
  .showcase
    carousel(:perPage="1" paginationColor="#535353" paginationActiveColor="#FFF"
      :autoplay="true" :autoplayTimeout="5000" easing="cubic-bezier(0.77, 0, 0.175, 1)" :navigationEnabled="true").carousel
      slide(v-for="image in pictures").slide
        img(:src="image")
  .posts
    .post(v-for="post in sortedPosts" v-if="post.content && post.preview" @click="$router.push(`/post/${post.id}`)")
      .title.mono {{ post.title }}
      .date {{new Date(Number(post.id) * 1000).toLocaleDateString()}}
      .preview(v-html="post.preview")
</template>

<script>
export default {
  name: "blog",
  data: () => ({
    posts: {},
    pictures: {
      track0: "https://i.imgur.com/0ObCItx.png",
      track1: "https://i.imgur.com/V0VDApe.png",
      start: "https://i.imgur.com/kB9XNrS.png",
      pattern: "https://i.imgur.com/OuBTF81.png",
      tracks: "https://i.imgur.com/hR4Ty1N.png",
    },
  }),
  computed: {
    sortedPosts() {
      const { state } = this.$store

      if (!state.posts) return []
      let ret = []
      Object.keys(state.posts).forEach(key => {
        ret.push(state.posts[key])
      })
      return ret.reverse()
    },
  },
  async mounted() {
    window.blog = this
    const self = this

    const posts = (await self.axios(
      "https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/contents"
    )).data

    const getposts = async () => {
      console.log("getting posts")
      posts.forEach(async (art, i, arr) => {
        const id = art.path.replace(".md", "")
        if (!self.posts[id]) self.posts[id] = { id }

        const text = (await self.axios(
          `https://raw.githubusercontent.com/mat1jaczyyy/apollo-studio-blog/master/${art.path}`
        )).data
        self.posts[id].title = text.split("\n\n")[0].replace("#", "")

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

        console.log(self.posts)
        self.$store.commit("set", ["posts", self.posts])
        self.$forceUpdate()
      })

      const { data: last_commit } = await self.axios.get(
        "https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/commits/master"
      )
      self.$store.commit("set", ["last_commit", last_commit])
    }

    if (!self.$store.state.posts) getposts()
    else {
      const { data: last_commit } = await self.axios.get(
        "https://api.github.com/repos/mat1jaczyyy/apollo-studio-blog/commits/master"
      )
      if (self.$store.state.last_commit.sha !== last_commit.sha) getposts()
    }
  },
}
</script>

<style lang="stylus">
.VueCarousel-dot
  outline: none !important
  margin-top: 0 !important

.VueCarousel-navigation-next, .VueCarousel-navigation-prev
  outline: none !important
  color: #FFF !important

.VueCarousel-navigation-prev
  left: 33px !important

.VueCarousel-navigation-next
  right: 33px !important

.blog
  width: 100%

  .showcase
    .carousel
      .slide
        display: flex
        justify-content: center
        align-items: center

        img
          max-width: 95%

  .posts
    max-width: 100%
    padding: 64px 3vw 0 3vw

    @media only screen and (min-width: 1000px)
      padding: 32px 7vw 64px 7vw

    .post
      box-shadow: 1px 1px 15px -5px rgba(0, 0, 0, 0.25)
      padding: 32px 3vw
      border-radius: 5px
      cursor: pointer

      .date
        opacity: 0.5

      .title
        font-size: 2em
        margin-bottom: 4px

      .preview > p
        margin-bottom: 0
        font-size: 1.25em
        display: -webkit-box
        -webkit-line-clamp: 3
        -webkit-box-orient: vertical
        // white-space: nowrap
        overflow: hidden
        // text-overflow: ellipsis
</style>
