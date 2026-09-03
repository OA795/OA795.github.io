import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import { postSlug } from "../lib/post-path";

/** @param {import("astro").APIContext} context */
export async function GET(context) {
  const posts = (await getCollection("posts", ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site || siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: "/posts/" + postSlug(post.id) + "/"
    }))
  });
}
