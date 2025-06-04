# E2E Test Cases

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
