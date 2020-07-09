import Vue from 'vue' // importa la libreria que se bajo con npm
import App from './App.vue' //se usa el import para importar al app
import '@/assets/css/tailwind.css'
import Chart from 'chart.js'
import Chartick from 'vue-chartkick'
import { VueSpinners } from '@saeris/vue-spinners'

import router from '@/router'
import { dollarFilter, percentFilter } from '@/filters'

Vue.use(VueSpinners)
Vue.use(Chartick.use(Chart))

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false // inst

new Vue({
  router,
  render: h => h(App) //funcion render
}).$mount('#app') // instancia de vue
