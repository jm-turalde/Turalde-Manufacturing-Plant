// DOM Elements
const pages = {
    landing: document.getElementById('landingPage'),
    login: document.getElementById('loginPage'),
    signup: document.getElementById('signupPage'),
    dashboard: document.getElementById('dashboardPage'),
    learnMore: document.getElementById('learnMorePage') // Added this line
};

const navLinks = {
    login: document.getElementById('loginLink'),
    signup: document.getElementById('signupLink'),
    dashboard: document.getElementById('dashboardLink'),
    logout: document.getElementById('logoutLink')
};

const buttons = {
    getStarted: document.getElementById('getStartedBtn'),
    learnMore: document.getElementById('learnMoreBtn'),
    switchToSignup: document.getElementById('switchToSignup'),
    switchToLogin: document.getElementById('switchToLogin'),
    forgotPassword: document.getElementById('forgotPassword')
};

const forms = {
    login: document.getElementById('loginForm'),
    signup: document.getElementById('signupForm')
};

// Initialize
let currentUser = null;

// Page Navigation Functions
function showPage(pageId) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        if (page) {
            page.classList.remove('active');
        }
    });
    
    // Show requested page
    if (pages[pageId]) {
        pages[pageId].classList.add('active');
    }
    
    // Update navigation based on authentication
    updateNavigation();
}

function updateNavigation() {
    if (currentUser) {
        // User is logged in
        navLinks.login.style.display = 'none';
        navLinks.signup.style.display = 'none';
        navLinks.dashboard.style.display = 'block';
        navLinks.logout.style.display = 'block';
    } else {
        // User is not logged in
        navLinks.login.style.display = 'block';
        navLinks.signup.style.display = 'block';
        navLinks.dashboard.style.display = 'none';
        navLinks.logout.style.display = 'none';
    }
}

// Authentication Functions
function loginUser(email, password) {
    // Simulate authentication - In a real app, this would connect to a backend
    const users = JSON.parse(localStorage.getItem('mfgUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            department: user.department
        };
        
        // Update dashboard with user info
        document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('userDepartment').textContent = user.department;
        
        // Show dashboard
        showPage('dashboard');
        
        return true;
    }
    
    return false;
}

function registerUser(userData) {
    const users = JSON.parse(localStorage.getItem('mfgUsers') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Add new user
    users.push(userData);
    localStorage.setItem('mfgUsers', JSON.stringify(users));
    
    return { success: true, message: 'Registration successful' };
}

function logoutUser() {
    currentUser = null;
    showPage('landing');
}

// System Access Functions
function accessSystem(system) {
    
    // Simulate system-specific features
    const features = {
        plms: ['Production Scheduling', 'Machine Monitoring', 'Downtime Analysis', 'Maintenance Requests'],
        rmis: ['Supplier Management', 'Inventory Tracking', 'Purchase Orders', 'Material Issuance'],
        qcs: ['Quality Inspection', 'Defect Reporting', 'Compliance Docs', 'Test Results']
    };
    
    const systemNames = {
        plms: 'Production Line Monitoring System',
        rmis: 'Raw Material Inventory System',
        qcs: 'Quality Control System'
    };
    
    const featureList = features[system].map(f => `• ${f}`).join('\n');
    
    alert(`${systemNames[system]}\n\nAvailable Features:\n${featureList}`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with landing page
    showPage('landing');
    
    // Navigation Links
    navLinks.login.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('login');
    });
    
    navLinks.signup.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('signup');
    });
    
    navLinks.dashboard.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentUser) {
            showPage('dashboard');
        } else {
            showPage('login');
        }
    });
    
    navLinks.logout.addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
    });
    
    // Landing Page Buttons
    buttons.getStarted.addEventListener('click', function() {
        showPage('login');
    });
    
    // Updated Learn More button - shows the learn more page instead of alert
    buttons.learnMore.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('learnMore');
    });
    
    // Auth Page Switchers
    buttons.switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('signup');
    });
    
    buttons.switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('login');
    });
    
    buttons.forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Enter your email address to reset password:');
        if (email) {
            alert(`Password reset instructions have been sent to ${email}`);
        }
    });
    
    // Form Submissions
    forms.login.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (loginUser(email, password)) {
            alert('Login successful!');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
    
    forms.signup.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('signupEmail').value,
            password: document.getElementById('signupPassword').value,
            department: document.getElementById('department').value
        };
        
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (userData.password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        const result = registerUser(userData);
        
        if (result.success) {
            alert('Registration successful! You can now login.');
            showPage('login');
        } else {
            alert(result.message);
        }
    });
    
    // Demo user for testing
    if (!localStorage.getItem('mfgUsers')) {
        const demoUsers = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'demo@mfg.com',
                password: 'demo123',
                department: 'production'
            }
        ];
        localStorage.setItem('mfgUsers', JSON.stringify(demoUsers));
    }
    
    // Update dashboard stats (simulated data)
    function updateDashboardStats() {
        // Simulate dynamic data
        document.getElementById('plmsMachines').textContent = Math.floor(Math.random() * 10) + 20;
        document.getElementById('plmsOutput').textContent = (Math.random() * 10 + 85).toFixed(0) + '%';
        document.getElementById('rmisStock').textContent = (Math.random() * 15 + 80).toFixed(0) + '%';
        document.getElementById('rmisSuppliers').textContent = Math.floor(Math.random() * 5) + 15;
        document.getElementById('qcsPassRate').textContent = (Math.random() * 1.5 + 97).toFixed(1) + '%';
        document.getElementById('qcsInspections').textContent = Math.floor(Math.random() * 50) + 130;
    }
    
    // Update stats every 30 seconds
    updateDashboardStats();
    setInterval(updateDashboardStats, 30000);
    
    // Add event listeners for Learn More page buttons
    const backToHomeBtn = document.getElementById('backToHome');
    const getStartedFromLearnBtn = document.getElementById('getStartedFromLearn');
    const contactUsFromLearnBtn = document.getElementById('contactUsFromLearn');
    
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('landing');
        });
    }
    
    if (getStartedFromLearnBtn) {
        getStartedFromLearnBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('signup');
        });
    }
    
    if (contactUsFromLearnBtn) {
        contactUsFromLearnBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Contact Information:\n\nEmail: justineturalde@gmail.com\nPhone: +63 908 762 5105\nAddress: Palmeda Bldg. Naga City, Camarines Sur, Philippines\n\nOur team will contact you within 24 hours.');
        });
    }
});