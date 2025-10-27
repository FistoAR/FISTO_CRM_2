// ==================== PROJECT MANAGEMENT SYSTEM ====================
let projectResourcesUploadedFiles = [];
let projectResourcesUploadedLinks = [];
let projectResourcesSelectedFiles = [];
// Fake onboarding project data
const onboardingProjects = [
  {
    id: "EST1N98",
    name: "Excel Software",
    description:
      "Complete office management system with Excel integration and reporting",
    contacts: [
      {
        person: "Abi",
        phone: "+91 9093450945",
        email: "fisto@gmail.com",
        designation: "Manager",
      },
    ],
  },
  {
    id: "EST2M45",
    name: "Hiring Platform",
    description: "AI-powered recruitment and applicant tracking system",
    contacts: [
      {
        person: "Priya Sharma",
        phone: "+91 9876543210",
        email: "priya@techcorp.com",
        designation: "HR Director",
      },
    ],
  },
  {
    id: "EST3K72",
    name: "Software Application",
    description: "Custom enterprise resource planning software solution",
    contacts: [
      {
        person: "Rajesh Patel",
        phone: "+91 9123456789",
        email: "rajesh@enterprise.com",
        designation: "CTO",
      },
    ],
  },
  {
    id: "EST4P19",
    name: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with payment gateway integration",
    contacts: [
      {
        person: "Sneha Reddy",
        phone: "+91 9988776655",
        email: "sneha@ecomm.com",
        designation: "Business Head",
      },
    ],
  },
  {
    id: "EST5L88",
    name: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication",
    contacts: [
      {
        person: "Vikram Singh",
        phone: "+91 9234567890",
        email: "vikram@banktech.com",
        designation: "Product Lead",
      },
    ],
  },
];

// Fake team data
const teams = [
  "Developer Team",
  "UI/UX Design Team",
  "QA Testing Team",
  "DevOps Team",
  "Marketing Team",
];

// Fake project data for table
let projectsData = [
  {
    id: 1,
    name: "Excel Software",
    startDate: "10/10/2025",
    deadline: "24/10/2025",
    teamHead: "Fisto",
    status: 73,
    customerId: "EST1N98",
    priority: "High",
    initiatedBy: "Fisto",
    description: "to create excel software",
  },
  {
    id: 2,
    name: "Hiring Platform",
    startDate: "07/10/2025",
    deadline: "30/10/2025",
    teamHead: "Fisto",
    status: 11,
    customerId: "EST2M45",
    priority: "Medium",
    initiatedBy: "Fisto",
    description: "AI recruitment system",
  },
  {
    id: 3,
    name: "Software application",
    startDate: "09/10/2025",
    deadline: "07/10/2025",
    teamHead: "Fisto",
    status: 22,
    customerId: "EST3K72",
    priority: "High",
    initiatedBy: "Fisto",
    description: "ERP solution",
  },
  {
    id: 4,
    name: "E-Commerce Platform",
    startDate: "15/10/2025",
    deadline: "15/11/2025",
    teamHead: "Fisto",
    status: 45,
    customerId: "EST4P19",
    priority: "Low",
    initiatedBy: "Fisto",
    description: "Online store",
  },
  {
    id: 5,
    name: "Mobile Banking App",
    startDate: "20/10/2025",
    deadline: "20/12/2025",
    teamHead: "Fisto",
    status: 5,
    customerId: "EST5L88",
    priority: "High",
    initiatedBy: "Fisto",
    description: "Banking app",
  },
  {
    id: 6,
    name: "Hiring Platform",
    startDate: "07/10/2025",
    deadline: "30/10/2025",
    teamHead: "Fisto",
    status: 33,
    customerId: "EST2M45",
    priority: "Medium",
    initiatedBy: "Fisto",
    description: "HR system",
  },
  {
    id: 7,
    name: "Software application",
    startDate: "09/10/2025",
    deadline: "07/10/2025",
    teamHead: "Fisto",
    status: 67,
    customerId: "EST3K72",
    priority: "High",
    initiatedBy: "Fisto",
    description: "Business software",
  },
  {
    id: 8,
    name: "Excel Software",
    startDate: "10/10/2025",
    deadline: "24/10/2025",
    teamHead: "Fisto",
    status: 88,
    customerId: "EST1N98",
    priority: "High",
    initiatedBy: "Fisto",
    description: "Excel integration",
  },
  {
    id: 9,
    name: "E-Commerce Platform",
    startDate: "15/10/2025",
    deadline: "15/11/2025",
    teamHead: "Fisto",
    status: 55,
    customerId: "EST4P19",
    priority: "Low",
    initiatedBy: "Fisto",
    description: "E-commerce site",
  },
];

// Sample employee data for overview page
const projectOverviewAvailableEmployees = [
  { id: 1, name: "Praveen", initial: "P", avatar: "#FF5733" },
  { id: 2, name: "Ram", initial: "R", avatar: "#33C4FF" },
  { id: 3, name: "sham", initial: "S", avatar: "#FFB533" },
  { id: 4, name: "Sameer", initial: "S", avatar: "#9D33FF" },
  { id: 5, name: "Hari", initial: "H", avatar: "#33FF57" },
];

let projectOverviewAllocatedEmployees = [
  { id: 6, name: "Murugan", initial: "M", avatar: "#333333" },
  { id: 7, name: "Safi", initial: "S", avatar: "#555555" },
  { id: 8, name: "Harish", initial: "H", avatar: "#777777" },
  { id: 9, name: "Pradeepa", initial: "P", avatar: "#999999" },
];

// Fake task data
let tasksData = [
  {
    id: 1,
    taskNumber: 1,
    name: "Database Design",
    startDate: "2025-10-15",
    endDate: "2025-10-18",
    startTime: "09:00",
    endTime: "17:00",
    description: "Design",
    employee: "Murugan",
    status: "Completed",
    progress: 100,
  },
  {
    id: 2,
    taskNumber: 2,
    name: "API Development",
    startDate: "2025-10-16",
    endDate: "2025-10-20",
    startTime: "10:00",
    endTime: "18:00",
    description: "Develop",
    employee: "Safi",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 3,
    taskNumber: 3,
    name: "UI Design",
    startDate: "2025-10-14",
    endDate: "2025-10-19",
    startTime: "09:30",
    endTime: "16:30",
    description: "Create",
    employee: "Harish",
    status: "In Progress",
    progress: 78,
  },
  {
    id: 4,
    taskNumber: 4,
    name: "Testing Phase",
    startDate: "2025-10-20",
    endDate: "2025-10-25",
    startTime: "11:00",
    endTime: "19:00",
    description: "Conduct",
    employee: "Pradeepa",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 5,
    taskNumber: 5,
    name: "Frontend Integration",
    startDate: "2025-10-17",
    endDate: "2025-10-22",
    startTime: "08:00",
    endTime: "16:00",
    description: "Integrate",
    employee: "Murugan",
    status: "In Progress",
    progress: 45,
  },
  {
    id: 6,
    taskNumber: 6,
    name: "Security Audit",
    startDate: "2025-10-21",
    endDate: "2025-10-24",
    startTime: "10:30",
    endTime: "17:30",
    description: "Perform",
    employee: "Safi",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 7,
    taskNumber: 7,
    name: "Documentation",
    startDate: "2025-10-18",
    endDate: "2025-10-23",
    startTime: "09:00",
    endTime: "15:00",
    description: "Write",
    employee: "Harish",
    status: "In Progress",
    progress: 30,
  },
  {
    id: 8,
    taskNumber: 8,
    name: "Performance Optimization",
    startDate: "2025-10-22",
    endDate: "2025-10-26",
    startTime: "11:30",
    endTime: "18:30",
    description: "Optimize",
    employee: "Pradeepa",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 9,
    taskNumber: 9,
    name: "Deployment Setup",
    startDate: "2025-10-23",
    endDate: "2025-10-25",
    startTime: "08:30",
    endTime: "16:30",
    description: "Configure",
    employee: "Murugan",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 10,
    taskNumber: 10,
    name: "User Training",
    startDate: "2025-10-24",
    endDate: "2025-10-26",
    startTime: "10:00",
    endTime: "14:00",
    description: "Conduct",
    employee: "Safi",
    status: "Not Started",
    progress: 0,
  },
];

// Pagination variables
const itemsPerPage = 8;
let currentPage = 1;
let filteredProjects = [...projectsData];

