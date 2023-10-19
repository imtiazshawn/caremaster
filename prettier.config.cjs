// prettier.config.js
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: true,
  semi: false,
  trailingComma: "es5",
  jsxSingleQuote: true,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      options: {
        tabWidth: 4,
        trailingComma: "all",
      },
    },
  ],
};
