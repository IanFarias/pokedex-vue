<script>
import HiddenText from "./HiddenText.vue";
export default {
  components: { HiddenText },
  name: "ButtonIcon",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <button>
    <slot />
    <HiddenText :text="label" />
  </button>
</template>

<style scoped>
button {
  height: 40px;
  width: 44px;
  background: transparent;
  border: none;
}

button:disabled > svg {
  opacity: 0.2;
}
</style>
