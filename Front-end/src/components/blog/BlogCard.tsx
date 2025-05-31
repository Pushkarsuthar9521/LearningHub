import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { BlogPost } from '../../types';
import { formatDate, truncateText } from '../../lib/utils';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300\" hoverable>
        <div className="md:flex">
          <div className="md:w-2/5 h-56 md:h-auto relative">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="md:w-3/5 p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.createdAt)}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author.name}
              </span>
            </div>
            <Link to={`/blog/${post.slug}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/blog/category/${category.slug}`}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow duration-300" hoverable>
        <CardContent className="p-4">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(post.createdAt)}
          </div>
          <Link to={`/blog/${post.slug}`}>
            <h3 className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors">
              {truncateText(post.title, 60)}
            </h3>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300" hoverable>
      <div className="h-48 overflow-hidden relative">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(post.createdAt)}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author.name}
          </span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">{truncateText(post.excerpt, 120)}</p>
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/blog/category/${category.slug}`}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;