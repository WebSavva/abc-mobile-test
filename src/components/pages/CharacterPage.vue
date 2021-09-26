<template>
  <opening-crawl v-if="!loading"></opening-crawl>
  <loading-banner v-if="loading"></loading-banner>
  <div class="display-box" data-aos="fade" v-else>
    <div class="display-box__presentation" v-if="transformedFetchedData">
      <img
        v-if="fetchedData.image"
        :src="fetchedData.image"
        :alt="fetchedData.name"
        class="display-box__img"
      />
      <div class="display-box__description" v-if="transformedFetchedData">
        <div
          v-for="(propValue, propName) in transformedFetchedData.info"
          :key="propName"
        >
          <div class="display-box__field" v-if="!propValue.startsWith('http')">
            <span class="display-box__name">{{ propName }} :</span>
            <span class="display-box__value">{{ propValue }}</span>
          </div>
          <div class="display-box__field" v-else>
            <a :href="propValue" class="display-box__name">> {{ propName }}</a>
          </div>
        </div>
        <accordion v-for="(detailValue, detailName) in transformedFetchedData.details" :key="detailName" v-show="detailValue.length">
            <template #head>
                <p class="display-box__details-heading">{{detailName}}</p>
            </template>
            <template #body>
                <ul class="display-box__list">
                    <li v-for="(link, i) in detailValue" :key="link" class="display-box__item">
                        <a :href="link">{{detailName.slice(0, detailName.length - 1)}} {{i + 1}}</a>
                    </li>
                </ul>
            </template>
        </accordion>
      </div>
    </div>
    <p v-if="error" class="display-box__error">Ooops, something went wrong. Please, reload the page.</p>
  </div>
</template>

<script>
import LoadingBanner from "./../UI/LoadingBanner.vue";
import Accordion from './../UI/Accordion.vue';
import OpeningCrawl from './../UI/OpeningCrawl.vue';

export default {
  components: {
    LoadingBanner,
    Accordion,
    OpeningCrawl
  },
  mounted() {
    this.loadCharacterData();
  },
  data() {
    return {
      fetchedData: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    transformedFetchedData() {
      return this.fetchedData
        ? Object.entries(this.fetchedData).reduce(
            (ac, [propName, propValue]) => {
              if (propName === "created" || propName === "edited") return ac;
              ac[Array.isArray(propValue) ? "details" : "info"][
                propName.replace(/_/gi, " ")
              ] = propValue;
              return ac;
            },
            {
              details: {},
              info: {},
            }
          )
        : null;
    },
  },
  methods: {
    loadCharacterData() {
      let fetchedData;
      this.loading = true;
      this.error = null;
      fetch(
        `https://swapi.dev/api/people/${Math.floor(Math.random() * 15) + 1}/`
      )
        .then((response) => response.json())
        .then((responseData) => {
          fetchedData = responseData;
          return fetch(
            "https://akabab.github.io/starwars-api/api/all.json"
          ).then((res) => res.json());
        })
        .then((allData) => {
          const name = fetchedData.name;
          const details = allData.find(
            (characterData) => characterData.name === name
          );
          if (details) fetchedData.image = details.image;
          this.fetchedData = fetchedData;
        })
        .catch((error) => (this.error = error.message))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped lang="scss">
@import "./../../styles/module-bundle.scss";

.display-box {
  @include centered;
  padding: 4rem;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
  border: 3px solid rgba(255, 255, 0, 0.829);
  width: max-content;
  margin: 2rem auto;
    background-color: rgba(8, 8, 8, 0.575);
   @include respondMedia(sm) {
      padding: 1rem;
      width: 90vw; 
   }
  &__presentation {
    display: flex;
    gap: 2rem;
    @include respondMedia(sm) {
        gap: .5rem;
    flex-direction: column;
      }
  }
  &__description {
    flex: 1;
    padding: 1rem;
    display: grid;
    color: $primary-color;
    grid-row-gap: 1rem;
      font-size: 1.7rem;
      overflow: hidden;
      @include respondMedia(sm) {
       font-size: 1.5rem;
       grid-row-gap: .5rem;
      }
  }
  &__link {
    color: green;
  }
  &__field {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: rgba($alt-secondary-font-color, 0.7);
    @include respondMedia(sm) {
       gap: .2rem;
      }
  }

  &__name {
    font-weight: bold;
    text-transform: capitalize;
  }

  &__field {
    font-weight: 400;
  }

  &__img {
    max-width: 80vw;
    max-height: 50vh;
    filter: saturate(2.5);
    @include respondMedia(sm) {
       margin: 0 auto;
       max-width: 100%;
       max-height: 20rem;
      }
  }

  &__details-heading {
      padding: .5rem 2rem;
      color: #fff;
      font-size: 1.8rem;
      text-transform: capitalize;
      font-weight: bold;
      &::before {
          content: "+";
          margin-right: .5rem;
      }
      @include respondMedia(sm) {
       font-size: 1.5rem;
       padding: 0;
      }
  }

  &__list {
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem;
  }

  &__item {
      text-align: center;
      padding-top: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      text-transform: capitalize;
      font-size: 1.5rem;
      position: relative;
  }
  &__error {
    text-align: center;
    @extend %large-text;
    color: rgb(247, 68, 68);
    font-weight: bold;
  }
}
</style>
