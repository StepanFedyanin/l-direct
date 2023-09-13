<template>
    <b-modal 
        v-model="showContract"
        size="xl"
        classes="modal__container" 
        body-class="p-4 my-2 me-2"
        content-class="modal__block"
        title=""
        hide-footer
        scrollable
        @hidden="hideContract"
    >
        <div class="modal__content">
            <Offer />
        </div>
    </b-modal>
</template>

<script>
    import Offer from "@/components/offer";

    export default {
        name: 'Contract',
        components: {
            Offer
        },
        created() {

        },
        computed: {
            showContract() {
                return this.show;
            },
        },
        props: {
            show: {
                type: Boolean,
                default() { return false; }
            }
        },
        data() {
            return {};
        },
        methods: {
            hideContract() {
                this.$emit('hideContract');
            }
        }
    };
</script>
