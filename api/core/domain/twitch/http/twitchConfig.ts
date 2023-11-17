import config from '../../../../config';

export const TwitchConfig = {
    baseURL: config.TWITCH.BASE_URL_PATH_API,
    timeout: 5000,
    headers: {
        "Client-ID": config.TWITCH.CLIENT_ID,
        "Authorization": config.TWITCH.AUTHORIZATION
    },
    params: { }
};