Refactored Hanse Recruitment UI Structure
=========================================

The application has been refactored into a multi-file structure for better maintainability.

Files:
- index.html      : The main HTML file. Open this to run the app.
- styles.css      : Contains all CSS styles.
- app.js          : Core application logic (data, view switching, boards).
- leadModal.js    : Detailed logic for the Lead Card modal and its departments.
- assets/img/     : Directory containing all image assets.

Instructions:
1. Simply open `index.html` in your web browser.
2. No build tools or server required.

Notes:
- The Department logic (Recruiting, Safety, Fleet, Accounting) is in `leadModal.js`.
- The main data and event handling is in `app.js`.
