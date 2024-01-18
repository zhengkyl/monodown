module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off",

    "@typescript-eslint/no-explicit-any": "off",

    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",

    "@typescript-eslint/no-unused-vars": "off",
  },
};
