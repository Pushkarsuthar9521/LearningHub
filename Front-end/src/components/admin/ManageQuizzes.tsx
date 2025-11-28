import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, message, Modal, Space, Table, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DeleteQuizDocument,
  GetQuizzesDocument,
  Quiz
} from '../../generated/graphql'

const { confirm } = Modal

const ManageQuizzes: React.FC = () => {
  const navigate = useNavigate()
  const { data, loading, refetch } = useQuery(GetQuizzesDocument)
  const [deleteQuiz] = useMutation(DeleteQuizDocument)

  const handleDelete = (id: string, title: string) => {
    confirm({
      title: 'Delete Quiz',
      content: `Are you sure you want to delete "${title}"?`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteQuiz({
            variables: { id }
          })
          message.success('Quiz deleted successfully')
          refetch()
        } catch (error) {
          message.error('Failed to delete quiz')
          console.error(error)
        }
      }
    })
  }

  const columns: ColumnsType<Quiz> = [
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
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty: string) => {
        const color =
          difficulty === 'easy'
            ? 'green'
            : difficulty === 'medium'
            ? 'orange'
            : 'red'
        return <Tag color={color}>{difficulty.toUpperCase()}</Tag>
      }
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
      title: 'Questions',
      dataIndex: 'totalQuestions',
      key: 'totalQuestions',
      render: (count: number) => count || 0
    },
    {
      title: 'Attempts',
      dataIndex: 'totalAttempts',
      key: 'totalAttempts',
      render: (count: number) => count || 0
    },
    {
      title: 'Time Limit',
      dataIndex: 'timeLimit',
      key: 'timeLimit',
      render: (time: number) => (time ? `${time} min` : 'N/A')
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
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/quiz/${record.slug}`)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => message.info('Edit feature coming soon')}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, record.title)}
            />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <Card title="Manage Quizzes" className="shadow-sm">
      <Table
        columns={columns}
        dataSource={data?.getQuizzes || []}
        loading={loading}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: total => `Total ${total} quizzes`
        }}
      />
    </Card>
  )
}

export default ManageQuizzes
