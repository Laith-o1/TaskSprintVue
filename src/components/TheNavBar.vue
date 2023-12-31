<script>
import { useAuthStore } from '../stores/AuthStore'
export default {
  name: 'TheNavBar',
  setup() {
    const store = useAuthStore()

    const logout = async () => {
      try {
        await store.logout()
      } catch (error) {
        // console.error(error)
      }
    }
    return {
      store,
      logout
    }
  },
}
</script>
<template>
    <header class="relative">
        <div class="bg-[#28419E] py-2">
          <nav class="relative grid grid-flow-col grid-cols-12" aria-label="Global">
    
            <div class="grid grid-flow-col grid-cols-4 col-span-4">
              <div class="col-start-1">
                <!-- <img class="mr-auto w-24 h-24" src="/navLogo.png" alt=""> -->
              </div>
              <div class="col-start-2 col-span-3">
                <p class="text-white mr-3 sm:mt-4">Task Sprint</p>
              </div>
            </div>
            <button @click="logout()"
            
              class="col-start-11 max-w-[100px] border border-solid border-white rounded-3xl h-10 my-auto grid grid-flow-col grid-cols-2">
              <div class="col-start-1 my-auto">
                <p class="text-white ml-1 invisible sm:visible">logout</p>
              </div>
              <div class="col-start-2 my-auto mx-auto">
                <img src="/Thelogout.png" alt="">
              </div>
            </button>
    
          </nav>
        </div>
      </header>
</template>