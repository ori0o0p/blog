import Link from 'next/link';

// 기존 a 태그를 Next.js Link 컴포넌트로 교체
<Link 
  href={`/posts/${post.slug}`} 
  className="post-link"
  prefetch={true}
  onClick={(e) => {
    e.currentTarget.classList.add('active');
  }}
>
  {post.title}
</Link>