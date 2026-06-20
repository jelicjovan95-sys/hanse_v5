// -------------------------
// Demo data (smisleno)
// -------------------------
const recruiters = [
  { id: "r1", name: "John Doe", role: "Senior Recruiter", lc: 343, cr: 0.10, atc: 5.2, closed: 34 },
  { id: "r2", name: "Mila Petrović", role: "Recruiter", lc: 301, cr: 0.093, atc: 5.8, closed: 28 },
  { id: "r3", name: "Alex Rivera", role: "Recruiter", lc: 287, cr: 0.087, atc: 6.1, closed: 25 },
  { id: "r4", name: "Sara Kim", role: "Junior Recruiter", lc: 260, cr: 0.073, atc: 6.6, closed: 19 },
  { id: "r5", name: "Nikola Jovanović", role: "Recruiter", lc: 244, cr: 0.070, atc: 6.9, closed: 17 },
].sort((a, b) => (b.closed - a.closed) || (b.cr - a.cr) || (b.lc - a.lc));

const els = {
  app: document.getElementById("app"),
  backdrop: document.getElementById("backdrop"),
  toggle: document.getElementById("toggle"),
  tbody: document.getElementById("tbody"),
  kpiLC: document.getElementById("kpiLC"),
  kpiCR: document.getElementById("kpiCR"),
  kpiClosed: document.getElementById("kpiClosed"),
  prog: Array.from(document.querySelectorAll(".kpi .prog")),
  funnelBoard: document.getElementById("funnelBoard"),
  leadPanel: document.getElementById("leadPanel"),
  panelBackdrop: document.getElementById("panelBackdrop"),
  closePanel: document.getElementById("closePanel"),
  panelContent: document.getElementById("panelContent"),
  performanceView: document.getElementById("performance-view"),
  recruitingView: document.getElementById("recruiting-view"),
  leadDashboardView: document.getElementById("lead-dashboard-view"),
  leadDashboardBody: document.getElementById("leadDashboardBody"),
  safetyView: document.getElementById("safety-view"),
  safetyBoard: document.getElementById("safetyBoard"),
  fleetView: document.getElementById("fleet-view"),
  fleetBoard: document.getElementById("fleetBoard"),
  accountingView: document.getElementById("accounting-view"),
  accountingBoard: document.getElementById("accountingBoard"),
  earningsView: document.getElementById("earnings-view"),
  earningsContainer: document.getElementById("earningsContainer"),
  execDashboardView: document.getElementById("executive-dashboard-view"),
  execMainStats: document.getElementById("execMainStats"),
  execDeptStats: document.getElementById("execDeptStats"),
  execLeaderboardBody: document.getElementById("execLeaderboardBody"),
  employeeDetailModal: document.getElementById("employeeDetailModal"),
  inboxView: document.getElementById('inbox-view'),
  masterSafetyView: document.getElementById('master-safety-view')
};

// Lead Dashboard data
const dashboardLeads = [
  {
    id: 'dash-1',
    timestamp: 'July 30 2025 13:29:00',
    name: 'Demarcus Rainey',
    firstName: 'Demarcus',
    lastName: 'Rainey',
    email: 'demarcusrainey11@gmail.com',
    phone: '+1 770-480-6972',
    zipCode: '30038',
    state: 'Georgia',
    city: 'Lithonia',
    category: 'Independent Contractor',
    driverType: 'OTR',
    payType: '1099',
    yearsExperience: 5,
    targetMileage: 3000,
    homeFrequency: 'Every other week',
    certifications: 'Hazmat',
    driverQuote: '$4,500/week',
    homeTown: 'Lithonia, GA',
    truckMake: 'Freightliner',
    truckModel: 'Cascadia',
    truckYear: 2018,
    truckMileage: 450000,
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'New Lead',
    safetyStage: 'Pending Review',
    fleetStage: 'Not Started',
    accountingStage: 'Pending',
    isDuplicate: true,
    duplicateInfo: {
      mergedAt: 'July 30 2025 14:15:00',
      previousLead: 'Lead #4521',
      timesApplied: 3
    }
  },
  {
    id: 'dash-2',
    timestamp: 'July 30 2025 16:04:00',
    name: 'Kevin Copening',
    firstName: 'Kevin',
    lastName: 'Copening',
    email: 'copeningenterprise@gmal.com',
    phone: '+1 910-53c-2553',
    zipCode: '28301',
    state: 'North Carolina',
    city: 'Fayetteville',
    category: 'Company Driver',
    driverType: 'Regional',
    payType: 'W2',
    yearsExperience: 3,
    targetMileage: 2500,
    homeFrequency: 'Once per week',
    certifications: 'None',
    driverQuote: '$1,800/week',
    homeTown: 'Fayetteville, NC',
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'Follow Up',
    safetyStage: 'Pending Review',
    fleetStage: 'Not Started',
    accountingStage: 'Pending',
    isDuplicate: true,
    duplicateInfo: {
      mergedAt: 'July 31 2025 09:22:00',
      previousLead: 'Lead #4612',
      timesApplied: 4
    }
  },
  {
    id: 'dash-3',
    timestamp: 'July 31 2025 8:06:00',
    name: 'Anthony Harrison',
    firstName: 'Anthony',
    lastName: 'Harrison',
    email: 'Anthonyharrison918@gmail.com',
    phone: '+1 773-540-6439',
    zipCode: '60409',
    state: 'Illinois',
    city: 'Calumet City',
    category: 'Independent Contractor',
    driverType: 'OTR',
    payType: '1099',
    yearsExperience: 10,
    targetMileage: 3200,
    homeFrequency: 'Month+',
    certifications: 'Doubles/Triples',
    driverQuote: '$5,000/week',
    homeTown: 'Calumet City, IL',
    truckMake: 'Peterbilt',
    truckModel: '389',
    truckYear: 2021,
    truckMileage: 250000,
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'In Progress',
    safetyStage: 'Docs Submitted',
    fleetStage: 'Waiting',
    accountingStage: 'Pending'
  },
  {
    id: 'dash-4',
    timestamp: 'July 31 2025 12:43:00',
    name: 'Ramona Johnson',
    firstName: 'Ramona',
    lastName: 'Johnson',
    email: 'ramona.johnson37@yahoo.com',
    phone: '+1 503-863-4986',
    zipCode: '97211',
    state: 'Oregon',
    city: 'Portland',
    category: 'Company Driver',
    driverType: 'Local',
    payType: 'W2',
    yearsExperience: 2,
    targetMileage: 1500,
    homeFrequency: 'Every day',
    certifications: 'Tanker',
    driverQuote: '$1,600/week',
    homeTown: 'Portland, OR',
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'In Progress',
    safetyStage: 'Approved',
    fleetStage: 'Assigned',
    accountingStage: 'Payroll Ready'
  },
  {
    id: 'dash-5',
    timestamp: 'July 31 2025 16:45:00',
    name: 'Ezekias Desir',
    firstName: 'Ezekias',
    lastName: 'Desir',
    email: 'desirezekias@yahoo.com',
    phone: '+1 786-393-8481',
    zipCode: '32839',
    state: 'Florida',
    city: 'Orlando',
    category: 'Independent Contractor',
    driverType: 'OTR',
    payType: '1099',
    yearsExperience: 7,
    targetMileage: 2800,
    homeFrequency: 'Every other week',
    certifications: 'Hazmat',
    driverQuote: '$4,200/week',
    homeTown: 'Orlando, FL',
    truckMake: 'Kenworth',
    truckModel: 'T680',
    truckYear: 2019,
    truckMileage: 380000,
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'In Progress',
    safetyStage: 'In Review',
    fleetStage: 'Not Started',
    accountingStage: 'Pending'
  },
  {
    id: 'dash-6',
    timestamp: 'August 1 2025 18:05:00',
    name: 'pablo mora',
    firstName: 'Pablo',
    lastName: 'Mora',
    email: 'tonyehigre5683@gmail.com',
    phone: '+1 602-469-8776',
    zipCode: '85041',
    state: 'Arizona',
    city: 'Phoenix',
    category: 'Company Driver',
    driverType: 'Regional',
    payType: 'W2',
    yearsExperience: 4,
    targetMileage: 2400,
    homeFrequency: 'Once per week',
    certifications: 'None',
    driverQuote: '$1,700/week',
    homeTown: 'Phoenix, AZ',
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'In Progress',
    safetyStage: 'MVR Check',
    fleetStage: 'Not Started',
    accountingStage: 'Pending'
  },
  {
    id: 'dash-7',
    timestamp: 'August 1 2025 22:11:00',
    name: 'Marcos Fuentes',
    firstName: 'Marcos',
    lastName: 'Fuentes',
    email: 'Marcostruck20@icloud.com',
    phone: '+1 954-595-4923',
    zipCode: '33309',
    state: 'Florida',
    city: 'Fort Lauderdale',
    category: 'Independent Contractor',
    driverType: 'OTR',
    payType: '1099',
    yearsExperience: 12,
    targetMileage: 3500,
    homeFrequency: 'Month+',
    certifications: 'All',
    driverQuote: '$5,500/week',
    homeTown: 'Fort Lauderdale, FL',
    truckMake: 'Volvo',
    truckModel: 'VNL 860',
    truckYear: 2022,
    truckMileage: 120000,
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'In Progress',
    safetyStage: 'Pending Results',
    fleetStage: 'Not Started',
    accountingStage: 'Pending'
  },
  {
    id: 'dash-8',
    timestamp: 'August 2 2025 9:28:00',
    name: 'william Wolfe',
    firstName: 'William',
    lastName: 'Wolfe',
    email: 'wolfewilliam82@gmail.com',
    phone: '+1 843-254-4070',
    zipCode: '29574',
    state: 'South Carolina',
    city: 'Mullins',
    category: 'Company Driver',
    driverType: 'OTR',
    payType: 'W2',
    yearsExperience: 1,
    targetMileage: 3000,
    homeFrequency: 'Every other week',
    certifications: 'None',
    driverQuote: '$1,500/week',
    homeTown: 'Mullins, SC',
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'New Lead',
    safetyStage: 'Not Started',
    fleetStage: 'Not Started',
    accountingStage: 'Pending'
  },
  {
    id: 'dash-9',
    timestamp: 'August 3 2025 12:30:00',
    name: 'Abdul Hakim Bazzano Jr',
    firstName: 'Abdul Hakim',
    lastName: 'Bazzano Jr',
    email: 'Freedomonlyl43@gmail.com',
    phone: '+1 878-626-3765',
    zipCode: '15143',
    state: 'Pennsylvania',
    city: 'Sewickley',
    category: 'Independent Contractor',
    driverType: 'Regional',
    payType: '1099',
    yearsExperience: 8,
    targetMileage: 2600,
    homeFrequency: 'Once per week',
    certifications: 'Hazmat',
    driverQuote: '$4,000/week',
    homeTown: 'Sewickley, PA',
    truckMake: 'Mack',
    truckModel: 'Anthem',
    truckYear: 2020,
    truckMileage: 300000,
    tags: ['NEW'],
    statusDots: [false, false, false, false],
    recruitingStage: 'In Progress',
    safetyStage: 'Approved',
    fleetStage: 'Trailer Setup',
    accountingStage: 'Pending'
  }
];

// Recruiting funnel data
let columns = [
  { id: 'new-leads', title: 'New Leads', maxVisible: 20 },
  { id: 'follow-up', title: 'Follow Up' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'active-drivers', title: 'Active Drivers' },
  { id: 'pending-removal', title: 'Pending Removal' }
];


const leads = [
  { id: 'lead-1', firstName: 'Julio', lastName: '', email: 'julio@example.com', phone: '+1 (234) 567-8900', column: 'new-leads', tags: ['NEW', 'Bad Number'], statusDots: [false, false, false, false], followUpDate: null, category: 'Independent Contractor', homeTown: 'Houston, TX', yearsExperience: 3, targetMileage: 2500, homeFrequency: 'Once per week', certifications: 'Hazmat, Tanker', driverQuote: '$85,000/year', truckMake: 'Freightliner', truckModel: 'Cascadia', truckYear: 2020, truckMileage: 125000, dotInspection: '2025-06-15', registration: 'Valid' },
  { id: 'lead-2', firstName: 'Mike', lastName: '', email: 'mike.j@example.com', phone: '+1 (234) 567-8901', column: 'new-leads', tags: ['NEW'], statusDots: [false, false, false, false], followUpDate: null, category: 'Company Driver', homeTown: 'Dallas, TX', yearsExperience: 5, targetMileage: 3000, homeFrequency: 'Every other week', certifications: 'None', driverQuote: '$72,000/year', truckMake: '', truckModel: '', truckYear: 0, truckMileage: 0, dotInspection: '', registration: '' },
  { id: 'lead-3', firstName: 'Fernando', lastName: 'Martinez', email: 'fernando@example.com', phone: '+1 (555) 123-4567', column: 'follow-up', tags: ['Follow Up Scheduled'], statusDots: [true, false, false, false], followUpDate: '2026-01-25 14:00', category: 'Independent Contractor', homeTown: 'San Antonio, TX', yearsExperience: 6, targetMileage: 2800, homeFrequency: 'Once per week', certifications: 'Hazmat', driverQuote: '$90,000/year', truckMake: 'Peterbilt', truckModel: '579', truckYear: 2019, truckMileage: 180000, dotInspection: '2025-08-20', registration: 'Valid' },
  { id: 'lead-4', firstName: 'Mark', lastName: '', email: 'mark@example.com', phone: '+1 (555) 987-6543', column: 'follow-up', tags: ['VM Left'], statusDots: [true, false, false, false], followUpDate: '2026-01-22 10:30', category: 'Company Driver', homeTown: 'Austin, TX', yearsExperience: 2, targetMileage: 2200, homeFrequency: 'Every day', certifications: 'None', driverQuote: '$68,000/year', truckMake: '', truckModel: '', truckYear: 0, truckMileage: 0, dotInspection: '', registration: '' },
  { id: 'lead-5', firstName: 'Pedro', lastName: '', email: 'pedro@example.com', phone: '+1 (555) 456-7890', column: 'follow-up', tags: ['Follow Up Scheduled'], statusDots: [true, true, false, false], followUpDate: '2026-01-24 16:00', category: 'ECT', homeTown: 'El Paso, TX', yearsExperience: 4, targetMileage: 2600, homeFrequency: 'Once per week', certifications: 'Tanker', driverQuote: '$78,000/year', truckMake: '', truckModel: '', truckYear: 0, truckMileage: 0, dotInspection: '', registration: '' },
  { id: 'lead-6', firstName: 'Pedro', lastName: '', email: 'john@example.com', phone: '+1 (555) 111-2222', column: 'in-progress', tags: ['Hot Lead'], statusDots: [true, true, false, false], followUpDate: null, category: 'Independent Contractor', homeTown: 'Fort Worth, TX', yearsExperience: 5, targetMileage: 3200, homeFrequency: 'Once per week', certifications: 'Hazmat, Tanker', driverQuote: '$95,000/year', truckMake: 'Kenworth', truckModel: 'W900', truckYear: 2021, truckMileage: 95000, dotInspection: '2026-03-10', registration: 'Valid' },
  { id: 'lead-7', firstName: 'Dan', lastName: '', email: 'dan@example.com', phone: '+1 (555) 555-6666', column: 'in-progress', tags: ['Hot Lead'], statusDots: [true, true, false, false], followUpDate: null, category: 'Independent Contractor', homeTown: 'Lubbock, TX', yearsExperience: 4, targetMileage: 2700, homeFrequency: 'Once per week', certifications: 'Hazmat', driverQuote: '$82,000/year', truckMake: 'Volvo', truckModel: 'VNL', truckYear: 2018, truckMileage: 210000, dotInspection: '2025-11-05', registration: 'Valid' },
  { id: 'lead-8', firstName: 'Fred', lastName: '', email: 'fred@example.com', phone: '+1 (555) 777-8888', column: 'in-progress', tags: ['Hot Lead'], statusDots: [true, true, true, false], followUpDate: null, category: 'Company Driver', homeTown: 'Amarillo, TX', yearsExperience: 2, targetMileage: 2100, homeFrequency: 'Every day', certifications: 'None', driverQuote: '$65,000/year', truckMake: '', truckModel: '', truckYear: 0, truckMileage: 0, dotInspection: '', registration: '' },
  { id: 'lead-9', firstName: 'John', lastName: '', email: 'john2@example.com', phone: '+1 (555) 999-0000', column: 'in-progress', tags: ['Safety Pending'], statusDots: [true, true, true, false], followUpDate: null, category: 'Independent Contractor', homeTown: 'Waco, TX', yearsExperience: 6, targetMileage: 2900, homeFrequency: 'Once per week', certifications: 'Hazmat, Tanker', driverQuote: '$92,000/year', truckMake: 'Mack', truckModel: 'Anthem', truckYear: 2020, truckMileage: 140000, dotInspection: '2026-01-30', registration: 'Valid' },
  { id: 'lead-10', firstName: 'Mark', lastName: '', email: 'mark.a@example.com', phone: '+1 (555) 222-3333', column: 'in-progress', tags: [], statusDots: [true, true, true, true], followUpDate: null, category: 'Company Driver', homeTown: 'Tyler, TX', yearsExperience: 3, targetMileage: 2300, homeFrequency: 'Every other week', certifications: 'None', driverQuote: '$71,000/year', truckMake: '', truckModel: '', truckYear: 0, truckMileage: 0, dotInspection: '', registration: '' }
];

// Safety columns and drivers data
let safetyColumns = [
  { id: 'critical-alert', title: 'Critical Alert', editable: false },
  { id: 'pending-removal', title: 'Pending removal', editable: false }
];

