## Project Planning
# Team  Rizzlers – Deliverable 2 Documentation
### Q1
**A summary of the project plan outlining the sequence of user stories and development milestones.**  
> _Mapping User Stories to a Product Plan: Organize your user stories (developed in D1) into a logical sequence that reflects their priorities and dependencies. This plan will act as a blueprint, guiding your project from its initial stages to the MVP that you will submit at the end of the term. You should also clarify software quality needs of your project, e.g., deployment, testing, documentation, in your planning._


**Mapping User Stories to a Product Plan**  
Our primary objective is to build a **dedicated Admin UI** for the open-source **a12n-server** (an existing lightweight authentication server). The server already handles user authentication, token issuance, MFA, and OAuth2 logic; however, it lacks a modern, user-friendly admin interface for managing these features. Below are the MVP user stories we plan to tackle, organized by priority and dependencies:

1. **Admin User Listing and JSON View**  
   - *As an admin, I want to see a list of all users in both a user-friendly table and a JSON view, so I can manage them easily.*  
   - **Dependency**: a12n-server’s `/users` endpoint.  
2. **Admin CRUD & Search**  
   - *As an admin, I want to create, edit, and deactivate users, and search for them, so I can quickly handle user-related issues.*  
   - **Dependency**: Must have the basic UI and data fetch from the user listing in place.  
3. **Registration Flow**  
   - *As a developer, I want end-users to register via a secure form, so they can gain authorized access.*  
   - **Dependency**: The a12n-server’s `/register` endpoint and password hashing logic.  
4. **Password Reset & MFA Management**  
   - *As an admin, I want to initiate password resets and toggle MFA for a user who is locked out, so I can assist them.*  
   - **Dependency**: Must confirm that the a12n-server supports these advanced flows.  
5. **OAuth2 App Management** (Stretch)  
   - *As an admin, I want to add/remove OAuth2 clients, generate scopes, and manage privileges, so I can control external app access.*  
   - **Dependency**: The a12n-server’s OAuth2 endpoints.

**Development Milestones**:

- **Milestone 1**: Set up the Admin UI skeleton (React/TypeScript + a12n-server integration). Implement Admin User Listing & JSON view.  
- **Milestone 2**: Add Admin CRUD & Search. Provide a stable user management interface for standard tasks.  
- **Milestone 3**: Implement Registration Flow (if needed for directly creating new accounts outside of the admin panel) and advanced features like Password Reset & MFA toggles.  
- **Milestone 4 (Stretch)**: Build out OAuth2 App Management UI.

**Software Quality Needs**  
- **Deployment**: We plan to containerize the UI with Docker. a12n-server can be either run locally (via `npx @curveball/a12n-server`) or in Docker.  
- **Testing**: We’ll use Jest + React Testing Library for unit tests, and we aim for partial integration testing with a12n-server.  
- **Documentation**: We’ll maintain a detailed README, clarifying how to install, run, and extend the Admin UI.  

---

---

### Q2
**The final system model that represents the project’s architecture.**  
> _Create a system model (e.g., class diagram, sequence diagram, component diagram, flowchart) that effectively communicates your system’s design. It should clarify how different parts interact, what the different components/classes are, and serve as a reference for development and testing._

1. **Admin UI**: Our new front-end, set up with React, TypeScript, TanStack Query for data fetching, and Node for dev tooling.  
2. **a12n-server**: Provides the actual authentication endpoints. We fetch real or dummy data from it (or from a stub) for the MVP.  
3. **Database**: The a12n-server abstracts the DB away from us, so we only interact with it via the server’s APIs.


---

### Q3
**The division of work into three sub-teams, explaining the reasoning behind the distribution.**  
> _How did you divide the workload among sub-teams, ensuring each sub-team is responsible for approximately equal portions of the project?_
We decided on **three sub-teams** to handle distinct aspects of the MVP:

1. **Initialization Team**: Sam, Vihaan, and Orhan  
   - **Scope**:  
     - Set up React + Node environment.  
     - Configure TanStack Query for fetching demo users.  
     - Establish folder structure, potential Docker setup, and baseline code standards.  
   - **Reasoning**:  
     - They have experience with React/Node configurations and enjoy setting up new codebases.  
     - This is the foundation on which everyone else can build.  

