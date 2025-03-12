export const queryKeys = {
    users: {
      all: ['users'] as const,
      detail: (id: string) => ['users', id] as const,
    },
    posts: {
        all: ['posts'] as const,
        user: ['posts', 'user'] as const,
        detail: (id: string) => ['posts', id] as const,
    },
    privileges: {
      all: ['privileges'] as const,
      detail: (id: string) => ['privileges', id] as const,
    },
    apps: {
        all: ['apps'] as const,
        detail: (id: string) => ['apps', id] as const,
    },
    puts: {
        all: ['puts'] as const,
        user: ['puts', 'user'] as const,
        detail: (id: string) => ['puts', id] as const,
    },
};
