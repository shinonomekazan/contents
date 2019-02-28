module.exports = {
	title: "東雲火山の山麓",
	description: "株式会社東雲火山関連の記事等置き場",
	theme: '@vuepress/default',
	themeConfig: {
		nav: [
			{ text: "リンク集", items: [
				{ text: "株式会社東雲火山", link: "https://shinonomekazan.com" },
			]},
		],
		lastUpdated: "最終更新",
		serviceWorker: {
			updatePopup: {
				message: "新しい更新があります",
				buttonText: "更新する",
			},
		},
		sidebar: [
			{
				title: "記事",
				children: [
					{title: "株式会社東雲火山を創業しました", path: "/sougyou.html"},
					{title: "テスト", path: "/test.html"},
				],
			},
		],
	},
	// base: "https://contents.shinonomekazan.com/",
}
