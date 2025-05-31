import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/Card';
import BlogCard from '../components/blog/BlogCard';
import useBlogStore from '../store/blogStore';
import { BlogPost } from '../types';
import { formatDate } from '../lib/utils';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, fetchPostBySlug, fetchPosts } = useBlogStore();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        setLoading(true);
        const fetchedPost = await fetchPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          document.title = fetchedPost.title;
          
          // Ensure all posts are loaded for related posts
          await fetchPosts();
        }
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, fetchPostBySlug, fetchPosts]);

  useEffect(() => {
    if (post && posts.length > 0) {
      // Find related posts based on categories and tags
      const related = posts.filter(p => 
        p.id !== post.id && (
          p.categories.some(c => post.categories.some(pc => pc.id === c.id)) ||
          p.tags.some(t => post.tags.some(pt => pt.id === t.id))
        )
      ).slice(0, 3);
      
      setRelatedPosts(related);
    }
  }, [post, posts]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        {/* Hero Section */}
        <div className="relative">
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-900">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8 text-gray-600">
              <div className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{post.author.name}</span>
              </div>
              <span className="mx-3">•</span>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link 
                    key={tag.id} 
                    to={`/blog/tag/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPostPage;