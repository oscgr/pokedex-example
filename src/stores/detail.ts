import axios from 'axios'
import { db } from './db'
import { Table } from 'dexie'
import { computed } from 'vue'

export default function useDetail<T>(table: Table<T>) {
  const url = computed(() => {
    switch (table) {
      case db.pokemon:
        return 'https://pokeapi.co/api/v2/pokemon'
      case db.species:
        return 'https://pokeapi.co/api/v2/pokemon-species'
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
    try {
      const { data } = await axios.get<T>(`${url.value}/${name}`)
      if (data) {
        await table.add(data)
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
