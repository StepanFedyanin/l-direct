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
      <CampaignList :campaigns="sortedCampaigns()" :loader="showLoaderCamping"/>
    </div>
  </div>
</template>

<script>
import {app} from "@/services";
import topBar from '@/components/topBar';
import sideBar from '@/components/sideBar';
import CampaignList from "@/components/campaign-list.vue";

export default {
  name: 'capmaigns',
  components: {
    CampaignList,
    topBar,
    sideBar,
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
      showLoaderCamping: false,
      promoInfo: {},
    };
  },
  computed: {},
  created() {
    this.getCampaigns();
  },
  methods: {
    getCampaigns() {
      app.getUserCampaigns().then(data => {
            this.campaigns = data;
            this.showLoaderCamping = true;
          }
      ).catch(err => {
        this.showLoaderCamping = false;
        this.$store.dispatch('showError', err);
        console.error(err);
      });
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
