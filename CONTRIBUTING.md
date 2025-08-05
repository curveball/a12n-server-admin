# Contributing to a12n-server-admin

Thank you for your interest in contributing to **a12n-server-admin**! Your help is vital to making this project better for everyone. Please read this guide to ensure a smooth contribution process.

## 📜 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please help us keep this community open, welcoming, and friendly.

## 🚀 Getting Started

First-time contributors:

1. **Fork** the repository and clone your fork locally.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up your local environment as described in the [README.md](./README.md).
4. Create a new branch for your task against `<yourfork>/main`

## 🛠️ Development Workflow

- Pick an issue from the [issues](https://github.com/curveball/a12n-server-admin/issues) page.

- **Pull Requests:**

    - Open a PR against the `main` branch.
    - Reference related issues (e.g., `Closes #123`).
    - Ensure your PR passes all [CI checks](.github/workflows/pr.yml). Linting is handled by `tsc` and `eslint`, which serve to prevent builds from breaking.

## 📁 Project Structure

```sh
.
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── dist                      # Build output
├── docs                      # Documentation for the project
├── eslint.config.js
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── playwright                # Contains E2E fixtures and context
├── playwright.config.ts      # E2E test configuration
├── public                    # Static files for build
├── src
│   ├── api                     # API calls, tanstack query hooks and options
│   ├── assets                  # Static assets that wind up in build
│   ├── components              # Reusable UI components
│   ├── hooks                   # Custom hooks
│   ├── main.tsx                # App Entry point
│   ├── pages                   # App views
│   ├── providers               # Providers for context
│   ├── tests                   # Test setup
│   ├── types                   # Type definitions (*d.ts, .ts)
│   ├── utils                   # Utility and helper functions
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # Application entry point
│   ├── theme.css               # Global styling and theming
│   └── routes.ts               # Routes configuration
├── test-results                # Test results from Playwright
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts             # Build configuration
└── vitest.config.ts           # Unit test config
```

## Design Guidelines

- **Color Palette:**

    - Primary: #A18072, #211F26, #E3DFE6, #AB6400
    - Secondary: #008573, #641723, #027864

- **Font:**
    - Primary: Matter
    - Title: Matter

## 🧪 Testing

Collocate tests within the same folder as the code they test.

Assuming you've set up `a12n-server` locally for development with an admin user, the following environment variables will be needed to run unit and e2e tests locally:

```
VITEST_AUTH_SERVER_EMAIL=<your-admin-email>
VITEST_AUTH_SERVER_PASSWORD=<your-admin-password>
```

- **Unit Tests:**
    - Use [Vitest](https://vitest.dev/) for unit tests. These tests use the `*.test.ts(x)` suffix.
    - Run with `npm run test:unit`.
- **Integration & E2E Tests:**
    - Install playwright `npm i -D @playwright/test`
    - For these tests to work locally in your dev environment, you need to have a12n-server running on `http://localhost:8531` and a12n-server-admin running on `http://localhost:5173`
    - We use [Playwright](https://playwright.dev/) for integration and end-to-end tests. These tests use the `*.spec.ts` suffix.
    - Run with `npm run test:e2e`.

### 🎭 Playwright Test Project Sequencing

**CRITICAL**: When adding new test projects to `playwright.config.ts`, you **MUST** maintain the correct sequence order:

```typescript
projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ }, // 1. Authentication setup
    { name: 'e2e tests', testMatch: '**/*.spec.ts' }, // 2. General E2E tests
    { name: 'OAuthFlow', testMatch: /.*\.OAuthProvider\.ts/ }, // 3. OAuth-specific tests
    // Add all other test projects here...
    { name: 'Logout', testMatch: /.*\.logout\.ts/ }, // ⚠️ MUST BE LAST
];
```

**Why this order matters:**

- **Setup tests run first** to establish authentication state
- **General tests run second** while auth state is available
- **Logout tests MUST run last** because they clear authentication state needed by other tests

**Contributing Guidelines:**

1. **Adding new test projects**: Insert them before the `Logout` project
2. **Never reorder**: Keep `setup` first and `Logout` last
3. **Test isolation**: Each project should be independent except for auth state dependency
4. **File naming**: Follow the patterns:
    - Setup: `*.setup.ts`
    - General E2E: `*.spec.ts`
    - OAuth flows: `*.OAuthProvider.ts`
    - Logout flows: `*.logout.ts`

**Example of adding a new test project:**

```typescript
projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'e2e tests', testMatch: '**/*.spec.ts' },
    { name: 'OAuthFlow', testMatch: /.*\.OAuthProvider\.ts/ },
    { name: 'UserManagement', testMatch: /.*\.user\.ts/ }, // ✅ New project added here
    { name: 'AppManagement', testMatch: /.*\.app\.ts/ }, // ✅ Another new project
    { name: 'Logout', testMatch: /.*\.logout\.ts/ }, // ⚠️ Always stays last
];
```

- **All Tests:**
    - Run all tests with `npm test`.
- **CI:**
    - All PRs are checked by GitHub Actions ([see workflows](.github/workflows/)).

## 🐛 Bug Reports & Feature Requests

- **Bugs:**
    - Please [open an issue](https://github.com/curveball/a12n-server-admin/issues/new) with steps to reproduce, expected behavior, and screenshots/logs if possible.
- **Features:**
    - Suggest new features by [opening an issue](https://github.com/curveball/a12n-server-admin/issues/new?template=feature_request.md) and describing your idea and use case.

## 🤝 Getting Help

- For questions, open a [discussion](https://github.com/curveball/a12n-server-admin/discussions) or ask in issues.
- For security concerns, please email the maintainers (see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)).

---

Thank you for helping make this project awesome! ✨
