
import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import { Link } from 'react-router-dom'

interface UserProgress {
  totalHours: number
  streakDays: number
  coursesCompleted: number
  exercisesCompleted: number
  courseProgress: any[]
  learningHistory: any[]
}

export default function Progress() {
  const { user } = useAppStore()
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    if (user) {
      fetchProgress()
    }
  }, [user])

  const fetchProgress = async () => {
    try {
      const res = await fetch(`/api/progress?userId=${user?.id}`)
      const data = await res.json()
      if (data.success) {
        setProgress(data.progress)
      }
    } catch (error) {
      console.error('获取进度失败', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">请先登录</h2>
          <Link to="/login" className="text-blue-600 hover:underline">点击登录</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 学习进度</h1>
          <p className="text-gray-600 text-lg">查看你的学习数据和进步轨迹</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">⏱️</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{progress?.totalHours || 0}</div>
            <div className="text-gray-600">学习小时</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">🔥</div>
            <div className="text-3xl font-bold text-orange-600 mb-2">{progress?.streakDays || 0}</div>
            <div className="text-gray-600">连续天数</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">📚</div>
            <div className="text-3xl font-bold text-green-600 mb-2">{progress?.coursesCompleted || 0}</div>
            <div className="text-gray-600">完成课程</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">✅</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{progress?.exercisesCompleted || 0}</div>
            <div className="text-gray-600">完成练习</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 学习记录</h2>
            <div className="space-y-4">
              {progress?.learningHistory?.slice(0, 7).map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-800">{new Date(record.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{record.exercises} 个练习</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-blue-600">{record.hours} 小时</div>
                  </div>
                </div>
              )) || (
                <div className="text-center text-gray-500 py-8">暂无学习记录</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📖 课程进度</h2>
            <div className="space-y-6">
              {progress?.courseProgress?.slice(0, 5).map((cp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">课程 {idx + 1}</span>
                    <span className="text-blue-600 font-medium">{cp.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${cp.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {cp.chaptersCompleted} 章节已完成 · 最后学习：{new Date(cp.lastStudiedAt).toLocaleDateString()}
                  </div>
                </div>
              )) || (
                <div className="text-center text-gray-500 py-8">暂无课程进度</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/practice"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            继续学习 🚀
          </Link>
        </div>
      </div>
    </div>
  )
}