// Task pagination variables
const tasksPerPage = 8;
let currentTaskPage = 1;
let filteredTasksForPagination = [];

// Contact counter
let contactIdCounter = 0;

// Current project and employee management
let currentProjectOverview = null;
let selectedProjectOverviewEmployees = new Set();
let tempProjectOverviewAllocatedEmployees = [];

// Task management variables
let taskCardCounter = 0;
let currentExpandedTask = null;

let projectEventListenersInitialized = false;
let contactButtonListenerAttached = false;

let selectedTeams = [];

// ==================== INITIALIZATION ====================

function initializeProjectPage() {
  console.log("Initializing Project Page...");

  const contactContainer = document.getElementById("contactFieldsContainer");
  if (contactContainer) {
    contactContainer.innerHTML = "";
    contactIdCounter = 0;
  }

  projectEventListenersInitialized = false;

  populateOnboardingDropdown();
  populateTeamsDropdown();
  setupEventListeners();
  renderTable();
  setupPagination();
}

// ==================== POPULATE DROPDOWNS ====================
function populateOnboardingDropdown() {
  const dropdown = document.getElementById("onboardingProject");
  if (!dropdown) return;

  onboardingProjects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    option.dataset.projectData = JSON.stringify(project);
    dropdown.appendChild(option);
  });
}

function populateTeamsDropdown() {
  const dropdown = document.getElementById("allocatedTeam");
  if (!dropdown) return;

  teams.forEach((team) => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    dropdown.appendChild(option);
  });
}

// Add change event handler for dropdown
function handleTeamSelection() {
  const select = document.getElementById("allocatedTeam");
  const selectedValue = select.value;
  const selectedText = select.options[select.selectedIndex].text;

  if (!selectedValue) return; // Ignore empty selection

  // Prevent duplicates
  if (selectedTeams.some((team) => team.value === selectedValue)) {
    alert("Team already selected");
    select.value = "";
    return;
  }

  selectedTeams.push({ value: selectedValue, text: selectedText });
  select.value = "";
  renderSelectedTeams();
  updateTeamDropdown();
}

function renderSelectedTeams() {
  const container = document.getElementById("selectedTeamsContainer");

  if (selectedTeams.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = selectedTeams
    .map(
      (team, index) => `
    <div class="team-tag" data-team-index="${index}">
      <span>${team.text}</span>
      <button type="button" class="team-tag-remove" data-index="${index}">×</button>
    </div>
  `
    )
    .join("");

  // ✅ Attach click listeners to remove buttons
  container.querySelectorAll(".team-tag-remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      removeTeam(index);
    });
  });
}

// Remove team tag on button click
function removeTeam(index) {
  selectedTeams.splice(index, 1);
  renderSelectedTeams();
  updateTeamDropdown();
}

function updateTeamDropdown() {
  const select = document.getElementById("allocatedTeam");
  if (!select) return;

  const options = select.querySelectorAll("option");

  options.forEach((option) => {
    if (option.value === "") {
      option.style.display = ""; // Always show "Select Team"
      return;
    }

    // Hide if team is selected
    const isSelected = selectedTeams.some(
      (team) => team.value === option.value
    );
    option.style.display = isSelected ? "none" : "";
  });
}

function clearSelectedTeams() {
  selectedTeams = [];
  renderSelectedTeams();
  updateTeamDropdown();
}

// ✅ Get selected teams (for form submission)
function getSelectedTeams() {
  return selectedTeams;
}

// ==================== CLEAR FORM ====================
function clearForm() {
  const form = document.getElementById("projectForm");
  if (form) {
    form.reset();
  }

  const fileName = document.querySelector(".file-name");
  if (fileName) {
    fileName.textContent = "No file Selected";
  }

  const contactContainer = document.getElementById("contactFieldsContainer");
  if (contactContainer) {
    contactContainer.innerHTML = "";
    contactIdCounter = 0;
  }

  clearSelectedTeams();
}

// ==================== EVENT LISTENERS SETUP ====================
function setupEventListeners() {
  if (projectEventListenersInitialized) return;
  projectEventListenersInitialized = true;

  const modal = document.getElementById("projectModal");
  const addBtn = document.getElementById("addProjectBtn");
  const closeBtn = document.querySelector(".project-modal-close");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // ✅ Add contact row ONLY if container is empty
        const contactContainer = document.getElementById(
          "contactFieldsContainer"
        );
        if (contactContainer && contactContainer.children.length === 0) {
          addContactRow(null, true);
        }
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeModal();
    });
  }

  window.addEventListener("click", (e) => {
    if (modal && e.target === modal) {
      closeModal();
    }
    const employeeModal = document.getElementById(
      "projectOverviewEmployeeModal"
    );
    if (employeeModal && e.target === employeeModal) {
      closeProjectOverviewEmployeeModal();
    }
  });

  const onboardingSelect = document.getElementById("onboardingProject");
  if (onboardingSelect) {
    onboardingSelect.addEventListener("change", handleOnboardingSelection);
  }

  if (!contactButtonListenerAttached) {
    contactButtonListenerAttached = true;

    document.addEventListener("click", (e) => {
      // ✅ Add New Contact Button
      if (e.target.closest(".add-contact-btn")) {
        e.preventDefault();
        e.stopPropagation();
        addContactRow(); // Only adds 1 row
      }

      // ✅ Remove Contact Button
      if (e.target.closest(".remove-contact-btn")) {
        e.preventDefault();
        e.stopPropagation();
        removeContactRow(e.target.closest(".remove-contact-btn"));
      }
    });
  }

  // Attach event listener for dropdown change
  function setupTeamSelectorListener() {
    const allocatedTeamSelect = document.getElementById("allocatedTeam");
    if (allocatedTeamSelect) {
      allocatedTeamSelect.addEventListener("change", handleTeamSelection);
    }
  }

  // Call this once when the modal/page is initialized
  setupTeamSelectorListener();

  // ==================== HANDLE FORM SUBMIT ====================
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted!");

    const form = document.getElementById("projectForm");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = {
      id: projectsData.length + 1,
      customerId: document.getElementById("customerId").value,
      name: document.getElementById("onboardingProject").selectedOptions[0]
        .textContent,
      description: document.getElementById("projectDescription").value,
      contacts: collectContactData(),
      allocatedTeam: selectedTeams,
      reportingPerson: document.getElementById("reportingPerson").value,
      startDate: formatDate(document.getElementById("startDate").value),
      deadline: formatDate(document.getElementById("completionDate").value),
      revieDate: document.getElementById("revieDate").value,
      remarks: document.getElementById("remarks").value,
      teamHead: "Fisto",
      initiatedBy: "Fisto",
      priority: "High",
      status: Math.floor(Math.random() * 100) + 1,
    };

    projectsData.push(formData);
    filteredProjects = [...projectsData];

    currentPage = Math.ceil(filteredProjects.length / itemsPerPage);

    renderTable();
    setupPagination();

    showSuccessToast(formData.customerId);

    closeModal();
  }

  function closeModal() {
    console.log("closeModal called"); // ← Add this line

    const modal = document.getElementById("projectModal");

    // Hide the modal
    if (modal) {
      modal.style.display = "none";
      console.log("Modal hidden");
    } else {
      console.error("Modal element not found!");
    }

    // Restore body scroll
    document.body.style.overflow = "";

    // Clear the form
    clearForm();
  }

  const fileInput = document.getElementById("documentUpload");
  const fileChooseBtn = document.querySelector(".file-choose-btn");
  const fileName = document.querySelector(".file-name");

  if (fileChooseBtn && fileInput && fileName) {
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
  }

  const submitBtn = document.getElementById("projectSubmitBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", handleFormSubmit);
  }

  const clearBtn = document.getElementById("clearFormBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearForm);
  }

  const searchInput = document.getElementById("projectSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
        setupPagination();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
        setupPagination();
      }
    });
  }

  const empSearchInput = document.getElementById(
    "projectOverviewEmployeeSearchInput"
  );
  if (empSearchInput) {
    empSearchInput.addEventListener(
      "input",
      handleProjectOverviewEmployeeSearch
    );
  }

  // Add task search input listener
  const taskSearchInput = document.getElementById("TaskprojectSearchInput");
  if (taskSearchInput) {
    taskSearchInput.addEventListener("input", handleTaskSearchInput);
  }

  // Add task pagination event listeners
  const taskPrevBtn = document.getElementById("taskprevBtn");
  const taskNextBtn = document.getElementById("tasknextBtn");

  if (taskPrevBtn) {
    taskPrevBtn.addEventListener("click", () => {
      if (currentTaskPage > 1) {
        currentTaskPage--;
        renderTasksTable();
      }
    });
  }

  if (taskNextBtn) {
    taskNextBtn.addEventListener("click", () => {
      const dataToShow =
        filteredTasksForPagination.length > 0
          ? filteredTasksForPagination
          : tasksData;
      const totalPages = Math.ceil(dataToShow.length / tasksPerPage);
      if (currentTaskPage < totalPages) {
        currentTaskPage++;
        renderTasksTable();
      }
    });
  }
}

