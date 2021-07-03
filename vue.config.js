// Vue.config.js
const path = require("path");
const resolve = function (dir) {
    return path.join(__dirname, dir);
};
module.exports = {
    //选项
    //发布的基本路径
    publicPath: "./",
    // 构建时的输出目录
    outputDir: "dist",
    // 放置静态资源的目录
    assetsDir: "static",
    // html的输出路径
    indexPath: "index.html",
    //文件名哈希开关
    filenameHashing: true,
    //用于多页配置
    pages: undefined,
	devServer: {
		disableHostCheck: true
	},
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@v", resolve("src/views"))
            .set("@c", resolve("src/components"))
            .set("@u", resolve("src/utils"))
            .set("@s", resolve("src/service")); /* 别名配置 */

        config.plugin('html')
            .tap(args => {
                args[0].title = "温州晚报"
                return args;
            })

        config.optimization.runtimeChunk("single");
    },

}
