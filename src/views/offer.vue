<template>
    <topBar />
    <div class="app__block campaign d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main pb-5">
            <Offer />
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    import Offer from '@/components/offer';
    export default {
        name: 'offer',
        components: {
            topBar,
            sideBar,
            Offer,
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
