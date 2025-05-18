// demo.js - Specialist Demo Account Functionality
class DemoSystem {
  constructor() {
    this.currentRole = null;
    this.demoAccounts = {
      admin: {
        email: 'admin@demo.wehealty',
        password: 'DemoAdmin123',
        permissions: ['all'],
        features: ['dashboard', 'analytics', 'user-management']
      },
      doctor: {
        email: 'doctor@demo.wehealty',
        password: 'DemoDoctor123',
        permissions: ['patients', 'records', 'consultations'],
        features: ['patient-list', 'e-prescription']
      },
      patient: {
        email: 'patient@demo.wehealty',
        password: 'DemoPatient123',
        permissions: ['health-tools', 'appointments'],
        features: ['bmi-calculator', 'appointment-booking']
      }
    };
    
    this.init();
  }

  init() {
    // Initialize demo elements
    this.createDemoIndicator();
    this.setupDemoEventListeners();
    this.checkURLForDemoMode();
  }

  setupDemoEventListeners() {
    // Demo button in navigation
    document.getElementById('demo-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.showDemoModal();
    });

    // Modal close button
    document.querySelector('.close-modal')?.addEventListener('click', () => {
      this.hideDemoModal();
    });

    // Window click to close modal
    window.addEventListener('click', (event) => {
      if (event.target === document.getElementById('demo-modal')) {
        this.hideDemoModal();
      }
    });

