import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Upload,
  UploadFile,
  message
} from 'antd'
import React, { useState } from 'react'
import { CreateBlogDocument, GetBlogsDocument } from '../../generated/graphql'
import { uploadImage } from '../../lib/upload'

const { TextArea } = Input
const { Option } = Select

interface BlogFormValues {
  title: string
  excerpt: string
  content: string
  category: string
  tags?: string[]
  featuredImage?: string
  status: 'draft' | 'published' | 'archived'
}

const CreateBlog: React.FC = () => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isUploaded, setIsUploaded] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  const [createBlog, { loading }] = useMutation(CreateBlogDocument, {
    refetchQueries: [{ query: GetBlogsDocument }]
  })

  const handleUpload = async (file: File) => {
    try {
      setUploadLoading(true)
      const url = await uploadImage(file)

      if (url) {
        setImageUrl(url)
        setIsUploaded(true)
        message.success('Image uploaded successfully!')
      }
    } catch (error) {
      message.error('Failed to upload image')
      console.error(error)
      setFileList([])
      setIsUploaded(false)
    } finally {
      setUploadLoading(false)
    }
  }

  const handleModalConfirm = () => {
    if (!isUploaded) {
      message.error('Please upload the image first')
      return
    }
    setIsModalOpen(false)
  }

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
            status: values.status,
            featuredImage: imageUrl || null
          }
        }
      })
      message.success('Blog created successfully!')
      form.resetFields()
      setImageUrl('')
      setFileList([])
      setIsUploaded(false)
    } catch (error) {
      message.error('Failed to create blog')
      console.error(error)
    }
  }

  const resetImageState = () => {
    setImageUrl('')
    setFileList([])
    setIsUploaded(false)
  }

  return (
    <>
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

            <Form.Item label="Featured Image">
              {imageUrl ? (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <Image
                      src={imageUrl}
                      alt="Featured"
                      className="rounded-lg"
                      style={{ maxWidth: '300px' }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button danger onClick={resetImageState} size="large">
                      Remove Image
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)} size="large">
                      Change Image
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  icon={<UploadOutlined />}
                  size="large"
                  onClick={() => setIsModalOpen(true)}
                >
                  Upload Image
                </Button>
              )}
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
                <Button
                  size="large"
                  onClick={() => {
                    form.resetFields()
                    resetImageState()
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* Upload Image Modal */}
      <Modal
        title="Upload Featured Image"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleModalConfirm}
            disabled={!isUploaded}
            loading={uploadLoading}
          >
            Confirm
          </Button>
        ]}
        width={600}
      >
        <div className="space-y-4">
          <Upload
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            beforeUpload={file => {
              const isImage = file.type.startsWith('image/')
              if (!isImage) {
                message.error('You can only upload image files!')
                return Upload.LIST_IGNORE
              }

              const isLt5M = file.size / 1024 / 1024 < 5
              if (!isLt5M) {
                message.error('Image must be smaller than 5MB!')
                return Upload.LIST_IGNORE
              }

              setFileList([file])
              setIsUploaded(false)
              // Automatically upload the image when selected
              handleUpload(file)
              return false
            }}
            onRemove={() => {
              setFileList([])
              setImageUrl('')
              setIsUploaded(false)
            }}
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined style={{ fontSize: '32px' }} />
                <div style={{ marginTop: 8 }}>Select Image</div>
              </div>
            )}
          </Upload>

          {fileList.length > 0 && (
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">
                {uploadLoading
                  ? 'Uploading...'
                  : isUploaded
                  ? '✓ Uploaded Image Preview'
                  : 'Local Preview (Not uploaded yet)'}
              </h4>
              <Image
                src={
                  imageUrl ||
                  (fileList[0].originFileObj
                    ? URL.createObjectURL(fileList[0].originFileObj)
                    : '')
                }
                alt="Preview"
                className="rounded"
                style={{ maxWidth: '100%' }}
              />
              {isUploaded && imageUrl && (
                <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700 break-all">
                  <strong>URL:</strong> {imageUrl}
                </div>
              )}
            </div>
          )}

          {uploadLoading && (
            <div className="text-sm text-blue-600">
              Uploading image to server...
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default CreateBlog
