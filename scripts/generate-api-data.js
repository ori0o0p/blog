const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const marked = require('marked');

// Create directories if they don't exist
const apiDir = path.join(__dirname, '../public/api');
const categoriesDir = path.join(apiDir, 'categories');
const postsDir = path.join(apiDir, 'posts');

[apiDir, categoriesDir, postsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Read categories from _data/categories.yml
const categoriesYaml = fs.readFileSync(path.join(__dirname, '../_data/categories.yml'), 'utf8');
const categoriesData = yaml.load(categoriesYaml);

// Read all posts from _posts directory
const postsFiles = fs.readdirSync(path.join(__dirname, '../_posts'));
const posts = postsFiles.map(file => {
  const fileContent = fs.readFileSync(path.join(__dirname, '../_posts', file), 'utf8');
  const { data, content } = matter(fileContent);
  
  // Parse the filename to get the slug
  const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  const slug = match ? match[2] : file.replace(/\.md$/, '');
  
  // Convert markdown to HTML
  const htmlContent = marked(content);
  
  // Calculate reading time (rough estimate)
  const words = content.split(/\s+/).length;
  const readingTime = words < 360 ? '1분 소요' : `${Math.ceil(words / 180)}분 소요`;
  
  return {
    id: slug,
    title: data.title,
    slug,
    date: data.date.toISOString(),
    content: htmlContent,
    excerpt: content.slice(0, 200).replace(/\n/g, ' ') + '...',
    category: data.categories?.[0] || 'uncategorized',
    categories: data.categories || [],
    subcategory: data.subcategory,
    tags: data.tags || [],
    readingTime
  };
});

// Generate categories.json with posts
const categoriesWithPosts = categoriesData.map(category => {
  const categoryPosts = posts.filter(post => 
    post.categories.includes(category.name) && !post.subcategory
  );
  
  const subcategoriesWithPosts = category.subcategories?.map(subcategory => {
    const subcategoryPosts = posts.filter(post => 
      post.subcategory === subcategory.name
    );
    
    return {
      ...subcategory,
      posts: subcategoryPosts
    };
  }) || [];
  
  return {
    ...category,
    subcategories: subcategoriesWithPosts,
    posts: categoryPosts
  };
});

// Write categories.json
fs.writeFileSync(
  path.join(apiDir, 'categories.json'),
  JSON.stringify(categoriesWithPosts, null, 2)
);

// Generate individual category files
categoriesData.forEach(category => {
  const categoryPosts = posts.filter(post => 
    post.categories.includes(category.name)
  );
  
  fs.writeFileSync(
    path.join(categoriesDir, `${category.name}.json`),
    JSON.stringify({
      category,
      posts: categoryPosts
    }, null, 2)
  );
});

// Generate individual post files
posts.forEach(post => {
  const postDir = path.join(postsDir, post.category);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(postDir, `${post.slug}.json`),
    JSON.stringify(post, null, 2)
  );
});

// Generate recent posts
const recentPosts = [...posts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 10);

fs.writeFileSync(
  path.join(postsDir, 'recent.json'),
  JSON.stringify(recentPosts, null, 2)
);

// Generate all posts
fs.writeFileSync(
  path.join(postsDir, 'all.json'),
  JSON.stringify(posts, null, 2)
);

// Generate related posts function (based on categories and tags)
fs.writeFileSync(
  path.join(postsDir, 'related.json'),
  JSON.stringify(posts, null, 2)
);

// Generate search.json
fs.writeFileSync(
  path.join(apiDir, 'search.json'),
  JSON.stringify(posts, null, 2)
);

console.log('API data generation complete!');