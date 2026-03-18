export default {
  '**/*.{ts,tsx,js,scss,css,html,json,md}?(x)': () => 'pnpm lint',
  '**/*.{ts,tsx}': () => 'pnpm lint-build',
};
