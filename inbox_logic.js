// Inbox Logic

const inboxData = [
  {
    id: 'inbox-1',
    leadId: 'dash-1', // maps to dashboardLeads
    name: 'Demarcus Rainey',
    preview: 'I just sent my CDL over, please check.',
    time: '10:45 AM',
    unread: true,
    status: 'Online',
    messages: [
      { text: 'Hi Demarcus, did you get a chance to fill out the application?', type: 'sent', time: 'Yesterday' },
      { text: 'Yes, I submitted it last night.', type: 'received', time: 'Yesterday' },
      { text: 'Great! We need a picture of your CDL front and back.', type: 'sent', time: 'Yesterday' },
      { text: 'I just sent my CDL over, please check.', type: 'received', time: '10:45 AM' }
    ]
  },
  {
    id: 'inbox-2',
    leadId: 'dash-2',
    name: 'Kevin Copening',
    preview: 'When is the drug test scheduled?',
    time: '09:30 AM',
    unread: true,
    status: 'Away',
    messages: [
      { text: 'Your background check cleared.', type: 'sent', time: 'Tuesday' },
      { text: 'Awesome, what is next?', type: 'received', time: 'Tuesday' },
      { text: 'Next up is the drug screening.', type: 'sent', time: 'Yesterday' },
      { text: 'When is the drug test scheduled?', type: 'received', time: '09:30 AM' }
    ]
  },
  {
    id: 'inbox-3',
    leadId: 'dash-3',
    name: 'Anthony Harrison',
    preview: 'Thanks for the update.',
    time: 'Yesterday',
    unread: false,
    status: 'Offline',
    messages: [
      { text: 'Hello Anthony, we reviewed your MVR.', type: 'sent', time: 'Monday' },
      { text: 'Is everything good?', type: 'received', time: 'Monday' },
      { text: 'Yes, everything looks perfect. Safety is reviewing the final docs.', type: 'sent', time: 'Yesterday' },
      { text: 'Thanks for the update.', type: 'received', time: 'Yesterday' }
    ]
  },
  {
    id: 'inbox-4',
    leadId: 'dash-4',
    name: 'Ramona Johnson',
    preview: 'I will be there at 8 AM.',
    time: 'Monday',
    unread: false,
    status: 'Online',
    messages: [
      { text: 'Ramona, your truck assignment is ready.', type: 'sent', time: 'Monday' },
      { text: 'Great, where do I pick it up?', type: 'received', time: 'Monday' },
      { text: 'At our main terminal in Dallas. See you Wednesday.', type: 'sent', time: 'Monday' },
      { text: 'I will be there at 8 AM.', type: 'received', time: 'Monday' }
    ]
  }
];

window.demoNotifications = [
  {
    id: "notif-demo1",
    employee: "John Doe",
    sectionId: "doc-card-mvr-dash-1",
    leadId: "dash-1",
    leadName: "Demarcus Rainey",
    message: "John Doe assigned a task to you for Demarcus Rainey (MVR Review)",
    time: "09:41 AM",
    status: "pending"
  },
  {
    id: "notif-demo2",
    employee: "Sara Kim",
    sectionId: "doc-card-cdl-dash-2",
    leadId: "dash-2",
    leadName: "Kevin Copening",
    message: "Sara Kim assigned a task to you for Kevin Copening (Safety Compliance)",
    time: "Yesterday",
    status: "pending"
  }
];

let activeInboxChatId = null;
let currentInboxTab = 'external'; // 'external' or 'internal'

