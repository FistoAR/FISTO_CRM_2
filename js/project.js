// ==================== PROJECT MANAGEMENT SYSTEM ====================

// Fake onboarding project data
const onboardingProjects = [
  {
    id: "EST1N98",
    name: "Excel Software",
    description: "Complete office management system with Excel integration and reporting",
    contacts: [
      { person: "Abi", phone: "+91 9093450945", email: "fisto@gmail.com", designation: "Manager" }
    ]
  },
  {
    id: "EST2M45",
    name: "Hiring Platform",
    description: "AI-powered recruitment and applicant tracking system",
    contacts: [
      { person: "Priya Sharma", phone: "+91 9876543210", email: "priya@techcorp.com", designation: "HR Director" }
    ]
  },
  {
    id: "EST3K72",
    name: "Software Application",
    description: "Custom enterprise resource planning software solution",
    contacts: [
      { person: "Rajesh Patel", phone: "+91 9123456789", email: "rajesh@enterprise.com", designation: "CTO" }
    ]
  },
  {
    id: "EST4P19",
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment gateway integration",
    contacts: [
      { person: "Sneha Reddy", phone: "+91 9988776655", email: "sneha@ecomm.com", designation: "Business Head" }
    ]
  },
  {
    id: "EST5L88",
    name: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    contacts: [
      { person: "Vikram Singh", phone: "+91 9234567890", email: "vikram@banktech.com", designation: "Product Lead" }
    ]
  }
];

// Fake team data
const teams = [
  "Developer Team",
  "UI/UX Design Team",
  "QA Testing Team",
  "DevOps Team",
  "Marketing Team"
];

// Fake project data for table
let projectsData = [
  { id: 1, name: "Excel Software", startDate: "10/10/2025", deadline: "24/10/2025", teamHead: "Fisto", status: 73, customerId: "EST1N98" },
  { id: 2, name: "Hiring Platform", startDate: "07/10/2025", deadline: "30/10/2025", teamHead: "Fisto", status: 11, customerId: "EST2M45" },
  { id: 3, name: "Software application", startDate: "09/10/2025", deadline: "07/10/2025", teamHead: "Fisto", status: 22, customerId: "EST3K72" },
  { id: 4, name: "E-Commerce Platform", startDate: "15/10/2025", deadline: "15/11/2025", teamHead: "Fisto", status: 45, customerId: "EST4P19" },
  { id: 5, name: "Mobile Banking App", startDate: "20/10/2025", deadline: "20/12/2025", teamHead: "Fisto", status: 5, customerId: "EST5L88" },
  { id: 6, name: "Hiring Platform", startDate: "07/10/2025", deadline: "30/10/2025", teamHead: "Fisto", status: 33, customerId: "EST2M45" },
  { id: 7, name: "Software application", startDate: "09/10/2025", deadline: "07/10/2025", teamHead: "Fisto", status: 67, customerId: "EST3K72" },
  { id: 8, name: "Excel Software", startDate: "10/10/2025", deadline: "24/10/2025", teamHead: "Fisto", status: 88, customerId: "EST1N98" },
  { id: 9, name: "E-Commerce Platform", startDate: "15/10/2025", deadline: "15/11/2025", teamHead: "Fisto", status: 55, customerId: "EST4P19" }
];

// Pagination variables
const itemsPerPage = 8;
let currentPage = 1;
let filteredProjects = [...projectsData];

// Contact counter
let contactIdCounter = 0;

// ==================== INITIALIZATION ====================
function initializeProjectPage() {
  console.log("Initializing Project Page...");
  
  populateOnboardingDropdown();
  populateTeamsDropdown();
  setupEventListeners();
  addContactRow(null, true); // Add initial contact row
  renderTable();
  setupPagination();
}

// ==================== POPULATE DROPDOWNS ====================
function populateOnboardingDropdown() {
  const dropdown = document.getElementById("onboardingProject");
  
  onboardingProjects.forEach(project => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    option.dataset.projectData = JSON.stringify(project);
    dropdown.appendChild(option);
  });
}

function populateTeamsDropdown() {
  const dropdown = document.getElementById("allocatedTeam");
  
  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    dropdown.appendChild(option);
  });
}

