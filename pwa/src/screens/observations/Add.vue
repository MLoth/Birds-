<template>
  <route-holder title="Add observation">
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
          class="mb-1 block text-neutral-400 focus-within:text-neutral-900"
          :class="observationErrors.name ? 'focus-within:text-red-600' : ''"
          for="name"
        >
          <span
            class="mb-2 block"
            :class="observationErrors.name ? 'text-red-600' : ''"
          >
            Name
            {{ observationErrors.name ? `(${observationErrors.name})` : '' }}
          </span>

          <input
            v-model="observationInput.name"
            :class="
              observationErrors.name
                ? 'border-red-500 text-red-600 ring-red-400'
                : ''
            "
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            id="name"
            type="text"
            name="name"
          />
        </label>
      </div>

      <div class="mt-3">
        <label
          :class="observationErrors.birdId ? 'text-red-600' : ''"
          class="mb-1 block text-neutral-400 focus-within:text-neutral-900"
          for="birdId"
        >
          <span
            :class="
              observationErrors.birdId
                ? 'border-red-500 text-red-600 ring-red-400'
                : ''
            "
            class="mb-2 block"
            >Bird specie
            {{
              observationErrors.birdId ? `(${observationErrors.birdId})` : ''
            }}
          </span>

          <select
            v-if="result"
            :class="
              observationErrors.birdId
                ? 'border-red-500 text-red-600 ring-red-400'
                : ''
            "
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            :disabled="loading"
            v-model="observationInput.birdId"
            name="birdId"
            id="birdId"
          >
            <option value="Pick a bird species" selected disabled>
              Pick a bird species
            </option>
            <option v-for="b of result.birds" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>
        </label>
      </div>

      <!-- LOCATION -->
      <div class="mt-3">
        <label
          :class="observationErrors.geoPoint ? 'text-red-600' : ''"
          class="mt-3 block text-neutral-400 focus-within:text-neutral-900"
        >
          Observation location
          {{
            observationErrors.geoPoint ? `(${observationErrors.geoPoint})` : ''
          }}

          <div class="relative">
            <map-view
              :class="observationErrors.geoPoint ? 'ring ring-red-500' : ''"
              class="min-h-[10vh] rounded-md"
              :mapCoordinates="{ lng: 3.3232699, lat: 50.8425729 }"
              :polygons="polygons"
              @coordinateSelection="handleCoordinateSelection"
            />

            <select
              v-if="result"
              :class="
                observationErrors.locationId
                  ? 'border-red-500 text-red-600 ring ring-red-500'
                  : ''
              "
              class="absolute top-0 right-0 mr-3 mt-3 rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
              v-model="location"
              name="locationId"
              id="locationId"
              @change="handleLocationChange"
              :disabled="loading"
            >
              <option :value="{}" selected disabled>Pick a location</option>
              <option v-for="l of result.locations" :key="l.id" :value="l">
                {{ l.name }}
              </option>
            </select>
          </div>
        </label>
      </div>

      <!-- DESCRIPTION -->
      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-400 focus-within:text-neutral-900"
          for="description"
        >
          <span class="mb-2 block">Description</span>

          <textarea
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            v-model="observationInput.description"
            name="description"
            id="description"
            cols="30"
          ></textarea>
        </label>
      </div>

      <!-- WEATHER -->
      <div>
        <label
          class="mb-1 block text-neutral-400 focus-within:text-neutral-900"
          for="weather"
        >
          <span class="mb-2 block">Weather</span>

          <input
            v-model="observationInput.weather"
            id="weather"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="weather"
          />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Add observation</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>
    </form>
  </route-holder>
</template>

<script lang="ts">
import { reactive, ref, Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { Loader2, X } from 'lucide-vue-next'
import { Polygon } from 'geojson'
import { LngLat } from 'mapbox-gl'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import MapView from '../../components/generic/MapView.vue'
import useAuthentication from '../../composables/useAuthentication'
import Location from '../../interfaces/interface.location'

import { ADD_OBSERVATION } from '../../graphql/mutation.observation'
import { OBSERVATION_INSERT_DATA } from '../../graphql/query.observation'

export default {
  components: {
    RouteHolder,
    MapView,
    Loader2,
    X,
  },

  setup() {
    const { user } = useAuthentication()
    const { push } = useRouter()

    const errorMessage: Ref<string> = ref('')
    const polygons: Ref<Polygon[]> = ref([])

    const location: Ref<Location> = ref({} as Location)

    const observationErrors = reactive({
      name: '',
      birdId: '',
      locationId: '',
      geoPoint: '',
    })

    const observationInput = reactive({
      name: '',
      description: '',
      weather: '',
      birdId: 'Pick a bird species',
      locationId: location.value?.id,
      userId: user.value!.uid,
      geoPoint: {
        type: 'Point',
        coordinates: [0, 0],
      },
      active: true,
    })

    const { result, loading, error } = useQuery(OBSERVATION_INSERT_DATA)
    const { mutate: addObservation } = useMutation(ADD_OBSERVATION, () => ({
      variables: {
        createObservationInput: observationInput,
      },
    }))

    const handleLocationChange = () => {
      if (!location.value) return

      polygons.value = [location.value.area]
      observationInput.locationId = location.value.id
    }

    const handleCoordinateSelection = (event: LngLat) => {
      observationInput.geoPoint.coordinates = [event.lat, event.lng]
    }

    const isFormInvalid = (): boolean => {
      let hasSomeErrors = false

      if (observationInput.name === '') {
        observationErrors.name = 'Name is required'
        hasSomeErrors = true
      } else {
        observationErrors.name = ''
      }
      if (observationInput.birdId === 'Pick a bird species') {
        observationErrors.birdId = 'Please pick a bird'
        hasSomeErrors = true
      } else {
        observationErrors.birdId = ''
      }
      if (!observationInput.locationId) {
        observationErrors.locationId = 'Please select a location'
        hasSomeErrors = true
      } else {
        observationErrors.locationId = ''
      }
      if (
        observationInput.geoPoint.coordinates[0] === 0 &&
        observationInput.geoPoint.coordinates[1] === 0
      ) {
        observationErrors.geoPoint = 'Please place a marker'
        hasSomeErrors = true
      } else {
        observationErrors.geoPoint = ''
      }

      if (hasSomeErrors) return true
      return false
    }

    const submitForm = async () => {
      if (isFormInvalid()) return

      const observation = await addObservation().catch((err) => {
        errorMessage.value = err.message
      })

      push('/observations')
    }

    // Clean error when input changes
    watch(observationInput, () => isFormInvalid())

    return {
      observationInput,
      observationErrors,
      result,
      loading,
      error,
      errorMessage,
      polygons,
      location,

      handleLocationChange,
      handleCoordinateSelection,
      submitForm,
    }
  },
}
</script>
