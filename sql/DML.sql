-- Music Festival Management System
-- Data Manipulation Queries (DML)
-- Group: 42
-- Team Members: Suvam Patel, Kennet Sieu
-- Date: 11/3/2025



-- 1. FESTIVALS QUERIES


-- get all Festivals for the Browse Festivals page
SELECT festivalID, festivalName, startDate, endDate, location, 
       expectedAttendance, budget, ticketPrice 
FROM festivals
ORDER BY startDate;

-- get a single Festival's data for the Update Festival form
SELECT festivalID, festivalName, startDate, endDate, location, 
       expectedAttendance, budget, ticketPrice 
FROM festivals 
WHERE festivalID = :festivalID_selected_from_browse_festivals_page;

-- get all Festivals to populate dropdown menus (used in Stages, VendorAssignments, etc.)
SELECT festivalID, festivalName 
FROM festivals 
ORDER BY festivalName;

-- add a new Festival
INSERT INTO festivals (festivalName, startDate, endDate, location, 
                       expectedAttendance, budget, ticketPrice)
VALUES (:festivalNameInput, :startDateInput, :endDateInput, :locationInput,
        :expectedAttendanceInput, :budgetInput, :ticketPriceInput);

-- update a Festival's data based on submission of the Update Festival form
UPDATE festivals 
SET festivalName = :festivalNameInput,
    startDate = :startDateInput,
    endDate = :endDateInput,
    location = :locationInput,
    expectedAttendance = :expectedAttendanceInput,
    budget = :budgetInput,
    ticketPrice = :ticketPriceInput
WHERE festivalID = :festivalID_from_update_form;

-- delete a Festival
DELETE FROM festivals 
WHERE festivalID = :festivalID_selected_from_browse_festivals_page;


-- 2. ARTISTS QUERIES


-- get all Artists for the Browse Artists page
SELECT artistID, artistName, genre, bookingFee, contactEmail, 
       contactPhone, country, websiteURL 
FROM artists
ORDER BY artistName;

-- get a single Artist's data for the Update Artist form
SELECT artistID, artistName, genre, bookingFee, contactEmail, 
       contactPhone, country, websiteURL 
FROM artists 
WHERE artistID = :artistID_selected_from_browse_artists_page;

-- get all Artists to populate dropdown menus (used in Performances)
SELECT artistID, artistName 
FROM artists 
ORDER BY artistName;

-- add a new Artist
INSERT INTO artists (artistName, genre, bookingFee, contactEmail, 
                     contactPhone, country, websiteURL)
VALUES (:artistNameInput, :genreInput, :bookingFeeInput, :contactEmailInput,
        :contactPhoneInput, :countryInput, :websiteURLInput);

-- update an Artist's data based on submission of the Update Artist form
UPDATE artists 
SET artistName = :artistNameInput,
    genre = :genreInput,
    bookingFee = :bookingFeeInput,
    contactEmail = :contactEmailInput,
    contactPhone = :contactPhoneInput,
    country = :countryInput,
    websiteURL = :websiteURLInput
WHERE artistID = :artistID_from_update_form;

-- delete an Artist
DELETE FROM artists 
WHERE artistID = :artistID_selected_from_browse_artists_page;


-- 3. STAGES QUERIES


-- get all Stages with Festival information for the Browse Stages page
SELECT s.stageID, s.stageName, s.capacity, s.stageType, 
       s.locationDescription, s.hasCover, 
       f.festivalID, f.festivalName
FROM stages s
INNER JOIN festivals f ON s.festivalID = f.festivalID
ORDER BY f.festivalName, s.stageName;

-- get a single Stage's data for the Update Stage form
SELECT stageID, festivalID, stageName, capacity, stageType, 
       locationDescription, hasCover 
FROM stages 
WHERE stageID = :stageID_selected_from_browse_stages_page;

-- get all Stages to populate dropdown menus (used in Performances)
SELECT s.stageID, s.stageName, f.festivalName
FROM stages s
INNER JOIN festivals f ON s.festivalID = f.festivalID
ORDER BY f.festivalName, s.stageName;

-- add a new Stage
INSERT INTO stages (festivalID, stageName, capacity, stageType, 
                   locationDescription, hasCover)
