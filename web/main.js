// main.js
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage } from './pages/home.js';
import { renderGamesPage } from './pages/games.js';
import { renderGameDetailPage } from './pages/game-detail.js';
import { renderProfilePage } from './pages/profile.js';
import { renderUploadPage } from './pages/upload.js';
import { renderAboutPage } from './pages/about.js';
import { renderContactPage } from './pages/contact.js';
import { renderLoginPage } from './pages/login.js';
import { renderSpiritsLibraryPage } from './pages/spirits-library.js';
import { renderSpiritDetailPage } from './pages/spirits-library.js';
import { parseHollowKnightSaveData } from './pages/hollow-knight-parser.js';

const app = document.querySelector('#app');

const firebaseConfig = {
  apiKey: "AIzaSyC-ldon-HBKkX2be6AiF_wjrAENKk4I900",
  authDomain: "gameprogress-fd9e5.firebaseapp.com",
  projectId: "gameprogress-fd9e5",
  storageBucket: "gameprogress-fd9e5.firebasestorage.app",
  messagingSenderId: "408452818289",
  appId: "1:408452818289:web:19895dec46a7611d6bc2d0",
  measurementId: "G-12MZWPDH33"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let currentRoute = 'home';
let currentParams = {};

const routes = {
  home: renderHomePage,
  games: renderGamesPage,
  'game-detail': renderGameDetailPage,
  profile: renderProfilePage,
  upload: renderUploadPage,
  about: renderAboutPage,
  contact: renderContactPage,
  login: renderLoginPage,
  'spirits-library': renderSpiritsLibraryPage,
  'spirit-detail': renderSpiritDetailPage
};

// تعريف الدوال المساعدة أولاً
async function updateUserGamesList() {
  if (!currentUser) return;

  try {
    const userGamesRef = db.collection('users').doc(currentUser.uid).collection('games');
    const snapshot = await userGamesRef.get();
    
    const games = [];
    snapshot.forEach(doc => {
      games.push({ id: doc.id, ...doc.data() });
    });
    
    updateProfileGamesDisplay(games);
  } catch (error) {
    console.error('Error fetching user games:', error);
  }
}

function updateProfileGamesDisplay(games) {
  const gameGrid = document.querySelector('.game-grid');
  if (!gameGrid) return;

  if (games.length === 0) {
    gameGrid.innerHTML = `
      <div class="card" style="text-align: center; padding: 2rem;">
        <p style="color: var(--text-secondary);">No games uploaded yet.</p>
        <button class="btn btn-primary" data-route="upload" style="margin-top: 1rem;">
          Upload Your First Game
        </button>
      </div>
    `;
    
    // إضافة event listener للزر الجديد
    const uploadButton = gameGrid.querySelector('button[data-route="upload"]');
    if (uploadButton) {
      uploadButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.navigate('upload');
      });
    }
    return;
  }

  gameGrid.innerHTML = games.map(game => `
    <div class="card game-card" style="cursor: default;">
      <div class="game-card-image ${game.gameId}"></div>
      <h3>${game.gameName}</h3>
      <p>Completion: ${game.completion}</p>
      <p style="font-size: 0.875rem; color: var(--text-secondary);">
        Uploaded: ${game.uploadedAt ? new Date(game.uploadedAt.toDate()).toLocaleDateString() : 'Recently'}
      </p>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <button class="btn btn-secondary view-stats" data-game-doc-id="${game.id}" style="flex: 1;">View Stats</button>
        <button class="btn btn-outline delete-game" data-game-doc-id="${game.id}">Delete</button>
      </div>
    </div>
  `).join('');

  // إضافة event listeners لأزرار الحذف
  document.querySelectorAll('.delete-game').forEach(button => {
    button.addEventListener('click', (e) => {
      const gameDocId = e.target.getAttribute('data-game-doc-id');
      deleteGame(gameDocId);
    });
  });

  // إضافة event listeners لأزرار عرض الإحصائيات
  document.querySelectorAll('.view-stats').forEach(button => {
    button.addEventListener('click', (e) => {
      const gameDocId = e.target.getAttribute('data-game-doc-id');
      window.navigate('game-detail', { gameDocId: gameDocId });
    });
  });
}

