<script setup lang="ts">
const links = {
  Download: "https://github.com/mat1jaczyyy/apollo-studio/releases",
  Blog: "/blog",
  // Covers: "/covers",
  Guides: "https://github.com/mat1jaczyyy/apollo-studio/wiki",
}

const iconLinks = {
  "bxl:patreon": "https://patreon.com/mat1jaczyyy",
  "bxl:discord-alt": "https://discord.gg/2ZSHYHA",
  "bxl:github": "https://github.com/mat1jaczyyy/apollo-studio",
}
</script>

<template>
  <header>
    <NuxtLink to="/" class="wordmark">
      <img src="~/assets/ApolloStudio_Logo_White.svg" alt="Apollo Studio Logo" />
      <span>Apollo Studio</span>
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
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  user-select: none;
}

.links {
  display: flex;
  align-items: center;

  > a,
  > .divider {
    margin-left: 1rem;
  }
}

a:has(.icon) {
  display: inline-flex;
  align-items: center;

  .icon {
    font-size: 1.5rem;
  }
}

.divider {
  opacity: 0.5;
  display: inline-block;
}

.spacer {
  flex: 1;
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
