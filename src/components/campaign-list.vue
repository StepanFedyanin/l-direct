<template>
    <div v-if="!loader" class="w-75 d-flex justify-content-center mt-5">
        <b-spinner class="text-warning">
            <span class="visually-hidden ">Loading...</span>
        </b-spinner>
    </div>
    <div class="campaigns__list" v-else-if="campaigns.length>0">
        <div
            v-for="campaign in campaigns"
            :key="campaign.id"
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
                        <div v-if="campaign.time_schedule_data[0]?.name" class="campaigns__item-content-block">
                            <p><span>Время показов:</span> {{ this.getShowTime(campaign.time_schedule_data) }}</p>
                        </div>
                        <div class="campaigns__item-content-block">
                            <p><span>Стоимость показов:</span> {{ campaign.cost_campaign }} ₽ (выходов рекламы:
                                {{ campaign.count_view }} )</p>
                        </div>
                    </div>
                    <!--                    <div v-if="campaign.status===2" class="campaigns__item-content">-->
                    <!--                        <div class="campaigns__item-promo">-->
                    <!--                            <b-form-->
                    <!--                                class="form mb-3"-->
                    <!--                                @submit="onSubmitPromo"-->
                    <!--                            >-->
                    <!--                                <div class="row">-->
                    <!--                                    &lt;!&ndash;                <b-form-group&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    id="select-group-promo"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    class="col-12 col-sm-7 mt-auto"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    label="Промокод"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                >&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  <b-form-input&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      v-if="!promoInfo.id"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      id="select-promo"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      v-model="promoInfo.promo_code"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      name="promocode"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      size="lg"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      :placeholder="promoInfo.error || promoInfo.name"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      :disabled="showLoaderSending || showLoaderPromocode"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      :state="promoInfo.error ? false : null"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  ></b-form-input>&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  <div&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      v-else&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      class="form-control form-control-lg"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  >&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    <strong>{{ promoInfo.promo_code }} - {{ promoInfo.name }}</strong>&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  </div>&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                </b-form-group>&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                <b-form-group&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    id="select-group-promo-submit"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    class="col-12 col-sm-5 col-md-4 ms-auto mt-auto"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                >&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  <b-overlay&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      :show="showLoaderPromocode"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      rounded&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      spinner-small&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      spinner-variant="warning"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      class="d-block"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  >&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    <b-button&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                        type="submit"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                        variant="outline-warning"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                        size="lg"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                        class="w-100"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                        :disabled="showLoaderSending || true"&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    >&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                      {{ promoInfo.id ? 'Изменить' : 'Применить' }}&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                    </b-button>&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                  </b-overlay>&ndash;&gt;-->
                    <!--                                    &lt;!&ndash;                </b-form-group>&ndash;&gt;-->
                    <!--                                </div>-->
                    <!--                            </b-form>-->
                    <!--                        </div>-->
                    <!--                        <div class="campaigns__item-payment">-->
                    <!--                            <div class="campaigns__item-payment-sum">-->
                    <!--                                <span>К оплате: <strong class="text-nowrap">19 000 ₽</strong></span>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                        <b-overlay-->
                    <!--                            :show="showLoaderSending"-->
                    <!--                            rounded-->
                    <!--                            spinner-small-->
                    <!--                            spinner-variant="warning"-->
                    <!--                            class="d-block pt-3"-->
                    <!--                        >-->
                    <!--                            <b-button-->
                    <!--                                type="submit"-->
                    <!--                                variant="warning"-->
                    <!--                                class="d-block col-12"-->
                    <!--                                size="lg"-->
                    <!--                                :disabled="showLoaderPromocode"-->
                    <!--                            >-->
                    <!--                                Оплатить-->
                    <!--                            </b-button>-->
                    <!--                        </b-overlay>-->
                    <!--                    </div>-->
                    <div class="campaigns__item-content">
                        <div class="campaigns__item-content-block">
                            <p><span>Статус компании: </span>{{ campaign.status.name }}</p>
                        </div>
                        <div v-if="campaign.cost_campaign" class="campaigns__item-content-block row">
                            <p class="col-5"><span>Оплачено: </span>{{ campaign.cost_campaign }} ₽</p>
                            <p class="col-7 text-warning"><small>скидка по промокоду LRADIOTOP</small></p>
                        </div>
                        <div v-if="campaign.comment" class="campaigns__item-content-block">
                            <p><span>Комментарий L-Direct</span></p>
                            <p>{{ campaign.comment }}</p>
                        </div>
                    </div>
                </b-card>
            </div>
            <div v-if="campaign.ads_type==='audio'" class="col-12 col-xxl-7">
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
    </div>
    <div v-else class="alert alert-warning border-warning">
        <p>Для начало создайте компанию.</p>
        <b-button
            variant="warning"
            @click="$router.push({ name: 'campaign' })"
        >
            создать кампанию
        </b-button>
    </div>
</template>

<script>
import timeTable from "@/components/timeTable.vue";

export default {
    components: {
        timeTable
    },
    data() {
        return {
            showLoaderSending: false,
            showLoaderPromocode: false,
            showLoaderCamping: false
        }
    },
    props: {
        campaigns: {
            type: Array
        },
        loader: {
            type: Boolean,
        }
    },
    methods: {
        getFormattedDate(dateString) {
            return this.$helpers.formatDate(new Date(dateString), 'DD.MM.YY');
        },
        getRegions(array) {
            return array.map(item => {
                return item.regions
            }).join(', ')

        },
        getShowTime(array) {
            return array.map(item => {
                return item.name
            }).join(', ')
        },
        onSubmitPromo() {

        },
        getTypeCampaign(campaign) {
            if (campaign.ads_type?.type === "audio") return "Аудио"
            if (campaign.ads_type?.type === "text") return "Текст"
            if (campaign.ads_type?.type === "idea") return "Идея"
            else return 'Объявление'
        }
    },
    computed: {}
}
</script>