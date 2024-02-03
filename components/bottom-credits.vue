<template>
  <div class="bottom-credits">
    <span>
      <a href="https://github.com/vaaski/apollo-studio-web" class="built">
        website built
      </a>
      by
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

  .built {
    color: var(--color-text-bright);
  }

  .vaaski {
    color: #908aff;
  }
}
</style>
