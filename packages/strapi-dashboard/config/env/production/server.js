module.exports = ({ env }) => ({
    proxy: true,
    url: env('APP_URL'), // replaces `host` and `port` properties in the development environment
    app: {
        keys: env.array('APP_KEYS')
    },
});
