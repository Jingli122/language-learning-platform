
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store'
import { useEffect, useState } from 'react'

interface Course {
  id: string
  title: string
  language: string
  level: string
  description: string
  thumbnail: string
}

export default function Home() {
  const { user } = useAppStore()
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  const languages = [
    { code: 'english', name: '英语', icon: '🇬🇧', gradient: 'from-blue-500 to-blue-700' },
    { code: 'japanese', name: '日语', icon: '🇯🇵', gradient: 'from-red-500 to-red-700' },
    { code: 'korean', name: '韩语', icon: '🇰🇷', gradient: 'from-purple-500 to-purple-700' },
  ]

  useEffect(() => {
    fetchCourses()
  }, [selectedLanguage])

  const fetchCourses = async () => {
    try {
      let url = '/api/courses'
      if (selectedLanguage) {
        url += `?language=${selectedLanguage}`
      }
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        setCourses(data.courses)
      }
    } catch (error) {
      console.error('获取课程失败', error)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-pulse">
            🚀 开启你的语言学习之旅
          </h1>
          <p className="text-xl mb-8 opacity-90">
            沉浸式学习体验，让你轻松掌握多门语言
          </p>
          <div className="flex justify-center space-x-4">
            {user ? (
              <Link
                to="/courses"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
              >
                开始学习
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
                >
                  立即注册
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105"
                >
                  登录
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          🌍 选择你想学习的语言
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`cursor-pointer bg-gradient-to-br ${lang.gradient} rounded-2xl p-8 text-white text-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                selectedLanguage === lang.code ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              <div className="text-6xl mb-4">{lang.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{lang.name}</h3>
              <p className="opacity-90">点击探索课程</p>
            </div>
          ))}
        </div>

        {(courses.length > 0 || selectedLanguage) && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              📚 推荐课程
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                >
                  <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}
                      </span>
                      <span className="text-xs text-gray-500">{course.language === 'english' ? '英语' : course.language === 'japanese' ? '日语' : '韩语'}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

