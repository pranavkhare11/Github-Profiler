import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactCompiler from 'eslint-plugin-react-compiler'

export default tseslint.config(
  {
    // Ignore build outputs
    ignores: ['dist']
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // TypeScript parser is required so ESLint can read types
      parser: tseslint.parser,
    },
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      // ESLint will only check this single rule
      'react-compiler/react-compiler': 'error',
    },
  }
)
