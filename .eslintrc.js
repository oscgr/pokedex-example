module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // TODO - we'll see if we can disable it
        'vue/require-default-prop': 0,
        'vue/html-indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 0,
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
};
