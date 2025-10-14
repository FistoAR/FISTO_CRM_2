// Get employee modal elements
const empModal = document.getElementById('employeeModal');
const empAddBtn = document.getElementById('addEmployeeBtn');
const empCloseBtn = document.querySelector('.emp-modal-close');
const empCancelBtn = document.getElementById('empCancelBtn');
const empForm = document.getElementById('employeeForm');
const empSubmitBtn = document.getElementById('empSubmitBtn');

// Get employment type radio buttons
const empOnRole = document.getElementById('empOnRole');
const empIntern = document.getElementById('empIntern');
const onRoleFields = document.getElementById('onRoleFields');
const internFields = document.getElementById('internFields');

// Get date inputs for duration calculation
const internStartDate = document.getElementById('internStartDate');
const internEndDate = document.getElementById('internEndDate');
const durationMonths = document.getElementById('durationMonths');

// Get password fields
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const passwordError = document.getElementById('passwordError');

// Store uploaded files for each input
const uploadedFiles = {};

// Function to toggle employment fields
function toggleEmploymentFields() {
  if (empIntern.checked) {
    internFields.style.display = 'block';
    onRoleFields.style.display = 'none';
    
    document.getElementById('workingStatusOnRole').removeAttribute('required');
    document.getElementById('joinDateOnRole').removeAttribute('required');
    document.getElementById('internStartDate').setAttribute('required', 'required');
    document.getElementById('internEndDate').setAttribute('required', 'required');
    document.getElementById('workingStatusIntern').setAttribute('required', 'required');
  } else {
    internFields.style.display = 'none';
    onRoleFields.style.display = 'grid';
    
    document.getElementById('workingStatusOnRole').setAttribute('required', 'required');
    document.getElementById('joinDateOnRole').setAttribute('required', 'required');
    document.getElementById('internStartDate').removeAttribute('required');
    document.getElementById('internEndDate').removeAttribute('required');
    document.getElementById('workingStatusIntern').removeAttribute('required');
    
    internStartDate.value = '';
    internEndDate.value = '';
    durationMonths.value = '';
    document.getElementById('workingStatusIntern').value = '';
  }
}

// Function to calculate duration in months
function calculateDuration() {
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

// Function to toggle password visibility
function togglePasswordVisibility(inputField, toggleButton) {
  if (inputField.type === 'password') {
    inputField.type = 'text';
    toggleButton.src = './assets/Imgaes/eye_login.png';
  } else {
    inputField.type = 'password';
    toggleButton.src = './assets/Imgaes/eye_slash_login.png';
  }
}

// Function to check if passwords match
function checkPasswordMatch() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  if (confirmPassword.length > 0) {
    if (password !== confirmPassword) {
      passwordError.style.display = 'block';
      empSubmitBtn.disabled = true;
      empSubmitBtn.style.opacity = '0.5';
      empSubmitBtn.style.cursor = 'not-allowed';
      return false;
    } else {
      passwordError.style.display = 'none';
      empSubmitBtn.disabled = false;
      empSubmitBtn.style.opacity = '1';
      empSubmitBtn.style.cursor = 'pointer';
      return true;
    }
  } else {
    passwordError.style.display = 'none';
    empSubmitBtn.disabled = false;
    empSubmitBtn.style.opacity = '1';
    empSubmitBtn.style.cursor = 'pointer';
    return true;
  }
}

// Function to check if file is an image
function isImageFile(file) {
  return file.type.startsWith('image/');
}

// Function to create preview element
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

// Function to update preview display
function updatePreview(inputId) {
  const previewContainer = document.getElementById(`preview-${inputId}`);
  previewContainer.innerHTML = '';

  if (uploadedFiles[inputId] && uploadedFiles[inputId].length > 0) {
    uploadedFiles[inputId].forEach((file, index) => {
      const previewElement = createPreviewElement(file, inputId, index);
      previewContainer.appendChild(previewElement);
    });
  }
}

