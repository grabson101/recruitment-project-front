<script setup>
defineProps({
  text: {
    type: String,
    default: 'Loading...',
  },
})
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
    {{ text }}
  </div>
</template>