'use client'

import { useEffect, useState } from 'react'
import { Flashcard } from '../types/flashcard'

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('/api/flashcards')
        const data: Flashcard[] = await response.json()
        setFlashcards(data)
      } catch (error) {
        console.error('Failed to fetch flashcards:', error)
      }
    }

    fetchFlashcards()
  }, [])

  const toggleCard = () => setShowAnswer(!showAnswer)
  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const current: Flashcard = flashcards[currentIndex]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">laglis</h1>

      <div className="bg-white border rounded-lg shadow p-6 w-full max-w-md text-center min-h-[100px] text-lg">
        {showAnswer ? current.answer : current.question}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={toggleCard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showAnswer ? 'Show Question' : 'Show Answer'}
        </button>

        <button
          onClick={nextCard}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Flashcards
