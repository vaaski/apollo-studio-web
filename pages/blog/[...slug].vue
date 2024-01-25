<template>
  <div class="blog-entry">
    <ContentDoc />
  </div>
</template>

<style lang="scss">
.blog-entry {
  max-width: min(1000px, var(--max-content-width));
  margin: 0 auto;
  padding: 1rem;
  padding-bottom: 3rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a:has(img) {
    margin: 0.5em 0;
    color: var(--color-text-bright);
  }

  img {
    max-width: 100%;
    margin: 1rem 0;
  }

  p:has(a > img) {
    margin-left: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0 1rem;
  }
}
</style>
