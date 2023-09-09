<template>
  <v-card :loading="loading">
    <v-card-title v-text="pokemon.name"></v-card-title>
    <v-card-subtitle v-text="pokemon.species?.name"></v-card-subtitle>
    <v-img :src="pokemon.sprites?.front_default" />
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { PokemonHabitat, PokemonSpecies } from '@/types/pokemon'
import usePokemonGetter from '@/stores/pokemonGetter'

const props = defineProps<{ pokemonId: string | number }>()

const { get } = usePokemonGetter<PokemonHabitat>('pokemon-habitat')

const loading = ref(false)
const pokemon = ref<Partial<PokemonSpecies>>({})

onMounted(async () => {
  try {
    loading.value = true
    pokemon.value = await get(props.pokemonId)
  } finally {
    loading.value = false
  }
})
</script>
