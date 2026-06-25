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
    
    // Auto-select the document type that was dropped (if applicable)
    if (element.id && element.id.startsWith('doc-card-')) {
        const parts = element.id.split('-');
        if (parts.length >= 4) {
            const leadId = parts.slice(3).join('-');
            selectDocType(type, leadId);
        }
    }
    
    if (type === 'cdl') {
        setTimeout(() => {
            const numEl = document.querySelector('.cdl-num');
            const expEl = document.querySelector('.cdl-exp');
            if (numEl) numEl.value = 'B5551234';
            if (expEl) expEl.value = '2028-10-15';
            const stateEl = document.querySelector('.cdl-state'); if(stateEl) stateEl.value = 'TX';
            const typeEl = document.querySelector('.cdl-type'); if(typeEl) typeEl.value = 'Class A';
            const endEl = document.querySelector('.cdl-end'); if(endEl) endEl.value = 'T, N';
        }, 350); // wait for fade transition to finish rendering HTML
        element.style.borderColor = '#10b981';
        element.style.background = 'rgba(16, 185, 129, 0.05)';
    } else if (type === 'medical' || type === 'mvr' || type === 'ssn') {
        element.style.borderColor = '#10b981';
        element.style.background = 'rgba(16, 185, 129, 0.05)';
    } else if (type === 'tickets' || type === 'claims' || type === 'dataq') {
        element.style.borderColor = '#10b981';
        element.style.background = 'rgba(16, 185, 129, 0.05)';
    } else if (type === 'registration') {
        const inputs = element.parentElement.querySelectorAll('input[type="text"]');
        if(inputs.length >= 5) {
            inputs[0].value = 'Freightliner';
            inputs[1].value = '1FUJG6B9XKL123456';
            inputs[2].value = 'Cascadia';
            inputs[3].value = '2021';
            inputs[4].value = 'TX-8942A';
        }
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

function generateJobAppLink(leadId) {
    const wrapper = document.getElementById(`jobAppWrapper-${leadId}`);
    if (!wrapper) return;
    
    const mockToken = Math.random().toString(36).substr(2, 9);
    const mockLink = `https://hanse.com/job-application/${leadId}?t=${mockToken}`;
    
    wrapper.innerHTML = `
        <div style="display: flex; gap: 8px; margin-top: 16px; align-items: center;">
            <input type="text" class="field-input" value="${mockLink}" readonly style="flex: 1; font-family: monospace; font-size: 13px; color: #e67e22;" onclick="this.select()">
            <button class="nav-btn" title="Copy Link" onclick="navigator.clipboard.writeText('${mockLink}'); const old=this.innerHTML; this.innerHTML='✅'; setTimeout(()=>this.innerHTML=old, 1500);">📋</button>
            <button class="nav-btn" title="Preview / Edit Job Application" style="font-size: 14px;" onclick="alert('Simulacija: Otvara se editor job aplikacije pre slanja vozaču.')">📝</button>
            <button class="nav-btn" title="Regenerate" onclick="generateJobAppLink('${leadId}')">🔄</button>
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
          <button class="modal-action-btn">👥 Assign</button>
          <div style="width:1px; height:24px; background:#e2e8f0; margin:0 4px"></div>
          <button class="modal-action-btn" onclick="iqAddDriverToPackage('${lead.id}')" style="background:#eff6ff; color:#1e3a8a; border-color:#bfdbfe;">📝 Quote</button>
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
                <div id="active-doc-panel-${lead.id}" class="active-doc-panel">
                    <!-- Dynamic content rendered here -->
                </div>

                <div class="doc-cards-grid">
                    <div id="doc-card-cdl-${lead.id}" class="doc-card active" style="background-color: #eaf2f8;" onclick="selectDocType('cdl', '${lead.id}')" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'cdl', this);">
                        <div class="dnd-text" style="color: #2980b9;">Drop CDL here</div>
                        <input type="date" class="field-input" style="margin-top:10px;" onclick="event.stopPropagation()" onchange="isDirty=true">
                    </div>
                    <div id="doc-card-mvr-${lead.id}" class="doc-card" style="background-color: #fef9e7;" onclick="selectDocType('mvr', '${lead.id}')" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'mvr', this);">
                        <div class="dnd-text" style="color: #d4ac0d;">Drop MVR here</div>
                        <input type="date" class="field-input" style="margin-top:10px;" onclick="event.stopPropagation()" onchange="isDirty=true">
                    </div>
                    <div id="doc-card-medical-${lead.id}" class="doc-card" style="background-color: #e9f7ef;" onclick="selectDocType('medical', '${lead.id}')" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'medical', this);">
                        <div class="dnd-text" style="color: #27ae60;">Drop Medical Report</div>
                        <input type="date" class="field-input" style="margin-top:10px;" onclick="event.stopPropagation()" onchange="isDirty=true">
                    </div>
                    <div id="doc-card-ssn-${lead.id}" class="doc-card" style="background-color: #f4ecf7;" onclick="selectDocType('ssn', '${lead.id}')" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'ssn', this);">
                        <div class="dnd-text" style="color: #9b59b6;">Upload SSN</div>
                        <input type="password" class="field-input" style="margin-top:10px;" placeholder="SSN Number" onclick="event.stopPropagation()" onchange="isDirty=true">
                    </div>
                    <div id="doc-card-clearinghouse-${lead.id}" class="doc-card" style="background-color: #fdf2e9;" onclick="selectDocType('clearinghouse', '${lead.id}')" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'clearinghouse', this);">
                        <div class="dnd-text" style="color: #e67e22;">Clearinghouse</div>
                        <input type="date" class="field-input" style="margin-top:10px;" onclick="event.stopPropagation()" onchange="isDirty=true">
                    </div>
                </div>
                <!-- Need a small script to bootstrap the first render -->
                <img src onerror="selectDocType('cdl', '${lead.id}')" style="display:none;">
                
                <div class="section-title" style="margin-top: 24px; margin-bottom: 12px; text-transform: uppercase; font-size: 13px; font-weight: bold;">Job Application</div>
                <div id="jobAppWrapper-${lead.id}" style="margin-bottom: 8px;">
                    <button class="master-forms-btn" style="background: #e67e22; border-color: #e67e22; margin-top: 0;" onclick="generateJobAppLink('${lead.id}')">🔗 Generate Job Application Link</button>
                </div>
            </div>
        </div>

        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Binder</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div style="padding: 16px;">
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:10px;">
                        ${[
                          { name: 'CDL', status: 'valid', checkable: false },
                          { name: 'MEDICAL', status: 'valid', checkable: false },
                          { name: 'Truck Reg', status: 'valid', checkable: false },
                          { name: 'Trailer Reg', status: 'valid', checkable: false },
                          { name: 'Truck Insp', status: 'valid', checkable: false },
                          { name: 'Trailer Insp', status: 'valid', checkable: false },
                          { name: 'Lease Agreement', status: 'valid', checkable: false },
                          { name: 'Insurance', status: 'valid', checkable: true },
                          { name: 'MC Letter', status: 'valid', checkable: true },
                          { name: 'ELD Manual', status: 'valid', checkable: true },
                          { name: 'Paper Logs', status: 'missing', checkable: true },
                          { name: 'IFTA License', status: 'valid', checkable: true },
                          { name: 'IFTA Stickers', status: 'expiring', checkable: true },
                          { name: 'Plate Truck', status: 'valid', checkable: true },
                          { name: 'Plate Trailer', status: 'valid', checkable: true },
                          { name: 'Warning Triangles & Fire Ext', status: 'valid', checkable: true }
                        ].map(item => {
                          let badgeHtml = '';
                          let checked = item.status === 'valid' ? 'checked' : '';
                          if (item.checkable) {
                             badgeHtml = `<input type="checkbox" ${checked} style="width:16px; height:16px; cursor:pointer;" onclick="event.stopPropagation()">`;
                          } else {
                             if (item.status === 'valid') badgeHtml = '<span class="ms-doc-badge valid" style="background:#d1fae5; color:#059669; padding:4px 8px; border-radius:4px; font-weight:800; font-size:10px;">✓</span>';
                             else if (item.status === 'expiring') badgeHtml = '<span class="ms-doc-badge expiring" style="background:#fef9e7; color:#d4ac0d; padding:4px 8px; border-radius:4px; font-weight:800; font-size:10px;">⏳</span>';
                             else badgeHtml = '<span class="ms-doc-badge missing" style="background:#fee2e2; color:#ef4444; padding:4px 8px; border-radius:4px; font-weight:800; font-size:10px;">✕</span>';
                          }
                          return `
                          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:white; border:1px solid #e2e8f0; border-radius:8px; font-size:11px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
                            <span style="font-weight:700; color:#334155;">${item.name}</span>
                            ${badgeHtml}
                          </div>
                          `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Insurance</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                
                <!-- Section 1: Policy Management -->
                <div style="margin-bottom: 24px; padding-top: 8px;">
                    <div style="font-size: 11px; font-weight: 800; color: #27ae60; margin-bottom: 12px; letter-spacing: 1px;">POLICY MANAGEMENT</div>
                    
                    <!-- Add to Policy -->
                    <div style="display:flex; justify-content: space-between; align-items:center; background: var(--surface); padding: 12px; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 12px;">
                        <div>
                            <div style="font-weight: 700; font-size: 14px; color: var(--text);">Add Driver to Policy</div>
                            <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">Generate email with driver data to insurance agent</div>
                        </div>
                        <div style="display:flex; align-items:center; gap: 16px;">
                            <button class="master-forms-btn" style="background: #27ae60; border-color: #27ae60; margin: 0; padding: 6px 12px; font-size: 12px;" onclick="this.innerHTML='Pending...'; this.style.opacity='0.7';">📧 Send Request</button>
                            <label style="display:flex; align-items:center; gap: 6px; font-size: 13px; font-weight: 700; cursor: pointer; color: var(--text);">
                                <input type="checkbox" style="width: 18px; height: 18px; accent-color: #27ae60;"> Added
                            </label>
                        </div>
                    </div>

                    <!-- Remove from Policy -->
                    <div style="display:flex; justify-content: space-between; align-items:center; background: var(--surface); padding: 12px; border-radius: 8px; border: 1px solid var(--border);">
                        <div>
                            <div style="font-weight: 700; font-size: 14px; color: var(--text);">Remove Driver from Policy</div>
                            <div style="font-size: 12px; color: var(--muted); margin-top: 2px;">Generate email to request removal from insurance</div>
                        </div>
                        <div style="display:flex; align-items:center; gap: 16px;">
                            <button class="master-forms-btn" style="background: #e74c3c; border-color: #e74c3c; margin: 0; padding: 6px 12px; font-size: 12px;" onclick="this.innerHTML='Pending...'; this.style.opacity='0.7';">📧 Send Request</button>
                            <label style="display:flex; align-items:center; gap: 6px; font-size: 13px; font-weight: 700; cursor: pointer; color: var(--text);">
                                <input type="checkbox" style="width: 18px; height: 18px; accent-color: #e74c3c;"> Removed
                            </label>
                        </div>
                    </div>
                </div>



            </div>
        </div>

        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Tickets / Violations - Inspections Chart</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div class="cdl-bracket" style="border-color: #3498db;" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'tickets', this);">
                    <div style="font-size: 11px; font-weight: 800; color: #3498db; margin-bottom: 12px; letter-spacing: 1px;">EXTRACTED: TICKETS / VIOLATIONS</div>
                    <div id="violations-grid-${lead.id}">
                        <div class="metric-grid" style="grid-template-columns: repeat(8, 1fr);">
                            <div class="metric-card" style="padding: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="toggleViolationHistory('${lead.id}', 'All')">
                                <div class="metric-label" style="font-size: 10px; margin-bottom: 6px;">Inspections</div>
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: conic-gradient(#3498db 0% 40%, #e74c3c 40% 70%, #f1c40f 70% 100%); margin: auto;" title="Lvl 1 (40%), Lvl 2 (30%), Lvl 3 (30%)"></div>
                                <div style="font-size: 8px; display: flex; gap: 4px; margin-top: 6px;">
                                    <span style="color: #3498db;">■ L1</span>
                                    <span style="color: #e74c3c;">■ L2</span>
                                    <span style="color: #f1c40f;">■ L3</span>
                                </div>
                            </div>
                            <div class="metric-card" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="toggleViolationHistory('${lead.id}', 'Clean Inspection')">
                                <div class="metric-label" style="font-size: 10px;">Clean Inspection</div>
                                <div class="metric-value status-good" style="font-size: 15px;">1</div>
                            </div>
                            <div class="metric-card status-bad" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fee2e2'" onclick="toggleViolationHistory('${lead.id}', 'Vehicle Maint.')">
                                <div class="metric-label" style="font-size: 10px;">Vehicle Maint.</div>
                                <div class="metric-value" style="font-size: 15px;">1</div>
                            </div>
                            <div class="metric-card status-bad" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fee2e2'" onclick="toggleViolationHistory('${lead.id}', 'HOS Comp.')">
                                <div class="metric-label" style="font-size: 10px;">HOS Comp.</div>
                                <div class="metric-value" style="font-size: 15px;">1</div>
                            </div>
                            <div class="metric-card status-bad" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fee2e2'" onclick="toggleViolationHistory('${lead.id}', 'Unsafe Driving')">
                                <div class="metric-label" style="font-size: 10px;">Unsafe Driving</div>
                                <div class="metric-value" style="font-size: 15px;">2</div>
                            </div>
                            <div class="metric-card" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="toggleViolationHistory('${lead.id}', 'Other Violations')">
                                <div class="metric-label" style="font-size: 10px;">Other Violations</div>
                                <div class="metric-value status-good" style="font-size: 15px;">0</div>
                            </div>
                            <div class="metric-card" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="toggleViolationHistory('${lead.id}', 'OOS')">
                                <div class="metric-label" style="font-size: 10px;">OOS</div>
                                <div class="metric-value status-good" style="font-size: 15px;">0</div>
                            </div>
                            <div class="metric-card status-bad" style="padding: 8px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fee2e2'" onclick="toggleViolationHistory('${lead.id}', 'Insp. Returned')">
                                <div class="metric-label" style="font-size: 10px;">Insp. Returned</div>
                                <div class="metric-value" style="font-size: 15px;">NO</div>
                            </div>
                        </div>
                    </div>

                    <!-- Violation History View (Hidden by default) -->
                    <div id="violations-history-${lead.id}" style="display: none; margin-top: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <h4 id="violation-history-title-${lead.id}" style="font-size: 13px; font-weight: 700; color: var(--text); margin: 0;">Violation History</h4>
                            <button onclick="toggleViolationHistory('${lead.id}')" style="background: none; border: none; color: var(--blue); font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                                ← Back to Summary
                            </button>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <thead>
                                <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Date</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Type</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Level</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Description</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Status</th>
                                </tr>
                            </thead>
                            <tbody id="violation-history-body-${lead.id}">
                                <!-- Dynamically populated -->
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>

        <div class="collapsible-section">
            <div class="collapsible-header" onclick="toggleSection(this)">
                <span>Claims / Accidents</span>
                <span>▼</span>
            </div>
            <div class="collapsible-content">
                <div style="padding: 16px;">
                    <div id="claims-grid-${lead.id}">
                        <div class="metric-grid" style="grid-template-columns: repeat(3, 1fr);">
                            <div class="metric-card status-bad" style="padding: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fee2e2'" onclick="toggleClaimsHistory('${lead.id}', 'Open')">
                                <div class="metric-label" style="font-size: 11px;">Open Claims</div>
                                <div class="metric-value" style="font-size: 18px;">1</div>
                            </div>
                            <div class="metric-card" style="padding: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="toggleClaimsHistory('${lead.id}', 'Potential')">
                                <div class="metric-label" style="font-size: 11px; color: #d97706;">Potential Claims</div>
                                <div class="metric-value" style="font-size: 18px; color: #d97706;">1</div>
                            </div>
                            <div class="metric-card status-good" style="padding: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#d1fae5'" onclick="toggleClaimsHistory('${lead.id}', 'Closed')">
                                <div class="metric-label" style="font-size: 11px; color: #059669;">Closed Claims</div>
                                <div class="metric-value" style="font-size: 18px; color: #059669;">2</div>
                            </div>
                        </div>
                    </div>

                    <!-- Claims History View (Hidden by default) -->
                    <div id="claims-history-${lead.id}" style="display: none; margin-top: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <h4 id="claims-history-title-${lead.id}" style="font-size: 13px; font-weight: 700; color: var(--text); margin: 0;">Claims History</h4>
                            <button onclick="toggleClaimsHistory('${lead.id}')" style="background: none; border: none; color: var(--blue); font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                                ← Back to Summary
                            </button>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <thead>
                                <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Date</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Description</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Status</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600;">Cost</th>
                                    <th style="padding: 8px 12px; color: var(--muted); font-weight: 600; width:60px;"></th>
                                </tr>
                            </thead>
                            <tbody id="claims-history-body-${lead.id}">
                                <!-- Dynamically populated -->
                            </tbody>
                        </table>
                    </div>
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
                <div class="field" style="background:var(--surface2); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
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
  setTimeout(() => initAssignmentButtons(content, lead.id), 50);
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

window.toggleClaimsHistory = function(leadId, category) {
    const grid = document.getElementById(`claims-grid-${leadId}`);
    const history = document.getElementById(`claims-history-${leadId}`);
    const title = document.getElementById(`claims-history-title-${leadId}`);
    const tbody = document.getElementById(`claims-history-body-${leadId}`);
    
    // Mock Data Store
    const mockData = [
        { id: 0, date: '2/14/2026', desc: 'Slid off road', status: 'Open', cost: '$15,000' },
        { id: 1, date: '9/01/2025', desc: 'Backed into trailer', status: 'Pending', cost: '$4,500' },
        { id: 2, date: '1/15/2025', desc: 'Minor scratch', status: 'Closed', cost: '$800' },
        { id: 3, date: '5/20/2024', desc: 'Mirror broken', status: 'Closed', cost: '$500' },
    ];

    if (grid && history) {
        if (grid.style.display === 'none' && !category) {
            grid.style.display = 'block';
            history.style.display = 'none';
        } else {
            // Update Title
            if (title) {
                title.innerText = category === 'All' ? 'Claims History: All Claims' : `Claims History: ${category} Claims`;
            }
            
            // Filter and Render Data
            if (tbody) {
                const filteredData = category === 'All' ? mockData : mockData.filter(d => d.status === category);
                
                if (filteredData.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" style="padding: 16px; text-align: center; color: var(--muted);">No history available for ${category} claims</td></tr>`;
                } else {
                    tbody.innerHTML = filteredData.map(d => {
                        let color = '#94a3b8';
                        if (d.status === 'Open') color = '#ef4444';
                        if (d.status === 'Pending') color = '#f59e0b';
                        if (d.status === 'Closed') color = '#10b981';
                        
                        return `
                        <tr style="border-bottom: 1px solid #e2e8f0; transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                            <td style="padding: 12px; font-weight: 700; color: var(--text);">${d.date}</td>
                            <td style="padding: 12px; color: var(--text); font-weight: 600;">${d.desc}</td>
                            <td style="padding: 12px;">
                                <span style="display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 800; background: ${color}20; color: ${color}; text-transform: uppercase;">
                                    ${d.status}
                                </span>
                            </td>
                            <td style="padding: 12px; font-weight: 800; color: var(--text);">${d.cost}</td>
                            <td style="padding: 12px; text-align:right;">
                                <button onclick="openClaimWorkspaceFromLead(${d.id})" style="background:var(--surface2); border:none; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:700; color:var(--text); cursor:pointer;">View</button>
                            </td>
                        </tr>
                        `;
                    }).join('');
                }
            }
            
            grid.style.display = 'none';
            history.style.display = 'block';
        }
    }
};

