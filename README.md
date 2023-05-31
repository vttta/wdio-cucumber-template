# E2E tests

End-to-end (e2e) tests are used to check if an application works as expected by simulating the interactions of a real user in real-world scenarios.

This e2e testing framework is built using:

- [WebdriverIO](https://webdriver.io/)
- [Cucumber](https://cucumber.io/)
- [Cucumber HTML reporter](https://www.npmjs.com/package/cucumber-html-reporter)

## Setup

1. Make sure you have [Node.js](https://nodejs.org/) and
   [npm](https://www.npmjs.com/) installed on your local machine
2. Clone this repository to your machine
3. Run `npm install` from the root to install the required dependencies
   - You may encounter issues with `package.lock` if your node version is different from other team members
4. Add a Cucumber extension to your IDE, e.g. [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) for VS Code

## Running the Tests

To run current tests:

<!-- TODO -->

1. Run `npm run wdio:shop:web` (or run this script from the `apps/e2e/package.json` file using your IDE runner)

What to expect:

- All tests will be executed in parallel in headless mode
<!-- TODO -->
- Tests will be executed at `https://staging-shop-next.obeta.io/`
- After the execution, the test results will be generated. Open `apps/e2e/.tmp/report/index.html` in your browser to see them

## Writing Tests

To add new tests:

1. Create a new feature file in the `features` directory and add a Cucumber feature and scenarios. Don't forget to use [tags](#tags)
2. Create a new step definition file in the `steps` directory and add the corresponding step definitions for your feature and scenarios
3. Create new Page Objects in the `pages` directory and add the selectors and methods specific to the described pages
4. Write the test code in the step definition file. You can use the files from the `support` folder

- [Cucumber documentation](https://cucumber.io/docs/cucumber/)
- [WebdriverIO documentation](https://webdriver.io/docs/gettingstarted/)
- [Page Objects](https://webdriver.io/docs/pageobjects/)

## Tagging

[Cucumber tags](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) can be used to selectively run or omit a subset of the tests. To use tags, you can add `@tagname` annotations to a `.feature` file, both for features or scenarios. The tag should be above the name of the feature or a scenario. Separate multiple tags with spaces

### Conventions

- Add the `@wip` ("work in progress") tag to exclude new tests from the test execution
  - Remove the `@wip` tag as soon as the test is implemented
- Add `@stable`, `@failing` of `@flaky` tags based on test results, for better visibility and quick regression runs
- Use a `@debug` tag to select tests for debugging ([see below](#debugging-tests))
  - Don't forget to remove all the `@debug` tags before commiting
- Add a unique tag to the whole feature (e.g. `@search` for a search feature)

### Tag expressions

Before running tagged tests, you need to define the _tag expression_ you're going to use to specify which tags to include or exclude, e.g.:

- `@debug` - a single test, or `@search` - all tests in a single feature
- `@login and @stable` - use `and` to run tests that have both tags (can be inherited from a feature)
- `@failing or @flaky` - use `or` to run tests that have either tag
- `not @wip` / `@smoke and not @wip` - use `not` to exclude certain tags from execution
- [Learn more](https://cucumber.io/docs/cucumber/api/?lang=javascript#tag-expressions)

### Running tagged tests

To run tests with specific tags, you can:

- Add the tag expression as a string to the wdio config at `config.cucumberOpts.tagExpression: 'expression'`

  - All scripts that use this config will run the tests according to the added rule
  - See the implementation at `wdio.shared.conf.ts` or `wdio.web.conf.ts`

- Add the `--cucumberOpts.tagExpression '[expression]'` option to a wdio script
  - The use of tags will be overwritten by the value you provided to the script
  - See `wdio:shop:web-smoke` script implementation at `package.json`

## Debugging Tests

See also: [Running the tests](#running-the-tests)

The debug execution uses the latest version of the `shop` app that you need to serve locally, so is can be useful not only for debugging tests, but also for adding new selectors to the code of the app itself

To debug the tests:

<!-- TODO -->

1. Run `npx nx serve shop`
2. Add a `@debug` tag to the desired test(s). Only marked tests will be executed
3. If you need to stop test execution between particular steps, add `And DEBUG` step between them
4. Run the `wdio:shop:web-debug` script

What to expect:

- The selected tests will be executed one-by one and the test browser will be opened
- If you defined a debug point, the execution will be stopped at the `DEBUG` step. You can open Chrome DevTools in the test browser and investigate the app. To exit the debug mode, follow the instructions in your terminal
- The test results will be generated to the same file as after a usual run
