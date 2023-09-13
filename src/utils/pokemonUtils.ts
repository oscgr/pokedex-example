import type { Pokemon } from '@/types/api/pokemon'

export default {
  getBestPossibleSprite(pokemon?: Pokemon): string {
    if (!pokemon) return ''
    return pokemon?.sprites?.other?.dream_world?.front_default || this.getBestPossibleSmallSprite(pokemon)
  },
  getBestPossibleSmallSprite(pokemon?: Pokemon): string {
    if (!pokemon) return ''
    return (
      pokemon?.sprites?.front_default ||
      pokemon?.sprites?.other?.home?.front_default ||
      pokemon?.sprites?.other?.['official-artwork']?.front_default ||
      pokemon?.sprites?.front_default
    )
  },
  getBestPossibleSmallSpriteBack(pokemon?: Pokemon): string {
    if (!pokemon) return ''
    return (
      pokemon?.sprites?.back_default || pokemon?.sprites?.other?.home?.back_default || pokemon?.sprites?.other?.['official-artwork']?.back_default || pokemon?.sprites?.back_default
    )
  },
}
