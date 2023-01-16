export const path = require('path');
module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@utilities': path.resolve(__dirname, 'src/utilities'),
        },
    },
};
