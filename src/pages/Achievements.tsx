
import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import { Link } from 'react-router-dom'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: string
  points: number
}

export default function Achievements() {
  const { user } = useAppStore()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])

  useEffect(() => {
    fetchAchievements()
  }, [user])

  const fetchAchievements = async () => {
    try {
      let url = '/api/achievements'
      if (user) {
        url += `?userId=${user.id}`
      }
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        setAchievements(data.achievements)
        setUnlockedAchievements(data.unlocked || [])
      }
    } catch (error) {
      console.error('获取成就失败', error)
    }
  }

  const totalPoints = achievements
    .filter(a => unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0)

  const unlockedCount = unlockedAchievements.length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🏆 成就系统</h1>
          <p className="text-gray-600 text-lg">完成任务，解锁成就，获得奖励</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">✨</div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{totalPoints}</div>
            <div className="text-gray-600">总积分</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">🏅</div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{unlockedCount}</div>
            <div className="text-gray-600">已解锁</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">🎯</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{totalCount}</div>
            <div className="text-gray-600">全部成就</div>
          </div>
        </div>

        {unlockedCount > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ 已解锁的成就</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.filter(a => unlockedAchievements.includes(a.id)).map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="text-6xl mb-4 text-center">{achievement.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-center text-sm mb-4">{achievement.description}</p>
                  <div className="text-center">
                    <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
                      +{achievement.points} 积分
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔒 待解锁的成就</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.filter(a => !unlockedAchievements.includes(a.id)).map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="text-6xl mb-4 text-center opacity-40">{achievement.icon}</div>
                <h3 className="text-xl font-bold text-gray-400 text-center mb-2">{achievement.title}</h3>
                <p className="text-gray-400 text-center text-sm mb-4">{achievement.description}</p>
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-500">{achievement.requirement}</span>
                </div>
                <div className="text-center">
                  <span className="inline-block bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-sm font-medium">
                    +{achievement.points} 积分
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">继续学习，解锁更多成就！</p>
          <Link
            to="/courses"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            开始学习 🚀
          </Link>
        </div>
      </div>
    </div>
  )
}

