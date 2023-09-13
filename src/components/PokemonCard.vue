<template>
  <v-card :loading="loading" width="100%" min-height="80vh" height="100%">
    <v-card-title v-text="name"></v-card-title>
    <v-card-subtitle v-text="pokemon?.id"></v-card-subtitle>
    <v-hover v-slot:default="{ isHovering, props }">
      <v-img v-if="!!pokemon" v-bind="props" max-height="200" :src="isHovering ? spriteBack : sprite" />
    </v-hover>
    <v-card-text v-html="flavorText"> </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { Pokemon, PokemonSpecies } from '@/types/api/pokemon'
import useDetail from '@/stores/detail'
import { db } from '@/stores/db'
import usePokemonSelection from '@/stores/pokemonSelection'
import PokemonUtils from '@/utils/pokemonUtils'
import { Nullable } from '@/types/utils'
import LanguageUtils from '@/utils/languageUtils'

const { get } = useDetail<Pokemon>(db.pokemon)
const { get: getSpecies } = useDetail<PokemonSpecies>(db.species)
const { selected } = usePokemonSelection()

const loading = ref(false)
const pokemon = ref<Nullable<Pokemon>>(null)
const species = ref<Nullable<PokemonSpecies>>(null)

const reload = async (name: string) => {
  if (!name) {
    pokemon.value = null
    return
  }
  try {
    loading.value = true
    pokemon.value = (await get(name)) || null
    if (pokemon.value) species.value = await getSpecies(pokemon.value?.species?.name)
  } finally {
    loading.value = false
  }
}

const sprite = computed<string>(() => {
  if (!pokemon.value) return ''
  return PokemonUtils.getBestPossibleSmallSprite(pokemon.value)
})
const spriteBack = computed<string>(() => {
  if (!pokemon.value) return ''
  return PokemonUtils.getBestPossibleSmallSpriteBack(pokemon.value)
})

const name = computed<string>(() => {
  if (!species.value) return ''
  return LanguageUtils.getLanguageName(species.value.names, 'fr')
})

const flavorText = computed(() => {
  if (!species.value) return ''

  return species.value?.flavor_text_entries
    ?.filter((e) => e.language?.name === 'fr')
    .map(({ version }) => version.name)
    ?.join('<br>')
})

watch(selected, reload, { immediate: true })
</script>
