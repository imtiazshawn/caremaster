module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:unicorn/recommended",
    // "plugin:replo/all",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: [
    "@typescript-eslint",
    "react-hooks",
    "import",
    "simple-import-sort",
    "object-merge",
  ],
  rules: {
    // Would be nice to enable later, but there are some current issues: https://github.com/eslint/eslint/issues/12156
    // "quotes": ["error", "double"]
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: "Please use lodash-es instead.",
          },
          {
            name: "lodash-es",
            message:
              "Please use the fully qualified lodash package, lodash-es/*",
          },
        ],
      },
    ],
    "import/no-duplicates": "error",
    "key-spacing": "error",
    "consistent-return": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "no-unsafe-optional-chaining": "error",
    "no-template-curly-in-string": "error",
    "simple-import-sort/imports": "error",
    "no-empty-pattern": "error",
    "no-implicit-coercion": "error",
    "no-unused-expressions": [
      "error",
      {
        enforceForJSX: true,
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error", // this rule doesn't produce consistent results and is sometimes not correct
    "react/prop-types": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
    "@typescript-eslint/no-non-null-assertion": "off", // This is actually useful sometimes
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: false,
        types: {
          String: {
            message: "Use string (lowercase) instead",
            fixWith: "string",
          },
          Boolean: {
            message: "Use boolean (lowercase) instead",
            fixWith: "boolean",
          },
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "react/jsx-key": "error",
    "react/display-name": "error",
    "@typescript-eslint/no-empty-function": "error", // would be nice to enable
    curly: "error",
    "spaced-comment": ["error", "always"],
    "prefer-template": "error",
    "unicorn/no-null": "off", // I don't agree with this
    "unicorn/filename-case": "off", // I don't agree with this
    "unicorn/prevent-abbreviations": "off", // Would be nice to enable
    "unicorn/catch-error-name": "error",
    "unicorn/prefer-spread": "off", // I don't agree with this
    "unicorn/prefer-query-selector": "error",
    "unicorn/prefer-optional-catch-binding": "error",
    "unicorn/no-array-callback-reference": "error", // Would be nice to enable
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-useless-undefined": "off", // Interferes with typescript with useState<string | undefined>
    "unicorn/prefer-number-properties": "error",
    "unicorn/consistent-function-scoping": "off", // Meh don't agree
    "unicorn/prefer-add-event-listener": "error",
    "unicorn/better-regex": "error",
    "unicorn/no-lonely-if": "error",
    "unicorn/no-zero-fractions": "error",
    "unicorn/prefer-modern-dom-apis": "error",
    "unicorn/prefer-dom-node-dataset": "error",
    "unicorn/error-message": "error", // Nice to enable
    "unicorn/prefer-string-slice": "error",
    "unicorn/prefer-dom-node-text-content": "error",
    "unicorn/no-object-as-default-parameter": "error",
    "unicorn/prefer-set-has": "error",
    "unicorn/prefer-object-from-entries": "off", // It's fine to just use reduce
    "unicorn/no-nested-ternary": "error",
    "unicorn/prefer-default-parameters": "error",
    "unicorn/no-array-for-each": "off", // Don't agree with this
    "unicorn/numeric-separators-style": "error",
    "unicorn/prefer-dom-node-remove": "error",
    "unicorn/prefer-dom-node-append": "error",
    "unicorn/prefer-ternary": "off", // Doesn't always make sense
    "unicorn/no-array-reduce": "off", // Don't agree with this
    "unicorn/consistent-destructuring": "off", // This is nice but tbh it's nice to not destructure sometimes
    "unicorn/no-abusive-eslint-disable": "off", // Don't tell me what to do!
    "unicorn/prefer-node-protocol": "off", // Avoid eslint adding node: protocol
    "unicorn/prefer-module": "off", // Allow us to use __dirname and __filename
    "unicorn/no-negated-condition": "off",
    "unicorn/switch-case-braces": ["error", "avoid"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-constant-binary-expression": "error",

    "no-else-return": "error",
    "default-case": ["error", { commentPattern: "^no default$" }],
    "dot-location": ["error", "property"],
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-caller": "error",
    "no-cond-assign": ["error", "except-parens"],
    "no-const-assign": "error",
    "no-control-regex": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty-character-class": "error",
    "no-eval": ["error", { allowIndirect: true }],
    "no-ex-assign": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "no-func-assign": "error",
    "no-implied-eval": "error",
    "no-invalid-regexp": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": ["error", { allowLoop: true, allowSwitch: false }],
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-mixed-operators": [
      "error",
      {
        groups: [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"],
        ],
        allowSamePrecedence: false,
      },
    ],
    "no-multi-str": "error",
    "no-global-assign": "error",
    "no-unsafe-negation": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-regex-spaces": "error",
    "no-restricted-syntax": ["error", "WithStatement"],
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-unreachable": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": [
      "error",
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    "no-with": "error",
    "no-whitespace-before-property": "error",
    "require-yield": "error",
    "rest-spread-spacing": ["error", "never"],
    strict: ["error", "never"],
    "unicode-bom": ["error", "never"],
    "use-isnan": "error",
    "valid-typeof": "error",
    "no-restricted-properties": [
      "error",
      {
        object: "require",
        property: "ensure",
        message:
          "Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting",
      },
      {
        object: "System",
        property: "import",
        message:
          "Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "getter-return": "error",
    "object-merge/no-side-effects": [
      "error",
      {
        // Names of function calls to validate for possible side effects (optional, default shown below)
        functionNames: ["merge"],

        // Names of packages from which functions must be imported in order to be validated (optional, default shown below)
        packageNames: ["lodash-es", "lodash-es/merge"],
      },
    ],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  ignorePatterns: [
    "*.svg",
    "*.bundle.js",
    "*.mdx",
    "*.json",
    "*.d.ts",
    "dist/*",
  ],
};
