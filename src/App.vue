<template lang="pug">
#app
  nav
    .left
      img(src="./assets/ApolloStudio_Logo_White.svg" @click="$router.push('/')")
      span.mono Apollo Studio
    .right
      template(v-for="(link, key) in nav" v-if="link")
        a(v-if="link.search('https://') >= 0" :href="link" target="_blank") {{key}}
        router-link(v-else :to="link") {{key}}
      hr
      i.fab.fa-patreon(@click="open('https://www.patreon.com/mat1jaczyyy')")
      i.fab.fa-discord(@click="open('https://discord.gg/2ZSHYHA')")
      img(src="./assets/mat1-logo.png" @click="open('https://mat1jaczyyy.com')")
  main
    router-view.route
</template>

<script>
export default {
  name: "apollo-studio-web",
  data: () => ({
    nav: {
      download: "https://github.com/mat1jaczyyy/apollo-studio/releases",
      blog: "/blog",
      FAQ: "",
      covers: "/covers",
      guides: "https://github.com/mat1jaczyyy/apollo-studio/wiki",
      code: "https://github.com/mat1jaczyyy/apollo-studio",
    },
  }),
  methods: {
    open(url) {
      window.open(url, "_blank")
    },
  },
  mounted() {
    window.vue = this
    document.title = "Apollo Studio"
  },
}
</script>


<style lang="stylus">
@import url("https://use.fontawesome.com/releases/v5.0.13/css/brands.css")
@import url("https://use.fontawesome.com/releases/v5.0.13/css/fontawesome.css")

body, html
  margin: 0
  height: 100vh
  width: 100vw
  background: #191919
  color: #DCDCDC
  overflow-x: hidden

::-webkit-scrollbar-track
  background-color: #161616

::-webkit-scrollbar
  width: 5px
  background-color: #161616

::-webkit-scrollbar-thumb
  background-color: #DCDCDC
  border-radius: 5px 0 0 5px

*
  font-family: "Roboto", sans-serif

button.slide
  z-index: 1
  position: relative
  color: #0a0a0a
  padding: 0.5em 1em
  outline: none
  border: none
  background-color: #fff
  transition: color 0.25s ease-in-out
  font-size: 1em

  &::before
    content: ""
    z-index: -1
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: #444
    transform-origin: center top
    transform: scaleY(0)
    transition: transform 0.25s ease-in-out

  &:hover
    cursor: pointer
    color: #fff

  &:hover::before
    transform-origin: center bottom
    transform: scaleY(1)

#app
  height: 100%
  width: 100%
  position: relative

  a
    color: #66afef
    text-decoration: none

    &
      position: relative

    &::before
      content: ""
      position: absolute
      bottom: 5px
      left: 0
      right: 0
      height: 1px
      background-color: #66afef
      transform-origin: bottom right
      transform: scaleX(0)
      transition: transform 0.5s ease

    &:hover::before
      transform-origin: bottom left
      transform: scaleX(1)

  main
    padding: 64px 3vw 0 3vw
    display: flex
    justify-content: center
    align-items: flex-start

    @media only screen and (min-width: 1000px)
      padding: 32px 7vw 0 7vw

    >.route
      max-width: 1300px

  nav
    height: 64px
    width: 100%
    position: relative
    display: flex
    align-items: center

    .left
      height: 64px
      display: flex
      justify-content: center
      align-items: center

      span
        font-weight: bold

    .right
      position: absolute
      right: 16px
      display: flex

      hr
        height: 32px
        margin: 0 8px
        border-right: none
        border-top: none
        border-bottom: none
        border-left: 1px solid rgba(255, 255, 255, 0.5)

      i.fab, img
        margin: 0 8px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer

      img
        height: 16px
        width: 16px
        margin: 8px

      a
        margin: 0 8px
        color: #DCDCDC
        display: flex
        justify-content: center
        align-items: center

        &::before
          background-color: #DCDCDC

    @media only screen and (max-width: 710px)
      height: 128px
      align-items: flex-start

      .right
        top: 64px
        right: 50%
        transform: translate(50%, 50%)

    img
      height: 75%
      margin: 0 16px
      cursor: pointer

    span
      font-size: 1.5em
</style>
