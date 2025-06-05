import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPost, fetchRelatedPosts } from '../api/blogApi';
import { Post } from '../types';
import { formatDate } from '../utils/dateUtils';

const PostPage = () => {
  const { category, postSlug } = useParams<{ category: string; postSlug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (category && postSlug) {
      setLoading(true);
      
      fetchPost(category, postSlug)
        .then(data => {
          setPost(data);
          return fetchRelatedPosts(data.id, 3);
        })
        .then(relatedData => {
          setRelatedPosts(relatedData);
          setLoading(false);
          
          // Scroll to top when post changes
          window.scrollTo(0, 0);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
    }
  }, [category, postSlug]);
  
  if (loading) {
    return <div className="loading">Loading post...</div>;
  }
  
  if (!post) {
    return <div className="error">Post not found</div>;
  }
  
  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <div className="post-date">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          
          <div className="post-reading-time">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {post.readingTime ? post.readingTime : '약 5분 소요'}
          </div>
          
          {(post.categories || post.tags) && (
            <div className="post-categories-tags">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <div className="tags-list">
                {post.categories?.map(category => (
                  <Link key={category} to={`/category/${category}`} className="tag">{category}</Link>
                ))}
                {post.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {relatedPosts.length > 0 && (
        <div className="related-posts">
          <h2>관련 글</h2>
          <ul>
            {relatedPosts.map(relatedPost => (
              <li key={relatedPost.slug}>
                <Link to={`/${relatedPost.category}/${relatedPost.slug}`}>
                  {relatedPost.title}
                </Link>
                <small>{formatDate(relatedPost.date)}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default PostPage;