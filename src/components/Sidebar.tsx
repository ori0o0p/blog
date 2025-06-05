import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../api/blogApi';
import { Category, Post } from '../types';

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar = ({ isVisible }: SidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Load saved open states from localStorage
    try {
      const savedStates = localStorage.getItem('categoryTreeState');
      if (savedStates) {
        setOpenStates(JSON.parse(savedStates));
      }
    } catch (e) {
      console.warn("Error loading category states:", e);
    }
    
    // Fetch categories data
    fetchCategories().then(data => {
      setCategories(data);
    });
  }, []);
  
  // Save open states to localStorage when they change
  useEffect(() => {
    localStorage.setItem('categoryTreeState', JSON.stringify(openStates));
  }, [openStates]);
  
  const toggleContent = (targetId: string) => {
    setOpenStates(prev => ({
      ...prev,
      [targetId]: !prev[targetId]
    }));
  };

  return (
    <aside className={`sidebar ${isVisible ? 'mobile-visible' : ''}`}>
      <div className="category-tree">
        <h2 className="tree-title">Category</h2>
        
        <div className="tree-container">
          {categories.map(category => {
            // Only show categories with posts
            const totalPosts = (category.posts?.length || 0) + 
              (category.subcategories?.reduce((sum, sub) => sum + (sub.posts?.length || 0), 0) || 0);
              
            if (totalPosts === 0) return null;
            
            return (
              <div key={category.name} className="category-item">
                <div className="category-header">
                  <button 
                    className="toggle-btn" 
                    data-target={category.name}
                    aria-expanded={!!openStates[category.name]}
                    aria-controls={`${category.name}-container`}
                    onClick={() => toggleContent(category.name)}
                  >
                    <svg 
                      className="chevron-icon" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{
                        width: '1em', 
                        height: '1em',
                        transform: openStates[category.name] ? 'rotate(90deg)' : 'rotate(0deg)'
                      }}
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                  <svg 
                    className="folder-icon" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{width: '1em', height: '1em'}}
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span 
                    className="category-link"
                    onClick={() => toggleContent(category.name)}
                  >
                    {category.title} ({totalPosts})
                  </span>
                </div>
                
                <div 
                  className="subcategory-container" 
                  id={`${category.name}-container`}
                  style={{ display: openStates[category.name] ? 'block' : 'none' }}
                >
                  {category.subcategories?.map(subcategory => {
                    if (!subcategory.posts || subcategory.posts.length === 0) return null;
                    
                    return (
                      <div key={subcategory.name} className="subcategory-item" style={{ marginLeft: '20px' }}>
                        <div className="subcategory-header">
                          <button 
                            className="toggle-btn" 
                            data-target={subcategory.name}
                            aria-expanded={!!openStates[subcategory.name]}
                            aria-controls={`${subcategory.name}-container`}
                            onClick={() => toggleContent(subcategory.name)}
                          >
                            <svg 
                              className="chevron-icon" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                              style={{
                                width: '1em', 
                                height: '1em',
                                transform: openStates[subcategory.name] ? 'rotate(90deg)' : 'rotate(0deg)'
                              }}
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </button>
                          <svg 
                            className="folder-icon" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            style={{width: '1em', height: '1em'}}
                          >
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <span 
                            className="category-link"
                            onClick={() => toggleContent(subcategory.name)}
                          >
                            {subcategory.title} ({subcategory.posts?.length || 0})
                          </span>
                        </div>
                        
                        <div 
                          className="posts-container" 
                          id={`${subcategory.name}-container`}
                          style={{ display: openStates[subcategory.name] ? 'block' : 'none' }}
                        >
                          {subcategory.posts?.map(post => (
                            <div key={post.slug} className="post-item" style={{ marginLeft: '20px' }}>
                              <svg 
                                className="file-icon" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                style={{width: '1em', height: '1em', marginRight: '4px'}}
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              <Link 
                                to={`/${category.name}/${post.slug}`} 
                                className="post-link"
                              >
                                {post.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Direct posts in category (without subcategory) */}
                  {category.posts?.map(post => (
                    <div key={post.slug} className="post-item" style={{ marginLeft: '20px' }}>
                      <svg 
                        className="file-icon" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{width: '1em', height: '1em', marginRight: '4px'}}
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <Link 
                        to={`/${category.name}/${post.slug}`} 
                        className="post-link"
                      >
                        {post.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;