    // Login buttons for each role
    document.querySelectorAll('[data-role]').forEach(button => {
      button.addEventListener('click', () => {
        const role = button.getAttribute('data-role');
        this.login(role);
      });
    });
  }

  showDemoModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
      modal.style.display = 'block';
      this.animateModalAppearance();
    }
  }

  hideDemoModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) modal.style.display = 'none';
  }

  animateModalAppearance() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transform = 'translateY(-20px)';
      modal.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
      }, 10);
    }
  }

  login(role) {
    if (!this.demoAccounts[role]) return;
    
    this.currentRole = role;
    const account = this.demoAccounts[role];
    
    // Show login notification
    this.showLoginNotification(role);
    
    // Enable demo features
    this.enableFeatures(account.features);
    
    // Update UI
    this.updateUIForDemo(role);
    
    // Close modal
    this.hideDemoModal();
    
    // Save to session
    sessionStorage.setItem('demoRole', role);
  }

  showLoginNotification(role) {
    const notification = document.createElement('div');
    notification.className = 'demo-notification';
    notification.innerHTML = `
      <p>Anda login sebagai <strong>${role.toUpperCase()}</strong>. Mode demo aktif.</p>
      <button class="demo-logout">Logout</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Logout button
    notification.querySelector('.demo-logout').addEventListener('click', () => {
      this.logout();
      notification.remove();
    });
  }

  enableFeatures(features) {
    // Enable specific features based on role
    features.forEach(feature => {
      const elements = document.querySelectorAll(`[data-feature="${feature}"]`);
      elements.forEach(el => {
        el.style.display = 'block';
        el.classList.add('demo-enabled');
      });
    });
    
    // Special case for AI Assistant
    if (features.includes('ai-assistant')) {
      this.enableAIAssistantDemo();
    }
  }

  enableAIAssistantDemo() {
    // Add demo presets to AI Assistant
    const aiExamples = document.querySelector('.ai-examples');
    if (aiExamples) {
      aiExamples.innerHTML += `
        <span onclick="insertExample('Tunjukkan fitur admin')">Fitur Admin</span>
        <span onclick="insertExample('Bagaimana dokter menggunakan sistem?')">Fitur Dokter</span>
        <span onclick="insertExample('Apa yang bisa pasien lakukan?')">Fitur Pasien</span>
      `;
    }
  }

  updateUIForDemo(role) {
    // Add demo indicator to header
    const header = document.querySelector('header');
    if (header) {
      header.classList.add('demo-mode', `demo-${role}`);
      
      // Remove existing badge if any
      const existingBadge = header.querySelector('.demo-badge');
      if (existingBadge) existingBadge.remove();
      
      // Create new badge
      const badge = document.createElement('div');
      badge.className = 'demo-badge';
      badge.innerHTML = `
        <i class="fas fa-user-shield"></i> ${role.toUpperCase()} MODE
        <button class="demo-end" title="End Demo">
          <i class="fas fa-times"></i>
        </button>
      `;
      
      // Add click event to end demo
      badge.querySelector('.demo-end').addEventListener('click', () => this.logout());
      
      header.appendChild(badge);
    }
    
    // Modify page title
    document.title = `[DEMO] ${document.title}`;
  }

  logout() {
    // Disable all demo features
    document.querySelectorAll('.demo-enabled').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('demo-enabled');
    });
    
    // Remove demo classes from header
    const header = document.querySelector('header');
    if (header) {
      header.classList.remove('demo-mode', 'demo-admin', 'demo-doctor', 'demo-patient');
      const badge = header.querySelector('.demo-badge');
      if (badge) badge.remove();
    }
    
    // Reset title
    document.title = document.title.replace('[DEMO] ', '');
    
    // Clear session
    sessionStorage.removeItem('demoRole');
    this.currentRole = null;
    
    // Show logout notification
    this.showLogoutNotification();
  }

  showLogoutNotification() {
    const notification = document.createElement('div');
    notification.className = 'demo-notification logout';
    notification.textContent = 'Anda telah keluar dari mode demo.';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  createDemoIndicator() {
    // Add demo indicator styles to head
    const style = document.createElement('style');
    style.textContent = `
      .demo-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: var(--secondary);
        color: white;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 1001;
      }
      
      .demo-badge button.demo-end {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 10px;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      
      .demo-badge button.demo-end:hover {
        opacity: 1;
      }
      
      .demo-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: white;
        padding: 12px 20px;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 15px;
      }
      
      .demo-notification button.demo-logout {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      
      .demo-mode {
        border-top: 3px solid var(--secondary) !important;
      }
    `;
    document.head.appendChild(style);
  }

  checkURLForDemoMode() {
    // Check URL for demo parameter
    const urlParams = new URLSearchParams(window.location.search);
    const demoParam = urlParams.get('demo');
    
    // Check session storage
    const sessionRole = sessionStorage.getItem('demoRole');
    
    if (demoParam && this.demoAccounts[demoParam]) {
      this.login(demoParam);
    } else if (sessionRole) {
      this.login(sessionRole);
    }
  }
}

// Initialize Demo System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.demoSystem = new DemoSystem();
  
  // Add demo login buttons if modal exists
  const demoModal = document.getElementById('demo-modal');
  if (demoModal) {
    demoModal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2><i class="fas fa-user-secret"></i> WEHEALTY Demo Accounts</h2>
        <div class="demo-accounts">
          <div class="demo-account admin">
            <h3><i class="fas fa-user-cog"></i> Administrator</h3>
            <p>Email: admin@demo.wehealty</p>
            <p>Password: DemoAdmin123</p>
            <button class="btn primary-btn" data-role="admin">
              <i class="fas fa-sign-in-alt"></i> Login sebagai Admin
            </button>
          </div>
          <div class="demo-account doctor">
            <h3><i class="fas fa-user-md"></i> Dokter</h3>
            <p>Email: doctor@demo.wehealty</p>
            <p>Password: DemoDoctor123</p>
            <button class="btn primary-btn" data-role="doctor">
              <i class="fas fa-sign-in-alt"></i> Login sebagai Dokter
            </button>
          </div>
          <div class="demo-account patient">
            <h3><i class="fas fa-user-injured"></i> Pasien</h3>
            <p>Email: patient@demo.wehealty</p>
            <p>Password: DemoPatient123</p>
            <button class="btn primary-btn" data-role="patient">
              <i class="fas fa-sign-in-alt"></i> Login sebagai Pasien
            </button>
          </div>
        </div>
        <div class="demo-info">
          <p><i class="fas fa-info-circle"></i> <strong>Catatan Demo:</strong> 
          Semua data dan perubahan tidak akan disimpan secara permanen.</p>
        </div>
      </div>
    `;
  }
});