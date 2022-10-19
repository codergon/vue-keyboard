<template>
  <button
    @click="e => presskey(keyObj, e)"
    :data-active="pressedKey === keyObj?.code"
    class="keyboard-btn flex flex-col rounded overflow-hidden py-1 px-2 h-full justify-center items-center size-1u bg-white shadow-x"
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
