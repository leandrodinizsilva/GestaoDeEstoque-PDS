import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueClickAway from "vue3-click-away";
//import emailjs from 'emailjs-com';
import store from './vuex'
import { toast } from 'vue3-toastify';


library.add(faPlus)
library.add(faPen)
library.add(faTrash)
library.add(faArrowLeft)
library.add(faWarehouse)
library.add(faSquareCheck)

axios.defaults.baseURL = 'http://localhost:8000/'

axios.interceptors.request.use(function (config) {
    const token = store.state.tokenJWT;
    config.headers.Authorization =  token;
     
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response)
      toast(error.response.data.mensagem, { autoClose:1000, theme: 'light', type: 'error'})
    
    if(error.request.status == 401) {
      router.push('/')
      store.commit('logout')
    }
    
    return Promise.reject(error);
  });


createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(store)
.use(VueClickAway)
.use(VueSweetalert2)
.use(VueAxios, axios)
.use(router)
.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
