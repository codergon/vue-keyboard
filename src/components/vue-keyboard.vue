<template>
  <Interface
    :keys="keys"
    :ctrlOn="ctrlOn"
    :capsOn="capsOn"
    ref="keyboardRef"
    :shiftOn="shiftOn"
    :presskey="presskey"
    :arrowKeys="arrowKeys"
    :pressedKey="pressedKey"
    v-if="showKeyboard"
  />
</template>

<script>
import Interface from "./Interface.vue";
import { keys } from "@/assets/key-codes.json";

export default {
  components: {
    Interface,
  },
  data: () => ({
    keys,
    pasted: "",
    pressedKey: 0,
    capsOn: false,
    ctrlOn: false,
    shiftOn: false,
    showKeyboard: false,
    currentElem: undefined,
  }),

  computed: {
    arrowKeys: function () {
      // Get the arrow keys array from the list of all keys
      return keys[4].slice(-1)[0]?.arrowKeys;
    },
  },

  methods: {
    async presskey(key, elem) {
      // If no textarea is focused return
      if (!this.currentElem) return;

      let lines = this.currentElem.value.split(/\r|\n/g);

      switch (key.default) {
        case "backspace":
          // Clear selected part of the textarea if selected
          // and clear the character before cursor if not
          if (this.currentElem.selectionStart < this.currentElem.selectionEnd) {
            this.updateInput(
              this.currentElem.value.slice(0, this.currentElem.selectionStart) +
                this.currentElem.value.slice(this.currentElem.selectionEnd),
              true
            );
          } else {
            this.updateInput(
              this.ctrlOn
                ? this.currentElem.value.slice(this.currentElem.selectionEnd)
                : this.currentElem.value.slice(0, -1),
              true
            );
          }
          break;

        case "shift":
          // Toggle shift btn state
          this.shiftOn = !this.shiftOn;
          break;

        case "caps lock":
          // Toggle caps lock btn state
          this.capsOn = !this.capsOn;
          break;

        case "enter":
          // Move to a new line
          this.updateInput("\n");
          break;

        case "space":
          // Add a space to textarea value
          this.updateInput(" ");
          break;

        case "tab":
          // Add a tab to textarea value
          this.updateInput("\t");
          break;

        case "leftarrow":
          // Move textarea cursor to the left or
          // select textarea value to the left if shift is on
          if (this.ctrlOn) {
            this.currentElem.setSelectionRange(
              0,
              this.shiftOn ? this.currentElem.selectionEnd : 0
            );
            this.ctrlOn = false;
          } else {
            const start = this.currentElem.selectionStart;
            this.currentElem.setSelectionRange(
              start <= 0 ? 0 : start - 1,
              this.shiftOn
                ? this.currentElem.selectionEnd
                : start <= 0
                ? 0
                : start - 1
            );
          }
          break;

        case "rightarrow":
          // Move textarea cursor to the right or
          // select textarea value to the right if shift is on
          if (this.ctrlOn) {
            this.currentElem.setSelectionRange(
              this.shiftOn
                ? this.currentElem.selectionStart
                : this.currentElem.value.length,
              this.currentElem.value.length
            );
            this.ctrlOn = false;
          } else {
            this.currentElem.setSelectionRange(
              this.shiftOn
                ? this.currentElem.selectionStart
                : this.currentElem.selectionEnd + 1,
              this.currentElem.selectionEnd + 1
            );
          }
          break;

        case "uparrow":
          // Move textarea cursor up or
          // select textarea value upwards if shift is on
          const startPos = this.currentElem.selectionStart;
          if (startPos <= lines[0].length) {
            this.currentElem.setSelectionRange(
              0,
              this.shiftOn ? this.currentElem.selectionEnd : 0
            );
          } else if (this.ctrlOn && this.shiftOn) {
            this.currentElem.setSelectionRange(
              0,
              this.currentElem.selectionEnd
            );
            this.ctrlOn = false;
          } else {
            let len = 0;
            let line = 0;
            for (let i = 0; i < lines.length; i++) {
              if (len <= startPos) {
                line = i;
                len += lines[i].length + 1;
              }
            }
            let lenCurr = lines[line].length;
            let lenPrev = lines[line - 1].length;
            let startCurr = len - lines[line].length - 1;
            let toAdd = lenCurr - (len - startPos - 1);
            let newStart =
              startCurr - lenPrev + (toAdd < lenPrev ? toAdd : lenPrev) - 1;
            this.currentElem.setSelectionRange(
              newStart,
              this.shiftOn ? this.currentElem.selectionEnd : newStart
            );
          }
          break;

        case "downarrow":
          // Move textarea cursor down or
          // select textarea value downwards if shift is on
          const endPos = this.currentElem.selectionEnd;
          if (
            endPos >=
            this.currentElem.value.length - lines[lines.length - 1].length
          ) {
            this.currentElem.setSelectionRange(
              this.shiftOn
                ? this.currentElem.selectionStart
                : this.currentElem.value.length,
              this.currentElem.value.length
            );
          } else if (this.ctrlOn && this.shiftOn) {
            this.currentElem.setSelectionRange(
              this.currentElem.selectionStart,
              this.currentElem.value.length
            );
            this.ctrlOn = false;
          } else {
            let len = 0;
            let line = 0;
            for (let i = 0; i < lines.length; i++) {
              if (len <= endPos) {
                line = i;
                len += lines[i].length + 1;
              }
            }
            let lenCurr = lines[line].length;
            let lenNext = lines[line + 1].length;
            let toAdd = lenCurr - (len - endPos - 1);
            let newEnd = len + (toAdd < lenNext ? toAdd : lenNext);

            this.currentElem.setSelectionRange(
              this.shiftOn ? this.currentElem.selectionStart : newEnd,
              newEnd
            );
          }
          break;

        case "ctrl":
          // Toggle control btn state
          this.ctrlOn = !this.ctrlOn;
          break;

        // These keys have very little effect on textarea
        // so they don't modify the elements value
        case "fn":
        case "alt":
        case "MetaLeft":
        case "downarrow":
          break;

        default:
          if (key?.default === "a" && this.ctrlOn) {
            // Select all text in the textarea
            this.currentElem.setSelectionRange(
              0,
              this.currentElem.value.length
            );
          } else if (key?.default === "c" && this.ctrlOn) {
            // Copy selected text from textarea
            document.execCommand("copy");
          } else if (key?.default === "x" && this.ctrlOn) {
            // Cut selected text from textarea
            document.execCommand("copy");
            this.updateInput(
              this.currentElem.value.slice(0, this.currentElem.selectionStart) +
                this.currentElem.value.slice(this.currentElem.selectionEnd),
              true
            );
          } else if (key?.default === "v" && this.ctrlOn) {
            // Paste text into textarea
            try {
              this.pasted = await navigator.clipboard.readText();
            } catch (err) {
              this.pasted = "";
            }

            this.updateInput(this.pasted);
          } else if (this.shiftOn && key.type === "letter" && this.capsOn) {
            // Add default value to the textarea if
            // both shift and ctrl btns are active
            this.updateInput(key?.default);
          } else if (key.type === "letter" && this.capsOn) {
            // Add uppercase value of the key to the textarea if
            // ctrl btn is active and the key pressed is a letter
            this.updateInput(key?.shift);
          } else if (this.shiftOn) {
            // Add shift value to the textarea if
            // shift any  btn is active
            this.updateInput(key?.shift);
          } else {
            // Else add the letter or character to the textarea
            this.updateInput(key?.default);
          }
          break;
      }

      this.currentElem.focus();
    },

    // Function to modify current textarea value
    updateInput(newValue, isBksp) {
      // If no textarea is focused return
      if (this.currentElem === undefined || !this.currentElem) return;

      if (isBksp) {
        // If it is a backspace add the value passed directly
        this.currentElem.value = newValue;
      } else {
        // Otherwise add the new value between selection start
        // and end incase a part of the textarea was selected
        this.currentElem.value =
          this.currentElem.value.slice(0, this.currentElem.selectionStart) +
          newValue +
          this.currentElem.value.slice(this.currentElem.selectionEnd);
      }
    },

    // Initial setup when a textarea is focused
    inputFocused(elem) {
      this.currentElem = elem;
      elem.addEventListener("keydown", e => {
        this.pressedKey = e?.keyCode;

        if (e.keyCode === 16 && e.getModifierState("Shift"))
          this.shiftOn = true;
        if (e.keyCode === 17 && e.getModifierState("Control"))
          this.ctrlOn = true;
        if (e.keyCode === 20 && e.getModifierState("CapsLock"))
          this.capsOn = true;
      });
      elem.addEventListener("keyup", e => {
        this.pressedKey = 0;

        if (e.keyCode === 16 && !e.getModifierState("Shift"))
          this.shiftOn = false;
        if (e.keyCode === 17 && !e.getModifierState("Control"))
          this.ctrlOn = false;
        if (e.keyCode === 20 && !e.getModifierState("CapsLock"))
          this.capsOn = false;
      });
    },
    close(e) {
      if (!this.$refs.keyboardRef?.$el) return;
      if (e.target.type === "textarea") return;
      if (!this.$refs.keyboardRef?.$el?.contains(e.target)) {
        this.pressedKey = 0;
        this.capsOn = false;
        this.ctrlOn = false;
        this.shiftOn = false;
        this.currentElem = undefined;
        this.showKeyboard = false;
      }
    },
  },
  mounted() {
    // Listen to events from all textarea element on the page
    document.querySelectorAll("textarea").forEach(element => {
      element.addEventListener("focus", () => {
        this.showKeyboard = true;
        this.inputFocused(element, element.value);
      });
    });
    document.addEventListener("click", this.close);
  },
  unmounted() {
    // Remove event listener from all textarea element
    document.querySelectorAll("textarea").forEach(element => {
      element.removeEventListener("focus", () => {
        this.inputFocused(element, element.value);
      });
    });
    document.removeEventListener("click", this.close);
  },
};
</script>
