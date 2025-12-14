<template>
  <div class="min-h-screen bg-black">
    <Navbar />
    
    <main class="py-12 md:py-16 lg:py-20 px-4 md:px-6 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Back Button -->
        <button 
          @click="$router.back()"
          class="mb-4 flex items-center gap-2 text-gold hover:text-champagne transition-colors text-sm md:text-base"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Back to Products</span>
        </button>

        <!-- Breadcrumbs -->
        <nav class="mb-6 md:mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-xs md:text-sm text-cream/60">
            <li>
              <router-link to="/" class="hover:text-gold transition-colors">
                <i class="fas fa-home mr-1"></i>Home
              </router-link>
            </li>
            <li><i class="fas fa-chevron-right text-xs"></i></li>
            <li>
              <router-link to="/products" class="hover:text-gold transition-colors">Products</router-link>
            </li>
            <li v-if="product && product !== 'not-found'"><i class="fas fa-chevron-right text-xs"></i></li>
            <li v-if="product && product !== 'not-found'" class="text-gold font-medium truncate max-w-[200px]" :title="product.name">
              {{ product.name }}
            </li>
          </ol>
        </nav>

        <!-- Loading State -->
        <div v-if="!product" class="text-center py-20">
          <LoadingSpinner />
          <p class="text-cream/60 mt-4">Loading product details...</p>
        </div>

        <!-- Product Not Found -->
        <div v-else-if="product === 'not-found'" class="text-center py-20">
          <i class="fas fa-exclamation-circle text-6xl text-gold/30 mb-6"></i>
          <h2 class="text-3xl font-serif text-gold mb-4">Product Not Found</h2>
          <p class="text-cream/70 mb-8">The product you're looking for doesn't exist.</p>
          <router-link 
            to="/products"
            class="inline-block bg-gold hover:bg-champagne text-dark px-8 py-3 rounded-full font-medium transition-all duration-300"
          >
            Browse All Products
          </router-link>
        </div>

        <!-- Product Detail -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Product Image -->
          <div class="bg-dark-lighter rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-800/30 lg:sticky lg:top-24 lg:self-start">
            <!-- Badge -->
            <div class="absolute top-6 left-6 md:top-8 md:left-8 z-10 bg-gold text-dark px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              <i class="fas fa-award mr-1 md:mr-2"></i>{{ product.badge }}
            </div>

            <!-- Image Gallery Thumbnails - Moved to Top -->
            <div class="flex gap-2 md:gap-3 mb-4 justify-center">
              <div 
                v-for="(img, index) in product.images" 
                :key="index"
                @click="selectedImage = img"
                class="w-14 h-14 md:w-16 md:h-16 bg-black rounded-lg border-2 transition-all cursor-pointer overflow-hidden flex-shrink-0"
                :class="selectedImage === img ? 'border-gold ring-2 ring-gold/50 scale-105' : 'border-gold/20 hover:border-gold/50'"
              >
                <img :src="img" :alt="`${product.name} view ${index + 1}`" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- Main Image with Fixed Height -->
            <div 
              class="relative bg-black rounded-xl overflow-hidden cursor-zoom-in group" 
              style="height: 400px; max-height: 400px;"
              @click="showZoomModal = true"
            >
              <img 
                :src="selectedImage" 
                :alt="product.name"
                class="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <i class="fas fa-search-plus text-3xl text-white/0 group-hover:text-white/80 transition-all duration-300"></i>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <!-- Title & Category -->
            <div class="mb-4 md:mb-6">
              <div class="flex items-center gap-2 md:gap-3 mb-2">
                <span class="text-champagne text-xs md:text-sm uppercase tracking-wider font-medium">
                  <i class="fas fa-tag mr-1 md:mr-2"></i>{{ product.category }}
                </span>
              </div>
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-serif text-gold mb-3 md:mb-4">{{ product.name }}</h1>
              
              <!-- Rating -->
              <div class="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div class="flex items-center gap-1">
                  <i v-for="i in 5" :key="i" class="fas fa-star text-xs md:text-sm" :class="i <= product.rating ? 'text-gold' : 'text-gray-600'"></i>
                </div>
                <span class="text-cream/70 text-xs md:text-sm">{{ product.rating }}.0 ({{ product.reviews }} reviews)</span>
              </div>
            </div>

            <!-- Price -->
            <div class="mb-6 md:mb-8 p-4 md:p-6 bg-dark-lighter rounded-xl md:rounded-2xl border border-gold/20">
              <div class="flex items-center justify-between">
                <span class="text-cream/70 text-xs md:text-sm uppercase tracking-wider">Price</span>
                <span class="text-2xl md:text-3xl font-serif text-gold">{{ product.price }}</span>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-6 md:mb-8">
              <h3 class="text-lg md:text-xl font-serif text-gold mb-2 md:mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-sm md:text-base"></i>
                Description
              </h3>
              <p class="text-cream/70 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">{{ product.description }}</p>
              <p class="text-cream/60 text-xs md:text-sm">
                This exquisite fragrance is crafted with the finest ingredients, designed to leave a lasting impression. 
                Perfect for both day and evening wear, it combines sophistication with timeless elegance.
              </p>
            </div>

            <!-- Product Features -->
            <div class="mb-6 md:mb-8">
              <h3 class="text-lg md:text-xl font-serif text-gold mb-3 md:mb-4 flex items-center gap-2">
                <i class="fas fa-list-check text-sm md:text-base"></i>
                Key Features
              </h3>
              <div class="grid grid-cols-2 gap-3 md:gap-4">
                <div class="bg-dark-lighter p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-800/30">
                  <i class="fas fa-flask text-gold text-xl md:text-2xl mb-1 md:mb-2"></i>
                  <p class="text-cream text-xs md:text-sm font-medium">100ml Premium</p>
                  <p class="text-cream/60 text-xs">Eau de Parfum</p>
                </div>
                <div class="bg-dark-lighter p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-800/30">
                  <i class="fas fa-clock text-gold text-xl md:text-2xl mb-1 md:mb-2"></i>
                  <p class="text-cream text-xs md:text-sm font-medium">Long Lasting</p>
                  <p class="text-cream/60 text-xs">8-12 Hours</p>
                </div>
                <div class="bg-dark-lighter p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-800/30">
                  <i class="fas fa-leaf text-gold text-xl md:text-2xl mb-1 md:mb-2"></i>
                  <p class="text-cream text-xs md:text-sm font-medium">Natural</p>
                  <p class="text-cream/60 text-xs">Organic Ingredients</p>
                </div>
                <div class="bg-dark-lighter p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-800/30">
                  <i class="fas fa-certificate text-gold text-xl md:text-2xl mb-1 md:mb-2"></i>
                  <p class="text-cream text-xs md:text-sm font-medium">Authentic</p>
                  <p class="text-cream/60 text-xs">100% Original</p>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="mb-6 md:mb-8">
              <label class="text-cream text-xs md:text-sm mb-2 md:mb-3 block flex items-center gap-2">
                <i class="fas fa-cart-plus"></i>
                Quantity
              </label>
              <div class="flex items-center gap-3 md:gap-4">
                <div class="flex items-center border border-gold/20 rounded-full overflow-hidden">
                  <button 
                    @click="decreaseQuantity"
                    class="px-4 md:px-6 py-2.5 md:py-3 bg-dark-lighter hover:bg-gold hover:text-dark text-cream transition-colors text-sm md:text-base"
                    :disabled="quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="px-6 md:px-8 py-2.5 md:py-3 bg-dark text-cream font-medium text-sm md:text-base">{{ quantity }}</span>
                  <button 
                    @click="increaseQuantity"
                    class="px-4 md:px-6 py-2.5 md:py-3 bg-dark-lighter hover:bg-gold hover:text-dark text-cream transition-colors text-sm md:text-base"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <span class="text-cream/60 text-xs md:text-sm">
                  <i class="fas fa-box mr-1 md:mr-2"></i>In Stock
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <button 
                @click="handleAddToCart"
                class="flex-1 bg-gold hover:bg-champagne text-dark py-3 md:py-4 rounded-full font-medium text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-105 active:scale-95"
              >
                <i class="fas fa-shopping-cart"></i>
                <span>Add to Cart</span>
              </button>
              <button 
                @click="handleToggleWishlist"
                class="sm:w-14 md:w-16 py-3 md:py-4 rounded-full transition-all duration-300 flex items-center justify-center border"
                :class="isInWishlist(product.id) ? 'bg-red-500 text-white border-red-500' : 'bg-dark-lighter hover:bg-gold hover:text-dark text-gold border-gold/20'"
                :title="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
              >
                <i :class="isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
              </button>
            </div>

            <!-- Additional Info -->
            <div class="border-t border-gray-800/30 pt-6 md:pt-8">
              <div class="space-y-3 md:space-y-4">
                <div class="flex items-start gap-2 md:gap-3">
                  <i class="fas fa-truck text-gold mt-0.5 md:mt-1 text-sm md:text-base"></i>
                  <div>
                    <p class="text-cream font-medium text-sm md:text-base">Free Shipping</p>
                    <p class="text-cream/60 text-xs md:text-sm">On orders over Rp 1.000.000</p>
                  </div>
                </div>
                <div class="flex items-start gap-2 md:gap-3">
                  <i class="fas fa-shield-alt text-gold mt-0.5 md:mt-1 text-sm md:text-base"></i>
                  <div>
                    <p class="text-cream font-medium text-sm md:text-base">Authentic Guarantee</p>
                    <p class="text-cream/60 text-xs md:text-sm">100% original products</p>
                  </div>
                </div>
                <div class="flex items-start gap-2 md:gap-3">
                  <i class="fas fa-undo text-gold mt-0.5 md:mt-1 text-sm md:text-base"></i>
                  <div>
                    <p class="text-cream font-medium">Easy Returns</p>
                    <p class="text-cream/60 text-sm">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Reviews -->
        <div v-if="product && product !== 'not-found'" class="mt-12 md:mt-16">
          <div class="bg-dark-lighter p-6 md:p-8 rounded-2xl border border-gray-800/30">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl md:text-3xl font-serif text-gold flex items-center gap-2">
                <i class="fas fa-comments"></i>
                Customer Reviews
              </h3>
              <div class="flex items-center gap-2">
                <div class="flex">
                  <i v-for="i in 5" :key="i" class="fas fa-star text-gold text-sm"></i>
                </div>
                <span class="text-cream/70 text-sm">{{ product.rating }}.0 ({{ product.reviews }} reviews)</span>
              </div>
            </div>

            <!-- Reviews List -->
            <div class="space-y-4">
              <div 
                v-for="(review, index) in customerReviews" 
                :key="index"
                class="bg-dark p-4 md:p-6 rounded-xl border border-gray-800/30"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <!-- Avatar -->
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-champagne flex items-center justify-center text-dark font-bold">
                      {{ review.initials }}
                    </div>
                    <div>
                      <p class="text-cream font-medium">{{ review.name }}</p>
                      <p class="text-cream/50 text-xs">{{ review.date }}</p>
                    </div>
                  </div>
                  <!-- Rating Stars -->
                  <div class="flex">
                    <i v-for="i in 5" :key="i" class="fas fa-star text-sm" :class="i <= review.rating ? 'text-gold' : 'text-gray-600'"></i>
                  </div>
                </div>
                <p class="text-cream/80 text-sm leading-relaxed">{{ review.comment }}</p>
                
                <!-- Verified Purchase Badge -->
                <div v-if="review.verified" class="mt-3 inline-flex items-center gap-1 text-green-400 text-xs">
                  <i class="fas fa-check-circle"></i>
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div v-if="product && product !== 'not-found'" class="mt-12 md:mt-16 lg:mt-20">
          <h2 class="text-2xl md:text-3xl font-serif text-gold mb-6 md:mb-8 text-center flex items-center justify-center gap-2 md:gap-3">
            <i class="fas fa-sparkles text-lg md:text-xl"></i>
            You May Also Like
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <div 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id"
              class="bg-dark-lighter rounded-xl md:rounded-2xl overflow-hidden border border-gray-800/30 hover:border-gold/30 transition-all duration-300 group cursor-pointer"
              @click="navigateToProduct(relatedProduct.id)"
            >
              <div class="h-36 md:h-48 flex items-center justify-center bg-black p-3 md:p-4">
                <img 
                  :src="relatedProduct.image" 
                  :alt="relatedProduct.name"
                  class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div class="p-3 md:p-4">
                <h3 class="text-sm md:text-lg font-serif text-gold mb-1 md:mb-2 line-clamp-1">{{ relatedProduct.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="text-champagne font-medium text-xs md:text-base">{{ relatedProduct.price }}</span>
                  <div class="flex items-center gap-1">
                    <i class="fas fa-star text-gold text-xs"></i>
                    <span class="text-cream/60 text-xs">{{ relatedProduct.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Image Zoom Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="showZoomModal && product && product !== 'not-found'"
          @click="showZoomModal = false"
          class="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button 
            @click="showZoomModal = false"
            class="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-10 transition-colors"
            aria-label="Close zoom"
          >
            <i class="fas fa-times"></i>
          </button>
          
          <div class="max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img 
              :src="selectedImage" 
              :alt="product.name"
              class="max-w-full max-h-full object-contain"
              @click.stop
            />
          </div>

          <!-- Image Navigation in Zoom -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            <div 
              v-for="(img, index) in product.images" 
              :key="index"
              @click.stop="selectedImage = img"
              class="w-16 h-16 bg-dark-lighter rounded-lg border-2 transition-all cursor-pointer overflow-hidden"
              :class="selectedImage === img ? 'border-gold ring-2 ring-gold/50 scale-110' : 'border-white/20 hover:border-white/50'"
            >
              <img :src="img" :alt="`${product.name} view ${index + 1}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useCart } from '../stores/cart'
import { useWishlist } from '../stores/wishlist'

// Import all product images
import JPGLeMale from '../assets/JPGLeMale.png'
import KingSCE from '../assets/KingSCE.png'
import CalvingKlein from '../assets/CalvingKlein.png'
import SharafBlend from '../assets/SharafBlend.png'
import ChanelBleu from '../assets/Chanel Bleu de Chanel.jpg'
import CreedAventus from '../assets/Creed Aventus.webp'
import EilishPerfume from '../assets/Eilish Perfume by Billie Eilish.webp'
import FrenchAvenue from '../assets/french avenue.jpg'
import GiorgioArmani from '../assets/Giorgio Armani Acqua di Giò Profumo.webp'
import GucciBloom from '../assets/Gucci Bloom.webp'
import LaVieBelle from '../assets/La Vie Est Belle by Lancôme.webp'
import TomFordNoir from '../assets/Tom Ford Noir Extreme.webp'

const route = useRoute()
const router = useRouter()
const { addToCart, showNotification } = useCart()
const { isInWishlist, toggleWishlist } = useWishlist()

const quantity = ref(1)
const product = ref(null)
const selectedImage = ref(null)
const showZoomModal = ref(false)

// Customer Reviews (sample data)
const customerReviews = [
  {
    name: 'Amanda Rodriguez',
    initials: 'AR',
    date: 'December 8, 2025',
    rating: 5,
    comment: 'Absolutely love this fragrance! The scent is sophisticated and lasts all day. Perfect for both work and evening events. Highly recommend!',
    verified: true
  },
  {
    name: 'Michael Chen',
    initials: 'MC',
    date: 'December 5, 2025',
    rating: 5,
    comment: 'Best perfume I\'ve ever purchased. The quality is outstanding and the packaging is luxurious. Worth every penny!',
    verified: true
  },
  {
    name: 'Sarah Thompson',
    initials: 'ST',
    date: 'November 28, 2025',
    rating: 4,
    comment: 'Beautiful scent with excellent longevity. The only reason I\'m giving 4 stars instead of 5 is the price point, but the quality justifies it.',
    verified: true
  },
  {
    name: 'David Park',
    initials: 'DP',
    date: 'November 20, 2025',
    rating: 5,
    comment: 'This has become my signature scent. I receive compliments every time I wear it. Fast shipping and great customer service too!',
    verified: true
  }
]

const handleToggleWishlist = () => {
  if (product.value && product.value !== 'not-found') {
    const added = toggleWishlist(product.value)
    if (added) {
      showNotification(`Added ${product.value.name} to wishlist!`, 'success')
    } else {
      showNotification(`Removed ${product.value.name} from wishlist`, 'info')
    }
  }
}

// All products data (same as ProductsPage)
const allProducts = [
  {
    id: 1,
    name: 'JPG Le Male EDP',
    description: 'A bold and captivating masculine scent with notes of vanilla, mint, and lavender. Perfect for the confident modern man.',
    price: 'Rp. 2.280.000',
    priceNum: 2280000,
    image: JPGLeMale,
    images: [JPGLeMale, ChanelBleu, TomFordNoir],
    rating: 5,
    reviews: 342,
    badge: 'Best Seller',
    category: 'men'
  },
  {
    id: 2,
    name: 'Supremacy Collection Edition',
    description: 'Elegant and sophisticated with woody undertones and hints of bergamot. A signature scent for special occasions.',
    price: 'Rp. 750.000',
    priceNum: 750000,
    image: KingSCE,
    images: [KingSCE, CreedAventus, GiorgioArmani],
    rating: 5,
    reviews: 289,
    badge: 'Popular',
    category: 'men'
  },
  {
    id: 3,
    name: 'Calvin Klein CK One',
    description: 'Fresh and clean unisex fragrance with citrus and green tea notes. Timeless and versatile for everyday wear.',
    price: 'Rp. 1.250.000',
    priceNum: 1250000,
    image: CalvingKlein,
    images: [CalvingKlein, SharafBlend, EilishPerfume],
    rating: 4,
    reviews: 156,
    badge: 'Trending',
    category: 'unisex'
  },
  {
    id: 4,
    name: 'Sharaf Blend Intense',
    description: 'Rich oriental fragrance with warm spices and exotic oud. A luxurious choice for evening affairs.',
    price: 'Rp. 980.000',
    priceNum: 980000,
    image: SharafBlend,
    images: [SharafBlend, CalvingKlein, JPGLeMale],
    rating: 5,
    reviews: 203,
    badge: 'New Arrival',
    category: 'unisex'
  },
  {
    id: 5,
    name: 'Chanel Bleu de Chanel',
    description: 'Sophisticated woody aromatic with citrus freshness and cedar depth. The epitome of masculine elegance.',
    price: 'Rp. 2.890.000',
    priceNum: 2890000,
    image: ChanelBleu,
    images: [ChanelBleu, JPGLeMale, CreedAventus],
    rating: 5,
    reviews: 521,
    badge: 'Best Seller',
    category: 'men'
  },
  {
    id: 6,
    name: 'Creed Aventus',
    description: 'Legendary fragrance with pineapple, birch, and musk. The ultimate power scent for ambitious individuals.',
    price: 'Rp. 4.500.000',
    priceNum: 4500000,
    image: CreedAventus,
    images: [CreedAventus, ChanelBleu, TomFordNoir],
    rating: 5,
    reviews: 892,
    badge: 'Luxury',
    category: 'men'
  },
  {
    id: 7,
    name: 'Eilish by Billie Eilish',
    description: 'Warm and inviting with vanilla, amber, and cocoa. A modern gourmand fragrance for the bold and creative.',
    price: 'Rp. 1.180.000',
    priceNum: 1180000,
    image: EilishPerfume,
    images: [EilishPerfume, GucciBloom, LaVieBelle],
    rating: 4,
    reviews: 267,
    badge: 'Trending',
    category: 'women'
  },
  {
    id: 8,
    name: 'French Avenue Elegance',
    description: 'Parisian-inspired floral bouquet with rose, jasmine, and white musk. Pure sophistication in a bottle.',
    price: 'Rp. 1.850.000',
    priceNum: 1850000,
    image: FrenchAvenue,
    images: [FrenchAvenue, LaVieBelle, GucciBloom],
    rating: 5,
    reviews: 456,
    badge: 'Popular',
    category: 'women'
  },
  {
    id: 9,
    name: 'Giorgio Armani Acqua di Giò Profumo',
    description: 'Aquatic aromatic with marine notes and incense. Fresh yet intense, perfect for the modern gentleman.',
    price: 'Rp. 2.650.000',
    priceNum: 2650000,
    image: GiorgioArmani,
    images: [GiorgioArmani, CreedAventus, ChanelBleu],
    rating: 5,
    reviews: 634,
    badge: 'Best Seller',
    category: 'men'
  },
  {
    id: 10,
    name: 'Gucci Bloom',
    description: 'White floral garden with tuberose, jasmine, and rangoon creeper. Celebrates femininity and authenticity.',
    price: 'Rp. 2.450.000',
    priceNum: 2450000,
    image: GucciBloom,
    images: [GucciBloom, LaVieBelle, EilishPerfume],
    rating: 5,
    reviews: 523,
    badge: 'Luxury',
    category: 'women'
  },
  {
    id: 11,
    name: 'La Vie Est Belle by Lancôme',
    description: 'Sweet iris, patchouli, and gourmand notes. Embodies happiness and the beauty of life.',
    price: 'Rp. 2.780.000',
    priceNum: 2780000,
    image: LaVieBelle,
    images: [LaVieBelle, GucciBloom, FrenchAvenue],
    rating: 5,
    reviews: 789,
    badge: 'Best Seller',
    category: 'women'
  },
  {
    id: 12,
    name: 'Tom Ford Noir Extreme',
    description: 'Rich oriental with cardamom, vanilla, and amber. Seductive and refined for evening sophistication.',
    price: 'Rp. 3.200.000',
    priceNum: 3200000,
    image: TomFordNoir,
    images: [TomFordNoir, CreedAventus, ChanelBleu],
    rating: 5,
    reviews: 412,
    badge: 'Luxury',
    category: 'men'
  }
]

// Related products (exclude current product, show 4 random)
const relatedProducts = computed(() => {
  if (!product.value || product.value === 'not-found') return []
  
  const filtered = allProducts
    .filter(p => p.id !== product.value.id && p.category === product.value.category)
    .slice(0, 4)
  
  // If less than 4, fill with other products
  if (filtered.length < 4) {
    const remaining = allProducts
      .filter(p => p.id !== product.value.id && !filtered.includes(p))
      .slice(0, 4 - filtered.length)
    return [...filtered, ...remaining]
  }
  
  return filtered
})

// Load product data
const loadProduct = () => {
  const productId = parseInt(route.params.id)
  const foundProduct = allProducts.find(p => p.id === productId)
  
  if (foundProduct) {
    product.value = foundProduct
    selectedImage.value = foundProduct.images ? foundProduct.images[0] : foundProduct.image
    // Update page title
    document.title = `${foundProduct.name} - Velixier`
  } else {
    product.value = 'not-found'
    document.title = 'Product Not Found - Velixier'
  }
}

// Quantity controls
const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Add to cart with quantity
const handleAddToCart = () => {
  for (let i = 0; i < quantity.value; i++) {
    addToCart(product.value, true) // Silent mode - no individual notifications
  }
  // Show single notification with total quantity
  showNotification(`Added ${quantity.value}x ${product.value.name} to cart!`, 'success')
  quantity.value = 1 // Reset quantity
}

// Navigate to another product
const navigateToProduct = (productId) => {
  router.push(`/products/${productId}`)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Watch route changes
watch(() => route.params.id, () => {
  if (route.name === 'product-detail') {
    loadProduct()
    quantity.value = 1
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Watch product changes to update selected image
watch(() => product.value, (newProduct) => {
  if (newProduct && newProduct !== 'not-found') {
    selectedImage.value = newProduct.images ? newProduct.images[0] : newProduct.image
  }
})

onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #d4af37;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c9a961;
}
</style>
