<script setup>
import { ref } from "vue";
import { profile, socials } from "../data/portfolio";

const status = ref(null);
const isSending = ref(false);
const form = ref({
  name: "",
  email: "",
  message: "",
});

const statusClasses = {
  success: "border-green-500/30 bg-green-500/10 text-green-200",
  warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-100",
  error: "border-red-500/30 bg-red-500/10 text-red-200",
};

const showStatus = (message, type) => {
  status.value = { message, type };
};

const submitForm = async () => {
  isSending.value = true;
  status.value = null;

  const formData = new FormData();
  formData.set("name", form.value.name);
  formData.set("email", form.value.email);
  formData.set("message", form.value.message);
  formData.set("_subject", "New Portfolio Message");
  formData.set("_captcha", "false");
  formData.set("_template", "table");
  formData.set("_autoresponse", "Thank you for reaching out to Panha. Your message has been received successfully.");

  if (window.location.protocol === "file:") {
    const subject = encodeURIComponent(`Portfolio Message from ${form.value.name || "Portfolio Visitor"}`);
    const body = encodeURIComponent(`Name: ${form.value.name}\nEmail: ${form.value.email}\n\nMessage:\n${form.value.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    showStatus("Your email app was opened because this page is running as a local file.", "warning");
    isSending.value = false;
    return;
  }

  try {
    const response = await fetch(`https://formsubmit.co/${profile.email}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Form request failed");

    form.value = { name: "", email: "", message: "" };
    showStatus("Your message was sent successfully. I will get back to you soon.", "success");
  } catch {
    showStatus(`Sending failed right now. Please email ${profile.email} directly.`, "error");
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <section id="contact" class="py-24 relative">
    <div class="container mx-auto px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16" data-aos="fade-up">
          <h2 class="text-4xl font-bold mb-4">Get In <span class="gradient-text">Touch</span></h2>
          <p class="text-gray-400">Let's work together on your next project</p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <div class="space-y-8" data-aos="fade-right">
            <div class="glass p-6 rounded-2xl flex items-center">
              <div class="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl mr-4">
                <i class="fas fa-envelope"></i>
              </div>
              <div>
                <h4 class="text-sm text-gray-400 uppercase tracking-wide">Email</h4>
                <p class="font-medium break-all" style="color: var(--text-main);">{{ profile.email }}</p>
              </div>
            </div>

            <div class="glass p-6 rounded-2xl flex items-center">
              <div class="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xl mr-4">
                <i class="fas fa-phone"></i>
              </div>
              <div>
                <h4 class="text-sm text-gray-400 uppercase tracking-wide">Phone</h4>
                <p class="font-medium" style="color: var(--text-main);">{{ profile.phone }}</p>
              </div>
            </div>

            <div class="glass p-6 rounded-2xl flex items-center">
              <div class="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl mr-4">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h4 class="text-sm text-gray-400 uppercase tracking-wide">Location</h4>
                <p class="font-medium" style="color: var(--text-main);">{{ profile.location }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <a
                v-for="social in socials"
                :key="social.href"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
                class="inline-flex items-center justify-center hover:bg-white/20 transition-all"
                style="color: #6366f1;"
                :class="social.wide ? 'gap-2 rounded-full bg-white/5 px-4 py-2 hover:scale-105' : 'w-10 h-10 rounded-full bg-white/5 hover:scale-110'"
              >
                <i :class="social.icon"></i>
                <span v-if="social.wide" class="text-sm font-medium">{{ social.label }}</span>
              </a>
            </div>
          </div>

          <div class="glass p-8 rounded-3xl" data-aos="fade-left">
            <form class="space-y-6" @submit.prevent="submitForm">
              <div>
                <label for="name" class="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  required
                  class="w-full px-4 py-3 rounded-xl input-field focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label for="email" class="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 rounded-xl input-field focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label for="message" class="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 rounded-xl input-field focus:outline-none resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full btn-primary py-3 rounded-xl font-bold tracking-wide shadow-lg text-white disabled:cursor-not-allowed disabled:opacity-75"
                :disabled="isSending"
              >
                <i v-if="isSending" class="fas fa-spinner fa-spin mr-2"></i>
                {{ isSending ? "Sending..." : "Send Message" }}
              </button>
              <p
                v-if="status"
                class="rounded-xl border px-4 py-3 text-sm"
                :class="statusClasses[status.type]"
                aria-live="polite"
              >
                {{ status.message }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
