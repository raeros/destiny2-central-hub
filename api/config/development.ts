const developmentConfig = {
    DATABASE: {},
    SERVER: {
        PORT: process.env.PORT || 3000,
    },
    BUNGIE: {
        URL_ROOT: "https://bungie.net",
        DESTINY_2: {
            BASE_URL_PATH_API: "https://www.bungie.net/Platform/",
            MEMBERSHIP_TYPE: process.env.BUNGIE_MEMBERSHIP_TYPE,
            MEMBERSHIP_ID: process.env.BUNGIE_MEMBERSHIP_ID,
            X_API_KEY: process.env.BUNGIE_X_API_KEY
        }
    },
    TWITCH: {
        BASE_URL_PATH_API: "https://api.twitch.tv/helix",
        CLIENT_ID: process.env.TWITCH_CLIENT_ID,
        AUTHORIZATION: process.env.TWITCH_AUTHORIZATION
    },
    REDDIT: {
        BASE_URL_PATH_API: "https://oauth.reddit.com",
        AUTHORIZATION: process.env.REDDIT_AUTHORIZATION,
        USER_AGENT: process.env.REDDIT_USER_AGENT
    }
};

export default developmentConfig;
