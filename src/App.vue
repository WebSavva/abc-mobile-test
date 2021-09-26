<template>
  <div id="app" ref="app">
    <router-view></router-view>
  </div>
</template>

<script>
import surveyData from "./survey-data.json";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  provide() {
    return {
      surveyData: this.surveyData,
      setAnswer: this.setAnswer,
    };
  },
  data() {
    return {
      surveyData,
      images: [],
    };
  },
  mounted() {
    AOS.init({
      duration: 2e3,
      once:true
    });
    document.addEventListener("aos:in:btn", ({ detail }) => {
      detail.classList.add("shadow-animated");
    });
    this.images = [this.createImg("eye"), this.createImg("moon")];
    this.images[0].src = require("./assets/eye.svg");
    this.images[1].src = require("./assets/moon.svg");
  },
  watch: {
    birthday() {
      this.chooseSpeficiHeaderText();
    },
    $route() {
      if (this.$route.path === "/") {
        this.$refs.app.append(...this.images);
      } else {
        this.images.forEach((img) => img.remove());
      }
    },
  },
  computed: {
    birthday() {
      return this.surveyData[2].answer;
    },
  },
  methods: {
    createImg(className) {
      const img = document.createElement("img");
      img.classList.add(className);
      return img;
    },
    setAnswer(questionNumber, option) {
      this.surveyData[questionNumber].answer = option;
    },
    chooseSpeficiHeaderText() {
      const age = this.calculateAge(this.birthday);
      let specificHeaderOption;
      switch (true) {
        case age >= 46:
          specificHeaderOption = 2;
          break;
        case age >= 36 && age <= 45:
          specificHeaderOption = 1;
          break;
        case age <= 35 && age >= 18:
        default:
          specificHeaderOption = 0;
          break;
      }
      this.surveyData[4].headerText = this.surveyData[4].headerTextOptions[
        specificHeaderOption
      ];
    },
    calculateAge(birthday) {
      if (!birthday) return null;
      const ageDifMs = Date.now() - birthday;
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },
};
</script>

<style lang="scss">
@import "./styles/index.scss";

body {
  background-color: $primary-color;
  position: relative;
}

#app {
  position: relative;
  width: 100%;
  min-height: 100vh;
  font-family: $primary-font;
  color: $secondary-font-color;
  font-weight: 300;
  overflow-x: hidden;
  @media only screen and (min-width: 1440px) {
    max-width: 1440px;
    margin: 0 auto;
    overflow-x: unset;
  }
}
</style>
