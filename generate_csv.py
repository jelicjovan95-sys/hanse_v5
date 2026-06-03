import csv
import os

# Define data for each sheet

sheet1 = [
    ["CRM Field", "CRM Storage Key", "Category", "Primary Source Document", "Exact Field In Document", "Lead Card Location", "Master Safety Dashboard Location", "Used For Compliance", "Used For Safety Score", "Calculated Field", "Notes"],
    ["First Name", "firstName", "Identity", "CDL", "First Name", "Driver Header", "Driver List", "No", "No", "No", "Extracted from CDL to ensure legal spelling"],
    ["Last Name", "lastName", "Identity", "CDL", "Last Name", "Driver Header", "Driver List", "No", "No", "No", "Single source of truth"],
    ["Date Of Birth", "dob", "Identity", "CDL", "Date of Birth (DOB)", "Driver Summary", "-", "Yes", "No", "No", "Checked for age requirements"],
    ["Address (Street)", "address", "Contact", "CDL", "Address", "Driver Summary", "-", "No", "No", "No", "Address from CDL"],
    ["City", "city", "Contact", "CDL", "City", "Driver Summary", "-", "No", "No", "No", "Derived from CDL"],
    ["State", "state", "Contact", "CDL", "State", "Driver Summary", "-", "No", "No", "No", "Derived from CDL"],
    ["Zip Code", "zipCode", "Contact", "CDL", "Zip Code", "Driver Summary", "-", "No", "No", "No", "Derived from CDL"],
    ["Social Security Number", "ssn", "Identity", "SSN Card", "Social Security Number", "Driver Summary", "-", "Yes", "No", "No", "Used for background checks"],
    ["CDL Number", "cdl_number", "License", "CDL", "License/DL Number", "License Section", "Compliance Widget", "Yes", "No", "No", "Primary identifier"],
    ["CDL State", "cdl_state", "License", "CDL", "State of Issuance", "License Section", "Compliance Widget", "Yes", "No", "No", "Issuing authority"],
    ["CDL Expiration Date", "cdl_expiration", "License", "CDL", "Expiration Date", "License Section", "Document Warnings", "Yes", "No", "No", "Triggers expiration alerts"],
    ["CDL Class", "cdl_class", "License", "CDL", "Class", "License Section", "Compliance Widget", "Yes", "No", "No", "Must be Class A"],
    ["Endorsements", "endorsements", "License", "CDL", "Endorsements", "License Section", "-", "Yes", "No", "No", "e.g. Hazmat, Tanker"],
    ["Restrictions", "restrictions", "License", "CDL", "Restrictions", "License Section", "-", "Yes", "No", "No", "e.g. Auto only"],
    ["Medical Expiration Date", "medical_expiration", "Medical", "Medical Cert", "Expiration Date", "Medical Section", "Document Warnings", "Yes", "No", "No", "Critical compliance tracking"],
    ["Medical Examiner Registry", "med_examiner_reg", "Medical", "Medical Cert", "National Registry No.", "Medical Section", "-", "Yes", "No", "No", "Verification of doctor"],
    ["License Status", "license_status", "Safety", "MVR", "License Status", "Safety Section", "Compliance Widget", "Yes", "Yes", "No", "Valid/Suspended/Revoked"],
    ["Violation Count", "violation_count", "Safety", "MVR", "Number of Violations", "Safety Section", "Safety Score Widget", "No", "Yes", "Yes", "Counted from MVR records"],
    ["Accident Count", "accident_count", "Safety", "MVR", "Number of Accidents", "Safety Section", "Safety Score Widget", "No", "Yes", "Yes", "Counted from MVR records"],
    ["Points", "mvr_points", "Safety", "MVR", "Points on License", "Safety Section", "Safety Score Widget", "No", "Yes", "No", "State specific point system"],
    ["PSP Violations", "psp_violations", "Safety", "PSP Report", "Violation Count", "Safety Section", "Safety Score Widget", "No", "Yes", "Yes", "Federal inspections"],
    ["Crash Data", "psp_crashes", "Safety", "PSP Report", "Crash Count", "Safety Section", "Safety Score Widget", "No", "Yes", "Yes", "DOT recordable crashes"],
    ["Clearinghouse Status", "clearinghouse_status", "Compliance", "Clearinghouse", "Status", "Medical Section", "Compliance Widget", "Yes", "No", "No", "Prohibited / Not Prohibited"],
    ["Safety Score", "safety_score", "Safety", "Calculated", "N/A", "Safety Section", "Safety Leaderboard", "No", "Yes", "Yes", "Calculated from Violations/Accidents"],
    ["Risk Level", "risk_level", "Safety", "Calculated", "N/A", "Driver Header", "Driver Safety Ranking", "No", "Yes", "Yes", "High/Medium/Low based on Score"],
    ["Email", "email", "Contact", "Application", "Email Address", "Driver Summary", "-", "No", "No", "No", "Manual entry or application"],
    ["Phone Number", "phone", "Contact", "Application", "Phone Number", "Driver Summary", "-", "No", "No", "No", "Manual entry or application"],
    ["Years of Experience", "yearsExperience", "Experience", "Application", "Years Experience", "Driver Summary", "-", "Yes", "No", "No", "Hiring qualification"]
]

