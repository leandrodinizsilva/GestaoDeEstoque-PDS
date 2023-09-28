import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/Login/Login.vue'
import HomeView from './views/Home.vue'
import CadastroUsuarioView from './views/Login/CadastroUsuario.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/CadastroUsuario',
        name: 'CadastroUsuario',
        component: CadastroUsuarioView,
    },
    {
        path: '/Home',
        name: 'home',
        component: HomeView,
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {

    let modalBackground = document.querySelector('.modal-backdrop')
    let modal = document.querySelector('.modal-dialog')

    if (modalBackground) {
      modalBackground.remove()
      modal.remove()
    }
  
    next()
  })

export default router;