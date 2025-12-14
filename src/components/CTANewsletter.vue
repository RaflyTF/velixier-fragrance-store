<template>
  <section class="bg-gradient-to-br from-gold/10 via-dark to-champagne/10 py-16 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Icon -->
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-full mb-6">
        <i class="fas fa-envelope text-2xl text-gold"></i>
      </div>

      <!-- Heading -->
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif text-gold mb-4">
        Join Our Exclusive Club
      </h2>
      <p class="text-cream/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
        Subscribe to our newsletter and get <span class="text-gold font-semibold">10% off</span> on your first purchase. 
        Plus, be the first to know about new arrivals and special offers.
      </p>

      <!-- Newsletter Form -->
      <form @submit.prevent="handleSubscribe" class="max-w-md mx-auto">
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email address"
            required
            class="w-full bg-dark-lighter border border-gold/20 rounded-full px-6 py-4 pr-32 text-cream text-sm focus:outline-none focus:border-gold/50 transition-colors"
            :class="{ 'border-red-500': error, 'border-green-500': success }"
          />
          <button
            type="submit"
            :disabled="isSubmitting"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-gold hover:bg-champagne text-dark px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubmitting">Subscribe</span>
            <i v-else class="fas fa-spinner fa-spin"></i>
          </button>
        </div>
        
        <!-- Message -->
        <Transition name="fade">
          <p v-if="error" class="text-red-400 text-sm mt-3">{{ error }}</p>
          <p v-else-if="success" class="text-green-400 text-sm mt-3">
            <i class="fas fa-check-circle mr-1"></i>{{ success }}
          </p>
        </Transition>
      </form>

      <!-- Benefits -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
        <div class="flex flex-col items-center">
          <i class="fas fa-gift text-3xl text-gold mb-3"></i>
          <h3 class="text-cream font-medium mb-1">Exclusive Offers</h3>
          <p class="text-cream/60 text-sm">Special deals for members</p>
        </div>
        <div class="flex flex-col items-center">
          <i class="fas fa-sparkles text-3xl text-gold mb-3"></i>
          <h3 class="text-cream font-medium mb-1">New Arrivals First</h3>
          <p class="text-cream/60 text-sm">Early access to products</p>
        </div>
        <div class="flex flex-col items-center">
          <i class="fas fa-crown text-3xl text-gold mb-3"></i>
          <h3 class="text-cream font-medium mb-1">VIP Treatment</h3>
          <p class="text-cream/60 text-sm">Priority customer service</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)
const error = ref('')
const success = ref('')

const handleSubscribe = async () => {
  error.value = ''
  success.value = ''
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }

  isSubmitting.value = true

  // Simulate API call (replace with actual API in production)
  setTimeout(() => {
    success.value = '🎉 Thank you! Check your email for your 10% discount code.'
    email.value = ''
    isSubmitting.value = false
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      success.value = ''
    }, 5000)
  }, 1000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
