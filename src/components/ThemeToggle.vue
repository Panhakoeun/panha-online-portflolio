<script setup>
import { useTheme } from "../composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    role="switch"
    :aria-checked="theme === 'dark'"
    aria-label="Toggle dark mode"
    @click="toggleTheme"
  >
    <i class="fas fa-sun theme-toggle-icon theme-toggle-icon-sun"></i>
    <i class="fas fa-moon theme-toggle-icon theme-toggle-icon-moon"></i>
    <span class="theme-toggle-thumb"></span>
  </button>
</template>
