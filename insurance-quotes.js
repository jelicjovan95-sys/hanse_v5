// insurance-quotes.js

let iqMockAgents = [
  { id: 1, company: 'Progressive Insurance', name: 'John Smith', email: 'john.smith@progressive.com', phone: '(312) 555-1234', notes: 'Prefers 24hr turnaround' },
  { id: 2, company: 'Great West Casualty', name: 'Sarah Johnson', email: 'sarah@gwccnet.com', phone: '(402) 555-9876', notes: '' },
  { id: 3, company: 'OOIDA', name: 'Mike Thompson', email: 'quotes@ooida.com', phone: '(800) 444-5791', notes: 'Best for owner-operators' }
];

let iqMockUnits = [
  { id: 'U105', number: 'Unit #105', score: 88 },
  { id: 'U204', number: 'Unit #204', score: 91 },
  { id: 'U311', number: 'Unit #311', score: 75 },
  { id: 'U402', number: 'Unit #402', score: 95 }
];

let iqMockHistory = [
  { id: 1, date: 'May 18, 2026', agents: ['Progressive Insurance'], drivers: 5, units: 2, status: 'Waiting for Response', statusCls: 'status-waiting' },
  { id: 2, date: 'May 15, 2026', agents: ['Great West Casualty'], drivers: 3, units: 1, status: 'Quote Received', statusCls: 'status-received' }
];

let iqMockArchive = [];

let iqState = {
  requestType: 'Drivers + Units', // 'Drivers Only', 'Units Only', 'Drivers + Units'
  selectedDrivers: [],
  selectedUnits: [],
  selectedAgents: [],
  activeTab: 'history' // 'history', 'archive', or 'directory'
};

