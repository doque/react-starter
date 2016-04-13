const webpack = require('webpack');
const pkg = require('./package.json');
const env = process.env.NODE_ENV || 'development';
const develop = env === 'development';
const port = process.env.PORT || 3005;
const path = require('path');
const autoprefixer = require('autoprefixer');

const webpackInclude = /(src|develop.jsx)/;

var config = module.exports = {
    resolveLoader: {
        root: [
            path.join(__dirname, "node_modules")
        ]
    },
    context: __dirname,
    entry: [
        './develop.jsx',
    ],
    debug: develop,
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: pkg.name +'.js',
        publicPath: 'http://0.0.0.0:3005/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: webpackInclude,
                loader: 'babel',
                babelrc: true
            },
            {
                test: /^((?!\.module).)*\.scss/,
                include: webpackInclude,
                loaders: ['style', 'css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap']
            },
            {
                test: /\.module\.scss$/,
                include: webpackInclude,
                loaders: [
                    'style',
                    'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'resolve-url',
                    'sass?sourceMap'
                ]
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                include: webpackInclude,
                loader: 'file'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    devServer: {
        host: '0.0.0.0',
        port: port,
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    resolve: {
        root: __dirname,
        modulesDirectories: [
            'node_modules'
        ],
        extensions: [
            '',
            '.js',
            '.jsx'
        ],
        alias: {
            'ie': 'component-ie'
        }
    }
};
