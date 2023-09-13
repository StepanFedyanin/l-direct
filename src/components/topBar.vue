<template>
    <div
        class="app__top topbar sticky-top py-4 px-4">
        <div 
            v-if="user && user.id" 
            class="topbar__menu text-end"
        >
            <span class="topbar__menu-item m--icon-person ms-3 pe-1">{{ user.email }}</span>
            <router-link
                v-for="item in topMenu"
                :key="item.name"
                :class="['m--icon-' + item.icon]"
                :to="{ name: item.name }"
                :title="item.title"
                class="topbar__menu-item ms-3"
            >
            </router-link>
        </div>
        <div 
            v-else 
            class="topbar__menu text-end"
        >
            <router-link
                tag="a"
                :to="{ name: 'auth', params: { template: 'authorization' } }"
                class="topbar__menu-item m--icon-person ms-3 pe-1"
            >
                Войти
            </router-link>
        </div>
    </div>
</template>

<script>
    import { topMenu } from '../settings';
    export default {
        name: 'topBar',
        props: {
        },
        data() {
            return {
                topMenu: topMenu,
                user: this.$store.state.user
            };
        },
    }
</script>
