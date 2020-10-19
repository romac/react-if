module.exports = {
  extends: ['@favware/eslint-config-react-app', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['./tsdx.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ]
};