// جعل دالة navigate متاحة عالمياً مع دعم المعلمات
window.navigate = function(route, params = {}) {
  currentRoute = route;
  currentParams = params;
  
 let content;
 if (route === 'game-detail') {
    content = renderGameDetailPage(currentUser, params.gameDocId, params.gameId);
  } else if (route === 'spirit-detail') {
    content = renderSpiritDetailPage(currentUser, params.spiritId);
  } else {
    content = routes[route](currentUser);
  }
  

  
  app.innerHTML = renderNavbar(currentRoute, currentUser) + content + renderFooter();

  window.scrollTo(0, 0);

  // إضافة event listeners لجميع روابط التنقل
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = e.currentTarget.getAttribute('data-route');
      const gameId = e.currentTarget.getAttribute('data-game-id');
      const gameDocId = e.currentTarget.getAttribute('data-game-doc-id');
      
      if (gameId) {
        window.navigate(route, { gameId });
      } else if (gameDocId) {
        window.navigate(route, { gameDocId });
      } else {
        window.navigate(route);
      }
    });
  });

  // إضافة event listeners للأزرار الديناميكية
  setupDynamicEventListeners();

  if (route === 'home') {
    initializeSlider();
  }

  // تحميل الألعاب إذا كانت الصفحة الشخصية والمستخدم مسجل الدخول
  if (route === 'profile' && currentUser) {
    setTimeout(() => {
      updateUserGamesList();
    }, 100);
  }

  // تحميل تحليل اللعبة إذا كانت صفحة تفاصيل اللعبة
  if (route === 'game-detail' && params.gameDocId && currentUser) {
    setTimeout(() => {
      window.loadGameAnalysis(params.gameDocId);
    }, 100);
  }

  // تهيئة سلايدر الألعاب إذا كانت صفحة الألعاب
  if (route === 'games') {
    setTimeout(() => {
      initializeGameSlider();
    }, 100);
  }

  // في دالة navigate
if (route === 'spirits-library') {
  setTimeout(() => {
    window.loadSpiritsLibrary(params.gameDocId);
  }, 100);
}

 if (route === 'spirit-detail' && params.spiritId) {
    setTimeout(() => {
      window.loadSpiritDetail(params.spiritId);
    }, 100);
  }
};

// إعداد event listeners للأزرار الديناميكية
function setupDynamicEventListeners() {
  // إضافة event listener لزر الرفع في صفحة تفاصيل اللعبة
  const uploadButtons = document.querySelectorAll('button[data-route="upload"][data-game-id]');
  uploadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const gameId = e.target.getAttribute('data-game-id');
      window.navigate('upload');
      
      // تعيين اللعبة المختارة في dropdown الرفع
      setTimeout(() => {
        const gameSelect = document.getElementById('game-select');
        if (gameSelect && gameId) {
          gameSelect.value = gameId;
        }
      }, 100);
    });
  });

  // إضافة event listener لزر تسجيل الدخول في صفحة الرفع
  const loginButtons = document.querySelectorAll('button[onclick*="login"]');
  loginButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigate('login');
    });
  });
}

// Authentication functions
window.signInWithGoogle = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log('User signed in:', result.user);
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      alert('Error signing in: ' + error.message);
    });
};

window.signOut = function() {
  auth.signOut()
    .then(() => {
      console.log('User signed out');
      window.navigate('home');
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
};

// Auth state listener
auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  
  if (user) {
    // Check if user exists in Firestore, if not create a new document
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      await userRef.set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // إنشاء أول إنجاز للمستخدم
      await userRef.collection('achievements').doc('first_upload').set({
        name: 'First Upload',
        description: 'Upload your first game save file',
        icon: '🏆',
        unlockedAt: firebase.firestore.FieldValue.serverTimestamp(),
        isUnlocked: true
      });
    } else {
      // تحديث آخر تسجيل دخول
      await userRef.update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    
    // Navigate to home if currently on login page
    if (currentRoute === 'login') {
      window.navigate('home');
    }
  } else {
    // If user is not logged in and trying to access protected routes
    if (['profile', 'upload'].includes(currentRoute)) {
      window.navigate('login');
    }
  }
  
  // Re-render current route with updated user state
  window.navigate(currentRoute, currentParams);
});

