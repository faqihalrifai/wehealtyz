// =============================================
// DOM Elements
// =============================================
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const demoBtn = document.getElementById('demo-btn');
const demoModal = document.getElementById('demo-modal');
const closeModal = document.querySelector('.close-modal');

// =============================================
// Mobile Menu Functionality
// =============================================
function setupMobileMenu() {
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.style.display = 'flex';
    } else {
      navMenu.style.display = 'none';
    }
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
      }
    });
  });
}

function toggleMobileMenu() {
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// =============================================
// Modal Functionality
// =============================================
function setupModal() {
  demoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    demoModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    demoModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === demoModal) {
      demoModal.style.display = 'none';
    }
  });
}

// =============================================
// Health Calculators
// =============================================
function setupCalculators() {
  // BMI Calculator
  document.getElementById('calculate-bmi')?.addEventListener('click', calculateBMI);
  
  // Calorie Calculator
  document.getElementById('calculate-calories')?.addEventListener('click', calculateCalories);
}

function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value) / 100;
  const weight = parseFloat(document.getElementById('weight').value);
  
  if (!height || !weight) {
    alert("Silakan masukkan tinggi dan berat badan Anda");
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  const { category, healthRisks, recommendations } = getBMICategory(bmi);
  
  displayBMIResults(bmi, category, healthRisks, recommendations);
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
  
  document.getElementById('bmi-details').style.display = 'block';
}

function calculateCalories() {
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const height = parseFloat(document.getElementById('height-calc').value);
  const weight = parseFloat(document.getElementById('weight-calc').value);
  const activity = parseFloat(document.getElementById('activity').value);
  
  if (!age || !gender || !height || !weight || !activity) {
    alert("Silakan lengkapi semua data");
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
  
  document.getElementById('calorie-details').style.display = 'block';
}

// =============================================
// AI Health Assistant
// =============================================
function setupAIAssistant() {
  document.getElementById('ai-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAIMessage();
  });
  
  document.getElementById('ai-send-btn')?.addEventListener('click', sendAIMessage);
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
  
  // Simulate AI processing
  setTimeout(() => {
    removeTypingIndicator(typingId);
    const aiResponse = getAIResponse(message);
    addChatMessage(aiResponse.response, 'bot', aiResponse.sources);
  }, 800);
}

function addChatMessage(message, sender, sources = []) {
  const chatMessages = document.getElementById('ai-chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${sender}`;
  
  if (sender === 'bot') {
    messageDiv.innerHTML = `
      ${message}
      ${renderSources(sources)}
      ${renderAITools(message)}
    `;
  } else {
    messageDiv.textContent = message;
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('ai-chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-message bot';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = '<span class="ai-loading"></span> Sedang menganalisis...';
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
      response: "Untuk makanan sehat, fokus pada sayuran hijau, buah-buahan, protein tanpa lemak, dan biji-bijian utuh.",
      sources: ["WHO Nutrition Guidelines", "Dietary Guidelines for Americans"]
    },
    "olahraga": {
      response: "Disarankan olahraga 150 menit per minggu dengan intensitas sedang atau 75 menit intensitas tinggi.",
      sources: ["American Heart Association"]
    },
    "skincare": {
      response: "Rutinitas skincare dasar: pembersih, pelembab, dan tabir surya. Sesuaikan dengan jenis kulit Anda.",
      sources: ["American Academy of Dermatology"]
    },
    "default": {
      response: "Saya adalah asisten kesehatan digital. Silakan tanyakan tentang nutrisi, olahraga, atau perawatan kesehatan umum.",
      sources: []
    }
  };

  const lowerMessage = message.toLowerCase();
  return responses[lowerMessage] || responses['default'];
}

function renderSources(sources) {
  if (!sources || sources.length === 0) return '';
  return `
    <div class="ai-sources">
      <strong>Sumber:</strong>
      <ul>${sources.map(source => `<li>${source}</li>`).join('')}</ul>
    </div>
  `;
}

function renderAITools(message) {
  return `
    <div class="ai-tools">
      <button onclick="insertExample('${message}')">Edit Pertanyaan</button>
      <button onclick="saveConversation()">Simpan Percakapan</button>
    </div>
  `;
}

// =============================================
// Demo Account System
// =============================================
function setupDemoAccounts() {
  document.querySelectorAll('.demo-role').forEach(button => {
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

  alert(messages[role]);
  demoModal.style.display = 'none';
  showDemoBadge(role);
  enableDemoFeatures(role);
}

function showDemoBadge(role) {
  const header = document.querySelector('header');
  header.style.position = 'relative';
  header.style.borderTop = '3px solid var(--secondary)';
  
  // Remove existing badge
  const existingBadge = document.querySelector('.demo-badge');
  if (existingBadge) existingBadge.remove();
  
  // Add new badge
  const badge = document.createElement('div');
  badge.className = 'demo-badge';
  badge.textContent = `DEMO MODE: ${role.toUpperCase()}`;
  header.appendChild(badge);
}

function enableDemoFeatures(role) {
  // Role-specific feature enabling
  if (role === 'admin') {
    // Enable admin features
  } else if (role === 'doctor') {
    // Enable doctor features
  } else if (role === 'patient') {
    // Enable patient features
  }
}

// =============================================
// Utility Functions
// =============================================
function scrollToSection(sectionId) {
  document.getElementById(sectionId)?.scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function insertExample(text) {
  const input = document.getElementById('ai-input');
  input.value = text;
  input.focus();
}

// =============================================
// Initialize Application
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
  setupModal();
  setupCalculators();
  setupAIAssistant();
  setupDemoAccounts();
  
  console.log('WEHEALTYZ application initialized');
});
