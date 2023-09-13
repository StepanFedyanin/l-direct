import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'l-direct',
    storage: window.localStorage
});

const campaignTemplate = () => {
    return {
        ads_type: null,
        ads_file: null,
        person: null,
        user_name: '',
        phone: null,
        message: '',
        idea: '', // можно наверное и использовать message
        regions: [],
        country: 'Россия', // часовой пояс - страна
        timezone: 5, // часовой пояс - город
        campaign_schedule: false, // swith для включения дополнительных диапазонов дат.
        campaign_schedule_data: [{}], // { campaign_start: '2021-12-01', campaign_end: '2021-12-31' }
        time_schedule: true, // switch для переключения использования time_period данных или массива сетки
        time_period_type: 'Ежедневно',
        time_period_start: '00:00',
        time_period_end: '20:00',
        time_schedule_data: [[]], //  7 массивов, по 24 элемена в кажом (0 или 1)
        notification_email: '',
        notification_moderate: true,
        notification_campaign_end: true,
        promocode: null,
    }
};

const store = createStore({
    state: {
        user: {},
        error: null,
        loader: null,
        access: null,
        refresh: null,
    },
    plugins: [vuexPersist.plugin],
    mutations: {
        ADD_CAMPAIGN(state) {
            state.campaign = campaignTemplate();
            state.campaign.person = state.user.id;
        },
        UPDATE_CAMPAIGN(state, campaign) {
            state.campaign = campaign;
        },
        SET_CAMPAIGN_STEP(state, step) {
            state.campaign_step = step;
        },
        CLEAR_CAMPAIGN(state) {
            state.campaign = campaignTemplate();
            state.campaign.person = state.user.id;
            state.campaign_step = 0;
        },
        USER(state, user) {
            state.user = user;
        },
        TOKENS(state, tokens) {
            state.access = tokens.access;
            state.refresh = tokens.refresh;
        },
        ERROR(state, error) {
            state.error = error;
        },
        LOADER(state, loader) {
            state.loader = loader;
        }
    },
    actions: {
        addCampaign(context) {
            // console.log('addCampaign');
            context.commit('ADD_CAMPAIGN');
        },
        updateCampaign(context, params) {
            // console.log('updateCampaign');
            context.commit('UPDATE_CAMPAIGN', params.campaign);
        },
        setCampaignStep(context, params) {
            // console.log('setCampaignStep');
            context.commit('SET_CAMPAIGN_STEP', params.step);
        },
        clearCampaign(context) {
            context.commit('CLEAR_CAMPAIGN');
        },
        setUser(context, user) {
            context.commit('USER', user);
        },
        clearUser(context) {
            context.commit('USER', {});
        },
        setToken(context, tokens) {
            context.commit('TOKENS', tokens);
        },
        clearToken(context) {
            context.commit('TOKENS', {});
        },
        showError(context, error) {
            context.commit('ERROR', error);
        },
        hideError(context) {
            context.commit('ERROR', null);
        },
        showLoader(context, loader) {
            context.commit('LOADER', loader);
        },
        hideLoader(context) {
            context.commit('LOADER', null);
        }
    }
});

export default store;