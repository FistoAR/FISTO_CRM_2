// Tab switching functionality
const empRequestTabButtons = document.querySelectorAll('.employee-request-tab-button');
const empRequestFormSections = document.querySelectorAll('.employee-request-form-section');

empRequestTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        empRequestTabButtons.forEach(btn => btn.classList.remove('employee-request-active'));
        empRequestFormSections.forEach(section => section.classList.remove('employee-request-active'));

        // Add active class to clicked button and corresponding section
        button.classList.add('employee-request-active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('employee-request-active');
    });
});

// Calculate permission duration
const permissionSection = document.getElementById('request-permission');
const fromTimeInput = permissionSection.querySelector('.employee-request-from-time');
const toTimeInput = permissionSection.querySelector('.employee-request-to-time');
const durationInput = permissionSection.querySelector('.employee-request-duration');

function calculateEmpRequestDuration() {
    if (fromTimeInput.value && toTimeInput.value) {
        const from = fromTimeInput.value.split(':');
        const to = toTimeInput.value.split(':');
        
        const fromMinutes = parseInt(from[0]) * 60 + parseInt(from[1]);
        const toMinutes = parseInt(to[0]) * 60 + parseInt(to[1]);
        
        const diffMinutes = toMinutes - fromMinutes;
        
        if (diffMinutes > 0) {
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;
            durationInput.value = `${hours}h ${minutes}m`;
        } else {
            durationInput.value = '';
        }
    }
}

fromTimeInput.addEventListener('change', calculateEmpRequestDuration);
toTimeInput.addEventListener('change', calculateEmpRequestDuration);

// Form submission handlers with success alerts
const applyLeaveForm = document.getElementById('apply-leave-form');
const requestPermissionForm = document.getElementById('request-permission-form');
const scheduleMeetingForm = document.getElementById('schedule-meeting-form');

applyLeaveForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Leave application submitted successfully!');
    this.reset();
});

requestPermissionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Permission request submitted successfully!');
    this.reset();
    durationInput.value = ''; // Clear duration
});

scheduleMeetingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Meeting scheduled successfully!');
    this.reset();
});
