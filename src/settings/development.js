const ajax = {
    timeout: 75000,
    responseType: 'json',
    responseEncoding: 'utf8'
};

const serviceUrl = {
    url: '//l-direct.flexidev.ru',
    localPath: '//localhost',
    protocol: 'http',
    port: '8000',
    api: '/api',
    onLocal: false
}

let urlPath = `${serviceUrl.url}${serviceUrl.api}`;
if (serviceUrl.onLocal || window.location.hostname === 'localhost') {
    urlPath = `${serviceUrl.localPath}:${serviceUrl.port}${serviceUrl.api}`;
}

let servicePath = `${serviceUrl.protocol}:${window.location.hostname === 'localhost' ? 
                serviceUrl.localPath + ':' + serviceUrl.port : serviceUrl.url }`

const app = {
    url: `${urlPath}`,
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const cache = {
    storage: 'sessionStorage'
};

const logger = {
    url: `${urlPath}/logger`,
    level: 'debug',
    token: 'c7d63a2e58d186ae3760a5f7c690293e973c08c4'
};

const mainMenu = [
    {
/*
        link: '/home',
        name: 'home',
        role: 'all',
        icon: 'home',
        title: 'Главная'
    }, {
*/
        link: '/campaign',
        name: 'campaign',
        role: 'all',
        icon: 'campaign',
        title: 'Создать кампанию'
    }, {
        link: '/campaigns',
        name: 'campaigns',
        role: 'all',
        icon: 'campaigns',
        title: 'Мои кампании'
    }, {
        link: '/reports',
        name: 'reports',
        role: 'all',
        icon: 'reports',
        title: 'Отчеты'
    }, {
        link: '/pay',
        name: 'pay',
        role: 'all',
        icon: 'pay',
        title: 'Платные ролики'
    }
]

const accountMenu = [
    {
        link: '/profile',
        name: 'profile',
        role: 'all',
        icon: 'profile',
        title: 'Профиль'
    }, {
        link: '/alerts',
        name: 'alerts',
        role: 'all',
        icon: 'alerts',
        title: 'Уведомления'
    }
]

const topMenu = [
    {
        link: '/profile',
        name: 'profile',
        role: 'all',
        icon: 'settings',
        title: 'Профиль'
    }, {
        link: '/alerts',
        name: 'alerts',
        role: 'all',
        icon: 'alerts',
        title: 'Уведомления'
    }
]

export {
    ajax,
    app,
    cache,

    logger,

    mainMenu,
    accountMenu,
    topMenu,
    servicePath
};