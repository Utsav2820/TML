-- Database Creation
CREATE DATABASE IF NOT EXISTS tata_traceability;
USE tata_traceability;


-- Drop Existing Tables (for clean setup during development)
-- !!! WARNING: Running these DROP statements will delete all data in these tables.
-- !!! Use with caution in production environments.


DROP TABLE IF EXISTS Diesel_Filling_vf3;
DROP TABLE IF EXISTS Power_Steering_vf1;
DROP TABLE IF EXISTS Power_Steering_vf2;
DROP TABLE IF EXISTS Power_Steering_vf3;
DROP TABLE IF EXISTS Coolant_Process_vf1;
DROP TABLE IF EXISTS Coolant_Process_vf2;
DROP TABLE IF EXISTS Coolant_Process_vf3;
DROP TABLE IF EXISTS Clutch_Process_vf1;
DROP TABLE IF EXISTS Clutch_Process_vf2;
DROP TABLE IF EXISTS Clutch_Process_vf3;
DROP TABLE IF EXISTS AC_Filling_vf1;
DROP TABLE IF EXISTS AC_Filling_vf2;
DROP TABLE IF EXISTS AC_Filling_vf3;
DROP TABLE IF EXISTS Urea_Filling_vf1;
DROP TABLE IF EXISTS Urea_Filling_vf2;
DROP TABLE IF EXISTS Urea_Filling_vf3;
DROP TABLE IF EXISTS machines;
DROP TABLE IF EXISTS vehicle_factories;


-- Table to store Vehicle Factory information (e.g., VF1, VF2, VF3)
CREATE TABLE vehicle_factories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE -- UNIQUE ensures no duplicate factory names
);

-- Table to store Machine information, linked to vehicle factories
CREATE TABLE machines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  vehicle_factory_id INT,
  FOREIGN KEY (vehicle_factory_id) REFERENCES vehicle_factories(id) ON DELETE CASCADE
  -- ON DELETE CASCADE means if a factory is deleted, its associated machines are also deleted
);



-- Insert Vehicle Factories
INSERT INTO vehicle_factories (name) VALUES
('VEHICLE FACTORY 1'),
('VEHICLE FACTORY 2'),
('VEHICLE FACTORY 3');

-- Insert Machines for each factory
INSERT INTO machines (name, vehicle_factory_id) VALUES
-- VF1 Machines (vehicle_factory_id = 1)
('UREA FILLING MACHINE', 1),
('AC FILLING MACHINE', 1),
('CLUTCH OIL FILLING MACHINE', 1),
('POWER STEERING OIL FILLING MACHINE', 1),
('COOLANT OIL FILLING MACHINE', 1),

-- VF2 Machines (vehicle_factory_id = 2)
('UREA FILLING MACHINE', 2),
('AC FILLING MACHINE', 2),
('CLUTCH OIL FILLING MACHINE', 2),
('POWER STEERING OIL FILLING MACHINE', 2),
('COOLANT OIL FILLING MACHINE', 2),

-- VF3 Machines (vehicle_factory_id = 3)
('UREA FILLING MACHINE', 3),
('AC FILLING MACHINE', 3),
('CLUTCH OIL FILLING MACHINE', 3),
('POWER STEERING OIL FILLING MACHINE', 3),
('COOLANT OIL FILLING MACHINE', 3),
('DIESEL OIL FILLING MACHINE', 3);



-- UREA FILLING Tables (for VF1, VF2, VF3)
CREATE TABLE Urea_Filling_vf1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  VC_No VARCHAR(50) NULL, -- Assuming these can be nullable
  VIN_No VARCHAR(50) NULL,
  Set_Quantity FLOAT NULL,
  Actual_Quantity FLOAT NULL,
  Set_Process_Time INT NULL,
  Actual_Process_Time INT NULL,
  Result VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Automatically records when the row was created
);
CREATE TABLE Urea_Filling_vf2 LIKE Urea_Filling_vf1; -- Creates a table with the same structure
CREATE TABLE Urea_Filling_vf3 LIKE Urea_Filling_vf1;

-- AC FILLING Tables (for VF1, VF2, VF3)
CREATE TABLE AC_Filling_vf1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  AC_VIN VARCHAR(50) NULL,
  AC_Pressure_Actual INT NULL,
  AC_Pressure_Prefill_Actual INT NULL,
  AC_Pressure_Decay INT NULL,
  AC_Vacuum_Actual INT NULL,
  AC_Vacuum_Actual_Time INT NULL,
  AC_Leak_Vacuum_Actual INT NULL,
  AC_Leak_Vacuum_Result CHAR(10) NULL,
  AC_Leak_Vacuum_Actual_Time INT NULL,
  AC_Vacuum2_Actual INT NULL,
  AC_Vacuum2_Actual_Time INT NULL,
  AC_Filling_Quantity_Actual INT NULL,
  AC_Filling_Time_Actual INT NULL,
  AC_Cycle_Time_Actual INT NULL,
  AC_RESULT CHAR(6) NULL
);
CREATE TABLE AC_Filling_vf2 LIKE AC_Filling_vf1;
CREATE TABLE AC_Filling_vf3 LIKE AC_Filling_vf1;

