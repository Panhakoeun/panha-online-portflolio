<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { profile, typewriterPhrases } from "../data/portfolio";

const typedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let timerId;

const typeNext = () => {
  const phrase = typewriterPhrases[phraseIndex];

  if (isDeleting) {
    typedText.value = phrase.substring(0, charIndex - 1);
    charIndex -= 1;
  } else {
    typedText.value = phrase.substring(0, charIndex + 1);
    charIndex += 1;
  }

  let speed = isDeleting ? 50 : 150;

  if (!isDeleting && charIndex === phrase.length) {
    isDeleting = true;
    speed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    speed = 500;
  }

  timerId = window.setTimeout(typeNext, speed);
};

onMounted(typeNext);

onUnmounted(() => {
  window.clearTimeout(timerId);
});
</script>

<template>
  <section id="home" class="min-h-screen flex items-center justify-center relative pt-20">
    <div class="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div class="text-left" data-aos="fade-right">
        <div
          class="inline-block px-4 py-1 mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium tracking-wide"
        >
          Welcome to my portfolio
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight" style="color: var(--text-main);">
          I'm {{ profile.name }} <br />
          <span class="gradient-text">{{ typedText }}</span><span class="cursor">|</span>
        </h1>
        <p class="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
          Creative Web Developer & Designer based in Cambodia. I transform complex problems into beautiful,
          intuitive designs.
        </p>
        <div class="flex flex-wrap gap-4">
          <a
            href="#projects"
            class="btn-primary px-8 py-3 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-indigo-500/50"
          >
            View Work
          </a>
          <a
            href="#contact"
            class="px-8 py-3 rounded-full font-bold tracking-wide border hover:bg-white/20 transition-all"
            style="color: var(--primary); border-color: rgba(99,102,241,0.35);"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div class="relative hidden md:block" data-aos="fade-left">
        <div class="relative w-full aspect-square max-w-md mx-auto floating">
          <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-[60px] opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div class="relative z-10 w-full h-full rounded-2xl overflow-hidden glass p-2 rotate-3 hover:rotate-0 transition-all duration-500">
            <img
              :src="profile.image"
              alt="Panha Profile"
              class="w-full h-full object-cover rounded-xl filter brightness-90 contrast-125"
            />
          </div>
        </div>
      </div>
    </div>

    <a
      href="#about"
      style="color: rgba(99,102,241,0.5);"
      aria-label="Scroll to about section"
    >
      <i class="fas fa-chevron-down text-2xl"></i>
    </a>
  </section>
</template>
