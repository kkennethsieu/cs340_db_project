// ########################################
// ########## SETUP

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = YOUR_PORT_NUM;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');


// ########################################
// ########## PAGE ROUTES


// Home page
app.get('/', async function(req, res) {
    try {
        res.render('home');
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('An error occurred while rendering the page.')
    }
});


// Festivals page
app.get('/festivals', async function (req, res) {
    try {
        const query = 'SELECT * FROM festivals ORDER BY startDate';
        const [festivals] = await db.query(query);
        res.render('festivals', { festivals: festivals });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Artists page
app.get('/artists', async function (req, res) {
    try {
        const query = 'SELECT * FROM artists ORDER BY artistName';
        const [artists] = await db.query(query);
        res.render('artists', { artists: artists });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Stages page
app.get('/stages', async function (req, res) {
    try {
        const query1 = `SELECT s.*, f.festivalName 
                       FROM stages s 
                       INNER JOIN festivals f ON s.festivalID = f.festivalID 
                       ORDER BY f.festivalName, s.stageName`;
        const query2 = 'SELECT festivalID, festivalName FROM festivals ORDER BY festivalName';
        
        const [stages] = await db.query(query1);
        const [festivals] = await db.query(query2);
        
        res.render('stages', { stages: stages, festivals: festivals });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Vendors page
app.get('/vendors', async function (req, res) {
    try {
        const query = 'SELECT * FROM vendors ORDER BY vendorName';
        const [vendors] = await db.query(query);
        res.render('vendors', { vendors: vendors });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Sponsors page
app.get('/sponsors', async function (req, res) {
    try {
        const query = 'SELECT * FROM sponsors ORDER BY sponsorName';
        const [sponsors] = await db.query(query);
        res.render('sponsors', { sponsors: sponsors });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Staff page
app.get('/staff', async function (req, res) {
    try {
        const query = 'SELECT * FROM staff ORDER BY lastName, firstName';
        const [staff] = await db.query(query);
        res.render('staff', { staff: staff });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Performances page
app.get('/performances', async function (req, res) {
    try {
        const query1 = `SELECT p.*, a.artistName, s.stageName, f.festivalName 
                       FROM performances p 
                       INNER JOIN artists a ON p.artistID = a.artistID 
                       INNER JOIN stages s ON p.stageID = s.stageID 
                       INNER JOIN festivals f ON s.festivalID = f.festivalID 
                       ORDER BY p.performanceDate, p.startTime`;
        const query2 = 'SELECT artistID, artistName FROM artists ORDER BY artistName';
        const query3 = `SELECT s.stageID, s.stageName, f.festivalName 
                       FROM stages s 
                       INNER JOIN festivals f ON s.festivalID = f.festivalID 
                       ORDER BY f.festivalName, s.stageName`;
        
        const [performances] = await db.query(query1);
        const [artists] = await db.query(query2);
        const [stages] = await db.query(query3);
        
        res.render('performances', { 
            performances: performances, 
            artists: artists, 
            stages: stages 
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Vendor Assignments page
app.get('/vendor-assignments', async function (req, res) {
    try {
        const query1 = `SELECT va.*, v.vendorName, v.vendorType, f.festivalName 
                       FROM vendorAssignments va 
                       INNER JOIN vendors v ON va.vendorID = v.vendorID 
                       INNER JOIN festivals f ON va.festivalID = f.festivalID 
                       ORDER BY f.festivalName, v.vendorName`;
        const query2 = 'SELECT vendorID, vendorName, vendorType FROM vendors ORDER BY vendorName';
        const query3 = 'SELECT festivalID, festivalName FROM festivals ORDER BY festivalName';
        
        const [vendorAssignments] = await db.query(query1);
        const [vendors] = await db.query(query2);
        const [festivals] = await db.query(query3);
        
        res.render('vendor-assignments', { 
            vendorAssignments: vendorAssignments, 
            vendors: vendors, 
            festivals: festivals 
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Sponsorships page
app.get('/sponsorships', async function (req, res) {
    try {
        const query1 = `SELECT sp.*, s.sponsorName, s.industry, f.festivalName 
                       FROM sponsorships sp 
                       INNER JOIN sponsors s ON sp.sponsorID = s.sponsorID 
                       INNER JOIN festivals f ON sp.festivalID = f.festivalID 
                       ORDER BY f.festivalName, s.sponsorName`;
        const query2 = 'SELECT sponsorID, sponsorName FROM sponsors ORDER BY sponsorName';
        const query3 = 'SELECT festivalID, festivalName FROM festivals ORDER BY festivalName';
        
        const [sponsorships] = await db.query(query1);
        const [sponsors] = await db.query(query2);
        const [festivals] = await db.query(query3);
        
        res.render('sponsorships', { 
            sponsorships: sponsorships, 
            sponsors: sponsors, 
            festivals: festivals 
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// Staff Assignments page
app.get('/staff-assignments', async function (req, res) {
    try {
        const query1 = `SELECT sa.*, CONCAT(st.firstName, ' ', st.lastName) AS staffName, 
                       st.role, st.hourlyRate, f.festivalName 
                       FROM staffAssignments sa 
                       INNER JOIN staff st ON sa.staffID = st.staffID 
                       INNER JOIN festivals f ON sa.festivalID = f.festivalID 
                       ORDER BY f.festivalName, st.lastName, st.firstName`;
        const query2 = `SELECT staffID, CONCAT(firstName, ' ', lastName) AS staffName, role 
                       FROM staff ORDER BY lastName, firstName`;
        const query3 = 'SELECT festivalID, festivalName FROM festivals ORDER BY festivalName';
        
        const [staffAssignments] = await db.query(query1);
        const [staff] = await db.query(query2);
        const [festivals] = await db.query(query3);
        
        res.render('staff-assignments', { 
            staffAssignments: staffAssignments, 
            staff: staff, 
            festivals: festivals 
        });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});


// ########################################
// ########## API ROUTES (JSON responses for AJAX)

// ===== FESTIVALS API =====

app.post('/api/festivals', async function (req, res) {
    try {
        const { festivalName, startDate, endDate, location, expectedAttendance, budget, ticketPrice } = req.body;
        const query = `INSERT INTO festivals (festivalName, startDate, endDate, location, 
                       expectedAttendance, budget, ticketPrice) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            festivalName, startDate, endDate, location, 
            expectedAttendance, budget, ticketPrice
        ]);
        
        res.status(201).json({ 
            message: 'Festival created successfully', 
            festivalID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating festival:', error);
        res.status(500).json({ error: 'Failed to create festival' });
    }
});

app.put('/api/festivals/:id', async function (req, res) {
    try {
        const { festivalName, startDate, endDate, location, expectedAttendance, budget, ticketPrice } = req.body;
        const query = `UPDATE festivals SET festivalName = ?, startDate = ?, endDate = ?, 
                       location = ?, expectedAttendance = ?, budget = ?, ticketPrice = ? 
                       WHERE festivalID = ?`;
        
        const [result] = await db.query(query, [
            festivalName, startDate, endDate, location, 
            expectedAttendance, budget, ticketPrice, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Festival not found' });
            return;
        }
        
        res.json({ message: 'Festival updated successfully' });
    } catch (error) {
        console.error('Error updating festival:', error);
        res.status(500).json({ error: 'Failed to update festival' });
    }
});

app.delete('/api/festivals/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM festivals WHERE festivalID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Festival not found' });
            return;
        }
        
        res.json({ message: 'Festival deleted successfully' });
    } catch (error) {
        console.error('Error deleting festival:', error);
        res.status(500).json({ error: 'Failed to delete festival' });
    }
});


// ===== ARTISTS API =====

app.post('/api/artists', async function (req, res) {
    try {
        const { artistName, genre, bookingFee, contactEmail, contactPhone, country, websiteURL } = req.body;
        const query = `INSERT INTO artists (artistName, genre, bookingFee, contactEmail, 
                       contactPhone, country, websiteURL) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            artistName, genre, bookingFee, contactEmail, 
            contactPhone, country, websiteURL
        ]);
        
        res.status(201).json({ 
            message: 'Artist created successfully', 
            artistID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating artist:', error);
        res.status(500).json({ error: 'Failed to create artist' });
    }
});

app.put('/api/artists/:id', async function (req, res) {
    try {
        const { artistName, genre, bookingFee, contactEmail, contactPhone, country, websiteURL } = req.body;
        const query = `UPDATE artists SET artistName = ?, genre = ?, bookingFee = ?, 
                       contactEmail = ?, contactPhone = ?, country = ?, websiteURL = ? 
                       WHERE artistID = ?`;
        
        const [result] = await db.query(query, [
            artistName, genre, bookingFee, contactEmail, 
            contactPhone, country, websiteURL, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Artist not found' });
            return;
        }
        
        res.json({ message: 'Artist updated successfully' });
    } catch (error) {
        console.error('Error updating artist:', error);
        res.status(500).json({ error: 'Failed to update artist' });
    }
});

app.delete('/api/artists/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM artists WHERE artistID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Artist not found' });
            return;
        }
        
        res.json({ message: 'Artist deleted successfully' });
    } catch (error) {
        console.error('Error deleting artist:', error);
        res.status(500).json({ error: 'Failed to delete artist' });
    }
});

// ===== STAGES API =====

app.post('/api/stages', async function (req, res) {
    try {
        const { festivalID, stageName, capacity, stageType, locationDescription, hasCover } = req.body;
        const query = `INSERT INTO stages (festivalID, stageName, capacity, stageType, 
                       locationDescription, hasCover) VALUES (?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            festivalID, stageName, capacity, stageType, 
            locationDescription, hasCover
        ]);
        
        res.status(201).json({ 
            message: 'Stage created successfully', 
            stageID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating stage:', error);
        res.status(500).json({ error: 'Failed to create stage' });
    }
});

app.put('/api/stages/:id', async function (req, res) {
    try {
        const { festivalID, stageName, capacity, stageType, locationDescription, hasCover } = req.body;
        const query = `UPDATE stages SET festivalID = ?, stageName = ?, capacity = ?, 
                       stageType = ?, locationDescription = ?, hasCover = ? WHERE stageID = ?`;
        
        const [result] = await db.query(query, [
            festivalID, stageName, capacity, stageType, 
            locationDescription, hasCover, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Stage not found' });
            return;
        }
        
        res.json({ message: 'Stage updated successfully' });
    } catch (error) {
        console.error('Error updating stage:', error);
        res.status(500).json({ error: 'Failed to update stage' });
    }
});

app.delete('/api/stages/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM stages WHERE stageID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Stage not found' });
            return;
        }
        
        res.json({ message: 'Stage deleted successfully' });
    } catch (error) {
        console.error('Error deleting stage:', error);
        res.status(500).json({ error: 'Failed to delete stage' });
    }
});


// ===== VENDORS API =====

app.post('/api/vendors', async function (req, res) {
    try {
        const { vendorName, vendorType, contactEmail, contactPhone, businessLicense } = req.body;
        const query = `INSERT INTO vendors (vendorName, vendorType, contactEmail, 
                       contactPhone, businessLicense) VALUES (?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            vendorName, vendorType, contactEmail, contactPhone, businessLicense
        ]);
        
        res.status(201).json({ 
            message: 'Vendor created successfully', 
            vendorID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating vendor:', error);
        res.status(500).json({ error: 'Failed to create vendor' });
    }
});

app.put('/api/vendors/:id', async function (req, res) {
    try {
        const { vendorName, vendorType, contactEmail, contactPhone, businessLicense } = req.body;
        const query = `UPDATE vendors SET vendorName = ?, vendorType = ?, contactEmail = ?, 
                       contactPhone = ?, businessLicense = ? WHERE vendorID = ?`;
        
        const [result] = await db.query(query, [
            vendorName, vendorType, contactEmail, contactPhone, businessLicense, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vendor not found' });
            return;
        }
        
        res.json({ message: 'Vendor updated successfully' });
    } catch (error) {
        console.error('Error updating vendor:', error);
        res.status(500).json({ error: 'Failed to update vendor' });
    }
});

app.delete('/api/vendors/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM vendors WHERE vendorID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vendor not found' });
            return;
        }
        
        res.json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        console.error('Error deleting vendor:', error);
        res.status(500).json({ error: 'Failed to delete vendor' });
    }
});


// ===== SPONSORS API =====

app.post('/api/sponsors', async function (req, res) {
    try {
        const { sponsorName, industry, contactEmail, contactPhone, websiteURL } = req.body;
        const query = `INSERT INTO sponsors (sponsorName, industry, contactEmail, 
                       contactPhone, websiteURL) VALUES (?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            sponsorName, industry, contactEmail, contactPhone, websiteURL
        ]);
        
        res.status(201).json({ 
            message: 'Sponsor created successfully', 
            sponsorID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating sponsor:', error);
        res.status(500).json({ error: 'Failed to create sponsor' });
    }
});

app.put('/api/sponsors/:id', async function (req, res) {
    try {
        const { sponsorName, industry, contactEmail, contactPhone, websiteURL } = req.body;
        const query = `UPDATE sponsors SET sponsorName = ?, industry = ?, contactEmail = ?, 
                       contactPhone = ?, websiteURL = ? WHERE sponsorID = ?`;
        
        const [result] = await db.query(query, [
            sponsorName, industry, contactEmail, contactPhone, websiteURL, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Sponsor not found' });
            return;
        }
        
        res.json({ message: 'Sponsor updated successfully' });
    } catch (error) {
        console.error('Error updating sponsor:', error);
        res.status(500).json({ error: 'Failed to update sponsor' });
    }
});

app.delete('/api/sponsors/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM sponsors WHERE sponsorID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Sponsor not found' });
            return;
        }
        
        res.json({ message: 'Sponsor deleted successfully' });
    } catch (error) {
        console.error('Error deleting sponsor:', error);
        res.status(500).json({ error: 'Failed to delete sponsor' });
    }
});


// ===== STAFF API =====

app.post('/api/staff', async function (req, res) {
    try {
        const { firstName, lastName, email, phone, role, hourlyRate } = req.body;
        const query = `INSERT INTO staff (firstName, lastName, email, phone, role, hourlyRate) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            firstName, lastName, email, phone, role, hourlyRate
        ]);
        
        res.status(201).json({ 
            message: 'Staff member created successfully', 
            staffID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating staff member:', error);
        res.status(500).json({ error: 'Failed to create staff member' });
    }
});

app.put('/api/staff/:id', async function (req, res) {
    try {
        const { firstName, lastName, email, phone, role, hourlyRate } = req.body;
        const query = `UPDATE staff SET firstName = ?, lastName = ?, email = ?, 
                       phone = ?, role = ?, hourlyRate = ? WHERE staffID = ?`;
        
        const [result] = await db.query(query, [
            firstName, lastName, email, phone, role, hourlyRate, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Staff member not found' });
            return;
        }
        
        res.json({ message: 'Staff member updated successfully' });
    } catch (error) {
        console.error('Error updating staff member:', error);
        res.status(500).json({ error: 'Failed to update staff member' });
    }
});

app.delete('/api/staff/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM staff WHERE staffID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Staff member not found' });
            return;
        }
        
        res.json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error('Error deleting staff member:', error);
        res.status(500).json({ error: 'Failed to delete staff member' });
    }
});


// ===== PERFORMANCES API =====

app.post('/api/performances', async function (req, res) {
    try {
        const { artistID, stageID, performanceDate, startTime, endTime, setupNotes, soundcheckTime } = req.body;
        const query = `INSERT INTO performances (artistID, stageID, performanceDate, startTime, 
                       endTime, setupNotes, soundcheckTime) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            artistID, stageID, performanceDate, startTime, 
            endTime, setupNotes, soundcheckTime
        ]);
        
        res.status(201).json({ 
            message: 'Performance created successfully', 
            performanceID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating performance:', error);
        res.status(500).json({ error: 'Failed to create performance' });
    }
});

app.put('/api/performances/:id', async function (req, res) {
    try {
        const { artistID, stageID, performanceDate, startTime, endTime, setupNotes, soundcheckTime } = req.body;
        const query = `UPDATE performances SET artistID = ?, stageID = ?, performanceDate = ?, 
                       startTime = ?, endTime = ?, setupNotes = ?, soundcheckTime = ? 
                       WHERE performanceID = ?`;
        
        const [result] = await db.query(query, [
            artistID, stageID, performanceDate, startTime, 
            endTime, setupNotes, soundcheckTime, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Performance not found' });
            return;
        }
        
        res.json({ message: 'Performance updated successfully' });
    } catch (error) {
        console.error('Error updating performance:', error);
        res.status(500).json({ error: 'Failed to update performance' });
    }
});

app.delete('/api/performances/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM performances WHERE performanceID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Performance not found' });
            return;
        }
        
        res.json({ message: 'Performance deleted successfully' });
    } catch (error) {
        console.error('Error deleting performance:', error);
        res.status(500).json({ error: 'Failed to delete performance' });
    }
});


// ===== VENDOR ASSIGNMENTS API =====

app.post('/api/vendor-assignments', async function (req, res) {
    try {
        const { vendorID, festivalID, boothNumber, registrationFee, assignmentDate } = req.body;
        const query = `INSERT INTO vendorAssignments (vendorID, festivalID, boothNumber, 
                       registrationFee, assignmentDate) VALUES (?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            vendorID, festivalID, boothNumber, registrationFee, assignmentDate
        ]);
        
        res.status(201).json({ 
            message: 'Vendor assignment created successfully', 
            assignmentID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating vendor assignment:', error);
        res.status(500).json({ error: 'Failed to create vendor assignment' });
    }
});

app.put('/api/vendor-assignments/:id', async function (req, res) {
    try {
        const { vendorID, festivalID, boothNumber, registrationFee, assignmentDate } = req.body;
        const query = `UPDATE vendorAssignments SET vendorID = ?, festivalID = ?, boothNumber = ?, 
                       registrationFee = ?, assignmentDate = ? WHERE assignmentID = ?`;
        
        const [result] = await db.query(query, [
            vendorID, festivalID, boothNumber, registrationFee, assignmentDate, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vendor assignment not found' });
            return;
        }
        
        res.json({ message: 'Vendor assignment updated successfully' });
    } catch (error) {
        console.error('Error updating vendor assignment:', error);
        res.status(500).json({ error: 'Failed to update vendor assignment' });
    }
});

app.delete('/api/vendor-assignments/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM vendorAssignments WHERE assignmentID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vendor assignment not found' });
            return;
        }
        
        res.json({ message: 'Vendor assignment deleted successfully' });
    } catch (error) {
        console.error('Error deleting vendor assignment:', error);
        res.status(500).json({ error: 'Failed to delete vendor assignment' });
    }
});

// ===== SPONSORSHIPS API =====

app.post('/api/sponsorships', async function (req, res) {
    try {
        const { sponsorID, festivalID, sponsorshipAmount, sponsorshipTier, contractDate, benefits } = req.body;
        const query = `INSERT INTO sponsorships (sponsorID, festivalID, sponsorshipAmount, 
                       sponsorshipTier, contractDate, benefits) VALUES (?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            sponsorID, festivalID, sponsorshipAmount, sponsorshipTier, contractDate, benefits
        ]);
        
        res.status(201).json({ 
            message: 'Sponsorship created successfully', 
            sponsorshipID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating sponsorship:', error);
        res.status(500).json({ error: 'Failed to create sponsorship' });
    }
});

app.put('/api/sponsorships/:id', async function (req, res) {
    try {
        const { sponsorID, festivalID, sponsorshipAmount, sponsorshipTier, contractDate, benefits } = req.body;
        const query = `UPDATE sponsorships SET sponsorID = ?, festivalID = ?, sponsorshipAmount = ?, 
                       sponsorshipTier = ?, contractDate = ?, benefits = ? WHERE sponsorshipID = ?`;
        
        const [result] = await db.query(query, [
            sponsorID, festivalID, sponsorshipAmount, sponsorshipTier, 
            contractDate, benefits, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Sponsorship not found' });
            return;
        }
        
        res.json({ message: 'Sponsorship updated successfully' });
    } catch (error) {
        console.error('Error updating sponsorship:', error);
        res.status(500).json({ error: 'Failed to update sponsorship' });
    }
});

app.delete('/api/sponsorships/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM sponsorships WHERE sponsorshipID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Sponsorship not found' });
            return;
        }
        
        res.json({ message: 'Sponsorship deleted successfully' });
    } catch (error) {
        console.error('Error deleting sponsorship:', error);
        res.status(500).json({ error: 'Failed to delete sponsorship' });
    }
});

// ===== STAFF ASSIGNMENTS API =====

app.post('/api/staff-assignments', async function (req, res) {
    try {
        const { staffID, festivalID, assignedDate, hoursWorked, shiftNotes } = req.body;
        const query = `INSERT INTO staffAssignments (staffID, festivalID, assignedDate, 
                       hoursWorked, shiftNotes) VALUES (?, ?, ?, ?, ?)`;
        
        const [result] = await db.query(query, [
            staffID, festivalID, assignedDate, hoursWorked, shiftNotes
        ]);
        
        res.status(201).json({ 
            message: 'Staff assignment created successfully', 
            staffAssignmentID: result.insertId 
        });
    } catch (error) {
        console.error('Error creating staff assignment:', error);
        res.status(500).json({ error: 'Failed to create staff assignment' });
    }
});

app.put('/api/staff-assignments/:id', async function (req, res) {
    try {
        const { staffID, festivalID, assignedDate, hoursWorked, shiftNotes } = req.body;
        const query = `UPDATE staffAssignments SET staffID = ?, festivalID = ?, assignedDate = ?, 
                       hoursWorked = ?, shiftNotes = ? WHERE staffAssignmentID = ?`;
        
        const [result] = await db.query(query, [
            staffID, festivalID, assignedDate, hoursWorked, shiftNotes, req.params.id
        ]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Staff assignment not found' });
            return;
        }
        
        res.json({ message: 'Staff assignment updated successfully' });
    } catch (error) {
        console.error('Error updating staff assignment:', error);
        res.status(500).json({ error: 'Failed to update staff assignment' });
    }
});

app.delete('/api/staff-assignments/:id', async function (req, res) {
    try {
        const query = 'DELETE FROM staffAssignments WHERE staffAssignmentID = ?';
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Staff assignment not found' });
            return;
        }
        
        res.json({ message: 'Staff assignment deleted successfully' });
    } catch (error) {
        console.error('Error deleting staff assignment:', error);
        res.status(500).json({ error: 'Failed to delete staff assignment' });
    }
});

// ########################################
// ########## ERROR HANDLING

// 404 handler - must be after all other routes
app.use(function (req, res) {
    res.status(404).send('404 - Page Not Found');
});

// Error handler - must be last
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500 - Internal Server Error');
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('========================================');
    console.log('Music Festival Management System');
    console.log('Express started on http://localhost:' + PORT);
    console.log('Press Ctrl-C to terminate.');
    console.log('========================================');
});