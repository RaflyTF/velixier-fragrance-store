<template>
  <div class="min-h-screen">
    <Navbar />
    <HeroHome />
    <CTANote />
    <CTABestSellers />
    <CTAPromo />
    <CTATestimoni />
    <CTANewsletter />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './Navbar.vue'
import HeroHome from './HeroHome.vue'
import CTANote from './CTANote.vue'
import CTABestSellers from './CTABestSellers.vue'
import CTAPromo from './CTAPromo.vue'
import CTATestimoni from './CTATestimoni.vue'
import CTANewsletter from './CTANewsletter.vue'
import Footer from './Footer.vue'

const handleScroll = () => {
  // Reveal sections on scroll
  const revealSections = document.querySelectorAll('.reveal-section')
  revealSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    
    if (sectionTop < windowHeight * 0.85) {
      section.classList.add('revealed')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
