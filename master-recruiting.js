// master-recruiting.js

function initMasterRecruiting() {
  const container = document.getElementById('master-recruiting-view');
  if (!container) return;

  // Process data from app.js (dashboardLeads, recruiters)
  let activeLeads = dashboardLeads.filter(l => l.recruitingStage !== 'Declined' && l.recruitingStage !== 'Closed');
  let overdueLeads = dashboardLeads.filter(l => l.recruitingStage === 'Follow Up' || l.recruitingStage === 'In Progress'); // Mock logic
  
  let tagsObj = {};
  dashboardLeads.forEach(l => {
    (l.tags || []).forEach(t => {
      tagsObj[t] = (tagsObj[t] || 0) + 1;
    });
  });
  let sortedTags = Object.entries(tagsObj).sort((a,b) => b[1] - a[1]);

  container.innerHTML = `
    <div class="mr-dashboard">
      
      <!-- Filters -->
      <div class="mr-header">
        <h1>Master Recruiting Dashboard</h1>
        <div class="mr-filters">
          <input type="text" class="mr-input" placeholder="Search Lead..." style="width:200px;">
          <select class="mr-select" onchange="initMasterRecruiting()">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <select class="mr-select">
            <option value="">All Recruiters</option>
            ${recruiters.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
          </select>
          <select class="mr-select">
            <option value="">All Pipelines</option>
            <option value="New Lead">New Lead</option>
            <option value="Follow Up">Follow Up</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      <!-- Top KPIs -->
      <div class="mr-kpi-grid">
        <div class="mr-kpi-card">
          <div class="mr-kpi-header"><span>Total Recruiters</span><span>👥</span></div>
          <div class="mr-kpi-value">${recruiters.length}</div>
          <div class="mr-kpi-trend positive"><span>↑</span> Online: ${recruiters.length}</div>
        </div>
        <div class="mr-kpi-card">
          <div class="mr-kpi-header"><span>Active Leads</span><span>🔥</span></div>
          <div class="mr-kpi-value">${activeLeads.length}</div>
          <div class="mr-kpi-trend positive"><span>↑</span> +12% this week</div>
        </div>
        <div class="mr-kpi-card">
          <div class="mr-kpi-header"><span>Awaiting Follow Up</span><span>⏳</span></div>
          <div class="mr-kpi-value">${dashboardLeads.filter(l => l.recruitingStage === 'Follow Up').length}</div>
          <div class="mr-kpi-trend negative"><span>↓</span> Action needed</div>
        </div>
        <div class="mr-kpi-card">
          <div class="mr-kpi-header"><span>Avg Time In Pipeline</span><span>⏱️</span></div>
          <div class="mr-kpi-value">5.2 Days</div>
          <div class="mr-kpi-trend positive"><span>↑</span> -0.4 Days</div>
        </div>
      </div>

      <!-- Recruiter Overview Cards -->
      <div>
        <div class="mr-section-title">📊 Recruiter Overview</div>
        <div class="mr-recruiter-grid">
          ${recruiters.map(r => {
            const assignedCount = dashboardLeads.filter(l => l.recruiterId === r.id).length || Math.floor(Math.random()*50+10);
            const statusColor = r.cr > 0.09 ? 'mr-status-green' : (r.cr > 0.08 ? 'mr-status-yellow' : 'mr-status-red');
            return `
            <div class="mr-recruiter-card" onclick="mrOpenRecruiterModal('${r.name}')">
              <div class="mr-r-header">
                <div class="mr-r-avatar">${r.name.charAt(0)}</div>
                <div class="mr-r-info">
                  <h3 class="mr-r-name">${r.name}</h3>
                  <div style="font-size:12px; color:var(--mr-text-muted); display:flex; align-items:center; gap:6px;">
                    <span class="mr-r-status ${statusColor}"></span>
                    ${r.role}
                  </div>
                </div>
              </div>
              <div class="mr-r-stats">
                <div class="mr-r-stat-item">
                  <span class="mr-r-stat-label">Assigned</span>
                  <span class="mr-r-stat-val">${r.lc + assignedCount}</span>
                </div>
                <div class="mr-r-stat-item">
                  <span class="mr-r-stat-label">Closed</span>
                  <span class="mr-r-stat-val">${r.closed}</span>
                </div>
                <div class="mr-r-stat-item">
                  <span class="mr-r-stat-label">Conversion</span>
                  <span class="mr-r-stat-val">${(r.cr*100).toFixed(1)}%</span>
                </div>
                <div class="mr-r-stat-item">
                  <span class="mr-r-stat-label">Overdue</span>
                  <span class="mr-r-stat-val alert">${Math.floor(Math.random()*5)}</span>
                </div>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Team Workload -->
      <div class="mr-workload-container">
        <div class="mr-section-title">⚖️ Team Workload</div>
        ${recruiters.map(r => {
          const load = Math.floor(Math.random()*40 + 50); // mock 50-90%
          const color = load > 85 ? 'var(--mr-danger)' : (load > 70 ? 'var(--mr-warning)' : 'var(--mr-primary)');
          return `
          <div class="mr-wl-row" onclick="mrOpenRecruiterModal('${r.name}')" style="cursor:pointer;">
            <div class="mr-wl-name">${r.name}</div>
            <div class="mr-wl-bar-wrap">
              <div class="mr-wl-bar" style="width: ${load}%; background: ${color};"></div>
            </div>
            <div class="mr-wl-val">${load}%</div>
          </div>
          `;
        }).join('')}
      </div>

      </div>

    </div>
  `;
}

// Helpers for Navigation

function mrOpenLeadModal(leadId) {
  if (typeof openRecruitingModal === 'function') {
    const lead = dashboardLeads.find(l => l.id === leadId);
    if (lead) {
      openRecruitingModal(lead);
    } else {
      alert('Lead not found in memory.');
    }
  } else {
    alert('openRecruitingModal is not defined in this prototype.');
  }
}

function mrOpenRecruiterModal(name) {
  let modal = document.getElementById('mrRecruiterAnalyticsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mrRecruiterAnalyticsModal';
    modal.className = 'modal-backdrop-recruiting';
    document.body.appendChild(modal);
  }
  
  // Find recruiter data
  const rec = recruiters.find(r => r.name === name) || recruiters[0];
  const rLeads = dashboardLeads.filter(l => l.recruiterId === rec.id);
  
  // Mocks for missing data
  const phoneHours = Math.floor(Math.random() * 20 + 10);
  const phoneMins = Math.floor(Math.random() * 60);
  const callsMade = Math.floor(Math.random() * 300 + 100);
  
  // Workflow analysis
  const stuckLeads = rLeads.filter(l => l.recruitingStage === 'Follow Up').length;
  
  modal.innerHTML = `
    <div class="modal-recruiting-clean" style="max-width:900px; width:90%; padding:32px; background:#f8fafc; border-radius:16px; overflow-y:auto; max-height:90vh;">
      
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="width:72px; height:72px; border-radius:50%; background:#cbd5e1; color:#334155; font-size:28px; font-weight:800; display:flex; align-items:center; justify-content:center;">
            ${rec.name.charAt(0)}
          </div>
          <div>
            <h2 style="margin:0 0 4px; font-size:24px; color:#0f172a;">${rec.name}</h2>
            <div style="color:#64748b; font-weight:600; font-size:14px; display:flex; gap:12px;">
              <span>💼 ${rec.role}</span>
              <span style="color:#10b981;">● Online</span>
            </div>
          </div>
        </div>
        <button onclick="document.getElementById('mrRecruiterAnalyticsModal').style.display='none'" style="background:none; border:none; font-size:24px; cursor:pointer; color:#64748b;">✕</button>
      </div>

      <!-- Key Metrics -->
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-bottom:32px;">
        <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="color:#64748b; font-size:12px; font-weight:700; margin-bottom:8px; text-transform:uppercase;">Phone Duration</div>
          <div style="font-size:24px; font-weight:800; color:#0f172a;">${phoneHours}h ${phoneMins}m</div>
          <div style="font-size:12px; color:#10b981; margin-top:4px; font-weight:600;">↑ 12% this week</div>
        </div>
        <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="color:#64748b; font-size:12px; font-weight:700; margin-bottom:8px; text-transform:uppercase;">Calls Made</div>
          <div style="font-size:24px; font-weight:800; color:#0f172a;">${callsMade}</div>
          <div style="font-size:12px; color:#10b981; margin-top:4px; font-weight:600;">↑ 45 more than avg</div>
        </div>
        <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="color:#64748b; font-size:12px; font-weight:700; margin-bottom:8px; text-transform:uppercase;">Conversion Rate</div>
          <div style="font-size:24px; font-weight:800; color:#0f172a;">${(rec.cr*100).toFixed(1)}%</div>
          <div style="font-size:12px; color:#64748b; margin-top:4px; font-weight:600;">Top 10% performer</div>
        </div>
        <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="color:#64748b; font-size:12px; font-weight:700; margin-bottom:8px; text-transform:uppercase;">Total Assigned</div>
          <div style="font-size:24px; font-weight:800; color:#0f172a;">${rec.lc + rLeads.length}</div>
          <div style="font-size:12px; color:#f59e0b; margin-top:4px; font-weight:600;">High Workload</div>
        </div>
      </div>

      <!-- Recruiter Workflow -->
      <div style="background:#fff; padding:24px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05); margin-bottom:24px;">
        <h3 style="margin:0 0 16px; font-size:16px;">Personal Workflow & Bottlenecks</h3>
        
        ${stuckLeads > 0 ? `
        <div style="background:#fef2f2; border:1px solid #fecaca; color:#dc2626; padding:12px 16px; border-radius:8px; font-size:13px; font-weight:600; margin-bottom:20px; display:flex; align-items:center; gap:8px;">
          <span>⚠️</span> Bottleneck Alert: ${stuckLeads} leads are currently stuck in the "Follow Up" stage.
        </div>
        ` : ''}

        <div style="display:flex; gap:12px; overflow-x:auto;">
          ${['New Lead', 'Follow Up', 'In Progress', 'Active Driver'].map(stage => {
            const ls = rLeads.filter(l => l.recruitingStage === stage);
            return `
            <div style="flex:1; background:#f1f5f9; padding:12px; border-radius:8px; min-width:180px;">
              <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:12px; display:flex; justify-content:space-between;">
                ${stage} <span style="background:#cbd5e1; padding:2px 8px; border-radius:10px;">${ls.length}</span>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${ls.slice(0,3).map(l => `
                  <div style="background:#fff; padding:8px 12px; border-radius:6px; font-size:12px; border:1px solid #e2e8f0; cursor:pointer;" onclick="mrOpenLeadModal('${l.id}')">
                    <div style="font-weight:700; color:#0f172a; margin-bottom:4px;">${l.name}</div>
                    <div style="color:#64748b; font-size:11px;">In stage: ${Math.floor(Math.random()*5+1)} days</div>
                  </div>
                `).join('')}
                ${ls.length > 3 ? `<div style="text-align:center; font-size:11px; color:#64748b; padding-top:4px;">+${ls.length - 3} more</div>` : (ls.length === 0 ? `<div style="text-align:center; font-size:11px; color:#94a3b8; padding:8px 0;">Empty</div>` : '')}
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>

    </div>
  `;
  modal.style.display = 'flex';
}
