import axios from 'axios'
import { PokemonHabitat, PokemonSpecies } from '@/types/pokemon'
import { useLocalStorage } from '@vueuse/core'

type Resource = 'pokemon' | 'pokemon-species' | 'pokemon-habitat'
export default function usePokemonGetter<T>(resource: Resource) {
  const get = async (id: string | number) => {
    const stored = useLocalStorage<T>(`${resource}-${id}`, null, {
      serializer: {
        read: (v: string | undefined) => (v ? JSON.parse(v) : null),
        write: (v: T) => JSON.stringify(v),
      },
    })
    // Get from cache
    if (!!stored.value) {
      return stored.value
    }

    // If not present, get from API
    try {
      const { data } = await axios.get<T>(`https://pokeapi.co/api/v2/${resource}/${id}`)
      if (!!data) {
        stored.value = data
        return data
      } else {
        throw new Error('404')
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { get }
}
