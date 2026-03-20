<script setup>
import CountryCard from './CountryCard.vue'

defineProps({
  countries: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    <CountryCard
      v-for="country in countries"
      :key="country.code || country.name"
      :country="country"
    />
  </section>
</template>