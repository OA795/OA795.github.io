export type MusicTrack = {
  title: string;
  artist: string;
  src: string;
};

export const siteConfig = {
  title: "OA795",
  shortTitle: "PERSONAL NOTES",
  description: "记录技术、阅读与日常观察的个人博客。",
  author: "OA795",
  siteUrl: "https://oa795.github.io",
  heroVideo: "/videos/4.webm",
  // Shared wallpaper for inner pages and as the hero poster fallback.
  heroImage: "/images/site-wallpaper.webp",
  heroEyebrow: "OA795 / PERSONAL SPACE",
  heroTitle: "把正在经历的，留在这里。",
  heroDescription:
    "记录技术、阅读、游戏与日常观察。慢一点写，也慢一点读。",
  navigation: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/archives/" },
    { label: "标签", href: "/tags/" },
    { label: "关于", href: "/about/" }
  ],
  social: {
    github: "https://github.com/OA795",
    bilibili: "https://space.bilibili.com/1095021246"
  },
  music: [] as MusicTrack[]
};
