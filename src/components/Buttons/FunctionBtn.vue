<template>
  <button
    :data-active="
      (keyObj?.default === 'ctrl' && ctrlOn) || pressedKey === keyObj.code
    "
    @click="e => presskey(keyObj, e)"
    class="flex rounded overflow-hidden py-1 px-2 flex-col keyboard-btn h-full bg-white shadow-x"
    :class="[
      'size-' + keyObj?.size,
      keyObj?.default === 'MetaLeft'
        ? 'justify-center items-center'
        : 'py-1.5 md:py-1 px-2 first:items-start last:items-end  items-center',
    ]"
  >
    <!-- display text if key type is not MetaLeft or space-->
    <p v-if="keyObj?.default !== 'MetaLeft' && keyObj?.default !== 'space'">
      {{ keyObj.default }}
    </p>

    <!-- show windows icon if key type is MetaLeft-->
    <Windows icon="windows" v-if="keyObj?.default === 'MetaLeft'" />
  </button>
</template>

<script>
import Windows from "@/components/Icons/Windows.vue";
export default {
  components: {
    Windows,
  },
  props: ["keyObj", "capsOn", "ctrlOn", "shiftOn", "presskey", "pressedKey"],
};
</script>
