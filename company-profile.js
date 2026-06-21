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
          { name: "Nikola Banjac", nick: "Jake Banjac", phone: "(832) 446-0267", email: "", role: "Dispatcher", status: "active" },
          { name: "Jovan Jelic", nick: "Jovan Jelic", phone: "", email: "", role: "Dispatcher", status: "active", outsource: true }
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
    ],
    charges: [
      {
            "category": "Onboarding Charges and Deductions",
            "code": "A-1",
            "name": "Drug Test Fee",
            "amount": 50,
            "frequency": "Per test",
            "applied": true
      },
      {
            "category": "Onboarding Charges and Deductions",
            "code": "A-2",
            "name": "Orientation, Onboarding, Permitting...",
            "amount": 150,
            "frequency": "Once",
            "applied": false
      },
      {
            "category": "Onboarding Charges and Deductions",
            "code": "A-3",
            "name": "Equipment Registration",
            "amount": 100,
            "frequency": "Once",
            "applied": false
      },
      {
            "category": "Escrow Deductions & Charges",
            "code": "B-1",
            "name": "Escrow Deposit (per Driver)",
            "amount": 2500,
            "frequency": "Until replenished",
            "applied": true
      },
      {
            "category": "Insurance Deductions & Charges",
            "code": "C-1",
            "name": "Insurance Deductible - Auto Liability",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Insurance Deductions & Charges",
            "code": "C-2",
            "name": "Insurance Deductible - Cargo Damage",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Insurance Deductions & Charges",
            "code": "C-3",
            "name": "Insurance Deductible - Physical Damage",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Insurance Deductions & Charges",
            "code": "C-4",
            "name": "Company Insurance Program Reimbursement",
            "amount": 150,
            "frequency": "Monthly",
            "applied": true
      },
      {
            "category": "Insurance Deductions & Charges",
            "code": "C-5",
            "name": "Premiums/Costs for Coverage Procured by Company",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Insurance Deductions & Charges",
            "code": "C-6",
            "name": "Cargo Claims, Shortages, and Salvage Charges",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-1",
            "name": "Trailer Rental Fee",
            "amount": 250,
            "frequency": "Weekly",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-2",
            "name": "Cleaning, Repair, Repositioning...",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-3",
            "name": "Excessive Mileage Charges on Company Trailers",
            "amount": 0.15,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-4",
            "name": "Truck Keys - Not Returned / Damaged",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-5",
            "name": "Fuel Card - Not Returned",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-6",
            "name": "ELD / Logbook Tablet - Not Returned",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-7",
            "name": "License Plate - Not Returned",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-8",
            "name": "Company Stickers, Decals, and Logos - Not Returned",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-9",
            "name": "Toll Transponder / Pass Device - Not Returned",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-10",
            "name": "Dash Camera (if applicable) - Not Returned",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-11",
            "name": "GPS Unit - Not Returned",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-12",
            "name": "Interior Cab Cleaning (if truck returned dirty)",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-13",
            "name": "Truck Binder (permits, decals, documents) - Not Returned",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-14",
            "name": "Liquidated Damages for Failure to Return Equipment",
            "amount": 1200,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Equipment, Trailer, and Carrier Property",
            "code": "D-15",
            "name": "Trailer Repair",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Compliance Charges",
            "code": "E-1",
            "name": "Quarterly IFTA Filing Charge",
            "amount": 50,
            "frequency": "Quarterly",
            "applied": false
      },
      {
            "category": "Compliance Charges",
            "code": "E-2",
            "name": "IFTA Calculations & Obligation",
            "amount": 0.05,
            "frequency": "Weekly",
            "applied": false
      },
      {
            "category": "Compliance Charges",
            "code": "E-3",
            "name": "Fuel Transaction Service Fee",
            "amount": 2.5,
            "frequency": "Per Transaction",
            "applied": true
      },
      {
            "category": "Compliance Charges",
            "code": "E-4",
            "name": "Toll Violations",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Compliance Charges",
            "code": "E-5",
            "name": "Tolls - Routine",
            "amount": 50,
            "frequency": "Weekly",
            "applied": true
      },
      {
            "category": "Compliance Charges",
            "code": "E-6",
            "name": "MVR Renewal / Motor Vehicle Records",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Compliance Charges",
            "code": "E-7",
            "name": "Permits, Base Plates, Registrations",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Compliance Charges",
            "code": "E-8",
            "name": "Citation / Ticket from Official Enforcement Officer",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fuel, Advances, and Road Expenses",
            "code": "F-1",
            "name": "Fuel Purchased on Company Card or Account",
            "amount": 150,
            "frequency": "Weekly",
            "applied": true
      },
      {
            "category": "Fuel, Advances, and Road Expenses",
            "code": "F-2",
            "name": "Cash Advances",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Fuel, Advances, and Road Expenses",
            "code": "F-3",
            "name": "Returned Payment / Failed ACH / Stop Payment",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Fuel, Advances, and Road Expenses",
            "code": "F-4",
            "name": "Off-Network Fueling Without Authorization",
            "amount": 50,
            "frequency": "Per Transaction",
            "applied": true
      },
      {
            "category": "Fuel, Advances, and Road Expenses",
            "code": "F-5",
            "name": "IFTA Manual Reconstruction Fee",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-1",
            "name": "ELD / Telematics / Camera Program Fees",
            "amount": 35,
            "frequency": "Weekly",
            "applied": true
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-2",
            "name": "Dispatch / Administrative / Settlement Processing Fee",
            "amount": 150,
            "frequency": "Monthly",
            "applied": true
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-3",
            "name": "IFTA Reporting Service Fee",
            "amount": 50,
            "frequency": "Quarterly",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-4",
            "name": "Continual Qualification Fees",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-5",
            "name": "Investigation Fees",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-6",
            "name": "Overpayments to Contractor",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-7",
            "name": "Lease Payments Owed by Contractor",
            "amount": 100,
            "frequency": "Per Schedule",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-8",
            "name": "TripPak Processing Fee",
            "amount": 10,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Administrative and Program Fees",
            "code": "G-9",
            "name": "Direct Deposit Processing and Admin Fee",
            "amount": 5,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Customer Service Failures",
            "code": "H-1",
            "name": "Late Delivery Penalty / Missed Appointment Fee",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Customer Service Failures",
            "code": "H-2",
            "name": "Re-Delivery Costs / Re-Consignment Fees",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Customer Service Failures",
            "code": "H-3",
            "name": "Storage / Warehouse Charges",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Customer Service Failures",
            "code": "H-4",
            "name": "Lumper / Driver Assist Costs",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Customer Service Failures",
            "code": "H-5",
            "name": "Missing, Late, Inaccurate Documentation",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Customer Service Failures",
            "code": "H-6",
            "name": "Failure to Provide a Lumper Receipt",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Termination-Related Charges",
            "code": "I-1",
            "name": "Final Settlement Holdback",
            "amount": 1000,
            "frequency": "Once",
            "applied": true
      },
      {
            "category": "Termination-Related Charges",
            "code": "I-2",
            "name": "Equipment Repossession",
            "amount": 500,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Other Fines",
            "code": "J-1",
            "name": "Any other fine, charge, or assessment",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Other Fines",
            "code": "J-2",
            "name": "Failure to pull into a weigh station",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Other Fines",
            "code": "J-3",
            "name": "Failure to accept tracking from a broker",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Other Fines",
            "code": "J-4",
            "name": "3rd-party property damage",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Bonus Schedule",
            "code": "B-1",
            "name": "Level I: North American Standard Inspection",
            "amount": 400,
            "frequency": "Per clean inspection",
            "applied": true
      },
      {
            "category": "Bonus Schedule",
            "code": "B-2",
            "name": "Level II: Walk-Around Driver and Vehicle Inspection",
            "amount": 330,
            "frequency": "Per clean inspection",
            "applied": true
      },
      {
            "category": "Bonus Schedule",
            "code": "B-3",
            "name": "Level III: Driver-Only Inspection",
            "amount": 250,
            "frequency": "Per clean inspection",
            "applied": true
      },
      {
            "category": "Bonus Schedule",
            "code": "B-4",
            "name": "Level IV: Special Inspection",
            "amount": 200,
            "frequency": "Per clean inspection",
            "applied": true
      },
      {
            "category": "Bonus Schedule",
            "code": "B-5",
            "name": "Level V: Vehicle-Only Inspection",
            "amount": 200,
            "frequency": "Per clean inspection",
            "applied": true
      },
      {
            "category": "Bonus Schedule",
            "code": "B-6",
            "name": "No roadside inspection violations in a rolling 3-month period",
            "amount": 300,
            "frequency": "Per qualifying period",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-1",
            "name": "Reckless driving, texting while driving...",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-2",
            "name": "Speeding 11-14 mph over the posted limit",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-3",
            "name": "Failing to use a seat belt",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-4",
            "name": "Following too close",
            "amount": 200,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-5",
            "name": "Failure to obey or yield right-of-way",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-6",
            "name": "Improper lane change",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-7",
            "name": "Improper turning",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-8",
            "name": "Railroad-crossing violation",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-9",
            "name": "Violating lane restrictions / left lane violation",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-10",
            "name": "Failure to obey traffic control device",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-11",
            "name": "Driving into oncoming traffic",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-12",
            "name": "Failure to maintain lane",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-13",
            "name": "Failure to use hazard warning flashers",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-14",
            "name": "Failure to dim headlamps",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-15",
            "name": "Failure to use caution in hazardous conditions",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-16",
            "name": "Unlawful parking",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Unsafe Driving",
            "code": "A-17",
            "name": "Using a hand-held device while operating a CMV",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Drugs & Alcohol",
            "code": "B-1",
            "name": "Possession, use, or being under the influence",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Drugs & Alcohol",
            "code": "B-2",
            "name": "Violating an out-of-service order related to alcohol use",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Drugs & Alcohol",
            "code": "B-3",
            "name": "Failure to report an accident requiring drug testing",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-1",
            "name": "Driving after being placed out of service",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-2",
            "name": "Driving while ill or fatigued",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-3",
            "name": "False logs or HOS violation",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-4",
            "name": "Log not current / failure to retain prior 7 days' logs",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-5",
            "name": "Log violation (general / form and manner)",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-6",
            "name": "Late logs",
            "amount": 25,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-7",
            "name": "Driving while logged out of ELD",
            "amount": 250,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Fines: Hours of Service",
            "code": "C-8",
            "name": "Disconnected / tampered ELD",
            "amount": 500,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Fines: Driver Fitness",
            "code": "D-1",
            "name": "Driving CMV without a CDL or suspended CDL",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Driver Fitness",
            "code": "D-2",
            "name": "Failure to report or notify Company of a suspended license",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Driver Fitness",
            "code": "D-3",
            "name": "Learner's-permit violations",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Driver Fitness",
            "code": "D-4",
            "name": "No English-proficient driver",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": false
      },
      {
            "category": "Fines: Driver Fitness",
            "code": "D-5",
            "name": "No medical card in driver's possession",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-1",
            "name": "Late bill of lading",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-2",
            "name": "Lost bill of lading",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-3",
            "name": "Failure to follow delivery instructions",
            "amount": 250,
            "frequency": "Per Load",
            "applied": true
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-4",
            "name": "Failure to scale a load and notify Company",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-5",
            "name": "Failure to turn in roadside inspection or ticket on time",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-6",
            "name": "Failure to turn in trailer inspection reports",
            "amount": 50,
            "frequency": "Per Week",
            "applied": false
      },
      {
            "category": "Fines: Documentation & Cargo",
            "code": "E-7",
            "name": "Lost tractor documents folder",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Riders & Authority",
            "code": "F-1",
            "name": "Unauthorized riders or passengers",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Riders & Authority",
            "code": "F-2",
            "name": "Pulling unreported or unauthorized broker loads",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Riders & Authority",
            "code": "F-3",
            "name": "Singles falsifying loads as teams",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Riders & Authority",
            "code": "F-4",
            "name": "Allowing an unqualified or unauthorized person to drive",
            "amount": 1000,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Reporting",
            "code": "G-1",
            "name": "Missing required check calls",
            "amount": 50,
            "frequency": "Per Missed Call",
            "applied": true
      },
      {
            "category": "Fines: Reporting",
            "code": "G-2",
            "name": "Failure to notify Safety of driver/truck status changes",
            "amount": 150,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Fines: Reporting",
            "code": "G-3",
            "name": "Failure to notify Maintenance when dropping/switching",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Equipment",
            "code": "H-1",
            "name": "Switching license plates or parts between trailers",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Equipment",
            "code": "H-2",
            "name": "Breaking pin locks off trailers",
            "amount": 250,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Equipment",
            "code": "H-3",
            "name": "Changing parameters on the truck ECM",
            "amount": 500,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Equipment",
            "code": "H-4",
            "name": "Failure to return truck to home terminal same day",
            "amount": 750,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Equipment",
            "code": "H-5",
            "name": "Using Company-furnished truck for personal needs",
            "amount": 250,
            "frequency": "Per Day",
            "applied": true
      },
      {
            "category": "Fines: Conduct",
            "code": "I-1",
            "name": "Smoking on customer or Company property",
            "amount": 150,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Conduct",
            "code": "I-2",
            "name": "Using customer or Company telephones without permission",
            "amount": 50,
            "frequency": "Per Occurrence",
            "applied": true
      },
      {
            "category": "Fines: Conduct",
            "code": "I-3",
            "name": "Littering on customer or Company property",
            "amount": 100,
            "frequency": "Per Occurrence",
            "applied": true
      }
]
  },
  'hanse': {
    company: { legalName: "HANSE LLC", displayName: "Hanse", subtitle: "Recruitment Dashboard", dot: "0000000", mc: "MC-000000", usdotStatus: "Active", drivers: 0, powerUnits: 0 },
    insurance: { active: null, history: [] }, departments: [], yards: [], schedule: [], brokers: [], charges: []
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
        ${window.isCompanyEditMode ? `
          <div style="display:flex; gap:8px;">
            <button class="cp-btn primary" onclick="syncWithFmcsaInline(this)" style="display:flex; align-items:center; gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.25 5.25"/></svg>
              Sync FMCSA
            </button>
            <button class="cp-btn" onclick="toggleCompanyEditMode()">Cancel</button>
            <button class="cp-btn primary" onclick="saveCompanyInline()">Save Changes</button>
          </div>
        ` : `
          <button class="cp-btn" onclick="toggleCompanyEditMode()">Edit Company</button>
        `}
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
          <div class="cp-field"><label>Legal Name</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompLegalName" value="${comp.legalName || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.legalName}</div>`}
          </div>
          <div class="cp-field"><label>DBA Name</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompDbaName" value="${comp.dbaName || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.dbaName || 'N/A'}</div>`}
          </div>
          <div class="cp-field"><label>DOT #</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompDot" value="${comp.dot || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.dot || 'N/A'}</div>`}
          </div>
          <div class="cp-field"><label>MC #</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompMc" value="${comp.mc || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.mc || 'N/A'}</div>`}
          </div>
          <div class="cp-field"><label>Phone</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompPhone" value="${comp.phone || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.phone || 'N/A'}</div>`}
          </div>
          <div class="cp-field"><label>Email</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompEmail" value="${comp.email || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.email || 'N/A'}</div>`}
          </div>
          <div class="cp-field"><label>Physical Address</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompPhysical" value="${comp.physicalAddress || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.physicalAddress || 'N/A'}</div>`}
          </div>
          <div class="cp-field"><label>Mailing Address</label>
            ${window.isCompanyEditMode ? `<input type="text" id="inlineCompMailing" value="${comp.mailingAddress || ''}" style="width:100%; padding:6px; border:1px solid var(--primary); border-radius:4px; margin-top:4px;">` : `<div class="val">${comp.mailingAddress || 'N/A'}</div>`}
          </div>
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
        <div class="cp-section-summary" style="display:flex; align-items:center; gap:16px;">
          <span>${ins.active.company} - ${ins.active.policy}</span>
          <div style="display:flex; gap:8px;">
            <button class="cp-btn" onclick="event.stopPropagation(); alert('Upload Policy placeholder')" style="padding:4px 8px; font-size:12px;">Upload Policy</button>
            <button class="cp-btn primary" onclick="event.stopPropagation(); alert('View Policy placeholder')" style="padding:4px 8px; font-size:12px;">View Policy</button>
          </div>
        </div>
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
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Agent Information</div>
            <button class="cp-btn" onclick="openEditAgentModal()" style="padding:4px 10px; font-size:11px;">Edit Agent</button>
          </div>
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
  
  window.cpDeptFilters = window.cpDeptFilters || new Set();
  
  html += `
      <div class="cp-section">
      <div class="cp-section-header" onclick="toggleCpSection(this)">
        <div class="cp-section-title">Departments & Team Members</div>
        <div class="cp-section-summary" style="display:flex; align-items:center; gap:16px;">
          <span>${data.departments.length} Departments — ${totalMembers} Employees</span>
          <button class="cp-btn primary" onclick="event.stopPropagation(); openAddEmployeeModal()" style="padding:4px 10px; font-size:12px; display:flex; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
            Add Employee
          </button>
        </div>
      </div>
      <div class="cp-section-content">
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; align-items:center;">
          <button class="cp-btn" onclick="openAddCustomDeptModal()" style="padding:6px 12px; border-radius:16px; font-size:12px; border:1px dashed var(--border); background:transparent;">+ Add Custom Dept</button>
        </div>
        <input type="text" placeholder="Search team members by name, nickname, or role..." style="width:100%; padding:8px; border:1px solid var(--border); border-radius:4px; margin-bottom:16px;" onkeyup="searchCpEmployees(this.value)">
  `;
  
  data.departments.forEach(dept => {
    const isSelected = window.cpDeptFilters.size === 0 || window.cpDeptFilters.has(dept.name);
    
    // If not in edit mode, completely hide unselected departments
    if (!window.isCompanyEditMode && !isSelected) return;
    
    const isEditMode = window.isCompanyEditMode;
    const isBlue = isEditMode && isSelected;
    
    html += `
      <div class="cp-dept-card" data-dept="${dept.name}" style="${isBlue ? 'border-color: var(--blue);' : ''}">
        <div class="cp-dept-header" onclick="toggleCpSection(this)" style="${isBlue ? 'background: var(--blue); color: white;' : ''}">
          <div style="display:flex; align-items:center; gap:12px;">
            ${isEditMode ? `
            <div class="dept-checkbox" onclick="event.stopPropagation(); toggleDeptFilter('${dept.name}')" style="width:18px; height:18px; border-radius:50%; border:2px solid ${isBlue ? 'white' : 'var(--border)'}; background:${isBlue ? 'white' : 'transparent'}; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              ${isSelected ? `<div style="width:8px; height:8px; border-radius:50%; background:var(--blue);"></div>` : ''}
            </div>
            ` : ''}
            ${dept.name} <span class="dept-members-count" style="color:${isBlue ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)'}; font-size:12px; margin-left:8px;">${dept.members.length} members</span>
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
                <div style="font-size:12px; color:var(--text-muted); margin-top:2px; display:flex; align-items:center; gap:6px;">
                  <span>${m.role}</span>
                  ${m.outsource ? '<span class="cp-badge yellow" style="font-size:10px; padding:2px 6px;">Outsource</span>' : ''}
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
    
    // --- Company Charges ---
    if (data.charges && data.charges.length > 0) {
      const activeCharges = window.isCompanyEditMode ? data.charges : data.charges.filter(c => c.applied);
      
      if (activeCharges.length > 0 || window.isCompanyEditMode) {
        html += `
        <div class="cp-section">
          <div class="cp-section-header" onclick="toggleCpSection(this)">
            <div class="cp-section-title">Company Charges & Deductions</div>
            <div class="cp-section-summary" style="display:flex; align-items:center; gap:16px;">
              <span>${activeCharges.length} Charges</span>
              ${window.isCompanyEditMode ? `
                <button class="cp-btn" onclick="event.stopPropagation(); simulateAIParsing(this)" style="padding:4px 10px; font-size:12px; display:flex; align-items:center; gap:4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"></path></svg>
                  Upload Document
                </button>
                <button class="cp-btn primary" onclick="event.stopPropagation(); openAddChargeModal()" style="padding:4px 10px; font-size:12px; display:flex; align-items:center; gap:4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
                  Add Custom Charge
                </button>
              ` : ''}
            </div>
          </div>
          <div class="cp-section-content" style="padding:0;">
            <div style="padding:16px; border-bottom:1px solid var(--border);">
              <input type="text" placeholder="Search charges by code or description..." onkeyup="searchCpCharges(this.value)" style="width:100%; padding:8px; border:1px solid var(--border); border-radius:4px; font-size:13px;">
            </div>
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
              <thead>
                <tr style="border-bottom:1px solid var(--border); background:var(--surface2);">
                  <th style="padding:12px 16px; font-weight:600; width:65%;">Description</th>
                  <th style="padding:12px 16px; font-weight:600; width:15%;">Amount</th>
                  <th style="padding:12px 16px; font-weight:600; width:20%;">Frequency</th>
                </tr>
              </thead>
              <tbody>
        `;
        
        const groupedCharges = {};
        activeCharges.forEach(c => {
          if (!groupedCharges[c.category]) groupedCharges[c.category] = [];
          groupedCharges[c.category].push(c);
        });
        
        Object.keys(groupedCharges).forEach(cat => {
          html += `
            <tr style="background:var(--surface3); border-bottom:1px solid var(--border);">
              <td colspan="3" style="padding:8px 16px; font-weight:700; font-size:12px; color:var(--text-muted); text-transform:uppercase;">${cat}</td>
            </tr>
          `;
          groupedCharges[cat].forEach(c => {
            const isBlue = window.isCompanyEditMode && c.applied;
            html += `
              <tr class="charge-row" data-code="${c.code}" style="border-bottom:1px solid var(--border); background:${isBlue ? 'rgba(47, 94, 169, 0.05)' : 'transparent'}; transition: background 0.2s;">
                <td style="padding:12px 16px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                    ${window.isCompanyEditMode ? `
                      <div class="charge-checkbox" onclick="toggleChargeApplied('${c.code}')" style="width:18px; height:18px; border-radius:4px; border:2px solid ${isBlue ? 'var(--blue)' : 'var(--border)'}; background:${isBlue ? 'var(--blue)' : 'transparent'}; cursor:pointer; display:flex; align-items:center; justify-content:center; transition: all 0.2s; flex-shrink:0;">
                        ${c.applied ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M20 6L9 17l-5-5"></path></svg>` : ''}
                      </div>
                    ` : ''}
                    <span>${c.name}</span>
                  </div>
                </td>
                <td style="padding:12px 16px;">
                  ${window.isCompanyEditMode ? `
                    <div style="display:flex; align-items:center; gap:4px;">
                      <span style="color:var(--text-muted);">$</span>
                      <input type="number" class="charge-amount-input" data-code="${c.code}" value="${c.amount.toFixed(2)}" style="width:70px; padding:4px 8px; border:1px solid var(--border); border-radius:4px; font-size:13px;" onchange="updateChargeAmount('${c.code}', this.value)">
                    </div>
                  ` : `
                    $${c.amount.toFixed(2)}
                  `}
                </td>
                <td style="padding:12px 16px; color:var(--text-muted);">${c.frequency}</td>
              </tr>
            `;
          });
        });
        
        html += `
              </tbody>
            </table>
          </div>
        </div>
        `;
      }
    }
  
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

  container.innerHTML = html;
  
  // Render tables after injecting HTML
  searchCpUnits('');
  searchCpDrivers('');
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

// Edit Company Logic
window.openEditCompanyModal = function() {
  const comp = companyProfileData[activeCompanyId].company;
  document.getElementById('editCompLegalName').value = comp.legalName || '';
  document.getElementById('editCompDbaName').value = comp.dbaName || '';
  document.getElementById('editCompDot').value = comp.dot || '';
  document.getElementById('editCompMc').value = comp.mc || '';
  document.getElementById('editCompanyModal').style.display = 'flex';
};

window.closeEditCompanyModal = function() {
  document.getElementById('editCompanyModal').style.display = 'none';
};

window.syncWithFmcsa = function() {
  const btn = event.currentTarget;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = 'Syncing...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    alert('Synced successfully with FMCSA!');
  }, 1000);
};

