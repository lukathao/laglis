import { NextResponse } from 'next/server';
import { Flashcard } from '@/app/types/flashcard';

const flashcards: Flashcard[] = [
  { question: "A a", answer: "ກ" },
  { question: "B b", answer: "ຂ" },
  { question: "C c", answer: "ຄ" }
]

export async function GET() {
  return NextResponse.json(flashcards);
}