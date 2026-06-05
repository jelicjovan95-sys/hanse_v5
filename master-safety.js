/* =====================================================
   MASTER SAFETY DASHBOARD — master-safety.js
   ===================================================== */


// --- NEW MOCK DATA (Claims, DOT, Emp Verify) ---
let msActiveClaimWorkspaceId = null; // State for tracking the opened workspace
let msActiveDataQWorkspaceId = null; // State for tracking the opened DataQ workspace

let msMockDataQCases = [
  {
    id: 0,
    dataqId: 'DQ-882194',
    status: 'Evidence Needed',
    archived: false,
    challengeScore: 82,
    driver: 'Demarcus Rainey',
    company: 'United WS',
    date: '2026-02-14',
    equipment: 'Trk 134',
    trailer: '',
    state: 'IL',
    location: 'I-80 W',
    reportNo: 'IL-99120',
    officer: 'Trooper Smith',
    
    relatedType: 'Crash',
    relatedId: 'Claim #134',
    
    challengeReason: 'Crash not DOT-recordable',
    explanationText: 'The vehicle slid off the road due to black ice. It was towed out of the ditch, but there was no disabling damage to the vehicle and no injuries. It should not be listed as a DOT-recordable crash.',
    
    missingItems: ['Police Report', 'Driver Statement'],
    
    aiAssessment: {
      possibleDataQ: 'Yes',
      strength: 'Medium',
      recommendation: 'Collect More Evidence',
      reason: 'The case may be challengeable, but the police report is still missing. The current claim notes mention strong winds and towing, but there is not enough official evidence yet to support correction.'
    },
    
    evidence: [
      { category: 'Tow Invoice', filename: 'towing_invoice_134.pdf', status: 'AI Processed' },
      { category: 'Police Report', filename: '', status: 'Missing' },
      { category: 'Driver Statement', filename: '', status: 'Missing' }
    ],
    
    aiSuggestions: [
      { field: 'Tow required', current: 'Yes', suggested: 'Yes (but no damage)', source: 'towing_invoice_134.pdf', conf: 92 }
    ],
    
    aiDraft: 'We are requesting a review of this record because the crash was not DOT-recordable. The vehicle was towed out of a ditch due to weather conditions, but did not sustain disabling damage. We respectfully request this record be corrected or removed.',
    
    submission: {
      submitted: 'No',
      date: '',
      user: '',
      trackingNo: '',
      loginEmail: '',
      externalStatus: '',
      followUpDate: '',
      moreInfoRequested: 'No',
      additionalDocsSubmitted: 'No'
    },
    
    agencyResponse: {
      received: 'No',
      date: '',
      decision: 'Pending',
      notes: '',
      correctionMade: '',
      rejectionReason: '',
      finalResult: '',
      closedDate: ''
    },
    
    timeline: [
      { date: '2026-02-15 10:00', user: 'Admin', action: 'DataQ case created from Claim #134', target: '' },
      { date: '2026-02-15 10:05', user: 'Admin', action: 'Challenge reason selected: Crash not DOT-recordable', target: '' },
      { date: '2026-02-18 16:20', user: 'Admin', action: 'Tow invoice uploaded', target: 'towing_invoice_134.pdf' },
      { date: '2026-02-18 16:22', user: 'System AI', action: 'AI processed evidence', target: 'towing_invoice_134.pdf' }
    ]
  }
];

window.msUpdateDataQField = function(id, fieldPath, value) {
  const record = msMockDataQCases.find(c => c.id === parseInt(id));
  if (!record) return;
  
  const keys = fieldPath.split('.');
  let obj = record;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!obj[keys[i]]) obj[keys[i]] = {};
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
  renderMasterSafety(); // Re-render to show changes
};

let msMockClaims = [
  { 
    id: 0, 
    claimId: '134', 
    status: 'Waiting for Police Report', 
    archived: false,
    aiScore: 72,
    driver: 'Demarcus Rainey', 
    company: 'United WS', 
    date: '2026-02-14', 
    equipment: 'Trk 134', 
    
    // Missing items checklist
    missingItems: ['Police Report', 'Adjuster #', 'Repair Estimate'],
    
    // Accident Details
    accident: {
      location: 'I-80 W, Wyoming',
      time: '14:30',
      weather: 'Strong winds',
      roadCondition: 'Icy',
      type: 'Slide-off',
      policeCalled: 'Yes',
      policeDept: 'WY State Patrol',
      policeReportNo: 'Pending',
      citation: 'No',
      injuries: 'No',
      towRequired: 'Yes',
      dotRecordable: 'Unknown',
      cargoDamage: 'No'
    },
    
    // Financials
    financials: {
      towPaid: { val: 1376.55, source: 'towing_invoice_134.pdf', conf: 96 },
      repairEstimate: { val: 0, source: null, conf: 0 },
      repairPaid: { val: 0, source: null, conf: 0 },
      claimCollected: { val: 0, source: null, conf: 0 },
      deductible: { val: 2500, source: null, conf: 0 },
      cargoLoss: { val: 0, source: null, conf: 0 },
      otherCosts: { val: 0, source: null, conf: 0 }
    },
    
    // Text Areas
    desc: 'Slid off the road due to strong winds. He contacted a towing company...', 
    updates: 'Waiting for police report. Towing paid $1,376.55.', 
    notes: 'Need to follow up with state patrol by Friday.',
    comment: '',
    
    // Evidence Upload Center (Documents)
    evidence: [
      { category: 'Tow Invoice', filename: 'towing_invoice_134.pdf', status: 'AI Processed' },
      { category: 'Accident Photos', filename: 'photo_front.jpg', status: 'Uploaded' },
      { category: 'Police Report', filename: '', status: 'Missing' },
      { category: 'Repair Estimate', filename: '', status: 'Missing' }
    ],

    // AI Suggestions Panel
    aiSuggestions: [
      { field: 'Accident reason', current: 'Empty', suggested: 'Strong winds / slide-off', source: 'driver_statement.pdf', conf: 85 },
      { field: 'Tow amount', current: 'Empty', suggested: '$1,376.55', source: 'towing_invoice_134.pdf', conf: 96 }
    ],

    // Timeline Log
    timeline: [
      { date: '2026-02-14 15:00', user: 'Admin', action: 'Claim created', target: '' },
      { date: '2026-02-14 16:20', user: 'Admin', action: 'Tow invoice uploaded', target: 'towing_invoice_134.pdf' },
      { date: '2026-02-14 16:22', user: 'System AI', action: 'Extracted towing amount: $1,376.55', target: '' }
    ]
  },
  { 
    id: 1, 
    claimId: 'TSS-003245', 
    status: 'In Progress', 
    archived: false,
    aiScore: 40,
    driver: 'James Whitfield', 
    company: 'Bronco Transport', 
    date: '2026-04-18', 
    equipment: 'Trk 0112', 
    missingItems: ['Accident Photos', 'Driver Statement', 'Settlement Letter'],
    accident: { location: 'Chicago, IL', time: '09:15', weather: 'Clear', roadCondition: 'Dry', type: 'Collision', policeCalled: 'No', policeDept: '', policeReportNo: '', citation: 'No', injuries: 'No', towRequired: 'No', dotRecordable: 'No', cargoDamage: 'No' },
    financials: { towPaid: {val:0}, repairEstimate: {val:0}, repairPaid: {val:0}, claimCollected: {val:0}, deductible: {val:0}, cargoLoss: {val:0}, otherCosts: {val:0} },
    desc: 'Damaged gate at facility', updates: 'Waiting on footage', notes: 'Need to follow up', comment: '',
    evidence: [],
    aiSuggestions: [],
    timeline: [{ date: '2026-04-18 10:00', user: 'Admin', action: 'Claim created', target: '' }]
  }
];

window.msUpdateClaimField = function(id, field, value) {
  const record = msMockClaims.find(c => c.id === parseInt(id));
  if (record) {
    if (field === 'collected') record.financials.claimCollected.val = parseFloat(value) || 0;
    else record[field] = value;
    renderMasterSafety();
  }
};
// Helper to update deeply nested claim fields
window.msUpdateNestedClaimField = function(id, path, value) {
  const record = msMockClaims.find(c => c.id === parseInt(id));
  if (record) {
     const keys = path.split('.');
     let obj = record;
     for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
     }
     obj[keys[keys.length - 1]] = value;
     renderMasterSafety();
  }
};

window.msCreateNewClaim = function() {
  const newId = msMockClaims.length ? Math.max(...msMockClaims.map(c => c.id)) + 1 : 0;
  msMockClaims.unshift({
    id: newId, 
    claimId: 'NEW', 
    status: 'Draft', 
    archived: false,
    aiScore: 0,
    driver: '', company: '', date: new Date().toISOString().split('T')[0], equipment: '',
    missingItems: ['Driver', 'Date', 'Police Report'],
    accident: { location: '', time: '', weather: '', roadCondition: '', type: '', policeCalled: '', policeDept: '', policeReportNo: '', citation: '', injuries: '', towRequired: '', dotRecordable: '', cargoDamage: '' },
    financials: { towPaid: {val:0}, repairEstimate: {val:0}, repairPaid: {val:0}, claimCollected: {val:0}, deductible: {val:0}, cargoLoss: {val:0}, otherCosts: {val:0} },
    desc: '', updates: '', notes: '', comment: '',
    evidence: [],
    aiSuggestions: [],
    timeline: [{ date: new Date().toLocaleString(), user: 'Current User', action: 'Claim created', target: '' }]
  });
  
  // Automatically open the workspace for the new claim
  msActiveClaimWorkspaceId = newId;
  renderMasterSafety();
};

window.msClaimsView = 'active';
window.msSetClaimsView = function(view) {
  msClaimsView = view;
  msActiveClaimWorkspaceId = null; // Close workspace when switching views
  renderMasterSafety();
};
window.msOpenClaimWorkspace = function(id) {
  msActiveClaimWorkspaceId = parseInt(id);
  renderMasterSafety();
};
window.msCloseClaimWorkspace = function() {
  msActiveClaimWorkspaceId = null;
  renderMasterSafety();
};
window.msToggleArchiveClaim = function(id) {
  const record = msMockClaims.find(c => c.id === parseInt(id));
  if (record) {
    record.archived = !record.archived;
    if (record.archived && msActiveClaimWorkspaceId === parseInt(id)) {
        msActiveClaimWorkspaceId = null; // Close if archiving
    }
    renderMasterSafety();
  }
};
let msMockDOT = [
  { id: 0, date: '2026-03-10', report: 'PA-H512501333', driver: 'Carlos Medina', oos: 0, unsafe: 0, maint: 2, hos: 1, clean: 4, status: 'Violation', type: 'Charge', manualAmount: 1900, actualAmount: 500, notes: 'missing receipts', vin: '3AKJGLD55GSGU6294', plate: 'R577641', returned: true, challenged: 'Yes', ticket: false, hm: false },
  { id: 1, date: '2026-05-01', report: 'OH-G901239123', driver: 'Marcus Johnson', oos: 1, unsafe: 1, maint: 0, hos: 0, clean: 0, status: 'OOS', type: 'Bonus', manualAmount: 300, actualAmount: 300, notes: 'all good', vin: '1F651L92P30K29182', plate: 'T81293', returned: false, challenged: 'No', ticket: true, hm: true },
  { id: 2, date: '2026-05-15', report: 'TX-B341235122', driver: 'David Smith', oos: 0, unsafe: 0, maint: 0, hos: 0, clean: 1, status: 'Clean', type: 'Charge', manualAmount: 0, actualAmount: 0, notes: 'Level 1 pass', vin: '4VZAF2L3489P2', plate: 'K23441', returned: false, challenged: 'No', ticket: false, hm: false },
  { id: 3, date: '2026-05-20', report: 'NY-A124512411', driver: 'Sarah Connor', oos: 2, unsafe: 0, maint: 3, hos: 1, clean: 0, status: 'OOS', type: 'Charge', manualAmount: 2400, actualAmount: 2400, notes: 'Brakes out of adjustment', vin: '5TJF82LKA1092P', plate: 'P98213', returned: true, challenged: 'Yes', ticket: true, hm: false },
  { id: 4, date: '2026-05-28', report: 'CA-D991204812', driver: 'James Logan', oos: 0, unsafe: 2, maint: 0, hos: 0, clean: 0, status: 'Violation', type: 'Bonus', manualAmount: 150, actualAmount: 150, notes: 'Speeding 6-10 over', vin: '1GCHK2L39P8123', plate: 'M12944', returned: false, challenged: 'No', ticket: true, hm: false },
  { id: 5, date: '2026-06-02', report: 'IL-C512351244', driver: 'Michael Phelps', oos: 0, unsafe: 0, maint: 0, hos: 0, clean: 1, status: 'Clean', type: 'Bonus', manualAmount: 200, actualAmount: 200, notes: 'Level 2 Clean Inspection', vin: '1XYZ1234567890', plate: 'IL-12345', returned: false, challenged: 'No', ticket: false, hm: false }
];

