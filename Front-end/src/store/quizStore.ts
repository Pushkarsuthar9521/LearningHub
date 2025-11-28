// import { create } from 'zustand'
// import { generateUniqueId } from '../lib/utils'
// import { Category, Quiz, QuizAttempt, Tag, User } from '../types'

// interface QuizState {
//   quizzes: Quiz[]
//   quizAttempts: QuizAttempt[]
//   categories: Category[]
//   tags: Tag[]
//   loading: boolean
//   error: string | null

//   // Actions
//   fetchQuizzes: () => Promise<void>
//   fetchQuizById: (id: string) => Promise<Quiz | undefined>
//   fetchQuizBySlug: (slug: string) => Promise<Quiz | undefined>
//   createQuiz: (
//     quiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>
//   ) => Promise<Quiz>
//   updateQuiz: (id: string, quiz: Partial<Quiz>) => Promise<Quiz | undefined>
//   deleteQuiz: (id: string) => Promise<boolean>
//   submitQuizAttempt: (
//     attempt: Omit<QuizAttempt, 'id' | 'completedAt'>
//   ) => Promise<QuizAttempt>
//   fetchQuizAttemptsByUserId: (userId: string) => Promise<QuizAttempt[]>
//   fetchCategories: () => Promise<void>
//   fetchTags: () => Promise<void>
// }

// // Mock data for quizzes
// const mockUser: User = {
//   id: '1',
//   name: 'John Doe',
//   email: 'john@example.com',
//   avatar:
//     'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//   role: 'admin'
// }

// const mockCategories: Category[] = [
//   {
//     id: '1',
//     name: 'Technology',
//     slug: 'technology',
//     description: 'Test your knowledge of technology'
//   },
//   {
//     id: '2',
//     name: 'Science',
//     slug: 'science',
//     description: 'Scientific quizzes to expand your mind'
//   },
//   {
//     id: '3',
//     name: 'Programming',
//     slug: 'programming',
//     description: 'Coding challenges and questions'
//   },
//   {
//     id: '4',
//     name: 'Web Development',
//     slug: 'web-development',
//     description: 'Test your web development skills'
//   },
//   {
//     id: '5',
//     name: 'AI & Machine Learning',
//     slug: 'ai-machine-learning',
//     description: 'Explore AI and ML concepts'
//   }
// ]

// const mockTags: Tag[] = [
//   { id: '1', name: 'Beginner', slug: 'beginner' },
//   { id: '2', name: 'Intermediate', slug: 'intermediate' },
//   { id: '3', name: 'Advanced', slug: 'advanced' },
//   { id: '4', name: 'JavaScript', slug: 'javascript' },
//   { id: '5', name: 'React', slug: 'react' },
//   { id: '6', name: 'Frontend', slug: 'frontend' },
//   { id: '7', name: 'Backend', slug: 'backend' }
// ]

