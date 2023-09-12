<template>
  <v-app>
    <v-layout>
      <v-app-bar density="comfortable">
        <v-app-bar-nav-icon icon="mdi mdi-menu" @click="toggle" />
        <span style="font-size: 40px" class="mx-auto animate-character font-ketchum">Pokédex</span>
      </v-app-bar>

      <v-navigation-drawer v-model="opened" :rail="rail" @click="rail = false" rail-width="90">
        <ListPokemon />
      </v-navigation-drawer>

      <v-main>
        <div style="height: 100%" class="px-8 py-12 d-flex justify-space-between align-center">
          <v-btn icon="mdi mdi-menu-left" flat />
          <PokemonCard class="mx-4" />
          <v-btn icon="mdi mdi-menu-right" flat />
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import useDrawerStore from '@/stores/drawer'
import { watch } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
import ListPokemon from '@/components/ListPokemon/ListPokemon.vue'

const { rail, opened, toggle, watcher, mobile } = useDrawerStore()

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
