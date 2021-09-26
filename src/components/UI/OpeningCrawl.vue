<template>
  <audio preload="auto" loop ref="song">
    <source src="./../../assets/sw_song.mp3" type="audio/mpeg" />
  </audio>
  <button @click="toggleSong" ref="btn" :style="btnStyle" class="crawl__btn">
    <i class="crawl__icon"></i>
  </button>
  <div class="crawl">
    <div class="crawl__target">
      <div class="crawl__content" ref="content" :style="contentStyle">
        <h1>Episode VII</h1>
        <h1>
          THE FORCE AWAKENS
        </h1>
        <p>
          Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER
          has risen from the ashes of the Empire and will not rest until
          Skywalker, the last Jedi, has been destroyed.
        </p>
        <p>
          With the support of the REPUBLIC, General Leia Organa leads a brave
          RESISTANCE. She is desperate to find her brother Luke and gain his
          help in restoring peace and justice to the galaxy.
        </p>
        <p>
          Leia has sent her most daring pilot on a secret mission to Jakku,
          where an old ally has discovered a clue to Luke’s whereabouts….
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import songIcons from "./../../assets/play-icons.json";

export default {
  computed: {
    btnStyle() {
      return {
        "--icon-path": `path('${
          this.isSongPlaying ? songIcons.play : songIcons.pause
        }')`,
      };
    },
    contentStyle() {
      return {
        "--text-height": `${this.contentHeight ?? 0}px`,
      };
    },
  },
  data() {
    return {
      isSongPlaying: false,
      contentHeight: null,
    };
  },
  methods: {
    toggleSong() {
      this.isSongPlaying = !this.isSongPlaying;
      this.isSongPlaying ? this.$refs.song.play() : this.$refs.song.pause();
    },
  },
  mounted() {
    this.contentHeight = this.$refs.content.scrollHeight;
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=News+Cycle:wght@400;700&display=swap");
@import "./../../styles/module-bundle.scss";

.crawl {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: -1;
  left: 0;
  right: 0;
  overflow: hidden;
  &__audio {
    opacity: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
  }
  &__target {
    color: yellow;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    font-family: sans-serif;
    transform: perspective(500px) rotateX(20deg);
  }
  &__btn {
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 1000;
    @include respondMedia(sm) {
       top: unset;
       bottom: 1rem;
      }
  }
  &__icon {
    --size: 50px;
    display: block;
    width: var(--size);
    background: rgba(255, 255, 0, 0.753);
    height: var(--size);
    transition: clip-path 1s;
    clip-path: var(--icon-path);
    @include respondMedia(sm) {
        transform: scale(.7);
      }
  }
  &__content {
    font-size: 30px;
    font-family: "News Cycle", sans-serif;
    margin-left: auto;
    margin-right: auto;
    max-width: 50vw;
    animation: autoscroll 28s linear infinite;
      @include respondMedia(sm) {
        font-size: 23px;
        max-width: 80vw;
      }
    & * {
      line-height: 1.5em;
    }
    p {
      text-align: justify;
      margin: 50px auto;
      width: 80%;
    }
  }
}

@keyframes autoscroll {
  from {
    margin-top: calc(var(--text-height) / 1.4 );
  }
  to {
    margin-top: calc(-1.2 * var(--text-height));
  }
}
</style>
