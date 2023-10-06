<template>
    <div
        :class="`campaigns__item row mb-4 ${campaign.ads_type==='text'||campaign.ads_type==='idea'?'pb-3':''}`"
    >
        <div class="col-12 col-xxl-5">
            <b-card
                body-class="d-flex flex-column"
                class="campaigns__item-info mb-3"
            >
                <div class="campaigns__item-title">
                    {{ getFormattedDate(campaign.created) }} — Кампания №{{ campaign.id }}
                    <div class="campaigns__item-title-label">{{ getTypeCampaign(campaign) }}</div>
                </div>
                <div class="campaigns__item-content">
                    <p>{{ campaign.message }}</p>
                </div>
                <div v-if="campaign.ads_type?.type==='audio'||campaign.ads_type?.type==='personal'"
                     class="campaigns__item-content">
                    <div
                        v-if="campaign.campaign_schedule_data[0]?.campaign_start&&campaign.campaign_schedule_data[0]?.campaign_end"
                        class="campaigns__item-content-block">
                        <p><span>Даты проведения кампании:</span></p>
                        <p v-for="date in campaign.campaign_schedule_data"
                           :key="date.campaign_start +date.campaign_end">
                            {{
                                getFormattedDate(date?.campaign_start) + ' - ' + getFormattedDate(date?.campaign_end)
                            }}
                        </p>
                    </div>
                    <div class="campaigns__item-content-block">
                        <p><span>Регионы:</span> {{ this.getRegions(campaign.regions) }}</p>
                    </div>
                    <div v-if="campaign.time_schedule_data[0]&&campaign.ads_type?.type==='personal'"
                         class="campaigns__item-content-block">
                        <p><span>Время показов:</span> {{ this.getShowTime(campaign.time_period) }}</p>
                    </div>
                    <div class="campaigns__item-content-block">
                        <p><span>Стоимость показов:</span> {{ campaign.cost_campaign }} ₽ (выходов рекламы:
                            {{ campaign.count_view }} )</p>
                    </div>
                </div>
                <div class="campaigns__item-content">
                    <div class="campaigns__item-content-block">
                        <p><span>Статус компании: </span>{{ campaign.status.name }}</p>
                    </div>
                    <template v-if="campaign.status.status==='waiting_pay'">
                        <div class="campaigns__item-promo">
                            <b-form
                                class="form mb-3"
                                @submit="onSubmitPromo"
                            >
                                <div class="row">
                                    <b-form-group
                                        id="select-group-promo"
                                        class="col-12 col-sm-7 mt-auto"
                                        label="Промокод"
                                    >
                                        <b-form-input
                                            id="select-promo"
                                            v-model="campaign.promocode.promo_code"
                                            name="promocode"
                                            size="lg"
                                            :placeholder="campaign?.promocode?.error || campaign.promocode.promo_code"
                                            :disabled="!isChangePromoCode || showLoaderSending"
                                            :state="campaign.promocode?.error ? false : null"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        id="select-group-promo-submit"
                                        class="col-12 col-sm-5 col-md-5 ms-auto mt-auto"
                                    >
                                        <b-overlay
                                            :show="showLoaderSending"
                                            rounded
                                            spinner-small
                                            spinner-variant="warning"
                                            class="d-block"
                                        >
                                            <b-button
                                                type="submit"
                                                variant="outline-warning"
                                                size="lg"
                                                class="w-100"
                                                @click="changePromoCode"
                                                :disabled="showLoaderSending"
                                            >
                                                {{ !isChangePromoCode ? 'Изменить' : 'Применить' }}
                                            </b-button>
                                        </b-overlay>
                                    </b-form-group>
                                </div>
                            </b-form>
                        </div>
                        <div class="campaigns__item-payment">
                            <div class="campaigns__item-payment-sum">
                                    <span>К оплате: <strong
                                        class="text-nowrap">{{ campaign.cost_campaign }}</strong></span>
                            </div>
                        </div>
                        <b-overlay
                            :show="showLoaderSending"
                            rounded
                            spinner-small
                            spinner-variant="warning"
                            class="d-block pt-3"
                        >
                            <b-button
                                type="submit"
                                variant="warning"
                                class="d-block col-12"
                                size="lg"
                                :disabled="showLoaderSending"
                                @click="onSubmitPay"
                            >
                                Оплатить
                            </b-button>
                        </b-overlay>
                    </template>
                    <template v-if="campaign.status.status==='Paid'">
                        <div class="row">
                            <p class="col-5"><span>Оплачено: </span>{{ campaign.cost_campaign }} ₽</p>
                            <p class="col-7 text-warning" v-if="campaign.promocode"><small>скидка по промокоду
                                campaign.promocode</small></p>
                        </div>
                    </template>
                    <div v-if="campaign.comment" class="campaigns__item-content-block">
                        <p><span>Комментарий L-Direct</span></p>
                        <p>{{ campaign.comment }}</p>
                    </div>
                </div>
            </b-card>
        </div>
        <div v-if="campaign.ads_type.type==='audio'" class="col-12 col-xxl-7">
            <b-card
                body-class="d-flex flex-column"
                class="campaigns__item-schedule mb-3"
            >
                <div class="campaigns__item-content">
                    <p><span>График показов</span></p>
                </div>
                <timeTable
                    :show="true"
                    :idKey="campaign.id"
                    :disabledControl="true"
                    :scheduleData="campaign.time_schedule_data"
                />
            </b-card>
        </div>
    </div>
