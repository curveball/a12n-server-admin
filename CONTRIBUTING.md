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
4. Create a new branch for your feature or bugfix:
    ```sh
    git checkout -b my-feature
    ```

## 🛠️ Development Workflow

- **Branching:** Use descriptive branch names (e.g., `fix/login-bug`, `feature/add-user-list`).
- **Commits:** Write clear, concise commit messages. Follow [Conventional Commits](https://www.conventionalcommits.org/) if possible.
- **Pull Requests:**
    - Open a PR against the `main` branch.
    - Reference related issues (e.g., `Closes #123`).
    - Ensure your PR passes all [CI checks](.github/workflows/pr.yml).

## 🧹 Code Style & Linting

- **Linting:**
    - Run `npm run lint` before pushing.
    - ESLint is configured for TypeScript and React ([eslint.config.js](./eslint.config.js)).
- **Formatting:**
    - Prettier is used for code formatting. Most files are auto-formatted on commit via [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged).
- **Type Safety:**
    - Use TypeScript for all code. Prefer explicit types and interfaces from `src/types/`.

## 🧪 Testing

Collocate tests with the code they test. For example, if you are adding a new feature, add a test for it in the same folder.

- **Unit Tests:**
    - Use [Vitest](https://vitest.dev/) for unit tests. These tests use the `*.test.ts(x)` suffix.
    - Run with `npm run test:unit`.
- **Integration & E2E Tests:**
    - Use [Playwright](https://playwright.dev/) for integration and end-to-end tests. These tests use the `*.spec.ts` suffix.
    - Run with `npm run test:e2e`.
- **All Tests:**
    - Run all tests with `npm test`.
- **CI:**
    - All PRs are checked by GitHub Actions ([see workflows](.github/workflows/)).

## 🐛 Bug Reports & Feature Requests

- **Bugs:**
    - Please [open an issue](https://github.com/curveball/a12n-server-admin/issues/new) with steps to reproduce, expected behavior, and screenshots/logs if possible.
- **Features:**
    - Suggest new features by [opening an issue](https://github.com/curveball/a12n-server-admin/issues/new?template=feature_request.md) and describing your idea and use case.

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
│   ├── app
│   ├── assets                  # Static assets that wind up in build
│   ├── components              # Reusable UI components
│   ├── config                  # Configuration files
│   ├── hooks                   # Custom hooks
│   ├── main.tsx                # App Entry point
│   ├── pages                   # App views
│   ├── providers               # Providers for context
│   ├── tests                   # Test setup
│   ├── types                   # Type definitions (*d.ts, .ts)
│   └── utils
├── test-results                # Test results from Playwright
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts           # Unit test config
```

## 🧹 Housekeeping

- Keep dependencies up to date. Run `npm audit` and address vulnerabilities if possible.
- Write or update documentation as needed (in `README.md` or `docs/`).

## 🤝 Getting Help

- For questions, open a [discussion](https://github.com/curveball/a12n-server-admin/discussions) or ask in issues.
- For security concerns, please email the maintainers (see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)).

---

Thank you for helping make this project awesome! ✨
