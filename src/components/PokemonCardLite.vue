<template>
  <v-card :loading="loading" width="100%" height="100%">
    <v-card-title v-text="pokemonName"></v-card-title>
    <v-card-subtitle v-text="pokemon.id"></v-card-subtitle>
    <v-img :src="pokemon.sprites?.front_default" />
  </v-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { PokemonSpecies } from '@/types/api/pokemon'
import useDetail from '@/stores/detail'
import LanguageUtils from '@/utils/languageUtils'

const props = defineProps<{ name: string | number }>()

const { get } = useDetail<PokemonSpecies>('pokemon-species')

const loading = ref(false)
const pokemon = ref<Partial<PokemonSpecies>>({})

const pokemonName = computed(() => LanguageUtils.getLanguageName(pokemon.value?.names, 'fr'))

onMounted(async () => {
  try {
    loading.value = true
    pokemon.value = await get(props.name)
  } finally {
    loading.value = false
  }
})
</script>
