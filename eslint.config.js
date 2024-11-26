import typescript from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: [
      'src/**/*.ts',
      'src/*.ts',
      'tests/**/*.ts',
      'tests/*.ts',
      'data/**/*',
      'data/*',
    ],
    plugins: {
      '@typescript-eslint': typescript,
      playwright: playwright,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
      // Enforce naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'], // Enforce camelCase for default variables
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'], // Allow camelCase and UPPER_CASE for variables
        },
        {
          selector: 'function',
          format: ['camelCase'], // Enforce camelCase for function names
        },
        {
          selector: 'class',
          format: ['PascalCase'], // Enforce PascalCase for class names
        },
        {
          selector: 'interface',
          format: ['PascalCase'], // Enforce PascalCase for interfaces
          prefix: ['I'], // Optional: Require 'I' prefix for interfaces
        },
      ],
      'prettier/prettier': 'error', // Ensure Prettier formatting rules
    },
  },
  eslintPluginPrettierRecommended,
];
