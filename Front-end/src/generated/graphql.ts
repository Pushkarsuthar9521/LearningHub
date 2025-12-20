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
  Upload: { input: any; output: any; }
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
  deleteQuizAttempt: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  register: AuthResponse;
  submitQuizAttempt: QuizAttempt;
  updateBlog?: Maybe<Blog>;
  updateQuiz?: Maybe<Quiz>;
  updateQuizAttempt?: Maybe<QuizAttempt>;
  updateUser?: Maybe<User>;
  uploadImage: Scalars['String']['output'];
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


export type MutationDeleteQuizAttemptArgs = {
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


export type MutationSubmitQuizAttemptArgs = {
  input: QuizAttemptInput;
};


export type MutationUpdateBlogArgs = {
  id: Scalars['ID']['input'];
  input: BlogInput;
};


export type MutationUpdateQuizArgs = {
  id: Scalars['ID']['input'];
  input: QuizInput;
};


export type MutationUpdateQuizAttemptArgs = {
  id: Scalars['ID']['input'];
  input: QuizAttemptInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};

export type Query = {
  __typename?: 'Query';
  getBlog?: Maybe<Blog>;
  getBlogBySlug?: Maybe<Blog>;
  getBlogs: Array<Blog>;
  getMyQuizAttempts: Array<QuizAttempt>;
  getMyQuizAttemptsByQuizId: Array<QuizAttempt>;
  getQuiz?: Maybe<Quiz>;
  getQuizAttemptById?: Maybe<QuizAttempt>;
  getQuizAttemptStats: QuizAttemptStats;
  getQuizAttemptsByQuizId: Array<QuizAttempt>;
  getQuizAttemptsByUserId: Array<QuizAttempt>;
  getQuizById: Quiz;
  getQuizBySlug?: Maybe<Quiz>;
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


export type QueryGetBlogBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetMyQuizAttemptsByQuizIdArgs = {
  quizId: Scalars['ID']['input'];
};


export type QueryGetQuizArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuizAttemptByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuizAttemptStatsArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetQuizAttemptsByQuizIdArgs = {
  quizId: Scalars['ID']['input'];
};


export type QueryGetQuizAttemptsByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetQuizByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetQuizBySlugArgs = {
  slug: Scalars['String']['input'];
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

export type QuizAttemptInput = {
  correctAnswers: Scalars['Int']['input'];
  isCompleted?: Scalars['Boolean']['input'];
  quizId: Scalars['String']['input'];
  score: Scalars['Int']['input'];
  timeSpent?: InputMaybe<Scalars['Int']['input']>;
  totalQuestions: Scalars['Int']['input'];
  userAnswers: Scalars['JSONObject']['input'];
};

export type QuizAttemptStats = {
  __typename?: 'QuizAttemptStats';
  averagePercentage: Scalars['Float']['output'];
  averageScore: Scalars['Float']['output'];
  bestScore: Scalars['Int']['output'];
  totalAttempts: Scalars['Int']['output'];
  totalTimeSpent: Scalars['Int']['output'];
  worstScore: Scalars['Int']['output'];
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

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: string };

export type CreateBlogMutationVariables = Exact<{
  input: BlogInput;
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createBlog: { __typename?: 'Blog', id: string, title: string, slug?: string | null, content: string, excerpt?: string | null, featuredImage?: string | null, tags: Array<string>, category: string, status: BlogStatus, viewCount: number, likeCount: number, publishedAt?: string | null, createdAt: string, updatedAt: string, authorId?: string | null, author?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string, role: UserRole, isActive: boolean, createdAt: string, updatedAt: string } | null } };

export type DeleteBlogMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBlogMutation = { __typename?: 'Mutation', deleteBlog: boolean };

export type GetBlogQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBlogQuery = { __typename?: 'Query', getBlog?: { __typename?: 'Blog', id: string, title: string, slug?: string | null, content: string, excerpt?: string | null, featuredImage?: string | null, tags: Array<string>, category: string, status: BlogStatus, viewCount: number, likeCount: number, publishedAt?: string | null, createdAt: string, updatedAt: string, authorId?: string | null, author?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string, role: UserRole, isActive: boolean, createdAt: string, updatedAt: string } | null } | null };

export type GetBlogBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetBlogBySlugQuery = { __typename?: 'Query', getBlogBySlug?: { __typename?: 'Blog', id: string, title: string, slug?: string | null, content: string, excerpt?: string | null, category: string, createdAt: string, likeCount: number, publishedAt?: string | null, status: BlogStatus, tags: Array<string>, updatedAt: string, viewCount: number, author?: { __typename?: 'User', firstName: string, id: string } | null } | null };

export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { __typename?: 'Query', getBlogs: Array<{ __typename?: 'Blog', id: string, title: string, slug?: string | null, content: string, excerpt?: string | null, featuredImage?: string | null, tags: Array<string>, category: string, status: BlogStatus, viewCount: number, likeCount: number, publishedAt?: string | null, createdAt: string, updatedAt: string, authorId?: string | null, author?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string, role: UserRole, isActive: boolean, createdAt: string, updatedAt: string } | null }> };

