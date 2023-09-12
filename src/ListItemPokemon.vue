<template>
  <v-list-item density="comfortable" variant="text" :value="name" color="primary">
    <template #prepend>
      <v-img height="50px" width="50px" :src="pokemonSprite"></v-img>
    </template>
    <v-list-item-title class="pl-4">
      <span v-text="pokemonTranslatedName" />
      <span class="text-grey" v-text="`#${pokemon?.id}`" />
    </v-list-item-title>
  </v-list-item>
</template>
<script lang="ts" setup>
import useDetail from '@/stores/detail'
import { Pokemon, PokemonSpecies } from '@/types/api/pokemon'
import { computed, onMounted, ref } from 'vue'
import LanguageUtils from '@/utils/languageUtils'
import { Nullable } from '@/types/utils'
import { db } from '@/stores/db'
import PokemonUtils from '@/utils/pokemonUtils'

const props = defineProps<{ name: string }>()

const { get } = useDetail<Pokemon>(db.pokemon)
const { get: getSpecies } = useDetail<PokemonSpecies>(db.species)

const loading = ref(false)
const pokemon = ref<Nullable<Pokemon>>(null)
const species = ref<Nullable<PokemonSpecies>>(null)

const pokemonTranslatedName = computed(() => LanguageUtils.getLanguageName(species.value?.names, 'fr'))

const pokemonSprite = computed(() => {
  if (!pokemon.value) return ''
  return PokemonUtils.getBestPossibleSprite(pokemon.value)
})
onMounted(async () => {
  try {
    loading.value = true
    pokemon.value = (await get(props.name)) || null
    if (pokemon.value) species.value = (await getSpecies(pokemon.value.species.name)) || null
  } finally {
    loading.value = false
  }
})
</script>
