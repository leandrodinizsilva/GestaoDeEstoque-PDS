import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/Login/Login.vue'
import HomeView from './views/Home.vue'
import CadastroUsuarioView from './views/Login/CadastroUsuario.vue'
import ListaDepositoView from './views/Deposito/ListaDeposito.vue'
import CadastroEdicaoDepositoView from './views/Deposito/CadastroEdicaoDeposito.vue'
import ListaUnidadeView from './views/Unidade/ListaUnidade.vue'
import CadastroEdicaoUnidadeView from './views/Unidade/CadastroEdicaoUnidade.vue'
import ListaMaterialView from './views/Material/ListaMaterial.vue'
import CadastroEdicaoMaterialView from './views/Material/CadastroEdicaoMaterial.vue'
import ListaEntradaView from './views/Entrada/ListaEntrada.vue'
import CadastroEdicaoEntradaView from './views/Entrada/CadastroEdicaoEntrada.vue'
import ListaSaidaView from './views/Saida/ListaSaida.vue'
import CadastroEdicaoSaidaView from './views/Saida/CadastroEdicaoSaida.vue'
import ListaTransferenciaView from './views/Transferencia/ListaTransferencia.vue'
import CadastroEdicaoTransferenciaView from './views/Transferencia/CadastroEdicaoTransferencia.vue'

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
    {
        path: '/Deposito',
        name: 'ListaDeposito',
        component: ListaDepositoView,
    },
    {
        path: '/Deposito/CadastroEdicao/:codigoDeposito',
        name: 'CadastroEdicaoDeposito',
        component: CadastroEdicaoDepositoView,
    },
    {
        path: '/Unidade',
        name: 'ListaUnidade',
        component: ListaUnidadeView,
    },
    {
        path: '/Unidade/CadastroEdicao/:codigoUnidade',
        name: 'CadastroEdicaoUnidade',
        component: CadastroEdicaoUnidadeView,
    },
    {
        path: '/Material',
        name: 'ListaMaterial',
        component: ListaMaterialView,
    },
    {
        path: '/Material/CadastroEdicao/:codigoMaterial',
        name: 'CadastroEdicaoMaterial',
        component: CadastroEdicaoMaterialView,
    },
    {
        path: '/Entrada',
        name: 'ListaEntrada',
        component: ListaEntradaView,
    },
    {
        path: '/Entrada/CadastroEdicao/:codigoEntrada',
        name: 'CadastroEdicaoEntrada',
        component: CadastroEdicaoEntradaView,
    },
    {
        path: '/Saida',
        name: 'ListaSaida',
        component: ListaSaidaView,
    },
    {
        path: '/Saida/CadastroEdicao/:codigoSaida',
        name: 'CadastroEdicaoSaida',
        component: CadastroEdicaoSaidaView,
    },
    {
        path: '/Transferencia',
        name: 'ListaTransferencia',
        component: ListaTransferenciaView,
    },
    {
        path: '/Transferencia/CadastroEdicao/:codigoTransferencia',
        name: 'CadastroEdicaoTransferencia',
        component: CadastroEdicaoTransferenciaView,
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