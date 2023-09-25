<template>
    <topBar />
    <div class="app__block campaign d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main campaign__main pb-5">
            <h1 class="campaign__title">Создание рекламной кампании</h1>
            <div class="campaign__content content mb-4">
                <p>Аудиообъявление в интернет-вещании</p>
            </div>
            <campaignSteps
                v-if="step <= 3"
                :step="step"
            />

            <!--h2 class="campaign__form-title text-warning text-decoration-underline h3 mb-4">
                Аудиообъявление от {{ new Date().toLocaleDateString() }}
            </h2-->
            <router-view />
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    import campaignSteps from '@/components/campaignSteps';
    export default {
        name: 'campaign',
        components: {
            topBar,
            sideBar,
            campaignSteps,
        },
        watch: {
          $route: {
            immediate: true,
            handler(to) {
              this.step = this.$store.state.campaign_step || to.meta.step || 1;
            }
          },
        },
        props: {
            completed: {
                type: Boolean,
                default() { return null; }
            }
        },
        data() {
            return {
                step: 1,
            };
        },
        computed: {
        },
        created() {
            if (!this.$store.state.user) {
                this.$router.push({ name: 'index' });
                return;
            }
            if (!this.$store.state.campaign) {
                this.$store.dispatch('addCampaign');
            }
            this.campaign = this.$store.state.campaign;
            this.$store.dispatch('hideError');
        },
        methods: {
        }
    };
</script>