export type UpdateBlogMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: BlogInput;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updateBlog?: { __typename?: 'Blog', id: string, title: string, slug?: string | null, content: string, excerpt?: string | null, featuredImage?: string | null, tags: Array<string>, category: string, status: BlogStatus, viewCount: number, likeCount: number, publishedAt?: string | null, createdAt: string, updatedAt: string, authorId?: string | null, author?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string, role: UserRole, isActive: boolean, createdAt: string, updatedAt: string } | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, firstName: string, lastName: string, role: UserRole } | null };

export type CreateQuizMutationVariables = Exact<{
  input: QuizInput;
  questions: Array<QuestionInput> | QuestionInput;
}>;


export type CreateQuizMutation = { __typename?: 'Mutation', createQuiz: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, status: QuizStatus, timeLimit?: number | null, totalAttempts: number, totalQuestions: number, featuredImage?: string | null, tags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, role: UserRole }, questions: Array<{ __typename?: 'Question', id: string, questionText: string, explanation?: string | null, orderIndex: number, points: number, imageUrl?: string | null, answers: Array<{ __typename?: 'Answer', id: string, answerText: string, isCorrect: boolean, orderIndex: number, explanation?: string | null }> }> } };

export type DeleteQuizMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteQuizMutation = { __typename?: 'Mutation', deleteQuiz: boolean };

export type GetQuizByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetQuizByIdQuery = { __typename?: 'Query', getQuizById: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, status: QuizStatus, timeLimit?: number | null, totalAttempts: number, totalQuestions: number, featuredImage?: string | null, tags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, role: UserRole }, questions: Array<{ __typename?: 'Question', id: string, questionText: string, explanation?: string | null, orderIndex: number, points: number, imageUrl?: string | null, answers: Array<{ __typename?: 'Answer', id: string, answerText: string, isCorrect: boolean, orderIndex: number, explanation?: string | null }> }> } };

export type GetQuizBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetQuizBySlugQuery = { __typename?: 'Query', getQuizBySlug?: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, status: QuizStatus, timeLimit?: number | null, totalAttempts: number, totalQuestions: number, featuredImage?: string | null, tags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, role: UserRole }, questions: Array<{ __typename?: 'Question', id: string, questionText: string, explanation?: string | null, orderIndex: number, points: number, imageUrl?: string | null, answers: Array<{ __typename?: 'Answer', id: string, answerText: string, isCorrect: boolean, orderIndex: number, explanation?: string | null }> }> } | null };

export type GetQuizzesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetQuizzesQuery = { __typename?: 'Query', getQuizzes: Array<{ __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, status: QuizStatus, timeLimit?: number | null, totalAttempts: number, totalQuestions: number, featuredImage?: string | null, tags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, role: UserRole }, questions: Array<{ __typename?: 'Question', id: string, questionText: string, explanation?: string | null, orderIndex: number, points: number, imageUrl?: string | null, answers: Array<{ __typename?: 'Answer', id: string, answerText: string, isCorrect: boolean, orderIndex: number, explanation?: string | null }> }> }> };

export type UpdateQuizMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: QuizInput;
}>;


export type UpdateQuizMutation = { __typename?: 'Mutation', updateQuiz?: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, status: QuizStatus, timeLimit?: number | null, totalAttempts: number, totalQuestions: number, featuredImage?: string | null, tags: Array<string>, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, role: UserRole } } | null };

export type DeleteQuizAttemptMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteQuizAttemptMutation = { __typename?: 'Mutation', deleteQuizAttempt: boolean };

export type GetMyQuizAttemptsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyQuizAttemptsQuery = { __typename?: 'Query', getMyQuizAttempts: Array<{ __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, featuredImage?: string | null, tags: Array<string> }, user: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string } }> };

