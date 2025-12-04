<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-black min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-gold mb-8 md:mb-10 lg:mb-12 text-center">Shopping Cart</h1>
        
        <!-- Empty Cart State -->
        <div v-if="cartItems.length === 0" class="text-center py-12 md:py-20">
          <!-- Animated Shopping Bag Illustration -->
          <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
            <div class="absolute inset-0 bg-gradient-to-br from-gold/20 to-champagne/20 rounded-full blur-2xl"></div>
            <div class="relative bg-dark-lighter border-2 border-gold/30 rounded-full w-full h-full flex items-center justify-center">
              <i class="fas fa-shopping-bag text-5xl md:text-6xl text-gold/60"></i>
            </div>
          </div>

          <h2 class="text-2xl md:text-3xl lg:text-4xl font-serif text-gold mb-3 md:mb-4">Your Cart is Empty</h2>
          <p class="text-cream/70 text-sm md:text-base mb-6 md:mb-8 max-w-md mx-auto px-4">
            Start exploring our exclusive collection of luxury fragrances and find your signature scent
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <router-link 
              to="/products"
              class="inline-flex items-center gap-2 bg-gold hover:bg-champagne text-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 text-sm md:text-base"
            >
              <i class="fas fa-shopping-bag"></i>
              <span>Start Shopping</span>
            </router-link>
            <router-link 
              to="/"
              class="inline-flex items-center gap-2 bg-dark-lighter border border-gold/20 hover:border-gold/50 text-gold px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <i class="fas fa-home"></i>
              <span>Back to Home</span>
            </router-link>
          </div>

          <!-- Popular Products Preview -->
          <div class="mt-12 md:mt-16">
            <h3 class="text-lg md:text-xl font-serif text-gold mb-4 md:mb-6">
              <i class="fas fa-fire mr-2 text-orange-400"></i>
              Popular Choices
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              <router-link 
                v-for="product in popularProducts" 
                :key="product.id"
                :to="`/products/${product.id}`"
                class="bg-dark-lighter p-3 md:p-4 rounded-xl border border-gray-800/30 hover:border-gold/30 transition-all duration-300 group"
              >
                <div class="aspect-square bg-black rounded-lg mb-2 md:mb-3 p-2 overflow-hidden">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p class="text-cream text-xs md:text-sm font-medium truncate mb-1">{{ product.name }}</p>
                <p class="text-gold text-xs md:text-sm">{{ product.price }}</p>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <!-- Cart Items List -->
          <div class="lg:col-span-2 space-y-3 md:space-y-4">
            <TransitionGroup name="cart-item">
              <div 
                v-for="item in cartItems" 
                :key="item.id"
                class="bg-dark-lighter p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-800/30 hover:border-gold/20 transition-all duration-300"
              >
                <div class="flex items-center gap-3 md:gap-6">
                  <!-- Product Image -->
                  <div class="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-black rounded-lg md:rounded-xl overflow-hidden p-1.5 md:p-2">
                    <img 
                      :src="item.image" 
                      :alt="item.name" 
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <!-- Product Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-base md:text-lg font-serif text-gold mb-1 truncate">{{ item.name }}</h3>
                    <p class="text-cream/70 text-xs md:text-sm mb-2">{{ item.price }}</p>
                    
                    <!-- Quantity Controls -->
                    <div class="flex items-center gap-2 md:gap-3">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        class="w-7 h-7 md:w-8 md:h-8 bg-dark border border-gold/20 rounded-lg text-gold hover:bg-gold/10 transition-colors flex items-center justify-center text-sm"
                      >
                        <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <span class="text-cream w-6 md:w-8 text-center font-medium text-sm md:text-base">{{ item.quantity }}</span>
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="w-7 h-7 md:w-8 md:h-8 bg-dark border border-gold/20 rounded-lg text-gold hover:bg-gold/10 transition-colors flex items-center justify-center text-sm"
                      >
                        <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Item Total & Remove -->
                  <div class="flex flex-col items-end gap-2 md:gap-4">
                    <p class="text-base md:text-lg font-medium text-cream">
                      {{ formatPrice((item.priceNum || parseFloat(item.price.replace(/\D/g, ''))) * item.quantity) }}
                    </p>
                    <button 
                      @click="removeFromCart(item.id)"
                      class="text-red-400 hover:text-red-300 p-1.5 md:p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Remove from cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </TransitionGroup>

            <!-- Clear Cart Button -->
            <button 
              @click="handleClearCart"
              class="w-full bg-dark-lighter hover:bg-dark border border-red-400/30 text-red-400 py-2.5 md:py-3 rounded-xl transition-all duration-300 hover:border-red-400/50 text-sm md:text-base"
            >
              Clear Cart
            </button>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-dark-lighter p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-800/30 lg:sticky lg:top-24">
              <h3 class="text-xl md:text-2xl font-serif text-gold mb-4 md:mb-6">Order Summary</h3>
              
              <div class="space-y-2.5 md:space-y-3 mb-5 md:mb-6">
                <div class="flex justify-between text-cream/80 text-sm md:text-base">
                  <span>Subtotal ({{ cartCount }} items)</span>
                  <span>{{ formatPrice(cartTotal) }}</span>
                </div>
                <div class="flex justify-between text-cream/80 text-sm md:text-base">
                  <span>Shipping</span>
                  <span>{{ formatPrice(50000) }}</span>
                </div>
                <div class="flex justify-between text-cream/80 text-sm md:text-base">
                  <span>Tax (10%)</span>
                  <span>{{ formatPrice(cartTotal * 0.1) }}</span>
                </div>
                <div class="border-t border-gray-800 pt-2.5 md:pt-3 flex justify-between text-lg md:text-xl font-normal text-gold">
                  <span>Total</span>
                  <span>{{ formatPrice(cartTotal + 50000 + (cartTotal * 0.1)) }}</span>
                </div>
              </div>

              <router-link 
                to="/checkout"
                class="block w-full text-center bg-champagne hover:bg-gold text-dark py-3 md:py-4 rounded-xl md:rounded-2xl font-medium text-sm md:text-base mb-3 md:mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
              >
                Proceed to Checkout
              </router-link>

              <router-link 
                to="/products"
                class="block w-full text-center bg-dark border border-gold/20 hover:border-gold/50 text-gold py-3 md:py-4 rounded-xl md:rounded-2xl font-normal text-sm md:text-base transition-all duration-300"
              >
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useCart } from '../stores/cart'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

// Import popular product images
import JPGLeMale from '../assets/JPGLeMale.png'
import ChanelBleu from '../assets/Chanel Bleu de Chanel.jpg'
import CreedAventus from '../assets/Creed Aventus.webp'
import LaVieBelle from '../assets/La Vie Est Belle by Lancôme.webp'

const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart()

// Popular products to show in empty state
const popularProducts = [
  { id: 1, name: 'JPG Le Male EDP', price: 'Rp. 2.280.000', image: JPGLeMale },
  { id: 5, name: 'Chanel Bleu de Chanel', price: 'Rp. 2.890.000', image: ChanelBleu },
  { id: 6, name: 'Creed Aventus', price: 'Rp. 4.500.000', image: CreedAventus },
  { id: 11, name: 'La Vie Est Belle', price: 'Rp. 2.750.000', image: LaVieBelle }
]

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    clearCart()
  }
}
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.cart-item-move {
  transition: transform 0.3s ease;
}
</style>
