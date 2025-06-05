import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCategoryPosts } from '../api/blogApi';
import { Post, Category } from '../types';
import { formatDate } from '../utils/dateUtils';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      
      fetchCategoryPosts(categoryName)
        .then(data => {
          setCategory(data.category);
          setPosts(data.posts);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching category posts:', error);
          setLoading(false);
        });
    }
  }, [categoryName]);
  
  if (loading) {
    return <div className="loading">Loading category...</div>;
  }
  
  if (!category) {
    return <div className="error">Category not found</div>;
  }
  
  return (
    <div className="category-page">
      <h1 className="category-title">{category.title}</h1>
      <p className="category-description">{category.description}</p>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.slug} className="post-card">
            <h2 className="post-title">
              <Link to={`/${categoryName}/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="post-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="post-excerpt">
              {post.excerpt}
            </div>
            <Link to={`/${categoryName}/${post.slug}`} className="read-more">더 읽기</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;