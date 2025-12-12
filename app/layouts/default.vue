<script setup lang="ts">
  const currentYear = new Date().getFullYear()
  const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900">
    <!-- This is for skipping to main content and improving accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:text-sm focus:text-green-400 focus:underline focus:outline-none"
    >
      Skip to main content
    </a>

    <header class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink
            to="/"
            class="text-xl font-semibold text-white hover:text-green-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 rounded"
          >
            MyApp
          </NuxtLink>
          <nav aria-label="Main navigation">
            <ul class="flex items-center gap-1">
              <li>
                <NuxtLink
                  to="/"
                  :class="[
                    'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800',
                    route.path === '/'
                      ? 'text-green-400'
                      : 'text-gray-400 hover:text-white'
                  ]"
                >
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/about"
                  :class="[
                    'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800',
                    route.path === '/about'
                      ? 'text-green-400'
                      : 'text-gray-400 hover:text-white'
                  ]"
                >
                  About
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main id="main-content" class="flex-1" tabindex="-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>

    <footer class="bg-gray-800 border-t border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-400">
          © {{ currentYear }} Singa Genre Explorer. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