// const mockQuizzes: Quiz[] = [
//   {
//     id: '1',
//     title: 'React Fundamentals Quiz',
//     slug: 'react-fundamentals',
//     description:
//       'Test your knowledge of React core concepts, hooks, and best practices.',
//     coverImage:
//       'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     author: mockUser,
//     categories: [mockCategories[3], mockCategories[2]],
//     tags: [mockTags[4], mockTags[5], mockTags[1]],
//     questions: [
//       {
//         id: '1',
//         question:
//           'What hook would you use to run a function when a component mounts?',
//         options: [
//           'useEffect with no dependencies',
//           'useState with initial function',
//           'useMount',
//           'useComponentDidMount'
//         ],
//         correctAnswer: 0,
//         explanation:
//           'useEffect with an empty dependency array will run once when the component mounts, similar to componentDidMount in class components.'
//       },
//       {
//         id: '2',
//         question: 'Which of the following is NOT a rule of React hooks?',
//         options: [
//           'Only call hooks at the top level',
//           'Only call hooks from React functions',
//           'Hooks can be called conditionally inside loops',
//           'Custom hooks should start with "use"'
//         ],
//         correctAnswer: 2,
//         explanation:
//           'Hooks should never be called conditionally or inside loops. This ensures that hooks are called in the same order each time a component renders.'
//       },
//       {
//         id: '3',
//         question: 'What is the correct way to update an object in state?',
//         options: [
//           'setState(state.object.property = newValue)',
//           'setState({ ...state, object: { ...state.object, property: newValue } })',
//           'setState(state.object = { ...state.object, property: newValue })',
//           'setState(Object.assign(state.object, { property: newValue }))'
//         ],
//         correctAnswer: 1,
//         explanation:
//           'State updates should be immutable. The correct approach is to use the spread operator to create a new object with the updated property.'
//       },
//       {
//         id: '4',
//         question: 'What is the purpose of React.memo?',
//         options: [
//           'To memorize values between renders',
//           "To prevent re-rendering if props haven't changed",
//           'To memorize function definitions',
//           'To cache API responses'
//         ],
//         correctAnswer: 1,
//         explanation:
//           "React.memo is a higher-order component that memoizes the rendered output of the wrapped component and skips unnecessary re-rendering if the props haven't changed."
//       },
//       {
//         id: '5',
//         question:
//           'What hook would you use to access the current value of a ref?',
//         options: ['useState', 'useContext', 'useReducer', 'useRef'],
//         correctAnswer: 3,
//         explanation:
//           'useRef returns a mutable ref object whose .current property is initialized to the passed argument. This object persists for the full lifetime of the component.'
//       }
//     ],
//     createdAt: '2023-03-10T14:30:00Z',
//     updatedAt: '2023-03-12T09:45:00Z',
//     published: true,
//     timeLimit: 10
//   },
//   {
//     id: '2',
//     title: 'JavaScript ES6+ Features',
//     slug: 'javascript-es6-features',
//     description:
//       'Test your knowledge of modern JavaScript features introduced in ES6 and beyond.',
//     coverImage:
//       'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     author: mockUser,
//     categories: [mockCategories[3], mockCategories[2]],
//     tags: [mockTags[3], mockTags[5], mockTags[1]],
//     questions: [
//       {
//         id: '1',
//         question:
//           'Which of the following is a correct way to use destructuring with default values?',
//         options: [
//           'const { prop = "default" } = object;',
//           'const { prop || "default" } = object;',
//           'const { prop: "default" } = object;',
//           'const { prop: default("default") } = object;'
//         ],
//         correctAnswer: 0,
//         explanation:
//           'In destructuring, you can provide default values that will be used when the destructured property is undefined using the syntax { prop = defaultValue }.'
//       },
//       {
//         id: '2',
//         question:
//           'What is the output of the following code?\n\nconst arr = [1, 2, 3];\nconst [a, ...rest] = arr;\nconsole.log(rest);',
//         options: ['[1]', '[2, 3]', '[1, 2, 3]', '3'],
//         correctAnswer: 1,
//         explanation:
//           'The rest operator (...) collects all remaining elements into a new array. In this case, a is assigned 1, and rest collects the remaining elements [2, 3].'
//       },
//       {
//         id: '3',
//         question: 'Which of the following is NOT a feature introduced in ES6?',
//         options: [
//           'Arrow functions',
//           'Template literals',
//           'Promise.allSettled',
//           'let and const declarations'
//         ],
//         correctAnswer: 2,
//         explanation:
//           'Promise.allSettled was introduced in ES2020 (ES11), not ES6. It returns a promise that resolves after all of the given promises have either fulfilled or rejected.'
//       },
//       {
//         id: '4',
//         question: "What's the difference between let and var?",
//         options: [
//           'let is block-scoped, var is function-scoped',
//           'let cannot be reassigned, var can be',
//           'let is hoisted, var is not',
//           'There is no difference'
//         ],
//         correctAnswer: 0,
//         explanation:
//           'The key difference is that let is block-scoped while var is function-scoped. Variables declared with let are only accessible within the block they are defined in, whereas var variables are accessible throughout the function they are defined in.'
//       },
//       {
//         id: '5',
//         question:
//           'What is the correct way to create a class with a static method in ES6?',
//         options: [
//           'class MyClass { static myMethod() { return "Hello"; } }',
//           'class MyClass { static: function myMethod() { return "Hello"; } }',
//           'class MyClass { @static myMethod() { return "Hello"; } }',
//           'static class MyClass { myMethod() { return "Hello"; } }'
//         ],
//         correctAnswer: 0,
//         explanation:
//           'In ES6, you can define static methods on a class using the static keyword before the method name. Static methods are called on the class itself, not on instances of the class.'
//       }
//     ],
//     createdAt: '2023-04-05T10:15:00Z',
//     updatedAt: '2023-04-06T11:20:00Z',
//     published: true,
//     timeLimit: 10
//   },
//   {
//     id: '3',
//     title: 'Web Accessibility Quiz',
//     slug: 'web-accessibility',
//     description:
//       'Test your knowledge of web accessibility principles and WCAG guidelines.',
//     coverImage:
//       'https://images.pexels.com/photos/7375/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//     author: mockUser,
//     categories: [mockCategories[3]],
//     tags: [mockTags[5], mockTags[1]],
//     questions: [
//       {
//         id: '1',
//         question: 'What does WCAG stand for?',
//         options: [
//           'Web Content Accessibility Guidelines',
//           'Web Compliance Accessibility Group',
//           'Website Content Accessibility Goals',
//           'Web Compatibility and Accessibility Guidelines'
//         ],
//         correctAnswer: 0,
//         explanation:
//           'WCAG stands for Web Content Accessibility Guidelines. These guidelines are developed by the W3C to provide a standard for making web content more accessible to people with disabilities.'
//       },
//       {
//         id: '2',
//         question:
//           'Which of the following is NOT one of the four main principles of WCAG?',
//         options: ['Perceivable', 'Operable', 'Understandable', 'Adaptable'],
//         correctAnswer: 3,
//         explanation:
//           'The four main principles of WCAG are Perceivable, Operable, Understandable, and Robust (POUR). Adaptable is a guideline under the Perceivable principle, not a main principle itself.'
//       },
//       {
//         id: '3',
//         question: 'What is the purpose of the alt attribute on an img element?',
//         options: [
//           'To display text when the image fails to load',
//           'To provide an alternative text description for screen readers',
//           'To specify the source of the image',
//           'To improve SEO ranking'
//         ],
//         correctAnswer: 1,
//         explanation:
//           'The primary purpose of the alt attribute is to provide an alternative text description for users who cannot see the image, such as those using screen readers. While it also appears when an image fails to load, its main accessibility purpose is for screen reader users.'
//       },
//       {
//         id: '4',
//         question:
//           'What is the recommended minimum contrast ratio for normal text according to WCAG AA standards?',
//         options: ['2:1', '3:1', '4.5:1', '7:1'],
//         correctAnswer: 2,
//         explanation:
//           'WCAG 2.0 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Level AAA requires a higher contrast ratio of at least 7:1 for normal text and 4.5:1 for large text.'
//       },
//       {
//         id: '5',
//         question:
//           'Which HTML element should be used to mark up the main content area of a page for accessibility?',
//         options: ['<div id="main">', '<section>', '<content>', '<main>'],
//         correctAnswer: 3,
//         explanation:
//           'The <main> element should be used to mark up the main content area of a page. This helps screen readers and other assistive technologies identify and navigate to the main content area easily.'
//       }
//     ],
//     createdAt: '2023-05-18T09:30:00Z',
//     updatedAt: '2023-05-19T14:15:00Z',
//     published: true,
//     timeLimit: 8
//   }
// ]

