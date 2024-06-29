<script>
export default {
  name: "TagCard",
  props: {
    tag: String,
  },
};
</script>

<template>
  <article>
    <span>{{ tag }}</span>
  </article>
</template>

<style scoped>
article {
  background-color: rgb(41, 34, 141);
  width: max-content;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
}
</style>
