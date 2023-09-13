<template>
    <b-modal 
        v-model="showCampaign"
        size=""
        classes="modal__container" 
        body-class="p-4 my-2 me-2"
        content-class="modal__block"
        title=""
        hide-footer
        scrollable
        @hidden="showCampaign"
    >
        <div class="modal__content">
            <div class="h3 text-center mb-4">У вас есть незаконченные настройки Рекламной Кампании</div>
        </div>
        <div class="modal__footer text-center">
            <b-button 
                size="lg" 
                variant="outline-warning" 
                class="mx-2 mt-2"
                @click="hideCampaign()"
            >
                Продолжить
            </b-button>
            <b-button 
                size="lg" 
                variant="warning"
                class="mx-2 mt-2"
                @click="newCampaign()"
            >
                Создать новую
            </b-button>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: 'CampaignNew',
        components: {
        },
        created() {
        },
        computed: {
            showCampaign() {
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
            hideCampaign() {
                this.$emit('hideCampaignNew');
            },
            newCampaign() {
                this.$store.dispatch('clearCampaign');
                this.$emit('hideCampaignNew', true);
            }
        }
    };
</script>
