/**
 * Form Configuration for Lead Card Modal
 * Data-driven structure for all department sections
 */

const FORM_CONFIG = {
    // ======================
    // RECRUITING
    // ======================
    recruiting: {
        id: 'recruiting',
        icon: '👥',
        title: 'Recruiting',
        subtitle: 'Personal & Driver Information',
        progressFields: ['firstName', 'lastName', 'email', 'phone', 'homeTown', 'category', 'yearsExperience', 'targetMileage', 'homeFrequency', 'certifications', 'driverQuote'],

        sections: [
            {
                title: 'Personal Info',
                fields: [
                    { type: 'text', label: 'First Name', key: 'firstName', required: true },
                    { type: 'text', label: 'Last Name', key: 'lastName', required: true },
                    { type: 'email', label: 'Email', key: 'email', required: true },
                    { type: 'phone', label: 'Phone Number', key: 'phone', required: true },
                    { type: 'text', label: 'Home Town', key: 'homeTown' }
                ]
            },
            {
                title: 'Driver Intake',
                fields: [
                    { type: 'dropdown', label: 'Driver Type', key: 'category', options: ['OTR', 'Regional', 'Local', 'Owner Operator'], required: true },
                    { type: 'dropdown', label: 'Pay Type', key: 'payType', options: ['W2', '1099'], required: true },
                    { type: 'number', label: 'Years of Experience', key: 'yearsExperience', required: true },
                    { type: 'number', label: 'Target Mileage Per Week', key: 'targetMileage' },
                    { type: 'dropdown', label: 'Home Frequency', key: 'homeFrequency', options: ['Every day', 'Once per week', 'Every other week', 'Once per month', 'Month+'] },
                    { type: 'text', label: 'Extra Certificates (Hazmat, Tanker, TWIC, etc)', key: 'certifications' },
                    { type: 'currency', label: 'Driver Gross Quote', key: 'driverQuote' }
                ]
            }
        ]
    },

    // ======================
    // SAFETY / COMPLIANCE
    // ======================
    safety: {
        id: 'safety',
        icon: '🛡️',
        title: 'Safety / Compliance',
        subtitle: 'Documents, Background & Drug Testing',
        progressFields: ['driverLicense', 'medicalCard', 'ssn', 'ssnDoc', 'jobApp', 'jobAppPDF', 'mvrReport', 'clearinghouse', 'backgroundCheck', 'safetyPolicy', 'drugTestScheduled', 'drugTestCompleted', 'drugTestResult', 'driverApproved'],

        sections: [
            {
                title: 'Driver Documents',
                fields: [
                    { type: 'upload', label: 'Driver License', key: 'driverLicense', required: true },
                    { type: 'checkbox', label: 'Driver License Verified', key: 'dlVerified' },
                    { type: 'upload', label: 'Medical Card', key: 'medicalCard', required: true },
                    { type: 'date', label: 'Medical Card Expiration', key: 'medicalCardExp', required: true },
                    { type: 'secure', label: 'SSN', key: 'ssn', required: true },
                    { type: 'upload', label: 'SSN Document', key: 'ssnDoc', required: true }
                ]
            },
            {
                title: 'Application & Background',
                fields: [
                    { type: 'url', label: 'Job Application Link', key: 'jobApp' },
                    { type: 'upload', label: 'Job Application PDF', key: 'jobAppPDF' },
                    { type: 'upload', label: 'MVR Report', key: 'mvrReport', required: true },
                    { type: 'dropdown', label: 'Clearinghouse Status', key: 'clearinghouse', options: ['Clear', 'Prohibited', 'Pending'], required: true },
                    { type: 'dropdown', label: 'Background Check Result', key: 'backgroundCheck', options: ['Pass', 'Fail', 'Pending'], required: true },
                    { type: 'checkbox', label: 'Safety Policy Signed', key: 'safetyPolicySigned' },
                    { type: 'upload', label: 'Safety Policy Document', key: 'safetyPolicy' },
                    { type: 'upload', label: 'Agreements Signed', key: 'agreements' }
                ]
            },
            {
                title: 'Drug & Alcohol Testing',
                fields: [
                    { type: 'date', label: 'Drug Test Scheduled', key: 'drugTestScheduled', required: true },
                    { type: 'upload', label: 'Drug Test Schedule Document', key: 'drugTestScheduleDoc' },
                    { type: 'date', label: 'Drug Test Completed', key: 'drugTestCompleted' },
                    { type: 'dropdown', label: 'Drug Test Result', key: 'drugTestResult', options: ['Pass', 'Fail', 'Pending'] },
                    { type: 'upload', label: 'FedEx Tracking Document', key: 'fedexDoc' }
                ]
            },
            {
                title: 'Approval',
                fields: [
                    { type: 'dropdown', label: 'Driver Approved', key: 'driverApproved', options: ['Approved', 'Pending', 'Rejected'], required: true }
                ]
            }
        ]
    },

    // ======================
    // FLEET
    // ======================
    fleet: {
        id: 'fleet',
        icon: '🚛',
        title: 'Fleet',
        subtitle: 'Truck & Trailer Assignment',
        progressFields: ['unitNumber', 'vin', 'truckMake', 'truckModel', 'truckYear', 'truckMileage', 'dotInspection', 'registration', 'cabCard', 'insuranceCOI', 'eldInstalled'],
        lockCondition: (lead) => lead.driverApproved !== 'Approved', // Locked until driver approved

        sections: [
            {
                title: 'Truck Assignment',
                fields: [
                    { type: 'text', label: 'Unit Number', key: 'unitNumber', required: true },
                    { type: 'text', label: 'VIN', key: 'vin', required: true },
                    { type: 'text', label: 'Make', key: 'truckMake', required: true },
                    { type: 'text', label: 'Model', key: 'truckModel', required: true },
                    { type: 'number', label: 'Year', key: 'truckYear', required: true },
                    { type: 'number', label: 'Mileage', key: 'truckMileage', required: true },
                    { type: 'date', label: 'DOT Inspection Expiration', key: 'dotInspection', required: true },
                    { type: 'upload', label: 'DOT Inspection Document', key: 'dotInspectionDoc' },
                    { type: 'upload', label: 'Registration', key: 'registration', required: true },
                    { type: 'upload', label: 'Cab Card', key: 'cabCard', required: true },
                    { type: 'upload', label: 'Insurance COI', key: 'insuranceCOI', required: true },
                    { type: 'upload', label: 'State Permits', key: 'statePermits' },
                    { type: 'checkbox', label: 'ELD Installed', key: 'eldInstalled', required: true }
                ]
            },
            {
                title: 'Trailer',
                fields: [
                    { type: 'dropdown', label: 'Trailer Assigned (Live Inventory)', key: 'trailerAssigned', options: ['Trailer-001', 'Trailer-002', 'Trailer-003'] },
                    { type: 'text', label: 'Make', key: 'trailerMake' },
                    { type: 'text', label: 'Model', key: 'trailerModel' },
                    { type: 'number', label: 'Year', key: 'trailerYear' },
                    { type: 'date', label: 'DOT Inspection', key: 'trailerDotInspection' },
                    { type: 'upload', label: 'DOT Inspection Document', key: 'trailerDotInspectionDoc' },
                    { type: 'upload', label: 'Registration', key: 'trailerRegistration' }
                ]
            }
        ]
    },

    // ======================
    // ACCOUNTING
    // ======================
    accounting: {
        id: 'accounting',
        icon: '💰',
        title: 'Accounting',
        subtitle: 'Payroll & Financial Information',
        progressFields: ['bankingInfo', 'w9w4Forms', 'statements', 'unitPictures'],
        lockCondition: (lead) => !lead.unitNumber || !lead.vin, // Locked until fleet assigned

        sections: [
            {
                title: 'Payroll & Finance',
                fields: [
                    { type: 'secure', label: 'Banking Information (Encrypted)', key: 'bankingInfo', required: true },
                    { type: 'upload', label: 'W9 / W4 Forms', key: 'w9w4Forms', required: true },
                    { type: 'upload', label: 'Statements', key: 'statements' },
                    { type: 'upload', label: 'Unit Pictures', key: 'unitPictures' }
                ]
            }
        ]
    }
};

