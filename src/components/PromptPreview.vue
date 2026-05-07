<script setup lang="ts">
import { ref } from 'vue';
import { Wand2, History, Trash2, Copy, Check } from 'lucide-vue-next';

defineProps<{
  generatedPrompt: string;
  history: string[];
  copySuccess: boolean;
}>();

const emit = defineEmits<{
  (e: 'copy'): void;
  (e: 'clearHistory'): void;
}>();

const showHistory = ref(false);

const copyFromHistory = async (prompt: string) => {
  try {
    await navigator.clipboard.writeText(prompt);
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<template>
  <div class="h-full flex flex-col bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-l border-gray-800">
    <div class="p-6 border-b border-gray-800">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <Wand2 class="text-cyan-400" :size="24" />
          生成提示词
        </h2>
        <button
          @click="showHistory = !showHistory"
          class="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <History :size="16" />
          <span>历史</span>
        </button>
      </div>

      <div v-if="showHistory && history.length > 0" class="mb-4 bg-gray-800/50 rounded-lg p-4 max-h-48 overflow-y-auto custom-scrollbar">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-gray-300">历史记录</h3>
          <button
            @click="emit('clearHistory')"
            class="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <Trash2 :size="12" />
            清空
          </button>
        </div>
        <div class="space-y-2">
          <button
            v-for="(prompt, index) in history"
            :key="index"
            @click="copyFromHistory(prompt)"
            class="w-full text-left p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors"
          >
            <p class="text-xs text-gray-400 mb-1">
              #{{ history.length - index }}
            </p>
            <p class="text-xs text-gray-300 truncate">{{ prompt }}</p>
          </button>
        </div>
      </div>

      <div v-if="generatedPrompt" class="bg-gray-800/50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto custom-scrollbar">
        <p class="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
          {{ generatedPrompt }}
        </p>
      </div>
      <div v-else class="bg-gray-800/30 rounded-lg p-8 mb-4 text-center">
        <p class="text-gray-500 text-sm">
          请从左侧选择特征，系统将自动生成提示词
        </p>
      </div>

      <button
        @click="emit('copy')"
        :disabled="!generatedPrompt"
        :class="[
          'w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300',
          copySuccess
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
        ]"
      >
        <Check v-if="copySuccess" :size="20" />
        <Copy v-else :size="20" />
        <span>{{ copySuccess ? '已复制!' : '复制提示词' }}</span>
      </button>
    </div>

    <div class="flex-1 p-6 overflow-y-auto custom-scrollbar">
      <h3 class="text-sm font-semibold text-gray-400 mb-4">使用提示</h3>
      <div class="space-y-3">
        <div class="bg-gray-800/30 rounded-lg p-4">
          <h4 class="text-sm font-medium text-cyan-400 mb-2">🎨 如何使用</h4>
          <p class="text-xs text-gray-400">
            复制生成的提示词，粘贴到 Midjourney、Stable Diffusion、
            DALL-E 等 AI 图像生成工具中使用。
          </p>
        </div>

        <div class="bg-gray-800/30 rounded-lg p-4">
          <h4 class="text-sm font-medium text-purple-400 mb-2">💡 优化建议</h4>
          <ul class="text-xs text-gray-400 space-y-1">
            <li>• 可以手动添加更多细节描述</li>
            <li>• 调整词汇顺序可改变生成效果</li>
            <li>• 组合不同类别获得更丰富的描述</li>
            <li>• 使用"--"分隔词和参数</li>
          </ul>
        </div>

        <div class="bg-gray-800/30 rounded-lg p-4">
          <h4 class="text-sm font-medium text-green-400 mb-2">✨ 小技巧</h4>
          <ul class="text-xs text-gray-400 space-y-1">
            <li>• 多次随机生成找到灵感</li>
            <li>• 在历史记录中保存喜欢的组合</li>
            <li>• 结合不同艺术风格尝试</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.8);
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 1);
}
</style>
