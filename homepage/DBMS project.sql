create database hostel_room_allocation;
use hostel_room_allocation;

CREATE TABLE student_Information (
    roll_Number INT PRIMARY KEY not null,
    sname VARCHAR(255) not null ,
    gender VARCHAR(10) not null,
    contact_Information VARCHAR(255) not null,
    department VARCHAR(255) not null,
    batch INT not null
   );

CREATE TABLE rooms(
    room_Number INT not null,
	occupancy_Status VARCHAR(20) not null,
    floor INT not null,
    Can_Accomodate INT not null,
    hostel_Type varchar(20) not null,
    primary key(room_Number,hostel_type)
);
-- drop database hostel_room_allocation;

CREATE TABLE allocated_Rooms(
    roll_Number INT not null,
    room_Number INT not null,
    hostel_type varchar(20) not null,
	move_In_Date DATE,
    move_Out_Date DATE,
    FOREIGN KEY (roll_number) REFERENCES student_Information(roll_Number),
    FOREIGN KEY (room_Number) REFERENCES rooms(room_Number),
    PRIMARY KEY (roll_Number,room_Number)
);

CREATE TABLE roommate_Assignment(
    student1_roll_Number INT not null,
    student2_roll_Number INT not null,
    room_Number INT not null,
	effective_From_Date DATE not null,
    effective_To_Date DATE,
    hostel_type varchar(20),
    FOREIGN KEY (student1_roll_Number) REFERENCES student_Information(roll_Number),
    FOREIGN KEY (student2_roll_Number) REFERENCES student_Information(roll_Number),
    FOREIGN KEY (room_Number) REFERENCES rooms(room_Number),
    primary key(student1_roll_Number,student2_roll_Number)
);

CREATE TABLE roommate_Change_Request (
    request_ID INT PRIMARY KEY not null,
    student_roll_Number INT not null ,
    current_Roommate_Roll INT not null,
    new_Roommate_Roll INT not null,
    requested_Date DATE not null,
    request_Status VARCHAR(20),
    FOREIGN KEY (student_roll_Number) REFERENCES student_Information(roll_Number)
);

CREATE TABLE room_Cleaning_Schedule (
    schedule_ID INT PRIMARY KEY not null,
    room_Number INT not null,
    hostel_type varchar(20),
    requested_Date DATE not null,
    cleaning_Status VARCHAR(20) not null,
    FOREIGN KEY (room_Number) REFERENCES rooms(room_Number)
  );
  
CREATE TABLE complaints (
    complaint_ID INT PRIMARY KEY not null,
    student_Roll_Number INT not null,
    date_of_Complaint DATE not null,
    nature_Of_Complaint TEXT not null,
    complaint_Status VARCHAR(20) not null,
    FOREIGN KEY (student_roll_Number) REFERENCES student_Information(roll_Number)
);

CREATE TABLE guest_Registration_Log (
    guest_ID INT PRIMARY KEY not null,
    guest_Name VARCHAR(255) not null,
    student_Roll_Number INT not null,
    room_Number INT not null,
    arrival_Date date,
    hostel_type varchar(20) not null,
    FOREIGN KEY (student_Roll_Number) REFERENCES student_Information(roll_Number),
    FOREIGN KEY (room_Number) REFERENCES rooms(room_Number)
);


