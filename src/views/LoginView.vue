<script>
import { useAuthStore } from '../stores/AuthStore'
import { ref } from 'vue'

export default {
  name: 'LoginView',
  methods: {
    async login() {
this.$router.push('/main')
    },
  },
  setup() {
    const store = useAuthStore()
    const email = ref('')
    const password = ref('')
    const errors = ref({
      email: '',
      password: '',

    })

    const submitLoginForm = async () => {
      try {

        await store.login(email.value, password.value)

      } catch (error) {
        console.error(error)
        // Login failed, handle error
        errors.value.email = 'Invalid email or password'
        errors.value.password = 'Invalid email or password'
      }
    }

    return {
      store,
      email,
      password,
      errors,
      submitLoginForm,

    }
  },

}
</script>
<template>
  <main class="grid grid-flow-col grid-cols-11">
    <div class="col-span-9 col-start-2 rounded-3xl sm:col-span-5 sm:col-start-4 mt-12 bg-white">
      <div class="grid grid-flow-row sm:grid-flow-col grid-row-2 sm:grid-col-2">
        <div>
          <!-- <img class="mx-auto mt-6 w-20 h-20 my-auto sm:ml-0" src="/logo.png" alt=""> -->
        </div>
        <div>

        </div>
      </div>
      <p class="mx-auto w-fit text-2xl text-center font-bold pt-6">TaskSprint</p>
      <p class="mx-auto w-fit text-lg text-center font-bold pt-2 pb-5">easy development tasks</p>
      <p class="mx-auto w-fit text-2xl mb-4   font-bold">login</p>
      <div class="grid grid-flow-col grid-cols-12">
        <p class="col-span-10 col-start-2 text-sm   font-bold">email</p>
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-2">
        <input v-model="email" id="FullName" type="text" placeholder="user@mail.com" class="
                          
                                    col-span-10
                                    col-start-2
                                    h-[3.375rem]
                                    bg-gray-200
                                    pl-4
                                    text-sm
                                      font-bold
                                  " />
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-2">
        <!-- <p class="col-span-10
                   col-start-2
                    text-red-500">
            *{{ store.token }}
          </p> -->
      </div>
      <div class="grid grid-flow-col grid-cols-12">
        <p class="col-span-10 col-start-2 text-sm   font-bold">password</p>
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-2">
        <input v-model="password" id="Password" type="password" placeholder="*******" class="
                          
                                    col-span-10
                                    col-start-2
                                    h-[3.375rem]
                                    bg-gray-200
                                    pl-4
                                    text-sm
                                      font-bold
                                  " />
      </div>
      <div v-if="store.errorMessage" class="grid grid-flow-col grid-cols-12 my-4">
        <p class="col-span-10 
                   col-start-2
                    text-red-500">
          *يرجى التأكد من البريد الالكتروني وكلمة المرور
        </p>
      </div>
      <!-- <div class="grid grid-flow-col grid-cols-12 my-4 pb-5"> -->
      <div class="grid grid-flow-col grid-cols-12 my-4 pb-5">
        <button @click="submitLoginForm()" class="bg-[#28419E] col-span-10 col-start-2 h-[3.375rem] text-white">
          تسجيل دخول
        </button>
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-4 pb-5">
        <button @click="$router.push({ name: 'RegisterView' })" class="bg-[#28419E] col-span-10 col-start-2 h-[3.375rem] text-white">
          إنشاء حساب 
        </button>
      </div>
      <!-- </div> -->
    </div>
  </main>
</template>
<style >
body {
  background-color: #EFEFEF;

}

* {
  font-family: 'Alexandria', sans-serif;
}
</style>
