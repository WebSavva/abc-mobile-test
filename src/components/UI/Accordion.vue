<template>
    <div class="accordion">
        <div class="accordion__head" @click="toggle" >
            <slot name="head"></slot>
        </div>
        <div class="accordion__body" ref="body" :style="style">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        style() {
            return {height : `${this.expanded ? this.$refs.body.scrollHeight : 0}px`}
        }
    },
    data() {
        return {
            expanded:false
        }
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
}
</script>

<style scoped lang="scss">
    .accordion {

        &__head {
            padding: 1rem;
            background: gray;
            cursor: pointer;
        }
        &__body {
            background: white;
            overflow: hidden;
            transition: all .3s;
        }
    }
</style>