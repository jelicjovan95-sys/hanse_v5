let isDirty = false;
let currentActiveLead = null;

function openRecruitingModal(lead, expanded = true, startChat = false) {
  currentActiveLead = lead;
  const modal = document.getElementById('modalBackdropRecruiting');
  const container = document.querySelector('.modal-recruiting');
  const right = document.querySelector('.modal-right-recruiting');

  if (modal) modal.dataset.currentLeadId = lead.id;

  expanded = true;

  lead.lastViewed = new Date().getTime();
  if (typeof renderDashboardLeads === 'function') renderDashboardLeads();
  if (typeof renderFunnel === 'function') renderFunnel();

  if (startChat && isMobile()) {
      if (modal) modal.classList.add('chat-only');
      const chatTitle = document.querySelector('.chat-title-recruiting');
      if (chatTitle) {
          chatTitle.innerHTML = `
            <div style="font-size:18px; font-weight:800; color:#fff; margin-bottom:4px;">${lead.firstName} ${lead.lastName || ''}</div>
            <a href="tel:${lead.phone}" class="chat-call-btn-mobile">📞 Call Now</a>
          `;
      }
  } else {
      if (modal) modal.classList.remove('chat-only');
      const chatTitle = document.querySelector('.chat-title-recruiting');
      if (chatTitle) chatTitle.textContent = 'CHAT & ACTIVITY';
  }

  if (container) container.classList.remove('mini');
  if (right) right.style.display = '';

  const title = document.querySelector('.modal-title-recruiting');
  if (title) title.textContent = lead.firstName + (lead.lastName ? ' ' + lead.lastName : '');

  _renderFullModal(lead);
  
  if (modal) {
    modal.classList.add('open');
    document.body.classList.add('lead-modal-open');
  }
}

// Helper functions from ORIGINAL
function calculateDeptProgress(deptFields, leadData) {
  if (!deptFields || deptFields.length === 0) return 0;
  let completed = 0;
  deptFields.forEach(field => {
    if (leadData[field] && leadData[field] !== '') completed++;
  });
  return Math.round((completed / deptFields.length) * 100);
}

function progressCircle(percentage) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return `
        <svg width="42" height="42" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="${radius}" fill="none" stroke="rgba(15, 23, 42, .08)" stroke-width="4"/>
          <circle cx="21" cy="21" r="${radius}" fill="none" stroke="#2f5ea9" stroke-width="4"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                  stroke-linecap="round" style="transition: stroke-dashoffset 0.5s ease;"/>
        </svg>
      `;
}

function createDeptSection(deptId, icon, title, subtitle, progress, content, isLocked = false) {
  return `
        <div class="dept-section ${isLocked ? 'locked' : ''} collapsed" id="dept-${deptId}" data-dept="${deptId}">
          <div class="dept-header" onclick="toggleDepartment('${deptId}')">
            <div class="dept-header-left">
              <div class="dept-icon">${icon}</div>
              <div class="dept-title-wrap">
                <div class="dept-title">${title}</div>
                <div class="dept-subtitle">${subtitle}</div>
              </div>
            </div>
            <div class="dept-progress-wrap">
              ${isLocked ? '<span class="dept-locked-badge">🔒 Locked</span>' : ''}
              <div class="dept-progress-circle">
                ${progressCircle(progress)}
                <div class="dept-progress-text">${progress}%</div>
              </div>
              <div class="dept-toggle">▼</div>
            </div>
          </div>
          <div class="dept-content" style="padding-top: 10px; padding-bottom: 20px;">
            ${content}
          </div>
        </div>
      `;
}

function toggleDepartment(deptId) {
  const section = document.getElementById(`dept-${deptId}`);
  if (section && !section.classList.contains('locked')) {
    section.classList.toggle('collapsed');
  }
}

// MY NEW HELPERS
function toggleSection(headerElement) {
    const section = headerElement.parentElement;
    section.classList.toggle('open');
}