sheet2 = [
    ["Document Type", "Fields Used", "Fields Ignored", "Reason Ignored"],
    ["CDL", "First Name, Last Name, DOB, Address, City, State, Zip Code, CDL Number, CDL State, CDL Expiration, CDL Class, Endorsements, Restrictions", "None", "CDL is the primary source of truth for identity and license data."],
    ["Social Security Card", "Social Security Number", "Name", "Name is already assigned from CDL."],
    ["Medical Certificate", "Medical Expiration Date, Medical Examiner Registry", "Name, Address, CDL Number", "Identity and License info already assigned from CDL."],
    ["MVR", "License Status, Violation Count, Accident Count, Points", "Name, DOB, Address, CDL Number, Expiration", "Identity and License info already assigned from CDL."],
    ["PSP Report", "PSP Violations, Crash Data", "Name, DOB, License Number", "Identity and License info already assigned from CDL."],
    ["Clearinghouse Report", "Clearinghouse Status", "Name, DOB, CDL Number", "Identity and License info already assigned from CDL."],
    ["Driver Application", "Email, Phone Number, Years of Experience", "Name, Address, DOB, CDL Number", "Identity and License info already assigned from CDL."]
]

sheet3 = [
    ["Lead Card Section", "CRM Field", "Source Document", "CRM Key", "Purpose"],
    ["Driver Header", "First Name", "CDL", "firstName", "Identification"],
    ["Driver Header", "Last Name", "CDL", "lastName", "Identification"],
    ["Driver Header", "Risk Level", "Calculated", "risk_level", "Quick visual safety indicator"],
    ["Driver Summary", "Date Of Birth", "CDL", "dob", "Identity / Age Verification"],
    ["Driver Summary", "Phone Number", "Application", "phone", "Communication"],
    ["Driver Summary", "Email", "Application", "email", "Communication"],
    ["Driver Summary", "Address", "CDL", "address", "Residence location"],
    ["Driver Summary", "Social Security Number", "SSN Card", "ssn", "Background check ID"],
    ["Driver Summary", "Years of Experience", "Application", "yearsExperience", "Hiring qualification"],
    ["License Section", "CDL Number", "CDL", "cdl_number", "Core license tracking"],
    ["License Section", "CDL State", "CDL", "cdl_state", "Jurisdiction"],
    ["License Section", "CDL Expiration Date", "CDL", "cdl_expiration", "Compliance monitoring"],
    ["License Section", "Endorsements", "CDL", "endorsements", "Freight capabilities"],
    ["License Section", "Restrictions", "CDL", "restrictions", "Operational limits"],
    ["Medical Section", "Medical Expiration Date", "Medical Cert", "medical_expiration", "Compliance monitoring"],
    ["Medical Section", "Clearinghouse Status", "Clearinghouse", "clearinghouse_status", "Drug/Alcohol compliance"],
    ["Safety Section", "License Status", "MVR", "license_status", "Legal driving status"],
    ["Safety Section", "Violation Count", "MVR", "violation_count", "Safety analysis"],
    ["Safety Section", "Accident Count", "MVR", "accident_count", "Safety analysis"],
    ["Safety Section", "Safety Score", "Calculated", "safety_score", "Overall driver rating"]
]

