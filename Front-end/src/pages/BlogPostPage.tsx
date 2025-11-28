import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import BlogCard from '../components/blog/BlogCard'
import {
  Blog,
  useGetBlogBySlugLazyQuery,
  useGetBlogsLazyQuery
} from '../generated/graphql'
import { formatDate } from '../lib/utils'

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Blog | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  const [getBlogBySlug] = useGetBlogBySlugLazyQuery()
  const [getBlogs] = useGetBlogsLazyQuery()

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        setLoading(true)
        await getBlogBySlug({
          variables: { slug },
          onCompleted: data => {
            if (data.getBlogBySlug) {
              setPost((data?.getBlogBySlug as Blog) || null)
              document.title = data.getBlogBySlug.title
            }
            setLoading(false)
          }
        })
      }
    }

    loadPost()
  }, [slug, getBlogBySlug])

  useEffect(() => {
    const loadRelatedPosts = async () => {
      if (post) {
        await getBlogs({
          onCompleted: data => {
            if (data.getBlogs) {
              // Find related posts based on category and tags
              const related = (data.getBlogs as Blog[])
                .filter(
                  p =>
                    p.id !== post.id &&
                    (p.category === post.category ||
                      p.tags.some(t => post.tags.includes(t)))
                )
                .slice(0, 3)

              setRelatedPosts(related)
            }
          }
        })
      }
    }

    loadRelatedPosts()
  }, [post, getBlogs])

  if (loading) {
    return (
      <>
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
      </>
    )
  }

  if (!post) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <article>
        {/* Hero Section */}
        <div className="relative">
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-900">
            <img
              src={post.featuredImage || 'https://via.placeholder.com/1200x600'}
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
                <div className="w-10 h-10 rounded-full mr-3 bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {post.author?.firstName?.[0]}
                  {post.author?.lastName?.[0]}
                </div>
                <span>
                  {post.author?.firstName} {post.author?.lastName}
                </span>
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
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default BlogPostPage
