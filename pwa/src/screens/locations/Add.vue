<template>
  <route-holder title="Add location">
    <form class="mt-6 w-full max-w-3xl" @submit.prevent="submitForm">
      <div
        v-if="errorMessage"
        class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>

        <button
          @click="errorMessage = ''"
          class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
        >
          <X class="h-4 w-4 text-red-600" />
        </button>
      </div>

      <div>
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="name"
        >
          <span class="mb-2 block">Name</span>

          <input
            v-model="locationInput.name"
            id="name"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="name"
          />
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="birdId"
        >
          <span class="mb-2 block">Location</span>

          <span class="sr-only"
            >A map view to select the location of the observed bird.</span
          >
          <map-view
            class="rounded-md"
            :map-coordinates="{ lng: 3.3232699, lat: 50.8425729 }"
            @coordinateSelection="locationInput.location = $event"
          />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Add location</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>
    </form>
  </route-holder>
</template>

<script lang="ts">
import { reactive, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'
import { Loader2, X } from 'lucide-vue-next'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from '../../composables/useAuthentication'
import MapView from '../../components/generic/MapView.vue'
import { ADD_LOCATION } from '../../graphql/mutation.location'

export default {
  components: {
    RouteHolder,
    Loader2,
    X,
    MapView,
  },

  setup() {
    const { user } = useAuthentication()
    const { replace } = useRouter()

    const errorMessage: Ref<string> = ref('')
    const loading: Ref<boolean> = ref(false)

    // TODO: make form
    // Link input values (v-model)
    // Add styling!
    // TODO: validation...

    const locationInput = reactive({
      name: 'Uitkerkse Polder',
      location: null,
    })

    const { mutate: addLocation } = useMutation(ADD_LOCATION, () => ({
      // Callback function for reactive data & variable name without $...
      variables: {
        createLocationInput: locationInput,
      },
    }))

    const submitForm = async () => {
      loading.value = true
      const location = await addLocation()
        .catch((err) => {
          console.log({ err })

          errorMessage.value = err.message
        })
        .finally(() => {
          loading.value = false
        })

      console.log(location)
    }

    return {
      locationInput,
      errorMessage,
      submitForm,
      loading,
    }
  },
}
</script>
