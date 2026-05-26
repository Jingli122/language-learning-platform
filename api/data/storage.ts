
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, './')

function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

function ensureDataFile(filePath, defaultData) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2))
  }
}

function getDefaultCourses() {
  return [
    {
      id: 'course-1',
      title: '英语入门课程',
      language: 'english',
      level: 'beginner',
      description: '从零开始学习英语，掌握基础词汇和语法',
      thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
      duration: 300,
      chapters: [
        {
          id: 'chapter-1-1',
          title: '问候与介绍',
          content: '学习基本的英语问候语和自我介绍',
          duration: 30
        },
        {
          id: 'chapter-1-2',
          title: '数字与时间',
          content: '学习数字表达和时间描述',
          duration: 35
        },
        {
          id: 'chapter-1-3',
          title: '日常生活用语',
          content: '学习常用生活场景对话',
          duration: 40
        }
      ]
    },
    {
      id: 'course-2',
      title: '日语入门',
      language: 'japanese',
      level: 'beginner',
      description: '学习日语五十音图和基础会话',
      thumbnail: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop',
      duration: 280,
      chapters: [
        {
          id: 'chapter-2-1',
          title: '五十音图（上）',
          content: '学习平假名和片假名的基础部分',
          duration: 45
        },
        {
          id: 'chapter-2-2',
          title: '五十音图（下）',
          content: '完成五十音图的学习',
          duration: 40
        },
        {
          id: 'chapter-2-3',
          title: '基础问候',
          content: '学习日语基本问候',
          duration: 35
        }
      ]
    },
    {
      id: 'course-3',
      title: '韩语入门',
      language: 'korean',
      level: 'beginner',
      description: '学习韩语字母和日常用语',
      thumbnail: 'https://images.unsplash.com/photo-1532590818362-87270e19582c?w=400&h=300&fit=crop',
      duration: 320,
      chapters: [
        {
          id: 'chapter-3-1',
          title: '韩文字母',
          content: '学习韩语基本字母',
          duration: 50
        },
        {
          id: 'chapter-3-2',
          title: '基础发音',
          content: '学习韩语发音规则',
          duration: 45
        },
        {
          id: 'chapter-3-3',
          title: '日常会话',
          content: '学习日常用语',
          duration: 40
        }
      ]
    },
    {
      id: 'course-4',
      title: '英语进阶',
      language: 'english',
      level: 'intermediate',
      description: '提升英语听说读写能力',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      duration: 400,
      chapters: [
        {
          id: 'chapter-4-1',
          title: '时态与词汇',
          content: '学习英语时态与词汇扩展',
          duration: 45
        },
        {
          id: 'chapter-4-2',
          title: '阅读与写作',
          content: '提升英语读写技能',
          duration: 50
        },
        {
          id: 'chapter-4-3',
          title: '对话与听力',
          content: '英语口语与听力训练',
          duration: 55
        }
      ]
    }
  ]
}

function getDefaultExercises() {
  return [
    {
      id: 'ex-1',
      type: 'vocabulary',
      language: 'english',
      question: 'Hello的中文意思是？',
      options: ['再见', '你好', '谢谢', '对不起'],
      answer: '你好'
    },
    {
      id: 'ex-2',
      type: 'vocabulary',
      language: 'english',
      question: 'Thank you的中文意思是？',
      options: ['请', '对不起', '谢谢', '你好'],
      answer: '谢谢'
    },
    {
      id: 'ex-3',
      type: 'grammar',
      language: 'english',
      question: 'I ___ a student.',
      options: ['is', 'am', 'are', 'be'],
      answer: 'am'
    },
    {
      id: 'ex-4',
      type: 'grammar',
      language: 'english',
      question: 'She ___ to school every day.',
      options: ['go', 'goes', 'going', 'gone'],
      answer: 'goes'
    },
    {
      id: 'ex-5',
      type: 'listening',
      language: 'english',
      question: 'What is your name?',
      answer: 'My name is...',
      pronunciation: 'wɒt ɪz jɔː neɪm'
    },
    {
      id: 'ex-6',
      type: 'vocabulary',
      language: 'japanese',
      question: 'こんにちは的中文意思是？',
      options: ['晚上好', '你好', '早上好', '晚安'],
      answer: '你好'
    },
    {
      id: 'ex-7',
      type: 'vocabulary',
      language: 'japanese',
      question: 'ありがとう的中文意思是？',
      options: ['请', '对不起', '谢谢', '你好'],
      answer: '谢谢'
    },
    {
      id: 'ex-8',
      type: 'vocabulary',
      language: 'korean',
      question: '안녕하세요的中文意思是？',
      options: ['再见', '你好', '谢谢', '晚安'],
      answer: '你好'
    },
    {
      id: 'ex-9',
      type: 'vocabulary',
      language: 'korean',
      question: '감사합니다的中文意思是？',
      options: ['请', '对不起', '谢谢', '你好'],
      answer: '谢谢'
    },
    {
      id: 'ex-10',
      type: 'grammar',
      language: 'korean',
      question: '저는 학생입니다.',
      options: ['我是学生', '我是老师', '我是医生', '我是工程师'],
      answer: '我是学生'
    }
  ]
}

