<template>
  <div class="bottom-credits">
    <span>
      website
      <a href="https://github.com/vaaski/apollo-studio-web" class="built">built</a> with
      <a href="https://nuxt.com/" class="nuxt">nuxt</a> by
      <a href="https://vaaski.dev" class="vaaski">vaaski</a>
    </span>
  </div>
</template>

<style scoped lang="scss">
.bottom-credits {
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
  opacity: 0.5;
  user-select: none;

  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .built {
    color: var(--color-text-bright);
  }

  .nuxt {
    color: #00d777;
  }

  .vaaski {
    color: #908aff;
  }
}
</style>