window.msUpdateDOTField = function(id, field, value) {
  const record = msMockDOT.find(d => d.id === parseInt(id));
  if (record) {
    if(field === 'manualAmount' || field === 'actualAmount' || field === 'oos' || field === 'unsafe' || field === 'maint' || field === 'hos') {
      record[field] = parseFloat(value) || 0;
    } else if (field === 'returned' || field === 'ticket' || field === 'hm') {
      record[field] = value;
    } else {
      record[field] = value;
    }
    renderMasterSafety();
  }
};
const msMockSMSData = [
    { month: 'Sep 2024', unsafe: '< 3 insp. w/ violations', crash: '56%', maint: '84%', fitness: '0%', hos: 'No viol. within 1 yr' },
    { month: 'Oct 2024', unsafe: '< 3 insp. w/ violations', crash: '56%', maint: '83%', fitness: '0%', hos: 'No viol. within 1 yr' },
    { month: 'Nov 2024', unsafe: '< 3 insp. w/ violations', crash: '55%', maint: '80%', fitness: '0%', hos: 'No viol. within 1 yr' },
    { month: 'Dec 2024', unsafe: '< 3 insp. w/ violations', crash: '55%', maint: '82%', fitness: '0%', hos: '11%' },
    { month: 'Jan 2025', unsafe: '< 3 insp. w/ violations', crash: '0%', maint: '86%', fitness: '0%', hos: '12%' },
    { month: 'Feb 2025', unsafe: '< 3 insp. w/ violations', crash: '0%', maint: '86%', fitness: '0%', hos: '61%' },
    { month: 'Mar 2025', unsafe: '< 3 insp. w/ violations', crash: '0%', maint: '92%', fitness: '0%', hos: '51%' },
    { month: 'Apr 2025', unsafe: '< 3 insp. w/ violations', crash: '0%', maint: '96%', fitness: '0%', hos: '51%' },
    { month: 'May 2025', unsafe: '< 3 insp. w/ violations', crash: '0%', maint: '93%', fitness: '0%', hos: '42%' },
    { month: 'Jun 2025', unsafe: '< 3 insp. w/ violations', crash: '41%', maint: '94%', fitness: '0%', hos: '39%' },
    { month: 'Jul 2025', unsafe: '< 3 insp. w/ violations', crash: '15%', maint: '94%', fitness: '0%', hos: '37%' },
    { month: 'Aug 2025', unsafe: '< 3 insp. w/ violations', crash: '30%', maint: '93%', fitness: '0%', hos: '33%' },
    { month: 'Sep 2025', unsafe: '< 3 insp. w/ violations', crash: '60%', maint: '93%', fitness: '0%', hos: '24%' },
    { month: 'Oct 2025', unsafe: '49%', crash: '30%', maint: '93%', fitness: '0%', hos: '37%' },
    { month: 'Nov 2025', unsafe: '54%', crash: '61%', maint: '93%', fitness: '0%', hos: '72%' },
    { month: 'Dec 2025', unsafe: '46%', crash: '51%', maint: '92%', fitness: '0%', hos: '69%' },
    { month: 'Jan 2026', unsafe: '67%', crash: '67%', maint: '90%', fitness: '0%', hos: '66%' },
    { month: 'Feb 2026', unsafe: '65%', crash: '60%', maint: '88%', fitness: '0%', hos: '66%' },
    { month: 'Mar 2026', unsafe: '57%', crash: '48%', maint: '96%', fitness: '0%', hos: '72%' }
];
let msSMSYearFilter = '2025';

function msSetSMSYear(year) {
  msSMSYearFilter = year;
  renderMasterSafety();
}

const msMockEmp = [
  { name: 'William Rios', date: '2026-05-10', emp: 'Voyager', try1: '2026-05-11', try2: '', try3: '', responded: false },
  { name: 'John Smith', date: '2026-05-12', emp: 'Bronco Transport', try1: '2026-05-13', try2: '2026-05-15', try3: '', responded: true }
];

