<template>
  <table class="w-full table-auto">
    <tr class="text-left">
      <th class="p-3">Image</th>

      <th class="p-3">Bird</th>

      <th class="p-3">Location</th>

      <th class="p-3">Name</th>

      <th class="p-3">User</th>

      <th class="p-3">Spotted on</th>
    </tr>

    <tbody v-if="observations.length > 0">
      <tr
        v-for="(o, i) of observations"
        :key="o.id"
        :class="i % 2 === 0 ? '@dark:bg-neutral-700 bg-white' : ''"
        class="overflow-hidden rounded-md"
      >
        <td class="p-3">
          <RouterLink :to="`birds/${o.bird.id}/`">
            <img :src="`/birds/${o.bird.name}.webp`" class="h-16" />
          </RouterLink>
        </td>
        <td class="p-3 font-semibold">
          <RouterLink :to="`birds/${o.bird.id}/`">
            {{ o.bird.name }}
          </RouterLink>
        </td>
        <td class="p-3">{{ o.location.name }}</td>
        <td class="p-3">{{ o.name }}</td>
        <td class="p-3">{{ o.userId }}</td>
        <td class="p-3">{{ new Date(o.createdAt!).toLocaleDateString() }}</td>
      </tr>
    </tbody>
    <tbody class="grid w-full place-items-center" v-else>
      <p>No observations yet.</p>
    </tbody>
  </table>
</template>

<script lang="ts">
import Observation from '../../interfaces/interface.observation'

export default {
  props: {
    observations: {
      type: Array as () => Observation[],
      required: true,
    },
  },

  setup() {
    return {}
  },
}
</script>
