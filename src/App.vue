<template lang="pug">
#app
  nav
    img(src="./assets/ApolloStudio_Logo_White.svg" @click="$router.push('/')")
    span.mono apollo-studio{{$route.path === "/" ? "" : $route.path}}
  main
    router-view
</template>

<script>
export default {
  name: "apollo-studio-web",
  mounted() {
    window.vue = this
  },
}
</script>


<style lang="stylus">
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

  &.mono
    font-family: "Roboto Mono", monospace

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
      bottom: 0
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

  nav
    height: 64px
    width: 100%
    position: relative
    display: flex
    align-items: center

    img
      height: 75%
      margin: 0 16px
      cursor: pointer

    span
      font-size: 1.5em
</style>
