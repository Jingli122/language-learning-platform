
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

export default function Navbar() {
  const { user, logout } = useAppStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-2xl font-bold">🌍 语言学习平台</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/courses" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  📚 课程
                </Link>
                <Link to="/practice" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  🎯 练习
                </Link>
                <Link to="/progress" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  📊 进度
                </Link>
                <Link to="/community" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  👥 社区
                </Link>
                <Link to="/achievements" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  🏆 成就
                </Link>
                <div className="flex items-center space-x-2 ml-4">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-white text-sm">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded-md text-sm transition-all hover:scale-105"
                  >
                    退出
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  登录
                </Link>
                <Link to="/register" className="bg-white text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all hover:scale-105">
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

