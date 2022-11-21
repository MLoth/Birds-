<template>
  <div class="@dark:text-neutral-800">
    <form @submit.prevent="submitForm">
      <header>
        <h2 class="mb-6 text-3xl">Forgot password</h2>
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
          />
        </label>
      </div>

      <button
        class="mt-6 flex w-full items-center justify-center rounded-md bg-neutral-700 py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-900 focus-visible:ring"
        :disabled="loading"
      >
        <span v-if="!loading">Send password reset link</span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>

      <p class="mt-3 text-center text-sm">
        <RouterLink
          to="/auth/login"
          class="rounded-md outline-none ring-neutral-300 hover:underline focus-visible:ring"
        >
          Wait, I remember my password
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'

import { Loader2, X } from 'lucide-vue-next'

import { useRouter } from 'vue-router'
import useAuthentication from '../../composables/useAuthentication'

export default defineComponent({
  components: {
    Loader2,
    X,
  },

  setup() {
    const { replace } = useRouter()
    const { forgotPassword } = useAuthentication()

    const errorMessage: Ref<string> = ref('')
    const loading: Ref<boolean> = ref(false)

    const userInput = reactive({
      email: '',
    })

    const submitForm = () => {
      loading.value = true
      if (userInput.email === '') {
        loading.value = false
        errorMessage.value = 'Please fill in all fields.'
        return
      }

      forgotPassword(userInput.email)
        .then(() => {
          loading.value = false
          replace('/auth/login')
        })
        .catch((error) => {
          loading.value = false
          errorMessage.value = error.message
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
