/**
 * Lead Field Schema - Single Source of Truth for Filter Generation
 * 
 * This schema defines all filterable fields from the lead card.
 * Any field added here automatically gets a corresponding filter UI.
 */

const LeadFieldSchema = [
    // ========================================
    // PERSONAL INFO SECTION
    // ========================================
    {
        key: 'firstName',
        label: 'First Name',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'lastName',
        label: 'Last Name',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'email',
        label: 'Email',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'phone',
        label: 'Phone Number',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'homeTown',
        label: 'Home Town',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'city',
        label: 'City',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'state',
        label: 'State',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'zipCode',
        label: 'Zip Code',
        type: 'text',
        group: 'Personal Info',
        isSearchable: true,
        isVisibleInExpandView: true
    },

    // ========================================
    // DRIVER INTAKE SECTION
    // ========================================
    {
        key: 'category',
        label: 'Category',
        type: 'enum',
        options: ['Independent Contractor', 'Company Driver', 'ECT'],
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'driverType',
        label: 'Driver Type',
        type: 'enum',
        options: ['OTR', 'Regional', 'Local', 'Owner Operator'],
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'payType',
        label: 'Pay Type',
        type: 'enum',
        options: ['W2', '1099'],
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'yearsExperience',
        label: 'Years of Experience',
        type: 'number',
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'targetMileage',
        label: 'Target Mileage Per Week',
        type: 'number',
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'homeFrequency',
        label: 'Home Frequency',
        type: 'enum',
        options: ['Every day', 'Once per week', 'Every other week', 'Once per month', 'Month+'],
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'certifications',
        label: 'Certifications',
        type: 'text',
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'driverQuote',
        label: 'Driver Quote',
        type: 'text',
        group: 'Driver Intake',
        isSearchable: true,
        isVisibleInExpandView: true
    },

    // ========================================
    // STAGE / STATUS SECTION
    // ========================================
    {
        key: 'recruitingStage',
        label: 'Recruiting Stage',
        type: 'enum',
        options: ['New Lead', 'Follow Up', 'In Progress', 'Active Drivers', 'Pending Removal'],
        group: 'Stage / Status',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'safetyStage',
        label: 'Safety Stage',
        type: 'enum',
        options: ['Not Started', 'Pending Review', 'Docs Submitted', 'In Review', 'MVR Check', 'Pending Results', 'Approved'],
        group: 'Stage / Status',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'fleetStage',
        label: 'Fleet Stage',
        type: 'enum',
        options: ['Not Started', 'Waiting', 'Assigned', 'Trailer Setup'],
        group: 'Stage / Status',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'accountingStage',
        label: 'Accounting Stage',
        type: 'enum',
        options: ['Pending', 'Payroll Ready', 'Complete'],
        group: 'Stage / Status',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'driverApproved',
        label: 'Driver Approved',
        type: 'enum',
        options: ['Approved', 'Pending', 'Rejected'],
        group: 'Stage / Status',
        isSearchable: true,
        isVisibleInExpandView: true
    },

    // ========================================
    // SAFETY / COMPLIANCE SECTION
    // ========================================
    {
        key: 'dlVerified',
        label: 'DL Verified',
        type: 'boolean',
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'medicalCardExp',
        label: 'Medical Card Expiration',
        type: 'date',
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'clearinghouse',
        label: 'Clearinghouse Status',
        type: 'enum',
        options: ['Clear', 'Prohibited', 'Pending'],
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'backgroundCheck',
        label: 'Background Check',
        type: 'enum',
        options: ['Pass', 'Fail', 'Pending'],
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'safetyPolicySigned',
        label: 'Safety Policy Signed',
        type: 'boolean',
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'drugTestScheduled',
        label: 'Drug Test Scheduled',
        type: 'date',
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'drugTestCompleted',
        label: 'Drug Test Completed',
        type: 'date',
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'drugTestResult',
        label: 'Drug Test Result',
        type: 'enum',
        options: ['Pass', 'Fail', 'Pending'],
        group: 'Safety / Compliance',
        isSearchable: true,
        isVisibleInExpandView: true
    },

    // ========================================
    // FLEET SECTION
    // ========================================
    {
        key: 'unitNumber',
        label: 'Unit Number',
        type: 'text',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'vin',
        label: 'VIN',
        type: 'text',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'truckMake',
        label: 'Truck Make',
        type: 'text',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'truckModel',
        label: 'Truck Model',
        type: 'text',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'truckYear',
        label: 'Truck Year',
        type: 'number',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'truckMileage',
        label: 'Truck Mileage',
        type: 'number',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'dotInspection',
        label: 'DOT Inspection Expiration',
        type: 'date',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'eldInstalled',
        label: 'ELD Installed',
        type: 'boolean',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },
    {
        key: 'trailerAssigned',
        label: 'Trailer Assigned',
        type: 'text',
        group: 'Fleet',
        isSearchable: true,
        isVisibleInExpandView: true
    },

    // ========================================
    // DATES / TIMESTAMPS
    // ========================================
    {
        key: 'timestamp',
        label: 'Created At',
        type: 'date',
        group: 'Dates',
        isSearchable: true,
        isVisibleInExpandView: true
    }
];

/**
 * Get all unique filter groups from the schema
 */
function getFilterGroups() {
    const groups = [...new Set(LeadFieldSchema.map(field => field.group))];
    return groups;
}

/**
 * Get all fields for a specific group
 */
function getFieldsByGroup(groupName) {
    return LeadFieldSchema.filter(field => field.group === groupName);
}

/**
 * Get field schema by key
 */
function getFieldSchema(key) {
    return LeadFieldSchema.find(field => field.key === key);
}
