/**
 * Setup for Vitest unit tests
 */
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach } from 'vitest';

afterEach(() => {
    cleanup();
});
export const withResizeObserver = () => {
    afterAll(() => {
        // @ts-expect-error - Cleaning up mock after tests
        delete global.ResizeObserver;
    });

    class ResizeObserverMock {
        observe() {}
        unobserve() {}
        disconnect() {}
    }

    global.ResizeObserver = ResizeObserverMock;

    return global;
};
