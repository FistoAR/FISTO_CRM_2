// ==================== DYNAMIC PAGE LOADING WITH HASH ROUTING ====================
const contentArea = document.getElementById("content-area");
const navItems = document.querySelectorAll(".nav-item");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

// Cache for loaded pages
const pageCache = {};

// Function to load page content dynamically
async function loadPage(pageName) {
  // Update URL hash
  window.location.hash = pageName;

  // Show loading state
  contentArea.innerHTML = '<div class="loading">Loading...</div>';

  try {
    // Check if page is already cached
    if (pageCache[pageName]) {
      contentArea.innerHTML = pageCache[pageName];
      initializePageScripts(pageName);

      // Add fade-in animation
      setTimeout(() => {
        contentArea.style.opacity = "1";
      }, 50);
      return;
    }

    // Fetch the page content
    const response = await fetch(`./pages/${pageName}.html`);

    if (!response.ok) {
      throw new Error("Page not found");
    }

    const html = await response.text();

    // Cache the page
    pageCache[pageName] = html;

    // Insert into content area
    contentArea.innerHTML = html;

    // Initialize any page-specific scripts
    initializePageScripts(pageName);

    // Add fade-in animation
    contentArea.style.opacity = "0";
    setTimeout(() => {
      contentArea.style.opacity = "1";
    }, 50);
  } catch (error) {
    console.error("Error loading page:", error);
    contentArea.innerHTML = `
            <div class="error-message">
                <h3>Error loading page</h3>
                <p>The page "${pageName}" could not be loaded. Please try again.</p>
            </div>
        `;
  }
}

// Function to initialize page-specific functionality
function initializePageScripts(pageName) {
  console.log("Initializing scripts for:", pageName);

  switch (pageName) {
    case "employee-details":
      // Wait for DOM to be ready, then initialize
      setTimeout(() => {
        if (typeof initializeEmployeeDetailsPage === "function") {
          initializeEmployeeDetailsPage();
        }

        if (typeof initializeUpdateEmployeeModal === "function") {
          initializeUpdateEmployeeModal();
        }

        if (typeof renderEmployeeTable === "function") {
          renderEmployeeTable();
        }
      }, 100);
      break;

    case "employee-request":
      // Initialize employee request tabs
      setTimeout(() => {
        if (typeof initializeEmployeeRequestTabs === "function") {
          initializeEmployeeRequestTabs();
        } else {
          console.error("initializeEmployeeRequestTabs function not found!");
        }
      }, 100);
      break;

    case "client":
      setTimeout(() => {
        if (typeof initializeClientDatabaseTabs === "function") {
          initializeClientDatabaseTabs();
        }
        if (typeof initializeCustomerModal === "function") {
          initializeCustomerModal();
        }
        if (typeof initializeFirstLevelFollowup === "function") {
          initializeFirstLevelFollowup();
        }
        if (typeof initializeSecondLevelFollowup === "function") {
          initializeSecondLevelFollowup();
        }
        if (typeof initializeMeetingDetails === "function") {
          initializeMeetingDetails();
        } else {
          console.error("initializeMeetingDetails function not found!");
        }
      }, 100);
      break;

    case "projects":
      setTimeout(() => {
        if (typeof initializeProjectPage === "function") {
          initializeProjectPage();
        } else {
          console.error("initializeProjectPage function not found!");
        }
      }, 100);
      break;
  }
}

// Function to update active nav item
function updateActiveNavItem(pageName) {
  navItems.forEach((nav) => {
    nav.classList.remove("active");
    if (nav.getAttribute("data-page") === pageName) {
      nav.classList.add("active");
    }
  });
}

// Add click event to all nav items
navItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const pageName = this.getAttribute("data-page");
    if (pageName) {
      loadPage(pageName);
    }

    if (window.innerWidth <= 1024 && sidebar.classList.contains("active")) {
      toggleSidebar();
    }
  });
});

// Handle browser back/forward buttons
window.addEventListener("hashchange", function () {
  const hash = window.location.hash.substring(1);
  const pageName = hash || "dashboard";

  loadPage(pageName);
  updateActiveNavItem(pageName);
});

// Logout button functionality
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
    }
  });
}

// Load initial page
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash.substring(1);
  const initialPage = hash || "dashboard";
  loadPage(initialPage);
  updateActiveNavItem(initialPage);
});

// Update current date and time
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const dateString = now.toLocaleDateString("en-US", options);
  const dateElement = document.querySelector(".current-date");
  if (dateElement) {
    dateElement.textContent = dateString;
  }
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Function to toggle sidebar
function toggleSidebar() {
  sidebar.classList.toggle("active");
  hamburgerBtn.classList.toggle("active");
  sidebarOverlay.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Sidebar event listeners
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", toggleSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", toggleSidebar);
}

// Handle window resize
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (window.innerWidth > 1024 && sidebar.classList.contains("active")) {
      toggleSidebar();
    }
  }, 250);
});

// Add smooth transition to content area
contentArea.style.transition = "opacity 0.3s ease";
