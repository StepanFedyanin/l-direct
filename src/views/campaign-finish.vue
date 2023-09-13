<template>

    <div class="campaign__finish">
        <b-card
            class="mb-5"
        >
            <div
                v-if="payment && payment.status === 'done'"
                class="text-black"
            >
                Ваша рекламная кампания успешно добавлена. После прохождения модерации Ваша рекламная кампания будет включена в эфир трансляции.
            </div>
            <div
                v-else-if="payment && payment.status === 'fail'"
                class="text-black"
            >
                Не удалось оплатить рекламную кампанию. Попробуйте снова.
            </div>
            <div
                v-else
                class="text-black"
            >
                Ваши данные отправлены. Наш менеджер свяжется с Вами в ближайшее время.
            </div>
        </b-card>
    </div>
</template>

<script>
    import { app } from "@/services";

    export default {
        name: 'campaignFinish',
        components: {
        },
        props: {
        },
        data() {
            return {
                campaign: null,
                payment: null
            };
        },
        computed: {
            query() {
                return this.$route.query
            },
        },
        created() {
            this.campaign = this.$store.state.campaign;
            this.$store.dispatch('clearCampaign');
            this.checkCampaignPayment();
        },
        methods: {
            next() {
                //this.$router.push({ name: 'campaignAdded' });
            },
            checkCampaignPayment() {
                if (this.query && this.query.InvId) {
                    this.$store.dispatch('showLoader', {label: 'Проверка оплаты'});
                    app.checkPayment(this.query).then(res => {
                        this.payment = res;
                        this.$store.dispatch('hideLoader');
                    }).catch(err => {
                        this.$store.dispatch('showError', err);
                        this.$store.dispatch('hideLoader');
                        console.error(err.status);
                    }).finally(() => {
                        this.$store.dispatch('hideLoader');
                    });
                }
            }
        }
    };
</script>