function renderInboxList() {
  const listEl = document.getElementById('inboxList');
  const searchInputEl = document.getElementById('inboxSearchInput');
  if (!listEl || !searchInputEl) return;
  
  listEl.innerHTML = '';
  const searchInput = searchInputEl.value.toLowerCase();
  
  if (currentInboxTab === 'external') {
    searchInputEl.placeholder = "Search chats...";
    const filtered = inboxData.filter(chat => chat.name.toLowerCase().includes(searchInput));
    
    if(filtered.length === 0) {
      listEl.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--muted);">No chats found</div>';
      return;
    }
    
    filtered.forEach(chat => {
      const item = document.createElement('div');
      item.className = `inbox-chat-item ${chat.unread ? 'unread' : ''} ${chat.id === activeInboxChatId ? 'active' : ''}`;
      
      const initials = chat.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
      
      item.innerHTML = `
        <div class="inbox-avatar">${initials}</div>
        <div class="inbox-chat-info">
          <div class="inbox-chat-info-top">
            <div class="inbox-chat-name">${chat.name}</div>
            <div class="inbox-chat-time">${chat.time}</div>
          </div>
          <div class="inbox-chat-preview">${chat.preview}</div>
        </div>
      `;
      
      item.addEventListener('click', () => {
        chat.unread = false; // mark as read
        openInboxChat(chat);
      });
      
      listEl.appendChild(item);
    });
  } else if (currentInboxTab === 'notifications') {
    renderNotifications();
  } else {
    // Internal Tab - Team Center
    searchInputEl.placeholder = "Search colleagues or groups...";
    const teamData = window.teamCenterData || { employees: [], groups: [] };
    
    const filteredGroups = (teamData.groups || []).filter(g => g.name.toLowerCase().includes(searchInput));
    const filteredEmp = (teamData.employees || []).filter(e => e.name.toLowerCase().includes(searchInput));
    
    if (filteredGroups.length === 0 && filteredEmp.length === 0) {
      listEl.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--muted);">No results found</div>';
      return;
    }
    
    // Groups Section
    if (filteredGroups.length > 0) {
      const grpHeader = document.createElement('div');
      grpHeader.className = 'inbox-section-label';
      grpHeader.style = 'padding: 4px 10px; font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; margin-top: 10px;';
      grpHeader.textContent = 'Groups';
      listEl.appendChild(grpHeader);
      
      filteredGroups.forEach(grp => {
        const item = document.createElement('div');
        item.className = `inbox-chat-item ${grp.id === activeInboxChatId ? 'active' : ''}`;
        const initials = grp.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
        
        item.innerHTML = `
          <div class="inbox-avatar" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff;">${initials}</div>
          <div class="inbox-chat-info">
            <div class="inbox-chat-info-top">
              <div class="inbox-chat-name">${grp.name}</div>
            </div>
            <div class="inbox-chat-preview" style="color: var(--muted); font-size: 12px;">${grp.members.length} members</div>
          </div>
        `;
        
        item.addEventListener('click', () => openInternalChat(grp, 'group'));
        listEl.appendChild(item);
      });
    }
    
    // Employees Section
    if (filteredEmp.length > 0) {
      const empHeader = document.createElement('div');
      empHeader.className = 'inbox-section-label';
      empHeader.style = 'padding: 4px 10px; font-size: 11px; font-weight: 800; color: var(--muted); text-transform: uppercase; margin-top: 10px;';
      empHeader.textContent = 'Direct Messages';
      listEl.appendChild(empHeader);
      
      filteredEmp.forEach(emp => {
        const item = document.createElement('div');
        item.className = `inbox-chat-item ${emp.id === activeInboxChatId ? 'active' : ''}`;
        const initials = emp.name.charAt(0).toUpperCase();
        const statusColor = emp.online ? '#10b981' : '#cbd5e1';
        
        // Find last message preview if available
        const threads = (window.teamChatThreads && window.teamChatThreads[emp.id]) || [];
        const lastMsg = threads.length > 0 ? threads[threads.length - 1].text : `${emp.role} • ${emp.dept.charAt(0).toUpperCase() + emp.dept.slice(1)}`;
        const lastTime = threads.length > 0 ? (threads[threads.length - 1].time || '') : '';
        
        item.innerHTML = `
          <div class="inbox-avatar" style="position: relative;">
            ${initials}
            <div style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: ${statusColor}; border: 2px solid #fff; border-radius: 50%;"></div>
          </div>
          <div class="inbox-chat-info">
            <div class="inbox-chat-info-top">
              <div class="inbox-chat-name">${emp.name}</div>
              <div class="inbox-chat-time">${lastTime}</div>
            </div>
            <div class="inbox-chat-preview" style="color: var(--muted); font-size: 12px;">${lastMsg}</div>
          </div>
        `;
        
        item.addEventListener('click', () => openInternalChat(emp, 'user'));
        listEl.appendChild(item);
      });
    }
  }
}

