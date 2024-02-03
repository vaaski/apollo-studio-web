<script setup lang="ts">
useSeoMeta({
  title: "Apollo Studio // Covers",
  description: "Watch the latest covers made possible with Apollo Studio",
})

export type Cover = {
  author: string
  download?: string
  published: number
  title: string
  video: string
}

const [foundResult] = await queryContent("covers").find()
if (!foundResult) throw new Error("No covers")

const covers = foundResult.body as unknown as Cover[]
const sortedCovers = covers.sort((a, b) => {
  if (!a.published) return 1
  if (!b.published) return -1
  return b.published - a.published
})

const formatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
})
</script>

<template>
  <ol>
    <template v-for="cover in sortedCovers" :key="cover.video + cover.published">
      <li>
        <div class="text">
          <h3>{{ cover.title }}</h3>
          <span class="info date">
            {{ formatter.format(cover.published * 1e3) }}
          </span>
          <span class="info author" :title="cover.author">{{ cover.author }}</span>

          <div class="actions">
            <AutoLink :to="`https://youtu.be/${cover.video}`">
              <button class="primary">Watch</button>
            </AutoLink>

            <AutoLink v-if="cover.download" :to="cover.download">
              <button>Download</button>
            </AutoLink>
          </div>
        </div>

        <img
          :src="`https://img.youtube.com/vi/${cover.video}/mqdefault.jpg`"
          alt="youtube thumbnail"
        />
      </li>
    </template>
    <BottomCredits />
  </ol>
</template>

<style scoped lang="scss">
.covers {
  display: flex;
  justify-content: center;
}

ol {
  padding: 1rem 0;
}

li {
  margin: 1rem auto;
  max-width: min(1000px, var(--max-content-width));
  box-shadow: 0 0 0 1px var(--color-foreground-dim), var(--big-shadow-soft);
  border-radius: 0.5rem;
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: center;
  }

  .text {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 600px) {
      align-items: center;
    }

    .actions {
      margin-top: auto;

      @media screen and (max-width: 600px) {
        margin-top: 1rem;
      }
    }

    a {
      margin-top: 1rem;
    }

    a + a {
      margin-left: 1rem;
    }
  }

  img {
    width: 200px;
    margin: 1rem 0;
    object-fit: contain;
  }

  a {
    display: inline-block;
  }

  h3 {
    font-size: 1.25em;
    color: var(--color-text-bright);
  }

  span.info {
    color: var(--color-foreground-dim);

    &.date {
      font-size: 1.1em;
    }

    &.author {
      opacity: 0.5;
    }
  }

  p {
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