VALUES (:festivalID_from_dropdown, :stageNameInput, :capacityInput, 
        :stageTypeInput, :locationDescriptionInput, :hasCoverInput);

-- update a Stage's data based on submission of the Update Stage form
UPDATE stages 
SET festivalID = :festivalID_from_dropdown,
    stageName = :stageNameInput,
    capacity = :capacityInput,
    stageType = :stageTypeInput,
    locationDescription = :locationDescriptionInput,
    hasCover = :hasCoverInput
WHERE stageID = :stageID_from_update_form;

-- delete a Stage
DELETE FROM stages 
WHERE stageID = :stageID_selected_from_browse_stages_page;


-- 4. VENDORS QUERIES


-- get all Vendors for the Browse Vendors page
SELECT vendorID, vendorName, vendorType, contactEmail, 
       contactPhone, businessLicense 
FROM vendors
ORDER BY vendorName;

-- get a single Vendor's data for the Update Vendor form
SELECT vendorID, vendorName, vendorType, contactEmail, 
       contactPhone, businessLicense 
FROM vendors 
WHERE vendorID = :vendorID_selected_from_browse_vendors_page;

-- get all Vendors to populate dropdown menus (used in VendorAssignments)
SELECT vendorID, vendorName, vendorType 
FROM vendors 
ORDER BY vendorName;

-- add a new Vendor
INSERT INTO vendors (vendorName, vendorType, contactEmail, 
                    contactPhone, businessLicense)
VALUES (:vendorNameInput, :vendorTypeInput, :contactEmailInput,
        :contactPhoneInput, :businessLicenseInput);

-- update a Vendor's data based on submission of the Update Vendor form
UPDATE vendors 
SET vendorName = :vendorNameInput,
    vendorType = :vendorTypeInput,
    contactEmail = :contactEmailInput,
    contactPhone = :contactPhoneInput,
    businessLicense = :businessLicenseInput
WHERE vendorID = :vendorID_from_update_form;

-- delete a Vendor
DELETE FROM vendors 
WHERE vendorID = :vendorID_selected_from_browse_vendors_page;


-- 5. SPONSORS QUERIES


-- get all Sponsors for the Browse Sponsors page
SELECT sponsorID, sponsorName, industry, contactEmail, 
       contactPhone, websiteURL 
FROM sponsors
ORDER BY sponsorName;

-- get a single Sponsor's data for the Update Sponsor form
SELECT sponsorID, sponsorName, industry, contactEmail, 
       contactPhone, websiteURL 
FROM sponsors 
WHERE sponsorID = :sponsorID_selected_from_browse_sponsors_page;

-- get all Sponsors to populate dropdown menus (used in Sponsorships)
SELECT sponsorID, sponsorName 
FROM sponsors 
ORDER BY sponsorName;

-- add a new Sponsor
INSERT INTO sponsors (sponsorName, industry, contactEmail, 
                     contactPhone, websiteURL)
VALUES (:sponsorNameInput, :industryInput, :contactEmailInput,
        :contactPhoneInput, :websiteURLInput);

-- update a Sponsor's data based on submission of the Update Sponsor form
UPDATE sponsors 
SET sponsorName = :sponsorNameInput,
    industry = :industryInput,
    contactEmail = :contactEmailInput,
    contactPhone = :contactPhoneInput,
    websiteURL = :websiteURLInput
WHERE sponsorID = :sponsorID_from_update_form;

-- delete a Sponsor
DELETE FROM sponsors 
WHERE sponsorID = :sponsorID_selected_from_browse_sponsors_page;


-- 6. STAFF QUERIES


-- get all Staff for the Browse Staff page
SELECT staffID, firstName, lastName, email, phone, role, hourlyRate
FROM staff
ORDER BY lastName, firstName;

-- get a single Staff member's data for the Update Staff form
SELECT staffID, firstName, lastName, email, phone, role, hourlyRate
FROM staff 
WHERE staffID = :staffID_selected_from_browse_staff_page;

-- get all Staff members to populate dropdown menus (used in StaffAssignments)
SELECT staffID, CONCAT(firstName, ' ', lastName) AS staffName, role
FROM staff
ORDER BY lastName, firstName;

-- add a new Staff member
INSERT INTO staff (firstName, lastName, email, phone, role, hourlyRate)
VALUES (:firstNameInput, :lastNameInput, :emailInput, 
        :phoneInput, :roleInput, :hourlyRateInput);

