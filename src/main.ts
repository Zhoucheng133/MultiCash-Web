import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { aliases, fa } from 'vuetify/iconsets/fa'
import router from "./router";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})

createApp(App)
.use(router)
.use(pinia)
.use(vuetify)
.mount('#app')