2. **Design Team**: Muhammad and Sasha  
   - **Scope**:  
     - Work on the project’s README, ensuring it details how to install, run, and test the Admin UI.  
     - Set up testing frameworks (Jest, React Testing Library) and draft sample tests.  
     - Provide or refine design guidelines for the rest of the UI (colors, components, layout references).  
   - **Reasoning**:  
     - Both have strong communication and documentation skills.  
     - They will also set up initial testing to ensure consistent quality.  

3. **Signup, Login Pages Implementation & Figma Team**: Vikram and Harshith  
   - **Scope**:  
     - Refine the existing Figma designs.  
     - Implement the signup and login page (or basic front-end route) that ties into a12n-server’s auth flow.  
     - Create base UI components (buttons, forms, etc.) that follow the updated Figma design.  
   - **Reasoning**:  
     - They have UI/UX experience; Harshith has done design in previous internships, and Vikram is focusing on front-end refinement.  
     - They’ll ensure the MVP has a polished look and a cohesive design from day one.

This division ensures each sub-team handles a well-defined slice: **foundational setup**, **documentation/testing**, and **login design**. It also evenly spreads the workload based on each member’s interests and expertise.


---

### Q4
**Summary of the technology stack chosen for the project**  
_(e.g., programming languages, frameworks, databases, cloud services, etc.) and why._


1. **Frontend**:  
   - **React (TypeScript)** – popular, well-documented, suits our team’s skill set.  
   - **TanStack Query** – helps manage server state, caching user data from a12n-server.  
2. **Backend**:  
   - We use **a12n-server** as a **dependency**, not rewriting or modifying its code.  
3. **Database**:  
   - a12n-server can run MySQL and/or Postgres under the hood. We just consume the API.  
4. **Deployment**:  
   - Potential Docker usage for easy local setup, with an eventual option for cloud hosting.  
5. **Testing**:  
   - **Jest** + **React Testing Library** for front-end tests.  
   - Possibly integration tests hitting a12n-server’s endpoints in a local environment.

#### Why This Stack?

- **Speed & Familiarity**: Setting up React + TypeScript is a straightforward path for our team.  
- **Scalability**: TanStack Query is a good solution for caching user data and simplifying data fetching logic.  
- **Minimal Overhead**: We rely on the proven functionality of a12n-server so we can focus on building an excellent admin UI.


---

## Sub-Teams

### Sub-team 5.1

#### Q4
**Team members in this sub-team and their roles.**

- **Sam** – Node/React environment wizard & repository structure  
- **Vihaan** – TanStack Query integration & environment debugging  
- **Orhan** – Basic data fetch (demo users), future expansions


#### Q5
**A description of the specific features, modules, or components built by the sub-team.**

1. **Create React + Node Environment**  
   - `create-react-app` (or Vite) with TypeScript, plus a Node server or dev server config.  
2. **Configure TanStack Query**  
   - Example calls to fetch a list of “demo users” (could be from a12n-server or mock endpoint).  
3. **Project Boilerplate**  
   - ESLint + Prettier for code standards.  
   - Potential Dockerfile / docker-compose for local dev.  


#### Q6
**Lessons learned from this phase.**  
1. *What worked well?*  
2. *What didn’t work well? What can you do better for future deliverables?*

- **What worked well?**  
  - Having all environment needs sorted early prevented version mismatches.  
  - TanStack Query simplified our data fetching logic—less boilerplate than manual fetch.  
- **What didn’t work well?**  
  - We initially had confusion over how the a12n-server would be started in parallel. A short doc or script was needed.  
  - **Future Improvement**: Provide a single command (`npm run dev:all`) that spins up both the UI and a12n-server in Docker or via scripts.

---

---

### Sub-team 5.2

#### Q7
**Team members in this sub-team and their roles.**

**Answer Here**

#### Q8
**A description of the specific features, modules, or components built by the sub-team.**

1. **Comprehensive README**  
   - Step-by-step instructions for local installation (Node version, dependencies).  
   - Explanation of how to run a12n-server in tandem with the UI.  
2. **Testing Framework Initialization**  
   - Install and configure Jest + React Testing Library.  
   - Write sample tests (e.g., verifying the “demo users” list renders).  
3. **Design Guidelines**  
   - Outline consistent color palettes, typography, etc., for the rest of the team.  
   - Possibly create a small doc describing the recommended usage of certain UI components.


#### Q9
**Lessons learned from this phase.**  
1. *What worked well?*  
2. *What didn’t work well? What can you do better for future deliverables?*

