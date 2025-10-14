// Array of employee data
const employeesData = [
  {
    id: 1,
    employeeId: "FST101",
    employeeName: "Sameer",
    dob: "2003-10-25",
    gender: "Male",
    emailPersonal: "Sam@gmail.com",
    emailOfficial: "Sam@fisto.com",
    phonePersonal: "+91 9876543210",
    phoneOfficial: "+91 9876543211",
    employmentType: "Intern",
    designation: "Developer",
    workingStatus: "active",
    joinDate: "",
    internStartDate: "2025-07-14",
    internEndDate: "2025-10-14",
    durationMonths: "",
    address: "123 Main Street, Coimbatore",
    uploadedFiles: {
      employeePhoto: null,
      resumeCV: null,
      idProof: [null],
      certificates: [null],
      otherDocs: [null]
    },
    submittedAt: "10/14/2025, 1:05:23 PM"
  }
];

// Function to get all employees
function getAllEmployees() {
  return employeesData;
}

// Function to get employee by ID
function getEmployeeById(employeeId) {
  return employeesData.find(emp => emp.employeeId === employeeId);
}

// Function to get first employee
function getFirstEmployee() {
  return employeesData[0];
}
