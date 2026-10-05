import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import google from 'eslint-config-google';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      ...google.rules,
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
      'max-len': [2, {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignorePattern: 'goog\\.(module|require)',
      }],
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {ecmaFeatures: {jsx: true}},
    },
  },
]);
