<template>
  <div class="loader">
    <div class="loader__icon">
      <microphone-icon></microphone-icon>
    </div>
      <div class="loader__bar">
          <div class="loader__bar--filled" :style="{width: `${progress}%`}"></div>
      </div>
      <p class="loader__info">
          <span class="loader__progress">{{progress}} %</span>
          <span class="loader__details">Запись сообщения</span>
      </p>
  </div>
</template>

<script>
import MicrophoneIcon from "./MicrophoneIcon.vue";
export default {
  components: {
    MicrophoneIcon,
  },
  props: {
      progress:Number,
      isRecordingLoaded:Boolean,
      startLoading: Function
  },
  mounted() {
      this.startLoading();
  }
};
</script>

<style lang="scss" scoped >
    @import './../styles/module-bundle.scss';
    .loader {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6rem;
        @include respondMedia(sm) {
                gap: 2rem;
            }
        &__icon {
            width: 35rem;
            @include respondMedia(sm) {
                width: 80vw;
            }
        }
        &__bar {
            overflow: hidden;
            position: relative;
            width: 50vw;
            background: #fff;
            border-radius: 10px;
            height: 10px;
            &--filled {
                border-radius: inherit;
                position: absolute;
                left: 0;
                height: 100%;
                top: 0;
                background: $primary-font-color;
                transition: width .3s ease-in;
            }
            @include respondMedia(sm) {
                width: 90vw;
            }
        }
        &__info {
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: 1rem;
            color: $alt-secondary-font-color;
        }

        &__progress {
            font-size: 2.5rem;
            @include respondMedia(sm) {
                font-size: 2rem;
            }
        }
        &__details {
            font-size: 2rem;
            @include respondMedia(sm) {
                font-size: 1.8rem;
            }
        }
    }
</style>
