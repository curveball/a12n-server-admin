# Sprout Family/The Rizzlers
> _Note:_ This document will evolve throughout your project. You commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What is the product?

High-Level Description:
The product is a lightweight, open-source authentication solution designed to simplify and streamline user authentication for developers and organizations.

Problem Statement:
Existing authentication solutions, such as Auth0, Supertokens, and Keycloak, can be complex, heavyweight, or require significant time and resources to integrate. Developers and organizations need a faster, more efficient, and more accessible way to implement authentication while maintaining flexibility and scalability.

What We’re Building:

- A standalone Admin UI for managing user authentication.
- An API abstraction layer that integrates with popular databases like Postgres and MySQL, allowing developers to easily add, update, or query user authentication data.
- A modular authentication system that can be integrated into various development stacks with minimal setup.
- Open-source availability, allowing anyone to use, adapt, and contribute to the product, fostering community-driven improvements and ensuring widespread accessibility.
  
Context:
The product aims to compete with popular authentication solutions by offering a lightweight, open-source alternative that reduces overhead for developers and encourages innovation through community involvement.


#### Q2: Who are your target users?

Independent Developers:

Example: A freelance developer working on a small-scale web application who needs a secure, quick-to-implement authentication solution without incurring licensing costs.

Startup Teams:

Example: A small team building a SaaS product with limited resources and time for implementing a custom authentication solution. Open-source access ensures they can integrate and customize the product to fit their needs without financial barriers.

Tech Enterprises:

Example: A mid-sized company seeking a more modular and lightweight alternative to existing proprietary authentication systems, with the flexibility to modify the code to suit their internal standards.

Open-Source Enthusiasts and Contributors:

Example: Developers passionate about improving community-driven tools who can adapt and enhance the product for their specific use cases while contributing back to the open-source ecosystem.

Educators & Learners:

Example: A third-year computer science student building a secure web application and seeking a lightweight, open-source tool for experimentation and learning.
#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

1) Time Efficient: The first benefit of using our product is time efficiency. Most platforms, like Auth0, are complex. Our solution provides a straightforward setup process that lets developers integrate authentication features quickly. 

2) Cost-Effective: Since our project is open-source there are no licensing fees, making it ideal for independent developers and startups. Moreover, having a global community helps ensure that the product stays up to date. 

3) Customization Friendly: Our product allows users to choose designs that fit their specific tech stack and needs, which offers much more flexibility than rigid alternatives. 

#### Q4: What are the user stories that make up the Minumum Viable Product (MVP)?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * User stories must contain acceptance criteria. Examples of user stories with different formats can be found here: https://www.justinmind.com/blog/user-story-examples/. **It is important that you provide a link to an artifact containing your user stories**.
 * If you have a partner, these must be reviewed and accepted by them. You need to include the evidence of partner approval (e.g., screenshot from email) or at least communication to the partner (e.g., email you sent)

**Link to Figma Prototype: https://www.figma.com/design/qMa4lHpX4ydsGFQ0AI74cL/Admin-UI**

1) As a developer, I want to enable users to register for my application, in order to provide secure access to the application.

Acceptance Criteria:
- Passwords are securely encrypted before being stored in the database.
- The system displays validation errors for invalid inputs (e.g., incorrect email format, weak password).
- Users can access a secure registration form through the application interface, which has one combined field for the full name.

2) As an admin, I want to be able to see I want to view a list of users in a table and also in JSON format in order to manage users easily

Acceptance Criteria:
- Given that I am logged in as an admin, when I open the user management section, then I should see a table with a list of all users.
- I can switch tabs from a table view to the developer tab to see the relevant information in JSON format.
- The table should include columns for at least: Email, firstName, lastName, isActive (Active/Inactive).

3) As an admin, I want to be able to create new user, updates user information, deactivate users, and search for them in order to handle any issues that might arise with specific users.

Acceptance Criteria:
- Given that I am logged in as an admin, when I navigate to the user management section, I should see an option to add a new user.
- When creating a new user, I must enter a valid email, first name, last name, and set their initial status (Active/Inactive).
- When I select a user from the list, I should have an option to edit their details (email, first name, last name, and status).
- When I deactivate a user, their status should change to "Inactive," and they should no longer be able to log in.
- I should be able to search for a user to address specific issues.