function handleDrop(e, type, element) {
    e.preventDefault();
    element.classList.remove('dragover');
    isDirty = true;
    
    if (type === 'cdl') {
        document.querySelector('.cdl-num').value = 'B5551234';
        document.querySelector('.cdl-exp').value = '2028-10-15';
        document.querySelector('.cdl-dob').value = '1985-05-20';
        document.querySelector('.cdl-state').value = 'TX';
        document.querySelector('.cdl-type').value = 'Class A';
        document.querySelector('.cdl-end').value = 'T, N';
        element.style.borderColor = '#10b981';
        element.style.background = 'rgba(16, 185, 129, 0.05)';
    } else if (type === 'medical' || type === 'mvr') {
        const today = new Date().toISOString().split('T')[0];
        element.querySelector('input').value = today;
        element.style.borderColor = '#10b981';
    } else if (type === 'registration') {
        const inputs = element.parentElement.querySelectorAll('input[type="text"]');
        inputs[0].value = 'Freightliner';
        inputs[1].value = '1FUJG6B9XKL123456';
        inputs[2].value = 'Cascadia';
        inputs[3].value = '2021';
        inputs[4].value = 'TX-8942A';
        element.style.borderColor = '#10b981';
    }
}

function saveLead(leadId) {
    const leadArr = (typeof leads !== 'undefined' ? leads : (typeof dashboardLeads !== 'undefined' ? dashboardLeads : []));
    const lead = leadArr.find(l => l.id == leadId);
    
    if (lead) {
        lead.lastEdited = new Date().getTime();
        if (lead.column !== 'new-leads') {
            const index = leadArr.findIndex(l => l.id == leadId);
            if (index > -1) {
                leadArr.splice(index, 1);
                leadArr.unshift(lead);
            }
        }
    }
    isDirty = false;
    
    if (typeof renderFunnel === 'function') renderFunnel();
    if (typeof renderDashboardLeads === 'function') renderDashboardLeads();
    
    closeRecruitingModal();
}

function generateMasterFormsLink(leadId) {
    const wrapper = document.getElementById(`masterFormsWrapper-${leadId}`);
    if (!wrapper) return;
    
    const mockToken = Math.random().toString(36).substr(2, 9);
    const mockLink = `https://hanse.com/forms/${leadId}?t=${mockToken}`;
    
    wrapper.innerHTML = `
        <div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;">
            <input type="text" class="field-input" value="${mockLink}" readonly style="flex: 1; font-family: monospace; font-size: 13px; color: var(--blue);" onclick="this.select()">
            <button class="nav-btn" title="Copy Link" onclick="navigator.clipboard.writeText('${mockLink}'); const old=this.innerHTML; this.innerHTML='✅'; setTimeout(()=>this.innerHTML=old, 1500);">📋</button>
            <button class="nav-btn" title="Preview / Edit Forms" style="font-size: 14px;" onclick="alert('Simulacija: Otvara se editor formi pre slanja vozaču.')">📝</button>
            <button class="nav-btn" title="Regenerate" onclick="generateMasterFormsLink('${leadId}')">🔄</button>
        </div>
    `;
    isDirty = true;
}

function generateAgreementsLink(leadId) {
    const wrapper = document.getElementById(`agreementsWrapper-${leadId}`);
    if (!wrapper) return;
    
    const mockToken = Math.random().toString(36).substr(2, 9);
    const mockLink = `https://hanse.com/agreements/${leadId}?t=${mockToken}`;
    
    wrapper.innerHTML = `
        <div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;">
            <input type="text" class="field-input" value="${mockLink}" readonly style="flex: 1; font-family: monospace; font-size: 13px; color: var(--purple);" onclick="this.select()">
            <button class="nav-btn" title="Copy Link" onclick="navigator.clipboard.writeText('${mockLink}'); const old=this.innerHTML; this.innerHTML='✅'; setTimeout(()=>this.innerHTML=old, 1500);">📋</button>
            <button class="nav-btn" title="Preview / Edit Agreements" style="font-size: 14px;" onclick="alert('Simulacija: Otvara se editor ugovora pre slanja vozaču.')">📝</button>
            <button class="nav-btn" title="Regenerate" onclick="generateAgreementsLink('${leadId}')">🔄</button>
        </div>
    `;
    isDirty = true;
}

