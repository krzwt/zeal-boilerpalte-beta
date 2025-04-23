// config.stylelint.js
export default {
    extends: ['stylelint-config-standard-scss','stylelint-config-clean-order/error'],
    plugins: ['stylelint-scss'],
    rules: {
        'selector-class-pattern': '^[a-z0-9\\-]+$', // kebab-case only
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
        'max-nesting-depth': [4, { ignore: ['pseudo-classes'] }]
    },
    overrides: [
        {
            files: ['**/*.scss'],
            customSyntax: 'postcss-scss',
        },
    ],
};
  