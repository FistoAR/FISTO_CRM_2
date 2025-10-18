// ==================== EMPLOYEE DATA MANAGEMENT ====================
// Store all employees in an array with FAKE DATA
let employeesData = [
    {
        employeeId: 'EMP001',
        employeeName: 'Rajesh Kumar',
        dob: '1990-05-15',
        gender: 'Male',
        emailPersonal: 'rajesh.kumar@gmail.com',
        emailOfficial: 'rajesh.kumar@company.com',
        phonePersonal: '+91 9876543210',
        phoneOfficial: '+91 9876543211',
        designation: 'Senior Developer',
        employmentType: 'On Role',
        workingStatus: 'Working',
        joinDate: '2020-01-15',
        internStartDate: null,
        internEndDate: null,
        durationMonths: null,
        address: '123 MG Road, Coimbatore, Tamil Nadu - 641001',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'EMP002',
        employeeName: 'Priya Sharma',
        dob: '1995-08-22',
        gender: 'Female',
        emailPersonal: 'priya.sharma@gmail.com',
        emailOfficial: 'priya.sharma@company.com',
        phonePersonal: '+91 9876543220',
        phoneOfficial: '+91 9876543221',
        designation: 'UI/UX Designer',
        employmentType: 'On Role',
        workingStatus: 'Working',
        joinDate: '2021-06-10',
        internStartDate: null,
        internEndDate: null,
        durationMonths: null,
        address: '456 RS Puram, Coimbatore, Tamil Nadu - 641002',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'INT001',
        employeeName: 'Arun Vijay',
        dob: '2000-03-12',
        gender: 'Male',
        emailPersonal: 'arun.vijay@gmail.com',
        emailOfficial: 'arun.vijay@company.com',
        phonePersonal: '+91 9876543230',
        phoneOfficial: '+91 9876543231',
        designation: 'Frontend Developer Intern',
        employmentType: 'Intern',
        workingStatus: 'Working',
        joinDate: null,
        internStartDate: '2024-08-01',
        internEndDate: '2025-02-01',
        durationMonths: '6 months',
        address: '789 Gandhipuram, Coimbatore, Tamil Nadu - 641012',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'EMP003',
        employeeName: 'Deepa Lakshmi',
        dob: '1992-11-05',
        gender: 'Female',
        emailPersonal: 'deepa.lakshmi@gmail.com',
        emailOfficial: 'deepa.lakshmi@company.com',
        phonePersonal: '+91 9876543240',
        phoneOfficial: '+91 9876543241',
        designation: 'Project Manager',
        employmentType: 'On Role',
        workingStatus: 'Working',
        joinDate: '2019-03-20',
        internStartDate: null,
        internEndDate: null,
        durationMonths: null,
        address: '321 Saibaba Colony, Coimbatore, Tamil Nadu - 641011',
        photoURL: null,
        uploadedFiles: {}
    },
    {
        employeeId: 'INT002',
        employeeName: 'Karthik Rajan',
        dob: '2001-07-18',
        gender: 'Male',
        emailPersonal: 'karthik.rajan@gmail.com',
        emailOfficial: 'karthik.rajan@company.com',
        phonePersonal: '+91 9876543250',
        phoneOfficial: '+91 9876543251',
        designation: 'Marketing Intern',
        employmentType: 'Intern',
        workingStatus: 'Working',
        joinDate: null,
        internStartDate: '2024-09-01',
        internEndDate: '2025-03-01',
        durationMonths: '6 months',
        address: '555 Peelamedu, Coimbatore, Tamil Nadu - 641004',
        photoURL: null,
        uploadedFiles: {}
    }
];

let currentEditingIndex = null;

