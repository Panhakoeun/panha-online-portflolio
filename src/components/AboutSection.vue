<script setup>
import { ref } from "vue";
import { profile } from "../data/portfolio";

const downloadText = ref("Download CV");
const isDownloading = ref(false);

const downloadCv = async () => {
  if (isDownloading.value) return;

  isDownloading.value = true;
  downloadText.value = "Downloading...";

  try {
    const response = await fetch(profile.cv, { cache: "no-store" });
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = "KOEUN-Panha-CL-CV.pdf";
    link.click();
    window.URL.revokeObjectURL(blobUrl);
    downloadText.value = "Download Complete";
  } catch {
    window.open(profile.cv, "_blank", "noopener");
    downloadText.value = "Opened PDF";
  } finally {
    window.setTimeout(() => {
      isDownloading.value = false;
      downloadText.value = "Download CV";
    }, 2200);
  }
};
</script>

<template>
  <section id="about" class="py-24 relative">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl" data-aos="fade-up">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/3 relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div class="relative rounded-2xl overflow-hidden aspect-square">
              <img
                :src="profile.image"
                alt="Profile"
                class="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div class="md:w-2/3 text-left">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">About <span class="gradient-text">Me</span></h2>
            <h3 class="text-xl text-indigo-400 mb-4 font-mono">{{ profile.title }}</h3>
            <p class="text-gray-400 mb-6 leading-relaxed">
              My journey in web development started in 2025 at
              <span class="text-white font-medium">Passerelles Numeriques Cambodia</span>. I'm passionate
              about building scalable software and creating effective solutions that help people's lives.
            </p>

            <div class="grid grid-cols-2 gap-6 mb-8">
              <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                <p class="text-gray-400 text-sm">Experience</p>
                <p class="text-xl font-bold text-white">2+ Years</p>
              </div>
              <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                <p class="text-gray-400 text-sm">Projects</p>
                <p class="text-xl font-bold text-white">5+ Completed</p>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium transition"
              :class="{ 'pointer-events-none opacity-80': isDownloading }"
              @click="downloadCv"
            >
              {{ downloadText }}
              <i class="fas ml-2 text-sm" :class="isDownloading ? 'fa-spinner fa-spin' : 'fa-arrow-right'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
