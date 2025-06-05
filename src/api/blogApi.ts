import { Category, Post } from '../types';

// Base URL for API requests
const API_BASE_URL = '/blog/api';

// Fetch all categories with their posts
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    // In a real app, this would be an API call
    // For now, we'll parse the existing data from _data/categories.yml
    const response = await fetch(`${API_BASE_URL}/categories.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty array if fetch fails
    return [];
  }
};

// Fetch recent posts
export const fetchRecentPosts = async (limit: number = 6): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/recent.json?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }
};

// Fetch all posts
export const fetchAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/all.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch all posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
};

// Fetch a single post by category and slug
export const fetchPost = async (category: string, slug: string): Promise<Post> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${category}/${slug}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${category}/${slug}:`, error);
    throw error;
  }
};

// Fetch related posts
export const fetchRelatedPosts = async (postId: string, limit: number = 3): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/related.json?id=${postId}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch related posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

// Fetch posts by category
export const fetchCategoryPosts = async (categoryName: string): Promise<{ category: Category; posts: Post[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryName}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch category posts');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryName}:`, error);
    throw error;
  }
};

// Search posts
export const searchPosts = async (query: string): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};