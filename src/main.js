import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {Quasar} from 'quasar'
import quasarUserOptions from './quasar-user-options'
import mitt from 'mitt'

const emitter = mitt()



const app = createApp(App).use(Quasar, quasarUserOptions).use(router).use(store)
app.config.globalProperties.emitter = emitter
app.mount('#app')
