import express from "express";
import path from "path";
import sha256 from "sha256";
import session from "express-session"; // Import express-session module
import { fileURLToPath } from "url";

import {
  addStudent,
  getStudent,
  login,
  make_complaint,
  roommate_Change,
  showComplaints,
  showAllComplaints,
  showAllRooms,
  warden_login,
  showRoom,
  getRoom,
  getCleaningDetails,
  gettStudent,
  showAllrequests,
  showRequests,
  showResidents,
  allot,
} from "./database.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware for parsing JSON bodies
app.use(express.json());

// Session middleware setup
app.use(
  session({
    secret: "your_secret_key_here", // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/home", (req, res) => {
  const filePath = path.join(__dirname, "/index.html");
  res.sendFile(filePath);
});
app.get("/loading", (req, res) => {
  const filePath = path.join(__dirname, "/loader.html");
  res.sendFile(filePath);
});
app.get("/warden_dashboard", (req, res) => {
  const filePath = path.join(
    __dirname,
    "/warden/warden_showing_page/index.html"
  );
  res.sendFile(filePath);
});
app.get("/complaints", (req, res) => {
  const filePath = path.join(__dirname, "/complain.html");
  console.log(filePath);
  res.sendFile(filePath);
});
app.get("/rooms", (req, res) => {
  const filepath = path.join(__dirname, "/warden/rooms/roomrequest.html");
  console.log(filepath);
  res.sendFile(filepath);
});

app.get("/student_login", (req, res) => {
  const filePath = path.join(__dirname, "student/student_login.html");
  console.log(filePath);
  res.sendFile(filePath);
});
app.get("/student_register", (req, res) => {
  const filepath = path.join(__dirname, "student/student_account/index.html");
  res.sendFile(filepath);
});

app.get("/warden_roommate_change", (req, res) => {
  const filePath = path.join(
    __dirname,
    "warden/warden_showing_page/request.html"
  );
  console.log(filePath);
  res.sendFile(filePath);
});
app.get("/roommate_Change", (req, res) => {
  const filePath = path.join(__dirname, "roommate_change/roommate_change.html");
  console.log(filePath);
  res.sendFile(filePath);
});
app.get("/roommate_request", (req, res) => {
  const filePath = path.join(
    __dirname,
    "student/student_account/room_request.html"
  );
  console.log(filePath);
  res.sendFile(filePath);
});
app.get("/warden_login", (req, res) => {
  const filepath = path.join(__dirname, "warden/warden_page.html");
  console.log(filepath);
  res.sendFile(filepath);
});
app.get("/warden_complaints", (req, res) => {
  const filepath = path.join(
    __dirname,
    "warden/warden_showing_page/complaint.html"
  );
  console.log(filepath);
  res.sendFile(filepath);
});
app.get("/showRoom", async (req, res) => {
  const room_number = req.query.roomNumber;
  const hostel = req.session.hostel;
  try {
    const result = await showRoom(room_number, hostel);
    console.log(result[0]);
    res.send(result[0]);
  } catch (error) {
    console.error("Query execution failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution failed!" });
  }
});
app.get("/showComplaints", async (req, res) => {
  const roll_number = req.query.rollNumber;

  try {
    const result = await showComplaints(roll_number);
    console.log(result[0]);
    res.send(result[0]);
  } catch (error) {
    console.error("Query execution failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution failed!" });
  }
});
app.get("/showResidents", async (req, res) => {
  const roomNumber = req.query.roomNumber;
  const hostel = req.session.hostel; // Add this line to get the hostel from the session
  try {
    const result = await showResidents(roomNumber, hostel);
    console.log(result[0]);
    res.send(result[0]);
  } catch (error) {
    console.error("Query execution failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution failed!" });
  }
});
/*app.get("/showResidents", async (req, res) => {
  const roomNumber = req.query.roomNumber;
  const hostel=req.session.hostel_Type;
  try {
    const result = await showResidents(roomNumber,hostel);
    console.log(result[0]);
    res.send(result[0]);
  } catch (error) {
    console.error("Query execution failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution failed!" });
  }
});*/
app.get("/allot", async (req, res) => {
  try {
    const result = await allot();
    res.send(result);
  } catch (error) {
    console.error("Query execution failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution failed!" });
  }
});
app.get("/showRequests", async (req, res) => {
  const roll_number = req.query.rollNumber;

  try {
    const result = await showRequests(roll_number);
    console.log(result[0]);
    res.send(result[0]);
  } catch (error) {
    console.error("Query execution failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution failed!" });
  }
});
app.get("/getRequests", async (req, res) => {
  try {
    const result = await showAllrequests();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Query execution Failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution Failed!" });
  }
});

