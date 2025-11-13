import { PlaywrightTestConfig } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://wemovies-qa.s3-website.us-east-2.amazonaws.com';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  use: {
    baseURL: BASE_URL,
    headless: false,
    trace: 'on',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    ignoreHTTPSErrors: true,
    video: 'on'
  },
  reporter: [['list'], ['html', { open: 'never' }]]
};

export default config;
