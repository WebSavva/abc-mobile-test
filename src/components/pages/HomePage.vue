<template>
<teleport to="body">
  <img
    src="./../../assets/blik.png"
    alt="Blick Backgroun image"
    class="blick"
  />
</teleport>
  <the-header text="Лучшие астрологи и экстрасенсы Румынии"></the-header>
  <hero-block></hero-block>
  <story></story>
  <death-survey :questionData="surveyData[0]" :questionNumber="0" :overallQuestionNumber="surveyData.length" :setAnswer="setAnswer"></death-survey>
  <the-main-footer></the-main-footer>
</template>

<script>
import TheHeader from "./../UI/TheHeader.vue";
import HeroBlock from "../HeroBlock.vue";
import Story from "../Story.vue";
import TheMainFooter from "../TheMainFooter.vue";
import DeathSurvey from '../DeathSurvey.vue';

export default {
  components: {
    TheHeader,
    HeroBlock,
    Story,
    TheMainFooter,
    DeathSurvey,
  },
  inject:['surveyData', 'setAnswer'],
};
</script>

<style lang="scss">
@import './../../styles/module-bundle.scss';

.blick {
  position: absolute;
  top: 0rem;
  right: 0;
  width: 100%;
  max-height: 70rem;
  pointer-events: none;
}

 .moon,
  .eye {
    position: absolute;
    grid-column: unset;
    opacity: .4;
    @media only screen and (min-width:1440px) {
      transform: unset !important;
    }
  }
  .moon {
    left: 0;
    bottom: 2rem;
    width: 9rem;
    transform: translateX(-30%);
    @include respondMedia(md) {
      width: 8rem;
    }
    
  }
  .eye {
    transform: translateX(20%);
    width: 15rem;
    right: 0;
    bottom: 12%;
    @include respondMedia(md) {
      width: 14rem;
    }
  }
</style>
