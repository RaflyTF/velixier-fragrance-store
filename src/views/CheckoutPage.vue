<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="py-20 px-6 bg-black min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-serif font-normal text-gold mb-12 text-center">Checkout</h1>
        
        <!-- Checkout Form -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Form Section -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Contact Information -->
            <div class="bg-dark-lighter p-8 rounded-2xl border border-gray-800/30">
              <h2 class="text-2xl font-serif text-gold mb-6">Contact Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-cream/70 text-sm mb-2">Email Address</label>
                  <input
                    v-model="checkoutForm.email"
                    type="email"
                    placeholder="your.email@example.com"
                    class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                    :class="{ 'border-red-500': errors.email }"
                  />
                  <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
                </div>
                <div>
                  <label class="block text-cream/70 text-sm mb-2">Phone Number</label>
                  <input
                    v-model="checkoutForm.phone"
                    type="tel"
                    placeholder="+62 812 3456 7890"
                    class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                    :class="{ 'border-red-500': errors.phone }"
                  />
                  <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Shipping Information -->
            <div class="bg-dark-lighter p-8 rounded-2xl border border-gray-800/30">
              <h2 class="text-2xl font-serif text-gold mb-6">Shipping Address</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-cream/70 text-sm mb-2">First Name</label>
                    <input
                      v-model="checkoutForm.firstName"
                      type="text"
                      placeholder="John"
                      class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                      :class="{ 'border-red-500': errors.firstName }"
                    />
                    <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
                  </div>
                  <div>
                    <label class="block text-cream/70 text-sm mb-2">Last Name</label>
                    <input
                      v-model="checkoutForm.lastName"
                      type="text"
                      placeholder="Doe"
                      class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                      :class="{ 'border-red-500': errors.lastName }"
                    />
                    <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
                  </div>
                </div>
                
                <div>
                  <label class="block text-cream/70 text-sm mb-2">Street Address</label>
                  <input
                    v-model="checkoutForm.address"
                    type="text"
                    placeholder="Jl. Sudirman No. 123"
                    class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                    :class="{ 'border-red-500': errors.address }"
                  />
                  <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-cream/70 text-sm mb-2">City</label>
                    <input
                      v-model="checkoutForm.city"
                      type="text"
                      placeholder="Jakarta"
                      class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                      :class="{ 'border-red-500': errors.city }"
                    />
                    <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
                  </div>
                  <div>
                    <label class="block text-cream/70 text-sm mb-2">Postal Code</label>
                    <input
                      v-model="checkoutForm.postalCode"
                      type="text"
                      placeholder="12345"
                      class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                      :class="{ 'border-red-500': errors.postalCode }"
                    />
                    <p v-if="errors.postalCode" class="text-red-500 text-xs mt-1">{{ errors.postalCode }}</p>
                  </div>
                </div>

                <div>
                  <label class="block text-cream/70 text-sm mb-2">Province <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <!-- Search Input -->
                    <div class="relative">
                      <input
                        v-model="provinceSearch"
                        @focus="showProvinceDropdown = true"
                        @input="filterProvinces"
                        type="text"
                        placeholder="Search or select province..."
                        class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 pr-10 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                        :class="{ 'border-red-500': errors.province, 'border-green-500': checkoutForm.province && !errors.province }"
                      />
                      <svg 
                        v-if="!checkoutForm.province"
                        class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50 transition-transform"
                        :class="{ 'rotate-180': showProvinceDropdown }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                      <svg 
                        v-else
                        class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500"
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    
                    <!-- Dropdown Options -->
                    <div
                      v-if="showProvinceDropdown && filteredProvinces.length > 0"
                      class="absolute z-50 w-full mt-2 bg-dark border border-gold/20 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
                    >
                      <button
                        v-for="province in filteredProvinces"
                        :key="province"
                        @click="selectProvince(province)"
                        class="w-full px-4 py-3 text-left text-sm text-cream hover:bg-gold/10 transition-colors border-b border-gray-800/30 last:border-b-0 flex items-center gap-2"
                        :class="{ 'bg-gold/20': checkoutForm.province === province }"
                      >
                        <svg v-if="checkoutForm.province === province" class="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        {{ province }}
                      </button>
                    </div>
                    
                    <!-- No Results -->
                    <div
                      v-if="showProvinceDropdown && provinceSearch && filteredProvinces.length === 0"
                      class="absolute z-50 w-full mt-2 bg-dark border border-gold/20 rounded-xl shadow-xl px-4 py-3 text-sm text-cream/60 text-center"
                    >
                      No provinces found
                    </div>
                  </div>
                  <p v-if="errors.province" class="text-red-500 text-xs mt-1">{{ errors.province }}</p>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-dark-lighter p-8 rounded-2xl border border-gray-800/30">
              <h2 class="text-2xl font-serif text-gold mb-6">Payment Method</h2>
              <div class="space-y-3">
                <label 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  class="flex items-center gap-4 p-4 border border-gray-800 rounded-xl cursor-pointer hover:border-gold/30 transition-colors"
                  :class="{ 'border-gold bg-gold/5': checkoutForm.paymentMethod === method.id }"
                >
                  <input
                    v-model="checkoutForm.paymentMethod"
                    type="radio"
                    :value="method.id"
                    class="w-4 h-4 text-gold"
                  />
                  <div class="flex-1">
                    <p class="text-cream font-medium">{{ method.name }}</p>
                    <p class="text-cream/60 text-sm">{{ method.description }}</p>
                  </div>
                  <div class="text-2xl">{{ method.icon }}</div>
                </label>
              </div>
              <p v-if="errors.paymentMethod" class="text-red-500 text-xs mt-2">{{ errors.paymentMethod }}</p>
            </div>

            <!-- Additional Notes -->
            <div class="bg-dark-lighter p-8 rounded-2xl border border-gray-800/30">
              <h2 class="text-2xl font-serif text-gold mb-6">Additional Notes (Optional)</h2>
              <textarea
                v-model="checkoutForm.notes"
                placeholder="Special instructions for delivery..."
                rows="4"
                class="w-full bg-dark border border-gold/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-dark-lighter rounded-2xl border border-gold/30 lg:sticky lg:top-24">
              <div class="bg-gradient-to-r from-gold/10 to-champagne/10 p-6 border-b border-gold/20">
                <h3 class="text-2xl font-serif text-gold">Order Summary</h3>
              </div>
              
              <div class="p-6">
                <!-- Cart Items - Only show 1 item with scroll -->
                <div class="space-y-3 mb-6 overflow-y-auto custom-scrollbar pr-2" style="max-height: 120px;">
                  <div 
                    v-for="item in cartItems" 
                    :key="item.id"
                    class="flex gap-3 p-3 bg-dark/50 rounded-xl border border-gray-800/30 hover:border-gold/20 transition-colors"
                  >
                    <div class="w-12 h-12 bg-black rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        :src="item.image" 
                        :alt="item.name" 
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-cream text-xs font-medium truncate mb-1">{{ item.name }}</p>
                      <div class="flex items-center justify-between">
                        <span class="text-cream/60 text-xs">Qty: {{ item.quantity }}</span>
                        <span class="text-gold text-xs font-medium">{{ item.price }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Price Summary -->
                <div class="space-y-3 mb-6 p-4 bg-dark/30 rounded-xl border border-gray-800/30">
                  <div class="flex justify-between text-cream/70 text-sm">
                    <span>Subtotal ({{ cartCount }} items)</span>
                    <span class="text-cream">{{ formatPrice(cartTotal) }}</span>
                  </div>
                  <div class="flex justify-between text-cream/70 text-sm">
                    <span>Shipping</span>
                    <span class="text-cream">{{ formatPrice(50000) }}</span>
                  </div>
                  <div class="flex justify-between text-cream/70 text-sm">
                    <span>Tax (10%)</span>
                    <span class="text-cream">{{ formatPrice(cartTotal * 0.1) }}</span>
                  </div>
                  <div class="border-t border-gold/30 pt-3 mt-3 flex justify-between items-center">
                    <span class="text-lg font-serif text-gold">Total</span>
                    <span class="text-2xl font-serif text-gold">{{ formatPrice(totalAmount) }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <button 
                  @click="handlePlaceOrder"
                  :disabled="isProcessing"
                  class="w-full bg-champagne hover:bg-gold text-dark py-4 rounded-2xl font-medium text-base mb-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {{ isProcessing ? 'Processing...' : 'Place Order' }}
                </button>

                <router-link 
                  to="/cart"
                  class="block w-full text-center bg-dark border border-gold/20 hover:border-gold/50 text-gold py-4 rounded-2xl font-normal text-base transition-all duration-300"
                >
                  Back to Cart
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'
import { sendOrderConfirmation } from '../services/emailService'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const { cartItems, cartTotal, cartCount, clearCart, showNotification } = useCart()

const isProcessing = ref(false)
const errors = ref({})

// Province search state
const provinceSearch = ref('')
const showProvinceDropdown = ref(false)
const allProvinces = [
  'Aceh', 'Bali', 'Banten', 'Bengkulu', 'DI Yogyakarta', 'DKI Jakarta',
  'Gorontalo', 'Jambi', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
  'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Tengah', 'Kalimantan Timur', 'Kalimantan Utara',
  'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'Lampung', 'Maluku', 'Maluku Utara',
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Papua', 'Papua Barat', 'Papua Barat Daya',
  'Papua Pegunungan', 'Papua Selatan', 'Papua Tengah', 'Riau', 'Sulawesi Barat',
  'Sulawesi Selatan', 'Sulawesi Tengah', 'Sulawesi Tenggara', 'Sulawesi Utara',
  'Sumatera Barat', 'Sumatera Selatan', 'Sumatera Utara'
]
const filteredProvinces = ref([...allProvinces])

// Filter provinces based on search
const filterProvinces = () => {
  const search = provinceSearch.value.toLowerCase()
  if (!search) {
    filteredProvinces.value = [...allProvinces]
  } else {
    filteredProvinces.value = allProvinces.filter(p => 
      p.toLowerCase().includes(search)
    )
  }
}

// Select province from dropdown
const selectProvince = (province) => {
  checkoutForm.value.province = province
  provinceSearch.value = province
  showProvinceDropdown.value = false
  // Clear error if exists
  if (errors.value.province) {
    delete errors.value.province
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showProvinceDropdown.value = false
    }
  })
})

