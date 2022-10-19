<template>
  <div
    class="w-full z-100 mx-auto flex flex-col min-w-[780px] max-w-[1080px] p-1 left-1/2 -translate-x-1/2 rounded-md fixed bottom-0.5 bg-[#e9edf5] dark:bg-[#0d0d0d] animate-slideUp"
  >
    <div
      class="w-full flex flex-col keyboard-container text-xs md:text-sm rg:text-base max-w-full justify-between leading-none shadow-x"
    >
      <div
        :key="ind"
        v-for="(row, ind) in keys.slice(0, -1)"
        class="flex flex-row w-full keys-row justify-between overflow-hidden shadow"
      >
        <StandardBtn
          :key="index"
          :keyObj="key"
          :capsOn="capsOn"
          :shiftOn="shiftOn"
          :presskey="presskey"
          :pressedKey="pressedKey"
          v-for="(key, index) in row"
        />
      </div>

      <!-- Bottom row of the keyboard -->
      <div
        class="flex flex-row w-full keys-row justify-between overflow-hidden shadow"
      >
        <FunctionBtn
          :key="index"
          :keyObj="key"
          :capsOn="capsOn"
          :ctrlOn="ctrlOn"
          :shiftOn="shiftOn"
          :presskey="presskey"
          :pressedKey="pressedKey"
          v-for="(key, index) in keys[4].slice(0, -1)"
        />

        <!--  Arrow buttons -->
        <ArrowBtnsX
          angle="-1"
          :keyObj="arrowKeys[0]"
          :presskey="presskey"
          :pressedKey="pressedKey"
        />
        <div
          class="flex overflow-hidden flex-col keyboard-btn h-full justify-between gap-[7%] size-1_72u bg-white shadow"
        >
          <ArrowBtnsY
            :keyObj="arrowKeys[1]"
            :presskey="presskey"
            :pressedKey="pressedKey"
          />
          <ArrowBtnsY
            angle="2"
            :keyObj="arrowKeys[2]"
            :presskey="presskey"
            :pressedKey="pressedKey"
          />
        </div>
        <ArrowBtnsX
          angle="1"
          :keyObj="arrowKeys[3]"
          :presskey="presskey"
          :pressedKey="pressedKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StandardBtn from "./Buttons/StandardBtn.vue";
import FunctionBtn from "./Buttons/FunctionBtn.vue";
import ArrowBtnsX from "./Buttons/ArrowBtnsX.vue";
import ArrowBtnsY from "./Buttons/ArrowBtnsY.vue";

export default {
  components: {
    StandardBtn,
    FunctionBtn,
    ArrowBtnsX,
    ArrowBtnsY,
  },
  props: [
    "keys",
    "capsOn",
    "ctrlOn",
    "shiftOn",
    "presskey",
    "arrowKeys",
    "pressedKey",
  ],
};
</script>

<style lang="scss" scoped>
@use "sass:math";
.keyboard-container {
  $space: 0.07;
  $width: 15+ ($space * 13);
  $oneUnit: calc((1 / $width) * 100%);
  aspect-ratio: math.div($width, 5 + ($space * 4));

  .keys-row {
    aspect-ratio: $width;
  }

  .keyboard-btn {
    @apply bg-white active:bg-neutral-200 dark:bg-[#333] dark:text-slate-200 dark:shadow-x-d dark:active:bg-[#555] dark:active:text-slate-50;

    &[data-active="true"] {
      @apply bg-neutral-200 dark:bg-[#555] dark:text-slate-50;
    }

    // normal key's %-width = $oneUnit.
    &.size-1u {
      width: $oneUnit;
    }

    // The widths of other keys with different sizes are
    // multiples of this value and are calculated below
    &.size-1_25u {
      width: $oneUnit * 1.25;
    }
    &.size-1_5u {
      width: $oneUnit * 1.5;
    }
    &.size-1_72u {
      background: none;
      width: $oneUnit * (1.75 - $space);
    }
    &.size-1_75u {
      width: $oneUnit * 1.75;
    }
    &.size-2u {
      width: $oneUnit * 2;
    }
    &.size-2_25u {
      width: $oneUnit * 2.25;
    }
    &.size-2_75u {
      width: $oneUnit * 2.75;
    }
    &.size-3_78u {
      width: $oneUnit * (3.75 + $space);
    }
    &.size-5_34u {
      width: $oneUnit * ((9.25 + 7 * ($space)) - (4 + (3 * $space)));
    }
    &.size-6_25u {
      width: $oneUnit * 6.25;
    }
  }
}
</style>