export type GetMyQuizAttemptsByQuizIdQueryVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type GetMyQuizAttemptsByQuizIdQuery = { __typename?: 'Query', getMyQuizAttemptsByQuizId: Array<{ __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string }, user: { __typename?: 'User', id: string, username: string, email: string } }> };

export type GetQuizAttemptByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetQuizAttemptByIdQuery = { __typename?: 'Query', getQuizAttemptById?: { __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, featuredImage?: string | null, tags: Array<string>, timeLimit?: number | null }, user: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string } } | null };

export type GetQuizAttemptStatsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetQuizAttemptStatsQuery = { __typename?: 'Query', getQuizAttemptStats: { __typename?: 'QuizAttemptStats', totalAttempts: number, averageScore: number, averagePercentage: number, totalTimeSpent: number, bestScore: number, worstScore: number } };

export type GetQuizAttemptsByQuizIdQueryVariables = Exact<{
  quizId: Scalars['ID']['input'];
}>;


export type GetQuizAttemptsByQuizIdQuery = { __typename?: 'Query', getQuizAttemptsByQuizId: Array<{ __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string }, user: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string } }> };

export type GetQuizAttemptsByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetQuizAttemptsByUserIdQuery = { __typename?: 'Query', getQuizAttemptsByUserId: Array<{ __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, featuredImage?: string | null, tags: Array<string> }, user: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string } }> };

export type SubmitQuizAttemptMutationVariables = Exact<{
  input: QuizAttemptInput;
}>;


export type SubmitQuizAttemptMutation = { __typename?: 'Mutation', submitQuizAttempt: { __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string, description?: string | null, category: string, difficulty: QuizDifficulty, featuredImage?: string | null, tags: Array<string>, totalAttempts: number }, user: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string } } };

export type UpdateQuizAttemptMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: QuizAttemptInput;
}>;


export type UpdateQuizAttemptMutation = { __typename?: 'Mutation', updateQuizAttempt?: { __typename?: 'QuizAttempt', id: string, score: number, totalQuestions: number, correctAnswers: number, percentage: number, timeSpent?: number | null, userAnswers: Record<string, unknown>, isCompleted: boolean, startedAt: string, completedAt?: string | null, updatedAt: string, quiz: { __typename?: 'Quiz', id: string, title: string, slug: string }, user: { __typename?: 'User', id: string, username: string, email: string } } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, email: string, username: string } } };


export const UploadImageDocument = gql`
    mutation UploadImage($file: Upload!) {
  uploadImage(file: $file)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
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
    viewCount
    likeCount
    publishedAt
    createdAt
    updatedAt
    authorId
    author {
      id
      email
      username
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
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
export const DeleteBlogDocument = gql`
    mutation DeleteBlog($id: ID!) {
  deleteBlog(id: $id)
}
    `;
export type DeleteBlogMutationFn = Apollo.MutationFunction<DeleteBlogMutation, DeleteBlogMutationVariables>;

/**
 * __useDeleteBlogMutation__
 *
 * To run a mutation, you first call `useDeleteBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBlogMutation, { data, loading, error }] = useDeleteBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBlogMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBlogMutation, DeleteBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBlogMutation, DeleteBlogMutationVariables>(DeleteBlogDocument, options);
      }
export type DeleteBlogMutationHookResult = ReturnType<typeof useDeleteBlogMutation>;
export type DeleteBlogMutationResult = Apollo.MutationResult<DeleteBlogMutation>;
export type DeleteBlogMutationOptions = Apollo.BaseMutationOptions<DeleteBlogMutation, DeleteBlogMutationVariables>;
export const GetBlogDocument = gql`
    query GetBlog($id: ID!) {
  getBlog(id: $id) {
    id
    title
    slug
    content
    excerpt
    featuredImage
    tags
    category
    status
    viewCount
    likeCount
    publishedAt
    createdAt
    updatedAt
    authorId
    author {
      id
      email
      username
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetBlogQuery__
 *
 * To run a query within a React component, call `useGetBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBlogQuery(baseOptions: Apollo.QueryHookOptions<GetBlogQuery, GetBlogQueryVariables> & ({ variables: GetBlogQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
      }
export function useGetBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
        }
export function useGetBlogSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogQuery, GetBlogQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlogQuery, GetBlogQueryVariables>(GetBlogDocument, options);
        }
