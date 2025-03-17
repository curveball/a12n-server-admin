# Project 21: a12n-server

## Partner Intro
Evert Pot, evert@sproutfamily.ca

## About the Project
a12n-server is a lightweight authentication server designed to provide developers with a simple and efficient authentication system. The project was initiated in 2018 as a personal endeavor by our partner, Evert Pot, to address the lack of lightweight, open-source OAuth2 servers for Node.js that support TypeScript. In this context, 'lightweight' refers to faster startup times , lower memory usage, and simpler configuration compared to what would be considered heavyweight solutions such as Keycloak, which can require several minutes to start, use hundreds of MB of RAM, and demand complex setup and maintenance. Integration time is also minimized as a12n-server provides a ready-to-use API with minimal setup, typically taking less than an hour to integrate into an existing Node.js project, as opposed to days for more comprehensive systems. It was created to address the lack of simple yet secure OAuth2 solutions that offer fast startup times, minimal resource usage, and an easy-to-use admin UI. This project began as a personal endeavor by our partner, Evert Pot, and it continues to grow in features and community adoption.


### Problem Statement
While there are several OAuth2 server implementations available for Node.js on GitHub, many are either too complex, resource-heavy, or lack comprehensive TypeScript support. This project aims to fill that gap by offering a lean, fast, and TypeScript-friendly alternative. Although some open-source and lightweight alternatives exist, a12n-server differentiates itself through its standalone, intuitive admin UI that significantly reduces the learning curve and administrative overhead for managing users, permissions, and applications, making it accessible even to those with minimal technical expertise. 

### Content and Description
Our Admin UI is a complete revamp of the old a12n-server admin dashboard, designed to improve usability, security, and scalability. It retains core capabilities such as creating users, updating users, creating apps and groups, and assigning privileges to entities.

The dashboard enforces role-based access control, allowing admins to grant or restrict permissions for specific actions. For example, an admin can grant a group privileges to create or manage users, apps, and groups. However, a restricted user may only have read-only access to view certain entities.

### Key Improvements Over the Old UI
* Modernized UI/UX with a cleaner, more intuitive design.
* Improved API efficiency, reducing latency for user and app management.
* More granular privilege controls, allowing for dynamic role creation.

With these improvements, the new Admin UI ensures better usability while maintaining flexibility for managing users, apps, and groups effectively.


### Importance
Authentication is a critical component of any modern web application. a12n-server offers developers a lightweight, easy-to-configure solution that integrates seamlessly with popular databases and provides essential authentication features like OAuth2, MFA, and user management.

## Key Features
* **Browsable API endpoints** with errors and responses displayed in HTML and JSON, and HAL-formatted user resources.
* **Database support** for Postgres, MySQL, and SQLite.
* **Admin UI** with user permission and app management.
* **Flat permission model** for straightforward access control.
* **OAuth2 implementation** for secure authorization.
* **Multi-Factor Authentication (MFA)** using Google Authenticator (TOTP), WebauthN, and Yubikeys.
* **Registration flow** with one-time passcode (OTP).
* **Password recovery** through a 'forgot-my-password' flow.

## Screenshots/Short Videos

## Demo walkthrough
```sh
npm install
npm run dev
```

Now you can browse through the prototype. As of this moment, it has mock data and limited functionality; however, it correctly outlines the structure of the Admin UI.


