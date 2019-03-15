---
title: WSL + node.js環境のススメ
lang: ja
sidebarDepth: 3
meta:
  - name: description
    content: WSLとnode.jsを組み合わせる構成をお勧めする記事です
  - name: keywords
    content: 東雲火山 WSL node.js nodebrew
---

# WSL + node.js環境のススメ

## はじめに

最近JavaScriptが大変元気です。

特に`node.js`は、本来は不要だったWebフロントエンドの開発においても、`webpack`などを利用する関係でほぼ必須といえる状態になってきており、Webのないプロジェクトが少ないために大体どんなプロジェクトでも見かけるようになってきたように思います。

一方で、チームで開発をしていると、近年はMac勢が多くなってきているので（僕の周辺では既にMacの方が多数派です）、node.js用に書いた特定の処理がWindowsユーザとMacユーザのいずれかで動かない、というトラブルも多くなってきました。

本記事では、実用的になってきたWindows Subsystem for Linux（以下WSL）上でnode.jsの環境を作る事でこういった問題を回避しやすい環境を作る事ができたので、おすすめの設定についてまとめていきます。

## WSLのインストール

WSLのインストール方法は、いろんな人が書いてあるので、変にこちらで書くより探してもらう方がいいと思います。

[WSL インストール](https://www.google.com/search?q=WSL+%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB&tbs=qdr%3Ay)などの検索ワードで、なるべく新しめ（左のリンクだと1年以内）の記事を拾ってインストールされることをお勧めします。

2019年03月現在、ファイルシステムの連携やGUIはなかなか難易度が高いと思いますが、CUIであればかなり効果的に使えるようになっています。

OSは好きなものを入れてください。私は無難にUbuntuにしておきました。

## node.jsのインストール

私は[nodebrew](https://github.com/hokaccha/nodebrew)派なので、まずWSLにnodebrewを入れます。

GitHubのREADMEに書かれている通り、`curl -L git.io/nodebrew | perl - setup`で入れてしまうのが早いです。

その後、README通り`.bashcrc`にPATH設定を追記し、`source ~/.bashrc`で有効化しておきます。

<br/>

nodebrewはグローバルインストールされるものもnodeのバージョンごとに完全に別になるので、`Firebase`の`Cloud Functions for Firebase`用にv6系のnode.jsを入れる、等よくする作業でも、v6にだけfirebaseが入っていてv10には入ってないなどの環境作りをクリーンにやってくれます。

私はnodebrew派ですが、[n](https://github.com/tj/n)でも[nvm](https://github.com/creationix/nvm)でも、お好きなものでいいと思います。

<br/>

次に担当しているプロジェクトの状況に従った適切なnode.jsのバージョンか、[nodejs.org](https://nodejs.org/ja/)で出ているLTSの最新版のバージョンなどを拾って、 `nodebrew install-binary v10.15.3` 等で対象のnode.jsを入れます。

インストール完了後、`nodebrew use v10.15.3` 等とし、有効化しておきます。

## エディタの決定

エディタもWSL上のvimでやる、等の人もいるかもしれませんが、私は[Visual Studio Code](https://code.visualstudio.com/)がこと[TypeScript](https://www.typescriptlang.org/)の開発においては最も効率的な印象を持っているので、Visual Studio Codeをインストールしておきます。

こちらは、WSLではなくWindowsの方に入れます。

この辺は好きなものを選んでいいと思いますが、「エディタの実行環境がWindowsかWSLか」は重要なポイントになります。

<br/>

Visual Studio Codeでやっておくといいのは、ターミナルをWSLにしてしまう事です。

`settings.json`に`"terminal.integrated.shell.windows": "C:/Windows/System32/wsl.exe"`等を記述する形になると思います。

これで、Windowsで動くVisual Studio CodeというIDEで、WSLで動くnode.jsやらnpmやらをシームレスに使う事ができるようになります。

## Windowsでシンボリックリンクを有効化

エディタ環境をWSLで済ませる人は、この設定は必ずしもなくてもいいと思います。

Windowsの人も、このままでも十分WSL上のnode.jsは使えるのですが、最近流行りのモノレポ構成だと必ず`npm link`による、`node_modules`以下のシンボリックリンクが現れます。

WSL上ではシンボリックリンクになっているものが、Windows上では0byteの謎ファイルになってしまい、エディタもろくに動作してくれません。

解決策は三つあります。

1. WSLを管理者権限で実行
2. Windows10を開発者モードに変更する
3. SeCreateSymbolicLinkPrivilegeの権限を解放する

1を毎回やるのも面倒なので、2か3になると思います。私は2にしました。

設定→更新とセキュリティ→開発者向け→開発者モードにチェック、で、再起動すれば完了です。開発者モードになるとシンボリックリンクの作成が管理者以外にも開放されるので、WSL上での操作がかなり適格にNTFS上にも反映されるようになります。

<br/>

再起動後、WSLを実行すると、`ln -s`等で作るファイルもWindows上で正しくシンボリックリンクになっているのを確認できます。

`npm`の場合、`npm link`でシンボリックリンクが作成されますが、このシンボリックリンクもそのままWindows上で有効になり、Visual Studio Code等でも正しくビルドすることができるようになります。

<br/>

1,2,3のどれを選ぶかは好みでいいと思います。

[3]が一番ミニマムなんですが、ローカルセキュリティポリシーがWindows 10 Home Editionだとついていないので、Proでないと設定がちょっと面倒かもしれません。

## 周辺ツール

[Git](https://git-scm.com/)もWSL上に移動しておくことをお勧めします。

node.js以外でもそれなりに合うトラブルとして、シンボリックリンクやパーミッションなどの問題がありますが、WSLに移しておけばこういった問題を回避できます。・

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)等、Visual Studio Code上から扱えるGit系のツールも優秀なものが多いのですが、Gitのpull, commit, pushはWSL上で行い、履歴や差分等の確認はツールを使う辺りがお勧めです。

<br/>

`Docker`も、一応WSL上で動くようにできますが、こちらは「WSLからWindowsのDockerを使う」という動かし方にならざるを得ないので、2019年03月時点では今一つ使い勝手がよくありません。

具体的には、Volumeの扱い方などが[こちらの記事](https://qiita.com/gentaro/items/7dec88e663f59b472de6)にあるように鬼門です。

`docker-compose up`などの際に必ず踏むと思うので、WSLに期待しすぎず、WindowsとWSLを適時使い分ける方がいいと思います。

<br/>

他のツール類も、適時そういった判断でWSLかWindowsかを選んで入れていくのがいいと思います。

ちなみにもう一つよく遭遇するのが改行コード問題ですが、私は`.editorconfig`で全環境LFにする派です

## 終わりに

このようにnode.jsやGitをWSLに移し、Visual Studio Codeはネイティブ実行することで、以下のような恩恵を受けられます。

- node.jsのバージョン管理にnodebrewが使える
- パーミッションの問題に遭遇しない
- `rm`や`find`等を`package.json`に書いてWindowsユーザだけ困ったりしない
- 普段使いのエディタは枯れているWindowsのVSCodeなので、動作も軽く、WSLの余計な問題を踏まない

WSLも出た当初は少し評判が悪く、私も入れたのはこの2か月程なんですが、入れてみたらなぜもっと早く使わなかったのかと少し後悔しました。

特にnode.jsやMac使いの開発者達との相性がいいと思うので、この記事でWindows使いの肩身の狭さや、Mac使いのWindowsに対する気苦労が多少でも解決されれば幸いです。