window.saveCompanyDetails = function() {
  const comp = companyProfileData[activeCompanyId].company;
  comp.legalName = document.getElementById('editCompLegalName').value;
  comp.dbaName = document.getElementById('editCompDbaName').value;
  comp.dot = document.getElementById('editCompDot').value;
  comp.mc = document.getElementById('editCompMc').value;
  closeEditCompanyModal();
  renderCompanyProfile();
};

// Edit Agent Logic
window.openEditAgentModal = function() {
  const ins = companyProfileData[activeCompanyId].insurance.active;
  if(!ins) return;
  document.getElementById('editAgentName').value = ins.agentName || '';
  document.getElementById('editAgentPhone').value = ins.agentPhone || '';
  document.getElementById('editAgentEmail').value = ins.agentEmail || '';
  document.getElementById('editAgentModal').style.display = 'flex';
};

window.closeEditAgentModal = function() {
  document.getElementById('editAgentModal').style.display = 'none';
};

window.saveAgentDetails = function() {
  const ins = companyProfileData[activeCompanyId].insurance.active;
  if(ins) {
    ins.agentName = document.getElementById('editAgentName').value;
    ins.agentPhone = document.getElementById('editAgentPhone').value;
    ins.agentEmail = document.getElementById('editAgentEmail').value;
  }
  closeEditAgentModal();
  renderCompanyProfile();
};

