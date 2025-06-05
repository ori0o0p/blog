import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../api/blogApi';
import { Post } from '../types';
import { formatDate } from '../utils/dateUtils';

interface PostsByYear {
  [year: string]: {
    [date: string]: Post[];
  };
}

const ArchivePage = () => {
  const [postsByYear, setPostsByYear] = useState<PostsByYear>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAllPosts()
      .then(posts => {
        // Group posts by year and date
        const grouped = posts.reduce((acc: PostsByYear, post) => {
          const date = new Date(post.date);
          const year = date.getFullYear().toString();
          const fullDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
          
          if (!acc[year]) {
            acc[year] = {};
          }
          
          if (!acc[year][fullDate]) {
            acc[year][fullDate] = [];
          }
          
          acc[year][fullDate].push(post);
          return acc;
        }, {});
        
        setPostsByYear(grouped);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <div className="loading">Loading archive...</div>;
  }
  
  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <div className="archive">
      {sortedYears.map(year => (
        <div key={year} className="archive-year">
          <h2>{year}년</h2>
          
          <ul className="archive-list-by-year">
            {Object.entries(postsByYear[year])
              .sort(([dateA], [dateB]) => dateB.localeCompare(dateA)) // Sort dates in descending order
              .map(([fullDate, postsOnDate]) => {
                const date = new Date(fullDate);
                const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}월 ${date.getDate().toString().padStart(2, '0')}일`;
                
                return (
                  <li key={fullDate} className="archive-day-group">
                    <h4 className="day-heading">{formattedDate}</h4>
                    {postsOnDate.map(post => (
                      <p key={post.slug}>
                        <Link to={`/${post.category}/${post.slug}`} className="post-link">
                          {post.title}
                        </Link>
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
                      </p>
                    ))}
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ArchivePage;