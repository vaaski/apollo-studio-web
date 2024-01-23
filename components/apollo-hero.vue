<template>
  <div class="hero">
    <div class="left">
      <div class="intro-text">
        Apollo Studio is a <b>standalone editor and live playback engine</b> for Launchpad
        light effects, solving all the problems we experience every day in Ableton Live.
        <br />
        <br />
        The innovation lies in support for true RGB colors (all 262k of them!), an
        improved workflow and better resource management.
        <b>Fly your Launchpad to the moon. ☆.。.:*・°☆</b>
      </div>

      <div class="call-to-action">
        <button class="shine primary">
          <AutoLink to="https://github.com/mat1jaczyyy/apollo-studio/releases">
            Download
          </AutoLink>
        </button>
        <button>
          <AutoLink to="/blog"> Blog </AutoLink>
        </button>
      </div>
    </div>

    <div class="gallery">
      <img src="~/assets/screenshots/track1.png" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: min(1200px, 85%);
  margin: 0 auto;
  gap: 3rem;

  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
  }
}

// .left {
//   padding: 0 2rem;
// }

.call-to-action {
  margin-top: 1rem;
}

.intro-text {
  max-width: 450px;
  font-size: 1.2rem;
  text-align: justify;
}
</style>
