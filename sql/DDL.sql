-- Music Festival Management System
-- Database Definition Language (DDL) and Sample Data
-- Group: 42
-- Team Members: Suvam Patel, Kennet Sieu
-- Date: 10/25/2025

-- Disable foreign key checks and autocommit for clean import
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Drop Tables if they exist

DROP TABLE IF EXISTS staffAssignments;
DROP TABLE IF EXISTS sponsorships;
DROP TABLE IF EXISTS vendorAssignments;
DROP TABLE IF EXISTS performances;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS sponsors;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS stages;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS festivals;

-- Create Tables

-- Festivals table: Stores information about music festival events
CREATE TABLE festivals (
    festivalID INT AUTO_INCREMENT NOT NULL,
    festivalName VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    expectedAttendance INT NOT NULL,
    budget DECIMAL(12,2) NOT NULL,
    ticketPrice DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (festivalID)
);

-- Artists table: Stores details about musical artists and bands
CREATE TABLE artists (
    artistID INT AUTO_INCREMENT NOT NULL,
    artistName VARCHAR(255) UNIQUE NOT NULL,
    genre VARCHAR(100) NOT NULL,
    bookingFee DECIMAL(10,2) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactPhone VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    websiteURL VARCHAR(255),
    PRIMARY KEY (artistID)
);

