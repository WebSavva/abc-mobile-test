<template>
  <div>
    <primary-button @click="clickHandler"
      v-for="(text, i) in content"
      :key="text"
      :offset="(i / content.length) * 100"
      >{{ text }}</primary-button
    >
  </div>
</template>

<script>
import PrimaryButton from "./PrimaryButton.vue";
export default {
  props: {
    content: Array,
    clickHandler:Function
  },
  components: {
    PrimaryButton,
  },
};
</script>

<style lang="scss" scoped>
@import "./../../styles/module-bundle.scss";

div {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @include respondMedia(sm) {
    gap: 1.5rem;
  }
}
</style>
