<script setup>
import { projects } from "../data/portfolio";
</script>

<template>
  <section id="projects" class="py-24 relative">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl font-bold mb-4">Featured <span class="gradient-text">Projects</span></h2>
        <p class="text-gray-400 max-w-xl mx-auto">A selection of my recent work</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="glass rounded-2xl overflow-hidden card-hover group"
          data-aos="fade-up"
          :data-aos-delay="(index + 1) * 100"
        >
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                View Project
              </a>
            </div>
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 text-xs">
              <span
                v-for="tag in project.tags"
                :key="`${project.title}-${tag}`"
                class="px-3 py-1 rounded-full bg-white/10 text-indigo-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
