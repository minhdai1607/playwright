📝 Playwright Test Commands

Note: By default, tests run in headless mode (config: headless: true).

1️⃣ Run all projects in headed mode
npx playwright test --headed


Opens the browser UI for all projects defined in playwright.config.ts.

Useful for debugging and visually observing test execution.

2️⃣ Run tests on multiple browsers/projects
npx playwright test --project=Chromium --project=Firefox --project=WebKit


Runs tests on the selected browsers only.

Can be combined with other flags (e.g., --workers, --headed).

3️⃣ Run tests with custom number of workers
npx playwright test --workers=2


Controls parallel test execution.

2 workers = 2 tests run in parallel.

4️⃣ Combine multiple options
npx playwright test --project=Chromium --project=Firefox --project=iPhone_13 --workers=2


Run selected projects in parallel using 2 workers.

Works with headed mode or any other override flags.

5️⃣ Run tests from a specific file
npx playwright test tests/login.spec.ts --project=Chromium --workers=2


Run tests only in a single test file.

Supports project selection and custom workers.

6️⃣ Run a specific test by name
npx playwright test --grep "Login successfully" --project=Chromium


Runs tests that match the given name/pattern.

Useful for debugging or rerunning a single test.