function openInboxChat(chat) {
  activeInboxChatId = chat.id;
  renderInboxList();
  
  document.getElementById('inboxEmptyState').style.display = 'none';
  const activeChatEl = document.getElementById('inboxActiveChat');
  activeChatEl.style.display = 'flex';
  
  document.getElementById('inboxChatName').textContent = chat.name;
  document.getElementById('inboxChatStatus').textContent = chat.status;
  
  const openCardBtn = document.getElementById('inboxOpenLeadBtn');
  if (openCardBtn) {
    openCardBtn.style.display = 'flex';
    openCardBtn.onclick = () => {
      const lead = dashboardLeads.find(l => l.id === chat.leadId);
      if(lead) {
        if(typeof openRecruitingModal === 'function') {
          openRecruitingModal(lead);
        } else {
          alert("Lead Modal functionality is not available.");
        }
      } else {
        alert("Lead data not found.");
      }
    };
  }
  
  renderInboxMessages(chat.messages);
  
  if (window.innerWidth <= 820) {
    document.getElementById('inboxChatPane').classList.add('open');
  }
}

function openInternalChat(entity, type) {
  activeInboxChatId = entity.id;
  renderInboxList();
  
  document.getElementById('inboxEmptyState').style.display = 'none';
  const activeChatEl = document.getElementById('inboxActiveChat');
  activeChatEl.style.display = 'flex';
  
  document.getElementById('inboxChatName').textContent = entity.name;
  
  if (type === 'group') {
    document.getElementById('inboxChatStatus').textContent = `${entity.members ? entity.members.length : 0} members • ${entity.dept ? entity.dept.toUpperCase() : 'GROUP'}`;
  } else {
    document.getElementById('inboxChatStatus').textContent = `${entity.role} • ${entity.dept ? entity.dept.toUpperCase() : ''}`;
  }
  
  // Hide Open Card button for internal team
  const openCardBtn = document.getElementById('inboxOpenLeadBtn');
  if (openCardBtn) openCardBtn.style.display = 'none';
  
  if (!window.teamChatThreads) window.teamChatThreads = {};
  const msgs = window.teamChatThreads[entity.id] || [];
  renderInboxMessages(msgs);
  
  if (window.innerWidth <= 820) {
    document.getElementById('inboxChatPane').classList.add('open');
  }
}

function renderInboxMessages(messages) {
  const msgContainer = document.getElementById('inboxMessages');
  if (!msgContainer) return;
  msgContainer.innerHTML = '';
  
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `inbox-msg ${msg.type}`;
    div.innerHTML = `
      ${msg.text}
      <div class="inbox-msg-time">${msg.time || ''}</div>
    `;
    msgContainer.appendChild(div);
  });
  
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('inboxSearchInput');
  if(searchInput) {
    searchInput.addEventListener('input', renderInboxList);
  }
  
  const backBtn = document.getElementById('inboxBackBtn');
  if(backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('inboxChatPane').classList.remove('open');
      activeInboxChatId = null;
      renderInboxList();
    });
  }
  
  // Tab Switching Listeners
  document.querySelectorAll('.inbox-type-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.inbox-type-tab').forEach(t => t.classList.remove('active'));
      tabBtn.classList.add('active');
      currentInboxTab = tabBtn.dataset.tab;
      
      activeInboxChatId = null;
      document.getElementById('inboxActiveChat').style.display = 'none';
      document.getElementById('inboxEmptyState').style.display = 'flex';
      
      if(searchInput) searchInput.value = '';
      renderInboxList();
    });
  });
  
  const sendBtn = document.getElementById('inboxSendBtn');
  const msgInput = document.getElementById('inboxMessageInput');
  
  const sendMessage = () => {
    if(!activeInboxChatId) return;
    const text = msgInput.value.trim();
    if(!text) return;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (currentInboxTab === 'external') {
      const chat = inboxData.find(c => c.id === activeInboxChatId);
      if(chat) {
        chat.messages.push({
          text: text,
          type: 'sent',
          time: timeStr
        });
        chat.preview = text;
        chat.time = timeStr;
        
        msgInput.value = '';
        renderInboxMessages(chat.messages);
        renderInboxList();
      }
    } else {
      // Internal message
      if (!window.teamChatThreads) window.teamChatThreads = {};
      if (!window.teamChatThreads[activeInboxChatId]) {
        window.teamChatThreads[activeInboxChatId] = [];
      }
      
      window.teamChatThreads[activeInboxChatId].push({
        text: text,
        type: 'sent',
        time: timeStr
      });
      
      msgInput.value = '';
      renderInboxMessages(window.teamChatThreads[activeInboxChatId]);
      renderInboxList();
    }
  };
  
  if(sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }
  
  if(msgInput) {
    msgInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') sendMessage();
    });
  }
});

