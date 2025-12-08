# 🎵 Music Festival Management System

**Developers:** Kenneth Sieu, Suvam Patel

A **database design project** created to practice relational database modeling, schema design, and SQL queries. This system focuses on managing music festivals, including **artists, stages, staff, sponsors, vendors, and performances**.

Link: http://classwork.engr.oregonstate.edu:9020/

- Note: Must be connected to OSU servers using a VPN

---

## 📝 Project Overview

This project simulates a music festival management system with the goal of designing a **relational database** that efficiently tracks:

- **Artists & Performances:** Schedule artists across multiple stages and festival days.
- **Staff & Assignments:** Track staff roles and assignments for each festival.
- **Sponsors & Sponsorships:** Manage festival sponsors and sponsorship details.
- **Vendors & Assignments:** Track vendors and their assigned booths at festivals.
- **Festival Management:** Store festival details, stages, and schedules.

> This project is purely database-focused

---

## 📊 Database Design

### Entities & Tables

- **Artists:** Artist information (name, genre, contact info)
- **Festivals:** Festival events with date, location, and details
- **Performances:** Links artists to stages and festival times
- **Sponsorships:** Tracks sponsor contributions for festivals
- **Sponsors:** Sponsor information (name, contact, type)
- **Staff:** Staff member details
- **StaffAssignments:** Links staff to festival roles and shifts
- **Stages:** Stage information (name, capacity, festival)
- **Vendors:** Vendor details (name, type, contact)
- **VendorAssignments:** Links vendors to festival booths or spaces

### Relationships

- One **festival** can have multiple **stages**, **performances**, **sponsors**, **staff assignments**, and **vendor assignments**.
- One **artist** can have multiple **performances** across festivals.
- **StaffAssignments** links staff members to specific festivals and roles.
- **VendorAssignments** links vendors to specific festival booths or stages.
- **Sponsorships** links sponsors to festivals and tracks contribution details.

### ER Diagram

`./screenshots/er-diagram.png`.

---

## 💻 Features

- Fully normalized **relational database schema**
- Supports queries for:
  - Artist performance schedules
  - Stage occupancy per festival
  - Sponsor contributions per festival
  - Staff and vendor assignments
  - Attendee interactions (optional extension)
- Includes **SQL scripts** to create tables and insert sample data

---

## 🔧 Tech Stack

- **Database:** MySQL
- **Front-end:** React, Tailwind
- **Back-end:** Express, Nodejs
- **Tools:** SQL Workbench
- **Languages:** SQL

---

## 📌 Notes

- This project is meant for **practice with database design**
- The schema can be extended to include **ticketing, merchandise, or attendee management**.
