import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlist = defineStore('wishlist', () => {
  // Load wishlist from localStorage
  const loadWishlistFromStorage = () => {
    const stored = localStorage.getItem('velixier-wishlist')
    return stored ? JSON.parse(stored) : []
  }

  const wishlistItems = ref(loadWishlistFromStorage())

  // Computed
  const wishlistCount = computed(() => wishlistItems.value.length)
  const wishlistIds = computed(() => wishlistItems.value.map(item => item.id))

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistIds.value.includes(productId)
  }

  // Add to wishlist
  const addToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      wishlistItems.value.push(product)
      saveToStorage()
      return true
    }
    return false
  }

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId)
    saveToStorage()
  }

  // Toggle wishlist
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      return false // removed
    } else {
      addToWishlist(product)
      return true // added
    }
  }

  // Clear wishlist
  const clearWishlist = () => {
    wishlistItems.value = []
    saveToStorage()
  }

  // Save to localStorage
  const saveToStorage = () => {
    localStorage.setItem('velixier-wishlist', JSON.stringify(wishlistItems.value))
  }

  return {
    wishlistItems,
    wishlistCount,
    wishlistIds,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist
  }
})
