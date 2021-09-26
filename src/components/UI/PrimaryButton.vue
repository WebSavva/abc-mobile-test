<template>
  <button
    data-aos-id="btn"
    :[attributeName]="!isScrollCanceled && 'fade'"
    class="primary-btn"
    :class="{'shadow-animated': isScrollCanceled}"
    :style="style"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      required: true,
      default: 0,
    },
    fillColor: {
      type: String,
      required: false,
    },
    isScrollCanceled: {
      type:Boolean,
      required:false,
    }
  },
  computed: {
    attributeName() {
      return this.isScrollCanceled ? '' : 'data-aos'
    },
    style() {
      return {
        "--offset-shadow": `${this.offset ?? 0}%`,
        ...(this.fillColor && { "--btn-fill-color": this.fillColor }),
      };
    },
  },
};
</script>

<style lang="scss">
@import "./../../styles/module-bundle.scss";

@keyframes shadow-move {
  from {
    left: -100%;
  }

  to {
    left: 150%;
  }
}

.primary-btn {
  @extend %primary-btn;
  --btn-fill-color: linear-gradient(
    90deg,
    rgba(246, 200, 102, 0.9) -6.2%,
    rgba(254, 173, 53, 0.9) 100%
  );
  position: relative;
  width: 100%;
  background: var(--btn-fill-color);
  text-transform: capitalize;
  overflow: hidden;
  align-self: center;
  width: 80%;
  @include respondMedia(sm) {
    width: 70%;
    font-size: 1.7rem;
  }
}
.shadow-animated {
  &::after {
    @extend %defaultPseudo;
    animation: shadow-move 1.3s;
    animation-iteration-count: 2;
    top: 0;
    height: 100%;
    width: 50%;
    transform: skewX(20deg);
    left: calc(var(--offset-shadow) - 10%);
    background: linear-gradient(
      248.67deg,
      rgba(255, 255, 255, 0) 30.84%,
      rgba(255, 255, 255, 0.29) 46.06%,
      rgba(255, 255, 255, 0) 64.04%
    );
  }
}
</style>
