# a12n-server
​
> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 
​
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

​
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
Describe your Git/GitHub workflow. Essentially, we want to understand how your team members share codebase, avoid conflicts and deploys the application.
​
 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live application
 * What deployment tool(s) are you using? And how?
 * Don't forget to **briefly justify why** you chose this workflow or particular aspects of it!

 ## Coding Standards and Guidelines
 Keep this section brief, a maximum of 2-3 lines. You would want to read through this [article](https://www.geeksforgeeks.org/coding-standards-and-guidelines/) to get more context about what this section is for before attempting to answer.
  * These are 2 optional resources that you might want to go through: [article with High level explanation](https://blog.codacy.com/coding-standards-what-are-they-and-why-do-you-need-them/) and [this article with Detailed Explanation](https://google.github.io/styleguide/)
​
 ## Licenses 
​
 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.
​
 * What type of license will you apply to your codebase? And why?
 * What affect does it have on the development and use of your codebase?
