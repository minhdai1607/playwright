## Playwright Test Commands

Note: By default, tests run in headless mode (config: headless: true).

## Run all projects in headed mode
npx playwright test --headed


Opens the browser UI for all projects defined in playwright.config.ts.

Useful for debugging and visually observing test execution.

## Run tests on multiple browsers/projects
npx playwright test --project=Chromium --project=Firefox --project=WebKit


Runs tests on the selected browsers only.

Can be combined with other flags (e.g., --workers, --headed).

## Run tests with custom number of workers
npx playwright test --workers=2


Controls parallel test execution.

2 workers = 2 tests run in parallel.

## Combine multiple options
npx playwright test --project=Chromium --project=Firefox --project=iPhone_13 --workers=2


Run selected projects in parallel using 2 workers.

Works with headed mode or any other override flags.

## Run tests from a specific file
npx playwright test tests/login.spec.ts --project=Chromium --workers=2


Run tests only in a single test file.

Supports project selection and custom workers.

Run a specific test by name
npx playwright test -g "Login successfully" --project=Chromium


Runs tests that match the given name/pattern.

Useful for debugging or rerunning a single test.

## 7 Rerun failed case
npx playwright test --last-failed
npx playwright test tests/okx/check-balance.spec.ts --last-failed

## 8 Run with headed and slow
npx playwright test --last-failed --headed --slow-mo=500

## 9 Run on different environment
cross-env TEST_ENV=staging playwright test --project=chromium --headed --workers=1

## Other solutions:
npm playwright test
npm playwright codegen
npm playwright test:ui
npm playwright test:staging
npm playwright test:prod
...