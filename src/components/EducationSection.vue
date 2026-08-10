<script setup>
import { computed } from "vue";
import { education, educationHighlights, projects } from "../data/portfolio";

const projectCount = computed(() => projects.length);

</script>

<template>
  <section id="education" class="py-24 relative bg-black/20">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
          <i class="fas fa-graduation-cap"></i>
          Learning Journey
        </div>
        <h2 class="mt-6 text-4xl font-bold">My <span class="gradient-text">Education</span></h2>
        <p class="mx-auto mt-4 max-w-2xl text-gray-400">
          A focused path built around practical training, self-driven learning, and real project experience in modern web development.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div class="glass rounded-3xl p-8 md:p-10" data-aos="fade-right">
          <div class="education-timeline">
            <article class="education-item">
              <div class="education-dot"></div>
              <div class="education-card">
                <div class="mb-4 inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300">
                  {{ education.period }}
                </div>
                <h3 class="text-2xl font-bold" style="color: var(--text-main);">{{ education.school }}</h3>
                <p class="mt-2 text-sm uppercase tracking-[0.25em] text-pink-300">{{ education.program }}</p>
                <p class="mt-4 leading-relaxed text-gray-400">{{ education.description }}</p>
                <div class="mt-6 flex flex-wrap gap-3">
                  <span v-for="tag in education.tags" :key="tag" class="education-tag">{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="space-y-6" data-aos="fade-left">
          <div class="glass rounded-3xl p-8">
            <p class="text-sm uppercase tracking-[0.3em] text-gray-400">Education Highlights</p>
            <h3 class="mt-4 text-2xl font-bold" style="color: var(--text-main);">What I am developing through study</h3>
            <div class="mt-6 space-y-4">
              <div v-for="item in educationHighlights" :key="item.title" class="education-highlight">
                <i :class="item.icon"></i>
                <div>
                  <p class="font-semibold" style="color: var(--text-main);">{{ item.title }}</p>
                  <p class="text-sm leading-relaxed text-gray-400">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="glass rounded-3xl p-8">
            <p class="text-sm uppercase tracking-[0.3em] text-gray-400">Current Focus</p>
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="rounded-2xl p-5" style="border: 1px solid var(--panel-border); background: var(--panel-tint);">
                <p class="text-3xl font-bold" style="color: var(--text-main);">2+</p>
                <p class="mt-2 text-sm text-gray-400">Years of active learning</p>
              </div>
              <div class="rounded-2xl p-5" style="border: 1px solid var(--panel-border); background: var(--panel-tint);">
                <p class="text-3xl font-bold" style="color: var(--text-main);">{{ projectCount }}+</p>
                <p class="mt-2 text-sm text-gray-400">Projects supporting growth</p>
              </div>
            </div>
            <p class="mt-6 leading-relaxed text-gray-400">
              I am currently focused on growing as a dependable developer who can design, build, and improve meaningful digital products.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
