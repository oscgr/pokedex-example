// db.js
import Dexie, { Table } from 'dexie'
import { Pokemon, PokemonSpecies } from '@/types/api/pokemon'
import { NamedAPIResourceList } from '@/types/api/utility'
import { Generation, Pokedex } from '@/types/api/games'

export type Resource = 'pokemon' | 'pokemon-species' | 'generation'

export interface NamedAPIResourceListWithUrl extends NamedAPIResourceList {
  resource: Resource
  limit: number
  offset: number
}
export class PokemonDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  pokemon!: Table<Pokemon>
  species!: Table<PokemonSpecies>
  generation!: Table<Generation>
  queries!: Table<NamedAPIResourceListWithUrl>

  constructor() {
    super('pokemon-db')
    this.version(1).stores({
      pokemon: '++name, id',
      species: '++name, id',
      generation: '++name, id',
      queries: '[resource+limit+offset]',
    })
  }
}

export const db = new PokemonDexie()
