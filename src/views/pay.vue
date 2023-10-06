<template>
    <topBar />
    <div class="app__block pay d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main pay pb-5">
            <h1 class="pay__title">Платные ролики</h1>
            <inDeveloping />
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    import inDeveloping from '@/components/inDeveloping';
    export default {
        name: 'pay',
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
