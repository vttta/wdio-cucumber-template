# E2E tests

End-to-end (e2e) tests are used to check if an application works as expected by simulating the interactions of a real user in real-world scenarios.

This e2e testing framework is built using:

- [WebdriverIO](https://webdriver.io/)
- [Cucumber](https://cucumber.io/)
- [Cucumber HTML reporter](https://www.npmjs.com/package/cucumber-html-reporter)

## Setup

1. Make sure you have [Node.js](https://nodejs.org/) (v18.16.0 or latest LTS) and
   [npm](https://www.npmjs.com/) (v9.5.1 or later) installed on your local machine.
2. Clone this repository to your machine
3. Run `npm install` from the root to install the required dependencies
   - You may encounter issues with `package.lock` if your node version is different from other team members
4. Add a Cucumber extension to your IDE, e.g. [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) for VS Code

## Running the Tests

To run current tests:

1. Run `npm run wdio:web` (or run this script from the `package.json` file using your IDE runner)

What to expect:

- All tests will be executed in parallel in headless mode
- Tests will be executed at the url defined as the `BASE_URL` at `env.ts`
- After the execution, the test results will be generated. Open `.tmp/report/index.html` in your browser to see them

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
- Add `@stable`, `@failing` or `@flaky` tags based on test results, for better visibility and quick regression runs
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
  - See `wdio:web-debug` script implementation at `package.json`

## Debugging Tests

See also: [Running the tests](#running-the-tests)

1. Add a `@debug` tag to the desired test(s). Only marked tests will be executed
2. If you need to stop test execution between particular steps, add `And DEBUG` step between them
3. Run the `wdio:web-debug` script

What to expect:

- The selected tests will be executed one-by one and the test browser will be opened
- If you defined a debug point, the execution will be stopped at the `DEBUG` step. You can open Chrome DevTools in the test browser and investigate the app. To exit the debug mode, follow the instructions in your terminal
- The test results will be generated to the same file as after a usual run

# VSCode reference

- [How to toggle Auto Save](https://www.kindacode.com/article/how-to-toggle-auto-save-in-vs-code/): Enable auto-save feature and always run the latest state of your tests.
- [How to Format Code on Save](https://www.aleksandrhovhannisyan.com/blog/format-code-on-save-vs-code-eslint/): Understand how to use VS Code's auto-formatting capabilities to keep your code clean and consistent.
- [Run NPM scripts with a Single Click](http://www.matthiassommer.it/programming/testing/run-npm-scripts-in-visual-studio-code-with-a-click-of-a-button/): Discover how to run NPM scripts directly from VS Code's interface, making your workflow more efficient.

- Speed up your workflow by becoming a master of keyboard shortcuts:

  - [Keyboard shortcuts for Windows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
  - [Keyboard shortcuts for macOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
  - [Keyboard shortcuts for Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)
