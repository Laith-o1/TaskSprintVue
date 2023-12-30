import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: null,
    errorMessage: null,
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getErrorMessage: (state) => state.errorMessage,
  },
  actions: {
    async logout() {
      axios
        .get("endPoint",{
          headers: {
              Authorization: "Bearer " + this.token
          },
      }).then((response) => {
          this.token = null;
          this.user = {};
          router.push({ name: 'login' });
        })
        .catch((error) => {
          this.errorMessage = error.response;
        });
    },

    async login( email, password ) {

      const fromData = new FormData();
      email = email;
      
      password = password;
      fromData.append('email', email);
      fromData.append('password', password);
      axios
        .post(
          "http://localhost:8000/api/employee/login",
          fromData,
        )
        .then((response) => {

          this.token = response.data.token;
          this.user = response.data.user;

          this.errorMessage = null;
          router.push({ name: 'MainView' });
        })
        .catch((error) => {
          this.errorMessage = error.response;
        });
    },
    async register( email,password,tcname, phone) {
      const fromData = new FormData();
      tcname = tcname;
      email = email;
      password = password;
      phone = phone;
      fromData.append('name', tcname);
      fromData.append('email', email);
      fromData.append('password', password);
      fromData.append('phone_number', phone);

      axios
        .post(
          "endPoint",
          fromData,
        )
        .then((response) => {
          this.token = response.data.token;
          this.user = response.data.user;
          this.errorMessage = null;
          router.push({ name: 'MainView' });
        })
        .catch((error) => {
          this.errorMessage = error.response;
          console.log(tcname, email, password, phone);
        });
      console.log(fromData);
    }
  },
  persist: true,
});