// دالة لحذف لعبة
window.deleteGame = async function(gameDocId) {
  if (!currentUser || !confirm('Are you sure you want to delete this game?')) return;

  try {
    await db.collection('users').doc(currentUser.uid).collection('games').doc(gameDocId).delete();
    alert('Game deleted successfully!');
    updateUserGamesList();
  } catch (error) {
    console.error('Error deleting game:', error);
    alert('Error deleting game: ' + error.message);
  }
};

// دالة نسخ رابط الملف الشخصي
window.copyProfileLink = async function() {
  const linkInput = document.querySelector('input[type="text"]');
  if (linkInput) {
    try {
      await navigator.clipboard.writeText(linkInput.value);
      alert('Profile link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      linkInput.select();
      document.execCommand('copy');
      alert('Profile link copied to clipboard!');
    }
  }
};

// دالة قراءة الملف كنص
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
  });
}

// دالة تحليل ملف الحفظ
// في دالة analyzeSaveFile - تحديث قسم التحليل
window.analyzeSaveFile = async function(file, gameId, gameName) {
  if (!currentUser) {
    alert('Please log in to analyze files');
    return;
  }

  try {
    const fileContent = await readFileAsText(file);
    
    // Debug: Log the first 500 characters to see file structure
    console.log('File content preview:', fileContent.substring(0, 500));
    
    let analysisData = null;

    // استيراد دالة التحليل ديناميكياً
    if (gameId === 'ender-lilies') {
      try {
        const { parseEnderLiliesSaveData } = await import('./pages/ender-lilies-parser.js');
        analysisData = parseEnderLiliesSaveData(fileContent);
      } catch (parseError) {
        console.error('Parser error details:', parseError);
        
        // Try to detect file type
        if (fileContent.includes('root') && fileContent.includes('properties')) {
          throw new Error('File has correct structure but parsing failed. Game version might be different.');
        } else if (file.name.endsWith('.sav')) {
          throw new Error('This appears to be a binary .sav file. Ender Lilies save files should be exported as JSON.');
        } else {
          throw new Error('File format not recognized. Please make sure this is a valid Ender Lilies JSON save file.');
        }
      }
    } 
    // إضافة تحليل Hollow Knight
    // في دالة analyzeSaveFile في main.js - تحديث قسم Hollow Knight
else if (gameId === 'hollow-knight') {
  try {
    console.log('Starting Hollow Knight analysis...');
    analysisData = parseHollowKnightSaveData(fileContent);
    console.log('Hollow Knight analysis completed:', analysisData);
  } catch (parseError) {
    console.error('Hollow Knight parser error details:', parseError);
    console.error('Error stack:', parseError.stack);
    
    // محاولة تحليل مبسط إذا فشل التحليل الكامل
    try {
      const saveData = JSON.parse(fileContent);
      if (saveData.playerData) {
        const playerData = saveData.playerData;
        const completion = playerData.completionPercent || 0;
        
        analysisData = {
          analysisData: {
            stats: {
              "Game Version": playerData.version || "N/A",
              "Play Time (seconds)": playerData.playTime || 0,
              "Completion Percentage (%)": completion,
              "Current Geo": playerData.geo || 0,
              "Current Health": playerData.health || 5,
              "Max Health (Masks)": playerData.maxHealth || 5
            },
            abilities: {
              "Dash": playerData.canDash || false,
              "Wall Jump": playerData.canWallJump || false,
              "Double Jump": playerData.hasDoubleJump || false
            },
            charms: {
              "Total Charms Found": 0,
              "List of Charms": []
            },
            bosses: {},
            collectibles: {},
            questStatus: {},
            journalEntries: {}
          },
          completion: completion > 0 ? `${completion}%` : "0% (Basic)"
        };
        
        console.log('Basic analysis completed as fallback');
      }
    } catch (basicError) {
      console.error('Basic analysis also failed:', basicError);
      throw new Error('File has Hollow Knight structure but detailed parsing failed. Basic analysis also failed.');
    }
  }
}

    // حفظ البيانات المحللة في Firestore
    const gameData = {
      gameId,
      gameName,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
      completion: analysisData ? `${analysisData.completion}` : '--%',
      analysisData: analysisData ? analysisData.analysisData : null,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    };

    const userGamesRef = db.collection('users').doc(currentUser.uid).collection('games');
    const docRef = await userGamesRef.add(gameData);

    alert('Save file analyzed successfully!');
    updateUserGamesList();
    window.navigate('profile');

  } catch (error) {
    console.error('Error analyzing file:', error);
    
    // More user-friendly error messages
    if (error.message.includes('binary') || error.message.includes('.sav')) {
      alert('Error: This appears to be a binary save file. You need to export the save as JSON format. Please check the upload instructions.');
    } else if (error.message.includes('JSON')) {
      alert('Error: Invalid JSON format. The file might be corrupted or not a valid save file.');
    } else {
      alert('Error analyzing file: ' + error.message);
    }
  }
};

