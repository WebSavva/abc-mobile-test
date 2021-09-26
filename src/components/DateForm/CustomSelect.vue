<template>
  <label class="select__wrapper"  data-aos="fade">
    <select
      name="date"
      id="date"
      ref="selectInput"
      :class="{ invalid: isInvalid }"
      v-bind:value="modelValue"
      class="select"
      @input="setEnteredValue"
    >
      <option v-for="option in range" :key="option" :value="option">{{
        formatOptionText ? formatOptionText(option) : option
      }}</option>
    </select>
    <span v-if="modelValue === null" class="select__placeholder">{{
      placeholderText
    }}</span>
    <div class="select__arrow"></div>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    isInvalid: Boolean,
    name: String,
    limits: Object,
    placeholderText: String,
    formatOptionText: Function,
    areOptionsReversed:Boolean
  },
  emits: ["update:modelValue"],
  methods: {
    setEnteredValue(e) {
      this.$emit("update:modelValue", +e.target.value, this.name);
    },
  },
  computed: {
    range() {
      const range = Array.from(
        {
          length: this.limits.to - this.limits.from + 1,
        },
        (_, i) => this.limits.from + i
      );
      return  this.areOptionsReversed ? range.reverse() : range;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./../../styles/module-bundle.scss";

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }
  1.78571% {
    transform: translate(5px, 0);
  }
  3.57143% {
    transform: translate(0, 0);
  }
  5.35714% {
    transform: translate(5px, 0);
  }
  7.14286% {
    transform: translate(0, 0);
  }
  8.92857% {
    transform: translate(5px, 0);
  }
  10.71429% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.select {
  align-items: center;
  text-align: center;
  border: 1px solid black;
  border-radius: 50px;
  @extend %large-text;
  color: $primary-color;
  padding: 2rem 0;
  cursor: pointer;
  backface-visibility: hidden;
  @include respondMedia(sm) {
    padding: 1.5rem 0;
    font-size: 1.7rem;
  }
  background-image: linear-gradient(
    90deg,
    rgba(228, 228, 228, 0.9) -6.2%,
    rgba(203, 203, 203, 0.9) 100%
  );
  &.invalid {
    border: 2px solid red;
    animation: shake 4.72s ease;
    transform-origin: 50% 50%;
  }
  &__wrapper {
    width: 80%;
    position: relative;
    margin: 0 auto;
    @include respondMedia(sm) {
      width: 70%;
  }
  }

  &__placeholder {
    @include absCentered;
    @extend %large-text;
    color: $primary-color;
    text-align: center;
    pointer-events: none;
    @include respondMedia(sm) {
      font-size: 1.7rem;
    }
  }
  &__arrow {
    position: absolute;
    pointer-events: none;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 1rem;
    z-index: 100;
    background-color: $primary-color;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    @include respondMedia(sm) {
      width: 1.5rem;
      height: .6rem;
    }
  }
}
</style>
