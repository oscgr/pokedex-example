<template>
  <v-app>
    <v-layout>
      <v-app-bar density="comfortable">
        <span style="font-size: 40px" class="mx-auto animate-character font-ketchum">Pokémon</span>
      </v-app-bar>

      <v-main>
        <v-container>
          <PokemonList />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import PokemonList from '@/components/PokemonList/PokemonList.vue'
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