const checkoutForm = ref({
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  province: '',
  paymentMethod: '',
  notes: ''
})

const paymentMethods = [
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    description: 'Pay securely with Visa, Mastercard, or AMEX',
    icon: '💳'
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    description: 'Direct transfer to our bank account',
    icon: '🏦'
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    description: 'GoPay, OVO, Dana, or ShopeePay',
    icon: '📱'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: '💵'
  }
]

const totalAmount = computed(() => {
  return cartTotal.value + 50000 + (cartTotal.value * 0.1)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const validateForm = () => {
  errors.value = {}
  
  // Email validation
  if (!checkoutForm.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.value.email)) {
    errors.value.email = 'Invalid email format'
  }
  
  // Phone validation
  if (!checkoutForm.value.phone) {
    errors.value.phone = 'Phone number is required'
  } else if (!/^[0-9+\s-]{10,15}$/.test(checkoutForm.value.phone)) {
    errors.value.phone = 'Invalid phone number'
  }
  
  // Name validation
  if (!checkoutForm.value.firstName) {
    errors.value.firstName = 'First name is required'
  }
  
  if (!checkoutForm.value.lastName) {
    errors.value.lastName = 'Last name is required'
  }
  
  // Address validation
  if (!checkoutForm.value.address) {
    errors.value.address = 'Address is required'
  }
  
  if (!checkoutForm.value.city) {
    errors.value.city = 'City is required'
  }
  
  if (!checkoutForm.value.postalCode) {
    errors.value.postalCode = 'Postal code is required'
  } else if (!/^\d{5}$/.test(checkoutForm.value.postalCode)) {
    errors.value.postalCode = 'Invalid postal code (5 digits)'
  }
  
  if (!checkoutForm.value.province) {
    errors.value.province = 'Province is required'
  }
  
  // Payment method validation
  if (!checkoutForm.value.paymentMethod) {
    errors.value.paymentMethod = 'Please select a payment method'
  }
  
  return Object.keys(errors.value).length === 0
}

const handlePlaceOrder = async () => {
  if (!validateForm()) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  
  isProcessing.value = true
  
  try {
    // Generate order ID
    const orderId = '#VLX-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    
    // Get payment method name
    const paymentMethodName = paymentMethods.find(m => m.id === checkoutForm.value.paymentMethod)?.name || 'N/A'
    
    // Prepare order data for email
    const orderData = {
      orderId: orderId,
      customerInfo: {
        firstName: checkoutForm.value.firstName,
        lastName: checkoutForm.value.lastName,
        email: checkoutForm.value.email,
        phone: checkoutForm.value.phone,
        address: checkoutForm.value.address,
        city: checkoutForm.value.city,
        province: checkoutForm.value.province,
        postalCode: checkoutForm.value.postalCode
      },
      items: cartItems.value,
      subtotal: cartTotal.value,
      shipping: 50000,
      tax: cartTotal.value * 0.1,
      total: totalAmount.value,
      paymentMethod: paymentMethodName,
      notes: checkoutForm.value.notes
    }
    
    // Send order confirmation email
    const emailResult = await sendOrderConfirmation(orderData)
    
    if (emailResult.success) {
      showNotification('Order placed successfully! Confirmation email sent.')
      
      // Clear cart
      clearCart()
      
      // Show success message with order details
      alert(`✅ Order Confirmed!\n\nOrder ID: ${orderId}\n\nA confirmation email has been sent to:\n${checkoutForm.value.email}\n\nThank you for shopping with Velixier!`)
      
      // Redirect to home
      router.push('/')
    } else {
      // Order placed but email failed
      showNotification('Order placed but failed to send email. Please contact support.')
      clearCart()
      alert(`⚠️ Order Placed\n\nOrder ID: ${orderId}\n\nYour order was successful, but we couldn't send the confirmation email.\nPlease save your order ID and contact us if needed.`)
      router.push('/')
    }
  } catch (error) {
    console.error('Order error:', error)
    showNotification('Failed to place order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

// Redirect if cart is empty
if (cartItems.value.length === 0) {
  router.push('/cart')
}
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d4af37;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #c9a961;
}
</style>