// Custom Department Logic
window.openAddCustomDeptModal = function() {
  document.getElementById('customDeptName').value = '';
  document.getElementById('addCustomDeptModal').style.display = 'flex';
};

window.closeAddCustomDeptModal = function() {
  document.getElementById('addCustomDeptModal').style.display = 'none';
};

window.saveCustomDept = function() {
  const name = document.getElementById('customDeptName').value.trim();
  if(!name) {
    alert('Department name is required');
    return;
  }
  companyProfileData[activeCompanyId].departments.push({
    name: name,
    members: []
  });
  closeAddCustomDeptModal();
  renderCompanyProfile();
};

// Department Filter Logic
window.toggleAllDeptFilters = function(isChecked) {
  if (isChecked) {
    window.cpDeptFilters.clear();
  } else {
    // If unchecking "All", we check all individual departments so user can then uncheck specific ones
    const cData = companyProfileData[activeCompanyId];
    if (cData && cData.departments) {
      cData.departments.forEach(d => window.cpDeptFilters.add(d.name));
    }
  }
  renderCompanyProfile();
};

window.toggleDeptFilter = function(deptName) {
  // If "All" was previously selected (set is empty), we populate it first
  if (window.cpDeptFilters.size === 0) {
    const cData = companyProfileData[activeCompanyId];
    if (cData && cData.departments) {
      cData.departments.forEach(d => {
        if (d.name !== deptName) {
          window.cpDeptFilters.add(d.name);
        }
      });
    }
  } else {
    // Toggle the pill
    if (window.cpDeptFilters.has(deptName)) {
      window.cpDeptFilters.delete(deptName);
    } else {
      window.cpDeptFilters.add(deptName);
    }
    
    // If all are now selected, clear the set so "All" applies
    const cData = companyProfileData[activeCompanyId];
    if (cData && cData.departments && window.cpDeptFilters.size === cData.departments.length) {
      window.cpDeptFilters.clear();
    }
  }
  
  // Update DOM directly to preserve expanded states
  document.querySelectorAll('.cp-dept-card').forEach(card => {
    const dName = card.getAttribute('data-dept');
    if (!dName) return;
    const isSelected = window.cpDeptFilters.size === 0 || window.cpDeptFilters.has(dName);
    
    const isBlue = window.isCompanyEditMode && isSelected;
    
    card.style.borderColor = isBlue ? 'var(--blue)' : '';
    
    const header = card.querySelector('.cp-dept-header');
    if (header) {
      header.style.background = isBlue ? 'var(--blue)' : '';
      header.style.color = isBlue ? 'white' : '';
      
      const cb = header.querySelector('.dept-checkbox');
      if (cb) {
        cb.style.border = '2px solid ' + (isBlue ? 'white' : 'var(--border)');
        cb.style.background = isBlue ? 'white' : 'transparent';
        cb.innerHTML = isSelected ? '<div style="width:8px; height:8px; border-radius:50%; background:var(--blue);"></div>' : '';
      }
      
      const mc = header.querySelector('.dept-members-count');
      if (mc) {
        mc.style.color = isBlue ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)';
      }
    }
  });
};

