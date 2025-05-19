// =============================================
// DOM Elements
// =============================================
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const demoBtn = document.getElementById('demo-btn');
const demoModal = document.getElementById('demo-modal');
const closeModal = document.querySelector('.close-modal');

// =============================================
// Responsive Initialization
// =============================================
function initializeResponsiveElements() {
  // Set initial menu state based on screen size
  if (window.innerWidth <= 768) {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'flex';
  }
}

// =============================================
// Mobile Menu Functionality (Improved)
// =============================================
function setupMobileMenu() {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Enhanced resize handler with debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        mobileMenuBtn.classList.remove('active');
      } else {
        navMenu.style.display = 'none';
      }
    }, 250);
  });
  
  // Close mobile menu when clicking a link (improved)
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
      }
    });
  });
}

function toggleMobileMenu() {
  const isOpen = navMenu.style.display === 'flex';
  navMenu.style.display = isOpen ? 'none' : 'flex';
  mobileMenuBtn.classList.toggle('active', !isOpen);
  
  // Improved accessibility
  if (!isOpen) {
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    navMenu.setAttribute('aria-hidden', 'false');
  } else {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
  }
}

// =============================================
// Modal Functionality (Improved)
// =============================================
function setupModal() {
  if (!demoBtn || !demoModal) return;
  
  demoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeModal?.addEventListener('click', closeModalFn);

  window.addEventListener('click', (event) => {
    if (event.target === demoModal) {
      closeModalFn();
    }
  });
  
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (demoModal.style.display === 'block' && e.key === 'Escape') {
      closeModalFn();
    }
  });
}

function openModal() {
  demoModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  demoModal.setAttribute('aria-hidden', 'false');
  
  // Focus on first interactive element
  const focusable = demoModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) focusable.focus();
}

function closeModalFn() {
  demoModal.style.display = 'none';
  document.body.style.overflow = 'auto';
  demoModal.setAttribute('aria-hidden', 'true');
  demoBtn.focus();
}

// =============================================
// Health Calculators (Improved Responsiveness)
// =============================================
function setupCalculators() {
  // BMI Calculator
  document.getElementById('calculate-bmi')?.addEventListener('click', calculateBMI);
  
  // Calorie Calculator
  document.getElementById('calculate-calories')?.addEventListener('click', calculateCalories);
  
  // Responsive calculator tabs
  setupCalculatorTabs();
}

