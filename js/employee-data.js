// ==================== EMPLOYEE DATA MANAGEMENT ====================
// Store all employees in an array
let employeesData = [];
let currentEditingIndex = null;

// Function to render the employee table
function renderEmployeeTable() {
    const tableBody = document.getElementById('employeeTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (employeesData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 40px; color: #999;">
                    No employees added yet. Click "Add Employee" to get started.
                </td>
            </tr>
        `;
        return;
    }
    
    employeesData.forEach((employee, index) => {
        const row = document.createElement('tr');
        
        // Get job role badge color
        let jobRoleBadgeClass = '';
        if (employee.employmentType === 'On Role') {
            jobRoleBadgeClass = 'job-role-onrole';
        } else {
            jobRoleBadgeClass = 'job-role-intern';
        }
        
        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>
                <div class="employee-name-cell">
                    <div class="employee-avatar">
                        ${employee.photoURL ? 
                            `<img src="${employee.photoURL}" alt="${employee.employeeName}">` : 
                            `<div class="avatar-placeholder">${employee.employeeName.charAt(0).toUpperCase()}</div>`
                        }
                    </div>
                    <span>${employee.employeeName}</span>
                </div>
            </td>
            <td>${employee.designation}</td>
            <td><span class="job-role-badge ${jobRoleBadgeClass}">${employee.employmentType}</span></td>
            <td><span class="status-badge status-working">${employee.workingStatus}</span></td>
            <td>
                <div class="contact-cell">
                    <img src="./assets/Imgaes/table_mail.png" alt="Email" class="contact-icon">
                    ${employee.emailPersonal}
                </div>
            </td>
            <td>
                <div class="contact-cell">
                    <img src="./assets/Imgaes/table_call.png" alt="Phone" class="contact-icon">
                    ${employee.phonePersonal}
                </div>
            </td>
            <td>
                <button class="table-view-btn" onclick="viewEmployee(${index})">
                    <img src="./assets/Imgaes/table_eye.png" alt="View">
                </button>
            </td>
            <td>
                <button class="table-delete-btn" onclick="deleteEmployee(${index})">
                    <img src="./assets/Imgaes/preview_delete_btn.png" alt="Delete">
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Function to view employee (opens update modal with data)
function viewEmployee(index) {
    currentEditingIndex = index;
    const employee = employeesData[index];
    
    // Populate update modal with employee data
    if (typeof populateUpdateModal === 'function') {
        populateUpdateModal(employee);
    }
    
    // Open update modal
    const updateEmployeeModal = document.getElementById('updateEmployeeModal');
    if (updateEmployeeModal) {
        updateEmployeeModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Function to delete employee
function deleteEmployee(index) {
    const employee = employeesData[index];
    if (confirm(`Are you sure you want to delete ${employee.employeeName}?`)) {
        employeesData.splice(index, 1);
        renderEmployeeTable();
        alert('Employee deleted successfully!');
    }
}

// Function to add employee to data
function addEmployeeToData(employeeData) {
    employeesData.push(employeeData);
    renderEmployeeTable();
}

// Function to update employee in data
function updateEmployeeInData(index, employeeData) {
    if (index !== null && index >= 0 && index < employeesData.length) {
        employeesData[index] = employeeData;
        renderEmployeeTable();
    }
}

// Function to get current editing index
function getCurrentEditingIndex() {
    return currentEditingIndex;
}

// Function to reset editing index
function resetEditingIndex() {
    currentEditingIndex = null;
}
