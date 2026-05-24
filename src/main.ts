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
import router from "./router";
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { zhHans } from 'vuetify/locale';

const pinia = createPinia();

const vuetify = createVuetify({
  locale: {
    locale: 'zhHans',
    messages: { zhHans },
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    },
  },
})

createApp(App)
.use(router)
.use(pinia)
.use(vuetify)
.mount('#app')
