/* company-profile.js */

const mockCompanies = [
  {
    id: 'unitedws',
    name: "UnitedWS",
    subtitle: "Operations Dashboard",
    dot: "3431464",
    mc: "MC-1111903",
    status: "Active",
    type: "Carrier",
    enabledModules: ["Executive", "Lead Dashboard", "Recruiting", "Safety", "Fleet", "Accounting", "Company Info", "Insurance", "Departments", "Drivers", "Equipment", "Yards", "Brokers"]
  },
  {
    id: 'hanse',
    name: "Hanse",
    subtitle: "Recruitment Dashboard",
    status: "Active",
    type: "Recruiting",
    enabledModules: ["Executive", "Lead Dashboard", "Performance", "Recruiting", "Notification Center"]
  },
  {
    id: 'atlas',
    name: "Atlas Freight",
    subtitle: "Carrier Dashboard",
    dot: "2850019",
    mc: "MC-987654",
    status: "Pending",
    type: "Carrier",
    enabledModules: ["Executive", "Safety", "Fleet", "Drivers", "Equipment", "Documents"]
  },
  {
    id: 'blueline',
    name: "BlueLine Logistics",
    subtitle: "Brokerage Dashboard",
    mc: "MC-456221",
    status: "Active",
    type: "Brokerage",
    enabledModules: ["Executive", "Lead Dashboard", "Performance", "Accounting", "Reports"]
  },
  {
    id: 'primesafety',
    name: "Prime Safety Group",
    subtitle: "Safety Dashboard",
    status: "Active",
    type: "Safety",
    enabledModules: ["Executive", "Safety", "Documents", "Reports"]
  },
  {
    id: 'demo',
    name: "Demo Carrier LLC",
    subtitle: "Demo Workspace",
    dot: "0000000",
    mc: "MC-000000",
    status: "Inactive",
    type: "Carrier",
    enabledModules: ["Executive", "Company Info"]
  }
];

