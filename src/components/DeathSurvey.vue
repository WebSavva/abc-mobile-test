<template>
  <div class="question">
    <h3 class="question__heading">{{ questionData.questionText }}</h3>
    <date-form
      v-if="questionData.isCustomForm"
      :submitHandler="selectOption"
    ></date-form>
    <div class="question__options" v-else>
      <primary-button
        v-for="(option, i) in questionData.options"
        :offset="(i / questionData.options.length) * 100"
        :key="option"
        @click="selectOption(i)"
        >{{ option }}</primary-button
      >
    </div>
    <small class="question__detail"
      >Вопрос {{ displayedQuestionNumber }}-{{ overallQuestionNumber }}</small
    >
  </div>
</template>

<script>
import PrimaryButton from "./UI/PrimaryButton.vue";
import DateForm from "./DateForm/DateForm.vue";

export default {
  components: {
    PrimaryButton,
    DateForm,
  },
  props: {
    questionData: Object,
    questionNumber: Number,
    setAnswer: Function,
    overallQuestionNumber: Number,
  },
  computed: {
    displayedQuestionNumber() {
      return +this.questionNumber + 1;
    },
  },
  methods: {
    selectOption(option) {
      this.setAnswer(this.questionNumber, option);
      const nextQuestionNumber = this.displayedQuestionNumber + 1;
      let params;
      let pathName;
      if (nextQuestionNumber > this.overallQuestionNumber) {
        params = pathName = "result";
      } else {
        params = nextQuestionNumber;
        pathName = "survey";
      }
      this.$router.push({ name: pathName, params: { questionNumber: params } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/module-bundle.scss";

.question {
  @extend %centered-column;
  text-align: center;
  margin-top: 3rem;
  grid-row-gap: 2rem;
  @include respondMedia(sm) {
    margin-top: 1rem;
  }
  &__heading {
    margin-bottom: 3rem;
    @extend %primary-heading;
    text-transform: uppercase;
    @include respondMedia(sm) {
      font-size: 1.7rem;
      margin-bottom: 1rem;
      padding: .5rem;
    }
  }
  &__options {
    @include verticalCentered(2rem);
    @include respondMedia(sm) {
      gap: 1.5rem;
    }
  }
  &__detail {
    @extend %small-text;
  }
}
</style>
