<template>
  <div class="hero">
    <div class="left">
      <div class="intro-text">
        Apollo Studio is a <b>standalone editor and live playback engine</b> for Launchpad
        light effects, solving all the problems we experience every day in Ableton Live.
        <br />
        <br />
        The innovation lies in support for true
        <span class="rainbow-text">RGB colors</span> (all 262k of them!), an improved
        workflow and better resource management.
        <br />
        <br />
        <b>Fly your Launchpad to the moon. ☆.。.:*・°☆</b>
      </div>

      <div class="call-to-action">
        <AutoLink to="https://github.com/mat1jaczyyy/apollo-studio/releases">
          <button class="shine primary">Download</button>
        </AutoLink>

        <AutoLink to="/blog">
          <button>Blog</button>
        </AutoLink>
      </div>
    </div>

    <div class="gallery">
      <ImageSlider />
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
  max-width: min(1200px, var(--max-content-width));
  margin: auto;
  gap: 3rem;
  padding: 5rem 0;

  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    align-items: center;
  }
}

.call-to-action {
  margin-top: 1rem;

  a + a {
    margin-left: 1rem;
  }
}

.intro-text {
  max-width: 450px;
  font-size: 1.2rem;
  text-align: justify;
}

.gallery {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rainbow-text {
  background-image: linear-gradient(45deg, red, orange, yellow, green, cyan, violet, red);
  background-size: 400%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: rainbow 20s linear infinite;
}

@keyframes rainbow {
  0% {
    background-position: 200%;
  }
  100% {
    background-position: -200%;
  }
}
</style>
