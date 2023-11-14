module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next/core-web-vitals"],
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname
    },
    plugins: ["@typescript-eslint"]
  };