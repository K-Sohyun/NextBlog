import styles from "../styles/home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "../lib/posts";
import { Post } from "../lib/types";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main className={styles.container}>
      <h2>Main Post📌</h2>
      {posts.length > 0 && (
        <div className={styles.mainPost}>
          <Link href={`/posts/${posts[0].id}`} className={styles.postLink}>
            <div className={styles.photoBox}>
              <Image src={posts[0].image} alt={posts[0].title} width={800} height={400} />
            </div>
            <div className={styles.textBox}>
              <h3>{posts[0].title}</h3>
              <p>{posts[0].summary}</p>
            </div>

          </Link>
        </div>
      )}

      <h2>All Posts📌</h2>
      <ul className={styles.posts}>
        {posts.slice(1).map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`} className={styles.postLink}>
              <div className={styles.photoBox}>
                <Image src={post.image} alt={post.title} width={600} height={400} />
              </div>
              <div className={styles.textBox}>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