// ==================== EVENT LISTENERS SETUP ====================
function setupEventListeners() {
  const modal = document.getElementById("projectModal");
  const addBtn = document.getElementById("addProjectBtn");
  const closeBtn = document.querySelector(".project-modal-close");
  
  addBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  
  closeBtn.addEventListener("click", () => {
    closeModal();
  });
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Onboarding project selection
  const onboardingSelect = document.getElementById("onboardingProject");
  onboardingSelect.addEventListener("change", handleOnboardingSelection);
  
  // Add contact button (delegated)
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-contact-btn")) {
      addContactRow();
    }
    if (e.target.closest(".remove-contact-btn")) {
      removeContactRow(e.target.closest(".remove-contact-btn"));
    }
  });
  
  // File upload
  const fileInput = document.getElementById("documentUpload");
  const fileChooseBtn = document.querySelector(".file-choose-btn");
  const fileName = document.querySelector(".file-name");
  
  fileChooseBtn.addEventListener("click", () => {
    fileInput.click();
  });
  
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      fileName.textContent = e.target.files[0].name;
    } else {
      fileName.textContent = "No file Selected";
    }
  });
  
  // Form submission
  const submitBtn = document.getElementById("projectSubmitBtn");
  submitBtn.addEventListener("click", handleFormSubmit);
  
  // Clear form
  const clearBtn = document.getElementById("clearFormBtn");
  clearBtn.addEventListener("click", clearForm);
  
  // Search functionality
  const searchInput = document.getElementById("projectSearchInput");
  searchInput.addEventListener("input", handleSearch);
  
  // Pagination
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
      setupPagination();
    }
  });
  
  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
      setupPagination();
    }
  });
}

// ==================== HANDLE ONBOARDING SELECTION ====================
function handleOnboardingSelection(e) {
  const selectedOption = e.target.selectedOptions[0];
  
  if (!selectedOption.value) {
    clearAutofillFields();
    return;
  }
  
  const projectData = JSON.parse(selectedOption.dataset.projectData);
  
  // Autofill customer ID and description
  document.getElementById("customerId").value = projectData.id;
  document.getElementById("projectDescription").value = projectData.description;
  
  // Clear existing contact rows
  const contactContainer = document.getElementById("contactFieldsContainer");
  contactContainer.innerHTML = "";
  contactIdCounter = 0;
  
  // Add contacts from project data
  projectData.contacts.forEach((contact, index) => {
    const isFirst = index === 0;
    addContactRow(contact, isFirst);
  });
}

// ==================== CLEAR AUTOFILL FIELDS ====================
function clearAutofillFields() {
  document.getElementById("customerId").value = "";
  document.getElementById("projectDescription").value = "";
  
  const contactContainer = document.getElementById("contactFieldsContainer");
  contactContainer.innerHTML = "";
  contactIdCounter = 0;
  addContactRow(null, true);
}

// ==================== ADD CONTACT ROW ====================
function addContactRow(contactData = null, isFirst = false) {
  contactIdCounter++;
  const contactContainer = document.getElementById("contactFieldsContainer");
  
  const contactRow = document.createElement("div");
  contactRow.className = "contact-row";
  contactRow.dataset.contactId = contactIdCounter;
  
  contactRow.innerHTML = `
       <div class="form-group-action">
        ${isFirst || contactContainer.children.length === 0 ? 
          '<button type="button" class="add-contact-btn" title="Add Contact"><span class="plus-icon">+</span></button>' :
          '<button type="button" class="remove-contact-btn" title="Remove Contact"><span class="minus-icon">−</span></button>'
        }
      </div>
    <div class="form-row contact-form-row">
      <div class="form-group">
        <label>Contact Person <span class="required">*</span></label>
        <input type="text" class="project-input contact-person" placeholder="Abi" value="${contactData?.person || ''}" required>
      </div>
      <div class="form-group">
        <label>Phone Number <span class="required">*</span></label>
        <input type="tel" class="project-input contact-phone" placeholder="+91 9093450945" value="${contactData?.phone || ''}" required>
      </div>
      <div class="form-group">
        <label>Mail ID <span class="required">*</span></label>
        <input type="email" class="project-input contact-email" placeholder="fisto@gmail.com" value="${contactData?.email || ''}" required>
      </div>
      <div class="form-group">
        <label>Designation <span class="required">*</span></label>
        <input type="text" class="project-input contact-designation" placeholder="Manager" value="${contactData?.designation || ''}" required>
      </div>
    </div>
  `;
  
  contactContainer.appendChild(contactRow);
}

// ==================== REMOVE CONTACT ROW ====================
function removeContactRow(button) {
  const contactRow = button.closest(".contact-row");
  contactRow.remove();
  
  // Ensure at least one contact row exists
  const contactContainer = document.getElementById("contactFieldsContainer");
  if (contactContainer.children.length === 0) {
    addContactRow(null, true);
  }
}

