<template>
  <button
    @click="e => presskey(keyObj, e)"
    :data-active="pressedKey === keyObj?.code"
    class="keyboard-btn flex flex-col rounded-sm overflow-hidden flex-1 w-full justify-center items-center bg-white shadow-x"
  >
    <Caret :angle="angle" />
  </button>
</template>

<script>
import Caret from "../Icons/Caret.vue";
export default {
  components: {
    Caret,
  },
  props: ["keyObj", "angle", "presskey", "pressedKey"],
};
</script>