// -------------------------------------------------------
// SAFETY DATA — linked to dashboardLeads by id/name
// -------------------------------------------------------
const masterSafetyData = [
  {
    leadRef: 'dash-1',
    name: 'Demarcus Rainey',
    state: 'Georgia',
    recruiter: 'John Doe',
    status: 'warning',
    driverType: 'OTR',
    lastActivity: '2026-05-20',
    docs: {
      cdl:          { exp: '2026-06-14', status: 'expiring' },
      mvr:          { exp: '2025-11-01', status: 'expired' },
      medical:      { exp: '2026-12-20', status: 'valid' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2026-05-01', status: 'expired' },
      drugTest:     { exp: '2026-08-10', status: 'valid' }
    },
    violations: [
      { text: 'Speeding — 72 in 55 zone', date: '2026-05-23', severity: 'warning' }
    ],
    notes: 'Needs CDL renewal ASAP. MVR expired — contact driver.',
    archived: false
  },
  {
    leadRef: 'dash-2',
    name: 'Carlos Medina',
    state: 'Texas',
    recruiter: 'Mila Petrović',
    status: 'compliant',
    driverType: 'OTR',
    lastActivity: '2026-05-27',
    docs: {
      cdl:          { exp: '2027-03-15', status: 'valid' },
      mvr:          { exp: '2026-09-10', status: 'valid' },
      medical:      { exp: '2027-01-05', status: 'valid' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2026-11-20', status: 'valid' },
      drugTest:     { exp: '2026-10-15', status: 'valid' }
    },
    violations: [],
    notes: 'Top performing driver. All docs in order.',
    archived: false
  },
  {
    leadRef: 'dash-3',
    name: 'James Whitfield',
    state: 'Florida',
    recruiter: 'Alex Rivera',
    status: 'critical',
    driverType: 'Regional',
    lastActivity: '2026-05-10',
    docs: {
      cdl:          { exp: '2025-12-31', status: 'expired' },
      mvr:          { exp: '2025-10-15', status: 'expired' },
      medical:      { exp: '2026-06-20', status: 'expiring' },
      ssn:          { exp: null,         status: 'missing' },
      clearinghouse:{ exp: null,         status: 'missing' },
      drugTest:     { exp: '2025-08-01', status: 'expired' }
    },
    violations: [
      { text: 'Unsafe lane change — HOS violation', date: '2026-04-12', severity: 'critical' },
      { text: 'Logbook falsification reported', date: '2026-03-05', severity: 'critical' }
    ],
    notes: 'CRITICAL: Multiple expired docs. Not cleared for dispatch.',
    archived: false
  },
  {
    leadRef: 'dash-4',
    name: 'Terrence Brown',
    state: 'Ohio',
    recruiter: 'Sara Kim',
    status: 'compliant',
    driverType: 'Dedicated',
    lastActivity: '2026-05-25',
    docs: {
      cdl:          { exp: '2027-07-22', status: 'valid' },
      mvr:          { exp: '2026-10-01', status: 'valid' },
      medical:      { exp: '2027-02-14', status: 'valid' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2026-12-01', status: 'valid' },
      drugTest:     { exp: '2026-11-30', status: 'valid' }
    },
    violations: [],
    notes: '',
    archived: false
  },
  {
    leadRef: 'dash-5',
    name: 'Marcus Johnson',
    state: 'Illinois',
    recruiter: 'Nikola Jovanović',
    status: 'warning',
    driverType: 'OTR',
    lastActivity: '2026-05-18',
    docs: {
      cdl:          { exp: '2026-07-01', status: 'expiring' },
      mvr:          { exp: '2026-06-15', status: 'expiring' },
      medical:      { exp: '2026-08-20', status: 'valid' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2026-09-10', status: 'valid' },
      drugTest:     { exp: '2026-12-01', status: 'valid' }
    },
    violations: [
      { text: 'Inspection — minor brake defect, corrected', date: '2026-05-01', severity: 'warning' }
    ],
    notes: 'Schedule CDL and MVR renewal within 30 days.',
    archived: false
  },
  {
    leadRef: 'dash-6',
    name: 'Robert Nguyen',
    state: 'California',
    recruiter: 'John Doe',
    status: 'compliant',
    driverType: 'Regional',
    lastActivity: '2026-05-26',
    docs: {
      cdl:          { exp: '2028-01-10', status: 'valid' },
      mvr:          { exp: '2026-11-05', status: 'valid' },
      medical:      { exp: '2027-04-30', status: 'valid' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2027-01-15', status: 'valid' },
      drugTest:     { exp: '2027-03-20', status: 'valid' }
    },
    violations: [],
    notes: 'Perfect record. 3 years with company.',
    archived: false
  },
  {
    leadRef: null,
    name: 'Tony Williams',
    state: 'Nevada',
    recruiter: 'Alex Rivera',
    status: 'critical',
    driverType: 'OTR',
    lastActivity: '2026-04-30',
    docs: {
      cdl:          { exp: '2026-06-05', status: 'expiring' },
      mvr:          { exp: '2026-01-20', status: 'expired' },
      medical:      { exp: '2025-12-31', status: 'expired' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: null,         status: 'missing' },
      drugTest:     { exp: '2025-11-15', status: 'expired' }
    },
    violations: [
      { text: 'Drug test overdue — 196 days', date: '2026-05-28', severity: 'critical' },
      { text: 'Unsafe driving — speeding 80mph in 65 zone', date: '2026-02-14', severity: 'critical' }
    ],
    notes: 'NOT cleared for dispatch. Drug test overdue.',
    archived: false
  },
  {
    leadRef: null,
    name: 'Samuel Davis',
    state: 'Tennessee',
    recruiter: 'Mila Petrović',
    status: 'warning',
    driverType: 'Dedicated',
    lastActivity: '2026-05-15',
    docs: {
      cdl:          { exp: '2026-08-15', status: 'valid' },
      mvr:          { exp: '2026-06-25', status: 'expiring' },
      medical:      { exp: '2026-07-10', status: 'expiring' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2026-10-05', status: 'valid' },
      drugTest:     { exp: '2027-01-20', status: 'valid' }
    },
    violations: [],
    notes: 'MVR and Medical expiring soon. Contact driver.',
    archived: false
  },
  {
    leadRef: null,
    name: 'Kevin Martinez',
    state: 'Arizona',
    recruiter: 'Sara Kim',
    status: 'compliant',
    driverType: 'OTR',
    lastActivity: '2026-05-28',
    docs: {
      cdl:          { exp: '2027-09-22', status: 'valid' },
      mvr:          { exp: '2026-12-14', status: 'valid' },
      medical:      { exp: '2027-05-30', status: 'valid' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: '2027-02-10', status: 'valid' },
      drugTest:     { exp: '2027-08-01', status: 'valid' }
    },
    violations: [],
    notes: '',
    archived: false
  },
  {
    leadRef: null,
    name: 'Derek Thompson',
    state: 'Georgia',
    recruiter: 'Nikola Jovanović',
    status: 'inactive',
    driverType: 'OTR',
    lastActivity: '2025-12-01',
    docs: {
      cdl:          { exp: '2025-11-30', status: 'expired' },
      mvr:          { exp: '2025-09-10', status: 'expired' },
      medical:      { exp: '2025-10-20', status: 'expired' },
      ssn:          { exp: null,         status: 'valid' },
      clearinghouse:{ exp: null,         status: 'missing' },
      drugTest:     { exp: '2025-08-15', status: 'expired' }
    },
    violations: [
      { text: 'Accident — rear-end collision, minor damage', date: '2025-11-01', severity: 'critical' }
    ],
    notes: 'Driver inactive since Dec 2025. Pending re-qualification.',
    archived: true
  }
];

// -------------------------------------------------------
// UTILITY FUNCTIONS
// -------------------------------------------------------
const MS_DOC_LABELS = {
  cdl: 'CDL License',
  mvr: 'MVR Report',
  medical: 'Medical Card',
  ssn: 'SSN Verification',
  clearinghouse: 'Clearinghouse',
  drugTest: 'Drug Test'
};

function msGetInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function msGetAvatarColor(status) {
  const map = { compliant: 'blue', warning: 'yellow', critical: 'red', inactive: 'gray' };
  return map[status] || 'blue';
}

function msCalcCompliance(driver) {
  const docs = Object.values(driver.docs);
  const valid = docs.filter(d => d.status === 'valid').length;
  const expiring = docs.filter(d => d.status === 'expiring').length;
  const total = docs.length;
  // Expiring counts as half-valid
  return Math.round(((valid + expiring * 0.5) / total) * 100);
}

function msCalcSafetyScore(driver) {
  let score = 100;
  const docs = Object.values(driver.docs);
  score -= docs.filter(d => d.status === 'expired').length * 15;
  score -= docs.filter(d => d.status === 'missing').length * 20;
  score -= docs.filter(d => d.status === 'expiring').length * 5;
  score -= driver.violations.filter(v => v.severity === 'critical').length * 15;
  score -= driver.violations.filter(v => v.severity === 'warning').length * 7;
  return Math.max(0, Math.min(100, score));
}

function msCountdown(expStr) {
  if (!expStr) return null;
  const exp = new Date(expStr);
  const now = new Date();
  const diff = Math.round((exp - now) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { text: `Expired ${Math.abs(diff)} days ago`, cls: 'expired' };
  if (diff === 0) return { text: 'Expires today!', cls: 'expired' };
  if (diff <= 30) return { text: `Expires in ${diff} days`, cls: 'expiring' };
  return { text: `Valid — ${diff} days left`, cls: 'valid' };
}

function msFleetComplianceScore(drivers) {
  const active = drivers.filter(d => !d.archived);
  if (!active.length) return 0;
  return Math.round(active.reduce((sum, d) => sum + msCalcCompliance(d), 0) / active.length);
}

// -------------------------------------------------------
// STATE
// -------------------------------------------------------
let msActiveTab = 'overview';
let msSearchQuery = '';
let msRecruiterFilter = 'all';
let msStatusFilter = 'all';
let msActiveCompany = 'United WS';
let msActiveYear = '2026';
let msActiveWeek = 'all';

// -------------------------------------------------------
// RENDER
// -------------------------------------------------------
function renderMasterSafety() {
  const container = document.getElementById('master-safety-view');
  if (!container) return;

  const active = masterSafetyData.filter(d => !d.archived);
  const expiringSoon = active.filter(d =>
    Object.values(d.docs).some(doc => doc.status === 'expiring')
  );
  const critical = active.filter(d => d.status === 'critical');
  const missingDocs = active.filter(d =>
    Object.values(d.docs).some(doc => doc.status === 'missing' || doc.status === 'expired')
  );
  const compliantDrivers = active.filter(d => d.status === 'compliant');
  const fleetScore = msFleetComplianceScore(masterSafetyData);

  container.innerHTML = `
    <div class="ms-container">
      ${msRenderHeader()}
      <div id="ms-dashboard-top">
        ${msRenderKPIs({
          total: masterSafetyData.length,
          active: active.length,
          expiring: expiringSoon.length,
          critical: critical.length,
          missing: missingDocs.length,
          fleetScore
        })}
        ${msRenderAlerts(critical, expiringSoon)}
        ${msRenderCharts(active, compliantDrivers, expiringSoon, critical)}
      </div>
      ${msRenderSubTabs(expiringSoon, critical)}
      <div id="ms-drivers-container">
        ${msRenderDriversList()}
      </div>
    </div>
  `;

  // Attach event listeners
  msAttachListeners();
}

// -------------------------------------------------------
function msRenderHeader() {
  const companies = ['United WS', 'CTC Ground'];
  return `
    <div class="ms-header">
      <div class="ms-header-left">
        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom: 6px;">
          <select 
            onchange="msSetCompany(this.value)"
            style="
              padding: 6px 30px 6px 12px;
              border-radius: 8px;
              border:1px solid var(--border);
              font-size: 18px;
              font-weight: 800;
              color:var(--text);
              background:var(--surface) url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230f172a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 10px center;
              background-size: 10px auto;
              cursor: pointer;
              appearance: none;
              -webkit-appearance: none;
              box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            "
          >
            ${companies.map(c => `
              <option value="${c}" ${msActiveCompany === c ? 'selected' : ''}>${c}</option>
            `).join('')}
          </select>
          <select 
            onchange="msSetYear(this.value)"
            style="
              padding: 6px 30px 6px 12px; border-radius: 8px; border:1px solid var(--border); font-size: 14px; font-weight: 700; color:var(--text);
              background:var(--surface2) url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23334155%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 10px center;
              background-size: 10px auto; cursor: pointer; appearance: none;
            "
          >
            <option value="2026" ${msActiveYear === '2026' ? 'selected' : ''}>2026</option>
            <option value="2025" ${msActiveYear === '2025' ? 'selected' : ''}>2025</option>
          </select>
          <div style="display:flex; align-items:center; gap:8px; background:#fff; border:1px solid var(--border); border-radius:8px; padding:2px 8px;">
            <input type="date" style="border:none; outline:none; font-family:inherit; font-size:14px; font-weight:700; color:var(--text); background:transparent; padding:4px; cursor:pointer;" title="Start date">
            <span style="color:var(--muted); font-size:12px; font-weight:600;">-</span>
            <input type="date" style="border:none; outline:none; font-family:inherit; font-size:14px; font-weight:700; color:var(--text); background:transparent; padding:4px; cursor:pointer;" title="End date">
          </div>
        </div>
        <p style="margin:0; font-size:13px; color:var(--muted);">Fleet compliance & safety management dashboard</p>
      </div>
      <div class="ms-header-actions">
        <input type="text" class="ms-search" id="msSearchInput" placeholder="Search drivers..." value="${msSearchQuery}">
      </div>
    </div>
  `;
}

function msRenderInfoBox() {
  return `
    <div class="ms-info-box">
      <h3>ℹ️ Vodič za Safety Dashboard</h3>
      <div class="ms-info-grid">
        <div class="ms-info-item">
          <span class="ms-info-icon">📊</span>
          <span class="ms-info-text"><strong>Compliance Score</strong> — Procenat validnih dokumenata vozača. Ispod 70% je kritično.</span>
        </div>
        <div class="ms-info-item">
          <span class="ms-info-icon">⭐</span>
          <span class="ms-info-text"><strong>Safety Score</strong> — Ocena bezbednosti (0-100). Oduzima poene za violations i istekle dokumente.</span>
        </div>
        <div class="ms-info-item">
          <span class="ms-info-icon">🚨</span>
          <span class="ms-info-text"><strong>Critical Alert</strong> — Vozač ima isteklo dokumente ili violation. Nije spreman za dispatch.</span>
        </div>
        <div class="ms-info-item">
          <span class="ms-info-icon">⏳</span>
          <span class="ms-info-text"><strong>Expiring Soon</strong> — Dokument ističe u narednih 30 dana. Potrebna obnova.</span>
        </div>
        <div class="ms-info-item">
          <span class="ms-info-icon">📄</span>
          <span class="ms-info-text"><strong>Missing Documents</strong> — Dokument nije dostavljen. Vozač ne može biti aktivan.</span>
        </div>
        <div class="ms-info-item">
          <span class="ms-info-icon">👤</span>
          <span class="ms-info-text"><strong>Status vozača</strong> — Kliknite na ime da otvorite kompletnu driver karticu.</span>
        </div>
      </div>
    </div>
  `;
}

function msRenderKPIs({ total, active, expiring, critical, missing, fleetScore }) {
  return `
    <div class="ms-kpi-row">
      <div class="ms-kpi-card blue">
        <div class="ms-kpi-icon">👥</div>
        <div class="ms-kpi-value">${total}</div>
        <div class="ms-kpi-label">Total Drivers</div>
        <div class="ms-kpi-sub">${active} active, ${total - active} archived</div>
      </div>
      <div class="ms-kpi-card green">
        <div class="ms-kpi-icon">✅</div>
        <div class="ms-kpi-value">${masterSafetyData.filter(d=>d.status==='compliant').length}</div>
        <div class="ms-kpi-label">Compliant Drivers</div>
        <div class="ms-kpi-sub">All documents valid</div>
      </div>
      <div class="ms-kpi-card yellow">
        <div class="ms-kpi-icon">⏳</div>
        <div class="ms-kpi-value">${expiring}</div>
        <div class="ms-kpi-label">Expiring Soon</div>
        <div class="ms-kpi-sub">Within 30 days</div>
      </div>
      <div class="ms-kpi-card red">
        <div class="ms-kpi-icon">🚨</div>
        <div class="ms-kpi-value">${critical}</div>
        <div class="ms-kpi-label">Critical Alerts</div>
        <div class="ms-kpi-sub">Immediate action needed</div>
      </div>
      <div class="ms-kpi-card orange">
        <div class="ms-kpi-icon">📄</div>
        <div class="ms-kpi-value">${missing}</div>
        <div class="ms-kpi-label">Missing Documents</div>
        <div class="ms-kpi-sub">Drivers with gaps</div>
      </div>
      <div class="ms-kpi-card purple">
        <div class="ms-kpi-icon">📈</div>
        <div class="ms-kpi-value">${fleetScore}%</div>
        <div class="ms-kpi-label">Fleet Compliance</div>
        <div class="ms-kpi-sub">Overall fleet score</div>
      </div>
    </div>
  `;
}

function msRenderAlerts(critical, expiringSoon) {
  let html = '';
  if (critical.length > 0) {
    html += `
      <div class="ms-alert-banner">
        <span class="ms-alert-icon">🚨</span>
        <div>
          <div class="ms-alert-text">${critical.length} ${critical.length === 1 ? 'vozač ima' : 'vozača ima'} kritičan status</div>
          <div class="ms-alert-sub">${critical.map(d => d.name).join(', ')} — Nije spreman za dispatch. Odmah reagovati.</div>
        </div>
      </div>
    `;
  }
  if (expiringSoon.length > 0) {
    html += `
      <div class="ms-alert-banner warning">
        <span class="ms-alert-icon">⚠️</span>
        <div>
          <div class="ms-alert-text">${expiringSoon.length} ${expiringSoon.length === 1 ? 'vozač ima' : 'vozača ima'} dokumente koji uskoro ističu</div>
          <div class="ms-alert-sub">${expiringSoon.map(d => d.name).join(', ')} — Zakazati obnovu pre isteka.</div>
        </div>
      </div>
    `;
  }
  return html;
}

function msRenderCharts(active, compliant, expiring, critical) {
  const warning = active.filter(d => d.status === 'warning');
  const totalActive = active.length || 1;
  const compliantPct = Math.round((compliant.length / totalActive) * 100);
  const warningPct = Math.round((warning.length / totalActive) * 100);
  const criticalPct = Math.round((critical.length / totalActive) * 100);

  // Monthly expirations mock
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthCounts = [1, 0, 2, 1, 3, 4];
  const maxCount = Math.max(...monthCounts, 1);

  return `
    <div class="ms-charts-row">
      <div class="ms-chart-card">
        <div class="ms-chart-title">Driver Status Distribution</div>
        <div class="ms-donut-wrap">
          <div class="ms-donut" style="background: conic-gradient(#22c55e 0% ${compliantPct}%, #f59e0b ${compliantPct}% ${compliantPct + warningPct}%, #ef4444 ${compliantPct + warningPct}% 100%);">
          </div>
          <div class="ms-donut-legend">
            <div class="ms-legend-item"><div class="ms-legend-dot" style="background:#22c55e"></div> Compliant (${compliant.length})</div>
            <div class="ms-legend-item"><div class="ms-legend-dot" style="background:#f59e0b"></div> Warning (${warning.length})</div>
            <div class="ms-legend-item"><div class="ms-legend-dot" style="background:#ef4444"></div> Critical (${critical.length})</div>
          </div>
        </div>
      </div>
      <div class="ms-chart-card">
        <div class="ms-chart-title">Upcoming Expirations (Monthly)</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 4px;">
          ${months.map((m, i) => {
            const count = monthCounts[i];
            const bg   = count >= 3 ? '#fee2e2' : count >= 2 ? '#fef3c7' : count >= 1 ? '#dbeafe' : '#f8fafc';
            const col  = count >= 3 ? '#991b1b' : count >= 2 ? '#92400e' : count >= 1 ? '#1e40af' : '#94a3b8';
            const bdr  = count >= 3 ? '#fca5a5' : count >= 2 ? '#fde68a' : count >= 1 ? '#bfdbfe' : '#e2e8f0';
            return `
              <div style="background:${bg}; border:1px solid ${bdr}; border-radius:10px; padding:10px 8px; text-align:center;">
                <div style="font-size:22px; font-weight:800; color:${col}; line-height:1;">${count}</div>
                <div style="font-size:10px; font-weight:700; color:${col}; opacity:0.8; margin-top:3px; text-transform:uppercase;">${m}</div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="margin-top:10px; display:flex; gap:12px; flex-wrap:wrap;">
          <span style="font-size:10px; color:#94a3b8; display:flex; align-items:center; gap:4px;"><span style="width:8px;height:8px;border-radius:2px;background:#bfdbfe;display:inline-block;"></span>1</span>
          <span style="font-size:10px; color:#94a3b8; display:flex; align-items:center; gap:4px;"><span style="width:8px;height:8px;border-radius:2px;background:#fde68a;display:inline-block;"></span>2</span>
          <span style="font-size:10px; color:#94a3b8; display:flex; align-items:center; gap:4px;"><span style="width:8px;height:8px;border-radius:2px;background:#fca5a5;display:inline-block;"></span>3+</span>
        </div>
      </div>
      <div class="ms-chart-card">
        <div class="ms-chart-title">Document Coverage</div>
        ${Object.entries(MS_DOC_LABELS).map(([key, label]) => {
          const validCount = active.filter(d => d.docs[key] && d.docs[key].status === 'valid').length;
          const pct = Math.round((validCount / totalActive) * 100);
          const color = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';
          return `
            <div style="margin-bottom: 8px;">
              <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:600; color:var(--muted); margin-bottom:3px;">
                <span>${label}</span><span>${pct}%</span>
              </div>
              <div class="ms-compliance-bar-bg" style="width:100%;">
                <div class="ms-compliance-bar-fill" style="width:${pct}%; background:${color};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function msRenderSubTabs(expiringSoon, critical) {
  const violationDrivers = masterSafetyData.filter(d => d.violations.length > 0 && !d.archived);
  const archived = masterSafetyData.filter(d => d.archived);

  const tabs = [
    { id: 'overview',    label: 'Overview',         badge: null },
    { id: 'binder',      label: 'Binder & Equipment',badge: null },
    { id: 'claims',      label: 'Claims & Incidents',badge: null },
    { id: 'dot',         label: 'DOT Inspections',  badge: null },
    { id: 'sms',         label: 'SMS',              badge: null },
    { id: 'dataq',       label: 'DataQ',            badge: null },
    { id: 'emp_verify',  label: 'Employment Verification', badge: null },
    { id: 'expiring',    label: 'Expiring Soon',    badge: expiringSoon.length, badgeCls: 'yellow' },
    { id: 'archived',    label: 'Archived',         badge: archived.length, badgeCls: 'blue' }
  ];

  return `
    <div class="ms-sub-tabs" id="msSubTabs">
      ${tabs.map(t => `
        <button class="ms-sub-tab ${msActiveTab === t.id ? 'active' : ''}"
                data-tab="${t.id}" onclick="msSwitchTab('${t.id}')">
          ${t.label}
          ${t.badge ? `<span class="tab-badge ${t.badgeCls}">${t.badge}</span>` : ''}
        </button>
      `).join('')}
    </div>
  `;
}


function msGetFilteredDrivers() {
  return masterSafetyData.filter(driver => {
    // Tab filter
    if (msActiveTab === 'archived' && !driver.archived) return false;
    if (msActiveTab !== 'archived' && driver.archived) return false;
    if (msActiveTab === 'expiring' && !Object.values(driver.docs).some(d => d.status === 'expiring')) return false;
    if (msActiveTab === 'violations' && driver.violations.length === 0) return false;
    if (msActiveTab === 'medical') {
      const medDocs = ['medical', 'drugTest'];
      const hasIssue = medDocs.some(k => driver.docs[k] && driver.docs[k].status !== 'valid');
      if (!hasIssue && msActiveTab === 'medical') { /* show all for medical tab */ }
    }

    // Search
    if (msSearchQuery) {
        const sq = msSearchQuery.toLowerCase();
        if (!driver.name.toLowerCase().includes(sq) &&
            !driver.state.toLowerCase().includes(sq) &&
            !driver.status.toLowerCase().includes(sq) &&
            !(driver.recruiter && driver.recruiter.toLowerCase().includes(sq))
        ) return false;
    }

    return true;
  });
}

function msRenderDriversList() {
  if (msActiveTab === 'claims') return msRenderClaimsTab();
  if (msActiveTab === 'dot') return msRenderDOTTab();
  if (msActiveTab === 'sms') return msRenderSMSTab();
  if (msActiveTab === 'dataq') return msRenderDataQTab();
  if (msActiveTab === 'emp_verify') return msRenderEmpTab();
  if (msActiveTab === 'binder') return msRenderBinderTab();

  const filtered = msGetFilteredDrivers();
  const searchBarHtml = `
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text);">Driver Overview</h3>
      <input type="text" 
             id="msTabSearchInput" 
             placeholder="Search by name, state, status, recruiter..." 
             value="${msSearchQuery}" 
             onkeyup="msHandleTabSearch(this.value)"
             style="width: 320px; padding: 10px 16px; border-radius: 8px; border: 1px solid var(--border); font-size: 13px; background: white; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);">
    </div>
  `;

  let contentHtml = '';
  if (!filtered.length) {
    contentHtml = `
      <div class="ms-drivers-grid ms-empty-state">
        <div class="icon">🔍</div>
        <p>No drivers match your current filters.</p>
      </div>
    `;
  } else {
    contentHtml = `<div class="ms-drivers-grid">${filtered.map(driver => msRenderDriverCard(driver)).join('')}</div>`;
  }

  return searchBarHtml + contentHtml;
}

// --- NEW TAB RENDERERS ---
function msRenderClaimsTab() {
  if (msActiveClaimWorkspaceId !== null) {
     const claim = msMockClaims.find(c => c.id === msActiveClaimWorkspaceId);
     if (claim) return msRenderClaimWorkspace(claim);
  }

  // --- List View ---
  const activeClaims = msMockClaims.filter(c => !c.archived);
  const archivedClaims = msMockClaims.filter(c => c.archived);
  const visibleClaims = msClaimsView === 'active' ? activeClaims : archivedClaims;

  const headerHtml = `
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
       <div style="display:flex; gap: 8px;">
          <button onclick="msSetClaimsView('active')" style="padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; background: ${msClaimsView === 'active' ? 'var(--blue)' : 'var(--surface2)'}; color: ${msClaimsView === 'active' ? 'white' : 'var(--muted)'}; border: ${msClaimsView === 'active' ? 'none' : '1px solid var(--border)'};">Active Claims (${activeClaims.length})</button>
          <button onclick="msSetClaimsView('archived')" style="padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; background: ${msClaimsView === 'archived' ? 'var(--blue)' : 'var(--surface2)'}; color: ${msClaimsView === 'archived' ? 'white' : 'var(--muted)'}; border: ${msClaimsView === 'archived' ? 'none' : '1px solid var(--border)'};">Archived (${archivedClaims.length})</button>
       </div>
       <button onclick="msCreateNewClaim()" style="background: var(--blue); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">+ Create Claim</button>
    </div>
  `;
  if (!visibleClaims.length) return headerHtml + '<div class="ms-empty-state"><div class="icon">🔍</div><p>No claims found in this view.</p></div>';
  
  // Render compact list instead of massive cards
  const listHtml = `
    <div style="display:flex; flex-direction:column; gap:12px;">
       ${visibleClaims.map(c => `
         <div onclick="msOpenClaimWorkspace('${c.id}')" style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; transition:all 0.2s; box-shadow:0 1px 3px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'">
            <div style="display:flex; align-items:center; gap:20px;">
               <div style="width:48px; height:48px; border-radius:10px; background:var(--surface3); display:flex; align-items:center; justify-content:center; font-size:20px;">📄</div>
               <div>
                  <div style="font-size:16px; font-weight:800; color:var(--text); margin-bottom:4px;">${c.driver || 'Unknown Driver'}</div>
                  <div style="font-size:12px; font-weight:600; color:var(--muted);">${c.date} • ${c.company || 'Unknown Co.'} • Trk: ${c.equipment}</div>
               </div>
            </div>
            <div style="display:flex; align-items:center; gap:24px;">
               <div style="display:flex; flex-direction:column; align-items:flex-end;">
                  <span style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase;">Claim #</span>
                  <span style="font-size:14px; font-weight:800; color:var(--text);">${c.claimId}</span>
               </div>
               <div style="padding:6px 12px; border-radius:20px; font-size:11px; font-weight:800; background:var(--surface3); color:var(--text);">
                  ${c.status}
               </div>
            </div>
         </div>
       `).join('')}
    </div>
  `;
  return headerHtml + listHtml;
}

// ==========================================
// CLAIM WORKSPACE RENDERING
// ==========================================
function msRenderClaimWorkspace(claim) {
  return `
    <div style="background:var(--surface); border-radius:16px; border:1px solid var(--border); overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
       ${msRenderClaimHeader(claim)}
       <div style="display:flex; min-height:800px;">
          <!-- Left Column: Details -->
          <div style="width:60%; padding:24px; border-right:1px solid var(--border); display:flex; flex-direction:column; gap:24px; background:#fafafa;">
             ${msRenderClaimDetails(claim)}
             ${msRenderAccidentDetails(claim)}
             ${msRenderFinancials(claim)}
             ${msRenderTextAreas(claim)}
          </div>
          <!-- Right Column: Upload, AI, Tracking -->
          <div style="width:40%; padding:24px; display:flex; flex-direction:column; gap:24px; background:white;">
             ${msRenderEvidenceUpload(claim)}
             ${msRenderAIReviewPanel(claim)}
             ${msRenderMissingChecklist(claim)}
             ${msRenderTimeline(claim)}
          </div>
       </div>
    </div>
  `;
}

function msRenderClaimHeader(c) {
  const statuses = ['Draft', 'Accident Reported', 'Evidence Pending', 'Claim Submitted', 'Waiting for Police Report', 'Under Investigation', 'Repair Pending', 'Settlement Pending', 'Closed', 'Archived'];
  return `
    <div style="background:white; border-bottom:1px solid var(--border); padding:20px 24px; display:flex; justify-content:space-between; align-items:flex-start;">
      <div style="display:flex; flex-direction:column; gap:12px;">
         <div style="display:flex; align-items:center; gap:16px;">
            <button onclick="msCloseClaimWorkspace()" style="background:var(--surface2); border:none; padding:8px; border-radius:8px; cursor:pointer; font-size:14px;">⬅</button>
            <h2 style="margin:0; font-size:20px; font-weight:800; color:var(--text);">Claim Workspace: ${c.claimId}</h2>
            <div style="padding:4px 10px; border-radius:12px; font-size:12px; font-weight:800; background:var(--blue); color:white;">AI Complete: ${c.aiScore}%</div>
         </div>
         <div style="font-size:13px; font-weight:600; color:var(--muted);">
            Driver: <span style="color:var(--text); font-weight:800;">${c.driver || 'N/A'}</span> • 
            Date: <span style="color:var(--text); font-weight:800;">${c.date}</span> • 
            Trk: <span style="color:var(--text); font-weight:800;">${c.equipment || 'N/A'}</span>
         </div>
         ${c.missingItems.length > 0 ? `<div style="font-size:12px; font-weight:700; color:#ef4444; background:#fef2f2; padding:6px 10px; border-radius:6px; border:1px solid #fca5a5; display:inline-block;">Missing: ${c.missingItems.join(', ')}</div>` : ''}
      </div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:12px;">
         <select onchange="msUpdateClaimField('${c.id}', 'status', this.value)" style="padding:8px 16px; border-radius:8px; border:1px solid var(--border-dark); font-size:13px; font-weight:700; background:var(--surface); outline:none; cursor:pointer;">
            ${statuses.map(s => `<option value="${s}" ${c.status === s ? 'selected' : ''}>${s}</option>`).join('')}
         </select>
         <button onclick="msCreateDataQCaseFromRecord('Claim', '${c.claimId}', '${c.driver}')" style="padding: 6px 16px; border-radius: 6px; border: 1px solid var(--border-dark); background:var(--surface2); color:var(--text); font-size: 12px; font-weight: 700; cursor: pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
            ⚡ Create DataQ Case
         </button>
         <button onclick="msToggleArchiveClaim('${c.id}')" style="padding: 6px 16px; border-radius: 6px; border: 1px solid ${c.archived ? '#10b981' : '#e74c3c'}; background:transparent; color:${c.archived ? '#10b981' : '#e74c3c'}; font-size: 12px; font-weight: 700; cursor: pointer;">
            ${c.archived ? 'Unarchive Claim' : 'Archive Claim'}
         </button>
      </div>
    </div>
  `;
}

function msRenderClaimDetails(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Claim Details</h3>
       <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Driver</span>
             <input type="text" value="${c.driver}" onchange="msUpdateClaimField('${c.id}', 'driver', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Company</span>
             <input type="text" value="${c.company}" onchange="msUpdateClaimField('${c.id}', 'company', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Claim #</span>
             <input type="text" value="${c.claimId}" onchange="msUpdateClaimField('${c.id}', 'claimId', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Equipment / Truck</span>
             <input type="text" value="${c.equipment}" onchange="msUpdateClaimField('${c.id}', 'equipment', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
       </div>
    </div>
  `;
}

function msRenderAccidentDetails(c) {
  const acc = c.accident;
  const types = ['Collision', 'Slide-off', 'Jackknife', 'Rollover', 'Rear-end', 'Side-swipe', 'Hit object', 'Cargo damage', 'Theft', 'Fire', 'Other'];
  const weather = ['Clear', 'Rain', 'Snow', 'Ice', 'Strong winds', 'Fog', 'Other'];
  const yn = ['Yes', 'No', 'Unknown'];
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Accident Details</h3>
       <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
          <!-- Col 1 -->
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Accident Date</span>
             <input type="date" value="${c.date}" onchange="msUpdateClaimField('${c.id}', 'date', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
          <div style="grid-column: span 2;">
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Location</span>
             <input type="text" value="${acc.location}" onchange="msUpdateNestedClaimField('${c.id}', 'accident.location', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Accident Type</span>
             <select onchange="msUpdateNestedClaimField('${c.id}', 'accident.type', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
                <option value="">Select...</option>
                ${types.map(t => `<option value="${t}" ${acc.type === t ? 'selected' : ''}>${t}</option>`).join('')}
             </select>
          </div>
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Weather</span>
             <select onchange="msUpdateNestedClaimField('${c.id}', 'accident.weather', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
                <option value="">Select...</option>
                ${weather.map(t => `<option value="${t}" ${acc.weather === t ? 'selected' : ''}>${t}</option>`).join('')}
             </select>
          </div>
          <div>
             <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:700;">Road Cond.</span>
             <input type="text" value="${acc.roadCondition}" onchange="msUpdateNestedClaimField('${c.id}', 'accident.roadCondition', this.value)" style="width:100%; padding:8px 12px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:600; outline:none; margin-top:4px;">
          </div>
          
          <div style="grid-column: span 3; border-top:1px solid var(--border); margin-top:8px; padding-top:16px; display:flex; flex-wrap:wrap; gap:16px;">
             <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:var(--text); cursor:pointer;">
                <input type="checkbox" onchange="msUpdateNestedClaimField('${c.id}', 'accident.policeCalled', this.checked ? 'Yes' : 'No')" ${acc.policeCalled === 'Yes' ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;"> Police Called
             </label>
             <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:var(--text); cursor:pointer;">
                <input type="checkbox" onchange="msUpdateNestedClaimField('${c.id}', 'accident.towRequired', this.checked ? 'Yes' : 'No')" ${acc.towRequired === 'Yes' ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;"> Tow Required
             </label>
             <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:var(--text); cursor:pointer;">
                <input type="checkbox" onchange="msUpdateNestedClaimField('${c.id}', 'accident.cargoDamage', this.checked ? 'Yes' : 'No')" ${acc.cargoDamage === 'Yes' ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;"> Cargo Damage
             </label>
             <label style="display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:var(--text); cursor:pointer;">
                <input type="checkbox" onchange="msUpdateNestedClaimField('${c.id}', 'accident.injuries', this.checked ? 'Yes' : 'No')" ${acc.injuries === 'Yes' ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;"> Injuries
             </label>
          </div>
       </div>
    </div>
  `;
}

function msRenderFinancialField(c, label, fieldKey) {
  const data = c.financials[fieldKey];
  return `
    <div style="display:flex; flex-direction:column; background:var(--surface); border-radius:8px; border:1px solid var(--border); padding:12px;">
       <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:800; margin-bottom:8px;">${label}</span>
       <div style="position:relative;">
          <span style="position:absolute; left:8px; top:8px; font-size:14px; font-weight:800; color:var(--muted);">$</span>
          <input type="number" value="${data.val}" onchange="msUpdateNestedClaimField('${c.id}', 'financials.${fieldKey}.val', this.value)" style="width:100%; padding:8px 8px 8px 24px; border:1px solid var(--border-dark); border-radius:6px; font-size:14px; font-weight:800; outline:none;">
       </div>
       ${data.source ? `
       <div style="margin-top:8px; font-size:10px; color:var(--muted); display:flex; align-items:center; gap:4px; font-weight:600;">
          <span style="color:var(--blue)">✨ AI</span> ${data.source} (${data.conf}%)
       </div>
       ` : '<div style="margin-top:8px; font-size:10px; color:var(--muted); font-weight:600;">Manual Entry</div>'}
    </div>
  `;
}

function msRenderFinancials(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Financials</h3>
       <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
          ${msRenderFinancialField(c, 'Tow Paid', 'towPaid')}
          ${msRenderFinancialField(c, 'Repair Estimate', 'repairEstimate')}
          ${msRenderFinancialField(c, 'Repair Paid', 'repairPaid')}
          ${msRenderFinancialField(c, 'Deductible', 'deductible')}
          ${msRenderFinancialField(c, 'Claim Collected', 'claimCollected')}
          ${msRenderFinancialField(c, 'Cargo Loss', 'cargoLoss')}
       </div>
    </div>
  `;
}

function msRenderTextAreas(c) {
  return `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div style="display:flex; flex-direction:column; background:white; padding:16px; border-radius:12px; border:1px solid var(--border);">
           <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:800; margin-bottom:8px;">Accident Description</span>
           <textarea onchange="msUpdateClaimField('${c.id}', 'desc', this.value)" style="width:100%; min-height:80px; padding:10px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:500; outline:none; resize:vertical; background:var(--surface);">${c.desc}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; background:white; padding:16px; border-radius:12px; border:1px solid var(--border);">
           <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:800; margin-bottom:8px;">Operational Updates</span>
           <textarea onchange="msUpdateClaimField('${c.id}', 'updates', this.value)" style="width:100%; min-height:80px; padding:10px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:500; outline:none; resize:vertical; background:var(--surface);">${c.updates}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; background:white; padding:16px; border-radius:12px; border:1px solid var(--border);">
           <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:800; margin-bottom:8px;">Internal Notes</span>
           <textarea onchange="msUpdateClaimField('${c.id}', 'notes', this.value)" style="width:100%; min-height:80px; padding:10px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:500; outline:none; resize:vertical; background:var(--surface);">${c.notes}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; background:white; padding:16px; border-radius:12px; border:1px solid var(--border);">
           <span style="font-size:11px; color:var(--muted); text-transform:uppercase; font-weight:800; margin-bottom:8px;">Closing Comment</span>
           <textarea onchange="msUpdateClaimField('${c.id}', 'comment', this.value)" style="width:100%; min-height:80px; padding:10px; border:1px solid var(--border-dark); border-radius:8px; font-size:13px; font-weight:500; outline:none; resize:vertical; background:var(--surface);">${c.comment}</textarea>
        </div>
    </div>
  `;
}

function msSimulateAIUpload(claimId, category) {
  // Simple simulation of an AI upload process updating the timeline and missing items
  const c = msMockClaims.find(x => x.id === parseInt(claimId));
  if(c) {
     c.timeline.unshift({ date: new Date().toLocaleString(), user: 'Current User', action: `${category} uploaded & processed`, target: '' });
     c.missingItems = c.missingItems.filter(i => i !== category);
     const ev = c.evidence.find(e => e.category === category);
     if(ev) {
         ev.status = 'AI Processed';
         ev.filename = 'uploaded_file.pdf';
     } else {
         c.evidence.push({ category: category, filename: 'uploaded_file.pdf', status: 'AI Processed' });
     }
     renderMasterSafety();
  }
}

function msRenderEvidenceUpload(c) {
  const getBadgeColor = (status) => {
      switch(status) {
          case 'Missing': return '#ef4444; background:#fef2f2; border:1px solid #fca5a5;';
          case 'Uploaded': return '#3b82f6; background:#eff6ff; border:1px solid #93c5fd;';
          case 'AI Processed': return '#8b5cf6; background:#f5f3ff; border:1px solid #c4b5fd;';
          default: return '#64748b; background:#f8fafc; border:1px solid #e2e8f0;';
      }
  };

  const categories = ['Police Report', 'Accident Photos', 'Driver Statement', 'Tow Invoice', 'Repair Estimate', 'Repair Invoice', 'Settlement Letter'];
  
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Evidence Upload Center</h3>
       <div style="display:flex; flex-direction:column; gap:12px;">
          ${categories.map(cat => {
              const ev = c.evidence.find(e => e.category === cat) || { status: 'Missing', filename: '' };
              return `
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; border:1px solid var(--border); border-radius:8px; background:var(--surface);">
                 <div style="display:flex; flex-direction:column; gap:4px;">
                    <span style="font-size:13px; font-weight:800; color:var(--text);">${cat}</span>
                    ${ev.filename ? `<span style="font-size:11px; color:var(--muted);">${ev.filename}</span>` : ''}
                 </div>
                 <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-size:11px; font-weight:800; padding:4px 8px; border-radius:6px; ${getBadgeColor(ev.status)}">${ev.status}</span>
                    <button onclick="msSimulateAIUpload('${c.id}', '${cat}')" style="background:var(--blue); color:white; border:none; border-radius:6px; padding:6px 12px; font-size:11px; font-weight:700; cursor:pointer;">Upload</button>
                 </div>
              </div>
              `;
          }).join('')}
       </div>
    </div>
  `;
}

function msRenderAIReviewPanel(c) {
  if (!c.aiSuggestions || c.aiSuggestions.length === 0) return '';
  return `
    <div style="background:#f5f3ff; border-radius:12px; border:1px solid #c4b5fd; padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:#6d28d9; text-transform:uppercase; display:flex; align-items:center; gap:8px;">✨ AI Extracted Data Review</h3>
       <div style="display:flex; flex-direction:column; gap:12px;">
          ${c.aiSuggestions.map((s, idx) => `
             <div style="background:white; padding:12px; border-radius:8px; border:1px solid #ddd6fe;">
                <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; margin-bottom:4px;">${s.field}</div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                   <div style="font-size:13px;">
                      <span style="text-decoration:line-through; color:var(--muted); margin-right:8px;">${s.current}</span>
                      <span style="font-weight:800; color:var(--text);">${s.suggested}</span>
                   </div>
                   <div style="font-size:11px; font-weight:700; color:#8b5cf6;">${s.conf}% Conf.</div>
                </div>
                <div style="font-size:10px; color:var(--muted); margin-top:4px;">Source: ${s.source}</div>
                <div style="display:flex; gap:8px; margin-top:12px;">
                   <button onclick="alert('Applied ${s.suggested}'); renderMasterSafety();" style="flex:1; background:#10b981; color:white; border:none; padding:6px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;">Apply</button>
                   <button onclick="alert('Ignored');" style="flex:1; background:var(--surface3); color:var(--text); border:none; padding:6px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;">Ignore</button>
                </div>
             </div>
          `).join('')}
       </div>
    </div>
  `;
}

function msRenderMissingChecklist(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Missing Information</h3>
       <div style="display:flex; flex-direction:column; gap:8px;">
          ${c.missingItems.length === 0 ? '<div style="font-size:13px; font-weight:600; color:#10b981;">✅ All required items are complete.</div>' : ''}
          ${c.missingItems.map(item => `
             <div style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:var(--text);">
                <div style="width:16px; height:16px; border:2px solid #ef4444; border-radius:4px;"></div>
                ${item}
             </div>
          `).join('')}
       </div>
    </div>
  `;
}

function msRenderTimeline(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
       <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Claim Timeline</h3>
       <div style="display:flex; flex-direction:column; gap:16px; border-left:2px solid var(--border); margin-left:8px; padding-left:16px;">
          ${c.timeline.map(t => `
             <div style="position:relative;">
                <div style="position:absolute; left:-25px; top:2px; width:10px; height:10px; border-radius:50%; background:var(--blue); border:4px solid white;"></div>
                <div style="font-size:11px; font-weight:700; color:var(--muted);">${t.date} • ${t.user}</div>
                <div style="font-size:13px; font-weight:600; color:var(--text); margin-top:2px;">${t.action}</div>
                ${t.target ? `<div style="font-size:11px; font-weight:600; color:var(--blue); margin-top:2px;">📄 ${t.target}</div>` : ''}
             </div>
          `).join('')}
       </div>
    </div>
  `;
}

function msRenderDOTTab() {
  const companyScoreHtml = `
    <div style="margin-bottom:24px; background:var(--surface); padding:20px; border-radius:14px; border:1px solid var(--border); box-shadow:0 1px 4px rgba(0,0,0,0.05);">
      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; padding-bottom:24px; border-bottom:1px solid var(--border);">
        <div style="text-align:center;">
          <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">Unsafe Driving</div>
          <div style="width:80px; height:80px; margin:0 auto; border-radius:50%; border:6px solid #f59e0b; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:var(--text);">
            56
          </div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">Crash Indicator</div>
          <div style="width:80px; height:80px; margin:0 auto; border-radius:50%; border:6px solid #ef4444; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:var(--text);">
            84
          </div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">Vehicle Maint</div>
          <div style="width:80px; height:80px; margin:0 auto; border-radius:50%; border:6px solid #22c55e; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:var(--text);">
            0
          </div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">HOS</div>
          <div style="width:80px; height:80px; margin:0 auto; border-radius:50%; border:6px solid #ef4444; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:var(--text);">
            79
          </div>
        </div>
      </div>
      
      <div style="margin-top:24px;">
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          
          <!-- Column 1: Inspection Levels -->
          <div>
            <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">Inspection Levels</div>
            
            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>Level 1</span><span>45%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:45%; background:#3b82f6; border-radius:3px;"></div>
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>Level 2</span><span>30%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:30%; background:#10b981; border-radius:3px;"></div>
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>Level 3</span><span>25%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:25%; background:#f59e0b; border-radius:3px;"></div>
              </div>
            </div>
          </div>

          <!-- Column 2: Top States -->
          <div>
            <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">Top 3 States</div>
            
            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>TX (Texas)</span><span>35%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:35%; background:#6366f1; border-radius:3px;"></div>
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>OH (Ohio)</span><span>25%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:25%; background:#8b5cf6; border-radius:3px;"></div>
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>PA (Pennsylvania)</span><span>20%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:20%; background:#d946ef; border-radius:3px;"></div>
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                <span>Other</span><span>20%</span>
              </div>
              <div style="height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                <div style="height:100%; width:20%; background:#94a3b8; border-radius:3px;"></div>
              </div>
            </div>
          </div>

          <!-- Column 3: Top Violations -->
          <div>
            <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase; margin-bottom:12px;">Top Violations Breakdown</div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); font-size:12px;">
              <span style="font-weight:600;">Brakes (Out of Adj.)</span>
              <span style="font-weight:800; color:#ef4444; background:#fef2f2; padding:2px 6px; border-radius:4px;">42</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); font-size:12px;">
              <span style="font-weight:600;">Inoperable Lamps</span>
              <span style="font-weight:800; color:#ef4444; background:#fef2f2; padding:2px 6px; border-radius:4px;">38</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); font-size:12px;">
              <span style="font-weight:600;">Tire Tread Depth</span>
              <span style="font-weight:800; color:#f59e0b; background:#fffbeb; padding:2px 6px; border-radius:4px;">15</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); font-size:12px;">
              <span style="font-weight:600;">Logbook Not Current</span>
              <span style="font-weight:800; color:#f59e0b; background:#fffbeb; padding:2px 6px; border-radius:4px;">12</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; font-size:12px;">
              <span style="font-weight:600;">Speeding (6-10 mph over)</span>
              <span style="font-weight:800; color:var(--text); background:var(--surface3); padding:2px 6px; border-radius:4px;">8</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  
  const filterHtml = `
  <div style="display: flex; gap: 16px; margin-bottom: 16px; background: var(--surface); padding: 16px; border-radius: 12px; border: 1px solid var(--border);">
      <input type="text" id="msDotSearch" placeholder="Search by name..." style="flex: 1; padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border); font-size: 13px; outline: none;" onkeyup="msFilterDOT()">
      <select id="msDotStatus" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border); font-size: 13px; outline: none; font-weight: 600;" onchange="msFilterDOT()">
          <option value="All">All Statuses</option>
          <option value="Clean">Clean</option>
          <option value="Violation">Violation</option>
          <option value="OOS">OOS</option>
      </select>
      <select id="msDotType" style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border); font-size: 13px; outline: none; font-weight: 600;" onchange="msFilterDOT()">
          <option value="All">All Violations</option>
          <option value="HOS">HOS</option>
          <option value="UNS">Unsafe Driving</option>
          <option value="MNT">Vehicle Maint</option>
          <option value="OOS_Type">OOS Violations</option>
      </select>
  </div>
  `;

  const listHtml = `
  <style>
    .ms-dot-cards-container { display: flex; flex-direction: column; gap: 16px; padding-bottom: 20px; }
    .dot-row-item { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .ms-grid-box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; cursor: pointer; transition: all 0.2s; }
    .ms-grid-box:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.05); transform: translateY(-2px); }
    .ms-grid-box.alert { border-color: #fca5a5; background: #fef2f2; }
    .ms-grid-box-title { font-size: 10px; font-weight: 800; color: var(--blue); text-transform: uppercase; margin-bottom: 8px; line-height: 1.2; text-align: center; }
    .ms-grid-box-val { font-size: 18px; font-weight: 800; color: #10b981; }
    .ms-grid-box.alert .ms-grid-box-val { color: #ef4444; }
  </style>
  ${filterHtml}
  <div class="ms-dot-cards-container">
    ` + msMockDOT.map(d => {
        let l1Count = 0;
        let l2Count = 0;
        let l3Count = 0;
        
        if (d.id === 0 && d.clean === 4) {
            l1Count += 1;
            l2Count += 3;
            l1Count += (d.unsafe + d.oos);
            l2Count += d.hos;
            l3Count += d.maint;
        } else {
            l2Count += d.clean || 0;
            l1Count += (d.unsafe + d.oos);
            l2Count += d.hos;
            l3Count += d.maint;
        }
        
        const total = l1Count + l2Count + l3Count;
        let conicBg = '';
        if (total === 0) {
            conicBg = 'conic-gradient(#e2e8f0 0% 100%)';
        } else {
            const p1 = (l1Count / total) * 100;
            const p2 = p1 + ((l2Count / total) * 100);
            conicBg = `conic-gradient(#3b82f6 0% ${p1}%, #ef4444 ${p1}% ${p2}%, #eab308 ${p2}% 100%)`;
        }

        return `
    <div class="dot-row-item" data-id="${d.id}" data-name="${d.driver.toLowerCase()}" data-status="${d.status}" data-hos="${d.hos}" data-uns="${d.unsafe}" data-mnt="${d.maint}" data-oos="${d.oos}">
      <!-- Driver Name & Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div style="font-size: 18px; font-weight: 800; color: var(--text);">
              ${d.driver}
          </div>
          <button onclick="msCreateDataQCaseFromRecord('DOT Inspection', '${d.id}', '${d.driver}')" style="background:var(--surface2); color:var(--text); border:1px solid var(--border); padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; transition:0.2s;">⚡ Challenge via DataQ</button>
      </div>
      
      <!-- Summary Grid -->
      <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; margin-bottom: 20px;">
          <!-- Pie Chart -->
          <div class="ms-grid-box" onclick="msToggleHistory('${d.id}', 'All')">
              <div class="ms-grid-box-title">Inspections</div>
              <div style="width: 36px; height: 36px; border-radius: 50%; background: ${conicBg}; margin-bottom: 8px;"></div>
              <div style="display: flex; gap: 4px; font-size: 8px; color: var(--muted); font-weight: 700;">
                  <span style="color:#3b82f6">■ L1</span> <span style="color:#ef4444">■ L2</span> <span style="color:#eab308">■ L3</span>
              </div>
          </div>
          <!-- Clean Inspection -->
          <div class="ms-grid-box" onclick="msToggleHistory('${d.id}', 'Clean Inspection')">
              <div class="ms-grid-box-title">Clean<br>Inspection</div>
              <div class="ms-grid-box-val">${d.clean || 0}</div>
          </div>
          <!-- Vehicle Maint -->
          <div class="ms-grid-box ${d.maint > 0 ? 'alert' : ''}" onclick="msToggleHistory('${d.id}', 'Vehicle Maint.')">
              <div class="ms-grid-box-title">Vehicle<br>Maint.</div>
              <div class="ms-grid-box-val">${d.maint}</div>
          </div>
          <!-- HOS COMP -->
          <div class="ms-grid-box ${d.hos > 0 ? 'alert' : ''}" onclick="msToggleHistory('${d.id}', 'HOS Comp.')">
              <div class="ms-grid-box-title">HOS Comp.</div>
              <div class="ms-grid-box-val">${d.hos}</div>
          </div>
          <!-- Unsafe Driving -->
          <div class="ms-grid-box ${d.unsafe > 0 ? 'alert' : ''}" onclick="msToggleHistory('${d.id}', 'Unsafe Driving')">
              <div class="ms-grid-box-title">Unsafe<br>Driving</div>
              <div class="ms-grid-box-val">${d.unsafe}</div>
          </div>
          <!-- Other Violations -->
          <div class="ms-grid-box" onclick="msToggleHistory('${d.id}', 'Other')">
              <div class="ms-grid-box-title">Other<br>Violations</div>
              <div class="ms-grid-box-val">0</div>
          </div>
          <!-- OOS -->
          <div class="ms-grid-box ${d.oos > 0 ? 'alert' : ''}" onclick="msToggleHistory('${d.id}', 'OOS')">
              <div class="ms-grid-box-title">OOS</div>
              <div class="ms-grid-box-val">${d.oos}</div>
          </div>
          <!-- INSP RETURNED -->
          <div class="ms-grid-box alert">
              <div class="ms-grid-box-title">Insp.<br>Returned</div>
              <div class="ms-grid-box-val" style="font-size: 16px;">NO</div>
          </div>
      </div>
      
      <!-- History Section -->
      <div id="ms-history-container-${d.id}" style="display: none; margin-bottom: 16px; background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <h3 id="ms-history-title-${d.id}" style="margin: 0; font-size: 15px; font-weight: 800; color: var(--text);">Violation History</h3>
              <button onclick="document.getElementById('ms-history-container-${d.id}').style.display='none'" style="background: none; border: none; color: var(--blue); font-weight: 700; cursor: pointer; font-size: 13px;">← Back to Summary</button>
          </div>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
              <thead>
                  <tr>
                      <th style="text-align: left; padding: 0 16px 8px; color: var(--muted); font-size: 12px; font-weight: 700;">Date</th>
                      <th style="text-align: left; padding: 0 16px 8px; color: var(--muted); font-size: 12px; font-weight: 700;">Type</th>
                      <th style="text-align: left; padding: 0 16px 8px; color: var(--muted); font-size: 12px; font-weight: 700;">Level</th>
                      <th style="text-align: left; padding: 0 16px 8px; color: var(--muted); font-size: 12px; font-weight: 700;">Description</th>
                      <th style="text-align: left; padding: 0 16px 8px; color: var(--muted); font-size: 12px; font-weight: 700;">Status</th>
                  </tr>
              </thead>
              <tbody id="ms-history-body-${d.id}">
                  <!-- Rows injected via JS -->
              </tbody>
          </table>
      </div>

      <!-- Notes -->
      <div style="font-size: 13px; color: var(--text); padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <strong style="color: var(--blue); font-weight: 800; text-transform: uppercase; font-size: 11px;">Notes:</strong><br>
          <span style="margin-top: 4px; display: inline-block;">${d.notes || 'No notes available.'}</span>
      </div>
    </div>
    `;
    }).join('') + `
  </div>
  `;

  return companyScoreHtml + listHtml;
}

function msFilterDOT() {
    const search = document.getElementById('msDotSearch').value.toLowerCase();
    const status = document.getElementById('msDotStatus').value;
    const type = document.getElementById('msDotType').value;
    
    document.querySelectorAll('.dot-row-item').forEach(row => {
        const d_name = row.getAttribute('data-name').toLowerCase();
        const d_status = row.getAttribute('data-status');
        const d_hos = parseInt(row.getAttribute('data-hos') || '0');
        const d_uns = parseInt(row.getAttribute('data-uns') || '0');
        const d_mnt = parseInt(row.getAttribute('data-mnt') || '0');
        const d_oos = parseInt(row.getAttribute('data-oos') || '0');
        
        let match = true;
        if (search && !d_name.includes(search)) match = false;
        if (status !== 'All' && d_status !== status) match = false;
        
        if (type !== 'All') {
            if (type === 'HOS' && d_hos === 0) match = false;
            if (type === 'UNS' && d_uns === 0) match = false;
            if (type === 'MNT' && d_mnt === 0) match = false;
            if (type === 'OOS_Type' && d_oos === 0) match = false;
        }
        
        row.style.display = match ? 'block' : 'none';
        const expandRow = document.getElementById('ms-history-container-' + row.getAttribute('data-id'));
        if (expandRow) expandRow.style.display = 'none';
    });
}

window.msToggleHistory = function(id, category) {
    const container = document.getElementById('ms-history-container-' + id);
    const title = document.getElementById('ms-history-title-' + id);
    const tbody = document.getElementById('ms-history-body-' + id);
    
    const d = msMockDOT.find(x => x.id == id);
    let mockData = [];
    if (d) {
        if (d.clean > 0) {
            if (d.id === 0 && d.clean === 4) {
                 mockData.push({ date: '2025-08-15', type: 'Clean Inspection', level: 'Level 1', desc: 'No violations found', status: 'Cleared', badgeColor: '#d1fae5', badgeText: '#059669', manualAmount: 150, actualAmount: 150, challenged: 'No', ticket: false, hm: false });
                 for(let i=0; i<3; i++) {
                     mockData.push({ date: '2025-05-1' + i, type: 'Clean Inspection', level: 'Level 2', desc: 'No violations found', status: 'Cleared', badgeColor: '#d1fae5', badgeText: '#059669', manualAmount: 100, actualAmount: 100, challenged: 'No', ticket: false, hm: false });
                 }
            } else {
                 for(let i=0; i<d.clean; i++) {
                     mockData.push({ date: d.date, type: 'Clean Inspection', level: 'Level ' + (d.level || 2), desc: 'No violations found', status: 'Cleared', badgeColor: '#d1fae5', badgeText: '#059669', manualAmount: d.manualAmount, actualAmount: d.actualAmount, challenged: d.challenged, ticket: d.ticket, hm: d.hm });
                 }
            }
        }
        for (let i=0; i<d.unsafe; i++) mockData.push({ date: d.date, type: 'Unsafe Driving', level: 'Level 1', desc: 'Speeding / Lane Violation', status: 'Violation', badgeColor: '#fee2e2', badgeText: '#ef4444', manualAmount: d.manualAmount, actualAmount: d.actualAmount, challenged: d.challenged, ticket: d.ticket, hm: d.hm });
        for (let i=0; i<d.maint; i++) mockData.push({ date: d.date, type: 'Vehicle Maint.', level: 'Level 3', desc: 'Equipment defect', status: 'Violation', badgeColor: '#fee2e2', badgeText: '#ef4444', manualAmount: d.manualAmount, actualAmount: d.actualAmount, challenged: d.challenged, ticket: d.ticket, hm: d.hm });
        for (let i=0; i<d.hos; i++) mockData.push({ date: d.date, type: 'HOS Comp.', level: 'Level 2', desc: 'Logbook violation', status: 'Violation', badgeColor: '#fee2e2', badgeText: '#ef4444', manualAmount: d.manualAmount, actualAmount: d.actualAmount, challenged: d.challenged, ticket: d.ticket, hm: d.hm });
        for (let i=0; i<d.oos; i++) mockData.push({ date: d.date, type: 'OOS', level: 'Level 1', desc: 'Out of Service - Brakes', status: 'Violation', badgeColor: '#fee2e2', badgeText: '#ef4444', manualAmount: d.manualAmount, actualAmount: d.actualAmount, challenged: d.challenged, ticket: d.ticket, hm: d.hm });
    }

    if (container.style.display === 'none' || title.dataset.cat !== category) {
        container.style.display = 'block';
        title.innerText = category === 'All' ? 'Violation History: All Inspections' : `Violation History: ${category}`;
        title.dataset.cat = category;
        
        const filteredData = category === 'All' ? mockData : mockData.filter(item => item.type === category);
        
        if (filteredData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="padding: 16px; text-align: center; color: var(--muted);">No history available for ${category}</td></tr>`;
        } else {
            tbody.innerHTML = filteredData.map((item, i) => {
                let expandedHtml = '';
                if (item.status === 'Violation') {
                    expandedHtml = `
                        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
                            <div style="padding: 6px 16px; border-radius: 6px; background-color: #fef2f2; border: 1px solid #fee2e2; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 14px; font-weight: 800; color: #ef4444; letter-spacing: 1px; text-transform: uppercase;">Charge</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Manual</span>
                                <div style="position: relative; width: 100px;">
                                    <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                    <input type="number" value="${item.manualAmount}" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Actual</span>
                                <div style="position: relative; width: 100px;">
                                    <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                    <input type="number" value="${item.actualAmount}" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 24px; padding: 12px 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <button type="button" onclick="this.innerText='Pending'; this.style.backgroundColor='#fef3c7'; this.style.color='#d97706'; this.style.borderColor='#fde68a';" style="padding: 6px 16px; border: 1px solid #cbd5e1; border-radius: 6px; background: ${item.challenged === 'Yes' ? '#fef3c7' : 'white'}; color: ${item.challenged === 'Yes' ? '#d97706' : 'var(--text)'}; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s;">
                                ${item.challenged === 'Yes' ? 'Pending' : 'Challenge'}
                            </button>
                            <label style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; cursor:pointer; color: var(--text);">
                                <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--blue);" ${item.ticket ? 'checked' : ''}> Ticket
                            </label>
                            <label style="display:flex; align-items:center; gap:8px; font-size:13px; font-weight:700; cursor:pointer; color: var(--text);">
                                <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--blue);" ${item.hm ? 'checked' : ''}> HM
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
                                    <input type="number" value="${item.manualAmount}" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase;">Actual</span>
                                <div style="position: relative; width: 100px;">
                                    <span style="position: absolute; left: 8px; top: 6px; font-size: 13px; font-weight: 600; color: var(--muted);">$</span>
                                    <input type="number" value="${item.actualAmount}" style="width: 100%; padding: 6px 6px 6px 20px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; outline: none; box-sizing: border-box; color: var(--text);">
                                </div>
                            </div>
                        </div>
                    `;
                }

                return `
                    <tr style="cursor:pointer; background: white;" onclick="document.getElementById('ms-exp-${id}-${i}').style.display = document.getElementById('ms-exp-${id}-${i}').style.display === 'none' ? 'table-row' : 'none'">
                        <td style="padding: 12px 16px; border-top: 1px solid var(--border); border-left: 1px solid var(--border); border-bottom: 1px solid var(--border); border-top-left-radius: 8px; border-bottom-left-radius: 8px;">
                            <div style="font-weight: 700; color: var(--text); font-size: 13px;">${item.date}</div>
                        </td>
                        <td style="padding: 12px 16px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
                            <span style="background-color: ${item.badgeColor}; color: ${item.badgeText}; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                                ${item.type}
                            </span>
                        </td>
                        <td style="padding: 12px 16px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text); font-weight: 600;">
                            ${item.level}
                        </td>
                        <td style="padding: 12px 16px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text); font-weight: 500;">
                            ${item.desc}
                        </td>
                        <td style="padding: 12px 16px; border-top: 1px solid var(--border); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); border-top-right-radius: 8px; border-bottom-right-radius: 8px; text-align: left;">
                            <span style="font-size: 12px; font-weight: 800; color: ${item.status === 'Violation' ? '#ef4444' : '#059669'};">
                                ${item.status.toUpperCase()}
                            </span>
                        </td>
                    </tr>
                    <tr id="ms-exp-${id}-${i}" style="display: none; background: #f8fafc;">
                        <td colspan="5" style="padding: 16px 16px 24px 16px; border-bottom: 1px solid #e2e8f0;" onclick="event.stopPropagation()">
                            ${expandedHtml}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    } else {
        container.style.display = 'none';
        title.dataset.cat = '';
    }
};

function msRenderEmpTab() {
  return '<div class="ms-drivers-grid">' + msMockEmp.map(e => `
    <div class="ms-driver-card" style="padding:16px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:16px; font-weight:800; color:var(--text);">${e.name}</span>
          <span style="font-size:12px; color:var(--muted); margin-left:10px;">Employer: ${e.emp}</span>
        </div>
        <div class="ms-driver-status-badge ${e.responded ? 'compliant' : 'inactive'}">${e.responded ? 'Verified' : 'Pending'}</div>
      </div>
      <div style="display:flex; gap:20px; font-size:12px; color:var(--muted); margin-top:10px;">
        <span><strong>1st Try:</strong> ${e.try1 || '-'}</span>
        <span><strong>2nd Try:</strong> ${e.try2 || '-'}</span>
        <span><strong>3rd Try:</strong> ${e.try3 || '-'}</span>
      </div>
    </div>
  `).join('') + '</div>';
}

function msRenderBinderTab() {
  return '<div class="ms-drivers-grid">' + masterSafetyData.filter(d=>!d.archived).map(driver => {
    // Pun set Binder/Equipment podataka iz Excela
    const eq = [
      { name: 'CDL', status: 'valid' },
      { name: 'MEDICAL', status: 'valid' },
      { name: 'Truck Reg', status: 'valid' },
      { name: 'Trailer Reg', status: 'valid' },
      { name: 'Truck Insp', status: 'valid' },
      { name: 'Trailer Insp', status: 'valid' },
      { name: 'Lease Agreement', status: 'valid' },
      { name: 'Insurance', status: 'valid' },
      { name: 'MC Letter', status: 'valid' },
      { name: 'ELD Manual', status: 'valid' },
      { name: 'Paper Logs', status: 'missing' },
      { name: 'IFTA License', status: 'valid' },
      { name: 'IFTA Stickers', status: 'expiring' },
      { name: 'Plate Truck', status: 'valid' },
      { name: 'Plate Trailer', status: 'valid' },
      { name: 'Warning Triangles & Fire Ext', status: 'valid' }
    ];
    return `
    <div class="ms-driver-card" style="padding:16px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
        <div>
          <span style="font-size:16px; font-weight:800; color:var(--text);">${driver.name}</span>
          <span style="font-size:13px; color:var(--muted); margin-left:12px; font-weight:600; background:var(--surface2); padding:4px 8px; border-radius:6px; border:1px solid var(--border);">Truck # ${Math.floor(Math.random()*900)+100}</span>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:10px;">
        ${eq.map(item => {
          let badgeHtml = '';
          if (item.status === 'valid') badgeHtml = '<span class="ms-doc-badge valid">✅</span>';
          else if (item.status === 'expiring') badgeHtml = '<span class="ms-doc-badge expiring">⏳</span>';
          else badgeHtml = '<span class="ms-doc-badge missing">❌</span>';
          
          return `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:var(--surface); border:1px solid var(--border); border-radius:8px; font-size:12px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
            <span style="font-weight:600; color:var(--text);">${item.name}</span>
            ${badgeHtml}
          </div>
          `;
        }).join('')}
      </div>
    </div>
    `;
  }).join('') + '</div>';
}

function msRenderDriverCard(driver) {
  const compliance = msCalcCompliance(driver);
  const safetyScore = msCalcSafetyScore(driver);
  const avatarColor = msGetAvatarColor(driver.status);
  const initials = msGetInitials(driver.name);
  const cardId = `ms-card-${driver.name.replace(/\s+/g, '-').toLowerCase()}`;

  const complianceCls = compliance >= 80 ? 'high' : compliance >= 60 ? 'mid' : 'low';
  const scoreCls = safetyScore >= 75 ? 'high' : safetyScore >= 50 ? 'mid' : 'low';

  const statusLabel = {
    compliant: '✅ Compliant',
    warning:   '⚠️ Warning',
    critical:  '🚨 Critical',
    inactive:  '⏸ Inactive'
  }[driver.status] || driver.status;

  // Find linked lead
  const linkedLead = (typeof dashboardLeads !== 'undefined'
    ? dashboardLeads.find(l => l.id === driver.leadRef)
    : null) || (typeof leads !== 'undefined'
    ? leads.find(l => l.id === driver.leadRef)
    : null);

  return `
    <div class="ms-driver-card status-${driver.status}" id="${cardId}">
      <div class="ms-driver-header" onclick="msToggleCard('${cardId}')">
        <div class="ms-driver-avatar ${avatarColor}">${initials}</div>
        <div class="ms-driver-name-col">
          ${linkedLead
            ? `<a class="ms-driver-name" href="#" onclick="event.stopPropagation(); openRecruitingModal(${JSON.stringify(linkedLead).replace(/"/g, '&quot;')})">${driver.name}</a>`
            : `<span class="ms-driver-name" style="cursor:default;">${driver.name}</span>`
          }
          <div class="ms-driver-meta">${driver.state} · ${driver.driverType} · Recruiter: ${driver.recruiter}</div>
        </div>
        <div class="ms-driver-status-badge ${driver.status}">${statusLabel}</div>
        <div class="ms-compliance-col">
          <span class="ms-compliance-pct">${compliance}%</span>
          <div class="ms-compliance-bar-bg">
            <div class="ms-compliance-bar-fill ${complianceCls}" style="width:${compliance}%"></div>
          </div>
          <span style="font-size:10px;color:#94a3b8;font-weight:600;">Compliance</span>
        </div>
        <div class="ms-safety-score-col">
          <span class="ms-safety-score-num ${scoreCls}">${safetyScore}</span>
          <span class="ms-safety-score-label">Safety</span>
        </div>
        <button class="ms-expand-btn" id="${cardId}-btn">▾</button>
      </div>
      <div class="ms-driver-body" id="${cardId}-body">
        ${msRenderDriverBody(driver, linkedLead)}
      </div>
    </div>
  `;
}

function msRenderDriverBody(driver, linkedLead) {
  return `
    <div class="ms-driver-body-grid">
      <div class="ms-doc-section">
        <h4>📋 Documents Status</h4>
        <div class="ms-doc-list">
          ${Object.entries(driver.docs).map(([key, doc]) => {
            const countdown = doc.exp ? msCountdown(doc.exp) : null;
            const badgeTxt = { valid: '✓ Valid', expiring: '⚠ Expiring', expired: '✕ Expired', missing: '— Missing' }[doc.status];
            return `
              <div class="ms-doc-item">
                <span class="ms-doc-name">${MS_DOC_LABELS[key]}</span>
                <div class="ms-doc-status">
                  ${countdown ? `<span class="ms-doc-countdown ${countdown.cls}">${countdown.text}</span>` : ''}
                  <span class="ms-doc-badge ${doc.status}">${badgeTxt}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="ms-doc-section">
        <h4>⚠️ Violations & Issues</h4>
        ${driver.violations.length === 0
          ? `<div class="ms-no-violations">✓ No violations on record</div>`
          : driver.violations.map(v => `
            <div class="ms-violation-item">
              <div class="ms-violation-dot ${v.severity}"></div>
              <div>
                <div class="ms-violation-text">${v.text}</div>
                <div class="ms-violation-date">${v.date}</div>
              </div>
            </div>
          `).join('')
        }

        ${driver.notes ? `
          <div style="margin-top: 14px;">
            <h4 style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin:0 0 8px 0;">📝 Notes</h4>
            <div style="font-size:12px;color:#475569;background:var(--surface);padding:10px;border-radius:8px;border:1px solid var(--border);">${driver.notes}</div>
          </div>
        ` : ''}
      </div>

      <div class="ms-doc-section">
        <h4>📊 Driver Overview</h4>
        <div class="ms-doc-list">
          <div class="ms-doc-item">
            <span class="ms-doc-name">State</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);">${driver.state}</span>
          </div>
          <div class="ms-doc-item">
            <span class="ms-doc-name">Type</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);">${driver.driverType}</span>
          </div>
          <div class="ms-doc-item">
            <span class="ms-doc-name">Recruiter</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);">${driver.recruiter}</span>
          </div>
          <div class="ms-doc-item">
            <span class="ms-doc-name">Last Activity</span>
            <span style="font-size:12px;font-weight:600;color:var(--text);">${driver.lastActivity}</span>
          </div>
          <div class="ms-doc-item">
            <span class="ms-doc-name">Compliance Score</span>
            <span style="font-size:12px;font-weight:800;color:#2f5ea9;">${msCalcCompliance(driver)}%</span>
          </div>
          <div class="ms-doc-item">
            <span class="ms-doc-name">Safety Score</span>
            <span style="font-size:12px;font-weight:800;color:var(--text);">${msCalcSafetyScore(driver)}/100</span>
          </div>
        </div>

        ${linkedLead ? `
          <button class="ms-open-profile-btn"
                  onclick="openRecruitingModal(${JSON.stringify(linkedLead).replace(/"/g, '&quot;')})">
            👤 Open Driver Profile Card
          </button>
        ` : `
          <div style="margin-top:16px; padding:10px; background:var(--surface2); border-radius:8px; font-size:12px; color:#94a3b8; text-align:center;">
            No linked profile card
          </div>
        `}
      </div>
    </div>
  `;
}

// -------------------------------------------------------
// INTERACTIONS
// -------------------------------------------------------
function msToggleCard(cardId) {
  const body = document.getElementById(`${cardId}-body`);
  const btn = document.getElementById(`${cardId}-btn`);
  if (!body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (btn) btn.classList.toggle('open', !isOpen);
}

function msSwitchTab(tab) {
  msActiveTab = tab;
  document.querySelectorAll('.ms-sub-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  const container = document.getElementById('ms-drivers-container');
  if (container) container.innerHTML = msRenderDriversList();
}

window.msHandleTabSearch = function(val) {
  msSearchQuery = val;
  const filtered = msGetFilteredDrivers();
  const grid = document.querySelector('.ms-drivers-grid');
  if (grid) {
      if (!filtered.length) {
          grid.outerHTML = `
            <div class="ms-drivers-grid ms-empty-state">
              <div class="icon">🔍</div>
              <p>No drivers match your current filters.</p>
            </div>
          `;
      } else {
          grid.outerHTML = `<div class="ms-drivers-grid">${filtered.map(driver => msRenderDriverCard(driver)).join('')}</div>`;
      }
  }
};


function msToggleDashboardTop() {
  const top = document.getElementById('ms-dashboard-top');
  if (!top) return;
  const isFiltering = msSearchQuery.trim() !== '';
  top.style.display = isFiltering ? 'none' : '';
}

function msSetCompany(company) {
  msActiveCompany = company;
  renderMasterSafety();
}

function msSetYear(year) {
  msActiveYear = year;
  renderMasterSafety();
}

function msSetWeek(week) {
  msActiveWeek = week;
  renderMasterSafety();
}

function msAttachListeners() {
  const searchInput = document.getElementById('msSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      msSearchQuery = e.target.value;
      const container = document.getElementById('ms-drivers-container');
      if (container) container.innerHTML = msRenderDriversList();
      msToggleDashboardTop();
    });
  }
}

function msRenderSMSTab() {
  const years = ['2024', '2025', '2026'];
  const filteredData = msMockSMSData.filter(d => d.month.includes(msSMSYearFilter));

  const filterHtml = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; background:var(--surface); padding:16px 20px; border-radius:14px; border:1px solid var(--border); box-shadow:0 1px 4px rgba(0,0,0,0.05);">
      <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text);">SMS Performance - ${msSMSYearFilter}</h3>
      <div style="display:flex; gap:12px; align-items:center;">
        <span style="font-size:13px; font-weight:600; color:var(--muted);">Filter by Year:</span>
        <select onchange="msSetSMSYear(this.value)" style="padding:6px 12px; border-radius:8px; border:1px solid var(--border-dark); font-size:14px; font-weight:600; outline:none; background:var(--surface2); color:var(--text);">
          ${years.map(y => `<option value="${y}" ${y === msSMSYearFilter ? 'selected' : ''}>${y}</option>`).join('')}
        </select>
      </div>
    </div>
  `;

  if (!filteredData.length) {
    return filterHtml + '<div class="ms-empty-state"><p>No SMS data for selected year.</p></div>';
  }

  const getStatusColor = (val, threshold) => {
    if (val.includes('<') || val.includes('No viol')) return '#22c55e';
    const num = parseInt(val);
    if (isNaN(num)) return '#94a3b8';
    if (num >= threshold) return '#ef4444';
    return '#22c55e';
  };
  const getPercent = (val) => {
     const num = parseInt(val);
     if (isNaN(num)) return 0;
     return num;
  };

  const cardsHtml = '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px;">' + filteredData.map(d => {
    
    const metrics = [
      { label: 'Unsafe Driving (65%)', val: d.unsafe, t: 65 },
      { label: 'Crash Indicator (65%)', val: d.crash, t: 65 },
      { label: 'Vehicle Maint (80%)', val: d.maint, t: 80 },
      { label: 'Driver Fitness', val: d.fitness, t: 100 },
      { label: 'HOS (65%)', val: d.hos, t: 65 }
    ];

    return `
      <div style="background:var(--surface); border-radius:14px; border:1px solid var(--border); box-shadow:0 2px 8px rgba(0,0,0,0.04); overflow:hidden; display:flex; flex-direction:column;">
        <div style="padding:16px 20px; background:var(--surface2); border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
          <h4 style="margin:0; font-size:16px; font-weight:800; color:var(--text);">${d.month}</h4>
          <button onclick="msCreateDataQCaseFromRecord('SMS Issue', '${d.month}', '')" style="background:var(--surface); color:var(--text); border:1px solid var(--border-dark); padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; transition:0.2s;">⚡ Review for DataQ</button>
        </div>
        <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
          ${metrics.map(m => {
            const color = getStatusColor(m.val, m.t);
            const isText = m.val.includes('<') || m.val.includes('No viol');
            const pct = isText ? 100 : getPercent(m.val);
            
            return `
              <div>
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                  <span style="font-size:12px; font-weight:700; color:var(--muted);">${m.label}</span>
                  <span style="font-size:12px; font-weight:800; color:${color};">${m.val}</span>
                </div>
                ${!isText ? `
                  <div style="width:100%; height:6px; background:var(--surface3); border-radius:3px; overflow:hidden;">
                    <div style="height:100%; width:${pct}%; background:${color}; border-radius:3px;"></div>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('') + '</div>';

  return filterHtml + cardsHtml;
}
// --- DATAQ TAB RENDERING ---
window.msCreateDataQCaseFromRecord = function(type, id, driver) {
  const newId = msMockDataQCases.length;
  msMockDataQCases.unshift({
    id: newId,
    dataqId: 'DQ-' + Math.floor(100000 + Math.random() * 900000),
    status: 'Draft',
    archived: false,
    challengeScore: 0,
    driver: driver, company: msActiveCompany, equipment: '', date: new Date().toISOString().split('T')[0], state: '',
    relatedType: type, relatedId: id,
    challengeReason: '', explanationText: '',
    missingItems: [],
    aiAssessment: { possibleDataQ: '-', strength: '-', recommendation: '-', reason: '-' },
    evidence: [], aiSuggestions: [], aiDraft: '',
    submission: { submitted: 'No', date: '', user: '', trackingNo: '', externalStatus: '' },
    agencyResponse: { received: 'No', decision: 'Pending', notes: '' },
    timeline: [{ date: new Date().toISOString().split('T')[0], user: 'Admin', action: `Draft case created from ${type}`, target: id }]
  });
  msActiveTab = 'dataq';
  msActiveDataQWorkspaceId = newId;
  renderMasterSafety();
};
function msRenderDataQTab() {
  if (msActiveDataQWorkspaceId !== null) {
    const dq = msMockDataQCases.find(c => c.id === msActiveDataQWorkspaceId);
    if (dq) return msRenderDataQWorkspace(dq);
  }

  const active = msMockDataQCases.filter(c => !c.archived);
  
  // Metrics
  const metricsHtml = `
    <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:12px; margin-bottom:20px;">
      <div class="ms-kpi-card blue"><div class="ms-kpi-value">${active.length}</div><div class="ms-kpi-label">Active Cases</div></div>
      <div class="ms-kpi-card orange"><div class="ms-kpi-value">${active.filter(c=>c.status==='Evidence Needed').length}</div><div class="ms-kpi-label">Evidence Needed</div></div>
      <div class="ms-kpi-card yellow"><div class="ms-kpi-value">${active.filter(c=>c.status==='Agency Review').length}</div><div class="ms-kpi-label">Agency Review</div></div>
      <div class="ms-kpi-card green"><div class="ms-kpi-value">72%</div><div class="ms-kpi-label">Success Rate</div></div>
      <div class="ms-kpi-card purple"><div class="ms-kpi-value">21 d</div><div class="ms-kpi-label">Avg Resolution</div></div>
    </div>
  `;

  const headerHtml = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--text);">DataQ Cases</h3>
      <button onclick="msCreateDataQCase()" style="background:var(--blue); color:white; border:none; padding:8px 16px; border-radius:8px; font-weight:700; cursor:pointer;">+ Create DataQ Case</button>
    </div>
  `;

  const listHtml = `<div style="display:grid; grid-template-columns:1fr; gap:12px;">` +
    active.map(c => {
      let statusColor = c.status === 'Evidence Needed' ? '#ef4444' : c.status === 'Ready to Submit' ? '#3b82f6' : c.status === 'Agency Review' ? '#f59e0b' : '#64748b';
      return `
      <div onclick="msActiveDataQWorkspaceId = ${c.id}; renderMasterSafety();" style="background:white; border:1px solid var(--border); border-radius:12px; padding:16px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:0.2s;" onmouseover="this.style.borderColor='var(--blue)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="display:flex; gap:20px; align-items:center;">
          <div>
            <div style="font-size:14px; font-weight:800; color:var(--text);">${c.dataqId}</div>
            <div style="font-size:12px; font-weight:600; color:var(--muted);">${c.date} • ${c.driver} (${c.equipment})</div>
          </div>
          <div>
            <div style="font-size:13px; font-weight:700; color:var(--text);">${c.challengeReason || 'Issue Not Selected'}</div>
            <div style="font-size:12px; font-weight:600; color:var(--muted);">Related: ${c.relatedId}</div>
          </div>
        </div>
        <div style="display:flex; gap:16px; align-items:center;">
          <div style="text-align:right;">
            <div style="font-size:13px; font-weight:800; color:${statusColor};">${c.status}</div>
            <div style="font-size:11px; font-weight:700; color:var(--muted);">Score: ${c.challengeScore}%</div>
          </div>
          <button style="background:var(--surface2); border:none; padding:6px 12px; border-radius:6px; font-weight:700; color:var(--text); cursor:pointer;">Open Case</button>
        </div>
      </div>
    `}).join('') +
  `</div>`;

  return metricsHtml + headerHtml + listHtml;
}

window.msCreateDataQCase = function() {
  const newId = msMockDataQCases.length;
  msMockDataQCases.unshift({
    id: newId,
    dataqId: 'DQ-' + Math.floor(100000 + Math.random() * 900000),
    status: 'Draft',
    archived: false,
    challengeScore: 0,
    driver: '', company: '', equipment: '', date: '', state: '',
    relatedType: 'Other', relatedId: '',
    challengeReason: '', explanationText: '',
    missingItems: [],
    aiAssessment: { possibleDataQ: '-', strength: '-', recommendation: '-', reason: '-' },
    evidence: [], aiSuggestions: [], aiDraft: '',
    submission: { submitted: 'No', date: '', user: '', trackingNo: '', externalStatus: '' },
    agencyResponse: { received: 'No', decision: 'Pending', notes: '' },
    timeline: [{ date: new Date().toISOString().split('T')[0], user: 'Admin', action: 'Draft case created', target: '' }]
  });
  msActiveDataQWorkspaceId = newId;
  renderMasterSafety();
};

function msRenderDataQWorkspace(c) {
  let statusColor = c.status === 'Evidence Needed' ? '#ef4444' : c.status === 'Ready to Submit' ? '#3b82f6' : c.status === 'Agency Review' ? '#f59e0b' : '#64748b';
  
  return `
    <div style="display:flex; flex-direction:column; gap:20px; height:calc(100vh - 120px); overflow-y:auto; padding-right:10px;">
      
      <!-- HEADER -->
      <div style="background:white; border-radius:12px; padding:20px; border:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:10; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <div style="display:flex; align-items:center; gap:20px;">
          <button onclick="msActiveDataQWorkspaceId = null; renderMasterSafety();" style="background:var(--surface2); border:none; padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:700;">← Back</button>
          <div>
            <div style="display:flex; align-items:center; gap:10px;">
              <h2 style="margin:0; font-size:20px; font-weight:900;">${c.dataqId}</h2>
              <span style="background:${statusColor}20; color:${statusColor}; padding:4px 8px; border-radius:6px; font-size:12px; font-weight:800; border:1px solid ${statusColor}40;">${c.status}</span>
            </div>
            <div style="font-size:13px; font-weight:600; color:var(--muted); margin-top:4px;">${c.driver} • ${c.equipment} • ${c.date}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="text-align:right;">
            <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase;">Challenge Score</div>
            <div style="font-size:18px; font-weight:900; color:${c.challengeScore > 75 ? 'var(--green)' : 'var(--orange)'}">${c.challengeScore}%</div>
          </div>
          <button style="background:var(--blue); color:white; border:none; padding:10px 20px; border-radius:8px; font-weight:700; cursor:pointer;">Submit to DataQs</button>
        </div>
      </div>

      <!-- TWO COLUMNS -->
      <div style="display:grid; grid-template-columns: 60% 40%; gap:20px; align-items:start;">
        
        <!-- LEFT COLUMN -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          ${msRenderDQDetails(c)}
          ${msRenderDQChallenge(c)}
          ${msRenderDQAIDraft(c)}
          ${msRenderDQSubmission(c)}
        </div>

        <!-- RIGHT COLUMN -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          ${msRenderDQAIAssessment(c)}
          ${msRenderDQEvidence(c)}
          ${msRenderDQTimeline(c)}
        </div>

      </div>
    </div>
  `;
}

function msRenderDQDetails(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
      <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">1. Case Details</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
        <div><label style="font-size:11px; font-weight:700; color:var(--muted);">Driver</label><input type="text" value="${c.driver}" onchange="msUpdateDataQField('${c.id}', 'driver', this.value)" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-weight:600;"></div>
        <div><label style="font-size:11px; font-weight:700; color:var(--muted);">Equipment</label><input type="text" value="${c.equipment}" onchange="msUpdateDataQField('${c.id}', 'equipment', this.value)" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-weight:600;"></div>
        <div><label style="font-size:11px; font-weight:700; color:var(--muted);">Date</label><input type="date" value="${c.date}" onchange="msUpdateDataQField('${c.id}', 'date', this.value)" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-weight:600;"></div>
        <div><label style="font-size:11px; font-weight:700; color:var(--muted);">Related Record</label><input type="text" value="${c.relatedId}" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-weight:600;"></div>
        <div><label style="font-size:11px; font-weight:700; color:var(--muted);">State</label><input type="text" value="${c.state}" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-weight:600;"></div>
        <div><label style="font-size:11px; font-weight:700; color:var(--muted);">Report #</label><input type="text" value="${c.reportNo || ''}" style="width:100%; padding:8px; border-radius:6px; border:1px solid var(--border); font-weight:600;"></div>
      </div>
    </div>
  `;
}

function msRenderDQChallenge(c) {
  const reasons = ['Crash not DOT-recordable', 'Wrong carrier assigned', 'Wrong driver assigned', 'Violation dismissed in court', 'Incorrect severity weight', 'Duplicate record', 'Other'];
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
      <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">2. What Are We Challenging?</h3>
      <select onchange="msUpdateDataQField('${c.id}', 'challengeReason', this.value)" style="width:100%; padding:10px; border-radius:8px; border:1px solid var(--border); font-weight:700; font-size:14px; margin-bottom:12px;">
        <option value="">Select Reason...</option>
        ${reasons.map(r => `<option value="${r}" ${c.challengeReason === r ? 'selected' : ''}>${r}</option>`).join('')}
      </select>
      <label style="font-size:11px; font-weight:700; color:var(--muted);">Explanation of Issue</label>
      <textarea onchange="msUpdateDataQField('${c.id}', 'explanationText', this.value)" style="width:100%; height:80px; padding:10px; border-radius:8px; border:1px solid var(--border); font-family:inherit; font-weight:500; resize:vertical; margin-top:4px;">${c.explanationText}</textarea>
    </div>
  `;
}

function msRenderDQAIDraft(c) {
  return `
    <div style="background:linear-gradient(135deg, #f3e8ff, #ffffff); border-radius:12px; border:1px solid #d8b4fe; padding:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0; font-size:14px; font-weight:800; color:var(--purple); text-transform:uppercase;">✨ AI Draft Explanation</h3>
        <button style="background:white; border:1px solid #d8b4fe; color:var(--purple); padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer;">Generate Draft</button>
      </div>
      <textarea onchange="msUpdateDataQField('${c.id}', 'aiDraft', this.value)" style="width:100%; height:100px; padding:12px; border-radius:8px; border:1px solid #e9d5ff; background:white; font-family:inherit; font-weight:500; resize:vertical; line-height:1.5;">${c.aiDraft}</textarea>
    </div>
  `;
}

function msRenderDQSubmission(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
      <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">3. Submission Tracking & Agency Response</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div style="border:1px solid var(--border); border-radius:8px; padding:12px; background:var(--surface);">
          <div style="font-size:12px; font-weight:800; margin-bottom:8px;">DataQs System</div>
          <div style="margin-bottom:8px;"><label style="font-size:11px; font-weight:700; color:var(--muted);">Tracking Number</label><input type="text" value="${c.submission.trackingNo}" onchange="msUpdateDataQField('${c.id}', 'submission.trackingNo', this.value)" style="width:100%; padding:6px; border-radius:4px; border:1px solid var(--border);"></div>
          <div><label style="font-size:11px; font-weight:700; color:var(--muted);">External Status</label><input type="text" value="${c.submission.externalStatus}" onchange="msUpdateDataQField('${c.id}', 'submission.externalStatus', this.value)" style="width:100%; padding:6px; border-radius:4px; border:1px solid var(--border);"></div>
        </div>
        <div style="border:1px solid var(--border); border-radius:8px; padding:12px; background:var(--surface);">
          <div style="font-size:12px; font-weight:800; margin-bottom:8px;">Agency Response</div>
          <div style="margin-bottom:8px;"><label style="font-size:11px; font-weight:700; color:var(--muted);">Decision</label>
            <select onchange="msUpdateDataQField('${c.id}', 'agencyResponse.decision', this.value)" style="width:100%; padding:6px; border-radius:4px; border:1px solid var(--border);">
              <option value="Pending" ${c.agencyResponse.decision === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Accepted" ${c.agencyResponse.decision === 'Accepted' ? 'selected' : ''}>Accepted</option>
              <option value="Rejected" ${c.agencyResponse.decision === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>
          <div><label style="font-size:11px; font-weight:700; color:var(--muted);">Agency Notes</label><input type="text" value="${c.agencyResponse.notes}" onchange="msUpdateDataQField('${c.id}', 'agencyResponse.notes', this.value)" style="width:100%; padding:6px; border-radius:4px; border:1px solid var(--border);"></div>
        </div>
      </div>
    </div>
  `;
}

function msRenderDQAIAssessment(c) {
  let recColor = c.aiAssessment.recommendation === 'Ready to Submit' ? 'var(--green)' : c.aiAssessment.recommendation === 'Collect More Evidence' ? 'var(--orange)' : 'var(--red)';
  return `
    <div style="background:var(--surface); border-radius:12px; border:1px solid var(--border); padding:20px;">
      <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">AI Assessment</h3>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700;"><span>Possible DataQ:</span> <span>${c.aiAssessment.possibleDataQ}</span></div>
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700;"><span>Challenge Strength:</span> <span>${c.aiAssessment.strength}</span></div>
        <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:800;"><span>Recommendation:</span> <span style="color:${recColor}">${c.aiAssessment.recommendation}</span></div>
        <div style="margin-top:8px; font-size:12px; font-weight:600; color:var(--text); line-height:1.4; padding:10px; background:white; border-radius:8px; border:1px solid var(--border);">${c.aiAssessment.reason}</div>
      </div>
      
      ${c.missingItems.length > 0 ? `
        <div style="margin-top:16px;">
          <div style="font-size:11px; font-weight:800; color:var(--red); text-transform:uppercase; margin-bottom:6px;">Missing Required Evidence</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${c.missingItems.map(m => `<span style="background:#fee2e2; color:#991b1b; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:700;">${m}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function msRenderDQEvidence(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
      <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Evidence Upload Center</h3>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${c.evidence.map((e, idx) => {
          let badge = '';
          if (e.status === 'Missing') badge = '<span style="background:var(--surface2); color:var(--muted); padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">Missing</span>';
          if (e.status === 'Uploaded') badge = '<span style="background:#dbeafe; color:#1e40af; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">Uploaded</span>';
          if (e.status === 'AI Processed') badge = '<span style="background:#f3e8ff; color:#6b21a8; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:700;">✨ AI Processed</span>';
          
          return `
            <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid var(--border); padding:8px 12px; border-radius:8px;">
              <div>
                <div style="font-size:13px; font-weight:700; color:var(--text);">${e.category}</div>
                ${e.filename ? `<div style="font-size:11px; font-weight:600; color:var(--blue); margin-top:2px;">📄 ${e.filename}</div>` : ''}
              </div>
              <div style="display:flex; align-items:center; gap:10px;">
                ${badge}
                ${e.status === 'Missing' ? `<button onclick="msSimulateDataQAIUpload(${c.id}, ${idx})" style="background:var(--blue); color:white; border:none; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:700; cursor:pointer;">Upload</button>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <button style="width:100%; margin-top:12px; background:var(--surface); border:1px dashed var(--border); color:var(--text); padding:10px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">+ Add Additional Evidence</button>
    </div>
  `;
}

function msRenderDQTimeline(c) {
  return `
    <div style="background:white; border-radius:12px; border:1px solid var(--border); padding:20px;">
      <h3 style="margin:0 0 16px 0; font-size:14px; font-weight:800; color:var(--text); text-transform:uppercase;">Timeline</h3>
      <div style="display:flex; flex-direction:column; gap:16px; border-left:2px solid var(--border); margin-left:8px; padding-left:16px;">
        ${c.timeline.map(t => `
          <div style="position:relative;">
            <div style="position:absolute; left:-25px; top:2px; width:10px; height:10px; border-radius:50%; background:var(--blue); border:4px solid white;"></div>
            <div style="font-size:11px; font-weight:700; color:var(--muted);">${t.date} • ${t.user}</div>
            <div style="font-size:13px; font-weight:600; color:var(--text); margin-top:2px;">${t.action}</div>
            ${t.target ? `<div style="font-size:11px; font-weight:600; color:var(--blue); margin-top:2px;">📄 ${t.target}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.msSimulateDataQAIUpload = function(caseId, evIdx) {
  const dq = msMockDataQCases.find(c => c.id === caseId);
  if (!dq) return;
  
  const ev = dq.evidence[evIdx];
  ev.filename = 'simulated_' + ev.category.replace(/\s+/g, '_').toLowerCase() + '.pdf';
  ev.status = 'AI Processed';
  
  dq.missingItems = dq.missingItems.filter(m => m !== ev.category);
  
  if (dq.missingItems.length === 0) {
    dq.status = 'Ready to Submit';
    dq.challengeScore = 95;
    dq.aiAssessment.recommendation = 'Ready to Submit';
    dq.aiAssessment.reason = 'All required evidence is attached and supports the challenge.';
  } else {
    dq.challengeScore += 5;
  }
  
  dq.timeline.push({
    date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().substring(0,5),
    user: 'System AI',
    action: 'Processed evidence: ' + ev.category,
    target: ev.filename
  });
  
  renderMasterSafety();
};