let safetyDrivers = [
  // Recruiting Request for Approval (5)
  { id: 'safe-1', firstName: 'David', lastName: 'Williams', email: 'david.w@example.com', phone: '555-0101', column: 'recruiting-approval', tags: ['Safety Pending'], statusDots: [true, true, true, false], truckId: '', driverType: 'OTR', yearsExperience: 5 },
  { id: 'safe-2', firstName: 'James', lastName: 'Brown', email: 'james.b@example.com', phone: '555-0102', column: 'recruiting-approval', tags: ['Hot Lead'], statusDots: [true, true, false, false], truckId: '', driverType: 'Regional', yearsExperience: 3 },
  { id: 'safe-3', firstName: 'Robert', lastName: 'Jones', email: 'robert.j@example.com', phone: '555-0103', column: 'recruiting-approval', tags: [], statusDots: [true, false, false, false], truckId: '', driverType: 'OTR', yearsExperience: 7 },
  { id: 'safe-4', firstName: 'Michael', lastName: 'Miller', email: 'michael.m@example.com', phone: '555-0104', column: 'recruiting-approval', tags: ['Review Needed'], statusDots: [true, true, true, false], truckId: '', driverType: 'Local', yearsExperience: 4 },
  { id: 'safe-5', firstName: 'William', lastName: 'Davis', email: 'william.d@example.com', phone: '555-0105', column: 'recruiting-approval', tags: [], statusDots: [true, true, false, false], truckId: '', driverType: 'OTR', yearsExperience: 6 },

  // Critical Alert (3)
  { id: 'safe-9', firstName: 'Charles', lastName: 'Martinez', email: 'charles.m@example.com', phone: '555-0109', column: 'critical-alert', tags: ['Medical Expiring'], statusDots: [true, true, true, true], truckId: 'T-200', driverType: 'OTR', yearsExperience: 12 },
  { id: 'safe-10', firstName: 'Daniel', lastName: 'Anderson', email: 'daniel.a@example.com', phone: '555-0110', column: 'critical-alert', tags: ['Reg Expiring'], statusDots: [true, true, true, true], truckId: 'T-201', driverType: 'Regional', yearsExperience: 9 },
  { id: 'safe-11', firstName: 'Matthew', lastName: 'Taylor', email: 'matthew.t@example.com', phone: '555-0111', column: 'critical-alert', tags: ['Reg Missing'], statusDots: [true, true, true, true], truckId: 'T-202', driverType: 'OTR', yearsExperience: 4 },

  // Active Drivers (3)
  { id: 'safe-6', firstName: 'Richard', lastName: 'Garcia', email: 'richard.g@example.com', phone: '555-0106', column: 'active-drivers', tags: ['Ready Next Week'], statusDots: [true, true, true, true], truckId: 'T-101', driverType: 'OTR', yearsExperience: 10 },
  { id: 'safe-7', firstName: 'Joseph', lastName: 'Rodriguez', email: 'joseph.r@example.com', phone: '555-0107', column: 'active-drivers', tags: ['Ready This Week'], statusDots: [true, true, true, true], truckId: 'T-102', driverType: 'Regional', yearsExperience: 8 },
  { id: 'safe-8', firstName: 'Thomas', lastName: 'Wilson', email: 'thomas.w@example.com', phone: '555-0108', column: 'active-drivers', tags: ['Ready This Month'], statusDots: [true, true, true, true], truckId: 'T-103', driverType: 'Local', yearsExperience: 5 }
];

// Fleet columns and drivers data
const fleetColumns = [
  { id: 'truck-assignment', title: 'Truck Assignment' },
  { id: 'compliance-docs', title: 'Compliance Docs' },
  { id: 'eld-setup', title: 'ELD Setup' },
  { id: 'trailer-setup', title: 'Trailer Setup' },
  { id: 'fleet-complete', title: 'Fleet Complete' }
];

const fleetDrivers = [
  // Truck Assignment
  { id: 'fleet-1', firstName: 'Steven', lastName: 'Clark', email: 'steven.c@example.com', phone: '555-0201', column: 'truck-assignment', tags: ['Needs Truck'], statusDots: [true, true, false, false], driverType: 'OTR' },
  { id: 'fleet-2', firstName: 'Paul', lastName: 'Lewis', email: 'paul.l@example.com', phone: '555-0202', column: 'truck-assignment', tags: ['Truck assigned'], statusDots: [true, true, true, false], driverType: 'Regional', truckId: 'T-305' },

  // Compliance Docs
  { id: 'fleet-3', firstName: 'Kevin', lastName: 'Walker', email: 'kevin.w@example.com', phone: '555-0203', column: 'compliance-docs', tags: ['Docs Pending'], statusDots: [true, true, false, false], driverType: 'OTR' },
  { id: 'fleet-4', firstName: 'Brian', lastName: 'Hall', email: 'brian.h@example.com', phone: '555-0204', column: 'compliance-docs', tags: ['Review Docs'], statusDots: [true, true, false, false], driverType: 'Local' },
  { id: 'fleet-5', firstName: 'George', lastName: 'Allen', email: 'george.a@example.com', phone: '555-0205', column: 'compliance-docs', tags: [], statusDots: [true, true, false, false], driverType: 'OTR' },

  // ELD Setup
  { id: 'fleet-6', firstName: 'Edward', lastName: 'Young', email: 'edward.y@example.com', phone: '555-0206', column: 'eld-setup', tags: ['Device Ordered'], statusDots: [true, true, true, false], driverType: 'Regional', truckId: 'T-310' },

  // Trailer Setup
  { id: 'fleet-7', firstName: 'Ronald', lastName: 'King', email: 'ronald.k@example.com', phone: '555-0207', column: 'trailer-setup', tags: ['Trailer Assign'], statusDots: [true, true, true, true], driverType: 'OTR', truckId: 'T-315' },
  { id: 'fleet-8', firstName: 'Timothy', lastName: 'Wright', email: 'timothy.w@example.com', phone: '555-0208', column: 'trailer-setup', tags: [], statusDots: [true, true, true, true], driverType: 'OTR', truckId: 'T-320' },

  // Fleet Complete
  { id: 'fleet-9', firstName: 'Jason', lastName: 'Scott', email: 'jason.s@example.com', phone: '555-0209', column: 'fleet-complete', tags: ['Ready'], statusDots: [true, true, true, true], driverType: 'Regional', truckId: 'T-325' },
  { id: 'fleet-10', firstName: 'Jeffrey', lastName: 'Green', email: 'jeffrey.g@example.com', phone: '555-0210', column: 'fleet-complete', tags: ['Dispatched'], statusDots: [true, true, true, true], driverType: 'OTR', truckId: 'T-330' },
  { id: 'fleet-11', firstName: 'Ryan', lastName: 'Baker', email: 'ryan.b@example.com', phone: '555-0211', column: 'fleet-complete', tags: ['Ready'], statusDots: [true, true, true, true], driverType: 'Local', truckId: 'T-335' }
];

// Accounting columns and drivers data
const accountingColumns = [
  { id: 'payroll-setup', title: 'Payroll Setup' },
  { id: 'statements-pending', title: 'Statements / Docs Pending' },
  { id: 'payroll-complete', title: 'Payroll Ready / Complete' }
];

const accountingDrivers = [
  // Payroll Setup
  { id: 'acc-1', firstName: 'Anthony', lastName: 'Morris', email: 'anthony.m@example.com', phone: '555-0301', column: 'payroll-setup', tags: ['W-9 Missing'], statusDots: [true, true, false, false], driverType: 'OTR', truckId: 'T-340' },
  { id: 'acc-2', firstName: 'Mark', lastName: 'Turner', email: 'mark.t@example.com', phone: '555-0302', column: 'payroll-setup', tags: ['Bank Info'], statusDots: [true, true, false, false], driverType: 'Regional', truckId: 'T-345' },

  // Statements / Docs Pending
  { id: 'acc-3', firstName: 'Donald', lastName: 'Phillips', email: 'donald.p@example.com', phone: '555-0303', column: 'statements-pending', tags: ['Statement Ready'], statusDots: [true, true, true, false], driverType: 'OTR', truckId: 'T-350' },
  { id: 'acc-4', firstName: 'Steven', lastName: 'Campbell', email: 'steven.c@example.com', phone: '555-0304', column: 'statements-pending', tags: ['Reviewing'], statusDots: [true, true, true, false], driverType: 'Local', truckId: 'T-355' },

  // Payroll Ready / Complete
  { id: 'acc-5', firstName: 'Paul', lastName: 'Parker', email: 'paul.p@example.com', phone: '555-0305', column: 'payroll-complete', tags: ['Paid'], statusDots: [true, true, true, true], driverType: 'OTR', truckId: 'T-360' },
  { id: 'acc-6', firstName: 'George', lastName: 'Evans', email: 'george.e@example.com', phone: '555-0306', column: 'payroll-complete', tags: ['Processing'], statusDots: [true, true, true, true], driverType: 'Regional', truckId: 'T-365' }
];

// -------------------------
// EARNINGS DATA
// -------------------------
const earningsData = {
  week: { amount: 860, label: 'Current Week' },
  month: { amount: 3420, label: 'Current Month' },
  year: { amount: 18900, label: 'Year to Date' }
};

const closedDrivers = [
  { name: 'Julio Ramos', status: 'Closed', day: 2, totalDays: 11, amount: 250, collected: false },
  { name: 'Fernando Martinez', status: 'Closed', day: 5, totalDays: 11, amount: 180, collected: false },
  { name: 'Pedro Alvarez', status: 'Closed', day: 8, totalDays: 11, amount: 300, collected: false },
  { name: 'John Walker', status: 'Closed', day: 11, totalDays: 11, amount: 220, collected: true },
  { name: 'Mike Johnson', status: 'Closed', day: 10, totalDays: 11, amount: 260, collected: true }
];

let currentEarningsTab = 'month';


let activeLead = null;
let isExpanded = false;

const CIRC = 276.46; // 2*pi*r with r=44 (approx)
function setProgress(svgCircle, ratio) {
  const r = Math.max(0, Math.min(1, ratio));
  const offset = CIRC * (1 - r);
  svgCircle.style.strokeDasharray = CIRC;
  svgCircle.style.strokeDashoffset = offset;
}

// Smooth animate dashoffset
function animateProgress(svgCircle, ratio, duration = 900) {
  const start = parseFloat(getComputedStyle(svgCircle).strokeDashoffset) || CIRC;
  const end = CIRC * (1 - Math.max(0, Math.min(1, ratio)));
  const t0 = performance.now();

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function step(now) {
    const p = Math.min(1, (now - t0) / duration);
    const v = start + (end - start) * easeInOut(p);
    svgCircle.style.strokeDashoffset = v;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map(p => p[0]).join("").toUpperCase();
}
function pct(x) { return Math.round(x * 100) + "%"; }
function days(x) { return x.toFixed(1) + "d"; }

function medalSrc(rank) {
  if (rank === 1) return "assets/img/gold.png";
  if (rank === 2) return "assets/img/silver.png";
  if (rank === 3) return "assets/img/bronze.png";
  return null;
}

function renderTable() {
  els.tbody.innerHTML = "";
  recruiters.forEach((r, idx) => {
    const rank = idx + 1;
    const tr = document.createElement("tr");
    tr.dataset.id = r.id;

    const medal = medalSrc(rank);
    tr.innerHTML = `
          <td class="rank">${rank}</td>
          <td>
            <div class="namecell">
              ${medal ? `<img class="medal" src="${medal}" alt="medal ${rank}" />` : `<div style="width:26px"></div>`}
              <div class="avatar">${initials(r.name)}</div>
              <div class="person">
                <strong>${r.name}</strong>
                <span>${r.role}</span>
              </div>
            </div>
          </td>
          <td><span class="metric">${r.lc}</span><span class="sub">contacts</span></td>
          <td><span class="metric">${pct(r.cr)}</span><span class="sub">conversion</span></td>
          <td><span class="metric">${days(r.atc)}</span><span class="sub">speed</span></td>
          <td><span class="metric">${r.closed}</span><span class="sub">closed</span></td>
        `;

    tr.addEventListener("click", () => selectRecruiter(r.id));
    els.tbody.appendChild(tr);
  });
}

function selectRecruiter(id) {
  const r = recruiters.find(x => x.id === id);
  if (!r) return;

  // highlight
  document.querySelectorAll("tbody tr").forEach(row => {
    row.classList.toggle("selected", row.dataset.id === id);
  });

  // update values
  els.kpiLC.textContent = r.lc;
  els.kpiCR.textContent = pct(r.cr);
  els.kpiClosed.textContent = r.closed;

  // progress ratios (demo: map to reasonable max)
  const lcRatio = Math.min(1, r.lc / 400);
  const crRatio = Math.min(1, r.cr / 0.20);
  const clRatio = Math.min(1, r.closed / 40);

  const progLC = document.querySelector('.kpi[data-kpi="lc"] .prog');
  const progCR = document.querySelector('.kpi[data-kpi="cr"] .prog');
  const progCL = document.querySelector('.kpi[data-kpi="closed"] .prog');

  animateProgress(progLC, lcRatio, 850);
  animateProgress(progCR, crRatio, 850);
  animateProgress(progCL, clRatio, 850);
}

// -------------------------
// View Switching
// -------------------------
function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));

  // Show selected view
  if (viewName === 'recruiting') {
    els.recruitingView.classList.add('active');
    if (!els.funnelBoard.children.length) {
      renderFunnel(); // Lazy render on first visit
    }
  } else if (viewName === 'performance') {
    els.performanceView.classList.add('active');
  } else if (viewName === 'lead-dashboard') {
    els.leadDashboardView.classList.add('active');
  } else if (viewName === 'safety') {
    els.safetyView.classList.add('active');
    if (typeof renderSafetyBoard === 'function' && !els.safetyBoard.children.length) renderSafetyBoard();
  } else if (viewName === 'fleet') {
    els.fleetView.classList.add('active');
    if (typeof renderFleetBoard === 'function' && !els.fleetBoard.children.length) renderFleetBoard();
  } else if (viewName === 'accounting') {
    els.accountingView.classList.add('active');
    if (typeof renderAccountingBoard === 'function' && !els.accountingBoard.children.length) renderAccountingBoard();
  } else if (viewName === 'earnings') {
    els.earningsView.classList.add('active');
  } else if (viewName === 'inbox') {
    els.inboxView.classList.add('active');
    if (typeof renderInboxList === 'function') renderInboxList();
  }

  // Update nav active state
  document.querySelectorAll('.nav button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
}

// Navigation click handlers
document.querySelectorAll('.nav button[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    switchView(view);
  });
});

// -------------------------
// Recruiting Funnel
// -------------------------
function getTagClass(tag) {
  if (tag.includes('NEW')) return 'yellow';
  if (tag.includes('Bad') || tag.includes('VM')) return 'red';
  if (tag.includes('Hot') || tag.includes('Follow')) return 'blue';
  if (tag.includes('Safety')) return 'green';
  return 'blue';
}

// Search leads by tag and show in dropdown
function filterLeadsByTag(searchTerm) {
  const dropdown = document.getElementById('searchResultsDropdown');
  const search = searchTerm.toLowerCase().trim();

  // Clear previous results
  dropdown.innerHTML = '';

  if (!search) {
    dropdown.classList.remove('show');
    return;
  }

  // Find matching leads
  const matchingLeads = leads.filter(lead => {
    if (!lead.tags) return false;
    return lead.tags.some(tag => tag.toLowerCase().includes(search));
  });

  if (matchingLeads.length === 0) {
    dropdown.innerHTML = '<div class="search-result-item" style="cursor:default; color:#888;">No matches found</div>';
    dropdown.classList.add('show');
    return;
  }

  // Populate dropdown
  matchingLeads.forEach(lead => {
    const item = document.createElement('div');
    item.className = 'search-result-item';

    // Create tags HTML
    const matchingTags = lead.tags.filter(t => t.toLowerCase().includes(search));
    const tagsHtml = matchingTags.map(tag =>
      `<span class="search-result-tag ${getTagClass(tag)}" style="background-color: ${getTagColor(tag)}; color: ${getTagTextColor(tag)}">${tag}</span>`
    ).join('');

    item.innerHTML = `
      <div class="search-result-name">${lead.firstName} ${lead.lastName}</div>
      <div class="search-result-tags">${tagsHtml}</div>
    `;

    item.addEventListener('click', () => {
      openRecruitingModal(lead);
      dropdown.classList.remove('show');
      document.getElementById('tagSearchInput').value = ''; // Optional: clear search
    });

    dropdown.appendChild(item);
  });

  dropdown.classList.add('show');
}

// Helper to get raw color values for inline styles in dropdown
function getTagColor(tag) {
  if (tag.includes('NEW')) return '#fbbf24';
  if (tag.includes('Bad') || tag.includes('VM')) return '#ef4444';
  if (tag.includes('Hot') || tag.includes('Follow')) return '#3b82f6';
  if (tag.includes('Safety')) return '#10b981';
  return '#3b82f6';
}

function getTagTextColor(tag) {
  if (tag.includes('NEW')) return '#78350f';
  return '#fff';
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('searchResultsDropdown');
  const searchInput = document.getElementById('tagSearchInput');

  if (!dropdown || !searchInput) return;

  if (!dropdown.contains(e.target) && e.target !== searchInput) {
    dropdown.classList.remove('show');
  }
});

// Safety Tab Search Function
function filterSafetyLeadsByTag(searchTerm) {
  const dropdown = document.getElementById('safetySearchResultsDropdown');
  const search = searchTerm.toLowerCase().trim();

  dropdown.innerHTML = '';

  if (!search) {
    dropdown.classList.remove('show');
    return;
  }

  const matchingLeads = safetyDrivers.filter(lead => {
    if (!lead.tags) return false;
    return lead.tags.some(tag => tag.toLowerCase().includes(search));
  });

  if (matchingLeads.length === 0) {
    dropdown.innerHTML = '<div class="search-result-item" style="cursor:default; color:#888;">No matches found</div>';
    dropdown.classList.add('show');
    return;
  }

  matchingLeads.forEach(lead => {
    const item = document.createElement('div');
    item.className = 'search-result-item';

    const matchingTags = lead.tags.filter(t => t.toLowerCase().includes(search));
    const tagsHtml = matchingTags.map(tag =>
      `<span class="search-result-tag ${getTagClass(tag)}" style="background-color: ${getTagColor(tag)}; color: ${getTagTextColor(tag)}">${tag}</span>`
    ).join('');

    const fullName = lead.firstName + (lead.lastName ? ' ' + lead.lastName : '');
    item.innerHTML = `
      <div class="search-result-name">${fullName}</div>
      <div class="search-result-tags">${tagsHtml}</div>
    `;

    item.addEventListener('click', () => {
      openRecruitingModal(lead);
      dropdown.classList.remove('show');
      document.getElementById('safetyTagSearchInput').value = '';
    });

    dropdown.appendChild(item);
  });

  dropdown.classList.add('show');
}

