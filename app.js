Vue.component('CoinDetail', {
  
  props: ['coin'],
  
  data () {
    return {
      showPrices:false,
      value: 0
    }
  },

  methods: {
    toggleShowPrices () {
      this.showPrices= !this.showPrices
// this.$emit('change-color') emite un evento para comunicar alpadre
      this.$emit('change-color', this.showPrices ? 'ff96c8' : '3d3d')
    }
  },

  computed: {

    title () {
      return `${this.coin.name} - ${this.coin.symbol}`
    },

    convertedValue () {
      if (!this.value) {
        return 0
      }
      return this.value / this.coin.price
    }
  },
  
  template: `
  <div>
    <img 
      v-on:mouseover="toggleShowPrices"
      v-on:mouseout="toggleShowPrices"
      v-bind:src="coin.img" v-bind:alt="coin.name">,

    <h1   v-bind:class="coin.changePercent > 0 ? 'green' : 'red' ">
        {{ title }}
          <span v-if="coin.changePercent > 0">文字</span>
          <span v-else-if="coin.changePercent < 0">文</span>
          <span v-else> 絵,</span>
          <span v-on:click="toggleShowPrices">
        {{ showPrices ? 'hi' : 'ho' }}
        </span>
    </h1>
    <input type="number" v-model="value">
    <span>{{ convertedValue }} </span>

    <slot name="text"> </slot>
    <slot name="link"> </slot>

    <ul v-show=showPrices>
          <li v-bind:class="{ orange: p.value == coin.price, red: p.value < coin.price, green: p.value > coin.price }" v-for="(p, i) in coin.pricesWithDays" v-bind:key="p.day">
            {{ i }} - {{p.day}} - {{ p.value }}
          </li>
        </ul>
  </div>       
`
})




// Vue.component('CoinDetail', {
//   props: ['coin'],

//   data () {
//     return {
//       showPrices: false,
//       value: 0
//     }
//   },

//   methods: {
//     toggleShowPrices () {
//       this.showPrices = !this.showPrices

//       this.$emit('change-color', this.showPrices ? 'FF96C8' : '3D3D3D')
//     }
//   },

//   computed: {
//     title () {
//       return `${this.coin.name} - ${this.coin.symbol}`
//     },

//     convertedValue () {
//       if (!this.value) {
//         return 0
//       }

//       return this.value / this.coin.price
//     }
//   },

//   created () {
//     console.log('Created CoinDetail...')
//   },

//   mounted () {
//     console.log('Mounted CoinDetail...')
//   },




//   template: `
//     <div>
//       <img
//         v-on:mouseover="toggleShowPrices"
//         v-on:mouseout="toggleShowPrices"
//         v-bind:src="coin.img"
//         v-bind:alt="coin.name"
//       >
//       <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'">
//         {{ title }}
//         <span v-if="coin.changePercent > 0">👍</span>
//         <span v-else-if="coin.changePercent < 0">👎</span>
//         <span v-else>🤞</span>

//         <span v-on:click="toggleShowPrices">
//           {{ showPrices ? '🙈' : '🐵' }}
//         </span>
//       </h1>

//       <input type="number" v-model="value">
//       <span>{{ convertedValue }}</span>

//       <slot name="text"></slot>
//       <slot name="link"></slot>

//       <ul v-show="showPrices">
//         <li
//           class="uppercase"
//           v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price }"
//           v-for="(p, i) in coin.pricesWithDays"
//           v-bind:key="p.day">
//           {{ i }} - {{ p.day }} - {{ p.value }}
//         </li>
//       </ul>
//     </div>
//   `
// })


new Vue( {
  el: '#app',

  data () {
    return {
      btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        // propiedad que representa el valor de variacion del bitcoin
        changePercent: 0,
        price: 8400,
        pricesWithDays: [
          { day: 'Lunes', value: 8400 },
          { day: 'Martes', value: 7900 },
          { day: 'Miercoles', value: 8200 },
          { day: 'Jueves', value: 9000 },
          { day: 'Viernes', value: 9400 },
          { day: 'Sabado', value: 10000 },
          { day: 'Domingo', value: 10200 },
        ],

        showPrices: false,

          },
        value: 0,

        color: 'f4f4f4',
    }
  },
// las propiedades computadas son aquellas que se genran  a partir de los valores de otras propiedades y regresan un valor
  // computed: {
  //       title () {
  //         return `${this.name} - ${this.symbol}`
  //       },

  //       convertedValue () {
  //         if (!this.value) {
  //           return 0
  //         }
  //         return this.value / this.price
  //       }
  //       },

  
// los watch son similares pero en vez de regresar un valor ejecutan un codigo
  // watch:{
  //   showPrices (newVal, oldVal) {
  //       console.log(newVal, oldVal)
  //   }
  // },

  // methods es un objeto donde se pueden definir funciones esas funciones se pueden usaren diferentes contextos, mas sin embargo se van a usar atacharse a los eventos que pueden ser disparados por la vista
  methods: {
    // esta funcion cambiara el valor de showPrices
        updateColor (color) {
          // se debe usar this. para acceder alas diferentes propiedadaes o metodos
          this.color = color || this.color

          this.color = this.color.split('')
          .reverse().join('')
        }
      }

  // created () {
  //   console.log('Created...')
  // },

  // mounted () {
  //   console.log('Mounted...')
  // },

  // methods: {
  //   updateColor (color) {
  //     this.color = color || this.color
  //       .split('')
  //       .reverse()
  //       .join('')
  //   }
  // }
} )



// manera derealizar components inicio
// muy recomendado para modular y reciclar pequños trazos de codigo de html
// la funcion Vue.component crea y registra el componente nuevo el cual nombramos como counterpara poder utilizar en el html a este le asignamos un objeto con data, methods y template
// template es donde definiremos nuestras etiquetas html  que contendran al componente.
// Vue.component('counter', {
//   data () {
//     return {
//       counter: 0
//     }
//   },

//    methods: {
//      increment() {
//        this.counter += 1
//      }
//    },

//    template: `
//   <div>
//     <button v-on:click="increment">Click me!</button>
//     <span> {{ counter }} </span>
//   </div>
//           `
        

// siempre debe existir una uncia estancia que represente nuestra app y los componentes que se creen dependeran de esa instancia
// })
// new Vue({
// el: '#app',

// data () {
//   return {
//     title: 'hola'
//   }
// }
// })

// html
// lo ultimo es incluir el componente en el html con el nobre asignado que puede ser cualquiera
// <div id="app">
//   <h1> {{ title }} </h1>
//   <counter></counter>
//   </div>

// manera derealizar components ifinal