window.openClaimWorkspaceFromLead = function(claimId) {
    // Hide Lead Modal properly
    if (typeof closeRecruitingModal === 'function') {
        // bypass dirty check if needed or just call it
        isDirty = false;
        closeRecruitingModal();
    } else {
        const modal = document.getElementById('modalBackdropRecruiting');
        if (modal) modal.classList.remove('open');
        document.body.classList.remove('lead-modal-open');
    }

    // Switch to Master Safety View
    if (typeof switchView === 'function') {
        switchView('master-safety');
    }

    // Open the claim
    if (typeof msOpenClaimWorkspace === 'function') {
        msActiveTab = 'claims';
        msOpenClaimWorkspace(claimId);
    }
};

window.toggleViolationHistory = function(leadId, category) {
    const grid = document.getElementById(`violations-grid-${leadId}`);
    const history = document.getElementById(`violations-history-${leadId}`);
    const title = document.getElementById(`violation-history-title-${leadId}`);
    const tbody = document.getElementById(`violation-history-body-${leadId}`);
    
    // Mock Data Store
    const mockData = [
        { date: '5/23/2026', type: 'Unsafe Driving', level: 'Level 1', desc: 'Speeding 15+ mph over limit', status: 'Violation', color: '#e74c3c', badgeColor: '#fee2e2', badgeText: '#ef4444' },
        { date: '3/12/2026', type: 'Clean Inspection', level: 'Level 2', desc: 'No violations found', status: 'Cleared', color: '#3498db', badgeColor: '#d1fae5', badgeText: '#059669' },
        { date: '8/14/2025', type: 'Vehicle Maint.', level: 'Level 3', desc: 'Headlamp out', status: 'Violation', color: '#f39c12', badgeColor: '#fee2e2', badgeText: '#ef4444' },
        { date: '1/05/2025', type: 'HOS Comp.', level: 'Level 1', desc: 'Logbook not current', status: 'Violation', color: '#f39c12', badgeColor: '#fee2e2', badgeText: '#ef4444' },
        { date: '11/20/2024', type: 'Unsafe Driving', level: 'Level 2', desc: 'Failure to yield', status: 'Violation', color: '#e74c3c', badgeColor: '#fee2e2', badgeText: '#ef4444' },
    ];

    if (grid && history) {
        if (grid.style.display === 'none' && !category) {
            grid.style.display = 'block';
            history.style.display = 'none';
        } else {
            // Update Title
            if (title) {
                title.innerText = category === 'All' ? 'Violation History: All Inspections' : `Violation History: ${category}`;
            }
            
            // Filter and Render Data
            if (tbody) {
                const filteredData = category === 'All' ? mockData : mockData.filter(d => d.type === category);
                
                if (filteredData.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="5" style="padding: 16px; text-align: center; color: var(--muted);">No history available for ${category}</td></tr>`;
                } else {
                    tbody.innerHTML = filteredData.map((d, i) => {
                        let expandedHtml = '';
                        if (d.status === 'Violation') {
                            expandedHtml = `
                                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
                                    <div style="padding: 6px 16px; border-radius: 6px; background-color: #fef2f2; border: 1px solid #fee2e2; display: flex; align-items: center; justify-content: center;">
                                        <span style="font-size: 14px; font-weight: 800; color: #ef4444; letter-spacing: 1px; text-transform: uppercase;">Charge</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Manual</span>
                                        <div style="position: relative; width: 100px;">
                                            <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                            <input type="number" value="300" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Actual</span>
                                        <div style="position: relative; width: 100px;">
                                            <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                            <input type="number" value="300" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                        </div>
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 24px; padding: 12px 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                                    <button type="button" onclick="this.innerText='Pending'; this.style.backgroundColor='#fef3c7'; this.style.color='#d97706'; this.style.borderColor='#fde68a';" style="padding: 6px 16px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; font-size: 13px; font-weight: 700; color: var(--text); cursor: pointer; transition: all 0.2s;">
                                        Challenge
                                    </button>
                                    <label style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; cursor:pointer; color: var(--text);">
                                        <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--blue);"> Ticket
                                    </label>
                                    <label style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; cursor:pointer; color: var(--text);">
                                        <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--blue);"> HM
                                    </label>
                                </div>
                            `;
                        } else {
                            expandedHtml = `
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="padding: 6px 16px; border-radius: 6px; background-color: #ecfdf5; border: 1px solid #d1fae5; display: flex; align-items: center; justify-content: center;">
                                        <span style="font-size: 14px; font-weight: 800; color: #059669; letter-spacing: 1px; text-transform: uppercase;">Bonus</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Manual</span>
                                        <div style="position: relative; width: 100px;">
                                            <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                            <input type="number" value="300" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Actual</span>
                                        <div style="position: relative; width: 100px;">
                                            <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                            <input type="number" value="300" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                        return `
                        <tr style="border-bottom: 1px solid #e2e8f0; cursor: pointer;" onclick="document.getElementById('expand-${leadId}-${i}').style.display = document.getElementById('expand-${leadId}-${i}').style.display === 'none' ? 'table-row' : 'none'">
                            <td style="padding: 8px 12px; display: flex; align-items: center; gap: 6px;">
                                <span style="color: #94a3b8; font-size: 10px; transition: transform 0.2s;">▼</span>
                                ${d.date}
                            </td>
                            <td style="padding: 8px 12px; color: ${d.color}; font-weight: 600;">${d.type}</td>
                            <td style="padding: 8px 12px;">${d.level}</td>
                            <td style="padding: 8px 12px;">${d.desc}</td>
                            <td style="padding: 8px 12px;"><span style="background: ${d.badgeColor}; color: ${d.badgeText}; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">${d.status}</span></td>
                        </tr>
                        <tr id="expand-${leadId}-${i}" style="display: none; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                            <td colspan="5" style="padding: 16px;">
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    ${expandedHtml}
                                </div>
                            </td>
                        </tr>
                        `;
                    }).join('');
                }
            }

            grid.style.display = 'none';
            history.style.display = 'block';
        }
    }
};