-- update a Staff member's data based on submission of the Update Staff form
UPDATE staff 
SET firstName = :firstNameInput,
    lastName = :lastNameInput,
    email = :emailInput,
    phone = :phoneInput,
    role = :roleInput,
    hourlyRate = :hourlyRateInput
WHERE staffID = :staffID_from_update_form;

-- delete a Staff member
DELETE FROM staff 
WHERE staffID = :staffID_selected_from_browse_staff_page;


-- 7. PERFORMANCES QUERIES (M:N between Artists and Stages)


-- get all Performances with Artist, Stage, and Festival information for the Browse Performances page
SELECT p.performanceID, p.performanceDate, p.startTime, p.endTime,
       p.setupNotes, p.soundcheckTime,
       a.artistID, a.artistName,
       s.stageID, s.stageName,
       f.festivalID, f.festivalName
FROM performances p
INNER JOIN artists a ON p.artistID = a.artistID
INNER JOIN stages s ON p.stageID = s.stageID
INNER JOIN festivals f ON s.festivalID = f.festivalID
ORDER BY p.performanceDate, p.startTime;

-- get a single Performance's data for the Update Performance form
SELECT performanceID, artistID, stageID, performanceDate, 
       startTime, endTime, setupNotes, soundcheckTime 
FROM performances 
WHERE performanceID = :performanceID_selected_from_browse_performances_page;

-- associate an Artist with a Stage (M-to-M relationship addition - schedule a performance)
INSERT INTO performances (artistID, stageID, performanceDate, startTime, 
                         endTime, setupNotes, soundcheckTime)
VALUES (:artistID_from_dropdown, :stageID_from_dropdown, :performanceDateInput, 
        :startTimeInput, :endTimeInput, :setupNotesInput, :soundcheckTimeInput);

-- update a Performance's data based on submission of the Update Performance form
UPDATE performances 
SET artistID = :artistID_from_dropdown,
    stageID = :stageID_from_dropdown,
    performanceDate = :performanceDateInput,
    startTime = :startTimeInput,
    endTime = :endTimeInput,
    setupNotes = :setupNotesInput,
    soundcheckTime = :soundcheckTimeInput
WHERE performanceID = :performanceID_from_update_form;

-- dis-associate an Artist from a Stage (M-to-M relationship deletion - cancel a performance)
DELETE FROM performances 
WHERE performanceID = :performanceID_selected_from_browse_performances_page;


-- 8. VENDOR ASSIGNMENTS QUERIES (M:N between Vendors and Festivals)


-- get all Vendor Assignments with Vendor and Festival information for the Browse Vendor Assignments page
SELECT va.assignmentID, va.boothNumber, va.registrationFee, va.assignmentDate,
       v.vendorID, v.vendorName, v.vendorType,
       f.festivalID, f.festivalName
FROM vendorAssignments va
INNER JOIN vendors v ON va.vendorID = v.vendorID
INNER JOIN festivals f ON va.festivalID = f.festivalID
ORDER BY f.festivalName, v.vendorName;

-- get a single Vendor Assignment's data for the Update Vendor Assignment form
SELECT assignmentID, vendorID, festivalID, boothNumber, 
       registrationFee, assignmentDate 
FROM vendorAssignments 
WHERE assignmentID = :assignmentID_selected_from_browse_vendor_assignments_page;

-- associate a Vendor with a Festival (M-to-M relationship addition)
INSERT INTO vendorAssignments (vendorID, festivalID, boothNumber, 
                               registrationFee, assignmentDate)
VALUES (:vendorID_from_dropdown, :festivalID_from_dropdown, :boothNumberInput,
        :registrationFeeInput, :assignmentDateInput);

-- update a Vendor Assignment's data based on submission of the Update Vendor Assignment form
UPDATE vendorAssignments 
SET vendorID = :vendorID_from_dropdown,
    festivalID = :festivalID_from_dropdown,
    boothNumber = :boothNumberInput,
    registrationFee = :registrationFeeInput,
    assignmentDate = :assignmentDateInput
WHERE assignmentID = :assignmentID_from_update_form;

