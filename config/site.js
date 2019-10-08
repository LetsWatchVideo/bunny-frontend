export default {
	baseURL: process.env.NODE_ENV === 'production' ? 'https://api.letswatch.video' : 'http://127.0.0.1:9000',
	name: 'Let\'s Watch',
	dsn: process.env.SENTRY_DSN,
	debug: true
};