function selectDocType(type, leadId) {
    const cards = ["cdl", "mvr", "medical", "ssn", "clearinghouse"];
    cards.forEach(c => {
        const el = document.getElementById(`doc-card-${c}-${leadId}`);
        if(el) el.classList.remove("active");
    });
    
    const activeEl = document.getElementById(`doc-card-${type}-${leadId}`);
    if(activeEl) activeEl.classList.add("active");
    
    renderActiveDocPanel(type, leadId);
}

function renderActiveDocPanel(type, leadId) {
    const panel = document.getElementById(`active-doc-panel-${leadId}`);
    if (!panel) return;
    
    panel.classList.add("fade-out");
    setTimeout(() => {
        let html = "";
        if (type === "cdl") {
            html = `
            <div class="cdl-bracket" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'cdl', this);">
                <div style="font-size: 11px; font-weight: 800; color: var(--blue); margin-bottom: 12px; letter-spacing: 1px;">EXTRACTED: COMMERCIAL DRIVER LICENSE (CDL)</div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">Driver Name</div><input type="text" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">CDL Number</div><input type="text" class="field-input cdl-num" value="" placeholder="Drag CDL to extract..." onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Expiration Date</div><input type="date" class="field-input cdl-exp" value="" onchange="isDirty=true"></div>
                </div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">State</div><input type="text" class="field-input cdl-state" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">CDL Class</div><input type="text" class="field-input cdl-type" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Endorsements</div><input type="text" class="field-input cdl-end" value="" onchange="isDirty=true"></div>
                </div>
            </div>`;
        } else if (type === "mvr") {
            html = `
            <div class="cdl-bracket" style="border-color: #f1c40f;" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'mvr', this);">
                <div style="font-size: 11px; font-weight: 800; color: #f1c40f; margin-bottom: 12px; letter-spacing: 1px;">EXTRACTED: MOTOR VEHICLE RECORD (MVR)</div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">Driver Name</div><input type="text" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">License Number</div><input type="text" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">State</div><input type="text" class="field-input" value="" onchange="isDirty=true"></div>
                </div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">MVR Score</div>
                        <div class="mvr-score-box risk-medium">4</div>
                    </div>
                    <div class="field"><div class="field-label">Last Violation Date</div><input type="date" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">License Status</div><input type="text" class="field-input" value="Active" onchange="isDirty=true"></div>
                </div>
            </div>`;
        } else if (type === "medical") {
            html = `
            <div class="cdl-bracket" style="border-color: #2ecc71;" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'medical', this);">
                <div style="font-size: 11px; font-weight: 800; color: #2ecc71; margin-bottom: 12px; letter-spacing: 1px;">EXTRACTED: MEDICAL REPORT</div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">Medical Status</div><input type="text" class="field-input" value="Certified" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Examiner Name</div><input type="text" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Submitted Date</div><input type="date" class="field-input" value="" onchange="isDirty=true"></div>
                </div>
                <div class="form-grid-2">
                    <div class="field"><div class="field-label">Expiration Date</div><input type="date" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Restrictions</div><input type="text" class="field-input" value="None" onchange="isDirty=true"></div>
                </div>
            </div>`;
        } else if (type === "ssn") {
            html = `
            <div class="cdl-bracket" style="border-color: #9b59b6;" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'ssn', this);">
                <div style="font-size: 11px; font-weight: 800; color: #9b59b6; margin-bottom: 12px; letter-spacing: 1px;">EXTRACTED: SOCIAL SECURITY NUMBER (SSN)</div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">Full Name Match</div><input type="text" class="field-input" value="Yes" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">DOB Match</div><input type="text" class="field-input" value="Yes" onchange="isDirty=true"></div>
                </div>
                <div class="form-grid-2">
                    <div class="field"><div class="field-label">Last 4 Digits</div><input type="text" class="field-input" value="****" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Verification Status</div><input type="text" class="field-input" value="Verified" style="color:#2ecc71; font-weight:bold;" onchange="isDirty=true"></div>
                </div>
            </div>`;
        } else if (type === "clearinghouse") {
            html = `
            <div class="cdl-bracket" style="border-color: #e67e22;" ondragover="this.classList.add('dragover'); event.preventDefault();" ondragleave="this.classList.remove('dragover');" ondrop="handleDrop(event, 'clearinghouse', this);">
                <div style="font-size: 11px; font-weight: 800; color: #e67e22; margin-bottom: 12px; letter-spacing: 1px;">EXTRACTED: CLEARINGHOUSE REPORT</div>
                <div class="form-grid-3">
                    <div class="field"><div class="field-label">Driver Name</div><input type="text" class="field-input" value="" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Status</div><input type="text" class="field-input" value="Clear" style="color:#2ecc71; font-weight:bold;" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Query Date</div><input type="date" class="field-input" value="" onchange="isDirty=true"></div>
                </div>
                <div class="form-grid-2">
                    <div class="field"><div class="field-label">Query Type</div><input type="text" class="field-input" value="Full" onchange="isDirty=true"></div>
                    <div class="field"><div class="field-label">Report ID</div><input type="text" class="field-input" value="CH-000000" onchange="isDirty=true"></div>
                </div>
            </div>`;
        }
        panel.innerHTML = html;
        panel.classList.remove("fade-out");
        
        // Initialize assignment button on the newly rendered cdl-bracket
        initAssignmentButtons(panel, leadId);
    }, 300);
}


