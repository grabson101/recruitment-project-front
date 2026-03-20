<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import CountryGrid from '../components/CountryGrid.vue'
import LoadingState from '../components/LoadingState.vue'
import { fetchCountries } from '../services/api'

const { isLoading, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0()

const countries = ref([])
const loadingCountries = ref(false)
const error = ref('')

const loadCountries = async () => {
  loadingCountries.value = true
  error.value = ''

  try {
    const token = await getAccessTokenSilently()
    countries.value = await fetchCountries(token)
  } catch (err) {
    error.value = 'Failed to load countries.'
    console.error(err)
  } finally {
    loadingCountries.value = false
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    loadCountries()
  }
})

watch(isAuthenticated, (value) => {
  if (value && !countries.value.length) {
    loadCountries()
  }
})
</script>

<template>
  <LoadingState v-if="isLoading" />

  <section v-else class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Countries</h1>
        <p class="mt-2 text-slate-600">
          A list of countries fetched from the backend.
        </p>
      </div>

      <div class="flex gap-3">
        <button
          v-if="isAuthenticated"
          class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          @click="loadCountries"
        >
          Refresh
        </button>
      </div>
    </div>

    <section
      v-if="!isAuthenticated"
      class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
    >
      <p class="text-slate-600">
        You must be logged in to view countries.
      </p>

      <button
        class="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500"
        @click="loginWithRedirect()"
      >
        Login
      </button>
    </section>

    <LoadingState v-else-if="loadingCountries" text="Loading countries..." />

    <section
      v-else-if="error"
      class="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700"
    >
      {{ error }}
    </section>

    <section
      v-else-if="!countries.length"
      class="rounded-3xl bg-white p-8 text-slate-600 shadow-sm ring-1 ring-slate-200"
    >
      No countries available.
    </section>

    <CountryGrid v-else :countries="countries" />
  </section>
</template>