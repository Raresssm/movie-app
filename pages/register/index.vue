<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function register() {
  if (loading.value) return
  
  errorMsg.value = ''
  successMsg.value = ''
  
  // Validate passwords match
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match'
    return
  }
  
  // Validate password length
  if (password.value.length < 6) {
    errorMsg.value = 'Password must be at least 6 characters long'
    return
  }
  
  loading.value = true

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (error) {
    errorMsg.value = error.message
  } else {
    successMsg.value = 'Check your email to confirm your registration!'
    // Clear form on success
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
  }
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function toggleConfirmPasswordVisibility() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-2">
          Create Account
        </h1>
        <p class="text-gray-400 text-lg">Join MovieApp to save your favorite movies</p>
      </div>

      <!-- Register Form -->
      <div class="bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <form class="space-y-6" @submit.prevent="register">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
              </svg>
              Email Address
            </label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              required
              placeholder="Enter your email address"
              class="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 hover:bg-gray-700/80 transition-all duration-200 placeholder-gray-400 text-base"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Password
            </label>
            <div class="relative">
              <input 
                id="password"
                v-model="password" 
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Enter your password (min. 6 characters)"
                class="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 hover:bg-gray-700/80 transition-all duration-200 placeholder-gray-400 text-base"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <!-- Eye Open (Show Password) -->
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <!-- Eye Closed (Hide Password) -->
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-semibold mb-3 text-gray-200 flex items-center gap-2">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Confirm Password
            </label>
            <div class="relative">
              <input 
                id="confirmPassword"
                v-model="confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="Confirm your password"
                class="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 hover:bg-gray-700/80 transition-all duration-200 placeholder-gray-400 text-base"
              />
              <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                :aria-label="showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'"
              >
                <!-- Eye Open (Show Password) -->
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <!-- Eye Closed (Hide Password) -->
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Register Button -->
          <button 
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none text-base flex items-center justify-center gap-3"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Messages -->
        <transition name="fade">
          <div v-if="errorMsg || successMsg" class="mt-6">
            <div v-if="errorMsg" class="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
                {{ errorMsg }}
              </div>
            </div>
            <div v-if="successMsg" class="bg-green-900/30 border border-green-700/50 text-green-300 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ successMsg }}
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Footer Links -->
      <div class="mt-8 text-center space-y-4">
        <p class="text-gray-400">
          Already have an account?
          <NuxtLink 
            to="/login"
            class="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-200 ml-1"
          >
            Sign in here
          </NuxtLink>
        </p>
        <NuxtLink 
          to="/"
          class="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Movies
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Fix autocomplete styling */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(31, 41, 55, 0.8) inset !important;
  -webkit-text-fill-color: white !important;
  border: 1px solid rgba(75, 85, 99, 0.5) !important;
  border-radius: 0.75rem !important;
  background: rgba(31, 41, 55, 0.8) !important;
}

/* Firefox autocomplete fix */
input:-moz-autofill {
  background-color: rgba(31, 41, 55, 0.8) !important;
  color: white !important;
  border: 1px solid rgba(75, 85, 99, 0.5) !important;
}
</style>