// ==================== HANDLE FORM SUBMIT ====================
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = document.getElementById("projectForm");
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  // Collect form data
  const formData = {
    id: projectsData.length + 1,
    customerId: document.getElementById("customerId").value,
    name: document.getElementById("onboardingProject").selectedOptions[0].textContent,
    description: document.getElementById("projectDescription").value,
    contacts: collectContactData(),
    allocatedTeam: document.getElementById("allocatedTeam").value,
    reportingPerson: document.getElementById("reportingPerson").value,
    startDate: formatDate(document.getElementById("startDate").value),
    deadline: formatDate(document.getElementById("completionDate").value),
    revieDate: document.getElementById("revieDate").value,
    remarks: document.getElementById("remarks").value,
    teamHead: "Fisto",
    status: Math.floor(Math.random() * 100) + 1
  };
  
  // Add to projects data
  projectsData.push(formData);
  filteredProjects = [...projectsData];
  
  // Reset to last page to show new entry
  currentPage = Math.ceil(filteredProjects.length / itemsPerPage);
  
  // Re-render table
  renderTable();
  setupPagination();
  
  // Show success message
  showSuccessToast(formData.customerId);
  
  // Close modal and clear form
  closeModal();
}

// ==================== COLLECT CONTACT DATA ====================
function collectContactData() {
  const contacts = [];
  const contactRows = document.querySelectorAll(".contact-row");
  
  contactRows.forEach(row => {
    contacts.push({
      person: row.querySelector(".contact-person").value,
      phone: row.querySelector(".contact-phone").value,
      email: row.querySelector(".contact-email").value,
      designation: row.querySelector(".contact-designation").value
    });
  });
  
  return contacts;
}

// ==================== FORMAT DATE ====================
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ==================== CLOSE MODAL ====================
function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
  document.body.style.overflow = "";
  clearForm();
}

// ==================== CLEAR FORM ====================
function clearForm() {
  document.getElementById("projectForm").reset();
  document.querySelector(".file-name").textContent = "No file Selected";
  
  // Reset contacts to single row
  const contactContainer = document.getElementById("contactFieldsContainer");
  contactContainer.innerHTML = "";
  contactIdCounter = 0;
  addContactRow(null, true);
}

// ==================== SHOW SUCCESS TOAST ====================
function showSuccessToast(projectId) {
  const toast = document.getElementById("successToast");
  const text = document.getElementById("successText");
  
  text.textContent = `Project "${projectId}" added successfully`;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// ==================== RENDER TABLE ====================
function renderTable() {
  const tbody = document.getElementById("projectTableBody");
  tbody.innerHTML = "";
  
  // Update total count
  document.getElementById("totalProjects").textContent = filteredProjects.length;
  
  if (filteredProjects.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: #999">
          No projects found.
        </td>
      </tr>
    `;
    return;
  }
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
  
  paginatedProjects.forEach(project => {
    const row = document.createElement("tr");
    
    let progressClass = "progress-fill";
    if (project.status < 30) progressClass += " low";
    else if (project.status < 60) progressClass += " medium";
    
    row.innerHTML = `
      <td><strong>${project.name}</strong></td>
      <td>${project.startDate}</td>
      <td>${project.deadline}</td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: #333; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 600;">
            ${project.teamHead.charAt(0)}
          </div>
          <span>${project.teamHead}</span>
        </div>
      </td>
      <td>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="${progressClass}" style="width: ${project.status}%"></div>
          </div>
          <span class="progress-text">${project.status}%</span>
        </div>
      </td>
      <td>
        <button class="view-btn" onclick="viewProject(${project.id})">👁</button>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteProject(${project.id})">🗑</button>
      </td>
    `;
    
    tbody.appendChild(row);
  });
}

// ==================== SETUP PAGINATION ====================
function setupPagination() {
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginationNumbers = document.getElementById("paginationNumbers");
  paginationNumbers.innerHTML = "";
  
  // Update prev/next buttons
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages || totalPages === 0;
  
  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = String(i).padStart(2, '0');
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderTable();
      setupPagination();
    });
    paginationNumbers.appendChild(pageBtn);
  }
}

// ==================== HANDLE SEARCH ====================
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  
  filteredProjects = projectsData.filter(project => 
    project.name.toLowerCase().includes(searchTerm) ||
    project.customerId.toLowerCase().includes(searchTerm) ||
    project.teamHead.toLowerCase().includes(searchTerm)
  );
  
  currentPage = 1;
  renderTable();
  setupPagination();
}

// ==================== VIEW PROJECT ====================
function viewProject(id) {
  const project = projectsData.find(p => p.id === id);
  alert(`Viewing Project:\n\nID: ${project.customerId}\nName: ${project.name}\nStatus: ${project.status}%\nTeam Head: ${project.teamHead}`);
}

// ==================== DELETE PROJECT ====================
function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    projectsData = projectsData.filter(p => p.id !== id);
    filteredProjects = [...projectsData];
    
    // Adjust current page if necessary
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }
    
    renderTable();
    setupPagination();
    showSuccessToast("Project deleted successfully!");
  }
}

// ==================== AUTO-INITIALIZE ====================
if (typeof window !== 'undefined') {
  window.initializeProjectPage = initializeProjectPage;
  window.viewProject = viewProject;
  window.deleteProject = deleteProject;
}
