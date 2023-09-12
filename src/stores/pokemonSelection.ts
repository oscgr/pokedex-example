import { computed, ref } from 'vue'

const listSelected = ref<[string] | []>([])
export default function usePokemonSelection() {
  const selected = computed<string | null>({
    get: () => {
      return listSelected.value?.[0] || null
    },
    set: (v) => {
      listSelected.value = v ? [v] : []
    },
  })
  return {
    selected,
    listSelected,
  }
}