sheet4 = [
    ["Dashboard Widget", "CRM Field", "Source Document", "Calculation Logic", "Purpose"],
    ["Safety Score Widget", "Safety Score", "Calculated", "100 - (Violations * 10) - (Accidents * 20)", "Overall fleet health"],
    ["Document Warnings", "CDL Expiration Date", "CDL", "Current Date > CDL Expiration - 30 days", "Expiration prevention"],
    ["Document Warnings", "Medical Expiration Date", "Medical Cert", "Current Date > Med Expiration - 30 days", "Expiration prevention"],
    ["Compliance Widget", "License Status", "MVR", "If Status != 'Valid' -> Non-Compliant", "Immediate grounding"],
    ["Compliance Widget", "Clearinghouse Status", "Clearinghouse", "If Status == 'Prohibited' -> Non-Compliant", "Immediate grounding"],
    ["Driver Safety Ranking", "Risk Level", "Calculated", "Score > 80 (Low), < 60 (High)", "Identify high-risk drivers"],
    ["Safety Leaderboard", "Violation Count", "MVR", "Sum of violations per driver", "Identify worst offenders"],
    ["Safety Leaderboard", "Accident Count", "MVR", "Sum of accidents per driver", "Identify worst offenders"]
]

sheet5 = [
    ["CRM Field", "Source Document", "Dashboard Usage"],
    ["Violation Count", "MVR", "Safety Score Widget, Safety Leaderboard"],
    ["Accident Count", "MVR", "Safety Score Widget, Safety Leaderboard"],
    ["Points", "MVR", "Safety Score Widget"],
    ["PSP Violations", "PSP Report", "Safety Score Widget, Safety Leaderboard"],
    ["Crash Data", "PSP Report", "Safety Score Widget, Safety Leaderboard"],
    ["License Status", "MVR", "Driver Safety Ranking"]
]

sheet6 = [
    ["CRM Field", "Source Document", "Reason"],
    ["CDL Expiration Date", "CDL", "Cannot dispatch with expired license."],
    ["Medical Expiration Date", "Medical Cert", "Cannot dispatch without valid medical."],
    ["License Status", "MVR", "Suspended/Revoked licenses are strictly prohibited."],
    ["Clearinghouse Status", "Clearinghouse", "Prohibited status prevents dispatch."],
    ["CDL Class", "CDL", "Must be Class A for tractor-trailers."]
]

sheet7 = [
    ["CRM Field", "Status", "Notes"],
    ["Phone Number", "Requires Manual/App Entry", "Not present on CDL or MVR."],
    ["Email", "Requires Manual/App Entry", "Not present on official documents."],
    ["Years of Experience", "Requires Manual/App Entry", "Found in application, not on state documents."],
    ["Truck Details (Make, Model)", "Missing Document", "Requires Truck Registration/Inspection documents."],
    ["Pay Type (1099/W2)", "Requires Manual Entry", "Internal business logic."]
]

sheet8 = [
    ["Metric", "Value"],
    ["Total Lead Card Fields", "20"],
    ["Total Master Safety Dashboard Fields", "8"],
    ["Total Unique CRM Fields", "28"],
    ["Duplicate Fields Eliminated", "12"],
    ["Fields Missing Source Documents", "5"],
    ["Fields Requiring Manual Entry", "5"]
]

sheets = {
    '1_Master_Field_Mapping.csv': sheet1,
    '2_Document_Contribution.csv': sheet2,
    '3_Lead_Card_Inventory.csv': sheet3,
    '4_Master_Safety_Inventory.csv': sheet4,
    '5_Safety_Score_Inputs.csv': sheet5,
    '6_Compliance_Inputs.csv': sheet6,
    '7_Missing_Data_Report.csv': sheet7,
    '8_Validation_Report.csv': sheet8
}

os.makedirs('CRM_Field_Mapping_Excel', exist_ok=True)

for filename, data in sheets.items():
    filepath = os.path.join('CRM_Field_Mapping_Excel', filename)
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerows(data)

print("CSV files generated successfully!")
