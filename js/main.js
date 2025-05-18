// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const demoBtn = document.getElementById('demo-btn');
const demoModal = document.getElementById('demo-modal');
const closeModal = document.querySelector('.close-modal');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', function() {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Responsive Menu Adjustment
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
    } else {
        navMenu.style.display = 'none';
    }
});

// Demo Account Modal
demoBtn.addEventListener('click', function(e) {
    e.preventDefault();
    demoModal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
    demoModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === demoModal) {
        demoModal.style.display = 'none';
    }
});

// Scroll to Section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (height && weight) {
        const bmi = (weight / (height * height)).toFixed(1);
        let category, healthRisks, recommendations;
        
        if (bmi < 18.5) {
            category = "Underweight (Kekurangan berat badan)";
            healthRisks = "Risiko kesehatan termasuk kekurangan nutrisi, osteoporosis, sistem imun yang lemah, dan masalah kesuburan.";
            recommendations = `
                <ul>
                    <li>Tingkatkan asupan kalori dengan makanan bergizi</li>
                    <li>Fokus pada protein berkualitas seperti daging tanpa lemak, ikan, telur, dan kacang-kacangan</li>
                    <li>Latihan kekuatan untuk membangun massa otot</li>
                    <li>Konsultasi dengan ahli gizi untuk rencana makan khusus</li>
                </ul>
            `;
        } else if (bmi >= 18.5 && bmi < 23) {
            category = "Normal weight (Berat badan sehat)";
            healthRisks = "Risiko penyakit terkait berat badan rendah. Pertahankan gaya hidup sehat.";
            recommendations = `
                <ul>
                    <li>Pertahankan pola makan seimbang dengan berbagai nutrisi</li>
                    <li>Lakukan aktivitas fisik minimal 150 menit per minggu</li>
                    <li>Pantau berat badan secara berkala</li>
                    <li>Tetap terhidrasi dan cukup istirahat</li>
                </ul>
            `;
        } else if (bmi >= 23 && bmi < 27.5) {
            category = "Overweight (Kelebihan berat badan)";
            healthRisks = "Peningkatan risiko penyakit jantung, diabetes tipe 2, dan tekanan darah tinggi.";
            recommendations = `
                <ul>
                    <li>Kurangi asupan kalori sebanyak 300-500 kkal/hari</li>
                    <li>Tingkatkan aktivitas fisik dengan olahraga aerobik</li>
                    <li>Batasi makanan olahan dan tinggi gula</li>
                    <li>Tingkatkan asupan serat dari sayuran dan buah</li>
                </ul>
            `;
        } else {
            category = "Obesity (Obesitas)";
            healthRisks = "Risiko tinggi untuk penyakit jantung, stroke, diabetes tipe 2, sleep apnea, dan beberapa jenis kanker.";
            recommendations = `
                <ul>
                    <li>Konsultasi dengan dokter atau ahli gizi untuk rencana penurunan berat badan</li>
                    <li>Target penurunan berat badan 5-10% dari berat awal</li>
                    <li>Kombinasikan diet sehat dengan olahraga teratur</li>
                    <li>Pertimbangkan terapi perilaku untuk perubahan gaya hidup</li>
                </ul>
            `;
        }
        
        document.getElementById('bmi-result').innerHTML = `
            <strong>BMI Anda:</strong> ${bmi}<br>
            <strong>Kategori:</strong> ${category}
        `;
        
        document.getElementById('bmi-category').innerHTML = `<p><strong>Kategori BMI menurut WHO:</strong><br>
            < 18.5 = Underweight<br>
            18.5 - 22.9 = Normal<br>
            23 - 27.4 = Overweight<br>
            ≥ 27.5 = Obese</p>`;
        
        document.getElementById('bmi-health-risks').innerHTML = `<p><strong>Risiko Kesehatan:</strong> ${healthRisks}</p>`;
        document.getElementById('bmi-recommendations').innerHTML = `<p><strong>Rekomendasi:</strong> ${recommendations}</p>`;
        
        document.getElementById('bmi-details').style.display = 'block';
    } else {
        alert("Silakan masukkan tinggi dan berat badan Anda");
    }
}

// Calorie Calculator
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height-calc').value);
    const weight = parseFloat(document.getElementById('weight-calc').value);
    const activity = parseFloat(document.getElementById('activity').value);
    
    if (age && gender && height && weight && activity) {
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        
        const calories = Math.round(bmr * activity);
        const protein = Math.round(weight * 1.6);
        const fat = Math.round((calories * 0.25) / 9);
        const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);
        
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
    } else {
        alert("Silakan lengkapi semua data");
    }
}

// AI Health Assistant Functions
function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    const chatMessages = document.getElementById('ai-chat-messages');
    
    if (message === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'ai-message user';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
    
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-message bot';
    typingIndicator.innerHTML = '<span class="ai-loading"></span> Sedang menganalisis...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI processing
    setTimeout(() => {
        chatMessages.removeChild(typingIndicator);
        const aiResponse = findAIResponse(message);
        
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message bot';
        aiMessage.innerHTML = aiResponse.response + renderSources(aiResponse.sources) + renderAITools(message);
        
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

// Handle Enter key in AI input
document.getElementById('ai-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendAIMessage();
    }
});

// Insert example questions
function insertExample(text) {
    const input = document.getElementById('ai-input');
    input.value = text;
    input.focus();
}

// Demo Account Login
function loginDemo(role) {
    let message = '';
    switch(role) {
        case 'admin':
            message = 'Anda login sebagai Admin. Anda memiliki akses penuh ke semua fitur.';
            break;
        case 'doctor':
            message = 'Anda login sebagai Dokter. Anda dapat mengakses rekam medis dan konsultasi.';
            break;
        case 'patient':
            message = 'Anda login sebagai Pasien. Anda dapat mengakses alat kesehatan dan konsultasi.';
            break;
    }
    
    alert(message);
    demoModal.style.display = 'none';
    
    // Add demo indicator
    const header = document.querySelector('header');
    header.style.position = 'relative';
    header.style.borderTop = '3px solid var(--secondary)';
    
    // Remove existing badge if any
    const existingBadge = document.querySelector('.demo-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add new badge
    const demoBadge = document.createElement('div');
    demoBadge.className = 'demo-badge';
    demoBadge.style.position = 'absolute';
    demoBadge.style.top = '10px';
    demoBadge.style.right = '10px';
    demoBadge.style.backgroundColor = 'var(--secondary)';
    demoBadge.style.color = 'white';
    demoBadge.style.padding = '2px 8px';
    demoBadge.style.borderRadius = '10px';
    demoBadge.style.fontSize = '12px';
    demoBadge.style.fontWeight = 'bold';
    demoBadge.textContent = 'DEMO MODE: ' + role.toUpperCase();
    header.appendChild(demoBadge);
    
    // Enable demo features based on role
    enableDemoFeatures(role);
}

// Enable specific demo features based on role
function enableDemoFeatures(role) {
    // Example: Enable admin tools if role is admin
    if (role === 'admin') {
        // Add admin specific features here
    }
    
    // You can add more role-specific features here
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
    
    // Initialize any other page elements here
});