// Close safety dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('safetySearchResultsDropdown');
  const searchInput = document.getElementById('safetyTagSearchInput');

  if (!dropdown || !searchInput) return;

  if (!dropdown.contains(e.target) && e.target !== searchInput) {
    dropdown.classList.remove('show');
  }
});

function isOverdue(date) {
  if (!date) return false;
  const followUp = new Date(date);
  const now = new Date();
  return followUp < now;
}

// Center Modal Logic
// Center Modal Logic
// Tag System Logic
const tagStyle = document.createElement('style');
tagStyle.innerHTML = `
      .tag-remove { 
        margin-left: 5px; 
        font-size: 14px; 
        cursor: pointer; 
        opacity: 0.6; 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        width: 16px; 
        height: 16px; 
        border-radius: 50%;
        transition: all .2s;
      }
      .tag-remove:hover { 
        opacity: 1; 
        background: rgba(0,0,0,0.15); 
        color: #000;
      }
      
      /* Horizontal Scroll Fixes */
      .main { min-width: 0; }
      .recruiting-board { padding-bottom: 20px; }
      .recruiting-board::-webkit-scrollbar { height: 10px; }
      .recruiting-board::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 6px; }
      .recruiting-board::-webkit-scrollbar-thumb { background: rgba(15, 23, 42, .2); border-radius: 6px; border: 2px solid transparent; background-clip: content-box; }
      .recruiting-board::-webkit-scrollbar-thumb:hover { background-color: rgba(15, 23, 42, .4); }

      /* Modern Background & Hovering Columns */
      body {
        background: linear-gradient(120deg, #fdfbf7 0%, #ebf4ff 50%, #f3f6fc 100%) !important;
        background-attachment: fixed !important;
      }
      .funnel .column {
        background: rgba(255, 255, 255, 0.85) !important;
        backdrop-filter: blur(8px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 15px rgba(0,0,0,0.03) !important;
        border: 1px solid rgba(255, 255, 255, 0.6) !important;
      }
      
      /* Remove container box effects */
      .recruiting-view, .recruiting-board {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      
      /* Mini Modal Styles */
      .modal-recruiting { transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
      .modal-recruiting.mini {
        width: 650px !important;
        max-width: 90vw;
        height: auto !important;
        min-height: 200px;
        grid-template-columns: 1fr !important;
        overflow: hidden;
      }
      .modal-recruiting.mini .modal-left-recruiting {
        border-right: none !important;
        width: 100%;
      }

      /* DARK MODE STYLES - AGGRESSIVE BLUE THEME */
      body.dark-mode {
        --bg: #020617;
        --surface: #0f172a;
        --text: #f8fafc;
        background: #020617 !important;
        color: #f8fafc !important;
      }
      
      /* SIDEBAR BLUE */
      body.dark-mode .sidebar {
        background: #0b1121 !important; /* Very Dark Blue */
        border-right: 1px solid #1e293b;
      }
      body.dark-mode .nav button {
        background: rgba(30, 41, 59, 0.4) !important; /* Dark Blue-Gray */
        color: #94a3b8;
        border: 1px solid rgba(255,255,255,0.05);
      }
      body.dark-mode .nav button.active {
        background: #172554 !important; /* Blue 950 */
        color: #60a5fa !important; /* Blue 400 Text */
        border: 1px solid #3b82f6 !important;
      }
      body.dark-mode .nav button:hover {
        background: #1e293b !important;
        color: #fff;
      }
      
      /* COLUMNS BLUE & TEXT WHITE */
      body.dark-mode .funnel-column {
        background: #0f172a !important; /* Slate 900 */
        border: 1px solid #1e3a8a !important; /* Dark Blue Border */
        box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
      }
      body.dark-mode .column-header {
        color: #ffffff !important;
        font-weight: 700 !important;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      }
      
      /* CARDS & MODALS */
      body.dark-mode .card, 
      body.dark-mode .lead-card,
      body.dark-mode .kpi,
      body.dark-mode .modal-recruiting,
      body.dark-mode .lead-panel {
        background: #1e293b !important; /* Slate 800 */
        border: 1px solid #334155 !important;
        color: #fff !important;
      }
      
      /* TEXT COLORS */
      body.dark-mode .lead-name, 
      body.dark-mode .section-title,
      body.dark-mode .modal-title-recruiting, 
      body.dark-mode strong,
      body.dark-mode .val,
      body.dark-mode .field-label {
        color: #fff !important;
      }
      
      /* INPUTS & FIELDS */
      body.dark-mode .field-value, 
      body.dark-mode .field-input,
      body.dark-mode .field-select,
      body.dark-mode .item,
      body.dark-mode .hamburger,
      body.dark-mode .profile {
        background: #020617 !important; /* Almost Black Blue */
        color: #fff !important;
        border-color: #334155;
      }
      body.dark-mode thead th {
        background: rgba(5, 10, 25, 0.8) !important;
        color: #cbd5e1 !important;
      }
      body.dark-mode tr.active-row,
      body.dark-mode .lead-row:hover {
        background: rgba(30, 64, 175, 0.15) !important;
      }
      
      body.dark-mode .hamburger svg path,
      body.dark-mode .profile svg path {
        stroke: #fff !important;
      }
      body.dark-mode #performance-view .card {
        background: rgba(15, 23, 42, 0.9) !important;
      }
      body.dark-mode .lead-card:hover {
        background: #334155 !important;
        transform: translateY(-2px);
      }
    `;
document.head.appendChild(tagStyle);

// Dark Mode Toggle Logic
const themeCheckbox = document.getElementById('themeToggleCheckbox');

function toggleTheme(e) {
  if (e.target.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

if (themeCheckbox) {
  themeCheckbox.addEventListener('change', toggleTheme);

  // Sync state on load
  if (document.body.classList.contains('dark-mode')) {
    themeCheckbox.checked = true;
  }
}

// Profile Popup Logic
const profileBtn = document.getElementById('profileBtn');
const profilePopup = document.getElementById('profilePopup');

if (profileBtn && profilePopup) {
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profilePopup.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!profilePopup.contains(e.target) && !profileBtn.contains(e.target)) {
      profilePopup.classList.remove('active');
    }
  });
}

const availableTags = [
  { name: 'Ready Next Week', color: 'blue' },
  { name: 'Ready This Week', color: 'green' },
  { name: 'Ready This Month', color: 'orange' },
  { name: 'Not specified', color: 'red' },
  { name: 'NEW', color: 'yellow' },
  { name: 'VoiceMail Attempt1', color: 'red' },
  { name: 'VoiceMail Atempt 2', color: 'red' },
  { name: 'Bad Number', color: 'red' }
];

const availableSafetyTags = [
  { name: 'Medical Expires 30 days', color: 'orange' },
  { name: 'Recruiter Dragisa', color: 'blue' },
  { name: 'Recruiter Boban', color: 'green' },
  { name: 'Recruiter Visnja', color: 'blue' },
  { name: 'ACTIVE DRIVER', color: 'green' },
  { name: 'Claim', color: 'red' },
  { name: 'INACTIVE DRIVER', color: 'yellow' },
  { name: 'TERMINATED', color: 'red' },
  { name: 'Recruiting Request for Approval', color: 'yellow' },
  { name: 'Pre-Employment Drug Test Pending', color: 'orange' },
  { name: 'New Driver Setup', color: 'yellow' },
  { name: 'New Driver Ready', color: 'yellow' },
  { name: 'Registration Expiring Within 30 Days', color: 'orange' },
  { name: 'Ticket', color: 'red' },
  { name: 'Violation', color: 'red' },
  { name: 'CDL Expires 30 Days', color: 'orange' }
];


function createTagMenu() {
  // Always remove existing to force update
  const existing = document.getElementById('tagMenu');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.id = 'tagMenu';
  menu.className = 'tag-menu';
  menu.innerHTML = `
        <div class="tag-menu-header">
          <div class="tag-menu-title">TAGS</div>
          <div class="tag-menu-title" style="cursor:pointer" onclick="closeTagMenu()">+</div>
        </div>
        <div class="tag-search-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="margin-right:8px; width:14px; height:14px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" class="tag-search-input" placeholder="Search tags" onkeyup="filterTags(this.value)">
        </div>
        <div class="tag-list" id="tagList"></div>
      `;
  document.body.appendChild(menu);
}

function renderTagList(filter = '') {
  const list = document.getElementById('tagList');
  if (!list) return;
  list.innerHTML = '';

  // Detect active view and use appropriate tags based on the lead
  let isSafetyLead = false;
  if (activeTagLeadId) {
    // Check if the lead belongs to safety drivers
    // Note: safetyDrivers must be defined globally
    if (typeof safetyDrivers !== 'undefined' && safetyDrivers.find(d => d.id === activeTagLeadId)) {
      isSafetyLead = true;
    }
  }

  // Fallback to view check if lead ID not set (e.g. initial load logic?)
  if (!isSafetyLead && els.safetyView && els.safetyView.classList.contains('active')) {
    isSafetyLead = true;
  }

  const tagsToUse = isSafetyLead ? availableSafetyTags : availableTags;

  tagsToUse.forEach(tag => {
    if (tag.name.toLowerCase().includes(filter.toLowerCase())) {
      const item = document.createElement('div');
      item.className = 'tag-item-colored'; // Unique class to avoid conflicts
      item.onclick = () => addTagToLead(tag.name);

      const bgColor = getTagColor(tag.name);
      const txtColor = getTagTextColor(tag.name);

      // Force styles with !important
      item.style.setProperty('background-color', bgColor, 'important');
      item.style.setProperty('color', txtColor, 'important');
      item.style.border = '1px solid rgba(0,0,0,0.05)';

      // Layout fixes to look like a tag
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.padding = '8px 12px';
      item.style.borderRadius = '8px';
      item.style.marginBottom = '6px';
      item.style.cursor = 'pointer';
      item.style.transition = 'all 0.2s';
      item.style.userSelect = 'none';

      item.innerHTML = `
            <div class="tag-check" style="
              width: 16px; 
              height: 16px; 
              border-radius: 50%; 
              border: 2px solid rgba(255,255,255,0.6); 
              margin-right: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              background:${tag.name.includes('NEW') ? '#fff' : 'transparent'};
              box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            "></div>
            <div class="tag-item-name" style="font-weight:700; font-size:13px; letter-spacing:0.3px">${tag.name}</div>
            <div class="tag-edit-icon" style="margin-left:auto; opacity:0.8; font-size:14px">✎</div>
          `;

      // Hover effect
      item.onmouseenter = () => {
        item.style.opacity = '0.9';
        item.style.transform = 'translateY(-1px) scale(1.01)';
        item.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      };
      item.onmouseleave = () => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = 'none';
      };

      list.appendChild(item);
    }
  });
}

let activeTagLeadId = null;

function toggleTagMenu(e, leadId) {
  e.stopPropagation();
  createTagMenu(); // ensure exists
  const menu = document.getElementById('tagMenu');
  if (menu.classList.contains('open') && activeTagLeadId === leadId) {
    closeTagMenu();
  } else {
    activeTagLeadId = leadId;
    const rect = e.target.getBoundingClientRect();
    // Position relative to viewport
    menu.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    menu.style.left = (rect.left + window.scrollX) + 'px';
    menu.classList.add('open');
    renderTagList();
  }
}

function closeTagMenu() {
  const menu = document.getElementById('tagMenu');
  if (menu) menu.classList.remove('open');
}

function filterTags(val) {
  renderTagList(val);
}

function addTagToLead(tagName) {
  let lead = leads.find(l => l.id === activeTagLeadId);
  let isSafety = false;

  if (!lead) {
    lead = safetyDrivers.find(l => l.id === activeTagLeadId);
    isSafety = true;
  }

  if (lead) {
    if (!lead.tags) lead.tags = [];
    if (!lead.tags.includes(tagName)) {
      lead.tags.push(tagName);
      // Refresh UI
      if (isSafety) {
        renderSafetyBoard();
      } else {
        renderFunnel();
      }
      openRecruitingModal(lead);
    }
    closeTagMenu();
  }
}

function removeTagFromLead(leadId, tagName, e) {
  e.stopPropagation();
  let lead = leads.find(l => l.id === leadId);
  let isSafety = false;

  if (!lead) {
    lead = safetyDrivers.find(l => l.id === leadId);
    isSafety = true;
  }

  if (lead && lead.tags) {
    lead.tags = lead.tags.filter(t => t !== tagName);
    if (isSafety) {
      renderSafetyBoard();
    } else {
      renderFunnel();
    }
    openRecruitingModal(lead);
  }
}

// Close tag menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('tagMenu');
  if (menu && menu.classList.contains('open') && !e.target.closest('.tag-menu') && !e.target.closest('.add-tag-btn')) {
    closeTagMenu();
  }
});

function renderLeadCard(lead) {
  const card = document.createElement('div');
  card.className = 'lead-card';
  card.draggable = true;
  card.dataset.leadId = lead.id;

  const dotsHtml = lead.statusDots.map(complete =>
    `<div class="status-dot ${complete ? 'complete' : ''}"></div>`
  ).join('');

  let tagsHtml = lead.tags.map(tag =>
    `<span class="tag ${getTagClass(tag)}" data-tag="${tag}">${tag}</span>`
  ).join('');

  let activityIconsHtml = '';
  const now = new Date().getTime();
  const isEditedRecently = lead.lastEdited && ((now - lead.lastEdited) / (1000 * 60)) <= 10;
  const isViewedRecently = lead.lastViewed && ((now - lead.lastViewed) / (1000 * 60)) <= 10;

  if (isEditedRecently) {
      activityIconsHtml += `<img src="assets/edit.png" title="Recently Edited" style="width: 14px; height: 14px; opacity: 0.8; cursor: help;">`;
  } else if (isViewedRecently) {
      activityIconsHtml += `<img src="assets/eye.png" title="Recently Viewed" style="width: 14px; height: 14px; filter: grayscale(1); opacity: 0.6; cursor: help;">`;
  }

  const displayName = lead.firstName + (lead.lastName ? ' ' + lead.lastName : '');

  // Days in Stage Badge
  const days = lead.daysInStage || Math.floor(Math.random() * 10) + 1; // Mock if missing
  const daysClass = getDaysInStageClass(days);
  const daysHtml = `<div class="days-in-stage ${daysClass}">${days}d</div>`;

  let metaHtml = '';
  if (lead.followUpDate) {
    const overdue = isOverdue(lead.followUpDate);
    const date = new Date(lead.followUpDate);
    const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
      date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    metaHtml = `<div class="lead-meta ${overdue ? 'overdue' : ''}">📅 ${formatted}</div>`;
  }

  card.innerHTML = `
        <div class="lead-header">
          <div class="status-dots">${dotsHtml}</div>
          <div class="lead-name">${displayName}</div>
          <div style="margin-left:auto; display:flex; align-items:center; gap:6px;">
            ${activityIconsHtml}
            ${daysHtml}
          </div>
        </div>
        ${tagsHtml ? `<div class="lead-tags collapsed">${tagsHtml}</div>` : ''}
        ${metaHtml}
      `;


  // PRIORITY 1: Add click handler for tags FIRST with capture phase
  const tagsContainer = card.querySelector('.lead-tags');
  if (tagsContainer) {
    // Use capture phase (true) so this fires BEFORE bubble phase
    tagsContainer.addEventListener('click', function (e) {
      console.log('🏷️ Tags clicked!');

      // Stop ALL event propagation immediately
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();

      // Toggle collapsed class
      this.classList.toggle('collapsed');
      this.classList.toggle('expanded');

      console.log('✅ Tags toggled! Class:', this.className);
    }, true); // CAPTURE PHASE = TRUE (fires first!)
  }

  // PRIORITY 2: Click to open recruiting modal (fires second)
  card.addEventListener('click', (e) => {
    console.log('📋 Card clicked!');
    if (!card.classList.contains('dragging')) {
      openRecruitingModal(lead);
    }
  });

  // Touch Drag events for mobile
  let touchTimer;
  let ghostCard = null;
  let initialX = 0;
  let initialY = 0;

  card.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    if (e.target.closest('.lead-tags') || e.target.closest('.tag')) return;

    const touch = e.touches[0];
    initialX = touch.clientX;
    initialY = touch.clientY;

    touchTimer = setTimeout(() => {
      card.classList.add('dragging');
      // Create ghost element for visual feedback
      ghostCard = card.cloneNode(true);
      ghostCard.classList.remove('dragging');
      ghostCard.style.position = 'fixed';
      ghostCard.style.top = (initialY - 50) + 'px';
      ghostCard.style.left = (initialX - card.offsetWidth / 2) + 'px';
      ghostCard.style.width = card.offsetWidth + 'px';
      ghostCard.style.opacity = '0.9';
      ghostCard.style.zIndex = '1000';
      ghostCard.style.pointerEvents = 'none';
      ghostCard.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
      ghostCard.style.transform = 'scale(1.05)';
      document.body.appendChild(ghostCard);

      // Vibrate if supported
      if (navigator.vibrate) navigator.vibrate(50);
    }, 300); // 300ms long press
  }, { passive: true });

  card.addEventListener('touchmove', (e) => {
    if (!ghostCard) {
      // If we haven't created a ghost card yet, it means they are just scrolling.
      // Cancel the long press timer if they moved significantly.
      const touch = e.touches[0];
      if (Math.abs(touch.clientX - initialX) > 10 || Math.abs(touch.clientY - initialY) > 10) {
        clearTimeout(touchTimer);
      }
      return;
    }

    // We are dragging
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    ghostCard.style.top = (touch.clientY - 50) + 'px';
    ghostCard.style.left = (touch.clientX - card.offsetWidth / 2) + 'px';

    // Auto-scroll near edges
    const scrollEdge = 100;
    const board = document.querySelector('.recruiting-board');
    if (board) {
      if (touch.clientX < scrollEdge) {
        board.scrollBy(-15, 0);
      } else if (touch.clientX > window.innerWidth - scrollEdge) {
        board.scrollBy(15, 0);
      }
    }

    // Highlight drop target
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropColumn = targetElement ? targetElement.closest('.funnel-column') : null;

    document.querySelectorAll('.funnel-column.drag-over').forEach(c => c.classList.remove('drag-over'));
    if (dropColumn) {
      dropColumn.classList.add('drag-over');
    }
  }, { passive: false });

  card.addEventListener('touchend', (e) => {
    clearTimeout(touchTimer);
    if (ghostCard) {
      const touch = e.changedTouches[0];
      const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropColumn = targetElement ? targetElement.closest('.funnel-column') : null;

      if (dropColumn) {
        const colId = dropColumn.dataset.columnId;
        if (lead.column !== colId) {
          lead.column = colId;
          if (typeof renderFunnel === 'function') renderFunnel();
          if (typeof renderSafetyBoard === 'function') renderSafetyBoard();
          if (typeof renderFleetBoard === 'function') renderFleetBoard();
          if (typeof renderAccountingBoard === 'function') renderAccountingBoard();
        }
        dropColumn.classList.remove('drag-over');
      }

      ghostCard.remove();
      ghostCard = null;
      card.classList.remove('dragging');
    }
  });

  // Desktop Drag events
  card.addEventListener('dragstart', (e) => {
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', lead.id);
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });

  return card;
}

