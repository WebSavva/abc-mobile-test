<template>
  <div
    class="cta"
    data-aos="fade"
    data-aos-delay="200"
  >
    <img src="./../assets/hands.png" class="cta__img" alt="Hands image" />
    <p class="cta__message lead">
      Позвольте нам раскрыть эту волнующую тайну и
      <span class="lead--highlighted cta__message--highlighted"
        >с точностью определить дату и время вашей смерти,</span
      >
      а также предшествующую этому событию причину
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "./../styles/module-bundle.scss";
.cta {
  @extend %bordered-box;
  @include centered;
  padding: 10rem 4rem;
  position: relative;
  text-align: center;
  margin-top: 10rem;
  @include respondMedia(sm) {
    max-width: 30rem;
    margin-right: auto;
    margin-left: auto;
  }
  &__img {
    position: absolute;
    top: -7rem;
    left: 50%;
    width: 13rem;
    height: 13rem;
    transform: translateX(-50%);
    @include respondMedia(sm) {
      width: 10rem;
      height: 10rem;
      top: -5rem
    }
  }
  &__message {
    @extend %large-text;
    &--highlighted {
      @include respondMedia(sm) {
        font-weight: bold;
        font-size: 1.1em;
        display: block;
      }
    }
  }
}
</style>
