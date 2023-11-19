import config from '../../../../config';

export const RedditConfig = {
    baseURL: config.REDDIT.BASE_URL_PATH_API,
    timeout: 5000,
    headers: {
        "Authorization": config.REDDIT.AUTHORIZATION,
        "User-Agent": config.REDDIT.USER_AGENT
    },
    params: { }
};