## Testing the Features
1. **Register an Admin Account**  
   - Start the server (see "Getting Started").  
   - Visit [http://localhost:8531/](http://localhost:8531/) in a browser.  
   - Follow the prompts to create an admin user.  

2. **Manage Permissions & Users**  
   - After logging in, go to the “Users” section.  
   - Verify you can see the user in the list.  

3. **Enable MFA**  
   - Under “Security Settings”, enable TOTP or WebAuthn.  
   - Follow the on-screen prompts and verify the 6-digit code.  
   - Log out and log back in to confirm MFA is required.  


## Getting Started (Developer Instructions)

### Prerequistes
* Node.js 18.x or newer
* A supported database (MySQL, Postgres, or SQLite)
* (Optional) Docker if you prefer containerized deployment

### Setup
To set up a test server:
```sh
mkdir a12n-server && cd a12n-server
npx @curveball/a12n-server
```
This command creates a configuration file and SQLite database in the current directory.

Run: 
```
sqlite3 a12nserver.sqlite3
INSERT INTO server_settings (setting, value)  VALUES ('cors.allowOrigin', '["http://localhost:8531", "*"]');
```
To allow frontend access to the a12n-server backend

Open [http://localhost:8531/](http://localhost:8531/) to create your admin account. After creating your admin account, head to this URL to set up
an OAuth2 client: <http://localhost:8531/app/new?nickname=admin-ui-client&url=http://localhost:5173&clientId=admin-ui-client&allowedGrantTypes=refresh_token,authorization_code&redirectUris=http://localhost:5183/auth/redirect>,
or do this manually by navigating to apps and press add new app. Name, the app whatever you want and leave the URL to the app as blank

Next, click on the url next to client-collection: 
<img width="757" alt="Screenshot 2025-03-11 at 10 02 42 PM" src="https://github.com/user-attachments/assets/27314f01-7bf3-408d-b062-794e93f52854" />

Click Add new OAuth2 credentials at the top. Check the following options and add `http://localhost:5173/auth/redirect` as the redirect uri.
<img width="1285" alt="Screenshot 2025-03-11 at 10 04 20 PM" src="https://github.com/user-attachments/assets/1d1d51d8-ac48-4a29-9a25-24668cb9f780" />

Copy the clientId (`admin-ui-client` by default) field after creating the OAuth2 crendentials
![image](https://github.com/user-attachments/assets/e96b05c3-e55b-43f4-9e58-bb55a734115f)

Nagivate to the .env file and add the following, replacing the client id field with the clientId of the app you just created:
```
# the URL that a12n-server runs on
VITE_SERVER_URL=http://localhost:8531/ 
# the client-id for the App resource that you created in a12n-server
VITE_AUTH_CLIENT_ID=admin-ui-client 

# This shouldn't change, you'll need to specify this in a12n-server as a redirect URL 
# this is because React Router paths are setup for this specific redirect
VITE_POST_AUTH_REDIRECT_URI=http://localhost:5173/auth/redirect
```

And you should be able to run the server with `npx run dev`!

### Use case run through:
We are able to read, create, and update users, groups, and apps. The functionality will be the similar across all entities:

**Read**:
When we initially navigate to an entity (In this case users), we are able to view a table to existing users and relevant information
<img width="1440" alt="Screenshot 2025-03-11 at 10 16 43 PM" src="https://github.com/user-attachments/assets/c5dd945b-ba8f-480c-a09d-6845a6fec5af" />

**Create**:
We can create a new user by filling in the below form. By checking Auto-generate password, we generate a one time password that the user can use to login.
<img width="1419" alt="Screenshot 2025-03-11 at 10 18 44 PM" src="https://github.com/user-attachments/assets/00833ad6-bc12-4ca9-b4d7-39837ab26da3" />

**Update**:
We are able to update a users information by filling out the below form. We can change a user's name or decide whether that user is active or not. If we set the user to not active, the user will no longer be able to long in. Note that you should never set yourself to not active as that will interfere with the a12n-server's authentification, causing errors.
<img width="1440" alt="Screenshot 2025-03-11 at 10 20 30 PM" src="https://github.com/user-attachments/assets/88e27497-00e6-40f4-af2e-6d906a5e0470" />


### Development Requirements
* Node.js 18.x
* MySQL, Postgres, or SQLite

## Deployment and GitHub Workflow
Deployment is not supported as of this moment. The steps for the desired deployment process are outlined below.
* **Deployment Details:**
  - Deploy using Docker with pre-configured Dockerfiles.
  - CI/CD pipelines using GitHub Actions for automated testing, building, and deployment.

* **GitHub Actions Workflow:**
  - Build, lint, and test on every push and pull request.
  - Manual approval for deployments.

## Task Management
Task management is handled through GitHub Issues.

**Task Priority:**
```
🟥 priority: critical (Must be addressed immediately, blocking other work)
🟧 priority: high (Important, but not blocking)
🟨 priority: medium (Should be done, but not urgent)
🟩 priority: low (Nice to have, but not time-sensitive)
```

**Task Status:**
```
🔵 status: backlog
🟡 status: in progress
🟠 status: in review
🔴 status: blocked
✅ status: done
```

## Coding Standards and Guidelines
* **Coding Style:**
  - Follow Airbnb JavaScript/TypeScript style guide.
  - Consistent use of ESLint and Prettier for linting and formatting.
  - Meaningful variable names, proper code documentation, and modular design.
* **Git Practices:**
  - Use conventional commits for commit messages.
  - Branch naming convention: `feature/`, `bugfix/`, `hotfix/`.
* **Testing:**
  - 100% unit test coverage for core functionalities.
  - Integration tests for database interactions and API endpoints.
  - End-to-end tests using Cypress for critical user flows.
 
## Design Guidelines
* **Color Palette:**
  - Primary: #A18072, #211F26, #E3DFE6, #AB6400
  - Secondary: #008573, #641723, #027864
* **Font:**
  - Primary: Typography
  - Title: Mona Sans

## Test Plan
* **Unit Tests:** Core authentication logic, database interactions.
* **Integration Tests:** API endpoint responses, database operations.
* **End-to-End Tests:** User registration, login, MFA, password recovery.
* **Tools:** Jest, Vite, Cypress.

# Unit and Integration tests:
npm run test

# End-to-End tests:
npm run e2e

## License
This project is licensed under the Apache License 2.0, consistent with the original project.
