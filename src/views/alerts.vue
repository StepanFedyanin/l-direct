<template>
    <topBar />
    <div class="app__block home d-flex w-100 flex-row">
        <sideBar />
        <div class="app__main">
            <inDeveloping />
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    import inDeveloping from '@/components/inDeveloping';
    export default {
        name: 'alerts',
        components: {
            topBar,
            sideBar,
            inDeveloping,
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
