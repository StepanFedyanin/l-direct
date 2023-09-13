import {app as settings} from '@/settings';
import {REST, RESTError} from './rest';

export default class extends REST {
    static get settings() {
        return settings;
    }

    static obtainToken(params) {
        return this._post(`token/create`, {}, params).then((data) => {
            let tokens = data;
            return tokens;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось авторизоваться');
        });
    }

    static refreshToken(token) {
        return this._post(`token/refresh`, {}, {refresh: token}).then((data) => {
            let tokens = data;
            return tokens;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновит токен');
        });
    }

    static createUser(params) {
        return this._post(`user/create_user`, {}, params).then((data) => {
            let tokens = data;
            return tokens;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось создать пользователя');
        });
    }

    static updateUser(params) {
        return this._post(`user/update_user`, {}, params).then((data) => {
            let user = data;
            return user;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось обновить данные пользователя');
        });
    }

    static resetUser(params) {
        return this._post(`user/password_reset_user`, {}, params).then((data) => {
            let user = data;
            return user;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось сбросить пароль пользователя');
        });
    }

    static getUser() {
        return this._get(`user`, {}, {}).then((data) => {
            let user = data;
            return user;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить пользователя');
        });
    }

    //я меняю тут
    static getUserCampaigns() {
        return this._get(`direct/user_campaign`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить компании');
        });
    }

    static getRegions() {
        return this._get(`direct/locations`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить регионы трансляции');
        });
    }

    static getAdsFile(id) {
        return this._get(`direct/files/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить файл ролика');
        });
    }

    static deleteAdsFile(id) {
        return this._delete(`direct/files/${id}`, {}, {}).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось удалить файл ролика');
        });
    }

    static checkPromocode(promocode) {
        let params = Object.assign({}, {promo_code: promocode});
        return this._post(`direct/promo/get_promo`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось проверить промокод');
        });
    }

    static sendAdsInfo(campaign) {
        let params = Object.assign({}, campaign);
        return this._post(`direct/campaing/text_camp`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось отправить запрос на создание ролика');
        });
    }

    static submitCampaign(campaign) {
        let params = Object.assign({}, campaign);
        //console.log(campaign, params);
        return this._post(`direct/campaing/create_camp`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось сохранить рекламную кампанию');
        });
    }

    static amountCampaign(campaign) {
        let params = Object.assign({}, campaign);
        //console.log(campaign, params);
        return this._post(`direct/campaing/amount`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить стоимость компании');
        });
    }

    static checkPayment(params) {
        // let params = Object.assign({}, campaign);
        //console.log(campaign, params);
        return this._post(`direct/banking/robokassa/payment/check_success_payment`, {}, params).then((data) => {
            return data;
        }).catch((error) => {
            throw new RESTError(error, 'Не удалось получить стоимость компании');
        });
    }
}
