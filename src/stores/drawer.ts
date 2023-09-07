import { ref } from 'vue'

// defaults to already opened
const rail = ref(false)
export default function useDrawerStore() {
  const toggle = () => {
    //
    rail.value = !rail.value
  }

  return {
    toggle,
    rail,
  }
}
