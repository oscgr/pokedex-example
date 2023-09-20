import { ref } from 'vue'

const dialog = ref(false)
const pokemonSpeciesName = ref<string | null>(null)
const usePokemonDetailDialog = () => {
  const open = (name: string) => {
    pokemonSpeciesName.value = name
    dialog.value = true
  }

  return {
    open,
    dialog,
    pokemonSpeciesName,
  }
}

export default usePokemonDetailDialog
