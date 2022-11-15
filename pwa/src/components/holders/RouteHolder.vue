<template>
  <div class="px-6 py-6">
    <main class="mx-auto max-w-6xl">
      <div class="flex items-center justify-between">
        <h1 v-if="title" class="font-theme mb-6 text-5xl font-light">
          {{ title }}
        </h1>

        <slot name="header-actions"></slot>
      </div>

      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String as () => string,
      required: false,
    },
  },

  setup() {
    return {}
  },
}
</script>
