<template>
    <topBar />
    <div class="app__block campaign d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main pb-5">
            <Privacy />
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    import Privacy from '@/components/privacy';
    export default {
        name: 'privacy',
        components: {
            topBar,
            sideBar,
            Privacy,
        },
        props: {
        },
        data() {
            return {
            };
        },
        computed: {
        },
        created() {
        },
        methods: {
        }
    };
</script>
