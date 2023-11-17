import config from '../../../../config';

export const bungieConfig = {
    baseURL: config.BUNGIE.DESTINY_2.BASE_URL_PATH_API,
    timeout: 5000,
    headers: {
        "X-API-KEY": config.BUNGIE.DESTINY_2.X_API_KEY
    },
    params: {
        "components": "205, 200" // return information about: characters and characterEquipmentCurrentEquipped
    }
};