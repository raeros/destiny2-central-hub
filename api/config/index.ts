// we will only need configuration for production. since bungie doesnt have another envirment to test.
import developmentConfig from './development';
import productionConfig from './production';

const env = process.env.NODE_ENV || 'development';

const config = env === 'production' ? productionConfig : developmentConfig;

export default config;