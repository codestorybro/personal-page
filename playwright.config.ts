import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:3074';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL },
  webServer: {
    command: 'yarn dev:next --hostname 127.0.0.1 --port 3074',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
