# a12n-server-admin

[![Integration and E2E Tests](https://github.com/curveball/a12n-server-admin/actions/workflows/playwright.yml/badge.svg)](https://github.com/curveball/a12n-server-admin/actions/workflows/playwright.yml)
[![CodeQL](https://github.com/curveball/a12n-server-admin/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/curveball/a12n-server-admin/actions/workflows/github-code-scanning/codeql)

The admin UI counterpart to [`@curveball/a12n-server`](https://github.com/curveball/a12n-server), a lightweight OAuth2 server.

![image](https://github.com/user-attachments/assets/97855564-7f0a-42ad-8d2b-05ed14eee5e1)

<img width="1440" alt="421643125-c5dd945b-ba8f-480c-a09d-6845a6fec5af" src="https://github.com/user-attachments/assets/b2a53db8-19c5-4bf8-9976-fcc9e8b2860a" />

<img width="1419" alt="421643743-00833ad6-bc12-4ca9-b4d7-39837ab26da3" src="https://github.com/user-attachments/assets/98948986-e3ad-4f67-bd34-a89bd62a02ef" />

<img width="1440" alt="421644270-88e27497-00e6-40f4-af2e-6d906a5e0470" src="https://github.com/user-attachments/assets/c3f95a8b-22d8-4ebb-8d0c-297719eeec1a" />

## Getting Started

### Prerequistes

- Node.js 20.x or newer
- Running `a12n-server` with a supported database (MySQL, Postgres, or SQLite) or run the server with [Docker](https://github.com/curveball/a12n-server/blob/main/docs/getting-started.md#running-with-docker-compose) if you like.
  For more, check out [server setup instructions](https://github.com/curveball/a12n-server/blob/main/docs/getting-started.md) for more details.

### Setup

#### Run a12n-server

1. To set up a test server, open a new Terminal tab and run:

```sh
  mkdir a12n-server && cd a12n-server
  npx @curveball/a12n-server
```

This command creates a configuration file and SQLite database in the current directory (which should be `a12n-server`).

1. In the same tab, run:

```sh
sqlite3 a12nserver.sqlite3
INSERT INTO server_settings (setting, value)  VALUES ('cors.allowOrigin', '["http://localhost:8531", "*"]');
```

3. Open [http://localhost:8531/](http://localhost:8531/) to create your admin account.

4. After creating your admin account, visit this URL to set up an OAuth2 client :point_right: : <http://localhost:8531/app/new?nickname=admin-ui-client&url=http://localhost:5173&clientId=admin-ui-client&allowedGrantTypes=refresh_token,authorization_code&redirectUris=http://localhost:5173/auth/redirect>

You can also create an App manually by navigating to Apps and press "Add new app". Name the app whatever you want and leave the URL to the app as blank

5. Next, click on the url next to client-collection:

![image](https://github.com/user-attachments/assets/27314f01-7bf3-408d-b062-794e93f52854)

6. Click Add new OAuth2 credentials at the top.

7. Check the following options and add `http://localhost:5173/auth/redirect` as the redirect uri.

![image](https://github.com/user-attachments/assets/1d1d51d8-ac48-4a29-9a25-24668cb9f780)

8. Copy the clientId (`admin-ui-client` by default) field after creating the OAuth2 crendentials

![image](https://github.com/user-attachments/assets/e96b05c3-e55b-43f4-9e58-bb55a734115f)

9. In the `.env` file of the `a12n-server-admin` project, add the following

You can also run `cp .env.example .env` to create a `.env` file with the values.

```
# the URL for the client
VITE_SERVER_URL=http://localhost:5173
# the a12n-server url
VITE_AUTH_SERVER_URL=http://localhost:8531
# the client-id for the App resource that you created in a12n-server
VITE_AUTH_CLIENT_ID=admin-ui-client # replace with a clientId of the app you just created

# This shouldn't change, you'll need to specify this in a12n-server as a redirect URL
# this is because React Router paths are setup for this specific redirect
VITE_POST_AUTH_REDIRECT_URI=http://localhost:5173/auth/redirect
```

#### Run a12n-server-admin

10. Open a new Terminal tab and navigate to the root directory of this project.

You should be able to run this project locally with `npm run dev`!

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

## Contributing

We're always open to contributions!

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for more details.

## License

This project is licensed under the Apache License 2.0, consistent with the original project.

## Lore

This project began as a partnership between University of Toronto Scarborough's Software Engineering program and the maintainers of `@curveball/a12n-server`. :maple_leaf:

`@curveball/a12n-server` is a project by [Evert Pot](https://evertpot.com). Its building blocks use `@curveball`, a framework for building server apps in TypeScript which was started in 2018. At the time, a lot of features we take for granted in server-side JS apps were missing.

`a12n-server` stands for "authentication server". It's a lightweight OAuth2 server that can be used to authenticate users and manage their access to resources.

This project provides the admin UI for `a12n-server`. It's built with React and TypeScript, and uses the `@tanstack/react-query` library for data fetching and caching.