// Function to initialize employee details page (called from script.js)
function initializeEmployeeDetailsPage() {
    console.log('Initializing employee details page...');
    
    const empModal = document.getElementById('employeeModal');
    const empAddBtn = document.getElementById('addEmployeeBtn');
    const empCloseBtn = document.querySelector('.emp-modal-close');
    const empCancelBtn = document.getElementById('empCancelBtn');
    const empForm = document.getElementById('employeeForm');
    const empSubmitBtn = document.getElementById('empSubmitBtn');
    const empOnRole = document.getElementById('empOnRole');
    const empIntern = document.getElementById('empIntern');
    const onRoleFields = document.getElementById('onRoleFields');
    const internFields = document.getElementById('internFields');
    const internStartDate = document.getElementById('internStartDate');
    const internEndDate = document.getElementById('internEndDate');
    const durationMonths = document.getElementById('durationMonths');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const passwordError = document.getElementById('passwordError');

    if (!empAddBtn || !empModal) {
        console.error('Employee modal elements not found!');
        return;
    }

    console.log('Elements found, setting up event listeners...');

    const uploadedFiles = {};

    function toggleEmploymentFields() {
        if (empIntern && empIntern.checked) {
            if (internFields) internFields.style.display = 'block';
            if (onRoleFields) onRoleFields.style.display = 'none';
            
            const workingStatusOnRole = document.getElementById('workingStatusOnRole');
            const joinDateOnRole = document.getElementById('joinDateOnRole');
            const workingStatusIntern = document.getElementById('workingStatusIntern');
            
            if (workingStatusOnRole) workingStatusOnRole.removeAttribute('required');
            if (joinDateOnRole) joinDateOnRole.removeAttribute('required');
            if (internStartDate) internStartDate.setAttribute('required', 'required');
            if (internEndDate) internEndDate.setAttribute('required', 'required');
            if (workingStatusIntern) workingStatusIntern.setAttribute('required', 'required');
        } else {
            if (internFields) internFields.style.display = 'none';
            if (onRoleFields) onRoleFields.style.display = 'grid';
            
            const workingStatusOnRole = document.getElementById('workingStatusOnRole');
            const joinDateOnRole = document.getElementById('joinDateOnRole');
            const workingStatusIntern = document.getElementById('workingStatusIntern');
            
            if (workingStatusOnRole) workingStatusOnRole.setAttribute('required', 'required');
            if (joinDateOnRole) joinDateOnRole.setAttribute('required', 'required');
            if (internStartDate) internStartDate.removeAttribute('required');
            if (internEndDate) internEndDate.removeAttribute('required');
            if (workingStatusIntern) workingStatusIntern.removeAttribute('required');
            
            if (internStartDate) internStartDate.value = '';
            if (internEndDate) internEndDate.value = '';
            if (durationMonths) durationMonths.value = '';
            if (workingStatusIntern) workingStatusIntern.value = '';
        }
    }

    function calculateDuration() {
        if (!internStartDate || !internEndDate || !durationMonths) return;
        
        const startDate = new Date(internStartDate.value);
        const endDate = new Date(internEndDate.value);
        
        if (internStartDate.value && internEndDate.value) {
            if (endDate < startDate) {
                durationMonths.value = 'Invalid dates';
                return;
            }
            
            const monthDiff = endDate.getMonth() - startDate.getMonth() + 
                             (12 * (endDate.getFullYear() - startDate.getFullYear()));
            
            const daysDiff = endDate.getDate() - startDate.getDate();
            let totalMonths = monthDiff;
            
            if (daysDiff > 0) {
                totalMonths += daysDiff / 30;
            }
            
            totalMonths = Math.round(totalMonths);
            durationMonths.value = totalMonths + (totalMonths === 1 ? ' month' : ' months');
        } else {
            durationMonths.value = '';
        }
    }

    function togglePasswordVisibility(inputField, toggleButton) {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleButton.src = './assets/Imgaes/eye_login.png';
        } else {
            inputField.type = 'password';
            toggleButton.src = './assets/Imgaes/eye_slash_login.png';
        }
    }

    function checkPasswordMatch() {
        if (!passwordInput || !confirmPasswordInput) return true;
        
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length > 0) {
            if (password !== confirmPassword) {
                if (passwordError) passwordError.style.display = 'block';
                if (empSubmitBtn) {
                    empSubmitBtn.disabled = true;
                    empSubmitBtn.style.opacity = '0.5';
                    empSubmitBtn.style.cursor = 'not-allowed';
                }
                return false;
            } else {
                if (passwordError) passwordError.style.display = 'none';
                if (empSubmitBtn) {
                    empSubmitBtn.disabled = false;
                    empSubmitBtn.style.opacity = '1';
                    empSubmitBtn.style.cursor = 'pointer';
                }
                return true;
            }
        } else {
            if (passwordError) passwordError.style.display = 'none';
            if (empSubmitBtn) {
                empSubmitBtn.disabled = false;
                empSubmitBtn.style.opacity = '1';
                empSubmitBtn.style.cursor = 'pointer';
            }
            return true;
        }
    }

    function isImageFile(file) {
        return file.type.startsWith('image/');
    }

    function createPreviewElement(file, inputId, index) {
        const previewItem = document.createElement('div');
        previewItem.className = 'emp-preview-item';
        previewItem.dataset.index = index;

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'emp-preview-cancel';
        cancelBtn.innerHTML = '×';
        cancelBtn.type = 'button';
        cancelBtn.onclick = () => removeFile(inputId, index);

        if (isImageFile(file)) {
            const img = document.createElement('img');
            img.className = 'emp-preview-image';
            img.src = URL.createObjectURL(file);
            previewItem.appendChild(img);
        } else {
            const fileInfo = document.createElement('div');
            fileInfo.className = 'emp-preview-file';
            
            const fileIcon = document.createElement('span');
            fileIcon.className = 'emp-preview-file-icon';
            fileIcon.innerHTML = '📄';
            
            const fileName = document.createElement('span');
            fileName.className = 'emp-preview-file-name';
            fileName.textContent = file.name;
            
            fileInfo.appendChild(fileIcon);
            fileInfo.appendChild(fileName);
            previewItem.appendChild(fileInfo);
        }

        previewItem.appendChild(cancelBtn);
        return previewItem;
    }

    function updatePreview(inputId) {
        const previewContainer = document.getElementById(`preview-${inputId}`);
        if (!previewContainer) return;
        
        previewContainer.innerHTML = '';

        if (uploadedFiles[inputId] && uploadedFiles[inputId].length > 0) {
            uploadedFiles[inputId].forEach((file, index) => {
                const previewElement = createPreviewElement(file, inputId, index);
                previewContainer.appendChild(previewElement);
            });
        }
    }

    function removeFile(inputId, index) {
        if (uploadedFiles[inputId]) {
            uploadedFiles[inputId].splice(index, 1);
            updatePreview(inputId);
            
            const input = document.getElementById(inputId);
            if (input) {
                const dt = new DataTransfer();
                uploadedFiles[inputId].forEach(file => dt.items.add(file));
                input.files = dt.files;
            }
        }
    }

    const fileInputs = document.querySelectorAll('.emp-file-input');
    const singleFileInputs = ['employeePhoto', 'resumeCV'];

    fileInputs.forEach(input => {
        input.onchange = function() {
            const inputId = this.id;
            const isSingleFile = singleFileInputs.includes(inputId);
            
            if (isSingleFile) {
                uploadedFiles[inputId] = this.files.length > 0 ? [this.files[0]] : [];
            } else {
                if (!uploadedFiles[inputId]) {
                    uploadedFiles[inputId] = [];
                }
                
                const newFiles = Array.from(this.files);
                uploadedFiles[inputId] = [...uploadedFiles[inputId], ...newFiles];
                
                const dt = new DataTransfer();
                uploadedFiles[inputId].forEach(file => dt.items.add(file));
                this.files = dt.files;
            }
            
            updatePreview(inputId);
        };
    });

    if (empOnRole) empOnRole.onchange = toggleEmploymentFields;
    if (empIntern) empIntern.onchange = toggleEmploymentFields;
    if (internStartDate) internStartDate.onchange = calculateDuration;
    if (internEndDate) internEndDate.onchange = calculateDuration;

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.onclick = () => togglePasswordVisibility(passwordInput, togglePasswordBtn);
    }

    if (toggleConfirmPasswordBtn && confirmPasswordInput) {
        toggleConfirmPasswordBtn.onclick = () => togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
    }

    if (passwordInput) passwordInput.oninput = checkPasswordMatch;
    if (confirmPasswordInput) confirmPasswordInput.oninput = checkPasswordMatch;

    empAddBtn.onclick = () => {
        console.log('Add Employee button clicked!');
        resetEditingIndex();
        empModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        toggleEmploymentFields();
    };

    if (empCloseBtn) {
        empCloseBtn.onclick = () => {
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }

    if (empCancelBtn) {
        empCancelBtn.onclick = () => {
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            empForm.reset();
            toggleEmploymentFields();
            if (passwordError) passwordError.style.display = 'none';
            if (empSubmitBtn) {
                empSubmitBtn.disabled = false;
                empSubmitBtn.style.opacity = '1';
                empSubmitBtn.style.cursor = 'pointer';
            }
            
            Object.keys(uploadedFiles).forEach(key => {
                uploadedFiles[key] = [];
                const previewContainer = document.getElementById(`preview-${key}`);
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
            });
        };
    }

    empModal.onclick = (e) => {
        if (e.target === empModal) {
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (empForm) {
        empForm.onsubmit = function(e) {
            e.preventDefault();
            return false;
        };
    }

    if (empSubmitBtn) {
        empSubmitBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Submit button clicked');
            
            if (!empForm.checkValidity()) {
                empForm.reportValidity();
                return false;
            }
            
            const empFormData = new FormData(empForm);
            const empData = Object.fromEntries(empFormData.entries());
            
            if (empData.password !== empData.confirmPassword) {
                alert('Passwords do not match!');
                return false;
            }
            
            if (empIntern && empIntern.checked) {
                const startDate = new Date(internStartDate.value);
                const endDate = new Date(internEndDate.value);
                
                if (endDate < startDate) {
                    alert('Intern end date must be after start date!');
                    return false;
                }
            }
            
            let photoURL = null;
            if (uploadedFiles.employeePhoto && uploadedFiles.employeePhoto.length > 0) {
                photoURL = URL.createObjectURL(uploadedFiles.employeePhoto[0]);
            }
            
            const newEmployee = {
                employeeId: empData.employeeId,
                employeeName: empData.employeeName,
                dob: empData.dob,
                gender: empData.gender,
                emailPersonal: empData.emailPersonal,
                emailOfficial: empData.emailOfficial,
                phonePersonal: empData.phonePersonal,
                phoneOfficial: empData.phoneOfficial,
                designation: empData.designation,
                employmentType: empData.employmentType,
                workingStatus: empData.employmentType === 'On Role' ? empData.workingStatus : empData.workingStatusIntern,
                joinDate: empData.joinDate || null,
                internStartDate: empData.internStartDate || null,
                internEndDate: empData.internEndDate || null,
                durationMonths: empData.durationMonths || null,
                address: empData.address,
                photoURL: photoURL,
                uploadedFiles: JSON.parse(JSON.stringify(uploadedFiles))
            };
            
            addEmployeeToData(newEmployee);
            
            empModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            empForm.reset();
            toggleEmploymentFields();
            if (passwordError) passwordError.style.display = 'none';
            if (empSubmitBtn) {
                empSubmitBtn.disabled = false;
                empSubmitBtn.style.opacity = '1';
                empSubmitBtn.style.cursor = 'pointer';
            }
            
            Object.keys(uploadedFiles).forEach(key => {
                uploadedFiles[key] = [];
                const previewContainer = document.getElementById(`preview-${key}`);
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
            });
            
            alert('Employee added successfully!');
            return false;
        };
    }

    // Initial table render with fake data
    renderEmployeeTable();

    console.log('Employee details page initialized successfully!');
}

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