window.toggleCompanyEditMode = function() {
  window.isCompanyEditMode = !window.isCompanyEditMode;
  renderCompanyProfile();
};

window.syncWithFmcsaInline = function(btn) {
  const originalHtml = btn.innerHTML;
  btn.innerHTML = 'Syncing...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    alert('Synced successfully with FMCSA!');
  }, 1000);
};

window.saveCompanyInline = function() {
  const comp = companyProfileData[activeCompanyId].company;
  comp.legalName = document.getElementById('inlineCompLegalName').value;
  comp.dbaName = document.getElementById('inlineCompDbaName').value;
  comp.dot = document.getElementById('inlineCompDot').value;
  comp.mc = document.getElementById('inlineCompMc').value;
  comp.phone = document.getElementById('inlineCompPhone').value;
  comp.email = document.getElementById('inlineCompEmail').value;
  comp.physicalAddress = document.getElementById('inlineCompPhysical').value;
  comp.mailingAddress = document.getElementById('inlineCompMailing').value;
  
  window.isCompanyEditMode = false;
  renderCompanyProfile();
};

window.simulateAIParsing = function(btn) {
  const originalHtml = btn.innerHTML;
  btn.innerHTML = 'AI Parsing Document...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    alert('AI has successfully parsed the document and populated the charges!');
  }, 2000);
};

