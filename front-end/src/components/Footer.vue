<template>
  <footer class="bg-Trippant-1-hex py-6 overflow-y-auto max-h-80 mt-auto">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <div class="mb-4 md:mb-0">
        <h2 class="text-2xl font-semibold text-white mb-2">Sobre</h2>
        <p class="text-Trippant-5-hex">Coloque uma breve descrição aqui.</p>
      </div>
      <nav class="flex items-center space-x-4">
        <a href="#" class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300">Link 1</a>
        <a href="#" class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300">Link 2</a>
        <a href="#" class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300">Link 3</a>
      </nav>
      <div class="flex items-center space-x-4">
        <a href="#" class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </a>
        <a href="#" class="text-Trippant-5-hex hover:text-Trippant-4-hex transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>