// ==================== HANDLE ONBOARDING SELECTION ====================
function handleOnboardingSelection(e) {
  const selectedOption = e.target.selectedOptions[0];

  if (!selectedOption.value) {
    clearAutofillFields();
    return;
  }

  const projectData = JSON.parse(selectedOption.dataset.projectData);

  document.getElementById("customerId").value = projectData.id;
  document.getElementById("projectDescription").value = projectData.description;

  const contactContainer = document.getElementById("contactFieldsContainer");
  contactContainer.innerHTML = "";
  contactIdCounter = 0;

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
      ${
        isFirst || contactContainer.children.length === 0
          ? '<button type="button" class="add-contact-btn" title="Add Contact">Add New Contact</button>'
          : '<button type="button" class="remove-contact-btn" title="Remove Contact"><img src="../assets/imgaes/preview_delete_btn.png"></button>'
      }
    </div>
    <div class="form-row contact-form-row">
      <div class="form-group">
        <label>Contact Person <span class="required">*</span></label>
        <input type="text" class="project-input contact-person" placeholder="Abi" value="${
          contactData?.person || ""
        }" required>
      </div>
      <div class="form-group">
        <label>Phone Number <span class="required">*</span></label>
        <input type="tel" class="project-input contact-phone" placeholder="+91 9093450945" value="${
          contactData?.phone || ""
        }" required>
      </div>
      <div class="form-group">
        <label>Mail ID <span class="required">*</span></label>
        <input type="email" class="project-input contact-email" placeholder="fisto@gmail.com" value="${
          contactData?.email || ""
        }" required>
      </div>
      <div class="form-group">
        <label>Designation <span class="required">*</span></label>
        <input type="text" class="project-input contact-designation" placeholder="Manager" value="${
          contactData?.designation || ""
        }" required>
      </div>
    </div>
  `;

  contactContainer.appendChild(contactRow);
}

// ==================== REMOVE CONTACT ROW ====================
function removeContactRow(button) {
  const contactRow = button.closest(".contact-row");
  contactRow.remove();

  const contactContainer = document.getElementById("contactFieldsContainer");
  if (contactContainer.children.length === 0) {
    addContactRow(null, true);
  }
}

// ==================== COLLECT CONTACT DATA ====================
function collectContactData() {
  const contacts = [];
  const contactRows = document.querySelectorAll(".contact-row");

  contactRows.forEach((row) => {
    contacts.push({
      person: row.querySelector(".contact-person").value,
      phone: row.querySelector(".contact-phone").value,
      email: row.querySelector(".contact-email").value,
      designation: row.querySelector(".contact-designation").value,
    });
  });

  return contacts;
}

// ==================== FORMAT DATE ====================
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ==================== SHOW SUCCESS TOAST ====================
function showSuccessToast(message) {
  const toast = document.getElementById("successToast");
  const text = document.getElementById("successText");

  if (toast && text) {
    text.textContent =
      typeof message === "string" && message.startsWith("EST")
        ? `Project "${message}" added successfully`
        : message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }
}

// ==================== RENDER TABLE ====================
function renderTable() {
  const tbody = document.getElementById("projectTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const totalProjectsEl = document.getElementById("totalProjects");
  if (totalProjectsEl) {
    totalProjectsEl.textContent = filteredProjects.length;
  }

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  paginatedProjects.forEach((project) => {
    const row = document.createElement("tr");

    let progressClass = "progress-fill";
    if (project.status < 30) progressClass += " low";
    else if (project.status < 60) progressClass += " medium";

    row.innerHTML = `
      <td>${project.name}</td>
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
            <div class="${progressClass}" style="width: ${
      project.status
    }%"></div>
          </div>
          <span class="progress-text">${project.status}%</span>
        </div>
      </td>
      <td>
        <button class="view-btn" onclick="viewProject(${
          project.id
        })"><img src="./assets/imgaes/table_eye.png" ></button>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteProject(${
          project.id
        })"><img src="./assets/imgaes/preview_delete_btn.png" ></button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// ==================== SETUP PAGINATION ====================
function setupPagination() {
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginationNumbers = document.getElementById("paginationNumbers");

  if (!paginationNumbers) return;

  paginationNumbers.innerHTML = "";

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn)
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `page-number ${i === currentPage ? "active" : ""}`;
    pageBtn.textContent = String(i).padStart(2, "0");
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

  filteredProjects = projectsData.filter(
    (project) =>
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
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    console.error("Project not found with id:", id);
    return;
  }

  currentProjectOverview = project;

  const projectsContent = document.querySelector(".projects-content");
  if (projectsContent) {
    projectsContent.style.display = "none";
  }

  const overviewPage = document.getElementById("projectOverviewPage");
  if (!overviewPage) {
    console.error("Project overview page element not found!");
    return;
  }

  overviewPage.style.display = "block";

  const breadcrumbName = document.getElementById("projectOverviewName");
  if (breadcrumbName) {
    breadcrumbName.textContent = project.name;
  }

  const assignedEmployeesEl = document.getElementById(
    "projectOverviewAssignedEmployees"
  );
  if (assignedEmployeesEl) {
    assignedEmployeesEl.textContent = projectOverviewAllocatedEmployees.length;
  }

  const totalTasksEl = document.getElementById("projectOverviewTotalTasks");
  if (totalTasksEl) totalTasksEl.textContent = tasksData.length;

  const completedTasksEl = document.getElementById(
    "projectOverviewCompletedTasks"
  );
  if (completedTasksEl)
    completedTasksEl.textContent = tasksData.filter(
      (t) => t.status === "Completed"
    ).length;

  const ongoingTasksEl = document.getElementById("projectOverviewOngoingTasks");
  if (ongoingTasksEl)
    ongoingTasksEl.textContent = tasksData.filter(
      (t) => t.status === "In Progress"
    ).length;

  const delayedTasksEl = document.getElementById("projectOverviewDelayedTasks");
  if (delayedTasksEl)
    delayedTasksEl.textContent = tasksData.filter(
      (t) => t.status === "Delayed"
    ).length;

  const overdueTasksEl = document.getElementById("projectOverviewOverdueTasks");
  if (overdueTasksEl)
    overdueTasksEl.textContent = tasksData.filter(
      (t) => t.status === "Overdue"
    ).length;

  const startingDateEl = document.getElementById("projectOverviewStartingDate");
  if (startingDateEl) startingDateEl.textContent = project.startDate;

  const deadlineDateEl = document.getElementById("projectOverviewDeadlineDate");
  if (deadlineDateEl) deadlineDateEl.textContent = project.deadline;

  const priorityBadge = document.querySelector(
    ".project-overview-priority-badge"
  );
  if (priorityBadge) {
    const priority = project.priority || "High";
    priorityBadge.textContent = priority;
    priorityBadge.className = "project-overview-priority-badge";
    if (priority === "High")
      priorityBadge.classList.add("project-overview-priority-high");
    else if (priority === "Medium")
      priorityBadge.classList.add("project-overview-priority-medium");
    else priorityBadge.classList.add("project-overview-priority-low");
  }

  const titleEl = document.getElementById("projectOverviewTitle");
  if (titleEl) titleEl.textContent = project.name;

  const descriptionEl = document.getElementById("projectOverviewDescription");
  if (descriptionEl)
    descriptionEl.textContent = project.description || "No description";

  updateProjectOverviewEmployeeAvatars();

  // Reset task pagination to page 1
  currentTaskPage = 1;
  filteredTasksForPagination = [];
  renderTasksTable();
}

// ==================== DELETE PROJECT ====================
function deleteProject(id) {
  if (confirm("Are you sure you want to delete this project?")) {
    projectsData = projectsData.filter((p) => p.id !== id);
    filteredProjects = [...projectsData];

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }

    renderTable();
    setupPagination();
    showSuccessToast("Project deleted successfully!");
  }
}