// Profile specific data for each company
const companyProfileData = {
  'unitedws': {
    company: {
      legalName: "UNITEDWS INC",
      displayName: "UnitedWS",
      subtitle: "Operations Dashboard",
      mc: "MC-1111903",
      dot: "3431464",
      entityType: "Carrier",
      usdotStatus: "Active",
      oosDate: "None",
      legalName: "UNITEDWS INC",
      dbaName: "UnitedWS",
      physicalAddress: "24530 GOSLING RD APT 813, SPRING, TX 77389",
      mailingAddress: "24530 GOSLING RD APT 813, SPRING, TX 77389",
      phone: "(407) 725-0662",
      email: "info@unitedwsusa.com",
      usdotStatus: "Active",
      dot: "3431484",
      mc: "MC-1111903",
      powerUnits: "66",
      drivers: "66",
      mcs150Date: "03/16/2026",
      mcs150Mileage: "5,280,652 (2025)",
      lastBiennialUpdate: "03/16/2026",
      biennialUpdateDue: "04/30/2028",
      entityType: "CARRIER",
      opAuthorityStatus: "AUTHORIZED FOR: Motor Carrier of Property",
      carrierOp: "Interstate",
      cargo: "General Freight, Household Goods",
      operationClass: "Auth. For Hire"
    },
    insurance: {
      active: {
        company: "MS Transverse Specialty Insurance Company",
        policy: "TS TS CA0000166 01",
        form: "BMC-91X Primary",
        filed: "$1,000,000.00",
        status: "Active",
        received: "01/15/2026",
        effective: "01/19/2026",
        end: "",
        agentName: "John Smith",
        agentPhone: "(888) 555-0123",
        agentEmail: "john.smith@mstransverse.com"
      },
      history: [
        { company: "MS Transverse", policy: "TS TS CA0000166 00", form: "BMC-91X", filed: "$1,000,000", status: "Cancelled", received: "12/9/2025", effective: "12/9/2025", cancelled: "1/19/2026" },
        { company: "MS Transverse", policy: "TS TS CA0000166 00", form: "BMC-91X", filed: "$1,000,000", status: "Cancelled", received: "12/9/2025", effective: "12/9/2025", cancelled: "2/4/2026" },
        { company: "MS Transverse", policy: "TS TS CA0000166 00", form: "BMC-91X", filed: "$1,000,000", status: "Cancelled", received: "4/11/2025", effective: "4/10/2025", cancelled: "12/9/2025" },
        { company: "Agricultural Workers", policy: "AGPGA1-00105-01", form: "BMC-91X", filed: "$1,000,000", status: "Cancelled", received: "1/17/2024", effective: "1/19/2024", cancelled: "1/19/2025" },
        { company: "National Specialty", policy: "CAR140000021", form: "BMC-91X", filed: "$1,000,000", status: "Cancelled", received: "10/26/2023", effective: "10/31/2023", cancelled: "1/19/2024" }
      ]
    },
    departments: [
      {
        name: "Dispatch",
        members: [
          { name: "Milos Cicic", nick: "Mike Jones", phone: "(832) 626-5110", email: "mike@unitedwsusa.com", role: "Dispatcher", status: "active" },
          { name: "Dusan Todorovic", nick: "Duke Todorovic", phone: "(832) 924-4686", email: "duke@unitedwsusa.com", role: "Dispatcher", status: "active" },
          { name: "Mladen Savic", nick: "Mike Savic", phone: "(832) 446-0238", email: "mladen@unitedwsusa.com", role: "Dispatcher", status: "active" },
          { name: "Bojan Kolaris", nick: "Charlie Jones", phone: "(281) 475-8756", email: "", role: "Dispatcher", status: "pending" },
          { name: "Djordje Stanojevic", nick: "Scott Dell", phone: "(281) 602-2032", email: "", role: "Dispatcher", status: "missing" },
          { name: "Milos Stevanovic", nick: "Blake Smith", phone: "(281) 602-2004", email: "", role: "Dispatcher", status: "active" },
          { name: "Lazar Stojanovic", nick: "Randy Sones", phone: "(832) 478-4172", email: "", role: "Dispatcher", status: "active" },
          { name: "Milos Delevic", nick: "Wayne Delevic", phone: "(832) 482-2275", email: "", role: "Dispatcher", status: "active" },
          { name: "Vuk Vukanic", nick: "Vuk Vukanic", phone: "(832) 482-1893", email: "", role: "Dispatcher", status: "active" },
          { name: "Nikola Banjac", nick: "Jake Banjac", phone: "(832) 446-0267", email: "", role: "Dispatcher", status: "active" }
        ]
      },
      {
        name: "Tracking / After",
        members: [
          { name: "Aleksa", nick: "Alex", phone: "(346) 398-6757", email: "", role: "Tracker", status: "active" },
          { name: "Jovan", nick: "Michael", phone: "", email: "", role: "Tracker", status: "missing" },
          { name: "Nenad Radokanovic", nick: "Joshua Rock", phone: "(346) 398-6757", email: "", role: "Tracker", status: "missing" },
          { name: "Milos Djordjevic", nick: "Mitchell", phone: "", email: "", role: "Tracker", status: "missing" },
          { name: "Mitar", nick: "Gregg", phone: "", email: "", role: "Tracker", status: "missing" }
        ]
      },
      {
        name: "Fleet Management",
        members: [
          { name: "Nemanja Radivojevic", nick: "Tom Radivojevic", phone: "(469) 983-3274", email: "", role: "Fleet Manager", status: "active" },
          { name: "Nikola", nick: "", phone: "", email: "", role: "Fleet Agent", status: "missing" }
        ]
      },
      {
        name: "Safety",
        members: [
          { name: "Luka Perkovic", nick: "Luka Smith", phone: "", email: "", role: "Safety Manager", status: "active" },
          { name: "Ognjen Djordjevic", nick: "Owen Baxter", phone: "(832) 446-0235", email: "", role: "Safety Agent", status: "active" },
          { name: "Bojana Kuzmanovic", nick: "Bojana Kuzmanovic", phone: "", email: "", role: "Safety Agent", status: "active" }
        ]
      },
      {
        name: "Accounting",
        members: [
          { name: "Tamara Miskovic", nick: "Tamara", phone: "", email: "", role: "Accountant", status: "active" },
          { name: "Stefan Stojakovic", nick: "Stefan", phone: "", email: "", role: "Accountant", status: "active" },
          { name: "Ana Petrovic", nick: "Ana", phone: "(346) 443-2267", email: "", role: "Accountant", status: "active" },
          { name: "Nikolina Gavrilovic", nick: "Nicole", phone: "(832) 482-2756", email: "", role: "Accountant", status: "active" }
        ]
      },
      {
        name: "ELD",
        members: [
          { name: "Stefan Arsic", nick: "ELD", phone: "(832) 658-2526", email: "", role: "ELD Manager", status: "active" }
        ]
      },
      {
        name: "Operations",
        members: [
          { name: "Marko Petrovic", nick: "Matt", phone: "", email: "", role: "Operations", status: "active" },
          { name: "Zoran Todorovic", nick: "Zack Jones", phone: "(832) 742-4099", email: "", role: "Operations", status: "active" },
          { name: "Vladimir Cerovic", nick: "Nick Rogers", phone: "(832) 533-3361", email: "", role: "Operations", status: "active" },
          { name: "Milan Milicevic", nick: "Milan", phone: "(469) 638-9797", email: "", role: "Operations", status: "active" },
          { name: "Dejan Jager", nick: "Dan", phone: "", email: "", role: "Operations", status: "active" },
          { name: "Nemanja Kostic", nick: "Nash", phone: "", email: "", role: "Operations", status: "active" }
        ]
      }
    ],
    yards: [
      { address: "3600 Kell Dr, Euless, TX 76040", notes: "spots: 2, 3", type: "Yard" },
      { address: "12855 Calloway Cemetery Rd, Euless, TX 76040", notes: "8+ spots", type: "Yard" },
      { address: "1011 Rankin Rd, Houston, TX 77073", notes: "spot 112", type: "Yard" },
      { address: "1911 W Main St, La Porte, TX 77571", notes: "middle row and right of entrance", type: "Parking" },
      { address: "6825 US Hwy 87 E suite f, San Antonio, TX", notes: "shop in San Antonio", type: "Shop" }
    ],
    schedule: [
      { date: "05/30–05/31", shift1: "Blake switch", shift2: "Joshua" },
      { date: "06/06–06/07", shift1: "Mike J", shift2: "Jake switch" },
      { date: "06/13–06/14", shift1: "Charlie switch", shift2: "Duke switch" },
      { date: "06/20–06/21", shift1: "Randy", shift2: "Mike" }
    ],
    brokers: [
      { name: "Summit11", reason: "Lifetime ban", mc: "", severity: "Lifetime Ban" },
      { name: "Scotlynn", reason: "Lifetime ban", mc: "", severity: "Lifetime Ban" },
      { name: "High Tide", reason: "unethical business / called driver / lied", mc: "", severity: "Internal Issue" },
      { name: "CW Carrier", reason: "unethical business practices", mc: "", severity: "Avoid" }
    ]
  },
  'hanse': {
    company: { legalName: "HANSE LLC", displayName: "Hanse", subtitle: "Recruitment Dashboard", dot: "0000000", mc: "MC-000000", usdotStatus: "Active", drivers: 0, powerUnits: 0 },
    insurance: { active: null, history: [] }, departments: [], yards: [], schedule: [], brokers: []
  }
  // Others fall back to generic
};

