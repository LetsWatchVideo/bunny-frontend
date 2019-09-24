import siteConfig from './site';

export default {
	htmlAttributes: { lang: 'en' },
	title: 'Home',
	defaultTitle: 'Home',
	titleTemplate: `%s - ${siteConfig.name}`,
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
	],
	link: [],
	script: [],
	style: []
};
