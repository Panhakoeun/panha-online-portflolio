<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import AppBackground from "./components/AppBackground.vue";
import AppNavbar from "./components/AppNavbar.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import EducationSection from "./components/EducationSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import AppFooter from "./components/AppFooter.vue";
import BackToTop from "./components/BackToTop.vue";
import { useScrollReveal } from "./composables/useScrollReveal";

const { start, stop } = useScrollReveal();

onMounted(async () => {
  await nextTick();
  start();
});

onUnmounted(stop);
</script>

<template>
  <AppBackground />
  <AppNavbar />
  <main>
    <HeroSection />
    <AboutSection />
    <EducationSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
  </main>
  <AppFooter />
  <BackToTop />
</template>
