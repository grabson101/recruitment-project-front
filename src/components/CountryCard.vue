<script setup>
defineProps({
  country: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div class="aspect-[4/3] bg-slate-100">
      <img
        :src="country.flag"
        :alt="`Flag of ${country.name}`"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="p-4 text-center">
      <h3 class="text-base font-semibold text-slate-900">
        {{ country.name }}
      </h3>
    </div>
  </article>
</template>