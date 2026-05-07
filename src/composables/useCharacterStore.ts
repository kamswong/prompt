import { ref, computed } from 'vue';
import { categories, type FeatureOption } from '../data/features';

export interface CharacterSelection {
  appearance: string[];
  expression: string[];
  clothing: string[];
  pose: string[];
  background: string[];
  other: string[];
}

const selection = ref<CharacterSelection>({
  appearance: [],
  expression: [],
  clothing: [],
  pose: [],
  background: [],
  other: [],
});

const activeCategory = ref('appearance');
const activeSubcategory = ref<string | null>(null);
const history = ref<string[]>([]);
const copySuccess = ref(false);

const generatedPrompt = computed(() => {
  const promptParts: string[] = [];

  categories.forEach((cat) => {
    const selectedIds = selection.value[cat.id as keyof CharacterSelection];
    if (selectedIds.length > 0) {
      const prompts = selectedIds
        .map((id) => {
          const option = cat.options.find((opt) => opt.id === id);
          return option?.prompt || '';
        })
        .filter(Boolean);

      if (prompts.length > 0) {
        promptParts.push(...prompts);
      }
    }
  });

  return promptParts.join(', ');
});

const toggleFeature = (category: keyof CharacterSelection, id: string) => {
  const current = selection.value[category];
  const updated = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];

  selection.value[category] = updated;
};

const clearSelection = (category: keyof CharacterSelection) => {
  selection.value[category] = [];
};

const clearAll = () => {
  selection.value = {
    appearance: [],
    expression: [],
    clothing: [],
    pose: [],
    background: [],
    other: [],
  };
};

const setActiveCategory = (category: string) => {
  activeCategory.value = category;
  activeSubcategory.value = null;
};

const setActiveSubcategory = (subcategory: string | null) => {
  activeSubcategory.value = subcategory;
};

const randomGenerate = () => {
  const newSelection: CharacterSelection = {
    appearance: [],
    expression: [],
    clothing: [],
    pose: [],
    background: [],
    other: [],
  };

  categories.forEach((cat) => {
    const randomCount = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...cat.options].sort(() => Math.random() - 0.5);
    newSelection[cat.id as keyof CharacterSelection] = shuffled
      .slice(0, randomCount)
      .map((opt) => opt.id);
  });

  selection.value = newSelection;
};

const copyToClipboard = async () => {
  if (!generatedPrompt.value) return;

  try {
    await navigator.clipboard.writeText(generatedPrompt.value);
    copySuccess.value = true;
    addToHistory(generatedPrompt.value);

    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
};

const addToHistory = (prompt: string) => {
  const newHistory = [prompt, ...history.value].slice(0, 10);
  history.value = newHistory;
};

const clearHistory = () => {
  history.value = [];
};

const getSelectedCount = (categoryId: string) => {
  return selection.value[categoryId as keyof CharacterSelection]?.length || 0;
};

export const useCharacterStore = () => {
  return {
    selection,
    activeCategory,
    activeSubcategory,
    history,
    generatedPrompt,
    copySuccess,
    toggleFeature,
    clearSelection,
    clearAll,
    setActiveCategory,
    setActiveSubcategory,
    randomGenerate,
    copyToClipboard,
    addToHistory,
    clearHistory,
    getSelectedCount,
  };
};