4) As an admin, I want to be able to manage the OAuth2 apps in an accessible way in order to be able to quickly handle any issues with them (stretch goal):

Acceptance Criteria:
- I can easily add/remove new apps and generate new scopes if necessary.
- I can track what scopes are available in specific apps and add/remove them from a drop-down menu.
- I can add or remove users from an app given a unique identifier (username/email).
- I can track and manage the scopes given to user in a specific app.

5) As an admin, I want to be able to initiate a password reset for a user and disable their MFA if needed, so that I can assist users who have lost access to their accounts due to forgotten credentials or failed login attempts.

Acceptance Criteria:
- The admin can search for a user by email, username, or user ID.
- The admin can trigger a password reset email for the user.
- The admin can disable MFA for the user in case they have lost their authentication method.
- The admin can unlock accounts that were locked due to too many failed login attempts.
- The system logs all admin-initiated password resets and MFA changes for auditing purposes.
- 
<img width="929" alt="image" src="https://github.com/user-attachments/assets/b7d78e67-aaa9-433d-b0d4-0ce19b28d912" />


#### Q5: Have you decided on how you will build it? Share what you know now or tell us the options you are considering.

> Short (1-2 min' read max)
 * What is the technology stack? Specify languages, frameworks, libraries, PaaS products or tools to be used or being considered. 
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
 * Will you be using third party applications or APIs? If so, what are they?

As the project is being developed in TypeScript/Javascript, we have chosen to stick to them as well. The focus is primarily on UI, so React is being considered as the main framework, though serverside rendering is also an option (which is how the original server interface was implemented). The original project can use MySQL, Postgres and Sqlite databases, and we would simply need to request data from them, though Node.js would be required in that case. Docker would be used for containerization, just as in the original project. For CI/CD, we are leaning towards Github Actions, just to be consistent with the server repo. The application will be deployed as a server along with a database. The architecture can be split into roughly three components - the Admin UI (uses React), the OAuth2 server (which is already functional), and a database. The Admin UI makes requests to the server, which then accesses the database through an abstraction layer. This is essentially an MVC pattern. At the moment, we are not considering any third-party applications or APIs, although that may change later.

----
## Intellectual Property Confidentiality Agreement 
> Note this section is **not marked** but must be completed briefly if you have a partner. If you have any questions, please ask on Piazza.
>  
**By default, you own any work that you do as part of your coursework.** However, some partners may want you to keep the project confidential after the course is complete. As part of your first deliverable, you should discuss and agree upon an option with your partner. Examples include:
1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.
2. You can upload the code to GitHub or other similar publicly available domains.
3. You will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual. 
4. You will share the code under an open-source license and distribute it as you wish but only the partner can access the system deployed during the course.
5. You will only reference the work you did in your resume, interviews, etc. You agree to not share the code or software in any capacity with anyone unless your partner has agreed to it.

**Your partner cannot ask you to sign any legal agreements or documents pertaining to non-disclosure, confidentiality, IP ownership, etc.**

Briefly describe which option you have agreed to.
Since this project is open - source, there is no legal agreements of any sort. 

----

## Teamwork Details

#### Q6: Have you met with your team?

Do a team-building activity in-person or online. This can be playing an online game, meeting for bubble tea, lunch, or any other activity you all enjoy.
* Get to know each other on a more personal level.
* Provide a few sentences on what you did and share a picture or other evidence of your team building activity.

Our team got together on Discord for a fun team-building session and played Gartic Phone using its in-game feature. It was a great way to relax and bond—we had some hilarious drawings and even more hilarious guesses. Along the way, we also shared a bit about our backgrounds and got to know each other better. It was a fun break from work and definitely helped us feel more connected as a team. Here’s a screenshot from one of our games!

![03C3DAED-561F-4666-835D-64071ABA4960](https://github.com/user-attachments/assets/5ee6f5af-0a6c-4e19-806b-de3c2642ec6c)


#### Q7: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. One person may have multiple roles.  
 * Add role(s) to your Team-[Team_Number]-[Team_Name].csv file on the main folder.
 * At least one person must be identified as the dedicated partner liaison. They need to have great organization and communication skills.
 * Everyone must contribute to code. Students who don't contribute to code enough will receive a lower mark at the end of the term.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * Why did you choose them to take that role? Specify if they are interested in learning that part, experienced in it, or any other reasons. Do no make things up. This part is not graded but may be reviewed later.

Vihaan Chugh: Produce Manager. Frontend. Some experience with react from 309. I want to refine this skill further with this project as practise. 

Muhammad Ibrahim: Frontend Developer. Some exposure working with it before in React specifically which is being considered as one of the frontend framework for the project. I want to learn more about it and become more well versed over the course of this project.

Orhan Cangurel:

Vikram Makkar: Frotend. I am choosing frontend because even though I have some experience with it, I want to refine it and make myself more thorough with it by working on it during this project. 

Aleksandr Kovalev:

Harshith Latchupatula:

Samuel Lukas:

#### Q8: How will you work as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You should have 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * You must keep track of meeting minutes and add them to your repo under "deliverables/minutes" folder
   * You must have a regular meeting schedule established for the rest of the term.

We will have 1-2 meetings each week. On Tuesdays, we will have a short meeting as a team sync to discuss challenges
or issues that arise. We will also use this time to prepare for tutorial updates, deliverables, or various tasks
we need to prep for other deadlines. The second meeting will be on Fridays with the partner. Here, we will give updates
on what we are working on, discuss next steps or goals we want to accomplish, and also take time to ask questions and
clarify taksks we are working on. 

Additionally, we have a discord server where we are able to communicate ad-hoc with the partner and eachother. Issues,
conversation, or questions that don't require a meeting will happen in the discord server chat. If anything urgent
pops up, we are able to have mini meetings through discord calls on the server.
  
#### Q9: How will you organize your team?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done? (You must grant your TA and partner access to systems you use to manage work)
   * **How do you prioritize tasks?**
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?
  
Our meeting schedule is already concrete with recurring meetings on Tuesdays and Fridays. The meeting minutes for these meetings will be recordered under `team/minutes/weekx.txt` for the corresponding week.

In terms of tasks, work assigned will be aggregated as Github issues so that it is visible to all members on the team. Given specific roles (frontend, backend, etc.) we will assign the corresponding role to an issue and it's priority as follows:

```
🟥 priority: critical (Must be addressed immediately, blocking other work)
🟧 priority: high (Important, but not blocking)
🟨 priority: medium (Should be done, but not urgent)
🟩 priority: low (Nice to have, but not time-sensitive)
```

As soon as a team member is done working on a current ticket, they will pick up the next ticket aligning with their role with the highest priority. TO determine the status of work from inception to completion, the following labels will be assigned:

```
🔵 status: backlog
🟡 status: in progress
🟠 status: in review
🔴 status: blocked
✅ status: done
```

As a group member works on their assigned ticket/issue, they will update the status to reflect the status of their work.

#### Q10: What are the rules regarding how your team works?

**Communications:**
 * What is the expected frequency? What methods/channels will be used? 
 * If you have a partner project, what is your process for communicating with your partner?

 We set up a Discord server as our main communication platform to keep everything organized and ensure smooth collaboration. We plan on having at least 1-2 check-ins per week, either through text updates or by hopping into the General voice channel for live discussions. This helps us stay aligned on tasks, share progress, and quickly resolve any issues. If we're working with a partner, we use the same approach—keeping them updated through regular messages and calls to ensure we're all on the same page.
 
**Collaboration: (Share your responses to Q8 & Q9 from A1)**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 * How will you address the issue if one person doesn't contribute or is not responsive?
 * 
To keep everyone accountable for meetings and action items, we use an Instagram group chat for quick reminders and updates about upcoming meetings. For scheduling, we use Calendly to find times that work for everyone, ensuring that meetings are planned around everyone’s availability.

If someone isn’t contributing or isn’t responsive, we first reach out to them individually to check in and understand if there’s an issue. If the problem persists, we address it as a team to find a solution together. If necessary, we escalate the issue to the assigned TA to ensure fairness and keep the project moving forward.

## Organisation Details

#### Q11. How does your team fit within the overall team organisation of the partner?
* Given the team structure of your partner, what role do you think your team will play?
* Examples include product development that includes developing new features, or quality assurance that includes developing features that test the product reliability, or software maintenance that includes fixing crucial bugs in the product.
* Provide examples of why you think you fit this role.

Our partner, Sprout Family, is a very small startup that is in the early stages of building out their product ecosystem. Given their lean team structure, our role is crucial in laying the foundation for a new admin page UI for their OAuth2 server. In the broader scope of their organization, our team plays a Product Development role, specifically focusing a revamped version the administration panel. This work is essential as it provides the first interface for managing OAuth2 clients, users, and permissions, making it a key component of their authentication and authorization system.

By delivering this new admin UI page and connecting it with the pre-existing a12n-server they have, we're allowing Sprout family, and other potential uses of the a12n-server to more efficiently manage and secure their authentication system without having to directly interact with backend configurations.

Since Sprout family is still early in its development, we fit this role perfectly as we're flexible and can soley focus on creating this new product. As majority of our team has experience with frontend, designing and creating this new UI, and plugging it into the a12n-server API would be an accomplishable goal. We will be able to further improve on their frontend (which is currently server-rendered HTML) by leveraging technologies such as React to increase user interactability while incorporating best practices.

#### Q12. How does your project fit within the overall product from the partner?
* Look at the big picture of the product and think about how your project fits into this product.
* Is your project the first step towards building this product? Is it the first prototype? Are you developing the frontend of a product whose backend is developed by the partner? Are you building the release pipelines for a product that is developed by the partner? Are you building a core feature set and take full ownership of these features?
* You should also provide details of who else is contributing to what parts of the product, if you have this information. This is more important if the project that you will be working on has strong coupling with parts that will be contributed to by members other than your team (e.g. from partner).
* You can be creative for these questions and even use a graphical or pictorial representation to demonstrate the fit.

We're focused mostly on developing the frontend of a product whose backend is already developed by the partner. More specifically, the frontend we will develop for the admin UI page will be a new, standalone, iteration replacing the legacy admin page. The backend is already developed and maintained by the partner as the a12n-server. Apart from the server and the admin UI, we will not be working on other parts of the overall product (ie. anything that is more userfacing and relating to Sprout Family). The only potential coupling will be between APIs that are used on the a12n-server that will be required to plug into our frontend UI. However, the only possible clashes would be if the APIs need to be updated or modified to fit our usecase. Otherwise, since the frontend portion is standalone and separate, there will not be any coupling between the project and the overall product.

## Potential Risks

#### Q13. What are some potential risks to your project?
* Now that you have defined your project, what risks can you identify that might impact it?
* Some examples of risks at this planning stage could include:
  * Uncertainties regarding a specific feature
  * Lack of clarity in execution
  * Insufficient discussion with partners
  * User stories that are too abstract or too simple
* For each risk, provide a brief bullet point and then explain the risk in detail.

* Lack of Clarity in Execution
If team members have different interpretations of tasks or project goals, it may lead to inconsistencies in implementation. To mitigate this, we need clear documentation, regular check-ins, and well-defined action items.

Insufficient Discussion with Partners
If we don’t communicate effectively with our partners, we may miss important requirements or feedback, leading to last-minute changes. Ensuring regular updates and feedback loops will help minimize misunderstandings.

User Stories That Are Too Abstract or Too Simple
If our user stories are not well-defined, they may not provide enough direction for development. This could lead to unnecessary scope creep or features that don’t add real value. We will refine our user stories to make them actionable and aligned with project goals.

#### Q14. What are some potential mitigation strategies for the risks you identified?

1) Risk: Since the project is open source it might be susceptible to security vulnerabilities.
   
Strategy:
- Regular security audits in which the people contributing can look at the codebase and try to find and fix possible vulnerabilities.
- Implement industry-standard security measures, such as using strong encryption for data, securing API endpoints, and enforcing robust authentication mechanisms
  
2) Risk: Integration challenges with different tech stacks
   
Strategy:
- Provide thorough and clear API documentation to simplify the integration process.
- Establish channels for developers to provide feedback on integration issues and prioritize resolving the most common challenges.

3) Risk: Maintenance and Timely Updates
   
Strategy:
- Implement continuous integration and continuous deployment (CI/CD) pipelines to streamline the process of releasing updates and patches.
- Maintain a clear project roadmap with prioritized tasks to ensure that critical updates and improvements are addressed promptly.

4) Risk: Poor or insufficient documentation can hinder developer onboarding
   
Strategy:
- Develop detailed documentation covering installation, configuration, usage, API references, and troubleshooting guides.
- Keep documentation up-to-date with the latest features, changes, and best practices to ensure its relevance and accuracy.

