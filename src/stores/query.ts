import axios from 'axios'
import { PokemonHabitat, PokemonSpecies } from '@/types/api/pokemon'
import { useLocalStorage } from '@vueuse/core'
import { Resource } from '@/types/resources'
import { NamedAPIResourceList } from '@/types/api/utility'

export default function useQuery(resource: Resource) {
  const PAGE_SIZE = 5
  const get = async (page: number) => {
    const params = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * page,
    }
    try {
      const { data } = await axios.get<NamedAPIResourceList>(`https://pokeapi.co/api/v2/${resource}`, { params })
      if (!!data) {
        return data.results
      } else {
        throw new Error('404')
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { get }
}
