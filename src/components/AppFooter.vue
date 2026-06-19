<script setup>
import { profile } from "../data/portfolio";

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="py-12 relative bg-black/40 text-center">
    <div class="container mx-auto px-6">
      <h2 class="text-2xl font-bold mb-6 gradient-text">{{ profile.brand }}</h2>
      <p class="text-gray-500 mb-6">Designed & Built by Panha Koeun</p>
      <p class="text-gray-600 text-sm">&copy; {{ currentYear }} All rights reserved.</p>
    </div>
  </footer>
</template>
