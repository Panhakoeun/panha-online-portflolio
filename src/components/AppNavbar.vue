<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { navItems, profile } from "../data/portfolio";

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", updateScrollState);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
});
</script>

<template>
  <nav
    id="navbar"
    class="fixed w-full z-50 transition-all duration-300 glass-nav"
    :class="{ 'navbar-scrolled': isScrolled }"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <a href="#home" class="text-2xl font-bold gradient-text tracking-tighter" @click="closeMenu">
          {{ profile.brand }}
        </a>

        <div class="hidden md:flex space-x-8">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="nav-link text-sm uppercase tracking-widest font-medium"
          >
            {{ item.label }}
          </a>
        </div>

        <button
          class="md:hidden focus:outline-none"
          style="color: #0f172a;"
          type="button"
          aria-label="Toggle navigation"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <i class="fas text-2xl" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>

      <div
        v-show="isMenuOpen"
        id="mobile-menu"
        class="md:hidden mt-4 glass rounded-xl p-4 absolute top-full left-0 right-0 mx-4 border border-gray-700"
      >
        <a
          v-for="(item, index) in navItems"
          :key="item.href"
          :href="item.href"
          class="block py-3 hover:text-indigo-300"
          style="color: #64748b;"
          :class="{ 'border-b border-gray-700': index < navItems.length - 1 }"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
