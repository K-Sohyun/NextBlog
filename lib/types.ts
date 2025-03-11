export interface Post {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  summary: string;
  image: string;
  contentHtml?: string; // Markdown 변환된 HTML 본문
}
