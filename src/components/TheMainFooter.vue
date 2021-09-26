<template>
  <footer class="footer">
    <!-- <img src="./../assets/eye.svg" class="footer__eye" alt="Eye image" />
    <img src="./../assets/moon.svg" class="footer__moon" alt="moon image" /> -->
    <the-footer-message></the-footer-message>
    <truncated-footer-details></truncated-footer-details>
  </footer>
</template>

<script>
import TheFooterMessage from './TheFooterMessage.vue';
import TruncatedFooterDetails from './TruncatedFooterDetails.vue';
export default {
    components: {
        TheFooterMessage,
        TruncatedFooterDetails
    }
};
</script>

<style lang="scss" scoped>
@import "./../styles/module-bundle.scss";
.footer {
  position: relative;
  // overflow-x: hidden;
  min-height: 50vh;
  @extend %centered-column;
  @media only screen and (min-width:1440px) {
    // overflow-x: visible;
  }
  // &__moon,
  // &__eye {
  //   position: absolute;
  //   grid-column: unset;
  //   opacity: .4;
  // }
  // &__moon {
  //   left: 0;
  //   bottom: 5%;
  //   width: 11rem;
  //   transform: translateX(-25%);
  //   @include respondMedia(md) {
  //     width: 8rem;
  //   }
  // }
  // &__eye {
  //   transform: translateX(40%);
  //   width: 18rem;
  //   right: 0;
  //   top: 0;
  //   @include respondMedia(md) {
  //     width: 14rem;
  //   }
  // }
}
</style>
