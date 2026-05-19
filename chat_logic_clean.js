// ===============================
// CHAT FUNCTIONALITY - TEAM CENTER
// ===============================

(function () {
    // 1. DATA: Employees & Groups
    const data = {
        employees: [
            { id: 'e1', name: 'Anna Smith', dept: 'recruiting', role: 'Head of Recruiting', online: true },
            { id: 'e2', name: 'Mark Johnson', dept: 'recruiting', role: 'Recruiter', online: false },
            { id: 'e3', name: 'John Davis', dept: 'safety', role: 'Safety Manager', online: true },
            { id: 'e4', name: 'Lisa Wilson', dept: 'safety', role: 'Compliance Officer', online: true },
            { id: 'e5', name: 'Carlos Rodriguez', dept: 'fleet', role: 'Fleet Manager', online: false },
            { id: 'e6', name: 'Mike Brown', dept: 'fleet', role: 'Mechanic', online: true },
            { id: 'e7', name: 'Sarah Miller', dept: 'accounting', role: 'Payroll Specialist', online: true },
            { id: 'e8', name: 'David Clark', dept: 'accounting', role: 'Controller', online: false },
            { id: 'e9', name: 'Emily White', dept: 'recruiting', role: 'Sourcer', online: true },
            { id: 'e10', name: 'James Wilson', dept: 'safety', role: 'Safety Admin', online: false }
        ],
        groups: [
            { id: 'g1', name: 'Recruiting Team', type: 'dept', dept: 'recruiting', members: ['e1', 'e2', 'e9'] },
            { id: 'g2', name: 'Safety Dept', type: 'dept', dept: 'safety', members: ['e3', 'e4', 'e10'] },
            { id: 'g3', name: 'Fleet Ops', type: 'dept', dept: 'fleet', members: ['e5', 'e6'] },
            { id: 'g4', name: 'Accounting', type: 'dept', dept: 'accounting', members: ['e7', 'e8'] },
            { id: 'g5', name: 'Management', type: 'custom', members: ['e1', 'e3', 'e5', 'e8'] },
            { id: 'g6', name: 'Friday Lunch', type: 'custom', members: ['e2', 'e4', 'e6'] }
        ]
    };

    // 2. STATE
    let activeChats = []; // { id, type: 'user'|'group', name, element, minimized: bool }
    let chatThreads = {
        'e1': [
            { text: "Hey! Do we have any new CDL driver leads today?", type: "received", time: "10:15 AM" },
            { text: "Yes, Demarcus Rainey just submitted his application.", type: "sent", time: "10:18 AM" }
        ],
        'e2': [
            { text: "Can you review the safety compliance doc for Kevin?", type: "received", time: "Yesterday" },
            { text: "Sure, taking a look right now.", type: "sent", time: "Yesterday" }
        ],
        'g1': [
            { text: "Anna: Welcome everyone to the Q3 recruiting push!", type: "received", time: "Monday" }
        ]
    }; // { id: [messages] }
    
    // Expose to global window for Inbox tab sync
    window.teamCenterData = data;
    window.teamChatThreads = chatThreads;

    let currentFilter = 'all'; // all, recruiting, safety, fleet, accounting, groups
    let searchQuery = '';

    // Create Group State
    let isCreatingGroup = false;
    let newGroupName = '';
    let selectedMembers = [];

    // DOM Elements
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatWindow = document.getElementById('chatWindow');
    // We will rebuild the chat window content dynamically for the Dashboard

    // 3. INITIALIZATION
    function init() {
        if (!chatToggleBtn || !chatWindow) return;

        chatToggleBtn.onclick = toggleChatDashboard;

        // Initial Render of Dashboard Structure (hidden)
        renderDashboardStructure();
    }

    // 4. DASHBOARD RENDERER
    function renderDashboardStructure() {
        chatWindow.innerHTML = `
            <div class="chat-dashboard">
                <div class="chat-dashboard-header">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 4px;">
                        <div style="font-size:16px; font-weight:800; color:#1e293b;">Team Center</div>
                        <div id="chatDashClose" style="cursor:pointer; opacity:0.5;">✕</div>
                    </div>
                    
                    <div class="chat-search-box">
                        <input type="text" id="chatSearchInput" class="chat-search-input" placeholder="Search colleagues or groups...">
                        <span class="chat-search-icon">🔍</span>
                    </div>

                    <div class="chat-dept-pills">
                        <div class="dept-pill active" data-filter="all">All</div>
                        <div class="dept-pill" data-filter="recruiting">Recruiting</div>
                        <div class="dept-pill" data-filter="safety">Safety</div>
                        <div class="dept-pill" data-filter="fleet">Fleet</div>
                        <div class="dept-pill" data-filter="accounting">Accounting</div>
                        <div class="dept-pill" data-filter="groups">Groups</div>
                    </div>
                </div>
                
                <div class="chat-list-container" id="chatListContainer">
                    <!-- List Items Go Here -->
                </div>
            </div>
        `;

        // Attach Events
        document.getElementById('chatDashClose').onclick = closeChatPanel;

        const searchInput = document.getElementById('chatSearchInput');
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderChatList();
        });

        const pills = document.querySelectorAll('.dept-pill');
        pills.forEach(pill => {
            pill.onclick = () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentFilter = pill.dataset.filter;
                renderChatList();
            };
        });

        renderChatList();
    }

    function renderCreateGroupView() {
        chatWindow.innerHTML = `
            <div class="chat-dashboard">
                 <div class="create-group-view">
                    <div class="create-group-header">
                        <div class="create-group-title">New Group</div>
                        <div id="cancelCreateGroup" style="cursor:pointer; color:#94a3b8; font-size:12px;">Cancel</div>
                    </div>
                    <div class="create-group-body">
                         <input type="text" class="group-name-input" id="newGroupName" placeholder="Group Name (e.g. Project Alpha)" value="${newGroupName}">
                         <div style="font-size:12px; font-weight:600; color:#64748b; margin-top:8px;">Add Members</div>
                         <div class="member-select-list" id="memberSelectList">
                             <!-- Members populated here -->
                         </div>
                    </div>
                    <div class="create-group-footer">
                        <div style="font-size:12px; color:#64748b; margin-right:auto;">${selectedMembers.length} selected</div>
                        <button class="btn-primary" id="btnCreateGroup">Create Group</button>
                    </div>
                 </div>
            </div>
        `;

        // Events
        document.getElementById('cancelCreateGroup').onclick = () => {
            isCreatingGroup = false;
            newGroupName = '';
            selectedMembers = [];
            renderDashboardStructure();
        };

        const nameInput = document.getElementById('newGroupName');
        nameInput.addEventListener('input', (e) => {
            newGroupName = e.target.value;
        });

        document.getElementById('btnCreateGroup').onclick = handleCreateGroup;

        // Render Members
        const list = document.getElementById('memberSelectList');
        data.employees.forEach(emp => {
            const isSelected = selectedMembers.includes(emp.id);
            const div = document.createElement('div');
            div.className = `member-select-item ${isSelected ? 'selected' : ''}`;
            const initials = emp.name.charAt(0);
            div.innerHTML = `
                <div class="member-checkbox">${isSelected ? '✓' : ''}</div>
                <div class="employee-avatar" style="width:32px; height:32px; font-size:12px;">${initials}</div>
                <div style="font-size:13px; font-weight:600; color:#1e293b;">${emp.name}</div>
            `;
            div.onclick = () => {
                if (isSelected) {
                    selectedMembers = selectedMembers.filter(id => id !== emp.id);
                } else {
                    selectedMembers.push(emp.id);
                }
                renderCreateGroupView(); // Re-render to update UI
            };
            list.appendChild(div);
        });
    }

    function handleCreateGroup() {
        if (!newGroupName.trim()) {
            alert('Please name the group');
            return;
        }
        if (selectedMembers.length === 0) {
            alert('Please select at least one member');
            return;
        }

        const newGroup = {
            id: 'cg_' + Date.now(),
            name: newGroupName,
            type: 'custom',
            members: selectedMembers,
            dept: 'custom' // Simplified for coloring
        };

        data.groups.push(newGroup);

        // Reset and Open
        isCreatingGroup = false;
        newGroupName = '';
        selectedMembers = [];

        renderDashboardStructure();
        openChat(newGroup, 'group');
    }

    function renderChatList() {
        const container = document.getElementById('chatListContainer');
        container.innerHTML = '';

        // Filter Logic
        let displayGroups = [];
        let displayEmployees = [];

        // 1. Filter Groups
        if (currentFilter === 'all' || currentFilter === 'groups') {
            displayGroups = data.groups;
        } else {
            // Show dept groups if filter matches dept
            displayGroups = data.groups.filter(g => g.dept === currentFilter);
        }

        // 2. Filter Employees
        if (currentFilter === 'all') {
            displayEmployees = data.employees;
        } else if (currentFilter === 'groups') {
            displayEmployees = [];
        } else {
            displayEmployees = data.employees.filter(e => e.dept === currentFilter);
        }

        // 3. Search Filter
        if (searchQuery) {
            displayGroups = displayGroups.filter(g => g.name.toLowerCase().includes(searchQuery));
            displayEmployees = displayEmployees.filter(e => e.name.toLowerCase().includes(searchQuery));
        }

        // RENDER GROUPS
        if (displayGroups.length > 0) {
            const groupHeader = document.createElement('div');
            groupHeader.className = 'chat-section-label';
            groupHeader.innerHTML = `<span>Groups</span> <span class="create-group-btn" onclick="alert('Create Group Feature Coming Soon!')">+ New Group</span>`;
            container.appendChild(groupHeader);

            displayGroups.forEach(group => {
                const item = document.createElement('div');
                item.className = 'employee-item';
                item.onclick = () => openChat(group, 'group');

                const initials = group.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                const bgClass = group.type === 'dept' ? 'dept-group' : 'group-avatar';

                item.innerHTML = `
                    <div class="employee-avatar ${bgClass}">${initials}</div>
                    <div class="employee-info">
                        <div class="employee-name">${group.name}</div>
                        <div class="employee-dept">${group.members.length} members</div>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        // RENDER EMPLOYEES
        if (displayEmployees.length > 0) {
            const empHeader = document.createElement('div');
            empHeader.className = 'chat-section-label';
            empHeader.textContent = 'Direct Messages';
            container.appendChild(empHeader);

            displayEmployees.forEach(emp => {
                const item = document.createElement('div');
                item.className = 'employee-item';
                item.onclick = () => openChat(emp, 'user');

                const initials = emp.name.charAt(0);
                // Status dot (online/offline)
                const statusColor = emp.online ? '#10b981' : '#cbd5e1';

                item.innerHTML = `
                    <div class="employee-avatar" style="position:relative;">
                        ${initials}
                        <div style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:${statusColor}; border:2px solid white; border-radius:50%;"></div>
                    </div>
                    <div class="employee-info">
                        <div class="employee-name">${emp.name}</div>
                        <div class="employee-dept">${emp.role} • ${emp.dept.charAt(0).toUpperCase() + emp.dept.slice(1)}</div>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        if (displayGroups.length === 0 && displayEmployees.length === 0) {
            container.innerHTML = `<div style="padding:20px; text-align:center; color:#94a3b8; font-size:13px;">No matching results found.</div>`;
        }
    }

    // 5. CHAT WINDOW / BUBBLE LOGIC
    function toggleChatDashboard() {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            renderChatList(); // Refresh
        }
    }

    function closeChatPanel() {
        chatWindow.classList.remove('open');
    }

    function openChat(entity, type) {
        // Build unique ID for chat session
        const chatId = type === 'group' ? entity.id : entity.id;

        // Check if already active
        const existing = activeChats.find(c => c.id === chatId);
        if (existing) {
            // Just focus it
            existing.minimized = false;
            updateActiveChatsDisplay();
            closeChatPanel(); // Close dashboard when opening chat? Usually yes.
            return;
        }

        // Add new chat
        const newChat = {
            id: chatId,
            type: type, // 'user' or 'group'
            name: entity.name,
            data: entity,
            minimized: false,
            element: null
        };

        activeChats.push(newChat);
        updateActiveChatsDisplay();
        closeChatPanel();
    }

    function updateActiveChatsDisplay() {
        // Clear existing DOM elements for chats (only ones we manage)
        // Note: For simplicity in this non-react setup, we might re-render or just append.
        // Let's remove all active chat windows/bubbles and re-render based on state to keep simple.

        document.querySelectorAll('.chat-popup, .chat-bubble').forEach(el => el.remove());

        activeChats.forEach((chat, index) => {
            if (chat.minimized) {
                renderBubble(chat, index);
            } else {
                renderWindow(chat, index);
            }
        });
    }

    // RENDER INDIVIDUAL WINDOW
    function renderWindow(chat, index) {
        const popup = document.createElement('div');
        popup.className = 'chat-popup';
        // Offset multiple windows
        const offset = index * 20;
        popup.style.right = (320 + offset) + 'px'; // Base right position (dashboard is usually closed or distinct)
        if (window.innerWidth < 800) popup.style.right = '0'; // Mobile full width ish

        // Group vs User Header
        let subtext = '';
        if (chat.type === 'group') {
            subtext = `${chat.data.members.length} members`;
        } else {
            subtext = chat.data.role;
        }

        popup.innerHTML = `
          <div class="chat-popup-header">
            <div class="chat-popup-title">
              <span>${chat.name}</span>
              <span class="chat-popup-dept">${subtext}</span>
            </div>
            <div class="chat-popup-controls" style="display:flex; gap:8px;">
               <div class="chat-minimize-btn" style="cursor:pointer; font-weight:bold; padding:0 4px;">−</div>
               <div class="chat-close-btn" style="cursor:pointer; padding:0 4px;">✕</div>
            </div>
          </div>
          <div class="chat-messages-area">
             <!-- Msg History -->
          </div>
          <div class="chat-input-area">
            <input type="text" placeholder="Type a message..." class="chat-popup-input">
            <button class="chat-send-btn">Send</button>
          </div>
        `;

        document.body.appendChild(popup);
        chat.element = popup; // Store ref if needed

        // Events
        popup.querySelector('.chat-minimize-btn').onclick = (e) => {
            e.stopPropagation();
            chat.minimized = true;
            updateActiveChatsDisplay();
        };

        popup.querySelector('.chat-close-btn').onclick = (e) => {
            e.stopPropagation();
            activeChats = activeChats.filter(c => c.id !== chat.id);
            updateActiveChatsDisplay();
        };

        const input = popup.querySelector('input');
        const sendBtn = popup.querySelector('button');
        const msgArea = popup.querySelector('.chat-messages-area');

        // Render previous messages
        const msgs = chatThreads[chat.id] || [];
        msgs.forEach(m => appendMessage(msgArea, m));

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            const msg = { text, type: 'sent', time: new Date() };
            if (!chatThreads[chat.id]) chatThreads[chat.id] = [];
            chatThreads[chat.id].push(msg);

            appendMessage(msgArea, msg);
            input.value = '';

            // Layout scroll
            msgArea.scrollTop = msgArea.scrollHeight;
        };

        sendBtn.onclick = sendMessage;
        input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }

    // RENDER BUBBLE
    function renderBubble(chat, index) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';

        // Stagger bubbles vertically
        bubble.style.bottom = (30 + (index * 60)) + 'px';
        bubble.style.zIndex = 10000 + index;

        const initials = chat.name.charAt(0);
        const bg = chat.type === 'group' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#3b82f6';

        bubble.innerHTML = `
            <div class="chat-bubble-avatar" style="background:${bg}">
                ${initials}
                <div class="chat-bubble-badge" style="display:none"></div>
            </div>
        `;

        bubble.onclick = () => {
            chat.minimized = false;
            updateActiveChatsDisplay();
        };

        document.body.appendChild(bubble);
        chat.element = bubble;
    }

    function appendMessage(container, msg) {
        const div = document.createElement('div');
        div.className = `chat-message ${msg.type}`;
        div.textContent = msg.text;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    window.openLeadChat = function(leadId, leadName) {
        // Find lead in all possible data arrays
        const lead = (typeof leads !== 'undefined' ? leads.find(l => l.id === leadId) : null) || 
                     (typeof safetyDrivers !== 'undefined' ? safetyDrivers.find(l => l.id === leadId) : null) || 
                     (typeof fleetDrivers !== 'undefined' ? fleetDrivers.find(l => l.id === leadId) : null) || 
                     (typeof accountingDrivers !== 'undefined' ? accountingDrivers.find(l => l.id === leadId) : null) || 
                     (typeof dashboardLeads !== 'undefined' ? dashboardLeads.find(l => l.id === leadId) : null);

        if (lead && typeof openRecruitingModal === 'function') {
            openRecruitingModal(lead, true, true); // expanded=true, startChat=true
        } else {
            console.error('Lead not found or openRecruitingModal not defined', leadId);
        }
    };


    // Run Init
    document.addEventListener('DOMContentLoaded', init);
    // Also run immediately in case DOM is ready (helper script injection)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    }

})();

