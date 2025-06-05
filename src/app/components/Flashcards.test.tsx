/**
 * @jest-environment node
 * @ts-nocheck
 */
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import Flashcards from '../components/Flashcards';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'What is 2 + 2?', answer: '4' },
      ]),
  })
) as jest.Mock

describe('Flashcards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  afterEach(() => {
    cleanup()
  });

  test('renders the Flashcards component', async () => {
    render(<Flashcards />)

    expect(screen.getByText('Flashcard App')).toBeInTheDocument()
    expect(screen.getByText('Loading flashcards...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    })
  });

  test('toggles between question and answer', async () => {
    render(<Flashcards />)

    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    })

    const toggleButton = screen.getByText('Show Answer')
    fireEvent.click(toggleButton)

    expect(screen.getByText('Paris')).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
  });

  test('cycles to the next flashcard', async () => {
    render(<Flashcards />)

    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    })

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
  });

  test('resets to the first flashcard after cycling through all', async () => {
    render(<Flashcards />)

    await waitFor(() => {
      expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    })

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    fireEvent.click(nextButton)

    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
  });
})