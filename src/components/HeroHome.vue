<template>
  <section class="relative h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay and Parallax -->
    <div class="absolute inset-0 hero-parallax">
      <img 
        ref="heroImage"
        src="../assets/HeroHome.webp" 
        alt="Luxury perfume bottles displayed on elegant marble surface with golden accents" 
        class="w-full h-full object-cover transition-transform duration-100 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
      />
      <div class="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50"></div>
    </div>

    <!-- Content with Fade-in Animation -->
    <div class="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto hero-content">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-gold mb-4 md:mb-5 lg:mb-6 leading-tight animate-fade-in-up">
        Discover Your Signature Scent
      </h1>
      <p class="text-sm sm:text-base md:text-lg text-white/90 mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
        Experience luxury fragrances crafted with artisanal precision. Each bottle tells a story of elegance, sophistication, and timeless beauty.
      </p>
      <router-link 
        to="/products"
        class="inline-block bg-champagne hover:bg-gold text-dark px-8 md:px-10 lg:px-12 py-3 md:py-3.5 rounded-full font-normal text-sm md:text-base transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-400"
      >
        Explore Collection
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollY = ref(0)
const heroImage = ref(null)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
