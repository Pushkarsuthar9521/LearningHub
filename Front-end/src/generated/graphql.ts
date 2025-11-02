import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: string; output: string; }
  JSONObject: { input: Record<string, unknown>; output: Record<string, unknown>; }
};

export type Answer = {
  __typename?: 'Answer';
  answerText: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  orderIndex: Scalars['Int']['output'];
  question: Question;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AnswerInput = {
  answerText: Scalars['String']['input'];
  explanation?: InputMaybe<Scalars['String']['input']>;
  isCorrect: Scalars['Boolean']['input'];
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Blog = {
  __typename?: 'Blog';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']['output']>;
  category: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  excerpt?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likeCount: Scalars['Float']['output'];
  publishedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status: BlogStatus;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  viewCount: Scalars['Float']['output'];
};

export type BlogInput = {
  category: Scalars['String']['input'];
  content: Scalars['String']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BlogStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

/** Blog status enum */
export enum BlogStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog: Blog;
  createQuiz: Quiz;
  deleteBlog: Scalars['Boolean']['output'];
  deleteQuiz: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  register: AuthResponse;
  updateBlog?: Maybe<Blog>;
  updateQuiz?: Maybe<Quiz>;
  updateUser?: Maybe<User>;
};


export type MutationCreateBlogArgs = {
  input: BlogInput;
};


export type MutationCreateQuizArgs = {
  input: QuizInput;
  questions: Array<QuestionInput>;
};


export type MutationDeleteBlogArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuizArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateBlogArgs = {
  id: Scalars['ID']['input'];
  input: BlogInput;
};


export type MutationUpdateQuizArgs = {
  id: Scalars['ID']['input'];
  input: QuizInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getBlog?: Maybe<Blog>;
  getBlogs: Array<Blog>;
  getQuiz?: Maybe<Quiz>;
  getQuizzes: Array<Quiz>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  protectedQuery: Scalars['String']['output'];
};


export type QueryGetBlogArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  answers: Array<Answer>;
  createdAt: Scalars['DateTimeISO']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Int']['output'];
  points: Scalars['Int']['output'];
  questionText: Scalars['String']['output'];
  quiz: Quiz;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type QuestionInput = {
  answers: Array<AnswerInput>;
  explanation?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['Int']['input']>;
  questionText: Scalars['String']['input'];
};

export type Quiz = {
  __typename?: 'Quiz';
  attempts: Array<QuizAttempt>;
  author: User;
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  difficulty: QuizDifficulty;
  featuredImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  slug: Scalars['String']['output'];
  status: QuizStatus;
  tags: Array<Scalars['String']['output']>;
  timeLimit?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  totalAttempts: Scalars['Int']['output'];
  totalQuestions: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type QuizAttempt = {
  __typename?: 'QuizAttempt';
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  correctAnswers: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  percentage: Scalars['Float']['output'];
  quiz: Quiz;
  score: Scalars['Int']['output'];
  startedAt: Scalars['DateTimeISO']['output'];
  timeSpent?: Maybe<Scalars['Int']['output']>;
  totalQuestions: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
  userAnswers: Scalars['JSONObject']['output'];
};

/** Quiz difficulty levels */
export enum QuizDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type QuizInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<QuizDifficulty>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<QuizStatus>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  timeLimit?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

/** Quiz status enum */
export enum QuizStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  blogs: Array<Blog>;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  quizAttempts: Array<QuizAttempt>;
  quizzes: Array<Quiz>;
  role: UserRole;
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
  username: Scalars['String']['input'];
};

/** User role enum */
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CreateBlogMutationVariables = Exact<{
  input: BlogInput;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'Blog', id: string, title: string, slug?: string | null, content: string, excerpt?: string | null, featuredImage?: string | null, tags: Array<string>, category: string, status: BlogStatus, createdAt: string, updatedAt: string, author?: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string } | null } };

export type CreateQuizMutationVariables = Exact<{
  input: QuizInput;
  questions: Array<QuestionInput> | QuestionInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, status: QuizStatus, timeLimit?: number | null, totalQuestions: number, featuredImage?: string | null, tags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string }, questions: Array<{ __typename?: 'Question', id: string, questionText: string, explanation?: string | null, orderIndex: number, points: number, imageUrl?: string | null, answers: Array<{ __typename?: 'Answer', id: string, answerText: string, isCorrect: boolean, orderIndex: number, explanation?: string | null }> }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string, role: UserRole } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, email: string, username: string } } };


export const CreateBlogDocument = gql`
    mutation CreateBlog($input: BlogInput!) {
  createBlog(input: $input) {
    id
    title
    slug
    content
    excerpt
    featuredImage
    tags
    category
    status
    createdAt
    updatedAt
    author {
      id
      username
      firstName
      lastName
    }
  }
}
    `;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreateQuizDocument = gql`
    mutation CreateQuiz($input: QuizInput!, $questions: [QuestionInput!]!) {
  createQuiz(input: $input, questions: $questions) {
    id
    title
    slug
    description
    category
    difficulty
    status
    timeLimit
    totalQuestions
    featuredImage
    tags
    createdAt
    updatedAt
    author {
      id
      username
      firstName
      lastName
    }
    questions {
      id
      questionText
      explanation
      orderIndex
      points
      imageUrl
      answers {
        id
        answerText
        isCorrect
        orderIndex
        explanation
      }
    }
  }
}
    `;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *      questions: // value for 'questions'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      username
      firstName
      lastName
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    firstName
    lastName
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      email
      username
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;