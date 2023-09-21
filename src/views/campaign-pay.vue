<template>

  <div class="campaign__pay">
    <div
        v-if="amount"
    >
      <label class="h5 text-black mb-3"><strong>Итоговая стоимость</strong></label>
      <b-card
          class="mb-5"
      >
        <div
            class="h2 text-uppercase m-0 text-black"
        >
          <strong>{{ campaign.cost_campaign }} ₽</strong>
        </div>
      </b-card>
    </div>

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
              v-if="!promoInfo.id"
              id="select-promo"
              v-model="promoInfo.promo_code"
              name="promocode"
              size="lg"
              :placeholder="promoInfo.error || promoInfo.name"
              :disabled="showLoaderSending || showLoaderPromocode"
              :state="promoInfo.error ? false : null"
          ></b-form-input>
          <div
              v-else
              class="form-control form-control-lg"
          >
            <strong>{{ promoInfo.promo_code }} - {{ promoInfo.name }}</strong>
          </div>
        </b-form-group>
        <b-form-group
            id="select-group-promo-submit"
            class="col-12 col-sm-5 col-md-4 ms-auto mt-auto"
        >
          <b-overlay
              :show="showLoaderPromocode"
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
                :disabled="showLoaderSending || !promoInfo.promo_code"
            >
              {{ promoInfo.id ? 'Изменить' : 'Применить' }}
            </b-button>
          </b-overlay>
        </b-form-group>
      </div>
    </b-form>

    <b-form
        class="form position-relative"
        @submit="onSubmit"
    >
      <div class="row">
        <label class="form-label text-black"><strong>Уведомления</strong></label>
        <b-form-group
            id="select-group-email"
            class="col-12 col-sm-7 mt-auto"
            label="Адрес для почтовых уведомлений"
        >
          <b-form-input
              id="select-email"
              v-model="campaign.notification_email"
              name="notification_email"
              type="email"
              placeholder="mail@yandex.ru"
              size="lg"
              :disabled="showLoaderSending || showLoaderPromocode"
          ></b-form-input>
        </b-form-group>
      </div>

      <div
          v-show="showNotification"
          class="row mb-2"
      >
        <div class="col-12">
          <b-form-checkbox
              v-model="campaign.notification_moderate"
              name="notification_modearte"
              switch
              :disabled="showLoaderSending || showLoaderPromocode"
          >
            Модерация рекламной кампании
          </b-form-checkbox>
        </div>
      </div>

      <div
          v-show="showNotification"
          class="row"
      >
        <div class="col-12">
          <b-form-checkbox
              v-model="campaign.notification_campaign_end"
              name="notification_campaign_end"
              switch
              :disabled="showLoaderSending || showLoaderPromocode"
          >
            Окончание рекламной кампании
          </b-form-checkbox>
        </div>
      </div>

      <b-overlay
          :show="showLoaderSending"
          rounded
          spinner-small
          spinner-variant="warning"
          class="d-block"
      >
        <b-button
            type="submit"
            variant="warning"
            class="d-block col-12 mt-5"
            size="lg"
            :disabled="showLoaderPromocode"
        >
          Оплатить
        </b-button>
      </b-overlay>
    </b-form>
  </div>
</template>

<script>
import {app} from "@/services";

export default {
  name: 'campaignPay',
  components: {},
  props: {},
  data() {
    return {
      showLoaderPromocode: false,
      showLoaderSending: false,
      campaign: null,
      promoInfo: {},
      showNotification: false,
      amount: {}
    };
  },
  computed: {},
  created() {
    this.campaign = this.$store.state.campaign;
    if (!this.campaign.notification_email) {
      this.campaign.notification_email = this.$store.state.user.email;
    }
    this.$nextTick(() => {
      // this.getAmount()
      this.checkPromo(this.campaign.promo_code)
    });
  },
  methods: {
    onSubmitPromo() {
      if (this.promoInfo.id) {
        this.promoInfo = {};
        this.checkPromo();
      } else {
        this.showLoaderPromocode = true;
        this.checkPromo(this.promoInfo.promo_code);
      }
    },
    onSubmit() {
      this.showLoaderSending = true;
      this.$store.dispatch('updateCampaign', {campaign: this.campaign});
      this.$store.dispatch('setCampaignStep', {campaign_step: 4});
      app.submitCampaign(this.campaign).then(res => {
        this.showLoaderSending = false;
        window.location.href = res.url
        // this.next();
      }).catch(err => {
        this.showLoaderSending = false;
        this.$store.dispatch('showError', err);
        console.error(err);
        // this.next();
      });
    },
    next() {
      this.$router.push({name: 'campaignFinish', params: {completed: true}});
    },
    // getAmount() {
    //   this.showLoaderSending = true;
    //   app.amountCampaign(this.campaign).then(res => {
    //     this.showLoaderSending = false;
    //     this.amount = res;
    //   }).catch(err => {
    //     this.showLoaderSending = false;
    //     this.$store.dispatch('showError', err);
    //     console.error(err);
    //   });
    // },
    checkPromo(code) {
      if (code) {
        app.checkPromocode(code).then(res => {
          this.showLoaderPromocode = false;
          this.promoInfo = res;
          if (this.promoInfo.id) {
            this.setPromo(res)
          }
        }).catch(err => {
          this.showLoaderPromocode = false;
          this.$store.dispatch('showError', err);
          console.error(err.status);
        });
      } else {
        this.setPromo()
      }
    },
    setPromo(value) {
      this.campaign.promocode = value && value.id ? value.id : null;
      this.campaign.promo_code = value && value.promo_code ? value.promo_code : null;
      this.$store.dispatch('updateCampaign', {campaign: this.campaign});
      this.getAmount()
    }
  }
};
</script>
