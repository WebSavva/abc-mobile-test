<template>
  <loading-banner v-if="loading"></loading-banner>
  <section class="survey" v-else>
    <header v-if="currentQuestionData.headerText" class="survey__header">
      <div class="survey__header-wrapper">
        <h3
          class="survey__display survey__display--ordinary"
          :class="[
            'survey__display',
            `survey__display--${
              currentQuestionData.isHeaderSpecific ? 'specific' : 'ordinary'
            }`,
          ]"
        >
          {{ currentQuestionData.headerText }}
        </h3>
        <img src="./../../assets/eye.svg" alt="Eye image" class="survey__eye" />
      </div>
    </header>
    <div class="survey__content">
      <death-survey
        :overallQuestionNumber="surveyData.length"
        :questionData="currentQuestionData"
        :questionNumber="questionNumber - 1"
        :setAnswer="setAnswer"
      ></death-survey>
      <img src="./../../assets/moon.svg" alt="Eye image" class="survey__moon" />
    </div>
  </section>
</template>

<script>
import DeathSurvey from "./../DeathSurvey.vue";
import LoadingBanner from "./../UI/LoadingBanner.vue";

export default {
  components: {
    DeathSurvey,
    LoadingBanner,
  },
  inject: ["surveyData", "setAnswer"],
  props: {
    questionNumber: String,
  },
  created() {
    this.validateQuestionNumber();
    const redirectNumberPage = this.surveyData.findIndex(
      (question) => question.answer === null
    );
    if (redirectNumberPage !== this.questionNumber) {
      this.$router.push({
        name: "survey",
        params: { questionNumber: redirectNumberPage + 1 },
      });
    }
  },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    questionNumber: {
      immediate: true,
      handler() {
        this.loading = true;
        this.validateQuestionNumber();
        this.setCurrentQuestion();
        setTimeout(() => (this.loading = false), 1e3);
      },
    },
  },
  methods: {
    validateQuestionNumber() {
      if (this.questionNumber > this.surveyData.length || this.questionNumber < 1) this.$router.push('/survey/1');
    },
    setCurrentQuestion() {
      const questionIndex = this.questionNumber - 1;
      this.currentQuestionData = this.surveyData[
        questionIndex + 1 > this.surveyData.length ? 0 : questionIndex
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../styles/module-bundle.scss";

.survey {
  color: $alt-secondary-font-color;
  text-align: center;
  padding-bottom: 10rem;
  @include respondMedia(sm) {
    padding-bottom: 0;
  }
  &__header {
    padding: 1.5rem 0 5.5rem 0;
    grid-column: 1 / -1;
    border-bottom: 1px solid $alt-secondary-font-color;
    position: relative;
    @include centered;
    @include respondMedia(sm) {
      padding: 1rem;
    }
    &-wrapper {
      position: relative;
      width: 25%;
      @include respondMedia(md) {
        width: 100%;
        padding: 0.5rem 2rem;
      }
    }
  }
  &__content {
    @extend %centered-column;
    position: relative;
  }
  &__display {
    font-size: 1.8rem;
    @extend %display-heading;
    &--specific {
      color: $primary-color;
      @extend %message-box;
    }
    @include respondMedia(sm) {
      font-size: 1.5rem;
    }
  }
  &__eye,
  &__moon {
    opacity: 0.4;
  }
  &__moon {
    width: 8rem;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(-100%, 5rem);
    @include respondMedia(sm) {
      transform: translate(-30%, 8rem);
    }
  }
  &__eye {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translate(50%, 60%);
    width: 12rem;
    @include respondMedia(sm) {
      width: 10rem;
      transform: translate(40%, 20%);
    }
  }
}
</style>
