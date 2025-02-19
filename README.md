# Project 21: a12n-server

## Partner Intro
Evert Pot, evert@sproutfamily.com

## About the Project
a12n-server is a lightweight authentication server designed to provide developers with a simple and efficient authentication system. The project was initiated in 2018 as a personal endeavor by our partner, Evert Pot, to address the lack of lightweight, open-source OAuth2 servers for Node.js that support TypeScript. In this context, 'lightweight' refers to faster startup times , lower memory usage, and simpler configuration compared to what would be considered heavyweight solutions such as Keycloak, which can require several minutes to start, use hundreds of MB of RAM, and demand complex setup and maintenance. Integration time is also minimized as a12n-server provides a ready-to-use API with minimal setup, typically taking less than an hour to integrate into an existing Node.js project, as opposed to days for more comprehensive systems. It was created to address the lack of simple yet secure OAuth2 solutions that offer fast startup times, minimal resource usage, and an easy-to-use admin UI. This project began as a personal endeavor by our partner, Evert Pot, and it continues to grow in features and community adoption.


### Problem Statement
While there are several OAuth2 server implementations available for Node.js on GitHub, many are either too complex, resource-heavy, or lack comprehensive TypeScript support. This project aims to fill that gap by offering a lean, fast, and TypeScript-friendly alternative. Although some open-source and lightweight alternatives exist, a12n-server differentiates itself through its standalone, intuitive admin UI that significantly reduces the learning curve and administrative overhead for managing users, permissions, and applications, making it accessible even to those with minimal technical expertise. 



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

Open [http://localhost:8531/](http://localhost:8531/) to create your admin account.

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
