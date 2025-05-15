// postcss.config.js
import purgecssModule from '@fullhuman/postcss-purgecss';

const purgecss = purgecssModule.default;
const isProduction = process.env.NODE_ENV === 'production';

export default {
    plugins: [
        ...(isProduction
        ? [
            purgecss({
                content: [
                './**/*.php',
                './**/*.js',
                ],
                safelist: [
                    /^swiper-/,
                    /^fancybox/
                ],
                defaultExtractor: content =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            }),
            ]
        : []),
    ],
};