// const mockQuizAttempts: QuizAttempt[] = []

// const useQuizStore = create<QuizState>((set, get) => ({
//   quizzes: [],
//   quizAttempts: [],
//   categories: [],
//   tags: [],
//   loading: false,
//   error: null,

//   fetchQuizzes: async () => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 500))
//       set({ quizzes: mockQuizzes, loading: false })
//     } catch (error) {
//       set({ error: 'Failed to fetch quizzes', loading: false })
//     }
//   },

//   fetchQuizById: async (id: string) => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 300))
//       const quiz = mockQuizzes.find(quiz => quiz.id === id)
//       set({ loading: false })
//       return quiz
//     } catch (error) {
//       set({ error: 'Failed to fetch quiz', loading: false })
//       return undefined
//     }
//   },

//   fetchQuizBySlug: async (slug: string) => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 300))
//       const quiz = mockQuizzes.find(quiz => quiz.slug === slug)
//       set({ loading: false })
//       return quiz
//     } catch (error) {
//       set({ error: 'Failed to fetch quiz', loading: false })
//       return undefined
//     }
//   },

//   createQuiz: async quizData => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 500))

//       const newQuiz: Quiz = {
//         ...quizData,
//         id: generateUniqueId(),
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }

//       set(state => ({
//         quizzes: [...state.quizzes, newQuiz],
//         loading: false
//       }))

//       return newQuiz
//     } catch (error) {
//       set({ error: 'Failed to create quiz', loading: false })
//       throw error
//     }
//   },

//   updateQuiz: async (id, quizData) => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 500))

//       let updatedQuiz: Quiz | undefined

//       set(state => {
//         const quizzes = state.quizzes.map(quiz => {
//           if (quiz.id === id) {
//             updatedQuiz = {
//               ...quiz,
//               ...quizData,
//               updatedAt: new Date().toISOString()
//             }
//             return updatedQuiz
//           }
//           return quiz
//         })

//         return { quizzes, loading: false }
//       })

//       return updatedQuiz
//     } catch (error) {
//       set({ error: 'Failed to update quiz', loading: false })
//       return undefined
//     }
//   },

//   deleteQuiz: async id => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 500))

//       set(state => ({
//         quizzes: state.quizzes.filter(quiz => quiz.id !== id),
//         loading: false
//       }))

//       return true
//     } catch (error) {
//       set({ error: 'Failed to delete quiz', loading: false })
//       return false
//     }
//   },

//   submitQuizAttempt: async attemptData => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 500))

//       const newAttempt: QuizAttempt = {
//         ...attemptData,
//         id: generateUniqueId(),
//         completedAt: new Date().toISOString()
//       }

//       set(state => ({
//         quizAttempts: [...state.quizAttempts, newAttempt],
//         loading: false
//       }))

//       return newAttempt
//     } catch (error) {
//       set({ error: 'Failed to submit quiz attempt', loading: false })
//       throw error
//     }
//   },

//   fetchQuizAttemptsByUserId: async (userId: string) => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 300))
//       const attempts = mockQuizAttempts.filter(
//         attempt => attempt.userId === userId
//       )
//       set({ loading: false })
//       return attempts
//     } catch (error) {
//       set({ error: 'Failed to fetch quiz attempts', loading: false })
//       return []
//     }
//   },

//   fetchCategories: async () => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 300))
//       set({ categories: mockCategories, loading: false })
//     } catch (error) {
//       set({ error: 'Failed to fetch categories', loading: false })
//     }
//   },

//   fetchTags: async () => {
//     set({ loading: true, error: null })
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 300))
//       set({ tags: mockTags, loading: false })
//     } catch (error) {
//       set({ error: 'Failed to fetch tags', loading: false })
//     }
//   }
// }))

// export default useQuizStore