function getDefaultPosts() {
  return [
    {
      id: 'post-1',
      userId: 'system',
      username: '学习助手',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=helper',
      content: '今天开始学习英语啦！每天进步一点点！',
      type: 'check-in',
      likes: 23,
      comments: [],
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'post-2',
      userId: 'system',
      username: '日语爱好者',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=japanese',
      content: '分享一下日语五十音图真的很有趣！',
      type: 'sharing',
      likes: 15,
      comments: [],
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: 'post-3',
      userId: 'system',
      username: '韩语初学者',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=korean',
      content: '韩语发音好难啊，有什么技巧吗？',
      type: 'question',
      likes: 8,
      comments: [
        {
          id: 'comment-1',
          userId: 'system',
          username: '学习伙伴',
          content: '多听多练就好啦！',
          createdAt: new Date(Date.now() - 144000000).toISOString()
        }
      ],
      createdAt: new Date(Date.now() - 259200000).toISOString()
    }
  ]
}

function getDefaultAchievements() {
  return [
    {
      id: 'achievement-1',
      title: '学习起步',
      description: '完成第一个课程',
      icon: '🎉',
      requirement: '完成1个课程',
      points: 10
    },
    {
      id: 'achievement-2',
      title: '词汇达人',
      description: '完成50个单词练习',
      icon: '📚',
      requirement: '完成50个练习',
      points: 50
    },
    {
      id: 'achievement-3',
      title: '坚持一周',
      description: '连续学习7天',
      icon: '🔥',
      requirement: '连续7天',
      points: 100
    },
    {
      id: 'achievement-4',
      title: '学习达人',
      description: '完成10个课程',
      icon: '🏆',
      requirement: '完成10个课程',
      points: 200
    },
    {
      id: 'achievement-5',
      title: '社区之星',
      description: '发布10条动态',
      icon: '⭐',
      requirement: '发布10条',
      points: 80
    }
  ]
}

let dataStore: any = null

function loadData() {
  if (dataStore) return dataStore

  const usersPath = path.join(DATA_DIR, 'users.json')
  const coursesPath = path.join(DATA_DIR, 'courses.json')
  const exercisesPath = path.join(DATA_DIR, 'exercises.json')
  const userProgressPath = path.join(DATA_DIR, 'userProgress.json')
  const postsPath = path.join(DATA_DIR, 'posts.json')
  const achievementsPath = path.join(DATA_DIR, 'achievements.json')
  const userAchievementsPath = path.join(DATA_DIR, 'userAchievements.json')

  ensureDataFile(usersPath, [])
  ensureDataFile(coursesPath, getDefaultCourses())
  ensureDataFile(exercisesPath, getDefaultExercises())
  ensureDataFile(userProgressPath, [])
  ensureDataFile(postsPath, getDefaultPosts())
  ensureDataFile(achievementsPath, getDefaultAchievements())
  ensureDataFile(userAchievementsPath, [])

  dataStore = {
    users: JSON.parse(fs.readFileSync(usersPath, 'utf-8') || '[]'),
    courses: JSON.parse(fs.readFileSync(coursesPath, 'utf-8') || JSON.stringify(getDefaultCourses())),
    exercises: JSON.parse(fs.readFileSync(exercisesPath, 'utf-8') || JSON.stringify(getDefaultExercises())),
    userProgress: JSON.parse(fs.readFileSync(userProgressPath, 'utf-8') || '[]'),
    posts: JSON.parse(fs.readFileSync(postsPath, 'utf-8') || JSON.stringify(getDefaultPosts())),
    achievements: JSON.parse(fs.readFileSync(achievementsPath, 'utf-8') || JSON.stringify(getDefaultAchievements())),
    userAchievements: JSON.parse(fs.readFileSync(userAchievementsPath, 'utf-8') || '[]'),
  }

  return dataStore
}