function navigateLead(direction) {
    if (isDirty) {
        if (!confirm("Save changes before returning?")) return;
        isDirty = false;
    }
    const leadArr = (typeof leads !== 'undefined' ? leads : (typeof dashboardLeads !== 'undefined' ? dashboardLeads : []));
    if (!currentActiveLead || leadArr.length === 0) return;
    
    let currentList = leadArr;
    if (currentActiveLead.column) {
       currentList = leadArr.filter(l => l.column === currentActiveLead.column);
    }
    
    const currentIndex = currentList.findIndex(l => l.id == currentActiveLead.id);
    if (currentIndex === -1) return;
    
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < currentList.length) {
        openRecruitingModal(currentList[newIndex]);
    }
}

function _renderFullModal(lead) {
  const content = document.getElementById('modalContentRecruiting');
  if (!content) return;

  const topActions = document.querySelector('.top-actions-recruiting');
  if (topActions) {
    topActions.innerHTML = `
      <div class="nav-arrows" style="padding: 0 24px 16px; margin-top: -10px;">
          <button class="nav-btn" id="prevLeadBtn" onclick="navigateLead(-1)">←</button>
          <button class="nav-btn" id="nextLeadBtn" onclick="navigateLead(1)">→</button>
      </div>
    `;
  }

  const tagsHtml = (lead.tags || []).map(tag =>
    `<span class="tag ${typeof getTagClass === 'function' ? getTagClass(tag) : ''}">${tag} <span class="tag-remove" onclick="removeTagFromLead('${lead.id}', '${tag}', event)">×</span></span>`
  ).join('');

  const actionButtonsHTML = `
        <div class="modal-actions-row">
          <button class="modal-action-btn" onclick="window.location.href='tel:${lead.phone}'">📞 Call</button>
          <button class="modal-action-btn" onclick="openLeadChat('${lead.id}', '${lead.firstName}')">💬 Message</button>
          <button class="modal-action-btn" onclick="window.location.href='mailto:${lead.email}'">✉️ Email</button>
          <button class="modal-action-btn" onclick="try{document.getElementById('followUpPicker').showPicker()}catch(e){document.getElementById('followUpPicker').click()}">⏰ Follow Up</button>
          <input type="datetime-local" id="followUpPicker" style="height:0; width:0; border:0; padding:0; opacity:0; position:absolute; pointer-events:none;">
          <button class="modal-action-btn">👤 Assign</button>
          ${tagsHtml ? `<div style="width:1px; height:24px; background:#e2e8f0; margin:0 4px"></div>` : ''}
          ${tagsHtml}
          <div class="add-tag-btn" onclick="toggleTagMenu(event, '${lead.id}')">+</div>
        </div>
        <div class="field-label" style="margin-top:20px;">STATUS CHANGE : TIME STAMPED</div>
        <div style="height: 16px"></div>
  `;

  // --- RECRUITING FIELDS ---
  const recruitingFields = `
        <div class="collapsible-section open">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Personal Info</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="form-grid-3">
                  <div class="field">
                    <div class="field-label">First Name *</div>
                    <input type="text" class="field-input" value="${lead.firstName || ''}" onchange="isDirty=true">
                  </div>
                  <div class="field">
                    <div class="field-label">Middle Name</div>
                    <input type="text" class="field-input" value="" placeholder="Optional" onchange="isDirty=true">
                  </div>
                  <div class="field">
                    <div class="field-label">Last Name *</div>
                    <input type="text" class="field-input" value="${lead.lastName || ''}" onchange="isDirty=true">
                  </div>
                </div>
                <div class="form-grid-2">
                  <div class="field">
                    <div class="field-label">Email *</div>
                    <input type="email" class="field-input" value="${lead.email || ''}" onchange="isDirty=true">
                  </div>
                  <div class="field">
                    <div class="field-label">Phone Number *</div>
                    <input type="tel" class="field-input" value="${lead.phone || ''}" onchange="isDirty=true">
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Home Town</div>
                  <input type="text" class="field-input" value="${lead.homeTown || ''}" onchange="isDirty=true">
                </div>
            </div>
        </div>
        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Driver Intake</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="form-grid-2">
                  <div class="field">
                    <div class="field-label">Category *</div>
                    <select class="field-select" onchange="isDirty=true">
                        <option ${lead.category === 'Company Driver' ? 'selected' : ''}>Company Driver</option>
                        <option ${lead.category === 'Lease to purchase' ? 'selected' : ''}>Lease to purchase</option>
                        <option ${lead.category === 'Independent Contractor' ? 'selected' : ''}>Independent Contractor</option>
                        <option ${lead.category === 'Driving for Owner' ? 'selected' : ''}>Driving for Owner</option>
                    </select>
                  </div>
                  <div class="field">
                    <div class="field-label">Pay Type *</div>
                    <input type="text" class="field-input" value="${lead.payType || ''}" onchange="isDirty=true">
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">Type of Trailer Pulled</div>
                  <select class="field-select" onchange="isDirty=true">
                        <option>Dry Van</option>
                        <option>Reefer</option>
                        <option>Flatbed</option>
                        <option>Step Deck</option>
                  </select>
                </div>
                <div class="field" style="margin-top: 8px;">
                    <label style="font-size: 13px; font-weight: 600; cursor: pointer;">
                        <input type="checkbox" onchange="isDirty=true"> Has Own Trailer
                    </label>
                </div>
            </div>
        </div>
  `;
  const recruitingProgress = calculateDeptProgress(['firstName', 'lastName', 'email', 'phone', 'category'], lead);
  const recruitingHTML = createDeptSection('recruiting', '👥', 'Recruiting', 'Personal & Driver Information', recruitingProgress, recruitingFields);

  // --- SAFETY FIELDS ---
  const safetyFields = `
        <div class="collapsible-section open">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Documentation</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="cdl-bracket" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'cdl', this);">
                    <div style="font-size: 11px; font-weight: 800; color: var(--blue); margin-bottom: 12px; letter-spacing: 1px;">COMMERCIAL DRIVER LICENSE (CDL)</div>
                    <div class="form-grid-3">
                      <div class="field">
                        <div class="field-label">Number</div>
                        <input type="text" class="field-input cdl-num" value="" placeholder="Drag CDL here..." onchange="isDirty=true">
                      </div>
                      <div class="field">
                        <div class="field-label">Expiration</div>
                        <input type="date" class="field-input cdl-exp" value="" onchange="isDirty=true">
                      </div>
                      <div class="field">
                        <div class="field-label">DOB</div>
                        <input type="date" class="field-input cdl-dob" value="" onchange="isDirty=true">
                      </div>
                    </div>
                    <div class="form-grid-3">
                      <div class="field">
                        <div class="field-label">State</div>
                        <input type="text" class="field-input cdl-state" value="" onchange="isDirty=true">
                      </div>
                      <div class="field">
                        <div class="field-label">Type</div>
                        <input type="text" class="field-input cdl-type" value="" onchange="isDirty=true">
                      </div>
                      <div class="field">
                        <div class="field-label">Endorsements</div>
                        <input type="text" class="field-input cdl-end" value="" onchange="isDirty=true">
                      </div>
                    </div>
                    <button class="copy-btn">Copy CDL Info</button>
                </div>

                <div class="dnd-grid">
                    <div class="dnd-zone" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'medical', this);">
                        <div class="dnd-text">Drop Medical Report</div>
                        <input type="date" class="field-input" style="margin-top:10px;" onchange="isDirty=true">
                    </div>
                    <div class="dnd-zone" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'mvr', this);">
                        <div class="dnd-text">Drop MVR</div>
                        <input type="date" class="field-input" style="margin-top:10px;" onchange="isDirty=true">
                    </div>
                    <div class="dnd-zone">
                        <div class="dnd-text">Upload SSN</div>
                        <input type="password" class="field-input" style="margin-top:10px;" placeholder="SSN Number" onchange="isDirty=true">
                    </div>
                </div>
            </div>
        </div>

        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Application & Background</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="form-grid-2">
                    <div class="field">
                        <div class="field-label">Clearinghouse Status</div>
                        <select class="field-select" onchange="isDirty=true">
                            <option>Clear</option>
                            <option>Prohibited</option>
                            <option>Pending</option>
                        </select>
                    </div>
                    <div class="field">
                        <div class="field-label">Clearinghouse Date</div>
                        <input type="date" class="field-input" onchange="isDirty=true">
                    </div>
                </div>
                
                <div class="section-title" style="margin-top: 16px;">Agreements</div>
                <div class="dnd-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 12px; gap: 12px;">
                    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" id="cb-ic-${lead.id}" checked onchange="isDirty=true"> Independent Contractor
                    </label>
                    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" id="cb-lease-${lead.id}" onchange="isDirty=true"> Lease Agreement
                    </label>
                    <label style="font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" id="cb-manual-${lead.id}" checked disabled> Driver Manual (Auto)
                    </label>
                </div>

                <div id="agreementsWrapper-${lead.id}" style="margin-bottom: 24px;">
                    <button class="master-forms-btn" style="background: #3498db; border-color: #3498db;" onclick="generateAgreementsLink('${lead.id}')">🔗 Generate Agreements Link</button>
                </div>

                <div class="section-title" style="margin-top: 16px;">Master Forms</div>
                <div id="masterFormsWrapper-${lead.id}">
                    <button class="master-forms-btn" onclick="generateMasterFormsLink('${lead.id}')">🔗 Generate link for Master Forms</button>
                </div>
            </div>
        </div>
  `;
  const safetyProgress = calculateDeptProgress(['ssn', 'clearinghouse', 'driverStatus'], lead);
  const safetyHTML = createDeptSection('safety', '🛡️', 'Safety / Compliance', 'Documents & Testing', safetyProgress, safetyFields);

  // --- FLEET FIELDS ---
  const fleetFields = `
        <div class="collapsible-section open">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Truck Assignment</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="field" style="background: rgba(15,23,42,0.02); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                    <div class="field-label">Equipment Ownership</div>
                    <div style="display: flex; gap: 16px; margin-top: 8px;">
                        <label style="font-size: 13px; font-weight: 600; cursor: pointer;">
                            <input type="radio" name="ownership" value="company" checked onchange="isDirty=true"> Company Equipment
                        </label>
                        <label style="font-size: 13px; font-weight: 600; cursor: pointer;">
                            <input type="radio" name="ownership" value="driver" onchange="isDirty=true"> Driver's Equipment
                        </label>
                    </div>
                </div>

                <div class="field">
                  <div class="field-label">Assign Truck (Company)</div>
                  <select class="field-select" onchange="isDirty=true">
                    <option>Select Unit...</option>
                    <option>Unit #101 - 2020 Freightliner Cascadia</option>
                    <option>Unit #102 - 2021 Kenworth W900</option>
                  </select>
                </div>

                <div class="dnd-zone" style="margin-bottom: 16px; min-height: 80px;" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'registration', this);">
                    <div class="dnd-text">Driver's Equipment: Drag & Drop Registration / Cabcard</div>
                </div>
                
                <div class="form-grid-2">
                  <div class="field">
                    <div class="field-label">Make</div>
                    <input type="text" class="field-input" value="${lead.truckMake || ''}" placeholder="Auto-fill" onchange="isDirty=true">
                  </div>
                  <div class="field">
                    <div class="field-label">VIN</div>
                    <input type="text" class="field-input" value="" placeholder="Auto-fill" onchange="isDirty=true">
                  </div>
                </div>
                
                <div class="form-grid-3">
                  <div class="field">
                    <div class="field-label">Model</div>
                    <input type="text" class="field-input" value="${lead.truckModel || ''}" placeholder="Auto-fill" onchange="isDirty=true">
                  </div>
                  <div class="field">
                    <div class="field-label">Year</div>
                    <input type="text" class="field-input" value="${lead.truckYear || ''}" placeholder="Auto-fill" onchange="isDirty=true">
                  </div>
                  <div class="field">
                    <div class="field-label">Plate #</div>
                    <input type="text" class="field-input" value="" placeholder="Auto-fill" onchange="isDirty=true">
                  </div>
                </div>
                
                <div class="form-grid-2">
                  <div class="field">
                    <div class="field-label">DOT Inspection Expiration</div>
                    <input type="date" class="field-input" value="${lead.dotInspection || ''}" onchange="isDirty=true">
                  </div>
                </div>
                
                <div class="section-title">Truck Extras (Auto-generated Permits & COI)</div>
                <div class="dnd-grid" style="grid-template-columns: repeat(2, 1fr);">
                    <label style="font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" checked onchange="isDirty=true"> ELD Installed
                    </label>
                    <label style="font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" onchange="isDirty=true"> Camera
                    </label>
                    <label style="font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" onchange="isDirty=true"> GPS
                    </label>
                    <label style="font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" onchange="isDirty=true"> PrePass
                    </label>
                </div>
            </div>
        </div>

        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Trailer Info</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="form-grid-2">
                  <div class="field">
                    <label style="font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" onchange="isDirty=true"> Vented Trailer
                    </label>
                  </div>
                  <div class="field">
                    <select class="field-select" onchange="isDirty=true">
                        <option>Wooden</option>
                        <option>Plated</option>
                    </select>
                  </div>
                </div>
            </div>
        </div>
  `;
  const fleetProgress = calculateDeptProgress(['truckMake', 'vin', 'unitNumber'], lead);
  const fleetHTML = createDeptSection('fleet', '🚛', 'Fleet', 'Truck & Trailer Assignment', fleetProgress, fleetFields, false);

  // --- ACCOUNTING FIELDS ---
  const accountingFields = `
        <div class="collapsible-section open">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Payroll & Finance</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="field">
                    <div class="field-label">Banking Information</div>
                    <input type="password" class="field-input" placeholder="••••••••" onchange="isDirty=true">
                </div>
                <div class="dnd-grid">
                    <div class="dnd-zone">
                        <div class="dnd-text">Upload W9 / W4</div>
                    </div>
                    <div class="dnd-zone">
                        <div class="dnd-text">Upload Statements</div>
                    </div>
                </div>
            </div>
        </div>
  `;
  const accountingProgress = calculateDeptProgress(['bankingInfo', 'w9w4Forms'], lead);
  const accountingHTML = createDeptSection('accounting', '💰', 'Accounting', 'Payroll & Finance', accountingProgress, accountingFields, false);

  content.innerHTML = actionButtonsHTML + recruitingHTML + safetyHTML + fleetHTML + accountingHTML + `
        <div style="padding: 0 16px 20px;">
            <button class="master-forms-btn" style="background: var(--blue);" onclick="saveLead('${lead.id}')">💾 Save Changes</button>
        </div>
  `;
}

function closeRecruitingModal() {
  if (isDirty) {
      if (!confirm("Save changes before returning?")) return;
  }
  isDirty = false;
  const modal = document.getElementById('modalBackdropRecruiting');
  if (modal) modal.classList.remove('open');
  document.body.classList.remove('lead-modal-open');
}

const closeBtnRec = document.getElementById('closeBtnRecruiting');
if (closeBtnRec) closeBtnRec.onclick = closeRecruitingModal;

const backdropRec = document.getElementById('modalBackdropRecruiting');
if (backdropRec) {
  backdropRec.onclick = (e) => {
    if (e.target === backdropRec) closeRecruitingModal();
  };
}
