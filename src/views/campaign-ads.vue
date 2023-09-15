<template>
  <div class="campaign__ads">
    <div
        class="campaign__ads-block mb-4 row"
    >
      <div class="col-12 col-md-6 col-lg-6 mb-4">
        <b-card
            body-class="d-flex flex-column"
            :class="campaign.ads_type === 'audio' ? 'is-active' : ''"
            class="campaign__ads-item h-100"
            @click="selectAdsType('audio')"
        >
          <b-card-title
              class="text-uppercase"
          >
            Есть готовый аудиоролик
          </b-card-title>
          <b-card-text
              class="mt-auto pt-2 pb-4"
          >
            Запустим ваш ролик длиной до 20 секунд в эфир «L» радио в любом городе вещания
          </b-card-text>
          <b-card-text
              class="mt-auto"
          >
            Стоимость показов: <span class="text-warning"> от 50 ₽</span>
          </b-card-text>
        </b-card>
      </div>
      <div class="col-12 col-md-6 col-lg-6 mb-4">
        <b-card
            body-class="d-flex flex-column"
            :class="campaign.ads_type === 'personal' ? 'is-active' : ''"
            class="campaign__ads-item h-100"
            @click="selectAdsType('personal')"
        >
          <b-card-title
              class="text-uppercase"
          >
            Частные объявления
          </b-card-title>
          <b-card-text
              class="mt-auto pt-2 pb-4"
          >
            Поздравить близких с Днём рождения, найти собаку, продать гараж, передать привет —все это и многое другое в
            эфире «L» радио. Подготовим объявление по вашему тексту
          </b-card-text>
          <b-card-text
              class="mt-auto"
          >
            Стоимость показов: <span class="text-warning"> от 1 000 ₽</span>
          </b-card-text>
        </b-card>
      </div>
      <div class="col-12 col-md-6 col-lg-6 mb-4">
        <b-card
            body-class="d-flex flex-column"
            :class="campaign.ads_type === 'text' ? 'is-active' : ''"
            class="campaign__ads-item h-100"
            @click="selectAdsType('text')"
        >
          <b-card-title
              class="text-uppercase"
          >
            Есть текст, нужно озвучить
          </b-card-title>
          <b-card-text
              class="mt-auto pt-2 pb-4"
          >
            Оценим ваш текст и свяжемся для изготовления ролика. Возможно, посоветуем, как его улучшить
          </b-card-text>
          <b-card-text
              class="mt-auto text-muted"
          >
            Изготовление ролика: <span class="text-warning"> от 2 000 ₽</span><br/>
            Стоимость показов: <span class="text-warning"> обсудим вместе</span>
          </b-card-text>
        </b-card>
      </div>
      <div class="col-12 col-md-6 col-lg-6 mb-4">
        <b-card
            body-class="d-flex flex-column"
            :class="campaign.ads_type === 'idea' ? 'is-active' : ''"
            class="campaign__ads-item h-100"
            @click="selectAdsType('idea')"
        >
          <b-card-title
              class="text-uppercase"
          >
            Есть идея, нужно обсудить
          </b-card-title>
          <b-card-text
              class="mt-auto pt-2 pb-4"
          >
            Опишите идею в свободной форме. Свяжемся и поможем с текстом, озвучкой, стратегией
          </b-card-text>
          <b-card-text
              class="mt-auto text-muted"
          >
            Изготовление ролика: <span class="text-warning"> от 2 000 ₽</span><br/>
            Стоимость показов: <span class="text-warning"> обсудим вместе</span>
          </b-card-text>
        </b-card>
      </div>
    </div>

    <div
        v-if="campaign.ads_type != null"
        class="campaign__ads-form"
    >

<!--      <template-->
<!--          v-if="campaign.ads_type === 'audio'"-->
<!--      >-->
<!--        <b-card-->
<!--            v-if="adsFile.uploaded || adsFile.error"-->
<!--            class="mb-3"-->
<!--        >-->
<!--          <b-card-text-->
<!--              v-if="adsFile.error"-->
<!--              class="d-flex"-->
<!--          >-->
<!--            <span class="h4 m-0 text-danger">{{ adsFile.error }}</span>-->
<!--          </b-card-text>-->
<!--          <b-card-text-->
<!--              v-else-if="adsFile.uploaded"-->
<!--              class="d-flex align-items-center"-->
<!--          >-->
<!--            <b-button-->
<!--                v-if="!adsFile.play"-->
<!--                variant="outline-warning"-->
<!--                class="d-block me-3"-->
<!--                @click="playAdsFile"-->
<!--            >-->
<!--              Play-->
<!--            </b-button>-->
<!--            <b-button-->
<!--                v-if="adsFile.play"-->
<!--                variant="outline-warning"-->
<!--                class="d-block me-3"-->
<!--                @click="stopAdsFile"-->
<!--            >-->
<!--              Stop-->
<!--            </b-button>-->

<!--            <a href="#" class="d-block h4 m-0">{{ adsFile.name }}</a><br>-->

