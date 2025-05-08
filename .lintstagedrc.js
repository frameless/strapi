module.exports = {
  '**/*.{ts,tsx,js,scss,css,html,json,md}?(x)': () => 'npm run lint',
  '**/*.{ts,tsx}': () => 'npm run lint-build',
};
