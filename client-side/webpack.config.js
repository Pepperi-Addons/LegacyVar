const { shareAll, share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const filename = `legacy_var`;

const webpackConfig = withModuleFederationPlugin({
    name: filename,
    filename: `${filename}.js`,
    exposes: {
        './WebComponents': './src/bootstrap.ts',
    },
    shared: {
        ...shareAll({ strictVersion: true, requiredVersion: 'auto' }),
    }
});

module.exports = {
    ...webpackConfig,
    output: {
        ...webpackConfig.output,
        uniqueName: filename
    },
};
