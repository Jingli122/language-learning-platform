
import { Router } from 'express'
import { storage } from '../data/storage'

const router = Router()

function generateId() {
  return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

router.get('/posts', async (req, res) => {
  try {
    const posts = storage.getPosts()
    res.json({ success: true, posts })
  } catch (error) {
    res.status(500).json({ success: false, message: '获取动态失败' })
  }
})

router.post('/posts', async (req, res) => {
  try {
    const { userId, username, avatar, content, type } = req.body
    
    if (!content) {
      res.status(400).json({ success: false, message: '内容不能为空' })
      return
    }
    
    const post = {
      id: generateId(),
      userId,
      username,
      avatar,
      content,
      type: type || 'check-in',
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    }
    
    const createdPost = storage.createPost(post)
    res.json({ success: true, post: createdPost })
  } catch (error) {
    res.status(500).json({ success: false, message: '发布动态失败' })
  }
})

router.post('/posts/:id/like', async (req, res) => {
  try {
    const postId = req.params.id
    const posts = storage.getPosts()
    const post = posts.find(p => p.id === postId)
    
    if (!post) {
      res.status(404).json({ success: false, message: '动态不存在' })
      return
    }
    
    const updatedPost = storage.updatePost(postId, { likes: post.likes + 1 })
    res.json({ success: true, post: updatedPost })
  } catch (error) {
    res.status(500).json({ success: false, message: '点赞失败' })
  }
})

router.post('/posts/:id/comments', async (req, res) => {
  try {
    const { userId, username, content } = req.body
    const postId = req.params.id
    
    if (!content) {
      res.status(400).json({ success: false, message: '评论不能为空' })
      return
    }
    
    const comment = {
      id: generateId(),
      userId,
      username,
      content,
      createdAt: new Date().toISOString()
    }
    
    const updatedPost = storage.addComment(postId, comment)
    if (!updatedPost) {
      res.status(404).json({ success: false, message: '动态不存在' })
      return
    }
    
    res.json({ success: true, post: updatedPost })
  } catch (error) {
    res.status(500).json({ success: false, message: '评论失败' })
  }
})

export default router

