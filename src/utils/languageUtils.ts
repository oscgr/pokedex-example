import { Name } from '@/types/utility'

type Lang = 'fr' | 'en'
export default {
  getLanguageName(names: Name[] | null | undefined, lang: Lang): string {
    if (!names || names.length === 0) return ''
    return names.find((n) => n.language.name === lang)?.name || ''
  },
}