function setupCalculatorTabs() {
  const calculatorTabs = document.querySelectorAll('.calculator-tab');
  if (!calculatorTabs.length) return;
  
  calculatorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      calculatorTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show corresponding calculator
      const calculatorId = tab.getAttribute('data-calculator');
      document.querySelectorAll('.calculator-content').forEach(content => {
        content.style.display = 'none';
      });
      document.getElementById(calculatorId).style.display = 'block';
      
      // Adjust layout for mobile
      if (window.innerWidth <= 768) {
        document.getElementById(calculatorId).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Activate first tab by default
  if (calculatorTabs.length > 0) {
    calculatorTabs[0].click();
  }
}

function calculateBMI() {
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  
  const height = parseFloat(heightInput.value) / 100;
  const weight = parseFloat(weightInput.value);
  
  // Improved validation
  if (!height || isNaN(height) || height <= 0) {
    showInputError(heightInput, "Masukkan tinggi badan yang valid");
    return;
  }
  
  if (!weight || isNaN(weight) || weight <= 0) {
    showInputError(weightInput, "Masukkan berat badan yang valid");
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  const { category, healthRisks, recommendations } = getBMICategory(bmi);
  
  displayBMIResults(bmi, category, healthRisks, recommendations);
}

function showInputError(inputElement, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'input-error';
  errorElement.textContent = message;
  
  // Remove existing error if any
  const existingError = inputElement.nextElementSibling;
  if (existingError && existingError.classList.contains('input-error')) {
    existingError.remove();
  }
  
  inputElement.insertAdjacentElement('afterend', errorElement);
  inputElement.focus();
  
  // Remove error after 3 seconds
  setTimeout(() => {
    errorElement.remove();
  }, 3000);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return {
      category: "Underweight (Kekurangan berat badan)",
      healthRisks: "Risiko kesehatan termasuk kekurangan nutrisi, osteoporosis, sistem imun yang lemah, dan masalah kesuburan.",
      recommendations: generateRecommendations('underweight')
    };
  } else if (bmi < 23) {
    return {
      category: "Normal weight (Berat badan sehat)",
      healthRisks: "Risiko penyakit terkait berat badan rendah. Pertahankan gaya hidup sehat.",
      recommendations: generateRecommendations('normal')
    };
  } else if (bmi < 27.5) {
    return {
      category: "Overweight (Kelebihan berat badan)",
      healthRisks: "Peningkatan risiko penyakit jantung, diabetes tipe 2, dan tekanan darah tinggi.",
      recommendations: generateRecommendations('overweight')
    };
  } else {
    return {
      category: "Obesity (Obesitas)",
      healthRisks: "Risiko tinggi untuk penyakit jantung, stroke, diabetes tipe 2, sleep apnea, dan beberapa jenis kanker.",
      recommendations: generateRecommendations('obese')
    };
  }
}

function generateRecommendations(type) {
  const recommendations = {
    underweight: [
      "Tingkatkan asupan kalori dengan makanan bergizi",
      "Fokus pada protein berkualitas seperti daging tanpa lemak, ikan, telur, dan kacang-kacangan",
      "Latihan kekuatan untuk membangun massa otot",
      "Konsultasi dengan ahli gizi untuk rencana makan khusus"
    ],
    normal: [
      "Pertahankan pola makan seimbang dengan berbagai nutrisi",
      "Lakukan aktivitas fisik minimal 150 menit per minggu",
      "Pantau berat badan secara berkala",
      "Tetap terhidrasi dan cukup istirahat"
    ],
    overweight: [
      "Kurangi asupan kalori sebanyak 300-500 kkal/hari",
      "Tingkatkan aktivitas fisik dengan olahraga aerobik",
      "Batasi makanan olahan dan tinggi gula",
      "Tingkatkan asupan serat dari sayuran dan buah"
    ],
    obese: [
      "Konsultasi dengan dokter atau ahli gizi untuk rencana penurunan berat badan",
      "Target penurunan berat badan 5-10% dari berat awal",
      "Kombinasikan diet sehat dengan olahraga teratur",
      "Pertimbangkan terapi perilaku untuk perubahan gaya hidup"
    ]
  };

  return recommendations[type].map(item => `<li>${item}</li>`).join('');
}

function displayBMIResults(bmi, category, healthRisks, recommendations) {
  const resultContainer = document.getElementById('bmi-details');
  
  document.getElementById('bmi-result').innerHTML = `
    <strong>BMI Anda:</strong> ${bmi}<br>
    <strong>Kategori:</strong> ${category}
  `;
  
  document.getElementById('bmi-category').innerHTML = `
    <p><strong>Kategori BMI menurut WHO:</strong><br>
    < 18.5 = Underweight<br>
    18.5 - 22.9 = Normal<br>
    23 - 27.4 = Overweight<br>
    ≥ 27.5 = Obese</p>
  `;
  
  document.getElementById('bmi-health-risks').innerHTML = `
    <p><strong>Risiko Kesehatan:</strong> ${healthRisks}</p>
  `;
  
  document.getElementById('bmi-recommendations').innerHTML = `
    <p><strong>Rekomendasi:</strong></p>
    <ul>${recommendations}</ul>
  `;
  
  resultContainer.style.display = 'block';
  
  // Scroll to results on mobile
  if (window.innerWidth <= 768) {
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function calculateCalories() {
  const ageInput = document.getElementById('age');
  const genderInput = document.getElementById('gender');
  const heightInput = document.getElementById('height-calc');
  const weightInput = document.getElementById('weight-calc');
  const activityInput = document.getElementById('activity');
  
  const age = parseInt(ageInput.value);
  const gender = genderInput.value;
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);
  const activity = parseFloat(activityInput.value);
  
  // Improved validation
  if (!age || isNaN(age) || age <= 0 || age > 120) {
    showInputError(ageInput, "Masukkan usia yang valid (1-120)");
    return;
  }
  
  if (!gender) {
    showInputError(genderInput, "Pilih jenis kelamin");
    return;
  }
  
  if (!height || isNaN(height) || height <= 0) {
    showInputError(heightInput, "Masukkan tinggi badan yang valid");
    return;
  }
  
  if (!weight || isNaN(weight) || weight <= 0) {
    showInputError(weightInput, "Masukkan berat badan yang valid");
    return;
  }
  
  if (!activity || isNaN(activity) || activity <= 0) {
    showInputError(activityInput, "Pilih tingkat aktivitas");
    return;
  }

  const bmr = calculateBMR(age, gender, height, weight);
  const calories = Math.round(bmr * activity);
  const { protein, fat, carbs } = calculateMacros(calories, weight);
  
  displayCalorieResults(calories, protein, fat, carbs);
}

function calculateBMR(age, gender, height, weight) {
  return gender === 'male' 
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
}

function calculateMacros(calories, weight) {
  const protein = Math.round(weight * 1.6);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
  return { protein, fat, carbs };
}

function displayCalorieResults(calories, protein, fat, carbs) {
  const resultContainer = document.getElementById('calorie-details');
  
  document.getElementById('calorie-result').innerHTML = `
    <strong>Kebutuhan Kalori Harian Anda:</strong> ${calories} kkal<br>
    <strong>Maintenance:</strong> ${calories} kkal/hari<br>
    <strong>Penurunan Berat Badan:</strong> ${calories-500} kkal/hari<br>
    <strong>Penambahan Berat Badan:</strong> ${calories+500} kkal/hari
  `;
  
  document.getElementById('calorie-breakdown').innerHTML = `
    <p><strong>Pembagian Makronutrien:</strong></p>
    <ul>
      <li>Protein: ${protein}g (${protein*4} kkal) - Untuk pertumbuhan dan perbaikan otot</li>
      <li>Lemak: ${fat}g (${fat*9} kkal) - Untuk hormon dan penyerapan vitamin</li>
      <li>Karbohidrat: ${carbs}g (${carbs*4} kkal) - Untuk energi</li>
    </ul>
  `;
  
  document.getElementById('calorie-tips').innerHTML = `
    <p><strong>Tips Pola Makan Sehat:</strong></p>
    <ul>
      <li>Makan 3-5 kali sehari dengan porsi terkontrol</li>
      <li>Konsumsi protein setiap makan</li>
      <li>Pilih lemak sehat seperti alpukat, kacang-kacangan, dan minyak zaitun</li>
      <li>Utamakan karbohidrat kompleks seperti gandum utuh dan sayuran</li>
      <li>Minum air putih minimal 2 liter per hari</li>
      <li>Batasi gula tambahan dan makanan olahan</li>
    </ul>
  `;
  
  resultContainer.style.display = 'block';
  
  // Scroll to results on mobile
  if (window.innerWidth <= 768) {
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// =============================================
// AI Health Assistant (Improved)
// =============================================
function setupAIAssistant() {
  const aiInput = document.getElementById('ai-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  
  if (!aiInput || !aiSendBtn) return;
  
  aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAIMessage();
  });
  
  aiSendBtn.addEventListener('click', sendAIMessage);
  
  // Responsive adjustments for chat
  adjustChatHeight();
  window.addEventListener('resize', adjustChatHeight);
}

function adjustChatHeight() {
  const chatContainer = document.getElementById('ai-chat-container');
  if (!chatContainer) return;
  
  if (window.innerWidth <= 768) {
    chatContainer.style.height = '60vh';
  } else {
    chatContainer.style.height = '400px';
  }
}

function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const message = input.value.trim();
  const chatMessages = document.getElementById('ai-chat-messages');
  
  if (!message) return;
  
  // Add user message
  addChatMessage(message, 'user');
  input.value = '';
  
  // Show typing indicator
  const typingId = showTypingIndicator();
  
  // Simulate AI processing (in a real app, this would be an API call)
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const aiResponse = getAIResponse(message);
    addChatMessage(aiResponse.response, 'bot', aiResponse.sources);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
}

function addChatMessage(message, sender, sources = []) {
  const chatMessages = document.getElementById('ai-chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${sender}`;
  
  if (sender === 'bot') {
    messageDiv.innerHTML = `
      <div class="ai-message-content">
        ${message}
        ${renderSources(sources)}
      </div>
      ${renderAITools(message)}
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="ai-message-content">${message}</div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Reattach event listeners for new buttons
  if (sender === 'bot') {
    const editBtn = messageDiv.querySelector('.ai-edit-btn');
    const saveBtn = messageDiv.querySelector('.ai-save-btn');
    
    if (editBtn) {
      editBtn.addEventListener('click', () => insertExample(message));
    }
    
    if (saveBtn) {
      saveBtn.addEventListener('click', saveConversation);
    }
  }
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('ai-chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message bot ai-typing';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="ai-message-content">
      <span class="ai-loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </span>
      Sedang menganalisis...
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return 'typing-indicator';
}

function removeTypingIndicator(id) {
  const indicator = document.getElementById(id);
  if (indicator) indicator.remove();
}

function getAIResponse(message) {
  // In a real app, this would call an API
  const responses = {
    "makanan sehat": {
      response: "Untuk makanan sehat, fokus pada sayuran hijau, buah-buahan, protein tanpa lemak, dan biji-bijian utuh. Contoh makanan sehat termasuk brokoli, bayam, salmon, dada ayam, quinoa, dan alpukat.",
      sources: ["WHO Nutrition Guidelines", "Dietary Guidelines for Americans"]
    },
    "olahraga": {
      response: "Disarankan olahraga 150 menit per minggu dengan intensitas sedang atau 75 menit intensitas tinggi. Kombinasikan dengan latihan kekuatan 2-3 kali per minggu untuk hasil terbaik.",
      sources: ["American Heart Association", "CDC Physical Activity Guidelines"]
    },
    "skincare": {
      response: "Rutinitas skincare dasar: pembersih, pelembab, dan tabir surya. Sesuaikan dengan jenis kulit Anda. Untuk kulit kering, gunakan pelembab lebih kental. Untuk kulit berminyak, pilih produk oil-free.",
      sources: ["American Academy of Dermatology"]
    },
    "tidur": {
      response: "Orang dewasa membutuhkan 7-9 jam tidur per malam. Tips untuk tidur lebih baik: jadwal teratur, hindari kafein sore/malam, ciptakan lingkungan tidur yang nyaman, dan batasi screen time sebelum tidur.",
      sources: ["National Sleep Foundation"]
    },
    "stres": {
      response: "Untuk mengelola stres, coba teknik seperti: latihan pernapasan, meditasi, olahraga teratur, menjaga hubungan sosial, dan manajemen waktu yang baik. Jika stres berkepanjangan, pertimbangkan untuk berkonsultasi dengan profesional.",
      sources: ["American Psychological Association"]
    },
    "default": {
      response: "Saya adalah asisten kesehatan digital WEHEALTYZ. Silakan tanyakan tentang nutrisi, olahraga, kesehatan mental, atau perawatan kesehatan umum. Contoh pertanyaan: 'Apa makanan sehat untuk jantung?' atau 'Berapa lama olahraga yang direkomendasikan?'",
      sources: []
    }
  };

  const lowerMessage = message.toLowerCase();
  
  // Check for keywords in message
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return responses['default'];
}

function renderSources(sources) {
  if (!sources || sources.length === 0) return '';
  return `
    <div class="ai-sources">
      <strong>Sumber Terpercaya:</strong>
      <ul>${sources.map(source => `<li>${source}</li>`).join('')}</ul>
    </div>
  `;
}

function renderAITools(message) {
  return `
    <div class="ai-tools">
      <button class="ai-edit-btn">Edit Pertanyaan</button>
      <button class="ai-save-btn">Simpan Percakapan</button>
    </div>
  `;
}

function saveConversation() {
  const chatMessages = document.getElementById('ai-chat-messages');
  const messages = Array.from(chatMessages.children).map(msg => {
    return msg.classList.contains('user') 
      ? `Anda: ${msg.textContent}`
      : `Asisten: ${msg.querySelector('.ai-message-content')?.textContent.trim()}`;
  }).join('\n\n');
  
  // In a real app, this would save to server or local storage
  const blob = new Blob([messages], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wehealtyz-chat-' + new Date().toISOString().slice(0, 10) + '.txt';
  a.click();
  
  // Show confirmation
  const confirmation = document.createElement('div');
  confirmation.className = 'ai-message bot';
  confirmation.innerHTML = `
    <div class="ai-message-content">
      Percakapan telah disimpan sebagai file teks.
    </div>
  `;
  chatMessages.appendChild(confirmation);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// =============================================
// Demo Account System (Improved)
// =============================================
function setupDemoAccounts() {
  const demoRoleButtons = document.querySelectorAll('.demo-role');
  if (!demoRoleButtons.length) return;
  
  demoRoleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      loginDemo(e.target.dataset.role);
    });
  });
}

function loginDemo(role) {
  const messages = {
    admin: 'Anda login sebagai Admin. Anda memiliki akses penuh ke semua fitur.',
    doctor: 'Anda login sebagai Dokter. Anda dapat mengakses rekam medis dan konsultasi.',
    patient: 'Anda login sebagai Pasien. Anda dapat mengakses alat kesehatan dan konsultasi.'
  };

  // Show modal confirmation on mobile
  if (window.innerWidth <= 768) {
    const modal = document.createElement('div');
    modal.className = 'demo-confirmation';
    modal.innerHTML = `
      <div class="demo-confirmation-content">
        <p>${messages[role]}</p>
        <button class="demo-confirm-btn">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.demo-confirm-btn').addEventListener('click', () => {
      modal.remove();
      completeDemoLogin(role);
    });
  } else {
    completeDemoLogin(role);
  }
}

function completeDemoLogin(role) {
  demoModal.style.display = 'none';
  showDemoBadge(role);
  enableDemoFeatures(role);
  
  // Show welcome message in chat if available
  if (document.getElementById('ai-chat-messages')) {
    const welcomeMessages = {
      admin: 'Selamat datang, Admin! Anda sekarang dapat mengakses semua fitur sistem, termasuk manajemen pengguna dan laporan.',
      doctor: 'Selamat datang, Dokter! Anda sekarang dapat mengakses rekam medis pasien dan fitur konsultasi.',
      patient: 'Selamat datang! Anda sekarang dapat menggunakan semua alat kesehatan dan memulai konsultasi dengan dokter.'
    };
    
    addChatMessage(welcomeMessages[role], 'bot');
  }
}

function showDemoBadge(role) {
  const header = document.querySelector('header');
  if (!header) return;
  
  header.style.position = 'relative';
  header.style.borderTop = '3px solid var(--secondary)';
  
  // Remove existing badge
  const existingBadge = document.querySelector('.demo-badge');
  if (existingBadge) existingBadge.remove();
  
  // Add new badge
  const badge = document.createElement('div');
  badge.className = 'demo-badge';
  badge.textContent = `DEMO MODE: ${role.toUpperCase()}`;
  badge.setAttribute('aria-live', 'polite');
  header.appendChild(badge);
}

function enableDemoFeatures(role) {
  // Role-specific feature enabling
  const features = {
    admin: ['admin-tools', 'reports-section', 'user-management'],
    doctor: ['patient-records', 'consultation-tools', 'prescription-section'],
    patient: ['health-tools', 'appointment-section', 'personal-records']
  };
  
  // In a real app, this would enable UI elements based on role
  console.log(`Enabled features for ${role} role`);
}

// =============================================
// Responsive Image Handling
// =============================================
function setupResponsiveImages() {
  const images = document.querySelectorAll('img.responsive-img');
  
  images.forEach(img => {
    // Ensure images don't overflow on small screens
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    // Handle lazy loading
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
    }
  });
}

