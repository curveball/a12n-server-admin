import { afterAll } from 'vitest';

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
