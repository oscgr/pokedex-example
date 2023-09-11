<template>
  <v-app>
    <v-layout>
      <v-app-bar density="comfortable">
        <v-app-bar-nav-icon icon="mdi mdi-menu" @click="toggle" />
        <span style="font-size: 40px" class="mx-auto animate-character font-ketchum">Pokédex</span>
      </v-app-bar>

      <v-navigation-drawer v-model="opened" :rail="rail" @click="rail = false">
        <v-list density="comfortable" nav>
          <ListItemPokemon v-for="pokemon in results" :key="pokemon.name" :name="pokemon.name" />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <div style="height: 100%" class="px-8 py-12 d-flex justify-space-between align-center">
          <v-btn icon="mdi mdi-menu-left" flat />
          <PokemonCardLite class="mx-4" name="pidgeotto" />
          <v-btn icon="mdi mdi-menu-right" flat />
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import useDrawerStore from '@/stores/drawer'
import useQuery from '@/stores/query'
import { onMounted, ref, watch } from 'vue'
import { NamedAPIResource } from '@/types/api/utility'
import PokemonCardLite from '@/components/PokemonCardLite.vue'
import ListItemPokemon from '@/ListItemPokemon.vue'

const { rail, opened, toggle, watcher, mobile } = useDrawerStore()

const results = ref<NamedAPIResource[]>([])
const { get } = useQuery('pokemon')

onMounted(async () => {
  results.value = await get(0)
})

watch(mobile, watcher)
</script>

<style>
.animate-character {
  text-transform: uppercase;
  background-image: linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear;
  display: inline-block;
  font-size: 190px;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}
</style>
