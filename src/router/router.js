import { createRouter, createWebHistory  } from 'vue-router';
import { helpers } from '@/utils/helpers'
import store from '@/store/store'
import auth from '@/views/auth.vue';
import home from '@/views/home.vue';
import campaign from '@/views/campaign.vue';
import campaignProps from '@/views/campaign-props.vue';
import campaignAds from '@/views/campaign-ads.vue';
import campaignPay from '@/views/campaign-pay.vue';
import campaignFinish from '@/views/campaign-finish.vue';
import campaigns from '@/views/campaigns.vue';
import reports from '@/views/reports.vue';
import pay from '@/views/pay.vue';

import profile from '@/views/profile.vue';
import alerts from '@/views/alerts.vue';
import offer from '@/views/offer.vue';
import privacy from '@/views/privacy.vue';

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: auth,
        meta: { title: 'L Radio - Direct' },
        props: true
    }, {
        path: '/registration',
        name: 'registration',
        component: auth,
        meta: { title: 'L Radio - Direct' },
        props: {
            default: true,
            template: 'registration'
        }
    }, {
        path: '/recovery',
        name: 'recovery',
        component: auth,
        meta: { title: 'L Radio - Direct' },
        props: {
            default: true,
            template: 'recovery'
        }
    }, {
        path: '/',
        name: 'home',
        component: home,
        meta: { title: 'L Radio - Direct' },
        props: true
    }, {
        path: '/campaign',
        name: 'campaign',
        component: campaign,
        redirect: { name: 'campaignAds' },
        props: true,
        children: [{
            path: '',
            name: 'campaignAds',
            component: campaignAds,
            meta: { title: 'Создание рекламной кампании. Добавление ролика.', step: 1, requiresAuth: true },
            props: true
        }, {
            path: 'props',
            name: 'campaignProps',
            component: campaignProps,
            meta: { title: 'Создание рекламной кампании. Настройка кампании.', step: 2, requiresAuth: true },
            props: true
        }, {
            path: 'pay',
            name: 'campaignPay',
            component: campaignPay,
            meta: { title: 'Создание рекламной кампании. Оплата.', step: 3, requiresAuth: true },
            props: true
        }, {
            path: 'finish',
            name: 'campaignFinish',
            component: campaignFinish,
            meta: { title: 'Создание рекламной кампании. Кампания создана.', step: 4, requiresAuth: true },
            props: { completed: false }
        }]
    }, {
        path: '/campaigns',
        name: 'campaigns',
        component: campaigns,
        meta: { title: 'Мои кампании', requiresAuth: true },
        props: true,
    }, {
        path: '/reports',
        name: 'reports',
        component: reports,
        meta: { title: 'Отчеты', requiresAuth: true },
        props: true,
    }, {
        path: '/pay',
        name: 'pay',
        component: pay,
        meta: { title: 'Платные ролики', requiresAuth: true },
        props: true,
    }, {
        path: '/profile',
        name: 'profile',
        component: profile,
        meta: { title: 'Ваш профиль', requiresAuth: true },
        props: true
    }, {
        path: '/alerts',
        name: 'alerts',
        component: alerts,
        meta: { title: '', requiresAuth: true },
        props: true
    }, {
        path: '/dogovor',
        name: 'offer',
        component: offer,
        meta: { title: 'Договор оферты' },
        props: true
    }, {
        path: '/privacy',
        name: 'privacy',
        component: privacy,
        meta: { title: 'Политика в отношении обработки персональных данных' },
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'is-subactive',
    linkExactActiveClass: 'is-active',
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' - L Radio Direct' || 'L Radio Direct';
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user && store.state.user.id) {
            let jwt = helpers.parseJwt(store.state.access);
            console.log('Check token');
            let expDate = new Date(jwt.exp * 1000);
            if (expDate < new Date()) {
                next({ name: 'auth' });    
            } else {
                next();
            }
        } else {
            next({ name: 'auth' });
        }
    } else {
        next();
        /*
        if (store.state.user && store.state.user.id && to.name === 'home') {
            next({ name: 'home' });
        } else {
            next();
        }
        */
    }
});

export default router;