function initAssignmentButtons(container, leadId) {
    const assignables = container.querySelectorAll(".dept-section, .collapsible-section");
    assignables.forEach((el, index) => {
        if(el.querySelector(".assign-btn")) return; // already added
        el.classList.add("assignable-section");
        if (!el.id) el.id = `assign-sec-${leadId}-${Math.random().toString(36).substr(2, 9)}`;
        
        const btn = document.createElement("img");
        btn.src = "assets/add.png";
        btn.className = "assign-btn";
        btn.onclick = (e) => {
            e.stopPropagation();
            openAssignModal(el.id, leadId);
        };
        
        if (el.classList.contains("dept-section")) {
            const wrap = el.querySelector(".dept-progress-wrap");
            const circle = el.querySelector(".dept-progress-circle");
            if (wrap && circle) {
                btn.style.position = "static";
                btn.style.marginRight = "10px";
                btn.style.marginTop = "0";
                wrap.insertBefore(btn, circle);
            } else {
                el.appendChild(btn);
            }
        } else if (el.classList.contains("collapsible-section")) {
            const header = el.querySelector(".collapsible-header");
            const toggle = header ? header.querySelector("span:last-child") : null;
            if (header && toggle) {
                // Group the assign btn and the toggle together so flex space-between works perfectly
                const group = document.createElement("div");
                group.style.display = "flex";
                group.style.alignItems = "center";
                group.style.gap = "10px";
                btn.style.position = "static";
                btn.style.marginTop = "0";
                header.insertBefore(group, toggle);
                group.appendChild(btn);
                group.appendChild(toggle);
            } else {
                el.appendChild(btn);
            }
        } else {
            el.appendChild(btn);
        }
    });
}

