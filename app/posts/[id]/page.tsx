import styles from "../../../styles/post.module.scss";
import { getPostById, getPosts } from "../../../lib/posts";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../lib/types";

// generateStaticParams()의 반환 타입 지정
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

// params.id의 타입을 string으로 변환하여 처리
export default async function PostPage({ params }: { params: { id: string | string[] } }) {
  // params.id가 배열일 경우 첫 번째 값을 사용하도록 변환
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return (
      <article className={styles.container}>
        <h2>404 - Post Not Found</h2>
        <p>해당 블로그 글을 찾을 수 없습니다.</p>
        <Link href="/" className={styles.button}>← Back to Home</Link>
      </article>
    );
  }

  const post: Post | null = await getPostById(id);

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
