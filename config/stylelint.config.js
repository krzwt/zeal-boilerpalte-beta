/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  rules: {
    'selector-class-pattern': '^[a-z0-9\\-]+$', // kebab-case only
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'max-nesting-depth': [3, { ignore: ['pseudo-classes'] }], // Limit nesting
  }
};
