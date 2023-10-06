<template>
    <topBar />
    <div class="app__block reports d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main reports pb-5">
            <h1 class="reports__title">Отчеты по рекламным кампаниям</h1>
            <inDeveloping />
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    import inDeveloping from '@/components/inDeveloping';
    export default {
        name: 'reports',
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
