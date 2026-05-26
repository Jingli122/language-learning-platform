
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '@/store'

interface Chapter {
  id: string
  title: string
  content: string
  duration: number
}

interface Course {
  id: string
  title: string
  language: string
  level: string
  description: string
  thumbnail: string
  chapters: Chapter[]
}

export default function CourseDetail() {
  const { id } = useParams()
  const { user } = useAppStore()
  const [course, setCourse] = useState<Course | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number>(0)

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/courses/${id}`)
      const data = await res.json()
      if (data.success) {
        setCourse(data.course)
      }
    } catch (error) {
      console.error('获取课程失败', error)
    }
  }

  const markComplete = async (chapterId: string) => {
    if (!user) return
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          courseId: id,
          chapterId,
          completed: true,
        }),
      })
      alert('章节完成！')
    } catch (error) {
      console.error('更新进度失败', error)
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-8">
            <img src={course.thumbnail} alt={course.title} className="w-80 h-56 rounded-xl object-cover shadow-lg" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  course.level === 'beginner'
                    ? 'bg-green-100 text-green-700'
                    : course.level === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}
                </span>
                <span className="text-sm text-gray-500">
                  {course.language === 'english' ? '🇬🇧 英语' : course.language === 'japanese' ? '🇯🇵 日语' : '🇰🇷 韩语'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{course.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{course.description}</p>
              <div className="flex items-center gap-6 text-gray-500">
                <span>📚 {course.chapters.length} 章节</span>
                <span>⏱️ {course.chapters.reduce((sum, c) => sum + c.duration, 0)} 分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4">课程章节</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {course.chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  onClick={() => setSelectedChapter(index)}
                  className={`p-4 cursor-pointer transition-all border-b last:border-0 ${
                    selectedChapter === index
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{chapter.title}</div>
                      <div className="text-sm text-gray-500">{chapter.duration} 分钟</div>
                    </div>
                    <div className="text-blue-500">
                      {selectedChapter === index ? '▶' : '▷'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {course.chapters[selectedChapter].title}
              </h2>
              <div className="prose max-w-none text-gray-700 mb-8">
                <p className="text-lg leading-relaxed">{course.chapters[selectedChapter].content}</p>
                <div className="my-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">学习要点</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>掌握核心词汇</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>理解语法结构</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>练习口语表达</span>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => markComplete(course.chapters[selectedChapter].id)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                ✅ 标记为完成
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

