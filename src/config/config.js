const config = {
  default: {
    sample: 'sample',
  },
  development: {
    target: 'development',
    apiURL: 'https://us-central1-social-unggoy.cloudfunctions.net/api',
  },
  production: {
    target: 'production',
    apiURL: 'https://us-central1-social-unggoy.cloudfunctions.net/api',
  },
};

export default {
  ...config.default,
  ...config[process.env.NODE_ENV || 'development'],
};
