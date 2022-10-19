<template>
  <svg
    :style="{
      transform: 'rotate(' + (!isNaN(angle) ? Number(angle) * 90 : 0) + 'deg)',
    }"
    width="26"
    height="14"
    fill="none"
    viewBox="0 0 26 14"
    class="w-[8px] md:w-[10px] lg:w-[12px]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 13L13 1L25 13"
      class="stroke-[#555] dark:stroke-slate-200"
      stroke-width="2.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: ["angle"],
};
</script>