app.get("/getComplaints", async (req, res) => {
  try {
    const result = await showAllComplaints();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Query execution Failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution Failed!" });
  }
});
app.get("/getRooms", async (req, res) => {
  const hostel = req.session.hostel;
  console.log(hostel);
  try {
    const result = await showAllRooms(hostel);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Query execution Failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution Failed!" });
  }
});

app.get("/student_dashboard", (req, res) => {
  const filePath = path.join(__dirname, "student/dashboard/welcome.html");
  console.log(filePath);
  res.sendFile(filePath);
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
app.use(express.json());

app.post("/studentComplaint", async (req, res) => {
  const { name, rollNumber, complaint } = req.body;
  try {
    const result = await make_complaint(name, rollNumber, complaint);
    console.log(result);
    res.json({ success: true, message: "Complaint added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Error adding complaint" });
  }
});
app.post("/roommateChange", async (req, res) => {
  const { student_rollNumber, name, roommate_rollNumber, request_description } =
    req.body;
  try {
    const result = await roommate_Change(
      name,
      student_rollNumber,
      roommate_rollNumber,
      request_description
    );
    console.log(result);
    res.json({ success: true, message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Error adding student" });
  }
});

app.post("/studentLogin", async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const result = await login(rollNumber, sha256(password));
    if (result && result[0].length > 0) {
      console.log("Student exists:", result[0]);
      req.session.rollNumber = rollNumber;
      console.log(req.session.rollNumber);
      res.json({ success: true, message: "Valid Student" });
    } else {
      console.log("No matching student record found");
      res
        .status(401)
        .json({ success: false, message: "Invalid login credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/wardenLogin", async (req, res) => {
  const { username, password } = req.body;
  console.log(sha256(password));

  try {
    const result = await warden_login(username, sha256(password));
    if (result && result[0].length > 0) {
      console.log("Student exists:", result[0]);
      req.session.hostel = result[0][0].hostel_Type;
      // console.log(req.session.hostel);
      res.json({ success: true, message: "Valid Student" });
    } else {
      console.log("No matching student record found");
      res
        .status(401)
        .json({ success: false, message: "Invalid login credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/submitStudentDetails", async (req, res) => {
  const { name, rollNumber, batch, gender, password, department } = req.body;

  try {
    const result = await addStudent(
      rollNumber,
      name,
      gender,
      sha256(password),
      department,
      batch
    );
    console.log(result);
    res.json({ success: true, message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, message: "Error adding student" });
  }
});

app.get("/studentDetails", async (req, res) => {
  const rollNumber = req.session.rollNumber;
  console.log(rollNumber);
  try {
    const result = await getStudent(rollNumber);
    console.log(result);
    if (result[0].length > 0) {
      res.send(result);
    } else {
      const result2 = await gettStudent(rollNumber);
      console.log(result2);
      res.send(result2);
    }
  } catch (error) {
    console.error("Query execution Failed!", error);
    res
      .status(500)
      .json({ success: false, message: "Query execution Failed!" });
  }
});
app.get("/getCleaningDetails", async (req, res) => {
  try {
    const studentDetailsResponse = await gettStudent(req.session.rollNumber);
    console.log(studentDetailsResponse);
    // Extract roomNumber from the student details
    const rollNumber = studentDetailsResponse[0][0].roll_Number;
    console.log(rollNumber);
    const temp = await getRoom(rollNumber);
    console.log(temp);
    if (temp[0].length > 0) {
      const roomNumber = temp[0][0].room_Number;
      const hostel = temp[0][0].hostel_Type;
      console.log(hostel);
      console.log(roomNumber);

      // Call getCleaningDetails function with the obtained roomNumber
      const details = await getCleaningDetails(roomNumber, hostel);

      // Send the cleaning details as JSON response
      res.json(details);
      console.log(details);
    } else {
      res.json(temp);
    }
  } catch (error) {
    console.error("Error fetching cleaning details:", error);
    res.status(500).json({ error: error.toString() }); // Send the error message as a string
  }
});