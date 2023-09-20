<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card v-bind="props" density="comfortable" rounded="xl" :elevation="isHovering ? 12 : 2" @click="open(name)" :class="{ 'on-hover': isHovering }">
        <v-card-text class="text-center">
          <v-overlay>toot</v-overlay>
          <v-progress-circular color="primary" size="120" indeterminate width="1" v-if="loading" />
          <v-img height="120px" v-else :src="pokemonSprite"></v-img>
        </v-card-text>
        <v-card-actions class="justify-center" v-show="!loading">
          <div v-text="pokemonTranslatedName" />
          <div class="text-grey" v-text="`#${pokemon?.id}`" />
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>
<script lang="ts" setup>
import useDetail from '@/stores/detail'
import { Pokemon, PokemonSpecies } from '@/types/api/pokemon'
import { computed, onMounted, ref } from 'vue'
import LanguageUtils from '@/utils/languageUtils'
import { Nullable } from '@/types/utils'
import { db } from '@/stores/db'
import PokemonUtils from '@/utils/pokemonUtils'
import usePokemonDetailDialog from '@/stores/pokemonDetailDialog'

const props = defineProps<{ name: string }>()

const { get } = useDetail<Pokemon>(db.pokemon)
const { get: getSpecies } = useDetail<PokemonSpecies>(db.species)
const { open } = usePokemonDetailDialog()

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
    if (pokemon.value) species.value = (await getSpecies(pokemon.value?.species.name)) || null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.v-card {
  transition: opacity 1s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
