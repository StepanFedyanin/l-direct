<template>
    <div class="app__block home-landing d-flex h-100 px-3 px-sm-5">
        <div class="home-landing__block">
            <div class="home-landing__top">
                <div class="home-landing__top-block">
                    <div class="home-landing__top-logo" />
                    <h1 class="home-landing__top-title mb-3">Сервис размещения аудиорекламы<br> в эфире «L» радио</h1>
                    <div class="home-landing__top-info">
                        <ul>
                            <li>Загрузи ролик или напиши текст</li>
                            <li>Выбери город и расписание показов</li>
                            <li>Твоя реклама - в эфире лучшего электронного радио!</li>
                        </ul>
                    </div>
                    <div class="home-landing__top-buttons">
                        <b-button 
                            variant="warning"
                            class="home-landing__top-button px-4 mb-3 m--gradient"
                            size="lg"
                            @click="addCampaign"
                        >
                            Зарегистрироваться
                        </b-button>
                        <b-button 
                            variant="outline-warning"
                            class="home-landing__top-button px-4 mb-3"
                            size="lg"
                            @click="addCampaign"
                        >
                            Войти
                        </b-button>
                    </div>
                </div>
                <div 
                    :class="['home-landing__top-screen', playVideo && 'm--played']"
                >
                    <video 
                        ref="video"
                        @click.prevent="toggleVideoPlay()"
                    >
