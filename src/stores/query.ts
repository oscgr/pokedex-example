import axios from 'axios'
import { NamedAPIResource, NamedAPIResourceList } from '@/types/api/utility'
import { db, Resource } from '@/stores/db'

export default function useQuery(resource: Resource) {
  const itemsPerPage = Number(import.meta.env.VITE_ITEMS_PER_PAGE || 50)
  const get = async (page: number, additionalOffset?: number): Promise<NamedAPIResource[]> => {
    const params = {
      limit: itemsPerPage,
      offset: itemsPerPage * page + (additionalOffset || 0),
    }

    const stored = await db.queries.where('[resource+limit+offset]').equals([resource, params.limit, params.offset]).first()

    if (stored) return stored.results
    const { data } = await axios.get<NamedAPIResourceList>(`https://pokeapi.co/api/v2/${resource}`, { params })
    if (data) {
      db.queries.add({
        limit: params.limit,
        offset: params.offset,
        resource,
        ...data,
      })
      return data.results
    } else {
      throw new Error('404')
    }
  }
  return { get }
}
