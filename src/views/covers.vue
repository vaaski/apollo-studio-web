<template lang="pug">
.covers
  .cover(v-for="cover in covers")
    .right
      img(:src="`https://img.youtube.com/vi/${cover.video}/mqdefault.jpg`" @click="open(`https://youtu.be/${cover.video}`)")
    .left
      img(:src="`https://img.youtube.com/vi/${cover.video}/mqdefault.jpg`" @click="open(`https://youtu.be/${cover.video}`)")
      .title.mono {{cover.title}}
      .author {{`${cover.author} on ${new Date(cover.published * 1000).toLocaleDateString()}`}}
      .lower
        .watch
          button.slide(@click="open(`https://youtu.be/${cover.video}`)") watch
        .download(v-if="cover.download")
          button.slide(@click="open(cover.download)") download
</template>

<script>
export default {
  name: "covers",
  data: () => ({
    covers: false,
    db: false,
  }),
  methods: {
    open(url) {
      window.open(url, "_blank")
    },
  },
  mounted() {
    const self = this
    window.covers = self
    document.title = `Apollo Studio - covers`

    self.db = self.fb.database().ref("covers")
    self.db.on("value", e => {
      self.covers = e.val().reverse()
    })
  },
  beforeDestroy() {
    this.db.off()
  },
}
</script>

<style lang="stylus">
.covers
  .cover
    padding: 32px 3vw
    border-radius: 5px
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25)
    margin: 16px 8px
    display: flex
    flex-direction: row-reverse

    .right
      width: 25%

      @media only screen and (max-width: 999px)
        display: none

      img
        max-width: 100%
        border-radius: 5px
        cursor: pointer

    .left
      width: 75%
      position: relative

      @media only screen and (max-width: 999px)
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column

      img
        margin-bottom: 8px
        cursor: pointer

        @media only screen and (min-width: 1000px)
          display: none

      .title
        font-size: 1.25em

        @media only screen and (max-width: 999px)
          text-align: center

      .author
        font-size: 0.95em
        color: rgba(255, 255, 255, 0.25)
        margin-bottom: 45px

      .lower
        display: flex
        justify-content: flex-start
        align-items: center
        position: absolute
        bottom: 0

        button
          margin: 0 4px
          margin-top: 8px
          background-color: #444
          color: #fff

          &:hover
            color: #444

          &::before
            background-color: #FFF

        .watch button
          color: #FF0000
          background: #ddd

          &:hover
            color: #fff

          &::before
            background-color: #FF0000
</style>
