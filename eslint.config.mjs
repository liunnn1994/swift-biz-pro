import { readFileSync } from 'node:fs';

import globals from 'globals';
import oxlint from 'eslint-plugin-oxlint';
import js from '@eslint/js';
import checkFile from 'eslint-plugin-check-file';
import jsdoc from 'eslint-plugin-jsdoc';
import tsEslint from 'typescript-eslint';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

import withNuxt from './.nuxt/eslint.config.mjs';

const autoImport = JSON.parse(readFileSync('.eslintrc-auto-import.json', 'utf-8'));

export default withNuxt([
  {
    name: 'app/files-to-ignore',
    ignores: [
      '.nuxt',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/*.spec.*',
      'config/**/*',
      'index.html',
      '/*.json',
      '/*.js',
      'playwright.config.ts',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.cts',
      '**/*.mts',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...autoImport.globals,
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  ...tsEslint.config(js.configs.recommended, tsEslint.configs.recommended),
  ...oxlint.configs['flat/recommended'],
  ...defineConfigWithVueTs(pluginVue.configs['flat/recommended'], vueTsConfigs.recommended),
  jsdoc.configs['flat/recommended-error'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-property-type': 'off',
    },
  },
  {
    files: ['src/**/*'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': ['error', { './**/': 'CAMEL_CASE' }],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/components/**/!(index).{jsx,tsx}': 'PASCAL_CASE',
          '**/*/!(index).{vue}': 'PASCAL_CASE',
          '**/*/!(index).{js,ts}': 'CAMEL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
  {
    rules: {
      'jsdoc/require-description': 'error',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: ['js', 'jsx', 'ts', 'tsx'],
            allowNoLang: true,
          },
        },
      ],
      'vue/html-indent': 'off',
      'vue/html-self-closing': ['error', { html: { void: 'always' } }],
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      '@typescript-eslint/no-explicit-any': ['error'],
      'vue/block-order': [
        'error',
        {
          order: [
            'script:not([setup])',
            'script[setup]',
            'template',
            'style:not([scoped])',
            'style[scoped]',
          ],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
        },
      ],
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index'],
        },
      ],
      'vue/no-reserved-component-names': 'error',
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      'vue/comment-directive': 'off',
    },
  },
  {
    files: ['src/constants/**/*'],
    rules: {
      'id-match': [
        'error',
        '^_.*|^[A-Z_0-9$]+$',
        { ignoreDestructuring: true, onlyDeclarations: true },
      ],
    },
  },
]);