function initInsuranceQuotes() {
  const container = document.getElementById('insurance-quotes-view');
  if (!container) return;
  
  container.innerHTML = `
    <div class="iq-container">
      <!-- Left Column: Quote Builder -->
      <div class="iq-builder">
        <div class="iq-header">
          <h1>Insurance Quotes</h1>
          <p>Select drivers and units to request new quotes from insurance agents.</p>
        </div>

        <div class="iq-card">
          <div class="iq-card-title">1. Request Type</div>
          <div class="iq-radio-group">
            <label class="iq-radio-card ${iqState.requestType === 'Drivers Only' ? 'active' : ''}">
              <input type="radio" name="iqReqType" value="Drivers Only" ${iqState.requestType === 'Drivers Only' ? 'checked' : ''} onchange="iqSetRequestType(this.value)">
              <span class="iq-radio-label">Drivers Only</span>
            </label>
            <label class="iq-radio-card ${iqState.requestType === 'Units Only' ? 'active' : ''}">
              <input type="radio" name="iqReqType" value="Units Only" ${iqState.requestType === 'Units Only' ? 'checked' : ''} onchange="iqSetRequestType(this.value)">
              <span class="iq-radio-label">Units Only</span>
            </label>
            <label class="iq-radio-card ${iqState.requestType === 'Drivers + Units' ? 'active' : ''}">
              <input type="radio" name="iqReqType" value="Drivers + Units" ${iqState.requestType === 'Drivers + Units' ? 'checked' : ''} onchange="iqSetRequestType(this.value)">
              <span class="iq-radio-label">Drivers + Units</span>
            </label>
          </div>

          <div id="iqDriverSection" style="display: ${iqState.requestType === 'Units Only' ? 'none' : 'block'};">
            <div class="iq-card-title">2. Select Drivers</div>
            <div class="iq-input-wrap">
              <input type="text" class="iq-input" placeholder="Search driver by name..." onfocus="iqToggleDropdown('driverDropdown', true)" onkeyup="iqFilterDrivers(this.value)">
              <div class="iq-dropdown" id="driverDropdown">
                <!-- Populated by JS -->
              </div>
            </div>
            <div class="iq-chips-container" id="iqDriverChips"></div>
          </div>

          <div id="iqUnitSection" style="display: ${iqState.requestType === 'Drivers Only' ? 'none' : 'block'};">
            <div class="iq-card-title" id="iqUnitTitle">3. Select Units</div>
            <div class="iq-input-wrap">
              <input type="text" class="iq-input" placeholder="Search unit by number..." onfocus="iqToggleDropdown('unitDropdown', true)" onkeyup="iqFilterUnits(this.value)">
              <div class="iq-dropdown" id="unitDropdown">
                <!-- Populated by JS -->
              </div>
            </div>
            <div class="iq-chips-container" id="iqUnitChips"></div>
          </div>

          <div class="iq-card-title" id="iqRecipientTitle">4. Recipients</div>
          <div class="iq-input-wrap">
            <input type="text" class="iq-input" placeholder="Search agents or type email..." onfocus="iqToggleDropdown('agentDropdown', true)" onkeyup="iqFilterAgents(this.value)" onkeydown="iqHandleAgentEnter(event)">
            <div class="iq-dropdown" id="agentDropdown">
              <!-- Populated by JS -->
            </div>
          </div>
          <div class="iq-chips-container" id="iqAgentChips"></div>
        </div>

        <div class="iq-card">
          <div class="iq-card-title">Package Preview</div>
          <div class="iq-summary">
            <div class="iq-summary-grid">
              <div class="iq-summary-item" id="iqSummaryDrivers" style="display: ${iqState.requestType === 'Units Only' ? 'none' : 'flex'}">
                <span class="iq-section-label">Drivers Selected</span>
                <span class="iq-summary-val" id="iqValDrivers">0</span>
              </div>
              <div class="iq-summary-item" id="iqSummaryUnits" style="display: ${iqState.requestType === 'Drivers Only' ? 'none' : 'flex'}">
                <span class="iq-section-label">Units Selected</span>
                <span class="iq-summary-val" id="iqValUnits">0</span>
              </div>
              <div class="iq-summary-item" id="iqSummaryAvgDriver" style="display: ${iqState.requestType === 'Units Only' ? 'none' : 'flex'}">
                <span class="iq-section-label">Avg Driver Score</span>
                <span class="iq-summary-val" id="iqValAvgDriver">-</span>
              </div>
              <div class="iq-summary-item" id="iqSummaryAvgUnit" style="display: ${iqState.requestType === 'Drivers Only' ? 'none' : 'flex'}">
                <span class="iq-section-label">Avg Unit Score</span>
                <span class="iq-summary-val" id="iqValAvgUnit">-</span>
              </div>
              <div class="iq-summary-item">
                <span class="iq-section-label">Recipients</span>
                <span class="iq-summary-val" id="iqValRecipients" style="color: var(--iq-text);">0</span>
              </div>
            </div>
          </div>
          <button class="iq-btn iq-btn-primary" id="iqSendBtn" onclick="iqSendQuote()">📨 Send Quote Request</button>
        </div>
      </div>

      <!-- Right Column: Agent Directory & History -->
      <div class="iq-sidebar">
        <div class="iq-card" style="padding: 0; overflow: hidden;">
          <div class="iq-tabs" style="padding: 16px 24px 0; margin-bottom: 0;">
            <div class="iq-tab ${iqState.activeTab === 'history' ? 'active' : ''}" onclick="iqSwitchTab('history')">Request History</div>
            <div class="iq-tab ${iqState.activeTab === 'archive' ? 'active' : ''}" onclick="iqSwitchTab('archive')">Archive</div>
            <div class="iq-tab ${iqState.activeTab === 'directory' ? 'active' : ''}" onclick="iqSwitchTab('directory')">Agent Directory</div>
          </div>
          
          <div style="padding: 24px;" id="iqRightPanelContent">
            <!-- Populated by JS -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.iq-input-wrap')) {
      document.querySelectorAll('.iq-dropdown').forEach(el => el.classList.remove('open'));
    }
  });

  iqRenderAll();
}

function iqRenderAll() {
  iqRenderDriverDropdown();
  iqRenderUnitDropdown();
  iqRenderAgentDropdown();
  iqRenderChips();
  iqUpdatePreview();
  iqRenderRightPanel();
}

function iqToggleDropdown(id, show) {
  document.querySelectorAll('.iq-dropdown').forEach(el => {
    if (el.id !== id) el.classList.remove('open');
  });
  const el = document.getElementById(id);
  if (el) {
    if (show) el.classList.add('open');
    else el.classList.remove('open');
  }
}

function iqSetRequestType(type) {
  iqState.requestType = type;
  document.querySelectorAll('.iq-radio-card').forEach(el => {
    el.classList.remove('active');
    if (el.querySelector('input').value === type) el.classList.add('active');
  });
  
  document.getElementById('iqDriverSection').style.display = type === 'Units Only' ? 'none' : 'block';
  document.getElementById('iqUnitSection').style.display = type === 'Drivers Only' ? 'none' : 'block';
  document.getElementById('iqUnitTitle').innerText = type === 'Units Only' ? '2. Select Units' : '3. Select Units';
  document.getElementById('iqRecipientTitle').innerText = type === 'Drivers + Units' ? '4. Recipients' : '3. Recipients';
  
  document.getElementById('iqSummaryDrivers').style.display = type === 'Units Only' ? 'none' : 'flex';
  document.getElementById('iqSummaryUnits').style.display = type === 'Drivers Only' ? 'none' : 'flex';
  document.getElementById('iqSummaryAvgDriver').style.display = type === 'Units Only' ? 'none' : 'flex';
  document.getElementById('iqSummaryAvgUnit').style.display = type === 'Drivers Only' ? 'none' : 'flex';
  
  if (type === 'Units Only') iqState.selectedDrivers = [];
  if (type === 'Drivers Only') iqState.selectedUnits = [];
  
  iqRenderChips();
  iqUpdatePreview();
}

/* DRIVERS */
function iqRenderDriverDropdown(filter = '') {
  const dd = document.getElementById('driverDropdown');
  if (!dd) return;
  // Use existing dashboardLeads if available, else mock
  let allLeads = typeof dashboardLeads !== 'undefined' ? dashboardLeads : [];
  if (allLeads.length === 0) allLeads = [{ id: 'l1', firstName: 'John', lastName: 'Doe', safetyScore: 92 }, { id: 'l2', firstName: 'Alex', lastName: 'Rivera', safetyScore: 84 }, { id: 'l3', firstName: 'Tony', lastName: 'Williams', safetyScore: 68 }];
  
  // Map to include a consistent score so we can sort properly
  let processedLeads = allLeads.map(l => {
    if (!l.safetyScore) l.safetyScore = Math.floor(Math.random() * 30 + 70);
    return {
      ...l,
      name: l.firstName + ' ' + (l.lastName || ''),
      score: l.safetyScore
    };
  });
  
  // Sort by score descending
  processedLeads.sort((a, b) => b.score - a.score);

  let html = '';
  processedLeads.forEach(l => {
    if (l.name.toLowerCase().includes(filter.toLowerCase())) {
      const isSelected = iqState.selectedDrivers.find(d => d.id === l.id);
      html += `<div class="iq-dropdown-item" onclick="event.stopPropagation(); iqAddDriver('${l.id}', '${l.name}', ${l.score})" style="${isSelected ? 'background: #f0fdf4;' : ''}">
        <span>${isSelected ? '<span style="color:#10b981; font-weight:bold; margin-right:6px;">✓</span>' : ''}${l.name}</span>
        <span class="iq-score-badge">${l.score}</span>
      </div>`;
    }
  });
  dd.innerHTML = html || '<div style="padding:10px 14px; color:#94a3b8; font-size:13px;">No drivers found</div>';
}

function iqFilterDrivers(val) { iqRenderDriverDropdown(val); }

function iqAddDriver(id, name, score) {
  if (!iqState.selectedDrivers.find(d => d.id === id)) {
    iqState.selectedDrivers.push({ id, name, score });
    iqRenderChips();
    iqUpdatePreview();
    
    // Re-render dropdown to show the checkmark
    const filterInput = document.querySelector('#iqDriverSection .iq-input');
    if (filterInput) iqRenderDriverDropdown(filterInput.value);
  }
  // Remove the dropdown close so user can select multiple
  // iqToggleDropdown('driverDropdown', false);
}

function iqRemoveDriver(id) {
  iqState.selectedDrivers = iqState.selectedDrivers.filter(d => d.id !== id);
  iqRenderChips();
  iqUpdatePreview();
  const filterInput = document.querySelector('#iqDriverSection .iq-input');
  if (filterInput) iqRenderDriverDropdown(filterInput.value);
}

/* UNITS */
function iqRenderUnitDropdown(filter = '') {
  const dd = document.getElementById('unitDropdown');
  if (!dd) return;
  let html = '';
  
  // Sort by score descending
  const sortedUnits = [...iqMockUnits].sort((a, b) => b.score - a.score);
  
  sortedUnits.forEach(u => {
    if (u.number.toLowerCase().includes(filter.toLowerCase())) {
      const isSelected = iqState.selectedUnits.find(selected => selected.id === u.id);
      html += `<div class="iq-dropdown-item" onclick="event.stopPropagation(); iqAddUnit('${u.id}', '${u.number}', ${u.score})" style="${isSelected ? 'background: #f0fdf4;' : ''}">
        <span>${isSelected ? '<span style="color:#10b981; font-weight:bold; margin-right:6px;">✓</span>' : ''}${u.number}</span>
        <span class="iq-score-badge">${u.score}</span>
      </div>`;
    }
  });
  dd.innerHTML = html || '<div style="padding:10px 14px; color:#94a3b8; font-size:13px;">No units found</div>';
}

function iqFilterUnits(val) { iqRenderUnitDropdown(val); }

function iqAddUnit(id, number, score) {
  if (!iqState.selectedUnits.find(u => u.id === id)) {
    iqState.selectedUnits.push({ id, number, score });
    iqRenderChips();
    iqUpdatePreview();
    
    const filterInput = document.querySelector('#iqUnitSection .iq-input');
    if (filterInput) iqRenderUnitDropdown(filterInput.value);
  }
  // Remove the dropdown close so user can select multiple
  // iqToggleDropdown('unitDropdown', false);
}

function iqRemoveUnit(id) {
  iqState.selectedUnits = iqState.selectedUnits.filter(u => u.id !== id);
  iqRenderChips();
  iqUpdatePreview();
  const filterInput = document.querySelector('#iqUnitSection .iq-input');
  if (filterInput) iqRenderUnitDropdown(filterInput.value);
}

/* AGENTS */
function iqRenderAgentDropdown(filter = '') {
  const dd = document.getElementById('agentDropdown');
  if (!dd) return;
  let html = '';
  iqMockAgents.forEach(a => {
    const searchStr = (a.company + ' ' + a.name + ' ' + a.email).toLowerCase();
    if (searchStr.includes(filter.toLowerCase())) {
      html += `<div class="iq-dropdown-item" onclick="event.stopPropagation(); iqAddAgent('${a.id}', '${a.company}')">
        <div>
          <div style="font-weight:600; color:var(--iq-text);">${a.company}</div>
          <div style="font-size:12px; color:var(--iq-muted);">${a.email}</div>
        </div>
        <span style="font-size:16px; color:#cbd5e1;">+</span>
      </div>`;
    }
  });
  dd.innerHTML = html || `<div style="padding:10px 14px; color:#94a3b8; font-size:13px;">Press Enter to add custom email: ${filter}</div>`;
}

function iqFilterAgents(val) { iqRenderAgentDropdown(val); }

function iqHandleAgentEnter(e) {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    if (val && val.includes('@')) {
      iqAddAgent('custom_' + Date.now(), val);
      e.target.value = '';
      iqRenderAgentDropdown();
    }
  }
}

function iqAddAgent(id, name) {
  if (!iqState.selectedAgents.find(a => a.id === id)) {
    iqState.selectedAgents.push({ id, name });
    iqRenderChips();
    iqUpdatePreview();
  }
  iqToggleDropdown('agentDropdown', false);
}

function iqRemoveAgent(id) {
  iqState.selectedAgents = iqState.selectedAgents.filter(a => a.id !== id);
  iqRenderChips();
  iqUpdatePreview();
}

/* CHIPS & PREVIEW */
function iqRenderChips() {
  // Drivers
  const dChips = document.getElementById('iqDriverChips');
  if (dChips) {
    dChips.innerHTML = iqState.selectedDrivers.map(d => `
      <div class="iq-chip" onclick="if(typeof openRecruitingModal === 'function' && typeof dashboardLeads !== 'undefined') openRecruitingModal(dashboardLeads.find(l=>l.id==='${d.id}'))">
        ${d.name} <span style="color:var(--iq-muted)">(${d.score})</span>
        <span class="remove" onclick="event.stopPropagation(); iqRemoveDriver('${d.id}')">✕</span>
      </div>
    `).join('');
  }
  
  // Units
  const uChips = document.getElementById('iqUnitChips');
  if (uChips) {
    uChips.innerHTML = iqState.selectedUnits.map(u => `
      <div class="iq-chip" onclick="alert('Open Unit Card for ${u.number}')">
        ${u.number} <span style="color:var(--iq-muted)">(${u.score})</span>
        <span class="remove" onclick="event.stopPropagation(); iqRemoveUnit('${u.id}')">✕</span>
      </div>
    `).join('');
  }
  
  // Agents
  const aChips = document.getElementById('iqAgentChips');
  if (aChips) {
    aChips.innerHTML = iqState.selectedAgents.map(a => `
      <div class="iq-chip agent-chip">
        ${a.name}
        <span class="remove" onclick="iqRemoveAgent('${a.id}')">✕</span>
      </div>
    `).join('');
  }
}

function iqUpdatePreview() {
  document.getElementById('iqValDrivers').innerText = iqState.selectedDrivers.length;
  document.getElementById('iqValUnits').innerText = iqState.selectedUnits.length;
  document.getElementById('iqValRecipients').innerText = iqState.selectedAgents.length;
  
  const avgD = iqState.selectedDrivers.length ? Math.round(iqState.selectedDrivers.reduce((a,b)=>a+b.score, 0)/iqState.selectedDrivers.length) : '-';
  const avgU = iqState.selectedUnits.length ? Math.round(iqState.selectedUnits.reduce((a,b)=>a+b.score, 0)/iqState.selectedUnits.length) : '-';
  
  document.getElementById('iqValAvgDriver').innerText = avgD;
  document.getElementById('iqValAvgUnit').innerText = avgU;
  
  const sendBtn = document.getElementById('iqSendBtn');
  let canSend = false;
  if (iqState.selectedAgents.length > 0) {
    if (iqState.requestType === 'Drivers Only' && iqState.selectedDrivers.length > 0) canSend = true;
    if (iqState.requestType === 'Units Only' && iqState.selectedUnits.length > 0) canSend = true;
    if (iqState.requestType === 'Drivers + Units' && (iqState.selectedDrivers.length > 0 || iqState.selectedUnits.length > 0)) canSend = true;
  }
  sendBtn.disabled = !canSend;
}

function iqSendQuote() {
  const dCount = iqState.selectedDrivers.length;
  const uCount = iqState.selectedUnits.length;
  const aNames = iqState.selectedAgents.map(a => a.name).join(', ');
  
  alert(`Quote request generated and sent to:\n${aNames}\n\nIncluded: ${dCount} Drivers, ${uCount} Units`);
  
  // Add to history
  iqMockHistory.unshift({
    id: Date.now(),
    date: 'Just now',
    agents: iqState.selectedAgents.map(a => a.name),
    drivers: dCount,
    units: uCount,
    status: 'Sent',
    statusCls: 'status-sent'
  });
  
  // Reset
  iqState.selectedDrivers = [];
  iqState.selectedUnits = [];
  iqState.selectedAgents = [];
  iqRenderChips();
  iqUpdatePreview();
  
  iqState.activeTab = 'history';
  iqRenderRightPanel();
}

/* RIGHT PANEL (History & Directory) */
function iqSwitchTab(tab) {
  iqState.activeTab = tab;
  document.querySelectorAll('.iq-tab').forEach(el => {
    el.classList.remove('active');
    if (el.innerText.toLowerCase().includes(tab)) el.classList.add('active');
  });
  iqRenderRightPanel();
}

function iqRenderRightPanel() {
  const panel = document.getElementById('iqRightPanelContent');
  if (!panel) return;
  
  if (iqState.activeTab === 'history') {
    if (iqMockHistory.length === 0) {
      panel.innerHTML = `<div style="text-align:center; color:var(--iq-muted); padding: 40px 0;">No quote history yet</div>`;
      return;
    }
    
    panel.innerHTML = `<div class="iq-history-feed">
      ${iqMockHistory.map(h => {
        const isReceived = h.status === 'Quote Received';
        return `
        <div class="iq-history-card" style="position:relative; ${isReceived ? 'cursor: pointer; border-color: #dcfce7;' : ''}" ${isReceived ? `onclick="iqOpenQuoteEmailModal('${h.agents.join(', ')}', '${h.date}')" title="Click to view quote email"` : ''}>
          <div class="iq-history-header">
            <div class="iq-history-agents">📨 ${h.agents.join(', ')}</div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="iq-history-date">${h.date}</div>
              <button onclick="event.stopPropagation(); iqArchiveHistory(${h.id})" style="background:none; border:none; cursor:pointer; color:var(--iq-muted); font-size:16px;" title="Archive request">✕</button>
            </div>
          </div>
          <div class="iq-history-stats">
            <span>${h.drivers} Drivers</span>
            <span>${h.units} Units</span>
          </div>
          <div class="iq-status-badge ${h.statusCls}">${h.status}</div>
          ${isReceived ? `<div style="margin-top:12px; font-size:12px; color:#166534; font-weight:600; display:flex; align-items:center; gap:4px;"><span>📄 View Quote Details</span></div>` : ''}
        </div>
      `}).join('')}
    </div>`;
  } else if (iqState.activeTab === 'archive') {
    if (iqMockArchive.length === 0) {
      panel.innerHTML = `<div style="text-align:center; color:var(--iq-muted); padding: 40px 0;">Archive is empty</div>`;
      return;
    }
    
    panel.innerHTML = `<div class="iq-history-feed">
      ${iqMockArchive.map(h => {
        return `
        <div class="iq-history-card" style="opacity:0.7;">
          <div class="iq-history-header">
            <div class="iq-history-agents">📨 ${h.agents.join(', ')}</div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div class="iq-history-date">${h.date}</div>
              <button onclick="iqRestoreHistory(${h.id})" style="background:none; border:none; cursor:pointer; color:var(--iq-primary); font-size:12px; font-weight:600;" title="Restore request">Restore</button>
            </div>
          </div>
          <div class="iq-history-stats">
            <span>${h.drivers} Drivers</span>
            <span>${h.units} Units</span>
          </div>
          <div class="iq-status-badge ${h.statusCls}">${h.status}</div>
        </div>
      `}).join('')}
    </div>`;
  } else {
    // Directory
    panel.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:16px;">
        <input type="text" class="iq-input" placeholder="Search agents..." style="width: 60%; padding: 6px 12px;" onkeyup="iqFilterDirectory(this.value)">
        <button class="iq-btn iq-btn-secondary" style="padding: 6px 12px; font-size: 13px;" onclick="iqOpenAddAgentModal()">+ Add Agent</button>
      </div>
      <div class="iq-agent-list" id="iqAgentListContainer">
        ${iqRenderAgentListHTML(iqMockAgents)}
      </div>
    `;
  }
}

