const { test, expect } = require('@playwright/test');

/* 
npx playwright test
Runs the end-to-end tests.

npx playwright test --project=chromium
Runs the tests only on Desktop Chrome.

npx playwright test UIBasicstest
Runs the tests in a specific file.

npx playwright test --debug
Runs the tests in debug mode.

npx playwright codegen
Auto generate tests with Codegen.

npx playwright test UIBasicstest --debug
Runs the tests in a specific file in debug mode

npx playwright test --grep @Web
Runs all tests with a tag of @Web. Remove all test.only

npx playwright test --config playwright.config.js --project=chrome
Runs one project in a config file

npx playwright test UIBasicstest --config playwright.config.js --project=chrome --grep @Val
Runs one project in a config file with a tag


npx playwright codegen http://google.com
To use Record and Play feature

*/
