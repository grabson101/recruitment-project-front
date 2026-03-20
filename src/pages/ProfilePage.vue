<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import LoadingState from '../components/LoadingState.vue'

const { isLoading, isAuthenticated, user } = useAuth0()
</script>

<template>
  <LoadingState v-if="isLoading" />

  <section v-else-if="isAuthenticated" class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
    <h1 class="text-3xl font-bold text-slate-900">Profile</h1>

    <div class="mt-6 flex items-start gap-4">
      <img
        v-if="user?.picture"
        :src="user.picture"
        alt="User avatar"
        class="h-20 w-20 rounded-2xl object-cover"
      />

      <div class="space-y-2 text-slate-700">
        <p><span class="font-semibold">Name:</span> {{ user?.name }}</p>
        <p><span class="font-semibold">Email:</span> {{ user?.email }}</p>
        <p><span class="font-semibold">Nickname:</span> {{ user?.nickname }}</p>
      </div>
    </div>
  </section>

  <section v-else class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
    <h1 class="text-3xl font-bold text-slate-900">Profile</h1>
    <p class="mt-4 text-slate-600">You must be logged in to view this page.</p>
  </section>
</template>