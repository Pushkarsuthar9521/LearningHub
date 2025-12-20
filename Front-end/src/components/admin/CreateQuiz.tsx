import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Card, Form, Input, Select, Upload, message } from 'antd'
import React, { useState } from 'react'
import { CreateQuizDocument, GetQuizzesDocument } from '../../generated/graphql'
import { uploadImage } from '../../lib/upload'

const { TextArea } = Input
const { Option } = Select

interface QuizFormValues {
  title: string
  description?: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit?: number
  tags?: string[]
  featuredImage?: any
  status: 'draft' | 'published' | 'archived'
}

const CreateQuiz: React.FC = () => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [uploadLoading, setUploadLoading] = useState(false)

  const [createQuiz, { loading }] = useMutation(CreateQuizDocument, {
    refetchQueries: [{ query: GetQuizzesDocument }]
  })

  const handleUpload = async (file: File) => {
    try {
      setUploadLoading(true)
      const url = await uploadImage(file)
      if (url) {
        setImageUrl(url)
        message.success('Image uploaded successfully!')
        return false // Prevent default upload behavior
      }
    } catch (error) {
      message.error('Failed to upload image')
      console.error(error)
    } finally {
      setUploadLoading(false)
    }
    return false
  }

  const handleSubmit = async (values: QuizFormValues) => {
    try {
      await createQuiz({
        variables: {
          input: {
            title: values.title,
            description: values.description,
            category: values.category,
            difficulty: values.difficulty,
            timeLimit: values.timeLimit ? Number(values.timeLimit) : undefined,
            tags: values.tags,
            status: values.status,
            featuredImage: imageUrl || undefined
          },
          questions: [] // For now, empty questions - add question editor later
        }
      })
      message.success(
        'Quiz created successfully! You can now add questions to it.'
      )
      form.resetFields()
      setImageUrl('')
    } catch (error) {
      message.error('Failed to create quiz')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Quiz</h1>
        <p className="text-gray-600">
          Set up your quiz. You can add questions after creation.
        </p>
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
            <Input placeholder="Enter quiz title" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            extra="Provide a brief overview of the quiz"
          >
            <TextArea
              placeholder="What is this quiz about?"
              rows={3}
              showCount
              maxLength={300}
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
              <Option value="mathematics">Mathematics</Option>
              <Option value="programming">Programming</Option>
              <Option value="history">History</Option>
              <Option value="geography">Geography</Option>
              <Option value="language">Language</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="difficulty"
            label="Difficulty Level"
            initialValue="easy"
            rules={[{ required: true, message: 'Please select difficulty' }]}
          >
            <Select size="large">
              <Option value="easy">Easy</Option>
              <Option value="medium">Medium</Option>
              <Option value="hard">Hard</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="timeLimit"
            label="Time Limit (minutes)"
            extra="Optional: Set a time limit for completing the quiz"
          >
            <Input
              type="number"
              placeholder="e.g., 30"
              min={1}
              max={180}
              size="large"
            />
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
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={handleUpload}
              showUploadList={false}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                loading={uploadLoading}
              >
                {imageUrl ? 'Change Image' : 'Upload Image'}
              </Button>
            </Upload>
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Featured"
                  className="h-32 w-auto object-cover rounded"
                />
              </div>
            )}
          </Form.Item>

          <Form.Item name="status" label="Status" initialValue="draft">
            <Select size="large">
              <Option value="draft">Save as Draft</Option>
              <Option value="published">Publish Now</Option>
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
                Create Quiz
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

export default CreateQuiz
