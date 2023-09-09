import axios from 'axios'
import { PokemonHabitat, PokemonSpecies } from '@/types/api/pokemon'
import { useLocalStorage } from '@vueuse/core'
import { Resource } from '@/types/resources'

export default function useDetail<T>(resource: Resource) {
  const get = async (name: string) => {
    const stored = useLocalStorage<T>(`${resource}-${name}`, null, {
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
      const { data } = await axios.get<T>(`https://pokeapi.co/api/v2/${resource}/${name}`)
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
