<template lang="pug">
    transition(name="fade")
        .loading(v-if="loading" )
            img(src="@/assets/svg/loading-coffee.svg" alt="" :class="loading?'':'hide'")
</template>

<script>
export default {
    name: 'loading',
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
    },
}
</script>

<style scoped lang="stylus">
.loading {
    position fixed
    left 0
    top 0
    width 100%
    height 100vh
    display flex
    align-items center
    justify-content center
    z-index 1000
    background #fff
    img {
        transition 0.5s
        width 8rem
    }
}
.fade-enter-active, .fade-leave-active {
    transition opacity 0.5s
}
.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
    opacity 0
    img {
        transform scale(0)
    }
}
</style>