-- CLUTCH OIL FILLING Tables (for VF1, VF2, VF3)
CREATE TABLE Clutch_Process_vf1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Date_Time DATETIME DEFAULT CURRENT_TIMESTAMP, -- Default to current time, can be updated from frontend
  CT_VIN VARCHAR(50) NULL,
  CT_VC VARCHAR(30) NULL,
  CT_Pressure_Build_Actual CHAR(10) NULL,
  CT_Pressure_Stable_Actual CHAR(10) NULL,
  CT_Pressure_Leak_Actual CHAR(10) NULL,
  CT_COA_Vacuum_Actual FLOAT NULL,
  CT_Fine_Vacuum_Actual FLOAT NULL,
  CT_Vacuum_Actual FLOAT NULL,
  CT_Vacuum_Leak_Actual FLOAT NULL,
  CT_Filling_Volume_Actual FLOAT NULL,
  CT_Filling_Pressure_Actual FLOAT NULL,
  CT_Delta_Pressure_Actual CHAR(10) NULL,
  CT_Oil_Fill_Pressure_Actual FLOAT NULL,
  CT_Air_Vent_Actual CHAR(10) NULL,
  CT_Process_Time INT NULL,
  CT_Result VARCHAR(20) NULL
);
CREATE TABLE Clutch_Process_vf2 LIKE Clutch_Process_vf1;
CREATE TABLE Clutch_Process_vf3 LIKE Clutch_Process_vf1;

-- COOLANT FILLING Tables (for VF1, VF2, VF3)
CREATE TABLE Coolant_Process_vf1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  CL_VIN VARCHAR(50) NULL,
  CL_VC VARCHAR(30) NULL,
  CL_AIRING_ACTUAL FLOAT NULL,
  CL_AIRING_LEAK_ACTUAL FLOAT NULL,
  CL_AIRING_LEAK_HOLD FLOAT NULL,
  CL_AIR_VENT_ACTUAL FLOAT NULL,
  CL_VACUUM_ACTUAL FLOAT NULL,
  CL_VACUUM_TIME INT NULL,
  CL_VACUUM_LEAK_ACTUAL FLOAT NULL,
  CL_VACUUM_CHECK_TIME INT NULL,
  CL_REVACUUM_ACTUAL FLOAT NULL,
  CL_REVACUUM_TIME INT NULL,
  CL_OIL_FILLING_PRESSURE FLOAT NULL,
  CL_OIL_ACTUAL_QTY FLOAT NULL,
  CL_OIL_FILLING_ACTUAL INT NULL,
  CL_AUX_TANK_FILLED CHAR(8) NULL,
  CL_CYCLE_TIME INT NULL,
  CL_PROCESS_COMPLETE INT NULL,
  CL_RESULT VARCHAR(20) NULL
);
CREATE TABLE Coolant_Process_vf2 LIKE Coolant_Process_vf1;
CREATE TABLE Coolant_Process_vf3 LIKE Coolant_Process_vf1;

-- POWER STEERING Tables (for VF1, VF2, VF3)
CREATE TABLE Power_Steering_vf1 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  PS_VIN VARCHAR(50) NULL,
  PS_VC VARCHAR(30) NULL,
  PS_AIRING_ACTUAL FLOAT NULL,
  PS_AIRING_LEAK_HOLD FLOAT NULL,
  PS_AIRING_LEAK_ACTUAL FLOAT NULL,
  PS_AIR_VENT_ACTUAL FLOAT NULL,
  PS_VACUUM_ACTUAL FLOAT NULL,
  PS_VACUUM_LEAK_ACTUAL FLOAT NULL,
  PS_REVACUUM_ACTUAL FLOAT NULL,
  PS_OIL_QTY_ACTUAL FLOAT NULL,
  PS_OIL_PRESSURE_ACTUAL FLOAT NULL,
  PS_DELTA_PRESSURE_ACTUAL CHAR(8) NULL,
  PS_PROCESS_COMPLETE INT NULL,
  PS_CYCLE_TIME INT NULL,
  PS_RESULT VARCHAR(10) NULL
);
CREATE TABLE Power_Steering_vf2 LIKE Power_Steering_vf1;
CREATE TABLE Power_Steering_vf3 LIKE Power_Steering_vf1;

-- DIESEL FILLING Table (only for VF3)
CREATE TABLE Diesel_Filling_vf3 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  DL_VIN VARCHAR(30) NULL,
  DL_VC VARCHAR(20) NULL,
  DL_ACT_QTY FLOAT NULL,
  DL_RESULT VARCHAR(10) NULL
);


SHOW TABLES;