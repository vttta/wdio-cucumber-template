import { config } from './wdio.shared.conf';

// config.maxInstances = 1;
config.capabilities = [
	{
		browserName: 'chrome',
		acceptInsecureCerts: true,
		'goog:chromeOptions': {
			args: [
				'headless',
				'disable-popup-blocking',
				'window-size=1366,768',
				'disable-notifications',
				'lang=en',
				'log-level=3',
			],
			prefs: {
				'intl.accept_languages': 'en,EN',
				'profile.managed_default_content_settings.popups': 1,
				'profile.managed_default_content_settings.notifications': 1,
				'profile.managed_default_content_settings.infobar': 1,
			},
		},
	},
];
config.cucumberOpts.tagExpression = 'not @wip and not @mobile';
config.services = ['chromedriver', 'devtools'];

export { config };
