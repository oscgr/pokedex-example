<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-text>
        {{ pokemonSpeciesName }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import usePokemonDetailDialog from '@/stores/pokemonDetailDialog'

const { dialog, pokemonSpeciesName } = usePokemonDetailDialog()
</script>
