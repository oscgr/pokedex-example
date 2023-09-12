<template>
  <v-list density="comfortable" v-model:selected="listSelected" mandatory>
    <v-list-subheader>Liste des Pokémon</v-list-subheader>
    <v-infinite-scroll color="primary" empty-text="Vous êtes arrivés au bout !" :onLoad="load">
      <ListPokemonItem v-for="pokemon in results" :key="pokemon.name" :name="pokemon.name" />
    </v-infinite-scroll>
  </v-list>
</template>
<script lang="ts" setup>
import usePokemonSelection from '@/stores/pokemonSelection'
import ListPokemonItem from '@/components/ListPokemon/ListPokemonItem.vue'
import { onMounted, ref } from 'vue'
import { NamedAPIResource } from '@/types/api/utility'
import useQuery from '@/stores/query'

const page = ref(0)

const results = ref<NamedAPIResource[]>([])
const { get } = useQuery('pokemon')
const { listSelected } = usePokemonSelection()

const load = async ({ done }) => {
  page.value++
  try {
    const data = await get(page.value)
    results.value = [...results.value, ...data]
    done('ok')
  } catch (e) {
    console.error(e)
    done('error')
  }
}

onMounted(async () => {
  results.value = (await get(page.value)) || []
})
</script>
