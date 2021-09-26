<template>
  <p class="trunc" ref="trunc">
    TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA
    LUI DECLARATI CA AVETI 18 ANI IMPLINITI,
  </p>
</template>

<script>
export default {
  mounted() {
    const trunc = this.$refs.trunc;
    const styles = getComputedStyle(trunc);
    trunc.style.cssText = `height:${parseFloat(styles.paddingTop) +
      2 * parseFloat(styles.lineHeight)}px;`;
    trunc.onclick = () => {
      trunc.style.height = `${trunc.scrollHeight}px`;
      trunc.scrollIntoView(false);
    };
  },
};
</script>

<style scoped lang="scss">
@import "./../styles/module-bundle.scss";

.trunc {
  text-align: center;
  cursor: pointer;
  color: $alt-secondary-font-color;
  @extend %medium-text;
  overflow: hidden;
  line-height: 1.8rem;
  margin-top: 0rem;
  align-self: end;
  @include respondMedia(md) {
    padding: 0 1rem;
    font-size: 1.2rem;
  }
}
</style>
