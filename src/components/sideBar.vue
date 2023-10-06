<template>
    <div class="app__sidebar sidebar ms-3 ms-xl-5 me-2 me-xl-4 pe-3 pt-4">
        <router-link
            :to="{ name: 'home' }"
            class="sidebar__logo text-center mb-4 d-none d-lg-block"
        >
            <img src="/assets/img/logo.svg" alt="">
        </router-link>
        <div class="sidebar__menu d-flex flex-column mb-5">
            <router-link
                v-for="item in mainMenu"
                :key="item.name"
                :class="['m--icon-' + item.icon]"
                :to="{ name: item.name }"
                :title="item.title"
                class="sidebar__menu-item"
            >
                {{ item.title }}
            </router-link>
        </div>
        <div class="sidebar__menu d-flex flex-column mb-5">
            <div class="sidebar__menu-title mb-2">Аккаунт</div>
            <template
                v-if="user && user.id"
            >
                <router-link
                    v-for="item in accountMenu"
                    :key="item.name"
                    :class="['m--icon-' + item.icon]"
                    :to="{ name: item.name }"
                    :title="item.title"
                    class="sidebar__menu-item"
                >
                    {{ item.title }}
                </router-link>
                <a 
                    href="/logout"
                    class="sidebar__menu-item m--icon-logout"
                    @click.prevent="logout"
                >
                    Выйти
                </a>
            </template>
            <template
                v-else
            >
                <router-link
                    :to="{ name: 'auth', params: { template: 'authorization' } }"
                    class="sidebar__menu-item m--icon-login"
                >
                    Войти
                </router-link>
            </template>
        </div>
        <div 
            v-if="showHelp"
            class="sidebar__helper my-4 p-3"
        >
            <div class="sidebar__helper-icon m--icon-question mb-3"></div>
            <div class="sidebar__helper-title">Нужная помощь?</div>
            <div class="sidebar__helper-info mb-3">Скачайте нашу инстуркцию</div>
            <button class="sidebar__helper-button btn btn-light d-block w-100 text-uppercase"><strong>Скачать</strong></button>
        </div>
    </div>
</template>

<script>
    import { mainMenu, accountMenu } from '@/settings';

    export default {
        name: 'sideBar',
        props: {
        },
        data() {
            return {
                user: this.$store.state.user,
                mainMenu: mainMenu,
                accountMenu: accountMenu,
                showHelp: false,
            };
        },
        methods: {
            logout() {
                //this.$store.commit('removeToken');
                this.$store.dispatch('addCampaign');
                this.$store.dispatch('setUser', null);
                if (this.$route.name === 'home') {
                    this.$router.go(this.$route.name);
                } else {
                    this.$router.push({ name: 'home' });
                }
            },
        }
    }
</script>
