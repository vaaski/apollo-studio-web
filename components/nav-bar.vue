<script setup lang="ts">
const links = {
  Download: "https://github.com/mat1jaczyyy/apollo-studio/releases",
  Blog: "/blog",
  Covers: "/covers",
  Guides: "https://github.com/mat1jaczyyy/apollo-studio/wiki",
}

const iconLinks = {
  "cib:ko-fi": "https://ko-fi.com/mat1jaczyyy",
  "bxl:discord-alt": "https://discord.gg/2ZSHYHA",
  "bxl:github": "https://github.com/mat1jaczyyy/apollo-studio",
}

const route = useRoute()
const subtitle = computed(() => {
  if (route.path.startsWith("/blog")) return "Blog"
  return ""
})
</script>

<template>
  <header>
    <NuxtLink to="/" class="wordmark">
      <img src="~/assets/ApolloStudio_Logo_White.svg" alt="Apollo Studio Logo" />
      <span>Apollo&nbsp;Studio</span>
      <span v-if="subtitle" class="subtitle"> &nbsp;//&nbsp;{{ subtitle }} </span>
    </NuxtLink>

    <div class="spacer"></div>

    <div class="links">
      <AutoLink
        v-for="(link, text) in links"
        :key="link + text"
        class="underline"
        :to="link"
      >
        {{ text }}
      </AutoLink>

      <div class="divider">|</div>

      <AutoLink v-for="(link, icon) in iconLinks" :key="link + icon" :to="link">
        <Icon :name="icon" />
      </AutoLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  user-select: none;
  backdrop-filter: blur(10px);

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
}

.links {
  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    margin-bottom: 0.5rem;
  }

  > a,
  > .divider {
    margin-left: 1rem;

    @media screen and (max-width: 600px) {
      margin-left: 0.5em;
    }
  }
}

a:has(.icon) {
  display: inline-flex;
  align-items: center;

  .icon {
    font-size: 1.5rem;
    min-width: 1em;
  }
}

.divider {
  color: var(--color-foreground-dim);
  display: inline-block;
}

.spacer {
  flex: 1;
}

.subtitle {
  color: var(--color-foreground-dim);
}

.wordmark {
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;

  > img {
    height: 2rem;
    margin-right: 0.5rem;
  }
}
</style>
