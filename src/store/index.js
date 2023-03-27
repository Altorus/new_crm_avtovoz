import {createStore} from 'vuex'
import router from '../router/index.js'
import createPersistedState from 'vuex-persistedstate'


export default createStore({
    state: {
        orderTabs: [],
        token: undefined,
        operator: undefined,
        orderData: {},
        searchNumber: null,
    },
    getters: {
        ORDER_DATA: state => {
            return state.orderData
        },
        ORDER_NUMBER: state => {
            return state.searchNumber
        },
        TOKEN: state =>{
            return state.token
        },
        OPERATOR_ID: state => {
            return state.operator
        }
    },
    mutations: {
        addOpenTab(state, data) {
            const arr = [...new Set(state.orderTabs)]
            if (state.orderTabs.indexOf(data) === -1) {
                arr.push(data)
            }
            state.orderTabs = arr
            router.push({path: '/order/' + data})
        },
        delOpenTab(state, data) {
            state.orderTabs = state.orderTabs.filter(item => item !== data)
            setTimeout(()=>{
                // if (router.currentRoute.path !== '/' || router.currentRoute.path !== '/my-order') {
                //     router.push({ path: '/my-order' })
                // }
            }, 100)
        },
        AUTHORIZE_USER(state, payload) {
            state.token = payload.token
            state.operator = payload.operator
        },
        UPDATE_ORDER_DATA(state, payload){
            state.orderData = payload
        },
        SET_ORDER_NUMBER(state, payload){
            state.searchNumber = payload
        }
    },
    actions: {
        addOpenTab({commit}, int) {
            commit('addOpenTab', int)
        },
        delOpenTab({commit}, int) {
            commit('delOpenTab', int)
        },
        AUTHORIZE_USER({commit}, data) {
            commit('AUTHORIZE_USER', data)
        },
        UPDATE_ORDER_DATA({commit}, data){
            commit('UPDATE_ORDER_DATA', data)
        },
        SET_ORDER_NUMBER({commit}, data){
            commit('SET_ORDER_NUMBER', data)
        }
    },
    modules: {},
    plugins: [
        createPersistedState({
            key: ['orderTabs', 'token', 'operator'],
            paths: ['orderTabs', 'token', 'operator'],
            storage: window.localStorage
        }),
    ]
})
