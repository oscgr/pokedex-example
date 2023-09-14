<template>
  <v-row>
    <v-col cols="12">
      <PokemonFilters />
    </v-col>
  </v-row>
  <v-infinite-scroll color="primary" @load="load">
    <v-row v-for="chunked in chunk(results, 12)" :key="chunked">
      <v-col cols="12" lg="3" md="4" sm="6" v-for="species in chunked" :key="species.name">
        <PokemonSpeciesCard :name="species.name" />
      </v-col>
    </v-row>

    <template v-slot:loading>
      <v-progress-circular color="primary" width="1" v-show="!endOfList" indeterminate> </v-progress-circular>
    </template>
  </v-infinite-scroll>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { NamedAPIResource } from '@/types/api/utility'
import { chunk } from 'lodash-es'
import PokemonFilters from '@/components/PokemonList/PokemonFilters.vue'
import useGeneration from '@/stores/generation'
import PokemonSpeciesCard from '@/components/card/PokemonSpeciesCard.vue'
import useQuery from '@/stores/query'

const page = ref(0)
const { generationOffset } = useGeneration()

const results = ref<NamedAPIResource[]>([])
const { get } = useQuery('pokemon-species')
const endOfList = ref(false)
const load = async ({ done }) => {
  if (endOfList.value) return
  page.value++
  try {
    const data = await get(page.value, generationOffset.value)

    if (data.length === 0) {
      endOfList.value = true
      done('empty')
    }
    results.value = [...results.value, ...data]
    done('ok')
  } catch (e) {
    console.error(e)
    done('error')
  }
}

onMounted(async () => {
  results.value = (await get(page.value, generationOffset.value)) || []
})

watch(generationOffset, async (offset) => {
  endOfList.value = false
  page.value = 0
  results.value = (await get(0, offset)) || []
})
</script>
