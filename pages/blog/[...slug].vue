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

  a:not(:has(img)) {
    color: var(--color-accent);

    position: relative;

    &::before {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-accent);
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a:has(img) {
    margin: 0.5em 0;
    color: var(--color-text-bright);

    a {
      color: inherit;
    }
  }

  img {
    max-width: 100%;
    margin: 1rem auto;
  }

  p {
    margin-bottom: 0.69em;
    text-align: justify;
  }

  p:has(a > img) {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1rem;
    margin: 1rem auto;
    display: flex;
    justify-content: center;

    img {
      margin: 0;
    }
  }

  :where(ul, ol) {
    margin-left: 2rem;
    list-style: initial;
  }
}
</style>
