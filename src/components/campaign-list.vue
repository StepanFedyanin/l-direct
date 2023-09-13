<template>
  <div class="campaigns__list" v-if="campaigns.length>0">
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
          <div v-if="campaign.ads_type!=='text'&&campaign.ads_type!=='idea'" class="campaigns__item-content">
            <div
                v-if="campaign.campaign_schedule_data[0]?.campaign_start&&campaign.campaign_schedule_data[0]?.campaign_end"
                class="campaigns__item-content-block">
              <p><span>Даты проведения кампании:</span></p>
              <p v-for="date in campaign.campaign_schedule_data" :key="date.campaign_start +date.campaign_end">
                {{ getFormattedDate(date?.campaign_start) + ' - ' + getFormattedDate(date?.campaign_end) }}
              </p>
            </div>
            <div class="campaigns__item-content-block">
              <p><span>Регионы:</span> {{ this.getRegions() }}</p>
            </div>
            <div class="campaigns__item-content-block">
              <p><span>Стоимость показов:</span> 20 000 ₽ (300 ₽ за один выход)</p>
            </div>
          </div>
          <div class="campaigns__item-content">
            <div class="campaigns__item-promo">
              <b-form
                  class="form mb-3"
                  @submit="onSubmitPromo"
              >
                <div class="row">
                  <!--                <b-form-group-->
                  <!--                    id="select-group-promo"-->
                  <!--                    class="col-12 col-sm-7 mt-auto"-->
                  <!--                    label="Промокод"-->
                  <!--                >-->
                  <!--                  <b-form-input-->
                  <!--                      v-if="!promoInfo.id"-->
                  <!--                      id="select-promo"-->
                  <!--                      v-model="promoInfo.promo_code"-->
                  <!--                      name="promocode"-->
                  <!--                      size="lg"-->
                  <!--                      :placeholder="promoInfo.error || promoInfo.name"-->
                  <!--                      :disabled="showLoaderSending || showLoaderPromocode"-->
                  <!--                      :state="promoInfo.error ? false : null"-->
                  <!--                  ></b-form-input>-->
                  <!--                  <div-->
                  <!--                      v-else-->
                  <!--                      class="form-control form-control-lg"-->
                  <!--                  >-->
                  <!--                    <strong>{{ promoInfo.promo_code }} - {{ promoInfo.name }}</strong>-->
                  <!--                  </div>-->
                  <!--                </b-form-group>-->
                  <!--                <b-form-group-->
                  <!--                    id="select-group-promo-submit"-->
                  <!--                    class="col-12 col-sm-5 col-md-4 ms-auto mt-auto"-->
                  <!--                >-->
                  <!--                  <b-overlay-->
                  <!--                      :show="showLoaderPromocode"-->
                  <!--                      rounded-->
                  <!--                      spinner-small-->
                  <!--                      spinner-variant="warning"-->
                  <!--                      class="d-block"-->
                  <!--                  >-->
                  <!--                    <b-button-->
                  <!--                        type="submit"-->
                  <!--                        variant="outline-warning"-->
                  <!--                        size="lg"-->
                  <!--                        class="w-100"-->
                  <!--                        :disabled="showLoaderSending || true"-->
                  <!--                    >-->
                  <!--                      {{ promoInfo.id ? 'Изменить' : 'Применить' }}-->
                  <!--                    </b-button>-->
                  <!--                  </b-overlay>-->
                  <!--                </b-form-group>-->
                </div>
              </b-form>


            </div>
            <div class="campaigns__item-payment">
              <div class="campaigns__item-payment-sum">
                <span>К оплате: <strong class="text-nowrap">19 000 ₽</strong></span>
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
                  :disabled="showLoaderPromocode"
              >
                Оплатить
              </b-button>
            </b-overlay>
          </div>
        </b-card>
      </div>
      <div v-if="campaign.ads_type!=='text'&&campaign.ads_type!=='idea'" class="col-12 col-xxl-7">
        <b-card
            body-class="d-flex flex-column"
            class="campaigns__item-schedule mb-3"
        >
          <div class="campaigns__item-content">
            <p><span>График показов</span></p>
          </div>
          <timeTable
              :show="campaign.time_schedule"
              :idKey="campaign.id"
              :disabledControl="true"
              :scheduleData="campaign.time_schedule_data"
          />
        </b-card>
      </div>
    </div>
  </div>
  <div v-else class="alert alert-warning border-warning">
    <p>для начало создайте компанию.</p>
    <router-link
        to="/campaign"
        class="topbar__menu-item ms-3"
    >
      создать компанию
    </router-link>
  </div>
</template>

<script>
import timeTable from "@/components/timeTable.vue";

export default {
  components: {timeTable},
  data() {
    return {
      showLoaderSending: false,
      showLoaderPromocode: false,
    }
  },
  props: {
    campaigns: {
      type: Array
    }
  },
  methods: {
    getFormattedDate(dateString) {
      return this.$helpers.formatDate(new Date(dateString), 'DD.MM.YY');
    },
    getRegions() {
      return 'какое-то значение регионов'
    },
    onSubmitPromo() {

    },
    getTypeCampaign(campaign) {
      if (campaign.ads_type === 'audio') return "Аудио"
      if (campaign.ads_type === 'text') return "Текст"
      if (campaign.ads_type === 'idea') return "Идея"
      else return 'Объявление'
    }
  },
  computed: {
  }
}
</script>