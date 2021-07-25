module.exports = {
  plugins: [
	[
	  "import", {
		  libraryName: 'element-plus',
		  customStyleName: (name) => {
			  name = name.slice(3)
			  return `element-plus/packages/theme-chalk/src/${name}.scss`
		  }
	  }
	],
  // [
	 //  "import", {
		//   libraryName: 'element-plus',
		//   customStyleName: (name) => {
		// 	  name = name.slice(3)
		// 	  // return `element-plus/packages/theme-chalk/src/${name}.scss`
		// 	  return `element-plus/lib/theme-chalk/el-${name}.css`;
		//   }
	 //  }
  // ],
  ],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
}
