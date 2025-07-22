-- Create the database if it does not already exist
CREATE DATABASE IF NOT EXISTS tata_traceability;

-- Use the newly created or existing database for subsequent commands
USE tata_traceability;

-- Drop existing tables if they exist. This is useful for development to ensure a clean slate
-- Be cautious with DROP TABLE in production environments!
DROP TABLE IF EXISTS form_data;
DROP TABLE IF EXISTS machines;
DROP TABLE IF EXISTS vehicle_factories;

-- Table 1: vehicle_factories
-- Stores information about different vehicle manufacturing factories
CREATE TABLE vehicle_factories (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each factory, auto-increments
  name VARCHAR(100) NOT NULL         -- Name of the vehicle factory, cannot be null
);

-- Table 2: machines
-- Stores information about machines, linked to a specific vehicle factory
CREATE TABLE machines (
  id INT AUTO_INCREMENT PRIMARY KEY,     -- Unique identifier for each machine, auto-increments
  name VARCHAR(100) NOT NULL,            -- Name of the machine, cannot be null
  vehicle_factory_id INT,                -- Foreign key linking to the vehicle_factories table
  FOREIGN KEY (vehicle_factory_id)       -- Defines vehicle_factory_id as a foreign key
    REFERENCES vehicle_factories(id)     -- References the 'id' column in the 'vehicle_factories' table
    ON DELETE CASCADE                    -- If a factory is deleted, all associated machines are also deleted
);

-- Table 3: form_data
-- Stores the data submitted through the form, linking to areas (factories) and machines
-- ✅ New Table: Form Data (from FormPage)
CREATE TABLE IF NOT EXISTS form_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  area VARCHAR(100) NOT NULL,
  machine VARCHAR(100) NOT NULL,
  field1 VARCHAR(255) NOT NULL,
  field2 VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert initial data into the vehicle_factories table
INSERT INTO vehicle_factories (name) VALUES
('Vehicle Factory 1'),
('Vehicle Factory 2'),
('Vehicle Factory 3'),
('Vehicle Factory 4'),
('Vehicle Factory 5'),
('Vehicle Factory 6'),
('Vehicle Factory 7'),
('Vehicle Factory 8'),
('Vehicle Factory 9'),
('Vehicle Factory 10'),
('Vehicle Factory 11');

-- Insert initial data into the machines table, linking them to specific vehicle factories
INSERT INTO machines (name, vehicle_factory_id) VALUES
('Machine 1', 1),
('Machine 2', 4),
('Machine 3', 6),
('Machine 4', 7),
('Machine 5', 2),
('Machine 6', 3),
('Machine 7', 8),
('Machine 8', 5),
('Machine 9', 9),
('Machine 10', 1),
('Machine 11', 10),
('Machine 12', 11),
('Machine 13', 5),
('Machine 14', 9),
('Machine 15', 4),
('Machine 16', 6),
('Machine 17', 6),
('Machine 18', 2),
('Machine 19', 3),
('Machine 20', 8);

-- Optional: Commands to view all data in each table (for verification)
SELECT * FROM vehicle_factories;
SELECT * FROM machines;
SELECT * FROM form_data;