<!--                        <source src="@/assets/videos/presentation.mp4" type="video/mp4">-->
                        <source src="@/assets/videos/presentation.webm" type="video/webm">
                    </video>
                </div>
                <div class="home-landing__top-logo m--mobile" />
            </div>

            <div class="home-landing__advantages">
                <div class="home-landing__advantages-logo" />
                <div class="home-landing__advantages-block">
                    <div class="home-landing__advantages-item">
                        <div class="home-landing__advantages-item-title">Быстрый запуск рекламы.</div>
                        <p>Уже через 30 минут ваш ролик может звучать в нашем эфире</p>
                    </div>

                    <div class="home-landing__advantages-item">
                        <div class="home-landing__advantages-item-title">Прозрачное ценообразование и низкая стоимость контакта.</div>
                        <p>Стоимость размещения — от 50 рублей за 1 выход ролика</p>
                    </div>

                    <div class="home-landing__advantages-item">
                        <div class="home-landing__advantages-item-title">Самостоятельная гибкая настройка.</div>
                        <p>Можно выбрать один город и один выход рекламного ролика.</p>
                    </div>

                    <div class="home-landing__advantages-item">
                        <div class="home-landing__advantages-item-title">Максимально широкий охват.</div>
                        <p>FM-вещание: Челябинск и область. Онлайн-вещание: весь мир.</p>
                    </div>

                    <div class="home-landing__advantages-item">
                        <div class="home-landing__advantages-item-title">Эмоциональная вовлеченность.</div>
                        <p>Пусть близкие люди услышат ваше поздравление на любимом радио.</p>
                    </div>
                </div>
            </div>

            <b-card
                class="home-landing__steps"
                bodyClass="home-landing__steps-inner"
            >
                <h2 class="home-landing__steps-title">Разместите свой аудиоролик в эфире L</h2>
                <div class="home-landing__steps-content">без участия менеджера по рекламе</div>
                <div class="home-landing__steps-block">
                    <div class="home-landing__steps-block-inner">
                        <div class="home-landing__steps-item">
                            <div class="home-landing__steps-item-title">Зарегистрируйтесь</div>
                        </div>

                        <div class="home-landing__steps-item">
                            <div class="home-landing__steps-item-title">Загрузите свой аудиоролик</div>
                            <p>или напишите текст ролика</p>
                        </div>

                        <div class="home-landing__steps-item">
                            <div class="home-landing__steps-item-title">Выберите город</div>
                            <p>и график выхода ролика</p>
                        </div>

                        <div class="home-landing__steps-item">
                            <div class="home-landing__steps-item-title">Получайте отдачу</div>
                            <p>от рекламы</p>
                        </div>
                    </div>
                    <b-button 
                        variant="warning"
                        class="home-landing__steps-button px-4 mb-3"
                        size="lg"
                        @click="addCampaign"
                    >
                        Войти
                    </b-button>
                </div>
            </b-card>

            <div class="home-landing__about row">
                <div class="home-landing__about-block col-12 col-md-6">
                    <div class="home-landing__about-title">Fm-Вещание</div>
                    <div class="home-landing__about-subtitle">1 000 000 человек в месяц</div>
                    <div class="home-landing__about-content">Челябинск — Аша — Кыштым — Озерск — Касли — Сатка — Снежинск — Вишневогорск — Троицк — Южноуральск — Пласт — Увельское — Юрюзань — Трёхгорный — Катав-Ивановск — Каменск-Уральский — Шадринск — Донецк</div>
                </div>
                <div class="home-landing__about-block col-12 col-md-6">
                    <div class="home-landing__about-title">Онлайн-вещание</div>
                    <div class="home-landing__about-subtitle">100 000 человек в неделю</div>
                    <div class="home-landing__about-content">Весь мир</div>
                </div>
            </div>

            <b-card
                class="home-landing__banner"
                bodyClass="home-landing__banner-inner"
            >
                <div class="home-landing__banner-title">Аудитория</div>
                <div class="home-landing__banner-subtitle">25-45 лет</div>
                <div class="home-landing__banner-content">вы найдете своих слушателей</div>
            </b-card>

            <div class="home-landing__categories">
                <div class="home-landing__categories-inner">
                    <div class="home-landing__categories-text" data-text="Автодилеры — Автозапчасти, аккумуляторы — Автомойки — Автосервисы —  Автошколы — Агентства недвижимости — АЗС — Базы отзыха — Бани — Автозапчасти, аккумуляторы — Автомойки — Автосервисы —  Автошколы — Агентства недвижимости — АЗС — Базы отзыха — Бани — Автозапчасти, аккумуляторы — Автомойки — Автосервисы —  Автошколы — Агентства недвижимости — АЗС — Базы отзыха — Бани">
                        Автодилеры — Автозапчасти, аккумуляторы — Автомойки — Автосервисы —  Автошколы — Агентства недвижимости — АЗС — Базы отзыха — Бани — Автозапчасти, аккумуляторы — Автомойки — Автосервисы —  Автошколы — Агентства недвижимости — АЗС — Базы отзыха — Бани — Автозапчасти, аккумуляторы — Автомойки — Автосервисы —  Автошколы — Агентства недвижимости — АЗС — Базы отзыха — Бани
                    </div>
                </div>
            </div>

            <div class="home-landing__services">
                <div class="home-landing__services-title h1">Варианты размещения</div>
                <div class="home-landing__services-block">
                    <b-card 
                        class="home-landing__services-item"
                        bodyClass="home-landing__services-item-inner"
                    >
                        <div class="home-landing__services-item-title">Есть готовый аудиоролик</div>
                        <div class="home-landing__services-item-content">Запустим ваш ролик длиной до 20 секунд в эфир L в любом городе вещания</div>
                    </b-card>                    

                    <b-card 
                        class="home-landing__services-item"
                        bodyClass="home-landing__services-item-inner"
                    >
                        <div class="home-landing__services-item-title">Хочу поздравить с днЁм рождения</div>
                        <div class="home-landing__services-item-content">Наши ведущие поздравят ваших близких от души.<br>Выберите день и город, напишите имя и все, что хочется пожелать</div>
                    </b-card>                    

                    <b-card 
                        class="home-landing__services-item"
                        bodyClass="home-landing__services-item-inner"
                    >
                        <div class="home-landing__services-item-title">Есть текст, нужно озвучить</div>
                        <div class="home-landing__services-item-content">Оценим ваш текст и свяжемся для изготовления ролика.<br>Возможно, посоветуем, как его улучшить</div>
                    </b-card>                    

                    <b-card 
                        class="home-landing__services-item"
                        bodyClass="home-landing__services-item-inner"
                    >
                        <div class="home-landing__services-item-title">Есть идея, нужно обсудить</div>
                        <div class="home-landing__services-item-content">Опишите идею в свободной форме.<br>Свяжемся и поможем с текстом, озвучкой, стратегией</div>
                    </b-card>                    
                </div>
            </div>

            <div class="home-landing__calc">
                <div class="home-landing__calc-title h1">Расчитайте стоимость размещения</div>
                <div class="home-landing__calc-block">
                    <div class="home-landing__calc-block-inner">
                        <b-card 
                            class="home-landing__calc-regions"
                            bodyClass="home-landing__calc-regions-inner"
                        >
                            Выберите регионы трансляции
                            <b-list-group
                                class="list-group-no-border"
                            >
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                                <b-list-group-item class="home-landing__calc-regions-item">
                                    <b-form-checkbox
                                        name="regions"
                                        :value="0"
                                    >
                                        Челябинск
                                    </b-form-checkbox>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>
                        <b-form-input
                            id="count"
                            v-model="count"
                            size="lg"
                            placeholder="Количество выпусков"
                            class="home-landing__calc-count"
                        ></b-form-input>

                        <div class="home-landing__calc-result">Ваш бюджет: 13 607 ₽</div>
                        <b-button 
                            variant="warning"
                            class="home-landing__calc-button px-4"
                            size="lg"
                            @click="addCampaign"
                        >
                            Разместить рекламу
                        </b-button>
                    </div>
                    <div class="home-landing__calc-block-icon"></div>
                </div>
            </div>

            <div class="home-landing__reviews">
                <div class="home-landing__reviews-title h1">Нас уже оценили</div>
                <div class="home-landing__reviews-block">
                    <Splide
                        ref="reviews"
                        :options="reviewsOptions"
                    >
                        <SplideSlide
                            v-for="review in reviews"
                            :key="`review-${review.id}`"
                        >
                            <b-card 
                                class="home-landing__reviews-item"
                                bodyClass="home-landing__reviews-item-inner"
                            >
                                <div class="home-landing__reviews-item-name">{{ review.name }}</div>
                                <div class="home-landing__reviews-item-title">{{ review.post }}</div>
                                <div class="home-landing__reviews-item-date">{{ $helpers.formatDate(new Date(review.date), 'DD.MM.YY') }}</div>
                                <div class="home-landing__reviews-item-content">{{ review.review }}</div>
                            </b-card>                    
                        </SplideSlide>
                    </Splide>
                </div>
            </div>

            <b-card
                class="home-landing__banner m--bottom"
                bodyClass="home-landing__banner-inner"
            >
                <div class="home-landing__banner-title">L-Директ</div>
                <div class="home-landing__banner-content mb-4">Ваша реклама в эфире радио с топовой электронной музыкой!</div>
                <b-button 
                    variant="warning"
                    class="home-landing__banner-button m--gradient px-4 mb-3 me-auto"
                    size="lg"
                    @click="addCampaign"
                >
                    Войти
                </b-button>
            </b-card>

            <div class="home-landing__footer">
                <div class="home-landing__footer-copyright">
                    2022-2023. Все права защищены
                    <div class="home-landing__footer-menu">
                        <a href="#" class="home-landing__footer-menu-link">Политика конфиденциальности</a>
                        <a href="#" class="home-landing__footer-menu-link">Договор-оферта</a>
                    </div>
                </div>
                <div class="home-landing__footer-site">
                    <a href="//lradio.ru" target="_blamk" class="home-landing__footer-site-link">Переходите на L</a>
                </div>
                <div class="home-landing__footer-developer">
                    <a href="//lradio.ru" target="_blamk" class="home-landing__footer-developer-link">Спасибо нашим друзьям из Flexites за наш классный сайт!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Splide, SplideSlide } from '@splidejs/vue-splide';
    export default {
        name: 'homeLanding',
        components: {
            Splide,
            SplideSlide,
        },
        props: {
        },
        data() {
            return {
                playVideo: false,
                reviews: [{
                    id: 1,
                    person: '',
                    post: '',
                    date: '2023-05-12',
                    review: 'Сотрудничество с «L» радио было очень приятным и результативным. Моя реклама была размещена в эфире по всей области, что позволило мне достичь большей узнаваемости. Спасибо вам за сотрудничество!'
                }, {
                    id: 2,
                    person: '',
                    post: '',
                    date: '2023-06-24',
                    review: 'Я бы хотел выразить благодарность «L» радио за помощь в создании аудиороликов для моей компании. Результаты превзошли мои ожидания, и я уже наблюдаю увеличение продаж.'
                }, {
                    id: 3,
                    person: '',
                    post: '',
                    date: '2023-06-27',
                    review: 'Я очень доволен работой менеджеров «L» радио. Они были очень профессиональны и внимательны к моим потребностям, помогли мне выбрать наилучший вариант размещения рекламы и всегда были на связи, чтобы ответить на мои вопросы и решить любые проблемы. Я рекомендую эту компанию всем, кто ищет надежного партнера для размещения рекламы в эфире радиостанций.'
                }, {
                    id: 4,
                    person: '',
                    post: '',
                    date: '2023-07-07',
                    review: 'Я сотрудничал с «L» радио и могу сказать, что это было верным решением. Слушателям откликается моя реклама, что и привело к увеличению продаж.'
                }, {
                    id: 5,
                    person: '',
                    post: '',
                    date: '2023-08-20',
                    review: 'Хочу выразить благодарность менеджерам «L» радио за их профессионализм и внимательное отношение к моим потребностям. Они помогли нам согласовать ролик по всем законам и регламентам, всегда были на связи и выполнили заказ в срок. Спасибо)'
                }],
                reviewsOptions: {
                    type        : 'loop',
                    //rewind      : true,
                    start       : 0,
                    //autoHeight  : true,
                    perPage     : 3,
                    //width       : 800,
                    gap         : '1rem',
                    padding     : '2',
                    pagination  : false,
                    //direction   : 'ttb',
                    //height      : '100%',
                    //heightRatio : 0.6,
                    //fixedWidth  : 160,
                    
                    //fixedHeight : 220,
                    cover       : true,
                    //focus       : 'center',
                    isNavigation: true,
                    cloneStatus : false,
                    //arrowPath: '0',
                    breakpoints: {
                        1199: {
                            perPage: 2,
                        },
                        761: {
                            perPage: 1,
                        },
                    }
                },
                showTopBanner: [true, true, true],
                showPromo: false
            };
        },
        computed: {
        },
        created() {
        },
        methods: {
            toggleVideoPlay() {
                this.playVideo = !this.playVideo;
                console.log(this.playVideo);
                this.playVideo ? this.$refs.video.play() : this.$refs.video.pause();
            },
            addCampaign() {
                this.$router.push({ name: 'campaign' });
            }
        }
    };
</script>