// =============================================
// Form Validation
// =============================================
function setupFormValidation() {
  const forms = document.querySelectorAll('form:not(.no-validate)');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!validateForm(form)) {
        e.preventDefault();
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      showInputError(input, "Field ini wajib diisi");
      isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        showInputError(input, "Masukkan alamat email yang valid");
        isValid = false;
      }
    }
    
    // Password validation
    if (input.type === 'password' && input.value) {
      if (input.value.length < 6) {
        showInputError(input, "Password minimal 6 karakter");
        isValid = false;
      }
    }
  });
  
  return isValid;
}

// =============================================
// Responsive Tables
// =============================================
function setupResponsiveTables() {
  const tables = document.querySelectorAll('table');
  
  tables.forEach(table => {
    if (window.innerWidth <= 768) {
      makeTableResponsive(table);
    }
  });
  
  window.addEventListener('resize', () => {
    tables.forEach(table => {
      if (window.innerWidth <= 768) {
        makeTableResponsive(table);
      } else {
        undoTableResponsive(table);
      }
    });
  });
}

function makeTableResponsive(table) {
  if (table.classList.contains('responsive')) return;
  
  table.classList.add('responsive');
  const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
  const rows = table.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      cell.setAttribute('data-label', headers[index]);
    });
  });
}

