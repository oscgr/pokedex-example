import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// defaults to already opened
const rail = ref(false)
const opened = ref(true)
export default function useDrawerStore() {
  const { mobile } = useDisplay()
  const toggle = () => {
    if (mobile.value) {
      opened.value = !opened.value
    } else {
      rail.value = !rail.value
    }
  }

  const watcher = (newValue: boolean) => {
    if (newValue) {
      opened.value = rail.value
      rail.value = false
    } else {
      rail.value = opened.value
      opened.value = true
    }
  }

  return {
    mobile,
    watcher,
    toggle,
    opened,
    rail,
  }
}
