<template>
    <div class="campaign__steps d-block d-md-flex pt-2 mb-3">
        <div 
            :class="step > 1 ? 'is-completed' : 'is-active'"
            class="campaign__steps-item col-12 col-md-4 pt-3 mb-3"
            @click.prevent="setStepCampaign('campaignAds')"
        >
            Добавление ролика
        </div>
        <div
            :class="step > 2 ? 'is-completed' : step == 2 ? 'is-active' : ''"
            class="campaign__steps-item col-12 col-md-4 pt-3 mb-3"
            @click.prevent="setStepCampaign('campaignProps')"
        >
            Настройки кампании
        </div>
        <div 
            :class="step == 3 ? 'is-active' : ''"
            class="campaign__steps-item col-12 col-md-4 pt-3 mb-3"
        >
            Оплата
        </div>
    </div>
</template>

<script>
    //import { mainMenu, accountMenu, } from '../settings';
    export default {
        name: 'campaignSteps',
        props: {
            step: {
                type: Number,
                default() { return null; }
            }
        },
        data() {
            return {
                //mainMenu: mainMenu,
                //accountMenu: accountMenu,
            };
        },
        methods: {
            setStepCampaign(name) {
                this.$router.push({ name: name });
            },
        }
    }
</script>
