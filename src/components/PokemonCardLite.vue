<template>
  <v-card>
    <v-card-title v-text="pokemon.name"></v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import usePokemon from '@/stores/pokemon'

const props = defineProps<{ pokemonId: string | number }>()

const { getPokemon } = usePokemon()

const loading = ref(false)
const pokemon = ref({})

onMounted(async () => {
  pokemon.value = await getPokemon(props.pokemonId)
  console.log(pokemon.value)
})
</script>