CREATE TABLE parcel_Arrived_Received (
    parcel_ID INT PRIMARY KEY not null,
    receiver_Student_roll_Number INT not null,
	sender_Information VARCHAR(255)not null,
	arrival_Date DATE not null,
    received_Date DATE ,
    parcel_Status VARCHAR(20) not null,
    hostel_type varchar(20) not null,
    FOREIGN KEY (receiver_Student_roll_Number) REFERENCES student_Information(roll_Number)
);
select * from student_Information;
INSERT INTO rooms VALUES
(1, 'Vacant', 1, 1, 'Boys Hostel'),
(2, 'Vacant', 1, 2, 'Boys Hostel'),
(3, 'Vacant', 1, 1, 'Boys Hostel'),
(4, 'Vacant', 1, 2, 'Boys Hostel'),
(5, 'Vacant', 1, 1, 'Boys Hostel'),
(6, 'Vacant', 1, 2, 'Boys Hostel'),
(7, 'Vacant', 1, 1, 'Boys Hostel'),
(8, 'Vacant', 1, 2, 'Boys Hostel'),
(9, 'Vacant', 1, 1, 'Boys Hostel'),
(10, 'Vacant', 1, 2, 'Boys Hostel'),
(11, 'Vacant', 1, 1, 'Boys Hostel'),
(12, 'Vacant', 1, 2, 'Boys Hostel'),
(13, 'Vacant', 1, 1, 'Boys Hostel'),
(14, 'Vacant', 1, 2, 'Boys Hostel'),
(15, 'Vacant', 1, 1, 'Boys Hostel'),
(16, 'Vacant', 1, 2, 'Boys Hostel'),
(17, 'Vacant', 1, 1, 'Boys Hostel'),
(18, 'Vacant', 1, 2, 'Boys Hostel'),
(19, 'Vacant', 1, 1, 'Boys Hostel'),
(20, 'Vacant', 1, 2, 'Boys Hostel'),
(21, 'Vacant', 2, 2, 'Boys Hostel'),
(22, 'Vacant', 2, 1, 'Boys Hostel'),
(23, 'Vacant', 2, 2, 'Boys Hostel'),
(24, 'Vacant', 2, 1, 'Boys Hostel'),
(25, 'Vacant', 2, 2, 'Boys Hostel'),
(26, 'Vacant', 2, 1, 'Boys Hostel'),
(27, 'Vacant', 2, 2, 'Boys Hostel'),
(28, 'Vacant', 2, 1, 'Boys Hostel'),
(29, 'Vacant', 2, 2, 'Boys Hostel'),
(30, 'Vacant', 2, 1, 'Boys Hostel'),
(31, 'Vacant', 2, 2, 'Boys Hostel'),
(32, 'Vacant', 2, 1, 'Boys Hostel'),
(33, 'Vacant', 2, 2, 'Boys Hostel'),
(34, 'Vacant', 2, 1, 'Boys Hostel'),
(35, 'Vacant', 2, 2, 'Boys Hostel'),
(36, 'Vacant', 2, 1, 'Boys Hostel'),
(37, 'Vacant', 2, 2, 'Boys Hostel'),
(38, 'Vacant', 2, 1, 'Boys Hostel'),
(39, 'Vacant', 2, 2, 'Boys Hostel'),
(40, 'Vacant', 2, 1, 'Boys Hostel'),
(41, 'Vacant', 3, 2, 'Boys Hostel'),
(42, 'Vacant', 3, 1, 'Boys Hostel'),
(43, 'Vacant', 3, 2, 'Boys Hostel'),
(44, 'Vacant', 3, 1, 'Boys Hostel'),
(45, 'Vacant', 3, 2, 'Boys Hostel'),
(46, 'Vacant', 3, 1, 'Boys Hostel'),
(47, 'Vacant', 3, 2, 'Boys Hostel'),
(48, 'Vacant', 3, 1, 'Boys Hostel'),
(49, 'Vacant', 3, 2, 'Boys Hostel'),
(50, 'Vacant', 3, 1, 'Boys Hostel'),
(51, 'Vacant', 3, 2, 'Boys Hostel'),
(52, 'Vacant', 3, 1, 'Boys Hostel'),
(53, 'Vacant', 3, 2, 'Boys Hostel'),
(54, 'Vacant', 3, 1, 'Boys Hostel'),
(55, 'Vacant', 3, 2, 'Boys Hostel'),
(56, 'Vacant', 3, 1, 'Boys Hostel'),
(57, 'Vacant', 3, 2, 'Boys Hostel'),
(58, 'Vacant', 3, 1, 'Boys Hostel'),
(59, 'Vacant', 3, 2, 'Boys Hostel'),
(60, 'Vacant', 3, 1, 'Boys Hostel'),
(1, 'Vacant', 1, 1, 'Girls Hostel'),
(2, 'Vacant', 1, 2, 'Girls Hostel'),
(3, 'Vacant', 1, 1, 'Girls Hostel'),
(4, 'Vacant', 1, 2, 'Girls Hostel'),
(5, 'Vacant', 1, 1, 'Girls Hostel'),
(6, 'Vacant', 1, 2, 'Girls Hostel'),
(7, 'Vacant', 1, 1, 'Girls Hostel'),
(8, 'Vacant', 1, 2, 'Girls Hostel'),
(9, 'Vacant', 1, 1, 'Girls Hostel'),
(10, 'Vacant', 1, 2, 'Girls Hostel'),
(11, 'Vacant', 1, 1, 'Girls Hostel'),
(12, 'Vacant', 1, 2, 'Girls Hostel'),
(13, 'Vacant', 1, 1, 'Girls Hostel'),
(14, 'Vacant', 1, 2, 'Girls Hostel'),
(15, 'Vacant', 1, 1, 'Girls Hostel'),
(16, 'Vacant', 1, 2, 'Girls Hostel'),
(17, 'Vacant', 1, 1, 'Girls Hostel'),
(18, 'Vacant', 1, 2, 'Girls Hostel'),
(19, 'Vacant', 1, 1, 'Girls Hostel'),
(20, 'Vacant', 1, 2, 'Girls Hostel'),
(21, 'Vacant', 2, 1, 'Girls Hostel'),
(22, 'Vacant', 2, 2, 'Girls Hostel'),
(23, 'Vacant', 2, 1, 'Girls Hostel'),
(24, 'Vacant', 2, 2, 'Girls Hostel'),
(25, 'Vacant', 2, 1, 'Girls Hostel'),
(26, 'Vacant', 2, 2, 'Girls Hostel'),
(27, 'Vacant', 2, 1, 'Girls Hostel');

