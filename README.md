# Project 21: a12n-server
## Partner Intro
 Evert Pot, evert@sproutfamily.com

a12n-server is a lightweight authentication server. The goal of a12n-server is to provide a simple authentication system for developers. It uses databases for access tokens, clients and users.
 

## Description about the project
a12-server, a personal project initiated by our partner in 2018, emerged as a solution to the limited availability of lightweight open-source OAuth2 servers for Node.js. While alternatives like Auth0, Supertokens, and Keycloak offered robust features, they were either cumbersome or lacked TypeScript support. a12n-server presented a refreshing alternative, boasting faster startup times and a leaner footprint compared to its competitors.
​
## Key Features
 * Browsable API endpoints with:
    * errors and responses displayed in HTML and JSON
    * HAL-formatted user resources.
  * Seamless communication with databases like Postgres and MySQL.
  * Admin UI with user permission and app management
  * A flat permission model
  * OAuth2 implementation
  * MFA
    * Google Authenticator (TOTP).
  * WebauthN / Yubikeys
  * Registration flow with one-time passcode (OTP)
  * Forgot-my-password flow

## Instructions
  End-users, who are admins in our case, can access the server through a standalone user interface.  Get a test server by running:

  ```sh
  mkdir a12n-server && cd a12n-server
  npx @curveball/a12n-server
  ```
  This will automatically create a configuration file and sqlite database in the current directory.

  Then, just open http://localhost:8531/ to create your admin account
 
 ## Development requirements
 * Node.js 18.x
 * MySQL, Postgress or Sqlite
 
 ## Deployment and Github Workflow
​
TBD

## Task Management

Task Management is done through Github Issues.

Task Priority:
```
🟥 priority: critical (Must be addressed immediately, blocking other work)
🟧 priority: high (Important, but not blocking)
🟨 priority: medium (Should be done, but not urgent)
🟩 priority: low (Nice to have, but not time-sensitive)
```

Task Status:
```
🔵 status: backlog
🟡 status: in progress
🟠 status: in review
🔴 status: blocked
✅ status: done
```

 ## Coding Standards and Guidelines
 
TBD
​
 ## Licenses 
​
Apache License 2.0 is used, as per the original project.
