const path = require("path");

module.exports = {
    mode: "production",
    entry: "./index.js",
    // devtool: "inline-source-map",
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
        filename: "achorn.js",
        path: path.resolve(__dirname, "lib"),
        libraryTarget: "var",
        library: "Achorn",
    },
};
