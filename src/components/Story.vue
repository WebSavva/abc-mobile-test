<template>
  <section
    class="story"
    data-aos="fade"
  >
    <figure class="story__figure">
      <img src="./../assets/story.jpg" class="story__image" alt="Story image" />
    </figure>
    <div class="story__overlay"></div>
    <p class="story__message lead">
      Многие не верят предсказаниям и мы решили доказать каждому,<span
        class="lead--highlighted"
        >что прогноз может изменить жизнь любого человека!</span
      >
    </p>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./../styles/module-bundle.scss";
.story {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content;
  text-align: top;
  margin: 3rem 0;
  text-align: center;
  & > * {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }
  &__overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  &__image {
    object-fit: cover;
    display: block;
    width: 100%;
    max-height: 65vh;
  }
  &__message {
    justify-self: center;
    align-self: center;
    @extend %large-text;
    width: 30%;
    @include respondMedia(md) {
      font-size: 1.7rem;
    }
    span {
      display: block;
      @include respondMedia(md) {
      font-size: 1.2em;
    }
    }
    @include respondMedia(md) {
      width: 60%;
      padding: 1rem .5rem;
    }
  }
}
</style>