function renderFunnel() {
  if (isMobile()) {
    renderFunnelMobile();
  } else {
    renderFunnelDesktop();
  }
}




// ── DESKTOP: Kanban Board ──
function renderFunnelDesktop() {
  if (!els.funnelBoard) return;
  els.funnelBoard.innerHTML = '';
  els.funnelBoard.className = 'funnel'; // Original Kanban class

  columns.forEach(col => {
    const colEl = document.createElement('div');
    colEl.className = 'funnel-column';
    colEl.dataset.columnId = col.id; // Added for drop logic

    // Drag/Drop Listeners for Desktop
    colEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      colEl.classList.add('drag-over');
    });
    colEl.addEventListener('dragleave', () => {
      colEl.classList.remove('drag-over');
    });
    colEl.addEventListener('drop', (e) => {
      e.preventDefault();
      colEl.classList.remove('drag-over');
      const leadId = e.dataTransfer.getData('text/plain');
      const lead = leads.find(l => l.id === leadId);
      if (lead && lead.column !== col.id) {
        moveLead(leadId, col.id);
      }
    });

    let titleHtml = `<div class="column-title">${col.title}</div>`;
    if (col.editable) {
      titleHtml = `<input type="text" class="column-title-input" value="${col.title}" onblur="updateColumnTitle('${col.id}', this.value)" onkeypress="if(event.key==='Enter') this.blur()">`;
    }

    let headerActionsHtml = '';
    if (col.editable) {
      headerActionsHtml = `<span class="column-delete-btn" onclick="event.stopPropagation(); removeColumn('${col.id}')" title="Remove Column">×</span>`;
    }

    colEl.innerHTML = `
      <div class="column-header">
        ${titleHtml}
        <div class="header-right-meta">
            <div class="column-count">${leads.filter(l => l.column === col.id).length}</div>
            ${headerActionsHtml}
        </div>
      </div>
      <div class="funnel-cards"></div>
    `;
    const cardsContainer = colEl.querySelector('.funnel-cards');
    leads.filter(l => l.column === col.id).forEach(lead => {
      cardsContainer.appendChild(renderLeadCard(lead));
    });
    els.funnelBoard.appendChild(colEl);
  });

  // Add Column Button
  const addColBtn = document.createElement('div');
  addColBtn.className = 'add-column-column';
  addColBtn.innerHTML = `
    <div class="add-column-spacer"></div>
    <button class="add-column-circle-btn" onclick="addNewColumn()" title="Add New Column">+</button>
    <div class="add-column-spacer"></div>
  `;
  els.funnelBoard.appendChild(addColBtn);
}

// ── MOBILE: list grouped by stage (Light Card Style) ──
function renderFunnelMobile() {
  if (!els.funnelBoard) return;
  els.funnelBoard.innerHTML = '';
  els.funnelBoard.className = 'mobile-pipeline-light';

  columns.forEach(col => {
    const colLeads = leads.filter(l => l.column === col.id);
    const section = document.createElement('div');
    section.className = 'mob-section-light';
    section.dataset.columnId = col.id; // Added for drag & drop

    let titleHtml = `<span class="mob-stage-name-light">${col.title}</span>`;
    let deleteHtml = '';
    if (col.editable) {
      titleHtml = `<input type="text" class="mob-stage-name-input" value="${col.title}" onblur="updateColumnTitle('${col.id}', this.value)" onkeypress="if(event.key==='Enter') this.blur()">`;
      deleteHtml = `<span class="mob-stage-delete-light" onclick="removeColumn('${col.id}')">×</span>`;
    }

    section.innerHTML = `
      <div class="mob-section-header-light">
        <div class="mob-header-title-wrap">${titleHtml}</div>
        <div class="mob-header-actions-wrap">
            <span class="mob-stage-add-light">+</span>
            ${deleteHtml}
        </div>
      </div>
      <div class="mob-section-body-light" data-column-id="${col.id}"></div>
    `;
    const body = section.querySelector('.mob-section-body-light');
    if (colLeads.length === 0) {
      body.innerHTML = `<div class="mob-empty-dark" style="color: #94a3b8;">No leads in this stage</div>`;
    } else {
      colLeads.forEach(lead => body.appendChild(renderMobileLeadCard(lead)));
    }
    els.funnelBoard.appendChild(section);
  });

  // Add Column Button Mobile
  const addColMob = document.createElement('div');
  addColMob.style.padding = '20px';
  addColMob.innerHTML = `
    <button class="mob-add-column-btn" onclick="addNewColumn()">
      + Add New Column
    </button>
  `;
  els.funnelBoard.appendChild(addColMob);
}

// ── COLUMN MANAGEMENT ──
function addNewColumn() {
  const newId = 'custom-' + Date.now();
  columns.push({
    id: newId,
    title: 'New Column',
    editable: true
  });
  renderRecruitingBoard(); // Re-render the board
}

function updateColumnTitle(colId, newTitle) {
  const col = columns.find(c => c.id === colId);
  if (col) {
    col.title = newTitle;
  }
}

function removeColumn(colId) {
  if (confirm('Are you sure you want to remove this column? All leads in it will stay but the column will disappear.')) {
    columns = columns.filter(c => c.id !== colId);
    renderRecruitingBoard();
  }
}


// Swipe Configuration for Recruitment Stages
const swipeActionMap = {
  'new-leads': {
    left: { target: 'in-progress', text: 'In Progress', color: 'swipe-green' },
    right: { target: 'follow-up', text: 'Follow Up', color: 'swipe-purple' }
  },
  'follow-up': {
    left: { target: 'in-progress', text: 'In Progress', color: 'swipe-green' },
    right: { target: 'pending-removal', text: 'Pending Removal', color: 'swipe-red' }
  },
  'in-progress': {
    left: { target: 'active-drivers', text: 'Active Drivers', color: 'swipe-blue' },
    right: { target: 'pending-removal', text: 'Pending Removal', color: 'swipe-red' }
  }
};

// Mobile-optimised lead card (Light Style) with Swipe actions
function renderMobileLeadCard(lead) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mob-lead-card-wrapper';
  wrapper.dataset.leadId = lead.id;

  const card = document.createElement('div');
  card.className = 'mob-lead-card';

  const displayName = lead.firstName + (lead.lastName ? ' ' + lead.lastName : '');
  const days = lead.daysInStage || Math.floor(Math.random() * 10) + 1;

  let tagsHtml = (lead.tags || []).map(tag =>
    `<span class="mob-card-tag ${getTagClass(tag)}">${tag}</span>`
  ).join('');

  let activityIconsHtml = '';
  const now = new Date().getTime();
  const isEditedRecently = lead.lastEdited && ((now - lead.lastEdited) / (1000 * 60)) <= 10;
  const isViewedRecently = lead.lastViewed && ((now - lead.lastViewed) / (1000 * 60)) <= 10;

  if (isEditedRecently) {
      activityIconsHtml += `<img src="assets/edit.png" title="Recently Edited" style="width: 14px; height: 14px; opacity: 0.8; cursor: help;">`;
  } else if (isViewedRecently) {
      activityIconsHtml += `<img src="assets/eye.png" title="Recently Viewed" style="width: 14px; height: 14px; filter: grayscale(1); opacity: 0.6; cursor: help;">`;
  }

  const dotsHtml = (lead.statusDots || [false, false, false, false]).map(complete =>
    `<div class="mob-card-dot ${complete ? 'complete' : ''}"></div>`
  ).join('');

  // Setup background action layers
  const actions = swipeActionMap[lead.column];
  let bgHtml = '';
  if (actions) {
    if (actions.left) {
      bgHtml += `<div class="mob-swipe-action action-right-reveal ${actions.left.color}" data-side="left">${actions.left.text}</div>`;
    }
    if (actions.right) {
      bgHtml += `<div class="mob-swipe-action action-left-reveal ${actions.right.color}" data-side="right">${actions.right.text}</div>`;
    }
  }

  wrapper.innerHTML = `
    ${bgHtml}
    <div class="mob-lead-card-inner">
      <div class="mob-card-header">
        <div class="mob-card-name">${displayName}</div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${activityIconsHtml}
          <div class="mob-card-chat-trigger" onclick="event.stopPropagation(); openLeadChat('${lead.id}', '${lead.firstName}')">💬</div>
          <a href="tel:${lead.phone}" class="mob-card-call-trigger" onclick="event.stopPropagation();">📞</a>
          <div class="mob-card-days">${days}d</div>
        </div>
      </div>
      <div class="mob-card-tags">
        ${tagsHtml}
      </div>
      <div class="mob-card-dots">
        ${dotsHtml}
      </div>
    </div>
  `;

  const inner = wrapper.querySelector('.mob-lead-card-inner');
  const leftBg = wrapper.querySelector('.mob-swipe-action[data-side="left"]');
  const rightBg = wrapper.querySelector('.mob-swipe-action[data-side="right"]');

  // Touch Drag & Swipe State
  let touchTimer;
  let ghostCard = null;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isSwiping = false;
  let isDragging = false;

  inner.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;

    // Start Long Press Timer for Dragging
    touchTimer = setTimeout(() => {
      isDragging = true;
      isSwiping = false;
      inner.classList.add('dragging');

      // Create ghost element
      ghostCard = inner.cloneNode(true);
      ghostCard.classList.remove('swiping');
      ghostCard.style.position = 'fixed';
      ghostCard.style.top = (startY - 50) + 'px';
      ghostCard.style.left = (startX - inner.offsetWidth / 2) + 'px';
      ghostCard.style.width = inner.offsetWidth + 'px';
      ghostCard.style.opacity = '0.9';
      ghostCard.style.zIndex = '10000';
      ghostCard.style.pointerEvents = 'none';
      ghostCard.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
      ghostCard.style.transform = 'scale(1.05)';
      document.body.appendChild(ghostCard);

      if (navigator.vibrate) navigator.vibrate(50);
    }, 400);

    isSwiping = true;
    inner.classList.add('swiping');
  }, { passive: true });

  inner.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    // If moved significantly before timer, cancel drag
    if (!isDragging && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      clearTimeout(touchTimer);
    }

    if (isDragging && ghostCard) {
      e.preventDefault();
      ghostCard.style.top = (touch.clientY - 50) + 'px';
      ghostCard.style.left = (touch.clientX - inner.offsetWidth / 2) + 'px';

      // Highlight drop target (sections)
      const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropSection = targetElement ? targetElement.closest('.mob-section-light') : null;
      document.querySelectorAll('.mob-section-light').forEach(s => s.style.background = '');
      if (dropSection) dropSection.style.background = 'rgba(59, 130, 246, 0.05)';
      return;
    }

    if (!isSwiping || isDragging) return;
    currentX = dx;

    // Limits
    if (currentX > 0 && !actions.right) currentX = 0;
    if (currentX < 0 && !actions.left) currentX = 0;

    inner.style.transform = `translateX(${currentX}px)`;

    // Reveal Logic
    if (currentX < -10 && leftBg) {
      leftBg.style.opacity = Math.min(Math.abs(currentX) / 80, 1);
      if (rightBg) rightBg.style.opacity = 0;
    } else if (currentX > 10 && rightBg) {
      rightBg.style.opacity = Math.min(currentX / 80, 1);
      if (leftBg) leftBg.style.opacity = 0;
    } else {
      if (leftBg) leftBg.style.opacity = 0;
      if (rightBg) rightBg.style.opacity = 0;
    }
  }, { passive: false });

  inner.addEventListener('touchend', (e) => {
    clearTimeout(touchTimer);

    if (isDragging) {
      isDragging = false;
      inner.classList.remove('dragging');
      if (ghostCard) {
        const touch = e.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropSection = targetElement ? targetElement.closest('.mob-section-light') : null;

        if (dropSection) {
          const colId = dropSection.dataset.columnId;
          if (lead.column !== colId) {
            moveLead(lead.id, colId);
          }
        }
        ghostCard.remove();
        ghostCard = null;
      }
      document.querySelectorAll('.mob-section-light').forEach(s => s.style.background = '');
      return;
    }

    if (!isSwiping) return;
    isSwiping = false;
    inner.classList.remove('swiping');

    const threshold = wrapper.offsetWidth * 0.35;

    if (currentX < -threshold && actions.left) {
      // Swipe Left -> Success
      inner.style.transform = `translateX(-120%)`;
      inner.style.opacity = '0';
      setTimeout(() => moveLead(lead.id, actions.left.target), 300);
    } else if (currentX > threshold && actions.right) {
      // Swipe Right -> Success
      inner.style.transform = `translateX(120%)`;
      inner.style.opacity = '0';
      setTimeout(() => moveLead(lead.id, actions.right.target), 300);
    } else {
      // Reset
      inner.style.transform = '';
      if (leftBg) leftBg.style.opacity = 0;
      if (rightBg) rightBg.style.opacity = 0;
    }
    currentX = 0;
  });

  inner.addEventListener('click', () => openRecruitingModal(lead));

  return wrapper;
}


// Quick-move lead between stages on mobile
function openMoveMenu(e, leadId) {
  e.preventDefault();
  const existing = document.getElementById('mob-move-menu');
  if (existing) existing.remove();

  const lead = leads.find(l => l.id === leadId);
  if (!lead) return;

  const menu = document.createElement('div');
  menu.id = 'mob-move-menu';
  menu.className = 'mob-move-menu';
  menu.innerHTML = `
    <div class="mob-move-title">Move to stage</div>
    ${columns.map(col => `
      <div class="mob-move-option ${col.id === lead.column ? 'active' : ''}"
           onclick="moveLead('${leadId}','${col.id}'); document.getElementById('mob-move-menu').remove()">
        ${col.title}
      </div>
    `).join('')}
    <div class="mob-move-cancel" onclick="document.getElementById('mob-move-menu').remove()">Cancel</div>
  `;

  document.body.appendChild(menu);

  // Auto-remove on outside tap
  setTimeout(() => {
    document.addEventListener('click', function handler(evt) {
      if (!menu.contains(evt.target)) { menu.remove(); document.removeEventListener('click', handler); }
    });
  }, 50);
}

function moveLead(leadId, targetColId) {
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    lead.column = targetColId;
    renderRecruitingBoard();
  }
}




