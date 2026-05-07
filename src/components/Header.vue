<script setup lang="ts">
import { Sparkles, Shuffle } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'random'): void;
}>();
</script>

<template>
  <header class="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <Sparkles class="text-cyan-400" :size="32" />
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <div class="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI人物提示词生成器
            </h1>
            <p class="text-xs text-gray-400 mt-1">Character Prompt Generator</p>
          </div>
        </div>

        <button
          @click="emit('random')"
          class="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <Shuffle :size="20" />
          <span class="hidden sm:inline">随机生成</span>
        </button>
      </div>
    </div>
  </header>
</template>
