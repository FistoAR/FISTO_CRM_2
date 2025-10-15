// Function to initialize update employee modal (called from script.js)
function initializeUpdateEmployeeModal() {
  console.log('Initializing update employee modal...');
  
  const updateEmployeeModal = document.getElementById("updateEmployeeModal");
  const updateModalClose = document.querySelector(".update-emp-modal-close");
  const fileViewModal = document.getElementById("fileViewModal");
  const fileViewContent = document.getElementById("fileViewContent");
  const fileViewClose = document.querySelector(".update-emp-view-modal-close");

  if (!updateEmployeeModal) {
    console.error("updateEmployeeModal not found!");
    return;
  }

  console.log('Update modal elements found!');

  const uploadedFiles = {
    employeePhoto: null,
    resumeCV: null,
    idProof: [],
    certificates: [],
    otherDocs: [],
  };

  function downloadFile(fileUrl, fileName) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function viewFile(fileUrl, fileType, fileName) {
    if (!fileViewModal || !fileViewContent) return;
 
    fileViewContent.innerHTML = "";
    const previewContainer = document.createElement("div");
    previewContainer.style.marginBottom = "20px";

    if (fileType.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = fileUrl;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "70vh";
      img.style.objectFit = "contain";
      previewContainer.appendChild(img);
    } else if (fileType === "application/pdf") {
      const iframe = document.createElement("iframe");
      iframe.src = fileUrl;
      iframe.style.width = "100%";
      iframe.style.height = "70vh";
      iframe.style.border = "none";
      previewContainer.appendChild(iframe);
    } else {
      const message = document.createElement("p");
      message.textContent = `File: ${fileName}`;
      message.style.color = "white";
      message.style.textAlign = "center";
      message.style.fontSize = "18px";
      message.style.marginTop = "50px";
      previewContainer.appendChild(message);

      const fileIcon = document.createElement("div");
      fileIcon.textContent = "📄";
      fileIcon.style.fontSize = "100px";
      fileIcon.style.textAlign = "center";
      fileIcon.style.marginTop = "20px";
      previewContainer.appendChild(fileIcon);
    }

    fileViewContent.appendChild(previewContainer);

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.className = "update-emp-download-btn";
    downloadBtn.onclick = function () {
      downloadFile(fileUrl, fileName);
    };

    fileViewContent.appendChild(downloadBtn);
    fileViewModal.style.display = "block";
  }

  function populateModalWithData(employeeData) {
    const form = document.getElementById("updateEmployeeForm");
    
    if (!employeeData || !form) {
      console.error("No employee data or form not found!");
      return;
    }

    console.log("Loading employee data:", employeeData);

    form.querySelector('[name="employeeId"]').value = employeeData.employeeId || '';
    form.querySelector('[name="employeeName"]').value = employeeData.employeeName || '';
    form.querySelector('[name="dob"]').value = employeeData.dob || '';
    
    if (employeeData.gender) {
      const genderValue = employeeData.gender.toLowerCase();
      const genderRadio = form.querySelector(`input[name="gender"][value="${genderValue}"]`);
      if (genderRadio) {
        genderRadio.checked = true;
      }
    }

    form.querySelector('[name="emailPersonal"]').value = employeeData.emailPersonal || '';
    form.querySelector('[name="emailOfficial"]').value = employeeData.emailOfficial || '';
    form.querySelector('[name="phonePersonal"]').value = employeeData.phonePersonal || '';
    form.querySelector('[name="phoneOfficial"]').value = employeeData.phoneOfficial || '';

    const employmentTypeRadio = form.querySelector(`input[name="employmentType"][value="${employeeData.employmentType}"]`);
    if (employmentTypeRadio) {
      employmentTypeRadio.checked = true;
      
      // Manually trigger toggle
      const updateEmpOnRole = document.getElementById("updateEmpOnRole");
      const updateEmpIntern = document.getElementById("updateEmpIntern");
      const updateOnRoleFields = document.getElementById("updateOnRoleFields");
      const updateInternFields = document.getElementById("updateInternFields");
      
      if (employeeData.employmentType === "On Role") {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "grid";
        if (updateInternFields) updateInternFields.style.display = "none";
      } else {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "none";
        if (updateInternFields) updateInternFields.style.display = "block";
      }
    }

    form.querySelector('[name="designation"]').value = employeeData.designation || '';

    setTimeout(() => {
      if (employeeData.employmentType === "On Role") {
        const workingStatus = form.querySelector('[name="workingStatus"]');
        const joinDate = form.querySelector('[name="joinDate"]');
        if (workingStatus) workingStatus.value = employeeData.workingStatus || '';
        if (joinDate) joinDate.value = employeeData.joinDate || '';
      } else if (employeeData.employmentType === "Intern") {
        const internStart = form.querySelector('[name="internStartDate"]');
        const internEnd = form.querySelector('[name="internEndDate"]');
        const duration = form.querySelector('[name="durationMonths"]');
        const workingStatusIntern = form.querySelector('[name="workingStatusIntern"]');
        
        if (internStart) internStart.value = employeeData.internStartDate || '';
        if (internEnd) internEnd.value = employeeData.internEndDate || '';
        if (duration) duration.value = employeeData.durationMonths || '';
        if (workingStatusIntern) workingStatusIntern.value = employeeData.workingStatus || '';
      }
    }, 100);

    form.querySelector('[name="address"]').value = employeeData.address || '';

    document.getElementById('updateModalTitle').textContent = 'Update Employee - ' + employeeData.employeeName;
    document.getElementById('updateEmpSubmitBtn').textContent = 'Save Changes';
  }

  window.populateUpdateModal = populateModalWithData;

  function closeModal() {
    updateEmployeeModal.style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById('updateModalTitle').textContent = 'Update Employee Details';
    document.getElementById('updateEmpSubmitBtn').textContent = 'Update Employee';
  }

  if (updateModalClose) {
    updateModalClose.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    };
  }

  updateEmployeeModal.onclick = function(event) {
    if (event.target === updateEmployeeModal) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };

  if (fileViewClose) {
    fileViewClose.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      fileViewModal.style.display = "none";
    };
  }

  if (fileViewModal) {
    fileViewModal.onclick = function(event) {
      if (event.target === fileViewModal) {
        event.preventDefault();
        event.stopPropagation();
        fileViewModal.style.display = "none";
      }
    };
  }

  const updateEmpOnRole = document.getElementById("updateEmpOnRole");
  const updateEmpIntern = document.getElementById("updateEmpIntern");
  const updateOnRoleFields = document.getElementById("updateOnRoleFields");
  const updateInternFields = document.getElementById("updateInternFields");

  if (updateEmpOnRole) {
    updateEmpOnRole.onchange = function() {
      if (this.checked) {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "grid";
        if (updateInternFields) updateInternFields.style.display = "none";
      }
    };
  }

  if (updateEmpIntern) {
    updateEmpIntern.onchange = function() {
      if (this.checked) {
        if (updateOnRoleFields) updateOnRoleFields.style.display = "none";
        if (updateInternFields) updateInternFields.style.display = "block";
      }
    };
  }

  const updateInternStartDate = document.getElementById("updateInternStartDate");
  const updateInternEndDate = document.getElementById("updateInternEndDate");
  const updateDurationMonths = document.getElementById("updateDurationMonths");

  function calculateDuration() {
    if (updateInternStartDate && updateInternEndDate && updateDurationMonths) {
      if (updateInternStartDate.value && updateInternEndDate.value) {
        const start = new Date(updateInternStartDate.value);
        const end = new Date(updateInternEndDate.value);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        updateDurationMonths.value = months + " months";
      }
    }
  }

  if (updateInternStartDate) {
    updateInternStartDate.onchange = calculateDuration;
  }

  if (updateInternEndDate) {
    updateInternEndDate.onchange = calculateDuration;
  }

  function handleSingleFilePreview(inputId, previewId, storageKey) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);

    if (!input || !previewContainer) return;

    input.onchange = function() {
      previewContainer.innerHTML = "";
      const file = this.files[0];

      if (file) {
        uploadedFiles[storageKey] = file;
        const fileType = file.type;
        const fileName = file.name;
        const fileUrl = URL.createObjectURL(file);

        const previewItem = document.createElement("div");
        previewItem.className = "update-emp-preview-item";

        if (fileType.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = fileUrl;
          img.className = "update-emp-preview-image";
          previewItem.appendChild(img);
        } else {
          const fileInfo = document.createElement("div");
          fileInfo.className = "update-emp-preview-file";

          const fileIcon = document.createElement("div");
          fileIcon.className = "update-emp-preview-file-icon";
          fileIcon.textContent = "📄";
          fileInfo.appendChild(fileIcon);

          const fileNameDiv = document.createElement("div");
          fileNameDiv.className = "update-emp-preview-file-name";
          fileNameDiv.textContent = fileName;
          fileInfo.appendChild(fileNameDiv);

          previewItem.appendChild(fileInfo);
        }

        const xBtn = document.createElement("button");
        xBtn.innerHTML = "×";
        xBtn.className = "update-emp-preview-x-btn";
        xBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm("Are you sure you want to remove this file?")) {
            previewItem.remove();
            input.value = "";
            uploadedFiles[storageKey] = null;
          }
        };
        previewItem.appendChild(xBtn);

        const btnContainer = document.createElement("div");
        btnContainer.className = "update-emp-preview-actions";

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View";
        viewBtn.className = "update-emp-preview-view-btn";
        viewBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          viewFile(fileUrl, fileType, fileName);
        };
        btnContainer.appendChild(viewBtn);

        const downloadBtn = document.createElement("button");
        downloadBtn.textContent = "Download";
        downloadBtn.className = "update-emp-preview-download-btn-inline";
        downloadBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          downloadFile(fileUrl, fileName);
        };
        btnContainer.appendChild(downloadBtn);

        previewItem.appendChild(btnContainer);
        previewContainer.appendChild(previewItem);
      }
    };
  }

  function handleMultipleFilePreview(inputId, previewId, storageKey) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);

    if (!input || !previewContainer) return;

    input.onchange = function() {
      const files = this.files;

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          uploadedFiles[storageKey].push(file);

          const fileType = file.type;
          const fileName = file.name;
          const fileUrl = URL.createObjectURL(file);

          const previewItem = document.createElement("div");
          previewItem.className = "update-emp-preview-item";
          previewItem.dataset.fileIndex = uploadedFiles[storageKey].length - 1;

          if (fileType.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = fileUrl;
            img.className = "update-emp-preview-image";
            previewItem.appendChild(img);
          } else {
            const fileInfo = document.createElement("div");
            fileInfo.className = "update-emp-preview-file";

            const fileIcon = document.createElement("div");
            fileIcon.className = "update-emp-preview-file-icon";
            fileIcon.textContent = "📄";
            fileInfo.appendChild(fileIcon);

            const fileNameDiv = document.createElement("div");
            fileNameDiv.className = "update-emp-preview-file-name";
            fileNameDiv.textContent = fileName;
            fileInfo.appendChild(fileNameDiv);

            previewItem.appendChild(fileInfo);
          }

          const xBtn = document.createElement("button");
          xBtn.innerHTML = "×";
          xBtn.className = "update-emp-preview-x-btn";
          xBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (confirm("Are you sure you want to remove this file?")) {
              const fileIndex = parseInt(previewItem.dataset.fileIndex);
              uploadedFiles[storageKey].splice(fileIndex, 1);
              previewItem.remove();

              const remainingItems = previewContainer.querySelectorAll(".update-emp-preview-item");
              remainingItems.forEach((item, idx) => {
                item.dataset.fileIndex = idx;
              });
            }
          };
          previewItem.appendChild(xBtn);

          const btnContainer = document.createElement("div");
          btnContainer.className = "update-emp-preview-actions";

          const viewBtn = document.createElement("button");
          viewBtn.textContent = "View";
          viewBtn.className = "update-emp-preview-view-btn";
          viewBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            viewFile(fileUrl, fileType, fileName);
          };
          btnContainer.appendChild(viewBtn);

          const downloadBtn = document.createElement("button");
          downloadBtn.textContent = "Download";
          downloadBtn.className = "update-emp-preview-download-btn-inline";
          downloadBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            downloadFile(fileUrl, fileName);
          };
          btnContainer.appendChild(downloadBtn);

          previewItem.appendChild(btnContainer);
          previewContainer.appendChild(previewItem);
        }
      }

      input.value = "";
    };
  }

  handleSingleFilePreview("updateEmployeePhoto", "update-preview-employeePhoto", "employeePhoto");
  handleSingleFilePreview("updateResumeCV", "update-preview-resumeCV", "resumeCV");
  handleMultipleFilePreview("updateIdProof", "update-preview-idProof", "idProof");
  handleMultipleFilePreview("updateCertificates", "update-preview-certificates", "certificates");
  handleMultipleFilePreview("updateOtherDocs", "update-preview-otherDocs", "otherDocs");

  // IMPORTANT: Prevent form submission and handle it manually
  const form = document.getElementById("updateEmployeeForm");
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault(); // CRITICAL: Stop form from submitting
      e.stopPropagation();
      console.log('Form submit prevented');
      return false;
    };
  }

  const submitBtn = document.getElementById("updateEmpSubmitBtn");
