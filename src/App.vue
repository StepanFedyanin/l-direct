<template>
    <div class="app m--gradient">
        <router-view />
        <app-error />
        <app-loader />
    </div>
</template>

<script>
    import appError from '@/components/app-error.vue';
    import appLoader from '@/components/app-loader.vue';

    export default {
        components: {
            appError,
            appLoader
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            window.onerror = (message, source, lineno, colno, err) => {
                console.error('Window error', err.message);
                this.$store.dispatch('showError', { err });
            };
        },
        errorCaptured(err, vm, info) {
            console.error('Local error', err.message, vm, info);
            this.$store.dispatch('showError', { err });
            return false;
        }
    };
</script>
<style lang="sass">
    @import './assets/css/main.scss'
</style>