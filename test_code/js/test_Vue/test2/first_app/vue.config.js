/*
module.exports = { 
	assetsDir: "./004",
	baseUrl: "./"
	//baseUrl: "/www/test_Vue/test2/first_app/dist/"
	//outputDir: "./003"
};
*/
module.exports = {
	configureWebpack: {
		output: {
			publicPath: "./"
		},
	}
}