<template>
    <div class="app__block home d-flex h-100">
        <div class="home__block col-12  px-3 px-sm-5 pt-5">
            <div class="home__top">
                <b-card
                    class="home__top-banner h-100"
                    bg-variant="dark"
                    text-variant="white"
                    no-body
                >
                    <b-card-body
                        class="d-flex flex-column px-2 px-sm-5 mx-2"
                    >
                        <b-card-text
                            class="content mb-auto"
                        >
                            <div class="home__top-logo mb-2" />
                            <h1 class="mb-3">Сервис размещения аудиорекламы в эфире «L» радио</h1>
                            <ul class="ps-3 mb-4">
                                <li>Загрузи ролик или напиши текст</li>
                                <li>Выбери город и расписание показов</li>
                                <li>Твоя реклама - в эфире лучшего электронного радио!</li>
                            </ul>
                        </b-card-text>
                        <div class="home__top-buttons row">
                            <b-button 
                                variant="warning"
                                class="home__top-button d-block col-5 mx-3 mb-3 text-uppercase"
                                size="lg"
                                @click="addCampaign"
                            >
                                Зарегистрироваться
                            </b-button>
                            <b-button 
                                variant="outline-light"
                                class="home__top-button d-block col-5 mx-3 mb-3 text-uppercase"
                                size="lg"
                                @click="addCampaign"
                            >
                                Войти в ЛК
                            </b-button>
                        </div>
                    </b-card-body>
                </b-card>
            </div>

            <div
                class="home__main row justify-content-between py-5"
            >
                <div class="home__main-left col-12 col-lg-4 mb-5">
                    <b-card
                        class="home__main-card mb-3 h-100"
                    >
                        <b-card-text
                            class="content"
                        >
                            <h2 class="mb-3"><strong>Как разместить рекламу на «L» радио?</strong></h2>
                            <ul>
                                <li class="mb-2">Пройди регистрацию в нашем сервисе</li>
                                <li class="mb-2">Составь график выхода ролика</li>
                                <li class="mb-2">Загрузи ролик</li>
                                <li class="mb-2">Получай отдачу от рекламы</li>
                                <li class="mb-2">Стоимость изготовления ролика у нас - <strong>2000 рублей</strong></li>
                                <li class="mb-2">Стоимость выхода ролика - <strong>50 рублей (в Челябинске 250 рублей)</strong></li>
                                <li class="mb-2">Срок запуска - <strong>пара дней</strong></li>
                            </ul>
                        </b-card-text>
                    </b-card>
                </div>

                <div class="home__main-cities text-center col-lg-3 d-none d-lg-block">
                    <ul>
                        <li>Онлайн эфир<br> на Россию</li>
                        <li>Челябинск</li>
                        <li>Екатеринбург</li>
                        <li>Аша</li>
                        <li>Кыштым</li>
                        <li>Сатка</li>
                        <li>Троицк</li>
                        <li>Южноуральск</li>
                        <li>Снежинск</li>
                        <li>Шадринск</li>
                    </ul>
                </div>

                <div class="home__main-right col-12 col-lg-4 mb-5 d-flex flex-column">
                    <div
                        v-if="showTopBanner[0]" 
                        class="col-12 mb-4"
                    >
                        <b-card
                            class="home__main-card mb-3 h-100"
                        >
                            <b-card-text
                                class="d-flex h-100"
                            >
                                <div class="home__top-banner-text pe-2">
                                    <div class="text-uppercase text-gray">«L» радио</div>
                                    <div class="text-uppercase h4 m-0">Cеть FM-вещания</div>
                                    <a href="//lradio.ru" target="_blank" class="text-lowercase text-gray">перейти на сайт</a>
                                </div>
                                <div class="home__top-banner-icon ms-auto my-auto">
                                    <img src="/assets/temp/app.svg" alt="">
                                </div>
                            </b-card-text>
                        </b-card>
                    </div>

                    <div 
                        v-if="showTopBanner[1]" 
                        class="col-12 mb-4">
                        <b-card
                            class="home__main-card mb-3 h-100"
                        >
                            <b-card-text
                                class="d-flex h-100"
                            >
                                <div class="home__top-banner-text pe-2">
                                    <div class="text-uppercase text-gray">нас слушают</div>
                                    <div class="text-uppercase h4 m-0">100 000 человек</div>
                                    <div class="text-lowercase text-gray">онлайн по всему миру</div>
                                </div>
                                <div class="home__top-banner-icon ms-auto my-auto">
                                    <img src="/assets/temp/earbuds.svg" alt="">
                                </div>
                            </b-card-text>
                        </b-card>
                    </div>

                    <div 
                        v-if="showTopBanner[2]" 
                        class="col-12"
                    >
                        <b-card
                            class="home__main-card mb-3 h-100"
                        >
                            <b-card-text
                                class="d-flex h-100"
                            >
                                <div class="home__top-banner-text pe-2">
                                    <div class="text-uppercase text-gray">наша аудитория</div>
                                    <div class="text-uppercase h4 m-0">25-45 лет</div>
                                    <div class="text-lowercase text-gray">вы найдете своих слушателей</div>
                                </div>
                                <div class="home__top-banner-icon ms-auto my-auto">
                                    <img src="/assets/temp/users.svg" alt="">
                                </div>
                            </b-card-text>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        components: {
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
