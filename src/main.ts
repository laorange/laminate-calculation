import {createApp} from 'vue'
import App from './App.vue'
import VueLatex from 'vatex'
import {createPinia} from "pinia";

createApp(App)
    .use(createPinia())
    .use(VueLatex)
    .mount('#app')
