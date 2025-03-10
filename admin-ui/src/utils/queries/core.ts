export const queryKeys = {
    users: {
        all: ['users'] as const,
        detail: (id: string) => ['users', id] as const,
    },
    posts: {
        all: ['posts'] as const,
        detail: (id: string) => ['posts', id] as const,
    },
};
