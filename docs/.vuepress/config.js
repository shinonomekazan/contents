module.exports = {
	title: "東雲火山の山麓",
	description: "文書置き場です",
	theme: '@vuepress/default',
	themeConfig: {
		nav: [
			{ text: "東雲火山の山麓", link: "/"},
			{ text: "リンク集", items: [
				{ text: "株式会社東雲火山", link: "https://shinonomekazan.com" },
			]},

		]
	},
	sidebar: {
		"https://shinonomekazan.com": [
			{
				title: "株式会社東雲火山",
				collapsable: false
			}
		]
	},
	// base: "https://contents.shinonomekazan.com/",
}
