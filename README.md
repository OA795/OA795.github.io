# 漫游札记

一个适合 GitHub Pages 的纯静态个人博客，使用 Astro 构建。

## 本地运行

~~~bash
npm install
npm run dev
~~~

## 写文章

在 src/content/posts/ 新建 .md 文件，填写 frontmatter：

~~~md
---
title: "文章标题"
description: "文章摘要"
date: 2026-08-28
tags:
  - 技术
category: "技术"
---
~~~

文章支持 Markdown、代码块、图片和 LaTeX。行内公式写作 $E = mc^2$，独立公式使用 $$...$$。

## 替换首页图片

默认首页图片来自 src/config/site.ts 的 heroImage。推荐把自己的图片放进 public/images/，然后改成：

~~~ts
heroImage: "/images/home-banner.jpg"
~~~

这样图片会随 GitHub Pages 一起发布，不依赖第三方图片服务。

## 音乐播放

播放器已经集成在全站底部。把音频文件放到 public/music/，然后在 src/config/site.ts 配置：

~~~ts
music: [
  {
    title: "歌曲名称",
    artist: "艺术家",
    src: "/music/song.mp3"
  }
]
~~~

支持浏览器常见的 MP3、OGG、WAV 格式，提供播放/暂停、上一首、下一首、进度和音量控制。浏览器出于安全策略不会自动播放带声音的音频，访客需要点击播放。

## 发布到 GitHub Pages

1. 把项目推送到 GitHub 仓库，默认分支使用 main。
2. 在仓库 Settings -> Pages -> Build and deployment 中将来源设置为 GitHub Actions。
3. 每次推送到 main 后，.github/workflows/deploy.yml 会自动构建发布。
4. 如果使用自定义三级域名，在 DNS 中添加指向你的用户名.github.io 的 CNAME 记录，并在仓库 Pages 设置中填写域名。DNS 生效后 GitHub 会自动申请 HTTPS。
5. 将 astro.config.mjs 中的 SITE_URL 或默认网址替换成真实域名，RSS 和 Sitemap 才会使用正确地址。

## 注意

GitHub Pages 不提供后台、数据库或在线上传接口。文章、图片和音乐需要提交到仓库后重新构建；音频文件较大时，建议使用对象存储，并把 src 改成外部音频地址。
