import { Generation } from '@/types/api/games'
import { computed, ref } from 'vue'
import { Nullable } from '@/types/utils'
import useDetail from '@/stores/detail'
import { db } from '@/stores/db'
import useQuery from '@/stores/query'
import { useSessionStorage } from '@vueuse/core'
import { last } from 'lodash-es'
import LanguageUtils from '@/utils/languageUtils'

// Allows us to track Pokemon species IDs directly when fetching them
interface GenerationItem {
  value: string
  title: string
  pokemonSpeciesIds: [number, number]
}

const generation = ref<Nullable<Generation>>(null)
const generations = ref<GenerationItem[]>([])
const generationFilter = useSessionStorage<string | null>('generation', 'generation-i')

const useGeneration = () => {
  const { get } = useQuery('generation')

  const { getAll, get: getDetail } = useDetail<Generation>(db.generation)

  const loadGenerations = async () => {
    const data = await get(0) // should be fine, there are 9 generations right now

    generations.value = (await getAll(data)).reduce((gens, gen) => {
      const [, end] = last(gens)?.pokemonSpeciesIds || [0, 0]
      return [
        ...gens,
        {
          value: gen.name,
          title: LanguageUtils.getLanguageName(gen.names, 'fr'),
          pokemonSpeciesIds: [end + 1, end + gen.pokemon_species.length],
        },
      ]
    }, [] as GenerationItem[])
  }

  const generationOffset = computed(() => {
    if (!generation.value) return 0
    const pokemonSpeciesIds = generations.value.find(({ value }) => value === generationFilter.value)?.pokemonSpeciesIds || [1, 1]
    return pokemonSpeciesIds[0] - 1
  })

  // Never use watchers inside composables - X calls of useGenerations() will watch X times and trigger function X times
  const watcher = async (newValue: string) => {
    if (newValue) generation.value = await getDetail(newValue)
  }

  return {
    loadGenerations,
    generation,
    generations,
    watcher,
    generationFilter,
    generationOffset,
  }
}

export default useGeneration
