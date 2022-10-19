<template>
  <button
    :data-active="
      (keyObj?.default === 'shift' && shiftOn) ||
      (keyObj?.default === 'caps lock' && capsOn) ||
      pressedKey === keyObj.code
    "
    @click="e => presskey(keyObj, e)"
    class="flex rounded overflow-hidden flex-col keyboard-btn h-full items-center bg-white shadow-x"
    :class="[
      'size-' + keyObj?.size,
      keyObj?.type === 'function'
        ? 'py-1.5 md:py-1 px-2 first:items-start last:items-end'
        : 'justify-center',
    ]"
  >
    <!-- display if key is not a letter and  has a shift value -->
    <p v-if="!!keyObj?.shift && keyObj?.type !== 'letter'">
      {{ shiftOn ? keyObj.shift : keyObj?.default }}
    </p>

    <!-- Toggle letter case based on shift and caps lock-->
    <p
      v-if="keyObj?.type !== 'character'"
      :class="[
        keyObj?.type === 'letter' && capsOn && shiftOn
          ? 'lowercase'
          : keyObj?.type === 'letter' && (shiftOn || capsOn)
          ? 'uppercase'
          : 'lowercase',

        keyObj?.type === 'function' && ' md:text-xs rg:text-base',
      ]"
    >
      {{ keyObj.default }}
    </p>
  </button>
</template>

<script>
export default {
  props: ["keyObj", "capsOn", "shiftOn", "presskey", "pressedKey"],
};
</script>