window.toggleChargeApplied = function(code) {
  const data = companyProfileData[activeCompanyId];
  if (!data.charges) return;
  const charge = data.charges.find(c => c.code === code);
  if (charge) {
    charge.applied = !charge.applied;
    // We can do a direct DOM update instead of full render to prevent jumping, but since the list of charges is small, a full render is acceptable. However, for a better UX let's try direct DOM if possible.
    renderCompanyProfile();
  }
};

window.updateChargeAmount = function(code, val) {
  const data = companyProfileData[activeCompanyId];
  if (!data.charges) return;
  const charge = data.charges.find(c => c.code === code);
  if (charge) {
    charge.amount = parseFloat(val) || 0;
  }
};

window.searchCpCharges = function(query) {
  const filter = query.toLowerCase();
  const rows = document.querySelectorAll('.charge-row');
  
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(filter)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
};

window.openAddChargeModal = function() {
  document.getElementById('newChargeCode').value = '';
  document.getElementById('newChargeDesc').value = '';
  document.getElementById('newChargeAmt').value = '';
  document.getElementById('newChargeFreq').value = '';
  document.getElementById('addCustomChargeModal').style.display = 'flex';
};

window.closeAddChargeModal = function() {
  document.getElementById('addCustomChargeModal').style.display = 'none';
};

window.saveNewCustomCharge = function() {
  const code = document.getElementById('newChargeCode').value.trim();
  const name = document.getElementById('newChargeDesc').value.trim();
  const amt = document.getElementById('newChargeAmt').value.trim();
  const freq = document.getElementById('newChargeFreq').value.trim();
  
  if (!code || !name) {
    alert("Code and Description are required.");
    return;
  }
  
  const data = companyProfileData[activeCompanyId];
  if (!data.charges) data.charges = [];
  data.charges.push({
    category: "Custom Charges",
    code: code,
    name: name,
    amount: parseFloat(amt) || 0,
    frequency: freq || 'Per Occurrence',
    applied: true
  });
  
  closeAddChargeModal();
  renderCompanyProfile();
};