- **What worked well?**  
  - Having a robust README from the start means fewer questions from new contributors.  
  - Setting up tests early fosters a test culture—everyone can see how to write new tests.  
- **What didn’t work well?**  
  - We found some design guidelines overlapping with the Figma team’s ideas, so we had to align these.  
  - **Future Improvement**: More frequent cross-team sync to unify design guidelines and Figma updates.

---

---

### Sub-team 5.3

#### Q10
**Team members in this sub-team and their roles.**

**Answer Here**

#### Q11
**A description of the specific features, modules, or components built by the sub-team.**

1. **Figma Design Refinement**  
   - Polished existing mock-ups to ensure consistency with any new branding or color palettes.  
   - Finalized layout for the login page, header, and potential side navigation.  
2. **Login Page Development**  
   - Form that collects admin credentials; on submit, it calls the a12n-server’s `/login` or relevant endpoint.  
   - Basic client-side validation.  
   - If login is successful, redirect to the main dashboard or user listing page.  
3. **Reusable Components**  
   - Possibly a shared `<Button>` or `<Input>` with styles from Figma.  
   - The goal is to keep the UI consistent for future pages.


#### Q12
**Lessons learned from this phase.**  
1. *What worked well?*  
2. *What didn’t work well? What can you do better for future deliverables?*

  - A close iteration loop between the Figma design and the coded login page—quickly discovering what design changes were feasible.  
- **What didn’t work well?**  
  - We realized mid-way that a12n-server uses certain headers or tokens for the login flow, so we had to adjust the front-end logic.  
  - **Future Improvement**: Provide a small mock or local environment so we can test the login page without fully configuring a production-like server.

---

---

## Team

### Q13
**A detailed explanation of the common foundation built at the start of the Implementation phase.**

Before each sub-team diverged:

1. **Repo & Folder Structure**  
   - A single GitHub repo with `client/` for React code.  
   - Possibly a separate directory or Docker config for a12n-server.  
2. **Initial Packages**  
   - `npm install` for React, TypeScript, TanStack Query, Jest, etc.  
   - Node version pinned (e.g., 18.x).  
3. **Lint & Prettier**  
   - To keep our code style uniform.  
4. **Basic Document**  
   - A rough README with “getting started” instructions so the sub-teams had a common reference.


---

### Q14
**A summary of how the sub-teams' work contributed to the overall project.**

1. **Initialization Team (5.1)**  
   - Laid the foundation: created the skeleton UI, integrated TanStack Query, ensured everything runs consistently.  
2. **Design & Documentation Team (5.2)**  
   - Provided immediate clarity for any new team member on how to spin up the project.  
   - Added test scaffolding so other devs can write tests quickly.  
3. **Login & Figma Team (5.3)**  
   - Ensured the UI design is consistent and user-friendly from day one.  
   - Created the crucial login page, a typical first point of interaction for an admin.

Together, these contributions set up a functional MVP environment: we can start the UI, see some “demo users,” have a refined login page, and a robust README plus initial tests.


---

### Q15
**The team’s overall progress in the context of the roadmap from the Planning phase.**

- **Milestone 1**: The Initialization Team has the environment running with sample or demo user data.  
- **Milestone 2**: The Figma designs are refined, and a functioning login page is built.  
- **Milestone 3**: We have a well-structured README and initial testing setup—already providing documentation for other members or future expansions.  
- **Next Steps**: As soon as these basics are stable, we will proceed to more advanced Admin UI tasks (CRUD of real a12n-server users, MFA toggles, etc.).


---

### Q16
**Any major technical or organizational challenges encountered and how they were handled.**

1. **Challenge**: Aligning Figma designs (Team 5.3) with the newly emerging design guidelines (Team 5.2).  
   - **Solution**: Frequent cross-team syncs to ensure color palettes, fonts, and UI components match.  
2. **Challenge**: Setting up TanStack Query properly to call a12n-server endpoints.  
   - **Solution**: The Initialization Team collaborated with the partner’s docs, wrote a small `apiClient` utility, and tested endpoints in a local dev environment.  
3. **Challenge**: Ensuring everyone follows the same Node version and Docker usage.  
   - **Solution**: A pinned `.nvmrc` or Docker-based approach to unify dev environments.

With these solutions in place, we overcame the early-phase hurdles and now have a stable path for building out the Admin UI.
