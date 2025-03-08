#21 - Rizzlers

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration XX - Review & Retrospect

 * When: FILL IN THE DATE WHEN YOU ACTUALLY HAD YOUR REVIEW MEETING
 * Where: Google Meet

## Process - Reflection


#### Q1. What worked well

List **process-related** (i.e. team organization and how you work) decisions and actions that worked well.


 * 2 - 4 important decisions, processes, actions, or anything else that worked well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).

 
1. **Frequent Short Meetings**  
   - We held 2 short sync calls each week (30 minutes each). This helped catch and resolve issues quickly rather than letting them pile up.  
   - **Reasoning**: Our tasks moved forward steadily because everyone stayed up-to-date, and blockers were addressed in near-real time.

2. **Well-Structured Task Board**  
   - We used GitHub Projects to list tasks with labels (`priority: high`, `status: in-progress`, etc.). Everyone could easily pick up the next task without confusion.  
   - **Reasoning**: The consistent status labels provided a clear snapshot of progress, ensuring no team member was idle or duplicating work.

3. **Open Communication with Partner**  
   - We kept a short Discord thread with our partner (Sprout Family) for quick questions about a12n-server endpoints.  
   - **Reasoning**: This prevented guesswork on routes like `/users` and `/apps`, saving time during integration.


#### Q2. What did not work well

List **process-related** (i.e. team organization and how you work) decisions and actions that did not work well.

 * 2 - 4 important decisions, processes, actions, or anything else that did not work well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).

1. **Last-Minute Merging**  
   - Some sub-teams waited until the final day to merge feature branches, causing merge conflicts and rushed bug fixes.  
   - **Reasoning**: Big-bang merges introduced unexpected breakages; continuous integration would reduce frantic last-day merges.

2. **Unclear Testing Strategy**  
   - We intended to use Jest + React Testing Library but also considered Vitest. Ended up with partial coverage and inconsistent test files.  
   - **Reasoning**: We spent a lot of time troubleshooting environment errors (e.g., version mismatches), slowing development.

3. **Overlapping Design Guidelines**  
   - Our design team updated the color palette mid-sprint, conflicting with the dev sub-team’s existing styling.  
   - **Reasoning**: This led to rework on UI components. We should lock color/fonts earlier to avoid mid-sprint changes.


#### Q3(a). Planned changes

List any **process-related** (i.e. team organization and/or how you work) changes you are planning to make (if there are any)

 * Ordered from most to least important, with supporting argument explaining a change.

1. **Frequent Merging & Code Reviews**  
   - We will merge changes at least every 1–2 days to detect conflicts early and simplify integration.  
   - **Reasoning**: Smaller, more frequent merges reduce last-minute chaos.

2. **Standardized Testing**  
   - We’ll commit to Vitest fully for unit tests, ensuring a single config across sub-teams.  
   - **Reasoning**: This avoids environment confusion and mismatch errors.

3. **Earlier UI/Design Lock-In**  
   - The design sub-team will finalize color, typography, and layout patterns by the start of the next iteration.  
   - **Reasoning**: Minimizes style churn mid-sprint and cuts down on rework.


#### Q3(b). Integration & Next steps
Briefly explain how you integrated the previously developed individuals components as one product (i.e. How did you be combine the code from 3 sub-repos previously created) and if/how the assignment was helpful or not helpful.

- **Integration**: We combined each sub-team’s code into the main branch (initialization, design/docs, login/signup). The partner’s `a12n-server` remains an external dependency.  
- **Assignment**: Merging from separate branches was a learning experience for Git merges. We realized continuous integration is better than sporadic big merges.  
- **Next Steps**: We plan to implement real CRUD calls to a12n-server for user management (including password resets and possibly MFA toggles).



## Product - Review

#### Q4. How was your product demo?
 * How did you prepare your demo?
1. **Preparation**  
   - We recorded a short loom video walking through the Admin UI: listing demo users, searching them, and showing the login page.  
   - We then did a live run with `docker-compose` to spin up both the Admin UI and a12n-server simultaneously.

 * What did you manage to demo to your partner?
2. **What We Demoed**  
   - Showed user listing with dummy data.  
   - A fully functional login page that authenticates via the a12n-server’s OAuth2 endpoint.  
   - Highlighted our color theme and basic navigation structure.
   - Stretch goal: basic OAuth2 app management, allowing admins to register new OAuth2 clients.

 * Did your partner accept the features? And were there change requests?
  3. **Partner Feedback**  
   - They liked the streamlined user listing approach but suggested more robust search/filter.  
   - They also requested a working password reset flow in the next iteration.

 * What were your learnings through this process? This can be either from a process and/or product perspective.
 * *This section will be marked very leniently so keep it brief and just make sure the points are addressed*
   
   4. **Learnings**  
   - Relying on placeholder data left some uncertainty. In the next sprint, we’ll integrate the real endpoints to instill confidence.  
   
