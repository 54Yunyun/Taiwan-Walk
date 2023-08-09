import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import _ from 'lodash';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import { LoadingPlugin } from 'vue-loading-overlay';
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

const pinia = createPinia();
const app = createApp(App);
app
  .use(router)
  .use(pinia)
  .use(VueAxios, axios)
  .use(VueAwesomePaginate)
  .use(LoadingPlugin)
  .use(VueAmazingUI);
app.mount('#app');
