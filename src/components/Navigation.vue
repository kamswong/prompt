<script setup lang="ts">
import { ref } from 'vue';
import { User, Smile, Shirt, UserSquare, Image, Sparkles, ChevronDown, ChevronRight } from 'lucide-vue-next';
import { categories, subcategoryNames, type FeatureOption } from '../data/features';
import { useCharacterStore } from '../composables/useCharacterStore';

const { activeCategory, activeSubcategory, setActiveCategory, setActiveSubcategory, getSelectedCount } = useCharacterStore();

const iconMap: Record<string, any> = {
  User,
  Smile,
  Shirt,
  UserSquare,
  Image,
  Sparkles,
};

const expandedCategories = ref<Set<string>>(new Set());

const toggleCategory = (categoryId: string) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId);
  } else {
    expandedCategories.value.add(categoryId);
  }
  setActiveCategory(categoryId);
  setActiveSubcategory(null);
};

const selectSubcategory = (categoryId: string, subcatId: string) => {
  setActiveCategory(categoryId);
  setActiveSubcategory(subcatId);
};

const getSubcategories = (categoryId: string) => {
  const category = categories.find((cat) => cat.id === categoryId);
  if (!category) return [];

  const subcatMap = new Map<string, FeatureOption[]>();
  category.options.forEach((opt: FeatureOption) => {
    if (opt.subcategory) {
      if (!subcatMap.has(opt.subcategory)) {
        subcatMap.set(opt.subcategory, []);
      }
      subcatMap.get(opt.subcategory)!.push(opt);
    }
  });

  return Array.from(subcatMap.entries()).map(([subcatId, options]) => ({
    id: subcatId,
    name: subcategoryNames[subcatId] || subcatId,
    count: options.length,
  }));
};
</script>

<template>
  <nav class="w-full lg:w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 overflow-y-auto">
    <div class="p-4">
      <h2 class="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4 px-3">
        特征分类
      </h2>
      <div class="space-y-1">
        <div v-for="category in categories" :key="category.id">
          <button
            @click="toggleCategory(category.id)"
            :class="[
              'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300',
              activeCategory === category.id && !activeSubcategory
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'bg-gray-800/30 border border-transparent hover:bg-gray-800/60'
            ]"
          >
            <div class="flex items-center gap-3">
              <component
                :is="iconMap[category.icon] || User"
                :size="20"
                :class="activeCategory === category.id && !activeSubcategory ? 'text-cyan-400' : 'text-gray-400'"
              />
              <span
                :class="[
                  'text-sm font-medium',
                  activeCategory === category.id && !activeSubcategory ? 'text-white' : 'text-gray-300'
                ]"
              >
                {{ category.name }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <div
                v-if="getSelectedCount(category.id) > 0"
                :class="[
                  'min-w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold',
                  activeCategory === category.id && !activeSubcategory ? 'bg-cyan-500 text-white' : 'bg-purple-500 text-white'
                ]"
              >
                {{ getSelectedCount(category.id) }}
              </div>
              <component
                v-if="getSubcategories(category.id).length > 0"
                :is="expandedCategories.has(category.id) ? ChevronDown : ChevronRight"
                :size="16"
                class="text-gray-400 transition-transform duration-200"
              />
            </div>
          </button>

          <div
            v-if="expandedCategories.has(category.id) && getSubcategories(category.id).length > 0"
            class="ml-4 mt-1 space-y-0.5"
          >
            <button
              v-for="subcat in getSubcategories(category.id)"
              :key="subcat.id"
              @click="selectSubcategory(category.id, subcat.id)"
              :class="[
                'w-full px-3 py-2 text-xs text-left transition-colors duration-200 flex items-center gap-2 rounded-md',
                activeSubcategory === subcat.id
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
              ]"
            >
              <div :class="['w-1 h-1 rounded-full', activeSubcategory === subcat.id ? 'bg-cyan-400' : 'bg-gray-600']"></div>
              <span class="flex-1">{{ subcat.name }}</span>
              <span class="text-gray-600 text-[10px]">({{ subcat.count }})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
