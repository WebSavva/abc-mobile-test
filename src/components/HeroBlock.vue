<template>
  <section class="hero">
    <h2 class="hero__heading" data-aos="fade">
      Точность прогноза: 97%
    </h2>
    <div class="hero__figure" data-aos="fade">
      <img
        src="./../assets/magic-circle.svg"
        alt="Border Hero Image"
        class="hero__img-border"
      />
      <img src="./../assets/hero.png" alt="Hero Image" class="hero__image" />
    </div>
    <h1 class="hero__message" data-aos="fade">
      Вас беспокоит вопрос о том,
      <span class="hero__message--highlighted"
        >когда Вы покинете этот Мир и при каких обстоятельствах?
      </span>
    </h1>
    <buttons-set class="hero__buttons" :content="['да', 'нет']" :clickHandler="redirectToSurvey"/>
    <small class="hero__details">Онлайн предсказание</small>
    <call-to-action></call-to-action>
  </section>
</template>

<script>
import ButtonsSet from "./UI/ButtonsSet.vue";
import CallToAction from "./CallToAction.vue";

export default {
  components: {
    ButtonsSet,
    CallToAction,
  },
  methods: {
    redirectToSurvey() {
      this.$router.push('/survey/1');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../styles/module-bundle.scss";
.hero {
  position: relative;
  padding: 1rem 0;
  min-height: 50rem;
  color: $alt-secondary-font-color;
  @extend %centered-column;
  grid-row-gap: 4rem;
  text-align: center;
  @include respondMedia(sm) {
    grid-row-gap: 1.5rem;
  }
  & > * {
    @include respondMedia(sm) {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }
  &__heading {
    @extend %large-text;
    @include respondMedia(sm) {
      font-size: 2.3rem;
    }
  }
  &__blick {
    position: absolute;
    top: -6rem;
    right: 0;
    width: 100%;
    max-height: 65rem;
  }
  &__figure {
    position: relative;
    width: 25rem;
    height: 25rem;
    justify-self: center;
    @include respondMedia(sm) {
      width: 20rem;
      height: 20rem;
      padding: 0;
    }
  }
  &__img-border {
    width: 100%;
    height: 100%;
  }
  &__image {
    @include absCentered;
    border-radius: 50%;
    width: 70%;
    height: 70%;
  }
  &__message {
    @extend %primary-heading;
    font-size: 2rem;
    &--highlighted {
      text-transform: uppercase;
      display: block;
    }
  }
  &__details {
    @extend %medium-text;
  }
}
</style>
