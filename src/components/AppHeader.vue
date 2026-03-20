<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const {
  isLoading,
  isAuthenticated,
  user,
  loginWithRedirect,
  logout,
} = useAuth0()

const navLinkClass = (path) =>
  route.path === path
    ? 'text-blue-600 font-semibold'
    : 'text-slate-600 hover:text-slate-900'

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: globalThis.location.origin,
    },
  })
}
</script>

<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-6">
        <RouterLink to="/" class="text-xl font-bold text-slate-900">
          Country Explorer
        </RouterLink>

        <nav class="hidden md:flex items-center gap-4">
          <RouterLink to="/" :class="navLinkClass('/')">Home</RouterLink>
          <RouterLink to="/countries" :class="navLinkClass('/countries')">Countries</RouterLink>
          <RouterLink to="/profile" :class="navLinkClass('/profile')">Profile</RouterLink>
        </nav>
      </div>

      <div v-if="isLoading" class="text-sm text-slate-500">
        Loading...
      </div>

      <div v-else class="flex items-center gap-3">
        <template v-if="isAuthenticated">
          <span class="hidden text-sm text-slate-600 sm:inline">
            {{ user?.name || user?.email }}
          </span>

          <button
            class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            @click="handleLogout"
          >
            Logout
          </button>
        </template>

        <button
          v-else
          class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          @click="loginWithRedirect()"
        >
          Login
        </button>
      </div>
    </div>
  </header>
</template>