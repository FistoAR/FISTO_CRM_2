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
        if (typeof resetEditingIndex === 'function') {
            resetEditingIndex();
        }
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
            
            if (typeof addEmployeeToData === 'function') {
                addEmployeeToData(newEmployee);
            }
            
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

    console.log('Employee details page initialized successfully!');
}
