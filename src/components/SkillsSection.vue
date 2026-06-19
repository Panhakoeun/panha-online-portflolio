<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { skills } from "../data/portfolio";

const visibleSkills = ref(new Set());
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSkills.value.add(entry.target.dataset.skill);
          visibleSkills.value = new Set(visibleSkills.value);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll("[data-skill]").forEach((item) => observer.observe(item));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section id="skills" class="py-24 relative bg-black/20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl font-bold mb-4">Core <span class="gradient-text">Skills</span></h2>
        <p class="text-gray-400 max-w-xl mx-auto">Technologies I use to bring ideas to life</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="glass p-8 rounded-2xl card-hover"
          data-aos="fade-up"
          :data-aos-delay="(index + 1) * 100"
          :data-skill="skill.name"
        >
          <div class="flex items-center mb-6">
            <i :class="[skill.icon, 'text-4xl mr-4']"></i>
            <h3 class="text-xl font-bold">{{ skill.name }}</h3>
          </div>
          <div class="flex justify-between mb-2 text-sm">
            <span class="text-gray-300">{{ skill.level }}</span>
            <span class="text-primary">{{ skill.percent }}%</span>
          </div>
          <div class="skill-container">
            <div
              class="skill-progress"
              :style="{ width: visibleSkills.has(skill.name) ? `${skill.percent}%` : '0%' }"
            ></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
