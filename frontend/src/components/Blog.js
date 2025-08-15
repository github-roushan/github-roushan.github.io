import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

const Blog = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <div className="max-w-3xl mx-auto">
        {posts.map(post => (
          <div key={post.slug} className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-3xl font-bold mb-2">
              <Link to={`/blog/${post.slug}`} className="hover:text-blue-400">{post.title}</Link>
            </h2>
            <p className="text-gray-400 mb-4">{post.date}</p>
            <div>
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
