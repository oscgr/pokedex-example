// TODO temporary - will get official typescript interface
import axios from 'axios'

interface Pokemon {
  id: string
}

export default function usePokemon() {
  const getPokemon = async (id: string | number) => {
    const KEY = `pokemon-${id}`

    // Get from cache
    const pokemon = localStorage.getItem(KEY)
    if (!!pokemon) {
      return JSON.parse(pokemon) as Pokemon
    }

    // If not present, get from API
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      if (!!data) {
        localStorage.setItem(KEY, JSON.stringify(data))
        return data
      } else {
        throw new Error('404')
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { getPokemon }
}
