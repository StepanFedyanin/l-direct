<template>
  <topBar/>
  <div class="app__block capmaigns d-flex w-100 flex-row">
    <sideBar/>

    <div class="app__main campaigns pb-5">
      <h1 class="campaigns__title mb-5">Мои кампании</h1>
      <div class="campaigns__filters mb-5">
        <b-button
            v-for="item in campaignsFilters"
            :key="`filter-${item.name}`"
            :variant="currentFilter === item.name ? 'warning' : 'light'"
            class="campaigns__filters-item me-4"
            size=""
            @click.prevent="changeFilter(item.name)"
        >
          {{ item.label }}
        </b-button>
      </div>
        <CampaignList :campaigns="sortedCampaigns()"/>
        <!--        <div class="campaigns__item row mb-4">-->
        <!--          <div class="col-12 col-xxl-5">-->
        <!--            <b-card-->
        <!--                body-class="d-flex flex-column"-->
        <!--                class="campaigns__item-info mb-3"-->
        <!--            >-->
        <!--              <div class="campaigns__item-title">-->
        <!--                23.04.23 — Кампания №81 <div class="campaigns__item-title-label">Аудио</div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p>Здравствуйте! у меня есть готовый аудиоролик. Но он длительностью 43 секунды. Вы можете его ускорить, чтобы сжать его до 30 сек.?</p>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <div class="campaigns__item-content-block">-->
        <!--                  <p><span>Даты проведения кампании:</span></p>-->
        <!--                  <p>27.04.23 - 04.05.23</p>-->
        <!--                  <p>27.04.23 - 04.05.23</p>-->
        <!--                </div>-->
        <!--                <div class="campaigns__item-content-block">-->
        <!--                  <p><span>Регионы:</span> Челябинск, Аша, Екатеринбург</p>-->
        <!--                </div>-->
        <!--                <div class="campaigns__item-content-block">-->
        <!--                  <p><span>Стоимость показов:</span> 20 000 ₽ (300 ₽ за один выход)</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <div class="campaigns__item-payment">-->
        <!--                  <div class="campaigns__item-payment-sum">-->
        <!--                    <span>Оплачено: <strong class="text-nowrap">19 000 ₽</strong></span>-->
        <!--                    23.04.23 14:20 МСК-->
        <!--                  </div>-->
        <!--                  <div class="campaigns__item-payment-promo">-->
        <!--                    скидка по промокоду LRADIOTOP-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p><span>Комментарий L-Direct</span></p>-->
        <!--                <p>Кампания запущена!</p>-->
        <!--              </div>-->
        <!--            </b-card>-->
        <!--          </div>-->
        <!--          <div class="col-12 col-xxl-7">-->
        <!--            <b-card-->
        <!--                body-class="d-flex flex-column"-->
        <!--                class="campaigns__item-schedule mb-3"-->
        <!--            >-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p><span>График показов</span></p>-->
        <!--              </div>-->
        <!--              <timeTable-->
        <!--                  :show="true"-->
        <!--                  :disabledControl="true"-->
        <!--                  @changeScheduleData="changeScheduleData"-->
        <!--              />-->

        <!--            </b-card>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="campaigns__item row mb-4">-->
        <!--          <div class="col-12 col-xxl-5">-->
        <!--            <b-card-->
        <!--                body-class="d-flex flex-column"-->
        <!--                class="campaigns__item-info mb-3"-->
        <!--            >-->
        <!--              <div class="campaigns__item-title">-->
        <!--                23.04.23 — Кампания №81 <div class="campaigns__item-title-label">Аудио</div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p>Здравствуйте! у меня есть готовый аудиоролик. Но он длительностью 43 секунды. Вы можете его ускорить, чтобы сжать его до 30 сек.?</p>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <div class="campaigns__item-content-block">-->
        <!--                  <p><span>Даты проведения кампании:</span></p>-->
        <!--                  <p>27.04.23 - 04.05.23</p>-->
        <!--                  <p>27.04.23 - 04.05.23</p>-->
        <!--                </div>-->
        <!--                <div class="campaigns__item-content-block">-->
        <!--                  <p><span>Регионы:</span> Челябинск, Аша, Екатеринбург</p>-->
        <!--                </div>-->
        <!--                <div class="campaigns__item-content-block">-->
        <!--                  <p><span>Стоимость показов:</span> 20 000 ₽ (300 ₽ за один выход)</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <div class="campaigns__item-promo">-->


        <!--                  <b-form-->
        <!--                      class="form mb-3"-->
        <!--                      @submit="onSubmitPromo"-->
        <!--                  >-->
        <!--                    <div class="row">-->
        <!--                      <b-form-group-->
        <!--                          id="select-group-promo"-->
        <!--                          class="col-12 col-sm-7 mt-auto"-->
        <!--                          label="Промокод"-->
        <!--                      >-->
        <!--                        <b-form-input-->
        <!--                            v-if="!promoInfo.id"-->
        <!--                            id="select-promo"-->
        <!--                            v-model="promoInfo.promo_code"-->
        <!--                            name="promocode"-->
        <!--                            size="lg"-->
        <!--                            :placeholder="promoInfo.error || promoInfo.name"-->
        <!--                            :disabled="showLoaderSending || showLoaderPromocode"-->
        <!--                            :state="promoInfo.error ? false : null"-->
        <!--                        ></b-form-input>-->
        <!--                        <div-->
        <!--                            v-else-->
        <!--                            class="form-control form-control-lg"-->
        <!--                        >-->
        <!--                          <strong>{{ promoInfo.promo_code }} - {{ promoInfo.name }}</strong>-->
        <!--                        </div>-->
        <!--                      </b-form-group>-->
        <!--                      <b-form-group-->
        <!--                          id="select-group-promo-submit"-->
        <!--                          class="col-12 col-sm-5 col-md-4 ms-auto mt-auto"-->
        <!--                      >-->
        <!--                        <b-overlay-->
        <!--                            :show="showLoaderPromocode"-->
        <!--                            rounded-->
        <!--                            spinner-small-->
        <!--                            spinner-variant="warning"-->
        <!--                            class="d-block"-->
        <!--                        >-->
        <!--                          <b-button-->
        <!--                              type="submit"-->
        <!--                              variant="outline-warning"-->
        <!--                              size="lg"-->
        <!--                              class="w-100"-->
        <!--                              :disabled="showLoaderSending || !promoInfo.promo_code"-->
        <!--                          >-->
        <!--                            {{ promoInfo.id ? 'Изменить' : 'Применить' }}-->
        <!--                          </b-button>-->
        <!--                        </b-overlay>-->
        <!--                      </b-form-group>-->
        <!--                    </div>-->
        <!--                  </b-form>-->


        <!--                </div>-->
        <!--                <div class="campaigns__item-payment">-->
        <!--                  <div class="campaigns__item-payment-sum">-->
        <!--                    <span>К оплате: <strong class="text-nowrap">19 000 ₽</strong></span>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--                <b-overlay-->
        <!--                    :show="showLoaderSending"-->
        <!--                    rounded-->
        <!--                    spinner-small-->
        <!--                    spinner-variant="warning"-->
        <!--                    class="d-block pt-3"-->
        <!--                >-->
        <!--                  <b-button-->
        <!--                      type="submit"-->
        <!--                      variant="warning"-->
        <!--                      class="d-block col-12"-->
        <!--                      size="lg"-->
        <!--                      :disabled="showLoaderPromocode"-->
        <!--                  >-->
        <!--                    Оплатить-->
        <!--                  </b-button>-->
        <!--                </b-overlay>-->
        <!--              </div>-->
        <!--            </b-card>-->
        <!--          </div>-->
        <!--          <div class="col-12 col-xxl-7">-->
        <!--            <b-card-->
        <!--                body-class="d-flex flex-column"-->
        <!--                class="campaigns__item-schedule mb-3"-->
        <!--            >-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p><span>График показов</span></p>-->
        <!--              </div>-->
        <!--              <timeTable-->
        <!--                  :show="true"-->
        <!--                  :disabledControl="true"-->
        <!--                  @changeScheduleData="changeScheduleData"-->
        <!--              />-->

        <!--            </b-card>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="campaigns__item row mb-4 pb-3">-->
        <!--          <div class="col-5">-->
        <!--            <b-card-->
        <!--                body-class="d-flex flex-column"-->
        <!--                class="campaigns__item-info"-->
        <!--            >-->
        <!--              <div class="campaigns__item-title">-->
        <!--                23.04.23 — Кампания №79 <div class="campaigns__item-title-label">Идея</div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p>Здравствуйте! у меня есть готовый аудиоролик. Но он длительностью 43 секунды. Вы можете его ускорить, чтобы сжать его до 30 сек.?</p>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p><span>Комментарий L-Direct</span></p>-->
        <!--                <p>Сжать можем. Сегодня позвоним, расскажем обо всех условиях рекламы. </p>-->
        <!--              </div>-->
        <!--            </b-card>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="campaigns__item row mb-4 pb-3">-->
        <!--          <div class="col-5">-->
        <!--            <b-card-->
        <!--                body-class="d-flex flex-column"-->
        <!--                class="campaigns__item-info"-->
        <!--            >-->
        <!--              <div class="campaigns__item-title">-->
        <!--                23.04.23 — Кампания №79 <div class="campaigns__item-title-label">Текст</div>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p>Нужен быстрый ремонт? Триал Декор производит Декоративные панели на основе гипсокартона в Челябинске. Финишная облицовка стен без предварительной подготовки. Минимум затрат времени и средств! Панели в наличии от 1300-ста рублей за 3-х метровый лист<br>-->
        <!--                  Наш сайт trial-decor.ru<br>-->
        <!--                  Наш телефон 922-74-33-555<br>-->
        <!--                  Звоните!?</p>-->
        <!--              </div>-->
        <!--              <div class="campaigns__item-content">-->
        <!--                <p><span>Комментарий L-Direct</span></p>-->
        <!--                <p>Позвонили, обсудили все. Ждите выход ролика с 4 по 24 мая!</p>-->
        <!--              </div>-->
        <!--            </b-card>-->
        <!--          </div>-->
        <!--        </div>-->
    </div>
  </div>