// Function to remove a file
function removeFile(inputId, index) {
  if (uploadedFiles[inputId]) {
    uploadedFiles[inputId].splice(index, 1);
    updatePreview(inputId);
    
    // Update the file input
    const input = document.getElementById(inputId);
    const dt = new DataTransfer();
    uploadedFiles[inputId].forEach(file => dt.items.add(file));
    input.files = dt.files;
  }
}

// Handle file upload for all inputs
const fileInputs = document.querySelectorAll('.emp-file-input');
const singleFileInputs = ['employeePhoto', 'resumeCV']; // Only these can have single file

fileInputs.forEach(input => {
  input.addEventListener('change', function() {
    const inputId = this.id;
    const isSingleFile = singleFileInputs.includes(inputId);
    
    if (isSingleFile) {
      // For single file inputs, replace the existing file
      uploadedFiles[inputId] = this.files.length > 0 ? [this.files[0]] : [];
    } else {
      // For multiple file inputs, add new files to existing ones
      if (!uploadedFiles[inputId]) {
        uploadedFiles[inputId] = [];
      }
      
      const newFiles = Array.from(this.files);
      uploadedFiles[inputId] = [...uploadedFiles[inputId], ...newFiles];
      
      // Update the input's files
      const dt = new DataTransfer();
      uploadedFiles[inputId].forEach(file => dt.items.add(file));
      this.files = dt.files;
    }
    
    updatePreview(inputId);
  });
});

// Event listeners for employment type change
empOnRole.addEventListener('change', toggleEmploymentFields);
empIntern.addEventListener('change', toggleEmploymentFields);

// Event listeners for date changes
internStartDate.addEventListener('change', calculateDuration);
internEndDate.addEventListener('change', calculateDuration);

// Event listeners for password visibility toggle
togglePasswordBtn.addEventListener('click', () => {
  togglePasswordVisibility(passwordInput, togglePasswordBtn);
});

toggleConfirmPasswordBtn.addEventListener('click', () => {
  togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
});

// Event listeners for password match validation
passwordInput.addEventListener('input', checkPasswordMatch);
confirmPasswordInput.addEventListener('input', checkPasswordMatch);

// Open employee modal
empAddBtn.addEventListener('click', () => {
  empModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  toggleEmploymentFields();
});

// Close employee modal
empCloseBtn.addEventListener('click', () => {
  empModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

if (empCancelBtn) {
  empCancelBtn.addEventListener('click', () => {
    empModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    empForm.reset();
    toggleEmploymentFields();
    passwordError.style.display = 'none';
    empSubmitBtn.disabled = false;
    empSubmitBtn.style.opacity = '1';
    empSubmitBtn.style.cursor = 'pointer';
    
    // Clear all uploaded files and previews
    Object.keys(uploadedFiles).forEach(key => {
      uploadedFiles[key] = [];
      const previewContainer = document.getElementById(`preview-${key}`);
      if (previewContainer) {
        previewContainer.innerHTML = '';
      }
    });
  });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === empModal) {
    empModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Handle employee form submission
empSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (!empForm.checkValidity()) {
    empForm.reportValidity();
    return;
  }
  
  const empFormData = new FormData(empForm);
  const empData = Object.fromEntries(empFormData.entries());
  
  if (empData.password !== empData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  if (empIntern.checked) {
    const startDate = new Date(internStartDate.value);
    const endDate = new Date(internEndDate.value);
    
    if (endDate < startDate) {
      alert('Intern end date must be after start date!');
      return;
    }
  }
  
  console.log('Employee Data:', empData);
  console.log('Uploaded Files:', uploadedFiles);
  
  empModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  empForm.reset();
  toggleEmploymentFields();
  passwordError.style.display = 'none';
  empSubmitBtn.disabled = false;
  empSubmitBtn.style.opacity = '1';
  empSubmitBtn.style.cursor = 'pointer';
  
  // Clear all uploaded files and previews
  Object.keys(uploadedFiles).forEach(key => {
    uploadedFiles[key] = [];
    const previewContainer = document.getElementById(`preview-${key}`);
    if (previewContainer) {
      previewContainer.innerHTML = '';
    }
  });
  
  alert('Employee added successfully!');
});
