
import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'

interface Exercise {
  id: string
  type: string
  question: string
  options?: string[]
  answer: string
  pronunciation?: string
}

export default function Practice() {
  const { user } = useAppStore()
  const [activeType, setActiveType] = useState<string>('vocabulary')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')

  const practiceTypes = [
    { type: 'vocabulary', name: '单词记忆', icon: '📝' },
    { type: 'grammar', name: '语法练习', icon: '📖' },
    { type: 'listening', name: '听力训练', icon: '🎧' },
    { type: 'speaking', name: '口语跟读', icon: '🎤' },
  ]

  useEffect(() => {
    fetchExercises()
  }, [activeType])

  const fetchExercises = async () => {
    try {
      const res = await fetch(`/api/practice/${activeType}`)
      const data = await res.json()
      if (data.success) {
        setExercises(data.exercises)
        setCurrentIndex(0)
        setScore(0)
        setAnswered(false)
      }
    } catch (error) {
      console.error('获取练习失败', error)
    }
  }

  const handleAnswer = (answer: string) => {
    if (answered) return
    setSelectedAnswer(answer)
    setAnswered(true)
    if (answer === exercises[currentIndex].answer) {
      setScore(s => s + 1)
    }
  }

  const nextExercise = async () => {
    if (user && answered) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            exerciseId: exercises[currentIndex].id,
            completed: true,
          }),
        })
      } catch (error) {
        console.error('更新进度失败', error)
      }
    }
    
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(i => i + 1)
      setAnswered(false)
      setSelectedAnswer('')
    } else {
      alert(`练习完成！得分：${score + (selectedAnswer === exercises[currentIndex].answer ? 1 : 0)}/${exercises.length}`)
      fetchExercises()
    }
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    )
  }

  const currentExercise = exercises[currentIndex]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎯 练习中心</h1>
          <p className="text-gray-600 text-lg">通过互动练习提升你的语言水平</p>
        </div>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {practiceTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => {
                setActiveType(type.type)
                setCurrentIndex(0)
                setScore(0)
                setAnswered(false)
              }}
              className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                activeType === type.type
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <div className="flex justify-between items-center text-white">
              <div>
                <div className="text-sm opacity-80">题目进度</div>
                <div className="text-2xl font-bold">{currentIndex + 1} / {exercises.length}</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">当前得分</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
            </div>
            <div className="mt-4 bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentExercise.question}</h2>
              {currentExercise.pronunciation && (
                <div className="text-gray-500 text-lg italic">{currentExercise.pronunciation}</div>
              )}
            </div>

            {currentExercise.options && (
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {currentExercise.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                    className={`p-6 rounded-xl border-2 text-left transition-all transform hover:scale-102 ${
                      answered
                        ? option === currentExercise.answer
                          ? 'border-green-500 bg-green-50'
                          : option === selectedAnswer
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-medium text-lg">
                      {String.fromCharCode(65 + idx)}. {option}
                    </div>
                    {answered && option === currentExercise.answer && (
                      <div className="text-green-600 mt-2 text-sm">✓ 正确答案</div>
                    )}
                    {answered && option === selectedAnswer && option !== currentExercise.answer && (
                      <div className="text-red-600 mt-2 text-sm">✗ 你的选择</div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {!currentExercise.options && (
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <p className="text-gray-600 text-center">请直接回答这个问题，然后点击下方按钮</p>
                <button
                  onClick={() => handleAnswer(currentExercise.answer)}
                  disabled={answered}
                  className="mt-4 w-full bg-blue-100 text-blue-700 py-3 rounded-lg font-medium hover:bg-blue-200 transition-all"
                >
                  显示答案
                </button>
                {answered && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                    答案：{currentExercise.answer}
                  </div>
                )}
              </div>
            )}

            {answered && (
              <button
                onClick={nextExercise}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                {currentIndex < exercises.length - 1 ? '下一题 →' : '完成练习 🎉'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

