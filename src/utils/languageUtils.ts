import { Description, Name } from '@/types/api/utility'

type Lang = 'fr' | 'en'

const FALLBACK_LANG = 'en'
export default {
  getLanguageName(names: Name[] | null | undefined, lang: Lang): string {
    if (!names || names.length === 0) return ''
    return names.find((n) => n.language.name === lang)?.name || names.find((n) => n.language.name === FALLBACK_LANG)?.name || ''
  },
  getLanguageDescription(descriptions: Description[] | null | undefined, lang: Lang): string {
    if (!descriptions || descriptions.length === 0) return ''
    return descriptions.find((d) => d.language.name === lang)?.description || descriptions.find((d) => d.language.name === FALLBACK_LANG)?.description || ''
  },
}
