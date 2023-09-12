import type { Pokemon } from '@/types/api/pokemon'

export default {
  getBestPossibleSprite(pokemon?: Pokemon): string {
    if (!pokemon) return ''
    return pokemon?.sprites?.other?.dream_world?.front_default || pokemon?.sprites?.other?.['official-artwork']?.front_default || pokemon?.sprites?.front_default
  },
}
