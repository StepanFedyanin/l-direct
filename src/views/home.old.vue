<template>
    <topBar />
    <div class="app__block home d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main home">
            <div class="home__top row justify-content-center mb-4">
                <div class="col-12 mb-5">
                    <b-card
                        class="home__top-banner h-100"
                        bg-variant="dark"
                        text-variant="white"
                        no-body
                    >
                        <b-card-body
                            class="d-flex flex-column px-5 mx-2"
                        >
                            <b-card-text
                                class="content mb-auto"
                            >
                                <h1 class="text-warning">LDirect</h1>
                                <h2>Сервис размещения аудиорекламы в эфире «L» радио</h2>
                                <ul class="ps-3">
                                    <li>Загрузи ролик или напиши текст</li>
                                    <li>Выбери город и расписание показов</li>
                                    <li>Твоя реклама - в эфире лучшего электронного радио!</li>
                                </ul>
                            </b-card-text>
                            <b-button 
                                variant="warning"
                                class="d-block col-12 text-uppercase mt-auto"
                                size="lg"
                                @click="addCampaign"
                            >
                                Запустить рекламу
                            </b-button>
                        </b-card-body>
                    </b-card>
                </div>

                <div
                    v-if="showTopBanner[0]" 
                    class="col-12 col-md-8 col-xl mb-4"
                >
                    <b-card
                        class="home__top-banner mb-3 h-100"
                    >
                        <b-card-text
                            class="d-flex h-100"
                        >
                            <div class="home__top-banner-text pe-2">
                                <div class="text-uppercase text-muted">«L» радио</div>
                                <div class="text-uppercase h4 m-0">Cеть FM-вещания</div>
                                <div class="text-lowercase text-muted">перейти на сайт</div>
                            </div>
                            <div class="home__top-banner-icon ms-auto my-auto">
                                <img src="/assets/temp/app.svg" alt="">
                            </div>
                        </b-card-text>
                    </b-card>
                </div>

                <div 
                    v-if="showTopBanner[1]" 
                    class="col-12 col-md-6 col-xl mb-4">
                    <b-card
                        class="home__top-banner mb-3 h-100"
                    >
                        <b-card-text
                            class="d-flex h-100"
                        >
                            <div class="home__top-banner-text pe-2">
                                <div class="text-uppercase text-muted">нас слушают</div>
                                <div class="text-uppercase h4 m-0">100 000 человек</div>
                                <div class="text-lowercase text-muted">онлайн по всему миру</div>
                            </div>
                            <div class="home__top-banner-icon ms-auto my-auto">
                                <img src="/assets/temp/earbuds.svg" alt="">
                            </div>
                        </b-card-text>
                    </b-card>
                </div>

                <div 
                    v-if="showTopBanner[2]" 
                    class="col-12 col-md-6 col-xl mb-4"
                >
                    <b-card
                        class="home__top-banner mb-3 h-100"
                    >
                        <b-card-text
                            class="d-flex h-100"
                        >
                            <div class="home__top-banner-text pe-2">
                                <div class="text-uppercase text-muted">наша аудитория</div>
                                <div class="text-uppercase h4 m-0">25-45 лет</div>
                                <div class="text-lowercase text-muted">вы найдете своих слушателей</div>
                            </div>
                            <div class="home__top-banner-icon ms-auto my-auto">
                                <img src="/assets/temp/users.svg" alt="">
                            </div>
                        </b-card-text>
                    </b-card>
                </div>
            </div>

            <div 
                v-if="showPromo"
                class="home__promo row mb-4"
            >
                <div class="col-12 col-md-6 mb-4">
                    <b-card
                        class="home__promo-banner mb-3 h-100"
                    >
                        <div class="home__promo-banner-background">
                            <img src="/assets/temp/promo-1.jpg" alt="">
                        </div>
                        <a href="#" class="home__promo-banner-video"></a>
                    </b-card>                    
                </div>
                <div class="col-12 col-md-6 mb-4">
                    <b-card
                        class="home__promo-banner mb-3 h-100"
                    >
                        <div class="home__promo-banner-background">
                            <img src="/assets/temp/promo-2.jpg" alt="">
                        </div>
                        <div
                            class="home__promo-banner-content contacts m--white d-flex flex-column h-100 p-3"
                        >
                            <div class="h3 text-uppercase mb-4">Контакты</div>
                            <div class="contacts__item m--phone">+ 7 (351) 700 00 07</div>
                            <div class="contacts__item m--mail">radio@lradio.ru</div>
                            <div class="contacts__item m--web">www.lradio.ru</div>
                            <div class="contacts__socials mt-auto">
                                <!--
                                <a href="#" class="contacts__socials-item m--vk me-3"></a>
                                <a href="#" class="contacts__socials-item m--fb me-3"></a>
                                <a href="#" class="contacts__socials-item m--ig me-3"></a>
                                -->
                            </div>
                        </div>
                    </b-card>                    
                </div>
            </div>

            <div class="home__info row">
                <div class="col-12 col-lg-6 mb-4">
                    <b-card
                        class="home__info-content mb-3 h-100"
                    >
                        <b-card-text
                            class="content"
                        >
                            <h3 class="text-warning">Как разместить рекламу на «L» радио?</h3>
                            <ul>
                                <li>Пройди регистрацию в нашем сервисе</li>
                                <li>Составь график выхода ролика</li>
                                <li>Загрузи ролик</li>
                                <li>Получай отдачу от рекламы</li>
                                <li>Стоимость изготовления ролика у нас - <strong>2000 рублей</strong></li>
                                <li>Стоимость выхода ролика - <strong>от 50 рублей</strong></li>
                                <li>Срок запуска - <strong>пара дней</strong></li>
                            </ul>
                        </b-card-text>
                    </b-card>
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <b-card
                        class="home__info-content mb-3 h-100"
                        bg-variant="dark"
                        text-variant="white"
                        no-body
                    >
                        <b-card-body
                            class="d-flex flex-column"
                        >
                            <b-card-text
                                class="content mb-auto"
                            >
                                <ul>
                                    <li>Есть готовый аудиоролик, нужно сразу запустить в эфир?</li>
                                    <li>Есть текст ролика, но нужна профессиональная озвучка?</li>
                                    <li>Появились идеи, которые нужно обсудить?</li>
                                </ul>
                            </b-card-text>
                            <b-button 
                                variant="warning"
                                class="d-block col-12 text-uppercase mt-auto"
                                size="lg"
                                @click="addCampaign"
                            >
                                Запустить рекламу
                            </b-button>
                        </b-card-body>
                    </b-card>
                </div>
                <!--
                <div class="col-12 col-lg-5 col-xl-4 mb-4 d-flex flex-column">
                    <div class="home__info-logo mb-4 mx-auto">
                        <img src="/assets/img/logo-home-orange.svg" alt="">
                    </div>
                    <b-button 
                        variant="warning"
                        class="d-block col-12 text-uppercase mt-auto"
                        size="lg"
                        @click="addCampaign"
                    >
                        Запустить рекламу
                    </b-button>
                </div>
                -->
            </div>
        </div>
    </div>
</template>

<script>
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    export default {
        name: 'home',
        components: {
            topBar,
            sideBar,
        },
        props: {
        },
        data() {
            return {
                showTopBanner: [true, true, true],
                showPromo: false
            };
        },
        computed: {
        },
        created() {
        },
        methods: {
            addCampaign() {
                this.$router.push({ name: 'campaign' });
            }
        }
    };
</script>
