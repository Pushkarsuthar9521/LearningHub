import { create } from 'zustand'
import { generateUniqueId } from '../lib/utils'
import { BlogPost, Category, Tag, User } from '../types'

interface BlogState {
  posts: BlogPost[]
  categories: Category[]
  tags: Tag[]
  loading: boolean
  error: string | null

  // Actions
  fetchPosts: () => Promise<void>
  fetchPostById: (id: string) => Promise<BlogPost | undefined>
  fetchPostBySlug: (slug: string) => Promise<BlogPost | undefined>
  createPost: (
    post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<BlogPost>
  updatePost: (
    id: string,
    post: Partial<BlogPost>
  ) => Promise<BlogPost | undefined>
  deletePost: (id: string) => Promise<boolean>
  fetchCategories: () => Promise<void>
  fetchTags: () => Promise<void>
}

// Mock data for the blog posts
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  role: 'admin'
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech news and updates'
  },
  {
    id: '2',
    name: 'Science',
    slug: 'science',
    description: 'Scientific discoveries and research'
  },
  {
    id: '3',
    name: 'Programming',
    slug: 'programming',
    description: 'Coding tips and best practices'
  },
  {
    id: '4',
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    description: 'Artificial intelligence and ML topics'
  },
  {
    id: '5',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Web technologies and frameworks'
  }
]

const mockTags: Tag[] = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'JavaScript', slug: 'javascript' },
  { id: '3', name: 'TypeScript', slug: 'typescript' },
  { id: '4', name: 'Node.js', slug: 'nodejs' },
  { id: '5', name: 'GraphQL', slug: 'graphql' },
  { id: '6', name: 'Frontend', slug: 'frontend' },
  { id: '7', name: 'Backend', slug: 'backend' },
  { id: '8', name: 'Database', slug: 'database' }
]

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-typescript',
    content: `
# Getting Started with React and TypeScript

React is a popular JavaScript library for building user interfaces, and TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. When combined, they provide a powerful way to build robust applications with fewer bugs.

## Why TypeScript with React?

TypeScript offers several benefits when used with React:

- **Type Safety**: Catch errors during development rather than at runtime.
- **Better IDE Support**: Get autocompletion, type information, and inline documentation.
- **Enhanced Refactoring**: Make large-scale changes to your codebase with confidence.
- **Improved Team Collaboration**: Types serve as documentation and help new team members understand the codebase.

## Setting Up a React TypeScript Project

You can use Create React App to set up a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

Or if you prefer to use Vite:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

## Creating Your First Component

Here's a simple React component written in TypeScript:

\`\`\`tsx
import React, { useState } from 'react';

interface CounterProps {
  initialCount: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;
\`\`\`

## Conclusion

React and TypeScript together provide a great developer experience and help build more maintainable applications. As you continue to learn, you'll discover more advanced patterns and techniques for managing types in your React applications.
    `,
    excerpt:
      'Learn how to combine React and TypeScript to build robust, type-safe web applications with improved developer experience.',
    coverImage:
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: mockUser,
    categories: [mockCategories[4], mockCategories[0]],
    tags: [mockTags[0], mockTags[1], mockTags[2]],
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z',
    published: true
  },
  {
    id: '2',
    title: 'Modern JavaScript Features Every Developer Should Know',
    slug: 'modern-javascript-features',
    content: `
# Modern JavaScript Features Every Developer Should Know

JavaScript has evolved significantly over the years, with ES6 (ECMAScript 2015) and subsequent versions introducing powerful new features that make code more readable, maintainable, and efficient. Here are some essential modern JavaScript features that every developer should be familiar with.

## Arrow Functions

Arrow functions provide a concise syntax for writing functions and also lexically bind the \`this\` value:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
\`\`\`

## Destructuring Assignment

Destructuring allows you to extract values from arrays or properties from objects into distinct variables:

\`\`\`javascript
// Array destructuring
const [first, second] = [1, 2];

// Object destructuring
const { name, age } = { name: 'John', age: 30 };
\`\`\`

## Spread and Rest Operators

The spread operator (\`...\`) allows an iterable to be expanded, while the rest parameter syntax collects multiple elements into a single array:

\`\`\`javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Rest parameter
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`

## Template Literals

Template literals allow embedded expressions and multi-line strings:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, ${name}!
This is a multi-line string.\`;
\`\`\`

## Promises and Async/Await

Promises provide a cleaner way to handle asynchronous operations, and async/await further simplifies working with Promises:

\`\`\`javascript
// Using Promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Optional Chaining and Nullish Coalescing

Optional chaining (\`?.\`) allows you to read deeply nested properties without worrying about whether intermediate nodes exist, and nullish coalescing (\`??\`) provides a default value when dealing with \`null\` or \`undefined\`:

\`\`\`javascript
// Optional chaining
const city = user?.address?.city;

// Nullish coalescing
const username = user.name ?? 'Anonymous';
\`\`\`

## Conclusion

These modern JavaScript features can significantly improve your code quality and developer experience. Familiarizing yourself with them will help you write more concise, readable, and robust JavaScript code.
    `,
    excerpt:
      'Explore essential modern JavaScript features like arrow functions, destructuring, async/await, and more that will help you write cleaner, more efficient code.',
    coverImage:
      'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: mockUser,
    categories: [mockCategories[4], mockCategories[2]],
    tags: [mockTags[1], mockTags[5]],
    createdAt: '2023-06-20T14:45:00Z',
    updatedAt: '2023-06-21T09:15:00Z',
    published: true
  },
  {
    id: '3',
    title: 'Introduction to GraphQL: A Modern API for Modern Applications',
    slug: 'introduction-to-graphql',
    content: `
# Introduction to GraphQL: A Modern API for Modern Applications

GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. It was developed by Facebook in 2012 and released as an open-source project in 2015. GraphQL provides a more efficient, powerful, and flexible alternative to REST.

## Why GraphQL?

GraphQL solves many of the limitations and inefficiencies of REST:

- **No Over-fetching or Under-fetching**: Get exactly what you need, nothing more, nothing less.
- **Single Request**: Fetch complex, nested data in a single request.
- **Strong Typing**: The schema defines what queries are possible and what fields are available.
- **Introspection**: API is self-documenting, clients can query the schema for details.
- **Version-free**: Add fields and types without impacting existing queries.

## Basic Concepts

### Schema and Types

GraphQL uses a strong type system to define the capabilities of an API. The schema serves as a contract between the client and server:

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
}
\`\`\`

### Queries

Queries allow clients to fetch data:

\`\`\`graphql
query {
  user(id: "123") {
    name
    email
    posts {
      title
      comments {
        text
        author {
          name
        }
      }
    }
  }
}
\`\`\`

### Mutations

Mutations allow clients to modify data:

\`\`\`graphql
mutation {
  createPost(title: "Hello GraphQL", content: "This is my first post", authorId: "123") {
    id
    title
    author {
      name
    }
  }
}
\`\`\`

## Setting Up a GraphQL Server

Here's a simple example using Node.js with Apollo Server:

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

// Define schema
const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL World!'
  }
};

// Create server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
server.listen().then(({ url }) => {
  console.log(\`Server ready at \`);
});
\`\`\`

## Consuming GraphQL with Apollo Client

Here's how to use Apollo Client with React:

\`\`\`javascript
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Create client
const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com',
  cache: new InMemoryCache()
});

// Define query
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts {
        title
      }
    }
  }
\`;

// Create component
function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>{data.user.name}</h2>
      <p>{data.user.email}</p>
      <h3>Posts</h3>
      <ul>
        {data.user.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

## Conclusion

GraphQL represents a paradigm shift in how we build and consume APIs. Its flexibility, efficiency, and developer-friendly features make it an excellent choice for modern applications, especially those with complex data requirements or mobile clients where bandwidth efficiency is crucial.
    `,
    excerpt:
      'Discover GraphQL, a powerful query language and runtime for APIs that offers more flexibility and efficiency than traditional REST APIs.',
    coverImage:
      'https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: mockUser,
    categories: [mockCategories[4], mockCategories[2]],
    tags: [mockTags[4], mockTags[6], mockTags[7]],
    createdAt: '2023-07-05T08:20:00Z',
    updatedAt: '2023-07-06T11:35:00Z',
    published: true
  }
]

