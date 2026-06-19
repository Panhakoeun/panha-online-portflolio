<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);

const updateVisibility = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", updateVisibility);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateVisibility);
});
</script>

<template>
  <button
    type="button"
    class="fixed bottom-8 right-8 bg-indigo-600 text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:bg-indigo-500 flex items-center justify-center hover:scale-110"
    :class="isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'"
    aria-label="Back to top"
    @click="scrollToTop"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>