function renderNotifications() {
  const listEl = document.getElementById("inboxList");
  if (!listEl) return;
  listEl.innerHTML = "";

  if (typeof window.demoNotifications === "undefined" || window.demoNotifications.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 32px 16px; text-align: center; color: var(--muted);">
        <div style="font-size: 36px; margin-bottom: 12px; opacity: 0.4;">📋</div>
        <div style="font-weight: 600; font-size: 14px;">No assignments yet</div>
      </div>`;
    return;
  }

  window.demoNotifications.forEach(notif => {
    const card = document.createElement("div");
    card.className = "notif-card";

    // Avatar initials from employee name
    const initials = notif.employee
      .split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();

    // Derive a readable label from sectionId
    const sectionLabels = {
      "doc-card-mvr": "MVR Review",
      "doc-card-cdl": "CDL Upload",
      "doc-card-medical": "Medical Report",
      "doc-card-ssn": "SSN Upload",
      "dept-safety": "Safety Compliance",
      "dept-recruiting": "Recruiting",
      "dept-fleet": "Fleet",
      "dept-accounting": "Accounting"
    };
    const sectionKey = Object.keys(sectionLabels).find(k => notif.sectionId.startsWith(k));
    const sectionLabel = sectionKey ? sectionLabels[sectionKey] : notif.sectionId;

    let actionsHtml = "";
    if (notif.status === "pending") {
      actionsHtml = `
        <div class="notif-card-actions">
          <button class="notif-btn notif-btn-view" onclick="handleNotifView('${notif.id}')">👁 View</button>
          <button class="notif-btn notif-btn-accept" onclick="handleNotifAccept('${notif.id}')">✓ Accept</button>
          <button class="notif-btn notif-btn-decline" onclick="handleNotifDecline('${notif.id}')">✕ Decline</button>
        </div>`;
    } else {
      const isAccepted = notif.status === "accepted";
      actionsHtml = `
        <div class="notif-card-status ${notif.status}">
          ${isAccepted ? '✓ Accepted' : '✕ Declined'}
        </div>`;
    }

    card.innerHTML = `
      <div class="notif-card-header">
        <div class="notif-card-avatar">${initials}</div>
        <div class="notif-card-meta">
          <div class="notif-card-title">${notif.employee}</div>
          <div class="notif-card-subtitle">assigned you a task</div>
        </div>
        <div class="notif-card-time">${notif.time}</div>
      </div>
      <div class="notif-card-badge">${sectionLabel}</div>
      <div class="notif-card-message">For <strong>${notif.leadName}</strong> — ${sectionLabel} needs your attention.</div>
      ${actionsHtml}
    `;

    listEl.appendChild(card);
  });
}

function handleNotifView(notifId) {
  const notif = window.demoNotifications.find(n => n.id === notifId);
  if (!notif) return;

  // Search dashboardLeads first (dash-1, dash-2 etc.), then falls back to leads array
  let lead = null;
  if (typeof dashboardLeads !== "undefined") {
    lead = dashboardLeads.find(l => l.id == notif.leadId);
  }
  if (!lead && typeof leads !== "undefined") {
    lead = leads.find(l => l.id == notif.leadId);
  }
  if (!lead) { alert("Lead not found: " + notif.leadId); return; }

  if (typeof openRecruitingModal !== "function") {
    alert("Lead modal is not available.");
    return;
  }

  openRecruitingModal(lead);

  // Wait for modal to render, then expand the right section and scroll+highlight
  setTimeout(() => {
    // Remove any previous highlights
    document.querySelectorAll(".highlight-assigned").forEach(el => el.classList.remove("highlight-assigned"));

    const target = document.getElementById(notif.sectionId);
    if (!target) return;

    // Walk up parents inside modal and expand dept-sections + collapsible-sections
    let parent = target.parentElement;
    while (parent) {
      if (parent.id === "recruitingModal") break;

      if (parent.classList.contains("dept-section") && parent.classList.contains("collapsed")) {
        // Use the official toggle function to open it properly
        const deptId = parent.dataset.dept;
        if (deptId && typeof toggleDepartment === "function") {
          toggleDepartment(deptId);
        } else {
          parent.classList.remove("collapsed");
          parent.classList.add("open");
        }
      }

      if (parent.classList.contains("collapsible-section") && !parent.classList.contains("open")) {
        parent.classList.add("open");
      }

      parent = parent.parentElement;
    }

    // Extra delay for animations to finish before scrolling
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("highlight-assigned");

      // Auto-remove highlight after 4 seconds
      setTimeout(() => {
        target.classList.remove("highlight-assigned");
      }, 4000);
    }, 300);

  }, 600);
}

function handleNotifAccept(notifId) {
  const notif = window.demoNotifications.find(n => n.id === notifId);
  if (!notif) return;

  notif.status = "accepted";

  // Search dashboardLeads first, then leads
  let lead = null;
  if (typeof dashboardLeads !== "undefined") lead = dashboardLeads.find(l => l.id == notif.leadId);
  if (!lead && typeof leads !== "undefined") lead = leads.find(l => l.id == notif.leadId);
  if (lead) {
    lead.status = "Recruiting Request for Approval";
    if (typeof renderBoard === "function") renderBoard();
    if (typeof renderDashboardLeads === "function") renderDashboardLeads();
  }

  _animateAndRemoveNotifCard(notifId, 'accepted');
}

function handleNotifDecline(notifId) {
  const notif = window.demoNotifications.find(n => n.id === notifId);
  if (!notif) return;
  notif.status = "declined";
  _animateAndRemoveNotifCard(notifId, 'declined');
}

function _animateAndRemoveNotifCard(notifId, finalStatus) {
  // Find the card element — button has onclick with notifId
  const listEl = document.getElementById("inboxList");
  if (!listEl) { renderNotifications(); return; }

  // Find which card contains a button with this notifId
  const buttons = listEl.querySelectorAll(`button[onclick*="'${notifId}'"]`);
  const card = buttons.length > 0 ? buttons[0].closest(".notif-card") : null;

  if (!card) { renderNotifications(); return; }

  // Show a brief status badge before removing
  const actionsDiv = card.querySelector(".notif-card-actions");
  if (actionsDiv) {
    const isAccepted = finalStatus === 'accepted';
    actionsDiv.innerHTML = `
      <div class="notif-card-status ${finalStatus}" style="width:100%; justify-content:center;">
        ${isAccepted ? '✓ Accepted' : '✕ Declined'}
      </div>`;
  }

  // Animate: scale down slightly, then fade out and collapse height
  card.style.transition = 'transform 0.15s ease, opacity 0.4s ease, max-height 0.4s ease, margin 0.4s ease, padding 0.4s ease';
  card.style.transform = 'scale(0.97)';

  setTimeout(() => {
    card.style.opacity = '0';
    card.style.maxHeight = card.offsetHeight + 'px';
    // trigger reflow
    card.offsetHeight;
    card.style.maxHeight = '0';
    card.style.marginBottom = '0';
    card.style.padding = '0';
    card.style.overflow = 'hidden';
  }, 200);

  setTimeout(() => {
    card.remove();
    // If no more cards, show empty state
    const remaining = listEl.querySelectorAll(".notif-card");
    if (remaining.length === 0) {
      listEl.innerHTML = `
        <div style="padding: 32px 16px; text-align: center; color: var(--muted);">
          <div style="font-size: 36px; margin-bottom: 12px; opacity: 0.4;">📋</div>
          <div style="font-weight: 600; font-size: 14px;">No assignments yet</div>
        </div>`;
    }
  }, 700);
}
