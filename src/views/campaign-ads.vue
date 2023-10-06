<template>
    <div class="campaign__ads">
        <div
            class="campaign__ads-block mb-4 row"
        >
            <div
                v-for="type in camaignTypes"
                :key="type.id+type.type"
                class="col-12 col-md-6 col-lg-6 mb-4"
                @click="selectAdsType(type.type)"
            >
                <b-card
                    body-class="d-flex flex-column"
                    :class="campaign.ads_type === type.type ? 'is-active' : ''"
                    class="campaign__ads-item h-100"
                >
                    <b-card-title
                        class="text-uppercase"
                    >
                        {{ type.title }}
                    </b-card-title>
                    <b-card-text
                        class="mt-auto pt-2 pb-4"
                    >
                        {{ type.description }}
                    </b-card-text>
                    <b-card-text
                        class="mt-auto"
                    >
                        Стоимость показов: <span class="text-warning">{{ type.display_price }}</span>
                    </b-card-text>
                </b-card>
            </div>
            <b-overlay
                :show="showLoaderType"
                no-wrap
                spinner-variant="warning"
            />
        </div>
        <div
            v-if="campaign.ads_type != null"
            class="campaign__ads-form"
        >
            <b-form
                class="form"
                @submit="onSubmit"
                v-for="type in camaignTypes"
                :key="type.id+type.type"
            >
                <b-card
                    body-class="d-flex flex-column"
                    class="position-relative overflow-hidden"
                    v-if="campaign.ads_type===type.type"
                >
                    <b-card-text>
                        <strong>Оставьте данные, чтобы менеджер мог связаться с вами</strong><br>
                        Настройте кампанию со специалистом L-direct
                    </b-card-text>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-person"
                                class="w-100 mt-auto"
                                label="Ваше имя"
                            >
                                <b-form-input
                                    id="input-person"
                                    v-model="campaign.user_name"
                                    required
                                    size="lg"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                id="select-group-phone"
                                class="w-100 mt-auto"
                                label="Ваш телефон"
                            >
                                <b-form-input
                                    id="select-phone"
                                    v-model="campaign.phone"
                                    required
                                    size="lg"
                                    v-maska
                                    data-maska="+7##########"
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-message"
                                class="w-100 mt-auto"
                                :label="type.details||'Ваш комментарий'"
                            >
                                <b-form-textarea
                                    id="input-message"
                                    v-model="campaign.message"
                                    required
                                    size="lg"
                                ></b-form-textarea>
                            </b-form-group>
                        </div>
                    </div>
                    <div class="d-flex mb-4">
                        <b-form-checkbox
                            name="agreement"
                            required
                        >
                            <small>Я <a href="#" @click.prevent="showPolicy">ознакомлен и согласен</a> с условиями
                                политики
                                обработки персональных данных и конфиденциальности.</small>
                        </b-form-checkbox>
                    </div>
                    <b-overlay
                        :show="showLoaderSending"
                        no-wrap
                        spinner-variant="warning"
                    />
                    <b-button
                        type="submit"
                        variant="warning"
                        class="d-block col-12"
                        size="lg"
                        v-if="this.checkIsNextStep()"
                    >
                        Создать
                    </b-button>
                    <b-button
                        type="submit"
                        variant="warning"
                        class="d-block col-12"
                        size="lg"
                        v-else
                    >
                        Продолжить
                    </b-button>
                </b-card>
            </b-form>
        </div>
        <CampaignNew
            :show="showModalCampaignNew"
            @hideCampaignNew="hideCampaignNew"
        />
        <Policy
            :show="showModalPolicy"
            @hidePolicy="hidePolicy"
        />
    </div>
</template>

<script>
import {app} from "@/services";
import CampaignNew from "@/components/campaign-new";
import Policy from "@/components/policy";

export default {
    name: 'campaignAds',
    components: {
        CampaignNew,
        Policy
    },
    props: {
        step: {
            type: Number,
            default() {
                return null;
            }
        }
    },
    data() {
        return {
            campaign: null,
            showModalPolicy: false,
            showModalCampaignNew: false,
            showPrice: false,
            camaignTypes: [],
            showLoaderSending: false,
            showLoaderType: false
        };
    },
    created() {
        this.campaign = this.$store.state.campaign;
        this.bearerToken = this.$store.state.access;
        this.showLoaderType = true;
        if (Number(this.campaign.cost_campaign) || this.campaign.cost_campaign === 0) {
            this.showModalCampaignNew = true;
        }
        app.getCamaignType().then(res => {
            this.camaignTypes = res;
            this.showLoaderType = false
        });
    },
    methods: {
        selectAdsType(type) {
            if (this.showLoaderSending) {
                return;
            }
            this.campaign.ads_type = type;

        },
        hideCampaignNew(confirm = false) {
            this.showModalCampaignNew = false;
            if (confirm) {
                this.$store.dispatch('clearCampaign');
                this.campaign = this.$store.state.campaign;
            } else {
                this.campaign = this.$store.state.campaign;
                let nextViews = ''
                switch (this.campaign.step) {
                    case 1:
                        nextViews = 'campaignAds'
                        break;
                    case 2:
                        nextViews = 'campaignProps'
                        break;
                    case 3:
                        nextViews = 'campaignPay'
                        break;
                    case 4:
                        nextViews = 'campaignFinish'
                        break;
                }
                this.next(nextViews);
            }
        },
        showPolicy() {
            this.showModalPolicy = true;
        },
        hidePolicy() {
            this.showModalPolicy = false;
        },
        checkIsNextStep() {
            return this.campaign.ads_type === 'text' || this.campaign.ads_type === 'idea'
        },
        onSubmit() {

            if (this.checkIsNextStep()) {
                this.showLoaderSending = true;
                app.sendAdsInfo(this.$helpers.removeKeys({
                    ...this.campaign,
                    status: 'New'
                }, ['step'])).then(() => {
                    this.$store.dispatch('clearCampaign');
                    this.campaign = this.$store.state.campaign;
                    this.next('campaignFinish');
                }).catch(err => {
                    this.showLoaderSending = false;
                    this.$store.dispatch('showError', err);
                }).finally(() => {
                    this.showLoaderSending = false;
                })
            } else {
                this.$store.dispatch('setCampaignStep', {campaign_step: 3});
                this.$store.dispatch('updateCampaign', {
                    campaign: {
                        ...this.campaign,
                        step: 2,
                    }
                });
                this.next();
            }
        },
        next(name) {
            this.$router.push({name: name || 'campaignProps'});
        },
    }
}
;
</script>