export type GetBlogQueryHookResult = ReturnType<typeof useGetBlogQuery>;
export type GetBlogLazyQueryHookResult = ReturnType<typeof useGetBlogLazyQuery>;
export type GetBlogSuspenseQueryHookResult = ReturnType<typeof useGetBlogSuspenseQuery>;
export type GetBlogQueryResult = Apollo.QueryResult<GetBlogQuery, GetBlogQueryVariables>;
export const GetBlogBySlugDocument = gql`
    query GetBlogBySlug($slug: String!) {
  getBlogBySlug(slug: $slug) {
    id
    title
    slug
    content
    excerpt
    author {
      firstName
      id
    }
    category
    createdAt
    likeCount
    publishedAt
    status
    tags
    updatedAt
    viewCount
  }
}
    `;

/**
 * __useGetBlogBySlugQuery__
 *
 * To run a query within a React component, call `useGetBlogBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetBlogBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetBlogBySlugQuery, GetBlogBySlugQueryVariables> & ({ variables: GetBlogBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogBySlugQuery, GetBlogBySlugQueryVariables>(GetBlogBySlugDocument, options);
      }
export function useGetBlogBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogBySlugQuery, GetBlogBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogBySlugQuery, GetBlogBySlugQueryVariables>(GetBlogBySlugDocument, options);
        }
export function useGetBlogBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogBySlugQuery, GetBlogBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlogBySlugQuery, GetBlogBySlugQueryVariables>(GetBlogBySlugDocument, options);
        }
export type GetBlogBySlugQueryHookResult = ReturnType<typeof useGetBlogBySlugQuery>;
export type GetBlogBySlugLazyQueryHookResult = ReturnType<typeof useGetBlogBySlugLazyQuery>;
export type GetBlogBySlugSuspenseQueryHookResult = ReturnType<typeof useGetBlogBySlugSuspenseQuery>;
export type GetBlogBySlugQueryResult = Apollo.QueryResult<GetBlogBySlugQuery, GetBlogBySlugQueryVariables>;
export const GetBlogsDocument = gql`
    query GetBlogs {
  getBlogs {
    id
    title
    slug
    content
    excerpt
    featuredImage
    tags
    category
    status
    viewCount
    likeCount
    publishedAt
    createdAt
    updatedAt
    authorId
    author {
      id
      email
      username
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetBlogsQuery__
 *
 * To run a query within a React component, call `useGetBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
      }
export function useGetBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
        }
export function useGetBlogsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
        }
export type GetBlogsQueryHookResult = ReturnType<typeof useGetBlogsQuery>;
export type GetBlogsLazyQueryHookResult = ReturnType<typeof useGetBlogsLazyQuery>;
export type GetBlogsSuspenseQueryHookResult = ReturnType<typeof useGetBlogsSuspenseQuery>;
export type GetBlogsQueryResult = Apollo.QueryResult<GetBlogsQuery, GetBlogsQueryVariables>;
export const UpdateBlogDocument = gql`
    mutation UpdateBlog($id: ID!, $input: BlogInput!) {
  updateBlog(id: $id, input: $input) {
    id
    title
    slug
    content
    excerpt
    featuredImage
    tags
    category
    status
    viewCount
    likeCount
    publishedAt
    createdAt
    updatedAt
    authorId
    author {
      id
      email
      username
      firstName
      lastName
      role
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, options);
      }
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
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
    totalAttempts
    totalQuestions
    featuredImage
    tags
    createdAt
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
      role
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
export const DeleteQuizDocument = gql`
    mutation DeleteQuiz($id: ID!) {
  deleteQuiz(id: $id)
}
    `;
export type DeleteQuizMutationFn = Apollo.MutationFunction<DeleteQuizMutation, DeleteQuizMutationVariables>;

/**
 * __useDeleteQuizMutation__
 *
 * To run a mutation, you first call `useDeleteQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuizMutation, { data, loading, error }] = useDeleteQuizMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuizMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuizMutation, DeleteQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuizMutation, DeleteQuizMutationVariables>(DeleteQuizDocument, options);
      }
export type DeleteQuizMutationHookResult = ReturnType<typeof useDeleteQuizMutation>;
export type DeleteQuizMutationResult = Apollo.MutationResult<DeleteQuizMutation>;
export type DeleteQuizMutationOptions = Apollo.BaseMutationOptions<DeleteQuizMutation, DeleteQuizMutationVariables>;
export const GetQuizByIdDocument = gql`
    query GetQuizById($id: ID!) {
  getQuizById(id: $id) {
    id
    title
    slug
    description
    category
    difficulty
    status
    timeLimit
    totalAttempts
    totalQuestions
    featuredImage
    tags
    createdAt
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
      role
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

/**
 * __useGetQuizByIdQuery__
 *
 * To run a query within a React component, call `useGetQuizByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuizByIdQuery(baseOptions: Apollo.QueryHookOptions<GetQuizByIdQuery, GetQuizByIdQueryVariables> & ({ variables: GetQuizByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizByIdQuery, GetQuizByIdQueryVariables>(GetQuizByIdDocument, options);
      }
export function useGetQuizByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizByIdQuery, GetQuizByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizByIdQuery, GetQuizByIdQueryVariables>(GetQuizByIdDocument, options);
        }
export function useGetQuizByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizByIdQuery, GetQuizByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizByIdQuery, GetQuizByIdQueryVariables>(GetQuizByIdDocument, options);
        }
export type GetQuizByIdQueryHookResult = ReturnType<typeof useGetQuizByIdQuery>;
export type GetQuizByIdLazyQueryHookResult = ReturnType<typeof useGetQuizByIdLazyQuery>;
export type GetQuizByIdSuspenseQueryHookResult = ReturnType<typeof useGetQuizByIdSuspenseQuery>;
export type GetQuizByIdQueryResult = Apollo.QueryResult<GetQuizByIdQuery, GetQuizByIdQueryVariables>;
export const GetQuizBySlugDocument = gql`
    query GetQuizBySlug($slug: String!) {
  getQuizBySlug(slug: $slug) {
    id
    title
    slug
    description
    category
    difficulty
    status
    timeLimit
    totalAttempts
    totalQuestions
    featuredImage
    tags
    createdAt
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
      role
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

/**
 * __useGetQuizBySlugQuery__
 *
 * To run a query within a React component, call `useGetQuizBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetQuizBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetQuizBySlugQuery, GetQuizBySlugQueryVariables> & ({ variables: GetQuizBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizBySlugQuery, GetQuizBySlugQueryVariables>(GetQuizBySlugDocument, options);
      }
export function useGetQuizBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizBySlugQuery, GetQuizBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizBySlugQuery, GetQuizBySlugQueryVariables>(GetQuizBySlugDocument, options);
        }
export function useGetQuizBySlugSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizBySlugQuery, GetQuizBySlugQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizBySlugQuery, GetQuizBySlugQueryVariables>(GetQuizBySlugDocument, options);
        }
export type GetQuizBySlugQueryHookResult = ReturnType<typeof useGetQuizBySlugQuery>;
export type GetQuizBySlugLazyQueryHookResult = ReturnType<typeof useGetQuizBySlugLazyQuery>;
export type GetQuizBySlugSuspenseQueryHookResult = ReturnType<typeof useGetQuizBySlugSuspenseQuery>;
export type GetQuizBySlugQueryResult = Apollo.QueryResult<GetQuizBySlugQuery, GetQuizBySlugQueryVariables>;
export const GetQuizzesDocument = gql`
    query GetQuizzes {
  getQuizzes {
    id
    title
    slug
    description
    category
    difficulty
    status
    timeLimit
    totalAttempts
    totalQuestions
    featuredImage
    tags
    createdAt
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
      role
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

/**
 * __useGetQuizzesQuery__
 *
 * To run a query within a React component, call `useGetQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizzesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetQuizzesQuery(baseOptions?: Apollo.QueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
      }
export function useGetQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
        }
export function useGetQuizzesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizzesQuery, GetQuizzesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizzesQuery, GetQuizzesQueryVariables>(GetQuizzesDocument, options);
        }
export type GetQuizzesQueryHookResult = ReturnType<typeof useGetQuizzesQuery>;
export type GetQuizzesLazyQueryHookResult = ReturnType<typeof useGetQuizzesLazyQuery>;
export type GetQuizzesSuspenseQueryHookResult = ReturnType<typeof useGetQuizzesSuspenseQuery>;
export type GetQuizzesQueryResult = Apollo.QueryResult<GetQuizzesQuery, GetQuizzesQueryVariables>;
export const UpdateQuizDocument = gql`
    mutation UpdateQuiz($id: ID!, $input: QuizInput!) {
  updateQuiz(id: $id, input: $input) {
    id
    title
    slug
    description
    category
    difficulty
    status
    timeLimit
    totalAttempts
    totalQuestions
    featuredImage
    tags
    createdAt
    updatedAt
    author {
      id
      username
      email
      firstName
      lastName
      role
    }
  }
}
    `;
export type UpdateQuizMutationFn = Apollo.MutationFunction<UpdateQuizMutation, UpdateQuizMutationVariables>;

/**
 * __useUpdateQuizMutation__
 *
 * To run a mutation, you first call `useUpdateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizMutation, { data, loading, error }] = useUpdateQuizMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuizMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizMutation, UpdateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizMutation, UpdateQuizMutationVariables>(UpdateQuizDocument, options);
      }
export type UpdateQuizMutationHookResult = ReturnType<typeof useUpdateQuizMutation>;
export type UpdateQuizMutationResult = Apollo.MutationResult<UpdateQuizMutation>;
export type UpdateQuizMutationOptions = Apollo.BaseMutationOptions<UpdateQuizMutation, UpdateQuizMutationVariables>;
export const DeleteQuizAttemptDocument = gql`
    mutation DeleteQuizAttempt($id: ID!) {
  deleteQuizAttempt(id: $id)
}
    `;
export type DeleteQuizAttemptMutationFn = Apollo.MutationFunction<DeleteQuizAttemptMutation, DeleteQuizAttemptMutationVariables>;

/**
 * __useDeleteQuizAttemptMutation__
 *
 * To run a mutation, you first call `useDeleteQuizAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuizAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuizAttemptMutation, { data, loading, error }] = useDeleteQuizAttemptMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteQuizAttemptMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuizAttemptMutation, DeleteQuizAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuizAttemptMutation, DeleteQuizAttemptMutationVariables>(DeleteQuizAttemptDocument, options);
      }
export type DeleteQuizAttemptMutationHookResult = ReturnType<typeof useDeleteQuizAttemptMutation>;
export type DeleteQuizAttemptMutationResult = Apollo.MutationResult<DeleteQuizAttemptMutation>;
export type DeleteQuizAttemptMutationOptions = Apollo.BaseMutationOptions<DeleteQuizAttemptMutation, DeleteQuizAttemptMutationVariables>;
export const GetMyQuizAttemptsDocument = gql`
    query GetMyQuizAttempts {
  getMyQuizAttempts {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
      description
      category
      difficulty
      featuredImage
      tags
    }
    user {
      id
      username
      email
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetMyQuizAttemptsQuery__
 *
 * To run a query within a React component, call `useGetMyQuizAttemptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyQuizAttemptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyQuizAttemptsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyQuizAttemptsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>(GetMyQuizAttemptsDocument, options);
      }
export function useGetMyQuizAttemptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>(GetMyQuizAttemptsDocument, options);
        }
export function useGetMyQuizAttemptsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>(GetMyQuizAttemptsDocument, options);
        }
export type GetMyQuizAttemptsQueryHookResult = ReturnType<typeof useGetMyQuizAttemptsQuery>;
export type GetMyQuizAttemptsLazyQueryHookResult = ReturnType<typeof useGetMyQuizAttemptsLazyQuery>;
export type GetMyQuizAttemptsSuspenseQueryHookResult = ReturnType<typeof useGetMyQuizAttemptsSuspenseQuery>;
export type GetMyQuizAttemptsQueryResult = Apollo.QueryResult<GetMyQuizAttemptsQuery, GetMyQuizAttemptsQueryVariables>;
export const GetMyQuizAttemptsByQuizIdDocument = gql`
    query GetMyQuizAttemptsByQuizId($quizId: ID!) {
  getMyQuizAttemptsByQuizId(quizId: $quizId) {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
    }
    user {
      id
      username
      email
    }
  }
}
    `;

/**
 * __useGetMyQuizAttemptsByQuizIdQuery__
 *
 * To run a query within a React component, call `useGetMyQuizAttemptsByQuizIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyQuizAttemptsByQuizIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyQuizAttemptsByQuizIdQuery({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useGetMyQuizAttemptsByQuizIdQuery(baseOptions: Apollo.QueryHookOptions<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables> & ({ variables: GetMyQuizAttemptsByQuizIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables>(GetMyQuizAttemptsByQuizIdDocument, options);
      }
export function useGetMyQuizAttemptsByQuizIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables>(GetMyQuizAttemptsByQuizIdDocument, options);
        }
export function useGetMyQuizAttemptsByQuizIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables>(GetMyQuizAttemptsByQuizIdDocument, options);
        }
export type GetMyQuizAttemptsByQuizIdQueryHookResult = ReturnType<typeof useGetMyQuizAttemptsByQuizIdQuery>;
export type GetMyQuizAttemptsByQuizIdLazyQueryHookResult = ReturnType<typeof useGetMyQuizAttemptsByQuizIdLazyQuery>;
export type GetMyQuizAttemptsByQuizIdSuspenseQueryHookResult = ReturnType<typeof useGetMyQuizAttemptsByQuizIdSuspenseQuery>;
export type GetMyQuizAttemptsByQuizIdQueryResult = Apollo.QueryResult<GetMyQuizAttemptsByQuizIdQuery, GetMyQuizAttemptsByQuizIdQueryVariables>;
export const GetQuizAttemptByIdDocument = gql`
    query GetQuizAttemptById($id: ID!) {
  getQuizAttemptById(id: $id) {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
      description
      category
      difficulty
      featuredImage
      tags
      timeLimit
    }
    user {
      id
      username
      email
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetQuizAttemptByIdQuery__
 *
 * To run a query within a React component, call `useGetQuizAttemptByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizAttemptByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizAttemptByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQuizAttemptByIdQuery(baseOptions: Apollo.QueryHookOptions<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables> & ({ variables: GetQuizAttemptByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables>(GetQuizAttemptByIdDocument, options);
      }
export function useGetQuizAttemptByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables>(GetQuizAttemptByIdDocument, options);
        }
export function useGetQuizAttemptByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables>(GetQuizAttemptByIdDocument, options);
        }
export type GetQuizAttemptByIdQueryHookResult = ReturnType<typeof useGetQuizAttemptByIdQuery>;
export type GetQuizAttemptByIdLazyQueryHookResult = ReturnType<typeof useGetQuizAttemptByIdLazyQuery>;
export type GetQuizAttemptByIdSuspenseQueryHookResult = ReturnType<typeof useGetQuizAttemptByIdSuspenseQuery>;
export type GetQuizAttemptByIdQueryResult = Apollo.QueryResult<GetQuizAttemptByIdQuery, GetQuizAttemptByIdQueryVariables>;
export const GetQuizAttemptStatsDocument = gql`
    query GetQuizAttemptStats($userId: ID) {
  getQuizAttemptStats(userId: $userId) {
    totalAttempts
    averageScore
    averagePercentage
    totalTimeSpent
    bestScore
    worstScore
  }
}
    `;

/**
 * __useGetQuizAttemptStatsQuery__
 *
 * To run a query within a React component, call `useGetQuizAttemptStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizAttemptStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizAttemptStatsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetQuizAttemptStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>(GetQuizAttemptStatsDocument, options);
      }
export function useGetQuizAttemptStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>(GetQuizAttemptStatsDocument, options);
        }
export function useGetQuizAttemptStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>(GetQuizAttemptStatsDocument, options);
        }
export type GetQuizAttemptStatsQueryHookResult = ReturnType<typeof useGetQuizAttemptStatsQuery>;
export type GetQuizAttemptStatsLazyQueryHookResult = ReturnType<typeof useGetQuizAttemptStatsLazyQuery>;
export type GetQuizAttemptStatsSuspenseQueryHookResult = ReturnType<typeof useGetQuizAttemptStatsSuspenseQuery>;
export type GetQuizAttemptStatsQueryResult = Apollo.QueryResult<GetQuizAttemptStatsQuery, GetQuizAttemptStatsQueryVariables>;
export const GetQuizAttemptsByQuizIdDocument = gql`
    query GetQuizAttemptsByQuizId($quizId: ID!) {
  getQuizAttemptsByQuizId(quizId: $quizId) {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
    }
    user {
      id
      username
      email
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetQuizAttemptsByQuizIdQuery__
 *
 * To run a query within a React component, call `useGetQuizAttemptsByQuizIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizAttemptsByQuizIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizAttemptsByQuizIdQuery({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useGetQuizAttemptsByQuizIdQuery(baseOptions: Apollo.QueryHookOptions<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables> & ({ variables: GetQuizAttemptsByQuizIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables>(GetQuizAttemptsByQuizIdDocument, options);
      }
export function useGetQuizAttemptsByQuizIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables>(GetQuizAttemptsByQuizIdDocument, options);
        }
export function useGetQuizAttemptsByQuizIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables>(GetQuizAttemptsByQuizIdDocument, options);
        }
export type GetQuizAttemptsByQuizIdQueryHookResult = ReturnType<typeof useGetQuizAttemptsByQuizIdQuery>;
export type GetQuizAttemptsByQuizIdLazyQueryHookResult = ReturnType<typeof useGetQuizAttemptsByQuizIdLazyQuery>;
export type GetQuizAttemptsByQuizIdSuspenseQueryHookResult = ReturnType<typeof useGetQuizAttemptsByQuizIdSuspenseQuery>;
export type GetQuizAttemptsByQuizIdQueryResult = Apollo.QueryResult<GetQuizAttemptsByQuizIdQuery, GetQuizAttemptsByQuizIdQueryVariables>;
export const GetQuizAttemptsByUserIdDocument = gql`
    query GetQuizAttemptsByUserId($userId: ID!) {
  getQuizAttemptsByUserId(userId: $userId) {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
      description
      category
      difficulty
      featuredImage
      tags
    }
    user {
      id
      username
      email
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetQuizAttemptsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetQuizAttemptsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizAttemptsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizAttemptsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetQuizAttemptsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables> & ({ variables: GetQuizAttemptsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables>(GetQuizAttemptsByUserIdDocument, options);
      }
export function useGetQuizAttemptsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables>(GetQuizAttemptsByUserIdDocument, options);
        }
export function useGetQuizAttemptsByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables>(GetQuizAttemptsByUserIdDocument, options);
        }
export type GetQuizAttemptsByUserIdQueryHookResult = ReturnType<typeof useGetQuizAttemptsByUserIdQuery>;
export type GetQuizAttemptsByUserIdLazyQueryHookResult = ReturnType<typeof useGetQuizAttemptsByUserIdLazyQuery>;
export type GetQuizAttemptsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetQuizAttemptsByUserIdSuspenseQuery>;
export type GetQuizAttemptsByUserIdQueryResult = Apollo.QueryResult<GetQuizAttemptsByUserIdQuery, GetQuizAttemptsByUserIdQueryVariables>;
export const SubmitQuizAttemptDocument = gql`
    mutation SubmitQuizAttempt($input: QuizAttemptInput!) {
  submitQuizAttempt(input: $input) {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
      description
      category
      difficulty
      featuredImage
      tags
      totalAttempts
    }
    user {
      id
      username
      email
      firstName
      lastName
    }
  }
}
    `;
export type SubmitQuizAttemptMutationFn = Apollo.MutationFunction<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>;

/**
 * __useSubmitQuizAttemptMutation__
 *
 * To run a mutation, you first call `useSubmitQuizAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuizAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuizAttemptMutation, { data, loading, error }] = useSubmitQuizAttemptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitQuizAttemptMutation(baseOptions?: Apollo.MutationHookOptions<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>(SubmitQuizAttemptDocument, options);
      }
export type SubmitQuizAttemptMutationHookResult = ReturnType<typeof useSubmitQuizAttemptMutation>;
export type SubmitQuizAttemptMutationResult = Apollo.MutationResult<SubmitQuizAttemptMutation>;
export type SubmitQuizAttemptMutationOptions = Apollo.BaseMutationOptions<SubmitQuizAttemptMutation, SubmitQuizAttemptMutationVariables>;
export const UpdateQuizAttemptDocument = gql`
    mutation UpdateQuizAttempt($id: ID!, $input: QuizAttemptInput!) {
  updateQuizAttempt(id: $id, input: $input) {
    id
    score
    totalQuestions
    correctAnswers
    percentage
    timeSpent
    userAnswers
    isCompleted
    startedAt
    completedAt
    updatedAt
    quiz {
      id
      title
      slug
    }
    user {
      id
      username
      email
    }
  }
}
    `;
export type UpdateQuizAttemptMutationFn = Apollo.MutationFunction<UpdateQuizAttemptMutation, UpdateQuizAttemptMutationVariables>;

/**
 * __useUpdateQuizAttemptMutation__
 *
 * To run a mutation, you first call `useUpdateQuizAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizAttemptMutation, { data, loading, error }] = useUpdateQuizAttemptMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQuizAttemptMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuizAttemptMutation, UpdateQuizAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuizAttemptMutation, UpdateQuizAttemptMutationVariables>(UpdateQuizAttemptDocument, options);
      }
export type UpdateQuizAttemptMutationHookResult = ReturnType<typeof useUpdateQuizAttemptMutation>;
export type UpdateQuizAttemptMutationResult = Apollo.MutationResult<UpdateQuizAttemptMutation>;
export type UpdateQuizAttemptMutationOptions = Apollo.BaseMutationOptions<UpdateQuizAttemptMutation, UpdateQuizAttemptMutationVariables>;
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