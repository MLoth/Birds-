<template>
  <div>
    <form @submit.prevent="submitForm">
      <header>
        <h2 class="mb-6 text-3xl">Register</h2>
      </header>

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
            v-model="userInput.name"
            id="name"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="text"
            name="name"
            autocomplete="name"
            data-cy="name"
          />
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="email"
        >
          <span class="mb-2 block">Email</span>

          <input
            v-model="userInput.email"
            id="email"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="email"
            name="email"
            autocomplete="email"
            data-cy="email"
          />
        </label>
      </div>

      <div class="mt-3">
        <label
          class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          for="password"
        >
          <span class="mb-2 block">Password</span>

          <input
            v-model="userInput.password"
            id="password"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            type="password"
            name="password"
            autocomplete="current-password"
            data-cy="password"
          />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
        data-cy="register"
      >
        <span v-if="!loading">Create account</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>

      <p class="mt-3 text-center text-sm">
        <RouterLink
          to="/auth/login"
          class="rounded-md outline-none ring-neutral-300 hover:underline focus-visible:ring"
        >
          Already have an account?
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'

import { Loader2, X } from 'lucide-vue-next'

import useAuthentication from '../../composables/useAuthentication'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Loader2,
    X,
  },

  setup() {
    const { register } = useAuthentication()
    const { replace } = useRouter()

    const errorMessage: Ref<string> = ref('')
    const loading: Ref<boolean> = ref(false)

    const userInput = reactive({
      name: '',
      email: '',
      password: '',
    })

    const submitForm = () => {
      loading.value = true
      if (
        userInput.name === '' ||
        userInput.email === '' ||
        userInput.password === ''
      ) {
        loading.value = false
        errorMessage.value = 'Please fill in all fields.'
        return
      }

      register(userInput.name, userInput.email, userInput.password)
        .then((u) => {
          return replace('/')
        })
        .catch((error) => {
          errorMessage.value = error.message
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      errorMessage,
      loading,
      userInput,

      submitForm,
    }
  },
})
</script>