</template>

<script>
import {app} from "@/services";
import topBar from '@/components/topBar';
import sideBar from '@/components/sideBar';
import CampaignList from "@/components/campaign-list.vue";
//import inDeveloping from '@/components/inDeveloping';
export default {
  name: 'capmaigns',
  components: {
    CampaignList,
    topBar,
    sideBar,
    //inDeveloping,
  },
  props: {},
  data() {
    return {
      campaignsFilters: [{
        name: 'all',
        label: 'Все кампании',
        show: true,
      }, {
        name: 'audio',
        label: 'Аудиоролики',
        show: true,
      }, {
        name: 'personal',
        label: 'Частные объявления',
        show: true,
      }, {
        name: 'text',
        label: 'Текстовые ролики',
        show: true,
      }, {
        name: 'idea',
        label: 'Идеи',
        show: true,
      }],
      currentFilter: 'all',
      campaigns: [],
      promoInfo: {},
    };
  },
  computed: {},
  created() {
    this.getCampaigns();
  },
  watch() {
  },
  methods: {
    getCampaigns() {
      app.getUserCampaigns().then((data) => this.campaigns = data);
    },
    changeFilter(name) {
      this.currentFilter = name;
    },
    sortedCampaigns() {
      let list = [...this.campaigns];
      if (this.currentFilter !== 'all') list = list.filter((campaign) => {
        return campaign.ads_type === this.currentFilter
      });
      return list;
    }
  }
};
</script>
