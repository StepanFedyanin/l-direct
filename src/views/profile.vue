<template>
    <topBar />
    <div class="app__block home d-flex w-100 flex-row">
        <sideBar />

        <div class="app__main profile pb-5">
            <h1 class="profile__title mb-5">Ваш профиль</h1>
            <h2 class="profile__title mb-2">Персональные данные</h2>
            <b-form
                class="form mb-5"
                @submit="onSubmitProfile"
            >
                <b-card
                    body-class="d-flex flex-column"
                    class="position-relative overflow-hidden"
                >
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-person"
                                class="w-100 mt-auto"
                                label="Ваш e-mail/логин"
                            >
                                <b-form-input
                                    id="input-email"
                                    v-model="user.email"
                                    disabled
                                    size="lg"
                                ></b-form-input>                
                            </b-form-group>
                        </div>                            
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-phone"
                                class="w-100 mt-auto"
                                label="Ваш телефон"
                            >
                                <b-form-input
                                    id="input-phone"
                                    v-model="user.phone"
                                    size="lg"
                                ></b-form-input>                
                            </b-form-group>
                        </div>
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-fname"
                                class="w-100 mt-auto"
                                label="Имя"
                            >
                                <b-form-input
                                    id="input-fname"
                                    v-model="user.first_name"
                                    size="lg"
                                ></b-form-input>                
                            </b-form-group>
                        </div>
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-lname"
                                class="w-100 mt-auto"
                                label="Фамилия"
                            >
                                <b-form-input
                                    id="input-lname"
                                    v-model="user.last_name"
                                    size="lg"
                                ></b-form-input>                
                            </b-form-group>
                        </div>
                    </div>
                    <b-alert
                        variant="warning"
                        fade
                        v-model="dismissCountDownProp"
                        @dismissed="dismissCountDownProp=0"
                        @dismiss-count-down="countDownChangedProp"
                    >
                        Ваши данные изменены.
                    </b-alert>
                    <b-button 
                        type="submit" 
                        variant="warning"
                        class="d-block col-12"
                        size="lg"
                    >
                        Изменить
                    </b-button>
                    <b-overlay 
                        :show="showLoaderProfSending" 
                        no-wrap
                        spinner-variant="warning"
                    />
                </b-card>
            </b-form>

            <h2 class="profile__title mb-2">Сменить пароль</h2>
            <b-form
                class="form"
                @submit="onSubmitPassword"
            >
                <b-card
                    body-class="d-flex flex-column"
                    class="position-relative overflow-hidden"
                >
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-password"
                                class="w-100 mt-auto"
                                label="Новый пароль"
                            >
                                <b-form-input
                                    id="input-password"
                                    v-model="password"
                                    type="password"
                                    required
                                    size="lg"
                                    :state="formErrorsPass ? false : null"
                                ></b-form-input>                
                            </b-form-group>
                        </div>                            
                        <div class="col-12 col-md-6">
                            <b-form-group
                                id="input-group-password-rep"
                                class="w-100 mt-auto"
                                label="Новый пароль, еще раз"
                            >
                                <b-form-input
                                    id="input-password-rep"
                                    v-model="passwordRep"
                                    type="password"
                                    required
                                    size="lg"
                                    :state="formErrorsPass ? false : null"
                                ></b-form-input>                
                                <b-form-invalid-feedback id="input-password-feedback">
                                    Пароли не одинаковые
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </div>
                    </div>
                    <b-alert
                        variant="warning"
                        fade
                        v-model="dismissCountDownPass"
                        @dismissed="dismissCountDownPass=0"
                        @dismiss-count-down="countDownChangedPass"
                    >
                        Ваш пароль изменен.
                    </b-alert>
                    <b-button 
                        type="submit" 
                        variant="warning"
                        class="d-block col-12"
                        size="lg"
                    >
                        Изменить
                    </b-button>
                    <b-overlay 
                        :show="showLoaderPassSending" 
                        no-wrap
                        spinner-variant="warning"
                    />
                </b-card>
            </b-form>
        </div>
    </div>
</template>

<script>
    import { app } from "@/services";
    import topBar from '@/components/topBar';
    import sideBar from '@/components/sideBar';
    export default {
        name: 'profile',
        components: {
            topBar,
            sideBar,
        },
        props: {
        },
        data() {
            return {
                dismissSecs: 3,
                dismissCountDownProp: 0,
                dismissCountDownPass: 0,
                showLoaderProfSending: false,
                showLoaderPassSending: false,
                user: this.$store.state.user,
                password: '',
                passwordRep: '',
                formErrorsPref: {},
                formErrorsPass: false
            };
        },
        computed: {
        },
        created() {
        },
        methods: {
            countDownChangedProp(dismissCountDown) {
                this.dismissCountDownProp = dismissCountDown;
            },
            countDownChangedPass(dismissCountDown) {
                this.dismissCountDownPass = dismissCountDown;
            },
            onSubmitProfile() {
                this.showLoaderProfSending = true;
                this.formErrors = {};
                let params = Object.assign({}, this.user);
                delete params.id;
                delete params.email;
                delete params.date_joined;
                delete params.last_login;
                app.updateUser(params).then(res => {
                    this.showLoaderProfSending = false;
                    this.dismissCountDownProp = this.dismissSecs;
                    this.$store.dispatch('setUser', res);
                }).catch(err => {
                    this.showLoaderProfSending = false;
                    if (err.response.status == 400) {
                        this.formErrors = err.response.data.error;
                    } else {
                        this.$store.dispatch('showError', err);
                        console.error(err);
                    }
                });
            },
            onSubmitPassword() {
                this.formErrorsPass = false;
                if (this.password != this.passwordRep) {
                    this.formErrorsPass = true;
                } else {
                    this.showLoaderPassSending = true;
                    app.updateUser({
                        password: this.password
                    }).then(() => {
                        this.showLoaderPassSending = false;
                        this.dismissCountDownPass = this.dismissSecs;
                        this.password = '';
                        this.passwordRep = '';
                    }).catch(err => {
                        this.showLoaderPassSending = false;
                        if (err.response.status == 400) {
                            this.formErrors = err.response.data.error;
                        } else {
                            this.$store.dispatch('showError', err);
                            console.error(err);
                        }
                    });
                }
            },
        }
    };
</script>
