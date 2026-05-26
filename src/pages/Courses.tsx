
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Course {
  id: string
  title: string
  language: string
  level: string
  description: string
  thumbnail: string
  chapters: any[]
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses')
      const data = await res.json()
      if (data.success) {
        setCourses(data.courses)
      }
    } catch (error) {
      console.error('获取课程失败', error)
    }
  }

  const filteredCourses = filter === 'all'
    ? courses
    : courses.filter(c => c.language === filter)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 课程中心</h1>
          <p className="text-gray-600 text-lg">探索各种语言课程，找到适合你的学习路径</p>
        </div>

        <div className="flex justify-center space-x-4 mb-10 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('english')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'english'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🇬🇧 英语
          </button>
          <button
            onClick={() => setFilter('japanese')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'japanese'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🇯🇵 日语
          </button>
          <button
            onClick={() => setFilter('korean')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'korean'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🇰🇷 韩语
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    course.level === 'beginner'
                      ? 'bg-green-100 text-green-700'
                      : course.level === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}
                  </span>
                  <span className="text-xs text-gray-500">{course.chapters.length} 章节</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {course.language === 'english' ? '🇬🇧 英语' : course.language === 'japanese' ? '🇯🇵 日语' : '🇰🇷 韩语'}
                  </span>
                  <span className="text-blue-600 font-medium">开始学习 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