/**
 * Generate HTML for a department section from config
 * @param {Object} deptConfig - Department configuration
 * @param {Object} leadData - Lead data
 * @returns {String} HTML string
 */
function generateDepartmentHTML(deptConfig, leadData) {
    const isLocked = deptConfig.lockCondition ? deptConfig.lockCondition(leadData) : false;
    const progress = calculateDeptProgress(deptConfig.progressFields, leadData);

    let contentHTML = '';

    deptConfig.sections.forEach(section => {
        if (section.title) {
            contentHTML += `<div class="section-title" style="margin-top:20px;margin-bottom:12px;font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;">${section.title}</div>`;
        }

        section.fields.forEach(field => {
            const value = leadData[field.key] || '';

            switch (field.type) {
                case 'text':
                    contentHTML += FormFields.text(field.label, value, field.required);
                    break;
                case 'email':
                    contentHTML += FormFields.email(field.label, value, field.required);
                    break;
                case 'phone':
                    contentHTML += FormFields.phone(field.label, value, field.required);
                    break;
                case 'number':
                    contentHTML += FormFields.number(field.label, value, field.required);
                    break;
                case 'currency':
                    contentHTML += FormFields.currency(field.label, value, field.required);
                    break;
                case 'date':
                    contentHTML += FormFields.date(field.label, value, field.required);
                    break;
                case 'dropdown':
                    contentHTML += FormFields.dropdown(field.label, field.options, value, field.required);
                    break;
                case 'secure':
                    contentHTML += FormFields.secure(field.label, value, field.required);
                    break;
                case 'upload':
                    contentHTML += FormFields.upload(field.label, field.required);
                    break;
                case 'checkbox':
                    contentHTML += FormFields.checkbox(field.label, value);
                    break;
                case 'url':
                    contentHTML += FormFields.url(field.label, value, field.required);
                    break;
            }
        });
    });

    return createDeptSection(
        deptConfig.id,
        deptConfig.icon,
        deptConfig.title,
        deptConfig.subtitle,
        progress,
        contentHTML,
        isLocked
    );
}

/**
 * Generate complete form HTML from configuration
 * @param {Object} leadData - Lead data
 * @returns {String} Complete form HTML
 */
function generateCompleteForm(leadData) {
    return (
        generateDepartmentHTML(FORM_CONFIG.recruiting, leadData) +
        generateDepartmentHTML(FORM_CONFIG.safety, leadData) +
        generateDepartmentHTML(FORM_CONFIG.fleet, leadData) +
        generateDepartmentHTML(FORM_CONFIG.accounting, leadData)
    );
}
