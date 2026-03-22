<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { RouterLink } from 'vue-router'

const { isAuthenticated, loginWithRedirect } = useAuth0()
</script>

<template>
  <section class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
    <div class="max-w-2xl">
      <p class="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
        Vue + Tailwind + Auth0
      </p>

      <h1 class="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Explore countries and their flags
      </h1>

      <p class="mt-4 text-lg text-slate-600">
        This app fetches countries from the backend and displays them in a responsive grid with flags above the country names.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink
          v-if="isAuthenticated"
          to="/countries"
          class="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500"
        >
          View countries
        </RouterLink>

        <button
          v-else
          class="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500"
          @click="loginWithRedirect()"
        >
          Login to continue
        </button>
      </div>
    </div>
  </section>
</template>