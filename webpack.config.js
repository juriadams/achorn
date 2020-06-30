const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "production",
    entry: {
        achorn: "./src/achorn.ts",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "lib"),
        library: "Achorn",
        libraryTarget: "umd",
        umdNamedDefine: true,
    },
};