if (submitBtn) {
  submitBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Submit button clicked');

    const editingIndex = typeof getCurrentEditingIndex === 'function' ? getCurrentEditingIndex() : null;
    
    if (editingIndex === null || typeof employeesData === 'undefined') {
      console.error('Cannot update: no editing index');
      alert('Error: No employee selected for editing');
      return false;
    }
    
    const existingEmployee = employeesData[editingIndex];
    
    // Get form values - use existing data if field is empty
    const employeeId = form.querySelector('[name="employeeId"]').value || existingEmployee.employeeId;
    const employeeName = form.querySelector('[name="employeeName"]').value || existingEmployee.employeeName;
    const dob = form.querySelector('[name="dob"]').value || existingEmployee.dob;
    
    const genderRadio = form.querySelector('input[name="gender"]:checked');
    const gender = genderRadio ? genderRadio.value : existingEmployee.gender;
    
    const emailPersonal = form.querySelector('[name="emailPersonal"]').value || existingEmployee.emailPersonal;
    const emailOfficial = form.querySelector('[name="emailOfficial"]').value || existingEmployee.emailOfficial;
    const phonePersonal = form.querySelector('[name="phonePersonal"]').value || existingEmployee.phonePersonal;
    const phoneOfficial = form.querySelector('[name="phoneOfficial"]').value || existingEmployee.phoneOfficial;
    
    const designation = form.querySelector('[name="designation"]').value || existingEmployee.designation;
    
    const employmentTypeRadio = form.querySelector('input[name="employmentType"]:checked');
    const employmentType = employmentTypeRadio ? employmentTypeRadio.value : existingEmployee.employmentType;
    
    const address = form.querySelector('[name="address"]').value || existingEmployee.address;
    
    // Handle employment type specific fields
    let workingStatus = existingEmployee.workingStatus;
    let joinDate = existingEmployee.joinDate;
    let internStartDate = existingEmployee.internStartDate;
    let internEndDate = existingEmployee.internEndDate;
    let durationMonths = existingEmployee.durationMonths;
    
    if (employmentType === 'On Role') {
      const workingStatusInput = form.querySelector('[name="workingStatus"]');
      const joinDateInput = form.querySelector('[name="joinDate"]');
      
      if (workingStatusInput) workingStatus = workingStatusInput.value || existingEmployee.workingStatus;
      if (joinDateInput) joinDate = joinDateInput.value || existingEmployee.joinDate;
    } else if (employmentType === 'Intern') {
      const workingStatusInternInput = form.querySelector('[name="workingStatusIntern"]');
      const internStartInput = form.querySelector('[name="internStartDate"]');
      const internEndInput = form.querySelector('[name="internEndDate"]');
      const durationInput = form.querySelector('[name="durationMonths"]');
      
      if (workingStatusInternInput) workingStatus = workingStatusInternInput.value || existingEmployee.workingStatus;
      if (internStartInput) internStartDate = internStartInput.value || existingEmployee.internStartDate;
      if (internEndInput) internEndDate = internEndInput.value || existingEmployee.internEndDate;
      if (durationInput) durationMonths = durationInput.value || existingEmployee.durationMonths;
    }
    
    // Handle photo upload
    let photoURL = existingEmployee.photoURL;
    if (uploadedFiles.employeePhoto) {
      photoURL = URL.createObjectURL(uploadedFiles.employeePhoto);
    }
    
    // Build updated employee object
    const updatedEmployee = {
      employeeId: employeeId,
      employeeName: employeeName,
      dob: dob,
      gender: gender,
      emailPersonal: emailPersonal,
      emailOfficial: emailOfficial,
      phonePersonal: phonePersonal,
      phoneOfficial: phoneOfficial,
      designation: designation,
      employmentType: employmentType,
      workingStatus: workingStatus,
      joinDate: joinDate,
      internStartDate: internStartDate,
      internEndDate: internEndDate,
      durationMonths: durationMonths,
      address: address,
      photoURL: photoURL,
      uploadedFiles: {
        employeePhoto: uploadedFiles.employeePhoto 
          ? [uploadedFiles.employeePhoto] 
          : (existingEmployee.uploadedFiles?.employeePhoto || []),
        resumeCV: uploadedFiles.resumeCV 
          ? [uploadedFiles.resumeCV] 
          : (existingEmployee.uploadedFiles?.resumeCV || []),
        idProof: uploadedFiles.idProof.length > 0 
          ? [...uploadedFiles.idProof] 
          : (existingEmployee.uploadedFiles?.idProof || []),
        certificates: uploadedFiles.certificates.length > 0 
          ? [...uploadedFiles.certificates] 
          : (existingEmployee.uploadedFiles?.certificates || []),
        otherDocs: uploadedFiles.otherDocs.length > 0 
          ? [...uploadedFiles.otherDocs] 
          : (existingEmployee.uploadedFiles?.otherDocs || [])
      }
    };
    
    console.log('Saving updated employee:', updatedEmployee);
    
    // Update in data array
    if (typeof updateEmployeeInData === 'function') {
      updateEmployeeInData(editingIndex, updatedEmployee);
      alert('Employee updated successfully!');
    }
    
    // Close modal and cleanup
    closeModal();
    form.reset();
    
    uploadedFiles.employeePhoto = null;
    uploadedFiles.resumeCV = null;
    uploadedFiles.idProof = [];
    uploadedFiles.certificates = [];
    uploadedFiles.otherDocs = [];
    
    document.getElementById("update-preview-employeePhoto").innerHTML = "";
    document.getElementById("update-preview-resumeCV").innerHTML = "";
    document.getElementById("update-preview-idProof").innerHTML = "";
    document.getElementById("update-preview-certificates").innerHTML = "";
    document.getElementById("update-preview-otherDocs").innerHTML = "";
    
    if (typeof resetEditingIndex === 'function') {
      resetEditingIndex();
    }
    
    return false;
  };
}


  console.log('Update employee modal initialized successfully!');
}
