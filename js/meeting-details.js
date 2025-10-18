function initializeMeetingDetails() {
  console.log("Initializing meeting details...");

  const modal = document.getElementById("meetingModal");
  const viewModal = document.getElementById("meetingViewModal");
  const openBtn = document.querySelector(".meeting-details-add-btn");
  const closeBtn = document.querySelector(".meeting-modal-close");
  const viewCloseBtn = document.querySelector(".meeting-view-modal-close");
  const submitBtn = document.getElementById("meetingSubmitBtn");
  const form = document.getElementById("meetingForm");
  const tableBody = document.getElementById("meeting-detailsTableBody");

  // Check if required elements exist
  if (!modal) {
    console.error("Meeting modal not found!");
    return;
  }

  if (!viewModal) {
    console.error("View modal not found!");
    return;
  }

  if (!openBtn) {
    console.error("Add Meeting button not found!");
    return;
  }

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
    {
      sNo: 4,
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
  let meetingLinks = [""]; // Store links as array

  renderTable();

  if (openBtn) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent body scroll
      editingIndex = -1;
      meetingLinks = [""]; // Reset links
      renderMeetingLinks();
      initializeEmployeeDropdown();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (viewCloseBtn) {
    viewCloseBtn.addEventListener("click", closeViewModal);
  }

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
    document.body.style.overflow = ""; // Restore body scroll
    form.reset();
    editingIndex = -1;
    meetingLinks = [""];
  }

  function closeViewModal() {
    viewModal.classList.remove("active");
    document.body.style.overflow = ""; // Restore body scroll
  }

  // FIXED: Employee Dropdown - Hide selected, keep dropdown stable
  function initializeEmployeeDropdown() {
    const container = document.getElementById("employeeDropdownContainer");
    if (!container) {
      console.error("Employee dropdown container not found!");
      return;
    }

    container.innerHTML = `
      <div class="meeting-employee-dropdown">
        <input 
          type="text" 
          id="employeeSearch" 
          class="meeting-input meeting-search-input" 
          placeholder="Search Employee IDs..."
          readonly
        />
        <div class="meeting-employee-list" id="employeeList"></div>
        <div class="meeting-selected-employees" id="selectedEmployees"></div>
      </div>
    `;

    const searchInput = document.getElementById("employeeSearch");
    const employeeList = document.getElementById("employeeList");
    const selectedEmployeesContainer =
      document.getElementById("selectedEmployees");
    let selectedEmployees = [];

    // Render employee list with hiding selected ones
    function renderEmployeeList(filter = "") {
      const filtered = employeeIds.filter((id) =>
        id.toLowerCase().includes(filter.toLowerCase())
      );

      employeeList.innerHTML = filtered
        .map((id) => {
          const isSelected = selectedEmployees.includes(id);
          return `
        <div class="meeting-employee-item ${
          isSelected ? "hidden" : ""
        }" data-id="${id}">
          <input type="checkbox" id="emp-${id}" ${
            isSelected ? "checked" : ""
          } />
          <label for="emp-${id}">${id}</label>
        </div>
      `;
        })
        .join("");

      // Add click handlers
      document
        .querySelectorAll(".meeting-employee-item input")
        .forEach((cb) => {
          cb.addEventListener("change", function () {
            const empId = this.closest(".meeting-employee-item").dataset.id;
            if (this.checked) {
              if (!selectedEmployees.includes(empId)) {
                selectedEmployees.push(empId);
              }
            } else {
              selectedEmployees = selectedEmployees.filter(
                (id) => id !== empId
              );
            }
            renderSelectedEmployees();
            renderEmployeeList(searchInput.value); // Re-render to hide/show
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

    if (searchInput) {
      // Toggle dropdown on click
      searchInput.addEventListener("click", function () {
        const isActive = employeeList.classList.contains("active");
        if (isActive) {
          employeeList.classList.remove("active");
        } else {
          employeeList.classList.add("active");
          renderEmployeeList(""); // Show all unselected
        }
      });

      // Make input editable for search
      searchInput.removeAttribute("readonly");
      searchInput.addEventListener("input", function () {
        employeeList.classList.add("active");
        renderEmployeeList(this.value);
      });

      // Open dropdown on focus
      searchInput.addEventListener("focus", function () {
        employeeList.classList.add("active");
        renderEmployeeList(this.value);
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!container.contains(e.target)) {
        employeeList.classList.remove("active");
      }
    });

    // Initial render
    renderEmployeeList();
  }

  // FIXED: Meeting Links - Preserve values and add delete buttons
  function renderMeetingLinks() {
    const container = document.getElementById("meetingLinksContainer");
    if (!container) return;

    container.innerHTML = meetingLinks
      .map((link, index) => {
        const isLast = index === meetingLinks.length - 1;
        const showDeleteBtn = meetingLinks.length > 1;

        return `
        <div class="meeting-link-row" data-index="${index}">
          <input 
            type="url" 
            class="meeting-input meeting-link-input" 
            placeholder="https://example.com"
            value="${link}"
            data-index="${index}"
          />
          ${
            isLast
              ? '<button type="button" class="meeting-add-link-btn" data-action="add"><span>+</span></button>'
              : ""
          }
          ${
            showDeleteBtn
              ? '<button type="button" class="meeting-remove-link-btn" data-action="remove" data-index="' +
                index +
                '"><span>−</span></button>'
              : ""
          }
        </div>
      `;
      })
      .join("");

    // Update link values when inputs change
    container.querySelectorAll(".meeting-link-input").forEach((input) => {
      input.addEventListener("input", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        meetingLinks[idx] = this.value;
      });
    });

    // Add link button
    const addBtn = container.querySelector('[data-action="add"]');
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        meetingLinks.push("");
        renderMeetingLinks();
      });
    }

    // Remove link buttons
    container.querySelectorAll('[data-action="remove"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"));
        meetingLinks.splice(idx, 1);
        if (meetingLinks.length === 0) {
          meetingLinks = [""];
        }
        renderMeetingLinks();
      });
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (form.checkValidity()) {
        const formData = new FormData(form);

        const attendeesValue =
          document.getElementById("attendeesHidden")?.value || "";
        const attendees = attendeesValue.split(",").filter((id) => id);

        // Filter out empty links
        const validLinks = meetingLinks.filter((link) => link.trim() !== "");

        const meeting = {
          sNo:
            editingIndex === -1
              ? meetings.length + 1
              : meetings[editingIndex].sNo,
          dateOfMeeting: formData.get("meetingDate"),
          meetingDetails: formData.get("meetingDescription").substring(0, 50),
          fromTime: formData.get("fromTime"),
          toTime: formData.get("toTime"),
          meetingTitle: formData.get("meetingTitle"),
          projectName: "N/A", // Default value since removed from form
          momFile: null,
          attendees: attendees,
          meetingLinks: validLinks,
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

  if (tableBody) {
    tableBody.addEventListener("click", function (e) {
      const viewBtn = e.target.closest(".meeting-view-btn");
      const deleteBtn = e.target.closest(".meeting-delete-btn");
      const uploadBtn = e.target.closest(".meeting-upload-btn");

      if (viewBtn) {
        const index = parseInt(viewBtn.getAttribute("data-index"));
        console.log("View button clicked for index:", index); // Debug log
        openViewModal(index);
      } else if (deleteBtn) {
        const index = parseInt(deleteBtn.getAttribute("data-index"));
        deleteMeeting(index);
      } else if (uploadBtn) {
        const index = parseInt(uploadBtn.getAttribute("data-index"));
        handleFileUpload(index);
      }
    });
  }

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

  function openViewModal(index) {
    console.log("Opening view modal for index:", index);
    console.log("Meeting data:", meetings[index]);

    const meeting = meetings[index];

    // Check if view modal exists
    if (!viewModal) {
      console.error("View modal element not found!");
      alert("Error: View modal not found in the page.");
      return;
    }

    // Populate basic information with error handling
    try {
      const titleEl = document.getElementById("viewMeetingTitle");
      const dateEl = document.getElementById("viewMeetingDate");
      const fromTimeEl = document.getElementById("viewFromTime");
      const toTimeEl = document.getElementById("viewToTime");
      const durationEl = document.getElementById("viewMeetingDuration");
      const modeEl = document.getElementById("viewMeetingMode");
      const projectEl = document.getElementById("viewProjectName");
      const descEl = document.getElementById("viewMeetingDescription");

      if (titleEl) titleEl.value = meeting.meetingTitle || "";
      if (dateEl) dateEl.value = meeting.dateOfMeeting || "";
      if (fromTimeEl) fromTimeEl.value = meeting.fromTime || "";
      if (toTimeEl) toTimeEl.value = meeting.toTime || "";
      if (durationEl)
        durationEl.value = meeting.duration
          ? `${meeting.duration} minutes`
          : "";
      if (modeEl) modeEl.value = meeting.meetingMode || "";
      if (projectEl) projectEl.value = meeting.projectName || "";
      if (descEl) descEl.value = meeting.description || "";

      console.log("Basic fields populated successfully");
    } catch (error) {
      console.error("Error populating basic fields:", error);
    }

    // Populate attendees as badges
    try {
      const attendeesContainer = document.getElementById(
        "viewAttendeesContainer"
      );
      console.log("Attendees container found:", attendeesContainer);
      console.log("Meeting attendees:", meeting.attendees);

      if (attendeesContainer) {
        if (meeting.attendees && meeting.attendees.length > 0) {
          const badgesHTML = meeting.attendees
            .map(
              (emp) => `<span class="meeting-attendee-badge-view">${emp}</span>`
            )
            .join("");

          console.log("Generated badges HTML:", badgesHTML);
          attendeesContainer.innerHTML = badgesHTML;
          console.log("Attendees populated successfully");
        } else {
          attendeesContainer.innerHTML =
            '<span style="color: #999; font-style: italic;">No attendees selected</span>';
          console.log("No attendees to display");
        }
      } else {
        console.error(
          "❌ Attendees container not found! Check your HTML for element with id='viewAttendeesContainer'"
        );
        alert("Error: Attendees container not found in the modal.");
      }
    } catch (error) {
      console.error("Error populating attendees:", error);
    }

    // Populate meeting links as CLICKABLE links
    try {
      const linksContainer = document.getElementById(
        "viewMeetingLinksContainer"
      );
      console.log("Links container found:", linksContainer);
      console.log("Meeting links:", meeting.meetingLinks);

      if (linksContainer) {
        if (meeting.meetingLinks && meeting.meetingLinks.length > 0) {
          const linksHTML = meeting.meetingLinks
            .map(
              (link) => `
            <a 
              href="${link}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="meeting-link-clickable-row"
            >
              <span class="meeting-link-icon">🔗</span>
              <span class="meeting-link-text">${link}</span>
              <span class="meeting-link-external">↗</span>
            </a>
          `
            )
            .join("");

          console.log("Generated links HTML:", linksHTML);
          linksContainer.innerHTML = linksHTML;
          console.log("Links populated successfully");
        } else {
          linksContainer.innerHTML = "";
          console.log("No links to display");
        }
      } else {
        console.error(
          "❌ Links container not found! Check your HTML for element with id='viewMeetingLinksContainer'"
        );
      }
    } catch (error) {
      console.error("Error populating links:", error);
    }

    // Show modal
    console.log("Showing view modal...");
    viewModal.classList.add("active");
    document.body.style.overflow = "hidden";
    console.log("View modal opened successfully!");
  }

  function deleteMeeting(index) {
    if (confirm("Are you sure you want to delete this meeting?")) {
      meetings.splice(index, 1);
      meetings.forEach((m, i) => {
        m.sNo = i + 1;
      });
      renderTable();
    }
  }

  function renderTable() {
    if (!tableBody) return;

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
