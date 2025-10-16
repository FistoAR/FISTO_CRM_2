// Second Level Follow-up Functionality
function initializeSecondLevelFollowup() {
  console.log("Initializing second level follow-up...");

  const modal = document.getElementById("secondLevelModal");
  const viewModal = document.getElementById("secondLevelViewModal");
  const closeBtn = document.querySelector(".second-level-modal-close");
  const viewCloseBtn = document.querySelector(".second-level-view-modal-close");
  const saveBtn = document.getElementById("secondLevelSaveBtn");
  const form = document.getElementById("secondLevelForm");
  const tableBody = document.getElementById("second-levelTableBody");

  // Check if modal exists
  if (!modal) {
    console.error("Second level modal not found!");
    return;
  }

  // FAKE DATA - Pre-populated second level follow-up records
  let secondLevelCustomers = [
    {
      status: "Lead",
      remarks: "Very interested in premium package",
      updateDate: "2025-10-14",
      nextFollowupDate: "2025-10-22",
      customerId: "CUST007",
      initiatedDate: "2025-10-12",
      companyName: "AutoParts India",
      customerName: "Suresh Iyer",
      fullCustomerData: {
        date: "2025-10-14",
        customerId: "CUST007",
        companyName: "AutoParts India",
        customerName: "Suresh Iyer",
        industryType: "Automotive",
        website: "www.autopartsindia.com",
        address: "34, Industrial Estate, Coimbatore - 641014",
        reference: "Cold Call",
        remarks: "Dealer management system",
        contactPerson: "Suresh Iyer",
        phoneNumber: "+91 96543 21098",
        mailId: "suresh@autopartsindia.com",
        designation: "Sales Director",
      },
    },
    {
      status: "Quotation",
      remarks: "Sent detailed quotation, awaiting approval",
      updateDate: "2025-10-15",
      nextFollowupDate: "2025-10-25",
      customerId: "CUST008",
      initiatedDate: "2025-10-15",
      companyName: "FinTech Innovations",
      customerName: "Kavita Menon",
      fullCustomerData: {
        date: "2025-10-15",
        customerId: "CUST008",
        companyName: "FinTech Innovations",
        customerName: "Kavita Menon",
        industryType: "Financial Services",
        website: "www.fintech-inn.com",
        address: "101, Business Park, Gurgaon - 122002",
        reference: "Conference",
        remarks: "Custom financial analytics dashboard",
        contactPerson: "Kavita Menon",
        phoneNumber: "+91 98765 12345",
        mailId: "kavita@fintech-inn.com",
        designation: "VP Technology",
      },
    },
    {
      status: "In Progress",
      remarks: "Demo scheduled for next week",
      updateDate: "2025-10-13",
      nextFollowupDate: "2025-10-20",
      customerId: "CUST009",
      initiatedDate: "2025-10-11",
      companyName: "Smart Logistics Ltd",
      customerName: "Amit Verma",
      fullCustomerData: {
        date: "2025-10-11",
        customerId: "CUST009",
        companyName: "Smart Logistics Ltd",
        customerName: "Amit Verma",
        industryType: "Logistics",
        website: "www.smartlogistics.in",
        address: "67, Transport Nagar, Delhi - 110009",
        reference: "Website Inquiry",
        remarks: "Fleet management solution needed",
        contactPerson: "Amit Verma",
        phoneNumber: "+91 99234 56789",
        mailId: "amit@smartlogistics.in",
        designation: "Operations Head",
      },
    },
    {
      status: "None",
      remarks: "",
      updateDate: "",
      nextFollowupDate: "",
      customerId: "CUST010",
      initiatedDate: "2025-10-16",
      companyName: "Fashion Trends Pvt Ltd",
      customerName: "Sneha Kapoor",
      fullCustomerData: {
        date: "2025-10-16",
        customerId: "CUST010",
        companyName: "Fashion Trends Pvt Ltd",
        customerName: "Sneha Kapoor",
        industryType: "Fashion & Retail",
        website: "www.fashiontrends.in",
        address: "45, Fashion Street, Mumbai - 400001",
        reference: "Instagram",
        remarks: "E-commerce platform integration",
        contactPerson: "Sneha Kapoor",
        phoneNumber: "+91 98765 43219",
        mailId: "sneha@fashiontrends.in",
        designation: "Founder",
      },
    },
    {
      status: "Drop",
      remarks: "Budget constraints, follow up after 6 months",
      updateDate: "2025-10-12",
      nextFollowupDate: "2026-04-12",
      customerId: "CUST011",
      initiatedDate: "2025-10-08",
      companyName: "Green Energy Solutions",
      customerName: "Rohan Mehta",
      fullCustomerData: {
        date: "2025-10-08",
        customerId: "CUST011",
        companyName: "Green Energy Solutions",
        customerName: "Rohan Mehta",
        industryType: "Renewable Energy",
        website: "www.greenenergy.co.in",
        address: "89, Solar Park, Ahmedabad - 380015",
        reference: "Trade Fair",
        remarks: "Project management software",
        contactPerson: "Rohan Mehta",
        phoneNumber: "+91 97123 98765",
        mailId: "rohan@greenenergy.co.in",
        designation: "Project Manager",
      },
    },
  ];

  let editingIndex = -1;

  // Initial render
  renderTable();

  // Listen for records moved from first level
  window.addEventListener("moveToSecondLevel", function (e) {
    const record = e.detail;
    // Reset status to None when moving to second level
    record.status = "None";
    secondLevelCustomers.push(record);
    renderTable();
  });

  // Close Edit Modal
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close View Modal
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

    // Reset dropdown to original value if user canceled
    if (editingIndex !== -1) {
      renderTable(); // Re-render to reset dropdown to original status
    }

    editingIndex = -1;
  }

  function closeViewModal() {
    viewModal.classList.remove("active");
  }

  // Save Button
  // Save Button
  if (saveBtn) {
    saveBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (form.checkValidity() && editingIndex !== -1) {
        const formData = new FormData(form);
        const remarks = formData.get("remarksSecond");
        const nextFollowupDate = formData.get("nextFollowupDateSecond");

        // Get the status from the hidden field
        const statusField = document.querySelector(
          '[name="statusHiddenSecond"]'
        );
        const status = statusField
          ? statusField.value
          : secondLevelCustomers[editingIndex].status;

        // Update the record
        secondLevelCustomers[editingIndex].status = status;
        secondLevelCustomers[editingIndex].remarks = remarks;
        secondLevelCustomers[editingIndex].nextFollowupDate = nextFollowupDate;
        secondLevelCustomers[editingIndex].updateDate = new Date()
          .toISOString()
          .split("T")[0];

        // IMPORTANT: Re-render the table to show updated data
        renderTable();
        closeModal();

        // Optional: Show success message
        console.log("2nd level follow-up updated successfully!");
      } else {
        form.reportValidity();
      }
    });
  }

  // Event delegation for view button
  tableBody.addEventListener("click", function (e) {
    const viewBtn = e.target.closest(".second-level-view-btn");

    if (viewBtn) {
      const index = parseInt(viewBtn.getAttribute("data-index"));
      openViewModal(index);
    }
  });

  // Handle status dropdown change
  tableBody.addEventListener("change", function (e) {
    if (e.target.classList.contains("second-level-status-select")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      const selectedStatus = e.target.value;

      if (selectedStatus !== "None") {
        openEditModal(index, selectedStatus);
      }
    }
  });

  // Open Edit Modal Function (when status dropdown changes)
  function openEditModal(index, selectedStatus) {
    editingIndex = index;
    const record = secondLevelCustomers[index];

    // Populate form
    document.querySelector('[name="companyNameDisplaySecond"]').value =
      record.companyName;
    document.querySelector('[name="customerNameDisplaySecond"]').value =
      record.customerName;
    document.querySelector('[name="statusHiddenSecond"]').value =
      selectedStatus;
    document.querySelector('[name="remarksSecond"]').value = record.remarks;
    document.querySelector('[name="nextFollowupDateSecond"]').value =
      record.nextFollowupDate;

    // Update modal title with status
    document.querySelector(
      ".second-level-modal-header h2"
    ).textContent = `Update 2nd Level Status - ${selectedStatus}`;

    modal.classList.add("active");
  }

  // Open View Modal Function (when view button is clicked)
  function openViewModal(index) {
    const record = secondLevelCustomers[index];
    const customerData = record.fullCustomerData;

    // Populate Customer Database Information
    document.getElementById("viewDbDateSecond").textContent =
      customerData.date || "-";
    document.getElementById("viewDbCustomerIdSecond").textContent =
      customerData.customerId || "-";
    document.getElementById("viewDbCompanyNameSecond").textContent =
      customerData.companyName || "-";
    document.getElementById("viewDbCustomerNameSecond").textContent =
      customerData.customerName || "-";
    document.getElementById("viewDbIndustryTypeSecond").textContent =
      customerData.industryType || "-";
    document.getElementById("viewDbWebsiteSecond").textContent =
      customerData.website || "-";
    document.getElementById("viewDbAddressSecond").textContent =
      customerData.address || "-";
    document.getElementById("viewDbReferenceSecond").textContent =
      customerData.reference || "-";
    document.getElementById("viewDbRemarksSecond").textContent =
      customerData.remarks || "-";

    // Populate Contact Details
    document.getElementById("viewDbContactPersonSecond").textContent =
      customerData.contactPerson || "-";
    document.getElementById("viewDbPhoneNumberSecond").textContent =
      customerData.phoneNumber || "-";
    document.getElementById("viewDbMailIdSecond").textContent =
      customerData.mailId || "-";
    document.getElementById("viewDbDesignationSecond").textContent =
      customerData.designation || "-";

    // Populate 2nd Level Follow-up Information
    const statusSpan = document.getElementById("viewFollowupStatusSecond");
    statusSpan.textContent = record.status;
    statusSpan.className = "status-badge-view-second";

    // Add status-specific class
    const statusClass = record.status.toLowerCase().replace(/[^a-z]/g, "");
    if (statusClass !== "none") {
      statusSpan.classList.add(`status-second-${statusClass}`);
    }

    document.getElementById("viewFollowupInitiatedDateSecond").textContent =
      record.initiatedDate || "-";
    document.getElementById("viewFollowupUpdateDateSecond").textContent =
      record.updateDate || "-";
    document.getElementById("viewFollowupNextDateSecond").textContent =
      record.nextFollowupDate || "-";
    document.getElementById("viewFollowupRemarksSecond").textContent =
      record.remarks || "No remarks yet";

    viewModal.classList.add("active");
  }

  // Render Table
  function renderTable() {
    if (secondLevelCustomers.length === 0) {
      tableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 40px; color: #999">
                        No customer's data available
                    </td>
                </tr>
            `;
      return;
    }

    tableBody.innerHTML = secondLevelCustomers
      .map((record, index) => {
        return `
                <tr>
                    <td>
                        <select class="second-level-status-select" data-index="${index}">
                            <option value="None" ${
                              record.status === "None" ? "selected" : ""
                            }>None</option>
                            <option value="Lead" ${
                              record.status === "Lead" ? "selected" : ""
                            }>Lead</option>
                            <option value="Drop" ${
                              record.status === "Drop" ? "selected" : ""
                            }>Drop</option>
                            <option value="Quotation" ${
                              record.status === "Quotation" ? "selected" : ""
                            }>Quotation</option>
                            <option value="In Progress" ${
                              record.status === "In Progress" ? "selected" : ""
                            }>In Progress</option>
                            <option value="Not Interest" ${
                              record.status === "Not Interest" ? "selected" : ""
                            }>Not Interest</option>
                        </select>
                    </td>
                    <td>${record.remarks || "-"}</td>
                    <td>${record.updateDate || "-"}</td>
                    <td>${record.nextFollowupDate || "-"}</td>
                    <td>${record.customerId}</td>
                    <td>${record.initiatedDate}</td>
                    <td>${record.companyName}</td>
                    <td>${record.customerName}</td>
                    <td>
                        <button class="second-level-view-btn" data-index="${index}">
                            <img src="../assets/imgaes/table_eye.png" alt="View" />
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");
  }

  console.log("Second level follow-up initialized successfully!");
}