function iqRenderAgentListHTML(agents) {
  if (agents.length === 0) return '<div style="padding:20px; text-align:center; color:var(--iq-muted);">No agents found</div>';
  return agents.map(a => `
    <div class="iq-agent-item">
      <div class="iq-agent-info">
        <div class="iq-agent-company">${a.company}</div>
        <div class="iq-agent-details">${a.name} &bull; ${a.email}</div>
      </div>
      <div class="iq-agent-actions">
        <span class="iq-action-icon" title="Edit">✎</span>
        <span class="iq-action-icon" title="Delete">🗑</span>
      </div>
    </div>
  `).join('');
}

function iqFilterDirectory(val) {
  const container = document.getElementById('iqAgentListContainer');
  if (!container) return;
  const filtered = iqMockAgents.filter(a => (a.company + a.name + a.email).toLowerCase().includes(val.toLowerCase()));
  container.innerHTML = iqRenderAgentListHTML(filtered);
}

/* GLOBAL INTEGRATION HELPER */
window.iqAddDriverToPackage = function(leadId, name, score) {
  // If not passed, try to look up
  if (!name && typeof dashboardLeads !== 'undefined') {
    const l = dashboardLeads.find(x => x.id === leadId);
    if (l) {
      name = l.firstName + ' ' + (l.lastName || '');
      score = l.safetyScore || 85;
    }
  }
  
  if (name) {
    if (!iqState.selectedDrivers.find(d => d.id === leadId)) {
      iqState.selectedDrivers.push({ id: leadId, name: name, score: score || 85 });
    }
    // Switch to insurance quotes view if not already there
    const btns = document.querySelectorAll('[data-view="insurance-quotes"]');
    if (btns.length > 0) btns[0].click();
    
    // Re-render
    if (document.getElementById('iqDriverChips')) {
      iqRenderChips();
      iqUpdatePreview();
    } else {
      initInsuranceQuotes();
    }
  }
};

