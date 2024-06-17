import caJson from '../translations/ca.json'
import enJson from '../translations/en.json'
import esJson from '../translations/es.json'
import {createI18n} from 'vue-i18n'
//import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs'
let appTranslations = {
    ca: caJson,
    en: enJson,
    es: esJson,
}

let allTranslations = {}
Object.entries(appTranslations).forEach( ([key, value]) => {
    allTranslations[key] = {...value, ...appTranslations[key]}
})

const navigatorLanguage = navigator.language.split('-')[0];
const i18n = createI18n({
    legacy: false,
    locale: navigatorLanguage in allTranslations ? navigatorLanguage : 'en',
    fallbackLocale: 'en',
    messages: allTranslations,
})

export {
    i18n,
}