// -------------------------
// Side Panel
// -------------------------
function openLeadPanel(lead) {
  activeLead = lead;
  isExpanded = false;

  const fullName = lead.firstName + (lead.lastName ? ' ' + lead.lastName : '');

  els.panelContent.innerHTML = `
        <div class="field-group">
          <div class="field-label">First Name</div>
          <div class="field-value">${lead.firstName}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Last Name</div>
          <div class="field-value">${lead.lastName || 'N/A'}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Email</div>
          <div class="field-value">${lead.email}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Phone Number</div>
          <div class="field-value">${lead.phone}</div>
        </div>

        <button class="expand-btn" id="expandBtn">▼ Show More Details</button>

        <div class="expanded-section" id="expandedSection">
          <div class="section-title">Driver Information</div>
          <div class="field-group">
            <div class="field-label">Driver Category</div>
            <select class="field-value">
              <option ${lead.category === 'Independent Contractor' ? 'selected' : ''}>Independent Contractor</option>
              <option ${lead.category === 'Company Driver' ? 'selected' : ''}>Company Driver</option>
              <option ${lead.category === 'ECT' ? 'selected' : ''}>ECT</option>
            </select>
          </div>
          <div class="field-row">
            <div class="field-group">
              <div class="field-label">Home Town</div>
              <input type="text" class="field-value" value="${lead.homeTown || ''}">
            </div>
            <div class="field-group">
              <div class="field-label">Years of Experience</div>
              <select class="field-value">
                ${[1, 2, 3, 4, 5, '6+'].map(y => `<option ${lead.yearsExperience == y || (y === '6+' && lead.yearsExperience >= 6) ? 'selected' : ''}>${y}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="field-row">
            <div class="field-group">
              <div class="field-label">Target Mileage/Week</div>
              <input type="number" class="field-value" value="${lead.targetMileage || 0}">
            </div>
            <div class="field-group">
              <div class="field-label">Home Frequency</div>
              <select class="field-value">
                <option ${lead.homeFrequency === 'Every day' ? 'selected' : ''}>Every day</option>
                <option ${lead.homeFrequency === 'Once per week' ? 'selected' : ''}>Once per week</option>
                <option ${lead.homeFrequency === 'Every other week' ? 'selected' : ''}>Every other week</option>
                <option ${lead.homeFrequency === 'Once per month' ? 'selected' : ''}>Once per month</option>
                <option ${lead.homeFrequency === 'Month+' ? 'selected' : ''}>Month+</option>
              </select>
            </div>
          </div>
          <div class="field-group">
            <div class="field-label">Extra Certifications</div>
            <input type="text" class="field-value" value="${lead.certifications || ''}">
          </div>
          <div class="field-group">
            <div class="field-label">Driver Gross Quote</div>
            <input type="text" class="field-value" value="${lead.driverQuote || ''}">
          </div>

          ${lead.category === 'Independent Contractor' ? `
          <div class="section-title">Truck Information</div>
          <div class="field-row">
            <div class="field-group">
              <div class="field-label">Make</div>
              <input type="text" class="field-value" value="${lead.truckMake || ''}">
            </div>
            <div class="field-group">
              <div class="field-label">Model</div>
              <input type="text" class="field-value" value="${lead.truckModel || ''}">
            </div>
          </div>
          <div class="field-row">
            <div class="field-group">
              <div class="field-label">Year</div>
              <input type="number" class="field-value" value="${lead.truckYear || ''}">
            </div>
            <div class="field-group">
              <div class="field-label">Mileage</div>
              <input type="number" class="field-value" value="${lead.truckMileage || ''}">
            </div>
          </div>
          <div class="field-row">
            <div class="field-group">
              <div class="field-label">DOT Inspection</div>
              <input type="date" class="field-value" value="${lead.dotInspection || ''}">
            </div>
            <div class="field-group">
              <div class="field-label">Registration</div>
              <input type="text" class="field-value" value="${lead.registration || ''}">
            </div>
          </div>
          ` : ''}
        </div>
      `;

  // Expand button handler
  const expandBtn = document.getElementById('expandBtn');
  const expandedSection = document.getElementById('expandedSection');

  expandBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    expandedSection.classList.toggle('open', isExpanded);
    expandBtn.textContent = isExpanded ? '▲ Show Less' : '▼ Show More Details';
  });

  els.leadPanel.classList.add('open');
  els.panelBackdrop.classList.add('open');
}

function closeLeadPanel() {
  els.leadPanel.classList.remove('open');
  els.panelBackdrop.classList.remove('open');
  activeLead = null;
  isExpanded = false;
}

els.closePanel.addEventListener('click', closeLeadPanel);
els.panelBackdrop.addEventListener('click', closeLeadPanel);

// Sidebar toggle — responsive aware
function isMobile() { return window.innerWidth <= 820; }

function toggleSidebar() {
  els.app.classList.toggle("sidebar-open");
}

// Initialize sidebar state
function initSidebar() {
  if (isMobile()) {
    els.app.classList.remove("sidebar-open");
  } else {
    els.app.classList.add("sidebar-open");
  }
}
initSidebar();
window.addEventListener("resize", () => {
  if (!isMobile()) {
    els.app.classList.add("sidebar-open");
  } else {
    els.app.classList.remove("sidebar-open");
  }
});

els.toggle.addEventListener("click", toggleSidebar);
els.backdrop.addEventListener("click", () => els.app.classList.remove("sidebar-open"));
window.addEventListener("keydown", (e) => { if (e.key === "Escape") els.app.classList.remove("sidebar-open"); });

// Mobile close button inside drawer
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
if (sidebarCloseBtn) {
  sidebarCloseBtn.addEventListener("click", () => els.app.classList.remove("sidebar-open"));
}

// Close sidebar on mobile when a nav item is tapped
document.querySelectorAll('.nav button[data-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isMobile()) {
      els.app.classList.remove("sidebar-open");
    }
  });
});


// -------------------------
// View Switching
// -------------------------
function switchView(viewName) {
  // Remove active class from all nav buttons
  document.querySelectorAll('.nav button').forEach(btn => btn.classList.remove('active'));

  // Toggle recruiting-active class for dark mode styling on mobile
  if (viewName === 'recruiting') {
    els.app.classList.add('recruiting-active');
  } else {
    els.app.classList.remove('recruiting-active');
  }

  // Hide all views
  if (els.performanceView) els.performanceView.classList.remove('active');
  if (els.recruitingView) els.recruitingView.classList.remove('active');
  if (els.leadDashboardView) els.leadDashboardView.classList.remove('active');
  if (els.safetyView) els.safetyView.classList.remove('active');
  if (els.fleetView) els.fleetView.classList.remove('active');
  if (els.accountingView) els.accountingView.classList.remove('active');
  if (els.earningsView) els.earningsView.classList.remove('active');
  if (els.inboxView) els.inboxView.classList.remove('active');

  // Show selected view and activate button
  const button = document.querySelector(`button[data-view="${viewName}"]`);
  if (button) button.classList.add('active');

  if (viewName === 'performance' && els.performanceView) {
    els.performanceView.classList.add('active');
  } else if (viewName === 'recruiting' && els.recruitingView) {
    els.recruitingView.classList.add('active');
    renderRecruitingBoard();
  } else if (viewName === 'lead-dashboard' && els.leadDashboardView) {
    els.leadDashboardView.classList.add('active');
    renderLeadDashboard();
  } else if (viewName === 'safety' && els.safetyView) {
    els.safetyView.classList.add('active');
    renderSafetyBoard();
  } else if (viewName === 'fleet' && els.fleetView) {
    els.fleetView.classList.add('active');
    renderFleetBoard();
  } else if (viewName === 'accounting' && els.accountingView) {
    els.accountingView.classList.add('active');
    renderAccountingBoard();
  } else if (viewName === 'earnings' && els.earningsView) {
    els.earningsView.classList.add('active');
    renderEarningsView();
  } else if (viewName === 'inbox' && els.inboxView) {
    els.inboxView.classList.add('active');
    if (typeof renderInboxList === 'function') renderInboxList();
  }
}


// Add event listeners to nav buttons
document.querySelectorAll('.nav button[data-view]').forEach(button => {
  button.addEventListener('click', () => {
    const view = button.getAttribute('data-view');
    switchView(view);
  });
});

// -------------------------
// Lead Dashboard
// -------------------------
// -------------------------
// Lead Dashboard Logic
// -------------------------
let currentSearchQuery = '';

function renderLeadDashboard() {
  if (!els.leadDashboardBody) return;

  if (isMobile()) {
    renderLeadDashboardMobile();
  } else {
    renderLeadDashboardDesktop();
  }
}

// ── MOBILE: simple name + View + Assign list ──
function renderLeadDashboardMobile() {
  const tableEl = els.leadDashboardBody.closest('table');
  const container = tableEl ? tableEl.parentElement : els.leadDashboardBody.parentElement;

  // Build or reuse the mobile list container
  let mobileList = document.getElementById('leadDashMobileList');
  if (!mobileList) {
    mobileList = document.createElement('div');
    mobileList.id = 'leadDashMobileList';
    mobileList.className = 'ld-mobile-list';
    container.insertBefore(mobileList, tableEl || container.firstChild);
  }

  if (tableEl) tableEl.style.display = 'none';
  mobileList.style.display = 'block';
  mobileList.innerHTML = '';

  const query = currentSearchQuery.toLowerCase();
  const filtered = dashboardLeads.filter(lead => {
    if (!query) return true;
    return (lead.name && lead.name.toLowerCase().includes(query));
  });

  if (filtered.length === 0) {
    mobileList.innerHTML = `<div class="ld-empty">No leads found</div>`;
    return;
  }

  filtered.forEach(lead => {
    const originalIndex = dashboardLeads.findIndex(l => l.id === lead.id);
    const row = document.createElement('div');
    row.className = 'ld-row';
    row.innerHTML = `
      <div class="ld-name">${lead.name}</div>
      <div class="ld-btns">
        <button class="ld-btn ld-chat" data-action="chat" data-index="${originalIndex}">Chat</button>
        <button class="ld-btn ld-view" data-action="open" data-index="${originalIndex}">View</button>
        <button class="ld-btn ld-assign" data-action="assign" data-index="${originalIndex}">Assign</button>
      </div>
    `;
    mobileList.appendChild(row);
  });

  // Attach events
  mobileList.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      const index = parseInt(btn.dataset.index);
      const lead = dashboardLeads[index];
      if (action === 'chat' && typeof openLeadChat === 'function') openLeadChat(lead.id, lead.firstName);
      if (action === 'open' && typeof openRecruitingModal === 'function') openRecruitingModal(lead);
      if (action === 'assign') openRecruiterMenu(e, index);
    });
  });

}

// ── DESKTOP: full table ──
function renderLeadDashboardDesktop() {
  const tableEl = els.leadDashboardBody.closest('table');
  const mobileList = document.getElementById('leadDashMobileList');
  if (tableEl) tableEl.style.display = '';
  if (mobileList) mobileList.style.display = 'none';

  const query = currentSearchQuery.toLowerCase();
  const filteredLeads = dashboardLeads.filter(lead => {
    if (!query) return true;
    return (
      (lead.name && lead.name.toLowerCase().includes(query)) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.phone && lead.phone.toLowerCase().includes(query)) ||
      (lead.city && lead.city.toLowerCase().includes(query)) ||
      (lead.state && lead.state.toLowerCase().includes(query))
    );
  });

  els.leadDashboardBody.innerHTML = '';

  if (filteredLeads.length === 0) {
    els.leadDashboardBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color: #64748b;">No leads found matching "${currentSearchQuery}"</td></tr>`;
    return;
  }

  filteredLeads.forEach((lead) => {
    const originalIndex = dashboardLeads.findIndex(l => l.id === lead.id);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 600;">${lead.timestamp}</td>
      <td style="font-weight: 600;">${lead.name}</td>
      <td>${lead.email}</td>
      <td>${lead.phone}</td>
      <td>${lead.zipCode}</td>
      <td>${lead.state}</td>
      <td>${lead.city}</td>
      <td>
        <div class="action-buttons-modern">
          <button class="mod-btn primary" data-action="open" data-index="${originalIndex}">Open</button>
          <button class="mod-btn secondary" data-action="assign" data-index="${originalIndex}">Assign</button>
          <button class="mod-btn secondary" data-action="stage" data-index="${originalIndex}">Stage</button>
          <button class="mod-btn warning" data-action="escalate" data-index="${originalIndex}">Escalate</button>
          <button class="mod-btn neutral" data-action="note" data-index="${originalIndex}">Note</button>
          <button class="mod-btn danger" data-action="delete" data-index="${originalIndex}">✕</button>
        </div>
      </td>
    `;
    els.leadDashboardBody.appendChild(tr);
  });

  els.leadDashboardBody.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
      const index = parseInt(btn.dataset.index);
      const lead = dashboardLeads[index];
      switch (action) {
        case 'open': if (typeof openRecruitingModal === 'function') openRecruitingModal(lead); break;
        case 'assign': openRecruiterMenu(e, index); break;
        case 'stage': openStageModal(lead); break;
        case 'escalate': openEscalationModal(lead); break;
        case 'note': openNoteModal(lead); break;
        case 'delete':
          if (confirm(`Delete lead: ${lead.name}?`)) { dashboardLeads.splice(index, 1); renderLeadDashboard(); }
          break;
      }
    });
  });
}



function getTagClass(tagName) {
  const tag = availableTags.find(t => t.name === tagName);
  return tag ? tag.color : 'blue';
}

function getDaysInStageClass(days) {
  if (days <= 2) return 'green';
  if (days <= 5) return 'orange';
  return 'red';
}

// Search Listener
const searchInput = document.getElementById('leadSearchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    renderLeadDashboard();
  });
}

function openRecruiterMenu(event, leadIndex) {
  // Close any existing menus
  const existing = document.getElementById('recruiterMenu');
  if (existing) existing.remove();

  const menu = document.createElement('div');
  menu.id = 'recruiterMenu';
  menu.className = 'recruiter-menu';

  // Header
  const header = document.createElement('div');
  header.className = 'recruiter-menu-header';
  header.textContent = 'Select Recruiter';
  menu.appendChild(header);

  // List
  recruiters.forEach(rec => {
    const item = document.createElement('div');
    item.className = 'recruiter-item';
    item.innerHTML = `
      <div class="recruiter-avatar">${initials(rec.name)}</div>
      <div class="recruiter-info">
        <div class="recruiter-name">${rec.name}</div>
        <div class="recruiter-role">${rec.role}</div>
      </div>
    `;

    item.onclick = (e) => {
      e.stopPropagation();
      const lead = dashboardLeads[leadIndex];
      lead.assignedTo = rec.id;
      lead.assignedRecruiterName = rec.name;
      if (lead.tags) {
        lead.tags = lead.tags.filter(t => t !== 'Lead Check');
      }
      menu.remove();
      renderDashboardLeads(dashboardLeads, currentDashboardTab);
    };

    menu.appendChild(item);
  });

  document.body.appendChild(menu);

  // Position
  const rect = event.target.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  let top = rect.bottom + window.scrollY + 5;
  let left = rect.left + window.scrollX;

  // Check bounds
  if (left + menuRect.width > window.innerWidth) {
    left = window.innerWidth - menuRect.width - 20;
  }

  menu.style.top = top + 'px';
  menu.style.left = left + 'px';

  // Close on click outside (delayed to avoid immediate close)
  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    }, { once: true });
  }, 0);
}

function openStageModal(lead) {
  // Remove existing
  const existing = document.getElementById('stageModalBackdrop');
  if (existing) existing.remove();

  // Calculate Progress (0, 25, 50, 75, 100 based on presence)
  let progress = 0;
  if (lead.recruitingStage !== 'New Lead') progress += 25;
  if (lead.safetyStage !== 'Not Started') progress += 25;
  if (lead.fleetStage !== 'Not Started') progress += 25;
  if (lead.accountingStage !== 'Pending') progress += 25;

  // Refine progress logic based on stage completion
  if (lead.safetyStage === 'Approved') progress = Math.max(progress, 65);
  if (lead.fleetStage === 'Assigned') progress = Math.max(progress, 85);
  if (lead.accountingStage === 'Payroll Ready') progress = 100;


  const backdrop = document.createElement('div');
  backdrop.id = 'stageModalBackdrop';
  backdrop.className = 'stage-modal-backdrop';

  backdrop.innerHTML = `
    <div class="stage-modal">
      <div class="stage-modal-header">
         <div class="stage-modal-title">Lead Status Overview</div>
         <div class="stage-modal-close" onclick="document.getElementById('stageModalBackdrop').remove()">✕</div>
      </div>
      
      <div class="stage-lead-info">
        <div class="stage-lead-avatar">${initials(lead.name)}</div>
        <div class="stage-lead-details">
           <div class="stage-lead-name">${lead.name}</div>
           <div class="stage-lead-id">ID: ${lead.id}</div>
        </div>
        <div class="stage-completion">
           <div class="stage-percent text-blue">${progress}%</div>
           <div class="stage-label">Completion</div>
        </div>
      </div>

      <div class="stage-cards-row">
        <!-- Recruiting -->
        <div class="stage-card ${lead.recruitingStage !== 'New Lead' ? 'active' : ''}">
           <div class="stage-card-icon">👥</div>
           <div class="stage-card-title">Recruiting</div>
           <div class="stage-card-status">${lead.recruitingStage || 'New Lead'}</div>
           <div class="stage-step-dots">
              <span class="${['New Lead', 'Follow Up', 'In Progress'].includes(lead.recruitingStage) ? 'fill' : ''}"></span>
              <span class="${['In Progress'].includes(lead.recruitingStage) ? 'fill' : ''}"></span>
              <span class="${[].includes(lead.recruitingStage) ? 'fill' : ''}"></span>
           </div>
        </div>

        <!-- Safety -->
        <div class="stage-card ${lead.safetyStage !== 'Not Started' ? 'active' : ''}">
           <div class="stage-card-icon">🛡️</div>
           <div class="stage-card-title">Safety</div>
           <div class="stage-card-status">${lead.safetyStage || 'Not Started'}</div>
            <div class="stage-step-dots">
              <span class="${['Pending Review', 'In Review', 'Approved'].includes(lead.safetyStage) ? 'fill' : ''}"></span>
              <span class="${['In Review', 'Approved'].includes(lead.safetyStage) ? 'fill' : ''}"></span>
              <span class="${['Approved'].includes(lead.safetyStage) ? 'fill' : ''}"></span>
           </div>
        </div>

        <!-- Fleet -->
        <div class="stage-card ${lead.fleetStage !== 'Not Started' ? 'active' : ''}">
           <div class="stage-card-icon">🚛</div>
           <div class="stage-card-title">Fleet</div>
           <div class="stage-card-status">${lead.fleetStage || 'Not Started'}</div>
           <div class="stage-step-dots">
              <span class="${['Waiting', 'Trailer Setup', 'Assigned'].includes(lead.fleetStage) ? 'fill' : ''}"></span>
              <span class="${['Trailer Setup', 'Assigned'].includes(lead.fleetStage) ? 'fill' : ''}"></span>
              <span class="${['Assigned'].includes(lead.fleetStage) ? 'fill' : ''}"></span>
           </div>
        </div>

        <!-- Accounting -->
        <div class="stage-card ${lead.accountingStage !== 'Pending' ? 'active' : ''}">
           <div class="stage-card-icon">💰</div>
           <div class="stage-card-title">Accounting</div>
           <div class="stage-card-status">${lead.accountingStage || 'Pending'}</div>
           <div class="stage-step-dots">
              <span class="${['Pending', 'Docs Submited', 'Payroll Ready'].includes(lead.accountingStage) ? 'fill' : ''}"></span>
              <span class="${['Docs Submited', 'Payroll Ready'].includes(lead.accountingStage) ? 'fill' : ''}"></span>
              <span class="${['Payroll Ready'].includes(lead.accountingStage) ? 'fill' : ''}"></span>
           </div>
        </div>
      </div>
      
      <div class="stage-modal-footer">
        <div style="font-size:12px; color:#64748b;">
           Detailed view implies completion status across all departments.
        </div>
        <button class="mod-btn primary" onclick="document.getElementById('stageModalBackdrop').remove()">Done</button>
      </div>

    </div>
  `;

  document.body.appendChild(backdrop);

  // Close on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
}

// -------------------------
// Employee Data for Escalation
// -------------------------
const safetyEmployees = [
  { id: 's1', name: 'Sarah Connor', role: 'Safety Manager' },
  { id: 's2', name: 'Kyle Reese', role: 'Compliance Officer' },
  { id: 's3', name: 'T-800', role: 'Safety Specialist' }
];

const fleetEmployees = [
  { id: 'f1', name: 'Furiosa', role: 'Fleet Manager' },
  { id: 'f2', name: 'Max Rockatansky', role: 'Maintenance Lead' },
  { id: 'f3', name: 'Nux', role: 'Mechanic' }
];

const accountingEmployees = [
  { id: 'a1', name: 'Skyler White', role: 'Accountant' },
  { id: 'a2', name: 'Saul Goodman', role: 'Legal & Finance' }
];


function openEscalationModal(lead) {
  // Remove existing
  const existing = document.getElementById('escalateModalBackdrop');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'escalateModalBackdrop';
  backdrop.className = 'stage-modal-backdrop'; // Reuse backdrop style

  backdrop.innerHTML = `
    <div class="stage-modal" style="width: 500px">
      <div class="stage-modal-header">
         <div class="stage-modal-title">Escalate Issue</div>
         <div class="stage-modal-close" onclick="document.getElementById('escalateModalBackdrop').remove()">✕</div>
      </div>
      
      <div class="stage-lead-info">
        <div class="stage-lead-avatar">${initials(lead.name)}</div>
        <div class="stage-lead-details">
           <div class="stage-lead-name">${lead.name}</div>
           <div class="stage-lead-id">Urgent Assignment</div>
        </div>
      </div>

      <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Department Select -->
        <div class="field">
          <div class="field-label">Department</div>
          <select class="field-select" id="escDept" onchange="updateEscalationOptions()">
            <option value="recruiting">Recruiting</option>
            <option value="safety">Safety</option>
            <option value="fleet">Fleet</option>
            <option value="accounting">Accounting</option>
          </select>
        </div>

        <!-- Column Select -->
        <div class="field">
          <div class="field-label">Target Column / Status</div>
          <select class="field-select" id="escCol">
            <!-- Populated via JS -->
          </select>
        </div>

        <!-- Person Select -->
        <div class="field">
          <div class="field-label">Assign To Person</div>
          <select class="field-select" id="escPerson">
             <!-- Populated via JS -->
          </select>
        </div>
        
        <!-- Note -->
         <div class="field">
          <div class="field-label">Urgency Note</div>
          <textarea class="field-input" rows="3" placeholder="Describe why this needs urgent attention..."></textarea>
        </div>

      </div>
      
      <div class="stage-modal-footer">
        <button class="mod-btn neutral" onclick="document.getElementById('escalateModalBackdrop').remove()">Cancel</button>
        <button class="mod-btn warning" onclick="alert('Escalation sent!'); document.getElementById('escalateModalBackdrop').remove()">🚀 Send Escalation</button>
      </div>

    </div>
  `;

  document.body.appendChild(backdrop);

  // Close on backdrop
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });

  // Init options
  window.updateEscalationOptions = () => {
    const dept = document.getElementById('escDept').value;
    const colSelect = document.getElementById('escCol');
    const personSelect = document.getElementById('escPerson');

    let cols = [];
    let people = [];

    if (dept === 'recruiting') {
      cols = columns; // Global columns
      people = recruiters; // Global recruiters
    } else if (dept === 'safety') {
      cols = safetyColumns;
      people = safetyEmployees;
    } else if (dept === 'fleet') {
      // Mock fleet cols
      cols = [{ id: 'assigned', title: 'Assigned' }, { id: 'maintenance', title: 'Maintenance' }, { id: 'inspection', title: 'Inspection' }];
      people = fleetEmployees;
    } else if (dept === 'accounting') {
      // Mock accounting cols
      cols = [{ id: 'payroll', title: 'Payroll Ready' }, { id: 'pending', title: 'Pending Docs' }];
      people = accountingEmployees;
    }

    // Render Cols
    colSelect.innerHTML = cols.map(c => `<option value="${c.id}">${c.title}</option>`).join('');

    // Render People
    personSelect.innerHTML = people.map(p => `<option value="${p.id}">${p.name} (${p.role})</option>`).join('');
  };

  // Run once to set initial state
  window.updateEscalationOptions();
}


// -------------------------
// Note Modal
// -------------------------
function openNoteModal(lead) {
  // Remove existing
  const existing = document.getElementById('noteModalBackdrop');
  if (existing) existing.remove();

  // Mock existing notes
  const mockNotes = [
    { text: "Called yesterday, left voicemail.", date: "2 days ago", author: "System" },
    { text: "Interested in OTR positions.", date: "1 week ago", author: "John Doe" }
  ];

  const backdrop = document.createElement('div');
  backdrop.id = 'noteModalBackdrop';
  backdrop.className = 'stage-modal-backdrop'; // Reuse backdrop style

  backdrop.innerHTML = `
    <div class="stage-modal" style="width: 500px">
      <div class="stage-modal-header">
         <div class="stage-modal-title">Lead Notes</div>
         <div class="stage-modal-close" onclick="document.getElementById('noteModalBackdrop').remove()">✕</div>
      </div>
      
      <div class="stage-lead-info">
        <div class="stage-lead-avatar">${initials(lead.name)}</div>
        <div class="stage-lead-details">
           <div class="stage-lead-name">${lead.name}</div>
           <div class="stage-lead-id">View & Add Notes</div>
        </div>
      </div>

      <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Note Input -->
         <div class="field">
          <div class="field-label">New Note</div>
          <textarea class="field-input" rows="3" placeholder="Type a new note here..."></textarea>
        </div>
        
        <div style="display:flex; justify-content:flex-end;">
            <button class="mod-btn primary" onclick="alert('Note saved!'); document.getElementById('noteModalBackdrop').remove()">Save Note</button>
        </div>

        <div style="border-top:1px solid #f1f5f9; margin: 8px 0;"></div>

        <!-- History -->
        <div class="field-label">Recent History</div>
        <div style="display:flex; flex-direction:column; gap:12px; max-height: 200px; overflow-y:auto;">
           ${mockNotes.map(note => `
             <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
                <div style="font-size:13px; color:#334155; margin-bottom:4px;">${note.text}</div>
                <div style="font-size:11px; color:#94a3b8; display:flex; justify-content:space-between;">
                   <span>${note.author}</span>
                   <span>${note.date}</span>
                </div>
             </div>
           `).join('')}
        </div>

      </div>
      
      <div class="stage-modal-footer">
        <button class="mod-btn neutral" onclick="document.getElementById('noteModalBackdrop').remove()">Close</button>
      </div>

    </div>
  `;

  document.body.appendChild(backdrop);

  // Close on backdrop
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
}

// -------------------------
// Duplicate Lead Modal
// -------------------------
function openDuplicateModal(leadId) {
  const lead = dashboardLeads.find(l => l.id === leadId);
  if (!lead || !lead.isDuplicate || !lead.duplicateInfo) return;

  // Remove existing
  const existing = document.getElementById('duplicateModalBackdrop');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'duplicateModalBackdrop';
  backdrop.className = 'stage-modal-backdrop';

  backdrop.innerHTML = `
    <div class="stage-modal" style="width: 450px">
      <div class="stage-modal-header">
         <div class="stage-modal-title">⚠️ Duplicate Lead Detected</div>
         <div class="stage-modal-close" onclick="document.getElementById('duplicateModalBackdrop').remove()">✕</div>
      </div>
      
      <div class="stage-lead-info">
        <div class="stage-lead-avatar">${initials(lead.name)}</div>
        <div class="stage-lead-details">
           <div class="stage-lead-name">${lead.name}</div>
           <div class="stage-lead-id">${lead.email}</div>
        </div>
      </div>

      <div style="padding: 20px; border-top: 1px solid var(--border);">
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div style="width: 40px; height: 40px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">
              ${lead.duplicateInfo.timesApplied}
            </div>
            <div>
              <div style="font-size: 15px; font-weight: 600; color: #991b1b;">Times Applied</div>
              <div style="font-size: 13px; color: #7f1d1d;">This lead has submitted ${lead.duplicateInfo.timesApplied} applications</div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="field-label">Merge Information</div>
          <div style="background: var(--surface); padding: 12px; border-radius: 6px; border: 1px solid var(--border);">
            <div style="font-size: 13px; color: var(--text); margin-bottom: 6px;">
              <strong>Merged with:</strong> ${lead.duplicateInfo.previousLead}
            </div>
            <div style="font-size: 13px; color: var(--muted);">
              <strong>Merge time:</strong> ${lead.duplicateInfo.mergedAt}
            </div>
          </div>
        </div>

        <div style="margin-top: 16px; padding: 12px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px;">
          <div style="font-size: 12px; color: #92400e;">
            <strong>📋 Note:</strong> This lead was automatically merged with a previous application. Review contact history before proceeding.
          </div>
        </div>
      </div>
      
      <div class="stage-modal-footer">
        <button class="mod-btn primary" onclick="document.getElementById('duplicateModalBackdrop').remove()">Got it</button>
      </div>

    </div>
  `;

  document.body.appendChild(backdrop);

  // Close on backdrop
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
}

// -------------------------
// Safety Board Column Management
// -------------------------
function showAddSafetyColumnModal() {
  const backdrop = document.createElement('div');
  backdrop.style.position = 'fixed';
  backdrop.style.top = '0'; backdrop.style.left = '0';
  backdrop.style.width = '100vw'; backdrop.style.height = '100vh';
  backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
  backdrop.style.display = 'flex'; backdrop.style.alignItems = 'center'; backdrop.style.justifyContent = 'center';
  backdrop.style.zIndex = '10000';

  const presets = ['Medical Expiring', 'Reg Expiring', 'Reg Missing', 'Safety Pending', 'Review Needed', 'Ready This Week', 'Ready Next Week'];

  backdrop.innerHTML = `
    <div style="background:white; border-radius:12px; padding:24px; width:400px; max-width:90vw; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
      <h3 style="margin:0 0 16px 0; font-size:18px; font-weight:800; color:var(--text);">Add New Safety Column</h3>
      
      <div style="margin-bottom:16px;">
        <label style="font-size:12px; font-weight:700; color:var(--muted); display:block; margin-bottom:8px;">Choose Column Type</label>
        <select id="newSafeColType" onchange="document.getElementById('newSafeColName').style.display = this.value === 'Custom' ? 'block' : 'none';" style="width:100%; padding:10px; border:1px solid var(--border-dark); border-radius:8px; font-weight:600; font-size:14px; outline:none;">
          <option value="Custom">Custom Column</option>
          <optgroup label="Preset Tags (Auto-pull)">
            ${presets.map(p => `<option value="${p}">${p}</option>`).join('')}
          </optgroup>
        </select>
      </div>

      <div style="margin-bottom:24px;">
        <input type="text" id="newSafeColName" placeholder="Enter custom column name..." style="width:100%; padding:10px; border:1px solid var(--border-dark); border-radius:8px; font-weight:600; font-size:14px; outline:none; display:block;">
      </div>

      <div style="display:flex; justify-content:flex-end; gap:12px;">
        <button onclick="this.closest('.backdrop-remove').remove()" style="background:var(--surface2); color:var(--text); border:none; padding:8px 16px; border-radius:6px; font-weight:700; cursor:pointer;">Cancel</button>
        <button id="confirmSafeColBtn" style="background:var(--blue); color:white; border:none; padding:8px 16px; border-radius:6px; font-weight:700; cursor:pointer;">Add Column</button>
      </div>
    </div>
  `;
  
  backdrop.classList.add('backdrop-remove');
  document.body.appendChild(backdrop);

  document.getElementById('confirmSafeColBtn').onclick = () => {
    const type = document.getElementById('newSafeColType').value;
    const customName = document.getElementById('newSafeColName').value;
    const colName = type === 'Custom' ? (customName || 'New Column') : type;
    
    const newId = 'custom-safety-' + Date.now();
    safetyColumns.push({
      id: newId,
      title: colName,
      editable: true
    });

    if (type !== 'Custom') {
      // Auto-pull drivers with this tag into the new column
      safetyDrivers.forEach(d => {
        if (d.tags && d.tags.includes(type)) {
          d.column = newId;
        }
      });
    }

    renderSafetyBoard();
    backdrop.remove();
  };
}

function updateSafetyColumnTitle(colId, newTitle) {
  const col = safetyColumns.find(c => c.id === colId);
  if (col) {
    col.title = newTitle;
  }
}

function removeSafetyColumn(colId) {
  if (confirm('Are you sure you want to remove this column? All drivers in it will stay but the column will disappear.')) {
    safetyColumns = safetyColumns.filter(c => c.id !== colId);
    renderSafetyBoard();
  }
}

function moveSafetyDriver(driverId, targetColId) {
  const driver = safetyDrivers.find(d => d.id === driverId);
  if (driver) {
    driver.column = targetColId;
    renderSafetyBoard();
  }
}

// -------------------------
// Safety Board
// -------------------------
function renderSafetyBoard() {
  if (!els.safetyBoard) return;

  els.safetyBoard.innerHTML = '';
  els.safetyBoard.className = 'funnel'; // Use kanban classes

  safetyColumns.forEach(col => {
    const colEl = document.createElement('div');
    colEl.className = 'funnel-column';
    colEl.dataset.columnId = col.id;

    // Drag/Drop
    colEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      colEl.classList.add('drag-over');
    });
    colEl.addEventListener('dragleave', () => {
      colEl.classList.remove('drag-over');
    });
    colEl.addEventListener('drop', (e) => {
      e.preventDefault();
      colEl.classList.remove('drag-over');
      const driverId = e.dataTransfer.getData('text/plain');
      // Ensure we are dropping a safety driver
      const driver = safetyDrivers.find(d => d.id === driverId);
      if (driver && driver.column !== col.id) {
        moveSafetyDriver(driverId, col.id);
      }
    });

    let titleHtml = `<div class="column-title">${col.title}</div>`;
    if (col.editable) {
      titleHtml = `<input type="text" class="column-title-input" value="${col.title}" onblur="updateSafetyColumnTitle('${col.id}', this.value)" onkeypress="if(event.key==='Enter') this.blur()">`;
    }

    let headerActionsHtml = '';
    if (col.editable) {
      headerActionsHtml = `<span class="column-delete-btn" onclick="event.stopPropagation(); removeSafetyColumn('${col.id}')" title="Remove Column">×</span>`;
    }

    colEl.innerHTML = `
      <div class="column-header">
        ${titleHtml}
        <div class="header-right-meta">
            <div class="column-count">${safetyDrivers.filter(d => d.column === col.id).length}</div>
            ${headerActionsHtml}
        </div>
      </div>
      <div class="funnel-cards"></div>
    `;

    const cardsContainer = colEl.querySelector('.funnel-cards');
    const driversInColumn = safetyDrivers.filter(d => d.column === col.id);

    driversInColumn.forEach(driver => {
      cardsContainer.appendChild(renderRecruitingCard(driver)); // We reuse recruiting cards
    });

    els.safetyBoard.appendChild(colEl);
  });

  // Add Column Button
  const addColBtn = document.createElement('div');
  addColBtn.className = 'add-column-column';
  addColBtn.innerHTML = `
    <div class="add-column-spacer"></div>
    <button class="add-column-circle-btn" onclick="showAddSafetyColumnModal()" title="Add New Column">+</button>
    <div class="add-column-spacer"></div>
  `;
  els.safetyBoard.appendChild(addColBtn);
}

// -------------------------
// Fleet Board
// -------------------------
function renderFleetBoard() {
  if (!els.fleetBoard) return;

  els.fleetBoard.innerHTML = '';

  fleetColumns.forEach(col => {
    const column = document.createElement('div');
    column.className = 'funnel-column';
    column.dataset.columnId = col.id;

    const title = document.createElement('div');
    title.className = 'column-title';
    title.textContent = col.title;

    const cards = document.createElement('div');
    cards.className = 'funnel-cards';

    const driversInColumn = fleetDrivers.filter(d => d.column === col.id);

    driversInColumn.forEach(driver => {
      cards.appendChild(renderRecruitingCard(driver));
    });

    column.appendChild(title);
    column.appendChild(cards);
    els.fleetBoard.appendChild(column);
  });
}

// -------------------------
// Accounting Board
// -------------------------
function renderAccountingBoard() {
  if (!els.accountingBoard) return;

  els.accountingBoard.innerHTML = '';

  accountingColumns.forEach(col => {
    const column = document.createElement('div');
    column.className = 'funnel-column';
    column.dataset.columnId = col.id;

    const title = document.createElement('div');
    title.className = 'column-title';
    title.textContent = col.title;

    const cards = document.createElement('div');
    cards.className = 'funnel-cards';

    const driversInColumn = accountingDrivers.filter(d => d.column === col.id);

    driversInColumn.forEach(driver => {
      cards.appendChild(renderRecruitingCard(driver));
    });

    column.appendChild(title);
    column.appendChild(cards);
    els.accountingBoard.appendChild(column);
  });
}

// -------------------------
// Earnings View
// -------------------------
function renderEarningsView() {
  if (!els.earningsContainer) return;

  const data = earningsData[currentEarningsTab];

  // Stats Chips
  const statsHTML = `
    <div class="earnings-stats">
      <div class="stat-chip">Closed Drivers: 14</div>
      <div class="stat-chip">Pending Payouts: 6</div>
      <div class="stat-chip">Collected: 8</div>
    </div>
  `;

  // Top Summary Card
  const summaryHTML = `
    <div class="earnings-summary-card">
      <div class="earnings-header">
        <div>
          <div class="earnings-title">Total Earned</div>
          <div class="earnings-amount">$${data.amount.toLocaleString()}</div>
          <div class="earnings-subtitle">Recruiter payouts from closed drivers</div>
        </div>
        <div class="earnings-tabs">
          <button class="earnings-tab ${currentEarningsTab === 'week' ? 'active' : ''}" onclick="switchEarningsTab('week')">Week</button>
          <button class="earnings-tab ${currentEarningsTab === 'month' ? 'active' : ''}" onclick="switchEarningsTab('month')">Month</button>
          <button class="earnings-tab ${currentEarningsTab === 'year' ? 'active' : ''}" onclick="switchEarningsTab('year')">Year</button>
        </div>
      </div>
      ${statsHTML}
    </div>
  `;

  // Payout List
  const rowsHTML = closedDrivers.map(d => {
    const progress = (d.day / d.totalDays) * 100;
    const isCollected = d.collected;
    const statusLabel = isCollected ? 'Collected' : d.status;

    return `
      <div class="payout-row ${isCollected ? 'collected' : ''}">
        <div class="payout-info">
          <div class="payout-name">${d.name}</div>
          <div class="payout-status">${statusLabel}</div>
        </div>
        <div class="payout-progress-wrap">
          <div class="payout-days">Day ${d.day} of ${d.totalDays}</div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="payout-amount">$${d.amount}</div>
        ${!isCollected ? `<button class="collect-btn" onclick="collectPayout('${d.name}')">Collect</button>` : '<div style="width:70px"></div>'}
      </div>
    `;
  }).join('');

  els.earningsContainer.innerHTML = `
    ${summaryHTML}
    <div class="payout-section-title">Payout Countdown (11-day hold)</div>
    <div class="payout-list">
      ${rowsHTML}
    </div>
  `;
}

function switchEarningsTab(period) {
  currentEarningsTab = period;
  renderEarningsView();
}

function collectPayout(driverName) {
  const driver = closedDrivers.find(d => d.name === driverName);
  if (driver) {
    driver.collected = true;
    renderEarningsView();
  }
}

// -------------------------
// Recruiting Board
// -------------------------

// Tag Management
function removeTagFromLead(leadId, tag, event) {
  if (event) event.stopPropagation();
  let lead = leads.find(l => l.id == leadId);
  let isSafety = false;
  let isDash = false;

  if (!lead) {
    lead = safetyDrivers.find(l => l.id == leadId);
    isSafety = true;
  }
  if (!lead && typeof dashboardLeads !== 'undefined') {
    lead = dashboardLeads.find(l => l.id == leadId);
    isDash = true;
  }

  if (lead && lead.tags) {
    lead.tags = lead.tags.filter(t => t !== tag);
    const isExpanded = document.querySelector('.modal-recruiting') && !document.querySelector('.modal-recruiting').classList.contains('mini');
    // Assuming openRecruitingModal is globally available
    if (typeof openRecruitingModal === 'function') {
      openRecruitingModal(lead, isExpanded);
    }

    if (isDash) {
      if (typeof renderDashboardLeads === 'function') renderDashboardLeads();
    } else if (isSafety) {
      renderSafetyBoard();
    } else {
      renderRecruitingBoard();
    }
  }
}

const RECRUITING_TAGS = ['Lead Check', 'NEW', 'Bad Number', 'VM Left', 'Hot Lead', 'Safety Pending', 'Follow Up Scheduled', 'Ready Next Week', 'Ready This Week', 'Ready This Month', 'Not specified'];

function toggleTagMenu(event, leadId) {
  if (event) event.stopPropagation();
  let menu = document.querySelector('.tag-menu-dropdown');
  if (menu) {
    menu.remove();
    return;
  }

  // Determine context
  let isSafety = false;
  if (typeof safetyDrivers !== 'undefined' && safetyDrivers.find(d => d.id === leadId)) {
    isSafety = true;
  }

  // Get options
  let options = [];
  if (isSafety && typeof availableSafetyTags !== 'undefined') {
    options = availableSafetyTags.map(t => t.name);
  } else {
    options = RECRUITING_TAGS;
  }

  menu = document.createElement('div');
  menu.className = 'tag-menu-dropdown';
  menu.style.position = 'absolute';
  menu.style.zIndex = '10000';
  menu.style.background = '#1e293b';
  menu.style.border = '1px solid rgba(255,255,255,0.1)';
  menu.style.borderRadius = '8px';
  menu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  menu.style.width = '200px';
  menu.style.padding = '8px';

  menu.innerHTML = `
        <div style="padding: 8px; font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">${isSafety ? 'SAFETY TAGS' : 'TAGS'}</div>
        <div style="height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 4px;"></div>
        <div class="tag-options" style="max-height: 200px; overflow-y: auto;">
          ${options.map(opt => `
            <div style="padding: 6px 8px; font-size: 13px; color: #e2e8f0; cursor: pointer; border-radius: 4px; transition: background 0.1s;" 
                 onmouseover="this.style.background='rgba(255,255,255,0.1)'" 
                 onmouseout="this.style.background='transparent'"
                 onclick="addTagToLead('${leadId}', '${opt}')">
              ${opt}
            </div>
          `).join('')}
        </div>
      `;

  document.body.appendChild(menu);

  const rect = event.target.getBoundingClientRect();
  menu.style.top = (rect.bottom + 8) + 'px';
  menu.style.left = rect.left + 'px';

  setTimeout(() => {
    document.addEventListener('click', function closeMenu(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 0);
}

function addTagToLead(leadId, tag) {
  let lead = leads.find(l => l.id == leadId);
  let isSafety = false;
  let isDash = false;

  if (!lead) {
    lead = safetyDrivers.find(l => l.id == leadId);
    isSafety = true;
  }
  if (!lead && typeof dashboardLeads !== 'undefined') {
    lead = dashboardLeads.find(l => l.id == leadId);
    isDash = true;
  }

  if (lead && (!lead.tags || !lead.tags.includes(tag))) {
    if (!lead.tags) lead.tags = [];
    lead.tags.push(tag);

    if (tag === 'Lead Check' && typeof dashboardLeads !== 'undefined') {
      if (!dashboardLeads.find(l => l.id == lead.id)) {
        dashboardLeads.push({
          id: lead.id,
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          name: lead.firstName + (lead.lastName ? ' ' + lead.lastName : ''),
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email || 'info@example.com',
          phone: lead.phone || '+1 555-000-0000',
          zipCode: lead.zipCode || '77001',
          state: lead.state || 'Texas',
          city: lead.homeTown ? lead.homeTown.split(',')[0] : 'Houston',
          tags: lead.tags,
          statusDots: lead.statusDots || [false, false, false, false],
          recruitingStage: lead.recruitingStage || 'New Lead',
          safetyStage: lead.safetyStage || 'Pending Review',
          fleetStage: lead.fleetStage || 'Not Started',
          accountingStage: lead.accountingStage || 'Pending'
        });
      }
    }

    if (isDash || tag === 'Lead Check') {
      if (typeof renderDashboardLeads === 'function') renderDashboardLeads();
    } else if (isSafety) {
      renderSafetyBoard();
    } else {
      renderRecruitingBoard();
    }

    // Refresh modal if open
    const isExpanded = document.querySelector('.modal-recruiting') && !document.querySelector('.modal-recruiting').classList.contains('mini');
    if (typeof openRecruitingModal === 'function') {
      openRecruitingModal(lead, isExpanded);
    }
  }
  const menu = document.querySelector('.tag-menu-dropdown');
  if (menu) menu.remove();
}

let draggedRecruitingLead = null;

function renderRecruitingCard(lead) {
  const card = document.createElement('div');
  card.className = 'lead-card';
  card.dataset.leadId = lead.id;
  // Enable Drag
  card.draggable = true;

  const fullName = lead.firstName + (lead.lastName ? ' ' + lead.lastName : '');
  const dots = lead.statusDots.map(d => `<div class="status-dot ${d ? 'complete' : ''}"></div>`).join('');

  const tags = lead.tags.map(t => {
    let color = 'blue';
    if (t.includes('NEW')) color = 'yellow';
    if (t.includes('Bad') || t.includes('VM')) color = 'red';
    if (t.includes('Safety') || t.includes('Follow')) color = 'green';
    if (t.includes('Hot')) color = 'blue';
    return `<span class="tag-pill ${color}">${t}</span>`;
  }).join('');

  let meta = '';
  if (lead.followUpDate) {
    const d = new Date(lead.followUpDate);
    const now = new Date();
    const overdue = d < now;
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
      d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    meta = `<div class="lead-meta ${overdue ? 'overdue' : ''}">📅 ${formatted}</div>`;
  }

  card.innerHTML = `
        <div class="lead-header">
          <div class="status-dots">${dots}</div>
          <div class="lead-name">${fullName}</div>
        </div>
        ${tags ? `<div class="lead-tags">${tags}</div>` : ''}
        ${meta}
      `;

  // Click to open modal
  card.addEventListener('click', () => openRecruitingModal(lead));

  // Drag Events
  card.addEventListener('dragstart', (e) => {
    draggedRecruitingLead = lead;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    draggedRecruitingLead = null;
  });

  return card;
}

// Close Recruiting Modal
const closeRecruiting = document.getElementById('closeBtnRecruiting');
const backdropRecruiting = document.getElementById('modalBackdropRecruiting');
if (closeRecruiting) closeRecruiting.addEventListener('click', () => backdropRecruiting.classList.remove('open'));
if (backdropRecruiting) backdropRecruiting.addEventListener('click', (e) => {
  if (e.target === backdropRecruiting) backdropRecruiting.classList.remove('open');
});

function renderRecruitingBoard() {
  if (isMobile()) {
    renderFunnelMobile();
  } else {
    renderFunnelDesktop();
  }
}


// Initial
renderTable();


// initial dash offsets + animate on load (top recruiter)
document.querySelectorAll(".prog").forEach(c => {
  c.style.strokeDasharray = CIRC;
  c.style.strokeDashoffset = CIRC;
});

// slight delay for "premium" feel
setTimeout(() => selectRecruiter(recruiters[0].id), 200);

// -------------------------
// Lead Dashboard Rendering
// -------------------------
let currentDashboardTab = 'active';

function renderDashboardLeads(leadsToRender = dashboardLeads, tabType = currentDashboardTab) {
  const tbody = document.getElementById('leadDashboardBody');
  if (!tbody) return;

  const tableEl = tbody.closest('table');
  const container = tableEl ? tableEl.parentElement : tbody.parentElement;
  let mobileList = document.getElementById('leadDashMobileList');

  if (isMobile()) {
    if (!mobileList) {
      mobileList = document.createElement('div');
      mobileList.id = 'leadDashMobileList';
      mobileList.className = 'ld-mobile-list';
      container.insertBefore(mobileList, tableEl || container.firstChild);
    }
    if (tableEl) tableEl.style.display = 'none';
    mobileList.style.display = 'block';
    mobileList.innerHTML = '';
  } else {
    if (tableEl) tableEl.style.display = '';
    if (mobileList) mobileList.style.display = 'none';
    tbody.innerHTML = '';
  }

  // Filter leads based on tab type
  const filteredForTab = (leadsToRender || []).filter(l => {
    if (tabType === 'active') return l.id === 'dash-1' || l.id === 'dash-2' || l.id === 'dash-8' || l.id === 'dash-10';
    if (tabType === 'check') return l.id === 'dash-3' || l.id === 'dash-5' || l.id === 'dash-7';
    if (tabType === 'working') return l.id === 'dash-4' || l.id === 'dash-6' || l.id === 'dash-9';
    return true;
  });

  if (filteredForTab.length === 0) {
    if (isMobile()) {
      mobileList.innerHTML = `<div class="ld-empty" style="padding: 30px; text-align: center; color: var(--muted);">No leads in this stage</div>`;
    } else {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--muted);">No leads in this stage</td></tr>`;
    }
    return;
  }

  filteredForTab.forEach(lead => {
    const isMob = isMobile();
    let actionButtons = '';
    if (tabType === 'active') {
      actionButtons = renderActiveLeadActions(lead, isMob);
    } else if (tabType === 'check') {
      actionButtons = renderCheckLeadActions(lead, isMob);
    } else {
      actionButtons = renderWorkingLeadActions(lead, isMob);
    }

    if (isMob) {
      const row = document.createElement('div');
      row.className = 'ld-row';
      row.onclick = () => openRecruitingModal(lead);
      row.innerHTML = `
        <div class="ld-row-content">
          <div class="ld-name-row">
            <div class="ld-name">${lead.name || lead.firstName + ' ' + (lead.lastName || '')}</div>
            <div class="ld-quick-actions" onclick="event.stopPropagation();">
               <div class="mob-card-chat-trigger" onclick="openLeadChat('${lead.id}', '${lead.firstName}')" title="Message">💬</div>
               <a href="tel:${lead.phone}" class="mob-card-call-trigger" title="Call">📞</a>
            </div>
          </div>
          <div class="ld-meta-row">
            <span class="ld-timestamp">${lead.timestamp || '-'}</span>
          </div>
          <div class="ld-full-actions" onclick="event.stopPropagation();">
            ${actionButtons}
          </div>
        </div>
      `;
      mobileList.appendChild(row);
    } else {
      const row = document.createElement('tr');
      row.style.cursor = 'pointer';
      row.onclick = () => openRecruitingModal(lead);

      const duplicateIndicator = (tabType === 'active' && lead.isDuplicate && lead.duplicateInfo)
        ? `<span class="duplicate-indicator" onclick="event.stopPropagation(); openDuplicateModal('${lead.id}')"></span>`
        : '';

      row.innerHTML = `
        <td style="font-size: 13px; color: var(--muted);">${lead.timestamp || '-'}</td>
        <td style="font-weight: 600; color: var(--text); white-space: nowrap;">
          ${duplicateIndicator}
          ${lead.name || lead.firstName + ' ' + (lead.lastName || '')}
        </td>
        <td style="font-size: 13px;">${lead.email || '-'}</td>
        <td style="font-size: 13px;">${lead.phone || '-'}</td>
        <td style="font-size: 13px;">${lead.zipCode || '-'}</td>
        <td style="font-size: 13px;">${lead.state || '-'}</td>
        <td style="font-size: 13px;">${lead.city || '-'}</td>
        <td onclick="event.stopPropagation();">${actionButtons}</td>
      `;
      tbody.appendChild(row);
    }
  });
}

