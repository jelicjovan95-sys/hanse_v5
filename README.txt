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
- master-safety.js      : Master Safety module (Claims, DataQ, DOT, SMS logic).
- master-safety.css     : Styles for the Master Safety module.
- assets/img/           : Image assets (avatars, icons).
- js/                   : Additional JS modules.

Notes:
- Lead Card department logic is in `leadModal.js`.
- Inbox has 3 tabs: External (Leads), Internal (Team), Assignments (Notifications).
- Assignment notifications are defined in `window.demoNotifications` in `inbox_logic.js`.
- To add a new notification, push an object into `window.demoNotifications` with:
    { id, employee, sectionId, leadId, leadName, message, time, status: 'pending' }
  where `sectionId` is the HTML element ID to highlight (e.g. 'doc-card-mvr-dash-1').

============================================
Safety Module Logic & Functionalities
============================================

The Safety module has been significantly expanded to handle advanced compliance, claims, and DOT challenges. The core logic is housed in `app.js` (for the Safety Board) and `master-safety.js` (for Claims and DataQ Workspaces).

1. Safety Kanban Board (app.js)
-------------------------------
The Safety Board functions as a dynamic Kanban board for tracking drivers' safety compliance.
- Default Columns: By default, the board displays "Critical Alert" and "Pending removal".
- Dynamic Column Creation: Users can add new columns via the "+" button.
- Preset Tag Auto-Pull: When creating a column, users can choose a preset tag (e.g., "Medical Expiring"). The system automatically creates the column and pulls all drivers that currently have that tag into the new column.
- Custom Columns: Users can also create standard custom-named columns without auto-pull behavior.

2. Claims Workspace (master-safety.js)
--------------------------------------
The Claims tab is a dedicated workspace for managing accident and damage claims from start to finish.
- Centralized Data: Tracks driver info, equipment, adjusters, and the police report status.
- Accident Details: Allows users to input detailed accident info (weather, road conditions, cargo damage).
- Fault Determination & Insurance: Includes an "At Fault / Not At Fault" dropdown. A dynamic "Send to Insurance" button automatically generates an email template to the relevant insurance party based on the fault determination.
- AI Financials Parsing: Features simulated AI logic that reads uploaded estimates or invoices and automatically extracts key financial data (Claimed Amount, Paid Amount, Reserve), calculating the Total Incurred.
- Lead Integration: Claims can be viewed directly from the driver's Lead Modal, which seamlessly closes the modal and jumps straight to the specific Claim Workspace.

3. DataQ Workspace (master-safety.js)
-------------------------------------
The DataQ tab is designed for challenging incorrect FMCSA/DOT records (violations, crashes, duplicate records).
- Case Management: Works as a dedicated workspace instead of a spreadsheet. Users can challenge specific DOT violations directly from the DOT Inspections or SMS tabs.
- Evidence Upload: Users can upload supporting documents (e.g., dashcam footage, maintenance logs) directly into the case.
- AI Explanation Draft: Includes a simulated AI assistant that analyzes the uploaded evidence and automatically drafts a professional explanation to submit to the DOT/FMCSA.
- Status Tracking: Tracks the DataQ challenge status (Drafting, Submitted, Pending Agency Review, Closed) until final resolution.
