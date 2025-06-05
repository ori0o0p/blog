import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecentPosts } from '../api/blogApi';
import { Post } from '../types';
import { formatDate } from '../utils/dateUtils';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchRecentPosts(6)
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }
  
  return (
    <div className="home">
      <h1 className="page-heading">최근 글</h1>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.slug} className="post-card">
            <h2 className="post-title">
              <Link to={`/${post.category}/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="post-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.categories && (
                <span className="post-categories">
                  {post.categories.map(category => (
                    <Link 
                      key={category} 
                      to={`/category/${category}`} 
                      className="tag"
                    >
                      {category}
                    </Link>
                  ))}
                </span>
              )}
            </div>
            <div className="post-excerpt">
              {post.excerpt}
            </div>
            <Link to={`/${post.category}/${post.slug}`} className="read-more">더 읽기</Link>
          </div>
        ))}
      </div>
      
      <div className="view-all">
        <Link to="/archive" className="view-all-link">모든 글 보기</Link>
      </div>
    </div>
  );
};

export default HomePage;