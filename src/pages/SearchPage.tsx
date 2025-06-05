import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { searchPosts } from '../api/blogApi';
import { Post } from '../types';
import { formatDate } from '../utils/dateUtils';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery || searchQuery.length < 2) {
        setResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const searchResults = await searchPosts(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Error searching posts:', error);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );
  
  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, performSearch]);
  
  // Highlight search terms in text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() 
        ? <mark key={index}>{part}</mark> 
        : part
    );
  };
  
  // Extract excerpt around search term
  const getExcerpt = (content: string, searchTerm: string) => {
    if (!searchTerm || !content) return content.slice(0, 150) + '...';
    
    const index = content.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) return content.slice(0, 150) + '...';
    
    const start = Math.max(0, index - 60);
    const end = Math.min(content.length, index + searchTerm.length + 60);
    return (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');
  };
  
  return (
    <div className="search">
      <h1 className="page-heading">검색</h1>
      
      <div className="search-container">
        <input 
          type="text" 
          id="search-input" 
          className="search-input" 
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        
        <div id="search-results" className="search-results">
          {isSearching ? (
            <p>검색 중...</p>
          ) : query.length < 2 ? (
            <p>검색어는 2글자 이상 입력해주세요.</p>
          ) : results.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            results.map(post => (
              <div key={post.slug} className="search-result-item">
                <h2>
                  <Link to={`/${post.category}/${post.slug}`}>
                    {highlightText(post.title, query)}
                  </Link>
                </h2>
                <div className="search-result-meta">
                  <time>{formatDate(post.date)}</time>
                  {post.categories && (
                    <span className="search-result-categories">
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
                <div className="search-result-excerpt">
                  {highlightText(getExcerpt(post.content, query), query)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;