import { useState } from 'react';
import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count is {count}</p>
            <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        </div>
    );
}

describe('Counter', () => {
    it('increments count on button click', () => {
        render(<Counter />);

        screen.getByText('Count is 0');

        fireEvent.click(screen.getByText('Increment'));

        screen.getByText('Count is 1');
    });
});