-- Stages table: Contains information about performance stages at festivals
CREATE TABLE stages (
    stageID INT AUTO_INCREMENT NOT NULL,
    festivalID INT NOT NULL,
    stageName VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    stageType VARCHAR(50) NOT NULL,
    locationDescription VARCHAR(255) NOT NULL,
    hasCover BOOLEAN NOT NULL,
    PRIMARY KEY (stageID),
    FOREIGN KEY (festivalID) REFERENCES festivals(festivalID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Vendors table: Tracks food, beverage, and merchandise vendors
CREATE TABLE vendors (
    vendorID INT AUTO_INCREMENT NOT NULL,
    vendorName VARCHAR(255) NOT NULL,
    vendorType VARCHAR(100) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactPhone VARCHAR(20) NOT NULL,
    businessLicense VARCHAR(100),
    PRIMARY KEY (vendorID)
);

-- Sponsors table: Records corporate sponsors who procvide financial support
CREATE TABLE sponsors (
    sponsorID INT AUTO_INCREMENT NOT NULL,
    sponsorName VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactPhone VARCHAR(20) NOT NULL,
    websiteURL VARCHAR(255),
    PRIMARY KEY (sponsorID)
);

-- Staff table: Contains information about festival staff and crew members
CREATE TABLE staff (
    staffID INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(100) NOT NULL,
    hourlyRate DECIMAL(10,2),
    PRIMARY KEY (staffID)
);

-- Performaces table: intersection table for Artists and Stages (M:N)
-- Records scheduled performaces with additional performace details
CREATE TABLE performances (
    performanceID INT AUTO_INCREMENT NOT NULL,
    artistID INT NOT NULL,
    stageID INT NOT NULL,
    performanceDate DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    setupNotes TEXT,
    soundcheckTime TIME,
    PRIMARY KEY (performanceID),
    FOREIGN KEY (artistID) REFERENCES artists(artistID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (stageID) REFERENCES stages(stageID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- VendorAssignments table: Intersection table for Vendors and Festivals (M:N)
-- Tracks which vendors are assigned to which festivals
CREATE TABLE vendorAssignments (
    assignmentID INT AUTO_INCREMENT NOT NULL,
    vendorID INT NOT NULL,
    festivalID INT NOT NULL,
    boothNumber VARCHAR(50),
    registrationFee DECIMAL(10,2) NOT NULL,
    assignmentDate DATE NOT NULL,
    PRIMARY KEY (assignmentID),
    FOREIGN KEY (vendorID) REFERENCES vendors(vendorID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (festivalID) REFERENCES festivals(festivalID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Sponsorships table: Intersection table for Sponsors and Festivals (M:N)
-- Records sponsorship deals between sponsors and festivals
CREATE TABLE sponsorships (
    sponsorshipID INT AUTO_INCREMENT NOT NULL,
    sponsorID INT NOT NULL,
    festivalID INT NOT NULL,
    sponsorshipAmount DECIMAL(12,2) NOT NULL,
    sponsorshipTier VARCHAR(50) NOT NULL,
    contractDate DATE NOT NULL,
    benefits TEXT,
    PRIMARY KEY (sponsorshipID),
    FOREIGN KEY (sponsorID) REFERENCES sponsors(sponsorID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (festivalID) REFERENCES festivals(festivalID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- StaffAssignments table: Intersection table for Staff and Festivals (M:N)
-- Tracks staff assignments to festivals
CREATE TABLE staffAssignments (
    staffAssignmentID INT AUTO_INCREMENT NOT NULL,
    staffID INT NOT NULL,
    festivalID INT NOT NULL,
    assignedDate DATE NOT NULL,
    hoursWorked DECIMAL(5,2),
    shiftNotes TEXT,
    PRIMARY KEY (staffAssignmentID),
    FOREIGN KEY (staffID) REFERENCES staff(staffID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (festivalID) REFERENCES festivals(festivalID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insert Sample Data

-- Insert Festivals data
INSERT INTO festivals (festivalName, startDate, endDate, location, expectedAttendance, budget, ticketPrice) 
VALUES
('Summer Soundwave Festival', '2025-07-15', '2025-07-17', 'Golden Gate Park, San Francisco, CA', 75000, 2500000.00, 299.99),
('Electric Dreams Festival', '2025-08-20', '2025-08-22', 'Desert Sky Venue, Phoenix, AZ', 50000, 1800000.00, 249.99),
('Autumn Acoustic Gathering', '2025-09-10', '2025-09-12', 'Red Rocks Amphitheatre, Morrison, CO', 40000, 1200000.00, 189.99),
('Winter Beats Celebration', '2025-12-28', '2025-12-30', 'Miami Beach Convention Center, FL', 60000, 2000000.00, 279.99);

-- Insert Artists data
INSERT INTO artists (artistName, genre, bookingFee, contactEmail, contactPhone, country, websiteURL)
VALUES
('The Midnight Riders', 'Rock', 50000.00, 'booking@midnightriders.com', '555-0101', 'United States', 'www.midnightriders.com'),
('DJ Pulse', 'Electronic', 75000.00, 'contact@djpulse.com', '555-0102', 'United Kingdom', 'www.djpulse.com'),
('Sarah Chen', 'Acoustic/Folk', 25000.00, 'sarah@sarahchenmusic.com', '555-0103', 'Canada', 'www.sarahchenmusic.com'),
('Bass Revolution', 'EDM', 80000.00, 'info@bassrevolution.com', '555-0104', 'Netherlands', 'www.bassrevolution.com'),
('The Harmony Project', 'Indie Pop', 35000.00, 'bookings@harmonyproject.com', '555-0105', 'Australia', 'www.harmonyproject.com');

-- Insert Stages data
INSERT INTO stages (festivalID, stageName, capacity, stageType, locationDescription, hasCover) 
VALUES
(1, 'Main Stage', 50000, 'Main Stage', 'Center of festival grounds', FALSE),
(1, 'Electronic Arena', 20000, 'Electronic Stage', 'East side near food court', TRUE),
(1, 'Acoustic Garden', 5000, 'Acoustic Stage', 'Shaded area west side', TRUE),
(2, 'Desert Main Stage', 35000, 'Main Stage', 'North end of venue', FALSE),
(2, 'Oasis Lounge', 8000, 'Lounge Stage', 'Covered pavilion south side', TRUE),
(3, 'Red Rocks Stage', 30000, 'Main Stage', 'Natural amphitheatre', FALSE),
(4, 'Miami Main Stage', 40000, 'Main Stage', 'Convention center main hall', TRUE),
(4, 'Beach Club Stage', 15000, 'Electronic Stage', 'Outdoor beach area', FALSE);

-- Insert Vendors data
INSERT INTO vendors (vendorName, vendorType, contactEmail, contactPhone, businessLicense) 
VALUES
('Gourmet Street Tacos', 'Food', 'info@gourmettacos.com', '555-0201', 'FL-123456'),
('Craft Beer Garden', 'Beverage', 'contact@craftbeergarden.com', '555-0202', 'CA-789012'),
('Festival Merch Co', 'Merchandise', 'sales@festivalmerch.com', '555-0203', 'TX-345678'),
('Smoothie Paradise', 'Beverage', 'hello@smoothieparadise.com', '555-0204', 'AZ-901234'),
('Artisan Pizza Oven', 'Food', 'orders@artisanpizza.com', '555-0205', 'CO-567890');

-- Insert Sponsors data
INSERT INTO sponsors (sponsorName, industry, contactEmail, contactPhone, websiteURL) 
VALUES
('MegaBrew Beer Company', 'Beverage', 'sponsorships@megabrew.com', '555-0301', 'www.megabrew.com'),
('TechSound Audio', 'Technology', 'partnerships@techsound.com', '555-0302', 'www.techsound.com'),
('GreenRide Transportation', 'Transportation', 'marketing@greenride.com', '555-0303', 'www.greenride.com'),
('EcoWear Apparel', 'Fashion', 'sponsorship@ecowear.com', '555-0304', 'www.ecowear.com');

-- Insert Staff data
INSERT INTO staff (firstName, lastName, email, phone, role, hourlyRate) 
VALUES
('John', 'Martinez', 'john.martinez@festivalstaff.com', '555-0401', 'Security', 25.00),
('Emily', 'Thompson', 'emily.thompson@festivalstaff.com', '555-0402', 'Medical', 35.00),
('Michael', 'Chang', 'michael.chang@festivalstaff.com', '555-0403', 'Technical Crew', 40.00),
('Sarah', 'Johnson', 'sarah.johnson@festivalstaff.com', '555-0404', 'Volunteer Coordinator', 22.00),
('David', 'Wilson', 'david.wilson@festivalstaff.com', '555-0405', 'Stage Manager', 45.00);

-- Insert Performances data
INSERT INTO performances (artistID, stageID, performanceDate, startTime, endTime, setupNotes, soundcheckTime) 
VALUES
(1, 1, '2025-07-16', '20:00:00', '21:30:00', 'Requires pyrotechnics setup', '17:00:00'),
(2, 2, '2025-07-15', '22:00:00', '23:30:00', 'Full LED wall needed', '19:00:00'),
(3, 3, '2025-07-16', '15:00:00', '16:00:00', 'Minimal setup, acoustic only', '13:30:00'),
(4, 4, '2025-08-21', '21:00:00', '22:30:00', 'Heavy bass system required', '18:00:00'),
(5, 6, '2025-09-11', '18:00:00', '19:15:00', 'Standard indie setup', '16:00:00'),
(1, 4, '2025-08-22', '19:00:00', '20:30:00', 'Standard rock setup', '16:30:00');

-- Insert VendorAssignments data
INSERT INTO vendorAssignments (vendorID, festivalID, boothNumber, registrationFee, assignmentDate) 
VALUES
(1, 1, 'F-01', 1500.00, '2025-06-01'),
(2, 1, 'B-03', 2000.00, '2025-06-01'),
(3, 1, 'M-05', 1200.00, '2025-06-05'),
(1, 2, 'F-12', 1500.00, '2025-07-10'),
(4, 2, 'B-08', 1800.00, '2025-07-12'),
(5, 3, 'F-04', 1300.00, '2025-08-01');

-- Insert Sponsorships data
INSERT INTO sponsorships (sponsorID, festivalID, sponsorshipAmount, sponsorshipTier, contractDate, benefits) 
VALUES
(1, 1, 500000.00, 'Title', '2025-03-15', 'Festival naming rights, main stage branding, VIP area access'),
(2, 1, 250000.00, 'Platinum', '2025-04-01', 'Stage naming rights, logo on all marketing materials'),
(3, 2, 150000.00, 'Gold', '2025-05-10', 'Transportation partner, shuttle branding'),
(1, 3, 300000.00, 'Title', '2025-06-20', 'Festival naming rights, main stage branding'),
(4, 4, 200000.00, 'Platinum', '2025-09-01', 'Exclusive apparel partner, merchandise booth');

-- Insert StaffAssignments data
INSERT INTO staffAssignments (staffID, festivalID, assignedDate, hoursWorked, shiftNotes) 
VALUES
(1, 1, '2025-07-15', 24.00, 'Main entrance security, all three days'),
(2, 1, '2025-07-15', 30.00, 'On-site medical staff, full festival'),
(3, 1, '2025-07-14', 40.00, 'Stage setup and teardown, includes prep day'),
(4, 2, '2025-08-20', 28.00, 'Volunteer coordination for all shifts'),
(5, 3, '2025-09-10', 32.00, 'Stage management for main stage'),
(1, 2, '2025-08-20', 24.00, 'Security detail for Desert Main Stage'),
(3, 4, '2025-12-27', 36.00, 'Technical setup including prep day');

-- Re-enable foreign key checks and commit
SET FOREIGN_KEY_CHECKS=1;
COMMIT;