<!--            <b-button-->
<!--                variant="warning"-->
<!--                class="d-block ms-auto"-->
<!--                @click="deleteAdsFile"-->
<!--            >-->
<!--              Удалить-->
<!--            </b-button>-->
<!--          </b-card-text>-->
<!--          <b-card-text-->
<!--              v-if="adsFile.file && adsFile.file.duration"-->
<!--          >-->
<!--            <b-progress :max="adsFile.file.duration">-->
<!--              <b-progress-bar :value="adsFile.time" :label-html="`<small>${adsFile.time}</small>`"-->
<!--                              variant="warning"></b-progress-bar>-->
<!--            </b-progress>-->
<!--          </b-card-text>-->
<!--        </b-card>-->
<!--        <b-button-->
<!--            type="submit"-->
<!--            variant="warning"-->
<!--            class="d-block col-12"-->
<!--            size="lg"-->
<!--            :disabled="adsFile.file===null"-->
<!--            @click="onSubmit"-->
<!--        >-->
<!--          Продолжить-->
<!--        </b-button>-->
<!--      </template>-->
      <template
          v-if="campaign.ads_type != null"
      >
        <b-form
            class="form"
            @submit="onSubmit"
        >
          <b-card
              body-class="d-flex flex-column"
              class="position-relative overflow-hidden"
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
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                    v-if="campaign.ads_type === 'audio'"
                    id="input-group-message"
                    class="w-100 mt-auto"
                    label="Ваши комментарии к рекламной кампании"
                >
                  <b-form-textarea
                      id="input-message"
                      v-model="campaign.message"
                      required
                      size="lg"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                    v-else-if="campaign.ads_type === 'personal'"
                    id="input-group-message"
                    class="w-100 mt-auto"
                    label="Как зовут именинника, сколько лет, что ему пожелать?"
                >
                  <b-form-textarea
                      id="input-message"
                      v-model="campaign.message"
                      required
                      size="lg"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                    v-else-if="campaign.ads_type === 'text'"
                    id="input-group-message"
                    class="w-100 mt-auto"
                    label="Ваш текст аудиоролика"
                >
                  <b-form-textarea
                      id="input-message"
                      v-model="campaign.message"
                      required
                      size="lg"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group
                    v-else
                    id="input-group-message"
                    class="w-100 mt-auto"
                    label="Ваша идея"
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
                <small>Я <a href="#" @click.prevent="showPolicy">ознакомлен и согласен</a> с условиями политики
                  обработки персональных данных и конфиденциальности.</small>
              </b-form-checkbox>
            </div>

            <b-button
                type="submit"
                variant="warning"
                class="d-block col-12"
                size="lg"
            >
              Продолжить
            </b-button>
            <b-overlay
                :show="showLoaderSending"
                no-wrap
                spinner-variant="warning"
            />
          </b-card>
        </b-form>
      </template>
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
      showLoaderSending: false,
      campaign: null,
      showModalPolicy: false,
      showModalCampaignNew: false,
      showPrice: false
    };
  },
  created() {
    this.campaign = this.$store.state.campaign;
    this.bearerToken = this.$store.state.access;
    if (this.campaign.ads_file) {
      this.showModalCampaignNew = true;
      app.getAdsFile(this.campaign.ads_file).then(res => {

        Promise.resolve(this.$helpers.getFileInfo(res.file, 'audio')).then((file) => {
          if (Math.round(file.duration) > 20) {
            this.adsFile.error = 'Длина ролика превышает 20 сек.';
            this.adsFile.file = null;
          } else {
            this.adsFile.file = file.song;
            this.adsFile.name = res.name;
            this.adsFile.uploaded = true;
            this.adsFile.file.addEventListener('timeupdate', () => {
              this.adsFile.time = this.adsFile.file.currentTime.toFixed(2);
              this.adsFile.play = !this.adsFile.file.paused;
            });
          }
        });
      }).catch(err => {
        console.error(err);
        this.$store.dispatch('showError', err);
      });
    }
  },
  methods: {
    selectAdsType(type) {
      if (this.showLoaderSending) {
        return;
      }
      this.campaign.ads_type = type;
      // this.stopAdsFile();
    },
    hideCampaignNew(confirm = false) {
      this.showModalCampaignNew = false;
      if (confirm) {
        this.adsFile = {
          error: '',
          uploaded: false,
          play: false,
          time: null,
          file: null,
          name: null
        };
      }
      this.campaign = this.$store.state.campaign;
    },
    showPolicy() {
      this.showModalPolicy = true;
    },
    hidePolicy() {
      this.showModalPolicy = false;
    },
    onSubmit() {
      // this.$store.dispatch('updateCampaign', {campaign: this.campaign});
      // this.$store.dispatch('setCampaignStep', {campaign_step: 3});
      // if (this.campaign.ads_type !== 'audio') {
      //   this.showLoaderSending = true;
      //   this.stopAdsFile();
      //   app.sendAdsInfo(this.campaign).then(res => {
      //     this.campaign = res;
      //     this.next('campaignFinish');
      //   }).catch(err => {
      //     this.showLoaderSending = false;
      //     this.$store.dispatch('showError', err);
      //     console.error(err);
      //   });
      // } else {
      //   this.$store.dispatch('updateCampaign', {campaign: this.campaign});
      //   this.stopAdsFile();
      this.next();
      // }
    },
    next(name) {
      this.$router.push({name: name || 'campaignProps'});
    },
    // playAdsFile() {
    //   this.adsFile.play = true;
    //   if (this.adsFile.file) {
    //     this.adsFile.file.play();
    //   }
    // },
    stopAdsFile() {
      this.adsFile.play = false;
      if (this.adsFile.file) {
        this.adsFile.file.pause();
      }
    },
    // deleteAdsFile() {
    //   if (this.campaign.ads_file) {
    //     this.stopAdsFile();
    //     app.deleteAdsFile(this.campaign.ads_file).then(() => {
    //       this.files = [];
    //       this.adsFile = {
    //         uploaded: false,
    //         error: '',
    //         file: null
    //       };
    //       this.campaign.ads_file = null;
    //       this.$store.dispatch('updateCampaign', {campaign: this.campaign});
    //     }).catch(err => {
    //       console.error(err);
    //       this.$store.dispatch('showError', err);
    //     });
    //   }
    // }
  }
};
</script>