// Auto-init if view is active
document.addEventListener('DOMContentLoaded', () => {
  // Need to hook into the main view switcher
  const navBtns = document.querySelectorAll('.nav button[data-view]');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('data-view') === 'insurance-quotes') {
        const container = document.getElementById('insurance-quotes-view');
        if (container && container.innerHTML.trim() === '') {
          initInsuranceQuotes();
        }
      }
    });
  });
});

/* Add Agent Modal Logic */
function iqOpenAddAgentModal() {
  let modal = document.getElementById('iqAddAgentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'iqAddAgentModal';
    modal.className = 'modal-backdrop-recruiting';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal-recruiting-clean" style="max-width: 450px; width: 100%; background: #fff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); margin: auto;">
        <div style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin:0; font-size: 18px; color: var(--iq-text);">Add Insurance Agent</h2>
          <button onclick="iqCloseAddAgentModal()" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--iq-muted);">✕</button>
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label class="iq-section-label">Company Name</label>
            <input type="text" id="iqNewAgentCompany" class="iq-input" placeholder="e.g. Progressive">
          </div>
          <div>
            <label class="iq-section-label">Contact Name</label>
            <input type="text" id="iqNewAgentName" class="iq-input" placeholder="e.g. John Smith">
          </div>
          <div>
            <label class="iq-section-label">Email Address</label>
            <input type="email" id="iqNewAgentEmail" class="iq-input" placeholder="e.g. john@progressive.com">
          </div>
          <button class="iq-btn iq-btn-primary" onclick="iqSaveNewAgent()">Save Agent</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
    document.getElementById('iqNewAgentCompany').value = '';
    document.getElementById('iqNewAgentName').value = '';
    document.getElementById('iqNewAgentEmail').value = '';
  }
}

