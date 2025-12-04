<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="py-20 px-6 bg-black min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-gold mb-3 md:mb-4">Our Products</h1>
          <p class="text-cream/70 text-base md:text-lg">
            Explore our exquisite collection of luxury fragrances
          </p>
        </div>

        <!-- Filters & Search -->
        <div class="mb-6 md:mb-8 space-y-4">
          <div class="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-between bg-dark-lighter p-4 md:p-6 rounded-2xl border border-gray-800/30">
            <!-- Search -->
            <div class="w-full md:w-96">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="w-full bg-dark border border-gold/20 rounded-full px-5 md:px-6 py-2.5 md:py-3 text-cream text-sm focus:outline-none focus:border-gold/50 transition-colors pl-11 md:pl-12"
                />
                <svg class="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Filters -->
            <div class="flex gap-2 md:gap-4 w-full md:w-auto">
              <!-- Category Filter -->
              <select
                v-model="selectedCategory"
                class="flex-1 md:flex-none bg-dark border border-gold/20 rounded-full px-3 md:px-6 py-2.5 md:py-3 text-cream text-xs md:text-sm focus:outline-none focus:border-gold/50 transition-colors"
              >
                <option value="all">All</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>

              <!-- Stock Filter - Hidden on mobile -->
              <select
                v-model="stockFilter"
                class="hidden sm:block flex-1 md:flex-none bg-dark border border-gold/20 rounded-full px-3 md:px-6 py-2.5 md:py-3 text-cream text-xs md:text-sm focus:outline-none focus:border-gold/50 transition-colors"
              >
                <option value="all">All Stock</option>
                <option value="in-stock">In Stock</option>
                <option value="limited">Limited</option>
              </select>

              <!-- Sort -->
              <select
                v-model="sortBy"
                class="flex-1 md:flex-none bg-dark border border-gold/20 rounded-full px-3 md:px-6 py-2.5 md:py-3 text-cream text-xs md:text-sm focus:outline-none focus:border-gold/50 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="bg-dark-lighter p-4 md:p-6 rounded-2xl border border-gray-800/30">
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <label class="text-cream text-sm font-medium whitespace-nowrap">
                <i class="fas fa-filter mr-2 text-gold"></i>Price Range:
              </label>
              <div class="flex items-center gap-3 w-full sm:w-auto">
                <div class="flex-1 sm:flex-none">
                  <input
                    v-model.number="priceRange.min"
                    type="number"
                    placeholder="Min"
                    class="w-full sm:w-32 bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <span class="text-cream/50">-</span>
                <div class="flex-1 sm:flex-none">
                  <input
                    v-model.number="priceRange.max"
                    type="number"
                    placeholder="Max"
                    class="w-full sm:w-32 bg-dark border border-gold/20 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <button
                  v-if="priceRange.min || priceRange.max"
                  @click="resetPriceFilter"
                  class="px-3 py-2 bg-dark border border-gold/20 hover:border-gold/50 text-gold rounded-lg text-xs transition-colors"
                  title="Reset price filter"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Count -->
        <div class="mb-6 text-cream/60 text-sm">
          Showing {{ filteredProducts.length }} of {{ allProducts.length }} products
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="bg-dark-lighter rounded-2xl md:rounded-3xl overflow-hidden border border-gray-800/30 hover:border-gold/30 transition-all duration-300 group relative"
          >
            <!-- Badge -->
            <div class="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-gold text-dark px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs font-medium">
              {{ product.badge }}
            </div>

            <!-- Stock Badge -->
            <div class="absolute top-3 right-3 md:top-4 md:right-4 z-10 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs font-medium"
              :class="product.stock === 'in-stock' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : product.stock === 'limited' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'">
              <i class="fas fa-box mr-1"></i>
              {{ product.stock === 'in-stock' ? 'In Stock' : product.stock === 'limited' ? 'Limited' : 'Sold Out' }}
            </div>

            <!-- Wishlist Button -->
            <button
              @click="toggleWishlist(product)"
              class="absolute top-14 right-3 md:top-16 md:right-4 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300"
              :class="isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-black/50 text-cream hover:bg-gold hover:text-dark'"
              :title="isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
            >
              <i class="text-sm md:text-base" :class="isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>

            <!-- Product Image -->
            <div class="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-black">
              <img 
                :src="product.image" 
                :alt="product.name" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <!-- Quick View Overlay -->
              <div class="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  @click="openQuickView(product)"
                  class="bg-gold hover:bg-champagne text-dark px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105"
                >
                  Quick View
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4 sm:p-5 md:p-6">
              <router-link 
                :to="`/products/${product.id}`"
                class="block hover:text-champagne transition-colors"
              >
                <h3 class="text-lg sm:text-xl font-serif font-normal text-gold mb-2 hover:text-champagne transition-colors line-clamp-1">{{ product.name }}</h3>
              </router-link>
              
              <!-- Rating Stars with Font Awesome -->
              <div class="flex items-center gap-1 mb-2 md:mb-3">
                <i v-for="i in 5" :key="i" class="fas fa-star text-xs md:text-sm" :class="i <= product.rating ? 'text-gold' : 'text-gray-600'"></i>
                <span class="text-cream/60 text-xs md:text-sm ml-1">({{ product.reviews }})</span>
              </div>
              
              <p class="text-cream/70 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2">{{ product.description }}</p>
              <p class="text-lg sm:text-xl font-normal text-cream mb-3 md:mb-4">{{ product.price }}</p>
              
              <div class="flex gap-2">
                <button 
                  @click="addToCart(product)"
                  :disabled="product.stock === 'out-of-stock'"
                  class="flex-1 bg-champagne hover:bg-gold text-dark py-2.5 md:py-3 rounded-xl md:rounded-2xl font-normal text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span class="hidden sm:inline">{{ product.stock === 'out-of-stock' ? 'Sold Out' : 'Add to cart' }}</span>
                  <span class="sm:hidden">{{ product.stock === 'out-of-stock' ? 'Sold Out' : 'Add' }}</span>
                  <i class="fas fa-shopping-cart text-sm"></i>
                </button>
                <router-link
                  :to="`/products/${product.id}`"
                  class="bg-dark border border-gold/20 hover:bg-gold hover:text-dark text-gold px-3 md:px-4 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                  title="View Details"
                >
                  <i class="fas fa-eye text-sm"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gold/30 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="text-2xl font-serif text-gold mb-4">No products found</h2>
          <p class="text-cream/70 mb-8">Try adjusting your search or filters</p>
        </div>
      </div>
    </main>

    <!-- Quick View Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="quickViewProduct" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          @click="closeQuickView"
        >
          <div 
            class="bg-dark-lighter rounded-3xl max-w-4xl w-full overflow-hidden border border-gold/30"
            @click.stop
          >
            <div class="grid grid-cols-1 md:grid-cols-2">
              <!-- Product Image -->
              <div class="bg-black p-12 flex items-center justify-center">
                <img 
                  :src="quickViewProduct.image" 
                  :alt="quickViewProduct.name" 
                  class="w-full h-full max-h-[400px] object-contain"
                />
              </div>

              <!-- Product Details -->
              <div class="p-8 md:p-12">
                <div class="flex items-start justify-between mb-4">
                  <div class="bg-gold text-dark px-4 py-1.5 rounded-full text-xs font-medium">
                    {{ quickViewProduct.badge }}
                  </div>
                  <button 
                    @click="closeQuickView"
                    class="text-cream/60 hover:text-gold transition-colors"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <h3 class="text-3xl font-serif font-normal text-gold mb-3">
                  {{ quickViewProduct.name }}
                </h3>

                <span class="inline-block text-cream/60 text-sm mb-4 capitalize">{{ quickViewProduct.category }}</span>

                <!-- Rating -->
                <div class="flex items-center gap-1 mb-4">
                  <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= quickViewProduct.rating ? 'text-gold' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-cream/60 text-sm ml-1">({{ quickViewProduct.reviews }} reviews)</span>
                </div>

                <p class="text-2xl font-normal text-cream mb-6">
                  {{ quickViewProduct.price }}
                </p>

                <p class="text-cream/70 leading-relaxed mb-8 text-sm">
                  {{ quickViewProduct.description }}
                </p>

                <button 
                  @click="addToCartFromQuickView"
                  class="w-full bg-champagne hover:bg-gold text-dark py-4 rounded-2xl font-medium text-base flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:scale-105 active:scale-95"
                >
                  <span>Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useCart } from '../stores/cart'
