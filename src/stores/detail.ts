import axios from 'axios'
import { db } from './db'
import { Table } from 'dexie'
import { computed } from 'vue'
import { NamedAPIResource } from '@/types/api/utility'

export default function useDetail<T>(table: Table<T>) {
  const url = computed(() => {
    switch (table) {
      case db.pokemon:
        return 'https://pokeapi.co/api/v2/pokemon'
      case db.species:
        return 'https://pokeapi.co/api/v2/pokemon-species'
      case db.generation:
        return 'https://pokeapi.co/api/v2/generation'
      default:
        throw Error('Incorrect table')
    }
  })
  const get = async (name: string) => {
    const stored = await table.get(name)

    // Get from cache
    if (stored) {
      return stored
    }

    // If not present, get from API
    const { data } = await axios.get<T>(`${url.value}/${name}`)
    if (data) {
      await table.add(data)
      return data
    } else {
      throw new Error('404')
    }
  }

  const getAll = async (results: NamedAPIResource[]): Promise<T[]> => {
    const data = (await Promise.allSettled(results.map((r) => get(r.name)))).filter((r) => r.status === 'fulfilled').map((r) => r.value) as T[]
    if (data) return data
    else return []
  }
  return { get, getAll }
}
