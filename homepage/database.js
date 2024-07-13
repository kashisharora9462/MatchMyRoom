import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "Avihar37*6",
    database: "hostel_room_allocation",
  })
  .promise();
export async function gettStudent(roll_Number) {
  const result = await pool.query(
    `select * from student_Information where roll_Number = ? `,
    [roll_Number]
  );
  return result;
}
export async function getStudent(roll_number) {
  const result = await pool.query(
    `select s.roll_Number,s.gender,s.sname,s.department,s.batch,r.room_Number from student_Information s
    join allocated_Rooms r on r.roll_Number = s.roll_Number where s.roll_Number = ? `,
    [roll_number]
  );
  return result;
}
export async function showRoom(room_Number, hostel) {
  console.log(room_Number, hostel);
  const result = await pool.query(
    `select * from rooms where room_Number = ? and hostel_Type=?`,
    [room_Number, hostel]
  );
  console.log(result);
  return result;
}
export async function showAllRooms(hostel) {
  const result = await pool.query(
    `select room_Number,floor,room_Capacity,hostel_Type from rooms where occupancy_Status= 'Vacant' and hostel_Type=?`,
    [hostel]
  );
  // console.log(result);
  return result;
}
  
export async function warden_login(username, password) {
  console.log(username, password);
  const result = await pool.query(
    `select * from warden where username=? and spassword =?`,
    [username, password]
  );
  // console.log(result);
  return result;
}
export async function make_complaint(roll_Number, name, complain_description) {
  await pool.query(
    `insert into complaints (student_name,student_Roll_Number,complaint_description,complaint_Status)
    values(?,?,?,?)`,
    [roll_Number, name, complain_description, "pending"]
  );
}
export async function showComplaints(roll_Number) {
  const result = await pool.query(
    `select student_Name,complaint_description,complaint_Status from complaints where student_Roll_Number = ?`,
    [roll_Number]
  );
  console.log(result);
  return result;
}
export async function showResidents(roomNumber, hostel) {
  const result = await pool.query(
    `SELECT * FROM allocated_Rooms a JOIN student_information s ON a.roll_Number = s.roll_Number WHERE room_Number = ? AND hostel_Type = ?`,
    [roomNumber, hostel]
  );
  return result;
}
/*export async function showResidents(roomNumber,hostel) {
  const result = await pool.query(
    `select * from allocated_Rooms a
      join student_information s on a.roll_Number = s.roll_Number
      where room_Number = ? and hostel_Type= ?`,
    [roomNumber,hostel]
  );
  return result;
}*/
export async function allot() {
  await pool.query(`CALL handle_roommate_requests()`);
  console.log("success");
}
export async function showRequests(roll_Number) {
  const result = await pool.query(
    `select * from roommate_Request where student_roll_Number = ?`,
    [roll_Number]
  );
  console.log(result);
  return result;
}
export async function showAllComplaints(hostel) {
  const result = await pool.query(
    `select * from complaints where complaint_Status = ?`,
    ["pending"]
  );
  return result;
}
export async function showAllrequests() {
  const result = await pool.query(
    `select * from roommate_Request where request_Status = ?`,
    ["pending"]
  );
  return result;
}
export async function roommate_Change(
  name,
  roll_Number1,
  roll_Number2,
  request_desciption
) {
  await pool.query(
    `insert into roommate_Request(student_name ,student_roll_Number ,new_Roommate_Roll ,request_description , request_Status)
    values(?,?,?,?,?)`,
    [name, roll_Number1, roll_Number2, request_desciption, "pending"]
  );
}
export async function login(roll_number, password) {
  const result = await pool.query(
    `SELECT * FROM student_Information WHERE roll_Number = ? AND spassword = ?`,
    [roll_number, password]
  );
  console.log(roll_number, password);
  return result;
}
export async function addStudent(
  roll_number,
  name,
  gender,
  password,
  dept,
  batch
) {
  await pool.query(
    `insert into student_Information (sname, roll_number, batch, gender, spassword, department )
      values (?,?,?,?,?,?)`,
    [name, roll_number, batch, gender, password, dept]
  );
}
export async function getRoom(rollNumber) {
  const result = await pool.query(
    `SELECT allocated_Rooms.room_Number,allocated_Rooms.hostel_Type
    FROM allocated_Rooms
    JOIN student_Information ON allocated_Rooms.roll_Number = student_Information.roll_Number
    WHERE student_Information.roll_Number = ?`,
    [rollNumber]
  );
  return result;
}
async function updateCleaningSchedule() {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool

    // Execute the update query
    await connection.query(`
    UPDATE room_Cleaning_Schedule rcs
    JOIN rooms r ON rcs.room_Number = r.room_Number and rcs.hostel_Type = r.hostel_Type
    SET rcs.cleaning_day = 
      CASE 
          WHEN r.hostel_Type = 'Boys Hostel' AND r.floor = 1 THEN 'Monday'
          WHEN r.hostel_Type = 'Boys Hostel' AND r.floor = 2 THEN 'Tuesday'
          WHEN r.hostel_Type = 'Boys Hostel' AND r.floor = 3 THEN 'Wednesday'
          WHEN r.hostel_Type = 'Girls Hostel' AND r.floor = 1 THEN 'Thursday'
          WHEN r.hostel_Type = 'Girls Hostel' AND r.floor = 2 THEN 'Friday'
          WHEN r.hostel_Type = 'Girls Hostel' AND r.floor = 3 THEN 'Saturday'
          ELSE 'Invalid'
      END,
      rcs.cleaning_Status = 
      CASE 
          WHEN DAYOFWEEK(CURDATE()) > 
               CASE 
                   WHEN rcs.cleaning_day = 'Monday' THEN 2
                   WHEN rcs.cleaning_day = 'Tuesday' THEN 3
                   WHEN rcs.cleaning_day = 'Wednesday' THEN 4
                   WHEN rcs.cleaning_day = 'Thursday' THEN 5
                   WHEN rcs.cleaning_day = 'Friday' THEN 6
                   WHEN rcs.cleaning_day = 'Saturday' THEN 7
                   ELSE 1 -- Default for 'Invalid'
               END THEN 'Completed'
          ELSE 'Pending'
      END;

    `);

    // Release the connection back to the pool
    connection.release();

    console.log("Cleaning schedule updated successfully.");
  } catch (error) {
    console.error("Error updating cleaning schedule:", error);
  }
}

export async function getCleaningDetails(roomNumber, hostel) {
  try {
    updateCleaningSchedule();
    console.log(roomNumber);
    const result = await pool.query(
      `SELECT rcs.room_Number, rcs.cleaning_day, rcs.cleaning_Status
       FROM room_Cleaning_Schedule rcs
       WHERE rcs.room_Number = ? and rcs.hostel_Type = ?`,
      [roomNumber, hostel]
    );
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error fetching cleaning details:", error);
    throw error; // Re-throw the error for better error handling
  }
}
