import styles from "../../../styles/post.module.scss";
import { getPostById, getPosts } from "../../../lib/posts";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../lib/types";

// 📌 정적 페이지 생성 (SSG 적용)
export async function generateStaticParams() {
  const posts: Post[] = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post: Post | null = await getPostById(params.id);

  if (!post) {
    return (
      <article className={styles.container}>
        <h2>404 - Post Not Found</h2>
        <p>해당 블로그 글을 찾을 수 없습니다.</p>
        <Link href="/" className={styles.button}>← Back to Home</Link>
      </article>
    );
  }

  return (
    <article className={styles.container}>
      <h2>{post.title}</h2>
      <p>{post.date} · {post.readingTime} read</p>
      <Image src={post.image} alt={post.title} width={800} height={400} />
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} />
      <Link href="/" className={styles.button}>← Back to Home</Link>
    </article>
  );
}
