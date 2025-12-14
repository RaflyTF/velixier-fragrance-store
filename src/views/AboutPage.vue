<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="py-20 px-4 bg-dark min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="text-center mb-16 reveal-section" :class="{ 'revealed': isRevealed }">
          <h1 class="text-5xl md:text-6xl font-serif font-normal text-gold mb-6">About Velixier</h1>
          <p class="text-cream/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Welcome to <span class="text-gold font-semibold">Velixier</span>, where luxury meets artistry in every bottle. We are passionate about creating exceptional fragrances that tell stories and evoke emotions.
          </p>
        </div>

        <!-- Stats Counter Section -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="bg-dark-lighter p-8 rounded-2xl border border-gray-800/30 text-center reveal-section"
            :class="{ 'revealed': isRevealed }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="text-4xl md:text-5xl font-serif text-gold mb-2">
              <span v-if="stat.prefix">{{ stat.prefix }}</span>
              <span>{{ animatedCounts[index] }}</span>
              <span v-if="stat.suffix">{{ stat.suffix }}</span>
            </div>
            <p class="text-cream/70 text-sm md:text-base">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Brand Values/Pillars -->
        <div class="mb-20">
          <h2 class="text-4xl font-serif text-gold text-center mb-12 reveal-section" :class="{ 'revealed': isRevealed }">Our Core Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(value, index) in values" 
              :key="index"
              class="group bg-dark-lighter p-8 rounded-2xl border border-gray-800/30 hover:border-gold/50 transition-all duration-300 hover:scale-105 reveal-section"
              :class="{ 'revealed': isRevealed }"
              :style="{ animationDelay: `${0.4 + index * 0.1}s` }"
            >
              <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {{ value.icon }}
              </div>
              <h3 class="text-xl font-serif text-gold mb-3">{{ value.title }}</h3>
              <p class="text-cream/70 text-sm leading-relaxed">{{ value.description }}</p>
            </div>
          </div>
        </div>

        <!-- Timeline Section -->
        <div class="mb-20">
          <h2 class="text-4xl font-serif text-gold text-center mb-12 reveal-section" :class="{ 'revealed': isRevealed }">Our Journey</h2>
          <div class="max-w-4xl mx-auto">
            <div 
              v-for="(milestone, index) in timeline" 
              :key="index"
              class="relative pl-8 pb-12 border-l-2 border-gold/30 last:pb-0 reveal-section"
              :class="{ 'revealed': isRevealed }"
              :style="{ animationDelay: `${0.6 + index * 0.15}s` }"
            >
              <!-- Timeline Dot -->
              <div class="absolute left-[-9px] top-0 w-4 h-4 bg-gold rounded-full ring-4 ring-dark"></div>
              
              <div class="bg-dark-lighter p-6 rounded-2xl border border-gray-800/30 hover:border-gold/30 transition-colors">
                <div class="flex items-center gap-4 mb-3">
                  <span class="text-3xl font-serif text-gold">{{ milestone.year }}</span>
                  <span class="text-2xl">{{ milestone.icon }}</span>
                </div>
                <h3 class="text-xl text-cream font-medium mb-2">{{ milestone.title }}</h3>
                <p class="text-cream/70 text-sm leading-relaxed">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-serif text-gold text-center mb-4 reveal-section" :class="{ 'revealed': isRevealed }">Meet Our Team</h2>
          <p class="text-cream/70 text-center mb-12 max-w-2xl mx-auto text-sm md:text-base">The passionate individuals behind Velixier's exceptional fragrances</p>
          
          <!-- Loading Skeleton -->
          <div v-if="isLoadingTeam" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div v-for="i in 4" :key="i" class="animate-pulse">
              <div class="bg-dark-lighter rounded-2xl mb-4 aspect-square"></div>
              <div class="h-6 bg-dark-lighter rounded w-3/4 mb-2"></div>
              <div class="h-4 bg-dark-lighter rounded w-1/2"></div>
            </div>
          </div>

          <!-- Team Cards -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div 
              v-for="(member, index) in team" 
              :key="index"
              class="group reveal-section transform hover:-translate-y-2 transition-all duration-500"
              :class="{ 'revealed': isRevealed }"
              :style="{ animationDelay: `${0.8 + index * 0.1}s` }"
            >
              <div class="relative overflow-hidden rounded-2xl mb-4 aspect-square shadow-lg shadow-black/30 group-hover:shadow-2xl group-hover:shadow-gold/20 transition-shadow duration-300">
                <!-- Real Photo with loading state -->
                <img 
                  :src="member.photo" 
                  :alt="member.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <!-- Hover Overlay with improved animation -->
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4 md:p-6">
                  <p class="text-cream/90 text-xs md:text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{{ member.bio }}</p>
                </div>
              </div>
              <h3 class="text-lg md:text-xl font-serif text-gold mb-1 group-hover:text-champagne transition-colors">{{ member.name }}</h3>
              <p class="text-cream/60 text-xs md:text-sm">{{ member.role }}</p>
            </div>
          </div>
        </div>

        <!-- Behind the Scenes Gallery -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-serif text-gold text-center mb-4 reveal-section" :class="{ 'revealed': isRevealed }">Behind The Scenes</h2>
          <p class="text-cream/70 text-center mb-12 max-w-2xl mx-auto text-sm md:text-base">Glimpse into our perfume crafting process</p>
          
          <!-- Loading Skeleton -->
          <div v-if="isLoadingGallery" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div v-for="i in 6" :key="i" class="animate-pulse">
              <div class="bg-dark-lighter rounded-2xl aspect-square"></div>
            </div>
          </div>

          <!-- Gallery Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div 
              v-for="(image, index) in gallery" 
              :key="index"
              class="group relative aspect-square rounded-2xl overflow-hidden reveal-section cursor-pointer shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500"
              :class="{ 'revealed': isRevealed }"
              :style="{ animationDelay: `${1 + index * 0.1}s` }"
            >
              <img 
                :src="image.photo" 
                :alt="image.label"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-2"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-4">
                <p class="text-cream text-center font-semibold text-base md:text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{{ image.label }}</p>
                <p class="text-cream/70 text-center text-xs md:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{{ image.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Story Sections -->
        <div class="max-w-4xl mx-auto space-y-8 mb-20">
          <div class="bg-dark-lighter p-8 rounded-3xl border border-gray-800 reveal-section" :class="{ 'revealed': isRevealed }">
            <h2 class="text-3xl font-serif font-normal text-gold mb-4">Our Story</h2>
            <p class="text-cream/80 leading-relaxed">
              Founded with a vision to revolutionize the fragrance industry, Velixier combines traditional perfumery techniques with modern innovation. Each scent in our collection is meticulously crafted by master perfumers using the finest ingredients sourced from around the world.
            </p>
          </div>

          <div class="bg-dark-lighter p-8 rounded-3xl border border-gray-800 reveal-section" :class="{ 'revealed': isRevealed }">
            <h2 class="text-3xl font-serif font-normal text-gold mb-4">Our Philosophy</h2>
            <p class="text-cream/80 leading-relaxed">
              We believe that fragrance is more than just a scent—it's an expression of identity, a memory captured in a bottle, and an art form that deserves to be celebrated. Every Velixier fragrance is designed to be timeless, elegant, and unforgettable.
            </p>
          </div>

          <div class="bg-dark-lighter p-8 rounded-3xl border border-gray-800 reveal-section" :class="{ 'revealed': isRevealed }">
            <h2 class="text-3xl font-serif font-normal text-gold mb-4">Quality & Craftsmanship</h2>
            <p class="text-cream/80 leading-relaxed">
              Our commitment to excellence is unwavering. We use only premium ingredients and sustainable practices to create fragrances that not only smell divine but also respect our planet. Each bottle is a testament to our dedication to quality and artisanal craftsmanship.
            </p>
          </div>
        </div>

        <!-- Customer Testimonials Section -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-serif text-gold text-center mb-4 reveal-section" :class="{ 'revealed': isRevealed }">What Our Customers Say</h2>
          <p class="text-cream/70 text-center mb-12 max-w-2xl mx-auto text-sm md:text-base">Trusted by perfume lovers worldwide</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="bg-dark-lighter rounded-2xl p-6 md:p-8 reveal-section group hover:scale-105 hover:shadow-xl hover:shadow-gold/10 transition-all duration-500"
              :class="{ 'revealed': isRevealed }"
              :style="{ animationDelay: `${1.2 + index * 0.1}s` }"
            >
              <!-- Quote Icon -->
              <div class="text-gold/30 text-4xl md:text-5xl mb-4 font-serif">"</div>
              
              <!-- Testimonial Text -->
              <p class="text-cream/90 text-sm md:text-base italic mb-6 leading-relaxed">{{ testimonial.text }}</p>
              
              <!-- Star Rating -->
              <div class="flex gap-1 mb-6">
                <svg v-for="i in 5" :key="i" class="w-4 h-4 md:w-5 md:h-5 fill-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              <!-- Customer Info -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gold to-champagne flex items-center justify-center text-dark font-bold text-base md:text-lg group-hover:scale-110 transition-transform duration-500">
                  {{ testimonial.initials }}
                </div>
                <div>
                  <p class="text-cream font-semibold text-base md:text-lg group-hover:text-gold transition-colors duration-300">{{ testimonial.name }}</p>
                  <p class="text-cream/60 text-xs md:text-sm">{{ testimonial.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Awards & Certifications Section -->
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-serif text-gold text-center mb-4 reveal-section" :class="{ 'revealed': isRevealed }">Awards & Recognition</h2>
          <p class="text-cream/70 text-center mb-12 max-w-2xl mx-auto text-sm md:text-base">Excellence acknowledged globally</p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div 
              v-for="(award, index) in awards" 
              :key="index"
              class="bg-dark-lighter rounded-2xl p-6 md:p-8 text-center reveal-section group hover:scale-105 hover:shadow-xl hover:shadow-gold/20 transition-all duration-500"
              :class="{ 'revealed': isRevealed }"
              :style="{ animationDelay: `${1.5 + index * 0.1}s` }"
            >
              <!-- Award Icon -->
              <div class="text-5xl md:text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                {{ award.icon }}
              </div>
              
              <!-- Award Title -->
              <h3 class="text-cream font-semibold text-base md:text-lg mb-2 group-hover:text-gold transition-colors duration-300">{{ award.title }}</h3>
              
              <!-- Organization -->
              <p class="text-cream/70 text-xs md:text-sm mb-3">{{ award.organization }}</p>
              
              <!-- Year Badge -->
              <div class="inline-block bg-gold/10 border border-gold/30 text-gold px-3 py-1 rounded-full text-xs md:text-sm font-medium group-hover:bg-gold/20 group-hover:border-gold/50 transition-all duration-300">
                {{ award.year }}
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center pt-8">
          <router-link 
            to="/products"
            class="inline-block bg-champagne hover:bg-gold text-dark px-12 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
          >
            Explore Our Collection
          </router-link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

// Import Team Photos
import RaflyPhoto from '../assets/Rafly Taufika_Founder & Master Perfume.jpg'
import JonathanPhoto from '../assets/Jonathan Anderson_Creative Director.jpg'
import JoePhoto from '../assets/Joe Depa_Head of Innovation.jpg'
import StevenPhoto from '../assets/Steven Spielberg_quality director.jpg'

// Import Gallery Photos
import LaboratoryPhoto from '../assets/Laboratory.jpeg'
import IngredientsPhoto from '../assets/Ingredients.jpeg'
import DistillationPhoto from '../assets/Distillation.jpeg'
import CompositionPhoto from '../assets/Composition.jpeg'
import TestingPhoto from '../assets/Testing.jpeg'
import BottlingPhoto from '../assets/Bottling.jpeg'

const isRevealed = ref(false)
const animatedCounts = ref([0, 0, 0, 0])
const isLoadingTeam = ref(true)
const isLoadingGallery = ref(true)

const stats = [
  { value: 500, suffix: '+', label: 'Products Sold', prefix: '' },
  { value: 50, suffix: '+', label: 'Countries', prefix: '' },
  { value: 10, suffix: '+', label: 'Master Perfumers', prefix: '' },
  { value: 5, suffix: '', label: 'Years Excellence', prefix: '' }
]

const values = [
  {
    icon: '🌿',
    title: 'Sustainability',
    description: 'We source ingredients responsibly and prioritize eco-friendly practices in every step of our process.'
  },
  {
    icon: '💎',
    title: 'Quality',
    description: 'Only the finest materials and meticulous attention to detail go into every Velixier fragrance.'
  },
  {
    icon: '✨',
    title: 'Innovation',
    description: 'Blending traditional techniques with cutting-edge technology to create unique scents.'
  },
  {
    icon: '🎨',
    title: 'Artistry',
    description: 'Each fragrance is a masterpiece, carefully composed by our expert perfumers.'
  }
]

const timeline = [
  {
    year: '2020',
    icon: '🌱',
    title: 'The Beginning',
    description: 'Velixier was founded with a dream to create luxury fragrances that tell stories and evoke emotions.'
  },
  {
    year: '2021',
    icon: '🎭',
    title: 'First Collection',
    description: 'Launched our signature collection featuring 8 unique fragrances, each crafted with premium ingredients.'
  },
  {
    year: '2022',
    icon: '🌍',
    title: 'Global Expansion',
    description: 'Expanded to 50+ countries worldwide, bringing Velixier\'s luxury to fragrance lovers globally.'
  },
  {
    year: '2023',
    icon: '🏆',
    title: 'Award Recognition',
    description: 'Received multiple industry awards for excellence in perfumery and sustainable practices.'
  },
  {
    year: '2024',
    icon: '🚀',
    title: 'Innovation Hub',
    description: 'Opened our state-of-the-art laboratory for developing next-generation fragrances.'
  },
  {
    year: '2025',
    icon: '💫',
    title: 'Today',
    description: 'Continuing to push boundaries in luxury perfumery with over 500 products sold worldwide.'
  }
]

const team = [
  {
    name: 'Rafly Taufika',
    role: 'Founder & Master Perfumer',
    photo: RaflyPhoto,
    bio: 'With 20+ years in perfumery, Rafly brings unparalleled expertise and passion to every creation. His vision founded Velixier.'
  },
  {
    name: 'Jonathan Anderson',
    role: 'Creative Director',
    photo: JonathanPhoto,
    bio: 'Jonathan\'s artistic vision shapes the aesthetic and storytelling behind each Velixier fragrance, creating memorable brand experiences.'
  },
  {
    name: 'Joe Depa',
    role: 'Head of Innovation',
    photo: JoePhoto,
    bio: 'Joe pioneers new techniques and sustainable practices in modern perfumery, pushing the boundaries of fragrance creation.'
  },
  {
    name: 'Steven Spielberg',
    role: 'Quality Director',
    photo: StevenPhoto,
    bio: 'Steven ensures every bottle meets Velixier\'s rigorous standards of excellence with meticulous attention to detail.'
  }
]

const gallery = [
  { photo: LaboratoryPhoto, label: 'Laboratory', description: 'State-of-the-art perfume laboratory' },
  { photo: IngredientsPhoto, label: 'Ingredients', description: 'Premium natural ingredients' },
  { photo: DistillationPhoto, label: 'Distillation', description: 'Traditional distillation process' },
  { photo: CompositionPhoto, label: 'Composition', description: 'Artisanal fragrance composition' },
  { photo: TestingPhoto, label: 'Testing', description: 'Quality testing and refinement' },
  { photo: BottlingPhoto, label: 'Bottling', description: 'Precision bottling process' }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    location: 'New York, USA',
    text: 'Velixier\'s fragrances are absolutely divine! The Midnight Oud has become my signature scent. The quality and longevity are unmatched.'
  },
  {
    name: 'Michael Chen',
    initials: 'MC',
    location: 'Singapore',
    text: 'As a perfume connoisseur, I\'m impressed by Velixier\'s attention to detail. Each fragrance tells a story. The packaging is luxurious too!'
  },
  {
    name: 'Emma Williams',
    initials: 'EW',
    location: 'London, UK',
    text: 'I\'ve tried many luxury brands, but Velixier stands out. The scents are unique, sophisticated, and long-lasting. Worth every penny!'
  },
  {
    name: 'David Martinez',
    initials: 'DM',
    location: 'Barcelona, Spain',
    text: 'The customer service is exceptional! They helped me find the perfect fragrance for my wife. She absolutely loves it. Highly recommended!'
  },
  {
    name: 'Yuki Tanaka',
    initials: 'YT',
    location: 'Tokyo, Japan',
    text: 'Velixier brings elegance and sophistication to every bottle. The Rose Garden scent is my favorite for special occasions. Simply beautiful!'
  },
  {
    name: 'Sophie Dubois',
    initials: 'SD',
    location: 'Paris, France',
    text: 'As a Parisian, I have high standards for perfume. Velixier exceeded all expectations. The craftsmanship is evident in every note.'
  }
]

const awards = [
  {
    icon: '🏆',
    title: 'Best Luxury Fragrance',
    organization: 'International Fragrance Awards',
    year: '2024'
  },
  {
    icon: '🌟',
    title: 'Excellence in Perfumery',
    organization: 'World Perfume Congress',
    year: '2023'
  },
  {
    icon: '💎',
    title: 'Premium Brand of the Year',
    organization: 'Luxury Lifestyle Awards',
    year: '2024'
  },
  {
    icon: '🌿',
    title: 'Sustainable Practices Award',
    organization: 'Green Beauty Coalition',
    year: '2023'
  },
  {
    icon: '🎨',
    title: 'Artisan Craftsmanship',
    organization: 'Master Perfumers Guild',
    year: '2024'
  },
  {
    icon: '⭐',
    title: 'Customer Choice Award',
    organization: 'Fragrance Review Magazine',
    year: '2025'
  },
  {
    icon: '🥇',
    title: 'Gold Medal',
    organization: 'Paris Fragrance Exhibition',
    year: '2023'
  },
  {
    icon: '🏅',
    title: 'Innovation Award',
    organization: 'Perfume Technology Summit',
    year: '2024'
  }
]

// Counter Animation
const animateCounters = () => {
  stats.forEach((stat, index) => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = stat.value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        animatedCounts.value[index] = stat.value
        clearInterval(timer)
      } else {
        animatedCounts.value[index] = Math.floor(current)
      }
    }, duration / steps)
  })
}

// Scroll reveal animation
const handleScroll = () => {
  const sections = document.querySelectorAll('.reveal-section')
  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.85
    if (isVisible) {
      section.classList.add('revealed')
    }
  })
}

onMounted(() => {
  isRevealed.value = true
  animateCounters()
  
  // Simulate loading untuk team photos
  setTimeout(() => {
    isLoadingTeam.value = false
  }, 800)
  
  // Simulate loading untuk gallery
  setTimeout(() => {
    isLoadingGallery.value = false
  }, 1000)
  
  // Initial check
  setTimeout(handleScroll, 100)
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.reveal-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal-section.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
