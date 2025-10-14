// Get all navigation items
const navItems = document.querySelectorAll('.nav-item');
const contentArea = document.getElementById('content-area');
// Hamburger Menu and Sidebar Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay')

// Function to show selected page
function showPage(pageName) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        
        // Add fade-in animation
        selectedPage.style.opacity = '0';
        setTimeout(() => {
            selectedPage.style.opacity = '1';
        }, 50);
    }
}

// Add click event to all nav items
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get page name and show page
        const pageName = this.getAttribute('data-page');
        if (pageName) {
            showPage(pageName);
        }
    });
});

// Logout button functionality
const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(confirm('Are you sure you want to logout?')) {
        // Redirect to login page or handle logout
        alert('Logged out successfully!');
        // window.location.href = 'login.html';
    }
});

// Load initial content
showPage('employee-details');

// Update current date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const dateString = now.toLocaleDateString('en-US', options);
    document.querySelector('.current-date').textContent = dateString;
}

// Update time every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Add smooth transition to page content
document.querySelectorAll('.page-content').forEach(page => {
    page.style.transition = 'opacity 0.3s ease';
});

// Form submission handler
const employeeForm = document.getElementById('employee-form');
if (employeeForm) {
    employeeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Employee details saved successfully!');
        // Add your form submission logic here
    });
}


// Function to toggle sidebar
function toggleSidebar() {
  sidebar.classList.toggle('active');
  hamburgerBtn.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
  
  // Prevent body scroll when sidebar is open
  if (sidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Open/Close sidebar on hamburger click
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', toggleSidebar);
}

// Close sidebar when clicking overlay
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', toggleSidebar);
}

// Close sidebar when clicking any nav item on mobile
const mobileNavItems = document.querySelectorAll('.nav-item');
mobileNavItems.forEach(item => {
  item.addEventListener('click', function() {
    if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
      toggleSidebar();
    }
  });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
      toggleSidebar();
    }
  }, 250);
});
