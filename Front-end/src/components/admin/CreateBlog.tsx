import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Card, Form, Input, Select, Upload, message } from 'antd'
import React from 'react'
import { CreateBlogDocument, GetBlogsDocument } from '../../generated/graphql'

const { TextArea } = Input
const { Option } = Select

interface BlogFormValues {
  title: string
  excerpt: string
  content: string
  category: string
  tags?: string[]
  featuredImage?: File[]
  status: 'draft' | 'published' | 'archived'
}

const CreateBlog: React.FC = () => {
  const [form] = Form.useForm()
  const [createBlog, { loading }] = useMutation(CreateBlogDocument, {
    refetchQueries: [{ query: GetBlogsDocument }]
  })

  const handleSubmit = async (values: BlogFormValues) => {
    try {
      await createBlog({
        variables: {
          input: {
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            category: values.category,
            tags: values.tags,
            status: values.status
          }
        }
      })
      message.success('Blog created successfully!')
      form.resetFields()
    } catch (error) {
      message.error('Failed to create blog')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Blog</h1>
        <p className="text-gray-600">Write and publish your blog content</p>
      </div>

      <Card className="shadow-sm">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: 'Please enter a title' },
              { min: 5, message: 'Title must be at least 5 characters' }
            ]}
          >
            <Input placeholder="Enter blog title" size="large" />
          </Form.Item>

          <Form.Item
            name="excerpt"
            label="Excerpt"
            rules={[
              { required: true, message: 'Please enter an excerpt' },
              { min: 20, message: 'Excerpt must be at least 20 characters' }
            ]}
          >
            <TextArea
              placeholder="Brief description of the blog (shown in preview cards)"
              rows={3}
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[
              { required: true, message: 'Please enter content' },
              { min: 50, message: 'Content must be at least 50 characters' }
            ]}
            extra="Markdown supported"
          >
            <TextArea
              placeholder="Write your blog content here. You can use Markdown formatting."
              rows={15}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category" size="large">
              <Option value="technology">Technology</Option>
              <Option value="science">Science</Option>
              <Option value="education">Education</Option>
              <Option value="lifestyle">Lifestyle</Option>
              <Option value="programming">Programming</Option>
              <Option value="design">Design</Option>
              <Option value="business">Business</Option>
            </Select>
          </Form.Item>

          <Form.Item name="tags" label="Tags" extra="Add relevant tags">
            <Select
              mode="tags"
              placeholder="Add tags (press Enter to add)"
              style={{ width: '100%' }}
              size="large"
            />
          </Form.Item>

          <Form.Item name="featuredImage" label="Featured Image">
            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />} size="large">
                Upload Image
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="draft">
            <Select size="large">
              <Option value="DRAFT">Save as Draft</Option>
              <Option value="PUBLISHED">Publish Now</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex gap-3">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="px-8"
              >
                Create Blog
              </Button>
              <Button size="large" onClick={() => form.resetFields()}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default CreateBlog