let activeCompanyId = 'unitedws';

// Global API
window.toggleWorkspaceDropdown = function() {
  const dd = document.getElementById('workspaceDropdown');
  if (dd.style.display === 'none') {
    dd.style.display = 'flex';
  } else {
    dd.style.display = 'none';
  }
};

window.addEventListener('click', (e) => {
  if (!e.target.closest('#workspaceSelector')) {
    const dd = document.getElementById('workspaceDropdown');
    if (dd) dd.style.display = 'none';
  }
});

window.openCompanyProfile = function() {
  if(typeof switchView === 'function') switchView('company-profile');
  document.getElementById('company-profile-view').style.display = 'block';
  renderCompanyProfile();
};

window.openCompanySwitcher = function() {
  document.getElementById('companySwitcherModal').style.display = 'flex';
  renderSwitcherList();
};

window.closeCompanySwitcher = function() {
  document.getElementById('companySwitcherModal').style.display = 'none';
};

window.openCompanySettings = function() {
  document.getElementById('companySettingsModal').style.display = 'flex';
};

window.closeCompanySettings = function() {
  document.getElementById('companySettingsModal').style.display = 'none';
};

window.openRequestAccess = function() {
  document.getElementById('requestAccessModal').style.display = 'flex';
};

window.closeRequestAccess = function() {
  document.getElementById('requestAccessModal').style.display = 'none';
};

window.openLeaveModal = function() {
  document.getElementById('leaveCompanyModal').style.display = 'flex';
};

const cpAllExistingEmployees = [
  { name: "Milos Cicic", email: "mike@unitedwsusa.com", phone: "(832) 626-5110" },
  { name: "John Doe", email: "john@hanse.com", phone: "(555) 123-4567" },
  { name: "Aleksa", email: "aleksa@unitedwsusa.com", phone: "(346) 398-6757" },
  { name: "Jane Smith", email: "jane@hanse.com", phone: "(555) 987-6543" },
  { name: "Stefan Arsic", email: "stefan@unitedwsusa.com", phone: "(832) 658-2526" },
  { name: "Luka Perkovic", email: "luka@unitedwsusa.com", phone: "(832) 111-2222" },
  { name: "Nemanja Radivojevic", email: "nemanja@unitedwsusa.com", phone: "(469) 983-3274" },
  { name: "Tamara Miskovic", email: "tamara@unitedwsusa.com", phone: "(346) 222-3333" }
];

window.searchExistingEmployeesForModal = function(query) {
  const container = document.getElementById('empSearchResults');
  if (!container) return;
  const q = (query || '').toLowerCase().trim();
  
  let html = '';
  if (q.length === 0) {
    html = `<div style="color:var(--text-muted); font-size:13px; text-align:center; margin-top:50px;">Type to search existing profiles...</div>`;
    container.innerHTML = html;
    return;
  }
  
  const filtered = cpAllExistingEmployees.filter(e => 
    e.name.toLowerCase().includes(q) || 
    e.email.toLowerCase().includes(q) || 
    e.phone.includes(q)
  );
  
  if (filtered.length === 0) {
    html = `<div style="color:var(--text-muted); font-size:13px; text-align:center; margin-top:50px;">No matching profiles found.</div>`;
  } else {
    filtered.forEach(e => {
      html += `
        <div style="display:flex; align-items:center; gap:12px; padding:8px; border-bottom:1px solid var(--border); cursor:pointer;" onclick="this.style.background='rgba(47,94,169,0.05)'">
          <input type="radio" name="selectedExistingEmp" value="${e.name}">
          <div>
            <div style="font-size:13px; font-weight:600;">${e.name}</div>
            <div style="font-size:11px; color:var(--text-muted);">${e.email} | ${e.phone}</div>
          </div>
        </div>
      `;
    });
  }
  container.innerHTML = html;
};

window.openInviteModal = function(empId) {
  document.getElementById('leaveCompanyModal').style.display = 'flex';
};

window.closeLeaveModal = function() {
  document.getElementById('leaveCompanyModal').style.display = 'none';
};

window.switchCompany = function(id) {
  activeCompanyId = id;
  const comp = mockCompanies.find(c => c.id === id);
  if (comp) {
    document.getElementById('workspaceName').textContent = comp.name;
    document.getElementById('workspaceSubtitle').textContent = comp.subtitle;
    document.getElementById('workspaceIcon').textContent = comp.name.substring(0,2).toUpperCase();
  }
  closeCompanySwitcher();
  if (document.getElementById('company-profile-view').style.display === 'block') {
    renderCompanyProfile();
  }
};

