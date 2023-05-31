import { PickleStep } from '@cucumber/messages';
import type { Options } from '@wdio/types';
import * as moment from 'moment';
import { generate } from 'multiple-cucumber-html-reporter';
import * as dns from 'node:dns';
import * as path from 'path';
import cucumberJson from 'wdio-cucumberjs-json-reporter';

import { BASE_URL } from './env';

// this is needed for cucumberOpts.require to work on windows
function getAbsoluteGlob(relativeGlob: string): string {
	return path.resolve(__dirname, relativeGlob).replace(/\\/g, '/');
}

export class ExtendedPickleStep extends PickleStep {
	keyword: string;
}

export interface Context {
	attach: unknown;
	log: unknown;
	parameters: unknown;
	wdioRetries: unknown;
	[key: string]: unknown;
}

let reportOptions;

export const config: Options.Testrunner = {
	autoCompileOpts: {
		autoCompile: true,
		tsNodeOpts: {
			transpileOnly: true,
			project: 'tsconfig.json',
			require: ['tsconfig-paths/register'],
		},
	},

	exclude: [],
	maxInstances: 1,

	capabilities: [],
	logLevel: 'error',
	bail: 0,
	baseUrl: BASE_URL,
	waitforTimeout: 10_000,
	connectionRetryTimeout: 30_000,
	connectionRetryCount: 10,
	services: [],
	framework: 'cucumber',
	specFileRetries: 0,
	specFileRetriesDelay: 0,
	specFileRetriesDeferred: false,
	reporters: ['cucumberjs-json'],

	cucumberOpts: {
		require: [getAbsoluteGlob('./**/*.steps.ts')],
		backtrace: false,
		requireModule: [],
		dryRun: false,
		failFast: false,
		snippets: true,
		source: true,
		strict: false,
		tagExpression: 'not @wip',
		timeout: 25 * 60_000,
		ignoreUndefinedDefinitions: false,
	},

	onPrepare() {
		reportOptions = { startDate: new Date() };
	},

	beforeSession(config, capabilities, specs, cid) {
		dns.setDefaultResultOrder('ipv4first');
	},

	async beforeScenario(world, context) {
		if (config.maxInstances === 1) console.log(world.pickle.name);
		await browser.maximizeWindow();
	},

	beforeStep(step: ExtendedPickleStep, scenario, context: Context) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { attach, log, parameters, wdioRetries, ...updatedContext } = context;
		if (Object.keys(updatedContext).length !== 0) {
			cucumberJson.attach(`World: ${JSON.stringify(updatedContext, null, 2)}`);
		}

		if (config.maxInstances > 1) return;

		let space = '';
		switch (step.keyword) {
			case 'When ':
			case 'Then ':
				space = ' ';
				break;
			case 'And ':
			case 'But ':
				space = '  ';
				break;
			case '* ':
				space = '    ';
				break;
		}
		console.log(scenario.id + ': ' + space + step.keyword + step.text);
	},

	afterStep: async function (world, result, step) {
		if (!step.passed) {
			cucumberJson.attach(await browser.getUrl());
			cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
		}
	},

	async afterScenario(world, result, context) {
		if (config.maxInstances > 1) {
			console.log(world.pickle.name);
		}
		if (result.passed) {
			console.log('=== PASSED ===');
		} else if (!result.passed) {
			console.log('***** FAILED *****');
		}
		console.log('');
		await browser.reloadSession();
	},

	onComplete: (exitCode, config, capabilities, results) => {
		const finishDate = new Date();
		generate({
			jsonDir: '.tmp/json/',
			reportPath: '.tmp/report/',
			displayDuration: true,
			displayReportTime: true,
			// customMetadata: {},
			hideMetadata: true,
			pageTitle: `WDIO report`,
			// reportName: `WDIO report`,
			customData: {
				title: 'Run info',
				data: [
					{ label: 'App:', value: 'WDIO' },
					{
						label: 'Start date:',
						value: moment(reportOptions.startDate).format('MMM DD, YYYY'),
					},
					{
						label: 'Start time:',
						value: moment(reportOptions.startDate).format('HH:mm:ss UTC Z'),
					},
					{
						label: 'Finish time:',
						value: moment(finishDate).format('HH:mm:ss UTC Z'),
					},
				],
			},
		});
	},
};
