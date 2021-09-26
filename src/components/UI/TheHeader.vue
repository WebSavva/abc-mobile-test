<template>
  <header>
      <h3>{{ text }}</h3>
  </header>
</template>

<script>
export default {
    props: {
        text: String
    }
}
</script>

<style scoped lang="scss">
@import './../../styles/module-bundle.scss';
    header {
        text-align: center;
        padding: 2.5rem 0;
        border-bottom: 1px;
        color: $alt-secondary-font-color;
        @include centered;
        border-bottom: 1px solid rgba(#fff, 0.2);
        @include respondMedia(sm) {
            padding: 1.5rem .5rem;
        }
    }
    header h3 {
        @extend %medium-text;
    }
</style>