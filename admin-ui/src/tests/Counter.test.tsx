import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from '../components/Counter'

describe('Counter', () => {
  it('increments count on button click', () => {
    render(<Counter />)

    // initial text
    screen.getByText('Count is 0')

    // click increment
    fireEvent.click(screen.getByText('Increment'))
    screen.getByText('Count is 1')
  })
})