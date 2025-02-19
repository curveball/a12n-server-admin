// Demo.test.tsx
import React, { useState } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Inline Counter component
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  )
}

// Test suite for the Counter component
describe('Counter', () => {
  it('increments count on button click', () => {
    render(<Counter />)

    // Confirm initial text
    screen.getByText('Count is 0')

    // Click the "Increment" button
    fireEvent.click(screen.getByText('Increment'))

    // Now text should show "Count is 1"
    screen.getByText('Count is 1')
  })
})