import { useWishlist } from '../stores/wishlist'

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

const { addToCart } = useCart()
const { isInWishlist, toggleWishlist: toggleWishlistItem } = useWishlist()
const searchQuery = ref('')
const selectedCategory = ref('all')
const stockFilter = ref('all')
const sortBy = ref('featured')
const quickViewProduct = ref(null)
const imageLoaded = ref({})
const priceRange = ref({ min: null, max: null })

const resetPriceFilter = () => {
  priceRange.value = { min: null, max: null }
}

const toggleWishlist = (product) => {
  const added = toggleWishlistItem(product)
  // Could add notification here if needed
}

const allProducts = [
  {
    id: 1,
    name: 'JPG Le Male EDP',
    description: 'A bold and captivating masculine scent with notes of vanilla, mint, and lavender. Perfect for the confident modern man.',
    price: 'Rp. 2.280.000',
    priceNum: 2280000,
    image: JPGLeMale,
    rating: 5,
    reviews: 342,
    badge: 'Best Seller',
    category: 'men',
    stock: 'in-stock'
  },
  {
    id: 2,
    name: 'Supremacy Collection Edition',
    description: 'Elegant and sophisticated with woody undertones and hints of bergamot. A signature scent for special occasions.',
    price: 'Rp. 750.000',
    priceNum: 750000,
    image: KingSCE,
    rating: 5,
    reviews: 289,
    badge: 'Popular',
    category: 'men',
    stock: 'in-stock'
  },
  {
    id: 3,
    name: 'Calvin Klein CK One',
    description: 'Fresh and clean unisex fragrance with citrus and green tea notes. Timeless and versatile for everyday wear.',
    price: 'Rp. 1.250.000',
    priceNum: 1250000,
    image: CalvingKlein,
    rating: 4,
    reviews: 156,
    badge: 'Trending',
    category: 'unisex',
    stock: 'limited'
  },
  {
    id: 4,
    name: 'Sharaf Blend Intense',
    description: 'Rich oriental fragrance with warm spices and exotic oud. A luxurious choice for evening affairs.',
    price: 'Rp. 980.000',
    priceNum: 980000,
    image: SharafBlend,
    rating: 5,
    reviews: 203,
    badge: 'New Arrival',
    category: 'unisex',
    stock: 'in-stock'
  },
  {
    id: 5,
    name: 'Chanel Bleu de Chanel',
    description: 'Sophisticated woody aromatic with citrus freshness and cedar depth. The epitome of masculine elegance.',
    price: 'Rp. 2.890.000',
    priceNum: 2890000,
    image: ChanelBleu,
    rating: 5,
    reviews: 521,
    badge: 'Best Seller',
    category: 'men',
    stock: 'in-stock'
  },
  {
    id: 6,
    name: 'Creed Aventus',
    description: 'Legendary fruity chypre with pineapple, birch, and musk. A powerful statement of success and ambition.',
    price: 'Rp. 4.500.000',
    priceNum: 4500000,
    image: CreedAventus,
    rating: 5,
    reviews: 892,
    badge: 'Luxury',
    category: 'men',
    stock: 'limited'
  },
  {
    id: 7,
    name: 'Eilish by Billie Eilish',
    description: 'Sweet and sensual with vanilla, amber, and cocoa. A modern feminine fragrance with warm gourmand notes.',
    price: 'Rp. 850.000',
    priceNum: 850000,
    image: EilishPerfume,
    rating: 4,
    reviews: 234,
    badge: 'New Arrival',
    category: 'women',
    stock: 'in-stock'
  },
  {
    id: 8,
    name: 'French Avenue Elegance',
    description: 'Classic Parisian elegance with rose, jasmine, and patchouli. Timeless femininity in a bottle.',
    price: 'Rp. 1.650.000',
    priceNum: 1650000,
    image: FrenchAvenue,
    rating: 5,
    reviews: 178,
    badge: 'Popular',
    category: 'women',
    stock: 'in-stock'
  },
  {
    id: 9,
    name: 'Acqua di Giò Profumo',
    description: 'Marine aromatic with incense and patchouli. Fresh yet deep, perfect for the sophisticated gentleman.',
    price: 'Rp. 2.150.000',
    priceNum: 2150000,
    image: GiorgioArmani,
    rating: 5,
    reviews: 445,
    badge: 'Best Seller',
    category: 'men',
    stock: 'limited'
  },
  {
    id: 10,
    name: 'Gucci Bloom',
    description: 'White floral bouquet with jasmine, tuberose, and Rangoon creeper. Captures the essence of a blooming garden.',
    price: 'Rp. 2.450.000',
    priceNum: 2450000,
    image: GucciBloom,
    rating: 5,
    reviews: 367,
    badge: 'Trending',
    category: 'women',
    stock: 'in-stock'
  },
  {
    id: 11,
    name: 'La Vie Est Belle',
    description: 'Sweet and sophisticated with iris, patchouli, and praline. A celebration of joy and happiness.',
    price: 'Rp. 2.750.000',
    priceNum: 2750000,
    image: LaVieBelle,
    rating: 5,
    reviews: 612,
    badge: 'Best Seller',
    category: 'women',
    stock: 'in-stock'
  },
  {
    id: 12,
    name: 'Tom Ford Noir Extreme',
    description: 'Oriental woody with cardamom, vanilla, and sandalwood. Sensual and mysterious for evening wear.',
    price: 'Rp. 3.850.000',
    priceNum: 3850000,
    image: TomFordNoir,
    rating: 5,
    reviews: 298,
    badge: 'Luxury',
    category: 'men',
    stock: 'in-stock'
  }
]

const filteredProducts = computed(() => {
  let products = [...allProducts]

  // Filter by search
  if (searchQuery.value) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'all') {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  // Filter by stock
  if (stockFilter.value !== 'all') {
    products = products.filter(p => p.stock === stockFilter.value)
  }

  // Filter by price range
  if (priceRange.value.min !== null && priceRange.value.min > 0) {
    products = products.filter(p => p.priceNum >= priceRange.value.min)
  }
  if (priceRange.value.max !== null && priceRange.value.max > 0) {
    products = products.filter(p => p.priceNum <= priceRange.value.max)
  }

  // Sort
  if (sortBy.value === 'price-low') {
    products.sort((a, b) => a.priceNum - b.priceNum)
  } else if (sortBy.value === 'price-high') {
    products.sort((a, b) => b.priceNum - a.priceNum)
  } else if (sortBy.value === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name))
  }

  return products
})

const openQuickView = (product) => {
  quickViewProduct.value = product
  document.body.style.overflow = 'hidden'
}

const closeQuickView = () => {
  quickViewProduct.value = null
  document.body.style.overflow = ''
}

const addToCartFromQuickView = () => {
  addToCart(quickViewProduct.value)
  closeQuickView()
}
</script>