function openAssignModal(sectionId, leadId) {
    window.currentAssignSection = sectionId;
    window.currentAssignLead = leadId;
    document.getElementById("assignModalOverlay").style.display = "flex";
}

function confirmAssignment(employeeName) {
    const sectionId = window.currentAssignSection;
    const leadId = window.currentAssignLead;
    document.getElementById("assignModalOverlay").style.display = "none";
    
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    let btn = section.querySelector(".assign-btn");
    if (btn) btn.style.display = "none";
    
    let avatar = section.querySelector(".assigned-avatar");
    if (!avatar) {
        avatar = document.createElement("div");
        avatar.className = "assigned-avatar";
        
        if (btn && btn.parentElement && btn.style.position === "static") {
            avatar.style.position = "static";
            avatar.style.marginRight = btn.style.marginRight || "0";
            avatar.style.marginTop = "0";
            btn.parentElement.insertBefore(avatar, btn);
        } else {
            section.appendChild(avatar);
        }
    }
    
    avatar.style.display = "flex";
    avatar.style.backgroundColor = "#eef2ff";
    avatar.style.color = "#3b82f6";
    
    const parts = employeeName.split(" ");
    let initials = parts[0].charAt(0);
    if (parts.length > 1) initials += parts[parts.length - 1].charAt(0);
    avatar.innerText = initials.toUpperCase();
    
    addAssignmentNotification(employeeName, sectionId, leadId);
}

function addAssignmentNotification(employeeName, sectionId, leadId) {
    if(typeof window.demoNotifications === "undefined") window.demoNotifications = [];
    const leadArr = (typeof leads !== "undefined" ? leads : (typeof dashboardLeads !== "undefined" ? dashboardLeads : []));
    const lead = leadArr.find(l => l.id == leadId);
    const leadName = lead ? `${lead.firstName} ${lead.lastName}` : "Unknown Lead";
    
    window.demoNotifications.unshift({
        id: "notif-" + Math.random().toString(36).substr(2, 9),
        employee: employeeName,
        sectionId: sectionId,
        leadId: leadId,
        leadName: leadName,
        message: `${employeeName} assigned a task to you for ${leadName}`,
        time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"}),
        status: "pending"
    });
    
    if(typeof renderNotifications === "function") {
        renderNotifications();
    }
}

