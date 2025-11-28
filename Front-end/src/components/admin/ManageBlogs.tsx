import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, message, Modal, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Blog,
  DeleteBlogDocument,
  GetBlogsDocument
} from '../../generated/graphql'

const { confirm } = Modal

const ManageBlogs: React.FC = () => {
  const navigate = useNavigate()
  const { data, loading, refetch } = useQuery(GetBlogsDocument)
  const [deleteBlog] = useMutation(DeleteBlogDocument)

  const handleDelete = (id: string, title: string) => {
    confirm({
      title: 'Delete Blog',
      content: `Are you sure you want to delete "${title}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteBlog({
            variables: { id }
          })
          message.success('Blog deleted successfully')
          refetch()
        } catch (error) {
          message.error('Failed to delete blog')
          console.error(error)
        }
      }
    })
  }

  const columns: ColumnsType<Blog> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category.toUpperCase()}</Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'published'
            ? 'green'
            : status === 'draft'
            ? 'orange'
            : 'red'
        return <Tag color={color}>{status.toUpperCase()}</Tag>
      }
    },
    {
      title: 'Views',
      dataIndex: 'viewCount',
      key: 'viewCount',
      render: (count: number) => count || 0
    },
    {
      title: 'Likes',
      dataIndex: 'likeCount',
      key: 'likeCount',
      render: (count: number) => count || 0
    },
    {
      title: 'Author',
      key: 'author',
      render: (_, record) =>
        record.author?.firstName || record.author?.username || 'Unknown'
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/blog/${record.slug}`)}
            title="View"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => message.info('Edit feature coming soon')}
            title="Edit"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id, record.title)}
            title="Delete"
          />
        </Space>
      )
    }
  ]

  return (
    <Card title="Manage Blogs" className="shadow-sm">
      <Table
        columns={columns}
        dataSource={data?.getBlogs || []}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: total => `Total ${total} blogs`
        }}
      />
    </Card>
  )
}

export default ManageBlogs
