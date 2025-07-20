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
  deleteBlog: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  register: AuthResponse;
  updateBlog?: Maybe<Blog>;
  updateUser?: Maybe<User>;
};


export type MutationCreateBlogArgs = {
  input: BlogInput;
};


export type MutationDeleteBlogArgs = {
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


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getBlog?: Maybe<Blog>;
  getBlogs: Array<Blog>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
  protectedQuery: Scalars['String']['output'];
};


export type QueryGetBlogArgs = {
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

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, email: string, username: string } } };


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