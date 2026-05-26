
import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'
import { Link } from 'react-router-dom'

interface Comment {
  id: string
  userId: string
  username: string
  content: string
  createdAt: string
}

interface Post {
  id: string
  userId: string
  username: string
  avatar: string
  content: string
  type: string
  likes: number
  comments: Comment[]
  createdAt: string
}

export default function Community() {
  const { user } = useAppStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [postType, setPostType] = useState('sharing')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/community/posts')
      const data = await res.json()
      if (data.success) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error('获取动态失败', error)
    }
  }

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newPost.trim()) return

    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          username: user.username,
          avatar: user.avatar,
          content: newPost,
          type: postType,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPosts([data.post, ...posts])
        setNewPost('')
      }
    } catch (error) {
      console.error('发布动态失败', error)
    }
  }

  const likePost = async (postId: string) => {
    try {
      await fetch(`/api/community/posts/${postId}/like`, {
        method: 'POST',
      })
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      ))
    } catch (error) {
      console.error('点赞失败', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">👥 社区交流</h1>
          <p className="text-gray-600 text-lg">与其他学习者分享你的学习心得</p>
        </div>

        {user ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <form onSubmit={createPost}>
              <div className="flex items-start gap-4">
                <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="分享你的学习心得..."
                  />
                  <div className="flex items-center justify-between mt-4">
                    <select
                      value={postType}
                      onChange={(e) => setPostType(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-lg"
                    >
                      <option value="sharing">分享心得</option>
                      <option value="check-in">学习打卡</option>
                      <option value="question">提问求助</option>
                    </select>
                    <button
                      type="submit"
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50"
                    >
                      发布
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
            <p className="text-gray-600 mb-4">登录后可以发布动态</p>
            <Link
              to="/login"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              点击登录
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img src={post.avatar} alt={post.username} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-medium text-gray-800">{post.username}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  post.type === 'check-in' ? 'bg-green-100 text-green-700' :
                  post.type === 'question' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {post.type === 'check-in' ? '打卡' : post.type === 'question' ? '提问' : '分享'}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all"
                >
                  <span>❤️</span>
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>💬</span>
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {post.comments.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                        {comment.username[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800 text-sm">{comment.username}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="text-gray-600 text-sm mt-1">{comment.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

