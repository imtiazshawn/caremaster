// prettier.config.js
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  trailingComma: "es5",
  jsxSingleQuote: true,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      options: {
        tabWidth: 2,
        trailingComma: "all",
      },
    },
  ],
};
