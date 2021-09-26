<template>
  <div class="message">
    <img
      src="./../assets/rune1.svg"
      class="message__decorator"
      alt="Decorator image"
    />
    <p class="message__text">
      <span>Вы, конечно, умрете.</span>
      <span>И все, с кем вы знакомы, тоже однажды умрут.</span>
    </p>
    <img
      src="./../assets/rune2.svg"
      class="message__decorator"
      alt="Decorator image"
    />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./../styles/module-bundle.scss";

.message {
  margin: 7rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30rem;
  @include respondMedia(md) {
    height: 24rem;
  }
  &__decorator {
    width: 5rem;
    align-self: center;
  }
  &__text {
    @extend %display-heading;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
}
</style>