function saveData() {
  if (!dataStore) return

  const usersPath = path.join(DATA_DIR, 'users.json')
  const coursesPath = path.join(DATA_DIR, 'courses.json')
  const exercisesPath = path.join(DATA_DIR, 'exercises.json')
  const userProgressPath = path.join(DATA_DIR, 'userProgress.json')
  const postsPath = path.join(DATA_DIR, 'posts.json')
  const achievementsPath = path.join(DATA_DIR, 'achievements.json')
  const userAchievementsPath = path.join(DATA_DIR, 'userAchievements.json')

  fs.writeFileSync(usersPath, JSON.stringify(dataStore.users, null, 2))
  fs.writeFileSync(coursesPath, JSON.stringify(dataStore.courses, null, 2))
  fs.writeFileSync(exercisesPath, JSON.stringify(dataStore.exercises, null, 2))
  fs.writeFileSync(userProgressPath, JSON.stringify(dataStore.userProgress, null, 2))
  fs.writeFileSync(postsPath, JSON.stringify(dataStore.posts, null, 2))
  fs.writeFileSync(achievementsPath, JSON.stringify(dataStore.achievements, null, 2))
  fs.writeFileSync(userAchievementsPath, JSON.stringify(dataStore.userAchievements, null, 2))
}

export const storage = {
  getUsers: () => loadData().users,
  getUserByEmail: (email: string) => loadData().users.find((u: any) => u.email === email),
  getUserById: (id: string) => loadData().users.find((u: any) => u.id === id),
  createUser: (user: any) => {
    const data = loadData()
    data.users.push(user)
    saveData()
    return user
  },
  
  getCourses: () => loadData().courses,
  getCourseById: (id: string) => loadData().courses.find((c: any) => c.id === id),
  getCoursesByLanguage: (language: string) => loadData().courses.filter((c: any) => c.language === language),
  
  getExercises: () => loadData().exercises,
  getExercisesByType: (type: string) => loadData().exercises.filter((e: any) => e.type === type),
  getExercisesByLanguage: (language: string) => loadData().exercises.filter((e: any) => e.language === language),
  
  getUserProgress: (userId: string) => loadData().userProgress.find((p: any) => p.userId === userId),
  createUserProgress: (progress: any) => {
    const data = loadData()
    data.userProgress.push(progress)
    saveData()
    return progress
  },
  updateUserProgress: (userId: string, updates: any) => {
    const data = loadData()
    const index = data.userProgress.findIndex((p: any) => p.userId === userId)
    if (index !== -1) {
      data.userProgress[index] = { ...data.userProgress[index], ...updates }
      saveData()
      return data.userProgress[index]
    }
    return null
  },
  
  getPosts: () => loadData().posts.sort((a: any, b: any) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ),
  createPost: (post: any) => {
    const data = loadData()
    data.posts.unshift(post)
    saveData()
    return post
  },
  updatePost: (postId: string, updates: any) => {
    const data = loadData()
    const index = data.posts.findIndex((p: any) => p.id === postId)
    if (index !== -1) {
      data.posts[index] = { ...data.posts[index], ...updates }
      saveData()
      return data.posts[index]
    }
    return null
  },
  addComment: (postId: string, comment: any) => {
    const data = loadData()
    const post = data.posts.find((p: any) => p.id === postId)
    if (post) {
      post.comments.push(comment)
      saveData()
    }
    return post
  },
  
  getAchievements: () => loadData().achievements,
  getUserAchievements: (userId: string) => loadData().userAchievements.filter((a: any) => a.userId === userId),
  unlockAchievement: (userAchievement: any) => {
    const data = loadData()
    data.userAchievements.push(userAchievement)
    saveData()
    return userAchievement
  }
}

