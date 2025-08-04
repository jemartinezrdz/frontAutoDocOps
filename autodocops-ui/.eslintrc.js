module.exports = {
  extends: [
    'expo',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn', // Cambiado de 'error' a 'warn'
    '@typescript-eslint/explicit-function-return-type': 'off', // Deshabilitado para mayor flexibilidad
    'prefer-const': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-unused-expressions': 'off', // Permite expressiones como '_parameter'
  },
  ignorePatterns: [
    'node_modules/',
    '.expo/',
    'dist/',
    'web-build/',
  ],
};

