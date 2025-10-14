document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const updateEmployeeModal = document.getElementById("updateEmployeeModal");
  const updateEmployeeBtn = document.getElementById("updateEmployeeBtn");
  const updateModalClose = document.querySelector(".update-emp-modal-close");

  // File view modal
  const fileViewModal = document.getElementById("fileViewModal");
  const fileViewContent = document.getElementById("fileViewContent");
  const fileViewClose = document.querySelector(".update-emp-view-modal-close");

  // Check if elements exist before adding listeners
  if (!updateEmployeeBtn) {
    console.error("updateEmployeeBtn not found!");
    return;
  }

  if (!updateEmployeeModal) {
    console.error("updateEmployeeModal not found!");
    return;
  }

  // Function to populate modal with employee data
  function populateModalWithData(employeeData) {
    const form = document.getElementById("updateEmployeeForm");
    
    if (!employeeData || !form) {
      console.error("No employee data or form not found!");
      return;
    }

    console.log("Loading employee data:", employeeData);

    // Populate Professional Information
    form.querySelector('[name="employeeId"]').value = employeeData.employeeId || '';
    form.querySelector('[name="employeeName"]').value = employeeData.employeeName || '';
    form.querySelector('[name="dob"]').value = employeeData.dob || '';
    
    // Set gender radio button (case-insensitive)
    if (employeeData.gender) {
      const genderValue = employeeData.gender.toLowerCase();
      const genderRadio = form.querySelector(`input[name="gender"][value="${genderValue}"]`);
      if (genderRadio) {
        genderRadio.checked = true;
      }
    }

    // Populate Contact Information
    form.querySelector('[name="emailPersonal"]').value = employeeData.emailPersonal || '';
    form.querySelector('[name="emailOfficial"]').value = employeeData.emailOfficial || '';
    form.querySelector('[name="phonePersonal"]').value = employeeData.phonePersonal || '';
    form.querySelector('[name="phoneOfficial"]').value = employeeData.phoneOfficial || '';

    // Populate Employment Details
    const employmentTypeRadio = form.querySelector(`input[name="employmentType"][value="${employeeData.employmentType}"]`);
    if (employmentTypeRadio) {
      employmentTypeRadio.checked = true;
      // Trigger change event to show/hide fields
      employmentTypeRadio.dispatchEvent(new Event('change'));
    }

    form.querySelector('[name="designation"]').value = employeeData.designation || '';

    // Populate based on employment type with a slight delay
    setTimeout(() => {
      if (employeeData.employmentType === "On Role") {
        form.querySelector('[name="workingStatus"]').value = employeeData.workingStatus || '';
        form.querySelector('[name="joinDate"]').value = employeeData.joinDate || '';
      } else if (employeeData.employmentType === "Intern") {
        form.querySelector('[name="internStartDate"]').value = employeeData.internStartDate || '';
        form.querySelector('[name="internEndDate"]').value = employeeData.internEndDate || '';
        form.querySelector('[name="durationMonths"]').value = employeeData.durationMonths || '';
        form.querySelector('[name="workingStatusIntern"]').value = employeeData.workingStatus || '';
      }
    }, 100);

    // Populate Address
    form.querySelector('[name="address"]').value = employeeData.address || '';

    // Change modal title
    document.getElementById('updateModalTitle').textContent = 'Update Employee - ' + employeeData.employeeName;
    
    // Change button text
    document.getElementById('updateEmpSubmitBtn').textContent = 'Save Changes';
  }

  // Open modal when button is clicked and load fake employee data
  updateEmployeeBtn.addEventListener("click", function () {
    // Get the first employee from fakeemployee.js
    const fakeEmployee = getFirstEmployee();
    
    // Populate the modal with fake employee data
    if (fakeEmployee) {
      populateModalWithData(fakeEmployee);
    }
    
    // Open the modal
    updateEmployeeModal.style.display = "block";
  });

  // Close modal when X is clicked
  if (updateModalClose) {
    updateModalClose.addEventListener("click", function () {
      updateEmployeeModal.style.display = "none";
      // Reset modal title
      document.getElementById('updateModalTitle').textContent = 'Update Employee Details';
      document.getElementById('updateEmpSubmitBtn').textContent = 'Update Employee';
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === updateEmployeeModal) {
      updateEmployeeModal.style.display = "none";
      // Reset modal title
      document.getElementById('updateModalTitle').textContent = 'Update Employee Details';
      document.getElementById('updateEmpSubmitBtn').textContent = 'Update Employee';
    }
    if (fileViewModal && event.target === fileViewModal) {
      fileViewModal.style.display = "none";
    }
  });

  // Close file view modal
  if (fileViewClose) {
    fileViewClose.addEventListener("click", function () {
      fileViewModal.style.display = "none";
    });
  }

  // Employment Type Toggle Logic
  const updateEmpOnRole = document.getElementById("updateEmpOnRole");
  const updateEmpIntern = document.getElementById("updateEmpIntern");
  const updateOnRoleFields = document.getElementById("updateOnRoleFields");
  const updateInternFields = document.getElementById("updateInternFields");

  if (updateEmpOnRole) {
    updateEmpOnRole.addEventListener("change", function () {
      if (this.checked) {
        updateOnRoleFields.style.display = "grid";
        updateInternFields.style.display = "none";
      }
    });
  }

  if (updateEmpIntern) {
    updateEmpIntern.addEventListener("change", function () {
      if (this.checked) {
        updateOnRoleFields.style.display = "none";
        updateInternFields.style.display = "block";
      }
    });
  }

  // Auto-calculate duration for intern
  const updateInternStartDate = document.getElementById("updateInternStartDate");
  const updateInternEndDate = document.getElementById("updateInternEndDate");
  const updateDurationMonths = document.getElementById("updateDurationMonths");

  function calculateDuration() {
    if (updateInternStartDate.value && updateInternEndDate.value) {
      const start = new Date(updateInternStartDate.value);
      const end = new Date(updateInternEndDate.value);
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      updateDurationMonths.value = months + " months";
    }
  }

  if (updateInternStartDate) {
    updateInternStartDate.addEventListener("change", calculateDuration);
  }

  if (updateInternEndDate) {
    updateInternEndDate.addEventListener("change", calculateDuration);
  }

  // Store uploaded files
  const uploadedFiles = {
    employeePhoto: null,
    resumeCV: null,
    idProof: [],
    certificates: [],
    otherDocs: [],
  };

  // Download file function
  function downloadFile(fileUrl, fileName) {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // View file function with download button
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

  // Update delete all button visibility for multiple files
  function updateDeleteAllButton(previewContainer, storageKey, uploadItemDiv) {
    const buttonContainer = uploadItemDiv.querySelector(".update-emp-button-container");
    const existingDeleteAllBtn = buttonContainer.querySelector(".update-emp-delete-all-btn");

    if (uploadedFiles[storageKey].length > 1) {
      if (!existingDeleteAllBtn) {
        const deleteAllBtn = document.createElement("button");
        deleteAllBtn.type = "button";
        deleteAllBtn.className = "update-emp-delete-all-btn";
        deleteAllBtn.innerHTML = '<img src="./assets/Imgaes/preview_delete_btn.png" alt="Delete All" />';
        deleteAllBtn.onclick = function () {
          if (confirm("Are you sure you want to delete all files?")) {
            previewContainer.innerHTML = "";
            uploadedFiles[storageKey] = [];
            deleteAllBtn.remove();
          }
        };
        buttonContainer.appendChild(deleteAllBtn);
      }
    } else {
      if (existingDeleteAllBtn) {
        existingDeleteAllBtn.remove();
      }
    }
  }

  // File Upload Preview Logic for Single Files
  function handleSingleFilePreview(inputId, previewId, storageKey) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);

    if (!input || !previewContainer) return;

    input.addEventListener("change", function () {
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
        xBtn.onclick = function (e) {
          e.preventDefault();
          if (confirm("Are you sure you want to cancel and remove this file?")) {
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
        viewBtn.onclick = function (e) {
          e.preventDefault();
          viewFile(fileUrl, fileType, fileName);
        };
        btnContainer.appendChild(viewBtn);

        const downloadBtn = document.createElement("button");
        downloadBtn.textContent = "Download";
        downloadBtn.className = "update-emp-preview-download-btn-inline";
        downloadBtn.onclick = function (e) {
          e.preventDefault();
          downloadFile(fileUrl, fileName);
        };
        btnContainer.appendChild(downloadBtn);

        previewItem.appendChild(btnContainer);
        previewContainer.appendChild(previewItem);
      }
    });
  }

  // File Upload Preview Logic for Multiple Files
  function handleMultipleFilePreview(inputId, previewId, storageKey) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewId);
    const uploadItemDiv = input.closest(".update-emp-upload-item");

    if (!input || !previewContainer) return;

    input.addEventListener("change", function () {
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
          xBtn.onclick = function (e) {
            e.preventDefault();
            if (confirm("Are you sure you want to remove this file?")) {
              const fileIndex = parseInt(previewItem.dataset.fileIndex);
              uploadedFiles[storageKey].splice(fileIndex, 1);
              previewItem.remove();

              const remainingItems = previewContainer.querySelectorAll(".update-emp-preview-item");
              remainingItems.forEach((item, idx) => {
                item.dataset.fileIndex = idx;
              });

              updateDeleteAllButton(previewContainer, storageKey, uploadItemDiv);
            }
          };
          previewItem.appendChild(xBtn);

          const btnContainer = document.createElement("div");
          btnContainer.className = "update-emp-preview-actions";

          const viewBtn = document.createElement("button");
          viewBtn.textContent = "View";
          viewBtn.className = "update-emp-preview-view-btn";
          viewBtn.onclick = function (e) {
            e.preventDefault();
            viewFile(fileUrl, fileType, fileName);
          };
          btnContainer.appendChild(viewBtn);

          const downloadBtn = document.createElement("button");
          downloadBtn.textContent = "Download";
          downloadBtn.className = "update-emp-preview-download-btn-inline";
          downloadBtn.onclick = function (e) {
            e.preventDefault();
            downloadFile(fileUrl, fileName);
          };
          btnContainer.appendChild(downloadBtn);

          previewItem.appendChild(btnContainer);
          previewContainer.appendChild(previewItem);
        }

        updateDeleteAllButton(previewContainer, storageKey, uploadItemDiv);
      }

      input.value = "";
    });
  }

  // Initialize file preview handlers
  handleSingleFilePreview("updateEmployeePhoto", "update-preview-employeePhoto", "employeePhoto");
  handleSingleFilePreview("updateResumeCV", "update-preview-resumeCV", "resumeCV");
  handleMultipleFilePreview("updateIdProof", "update-preview-idProof", "idProof");
  handleMultipleFilePreview("updateCertificates", "update-preview-certificates", "certificates");
  handleMultipleFilePreview("updateOtherDocs", "update-preview-otherDocs", "otherDocs");

  // Form submission
  const submitBtn = document.getElementById("updateEmpSubmitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const form = document.getElementById("updateEmployeeForm");

      if (form && form.checkValidity()) {
        console.log("Form submitted successfully");
        console.log("Uploaded Files:", uploadedFiles);

        alert("Successfully Updated!");

        updateEmployeeModal.style.display = "none";

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
        
        // Reset modal title
        document.getElementById('updateModalTitle').textContent = 'Update Employee Details';
        document.getElementById('updateEmpSubmitBtn').textContent = 'Update Employee';
      } else if (form) {
        form.reportValidity();
      }
    });
  }

}); // End of DOMContentLoaded
