module.exports = {
    PORT: process.env.VCAP_APP_PORT || 3000,
    APP_ID: process.env.APP_ID || '<APP_ID>',
    APP_KEY: process.env.APP_KEY || '<APP_KEY>'
};