window.toggleCpSection = function(el) {
  const parent = el.closest('.cp-section, .cp-dept-card');
  if (parent.classList.contains('expanded')) {
    parent.classList.remove('expanded');
  } else {
    parent.classList.add('expanded');
  }
};

// Render Logic
function renderSwitcherList(filter = '') {
  const container = document.getElementById('cpSwitcherList');
  if(!container) return;
  container.innerHTML = '';
  mockCompanies.forEach(c => {
    if (filter && !c.name.toLowerCase().includes(filter.toLowerCase())) return;
    const isSelected = c.id === activeCompanyId;
    let badgeColor = c.status === 'Active' ? 'green' : (c.status === 'Pending' ? 'yellow' : 'gray');
    
    container.innerHTML += `
      <div class="cp-switcher-row ${isSelected ? 'selected' : ''}" onclick="switchCompany('${c.id}')">
        <div>
          <div style="font-weight:600; color:var(--text);">${c.name}</div>
          <div style="font-size:12px; color:var(--text-muted);">${c.subtitle} ${c.dot ? '| DOT: ' + c.dot : ''}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="cp-badge ${badgeColor}">${c.status}</span>
          ${isSelected ? '<span style="color:var(--primary); font-weight:bold;">✓</span>' : ''}
        </div>
      </div>
    `;
  });
}

