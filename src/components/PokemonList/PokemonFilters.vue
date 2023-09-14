<template>
  <v-row>
    <v-col cols="12" lg="3" md="4" sm="6">
      <v-select v-model="generationFilter" hide-details rounded="xl" label="Générations" density="compact" :items="generationItems" variant="solo" />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import useGeneration from '@/stores/generation'

const { loadGenerations, watcher, generationFilter, generations } = useGeneration()

const generationItems = computed(() =>
  generations.value.map((gen) => ({
    ...gen,
    props: {
      subtitle: `${gen.pokemonSpeciesIds[0]} - ${gen.pokemonSpeciesIds[1]}`,
    },
  })),
)

watch(generationFilter, watcher, { immediate: true })

onMounted(() => {
  loadGenerations()
})
</script>