// Active Leads - Assign Button
function renderActiveLeadActions(lead, isMob = false) {
  const leadIndex = dashboardLeads.findIndex(l => l.id === lead.id);
  return `
    <div class="lead-actions-group">
      <button class="lead-action-btn lead-action-primary" onclick="event.stopPropagation(); openRecruiterMenu(event, ${leadIndex})" title="Assign to recruiter">
        ASSIGN
      </button>
    </div>
  `;
}

// Lead Check - Assign (Orange), Note (White)
function renderCheckLeadActions(lead, isMob = false) {
  const leadIndex = dashboardLeads.findIndex(l => l.id === lead.id);
  return `
    <div class="lead-actions-group">
      <button class="lead-action-btn lead-action-orange" onclick="event.stopPropagation(); openRecruiterMenu(event, ${leadIndex})" title="Assign to recruiter">
        ASSIGN
      </button>
      <button class="lead-action-btn lead-action-white" onclick="event.stopPropagation(); openNoteModal(dashboardLeads.find(l=>l.id=='${lead.id}'))" title="Add note">
        NOTE
      </button>
    </div>
  `;
}

// Working Leads - Full Action Buttons
function renderWorkingLeadActions(lead, isMob = false) {
  const leadIndex = dashboardLeads.findIndex(l => l.id === lead.id);
  return `
    <div class="lead-actions-group">
      <button class="lead-action-btn lead-action-secondary" onclick="event.stopPropagation(); openRecruiterMenu(event, ${leadIndex})" title="Assign to recruiter">
        ASSIGN
      </button>
      <button class="lead-action-btn lead-action-secondary" onclick="event.stopPropagation(); openStageModal(dashboardLeads.find(l=>l.id=='${lead.id}'))" title="Change stage">
        STAGE
      </button>
      <button class="lead-action-btn lead-action-warning" onclick="event.stopPropagation(); openEscalationModal(dashboardLeads.find(l=>l.id=='${lead.id}'))" title="Escalate lead">
        ESCALATE
      </button>
      <button class="lead-action-btn lead-action-note" onclick="event.stopPropagation(); openNoteModal(dashboardLeads.find(l=>l.id=='${lead.id}'))" title="Add note">
        NOTE
      </button>
      <button class="lead-action-btn lead-action-delete" onclick="event.stopPropagation(); deleteLead('${lead.id}')" title="Delete lead">
        ×
      </button>
    </div>
  `;
}