// ==================== PROJECT OVERVIEW FUNCTIONALITY ====================

// ==================== BACK TO PROJECTS ====================
function backToProjectsList() {
  const overviewPage = document.getElementById("projectOverviewPage");
  if (overviewPage) {
    overviewPage.style.display = "none";
  }

  const projectsContent = document.querySelector(".projects-content");
  if (projectsContent) {
    projectsContent.style.display = "block";
  }

  currentProjectOverview = null;
}

// ==================== SWITCH OVERVIEW TAB ====================
function switchProjectOverviewTab(tabName) {
  document.querySelectorAll(".project-overview-tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  document
    .querySelectorAll(".project-overview-tab-content")
    .forEach((content) => {
      content.classList.remove("active");
    });

  event.target.classList.add("active");

  if (tabName === "overview") {
    const overviewTab = document.getElementById("projectOverviewTabContent");
    if (overviewTab) overviewTab.classList.add("active");
  } else {
    const resourcesTab = document.getElementById(
      "projectOverviewResourcesTabContent"
    );
    if (resourcesTab) resourcesTab.classList.add("active");
  }
}

// ==================== UPDATE EMPLOYEE AVATARS ====================
function updateProjectOverviewEmployeeAvatars() {
  const container = document.getElementById("projectOverviewEmployeeAvatars");
  if (!container) return;

  container.innerHTML = "";

  const maxVisible = 4;
  const visibleEmployees = projectOverviewAllocatedEmployees.slice(
    0,
    maxVisible
  );
  const extraCount = projectOverviewAllocatedEmployees.length - maxVisible;

  visibleEmployees.forEach((emp) => {
    const avatar = document.createElement("div");
    avatar.className = "project-overview-avatar-circle";
    avatar.style.background = emp.avatar || "#333";
    avatar.textContent = emp.initial;
    container.appendChild(avatar);
  });

  if (extraCount > 0) {
    const extraAvatar = document.createElement("div");
    extraAvatar.className =
      "project-overview-avatar-circle project-overview-extra-count";
    extraAvatar.textContent = `+${extraCount}`;
    container.appendChild(extraAvatar);
  }
}

// ==================== OPEN EMPLOYEE MODAL ====================
function openProjectOverviewEmployeeModal() {
  const modal = document.getElementById("projectOverviewEmployeeModal");
  if (!modal) return;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  const modalProjectName = document.getElementById(
    "projectOverviewEmployeeModalProjectName"
  );
  if (modalProjectName && currentProjectOverview) {
    modalProjectName.textContent = currentProjectOverview.name;
  }

  selectedProjectOverviewEmployees.clear();

  tempProjectOverviewAllocatedEmployees = [
    ...projectOverviewAllocatedEmployees,
  ];

  renderProjectOverviewAllocateList();
  renderProjectOverviewAllocatedList();

  updateProjectOverviewEmployeeCounts();
}

// ==================== CLOSE EMPLOYEE MODAL ====================
function closeProjectOverviewEmployeeModal() {
  const modal = document.getElementById("projectOverviewEmployeeModal");
  if (modal) {
    modal.style.display = "none";
  }
  document.body.style.overflow = "";
  selectedProjectOverviewEmployees.clear();
  tempProjectOverviewAllocatedEmployees = [];
}

// ==================== SWITCH EMPLOYEE TAB ====================
function switchProjectOverviewEmployeeTab(tabName) {
  document
    .querySelectorAll(".project-overview-employee-tab-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });

  document
    .querySelectorAll(".project-overview-employee-tab-content")
    .forEach((content) => {
      content.classList.remove("active");
    });

  event.target.classList.add("active");

  if (tabName === "allocate") {
    const allocateTab = document.getElementById(
      "projectOverviewAllocateTabContent"
    );
    if (allocateTab) allocateTab.classList.add("active");
  } else {
    const allocatedTab = document.getElementById(
      "projectOverviewAllocatedTabContent"
    );
    if (allocatedTab) allocatedTab.classList.add("active");
  }
}

// ==================== RENDER ALLOCATE LIST ====================
function renderProjectOverviewAllocateList() {
  const container = document.getElementById("projectOverviewAllocateList");
  if (!container) return;

  container.innerHTML = "";

  const allocatedIds = tempProjectOverviewAllocatedEmployees.map(
    (emp) => emp.id
  );
  const availableToAllocate = projectOverviewAvailableEmployees.filter(
    (emp) => !allocatedIds.includes(emp.id)
  );

  if (availableToAllocate.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #999; padding: 20px;">No employees available to allocate</p>';
    return;
  }

  availableToAllocate.forEach((emp) => {
    const item = document.createElement("div");
    item.className = "project-overview-employee-item";

    item.innerHTML = `
      <input type="checkbox" class="project-overview-employee-checkbox" 
             onchange="toggleProjectOverviewEmployeeSelection(${emp.id})" 
             id="project-overview-emp-${emp.id}">
      <div class="project-overview-employee-avatar-large" style="background: ${emp.avatar}">${emp.initial}</div>
      <span class="project-overview-employee-name">${emp.name}</span>
    `;

    container.appendChild(item);
  });
}

// ==================== RENDER ALLOCATED LIST ====================
function renderProjectOverviewAllocatedList() {
  const container = document.getElementById("projectOverviewAllocatedList");
  if (!container) return;

  container.innerHTML = "";

  if (tempProjectOverviewAllocatedEmployees.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #999; padding: 20px;">No employees allocated yet</p>';
    return;
  }

  tempProjectOverviewAllocatedEmployees.forEach((emp) => {
    const item = document.createElement("div");
    item.className = "project-overview-employee-item";

    item.innerHTML = `
      <div class="project-overview-employee-avatar-large" style="background: ${emp.avatar}">${emp.initial}</div>
      <span class="project-overview-employee-name">${emp.name}</span>
      <button class="project-overview-remove-employee-btn" onclick="removeProjectOverviewEmployee(${emp.id})">
        <img src="../assets/imgaes/preview_delete_btn.png" alt="Remove" style="width: 20px; height: 20px;">
      </button>
    `;

    container.appendChild(item);
  });
}

// ==================== TOGGLE EMPLOYEE SELECTION ====================
function toggleProjectOverviewEmployeeSelection(empId) {
  if (selectedProjectOverviewEmployees.has(empId)) {
    selectedProjectOverviewEmployees.delete(empId);
  } else {
    selectedProjectOverviewEmployees.add(empId);
  }
}

// ==================== REMOVE EMPLOYEE ====================
function removeProjectOverviewEmployee(empId) {
  tempProjectOverviewAllocatedEmployees =
    tempProjectOverviewAllocatedEmployees.filter((emp) => emp.id !== empId);

  renderProjectOverviewAllocateList();
  renderProjectOverviewAllocatedList();
  updateProjectOverviewEmployeeCounts();
}

// ==================== SAVE EMPLOYEE CHANGES ====================
function saveProjectOverviewEmployeeChanges() {
  selectedProjectOverviewEmployees.forEach((empId) => {
    const employee = projectOverviewAvailableEmployees.find(
      (emp) => emp.id === empId
    );
    if (
      employee &&
      !tempProjectOverviewAllocatedEmployees.find((emp) => emp.id === empId)
    ) {
      tempProjectOverviewAllocatedEmployees.push(employee);
    }
  });

  projectOverviewAllocatedEmployees = [
    ...tempProjectOverviewAllocatedEmployees,
  ];

  updateProjectOverviewEmployeeAvatars();

  const assignedEmployeesEl = document.getElementById(
    "projectOverviewAssignedEmployees"
  );
  if (assignedEmployeesEl) {
    assignedEmployeesEl.textContent = projectOverviewAllocatedEmployees.length;
  }

  closeProjectOverviewEmployeeModal();

  const addedCount = selectedProjectOverviewEmployees.size;
  if (addedCount > 0) {
    showSuccessToast(`${addedCount} employee(s) allocated successfully`);
  } else {
    showSuccessToast("Employee changes saved successfully");
  }
}

// ==================== UPDATE EMPLOYEE COUNTS ====================
function updateProjectOverviewEmployeeCounts() {
  const allocatedIds = tempProjectOverviewAllocatedEmployees.map(
    (emp) => emp.id
  );
  const availableCount = projectOverviewAvailableEmployees.filter(
    (emp) => !allocatedIds.includes(emp.id)
  ).length;

  const allocateCountEl = document.getElementById(
    "projectOverviewAllocateCount"
  );
  if (allocateCountEl) {
    allocateCountEl.textContent = availableCount;
  }

  const allocatedCountEl = document.getElementById(
    "projectOverviewAllocatedCount"
  );
  if (allocatedCountEl) {
    allocatedCountEl.textContent = tempProjectOverviewAllocatedEmployees.length;
  }
}

// ==================== EMPLOYEE SEARCH ====================
function handleProjectOverviewEmployeeSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".project-overview-employee-item");

  items.forEach((item) => {
    const nameElement = item.querySelector(".project-overview-employee-name");
    if (nameElement) {
      const name = nameElement.textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// ==================== TASK MANAGEMENT FUNCTIONALITY ====================

// ==================== CALCULATE DURATION ====================
function calculateTaskDuration(taskNumber) {
  const startDate = document.getElementById(
    `taskStartDate${taskNumber}`
  )?.value;
  const endDate = document.getElementById(`taskEndDate${taskNumber}`)?.value;
  const startTime = document.getElementById(
    `taskStartTime${taskNumber}`
  )?.value;
  const endTime = document.getElementById(`taskEndTime${taskNumber}`)?.value;

  if (!startDate || !endDate || !startTime || !endTime) {
    return "N/A";
  }

  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  const diffMs = end - start;

  if (diffMs < 0) {
    return "Invalid";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  let duration = "";
  if (diffDays > 0) {
    duration += `${diffDays}d `;
  }
  if (diffHours > 0) {
    duration += `${diffHours}h `;
  }
  if (diffMinutes > 0) {
    duration += `${diffMinutes}m`;
  }

  return duration.trim() || "0m";
}

// ==================== UPDATE DURATION FIELD ====================
function updateTaskDuration(taskNumber) {
  const durationField = document.getElementById(`taskDuration${taskNumber}`);
  if (durationField) {
    durationField.value = calculateTaskDuration(taskNumber);
  }
}

// ==================== OPEN TASK MANAGEMENT PAGE ====================
function openTaskManagementPage() {
  const overviewPage = document.getElementById("projectOverviewPage");
  if (overviewPage) {
    overviewPage.style.display = "none";
  }

  const taskPage = document.getElementById("taskManagementPage");
  if (taskPage) {
    taskPage.style.display = "block";
  }

  const breadcrumbName = document.getElementById("taskBreadcrumbProjectName");
  if (breadcrumbName && currentProjectOverview) {
    breadcrumbName.textContent = currentProjectOverview.name;
  }

  taskCardCounter = 0;
  const container = document.getElementById("taskCardsContainer");
  if (container) {
    container.innerHTML = "";
    addNewTaskCard();
  }
}

// ==================== ADD NEW TASK CARD ====================
function addNewTaskCard() {
  taskCardCounter++;
  const container = document.getElementById("taskCardsContainer");

  const existingCards = container.querySelectorAll(".task-card");
  existingCards.forEach((card) => {
    card.classList.add("collapsed");
    const expandBtn = card.querySelector(".task-expand-btn");
    if (expandBtn) {
      expandBtn.classList.remove("expanded");
    }
  });

  const taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.id = `taskCard${taskCardCounter}`;
  taskCard.dataset.taskNumber = taskCardCounter;

  taskCard.innerHTML = `
    <div class="task-card-header" onclick="toggleTaskCard(${taskCardCounter})" >
      <div class="task-card-number-section">
        <div class="task-number-badge">${String(taskCardCounter).padStart(
          2,
          "0"
        )}</div>
        <span class="task-card-title">Task ${taskCardCounter}</span>
      </div>
      <div class="task-card-summary">
    <span class="task-card-summary-desc badge">task Name</span>
    <span class="task-card-summary-activities badge">assigned employee: None</span>
    <span class="task-card-summary-startdate badge">Start date: ---- -- --</span>
    <span class="task-card-summary-enddate badge">End date: ---- -- --</span>
  </div>
      <div class="task-card-actions">
      <button class="task-delete-btn" onclick="deleteTaskCard(${taskCardCounter})">
        <img src="../assets/imgaes/preview_delete_btn.png" alt="Delete">
      </button>
        <button class="task-expand-btn expanded" > 
        <img src="../assets/imgaes/task_arrow.png" alt="Delete">
       </button>
      </div>
    </div>
    
    <div class="task-card-content">
      <div class="task-form-row">
        <div class="task-form-group">
          <label>Task Name</label>
          <input type="text" class="task-input" placeholder="Type here" id="taskName${taskCardCounter}">
        </div>
        <div class="task-form-group">
          <label>Starting date</label>
          <input type="date" class="task-input" id="taskStartDate${taskCardCounter}" onchange="updateTaskDuration(${taskCardCounter})">
        </div>
         <div class="task-form-group">
          <label>Starting time</label>
          <input type="time" class="task-input" id="taskStartTime${taskCardCounter}" onchange="updateTaskDuration(${taskCardCounter})">
        </div>
        <div class="task-form-group">
          <label>Ending date</label>
          <input type="date" class="task-input" id="taskEndDate${taskCardCounter}" onchange="updateTaskDuration(${taskCardCounter})">
        </div>
      </div>
      
      <div class="task-form-row">
        <div class="task-form-group">
          <label>End time</label>
          <input type="time" class="task-input" id="taskEndTime${taskCardCounter}" onchange="updateTaskDuration(${taskCardCounter})">
        </div>
        <div class="task-form-group">
          <label>Duration</label>
          <input type="text" class="task-input" placeholder="Auto-calculated" id="taskDuration${taskCardCounter}" readonly style="background: #f3f4f6; cursor: not-allowed;">
        </div>
        <div class="task-form-group">
          <label>Description</label>
          <input type="text" class="task-input" placeholder="Enter description here" id="taskDescription${taskCardCounter}">
        </div>
        <div class="task-form-group">
          <label>Assign Employee</label>
          <select class="task-select" id="taskEmployee${taskCardCounter}">
            <option value="">Select Employee</option>
            <option value="Murugan">Murugan</option>
            <option value="Safi">Safi</option>
            <option value="Harish">Harish</option>
            <option value="Pradeepa">Pradeepa</option>
          </select>
        </div>
      </div>
    </div>
  `;

  container.appendChild(taskCard);
  currentExpandedTask = taskCardCounter;
}

function updateTaskSummary(taskCard) {
  const taskNumber = taskCard.dataset.taskNumber;
  const name =
    document.getElementById("taskName" + taskNumber)?.value || "Not set";
  const assigned =
    document.getElementById("taskEmployee" + taskNumber)?.value || "Unassigned";
  const start =
    document.getElementById("taskStartDate" + taskNumber)?.value || "--";
  const end =
    document.getElementById("taskEndDate" + taskNumber)?.value || "--";

  taskCard.querySelector(".task-card-summary-desc").textContent = name;
  taskCard.querySelector(".task-card-summary-activities").textContent =
    "Assigned To: " + assigned;
  taskCard.querySelector(".task-card-summary-startdate").textContent =
    "Start date: " + start;
  taskCard.querySelector(".task-card-summary-enddate").textContent =
    "End date: " + end;
}

document.querySelectorAll(".task-input, .task-select").forEach((input) => {
  input.addEventListener("change", function () {
    const card = input.closest(".task-card");
    updateTaskSummary(card);
  });
});

// ==================== TOGGLE TASK CARD ====================
function toggleTaskCard(taskNumber) {
  const taskCard = document.getElementById("taskCard" + taskNumber);
  const expandBtn = taskCard.querySelector(".task-expand-btn");

  if (taskCard.classList.contains("collapsed")) {
    document.querySelectorAll(".task-card").forEach((card) => {
      card.classList.add("collapsed");
      const btn = card.querySelector(".task-expand-btn");
      if (btn) btn.classList.remove("expanded");
    });

    taskCard.classList.remove("collapsed");
    expandBtn.classList.add("expanded");
    currentExpandedTask = taskNumber;
  } else {
    taskCard.classList.add("collapsed");
    expandBtn.classList.remove("expanded");
    currentExpandedTask = null;
  }
  updateTaskSummary(taskCard);
}

// ==================== DELETE TASK CARD ====================
function deleteTaskCard(taskNumber) {
  if (confirm("Are you sure you want to delete this task?")) {
    const taskCard = document.getElementById(`taskCard${taskNumber}`);
    taskCard.remove();

    const remainingCards = document.querySelectorAll(".task-card");
    taskCardCounter = 0;
    remainingCards.forEach((card, index) => {
      taskCardCounter++;
      card.dataset.taskNumber = taskCardCounter;
      card.id = `taskCard${taskCardCounter}`;

      const badge = card.querySelector(".task-number-badge");
      const title = card.querySelector(".task-card-title");
      if (badge) badge.textContent = String(taskCardCounter).padStart(2, "0");
      if (title) title.textContent = `Task ${taskCardCounter}`;
    });
  }
}

// ==================== SAVE ALL TASKS ====================
function saveAllTasks() {
  const taskCards = document.querySelectorAll(".task-card");
  const newTasks = [];

  taskCards.forEach((card) => {
    const taskNumber = card.dataset.taskNumber;
    const task = {
      id: tasksData.length + newTasks.length + 1,
      taskNumber: taskNumber,
      name:
        document.getElementById(`taskName${taskNumber}`)?.value ||
        `Task ${taskNumber}`,
      startDate:
        document.getElementById(`taskStartDate${taskNumber}`)?.value || "",
      endDate: document.getElementById(`taskEndDate${taskNumber}`)?.value || "",
      startTime:
        document.getElementById(`taskStartTime${taskNumber}`)?.value || "",
      endTime: document.getElementById(`taskEndTime${taskNumber}`)?.value || "",
      description:
        document.getElementById(`taskDescription${taskNumber}`)?.value ||
        "Description",
      employee:
        document.getElementById(`taskEmployee${taskNumber}`)?.value ||
        "Unassigned",
      status: "In Progress",
      progress: Math.floor(Math.random() * 100),
    };
    newTasks.push(task);
  });

  tasksData = [...tasksData, ...newTasks];

  backToProjectOverview();

  // Reset to page 1 and clear filters
  currentTaskPage = 1;
  filteredTasksForPagination = [];
  renderTasksTable();

  showSuccessToast(`${newTasks.length} task(s) added successfully!`);
}

// ==================== BACK TO PROJECT OVERVIEW ====================
function backToProjectOverview() {
  const taskPage = document.getElementById("taskManagementPage");
  if (taskPage) {
    taskPage.style.display = "none";
  }

  const overviewPage = document.getElementById("projectOverviewPage");
  if (overviewPage) {
    overviewPage.style.display = "block";
  }
}

// ==================== RENDER TASKS TABLE WITH PAGINATION ====================
function renderTasksTable() {
  const tbody = document.getElementById("projectTasksTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  // Use filtered data if available, otherwise use all tasks
  const dataToShow =
    filteredTasksForPagination.length > 0
      ? filteredTasksForPagination
      : tasksData;

  if (dataToShow.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="13" style="text-align: center; padding: 40px; color: #999">
          No tasks found. Click "Add task" to create new tasks.
        </td>
      </tr>
    `;
    setupTaskPagination(0);
    return;
  }

  // Calculate pagination
  const startIndex = (currentTaskPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = dataToShow.slice(startIndex, endIndex);

  // Render paginated tasks
  paginatedTasks.forEach((task, index) => {
    const actualIndex = startIndex + index + 1;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${actualIndex}</td>
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.startDate}</td>
      <td>${task.startTime}</td>
      <td>${task.endDate}</td>
      <td>${task.endTime}</td>
      <td>Fisto</td>
      <td>${task.employee}</td>
      <td><button class="view-report-btn" style="padding: 6px 12px; background: #0052CC; color: white; border: none; border-radius: 6px; cursor: pointer; font-size:0.6vw;">View Report</button></td>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="progress-bar" style="width: 100px; height: 8px; background: #e5e7eb; border-radius: 4px;">
            <div style="width: ${task.progress}%; height: 100%; background: #0052CC; border-radius: 4px;"></div>
          </div>
          <span style="font-size: 0.85rem;">${task.progress}%</span>
        </div>
      </td>
      <td><span class="status-badge" style="padding: 4px 12px; background: #dbeafe; color: #0052CC; border-radius: 6px; font-size: 0.85rem;">${task.status}</span></td>
      <td><button class="comment-btn" style="padding: 6px 12px; background: #f3f4f6; border: 1px solid #CBCDD2; border-radius: 6px; cursor: pointer;">View</button></td>
    `;
    tbody.appendChild(row);
  });

  // Setup pagination controls
  setupTaskPagination(dataToShow.length);
}

// ==================== SETUP TASK PAGINATION ====================
function setupTaskPagination(totalTasks) {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const paginationNumbers = document.getElementById("taskpaginationNumbers");

  if (!paginationNumbers) return;

  paginationNumbers.innerHTML = "";

  const prevBtn = document.getElementById("taskprevBtn");
  const nextBtn = document.getElementById("tasknextBtn");

  if (prevBtn) prevBtn.disabled = currentTaskPage === 1;
  if (nextBtn)
    nextBtn.disabled = currentTaskPage === totalPages || totalPages === 0;

  // Create page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `taskpage-number ${
      i === currentTaskPage ? "active" : ""
    }`;
    pageBtn.textContent = String(i).padStart(2, "0");
    pageBtn.addEventListener("click", () => {
      currentTaskPage = i;
      renderTasksTable();
    });
    paginationNumbers.appendChild(pageBtn);
  }
}

// ==================== TASK SEARCH FUNCTIONALITY WITH PAGINATION ====================
function handleTaskSearchInput(event) {
  const searchTerm = event.target.value.toLowerCase().trim();

  // Reset to page 1 when searching
  currentTaskPage = 1;

  // If search is empty, clear filtered data
  if (!searchTerm) {
    filteredTasksForPagination = [];
    renderTasksTable();
    return;
  }

  // Filter tasks based on search term
  filteredTasksForPagination = tasksData.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm) ||
      task.employee.toLowerCase().includes(searchTerm)
  );

  renderTasksTable();
}

function clearTaskSearch() {
  const searchInput = document.getElementById("TaskprojectSearchInput");
  if (searchInput) {
    searchInput.value = "";
  }
  filteredTasksForPagination = [];
  currentTaskPage = 1;
  renderTasksTable();
}

// ==================== FILE UPLOAD MODAL ====================
function openProjectResourcesFileModal() {
  console.log("Opening file upload modal...");
  const fileModal = document.getElementById("projectResourcesFileModal");
  if (!fileModal) {
    console.error("File modal not found!");
    return;
  }
  fileModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  const dropzone = document.getElementById("projectResourcesFileDropzone");
  const fileInput = document.getElementById("projectResourcesFileInput");

  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();

    fileInput.onchange = (e) =>
      handleProjectResourcesFileSelection(e.target.files);

    dropzone.ondragover = (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "#0052CC";
      dropzone.style.background = "#f0f7ff";
    };

    dropzone.ondragleave = () => {
      dropzone.style.borderColor = "#cbd5e0";
      dropzone.style.background = "white";
    };

    dropzone.ondrop = (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "#cbd5e0";
      dropzone.style.background = "white";
      handleProjectResourcesFileSelection(e.dataTransfer.files);
    };
  }
}

function handleProjectResourcesFileSelection(files) {
  projectResourcesSelectedFiles = Array.from(files);
  const filesList = document.getElementById("projectResourcesFilesList");
  const selectedSection = document.getElementById(
    "projectResourcesSelectedFiles"
  );

  if (!filesList || !selectedSection) return;

  if (projectResourcesSelectedFiles.length === 0) {
    selectedSection.style.display = "none";
    return;
  }

  selectedSection.style.display = "block";
  filesList.innerHTML = "";

  let totalSize = 0;
  projectResourcesSelectedFiles.forEach((file, index) => {
    totalSize += file.size;
    const fileItem = document.createElement("div");
    fileItem.className = "project-resources-file-item";
    fileItem.innerHTML = `
      <div class="project-resources-file-info">
        <div class="project-resources-file-icon"> <img src="../assets/imgaes/modal_file_bBlue.png"> </div>
        <div class="project-resources-file-details">
          <h5>${file.name}</h5>
          <span class="project-resources-file-size">${formatFileSize(
            file.size
          )}</span>
        </div>
      </div>
      <button class="project-resources-action-btn delete" onclick="removeProjectResourcesSelectedFile(${index})">
        <img src="../assets/imgaes/proicons_cancel.png" alt="Delete">
      </button>
    `;
    filesList.appendChild(fileItem);
  });

  const progress = document.querySelector(".project-resources-file-progress");
  if (progress) progress.textContent = `${formatFileSize(totalSize)} / 50MB`;
}

function removeProjectResourcesSelectedFile(index) {
  projectResourcesSelectedFiles.splice(index, 1);
  handleProjectResourcesFileSelection(projectResourcesSelectedFiles);
}

function uploadProjectResourcesFiles() {
  if (projectResourcesSelectedFiles.length === 0) {
    alert("Please select files to upload");
    return;
  }

  projectResourcesSelectedFiles.forEach((file) => {
    projectResourcesUploadedFiles.push({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toLocaleString(),
    });
  });

  showSuccessToast(
    `${projectResourcesSelectedFiles.length} file(s) uploaded successfully!`
  );
  closeProjectResourcesFileModal();
}

function closeProjectResourcesFileModal() {
  const fileModal = document.getElementById("projectResourcesFileModal");
  if (!fileModal) return;
  fileModal.style.display = "none";
  document.body.style.overflow = "";

  const filesList = document.getElementById("projectResourcesFilesList");
  const selectedSection = document.getElementById(
    "projectResourcesSelectedFiles"
  );
  const fileInput = document.getElementById("projectResourcesFileInput");

  if (filesList) filesList.innerHTML = "";
  if (selectedSection) selectedSection.style.display = "none";
  if (fileInput) fileInput.value = "";
  projectResourcesSelectedFiles = [];

  const progress = document.querySelector(".project-resources-file-progress");
  if (progress) progress.textContent = "0 Bytes / 50MB";
}

// ==================== FILE VIEW MODAL ====================
function openProjectResourcesFileViewModal() {
  console.log("Opening file view modal...");
  const fileViewModal = document.getElementById(
    "projectResourcesFileViewModal"
  );
  if (!fileViewModal) {
    console.error("File view modal not found!");
    return;
  }
  fileViewModal.style.display = "flex";
  document.body.style.overflow = "hidden";
  renderProjectResourcesUploadedFiles();
}

function renderProjectResourcesUploadedFiles() {
  const list = document.getElementById("projectResourcesUploadedFilesList");
  if (!list) return;

  list.innerHTML = "";

  if (projectResourcesUploadedFiles.length === 0) {
    list.innerHTML =
      '<p style="text-align: center; color: #999; padding: 40px;">No files uploaded yet</p>';
    return;
  }

  projectResourcesUploadedFiles.forEach((file) => {
    const fileItem = document.createElement("div");
    fileItem.className = "project-resources-file-item";
    fileItem.innerHTML = `
      <div class="project-resources-file-info">
        <div class="project-resources-file-icon"> <img src="../assets/imgaes/modal_file_bBlue.png"> </div>
        <div class="project-resources-file-details">
          <h5>${file.name}</h5>
          <span class="project-resources-file-size">${formatFileSize(
            file.size
          )}</span>
        </div>
      </div>
      <div class="project-resources-file-actions">
        <button class="project-resources-action-btn" onclick="viewProjectResourcesFile('${
          file.id
        }')" title="View">
        <img src="../assets/imgaes/table_eye.png" alt="View">
        </button>
        <button class="project-resources-action-btn" onclick="downloadProjectResourcesFile('${
          file.id
        }')" title="Download">
        <img src="../assets/imgaes/download_icon.png" alt="View">
        </button>
        <button class="project-resources-action-btn delete" onclick="deleteProjectResourcesFile('${
          file.id
        }')" title="Delete">
        <img src="../assets/imgaes/preview_delete_btn.png" alt="Delete">
        </button>
      </div>
    `;
    list.appendChild(fileItem);
  });
}

function viewProjectResourcesFile(id) {
  const file = projectResourcesUploadedFiles.find((f) => f.id == id);
  if (file) {
    alert(
      `Viewing: ${file.name}\n\nIn a real application, this would open the file viewer.`
    );
  }
}

function downloadProjectResourcesFile(id) {
  const file = projectResourcesUploadedFiles.find((f) => f.id == id);
  if (file) {
    alert(
      `Downloading: ${file.name}\n\nIn a real application, this would download the file.`
    );
    showSuccessToast(`${file.name} downloaded successfully!`);
  }
}

function deleteProjectResourcesFile(id) {
  if (confirm("Are you sure you want to delete this file?")) {
    projectResourcesUploadedFiles = projectResourcesUploadedFiles.filter(
      (f) => f.id != id
    );
    renderProjectResourcesUploadedFiles();
    showSuccessToast("File deleted successfully!");
  }
}

function closeProjectResourcesFileViewModal() {
  const fileViewModal = document.getElementById(
    "projectResourcesFileViewModal"
  );
  if (!fileViewModal) return;
  fileViewModal.style.display = "none";
  document.body.style.overflow = "";
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("upload button loaded");
  const but = document.getElementById("resourceUpload");
  if (but) {
    console.log("button exists");
    but.addEventListener("click", () => {
      openProjectResourcesLinkModal();
    });
  } else {
    console.log("button not exists");
  }
});

// ==================== LINK UPLOAD MODAL ====================
function createProjectResourcesModals() {
  // Check if modals already exist
  if (document.getElementById("projectResourcesLinkModal")) return;

  const modalsHTML = `
    <!-- UPLOAD REFERENCE LINKS MODAL -->
    <div id="projectResourcesLinkModal" class="project-resources-modal">
      <div class="project-resources-modal-content">
        <div class="project-resources-modal-header">
          <h3>Upload link</h3>
        </div>
        <div class="project-resources-links-container" id="projectResourcesLinksInputContainer">
          <div class="project-resources-link-row">
            <input type="text" class="project-resources-link-name" placeholder="Link name">
            <input type="url" class="project-resources-link-url" placeholder="https://example.com">
            <button class="project-resources-link-remove" onclick="removeProjectResourcesLinkRow(this)" style="display: none;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </button>
          </div>
        </div>
        <button class="project-resources-add-link-btn" onclick="addProjectResourcesLinkRow()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add another Link
        </button>
        <div class="project-resources-modal-footer">
          <button class="project-resources-btn-cancel" onclick="closeProjectResourcesLinkModal()">Cancel</button>
          <button class="project-resources-btn-upload" onclick="uploadProjectResourcesLinks()">Upload</button>
        </div>
      </div>
    </div>

    <!-- VIEW REFERENCE LINKS MODAL -->
    <div id="projectResourcesLinkViewModal" class="project-resources-modal">
      <div class="project-resources-modal-content">
        <div class="project-resources-modal-header">
          <h3>View Uploaded Links</h3>
          <span class="project-resources-modal-close" onclick="closeProjectResourcesLinkViewModal()">&times;</span>
        </div>
        <div class="project-resources-links-list" id="projectResourcesUploadedLinksList"></div>
        <div class="project-resources-modal-footer">
          <button class="project-resources-btn-cancel" onclick="closeProjectResourcesLinkViewModal()"> Close </button>
        </div>
      </div>
    </div>
  `;

  // Append to body
  document.body.insertAdjacentHTML("beforeend", modalsHTML);
}

// ==================== LINK UPLOAD MODAL ====================
function openProjectResourcesLinkModal() {
  createProjectResourcesModals(); // Create modals if they don't exist

  const linkModal = document.getElementById("projectResourcesLinkModal");
  if (!linkModal) {
    console.error("Link modal not found!");
    return;
  }

  linkModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Reset form
  const container = document.getElementById(
    "projectResourcesLinksInputContainer"
  );
  if (container) {
    container.innerHTML = `
      <div class="project-resources-link-row">
        <input type="text" class="project-resources-link-name" placeholder="Link name">
        <input type="url" class="project-resources-link-url" placeholder="https://example.com">
        <button class="project-resources-link-remove" onclick="removeProjectResourcesLinkRow(this)" style="display: none;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </button>
      </div>
    `;
  }
}

function closeProjectResourcesLinkModal() {
  const linkModal = document.getElementById("projectResourcesLinkModal");
  if (linkModal) {
    linkModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function addProjectResourcesLinkRow() {
  const container = document.getElementById(
    "projectResourcesLinksInputContainer"
  );
  if (!container) return;

  const newRow = document.createElement("div");
  newRow.className = "project-resources-link-row";
  newRow.innerHTML = `
    <input type="text" class="project-resources-link-name" placeholder="Link name">
    <input type="url" class="project-resources-link-url" placeholder="https://example.com">
    <button class="project-resources-link-remove" onclick="removeProjectResourcesLinkRow(this)">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    </button>
  `;
  container.appendChild(newRow);
}

function removeProjectResourcesLinkRow(button) {
  const row = button.closest(".project-resources-link-row");
  const container = document.getElementById(
    "projectResourcesLinksInputContainer"
  );

  if (container.children.length > 1) {
    row.remove();
  }
}

function uploadProjectResourcesLinks() {
  const container = document.getElementById(
    "projectResourcesLinksInputContainer"
  );
  const rows = container.querySelectorAll(".project-resources-link-row");

  const links = [];
  let hasError = false;

  rows.forEach((row) => {
    const name = row.querySelector(".project-resources-link-name").value.trim();
    const url = row.querySelector(".project-resources-link-url").value.trim();

    if (name && url) {
      links.push({ name, url, date: new Date().toLocaleDateString() });
    } else if (name || url) {
      hasError = true;
    }
  });

  if (hasError) {
    alert("Please fill in both name and URL for all links");
    return;
  }

  if (links.length === 0) {
    alert("Please add at least one link");
    return;
  }

  // Store in localStorage (replace with your backend API call)
  const currentProject = getCurrentProjectId(); // You need to implement this
  const storageKey = `project_${currentProject}_links`;
  const existingLinks = JSON.parse(localStorage.getItem(storageKey) || "[]");
  localStorage.setItem(
    storageKey,
    JSON.stringify([...existingLinks, ...links])
  );

  alert("Links uploaded successfully!");
  closeProjectResourcesLinkModal();
}
// ==================== LINK VIEW MODAL ====================
function openProjectResourcesLinkViewModal() {
  createProjectResourcesModals(); // Create modals if they don't exist

  const linkViewModal = document.getElementById(
    "projectResourcesLinkViewModal"
  );
  if (!linkViewModal) {
    console.error("Link view modal not found!");
    return;
  }

  linkViewModal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Load and display links
  loadProjectResourcesLinks();
}

function closeProjectResourcesLinkViewModal() {
  const linkViewModal = document.getElementById(
    "projectResourcesLinkViewModal"
  );
  if (linkViewModal) {
    linkViewModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function loadProjectResourcesLinks() {
  const list = document.getElementById("projectResourcesUploadedLinksList");
  if (!list) return;

  // Get links from localStorage (replace with your backend API call)
  const currentProject = getCurrentProjectId(); // You need to implement this
  const storageKey = `project_${currentProject}_links`;
  const links = JSON.parse(localStorage.getItem(storageKey) || "[]");

  if (links.length === 0) {
    list.innerHTML =
      '<p style="text-align: center; color: #999; padding: 40px;">No links uploaded yet</p>';
    return;
  }

  list.innerHTML = links
    .map(
      (link, index) => `
    <div class="project-resources-link-item">
      <div class="project-resources-link-wrapper">
      <div class="project-resources-link-icon">
        <img src="../assets/imgaes/link_icon.png" alt="Link" ">
      </div>
      <div class="project-resources-link-details">
      <div>
        <span class="project-resources-link-title">${link.name}</span>
      </div>
      <div>
        <a href="${link.url}" target="_blank" class="project-resources-link-url-view">${link.url}</a>
        </div>
      </div>
      </div>
      <div class="project-resources-link-actions" >
        <div>
        <button class="project-resources-action-btn copy-btn-view" onclick="copyProjectResourcesLink('${link.url}')" title="Copy link">
          <img src="../assets/imgaes/modal_copy_icon.png" alt="Copy" >
        </button>
        </div>
        <div>
        <button class="project-resources-action-btn delete-btn-view" onclick="deleteProjectResourcesLink(${index})" title="Delete">
          <img src="../assets/imgaes/preview_delete_btn.png" alt="Delete">
        </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// ==================== COPY LINK TO CLIPBOARD ====================
function copyProjectResourcesLink(url) {
  // Modern approach using Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showCopySuccessMessage();
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        fallbackCopyToClipboard(url);
      });
  } else {
    // Fallback for older browsers
    fallbackCopyToClipboard(url);
  }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showCopySuccessMessage();
  } catch (err) {
    console.error("Fallback copy failed:", err);
    alert("Failed to copy link. Please copy manually.");
  }

  document.body.removeChild(textArea);
}

