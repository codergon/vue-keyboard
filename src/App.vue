<template>
  <div
    class="w-screen pt-4 box-border justify-center items-center flex flex-col px-4"
  >
    <textarea
      class="h-[120px] border p-2 resize-none rounded-md border-current mb-6 w-[600px] max-w-full"
      placeholder="Type something here"
    />
    <textarea
      class="h-[120px] border p-2 resize-none rounded-md border-current mb-6 w-[600px] max-w-full"
      placeholder="You can type here as well"
    />
  </div>

  <VueKeyboard />
</template>

<script setup>
import VueKeyboard from "./VueKeyboard.vue";
</script>
