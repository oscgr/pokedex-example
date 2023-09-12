import axios from 'axios'
import { NamedAPIResourceList } from '@/types/api/utility'

export type Resource = 'pokemon' | 'pokemon-species'
export default function useQuery(resource: Resource) {
  const PAGE_SIZE = 50
  const get = async (page: number) => {
    const params = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * page,
    }
    try {
      const { data } = await axios.get<NamedAPIResourceList>(`https://pokeapi.co/api/v2/${resource}`, { params })
      if (data) {
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
