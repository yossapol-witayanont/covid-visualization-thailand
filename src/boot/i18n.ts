import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

interface App extends Vue {
  app: {
    i18n: VueI18n
  }
}

const i18n = new VueI18n({
  locale: 'th-th',
  fallbackLocale: 'th-th',
  messages
})

export default ({ app } : App) => {
  // Set i18n instance on app
  app.i18n = i18n
}

// if you need to import it from
// other files, then:
export { i18n }
