// db.js
import Dexie, { Table } from 'dexie'
import { Pokemon, PokemonSpecies } from '@/types/api/pokemon'

export class PokemonDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  pokemon!: Table<Pokemon>
  species!: Table<PokemonSpecies>

  constructor() {
    super('pokemon-db')
    this.version(1).stores({
      pokemon: '++name, id',
      species: '++name, id',
    })
  }
}

export const db = new PokemonDexie()
