<template>
  <v-app>
    <v-layout>
      <v-app-bar density="comfortable" absolute="">
        <template #title>
          <span style="font-size: 40px" class="text-primary mx-auto font-ketchum">Pokédex</span>
        </template>
        <template #append>
          <v-btn :icon="theme.global.current.value.dark ? 'mdi mdi-moon-waning-crescent' : 'mdi mdi-weather-sunny'" @click="toggleTheme" />
        </template>
      </v-app-bar>

      <v-main>
        <v-container>
          <PokemonList />
        </v-container>
      </v-main>
    </v-layout>
    <PokemonDetailDialog />
  </v-app>
</template>

<script setup lang="ts">
import PokemonList from '@/components/PokemonList/PokemonList.vue'
import { useDark } from '@vueuse/core'
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
import PokemonDetailDialog from '@/components/dialog/PokemonDetailDialog.vue'

const dark = useDark()
const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
onMounted(() => {
  theme.global.name.value = dark.value ? 'dark' : 'light'
  console.log(dark.value)
})
</script>
