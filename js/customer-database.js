// Customer Modal Functionality
function initializeCustomerModal() {
    console.log('Initializing customer modal...');
    
    const modal = document.getElementById('customerModal');
    const openBtn = document.getElementById('openCustomerModal');
    const closeBtn = document.querySelector('.customer-modal-close');
    const submitBtn = document.getElementById('customerSubmitBtn');
    const clearBtn = document.getElementById('customerClearBtn');
    const form = document.getElementById('customerForm');
    const tableBody = document.getElementById('customer-databaseTableBody');
    
    // Check if elements exist
    if (!modal || !openBtn) {
        console.error('Modal or button not found!');
        return;
    }
    
    // FAKE DATA - Pre-populated customer records
    let customers = [
        {
            date: '2025-10-01',
            customerId: 'CUST001',
            companyName: 'TechVision Solutions',
            customerName: 'Rajesh Kumar',
            industryType: 'IT Services',
            website: 'www.techvision.com',
            address: '123, Anna Salai, Chennai - 600002',
            reference: 'LinkedIn',
            remarks: 'Interested in CRM implementation',
            contactPerson: 'Rajesh Kumar',
            phoneNumber: '+91 98765 43210',
            mailId: 'rajesh@techvision.com',
            designation: 'CTO'
        },
        {
            date: '2025-10-03',
            customerId: 'CUST002',
            companyName: 'Global Retail Corp',
            customerName: 'Priya Sharma',
            industryType: 'Retail',
            website: 'www.globalretail.in',
            address: '45, MG Road, Bangalore - 560001',
            reference: 'Trade Show',
            remarks: 'Looking for inventory management system',
            contactPerson: 'Priya Sharma',
            phoneNumber: '+91 98123 45678',
            mailId: 'priya.sharma@globalretail.in',
            designation: 'Operations Manager'
        },
        {
            date: '2025-10-05',
            customerId: 'CUST003',
            companyName: 'Sunrise Manufacturing',
            customerName: 'Arun Patel',
            industryType: 'Manufacturing',
            website: 'www.sunrisemfg.com',
            address: '78, Industrial Area, Pune - 411019',
            reference: 'Email Campaign',
            remarks: 'Needs production tracking software',
            contactPerson: 'Arun Patel',
            phoneNumber: '+91 97654 32109',
            mailId: 'arun.patel@sunrisemfg.com',
            designation: 'Plant Manager'
        },
        {
            date: '2025-10-08',
            customerId: 'CUST004',
            companyName: 'HealthCare Plus',
            customerName: 'Dr. Meena Reddy',
            industryType: 'Healthcare',
            website: 'www.healthcareplus.in',
            address: '12, Hospital Road, Hyderabad - 500003',
            reference: 'Referral',
            remarks: 'Patient management system required',
            contactPerson: 'Dr. Meena Reddy',
            phoneNumber: '+91 99887 76655',
            mailId: 'meena@healthcareplus.in',
            designation: 'Director'
        },
        {
            date: '2025-10-10',
            customerId: 'CUST005',
            companyName: 'EduTech Academy',
            customerName: 'Vikram Singh',
            industryType: 'Education',
            website: 'www.edutech.academy',
            address: '56, College Street, Kolkata - 700073',
            reference: 'Google Search',
            remarks: 'Online course management platform',
            contactPerson: 'Vikram Singh',
            phoneNumber: '+91 98456 78901',
            mailId: 'vikram@edutech.academy',
            designation: 'Founder & CEO'
        },
        {
            date: '2025-10-12',
            customerId: 'CUST006',
            companyName: 'FoodHub Logistics',
            customerName: 'Anita Desai',
            industryType: 'Food & Beverage',
            website: 'www.foodhub.co.in',
            address: '89, Service Road, Mumbai - 400051',
            reference: 'Partner Introduction',
            remarks: 'Supply chain management solution needed',
            contactPerson: 'Anita Desai',
            phoneNumber: '+91 97123 45678',
            mailId: 'anita@foodhub.co.in',
            designation: 'Supply Chain Head'
        },
        {
            date: '2025-10-14',
            customerId: 'CUST007',
            companyName: 'AutoParts India',
            customerName: 'Suresh Iyer',
            industryType: 'Automotive',
            website: 'www.autopartsindia.com',
            address: '34, Industrial Estate, Coimbatore - 641014',
            reference: 'Cold Call',
            remarks: 'Dealer management system',
            contactPerson: 'Suresh Iyer',
            phoneNumber: '+91 96543 21098',
            mailId: 'suresh@autopartsindia.com',
            designation: 'Sales Director'
        },
        {
            date: '2025-10-15',
            customerId: 'CUST008',
            companyName: 'FinTech Innovations',
            customerName: 'Kavita Menon',
            industryType: 'Financial Services',
            website: 'www.fintech-inn.com',
            address: '101, Business Park, Gurgaon - 122002',
            reference: 'Conference',
            remarks: 'Custom financial analytics dashboard',
            contactPerson: 'Kavita Menon',
            phoneNumber: '+91 98765 12345',
            mailId: 'kavita@fintech-inn.com',
            designation: 'VP Technology'
        }
    ];
    
    let editingIndex = -1;

    // Initial render on page load
    renderTable();

    // Open Modal for Adding
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Open button clicked');
        modal.classList.add('active');
        document.getElementById('customerModalTitle').textContent = 'Add New Client';
        submitBtn.textContent = 'Submit';
        editingIndex = -1;
        form.reset();
    });

    // Close Modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        form.reset();
        editingIndex = -1;
    }

    // Clear Form (if button exists)
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            form.reset();
        });
    }

    // Submit Form
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const customer = {
                date: formData.get('date'),
                customerId: formData.get('customerId'),
                companyName: formData.get('companyName'),
                customerName: formData.get('customerName'),
                industryType: formData.get('industryType'),
                website: formData.get('website'),
                address: formData.get('address'),
                reference: formData.get('reference'),
                remarks: formData.get('remarks'),
                contactPerson: formData.get('contactPerson'),
                phoneNumber: formData.get('phoneNumber'),
                mailId: formData.get('mailId'),
                designation: formData.get('designation')
            };

            if (editingIndex === -1) {
                customers.push(customer);
            } else {
                customers[editingIndex] = customer;
            }

            renderTable();
            closeModal();
        } else {
            form.reportValidity();
        }
    });

    // Event delegation for dynamically created buttons
    tableBody.addEventListener('click', function(e) {
        // Check if click was on view/edit button or its icon
        const viewBtn = e.target.closest('.customer-table-view-btn');
        const deleteBtn = e.target.closest('.customer-table-delete-btn');
        
        if (viewBtn) {
            const index = parseInt(viewBtn.getAttribute('data-index'));
            editCustomer(index);
        } else if (deleteBtn) {
            const index = parseInt(deleteBtn.getAttribute('data-index'));
            deleteCustomer(index);
        }
    });

    // Render Table
    function renderTable() {
        if (customers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #999">
                        No customers added yet. Click "Add Customer" to get started.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = customers.map((customer, index) => {
            return `
                <tr>
                    <td>${customer.date}</td>
                    <td>${customer.customerId}</td>
                    <td>${customer.companyName}</td>
                    <td>${customer.customerName}</td>
                    <td>${customer.website}</td>
                    <td>${customer.reference}</td>
                    <td>
                        <button class="customer-table-view-btn" data-index="${index}">
                            <img src="../assets/imgaes/table_eye.png" alt="View" />
                        </button>
                    </td>
                    <td>
                        <button class="customer-table-delete-btn" data-index="${index}">
                            <img src="../assets/imgaes/preview_delete_btn.png" alt="Delete" />
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Edit Customer Function
    function editCustomer(index) {
        editingIndex = index;
        const customer = customers[index];
        
        document.querySelector('[name="date"]').value = customer.date;
        document.querySelector('[name="customerId"]').value = customer.customerId;
        document.querySelector('[name="companyName"]').value = customer.companyName;
        document.querySelector('[name="customerName"]').value = customer.customerName;
        document.querySelector('[name="industryType"]').value = customer.industryType;
        document.querySelector('[name="website"]').value = customer.website;
        document.querySelector('[name="address"]').value = customer.address;
        document.querySelector('[name="reference"]').value = customer.reference;
        document.querySelector('[name="remarks"]').value = customer.remarks;
        document.querySelector('[name="contactPerson"]').value = customer.contactPerson;
        document.querySelector('[name="phoneNumber"]').value = customer.phoneNumber;
        document.querySelector('[name="mailId"]').value = customer.mailId;
        document.querySelector('[name="designation"]').value = customer.designation;
        
        document.getElementById('customerModalTitle').textContent = 'Edit Client';
        submitBtn.textContent = 'Save Changes';
        modal.classList.add('active');
    }

    // Delete Customer Function
    function deleteCustomer(index) {
        if (confirm('Are you sure you want to delete this customer?')) {
            customers.splice(index, 1);
            renderTable();
        }
    }

    // Expose customer data globally for first level
window.customerData = customers;

// Trigger event when customers change
function notifyCustomerDataChange() {
    window.customerData = customers;
    window.dispatchEvent(new Event('customerDataUpdated'));
}

// Call notifyCustomerDataChange() after renderTable()
const originalRenderTable = renderTable;
renderTable = function() {
    originalRenderTable();
    notifyCustomerDataChange();
};

    
    console.log('Customer modal initialized successfully!');
}
