// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignore generated & vendor stuff
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },

  // Base recommended configs
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier
  eslintPluginPrettierRecommended,

  // Project-wide language options
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,           // uses your tsconfig.* automatically
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Project-wide rules
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },

  // Test-only overrides (relax "unsafe" in tests)
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
);
