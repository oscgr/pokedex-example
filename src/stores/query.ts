import axios from 'axios'
import { NamedAPIResourceList } from '@/types/api/utility'
import { db, Resource } from '@/stores/db'

export default function useQuery(resource: Resource) {
  const PAGE_SIZE = 50
  const get = async (page: number) => {
    const params = {
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * page,
    }

    const stored = await db.queries.where('[resource+limit+offset]').equals([resource, params.limit, params.offset]).first()

    if (stored) return stored.results
    try {
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
    } catch (e) {
      console.error(e)
    }
  }
  return { get }
}
