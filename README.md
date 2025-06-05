# a12n-server-admin

[![Unit Tests](https://github.com/curveball/a12n-server-admin/actions/workflows/vitest.yml/badge.svg)](https://github.com/curveball/a12n-server-admin/actions/workflows/vitest.yml)
[![Integration and E2E Tests](https://github.com/curveball/a12n-server-admin/actions/workflows/playwright.yml/badge.svg)](https://github.com/curveball/a12n-server-admin/actions/workflows/playwright.yml)
[![CodeQL](https://github.com/curveball/a12n-server-admin/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/curveball/a12n-server-admin/actions/workflows/github-code-scanning/codeql)

The admin UI counterpart to [`@curveball/a12n-server`](https://github.com/curveball/a12n-server), a lightweight OAuth2 server.

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## Getting Started

### Prerequistes

- Node.js 20.x or newer
- Running `a12n-server` with a supported database (MySQL, Postgres, or SQLite) or run the server with [Docker](https://github.com/curveball/a12n-server/blob/main/docs/getting-started.md#running-with-docker-compose) if you like.
  For more, check out [server setup instructions](https://github.com/curveball/a12n-server/blob/main/docs/getting-started.md) for more details.

### Setup

To set up a test server, open a new Terminal tab and run:

```sh
  mkdir a12n-server && cd a12n-server
  npx @curveball/a12n-server
```

This command creates a configuration file and SQLite database in the current directory (which should be `a12n-server`).

In your Terminal, run:

```sh
sqlite3 a12nserver.sqlite3
INSERT INTO server_settings (setting, value)  VALUES ('cors.allowOrigin', '["http://localhost:8531", "*"]');
```

Open [http://localhost:8531/](http://localhost:8531/) to create your admin account.

After creating your admin account, visit this URL to set up an OAuth2 client :point_right: : <http://localhost:8531/app/new?nickname=admin-ui-client&url=http://localhost:5173&clientId=admin-ui-client&allowedGrantTypes=refresh_token,authorization_code&redirectUris=http://localhost:5173/auth/redirect>

You can also create an App manually by navigating to Apps and press "Add new app". Name the app whatever you want and leave the URL to the app as blank

Next, click on the url next to client-collection:

![image](https://github.com/user-attachments/assets/27314f01-7bf3-408d-b062-794e93f52854)

Click Add new OAuth2 credentials at the top.

Check the following options and add `http://localhost:5173/auth/redirect` as the redirect uri.

![image](https://github.com/user-attachments/assets/1d1d51d8-ac48-4a29-9a25-24668cb9f780)

Copy the clientId (`admin-ui-client` by default) field after creating the OAuth2 crendentials

![image](https://github.com/user-attachments/assets/e96b05c3-e55b-43f4-9e58-bb55a734115f)

1. In the `.env` file of the `a12n-server-admin` project, add the following:

```
# the URL that a12n-server runs on
VITE_SERVER_URL=http://localhost:8531/
# the client-id for the App resource that you created in a12n-server
VITE_AUTH_CLIENT_ID=admin-ui-client # replace with the clientId of the app you just created

# This shouldn't change, you'll need to specify this in a12n-server as a redirect URL
# this is because React Router paths are setup for this specific redirect
VITE_POST_AUTH_REDIRECT_URI=http://localhost:5173/auth/redirect
```

Now you should be able to run the server with `npm run dev`!

## License

This project is licensed under the Apache License 2.0, consistent with the original project.

## Lore

This project began as a partnership between University of Toronto Scarborough's Software Engineering program and the maintainers of `@curveball/a12n-server`. :maple_leaf:

`@curveball/a12n-server` is a project by [Evert Pot](https://evertpot.com). Its building blocks use `@curveball`, a framework for building server apps in TypeScript which was started in 2018. At the time, a lot of features we take for granted in server-side JS apps were missing.

`a12n-server` stands for "authentication server". It's a lightweight OAuth2 server that can be used to authenticate users and manage their access to resources.

This project provides the admin UI for `a12n-server`. It's built with React and TypeScript, and uses the `@tanstack/react-query` library for data fetching and caching.
