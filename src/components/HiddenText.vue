<script>
export default {
  name: "HiddenText",
  props: {
    text: String,
  },
};
</script>

<template>
  <span> {{ text }}</span>
</template>

<style scoped>
span {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
</style>
