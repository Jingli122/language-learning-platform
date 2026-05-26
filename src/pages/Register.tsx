
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setUser, setToken } = useAppStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await res.json()

      if (data.success) {
        setUser(data.user)
        setToken(data.token)
        navigate('/')
      } else {
        setError(data.message || '注册失败')
      }
    } catch (error) {
      setError('注册失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">创建账号</h1>
          <p className="text-blue-100 mt-2">开启你的语言学习之旅</p>
        </div>
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="请输入用户名"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="请输入邮箱"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="请输入密码"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            已有账号？{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

