import stagingData from './staging/data';
import productData from './product/data';

type Environment = 'staging' | 'production';

const getEnvironment = (): Environment => {
    const env = process.env.TEST_ENV?.toLowerCase();
    if (env === 'production' || env === 'prod') {
        return 'production';
    }
    // Default to staging
    return 'staging';
};

const getEnvironmentData = () => {
    const env = getEnvironment();
    console.log(`Running tests on: ${env.toUpperCase()} environment`);
    
    switch (env) {
        case 'production':
            return productData;
        case 'staging':
        default:
            return stagingData;
    }
};

const envData = getEnvironmentData();

export const TEST_URLS = envData.TEST_URLS;
export const mailinatorUsers = envData.mailinatorUsers;
export const currentEnvironment = getEnvironment();

export default envData;

