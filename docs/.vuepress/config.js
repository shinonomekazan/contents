module.exports = {
	title: "東雲火山の山麓",
	description: "株式会社東雲火山関連の記事等置き場",
	theme: '@vuepress/default',
	head: [
		[
			"script",
			{src: "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
			async: true}
		],
		[
			"script",
			{},
			`(adsbygoogle = window.adsbygoogle || []).push({
google_ad_client: "ca-pub-5067037356613716",
enable_page_level_ads: true
});`,
		],
		[
			"script",
			{
				async: true,
				src: "https://www.googletagmanager.com/gtag/js?id=G-TFD1CH12X3",
			},
		],
		[
			"script",
			{},
			[
				"window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TFD1CH12X3');",
			],
		],
	],
	themeConfig: {
		nav: [
			{
				text: "リンク集",
				items: [
					{
						text: "株式会社東雲火山",
						link: "https://shinonomekazan.com"
					},
					{
						text: "GitHub",
						link: "https://github.com/shinonomekazan/contents"
					},
				],
			},
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
				title: "会社に関する記事",
				children: [
					{
						title: "創業前後のチェックリストと東雲火山の現在地",
						path: "/checklist.html",
					},
					{
						title: "株式会社東雲火山を創業しました",
						path: "/sougyou.html",
					},
					{
						title: "テスト",
						path: "/test.html",
					},
				],
			},
			{
				title: "TIPS",
				children: [
					{
						title: "個人番号カード（マイナンバーカード）の電子署名をAcrobat Readerを使って無料でする方法",
						path: "/tips/pdf-sign-by-mynumber-card",
					},
					{
						title: "WSL + node.js環境のススメ",
						path: "/tips/wsl-with-node",
					},
				],
			},
		],
	},
	plugins: [
		[
			"sitemap",
			{
				hostname: "https://contents.shinonomekazan.com",
			},
		],
	],
	markdown: {
		lineNumbers: true,
		extendMarkdown: md => {
			md.use(require("markdown-it-task-lists"));
		},
		plugins: [
		],
	},
	// base: "https://contents.shinonomekazan.com/",
}
