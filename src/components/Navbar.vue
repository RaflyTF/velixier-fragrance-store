<template>
  <nav 
    class="border-b sticky top-0 z-50 backdrop-blur-md transition-all duration-300"
    :class="[
      scrolled ? 'bg-dark-lighter/95 border-gold/20 shadow-lg shadow-black/20' : 'bg-dark-lighter/80 border-gold/10'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="flex items-center gap-2 hover:opacity-80 transition-all duration-300 hover:scale-105"
        >
          <img src="../assets/logo.svg" alt="Velixier Logo" class="h-8 md:h-10" />
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6 lg:gap-10">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            class="text-base text-cream/80 hover:text-gold transition-all duration-300 font-light relative group"
            active-class="text-gold font-normal"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </router-link>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4 md:gap-6">
          <!-- Wishlist with Font Awesome -->
          <router-link
            to="/products"
            class="text-gold hover:text-champagne transition-all duration-300 hover:scale-110 relative text-base md:text-lg hidden sm:block"
            title="View wishlist"
          >
            <i class="fas fa-heart"></i>
            <Transition name="scale">
              <span 
                v-if="wishlistCount > 0" 
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ wishlistCount }}
              </span>
            </Transition>
          </router-link>

          <!-- Cart with Font Awesome -->
          <button 
            @click="toggleCart" 
            class="text-gold hover:text-champagne transition-all duration-300 hover:scale-110 relative text-base md:text-lg"
            :aria-label="cartCount > 0 ? `Shopping cart with ${cartCount} items` : 'Shopping cart empty'"
          >
            <i class="fas fa-shopping-cart"></i>
            <Transition name="scale">
              <span 
                v-if="cartCount > 0" 
                class="absolute -top-2 -right-2 bg-gold text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartCount }}
              </span>
            </Transition>
          </button>
          
          <!-- Mobile Menu Button with Font Awesome -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="md:hidden text-gold hover:text-champagne transition-all duration-300 text-lg md:text-xl"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
          >
            <i v-if="!mobileMenuOpen" class="fas fa-bars"></i>
            <i v-else class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden py-3 border-t border-gold/10">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="block py-2.5 text-cream/80 hover:text-gold hover:bg-gold/5 transition-colors font-light rounded-lg px-2"
            active-class="text-gold font-normal bg-gold/10"
          >
            {{ item.name }}
          </router-link>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '../stores/cart'
import { useWishlist } from '../stores/wishlist'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const cart = useCart()
const { toggleCart, cartCount } = cart
const wishlist = useWishlist()
const { wishlistCount } = wishlist

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Rating', path: '/rating' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-down-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
  max-height: 0;
}

.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
</style>