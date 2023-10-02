<template>
    <topBar/>
    <div class="app__block capmaigns d-flex w-100 flex-row">
        <sideBar/>
        <div class="app__main campaigns pb-5">
            <h1 class="campaigns__title mb-5">Мои кампании</h1>
            <div class="campaigns__filters mb-5">
                <b-button
                    :variant="currentFilter === 'all' ? 'warning' : 'light'"
                    class="campaigns__filters-item me-4"
                    size=""
                    @click.prevent="changeFilter('all')"
                >
                    Все компании
                </b-button>
                <b-button
                    v-for="item in campaignsFilters"
                    :key="`filter-${item.id}`"
                    :variant="currentFilter === item.id ? 'warning' : 'light'"
                    class="campaigns__filters-item me-4"
                    size=""
                    @click.prevent="changeFilter(item.id)"
                >
                    {{ item.rus_type }}
                </b-button>
            </div>
            <CampaignList :campaigns="campaigns" :loader="!showLoaderCamping"/>
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
            campaignsFilters: [],
            currentFilter: 'all',
            campaigns: [],
            showLoaderCamping: false,
            promoInfo: {},
        };
    },
    watch: {
        currentFilter(value) {
            if (value === 'all') {
                this.getCampaigns();
            } else {
                this.getCampaignsTypesForUser();
            }
        }
    },
    computed: {},
    created() {
        this.getCampaigns();
        this.getCampaignsTypes();
    },
    methods: {
        getCampaigns() {
            this.showLoaderCamping = true;
            app.getUserCampaigns().then(data => {
                    this.campaigns = data;
                }
            ).catch(err => {
                this.$store.dispatch('showError', err);
            }).finally(() => {
                this.showLoaderCamping = false;
            })

        },
        getCampaignsTypes(){
            this.showLoaderCamping = false;
            app.getUserCampaignsAllTypes().then(data => {
                this.campaignsFilters = data;
            }).catch(err => {
                this.$store.dispatch('showError', err);
            }).finally(() => {
                this.showLoaderCamping = false;
            })
        },
        getCampaignsTypesForUser() {
            this.showLoaderCamping = false;
            app.getUserCampaignsForTypes(this.currentFilter).then(data => {
                this.campaigns = data;
            }).catch(err => {
                this.$store.dispatch('showError', err);
            }).finally(() => {
                this.showLoaderCamping = false;
            })
        },
        changeFilter(name) {
            this.currentFilter = name;
        }
    }
};
</script>
