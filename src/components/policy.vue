<template>
    <b-modal 
        v-model="showPolicy"
        size="xl"
        classes="modal__container" 
        body-class="p-4 my-2 me-2"
        content-class="modal__block"
        title=""
        hide-footer
        scrollable
        @hidden="hidePolicy"
    >
        <div class="modal__content">
            <Privacy />
        </div>
    </b-modal>
</template>

<script>
    import Privacy from "@/components/privacy";

    export default {
        name: 'Policy',
        components: {
            Privacy
        },
        created() {

        },
        computed: {
            showPolicy() {
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
            hidePolicy() {
                this.$emit('hidePolicy');
            }
        }
    };
</script>
