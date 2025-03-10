import styles from "../../../styles/post.module.scss";
import { getPostById, getPosts } from "../../../lib/posts";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../lib/types";

interface PostPageProps {
  params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
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

// `generateStaticParams()`에서 올바른 값 반환
export async function generateStaticParams() {
  const posts = await getPosts(); // 모든 블로그 글 가져오기
  return posts.map((post) => ({ id: post.id })); // `{ id: string }[]` 형태로 반환
}
