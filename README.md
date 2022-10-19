# Vue-Keyboard

Vue.js Windows QWERTY onscreen keyboard for textarea elements
![keyboard](https://ik.imagekit.io/alphaknight/Screenshot_2022-10-19_at_14.21.14_bSh9R5kDG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666185744168)

## Installation

```
npm install vue-keyboard
```

## Usage

Install the plugin into the application instance

```javascript
import App from "./App.vue";
import { createApp } from "vue";
import VueKeyboard from "vue-keyboard";

const app = createApp(App);
app.use(VueKeyboard);
app.mount("#app");
```

Render the keyboard component anywhere in your app

```javascript
<!-- App.vue -->

<template>
  ....

  <VueKeyboard />
</template>


```

## Features

On the keyboard you can:

- Navigate with arrow buttons
- Utilize the shift and arrow buttons to select all or part of the textarea's value
- Cut, copy, paste and select all text with the usual key combinations
- Use keyboard in both dark and light modes (this is based on system's scheme preference)

## Contributing

1. Fork Repo and create your feature branch: `git checkout -b my-update`
2. Commit your changes: `git commit -am 'Updated some parts'`
3. Push to the branch: `git push origin my-update`
4. Submit a pull request

## Acknowledgements

- [Keycap length and things you should know](https://www.dwarf-factory.com/keycap-length)
- [Keycap layout and size chart](https://www.keychron.com/pages/keychron-k8-keyboard-keycaps-layout-and-keycap-size-hd-picture)