-- dis-associate a Vendor from a Festival (M-to-M relationship deletion)
DELETE FROM vendorAssignments 
WHERE assignmentID = :assignmentID_selected_from_browse_vendor_assignments_page;


-- 9. SPONSORSHIPS QUERIES (M:N between Sponsors and Festivals)


-- get all Sponsorships with Sponsor and Festival information for the Browse Sponsorships page
SELECT sp.sponsorshipID, sp.sponsorshipAmount, sp.sponsorshipTier, 
       sp.contractDate, sp.benefits,
       s.sponsorID, s.sponsorName, s.industry,
       f.festivalID, f.festivalName
FROM sponsorships sp
INNER JOIN sponsors s ON sp.sponsorID = s.sponsorID
INNER JOIN festivals f ON sp.festivalID = f.festivalID
ORDER BY f.festivalName, s.sponsorName;

-- get a single Sponsorship's data for the Update Sponsorship form
SELECT sponsorshipID, sponsorID, festivalID, sponsorshipAmount, 
       sponsorshipTier, contractDate, benefits 
FROM sponsorships 
WHERE sponsorshipID = :sponsorshipID_selected_from_browse_sponsorships_page;

-- associate a Sponsor with a Festival (M-to-M relationship addition)
INSERT INTO sponsorships (sponsorID, festivalID, sponsorshipAmount, 
                         sponsorshipTier, contractDate, benefits)
VALUES (:sponsorID_from_dropdown, :festivalID_from_dropdown, :sponsorshipAmountInput,
        :sponsorshipTierInput, :contractDateInput, :benefitsInput);

-- update a Sponsorship's data based on submission of the Update Sponsorship form
UPDATE sponsorships 
SET sponsorID = :sponsorID_from_dropdown,
    festivalID = :festivalID_from_dropdown,
    sponsorshipAmount = :sponsorshipAmountInput,
    sponsorshipTier = :sponsorshipTierInput,
    contractDate = :contractDateInput,
    benefits = :benefitsInput
WHERE sponsorshipID = :sponsorshipID_from_update_form;

-- dis-associate a Sponsor from a Festival (M-to-M relationship deletion)
DELETE FROM sponsorships 
WHERE sponsorshipID = :sponsorshipID_selected_from_browse_sponsorships_page;


-- 10. STAFF ASSIGNMENTS QUERIES (M:N between Staff and Festivals)


-- get all Staff Assignments with Staff, Role, and Festival information for the Browse Staff Assignments page
SELECT sa.staffAssignmentID, sa.assignedDate, sa.hoursWorked, sa.shiftNotes,
       st.staffID, CONCAT(st.firstName, ' ', st.lastName) AS staffName,
       r.roleName, r.hourlyRate,
       f.festivalID, f.festivalName
FROM staffAssignments sa
INNER JOIN staff st ON sa.staffID = st.staffID
INNER JOIN roles r ON st.roleID = r.roleID
INNER JOIN festivals f ON sa.festivalID = f.festivalID
ORDER BY f.festivalName, st.lastName, st.firstName;

-- get a single Staff Assignment's data for the Update Staff Assignment form
SELECT staffAssignmentID, staffID, festivalID, assignedDate, 
       hoursWorked, shiftNotes 
FROM staffAssignments 
WHERE staffAssignmentID = :staffAssignmentID_selected_from_browse_staff_assignments_page;

-- associate a Staff member with a Festival (M-to-M relationship addition)
INSERT INTO staffAssignments (staffID, festivalID, assignedDate, 
                             hoursWorked, shiftNotes)
VALUES (:staffID_from_dropdown, :festivalID_from_dropdown, :assignedDateInput,
        :hoursWorkedInput, :shiftNotesInput);

-- update a Staff Assignment's data based on submission of the Update Staff Assignment form
UPDATE staffAssignments 
SET staffID = :staffID_from_dropdown,
    festivalID = :festivalID_from_dropdown,
    assignedDate = :assignedDateInput,
    hoursWorked = :hoursWorkedInput,
    shiftNotes = :shiftNotesInput
WHERE staffAssignmentID = :staffAssignmentID_from_update_form;

-- dis-associate a Staff member from a Festival (M-to-M relationship deletion)
DELETE FROM staffAssignments 
WHERE staffAssignmentID = :staffAssignmentID_selected_from_browse_staff_assignments_page;