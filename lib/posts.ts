import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "./types";

const postsDirectory = path.join(process.cwd(), "data");

// 모든 블로그 글 목록 가져오기
export async function getPosts(): Promise<Post[]> {
  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        id,
        ...(data as Omit<Post, "id" | "contentHtml">),
      };
    });
}

// 특정 블로그 글 가져오기
export async function getPostById(id: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    id,
    ...(data as Omit<Post, "id">),
    contentHtml: processedContent.toString(),
  };
}