const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  categories: [],
  tags: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ posts: mockPosts, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false })
    }
  },

  fetchPostById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const post = mockPosts.find(post => post.id === id)
      set({ loading: false })
      return post
    } catch (error) {
      set({ error: 'Failed to fetch post', loading: false })
      return undefined
    }
  },

  fetchPostBySlug: async (slug: string) => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      const post = mockPosts.find(post => post.slug === slug)
      set({ loading: false })
      return post
    } catch (error) {
      set({ error: 'Failed to fetch post', loading: false })
      return undefined
    }
  },

  createPost: async postData => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const newPost: BlogPost = {
        ...postData,
        id: generateUniqueId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      set(state => ({
        posts: [...state.posts, newPost],
        loading: false
      }))

      return newPost
    } catch (error) {
      set({ error: 'Failed to create post', loading: false })
      throw error
    }
  },

  updatePost: async (id, postData) => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      let updatedPost: BlogPost | undefined

      set(state => {
        const posts = state.posts.map(post => {
          if (post.id === id) {
            updatedPost = {
              ...post,
              ...postData,
              updatedAt: new Date().toISOString()
            }
            return updatedPost
          }
          return post
        })

        return { posts, loading: false }
      })

      return updatedPost
    } catch (error) {
      set({ error: 'Failed to update post', loading: false })
      return undefined
    }
  },

  deletePost: async id => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      set(state => ({
        posts: state.posts.filter(post => post.id !== id),
        loading: false
      }))

      return true
    } catch (error) {
      set({ error: 'Failed to delete post', loading: false })
      return false
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      set({ categories: mockCategories, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch categories', loading: false })
    }
  },

  fetchTags: async () => {
    set({ loading: true, error: null })
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))
      set({ tags: mockTags, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch tags', loading: false })
    }
  }
}))

export default useBlogStore
