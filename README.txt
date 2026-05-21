Hanse Recruitment - Multi-File UI Structure
============================================

Open `index.html` in a browser. No build tools or server required.

Files:
- index.html            : Main HTML entry point. Loads all scripts and styles.
- styles.css            : Core CSS styles for the entire application.
- app.js                : Main data, Kanban board logic, view switching, lead data arrays.
- leadModal.js          : Lead Card modal - dept sections (Recruiting, Safety, Fleet, Accounting).
- inbox_logic.js        : Inbox / Notification Center logic (External chats, Team, Assignments).
- inbox-styles.css      : Styles for Inbox layout, chat items, and Assignment notification cards.
- chat_logic_clean.js   : Internal team chat and group chat logic.
- filter-styles.css     : Filter panel, search, and sorting styles.
- lead-actions.css      : Assign button and progress bar styles on lead cards.
- dashboard-tabs.css    : Dashboard tab switcher styles.
- duplicate-indicator.css: Duplicate lead badge and indicator styles.
- chat_additions.css    : Additional chat UI styles.
- assets/img/           : Image assets (avatars, icons).
- js/                   : Additional JS modules.

Notes:
- Lead Card department logic is in `leadModal.js`.
- Inbox has 3 tabs: External (Leads), Internal (Team), Assignments (Notifications).
- Assignment notifications are defined in `window.demoNotifications` in `inbox_logic.js`.
- To add a new notification, push an object into `window.demoNotifications` with:
    { id, employee, sectionId, leadId, leadName, message, time, status: 'pending' }
  where `sectionId` is the HTML element ID to highlight (e.g. 'doc-card-mvr-dash-1').
