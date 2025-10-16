// Meeting Details Functionality
function initializeMeetingDetails() {
  console.log("Initializing meeting details...");

  const modal = document.getElementById("meetingModal");
  const viewModal = document.getElementById("meetingViewModal");
  const openBtn = document.getElementById("openMeetingModal");
  const closeBtn = document.querySelector(".meeting-modal-close");
  const viewCloseBtn = document.querySelector(".meeting-view-modal-close");
  const submitBtn = document.getElementById("meetingSubmitBtn");
  const form = document.getElementById("meetingForm");
  const tableBody = document.getElementById("meeting-detailsTableBody");

  // Check if elements exist
  if (!modal || !openBtn) {
    console.error("Meeting modal or button not found!");
    return;
  }

  // Dummy Employee IDs for dropdown
  const employeeIds = [
    "EMP001",
    "EMP002",
    "EMP003",
    "EMP004",
    "EMP005",
    "EMP101",
    "EMP102",
    "EMP103",
    "EMP104",
    "EMP105",
    "EMP201",
    "EMP202",
    "EMP203",
  ];

  // FAKE DATA - Pre-populated meeting records
  let meetings = [
    {
      sNo: 1,
      dateOfMeeting: "01-09-2025",
      meetingDetails: "Quarterly Review Meeting",
      fromTime: "10:00 AM",
      toTime: "11:00 AM",
      meetingTitle: "Q3 Review",
      projectName: "CRM Development",
      momFile: null,
      attendees: ["EMP001", "EMP002", "EMP003"],
      meetingLinks: ["https://meet.google.com/abc-defg-hij"],
      meetingMode: "Remote",
      description: "Quarterly business review and planning session",
      duration: "60",
    },
    {
      sNo: 2,
      dateOfMeeting: "03-09-2025",
      meetingDetails: "Client Presentation",
      fromTime: "02:00 PM",
      toTime: "03:30 PM",
      meetingTitle: "Demo Session",
      projectName: "E-commerce Platform",
      momFile: null,
      attendees: ["EMP101", "EMP102"],
      meetingLinks: ["https://zoom.us/j/123456789"],
      meetingMode: "Onsite",
      description: "Product demo for new client",
      duration: "90",
    },
    {
      sNo: 3,
      dateOfMeeting: "08-09-2025",
      meetingDetails: "Sprint Planning",
      fromTime: "09:00 AM",
      toTime: "10:30 AM",
      meetingTitle: "Sprint 5 Planning",
      projectName: "Mobile App",
      momFile: null,
      attendees: ["EMP201", "EMP202", "EMP203"],
      meetingLinks: [
        "https://teams.microsoft.com/meeting123",
        "https://backup-link.com",
      ],
      meetingMode: "Remote",
      description: "Planning for upcoming sprint tasks",
      duration: "90",
    },
  ];

  let editingIndex = -1;
  let meetingLinkCount = 1;

  // Initial render
  renderTable();

  // Open Modal
  openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("active");
    editingIndex = -1;
    meetingLinkCount = 1;
    renderMeetingLinks();
    initializeEmployeeDropdown();
  });

  // Close Modals
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (viewCloseBtn) {
    viewCloseBtn.addEventListener("click", closeViewModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (viewModal) {
    viewModal.addEventListener("click", function (e) {
      if (e.target === viewModal) {
        closeViewModal();
      }
    });
  }

  function closeModal() {
    modal.classList.remove("active");
    form.reset();
    editingIndex = -1;
    meetingLinkCount = 1;
  }

  function closeViewModal() {
    viewModal.classList.remove("active");
  }

  // Initialize Employee Dropdown with Search
  function initializeEmployeeDropdown() {
    const container = document.getElementById("employeeDropdownContainer");
    container.innerHTML = `
      <div class="meeting-employee-dropdown">
        <input 
          type="text" 
          id="employeeSearch" 
          class="meeting-input meeting-search-input" 
          placeholder="Search Employee IDs..."
        />
        <div class="meeting-employee-list" id="employeeList"></div>
        <div class="meeting-selected-employees" id="selectedEmployees"></div>
      </div>
    `;

    const searchInput = document.getElementById("employeeSearch");
    const employeeList = document.getElementById("employeeList");
    const selectedEmployeesContainer = document.getElementById(
      "selectedEmployees"
    );
    let selectedEmployees = [];

    // Render employee list
    function renderEmployeeList(filter = "") {
      const filtered = employeeIds.filter((id) =>
        id.toLowerCase().includes(filter.toLowerCase())
      );

      employeeList.innerHTML = filtered
        .map(
          (id) => `
        <div class="meeting-employee-item" data-id="${id}">
          <input type="checkbox" id="emp-${id}" ${
            selectedEmployees.includes(id) ? "checked" : ""
          } />
          <label for="emp-${id}">${id}</label>
        </div>
      `
        )
        .join("");

      // Add click handlers
      document.querySelectorAll(".meeting-employee-item input").forEach((cb) => {
        cb.addEventListener("change", function () {
          const empId = this.closest(".meeting-employee-item").dataset.id;
          if (this.checked) {
            if (!selectedEmployees.includes(empId)) {
              selectedEmployees.push(empId);
            }
          } else {
            selectedEmployees = selectedEmployees.filter((id) => id !== empId);
          }
          renderSelectedEmployees();
        });
      });
    }

    // Render selected employees as badges
    function renderSelectedEmployees() {
      selectedEmployeesContainer.innerHTML = selectedEmployees
        .map(
          (id) => `
        <span class="meeting-employee-badge">
          ${id}
          <button type="button" class="meeting-remove-emp" data-id="${id}">×</button>
        </span>
      `
        )
        .join("");

      // Add remove handlers
      document.querySelectorAll(".meeting-remove-emp").forEach((btn) => {
        btn.addEventListener("click", function () {
          const empId = this.dataset.id;
          selectedEmployees = selectedEmployees.filter((id) => id !== empId);
          renderEmployeeList(searchInput.value);
          renderSelectedEmployees();
        });
      });

      // Store in hidden input
      const hiddenInput = document.getElementById("attendeesHidden");
      if (hiddenInput) {
        hiddenInput.value = selectedEmployees.join(",");
      }
    }

    // Search functionality
    searchInput.addEventListener("input", function () {
      renderEmployeeList(this.value);
    });

    // Show/hide dropdown on focus
    searchInput.addEventListener("focus", function () {
      employeeList.style.display = "block";
    });

    document.addEventListener("click", function (e) {
      if (!container.contains(e.target)) {
        employeeList.style.display = "none";
      }
    });

    // Initial render
    renderEmployeeList();
  }

  // Meeting Links Management
  function renderMeetingLinks() {
    const container = document.getElementById("meetingLinksContainer");
    let linksHTML = "";

    for (let i = 0; i < meetingLinkCount; i++) {
      linksHTML += `
        <div class="meeting-link-row">
          <input 
            type="url" 
            name="meetingLink${i}" 
            class="meeting-input meeting-link-input" 
            placeholder="https://example.com"
          />
          ${
            i === meetingLinkCount - 1
              ? '<button type="button" class="meeting-add-link-btn" id="addLinkBtn"><span>+</span></button>'
              : ""
          }
        </div>
      `;
    }

    container.innerHTML = linksHTML;

    // Add link button handler
    const addLinkBtn = document.getElementById("addLinkBtn");
    if (addLinkBtn) {
      addLinkBtn.addEventListener("click", function () {
        meetingLinkCount++;
        renderMeetingLinks();
      });
    }
  }

  // Submit Form
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (form.checkValidity()) {
        const formData = new FormData(form);

        // Collect meeting links
        const meetingLinks = [];
        for (let i = 0; i < meetingLinkCount; i++) {
          const link = formData.get(`meetingLink${i}`);
          if (link) meetingLinks.push(link);
        }

        // Get selected employees
        const attendees = document
          .getElementById("attendeesHidden")
          .value.split(",")
          .filter((id) => id);

        const meeting = {
          sNo: editingIndex === -1 ? meetings.length + 1 : meetings[editingIndex].sNo,
          dateOfMeeting: formData.get("meetingDate"),
          meetingDetails: formData.get("meetingDescription").substring(0, 50),
          fromTime: formData.get("fromTime"),
          toTime: formData.get("toTime"),
          meetingTitle: formData.get("meetingTitle"),
          projectName: formData.get("projectName") || "N/A",
          momFile: null,
          attendees: attendees,
          meetingLinks: meetingLinks,
          meetingMode: formData.get("meetingMode"),
          description: formData.get("meetingDescription"),
          duration: formData.get("duration"),
        };

        if (editingIndex === -1) {
          meetings.push(meeting);
        } else {
          meetings[editingIndex] = meeting;
        }

        renderTable();
        closeModal();
      } else {
        form.reportValidity();
      }
    });
  }

  // Event delegation for table buttons
  tableBody.addEventListener("click", function (e) {
    const viewBtn = e.target.closest(".meeting-view-btn");
    const deleteBtn = e.target.closest(".meeting-delete-btn");
    const uploadBtn = e.target.closest(".meeting-upload-btn");

    if (viewBtn) {
      const index = parseInt(viewBtn.getAttribute("data-index"));
      openViewModal(index);
    } else if (deleteBtn) {
      const index = parseInt(deleteBtn.getAttribute("data-index"));
      deleteMeeting(index);
    } else if (uploadBtn) {
      const index = parseInt(uploadBtn.getAttribute("data-index"));
      handleFileUpload(index);
    }
  });

  // Handle File Upload
  function handleFileUpload(index) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.onchange = function (e) {
      if (e.target.files.length > 0) {
        meetings[index].momFile = e.target.files[0].name;
        renderTable();
        alert(`File "${e.target.files[0].name}" selected for upload!`);
      }
    };
    fileInput.click();
  }

  // Open View Modal
  function openViewModal(index) {
    const meeting = meetings[index];

    document.getElementById("viewMeetingTitle").textContent =
      meeting.meetingTitle;
    document.getElementById("viewMeetingDate").textContent =
      meeting.dateOfMeeting;
    document.getElementById("viewMeetingTime").textContent =
      `${meeting.fromTime} - ${meeting.toTime}`;
    document.getElementById("viewMeetingDuration").textContent =
      `${meeting.duration} minutes`;
    document.getElementById("viewProjectName").textContent =
      meeting.projectName;
    document.getElementById("viewMeetingMode").textContent = meeting.meetingMode;
    document.getElementById("viewAttendees").textContent =
      meeting.attendees.join(", ");
    document.getElementById("viewMeetingDescription").textContent =
      meeting.description;

    // Meeting links
    const linksContainer = document.getElementById("viewMeetingLinks");
    linksContainer.innerHTML = meeting.meetingLinks
      .map(
        (link) =>
          `<a href="${link}" target="_blank" class="meeting-link-badge">${link}</a>`
      )
      .join("");

    viewModal.classList.add("active");
  }

  // Delete Meeting
  function deleteMeeting(index) {
    if (confirm("Are you sure you want to delete this meeting?")) {
      meetings.splice(index, 1);
      // Re-number S.No
      meetings.forEach((m, i) => {
        m.sNo = i + 1;
      });
      renderTable();
    }
  }

  // Render Table
  function renderTable() {
    if (meetings.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 40px; color: #999">
            No meetings scheduled yet. Click "Add Meeting" to get started.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = meetings
      .map(
        (meeting, index) => `
        <tr>
          <td>${meeting.sNo}</td>
          <td>${meeting.dateOfMeeting}</td>
          <td>${meeting.meetingDetails}</td>
          <td>${meeting.fromTime}</td>
          <td>${meeting.toTime}</td>
          <td>${meeting.meetingTitle}</td>
          <td>${meeting.projectName}</td>
          <td>
            <button class="meeting-upload-btn" data-index="${index}">
              <span>+</span> Add
            </button>
          </td>
          <td>
            <button class="meeting-view-btn" data-index="${index}">
              <img src="../assets/imgaes/table_eye.png" alt="View" />
            </button>
          </td>
          <td>
            <button class="meeting-delete-btn" data-index="${index}">
              <img src="../assets/imgaes/preview_delete_btn.png" alt="Delete" />
            </button>
          </td>
        </tr>
      `
      )
      .join("");
  }

  console.log("Meeting details initialized successfully!");
}
