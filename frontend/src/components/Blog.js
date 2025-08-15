import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { motion } from 'framer-motion';

const Blog = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        My <span className="text-primary text-shadow-glow dark:text-dark-primary dark:text-shadow-dark-glow">Blog</span>
      </h1>
      <div className="max-w-3xl mx-auto">
        {posts.map((post, index) => (
          <motion.div 
            key={post.slug} 
            className="bg-white p-6 rounded-lg mb-8 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-2">
              <Link to={`/blog/${post.slug}`} className="text-primary hover:text-primary/80 transition-colors dark:text-dark-primary dark:hover:text-dark-primary/80">{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-400">{post.date}</p>
            <div>
              {post.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 dark:bg-gray-700 dark:text-gray-300">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
