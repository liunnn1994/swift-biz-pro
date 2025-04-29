export default {
  '*.vue': ['stylelint --allow-empty-input'],
  '*.{scss,sass,less,css}': ['stylelint --allow-empty-input'],
  '**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}': ['pnpm format', 'oxlint', 'eslint --no-warn-ignored'],
};