// Tab Switching Function
function switchDashboardTab(tabName) {
  currentDashboardTab = tabName;

  // Update tab UI - explicitly remove all active states first
  document.querySelectorAll('.dashboard-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Then add active to the clicked tab
  document.querySelectorAll('.dashboard-tab').forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    }
  });

  // Re-render with current filters
  const leadsToShow = typeof filteredLeadsCache !== 'undefined' && filteredLeadsCache.length > 0
    ? filteredLeadsCache
    : dashboardLeads;

  renderDashboardLeads(leadsToShow, tabName);
}

// Delete Lead (Working Leads tab action)
function deleteLead(leadId) {
  if (confirm('Are you sure you want to delete this lead?')) {
    console.log('Delete lead:', leadId);
    const index = dashboardLeads.findIndex(l => l.id === leadId);
    if (index > -1) {
      dashboardLeads.splice(index, 1);
      renderDashboardLeads(dashboardLeads, currentDashboardTab);
    }
  }
}

// -------------------------
// View Switching
// -------------------------
function switchView(viewName) {
  if (viewName === 'inbox') {
    document.body.classList.add('inbox-active');
  } else {
    document.body.classList.remove('inbox-active');
  }

  // Hide all views
  if (els.performanceView) els.performanceView.style.display = 'none';
  if (els.recruitingView) els.recruitingView.style.display = 'none';
  if (els.leadDashboardView) els.leadDashboardView.style.display = 'none';
  if (els.safetyView) els.safetyView.style.display = 'none';
  if (els.fleetView) els.fleetView.style.display = 'none';
  if (els.accountingView) els.accountingView.style.display = 'none';
  if (els.earningsView) els.earningsView.style.display = 'none';
  if (els.execDashboardView) els.execDashboardView.style.display = 'none';
  if (els.inboxView) els.inboxView.style.display = 'none';
  if (els.masterSafetyView) els.masterSafetyView.style.display = 'none';
  const iqView = document.getElementById('insurance-quotes-view');
  if (iqView) iqView.style.display = 'none';
  const mrView = document.getElementById('master-recruiting-view');
  if (mrView) mrView.style.display = 'none';
  const cpView = document.getElementById('company-profile-view');
  if (cpView) cpView.style.display = 'none';

  // Show selected view
  switch (viewName) {
    case 'performance':
      if (els.performanceView) els.performanceView.style.display = 'block';
      break;
    case 'recruiting':
      if (els.recruitingView) els.recruitingView.style.display = 'block';
      renderRecruitingBoard();
      break;
    case 'lead-dashboard':
      if (els.leadDashboardView) els.leadDashboardView.style.display = 'block';
      // Render dashboard with current tab
      renderDashboardLeads(dashboardLeads, currentDashboardTab);
      break;
    case 'safety':
      if (els.safetyView) els.safetyView.style.display = 'block';
      renderSafetyBoard();
      break;
    case 'fleet':
      if (els.fleetView) els.fleetView.style.display = 'block';
      renderFleetBoard();
      break;
    case 'accounting':
      if (els.accountingView) els.accountingView.style.display = 'block';
      renderAccountingBoard();
      break;
    case 'earnings':
      if (els.earningsView) els.earningsView.style.display = 'block';
      renderEarnings();
      break;
    case 'executive-dashboard':
      if (els.execDashboardView) els.execDashboardView.style.display = 'block';
      renderExecutiveDashboard();
      break;
    case 'inbox':
      if (els.inboxView) els.inboxView.style.display = 'block';
      if (typeof renderInboxList === 'function') renderInboxList();
      break;
    case 'master-safety':
      if (els.masterSafetyView) els.masterSafetyView.style.display = 'block';
      if (typeof renderMasterSafety === 'function') renderMasterSafety();
      break;
    case 'insurance-quotes':
      if (iqView) iqView.style.display = 'block';
      if (typeof initInsuranceQuotes === 'function' && iqView && !iqView.querySelector('.iq-container')) {
        initInsuranceQuotes();
      }
      break;
    case 'master-recruiting':
      if (mrView) mrView.style.display = 'block';
      if (typeof initMasterRecruiting === 'function' && mrView && !mrView.querySelector('.mr-dashboard')) {
        initMasterRecruiting();
      }
      break;
  }

  // Update navigation active state
  document.querySelectorAll('.nav button').forEach(btn => {
    const view = btn.getAttribute('data-view');
    if (view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Attach view switching to navigation buttons
document.querySelectorAll('.nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.getAttribute('data-view');
    if (view) switchView(view);
  });
});

// Default View Initialization
switchView('lead-dashboard');

// Tag Search Event Listener
const tagSearchInput = document.getElementById('tagSearchInput');
if (tagSearchInput) {
  tagSearchInput.addEventListener('input', (e) => {
    filterLeadsByTag(e.target.value);
  });
}

// Safety Tag Search Event Listener
const safetyTagSearchInput = document.getElementById('safetyTagSearchInput');
if (safetyTagSearchInput) {
  safetyTagSearchInput.addEventListener('input', (e) => {
    filterSafetyLeadsByTag(e.target.value);
  });
}

// -------------------------
// EXECUTIVE DASHBOARD LOGIC
// -------------------------

let currentExecDept = 'all';
let currentExecTimeframe = 'weekly';
let execSearchTerm = '';

window.filterExecByDept = function (deptName) {
  const dropdown = document.getElementById('execDeptFilter');
  if (currentExecDept === deptName) {
    currentExecDept = 'all'; // Toggle off if already selected
    if (dropdown) dropdown.value = 'all';
  } else {
    currentExecDept = deptName;
    if (dropdown) dropdown.value = deptName;
  }
  renderExecutiveDashboard();
};

function renderExecutiveDashboard() {
  if (!els.execDashboardView) return;

  // 1. Render Main Stats
  const stats = executiveData.overall;
  els.execMainStats.innerHTML = `
    <div class="exec-stat-card">
      <div class="exec-stat-label">Total Leads</div>
      <div class="exec-stat-value">${stats.totalLeads.toLocaleString()}</div>
      <div class="exec-stat-trend trend-up">↑ 12% vs last period</div>
    </div>
    <div class="exec-stat-card">
      <div class="exec-stat-label">Contacted</div>
      <div class="exec-stat-value">${stats.contactedLeads.toLocaleString()}</div>
      <div class="exec-stat-trend trend-up">↑ 8% vs last period</div>
    </div>
    <div class="exec-stat-card">
      <div class="exec-stat-label">Closed</div>
      <div class="exec-stat-value">${stats.closedLeads.toLocaleString()}</div>
      <div class="exec-stat-trend trend-down">↓ 2% vs last period</div>
    </div>
    <div class="exec-stat-card">
      <div class="exec-stat-label">Close Rate</div>
      <div class="exec-stat-value">${(stats.closeRate * 100).toFixed(1)}%</div>
      <div class="exec-stat-trend trend-up">↑ 1.5% vs last period</div>
    </div>
    <div class="exec-stat-card">
      <div class="exec-stat-label">Avg Call Duration</div>
      <div class="exec-stat-value">${stats.avgCallDuration}</div>
      <div class="exec-stat-trend">Overall Avg</div>
    </div>
  `;

  // 1b. Search Highlight (If searching)
  const highlightContainer = document.getElementById('execSearchHighlight');
  if (highlightContainer) highlightContainer.innerHTML = '';

  if (execSearchTerm && highlightContainer) {
    const foundEmp = executiveData.employees.find(e => e.name.toLowerCase().includes(execSearchTerm.toLowerCase()));
    if (foundEmp) {
      let qualScore = 'Average';
      let scoreColor = '#64748b';
      if (foundEmp.score >= 90) {
        qualScore = 'Excellent';
        scoreColor = '#10b981';
      } else if (foundEmp.score >= 80) {
        qualScore = 'Good';
        scoreColor = '#3b82f6';
      } else {
        qualScore = 'Poor';
        scoreColor = '#ef4444';
      }

      highlightContainer.innerHTML = `
        <div class="exec-section-title">Search Result</div>
        <div class="exec-stat-card search-highlight-card" onclick="showEmployeeDetails('${foundEmp.id}')" style="border: 2px solid #3b82f6; margin-bottom: 24px; cursor: pointer;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div class="exec-stat-label">${foundEmp.role}</div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="exec-stat-value" style="margin: 0;">${foundEmp.name}</div>
                <button class="emp-search-msg-btn" onclick="event.stopPropagation(); if(typeof openLeadChat==='function') openLeadChat('${foundEmp.id}', '${foundEmp.name}')" style="background: #3b82f6; border: none; width: 24px; height: 24px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                  <img src="assets/img/chat.png" style="width: 14px; height: 14px; filter: brightness(0) invert(1);">
                </button>
              </div>
              <div class="exec-stat-trend">Numerical Score: ${foundEmp.score} | Dept: ${foundEmp.dept}</div>
            </div>
            <div style="text-align: right">
              <div class="exec-stat-label">Performance Rating</div>
              <div class="exec-stat-value" style="color: ${scoreColor}">${qualScore}</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 2. Render Dept Performance
  let filteredDepts = executiveData.departments;
  if (currentExecDept !== 'all') {
    filteredDepts = filteredDepts.filter(d => d.name === currentExecDept);
  }

  els.execDeptStats.innerHTML = filteredDepts.map(dept => `
    <div class="exec-dept-card ${currentExecDept === dept.name ? 'active-filter' : ''}" onclick="filterExecByDept('${dept.name}')" style="cursor: pointer; transition: all 0.2s; border: ${currentExecDept === dept.name ? '2px solid #3b82f6' : '1px solid transparent'};">
      <div class="exec-dept-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="exec-dept-name">${dept.name}</div>
          <button class="dept-msg-btn" onclick="event.stopPropagation(); if(typeof openLeadChat==='function') openLeadChat('dept-${dept.name.toLowerCase()}', '${dept.name} Team')" style="background: #3b82f6; border: none; width: 24px; height: 24px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <img src="assets/img/chat.png" style="width: 14px; height: 14px; filter: brightness(0) invert(1);">
          </button>
        </div>
        <div class="exec-dept-badge">${dept.employees} Employees</div>
      </div>
      <div class="exec-dept-metrics">
        <div class="exec-metric">
          <div class="exec-metric-label">Leads</div>
          <div class="exec-metric-value">${dept.leads}</div>
        </div>
        <div class="exec-metric">
          <div class="exec-metric-label">Closed</div>
          <div class="exec-metric-value">${dept.closed}</div>
        </div>
        <div class="exec-metric">
          <div class="exec-metric-label">CR%</div>
          <div class="exec-metric-value">${(dept.closeRate * 100).toFixed(1)}%</div>
        </div>
        <div class="exec-metric">
          <div class="exec-metric-label">Calls</div>
          <div class="exec-metric-value">${dept.totalCalls}</div>
        </div>
      </div>
    </div>
  `).join('');

  // 3. Render Leaderboard
  let filteredEmployees = executiveData.employees;
  if (currentExecDept !== 'all') {
    filteredEmployees = filteredEmployees.filter(e => e.dept === currentExecDept);
  }
  if (execSearchTerm) {
    filteredEmployees = filteredEmployees.filter(e => e.name.toLowerCase().includes(execSearchTerm.toLowerCase()));
  }

  els.execLeaderboardBody.innerHTML = filteredEmployees.sort((a, b) => b.score - a.score).map((emp, idx) => `
    <tr onclick="showEmployeeDetails('${emp.id}')">
      <td><span class="rank-circle">${idx + 1}</span></td>
      <td><strong>${emp.name}</strong><br><small>${emp.role}</small></td>
      <td>${emp.dept}</td>
      <td>${emp.leads}</td>
      <td>${emp.contacted}</td>
      <td>${emp.closed}</td>
      <td>${(emp.closeRate * 100).toFixed(1)}%</td>
      <td>${emp.calls}</td>
      <td>${emp.avgCallDuration}</td>
      <td><strong style="color: #3b82f6">${emp.score}</strong></td>
      <td><span class="status-badge ${emp.status === 'Active' ? 'status-active' : 'status-away'}">${emp.status}</span></td>
    </tr>
  `).join('');
}

function showEmployeeDetails(empId) {
  const emp = executiveData.employees.find(e => e.id === empId);
  if (!emp) return;

  document.getElementById('modalEmpName').textContent = emp.name;
  document.getElementById('modalEmpDept').textContent = emp.dept + " | " + emp.role;

  const content = `
    <div class="emp-detail-wrapper" style="background: #fff; border-radius: 20px; padding: 20px;">
      <!-- Time Filters (Always Top) -->
      <div class="emp-detail-header-filters" style="display: flex; justify-content: flex-end; margin-bottom: 24px; position: relative; z-index: 5;">
        <div class="time-toggle">
          <button class="time-btn" data-time="daily">Daily</button>
          <button class="time-btn active" data-time="weekly">Weekly</button>
          <button class="time-btn" data-time="monthly">Monthly</button>
          <button class="time-btn" data-time="yearly">Yearly</button>
        </div>
      </div>

      <div class="emp-detail-grid" style="display: block;"> <!-- Use block for mobile stacking -->
        <div class="emp-detail-main">
          <!-- Performance Overview (Must be visible) -->
          <div class="metric-group" style="display: block !important; margin-bottom: 30px;">
            <h4 style="display: block !important;">Performance Overview</h4>
            <div class="mini-kpi-row" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <div class="mini-kpi" style="flex: 1; min-width: 100px;">
                <div class="kpi-val">${emp.avgCallDuration}</div>
                <div class="kpi-lab">Avg Call Time</div>
              </div>
              <div class="mini-kpi" style="flex: 1; min-width: 100px;">
                <div class="kpi-val">${(emp.closeRate * 100).toFixed(1)}%</div>
                <div class="kpi-lab">CR</div>
              </div>
              <div class="mini-kpi" style="flex: 1; min-width: 100px;">
                <div class="kpi-val">${emp.closed}</div>
                <div class="kpi-lab">Closed</div>
              </div>
            </div>
          </div>

          <div class="metric-group">
            <h4>Call Metrics</h4>
            <div class="detail-list">
              <div class="detail-item"><span>Total Calls</span><strong>${emp.calls}</strong></div>
              <div class="detail-item"><span>Avg Duration</span><strong>${emp.avgCallDuration}</strong></div>
              <div class="detail-item"><span>Calls per Lead</span><strong>${emp.callsPerLead}</strong></div>
              <div class="detail-item"><span>Missed Calls</span><strong>${emp.missedCalls}</strong></div>
            </div>
          </div>
        </div>

        <div class="emp-detail-side">
          <div class="metric-group">
            <h4>Lead Status</h4>
            <div class="detail-list">
              <div class="detail-item"><span>Assigned</span><strong>${emp.leads}</strong></div>
              <div class="detail-item"><span>Active</span><strong>${emp.activeLeads}</strong></div>
              <div class="detail-item"><span>Avg Time to Close</span><strong>${emp.avgTimeToClose}</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div class="exec-section-title" style="margin-top: 40px;">Currently Assigned Leads</div>
      <div class="assigned-leads-card" style="background: #f8fafc; border-radius: 16px; padding: 16px; border: 1px solid #e2e8f0;">
        <table class="exec-leaderboard-table" style="background: transparent;">
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Current Column</th>
              <th>Time in Stage</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            ${(emp.id === 'e5' ? [
      { name: 'Marcus Wright', stage: 'Docs Submitted', time: '2 days', tags: ['SAFETY CLEARED', 'FAST TRACK'] },
      { name: 'Elena Fisher', stage: 'Pending Review', time: '4 hours', tags: ['PENDING DOCS'] },
      { name: 'Victor Sullivan', stage: 'In Progress', time: '1 week', tags: ['REJECTED'] }
    ] : (emp.dept === 'Recruiting' ? [
      { name: 'Demarcus Rainey', stage: 'New Lead', time: '1 day', tags: ['HOT', 'NEW'] },
      { name: 'Kevin Copening', stage: 'Follow Up', time: '3 days', tags: ['FOLLOW UP'] }
    ] : [
      { name: 'Sample Driver X', stage: 'Processing', time: '2 days', tags: ['ACTIVE'] },
      { name: 'Sample Driver Y', stage: 'Pending', time: '5 days', tags: ['MISSING INFO'] }
    ])).map(lead => `
              <tr>
                <td><strong>${lead.name}</strong></td>
                <td><span class="badge" style="background: #eff6ff; color: #1d4ed8; padding: 4px 8px; border-radius: 6px; font-size: 11px;">${lead.stage}</span></td>
                <td>${lead.time}</td>
                <td>
                  ${lead.tags.map(tag => `
                    <span class="badge" style="background: ${getTagColor(tag)}; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-right: 4px;">${tag}</span>
                  `).join('')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('employeeModalContent').innerHTML = content;

  // Attach listeners to new buttons inside modal
  const modalButtons = document.querySelectorAll('#employeeModalContent .time-btn');
  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modalButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Attach message listener
  const msgBtn = document.querySelector('.msg-emp-btn');
  if (msgBtn) {
    msgBtn.addEventListener('click', () => {
      if (typeof openLeadChat === 'function') {
        openLeadChat(emp.id, emp.name);
        closeEmployeeModal();
      }
    });
  }

  els.employeeDetailModal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function getTagColor(tag) {
  if (tag.includes('HOT') || tag.includes('CLEARED')) return '#10b981'; // Green
  if (tag.includes('REJECTED') || tag.includes('MISSING')) return '#ef4444'; // Red
  if (tag.includes('FOLLOW UP') || tag.includes('PENDING')) return '#f59e0b'; // Orange
  return '#3b82f6'; // Blue
}

function closeEmployeeModal() {
  els.employeeDetailModal.style.display = 'none';
  document.body.style.overflow = ''; // Restore background scroll
}

// Event Listeners for Executive Dashboard
document.addEventListener('DOMContentLoaded', () => {
  const deptFilter = document.getElementById('execDeptFilter');
  if (deptFilter) {
    deptFilter.addEventListener('change', (e) => {
      currentExecDept = e.target.value;
      renderExecutiveDashboard();
    });
  }

  const empSearch = document.getElementById('execEmployeeSearch');
  if (empSearch) {
    empSearch.addEventListener('input', (e) => {
      execSearchTerm = e.target.value;
      renderExecutiveDashboard();
    });
  }

  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentExecTime = btn.dataset.time;
      renderExecutiveDashboard();
    });
  });

  // Performance View Time Listeners
  document.querySelectorAll('.performance-time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.performance-time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const timeframe = btn.dataset.time;
      updatePerformanceData(timeframe);
    });
  });
});

function updatePerformanceData(timeframe) {
  // Simple multiplier for mock data
  let multiplier = 1;
  if (timeframe === 'daily') multiplier = 0.2;
  if (timeframe === 'weekly') multiplier = 1;
  if (timeframe === 'monthly') multiplier = 4;
  if (timeframe === 'yearly') multiplier = 48;

  // We should ideally have distinct data, but for now we scale the existing recruiters array
  // NOTE: In a real app, this would fetch from an API.
  // We'll just refresh the render with slightly modified values for visual feedback
  renderTable();

  // Update the KPI circles to 0 or first recruiter as a reset/refresh effect
  if (recruiters.length > 0) selectRecruiter(recruiters[0].id);
}

// Initialize Lead Dashboard
renderDashboardLeads();

/* Chat & Transcript Tab Logic */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('chat-tab-recruiting')) {
    const tab = e.target.getAttribute('data-tab');
    const tabs = document.querySelectorAll('.chat-tab-recruiting');
    const messagesArea = document.querySelector('.chat-messages-recruiting');
    const inputArea = document.querySelector('.chat-input-area-recruiting');

    if (!messagesArea || !inputArea) return;

    // Update Active Tab Style
    tabs.forEach(t => {
      t.classList.remove('active');
      t.style.color = 'rgba(255,255,255,0.5)';
      t.style.borderBottom = 'none';
    });
    e.target.classList.add('active');
    e.target.style.color = '#fff';
    e.target.style.borderBottom = '2px solid #3b82f6';

    if (tab === 'transcript') {
      // For Demo: Show No Transcript Found
      messagesArea.dataset.prevContent = messagesArea.innerHTML;
      messagesArea.innerHTML = '<div style="height: 100%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); font-size: 13px; font-style: italic;">No transcript found</div>';
      inputArea.style.opacity = '0.3';
      inputArea.style.pointerEvents = 'none';
    } else {
      // Restore Chat
      if (messagesArea.dataset.prevContent) {
        messagesArea.innerHTML = messagesArea.dataset.prevContent;
      }
      inputArea.style.opacity = '1';
      inputArea.style.pointerEvents = 'auto';
    }
  }
});
