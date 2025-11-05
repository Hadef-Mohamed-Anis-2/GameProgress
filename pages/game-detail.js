// game-detail.js
export function renderGameDetailPage(currentUser, gameDocId, gameId) {
  if (!currentUser) {
    return `
      <main>
        <div class="card" style="text-align: center; padding: 3rem;">
          <h2>Please Log In</h2>
          <p>You need to be logged in to view game details.</p>
          <button class="btn btn-primary" data-route="login" style="margin-top: 1rem;">Login</button>
        </div>
      </main>
    `;
  }

  // If gameId exists, display general game information
  if (gameId) {
    return renderGameInfoPage(gameId);
  }

  // If gameDocId exists, display the uploaded game analysis
  return `
    <main>
      <div class="hero">
        <h1>Game Analysis</h1>
        <p>Detailed analysis of your save file progress and statistics.</p>
      </div>

      <section class="section">
        <div class="card">
          <div id="game-analysis-content">
            <div style="text-align: center; padding: 2rem;">
              <p>Loading game analysis...</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

// Function to display general game information
function renderGameInfoPage(gameId) {
  const games = {
    'hollow-knight': {
      title: 'Hollow Knight',
      description: 'An epic action adventure through a vast ruined kingdom of insects and heroes.',
      image: 'hollow-knight',
      features: [
        'Save file analysis',
        'Progress tracking', 
        'Achievement tracking',
        'Map completion stats'
      ],
      supportedFormats: ['.dat files'],
      difficulty: 'Challenging',
      genre: 'Metroidvania',
      tips: [
        'Save files are located in: C:\\Users\\[YourName]\\AppData\\LocalLow\\Team Cherry\\Hollow Knight',
        'Look for user1.dat, user2.dat, etc.',
        'Make sure the game is closed when uploading save files'
      ]
    },
    'ender-lilies': {
      title: 'Ender Lilies',
      description: 'A dark fantasy 2D action RPG about unraveling the mysteries of a destroyed kingdom.',
      image: 'ender-lilies', 
      features: [
        'Spirit collection tracking',
        'Area discovery progress',
        'Completion percentage',
        'Playtime statistics'
      ],
      supportedFormats: ['.sav files (JSON format)'],
      difficulty: 'Moderate',
      genre: 'Action RPG',
      tips: [
        'Save files are located in: C:\\Users\\[YourName]\\AppData\\Local\\ENDERS LILIES',
        'You need to convert .sav files to JSON format for analysis',
        'Use a save editor tool to export as JSON'
      ]
    },
        'ender-magnolia': {
      title: 'Ender Magnolia: Bloom in the Mist',
      description: 'The sequel to Ender Lilies - a hauntingly beautiful metroidvania adventure in a polluted world.',
      image: 'ender-magnolia',
      features: [
        'Spirit companion tracking',
        'Area discovery progress', 
        'Completion percentage',
        'Playtime statistics',
        'Weapon and ability tracking'
      ],
      supportedFormats: ['.sav files (JSON format)'],
      difficulty: 'Moderate to Challenging',
      genre: 'Action RPG Metroidvania',
      tips: [
        'Save files are located in: C:\\Users\\[YourName]\\AppData\\Local\\ENDER MAGNOLIA',
        'You need to convert .sav files to JSON format for analysis',
        'Use a save editor tool to export as JSON',
        'Make sure the game is closed when uploading save files'
      ]
    }
  };

  const game = games[gameId];
  if (!game) {
    return `
      <main>
        <div class="card" style="text-align: center; padding: 3rem;">
          <h2>Game Not Found</h2>
          <p>The requested game could not be found.</p>
          <button class="btn btn-primary" data-route="games" style="margin-top: 1rem;">Back to Games</button>
        </div>
      </main>
    `;
  }

  return `
    <main>
      <div class="hero">
        <h1>${game.title}</h1>
        <p>${game.description}</p>
      </div>

      <section class="section">
        <div class="card">
          <div class="game-info-header">
            <div class="game-card-image large ${game.image}"></div>
            <div class="game-info-overview">
              <div class="game-meta">
                <span class="game-genre">${game.genre}</span>
                <span class="game-difficulty">${game.difficulty}</span>
              </div>
              <h2>Game Overview</h2>
              <p>${game.description}</p>
              <div class="game-actions">
                <button class="btn btn-primary" data-route="upload" data-game-id="${gameId}">
                  Upload Save File
                </button>
                <button class="btn btn-secondary" data-route="games">
                  Back to Games
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="features-grid">
          <div class="card">
            <h3>Supported Features</h3>
            <ul class="features-list">
              ${game.features.map(feature => `
                <li>✓ ${feature}</li>
              `).join('')}
            </ul>
          </div>
          
          <div class="card">
            <h3>File Information</h3>
            <div class="file-info">
              <div class="info-item">
                <strong>Supported Formats:</strong>
                <span>${game.supportedFormats.join(', ')}</span>
              </div>
              <div class="info-item">
                <strong>Difficulty:</strong>
                <span>${game.difficulty}</span>
              </div>
              <div class="info-item">
                <strong>Genre:</strong>
                <span>${game.genre}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="card">
          <h3>Upload Tips</h3>
          <div class="tips-list">
            ${game.tips.map(tip => `
              <div class="tip-item">
                <span class="tip-icon">💡</span>
                <span>${tip}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="card" style="text-align: center;">
          <h3>Ready to Analyze Your Progress?</h3>
          <p>Upload your save file to see detailed statistics and completion data.</p>
          <button class="btn btn-primary" data-route="upload" data-game-id="${gameId}" style="margin-top: 1rem;">
            Upload Your Save File
          </button>
          <button class="btn btn-secondary" data-route="spirits-library">
   Browse Spirits Library
 </button>
        </div>
      </section>
    </main>

    <style>
      .game-info-header {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        align-items: start;
      }

      .game-card-image.large {
        width: 100%;
        height: 300px;
        border-radius: var(--border-radius);
      }

      .game-info-overview h2 {
        margin: 0 0 1rem 0;
        color: var(--text-color);
      }

      .game-meta {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .game-genre, .game-difficulty {
        background: var(--primary-color);
        color: white;
        padding: 0.4rem 1rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 500;
      }

      .game-difficulty {
        background: var(--secondary-color);
      }

      .game-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }

      .features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
      }

      .features-list li {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-secondary);
      }

      .features-list li:last-child {
        border-bottom: none;
      }

      .file-info {
        margin-top: 1rem;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
      }

      .info-item:last-child {
        border-bottom: none;
      }

      .tips-list {
        margin-top: 1rem;
      }

      .tip-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
      }

      .tip-item:last-child {
        border-bottom: none;
      }

      .tip-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      @media (max-width: 768px) {
        .game-info-header {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .features-grid {
          grid-template-columns: 1fr;
        }

        .game-actions {
          flex-direction: column;
        }

        .info-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
      }
    </style>
  `;
}

window.loadGameAnalysis = async function(gameDocId) {
  try {
    console.log('Loading game analysis for doc:', gameDocId);
    
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    
    if (!currentUser) {
      document.getElementById('game-analysis-content').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <p>Please log in to view game analysis.</p>
          <button class="btn btn-primary" data-route="login">Login</button>
        </div>
      `;
      return;
    }

    const gameDoc = await db.collection('users').doc(currentUser.uid).collection('games').doc(gameDocId).get();
    
    if (!gameDoc.exists) {
      document.getElementById('game-analysis-content').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <p>Game data not found.</p>
          <button class="btn btn-primary" data-route="profile">Back to Profile</button>
        </div>
      `;
      return;
    }

    const gameData = gameDoc.data();
    console.log('Loaded game data structure:', {
      gameId: gameData.gameId,
      hasAnalysisData: !!gameData.analysisData,
      analysisDataType: typeof gameData.analysisData,
      completion: gameData.completion,
      fullData: gameData
    });
    
    // تحقق من وجود البيانات وتحليلها بشكل صحيح
    if (gameData.gameId === 'hollow-knight' && gameData.analysisData) {
      console.log('Displaying Hollow Knight analysis');
      console.log('Hollow Knight analysis data keys:', Object.keys(gameData.analysisData));
      console.log('Stats data:', gameData.analysisData.stats);
      console.log('Abilities data:', gameData.analysisData.abilities);
      
      displayHollowKnightAnalysis(gameData.analysisData, gameData);
    } 
    else if (gameData.gameId === 'ender-lilies' && gameData.analysisData) {
      console.log('Displaying Ender Lilies analysis');
      displayEnderLiliesAnalysis(gameData.analysisData, gameData);
    }
    else {
      console.log('No detailed analysis available or data structure issue');
      
      // عرض البيانات الخام للتصحيح
      document.getElementById('game-analysis-content').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <h3>${gameData.gameName}</h3>
          <p>Completion: ${gameData.completion}</p>
          <p>File: ${gameData.fileName}</p>
          <p>Uploaded: ${gameData.uploadedAt ? new Date(gameData.uploadedAt.toDate()).toLocaleDateString() : 'Unknown'}</p>
          
          <div style="margin-top: 2rem; text-align: left; background: var(--bg-color); padding: 1rem; border-radius: var(--border-radius);">
            <h4>Debug Information:</h4>
            <pre style="font-size: 0.8rem; overflow: auto; max-height: 300px;">
Game ID: ${gameData.gameId}
Has Analysis Data: ${!!gameData.analysisData}
Analysis Data Type: ${typeof gameData.analysisData}
Completion: ${gameData.completion}

Raw Analysis Data:
${JSON.stringify(gameData.analysisData, null, 2)}
            </pre>
          </div>
          
          <button class="btn btn-primary" data-route="profile" style="margin-top: 1rem;">Back to Profile</button>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error loading game analysis:', error);
    document.getElementById('game-analysis-content').innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <p>Error loading game analysis: ${error.message}</p>
        <pre style="text-align: left; background: var(--bg-color); padding: 1rem; border-radius: var(--border-radius); margin: 1rem 0;">
${error.stack}
        </pre>
        <button class="btn btn-primary" data-route="profile">Back to Profile</button>
      </div>
    `;
  }
}

// game-detail.js

function displayHollowKnightAnalysis(analysisData, gameData) {
  console.log('Hollow Knight analysis data:', analysisData);

  let uploadedDate = 'Unknown';
  
  // تحقق من وجود البيانات 
  if (!analysisData) {
    document.getElementById('game-analysis-content').innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <p>No analysis data available for this save file.</p>
        <button class="btn btn-primary" data-route="profile">Back to Profile</button>
      </div>
    `;
    return;
  }

  // 🛠️ الحل: فك تغليف البيانات الفعلية من الخاصية المتداخلة "analysisData" 
  // إذا كانت الخاصية موجودة (لأنه تم حفظ الكائن المتداخل بالكامل)، وإلا استخدم الكائن الحالي.
  const actualAnalysisData = analysisData.analysisData || analysisData; 
  
  const stats = actualAnalysisData.stats || {}; // الآن ستعمل بشكل صحيح
  const abilities = actualAnalysisData.abilities || {};
  const charms = actualAnalysisData.charms || {};
  const bosses = actualAnalysisData.bosses || {};
  const collectibles = actualAnalysisData.collectibles || {};
  const questStatus = actualAnalysisData.questStatus || {};
  
  // ... بقية الدالة

  // Ensure charms list exists
  const charmsList = charms.List || [];
  
  // Create a list of major achievements
  const majorAchievements = [
    {
      name: "Colosseum of Fools - Bronze",
      completed: bosses["Colosseum Trial 1 (Bronze) Completed"] || false,
      description: "Complete the first Colosseum trial"
    },
    {
      name: "Colosseum of Fools - Silver", 
      completed: bosses["Colosseum Trial 2 (Silver) Completed"] || false,
      description: "Complete the second Colosseum trial"
    },
    {
      name: "Colosseum of Fools - Gold",
      completed: bosses["Colosseum Trial 3 (Gold) Completed"] || false,
      description: "Complete the third Colosseum trial"
    },
    {
      name: "Dreamers Awakened",
      completed: (bosses["Dreamers Defeated Count"] || 0) >= 3,
      description: "Defeat all three Dreamers"
    },
    {
      name: "Hollow Knight Defeated",
      completed: bosses["Hollow Knight Boss Defeated"] || false,
      description: "Defeat the Hollow Knight"
    },
    {
      name: "Radiance Defeated",
      completed: bosses["Radiance Boss Defeated"] || false,
      description: "Defeat the Radiance"
    },
    {
      name: "All Charms Collected",
      completed: charms["All Charms Collected"] || false,
      description: "Collect all charms"
    },
    {
      name: "Grub Rescue",
      completed: (collectibles["Grub Count"] || 0) >= 46,
      description: "Rescue all 46 grubs"
    },
    {
      name: "Nail Fully Upgraded",
      completed: (stats["Nail Damage"] || 0) >= 21,
      description: "Fully upgrade your nail"
    },
    {
      name: "Map Completion",
      completed: (stats["Completion Percentage (%)"] || 0) >= 100,
      description: "Achieve 100% completion"
    }
  ];

  const completedAchievements = majorAchievements.filter(ach => ach.completed).length;

  // List of main defeated bosses
  const defeatedBosses = [
    {
      name: "False Knight",
      defeated: bosses["False Knight Defeated"] || false,
      area: "Forgotten Crossroads",
      difficulty: "Easy"
    },
    {
      name: "Hornet (Greenpath)",
      defeated: bosses["Hornet 1 (Greenpath) Defeated"] || false,
      area: "Greenpath", 
      difficulty: "Medium"
    },
    {
      name: "Mantis Lords",
      defeated: bosses["Mantis Lords Defeated"] || false,
      area: "Fungal Wastes",
      difficulty: "Medium"
    },
    {
      name: "Soul Master",
      defeated: bosses["Soul Master Defeated"] || false,
      area: "Soul Sanctum",
      difficulty: "Medium"
    },
    {
      name: "Brooding Mawlek",
      defeated: bosses["Mawlek (Brooding) Defeated"] || false,
      area: "Forgotten Crossroads",
      difficulty: "Medium"
    },
    {
      name: "Dung Defender",
      defeated: bosses["Dung Defender Defeated"] || false,
      area: "Royal Waterways", 
      difficulty: "Medium"
    },
    {
      name: "Broken Vessel",
      defeated: bosses["Broken Vessel Defeated"] || false,
      area: "Ancient Basin",
      difficulty: "Hard"
    },
    {
      name: "Watcher Knights",
      defeated: bosses["Watcher Knights Defeated"] || false,
      area: "Watcher's Spire",
      difficulty: "Hard"
    },
    {
      name: "Uumuu",
      defeated: bosses["Uumuu Defeated"] || false,
      area: "Teacher's Archives",
      difficulty: "Medium"
    },
    {
      name: "Hornet (Kingdom's Edge)",
      defeated: bosses["Hornet 2 (Kingdom's Edge) Defeated"] || false,
      area: "Kingdom's Edge",
      difficulty: "Hard"
    },
    {
      name: "Traitor Lord",
      defeated: bosses["Traitor Lord Defeated"] || false,
      area: "Queen's Gardens",
      difficulty: "Hard"
    },
    {
      name: "Hive Knight",
      defeated: bosses["Hive Knight Defeated"] || false,
      area: "The Hive",
      difficulty: "Hard"
    },
    {
      name: "The Collector",
      defeated: bosses["The Collector Defeated"] || false,
      area: "Tower of Love",
      difficulty: "Medium"
    },
    {
      name: "Gruz Mother",
      defeated: bosses["Gruz Mother Defeated"] || false,
      area: "Forgotten Crossroads",
      difficulty: "Easy"
    },
    {
      name: "Flukemarm",
      defeated: bosses["Flukemarm Defeated"] || false,
      area: "Royal Waterways",
      difficulty: "Medium"
    },
    {
      name: "Dreamers",
      defeated: (bosses["Dreamers Defeated Count"] || 0) >= 3,
      area: "Various",
      difficulty: "Hard",
      count: bosses["Dreamers Defeated Count"] || 0
    },
    {
      name: "Hollow Knight",
      defeated: bosses["Hollow Knight Boss Defeated"] || false,
      area: "Black Egg Temple",
      difficulty: "Very Hard"
    },
    {
      name: "The Radiance",
      defeated: bosses["Radiance Boss Defeated"] || false,
      area: "Dream Realm",
      difficulty: "Extreme"
    }
  ];

  // Dream Bosses
  const dreamBosses = [
    {
      name: "Grey Prince Zote",
      defeated: bosses["Grey Prince Zote Defeated"] || false,
      area: "Dirtmouth",
      difficulty: "Very Hard"
    },
    {
      name: "White Defender",
      defeated: bosses["White Defender Defeated"] || false,
      area: "Royal Waterways",
      difficulty: "Very Hard"
    },
    {
      name: "Nightmare King Grimm",
      defeated: bosses["Nightmare King Grimm Defeated"] || false,
      area: "Grimm Troupe",
      difficulty: "Extreme"
    }
  ];

  // Dream Warriors
  const dreamWarriors = [
    {
      name: "Xero",
      defeated: bosses["Dream Warrior Xero Defeated"] || false,
      area: "Resting Grounds",
      difficulty: "Medium"
    },
    {
      name: "Gorb",
      defeated: bosses["Dream Warrior Gorb Defeated"] || false,
      area: "Howling Cliffs", 
      difficulty: "Medium"
    },
    {
      name: "Elder Hu",
      defeated: bosses["Dream Warrior Elder Hu Defeated"] || false,
      area: "Fungal Wastes",
      difficulty: "Medium"
    },
    {
      name: "Markoth",
      defeated: bosses["Dream Warrior Markoth Defeated"] || false,
      area: "Kingdom's Edge",
      difficulty: "Hard"
    },
    {
      name: "Marmu",
      defeated: bosses["Dream Warrior Marmu Defeated"] || false,
      area: "Queen's Gardens",
      difficulty: "Medium"
    },
    {
      name: "No Eyes",
      defeated: bosses["Dream Warrior No Eyes Defeated"] || false,
      area: "Greenpath",
      difficulty: "Medium"
    },
    {
      name: "Galien",
      defeated: bosses["Dream Warrior Galien Defeated"] || false,
      area: "Deepnest",
      difficulty: "Hard"
    }
  ];

  const totalBosses = defeatedBosses.length + dreamBosses.length + dreamWarriors.length;
  const defeatedBossesCount = [
    ...defeatedBosses,
    ...dreamBosses, 
    ...dreamWarriors
  ].filter(boss => boss.defeated).length;

  const content = `
    <div class="game-analysis">
      <div class="analysis-header">
        <h2>${gameData.gameName} - Progress Analysis</h2>
        <div class="completion-badge">
          <span class="completion-percent">${gameData.completion}</span>
          <span>Overall Completion</span>
        </div>
      </div>

      <div class="file-info" style="background: var(--bg-color); padding: 1rem; border-radius: var(--border-radius); margin-bottom: 2rem;">
        <p><strong>File:</strong> ${gameData.fileName}</p>
        <p><strong>Uploaded:</strong> ${uploadedDate}</p>
      </div>

      <div class="quick-stats">
        <div class="stat-card quick">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">${Math.round((stats["Play Time (seconds)"] || 0) / 3600 * 10) / 10}h</div>
          <div class="stat-label">Play Time</div>
        </div>
        <div class="stat-card quick">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${defeatedBossesCount}/${totalBosses}</div>
          <div class="stat-label">Bosses Defeated</div>
        </div>
        <div class="stat-card quick">
          <div class="stat-icon">✨</div>
          <div class="stat-value">${charmsList.filter(c => c.got).length}</div>
          <div class="stat-label">Charms Found</div>
        </div>
        <div class="stat-card quick">
          <div class="stat-icon">🐛</div>
          <div class="stat-value">${collectibles["Grub Count"] || 0}</div>
          <div class="stat-label">Grubs Rescued</div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Basic Stats</h3>
          <div class="stat-item">
            <span>Play Time:</span>
            <span>${Math.round((stats["Play Time (seconds)"] || 0) / 3600 * 10) / 10} hours</span>
          </div>
          <div class="stat-item">
            <span>Geo:</span>
            <span>${(stats["Current Geo"] || 0).toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span>Health:</span>
            <span>${stats["Current Health"] || 0}/${stats["Max Health (Masks)"] || 0}</span>
          </div>
          <div class="stat-item">
            <span>Soul Vessels:</span>
            <span>${stats["Vessel Fragments Collected"] || 0}/3</span>
          </div>
          <div class="stat-item">
            <span>Nail Damage:</span>
            <span>${stats["Nail Damage"] || 0}</span>
          </div>
        </div>

        <div class="stat-card">
          <h3>Abilities</h3>
          <div class="abilities-list">
            ${Object.entries(abilities).map(([ability, unlocked]) => `
              <div class="ability-item ${unlocked ? 'unlocked' : 'locked'}">
                <span class="ability-icon">${unlocked ? '✓' : '✗'}</span>
                <span class="ability-name">${ability}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="stat-card">
          <h3>Charms</h3>
          <div class="stat-item">
            <span>Collected:</span>
            <span>${charmsList.filter(c => c.got).length}/${charmsList.length}</span>
          </div>
          <div class="stat-item">
            <span>Charm Slots:</span>
            <span>${charms["Charm Slots Unlocked"] || 0}</span>
          </div>
          <div class="charms-grid">
            ${charmsList.slice(0, 10).map(charm => `
              <div class="charm-item ${charm.got ? 'collected' : 'missing'}">
                <span class="charm-name">${charm.name}</span>
                ${charm.got ? `<span class="charm-cost">${charm.cost}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="stat-card">
          <h3>Collectibles</h3>
          <div class="stat-item">
            <span>Grubs Rescued:</span>
            <span>${collectibles["Grub Count"] || 0}/46</span>
          </div>
          <div class="stat-item">
            <span>Dream Orbs:</span>
            <span>${stats["Essence (Dream Orbs)"] || 0}</span>
          </div>
          <div class="stat-item">
            <span>Pale Ore:</span>
            <span>${stats["Pale Ore"] || 0}</span>
          </div>
          <div class="stat-item">
            <span>Simple Keys:</span>
            <span>${stats["Simple Keys"] || 0}</span>
          </div>
        </div>
      </div>

      <div class="bosses-section">
        <h3>Defeated Bosses & Enemies</h3>
        
        <div class="bosses-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(defeatedBossesCount / totalBosses) * 100}%"></div>
          </div>
          <span class="progress-text">${defeatedBossesCount}/${totalBosses} Bosses Defeated</span>
        </div>

        <div class="boss-category">
          <h4>Main Bosses</h4>
          <div class="bosses-grid">
            ${defeatedBosses.map(boss => `
              <div class="boss-card ${boss.defeated ? 'defeated' : 'pending'}">
                <div class="boss-header">
                  <span class="boss-name">${boss.name}</span>
                  <span class="boss-difficulty ${boss.difficulty.toLowerCase().replace(' ', '-')}">${boss.difficulty}</span>
                </div>
                <div class="boss-area">${boss.area}</div>
                <div class="boss-status">
                  ${boss.defeated ? 
                    (boss.name === "Dreamers" ? 
                      `<span class="dreamers-count">${boss.count}/3</span>` : 
                      '<span class="status-badge defeated">✓ Defeated</span>'
                    ) : 
                    '<span class="status-badge pending">✗ Pending</span>'
                  }
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="boss-category">
          <h4>Dream Bosses</h4>
          <div class="bosses-grid">
            ${dreamBosses.map(boss => `
              <div class="boss-card ${boss.defeated ? 'defeated' : 'pending'} dream-boss">
                <div class="boss-header">
                  <span class="boss-name">${boss.name}</span>
                  <span class="boss-difficulty ${boss.difficulty.toLowerCase().replace(' ', '-')}">${boss.difficulty}</span>
                </div>
                <div class="boss-area">${boss.area}</div>
                <div class="boss-status">
                  ${boss.defeated ? 
                    '<span class="status-badge defeated">✓ Defeated</span>' : 
                    '<span class="status-badge pending">✗ Pending</span>'
                  }
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="boss-category">
          <h4>Dream Warriors</h4>
          <div class="bosses-grid compact">
            ${dreamWarriors.map(boss => `
              <div class="boss-card ${boss.defeated ? 'defeated' : 'pending'} dream-warrior">
                <div class="boss-header">
                  <span class="boss-name">${boss.name}</span>
                  <span class="boss-difficulty ${boss.difficulty.toLowerCase().replace(' ', '-')}">${boss.difficulty}</span>
                </div>
                <div class="boss-area">${boss.area}</div>
                <div class="boss-status">
                  ${boss.defeated ? 
                    '<span class="status-badge defeated">✓</span>' : 
                    '<span class="status-badge pending">✗</span>'
                  }
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="achievements-section">
        <h3>Major Achievements</h3>
        <div class="achievement-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(completedAchievements / majorAchievements.length) * 100}%"></div>
          </div>
          <span class="progress-text">${completedAchievements}/${majorAchievements.length} Achievements Completed</span>
        </div>
        <div class="achievements-grid">
          ${majorAchievements.map(achievement => `
            <div class="achievement-item ${achievement.completed ? 'completed' : 'pending'}">
              <div class="achievement-icon">
                ${achievement.completed ? '🏆' : '🎯'}
              </div>
              <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
              </div>
              <div class="achievement-status">
                ${achievement.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="text-align: center; margin-top: 2rem;">
        <button class="btn btn-primary" data-route="profile">Back to Profile</button>
      </div>
    </div>

    <style>
      /* Quick Stats Styling */
      .quick-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .stat-card.quick {
        text-align: center;
        padding: 1.5rem 1rem;
        background: var(--bg-color);
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
      }

      .stat-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .stat-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }

      /* Bosses Section Styling */
      .bosses-section {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--bg-color);
        border-radius: var(--border-radius);
      }

      .bosses-progress {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .boss-category {
        margin-bottom: 2rem;
      }

      .boss-category h4 {
        margin: 0 0 1rem 0;
        color: var(--text-color);
        font-size: 1.1rem;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem;
      }

      .bosses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }

      .bosses-grid.compact {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }

      .boss-card {
        padding: 1rem;
        border-radius: var(--border-radius);
        border: 2px solid var(--border-color);
        transition: all 0.3s ease;
      }

      .boss-card.defeated {
        border-color: var(--success-color);
        background: linear-gradient(135deg, var(--success-light) 0%, rgba(76, 175, 80, 0.1) 100%);
      }

      .boss-card.pending {
        border-color: var(--border-color);
        background: var(--bg-color);
        opacity: 0.7;
      }

      .boss-card.dream-boss {
        border-left: 4px solid #9c27b0;
      }

      .boss-card.dream-warrior {
        border-left: 4px solid #ff9800;
      }

      .boss-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }

      .boss-name {
        font-weight: 600;
        color: var(--text-color);
        font-size: 0.95rem;
      }

      .boss-difficulty {
        font-size: 0.7rem;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
        font-weight: 600;
      }

      .boss-difficulty.easy {
        background: #4caf50;
        color: white;
      }

      .boss-difficulty.medium {
        background: #ff9800;
        color: white;
      }

      .boss-difficulty.hard {
        background: #f44336;
        color: white;
      }

      .boss-difficulty.very-hard {
        background: #9c27b0;
        color: white;
      }

      .boss-difficulty.extreme {
        background: #673ab7;
        color: white;
      }

      .boss-area {
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 0.75rem;
      }

      .boss-status {
        text-align: right;
      }

      .status-badge {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
        border-radius: 1rem;
        font-weight: 600;
      }

      .status-badge.defeated {
        background: var(--success-color);
        color: white;
      }

      .status-badge.pending {
        background: var(--error-color);
        color: white;
      }

      .dreamers-count {
        font-size: 0.8rem;
        color: var(--primary-color);
        font-weight: 600;
      }

      /* General Styles (as in original) */
      .abilities-list {
        max-height: 200px;
        overflow-y: auto;
      }

      .ability-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
      }

      .ability-item.unlocked .ability-icon {
        color: var(--success-color);
      }

      .ability-item.locked .ability-icon {
        color: var(--error-color);
      }

      .charms-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .charm-item {
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        display: flex;
        justify-content: space-between;
      }

      .charm-item.collected {
        background: var(--success-light);
        border: 1px solid var(--success-color);
      }

      .charm-item.missing {
        background: var(--error-light);
        border: 1px solid var(--error-color);
        opacity: 0.6;
      }

      .charm-cost {
        font-weight: bold;
        color: var(--primary-color);
      }

      .progress-bar {
        flex: 1;
        height: 8px;
        background: var(--border-color);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: var(--primary-color);
        transition: width 0.3s ease;
      }

      .progress-text {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: 500;
      }

      .achievements-section {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--bg-color);
        border-radius: var(--border-radius);
      }

      .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }

      .achievement-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: var(--border-radius);
        border: 2px solid var(--border-color);
        transition: all 0.3s ease;
      }

      .achievement-item.completed {
        border-color: var(--success-color);
        background: var(--success-light);
      }

      .achievement-item.pending {
        border-color: var(--border-color);
        background: var(--bg-color);
        opacity: 0.7;
      }

      .achievement-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
      }

      .achievement-info {
        flex: 1;
      }

      .achievement-name {
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 0.25rem;
      }

      .achievement-desc {
        font-size: 0.85rem;
        color: var(--text-secondary);
      }

      .achievement-status {
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        background: var(--border-color);
        color: var(--text-secondary);
      }

      .achievement-item.completed .achievement-status {
        background: var(--success-color);
        color: white;
      }

      @media (max-width: 768px) {
        .quick-stats {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .bosses-grid {
          grid-template-columns: 1fr;
        }
        
        .achievements-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;

  document.getElementById('game-analysis-content').innerHTML = content;

  // Add event listeners for buttons
  const backButton = document.querySelector('button[data-route="profile"]');
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigate('profile');
    });
  }
}


// In game-detail.js - Update displayEnderLiliesAnalysis function
function displayEnderLiliesAnalysis(analysisData, gameData) {
  // حساب العدد الإجمالي للأرواح من البيانات
  const totalSpirits = 26; // العدد الإجمالي للأرواح في اللعبة
  
  // التعامل مع uploadedAt بشكل آمن
  let uploadedDate = 'Unknown';
  if (gameData.uploadedAt) {
    if (typeof gameData.uploadedAt.toDate === 'function') {
      // إذا كان Timestamp من Firestore
      uploadedDate = new Date(gameData.uploadedAt.toDate()).toLocaleString();
    } else if (typeof gameData.uploadedAt === 'string') {
      // إذا كان سلسلة نصية
      uploadedDate = new Date(gameData.uploadedAt).toLocaleString();
    } else if (gameData.uploadedAt.seconds) {
      // إذا كان كائن Timestamp مع خاصية seconds
      uploadedDate = new Date(gameData.uploadedAt.seconds * 1000).toLocaleString();
    } else {
      // إذا كان كائن Date عادي
      uploadedDate = new Date(gameData.uploadedAt).toLocaleString();
    }
  }

  const content = `
    <div class="game-analysis">
      <div class="analysis-header">
        <h2>${gameData.gameName} - Progress Analysis</h2>
        <div class="completion-badge">
          <span class="completion-percent">${analysisData.completion}%</span>
          <span>Overall Completion</span>
        </div>
      </div>

      <div class="file-info" style="background: var(--bg-color); padding: 1rem; border-radius: var(--border-radius); margin-bottom: 2rem;">
        <p><strong>File:</strong> ${gameData.fileName}</p>
        <p><strong>Uploaded:</strong> ${uploadedDate}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Player Stats</h3>
          <div class="stat-item">
            <span>Level:</span>
            <span>${analysisData.level}</span>
          </div>
          <div class="stat-item">
            <span>EXP:</span>
            <span>${analysisData.exp.toLocaleString()}</span>
          </div>
          <div class="stat-item">
            <span>Heal Power:</span>
            <span>${analysisData.healPower}</span>
          </div>
          <div class="stat-item">
            <span>Current Heals:</span>
            <span>${analysisData.currentHeals}</span>
          </div>
          <div class="stat-item">
            <span>Play Time:</span>
            <span>${analysisData.playTime} hours</span>
          </div>
        </div>

        <div class="stat-card">
          <h3>Currencies</h3>
          <div class="stat-item">
            <span>Spirit Lv1:</span>
            <span>${analysisData.currencies.spiritLv1}</span>
          </div>
          <div class="stat-item">
            <span>Spirit Lv2:</span>
            <span>${analysisData.currencies.spiritLv2}</span>
          </div>
          <div class="stat-item">
            <span>Spirit Lv3:</span>
            <span>${analysisData.currencies.spiritLv3}</span>
          </div>
        </div>

        <div class="stat-card">
          <h3>Spirits</h3>
          <div class="stat-item">
            <span>Collected:</span>
            <span>${analysisData.spirits.length}/${totalSpirits}</span> 
          </div>
          <div class="spirits-list">
            ${analysisData.spirits.map(spirit => `
              <div class="spirit-item">
                <span class="spirit-name">${spirit.name}</span>
                <span class="spirit-level">Lv. ${spirit.level}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="stat-card">
          <h3>Passives</h3>
          <div class="stat-item">
            <span>Unlocked:</span>
            <span>${analysisData.passives.length}/16</span>
          </div>
          <div class="passives-list">
            ${analysisData.passives.map(passive => `
              <div class="passive-item">${passive.name}</div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="progress-section">
        <h3>Areas Discovered</h3>
        <div class="areas-grid">
          ${analysisData.openedAreas.map(area => `
            <div class="area-item">${area.name}</div>
          `).join('')}
        </div>
      </div>

      <div class="achievements-section">
        <h3>Achievements</h3>
        <div class="achievements-grid">
          ${analysisData.achievements.map(achievement => {
            // إضافة صنف خاص للإنجازات الذهبية
            const isGolden = ( achievement.id === 'EZenithAchievement::Ending_B' || achievement.id === 'EZenithAchievement::Ending_A'
              || achievement.id === 'EZenithAchievement::Ending_C' || achievement.id === 'EZenithAchievement::PlayerLevel_100'
            ) ? ' golden-achievement' : '';
            return `
              <div class="achievement-item${isGolden}">${achievement.name}</div>
            `;
          }).join('')}
        </div>
      </div>

      <div style="text-align: center; margin-top: 2rem;">
        <button class="btn btn-primary" data-route="profile">Back to Profile</button>
        <button class="btn btn-secondary" data-route="spirits-library" style="margin-left: 1rem;">
          Browse Spirits Library
        </button>
      </div>
    </div>
  `;

  document.getElementById('game-analysis-content').innerHTML = content;

  // إضافة event listeners للأزرار
  const backButton = document.querySelector('button[data-route="profile"]');
  const spiritsButton = document.querySelector('button[data-route="spirits-library"]');
  
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigate('profile');
    });
  }
  
  if (spiritsButton) {
    spiritsButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.navigate('spirits-library');
    });
  }
}