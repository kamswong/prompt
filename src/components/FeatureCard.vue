<script setup lang="ts">
defineProps<{
  label: string;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    @click="emit('click')"
    :class="[
      'relative px-4 py-3 rounded-lg border-2 transition-all duration-300 cursor-pointer',
      selected
        ? 'border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 shadow-lg shadow-cyan-500/30 scale-105'
        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'
    ]"
  >
    <div class="flex items-center justify-between">
      <span :class="['text-sm font-medium', selected ? 'text-white' : 'text-gray-300']">
        {{ label }}
      </span>
      <div
        v-if="selected"
        class="ml-2 w-2 h-2 rounded-full bg-cyan-400"
      />
    </div>
  </button>
</template>

<style scoped>
</style>