function iqCloseAddAgentModal() {
  const modal = document.getElementById('iqAddAgentModal');
  if (modal) modal.style.display = 'none';
}

function iqSaveNewAgent() {
  const company = document.getElementById('iqNewAgentCompany').value.trim();
  const name = document.getElementById('iqNewAgentName').value.trim();
  const email = document.getElementById('iqNewAgentEmail').value.trim();

  if (!company || !email) {
    alert('Please enter at least a company name and email.');
    return;
  }

  const newId = 'agent_' + Date.now();
  iqMockAgents.push({
    id: newId,
    company: company,
    name: name || '',
    email: email,
    phone: '',
    notes: ''
  });

  iqCloseAddAgentModal();
  iqRenderRightPanel(); // Refresh directory list
  iqRenderAgentDropdown(); // Refresh dropdown
}

/* View Quote Email Modal */
function iqOpenQuoteEmailModal(agentName, date) {
  let modal = document.getElementById('iqQuoteEmailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'iqQuoteEmailModal';
    modal.className = 'modal-backdrop-recruiting';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal-recruiting-clean" style="max-width: 600px; width: 100%; background: #fff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); margin: auto;">
        <div style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border-radius: 12px 12px 0 0;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; background:#e0f2fe; color:#0284c7; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px;">✉️</div>
            <div>
              <h2 style="margin:0; font-size: 16px; color: var(--iq-text);" id="iqQuoteModalTitle">Quote Details</h2>
              <div style="font-size:12px; color:var(--iq-muted);" id="iqQuoteModalDate"></div>
            </div>
          </div>
          <button onclick="document.getElementById('iqQuoteEmailModal').style.display='none'" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--iq-muted);">✕</button>
        </div>
        <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px; font-size: 14px; color: var(--iq-text); line-height: 1.6;">
          <div style="background: #f1f5f9; padding: 12px; border-radius: 8px;">
            <strong>From:</strong> <span id="iqQuoteModalFrom"></span><br>
            <strong>Subject:</strong> RE: Commercial Auto Quote Request - Hanse
          </div>
          <div style="padding-top: 8px; white-space: pre-line;">
            Hi Team,
            
            Thank you for reaching out. We have reviewed the drivers and units submitted in your recent request.
            
            Attached you will find the official quote package including the premium breakdown, coverages, and conditions.
            
            <strong>Total Estimated Premium:</strong> $14,250.00
            
            Please let me know if you have any questions or if you would like to proceed with binding this policy.
            
            Best regards,
            <span id="iqQuoteModalSignoff" style="font-weight:600;"></span>
          </div>
          <div style="margin-top: 16px; display:flex; gap:12px;">
            <div style="border:1px solid var(--iq-border); border-radius:6px; padding:12px; flex:1; display:flex; align-items:center; gap:8px; cursor:pointer;" onclick="alert('Downloading Quote PDF...')">
              <span style="font-size:24px; color:#ef4444;">📄</span>
              <div>
                <div style="font-weight:600; font-size:13px;">Hanse_Quote_Package.pdf</div>
                <div style="font-size:11px; color:var(--iq-muted);">1.2 MB</div>
              </div>
            </div>
            <div style="flex:1;"></div>
          </div>
          <div style="margin-top: 16px; border-top: 1px solid var(--iq-border); padding-top: 16px; display: flex; gap: 12px;">
            <button class="iq-btn iq-btn-secondary" style="flex:1; border-color: #cbd5e1; color: #475569;" onclick="alert('Opening Reply window...')">↩️ Reply</button>
            <button class="iq-btn iq-btn-secondary" style="flex:1; border-color: #cbd5e1; color: #475569;" onclick="alert('Opening Forward window...')">➡️ Forward</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  document.getElementById('iqQuoteModalTitle').innerText = 'Quote from ' + agentName;
  document.getElementById('iqQuoteModalDate').innerText = 'Received: ' + date;
  document.getElementById('iqQuoteModalFrom').innerText = agentName + ' <quotes@' + agentName.replace(/\s+/g, '').toLowerCase() + '.com>';
  document.getElementById('iqQuoteModalSignoff').innerText = agentName;
  
  modal.style.display = 'flex';
}

/* AI Archive Helpers */
function iqArchiveHistory(id) {
  const index = iqMockHistory.findIndex(h => h.id === id);
  if (index > -1) {
    const item = iqMockHistory.splice(index, 1)[0];
    iqMockArchive.unshift(item);
    iqRenderRightPanel();
  }
}

function iqRestoreHistory(id) {
  const index = iqMockArchive.findIndex(h => h.id === id);
  if (index > -1) {
    const item = iqMockArchive.splice(index, 1)[0];
    iqMockHistory.unshift(item);
    iqRenderRightPanel();
  }
}
