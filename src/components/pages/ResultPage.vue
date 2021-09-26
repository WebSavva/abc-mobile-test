<template>
  <record-load-banner
    v-if="!loadingState.isRecordingLoaded"
    :isRecordingLoaded="loadingState.isRecordingLoaded"
    :progress="loadingState.progress"
    :startLoading="startLoading"
  ></record-load-banner>
  <div v-else class="result">
    <h1 class="result__message">
      Спасибо за ваши ответы!
      <strong class="result--strong"
        >Мы подготовили для Вас персональную аудио запись с Вашим
        прогнозом.</strong
      >
    </h1>
    <p class="result__lead result__lead--small">
      Вы можете узнать, как повлиять на события, которые ожидают вас в ближайшем
      будущем.
    </p>
    <p class="result__call">
      <span class="result__call--highlighted"
        >Первое значимое событие может произойти уже {{new Date(Date.now() + (1e3 * 60 * 60 * 24) ).toLocaleDateString('ru-RU')}},</span
      >
      Вам надо быть готовым, чтобы последствия не оказались необратимыми.
    </p>
    <p class="result__lead">
        Нажмите на кнопку ниже прямо сейчас и наберите наш номер телефона. Прослушайте важную информацию!
    </p>
    <primary-button :isScrollCanceled="true" fillColor="#4CD964" class="result__btn" @click="$router.push('/character')">Позвонить и прослушать</primary-button>
  <truncated-footer-details></truncated-footer-details>
  </div>
</template>

<script>
import RecordLoadBanner from "./../RecordLoadBanner.vue";
import PrimaryButton from './../UI/PrimaryButton.vue';
import TruncatedFooterDetails from './../TruncatedFooterDetails.vue';

export default {
  components: {
    RecordLoadBanner,
    PrimaryButton,
    TruncatedFooterDetails
  },
  inject: ["surveyData"],
  data() {
    return {
      loadingState: {
        progress: 0,
        isRecordingLoaded: false,
        loaderTimer: null,
      },
    };
  },
  beforeMount() {
      if (this.surveyData.some(question => question.answer === null)) this.$router.push('/survey/1');
  },
  methods: {
    startLoading() {
      this.loadingState.loaderTimer = setInterval(
        this.increaseProgress.bind(this),
        5e2
      );
    },
    increaseProgress() {
      const nextProgressValue = this.loadingState.progress + 10;
      if (nextProgressValue > 100) {
        clearInterval(this.loadingState.loaderTimer);
        this.loadingState.isRecordingLoaded = true;
      } else {
        this.loadingState.progress = nextProgressValue;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../../styles/module-bundle.scss";

.result {
  @extend %centered-column;
  padding-top: 2rem;
  text-align: center;
  grid-row-gap: 2rem;
  min-height: 100vh;
  @include respondMedia(sm) {
        grid-row-gap: .7rem;
      }
  & * {
      @extend %large-text;
      @include respondMedia(sm) {
        font-size: 1.6rem;
      }
  }
  &__message {
    @extend %message-box;
    color: $primary-color;
    margin-bottom: 2rem;
  }

  &--strong {
    font-weight: bold;
    display: block;
  }
  &__lead {
      color: #fff;
      @include respondMedia(sm) {
        padding: 0 1rem;
      }
    &--small {
        width: 80%;
        margin: 0 auto;
    }
  }
  &__btn {
    text-transform:unset;
    margin: 0 auto;
    width: 90%;
  }
  &__call {
    @extend %bordered-box;
    padding: 4rem 3rem;
    color: $primary-font-color;
    &--highlighted {
        text-transform: uppercase;
        font-weight: bold;
        display: block;
    }
    @include respondMedia(sm) {
        max-width: 30rem;
        margin: 0 auto;
      }
  }

}
</style>
