import Vue from 'vue'
import VueRouter from 'vue-router'

import Senadores from '../components/senado/Senadores'
import Home from '../components/home/Home'
import senadoresByCod from '../components/parlamentares/senadoresByCod'
import Pronunciamentos from '../components/pronunciamentos/Pronunciamentos'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'senado',
        path: '/senado',
        component: Senadores
    },
    {
        name: 'senadoresByCod',
        path: '/senadores/:codigoparlamentar',
        component: senadoresByCod
    },
    {
        name: 'pronunciamentos',
        path: '/pronunciamentos',
        component: Pronunciamentos
    },
    
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router