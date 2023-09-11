<template>
  <v-list-item density="comfortable" variant="elevated">
    <template #prepend>
      <v-img height="50px" width="50px" :src="pokemon?.sprites?.front_default"></v-img>
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

const props = defineProps<{ name: string }>()

const { get } = useDetail<Pokemon>('pokemon')
const { get: getSpecies } = useDetail<PokemonSpecies>('pokemon-species')

const loading = ref(false)
const pokemon = ref<Nullable<Pokemon>>(null)
const species = ref<Nullable<PokemonSpecies>>(null)

const pokemonTranslatedName = computed(() => LanguageUtils.getLanguageName(species.value?.names, 'fr'))

onMounted(async () => {
  try {
    loading.value = true
    pokemon.value = await get(props.name)
    species.value = await getSpecies(pokemon.value.species.name)
  } finally {
    loading.value = false
  }
})
</script>