function undoTableResponsive(table) {
  if (!table.classList.contains('responsive')) return;
  
  table.classList.remove('responsive');
  const cells = table.querySelectorAll('td');
  cells.forEach(cell => {
    cell.removeAttribute('data-label');
  });
}

// =============================================
// Utility Functions
// =============================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const headerHeight = document.querySelector('header')?.offsetHeight || 0;
  const offset = section.offsetTop - headerHeight;
  
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  });
}

function insertExample(text) {
  const input = document.getElementById('ai-input');
  if (!input) return;
  
  input.value = text;
  input.focus();
}

// =============================================
// Initialize Application
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  initializeResponsiveElements();
  setupMobileMenu();
  setupModal();
  setupCalculators();
  setupAIAssistant();
  setupDemoAccounts();
  setupResponsiveImages();
  setupFormValidation();
  setupResponsiveTables();
  
  // Initialize any tooltips
  if (window.tippy) {
    tippy('[data-tippy-content]', {
      placement: 'top',
      animation: 'shift-away',
      duration: 200,
      arrow: true
    });
  }
  
  console.log('WEHEALTYZ application initialized');
});

// Handle page transitions for SPA-like feel
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"]), a[data-internal-link]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      } else if (link.hasAttribute('data-internal-link')) {
        e.preventDefault();
        // In a real SPA, this would load content dynamically
        window.location.href = href;
      }
    });
  });
});