function renderCompanyProfile() {
  const container = document.getElementById('company-profile-view');
  if (!container) return;
  
  const data = companyProfileData[activeCompanyId] || companyProfileData['hanse'];
  const comp = data.company;
  const ins = data.insurance;
  
  let html = `
    <div class="cp-header">
      <div>
        <div class="cp-title-row">
          <h1>${comp.displayName}</h1>
          ${comp.dot ? `<span class="cp-badge gray">DOT: ${comp.dot}</span>` : ''}
          ${comp.mc ? `<span class="cp-badge gray">${comp.mc}</span>` : ''}
          <span class="cp-badge green">${comp.usdotStatus || 'Active'}</span>
        </div>
        <div class="cp-stats-row">
          <span>Power Units: <b>${comp.powerUnits}</b></span>
          <span>Drivers: <b>${comp.drivers}</b></span>
          <span>Last Update: <b>${comp.lastBiennialUpdate || 'N/A'}</b></span>
        </div>
      </div>
      <div class="cp-actions">
        <button class="cp-btn">Edit Company</button>
      </div>
    </div>
    
    <!-- FMCSA Section -->
    <div class="cp-section expanded">
      <div class="cp-section-header" onclick="toggleCpSection(this)">
        <div class="cp-section-title">Company Overview / FMCSA</div>
        <div class="cp-section-summary">Entity: ${comp.entityType || 'Carrier'} | Authority: ${comp.opAuthorityStatus || 'Authorized'}</div>
      </div>
      <div class="cp-section-content">
        <div class="cp-grid-3">
          <div class="cp-field"><label>Legal Name</label><div class="val">${comp.legalName}</div></div>
          <div class="cp-field"><label>DBA Name</label><div class="val">${comp.dbaName || 'N/A'}</div></div>
          <div class="cp-field"><label>Physical Address</label><div class="val">${comp.physicalAddress || 'N/A'}</div></div>
          <div class="cp-field"><label>Mailing Address</label><div class="val">${comp.mailingAddress || 'N/A'}</div></div>
          <div class="cp-field"><label>Phone</label><div class="val">${comp.phone || 'N/A'}</div></div>
          <div class="cp-field"><label>Email</label><div class="val">${comp.email || 'N/A'}</div></div>
          <div class="cp-field"><label>MCS-150 Date</label><div class="val">${comp.mcs150Date || 'N/A'}</div></div>
          <div class="cp-field"><label>MCS-150 Mileage</label><div class="val">${comp.mcs150Mileage || 'N/A'}</div></div>
          <div class="cp-field"><label>Operation Class</label><div class="val">${comp.operationClass || 'N/A'}</div></div>
          <div class="cp-field"><label>Carrier Operation</label><div class="val">${comp.carrierOp || 'N/A'}</div></div>
          <div class="cp-field"><label>Cargo</label><div class="val">${comp.cargo || 'N/A'}</div></div>
          <div class="cp-field"><label>Biennial Update Due</label><div class="val" style="color:rgb(185,28,28); font-weight:600;">${comp.biennialUpdateDue || 'N/A'}</div></div>
        </div>
      </div>
    </div>
  `;
  
  // Insurance
  if (ins && ins.active) {
    html += `
    <div class="cp-section">
      <div class="cp-section-header" onclick="toggleCpSection(this)">
        <div class="cp-section-title">Active Insurance <span class="cp-badge green">Active</span></div>
        <div class="cp-section-summary">${ins.active.company} - ${ins.active.policy}</div>
      </div>
      <div class="cp-section-content">
        <div class="cp-grid-3">
          <div class="cp-field"><label>Company</label><div class="val">${ins.active.company}</div></div>
          <div class="cp-field"><label>Policy #</label><div class="val">${ins.active.policy}</div></div>
          <div class="cp-field"><label>Form</label><div class="val">${ins.active.form}</div></div>
          <div class="cp-field"><label>Filed Amount</label><div class="val">${ins.active.filed}</div></div>
          <div class="cp-field"><label>Effective Date</label><div class="val">${ins.active.effective}</div></div>
        </div>
        
        <div style="background: var(--background); padding: 16px; border-radius: 8px; margin-top: 20px; border: 1px solid var(--border);">
          <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Agent Information</div>
          <div class="cp-grid-3">
            <div class="cp-field" style="margin-bottom:0;"><label>Name</label><div class="val">${ins.active.agentName || 'N/A'}</div></div>
            <div class="cp-field" style="margin-bottom:0;"><label>Phone</label><div class="val">${ins.active.agentPhone || 'N/A'}</div></div>
            <div class="cp-field" style="margin-bottom:0;"><label>Email</label><div class="val">${ins.active.agentEmail || 'N/A'}</div></div>
          </div>
        </div>
        <div class="cp-dept-card" style="margin-top:24px;">
          <div class="cp-dept-header" onclick="toggleCpSection(this)">
            <div style="font-weight:600;">Existing Filings (History)</div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:12px; color:var(--text-muted);">${ins.history.length} records</span>
              <span style="font-size:12px;">▼</span>
            </div>
          </div>
          <div class="cp-dept-body">
        <div style="max-height:200px; overflow-y:auto;">
          <table class="cp-table">
            <thead>
              <tr><th>Company</th><th>Policy</th><th>Form</th><th>Filed</th><th>Status</th><th>Effective</th><th>Cancelled</th></tr>
            </thead>
            <tbody>
              ${ins.history.map(h => `
                <tr>
                  <td>${h.company}</td><td>${h.policy}</td><td>${h.form}</td><td>${h.filed}</td>
                  <td><span class="cp-badge ${h.status === 'Active' ? 'green' : 'gray'}">${h.status}</span></td>
                  <td>${h.effective}</td><td>${h.cancelled || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  
  // Departments & Employees
  let totalMembers = data.departments.reduce((acc, d) => acc + d.members.length, 0);
  html += `
      <div class="cp-section">
      <div class="cp-section-header" onclick="toggleCpSection(this)">
        <div class="cp-section-title">Departments & Team Members</div>
        <div class="cp-section-summary" style="display:flex; align-items:center; gap:16px;">
          <span>${data.departments.length} Departments · ${totalMembers} Employees</span>
          <button class="cp-btn primary" onclick="event.stopPropagation(); openAddEmployeeModal()" style="padding:4px 10px; font-size:12px; display:flex; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
            Add Employee
          </button>
        </div>
      </div>
      <div class="cp-section-content">
        <input type="text" placeholder="Search team members by name, nickname, or role..." style="width:100%; padding:8px; border:1px solid var(--border); border-radius:4px; margin-bottom:16px;" onkeyup="searchCpEmployees(this.value)">
  `;
  
  data.departments.forEach(dept => {
    html += `
      <div class="cp-dept-card">
        <div class="cp-dept-header" onclick="toggleCpSection(this)">
          <div>
            ${dept.name} <span style="color:var(--text-muted); font-size:12px; margin-left:8px;">${dept.members.length} members</span>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <button class="cp-btn primary" onclick="event.stopPropagation(); openAddEmployeeModal('${dept.name}')" style="padding:4px 10px; font-size:12px; display:flex; align-items:center; gap:4px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
              Add Employee
            </button>
            <span style="font-size:12px;">▼</span>
          </div>
        </div>
        <div class="cp-dept-body">
          <div class="cp-member-grid">
    `;
    dept.members.forEach(m => {
      let initials = m.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase();
      
      let statusLabel = '';
      let statusColor = '';
      let actionBtn = '';
      
      if (m.status === 'active') {
        statusLabel = '<span style="color:rgb(21,128,61); font-weight:600; font-size:11px;">Active</span>';
        statusColor = 'active'; // green
      } else if (m.status === 'missing' || m.status === 'no_profile') {
        statusLabel = '<span style="color:rgb(100,116,139); font-weight:600; font-size:11px;">No Profile</span>';
        statusColor = 'missing'; // gray
        actionBtn = `<button class="cp-btn" style="padding:4px 8px; font-size:11px; margin-top:8px;" onclick="openInviteEmployeeModal('${m.name}', '${m.email}', '${dept.name}')">Invite</button>`;
      } else if (m.status === 'pending') {
        statusLabel = '<span style="color:rgb(161,98,7); font-weight:600; font-size:11px;">Pending Invite</span>';
        statusColor = 'pending'; // yellow
        actionBtn = `<button class="cp-btn" style="padding:4px 8px; font-size:11px; margin-top:8px;" onclick="openInviteEmployeeModal('${m.name}', '${m.email}', '${dept.name}')">Resend Invite</button>`;
      } else if (m.status === 'expired') {
        statusLabel = '<span style="color:rgb(185,28,28); font-weight:600; font-size:11px;">Expired Invite</span>';
        statusColor = 'missing'; // generic gray/red
        actionBtn = `<button class="cp-btn" style="padding:4px 8px; font-size:11px; margin-top:8px;" onclick="openInviteEmployeeModal('${m.name}', '${m.email}', '${dept.name}')">Resend Invite</button>`;
      }

      html += `
        <div class="cp-member-card" style="flex-direction:column; gap:12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; width:100%; align-items:flex-start;">
            <div style="display:flex; gap:12px; align-items:center; flex:1; min-width:0;">
              <div class="cp-avatar ${statusColor}">${initials}</div>
              <div class="cp-member-info" style="flex:1; min-width:0; overflow:hidden;">
                <h4 style="margin:0; font-size:14px; font-weight:600; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                  ${m.name} ${m.nick ? `<span style="color:var(--text-muted); font-weight:normal;">/ ${m.nick}</span>` : ''}
                </h4>
                <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                  <span>${m.role}</span>
                </div>
              </div>
            </div>
            <div style="position:relative; display:flex; justify-content:flex-end;">
              <div style="position:absolute; right:4px; top:0; pointer-events:none; font-weight:bold; font-size:16px; color:var(--text-muted);">⋮</div>
              <select style="width:24px; height:24px; opacity:0; cursor:pointer;" onchange="handleEmployeeAction(this, '${m.name}', '${dept.name}', '${m.role}')" title="Options">
                <option value="" disabled selected></option>
                <option value="view">View Profile</option>
                <option value="edit">Edit</option>
                <option value="move">Move Department</option>
                <option value="remove">Remove</option>
              </select>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; font-size:12px; color:var(--text-muted); border-top:1px dashed var(--border); padding-top:12px;">
             ${m.phone ? `<div style="display:flex; align-items:center; gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> ${m.phone}</div>` : ''}
             ${m.email ? `<div style="display:flex; align-items:center; gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ${m.email}</div>` : ''}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-top:4px;">
            ${statusLabel}
            ${actionBtn}
          </div>
        </div>
      `;
    });
    html += `
          </div>
        </div>
      </div>
    `;
  });
  
  html += `</div></div>`;
  
  // Drivers & Equipment
  html += `
    <div class="cp-grid-2">
      <div class="cp-section expanded">
        <div class="cp-section-header" onclick="toggleCpSection(this)">
          <div class="cp-section-title">Equipment / Units</div>
          <div class="cp-section-summary">Total: ${comp.powerUnits}</div>
        </div>
        <div class="cp-section-content">
          <input type="text" placeholder="Search by Unit # or Make..." style="width:100%; padding:8px; border:1px solid var(--border); border-radius:4px; margin-bottom:12px;" onkeyup="searchCpUnits(this.value)">
          <div style="max-height:200px; overflow-y:auto;">
            <table class="cp-table">
              <thead><tr><th>Unit #</th><th>Make</th><th>Status</th><th>Action</th></tr></thead>
              <tbody id="cp-units-tbody">
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div class="cp-section expanded">
        <div class="cp-section-header" onclick="toggleCpSection(this)">
          <div class="cp-section-title">Drivers</div>
          <div class="cp-section-summary">Total: ${comp.drivers}</div>
        </div>
        <div class="cp-section-content">
          <input type="text" placeholder="Search by Driver Name or Truck #..." style="width:100%; padding:8px; border:1px solid var(--border); border-radius:4px; margin-bottom:12px;" onkeyup="searchCpDrivers(this.value)">
          <div style="max-height:200px; overflow-y:auto;">
            <table class="cp-table">
              <thead><tr><th>Name</th><th>Truck #</th><th>Status</th><th>Action</th></tr></thead>
              <tbody id="cp-drivers-tbody">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  const brokers = data.brokers || [];
  html += `
    <div class="cp-section">
      <div class="cp-section-header" onclick="toggleCpSection(this)">
        <div class="cp-section-title">Banned Brokers</div>
        <div class="cp-section-summary" style="display:flex; align-items:center; gap:16px;">
          <span>${brokers.length} Bans</span>
          <button class="cp-btn primary" onclick="event.stopPropagation(); openAddBanModal()" style="padding:4px 10px; font-size:12px; display:flex; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
            Add Ban
          </button>
        </div>
      </div>
      <div class="cp-section-content">
        <input type="text" placeholder="Search bans by name, reason, or MC..." style="width:100%; padding:8px; border:1px solid var(--border); border-radius:4px; margin-bottom:12px;" onkeyup="searchCpBans(this.value)">
        <div style="max-height:300px; overflow-y:auto;">
          <table class="cp-table">
            <thead>
              <tr><th>Broker Name</th><th>MC #</th><th>Severity</th><th>Reason</th><th>Action</th></tr>
            </thead>
            <tbody id="cp-bans-tbody">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  
  // Render tables after injecting HTML
  searchCpUnits('');
  searchCpDrivers('');
  searchCpBans('');
}

// Additional Modal APIs

window.openAddEmployeeModal = function(preselectedDept) {
  document.getElementById('addEmployeeModal').style.display = 'flex';
  
  // Reset checkboxes
  document.querySelectorAll('.dept-checkbox').forEach(cb => cb.checked = false);
  document.querySelectorAll('.existing-dept-checkbox').forEach(cb => cb.checked = false);

  if (preselectedDept) {
    document.querySelectorAll('.dept-checkbox').forEach(cb => {
      if (cb.value === preselectedDept) cb.checked = true;
    });
    document.querySelectorAll('.existing-dept-checkbox').forEach(cb => {
      if (cb.value === preselectedDept) cb.checked = true;
    });
  }
  
  // Clear existing search
  searchExistingEmployeesForModal('');
};

window.closeAddEmployeeModal = function() {
  document.getElementById('addEmployeeModal').style.display = 'none';
};

window.switchAddEmployeeTab = function(tab) {
  const createTab = document.getElementById('addEmpTabCreate');
  const existingTab = document.getElementById('addEmpTabExisting');
  const createContent = document.getElementById('addEmpContentCreate');
  const existingContent = document.getElementById('addEmpContentExisting');
  
  if (tab === 'create') {
    createTab.style.borderBottomColor = 'var(--primary)';
    createTab.style.color = 'var(--text)';
    existingTab.style.borderBottomColor = 'transparent';
    existingTab.style.color = 'var(--text-muted)';
    createContent.style.display = 'block';
    existingContent.style.display = 'none';
  } else {
    existingTab.style.borderBottomColor = 'var(--primary)';
    existingTab.style.color = 'var(--text)';
    createTab.style.borderBottomColor = 'transparent';
    createTab.style.color = 'var(--text-muted)';
    existingContent.style.display = 'block';
    createContent.style.display = 'none';
  }
};

window.openInviteEmployeeModal = function(name, email, dept) {
  document.getElementById('inviteEmployeeModal').style.display = 'flex';
  document.getElementById('invEmpName').value = name;
  document.getElementById('invEmpEmail').value = email || '';
  document.getElementById('invEmpDept').value = dept;
};

window.closeInviteEmployeeModal = function() {
  document.getElementById('inviteEmployeeModal').style.display = 'none';
};

window.sendInviteEmployee = function() {
  const email = document.getElementById('invEmpEmail').value;
  if (!email) {
    alert('Please provide an email address before sending the invite.');
    return;
  }
  const name = document.getElementById('invEmpName').value;
  const dept = document.getElementById('invEmpDept').value;
  
  // Find employee and update status
  const cData = companyProfileData[activeCompanyId];
  if(cData) {
    const d = cData.departments.find(x => x.name === dept);
    if(d) {
      const emp = d.members.find(x => x.name === name);
      if(emp) {
        emp.status = 'pending';
        emp.email = email;
      }
    }
  }
  
  closeInviteEmployeeModal();
  if (typeof showToast === 'function') {
    showToast('Invite sent successfully to ' + email);
  } else {
    alert('Invite sent successfully to ' + email);
  }
  
  renderCompanyProfile();
};

window.handleEmployeeAction = function(selectEl, empName, deptName, role) {
  const action = selectEl.value;
  if (!action) return;
  selectEl.selectedIndex = 0; // reset
  
  if (action === 'view') {
    openLeadModal(empName, role || '');
  } else if (action === 'remove') {
    if(confirm(`Are you sure you want to remove ${empName} from ${deptName}?`)) {
      const cData = companyProfileData[activeCompanyId];
      if(cData) {
        const d = cData.departments.find(x => x.name === deptName);
        if(d) {
          d.members = d.members.filter(x => x.name !== empName);
          renderCompanyProfile();
        }
      }
    }
  } else if (action === 'move') {
    const newDept = prompt(`Move ${empName} to which department? (e.g. Safety, Dispatch, Operations)`);
    if(newDept) {
      const cData = companyProfileData[activeCompanyId];
      if(cData) {
        const oldD = cData.departments.find(x => x.name === deptName);
        const newD = cData.departments.find(x => x.name.toLowerCase() === newDept.toLowerCase());
        if(oldD && newD) {
          const emp = oldD.members.find(x => x.name === empName);
          if(emp) {
            oldD.members = oldD.members.filter(x => x.name !== empName);
            newD.members.push(emp);
            renderCompanyProfile();
          }
        } else {
          alert('Cannot move: Invalid department.');
        }
      }
    }
  }
};

window.searchCpEmployees = function(query) {
  const q = (query || '').toLowerCase().trim();
  const container = document.getElementById('company-profile-view');
  if (!container) return;
  
  const deptCards = container.querySelectorAll('.cp-dept-card');
  
  // If searching, auto-expand all departments
  if (q.length > 0) {
    deptCards.forEach(c => c.classList.add('expanded'));
  }

  const cards = container.querySelectorAll('.cp-member-card');
  cards.forEach(card => {
    if (q === '') {
      card.style.display = 'flex';
      return;
    }
    const text = card.innerText.toLowerCase();
    if (text.includes(q)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
};

const cpGlobalDrivers = [
  { name: "Rodelin Jean", truck: "4095", status: "Active" },
  { name: "John Smith", truck: "4096", status: "Active" },
  { name: "Milos Obilic", truck: "4100", status: "Pending" },
  { name: "Marko Kraljevic", truck: "4102", status: "Active" },
  { name: "William Wolfe", truck: "4105", status: "Active" }
];

const cpGlobalUnits = [
  { unit: "4095", make: "Freightliner", status: "Active" },
  { unit: "4096", make: "Volvo", status: "Active" },
  { unit: "4100", make: "Peterbilt", status: "Shop" },
  { unit: "4102", make: "Kenworth", status: "Active" },
  { unit: "4105", make: "Freightliner", status: "Active" }
];

window.searchCpDrivers = function(query) {
  const tbody = document.getElementById('cp-drivers-tbody');
  if (!tbody) return;
  const q = query.toLowerCase();
  const filtered = cpGlobalDrivers.filter(d => d.name.toLowerCase().includes(q) || d.truck.toLowerCase().includes(q));
  
  let html = '';
  filtered.forEach(d => {
    let color = d.status === 'Active' ? 'green' : (d.status === 'Shop' || d.status === 'Pending' ? 'orange' : 'gray');
    html += `
      <tr>
        <td>${d.name}</td><td>${d.truck}</td>
        <td><span class="cp-badge ${color}">${d.status}</span></td>
        <td><button class="cp-btn" style="padding:4px 8px; font-size:11px;" onclick="if(typeof openRecruitingModal === 'function') openRecruitingModal(); else alert('View Card opened for ${d.name}')">View Card</button></td>
      </tr>
    `;
  });
  if(filtered.length === 0) html = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No drivers found</td></tr>`;
  tbody.innerHTML = html;
};

window.searchCpUnits = function(query) {
  const tbody = document.getElementById('cp-units-tbody');
  if (!tbody) return;
  const q = query.toLowerCase();
  const filtered = cpGlobalUnits.filter(u => u.unit.toLowerCase().includes(q) || u.make.toLowerCase().includes(q));
  
  let html = '';
  filtered.forEach(u => {
    let color = u.status === 'Active' ? 'green' : (u.status === 'Shop' ? 'orange' : 'gray');
    html += `
      <tr>
        <td>${u.unit}</td><td>${u.make}</td>
        <td><span class="cp-badge ${color}">${u.status}</span></td>
        <td><button class="cp-btn" style="padding:4px 8px; font-size:11px;" onclick="if(typeof openRecruitingModal === 'function') openRecruitingModal(); else alert('View Card opened for Unit ${u.unit}')">View Card</button></td>
      </tr>
    `;
  });
  if(filtered.length === 0) html = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">No units found</td></tr>`;
  tbody.innerHTML = html;
};

// Banned Brokers Logic
window.searchCpBans = function(query) {
  const tbody = document.getElementById('cp-bans-tbody');
  if (!tbody) return;
  const cData = companyProfileData[activeCompanyId];
  if(!cData || !cData.brokers) return;
  
  const q = (query || '').toLowerCase().trim();
  const filtered = cData.brokers.filter(b => 
    b.name.toLowerCase().includes(q) || 
    (b.reason && b.reason.toLowerCase().includes(q)) || 
    (b.mc && b.mc.toLowerCase().includes(q))
  );
  
  let html = '';
  if (filtered.length === 0) {
    html = '<tr><td colspan="5" style="text-align:center; padding:16px; color:var(--text-muted);">No banned brokers found.</td></tr>';
  } else {
    filtered.forEach((b, idx) => {
      let badgeClass = 'gray';
      if (b.severity === 'Lifetime Ban') badgeClass = 'red';
      else if (b.severity === 'Internal Issue') badgeClass = 'yellow';
      else if (b.severity === 'Avoid') badgeClass = 'gray';
      
      html += `
        <tr>
          <td style="font-weight:600;">${b.name}</td>
          <td>${b.mc || '-'}</td>
          <td><span class="cp-badge ${badgeClass}">${b.severity}</span></td>
          <td style="max-width:300px; white-space:normal;">${b.reason}</td>
          <td>
            <select onchange="handleBanAction(this, ${idx})" style="background:transparent; border:none; cursor:pointer; font-weight:bold; appearance:none; outline:none;">
              <option value="" disabled selected>⋮</option>
              <option value="edit">Edit</option>
              <option value="remove">Remove Ban</option>
            </select>
          </td>
        </tr>
      `;
    });
  }
  tbody.innerHTML = html;
};

window.openAddBanModal = function(idx = null) {
  const modal = document.getElementById('addBanModal');
  const title = document.getElementById('addBanModalTitle');
  const idField = document.getElementById('banBrokerId');
  const nameField = document.getElementById('banBrokerName');
  const mcField = document.getElementById('banBrokerMc');
  const reasonField = document.getElementById('banBrokerReason');
  const severityField = document.getElementById('banBrokerSeverity');
  
  if (idx !== null) {
    const cData = companyProfileData[activeCompanyId];
    const b = cData.brokers[idx];
    title.textContent = 'Edit Banned Broker';
    idField.value = idx;
    nameField.value = b.name;
    mcField.value = b.mc || '';
    reasonField.value = b.reason || '';
    severityField.value = b.severity || 'Lifetime Ban';
  } else {
    title.textContent = 'Add Banned Broker';
    idField.value = '';
    nameField.value = '';
    mcField.value = '';
    reasonField.value = '';
    severityField.value = 'Lifetime Ban';
  }
  modal.style.display = 'flex';
};

window.closeAddBanModal = function() {
  document.getElementById('addBanModal').style.display = 'none';
};

window.saveBan = function() {
  const cData = companyProfileData[activeCompanyId];
  if(!cData) return;
  if(!cData.brokers) cData.brokers = [];
  
  const id = document.getElementById('banBrokerId').value;
  const name = document.getElementById('banBrokerName').value.trim();
  const mc = document.getElementById('banBrokerMc').value.trim();
  const reason = document.getElementById('banBrokerReason').value.trim();
  const severity = document.getElementById('banBrokerSeverity').value;
  
  if(!name) {
    alert("Broker Name is required.");
    return;
  }
  
  const broker = { name, mc, reason, severity };
  
  if (id !== '') {
    cData.brokers[id] = broker;
  } else {
    cData.brokers.push(broker);
  }
  
  closeAddBanModal();
  renderCompanyProfile();
};

window.handleBanAction = function(selectEl, idx) {
  const action = selectEl.value;
  selectEl.selectedIndex = 0;
  
  if (action === 'edit') {
    openAddBanModal(idx);
  } else if (action === 'remove') {
    if(confirm('Are you sure you want to remove this broker from the ban list?')) {
      const cData = companyProfileData[activeCompanyId];
      if(cData && cData.brokers) {
        cData.brokers.splice(idx, 1);
        renderCompanyProfile();
      }
    }
  }
};
