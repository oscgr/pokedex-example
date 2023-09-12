<template>
  <v-card :loading="loading" width="100%" height="100%">
    <v-card-title v-text="pokemon?.name"></v-card-title>
    <v-card-subtitle v-text="pokemon?.id"></v-card-subtitle>
    <v-img :src="pokemon?.sprites?.front_default" />
  </v-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Pokemon } from '@/types/api/pokemon'
import useDetail from '@/stores/detail'
import { db } from '@/stores/db'
import usePokemonSelection from '@/stores/pokemonSelection'

const { get } = useDetail<Pokemon>(db.pokemon)
const { selected } = usePokemonSelection()

const loading = ref(false)
const pokemon = ref<Pokemon | null>(null)

const reload = async (name: string) => {
  if (!name) {
    pokemon.value = null
    return
  }
  try {
    loading.value = true
    pokemon.value = (await get(name)) || null
  } finally {
    loading.value = false
  }
}

watch(selected, reload, { immediate: true })
</script>