DELIMITER $$

select * from rooms;
 
INSERT INTO roommate_Change_Request VALUES
    (1, 2111011, 2117017, 2103003, '2021-08-04', 'Pending'),
    (2, 2204004, 2206006, 2227027, '2022-12-08', 'Pending'),
    (3, 2215015, 2218018, 2221021, '2022-12-03', 'Pending');

INSERT INTO room_Cleaning_Schedule VALUES
(2, 003, 'Boys Hostel', '2024-07-22', 'Pending'),
(5, 006, 'Boys Hostel', '2024-09-18', 'Pending'),
(6, 007, 'Boys Hostel', '2024-08-30', 'Pending'),
(12, 013, 'Boys Hostel', '2024-02-28', 'Pending'),
(13, 014, 'Boys Hostel', '2024-08-01', 'Pending'),
(16, 017, 'Boys Hostel', '2024-11-08', 'Pending'),
(19, 001, 'Girls Hostel', '2024-03-15', 'Pending'),
(20, 002, 'Girls Hostel', '2024-07-27', 'Pending'),
(23, 005, 'Girls Hostel', '2024-12-02', 'Pending');

-- list of all roommate change
SELECT rcr.request_ID, s.sname AS student_name, s2.sname AS current_roommate_name, s3.sname AS new_roommate_name, rcr.requested_Date, rcr.request_Status
FROM roommate_Change_Request rcr
INNER JOIN student_Information s ON rcr.student_roll_Number = s.roll_Number
INNER JOIN student_Information s2 ON rcr.current_Roommate_Roll = s2.roll_Number
INNER JOIN student_Information s3 ON rcr.new_Roommate_Roll = s3.roll_Number;

-- List of all rooms that need cleaning with their cleaning status:
SELECT room_Number, cleaning_Status
FROM room_Cleaning_Schedule
WHERE cleaning_Status = 'Pending';