</template>

<script>
import timeTable from "@/components/timeTable.vue";
import {app} from "@/services";

export default {
    components: {
        timeTable
    },
    data() {
        return {
            showLoaderSending: false,
            showLoaderCamping: false,
            campaign: {},
            isChangePromoCode: false
        }
    },
    props: {
        campaignData: {
            type: Object
        }
    },
    methods: {
        getFormattedDate(dateString) {
            return this.$helpers.formatDate(new Date(dateString), 'DD.MM.YY');
        },
        getRegions(array, allId = false) {
            if (allId) {
                return array.map(item => item.id);
            }
            return array.map(item => {
                return item.regions
            }).join(', ')

        },
        getShowTime(array) {
            return array.map(item => {
                switch (item) {
                    case 'morning':
                        return 'Утро';
                    case 'daytime':
                        return 'День';
                    case 'evening':
                        return 'Вечер';
                }
            }).join(', ');
        },
        onSubmitPromo() {
            if (!this.isChangePromoCode) {
                app.checkPromocode(this.campaign.promocode.promo_code).then(res => {
                    this.campaign.promocode = res;
                }).catch(err => {
                    this.$store.dispatch('showError', err);
                }).finally(() => {
                    this.showLoaderSending = false;
                });
            }
        },
        getTypeCampaign(campaign) {
            if (campaign.ads_type?.type === "audio") return "Аудио"
            if (campaign.ads_type?.type === "text") return "Текст"
            if (campaign.ads_type?.type === "idea") return "Идея"
            else return 'Объявление'
        },
        changePromoCode() {
            this.isChangePromoCode = !this.isChangePromoCode;
        },
        changeObjectForPayment() {
            return {
                ...this.campaign,
                ads_type: this.campaign.ads_type.id,
                promocode: this.campaign.promocode.id,
                regions: this.getRegions(this.campaign.regions, true),
                status: this.campaign.status.id
            }
        },
        onSubmitPay() {
            app.submitCampaign(this.changeObjectForPayment()).then(res => {
                this.showLoaderSending = false;
                window.location.href = res.url
            }).catch(err => {
                this.showLoaderSending = false;
                this.$store.dispatch('showError', err);
            });
        }
    },
    computed: {},
    created() {
        this.campaign = this.campaignData;
    }
}
</script>