// Upload function
window.handleUpload = function(event) {
  event.preventDefault();

  if (!currentUser) {
    alert('Please log in to upload files');
    window.navigate('login');
    return;
  }

  const gameSelect = document.getElementById('game-select');
  const fileInput = document.getElementById('file-input');
  const saveNameInput = document.getElementById('save-name');

  if (gameSelect.value && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const gameId = gameSelect.value;
    const gameName = gameSelect.options[gameSelect.selectedIndex].text;
    
    // استخدام التحليل الجديد
    window.analyzeSaveFile(file, gameId, gameName);
  } else {
    alert('Please select a game and choose a file to upload.');
  }
};

// جعل الدوال الأخرى متاحة عالمياً
window.updateUserGamesList = updateUserGamesList;

// Rest of your existing functions (slider, mobile menu, etc.)
let currentSlide = 0;

function initializeSlider() {
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.getElementById('sliderDots');

  if (!sliderTrack || !sliderDots) return;

  const slides = sliderTrack.children;
  const slideCount = slides.length;

  sliderDots.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = i === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', () => goToSlide(i));
    sliderDots.appendChild(dot);
  }

  currentSlide = 0;
}

window.changeSlide = function(direction) {
  const sliderTrack = document.getElementById('sliderTrack');
  if (!sliderTrack) return;

  const slideCount = sliderTrack.children.length;
  currentSlide = (currentSlide + direction + slideCount) % slideCount;

  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateDots();
};

function goToSlide(index) {
  const sliderTrack = document.getElementById('sliderTrack');
  if (!sliderTrack) return;

  currentSlide = index;
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.className = index === currentSlide ? 'dot active' : 'dot';
  });
}

// Game Slider Functionality for Games Page
let currentGameSlide = 0;

function initializeGameSlider() {
  const sliderTrack = document.getElementById('gamesSliderTrack');
  const sliderDots = document.getElementById('gamesSliderDots');

  if (!sliderTrack || !sliderDots) return;

  const slides = sliderTrack.children;
  const slideCount = slides.length;

  sliderDots.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = i === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', () => goToGameSlide(i));
    sliderDots.appendChild(dot);
  }

  currentGameSlide = 0;
}

window.changeGameSlide = function(direction) {
  const sliderTrack = document.getElementById('gamesSliderTrack');
  if (!sliderTrack) return;

  const slideCount = sliderTrack.children.length;
  currentGameSlide = (currentGameSlide + direction + slideCount) % slideCount;

  sliderTrack.style.transform = `translateX(-${currentGameSlide * 100}%)`;
  updateGameDots();
};

function goToGameSlide(index) {
  const sliderTrack = document.getElementById('gamesSliderTrack');
  if (!sliderTrack) return;

  currentGameSlide = index;
  sliderTrack.style.transform = `translateX(-${currentGameSlide * 100}%)`;
  updateGameDots();
}

function updateGameDots() {
  const dots = document.querySelectorAll('#gamesSliderDots .dot');
  dots.forEach((dot, index) => {
    dot.className = index === currentGameSlide ? 'dot active' : 'dot';
  });
}

window.toggleMobileMenu = function() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
};

window.toggleFAQ = function(element) {
  const answer = element.nextElementSibling;
  const allAnswers = document.querySelectorAll('.faq-answer');

  allAnswers.forEach(ans => {
    if (ans !== answer) {
      ans.classList.remove('active');
    }
  });

  answer.classList.toggle('active');
};

window.handleContactSubmit = function(event) {
  event.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  event.target.reset();
};

// Initialize app
window.navigate('home');