// Show success message when link is copied
function showCopySuccessMessage() {
  // Create a temporary toast notification
  const toast = document.createElement("div");
  toast.className = "copy-success-toast";
  toast.textContent = "✓ Link copied to clipboard!";
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10B981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-family: 'Gilroy-SemiBold', sans-serif;
    font-size: 0.9rem;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(toast);

  // Remove after 2 seconds
  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      if (toast.parentNode) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, 2000);
}

// ==================== DELETE LINK ====================
function deleteProjectResourcesLink(index) {
  if (!confirm("Are you sure you want to delete this link?")) return;

  const currentProject = getCurrentProjectId();
  const storageKey = `project_${currentProject}_links`;
  const links = JSON.parse(localStorage.getItem(storageKey) || "[]");
  links.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(links));

  loadProjectResourcesLinks();
}

// Helper function - implement based on your project structure
function getCurrentProjectId() {
  // Return the current project ID
  // Example: return currentProjectData.id;
  return "demo-project"; // Replace with actual logic
}

// ==================== HELPER FUNCTIONS ====================
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// ==================== EXPOSE FUNCTIONS TO WINDOW ====================
// ==================== EXPOSE FUNCTIONS TO WINDOW ====================
if (typeof window !== "undefined") {
  window.initializeProjectPage = initializeProjectPage;
  window.viewProject = viewProject;
  window.deleteProject = deleteProject;
  window.backToProjectsList = backToProjectsList;
  window.switchProjectOverviewTab = switchProjectOverviewTab;
  window.openProjectOverviewEmployeeModal = openProjectOverviewEmployeeModal;
  window.closeProjectOverviewEmployeeModal = closeProjectOverviewEmployeeModal;
  window.switchProjectOverviewEmployeeTab = switchProjectOverviewEmployeeTab;
  window.toggleProjectOverviewEmployeeSelection =
    toggleProjectOverviewEmployeeSelection;
  window.removeProjectOverviewEmployee = removeProjectOverviewEmployee;
  window.saveProjectOverviewEmployeeChanges =
    saveProjectOverviewEmployeeChanges;
  window.openTaskManagementPage = openTaskManagementPage;
  window.addNewTaskCard = addNewTaskCard;
  window.toggleTaskCard = toggleTaskCard;
  window.deleteTaskCard = deleteTaskCard;
  window.saveAllTasks = saveAllTasks;
  window.backToProjectOverview = backToProjectOverview;
  window.calculateTaskDuration = calculateTaskDuration;
  window.updateTaskDuration = updateTaskDuration;
  window.handleTaskSearchInput = handleTaskSearchInput;
  window.clearTaskSearch = clearTaskSearch;

  // RESOURCES FUNCTIONS
  window.openProjectResourcesFileModal = openProjectResourcesFileModal;
  window.closeProjectResourcesFileModal = closeProjectResourcesFileModal;
  window.uploadProjectResourcesFiles = uploadProjectResourcesFiles;
  window.openProjectResourcesFileViewModal = openProjectResourcesFileViewModal;
  window.closeProjectResourcesFileViewModal =
    closeProjectResourcesFileViewModal;
  window.viewProjectResourcesFile = viewProjectResourcesFile;
  window.downloadProjectResourcesFile = downloadProjectResourcesFile;
  window.deleteProjectResourcesFile = deleteProjectResourcesFile;
  window.removeProjectResourcesSelectedFile =
    removeProjectResourcesSelectedFile;
  window.openProjectResourcesLinkModal = openProjectResourcesLinkModal;
  window.closeProjectResourcesLinkModal = closeProjectResourcesLinkModal;
  window.addProjectResourcesLinkRow = addProjectResourcesLinkRow;
  window.removeProjectResourcesLinkRow = removeProjectResourcesLinkRow;
  window.uploadProjectResourcesLinks = uploadProjectResourcesLinks;
  window.openProjectResourcesLinkViewModal = openProjectResourcesLinkViewModal;
  window.closeProjectResourcesLinkViewModal =
    closeProjectResourcesLinkViewModal;
  window.copyProjectResourcesLink = copyProjectResourcesLink;
  window.deleteProjectResourcesLink = deleteProjectResourcesLink;
}
