// spirits-library.js
export function renderSpiritsLibraryPage(currentUser, gameId = 'ender-lilies') {
  return `
    <main>
      <div class="hero">
        <h1>Ender Lilies - Spirits Library</h1>
        <p>Complete collection of all spirits available in Ender Lilies</p>
      </div>

      <section class="section">
        <div class="card">
          <div class="library-filters">
            
            <div class="filter-group">
              <label for="spirit-availability">Availability:</label>
              <select id="spirit-availability" class="filter-select">
                <option value="all">All</option>
                <option value="collected">Collected</option>
                <option value="missing">Missing</option>
              </select>
            </div>
            <div class="search-group">
              <input type="text" id="spirit-search" placeholder="Search spirits..." class="search-input">
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="spirits-stats">
          <div class="stat-card">
            <div class="stat-value" id="total-spirits">0</div>
            <div class="stat-label">Total Spirits</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="collected-spirits">0</div>
            <div class="stat-label">Collected</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="completion-rate">0%</div>
            <div class="stat-label">Completion</div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="spirits-grid" id="spirits-grid">
          <!-- سيتم ملء الأرواح ديناميكياً -->
          <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
            <p>Loading spirits library...</p>
          </div>
        </div>
      </section>
    </main>

    <style>
      .library-filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        align-items: end;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .filter-group label {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 0.9rem;
      }

      .filter-select,
      .search-input {
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
        transition: var(--transition);
      }

      .filter-select:focus,
      .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .search-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .spirits-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .spirits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }

      .spirit-card {
        background: var(--card-bg);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        box-shadow: var(--shadow-md);
        transition: var(--transition);
        border: 2px solid transparent;
        cursor: pointer;
      }

      .spirit-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      .spirit-card.collected {
        border-color: var(--primary-color);
      }

      .spirit-card.missing {
        opacity: 0.7;
      }

      .spirit-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .spirit-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        flex-shrink: 0;
        border: 2px solid var(--border-color);
      }

      .spirit-icon.missing {
        background: #f8f9fa;
        color: var(--text-secondary);
      }

      .spirit-info {
        flex: 1;
      }

      .spirit-name {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
        color: var(--text-primary);
      }

      .spirit-type {
        font-size: 0.75rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
      }

      .spirit-image {
        width: 100%;
        height: 180px;
        border-radius: var(--border-radius);
        background: linear-gradient(135deg, var(--bg-color) 0%, #f0f0f0 100%);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        font-size: 0.9rem;
        border: 1px solid var(--border-color);
      }

      .spirit-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--border-radius);
      }

      .spirit-description {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .spirit-status {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .status-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .status-badge.collected {
        background: var(--primary-color);
        color: white;
      }

      .status-badge.missing {
        background: var(--border-color);
        color: var(--text-secondary);
      }

      .spirit-location {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
      }

      .location-title {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
        text-align: center;
      }

      .location-info {
        font-size: 0.9rem;
        color: var(--text-secondary);
        text-align: center;
        line-height: 1.5;
      }

      @media (max-width: 768px) {
        .library-filters {
          grid-template-columns: 1fr;
        }

        .spirits-grid {
          grid-template-columns: 1fr;
        }

        .spirit-header {
          flex-direction: column;
          text-align: center;
        }

        .spirit-stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}

// صفحة تفاصيل الروح
export function renderSpiritDetailPage(currentUser, spiritId) {
  return `
    <main>
      <div class="hero">
        <h1 id="spirit-detail-name">Loading...</h1>
        <p id="spirit-detail-type">Spirit Details</p>
      </div>

      <section class="section">
        <div class="card">
          <div id="spirit-detail-content">
            <div style="text-align: center; padding: 2rem;">
              <p>Loading spirit details...</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <style>
      .spirit-detail-container {
        max-width: 100%;
      }

      .spirit-detail-header {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
        align-items: start;
      }

      .spirit-detail-image {
        width: 100%;
        height: 400px;
        border-radius: var(--border-radius);
        background: linear-gradient(135deg, var(--bg-color) 0%, #f0f0f0 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        font-size: 1rem;
        border: 1px solid var(--border-color);
      }

      .spirit-detail-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--border-radius);
      }

      .spirit-detail-basic-info {
        flex: 1;
      }

      .spirit-detail-name {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      .spirit-detail-type {
        font-size: 1rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .spirit-detail-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }

      .spirit-detail-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .detail-stat-item {
        background: var(--bg-color);
        padding: 1rem;
        border-radius: var(--border-radius);
        text-align: center;
      }

      .detail-stat-label {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }

      .detail-stat-value {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--text-primary);
      }

      .spirit-detail-section {
        margin-bottom: 3rem;
      }

      .section-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--text-primary);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem;
      }

      .section-content {
        line-height: 1.7;
        color: var(--text-secondary);
      }

      .section-content p {
        margin-bottom: 1rem;
      }

      .lore-section, .history-section, .appearance-section, .personality-section, .abilities-section, .trivia-section {
        background: var(--bg-color);
        padding: 2rem;
        border-radius: var(--border-radius);
        margin-bottom: 2rem;
      }

      .subsection-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 1.5rem 0 0.5rem 0;
        color: var(--text-primary);
      }

      .subsection-title:first-child {
        margin-top: 0;
      }

      .back-button {
        margin-bottom: 2rem;
      }

      .ability-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
      }

      @media (max-width: 768px) {
        .spirit-detail-header {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .spirit-detail-image {
          height: 300px;
        }

        .spirit-detail-stats {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `;
}

// دالة لتحميل وعرض بيانات الأرواح
window.loadSpiritsLibrary = async function(gameDocId = null) {
  try {
    const spiritsData = await getSpiritsData(gameDocId);
    displaySpiritsGrid(spiritsData);
    updateSpiritsStats(spiritsData);
    setupFilters(spiritsData);
  } catch (error) {
    console.error('Error loading spirits library:', error);
    document.getElementById('spirits-grid').innerHTML = `
      <div style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
        <p>Error loading spirits library. Please try again later.</p>
      </div>
    `;
  }
}

// دالة لتحميل تفاصيل الروح
window.loadSpiritDetail = async function(spiritId) {
  try {
    // الحصول على بيانات التفاصيل الأساسية
    const spiritDetailData = await getSpiritDetailData(spiritId);
    
    // الحصول على حالة الجمع من Firebase
    const isCollected = await checkSpiritCollectionStatus(spiritId);
    
    // دمج البيانات
    const spiritData = {
      ...spiritDetailData,
      isCollected: isCollected
    };
    
    displaySpiritDetail(spiritData);
  } catch (error) {
    console.error('Error loading spirit detail:', error);
    document.getElementById('spirit-detail-content').innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <p>Error loading spirit details. Please try again later.</p>
        <button class="btn btn-primary" onclick="window.navigate('spirits-library')">Back to Library</button>
      </div>
    `;
  }
}

// دالة للتحقق من حالة جمع الروح من Firebase
async function checkSpiritCollectionStatus(spiritId) {
  try {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return false;

    const db = firebase.firestore();
    const gamesSnapshot = await db.collection('users').doc(currentUser.uid).collection('games').get();
    
    let isCollected = false;
    
    // التحقق من جميع ألعاب Ender Lilies للمستخدم
    gamesSnapshot.forEach(doc => {
      const gameData = doc.data();
      if (gameData.gameId === 'ender-lilies' && gameData.analysisData && gameData.analysisData.spirits) {
        const collectedSpirits = gameData.analysisData.spirits.map(spirit => spirit.id);
        if (collectedSpirits.includes(spiritId)) {
          isCollected = true;
        }
      }
    });
    
    return isCollected;
  } catch (error) {
    console.error('Error checking spirit collection status:', error);
    return false;
  }
}

// دالة للحصول على بيانات الأرواح
async function getSpiritsData(gameDocId) {
  // جميع أرواح Ender Lilies - مأخوذة من parser
  const allSpirits = [
    {
      id: 's5000',
      name: 'Umbral Knight',
      type: '',
      description: 'A loyal knight spirit who protects Lily throughout her journey.',
      image: 'assets/spirits/Umbral_Knight_img.jpg', 
      icon: 'assets/spirits/Umbral_Knight_Icon.webp',
      location: 'Cathedral - Starting area',
      isCollected: false
    },
    {
      id: 's5010',
      name: 'Guardian Siegrid',
      type: '',
      description: 'A powerful guardian spirit with defensive capabilities.',
      image: 'assets/spirits/Guardian_Siegrid_img.jpg', // TODO: إضافة صورة - assets/spirits/siegrid.jpg
      icon: 'assets/spirits/Guardian_Siegrid_icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Cathedral Cloister',
      isCollected: false
    },
    {
      id: 's5020',
      name: 'Guardian Silva',
      type: '',
      description: 'An agile guardian spirit with swift attacks.',
      image: 'assets/spirits/Guardian_Siegrid_img.jpg', // TODO: إضافة صورة - assets/spirits/silva.jpg
      icon: 'assets/spirits/Guardian_Silva_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Verboten Forest',
      isCollected: false
    },
    {
      id: 's5030',
      name: 'Knight Captain Julius',
      type: '',
      description: 'A noble knight captain spirit with powerful sword techniques.',
      image: 'assets/spirits/Knight_Captain_Julius_img.jpg', // TODO: إضافة صورة - assets/spirits/julius.jpg
      icon: 'assets/spirits/Knight_Captain_Julius_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Ruined Castle - Throne Room',
      isCollected: false
    },
    {
      id: 's5040',
      name: 'Dark Witch Eleine',
      type: '',
      description: 'A mysterious witch spirit with dark magical powers.',
      image: 'assets/spirits/Dark_Witch_Eleine_img.jpg', // TODO: إضافة صورة - assets/spirits/eleine.jpg
      icon: 'assets/spirits/EL_Dark_Witch_Eleine_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Witch\'s Thicket',
      isCollected: false
    },
    {
      id: 's5050',
      name: 'Gerrod, the Elder Warrior',
      type: '',
      description: 'An ancient warrior spirit with immense strength.',
      image: 'assets/spirits/Gerrod_the_Elder_Warrior_img.jpg', // TODO: إضافة صورة - assets/spirits/gerrod.jpg
      icon: 'assets/spirits/Gerrod_the_Elder_Warrior_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Village of the Elder',
      isCollected: false
    },
    {
      id: 's5060',
      name: 'Hoenir, Keeper of the Abyss',
      type: '',
      description: 'A mysterious keeper spirit guarding the depths.',
      image: 'assets/spirits/Hoenir_Keeper_Abyss_img.jpg', 
      icon: 'assets/spirits/Hoenir_Keeper_of_the_Abyss_Icon.webp', 
      location: 'The Depths',
      isCollected: false
    },
    {
      id: 's5070',
      name: 'Ulv, The Mad Knight',
      type: '',
      description: 'A berserker knight spirit consumed by madness.',
      image: 'assets/spirits/ULV_img.jpg', // TODO: إضافة صورة - assets/spirits/ulv.jpg
      icon: 'assets/spirits/Ulv_icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Stockade of Sulfur',
      isCollected: false
    },
    {
      id: 's5080',
      name: 'Faden, the Heretic',
      type: '',
      description: 'A heretical spirit with forbidden knowledge.',
      image: 'assets/spirits/Faden_Heretic_img.jpg', // TODO: إضافة صورة - assets/spirits/faden.jpg
      icon: 'assets/spirits/Faden_the_Heretic_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Subterranean Lab',
      isCollected: false
    },
    {
      id: 's2012',
      name: 'Cliffside Hamlet Youth',
      type: '',
      description: 'A spirit of a youth from the cliffside hamlet.',
      image: 'assets/spirits/Cliffside_Hamlet_Youth_img.jpg', // TODO: إضافة صورة - assets/spirits/hamlet-youth.jpg
      icon: 'assets/spirits/Cliffside_Hamlet_Youth_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Cliffside Hamlet',
      isCollected: false
    },
    {
      id: 's2022',
      name: 'Fallen Archer',
      type: '',
      description: 'A spirit of an archer who fell in battle.',
      image: 'assets/spirits/Fallen_Archer_img.jpg', // TODO: إضافة صورة - assets/spirits/archer.jpg
      icon: 'assets/spirits/Fallen_Archer_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Twin Spires',
      isCollected: false
    },
    {
      id: 's2032',
      name: 'One-Eyed Royal Aegis',
      type: '',
      description: 'A formidable royal guard spirit with enhanced perception.',
      image: 'assets/spirits/One_Eyed_Royal_Aegis_img.jpg', // TODO: إضافة صورة - assets/spirits/aegis.jpg
      icon: 'assets/spirits/One-Eyed_Royal_Aegis_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Royal Garden',
      isCollected: false
    },
    {
      id: 's2072',
      name: 'Hidden Test Subject',
      type: '',
      description: 'A spirit from secret laboratory experiments.',
      image: 'assets/spirits/Hidden_Test_Subject_img.jpg', // TODO: إضافة صورة - assets/spirits/test-subject.jpg
      icon: 'assets/spirits/Hidden_Test_Subject_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Subterranean Lab',
      isCollected: false
    },
    {
      id: 's2092',
      name: 'Chief Guardian',
      type: '',
      description: 'A powerful guardian spirit of ancient ruins.',
      image: 'assets/spirits/Chief_Guardian_img.jpg', // TODO: إضافة صورة - assets/spirits/chief-guardian.jpg
      icon: 'assets/spirits/Chief_Guardian_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Ancient Ruins',
      isCollected: false
    },
    {
      id: 's2102',
      name: 'Western Merchant',
      type: '',
      description: 'A merchant spirit offering rare items.',
      image: 'assets/spirits/Western_Merchant_img.jpg', // TODO: إضافة صورة - assets/spirits/merchant.jpg
      icon: 'assets/spirits/Western_Merchant_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Western Outpost',
      isCollected: false
    },
    {
      id: 's2112',
      name: 'Cliffside Hamlet Elder',
      type: '',
      description: 'An elder spirit with ancient wisdom.',
      image: 'assets/spirits/Cliffside_Hamlet_Elde_img.jpg', // TODO: إضافة صورة - assets/spirits/hamlet-elder.jpg
      icon: 'assets/spirits/Cliffside_Hamlet_Elder_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Cliffside Hamlet',
      isCollected: false
    },
    {
      id: 's2122',
      name: 'Fungal Sorcerer',
      type: '',
      description: 'A sorcerer spirit controlling fungal growth.',
      image: 'assets/spirits/Fungal_Sorcerer_img.jpg', // TODO: إضافة صورة - assets/spirits/fungal-sorcerer.jpg
      icon: 'assets/spirits/Fungal_Sorcerer_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Verboten Forest',
      isCollected: false
    },
    {
      id: 's2132',
      name: 'Floral Sorceress',
      type: '',
      description: 'A sorceress spirit commanding floral magic.',
      image: 'assets/spirits/Floral_Sorceress_img.jpg', // TODO: إضافة صورة - assets/spirits/floral-sorceress.jpg
      icon: 'assets/spirits/Floral_Sorceress_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Royal Garden',
      isCollected: false
    },
    {
      id: 's2162',
      name: 'Elder Crypt Keeper',
      type: '',
      description: 'An ancient spirit guarding sacred crypts.',
      image: 'assets/spirits/Elder_Crypt_Keeper_img.jpg', // TODO: إضافة صورة - assets/spirits/crypt-keeper.jpg
      icon: 'assets/spirits/Elder_Crypt_Keeper_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Ancient Crypts',
      isCollected: false
    },
    {
      id: 's2182',
      name: 'Dark Executioner',
      type: '',
      description: 'A fearsome executioner spirit with a massive axe.',
      image: 'assets/spirits/Dark_Executioner_img.jpg', // TODO: إضافة صورة - assets/spirits/executioner.jpg
      icon: 'assets/spirits/Dark_Executioner_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Execution Grounds',
      isCollected: false
    },
    {
      id: 's2192',
      name: 'Fallen Sentinel',
      type: '',
      description: 'A once-noble sentinel spirit now corrupted.',
      image: 'assets/spirits/Fallen_Sentinel_img.jpg', // TODO: إضافة صورة - assets/spirits/sentinel.jpg
      icon: 'assets/spirits/Fallen_Sentinel_Icon.webp', // TODO: استبدال بأيقونة مخصصة
      location: 'Fallen Citadel',
      isCollected: false
    },
{
  id: 's2002',
  name: 'Headless Defender',
  type: '',
  description: 'A headless guardian spirit still defending its post.',
  image: 'assets/spirits/Headless_Defender_img.jpg', // TODO: إضافة صورة - assets/spirits/headless-defender.jpg
  icon: 'assets/spirits/Headless_Defender_Icon.webp', // TODO: استبدال بأيقونة مخصصة
  location: 'Various areas',
  isCollected: false
},
{
  id: 's2052',
  name: 'Incompetent Sinner',
  type: '',
  description: 'A spirit burdened by past failures and regrets.',
  image: 'assets/spirits/Incompetent_Sinner_img.jpg', // TODO: إضافة صورة - assets/spirits/incompetent-sinner.jpg
  icon: 'assets/spirits/Incompetent_Sinner_Icon.webp', // TODO: استبدال بأيقونة مخصصة
  location: 'Stockade of Sulfur',
  isCollected: false
},
{
  id: 's2082',
  name: 'Castle Town Maiden',
  type: '',
  description: 'A gentle spirit of a maiden from the castle town.',
  image: 'assets/spirits/Castle_Town_Maiden_img.jpg', // TODO: إضافة صورة - assets/spirits/castle-town-maiden.jpg
  icon: 'assets/spirits/Castle_Town_Maiden_Icon.webp', // TODO: استبدال بأيقونة مخصصة
  location: 'Castle Town',
  isCollected: false
},
{
  id: 's2172',
  name: 'Verboten Champion',
  type: '',
  description: 'A powerful champion spirit from the forbidden forest.',
  image: 'assets/spirits/Verboten_Champion_img.jpg', // TODO: إضافة صورة - assets/spirits/verboten-champion.jpg
  icon: 'assets/spirits/Verboten_Champion_Icon.webp', // TODO: استبدال بأيقونة مخصصة
  location: 'Verboten Forest',
  isCollected: false
},
{
  id: 's2232',
  name: 'Forsaken Fellwyrm',
  type: '',
  description: 'A mighty dragon spirit abandoned and forgotten.',
  image: 'assets/spirits/Forsaken_Fellwyrm_img.jpg', // TODO: إضافة صورة - assets/spirits/fellwyrm.jpg
  icon: 'assets/spirits/Forsaken_Fellwyrm_Icon.webp', // TODO: استبدال بأيقونة مخصصة
  location: 'Abyss',
  isCollected: false
}
  ];

  // إذا كان هناك gameDocId، نتحقق من الأرواح المجمعة من Firebase
  if (gameDocId) {
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const db = firebase.firestore();
        const gameDoc = await db.collection('users').doc(currentUser.uid).collection('games').doc(gameDocId).get();
        
        if (gameDoc.exists) {
          const gameData = gameDoc.data();
          if (gameData.analysisData && gameData.analysisData.spirits) {
            const collectedSpirits = gameData.analysisData.spirits.map(spirit => spirit.id);
            
            // تحديث حالة الأرواح المجمعة
            allSpirits.forEach(spirit => {
              spirit.isCollected = collectedSpirits.includes(spirit.id);
            });
          }
        }
      }
    } catch (error) {
      console.error('Error checking collected spirits:', error);
    }
  } else {
    // إذا لم يكن هناك gameDocId، نتحقق من جميع ألعاب المستخدم
    try {
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const db = firebase.firestore();
        const gamesSnapshot = await db.collection('users').doc(currentUser.uid).collection('games').get();
        
        const collectedSpirits = new Set();
        
        // جمع جميع الأرواح المجمعة من جميع ألعاب Ender Lilies
        gamesSnapshot.forEach(doc => {
          const gameData = doc.data();
          if (gameData.gameId === 'ender-lilies' && gameData.analysisData && gameData.analysisData.spirits) {
            gameData.analysisData.spirits.forEach(spirit => {
              collectedSpirits.add(spirit.id);
            });
          }
        });
        
        // تحديث حالة الأرواح المجمعة
        allSpirits.forEach(spirit => {
          spirit.isCollected = collectedSpirits.has(spirit.id);
        });
      }
    } catch (error) {
      console.error('Error checking collected spirits from all games:', error);
    }
  }

  return allSpirits;
}

// دالة للحصول على بيانات تفصيلية للروح
// دالة للحصول على بيانات تفصيلية للروح
async function getSpiritDetailData(spiritId) {
  // بيانات تفصيلية لجميع الأرواح
  const spiritDetails = {
    's5000': {
      id: 's5000',
      name: 'Umbral Knight',
      type: '',
      description: 'A loyal knight spirit who protects Lily throughout her journey.',
      image: 'assets/spirits/Umbral_Knight_img.jpg',
      icon: 'assets/spirits/Umbral_Knight_Icon.webp',
      location: 'Cathedral - Starting area',
      isCollected: false,
      lore: `I lost the priestess that I was meant to protect long ago and have been imprisoned here ever since. Though the Deathless Pact I made with her remained, my body began to fail me with what little strength it had left. ... Once I fell, nothing remained of my era after I awoke.

Ferin is an Ancient who made a Deathless Pact with the first White Priestess of Land's End - the Priestess of the Dawn - in the final moments of their civilization. They were unable to properly protect her as their spirit had begun to deteriorate; it took until the fall of the kingdom for them to regain their strength and awaken. They showed themselves to Lily - one of the only two surviving descendants of the Priestess of the Dawn.`,
      
      history: {
        background: `Ferin was a warrior of the Ancients. They, like many others, wished to enter a Deathless Pact with a White Priestess, but was instead thrown into the war between the Ancients and the settlers from beyond, as the Ancients were pushed underground into the Verboten Domain. Eventually, Ferin and their command Eldred's Guardian took the last priestess and an infant priestess to a chamber hidden deep in the domain. There, the Priestess performed a mutated version of the pact at the cost of her own life (and her warrior, as consequence). This pact was different as it allowed Ferin to keep their physical body, for the time being, as their ward was incapable of utilizing her powers. Ferin fled to the Deadlands with the child, where they hid from the settlers. However, Ferin's body eventually gave out, leaving the child alone, who was then found by the King of the First Age and became the Priestess of the Dawn. Ferin should have awoken as a spirit and stayed by her side, but their spirit remained asleep until the events of the story.`,
        
        chapterOne: `Ferin is Lily's first Spirit, distinctively different from the others as they are capable of speech, higher thought, and have their own desires. Together, the two search for the Priestess of the Fount, and for clues to Lily's missing memories. Throughout their journey, they battle many of the kingdom's fallen champions but are able to prevail and free those trapped by the Blight.`,
        
        endingA: `After defeating Silva, the two are approached by a ghostly image of the Priestess of the Fount, who directs them to the Hinterlands, where resides her 'last purification'. The two travel through the execution grounds (or the Twin Spires) to arrive there. Fretia appears before them again she reveals the current Blight in the kingdom is growing from her body, and she is now using the lilies growing from her body to purify all of Land's End. She then purifies Lily and asks she leave for her own sake; Ferin, however, is unable to leave, and reveals that rather than Lily, they are bound to Fretia. They will remain in Land's End until Fretia's death, but upon then will return to Lily. The two bid each other farewell, for now.`,
        
        endingB: `The two ignore Fretia's warning and instead head to down to the Verboten Domain, then traveling down to the Abyss where they must fight Fretia as the Blighted Lord. As Lily attempts to purify Fretia, she herself becomes one with the Blighted Lord. It is unclear what becomes of Ferin, but as they are bound to the souls of both priestesses, they may have also been pulled into the blight.`,
        
        endingC: `The two choose to ignore Fretia's warning. Throughout their journey, the two had been collecting Stone Tablet Fragments hidden by Faden. Ferin is able to read the ancient writing on the tablets and the two are able to construct the Luminant Aegis Curio, which will prevent Lily from being lost in the Blight when she purifies Fretia. With this amulet, Lily defeats and frees Fretia's soul. In the epilogue, Ferin helps Lily give her sisters and mother a proper burial, they tell her not to fear as they will stay by her side.`
      },
      
      appearance: `Ferin appears as a knight clad in rusted, bloodied armor, a tattered black cloak and always has their helmet covering their face. They are shown to have the same mark on their helmet, a sign of their pact with the White Priestesses of Land's End.

Much like the other spirits, they revert to a floating red orb when not in combat.`,
      
      personality: `Ferin is honor-bound to the priestess of their pact. Although they admit they wanted to free themselves from it, they eventually come to care for Lily. They tell her that she doesn't need to complete this mission for the sake of the kingdom or the Ancients, instead suggesting she search for her memories. They are shown worrying as her health deteriorates, and, in Ending A, they happily allow Lily to leave Land's End while they remain with Fretia.

They don't show any ill will toward the settlers who destroyed their home, simply accepting the outcome. However, they do condemn Julius for killing his kin out of hate and not doing anything to save the people in their final moments. In contrast, they praise warriors such as Gerrod, Eleine, and Hoenir for staying true to their duties even in death.

Ferin prefers warmer climates than that of Land's End.`,
      
      abilities: {
        name: 'Umbral Knight',
        type: 'Main Skill',
        uses: '∞',
        cooldown: '0',
        description: 'Unleashes a flurry of sword attacks. Attack direction can be changed during the advance by moving right or left.',
        flavorText: 'A black-garbed knight awakened from a deep slumber. Though naught but a Blighted Spirit, they still retain some semblance of who they once were.',
        details: `The Umbral Knight is a main skill. It has infinite uses and can be used underwater.

At levels one to two, the Umbral Knight has a three-hit combo.
If performed while standing on the ground, damage scalings for these are 90%, 100%, 110%, respectively.
In air and water scalings drop to 65%, 70%, 85%.

At level three, the Umbral Knight gains an extra attack to the combo, performing a short spin.
Scalings for attacks on the ground change slightly: 90%, 80%, 110%, 120%.
In air and water: 70%, 56%, 85%, 100%.

At level five, the Umbral Knight gains an extra attack to the combo, performing an overhead slash.
On the ground, scalings are 100%, 80%, 110%, 90%, 160%.
In air and water, they become 70%, 56%, 80%, 65%, 120%.

These attacks are all able to hit a very short distance above, below, and behind Lily.

For the Last Rite, the Knight performs five attacks in a square in front of Lily. Each attack has a scaling of 100%.

Before any attack in the combo, Lily can change directions. Additionally, holding a direction while attacking will cause Lily to step forward in that direction. Conversely, holding no direction while attacking will keep Lily in the same spot.

The Umbral Knight requires unique items called Ancient Souls to be enhanced.`
      },
      
      trivia: `Umbra means "shadow" and comes from the Latin word of the same spelling.
The name Ferin comes from Latin ferīnus, from fera which means "wild animal".
The Umbral Knight is only ever referred to in a gender-neutral fashion. Their name, Ferin, is a masculine name in some languages while feminine in others, which only adds to the ambiguity.
In previous versions, the flavor text for the knight was, "A black-garbed knight from beyond Land's End. Though naught but a Blighted Spirit, they still retain some semblance of who they once were".`
    },

    's5010': {
      id: 's5010',
      name: 'Guardian Siegrid',
      type: '',
      description: 'A devoted guardian who protected the church and its inhabitants.',
      image: 'assets/spirits/Guardian_Siegrid.webp',
      icon: 'assets/spirits/Guardian_Siegrid_Icon.webp',
      location: 'Cathedral Cloister',
      isCollected: false,
      lore: `Siegrid tasked herself with watching over Lily and presumably, the other youths in the church. Although she regretted being unable to serve the White Priestess as her guardian, she still resolved to help her in whatever way she could.`,
      
      history: {
        background: `Siegrid was a devoted guardian of the church who watched over Lily and the other youths. She deeply admired the Priestess of the Fount but regretted not being chosen as her personal guardian, a role that went to her sister instead. When the Rain of Death began, she gave Lily sanctuary and took up her weapon to protect the church.`,
        
        battle: `Siegrid is the first boss encountered in the game. She wears nun's garb and wields a flail, with Blighted wings distinguishing her from her sister. The battle has two phases - in her second form at low health, she regains all HP and gains new attacks.`,
        
        defeat: `After being purified, Siegrid expresses regret for not being able to protect Lily properly, showing that even in her Blighted state, her original protective instincts remained.`
      },
      
      appearance: `Siegrid wears traditional nun's garb and wields a flail as her weapon. Her most distinctive feature are her Blighted wings, which set her apart from her sister Silva. She maintains a solemn, devoted appearance even in her corrupted state.`,
      
      personality: `Siegrid was deeply devoted to her duties and cared greatly for those under her protection. She admired the Priestess of the Fount but carried regret for not being chosen as her personal guardian. Despite her corruption by the Blight, her core desire to protect remained strong, as shown by her attempts to shelter Lily from the Rain of Death.`,
      
      abilities: {
        name: 'Guardian Siegrid',
        type: 'Subskill',
        uses: '13',
        cooldown: '4.5',
        description: 'Swings an iron ball to attack surrounding enemies.',
        flavorText: 'Siegrid guarded the sept to protect the White Priestess Lily. Never-ending bloodshed caused her to be consumed by madness.',
        details: `Guardian Siegrid is a stationary spirit that when deployed attacks the area around her. She does considerable staggering damage. She can also be used midair, where she is flung slightly up and forward from Lily. She attacks the area around her in a circle for a short amount of time. Damage and poise damage are reduced in comparison to ground attacks.

On levels one to two, while on the ground, three swings are made. Their damage scalings are 40%, 45%, 50%. If used in water or air, five swings are made, but damage is decreased to 20%, 22%, 14%, 16%, 18%.

On levels three to five, one additional swing is added for grounded variant. Scalings change to 30%, 35%, 40%, 45%. Water and air variants deliver seven swings, for 20%, 21.5%, 13.5%, 15.5%, 17.5%, 16.5%, 15.5% damage.

On level six, ground attack consists of five swings for 25%, 30%, 35%, 35%, 35% damage. In water and air nine swings are performed, for 20%, 22%, 14%, 16%, 18%, 14%, 17%, 17.5%, 15% damage.`
      },
      
      battlePhases: {
        firstPhase: [
          'Leaps into the air while spinning her flail, before swinging it forwards right as she lands.',
          'Swings her flail in front of her.',
          'Spins her flail around her three times.'
        ],
        secondPhase: [
          'Raises her hand before striking forwards. This may be followed up by a second slash.',
          'When Lily is standing behind Siegrid, clenches her fist and swings backwards.',
          'Digs her hands into the ground and dashes forwards, ending the dash with an upwards slash.',
          'Leaps into the air and slams down.'
        ]
      },
      
      dialogues: {
        beforeBattle: [
          'UMBRAL KNIGHT: The air is thick with the rot of the Blight... Take heed.',
          'SIEGRID: To protect her, I must...',
          'SIEGRID: Destroy... DestrOY...',
          'SIEGRID: DeStRoy... deSTroY... DE...strOY...'
        ],
        afterDefeat: [
          'SIEGRID: I was supposed... to protect you...'
        ],
        cutscene: `SIEGRID: I adored the Priestess of the Fount. She was our only hope against the immortal Blighted. With unflinching resolve and a smile on her face, she epitomized radiant tenderness.
My sister's letter informed me that the Priestess was in poor health. It seemed the burden of her purification rituals was taking its toll.
I couldn't rejoice at the peace she brought at the cost of her own well-being. Moreover, I couldn't forgive myself for not being able to protect her as a Guardian. No, it was my own sister who was chosen for that role.
In my darkest hour, I found solace in Lily, who was much like the Priestess herself. Even if I couldn't serve her as a Guardian, the least I could do was protect her...
But then the Rain began to fall. Cries of pain rang out in the distance. The Chief Guardian called it the "Rain of Death."
I gave Lily sanctuary and took my weapon in hand. The Rain never let up.`,
        afterCutscene: `UMBRAL KNIGHT: This soul has been purified, no longer imprisoned by Blight.
UMBRAL KNIGHT: Within that memory just now, the woman called you "Lily."
UMBRAL KNIGHT: Surely, that is your name...
UMBRAL KNIGHT: If you retrace the memories of the Blighted in life...
UMBRAL KNIGHT: You may just remember something yourself.
UMBRAL KNIGHT: It may prove difficult, but can you carry on?
LILY (nods)
...`
      },
      
      trivia: `Siegrid is the first boss encountered in Ender Lilies.
Of all plot-relevant Blighted Spirits or area bosses, Siegrid is the only one whose attack is categorized as subskill instead of main skill.
She wields a flail, which is an uncommon weapon choice in the game.
Her battle theme is "Rosary" with intro and outro variations.
Siegrid transforms into a second form at around 10% HP, regaining all of her HP.`
    },

   's5020': {
  id: 's5020',
  name: 'Guardian Silva',
  type: '',
  description: 'Siegrid\'s sister and personal guardian of the Priestess of the Fount. Wields a hammer and possesses white feathered wings.',
  image: 'assets/spirits/Guardian_Silva.webp',
  icon: 'assets/spirits/Guardian_Silva_Icon.webp',
  location: 'Verboten Forest - Catacombs',
  isCollected: false,
  
  lore: `Silva became a Guardian to protect her beloved sister. Knowing full well it would separate them, she took on the burden of guarding the Priestess.

Silva is Siegrid's sister and the two of them became Guardians before Fretia, the Priestess of the Fount, was born. When Fretia was of a young age, Silva was assigned as her Guardian.

After the defense of the Twin Spires, Silva accompanied Fretia to the Verboten Domain. As the experiments on Fretia harshened and Fretia became Blighted, Silva also became Blighted and began to move back to her sister in the Cathedral. Silva presumably did not make it all the way back and was instead left in the Catacombs.`,

  history: {
    background: `Silva was selected over her sister Siegrid to serve as the personal guardian of the Priestess of the Fount. This created a subtle rivalry between the sisters, though both remained dedicated to their duties. Silva accompanied the Priestess on her purification missions throughout the kingdom.`,
    
    corruption: `As the Blight spread and the Priestess's health deteriorated from constant purification rituals, Silva watched helplessly. When the Rain of Death began, she fought to protect the Priestess but ultimately succumbed to the Blight herself.`,
    
    bossBattle: `Silva is the fourth boss encountered in the game. She has two forms: a human form wielding a hammer, and a larger blighted monstrosity form. She transforms into her second form at around 10% HP, fully restoring her health in the process.`
  },

  appearance: `Silva wears traditional nun's garb similar to her sister Siegrid, but wields a hammer as her weapon. Her most distinctive feature are her white, feathered wings. In her second form, she transforms into a larger blighted monstrosity with enhanced abilities and attacks.`,

  personality: `Silva became a Guardian to protect her beloved sister Siegrid, even though she knew it would separate them. She carried her duties with unwavering loyalty to the Priestess of the Fount. Despite the burden of her role, she maintained deep affection for her sister, as shown in her final moments where she expresses regret and longing to see Siegrid one last time.`,

  abilities: {
    name: 'Guardian Silva',
    type: 'Main Skill',
    uses: '∞',
    cooldown: '0',
    aquatic: true,
    description: 'Chains attacks with a hammer. Hold to charge an attack. Charged attacks cause more damage and cover a wider area.',
    flavorText: 'Silva became a Guardian to protect her beloved sister. Knowing full well it would separate them, she took on the burden of guarding the Priestess.',
    details: `Guardian Silva is an aquatic main skill essential for its mobility.

On the ground and in the air, Silva has a two hit combo. Both swings can be charged up for a greater version that does slightly more damage and staggers.

On the ground, the first swing of her hammer is from overhead. The second is from underhand. Damage scalings are 120%, 140%. If charged up, first swing deals damage six times, with a scaling of 40% for each instance. Second swing delivers 6 hits of 45%.

In the air, Silva does two identical swings. Damage scaling drop in comparison to ones on the ground: 80%, 110%. As with ground attacks, aerial charged swings deal damage 6 times each, for 30% and 35% per instance, respectiverly.

When charged up, the second swing is aimed a little upwards. Each aerial swing lifts Lily by a minuscule distance. While this distance is short, it allows Lily to gain access to places that are intended to be reached after defeating Hoenir, Ulv, the Incompetent Sinner, or the Verboten Champion.

Silva's Last Rites summons her blighted monster form, who screams before unleashing the flame pillar attack she used in her boss fight. This attack deals damage 10 times, with a scaling of 80% on each hit.`
  },

  battlePhases: {
    firstPhase: [
      'Swings her hammer overhead (can be followed by a second underhand swing)',
      'Leaps backwards and fires a volley of five fast homing bolts',
      'Quickly dashes backwards or forwards to maintain distance',
      'Leaps high into the air and fires a spread of five homing bolts',
      'Charges up and dashes a long distance while swinging her hammer (NG+ only)'
    ],
    secondPhase: [
      'Dashes at Lily aggressively',
      'Rises into the air and strikes with pillars of fire over a large area',
      'Charges up and fires a massive orb of magic straight forward',
      'Dashes forward while scraping the floor, then swipes upwards',
      'Leaps into the air and slams down with force',
      'Slashes forwards before immediately using her slam attack',
      'Leaps up and fires homing bolts (five in normal, two big spheres in NG+)'
    ]
  },

  spoils: [
    'Guardian Wings - upgrades dodge into a proper dash with greater horizontal mobility',
    'Access to Guardian Silva spirit ability',
    'Unlocks Last Rites - special gauge for powerful main skill attacks'
  ],

  dialogues: {
    beforeBattle: [
      'SILVA: Siegrid...'
    ],
    afterDefeat: [
      'SILVA: I\'m sorry... for everything...'
    ],
    cutscene: `SILVA: I'm not worthy of being the Priestess' Guardian. I thought I had found a way to protect her from the Blight. In the end, my only choice was to flee.
The Blight washed over the land. Like an ever-consuming wave... Sheep and shepherds of the cathedral alike all eventually became Blighted.
Now... my body feels not quite my own. A stranger within my own flesh...
Foul mages and their blasted portion. I was meant to be her guardian...
Protector of the White Priestess, now turned brutal killer.
Madness... Is this the work of the Blight? Or who I truly am inside?
Siegrid... If I could see you... before there's nothing left of me... You were the one I truly wished to protect. My beloved sister... I oNLy WisHEd...`,
    afterCutscene: `UMBRAL KNIGHT: It's the Guardian of the White Priestess of the Fount.
UMBRAL KNIGHT: Then we must be close...
UMBRAL KNIGHT: The Blight spreads ever further...
LILY (collapses)
...
UMBRAL KNIGHT: It is said that priestesses have hold over their senses, despite the Blight.
UMBRAL KNIGHT: But this seems far too much for anyone to bear...
UMBRAL KNIGHT: As important as Purification is... A priestess must also think of herself.
UMBRAL KNIGHT: I dare not say it, but you might be the last of your kin.
UMBRAL KNIGHT: There would be no shame in running from all this.
UMBRAL KNIGHT: No one remains who could condemn you if you did.
UMBRAL KNIGHT: For my part, I want you to live. To leave this land behind.
LILY
...
FRETIA (apparition): You never should have awakened.
FRETIA (apparition): Yet now our fate is in your hands alone.
FRETIA (apparition): I'm sorry...
FRETIA (apparition): Only you can end the curse of the eternal Blight.
FRETIA (apparition): At the farthest reaches, in a distant spring...
FRETIA (apparition): There are waters yet untainted, clear and blue.
UMBRAL KNIGHT: This is...`
  },

  trivia: `Silva is Siegrid's sister and the fourth boss encountered in the game.
She was chosen over Siegrid to be the Priestess of the Fount's personal guardian.
Her battle theme is "Bible" with intro and outro variations.
She transforms into a second form at around 10% HP, regaining all of her HP.
Defeating her grants the Guardian Wings, upgrading Lily's dodge into a proper dash.
Fungal Sorcerer and Fallen Archer spirits work well against her second form due to her slow movement and large size.`
}, 

's5030': {
      id: 's5030',
      name: 'Knight Captain Julius',
      type: '',
      description: 'The illegitimate son of the King of Land\'s End who rose to become the youngest Knight Captain through unparalleled tenacity.',
      image: 'assets/spirits/Knight_Captain_Julius.webp',
      icon: '👑',
      location: 'Ruined Castle - Throne Room',
      isCollected: false,
      
      lore: `Julius was the illegitimate son of the King of Land's End. His mother passed away at his birth and he was raised by his uncle, the Dark Executioner Hoenir. After enduring a hard life, Julius left the Execution Grounds and became a knight to get back at the father who abandoned him.`,
      
      history: {
        background: `Julius was the illegitimate son of the King, raised by his uncle Hoenir after his mother died in childbirth. He endured a difficult childhood in the Execution Grounds before becoming a knight to seek revenge against his father.`,
        
        militaryCareer: `Through sheer determination and skill, Julius became the youngest Knight Captain in the kingdom's history. He led the Immortal Knights who drank the Deathless Elixir to defend against the Blighted at the Twin Spires.`,
        
        downfall: `When the Rain of Death triggered terrible transformations in those who drank the elixir, Julius confronted the King only to discover his father saw everyone as disposable in his pursuit of immortality. This revelation, combined with the Blight's corruption, drove Julius to kill the King.`
      },

      appearance: `Julius appears as a formidable knight in ornate armor, wielding a spear that signifies his rank as Knight Captain. Even in his blighted state, he maintains a regal bearing while sitting on the throne where he committed patricide.`,

      personality: `Driven by a lifelong desire for recognition from the father who abandoned him, Julius possessed unparalleled tenacity and military prowess. However, his hatred and desire for validation ultimately consumed him. The Blight amplified these negative emotions, leading to his tragic downfall and the murder of his own father.`,

      abilities: {
        name: 'Knight Captain Julius',
        type: 'Main Skill',
        uses: '∞',
        cooldown: '0',
        description: 'Unleashes a series of jabbing attacks with a lance that allows for maximum reach. Advancing thrust can be made by using this skill while moving sideways.',
        flavorText: 'The King\'s bastard son. After enduring a hard life, his father\'s kindness elevated him through the knightly ranks. His tenacity is unparalled.',
        details: `Knight Captain Julius is a main skill with exceptional reach.`
      },

      trivia: `Julius is the illegitimate son of the King of Land's End. He was raised by his uncle Hoenir, the Dark Executioner. He became the youngest Knight Captain in the kingdom's history.`
    
},

's5040': {
  id: 's5040',
  name: 'Dark Witch Eleine',
  type: '',
  description: 'A gifted sorceress and close friend of the Priestess Fretia, now consumed by the Blight.',
  image: 'assets/spirits/Dark_Witch_Eleine.webp',
  icon: 'assets/spirits/EL_Dark_Witch_Eleine_Icon.webp',
  location: 'Witch\'s Thicket',
  isCollected: false,
  
  lore: `Eleine was a gifted sorceress from a young age, whose perpetual loneliness was eased by her becoming Fretia's friend. At some point, Fretia is implied to have purified Eleine's mother after she was afflicted with the Blight. As a gifted sorceress, Eleine was raised in the Coven, a faction of skilled witches.

After the defense of the Twin Spires, Eleine visited Fretia who was in the Verboten Domain. On one of these visits, Fretia gave to her a magic stone shattered by the Crimson Lord at the Twin Spires. After Fretia's clones were made, Eleine made pendants from these magic stones and gave them to the White Priestesses. Despite her efforts to research a way to help Fretia, her work yielded no real answers.

At some point, Eleine was consumed by the Blight and left at the bottom of the Witch's Thicket.`,

  history: {
    background: `Eleine was a gifted sorceress raised in the Coven who became close friends with Fretia, the Priestess of the Fount. Fretia had once purified Eleine's mother from the Blight, creating a deep bond between them.`,
    
    research: `After the Twin Spires defense, Eleine dedicated herself to researching ways to help Fretia with her purification burden. She created magical pendants from shattered magic stones for the White Priestesses, but her research ultimately failed to find a solution.`,
    
    corruption: `As the Blight spread, Eleine became consumed by it while trying to protect the Coven. She transformed into the Dark Witch and now guards the bottom of the Witch's Thicket.`
  },

  appearance: `Eleine appears as a traditional witch with a large, brimmed hat and wields a magical staff. She floats constantly in the air during battle. In her later phases, she reveals monstrous magic vines under her dress that she uses to attack.`,

  personality: `Eleine was perpetually lonely until she met Fretia, who became her only true friend. She was deeply devoted to Fretia and risked everything to protect her friend and ease her burden. Even in her blighted state, her core desire to protect Fretia and the Coven remained strong.`,

  abilities: {
    name: 'Dark Witch Eleine',
    type: 'Main Skill',
    uses: '70',
    cooldown: '0',
    aquatic: false,
    description: 'Fires ranged arcane projectiles. Projectiles will home slightly on enemies in front of you.',
    flavorText: 'Eleine was raised in a coven of witches and was hailed as a gifted sorceress at an early stage. Meeting the Priestess eased her anxieties and loneliness.',
    details: `Dark Witch Eleine's spirit fires bolts of magic that have a somewhat weak homing ability.

At levels one to two, Eleine has a three sphere combo. Their damage scalings are 80%, 90%, 130%. 
At levels three to four, Eleine has a four sphere combo, dealing 80%, 80%, 90%, 90% damage. 
At levels five to six, Eleine has a five sphere combo, dealing 80%, 90%, 80%, 90%, 130% damage.

Eleine does not have any noticeable difference when used on ground or otherwise.

Eleine's Last Rite fires ten magic spheres from Lily. When grounded, the spheres are shot in a 180 degree cone above Lily. When airborne, the spheres fly out mostly to Lily's left and right. Each sphere deals 220% damage. Landing all ten spheres on a single target is the most possible damage able to be done in a single moment. This Last Rite attack requires and expends 1 use of the spirit, meaning it cannot be activated if Lily has none remaining.`
  },

  battlePhases: {
    firstPhase: [
      'Lifts her staff and fires six fireballs in a cone aimed at Lily',
      'Swings her staff, firing a fast homing sphere'
    ],
    secondPhase: [
      'The homing sphere attack fires twice in succession',
      'Casts a stationary whirlwind on her current location that lingers, dealing heavy damage (only one active at a time)'
    ],
    thirdPhase: [
      'Teleports diagonally above Lily and lashes out with magic vines after other attacks',
      'Teleports to the top of the room and fires two waves of magic spheres in all directions',
      'Spheres spread out as they travel across the room'
    ]
  },

  spoils: [
    'Witch\'s Bubble - enables swimming, dodging, and attacking underwater',
    'Access to Dark Witch Eleine spirit ability',
    'Unlocks aquatic areas previously inaccessible'
  ],

  dialogues: {
    beforeBattle: [
      'ELEINE: Hey... Are you in there?'
    ],
    afterDefeat: [
      'ELEINE: Hey... Are you in there?'
    ],
    cutscene: `SIEGRID: The Coven is lost.
The place I fought so hard to protect.
Everything I built up by my own hand... brought to ruin.
I risked everything to protect her.
Fretia... the only friend I've ever known.
I yearn only for your safety.
Even now, I remember the day you eased the suffering of what was once my mother.
The day you became the Priestess of the Fount, Fretia.
Such precious time was taken from us, never to be returned...
I continued my research in the hope it may have eased your burden...
But it was all for naught... That folly has become my own burden.
I'll carry it to protect this place, at least until this horrid Rain ceases to fall.
I devoted my time to refining this magic...
Now is the time to put it to use.`,
    afterCutscene: `UMBRAL KNIGHT: Though she may fade, the ward protecting the Coven shall ever remain.
UMBRAL KNIGHT: May you rest in peace...`
  },

  trivia: `Eleine is referred to as the Black Witch in the description of the Spellbound Anklet.
Eleine shares similarities with the Witch of the Lake from Salt and Sanctuary.
Both are levitating witches with a traditional pointy hat who spam projectiles and have some kind of tentacles under their robes.
The pool of water in Eleine's chamber makes it seem like the player is fighting her above a lake.
Eleine is one of the two bosses available after defeating Siegrid.
She has three distinct battle phases, becoming more aggressive in each phase.
In NG+, she starts the battle in her second phase.`
},

's5050': {
  id: 's5050',
  name: 'Gerrod, the Elder Warrior',
  type: '',
  description: 'A giant of a man once dubbed the finest knight in the kingdom, now a Blighted spirit protecting his village to the end.',
  image: 'assets/spirits/Gerrod_the_Elder_Warrior.webp',
  icon: '⚔️',
  location: 'Village of the Elder',
  isCollected: false,
  
  lore: `One of the Knights devoted to protecting the people of Land's End, Gerrod became famed for his massive stature, indomitable strength, and unfailing altruism. He was dubbed the finest knight in all the kingdom, and was considered both a hero and a symbol of glory to his home village.

Eventually, Gerrod drank the Deathless Elixir and became an Immortal Knight to better defend the kingdom from the Blighted. Returning from a fierce battle, Gerrod was dismayed to see that the people of the village were afraid of what he had become as a result of his decision. At one point, Fretia and a small White Priestess visited Gerrod to comfort him.

Even as he became Blighted, Gerrod refused to be purified by the White Priestess, knowing well the immense pain it would put them through. Devoting his final moments to protecting his people, Gerrod eventually lost his sanity from the Blight and descended into madness.`,

  history: {
    background: `Gerrod was the finest knight in the kingdom, renowned for his massive stature, indomitable strength, and unfailing altruism. He was considered a hero and symbol of glory to his home village.`,
    
    transformation: `To better defend the kingdom from the Blighted, Gerrod drank the Deathless Elixir and became an Immortal Knight. However, upon returning from battle, he discovered the villagers feared what he had become.`,
    
    finalDays: `Even as he became Blighted, Gerrod refused purification to spare the White Priestess the pain. He devoted his final moments to protecting his people until the Blight consumed his sanity completely.`
  },

  appearance: `Gerrod is a massive, towering figure who wields an enormous hammer. His immense stature makes him one of the largest humanoid spirits encountered. Even in his blighted state, he maintains a formidable and imposing presence.`,

  personality: `Gerrod was the epitome of altruism and self-sacrifice. He became an Immortal Knight not for glory, but to better protect his people. His concern for others was so great that he refused purification to spare the White Priestess pain, ultimately sacrificing his own sanity to protect his village until the very end.`,

  abilities: {
    name: 'Gerrod, the Elder Warrior',
    type: 'Main Skill',
    uses: '∞',
    cooldown: '0',
    aquatic: false,
    description: 'Swings a heavy, powerful hammer slowly, but with force and range enough to blow enemies away.',
    flavorText: 'A giant of a man; once dubbed the finest knight in the kingdom, he was a symbol of glory and a hero to his village. His altruism made his demise a lonely one.',
    details: `Gerrod, the Elder Warrior is a short-ranged combat spirit that swings a massive, heavy hammer. Although it is slow, the hammer deals tremendous damage to both an enemy's HP and posture, as well as sending staggered enemies flying.

At levels one to two, Gerrod swings his hammer once. On the ground, damage scaling for the swing is 200%. In air, it is 180%.

At level three Gerrod will also perform second attack: If standing on the ground, he will slam his hammer downwards in front of him. Scalings are 180%, 140%. In air he will swing it upwards while also moving forward. Scalings are also 180%, 140%.

Gerrod's Last Rites will cause him to emit a deafening roar, dealing damage to all enemies within a certain radius of Lily. The damage dealt by the roar cannot be blocked. Damage scaling is 200%.`
  },

  battlePhases: {
    firstPhase: [
      'An overhead swing with his hammer (often followed by an underhand swing)',
      'Leaps above Lily and slams down, creating a large explosion on impact'
    ],
    secondPhase: [
      'Slams his hammer into the ground, creating a shockwave that travels along the ground in both directions',
      'Winds up, then swings his hammer in an overhand swipe that hits everything around him'
    ],
    thirdPhase: [
      'Loses his regular hammer swings',
      'The leap attack is now performed 2-3 times in succession',
      'Braces himself and dashes towards Lily'
    ],
    ngPlus: [
      'Starts combat in 2nd phase',
      'Shockwave attack creates two sets of waves instead of one',
      'Transitions to "4th" phase with even more aggressive leap attacks (up to 8 in succession)'
    ]
  },

  spoils: [
    'Giant\'s Hammer - enables falling attack that deals significant area damage',
    'Can break pustulant ground with diving attack',
    'Access to Gerrod, the Elder Warrior spirit ability'
  ],

  divingDamage: {
    doubleJumpHeight: '80% damage scaling',
    threeFourJumpsHeight: '160% damage scaling', 
    fivePlusJumpsHeight: '240% damage scaling'
  },

  dialogues: {
    beforeBattle: [
      'GERROD: The Blighted scum! How could they?',
      'GERROD: How dare they!'
    ],
    afterDefeat: [
      'GERROD: The Blighted scum! How could they?',
      'GERROD: How dare they!'
    ],
    cutscene: `GERROD: I hear the muffled voices of the villagers outside my shack.
They fear what I have become upon my return from the fortress battle.
I chose to become an Immortal Knight to protect them all.
There are days I wish I would be purified, but...
The Priestess of the Fount must not be made to carry that burden any longer.
After some time, I hear voices again.
But this time, they belong to the White Priestess and a child.
The Priestess, once but a child herself, now cuts a radiant figure.
I no longer know the pleasures of joy, but despite this, my cheeks widen in a grin.
When madness takes me, will this little one be made to carry the burden?
I don't know how long my consciousness will hold out.
But as long as I am myself, I will be a shield to protect them from harm.
The pain I will endure is nothing compared to their suffering.`,
    afterCutscene: `UMBRAL KNIGHT: He protected the village to the very end. A brave warrior, indeed.
UMBRAL KNIGHT: That was you and your mother.
Did you often visit with her?`
  },

  trivia: `Gerrod was considered the finest knight in the entire kingdom.
He voluntarily drank the Deathless Elixir to become stronger and better protect his people.
Despite being feared by the villagers he protected, he continued his duty selflessly.
He refused purification to spare the White Priestess pain, showing incredible altruism.
His battle theme is "Helplessness" with intro and outro variations.
In NG+, his battle becomes significantly more challenging with additional phases.`
},

's5060': {
  id: 's5060',
  name: 'Hoenir, Keeper of the Abyss',
  type: '',
  description: 'Head of the Dark Executioners who served the kingdom from the shadows, now guarding the execution grounds per Fretia\'s final request.',
  image: 'assets/spirits/Hoenir_Keeper_of_the_Abyss.webp',
  icon: '🌊',
  location: 'Execution Grounds',
  isCollected: false,
  
  lore: `As the leader of the Dark Executioners who served the kingdom from the shadows, Hoenir was wholeheartedly devoted to his kingdom despite the unsavory nature of his work. He purposely kept his profession a secret from his sister, fearing what she would think of him. After his sister died giving birth to Julius, Hoenir took his nephew in after the King of Land's End abandoned him, raising him as one of his own until he was ready to face the truth.

When the Blight started spreading, Hoenir was tasked with escorting one of the White Priestesses to escape the Blight. However, as they found themselves surrounded by Blighted in the execution grounds, Fretia somehow managed to contact him from the Verboten Domain, pleading him to never let anyone violate the grounds. It is unknown exactly what happened after, but Hoenir eventually succumbed to the Blight, while the Priestess he was protecting was eventually killed, with their body being found in a room behind him. Even in his Blighted state, Hoenir still followed Fretia's final request for him.`,

  history: {
    background: `Hoenir was the leader of the Dark Executioners who served the kingdom from the shadows. He kept his profession secret from his family out of shame, but was deeply devoted to the kingdom.`,
    
    family: `After his sister died giving birth to Julius, Hoenir took in his nephew when the King abandoned him. He raised Julius as his own son, hiding the truth about his parentage until Julius was ready.`,
    
    finalMission: `During the Blight spread, Hoenir was tasked with escorting a White Priestess to safety. Trapped in the execution grounds, he received a psychic plea from Fretia to protect the grounds from violation - a request he honored even in death.`
  },

  appearance: `Hoenir appears as a formidable executioner wielding dual blades. He maintains a professional and deadly demeanor even in his blighted state. He is accompanied by lesser Dark Executioners who assist him in battle.`,

  personality: `Hoenir was a man of few words but deep loyalty. Despite his unsavory work as an executioner, he loved his kingdom more than anyone and was completely devoted to its protection. He showed great compassion in raising his nephew Julius, and maintained his honor by fulfilling Fretia's final request even after succumbing to the Blight.`,

  abilities: {
    name: 'Hoenir, Keeper of the Abyss',
    type: 'Main Skill',
    uses: '110',
    cooldown: '0',
    aquatic: true,
    description: 'Launches a blitz of dark blades to shred the enemy to pieces from a distance. Their short range is made up for with speed.',
    flavorText: 'Head of the Dark Executioners. A man of few words, Hoenir shadowed the knights of the Bastion. He loved the kingdom more than any other.',
    details: `Hoenir, Keeper of the Abyss is a spirit that fires short-ranged blades that travel extremely fast.

On levels 1-3, an attack chain includes four throws.
On the ground, their damage scalings are 35%, 40%, 45%, 50%.
In water or air, they deal more damage: 45%, 50%, 55%, 60%.

On levels 4-5, he adds fifth blade to the chain. First four have same scalings.
On the ground, fifth throw deals 55% damage.
In water or air, it deals 65% damage.

On 6th level, another blade is added. Previous scalings remain the same.
On the ground, sixth knife deals 60% damage. In water or air, it deals 70% damage.

His Last Rites has him spin while unleashing a torrent of blades in the target direction. A total of 12 blades are thrown, dealing 75%, 74%, 73.5%, 72.5%, 76.5%, 74.5%, 75.5%, 77%, 72%, 73%, 76%, 74% damage (for a total of 893.5%).
This Last Rite attack requires and expends 1 use of the spirit, meaning it cannot be activated if Lily has none remaining.`
  },

  battlePhases: {
    firstPhase: [
      'Throws a mid-ranged dagger in front of him',
      'Leaps backwards to keep distance from Lily',
      'Accompanied by Blighted Dark Executioners that respawn indefinitely'
    ],
    secondPhase: [
      'Leaps over Lily while firing a spread of three daggers downwards',
      'Slashes to create a whirlwind of flame (no damage but knocks Lily back)'
    ],
    thirdPhase: [
      'Dagger leap attack now fires four daggers',
      'Jumps towards Lily while whirling his blades around himself',
      'Becomes much more aggressive, actively chasing Lily',
      'Abandons defensive positioning for offensive pursuit'
    ]
  },

  battleMechanics: {
    minions: 'Dark Executioners assist Hoenir - weaker than normal variants but respawn indefinitely',
    spawnLimit: 'Minions spawn up to a certain number but respawn on timer',
    ngPlus: 'Starts combat in 2nd phase, transitions to 3rd phase earlier'
  },

  spoils: [
    'Executioner\'s Hook - allows Lily to grapple onto designated grapple points',
    'Access to Hoenir, Keeper of the Abyss spirit ability',
    'Unlocks new areas previously inaccessible without grappling'
  ],

  dialogues: {
    beforeBattle: [
      'HOENIR: I\'m relieved...',
      'HOENIR: the White Priestess is safe...'
    ],
    afterDefeat: [
      'HOENIR: I\'m relieved...',
      'HOENIR: the White Priestess is safe...'
    ],
    cutscene: `HOENIR: The all-swallowing blight flowed out from the earth around us.
I took the Priestess—once of no consequence to me—in my arms, and we made our escape.
Chased by Blighted fiends, we wound up somewhere most morbidly ironic.
Fate delivered us to the execution grounds, a place I know all too well.
And, something happened that day that I'll never forget as long as I live.
The White Priestess of the Fount... Down deep in the Verboten Domain...
She who carries the burden of Blight, who saved everyone I care about...
She called out to me for help, saying:
"I, who bear the burden of Blight and suffer for your people...
I... have one humble request.
Though our roles differ, we each are tasked with serving our kingdom.
We are devoted to its protection.
To that end, I must ask that you let no one violate these grounds."`,
    afterCutscene: `UMBRAL KNIGHT: Even in death, he honored his duty.`
  },

  relationships: {
    julius: 'Nephew - raised Julius after the King abandoned him',
    sister: 'Deceased - died giving birth to Julius',
    king: 'Employer - served the King of Land\'s End as head executioner',
    fretia: 'Respected - honored her final request even after death'
  },

  trivia: `Hoenir was Julius's uncle and raised him after the King abandoned his illegitimate son.
He kept his profession as an executioner secret from his family out of shame.
Despite his dark work, he was deeply devoted to protecting the kingdom.
He was contacted psychically by Fretia while trapped in the execution grounds.
Even as a Blighted spirit, he continues to honor Fretia's final request.
His battle theme is "The Sun" with intro and outro variations.
He is one of the few bosses accompanied by respawning minions.`
},

's5070': {
  id: 's5070',
  name: 'Ulv, The Mad Knight',
  type: '',
  description: 'A berserk knight feared by his own Order, now tending to snowflowers in hopes of Fretia\'s return.',
  image: 'assets/spirits/Ulv.webp',
  icon: '😠',
  location: 'Twin Spires - Snowflower Garden',
  isCollected: false,
  
  lore: `One of the knights of Land's End who eventually became one of the Immortal Knights, Ulv quickly gained an intimidating reputation for himself due to his berserk fighting style, short temper, and difficulty expressing himself with words. Because of this, he was dubbed the Mad Knight by his own men and feared by the rest of the knights, to the point where meeting with him required written approval by Knight Captain Julius. Ulv did not seem to mind being shunned by his peers, but secretly lamented that as an Immortal Knight, he would never fulfill his dream of dying in battle.

During the defense of the Bastion, Fretia met and befriended Ulv despite his reputation and difficulty communicating, going so far as to try and make a painting for him. This in turn caused Ulv to become fiercely devoted to her, as she taught him that there was more to life than just battle. Although Fretia later had to leave, when the small White Priestesses were created and scattered around Land's End, Ulv ended up befriending the one who took up residence in the Twin Spires.

By the time the game occurs, Ulv had succumbed to the Blight, having spent much of his time tending to the Snowflower Garden atop the Twin Spires in hopes that Fretia would eventually return to watch them bloom again. Even in his maddened, Blighted state, Ulv remembered Fretia's love for the flowers and continued protecting them with his life.`,

  history: {
    background: `Ulv was an Immortal Knight known for his berserk fighting style and difficulty with communication, earning him the nickname "Mad Knight" and fear from his own men. Meetings with him required written approval from Julius.`,
    
    friendship: `During the Bastion defense, Fretia befriended Ulv despite his reputation and taught him there was more to life than battle. She tried to make a painting for him, and he became fiercely devoted to her.`,
    
    finalDays: `After Fretia left, Ulv tended the Snowflower Garden hoping she would return to see the blooms. Even after succumbing to the Blight, he continues protecting the flowers in her memory.`
  },

  appearance: `Ulv appears as a massive, brutish knight who fights with his bare hands and giant claws. His berserk nature is evident in his aggressive, leaping fighting style. Despite his fearsome appearance, he maintains a connection to the delicate snowflowers he protects.`,

  personality: `Ulv was feared as the "Mad Knight" due to his berserk combat style and difficulty communicating, but secretly longed for meaningful connection. Fretia was the first to see past his exterior and show him beauty beyond battle. He developed a deep, quiet devotion to her and the flowers she loved, tending them with unexpected tenderness despite his violent nature.`,

  abilities: {
    name: 'Ulv, The Mad Knight',
    type: 'Main Skill',
    uses: '∞',
    cooldown: '0',
    aquatic: true,
    description: 'Slashes twice with giant claws. Charging will unleash a series of gouging attacks and devastating finisher, but leaves you wide open.',
    flavorText: 'Feared by his Order and dubbed the Mad Knight, Ulv seemingly lost his edge after a fierce battle. He continued to protect Snowflower Garden in seclusion.',
    details: `Ulv, The Mad Knight is a short-ranged combat skill which slashes twice with Ulv's claws. Charging the attack will result in him unleashing a far stronger string of attacks, but leaves Lily vulnerable during the charging time.

On the ground, slashes have damage scaling of 50%, 70%, respectively.
In air or water, they are increased to 55% and 80%.

Charged variant can be split into three steps:

Ulv thrusts his claw forward, dealing damage.
On the ground, this hit deals 50% damage.
In water or air, it deals 55%.
Dark energy accumulates on the claw, dealing damage in a small radius.
On the ground, damage is delivered as twelve hits for 21%, 26%, 27%, 28%, 29%, 30%, 31%, 32%, 33%, 34%, 35%, 36% (for a total of 362%).
In water or air, charging is faster and only delivers seven first hits with same scalings (192% in total).
Energy blasts forward, dealing damage in an area.
On the ground, this blast deals 320% damage.
In water or air it hits for 225%.
Releasing the button early will cancel charged attack and will make Ulv perform a second slash as in normal attack combo.

Last Rites attack differs when performed on the ground or in water/air:
On the ground it is a downwards slam, as if landing from his jumping attack during his boss fight.
In water or air it will briefly charge up and create an X-shaped slash in front of him. It does look like the one used during boss fight too, but it will not auto-aim on enemies.
Both these attacks deal 350% damage.`
  },

  battlePhases: {
    firstPhase: [
      'Punches twice in quick succession (each punch can change direction)',
      'Runs at Lily before lunging straight ahead',
      'Punches once, then hops backwards and leaps towards Lily with massive explosion',
      'Frequently somersaults and leaps between attacks'
    ],
    secondPhase: [
      'Crosses his arms, then unleashes an X-shaped slash at Lily\'s position',
      'Uppercuts, creating a massive shockwave that travels along the ground'
    ],
    thirdPhase: [
      'Loses the regular double punch attack',
      'Now punches twice before performing his leap punch',
      'Shockwave attack can be immediately followed by second shockwave or X-slash',
      'Charges up and slams ground, creating fiery explosion with sequential flame pillars'
    ]
  },

  battleStyle: `Ulv fights with aggressive, acrobatic movements, constantly leaping and somersaulting around the arena. His attacks are fast and unpredictable, making him one of the most mobile bosses.`,

  spoils: [
    'Bloody Knight\'s Claws - allows Lily to cling to walls',
    'Access to Ulv, the Mad Knight spirit ability',
    'Unlocks vertical exploration with wall-clinging capability'
  ],

  dialogues: {
    beforeBattle: [
      'UMBRAL KNIGHT: Is this... a flower field?',
      'UMBRAL KNIGHT: Here of all places?',
      'UMBRAL KNIGHT: That knight...'
    ],
    afterDefeat: [
      'ULV: These f-flowers are...',
      'ULV: f-FoR...HeRrrR...'
    ],
    cutscene: `ULV: The defense of the Bastion was the longest and most grueling battle I've ever fought.
We staved off the Blighted hordes, defended the kingdom. But none were left to thank us...
Now we're trapped in our own undying shells, just like the Blighted themselves.
I've dreamt of dying on the battlefield so long. Now I'll never die at all...
I see a field of flowers coating the snow-covered ground all around me.
The White Priestess was the one who told me what these flowers are called.
All I'd ever known was battle. The Priestess broadened my horizons considerably.
I was never one for long conversations. I never really knew how to talk to people.
She would laugh as I struggled to speak, but never made me feel ashamed.
Once the fighting has ended, we may never see one another again.
Perhaps it would be better that way.
The Priestess said she loved this field of flowers.
If any yet bloom, would it please her to gaze upon them again with me someday?`,
    afterCutscene: `UMBRAL KNIGHT: The flowers you so carefully guarded...
UMBRAL KNIGHT: Polluted by the Blight as they become...
UMBRAL KNIGHT: I find them beautiful all the same.`
  },

  characterDevelopment: {
    initialState: 'Berserk knight dreaming of dying in battle, feared by all',
    transformation: 'Fretia showed him beauty beyond combat and meaningful connection',
    finalState: 'Devoted guardian protecting flowers in hopes of her return, finding purpose beyond violence'
  },

  trivia: `Ulv was nicknamed "The Mad Knight" by his own men due to his berserk fighting style.
Meeting him required written approval from Knight Captain Julius.
He secretly lamented that immortality prevented him from dying in battle as he dreamed.
Fretia was the first person to see past his violent exterior and befriend him.
He tends snowflowers in hopes Fretia will return to see them bloom.
His battle theme is "Bloom" with intro and outro variations.
Despite his brutal appearance, he shows unexpected tenderness toward the flowers.`
},

's5080': {
  id: 's5080',
  name: 'Faden, the Heretic',
  type: '',
  description: 'Head of the King\'s Mage Brigade whose obsession with curing the Blight led to horrific experiments and the creation of the Deathless Elixir.',
  image: 'assets/spirits/Faden.webp',
  icon: '📖',
  location: 'Verboten Domain - Subterranean Lab',
  isCollected: false,
  
  lore: `A researcher under the King's Mage Brigade, Faden was originally tasked to find a way to alleviate the effects of the Blight on the White Priestess, Fretia. This task sent him and his brigade to the Verboten Domain, where he and his assistant Miriel continued their research.

Eventually, due to the severity of the Blight in the area, Miriel succumbed to its effects, pushing Faden to experiment with prisoners and the Blighted itself in hopes of understanding and reversing the affliction. These experiments resulted in the creation of the Deathless Elixir, and in turn, the Immortal Knights. However, the elixir requires for the subject to have a trace of humanity left in them - Miriel, who had completely transformed at this point in time, was unable to be saved.

Unable to find a cure for the Priestess' affliction, and with her having no successor, Faden turns to creating clones of Fretia, which horrifies Silva, who wonders what will be done with those she calls inferior imitations.`,

  history: {
    background: `Faden was the head of the King's Mage Brigade tasked with finding a way to alleviate the Blight's effects on Fretia. He led expeditions into the Verboten Domain to research ancient magic.`,
    
    tragedy: `His assistant and beloved Miriel succumbed to the Blight during their research. This personal loss drove Faden to increasingly unethical experiments in his desperate search for a cure.`,
    
    descent: `He created the Deathless Elixir that produced the Immortal Knights, but couldn't save Miriel as she had transformed completely. His final desperate act was cloning Fretia, creating the White Priestess clones scattered throughout Land's End.`
  },

  appearance: `Faden appears as a tormented researcher, consumed by his obsession. He is found in his laboratory surrounded by the remnants of his horrific experiments, a broken man who crossed ethical boundaries in his quest for a cure.`,

  personality: `Faden began as a dedicated researcher trying to help Fretia, but the loss of his beloved Miriel drove him to obsession and depravity. His good intentions were corrupted by desperation, leading him to perform unethical experiments and ultimately create the Fretia clones. He represents the tragedy of well-meaning science gone horribly wrong.`,

  abilities: {
    name: 'Faden, the Heretic',
    type: 'Main Skill',
    uses: '40',
    cooldown: '0',
    aquatic: false,
    description: 'Manipulates Blighted to blast enemies. While slow, this deals heavy damage and can blow enemies away at a distance.',
    flavorText: 'Faden, head of the King\'s Mage Brigade, became unusually obsessed with the Blighted experiments after losing his beloved. He sank into depravity.',
    details: `As a spirit, Faden fires magical projectiles from a sort of organic cannon roughly ellipsoid in shape.

On levels from 1 to 5, three projectiles are released. First one flies directly forwards, second one is sent forward and down, while the third travels forward and up. Projectiles have no auto-aim, meaning they are unlikely to hit the same target, unless fired from point-blank range.
Projectiles deal 160%, 170%, 180% damage, respectively.

On 6th level, two more projectiles are added. Fourth is sent even farther downwards, and fifth even farther upwards.
Additional projectiles deal 170% and 165% damage, respectively. Other scalings remain the same.

His Last Rite attack causes a giant claw to surge from the ground at the position of nearest enemy, dealing 900% damage to it and surrounding ones. It will prioritize closest enemy even if it's flying and cannot be reached, potentially missing entirely.
If there is no ground close enough under the target, the claw will appear in air.
This Last Rite attack requires and expends 1 use of the spirit, meaning it cannot be activated if Lily has none remaining.`
  },

  battleInfo: {
    encounter: 'Faden is not directly fought - he is protected by his transformed lover Miriel',
    protection: 'What was once Miriel fights Lily to protect Faden in the Verboten Domain',
    purification: 'Faden is purified without a direct boss battle against him'
  },

  creations: {
    deathlessElixir: 'Created the elixir that produced the Immortal Knights',
    immortalKnights: 'Gerrod, Ulv, Julius and others became Immortal Knights through his formula',
    fretiaClones: 'Created the White Priestess clones when he couldn\'t find another cure',
    limitations: 'The elixir only works on those with some humanity remaining - couldn\'t save Miriel'
  },

  relationships: {
    miriel: 'Assistant and beloved - her transformation drove his descent into madness',
    fretia: 'Subject of his research - tried to cure her Blight affliction', 
    silva: 'Horrified by his cloning experiments - called them "inferior imitations"',
    king: 'Employer - funded his research through the Mage Brigade'
  },

  dialogues: {
    finalWords: 'It was all too late...',
    researchNotes: 'Various notes scattered throughout the lab detail his descent into obsession'
  },

  spoils: [
    'Access to Faden, the Heretic spirit ability',
    'Reveals the tragic backstory of the Immortal Knights and White Priestess clones',
    'Completes the story of the Blight research and its consequences'
  ],

  trivia: `Faden designed the Heretic\'s Mask item.
He is not directly fought as a boss - Miriel protects him.
He created the Deathless Elixir that made the Immortal Knights possible.
His cloning of Fretia created the White Priestess clones throughout Land\'s End.
His story represents the theme of good intentions leading to horrific consequences.
His research notes can be found throughout the Verboten Domain detailing his descent.`
},

's2012': {
  id: 's2012',
  name: 'Cliffside Hamlet Youth',
  type: '',
  description: 'A lost boy separated from his mother during a storm, now forever searching for help that never came.',
  image: 'assets/spirits/Cliffside_Hamlet_Youth_Icon.webp',
  icon: '👻',
  location: 'White Parish - near Saint\'s Passage',
  isCollected: false,
  
  lore: `Separated from his mother in the midst of a terrible storm, the boy set off for the White Parish in search of help. He never arrived. Even in death, his spirit continues to search and call out for his mother, trapped in the endless cold and pain of his final moments.`,

  acquisition: {
    location: 'Found on a large platform near the beginning of the White Parish',
    direction: 'Second location to the right from Saint\'s Passage respite',
    type: 'Slug-type miniboss encountered as a wandering spirit'
  },

  combat: {
    difficulty: 'Easy to defeat with simple attack patterns',
    attacks: [
      'Makes leaps toward Lily as its only form of attack',
      'No complex combat mechanics or multiple phases'
    ],
    ngPlus: [
      'Creates a pool of toxic liquid upon landing that deals damage if Lily stands in it',
      'Toxic pool dissipates after a few seconds',
      'Adds environmental hazard to the otherwise simple fight'
    ]
  },

  abilities: {
    name: 'Cliffside Hamlet Youth',
    type: 'Subskill',
    uses: '18',
    cooldown: '2.7',
    aquatic: false,
    description: 'Performs an arced leap and lands with enough force to scatter and damage surrounding enemies.',
    flavorText: 'Separated from his mother in the midst of a terrible storm, the boy set off for the White Parish in search of help. He never arrived.',
    details: `Cliffside Hamlet Youth is a throwable spirit that deals area damage upon landing.

The spirit performs an arced leap and lands with explosive force, dealing 135% damage in an area around the impact point.

Cooldown improvements:
- Base cooldown: 2.7 seconds
- Level 2: Cooldown reduced by 0.3 seconds
- Level 4: Cooldown reduced by additional 0.3 seconds  
- Level 6: Cooldown reduced by final 0.3 seconds
- Maximum cooldown at level 6: 1.8 seconds

This spirit is particularly effective against groups of enemies clustered together, as the area damage can hit multiple targets simultaneously. The arcing trajectory also allows it to hit enemies on slightly elevated platforms or in tricky positions.`
  },

  usageTips: [
    'Effective against groups of weaker enemies clustered together',
    'Useful for hitting enemies in elevated positions due to arcing trajectory',
    'Can create breathing room by scattering enemies upon impact',
    'Cooldown reductions make it more spammable at higher levels'
  ],

  dialogues: {
    ambient: [
      'It\'s so cold... Where are you? Mother...',
      'Save me! The pain... It\'s unbearable...'
    ],
    battle: [
      'The pain... It hurts...',
      'Mother... where are you?'
    ]
  },

  character: {
    age: 'Young boy',
    circumstance: 'Separated from mother during terrible storm',
    goal: 'Was searching for help at White Parish when he died',
    state: 'Trapped in eternal search and pain, calling for his mother'
  },

  trivia: `One of the simpler minibosses in the game with basic attack patterns.
Represents the tragic fate of ordinary citizens during the Blight.
His spirit continues to call out for his mother even after death.
NG+ adds environmental hazards to his otherwise straightforward fight.
Found relatively early in the White Parish area.
His desperate pleas reflect the human cost of the Blight catastrophe.`
},


's2022': {
  id: 's2022',
  name: 'Fallen Archer',
  type: '',
  description: 'The kingdom\'s greatest archer who became a Sinner to save his Guardian sister, now an immortal knight forever bound to defend the Bastion.',
  image: 'assets/spirits/Fallen_Archer_Icon.webp',
  icon: '🏹',
  location: 'Ossuary - 2 locations from respite',
  isCollected: false,
  
  lore: `The kingdom's greatest archer became a Sinner to save his Guardian sister. All Sinners became immortal knights and were charged with defending the Bastion. His sacrifice transformed him into one of the eternal guardians, forever bound to his duty even in death.`,

  acquisition: {
    location: 'Found 2 locations away from Ossuary\'s respite',
    directions: 'From respite, follow path right to 1st location, then slope down to 2nd location. He will be at the bottom-left of the 2nd location.',
    area: 'Ossuary region'
  },

  combat: {
    style: 'Ranged combatant who prefers to maintain distance',
    behavior: [
      'Leaps far away from Lily if she gets too close',
      'Makes long jumps backwards to maintain range',
      'Uses a mix of melee and ranged attacks'
    ],
    attacks: {
      melee: 'A few fast swings of his bow in close combat',
      chargedShot: 'Fires a single, fast-traveling arrow (NG+: 3 arrows in a cone)',
      volley: 'Releases a volley of arrows directed slightly upwards (NG+: aimed lower to hit ground targets)'
    },
    ngPlus: [
      'Charged attack releases 3 arrows in a small cone',
      'Volley attack is aimed lower and can hit ground targets even at distance',
      'Increased aggression and accuracy'
    ]
  },

  abilities: {
    name: 'Fallen Archer',
    type: 'Subskill',
    uses: '16',
    cooldown: '3.5',
    aquatic: false,
    description: 'Releases a fan-shaped volley of arrows skyward to attack airborne enemies.',
    flavorText: 'The kingdom\'s greatest archer became a Sinner to save his Guardian sister. All Sinners became immortal knights and were charged with defending the Bastion.',
    details: `Upon being called for, the Fallen Archer appears slightly behind Lily to quickly fire a volley of arrows forwards and upwards.

This spirit is specifically designed to attack airborne enemies. Hitting targets on the ground is unlikely unless:
- They are very large enemies
- They stand on a ledge or platform above Lily
- They are in point-blank range (though arrows may still fly over heads)

Damage progression by level:
- Level 1: 5 arrows (69%, 71%, 68%, 73%, 70%) = 351% total
- Level 3: 6 arrows (64%, 66%, 68%, 65%, 70%, 67%) = 400% total
- Level 4: 7 arrows (61%, 60%, 64%, 65%, 62%, 67%, 64%) = 443% total
- Level 5: 8 arrows (61%, 54%, 57%, 60%, 62%, 59%, 62%, 61%) = 476% total
- Level 6: 9 arrows (60%, 58%, 59%, 56%, 60%, 57%, 61%, 56%, 58%) = 525% total

Each level from 3 to 6 adds one additional arrow to the volley.`
  },

  usageTips: [
    'Ideal for dealing with flying enemies and enemies on elevated platforms',
    'Less effective against ground-level enemies due to upward trajectory',
    'Good for hitting enemies that frequently jump or float in the air',
    'Use in areas with vertical level design where enemies are above you',
    'Can be combined with other spirits to cover different attack angles'
  ],

  dialogues: {
    battle: [
      'Why? Even after all those times I told you to look after yourself first...',
      'I had no choice... I had to save her...',
      'This eternal duty... my punishment and my salvation...'
    ],
    ambient: [
      'The arrows never stop flying...',
      'My sister... is she safe?'
    ]
  },

  backstory: {
    sacrifice: 'Became a Sinner voluntarily to save his Guardian sister',
    transformation: 'Like all Sinners, he became an immortal knight',
    duty: 'Charged with eternal defense of the Bastion',
    regret: 'Carries guilt about his sister\'s safety despite his sacrifice'
  },

  strategicImportance: {
    strength: 'Excellent anti-air capabilities',
    weakness: 'Ineffective against ground-based enemies',
    positioning: 'Requires smart positioning to maximize effectiveness',
    synergy: 'Pairs well with ground-based spirits for full coverage'
  },

  trivia: `Originally the kingdom's greatest archer before his transformation.
His story represents the theme of familial sacrifice throughout the game.
One of the few spirits specifically designed for anti-air combat.
His NG+ improvements make him more versatile against different enemy types.
The gradual addition of arrows with level-ups provides clear progression.
His dialogue suggests ongoing concern for his sister's wellbeing.`
},

's2032': {
  id: 's2032',
  name: 'One-Eyed Royal Aegis',
  type: '',
  description: 'Royal Aegis elite tasked with protecting the King, now consumed by madness after being betrayed during the Rain of Death.',
  image: 'assets/spirits/One-Eyed_Royal_Aegis_Icon.webp',
  icon: '👁️',
  location: 'Above Tover Alcove (requires Executioner\'s Hook)',
  isCollected: false,
  
  lore: `Royal Aegis elite tasked with protecting the King. Defended the castle during the Rain, only to be betrayed by one of his peers. Consumed by madness, he continues his eternal vigil, forever searching for the monarch he failed to protect.`,

  acquisition: {
    location: 'On the location above Tover Alcove\'s respite',
    requirement: 'Executioner\'s Hook action is required to reach him',
    accessibility: 'Requires grappling ability obtained from defeating Hoenir'
  },

  combat: {
    style: 'Heavy knight with powerful area denial attacks',
    behavior: [
      'Uses overhead sword swings and ground slams',
      'Jumps backwards to avoid attacks',
      'Shield bashes when Lily is behind him',
      'Maintains defensive positioning'
    ],
    attacks: {
      overheadSwing: 'Swing his sword overhead in a powerful arc',
      groundSlam: 'Slams sword into ground, creating shockwave around himself',
      chargedSlam: 'Charged variant with increased damage and wider area',
      shieldBash: 'Bashes with shield while turning around when attacked from behind'
    },
    ngPlus: [
      'If too far from Lily, will turn his back and jump "backwards" to close distance faster',
      'Increased aggression and mobility',
      'More frequent use of charged attacks'
    ]
  },

  abilities: {
    name: 'One-Eyed Royal Aegis',
    type: 'Subskill',
    uses: '11',
    cooldown: '4.7',
    aquatic: false,
    description: 'The giant knight thrust his greatsword into the ground, creating a shockwave that launches surrounding enemies into the air.',
    flavorText: 'Royal Aegis elite tasked with protecting the King. Defended the castle during the Rain, only to be betrayed by one of his peers. Consumed by madness.',
    details: `Upon being called for, the spirit appears beside Lily and slams the ground with his sword, dealing damage to both health and poise. Only enemies that lose their poise completely are launched into the air.

Ground Usage:
- Levels 1-5: Deals 190% damage with single hit
- Level 6: Splits damage into 3 instances of 70% each (210% total)

Aerial Usage:
- If used in mid-air, the spirit will fall down and slam the ground upon landing
- Levels 1-5: Deals 200% damage with single hit  
- Level 6: Splits damage into 3 instances of 75% each (225% total)

Special Properties:
- Can be used in mid-air above water (falls to bottom and delivers slam there)
- Excellent for breaking enemy poise and creating openings
- Effective crowd control against groups of enemies`
  },

  usageTips: [
    'Excellent for crowd control against multiple enemies',
    'Use to break enemy poise and create attack opportunities',
    'Effective against shielded enemies and heavy opponents',
    'Aerial usage can extend reach and hit enemies below platforms',
    'Combine with other spirits for devastating combo attacks',
    'Use defensively to create space when surrounded'
  ],

  dialogues: {
    battle: [
      'I\'m... I\'m not done yet... The King... I must find the King...',
      'Betrayal... it was all betrayal...',
      'The castle must be protected... at all costs...'
    ],
    ambient: [
      'Where is the King? I must find him...',
      'The Rain... it never stops...',
      'My duty... my eternal duty...'
    ]
  },

  backstory: {
    rank: 'Royal Aegis elite - highest tier of royal guards',
    duty: 'Personally tasked with protecting the King',
    tragedy: 'Betrayed by one of his peers during the Rain of Death',
    madness: 'Consumed by insanity while searching for the missing King',
    loyalty: 'Maintains unwavering devotion to his duty despite corruption'
  },

  strategicValue: {
    crowdControl: 'Excellent for dealing with groups of enemies',
    poiseBreak: 'Highly effective at breaking enemy posture',
    areaDenial: 'Creates safe zones by launching enemies away',
    versatility: 'Works in both ground and aerial situations'
  },

  trivia: `Requires the Executioner's Hook ability to reach his location.
Represents the theme of loyalty and betrayal in the royal court.
One of the few spirits with different damage values for ground vs aerial use.
His single eye may reference Odin or other mythological one-eyed guardians.
His madness stems from failing his primary duty to protect the King.
The Royal Aegis were considered the most elite guards in the kingdom.`
},

's2072': {
  id: 's2072',
  name: 'Hidden Test Subject',
  type: '',
  description: 'A fearless bandit turned test subject who hides in urns to escape twisted experiments, now using his prison as both shield and weapon.',
  image: 'assets/spirits/Hidden_Test_Subject_img.jpg',
  icon: '🔬',
  location: 'Aqueduct - 2 locations right from respite, then upper right path',
  isCollected: false,
  
  lore: `A heroic bandit, who was fearless and confident until he was branded a Sinner and taken to the Verboten Domain as a test subject. There, he would oft hide in urns to escape the twisted experiments. His cunning survival tactic became his eternal prison and his only means of defense.`,

  acquisition: {
    location: 'Two locations to the right from Aqueduct\'s respite',
    directions: 'From Aqueduct respite, head to upper location, then take right-most path up',
    area: 'Verboten Domain research facilities'
  },

  combat: {
    style: 'Deceptive fighter who uses hiding and surprise attacks',
    behavior: [
      'Hides in his pot periodically',
      'Uses mix of melee and ranged attacks',
      'Reveals himself for powerful area attacks'
    ],
    attacks: {
      bite: 'Leans forward to bite Lily at close range',
      spit: 'Spits small homing projectile at medium/long range',
      hide: 'Hides in pot, then reveals with damaging roar and sound wave'
    },
    ngPlus: [
      'Spits 3 projectiles instead of 1 at long range',
      'Roar attack deals damage multiple times',
      'Can kill Lily at maximum health if all damage instances connect',
      'Increased aggression and attack frequency'
    ]
  },

  abilities: {
    name: 'Hidden Test Subject',
    type: 'Subskill',
    uses: '10',
    cooldown: '5',
    aquatic: true,
    description: 'Uses the urn holding the test subject\'s body as a shield. Well-timed blocks unleash a counterattack on surrounding foes.',
    flavorText: 'A heroic bandit, who was fearless and confident until he was branded a Sinner and taken to the Verboten Domain as a test subject. There, he would oft hide in urns to escape the twisted experiments.',
    details: `Upon being called for, the Test Subject's pot appears directly on Lily to protect her. This creates a unique defensive/counterattack ability:

Defensive Properties:
- The pot protects Lily from the next attack that hits it
- Negates all effects of the blocked attack
- Cannot use other Skills while the pot is active

Counterattack:
- When an attack hits the pot, the spirit reveals itself and roars
- Deals 220% damage to all surrounding enemies
- Level 4: Increases roar radius by approximately 10-15%
- Level 6: Further increases roar radius by additional 10-15%

This spirit requires precise timing but offers powerful defensive utility and area counterattack potential.`
  },

  usageTips: [
    'Use against enemies with telegraphed, powerful attacks',
    'Excellent for countering bosses with predictable patterns',
    'Time activation just before enemy attacks land for maximum effect',
    'Be aware you cannot use other skills while the pot is active',
    'Effective in crowded situations where multiple enemies can be hit by counter-roar',
    'Aquatic property allows use in underwater sections'
  ],

  dialogues: {
    battle: [
      'I thought I could sneak away in all the commotion, and this is what I got...',
      'Just let me hide... just for a while...',
      'The experiments... they never end...'
    ],
    ambient: [
      'This pot... my only sanctuary...',
      'I was someone once... before this...',
      'The mages... they\'re always watching...'
    ]
  },

  backstory: {
    past: 'Heroic bandit known for fearlessness and confidence',
    capture: 'Branded a Sinner and taken to Verboten Domain',
    survival: 'Developed urn-hiding tactic to escape experiments',
    transformation: 'His survival method became his eternal prison',
    irony: 'The object he used to hide now defines his existence'
  },

  strategicValue: {
    defense: 'Unique blocking capability against single attacks',
    counterattack: 'Powerful area damage when successfully blocking',
    riskReward: 'High skill ceiling with significant payoff',
    versatility: 'Works in both land and aquatic environments'
  },

  specialNotes: {
    restriction: 'Cannot use other Skills while pot is active',
    timing: 'Requires precise activation timing for maximum effectiveness',
    scaling: 'Radius improvements at levels 4 and 6 enhance crowd control'
  },

  trivia: `The miniboss enemy is named "Secret Experiment" in-game.
Represents the dark experiments conducted in the Verboten Domain.
His story shows the transformation from fearless bandit to broken test subject.
One of the few defensive/counterattack spirits in the game.
His hiding behavior reflects his original survival tactic.
The urn that was his refuge became his eternal prison.`
},

's2092': {
  id: 's2092',
  name: 'Chief Guardian',
  type: '',
  description: 'Groa, the former protector of the prior priestess, who now understands the true pain of the priestess\' sacrifice after suffering in the Rain.',
  image: 'assets/spirits/Chief_Guardian_img.jpg',
  icon: '💂',
  location: 'Cathedral Cloister - upper-left location (requires Bloody Knight\'s Claws)',
  isCollected: false,
  
  lore: `The Chief Guardian, once-protector of the prior priestess, suffered in the rain. She wept as she came to know the pain of the priestess' sacrifice. Known as Groa, she carries the weight of understanding what her charge endured, forever bound by duty and newfound empathy.`,

  acquisition: {
    location: 'Upper-left location from Cathedral Cloister\'s respite',
    requirement: 'Bloody Knight\'s Claws action is required to reach her',
    accessibility: 'Requires wall-climbing ability obtained from defeating Ulv'
  },

  combat: {
    style: 'Versatile fighter combining melee and ranged attacks',
    behavior: [
      'Adapts attack patterns based on distance from Lily',
      'Uses both close-quarters and long-range tactics',
      'Combines attacks of regular guardians found throughout the world'
    ],
    attacks: {
      melee: 'Swings her round blade at Lily in close combat',
      closeThrow: 'Throws blade from below - remains close range, travels over head when returning',
      mediumThrow: 'Throws blade from above to medium range - moves straight back when returning',
      vortex: 'When far away, throws blade upwards to create fiery vortex at Lily\'s position after delay'
    },
    patterns: 'Her combat style represents an evolved version of standard guardian enemies'
  },

  abilities: {
    name: 'Chief Guardian',
    type: 'Subskill',
    uses: '15',
    cooldown: '4',
    aquatic: true,
    description: 'Hurls a chain fitted with a circular blade.',
    flavorText: 'The Chief Guardian, once-protector of the prior priestess, suffered in the rain. She wept as she came to know the pain of the priestess\' sacrifice.',
    details: `The Chief Guardian sends out a bladed star that spins, replicating the attack pattern of Guardians found throughout the world, most prominently in the Catacombs.

Damage progression by level:
- Levels 1-3: Deals 140% damage with single hit along its path
- Levels 4-5: Bladed star flies twice along its path, dealing 75% damage each hit (150% total)
- Level 6: Flies three times along its path, dealing 60% damage each hit (180% total)

The bladed star travels in a predictable arc, making it effective against enemies in its path but requiring good positioning.`
  },

  usageTips: [
    'Effective against enemies in narrow corridors or predictable paths',
    'The multiple hits at higher levels work well against larger enemies',
    'Use in areas where enemies approach in straight lines',
    'Aquatic property allows use in underwater sections',
    'Good for controlling space and creating area denial',
    'Combine with other spirits to cover different attack angles'
  ],

  dialogues: {
    battle: [
      'Ah, Priestess...',
      'You\'re still with us.',
      'The sacrifice... I understand now...',
      'This pain... it was hers all along...'
    ],
    ambient: [
      'The Rain showed me the truth...',
      'My duty... my failure...',
      'She bore this burden alone...'
    ]
  },

  backstory: {
    name: 'Groa - the Chief Guardian',
    duty: 'Former protector of the prior priestess',
    revelation: 'Experienced the Rain and finally understood the priestess\' suffering',
    empathy: 'Gained deep understanding of the sacrifice she was meant to protect',
    transformation: 'Her perspective changed from mere duty to genuine compassion'
  },

  strategicValue: {
    versatility: 'Effective at multiple ranges with different attack patterns',
    areaControl: 'Bladed star can control space and hit multiple enemies',
    progression: 'Significant improvement with level-ups through multiple hits',
    reliability: 'Consistent damage output with predictable trajectory'
  },

  connections: {
    guardians: 'Her attacks are enhanced versions of regular guardian enemies',
    catacombs: 'Most prominently features similar enemies in the Catacombs area',
    priestess: 'Deep connection to the suffering of the White Priestesses'
  },

  trivia: `Her real name is Groa, revealed through game lore.
Represents the theme of empathy and understanding sacrifice.
One of the few spirits that significantly changes behavior with level-ups.
Her combat style is a master version of standard guardian enemies.
The multiple hits at higher levels make her scale well into late game.
Her dialogue shows deep reflection on her past duties and failures.`
},


's2102': {
  id: 's2102',
  name: 'Western Merchant',
  type: '',
  description: 'A vibrant salesman from western lands who came to Land\'s End peddling foreign wares, now forever separated from his beloved family.',
  image: 'assets/spirits/Western_Merchant_Icon.webp',
  icon: '💰',
  location: 'Collapsed Shack - 2 locations up, building with lighted doorway',
  isCollected: false,
  
  lore: `This merchant from a western land came to Land's End peddling foreign wares. A vibrant salesman who would light up when touting his rare stock. His journey for profit became an eternal separation from the family he longs to see one last time.`,

  acquisition: {
    location: 'Two locations up from Collapsed Shack respite',
    directions: 'Enter the building with light coming out of doorway on the first location',
    area: 'Western outpost or merchant district'
  },

  combat: {
    style: 'Ranged attacker with crow-like characteristics',
    behavior: [
      'Fires projectiles like other crow enemies',
      'Occasionally approaches Lily for close-range attacks',
      'Uses a mix of ranged and melee tactics'
    ],
    attacks: {
      projectiles: 'Standard crow-like projectile attacks',
      clawAttack: 'Approaches and attacks with claws, releasing three damaging feathers',
      featherPattern: 'One feather downwards, two diagonally to sides (may not appear near ground)'
    },
    ngPlus: [
      'All projectiles home in on Lily',
      'Increased accuracy and aggression',
      'More frequent use of claw attacks'
    ]
  },

  abilities: {
    name: 'Western Merchant',
    type: 'Subskill',
    uses: '50',
    cooldown: '1',
    aquatic: false,
    description: 'Summons the spirit of the Western Merchant, who launches ranged attacks at enemies on sight.',
    flavorText: 'This merchant from a western land came to Land\'s End peddling foreign wares. A vibrant salesman who would light up when touting his rare stock.',
    details: `UNIQUE MECHANIC: Western Merchant is a "pet" spirit with different rules than other spirits:

Activation:
- Calling for Western Merchant does NOT expend a use
- He appears near Lily and follows her around
- Fires projectiles automatically at enemies within range
- Each projectile fired expends ONE use from the 50 total
- Using the spirit again dismisses him (no cost to dismiss)

Damage progression by level:
- Level 1: Fires 1 projectile dealing 45% damage
- Level 3: Fires 3 projectiles (main: 21.5%, upper: 20%, bottom: 17.5%) - all home on enemies
- Level 5: Fires 5 projectiles (17.5%, 21%, 18.5%, 16%, 20% from top to bottom)

The homing projectiles have initial spread, making them less effective against single close-range targets but excellent for covering areas.`
  },

  usageTips: [
    'Ideal for clearing rooms with multiple enemies',
    'Use as a persistent companion during exploration',
    'Effective against flying enemies and enemies in hard-to-reach places',
    'Dismiss when not needed to conserve uses for important battles',
    'The homing projectiles work well against mobile enemies',
    'Use in areas where you expect prolonged combat to maximize value'
  ],

  dialogues: {
    battle: [
      'If only I could see my wife and daughter one last time...',
      'My wares... my beautiful wares...',
      'I should never have come to this cursed land...'
    ],
    ambient: [
      'Business was so good... until the Rain...',
      'My family waits... they must be worried...',
      'These foreign lands hold such tragedy...'
    ]
  },

  backstory: {
    origin: 'Merchant from western lands beyond Land\'s End',
    profession: 'Vibrant salesman specializing in rare foreign wares',
    family: 'Has a wife and daughter waiting for his return',
    tragedy: 'Trapped in Land\'s End by the Rain of Death',
    longing: 'Eternally separated from his beloved family'
  },

  strategicValue: {
    persistence: 'Unique pet mechanic provides continuous support',
    resourceManagement: 'Uses are only consumed when actually attacking',
    versatility: 'Can be summoned and dismissed freely without cost',
    areaCoverage: 'Multiple homing projectiles cover wide areas',
    automation: 'Attacks automatically, allowing focus on other actions'
  },

  specialProperties: {
    summonCost: 'FREE to summon and dismiss',
    useConsumption: 'Only consumes uses when firing projectiles',
    behavior: 'Follows Lily and attacks autonomously',
    duration: 'Remains until manually dismissed'
  },

  trivia: `One of the few "pet" type spirits in the game.
His story represents the theme of family separation and regret.
Originally a vibrant, enthusiastic salesman before the tragedy.
His combat style combines crow enemy mechanics with merchant theme.
The homing projectiles make him particularly effective in NG+.
His dialogue reveals his deep longing for his family back home.`
},

's2112': {
  id: 's2112',
  name: 'Cliffside Hamlet Elder',
  type: '',
  description: 'The village elder whose body was horribly fused with his cattle during the Rain, creating a monstrous anomaly that retains his consciousness.',
  image: 'assets/spirits/Cliffside_Hamlet_Elde_img.jpg',
  icon: '🧓',
  location: 'Bridgehead - 2 locations left, then upper-left (requires Executioner\'s Hook)',
  isCollected: false,
  
  lore: `The Rain rotted and melted the Elder's body, fusing him with his cattle into a monstrous anomaly. Once a respected village leader, he now exists as a horrifying fusion of man and beast, fully aware of his tragic transformation.`,

  acquisition: {
    location: 'Two locations to the left from Bridgehead\'s respite',
    directions: 'Head to upper-left location from there, then immediately climb up using Executioner\'s Hook action',
    requirement: 'Requires grappling ability obtained from defeating Hoenir'
  },

  combat: {
    style: 'Close-range bruiser with area damage attacks',
    behavior: [
      'Aggressively pursues Lily to engage in melee',
      'Uses combination of claw attacks and ground slams',
      'No long-range capabilities - must close distance'
    ],
    attacks: {
      clawCombo: 'Performs two consecutive claw slashes in melee range',
      groundSlam: 'Jumps straight up and slams ground, dealing area damage',
      leapAttack: 'Leaps forward and slashes claws upon landing (medium range)',
      movement: 'Slowly moves toward Lily when at long range'
    },
    ngPlus: [
      'Can leap small distance backwards to reposition',
      'Gains toxic spit attack that covers 50% of ground in front',
      'Increased aggression and attack speed'
    ]
  },

  abilities: {
    name: 'Cliffside Hamlet Elder',
    type: 'Subskill',
    uses: '12',
    cooldown: '4.7',
    aquatic: false,
    description: 'Their bloated body arcs up into the air, landing with force enough to level the surrounding area.',
    flavorText: 'The Rain rotted and melted the Elder\'s body, fusing him with his cattle into a monstrous anomaly.',
    details: `As a Spirit, Cliffside Hamlet Elder leaps forward and slams the ground, dealing 200% damage in an area around the impact point.

The attack replicates his ground slam move from combat, creating a powerful area-of-effect attack that can hit multiple enemies simultaneously.

Properties:
- Deals consistent 200% damage at all levels
- Effective against groups of enemies clustered together
- Creates space by knocking back smaller enemies
- Useful for breaking enemy formations
- No damage scaling with levels, but reliable area damage`
  },

  usageTips: [
    'Excellent for crowd control against multiple enemies',
    'Use to break up groups of weaker enemies',
    'Effective in narrow corridors where enemies cluster',
    'Good for creating breathing room when surrounded',
    'Use against enemies vulnerable to knockback effects',
    'Combine with ranged spirits for area denial strategies'
  ],

  dialogues: {
    battle: [
      'What is this monstrosity I\'ve become?',
      'The cattle... we are one...',
      'My village... my people... what happened?',
      'This fused flesh... this eternal torment...'
    ],
    ambient: [
      'I was their elder... their guide...',
      'The Rain fused us together... man and beast...',
      'I can still feel the animals\' consciousness...'
    ]
  },

  backstory: {
    formerRole: 'Respected elder of Cliffside Hamlet village',
    tragedy: 'Horribly transformed during the Rain of Death',
    fusion: 'Body melted and fused with his cattle',
    awareness: 'Fully conscious of his monstrous transformation',
    irony: 'Once a leader, now a horrifying anomaly'
  },

  transformation: {
    physical: 'Bloated, monstrous body combining human and bovine features',
    mental: 'Retains his original consciousness and memories',
    horror: 'Trapped in a body that is no longer fully his own',
    tragedy: 'Represents the horrific transformations caused by the Rain'
  },

  strategicValue: {
    areaDamage: 'Consistent 200% area damage reliable at all levels',
    crowdControl: 'Excellent for dealing with groups of enemies',
    spaceCreation: 'Knockback effect creates defensive opportunities',
    reliability: 'No complex mechanics - straightforward area damage'
  },

  trivia: `Represents one of the most horrific transformations in the game.
His story shows the psychological horror of retaining consciousness after monstrous transformation.
The fusion with cattle reflects the agricultural nature of his village.
One of the few spirits with no damage scaling - consistent performance at all levels.
His acquisition requires the Executioner's Hook ability.
His dialogue reveals deep self-awareness about his tragic condition.`
},

's2122': {
  id: 's2122',
  name: 'Fungal Sorcerer',
  type: '',
  description: 'Melville, a sorcerer who returned from travels beyond Land\'s End only to be transformed before reuniting with his lover at the Coven.',
  image: 'assets/spirits/Fungal_Sorcerer_img.jpg',
  icon: '🍄',
  location: 'Dryad Lake - 2 locations from respite (right, then up)',
  isCollected: false,
  
  lore: `The sorcerer learned much on his travels beyond the bounds of Land's End. Despite his return home, he never did made it to the Coven where his lover awaited. His name was Melville, and his journey ended just short of reunion, forever separated from the one he loved.`,

  acquisition: {
    location: 'Second location from Dryad Lake\'s respite',
    directions: 'From respite go one location right, then one location up – he will be at the very top',
    area: 'Verdant or fungal-infested regions'
  },

  combat: {
    style: 'Elusive spellcaster with toxic abilities',
    behavior: [
      'Uses homing magical projectiles',
      'Creates area-denial toxic mist',
      'Teleports frequently to avoid damage'
    ],
    attacks: {
      projectiles: 'Shoots magical projectiles that home slightly on targets',
      toxicMist: 'Creates damaging toxic mist similar to common fungal enemies',
      teleport: 'Teleports around the arena, becoming invulnerable during process'
    },
    ngPlus: [
      'Shoots 3 projectiles simultaneously instead of 1',
      'Toxic mist covers larger area, extending slightly behind him',
      'More frequent teleportation and spellcasting'
    ]
  },

  abilities: {
    name: 'Fungal Sorcerer',
    type: 'Subskill',
    uses: '12',
    cooldown: '6',
    aquatic: true,
    description: 'Generates a toxic mist that reduces enemy health over time. Damage from the mist cannot be blocked.',
    flavorText: 'The sorcerer learned much on his travels beyond the bounds of Land\'s End. Despite his return home, he never did made it to the Coven where his lover awaited.',
    details: `As a spirit, Fungal Sorcerer creates a cloud of toxic mist that damages enemies over time.

Base Properties:
- Creates a toxic mist cloud at target location
- Delivers 8 hits of damage over time
- Each hit deals 35% damage (280% total damage)
- Damage cannot be blocked by enemy defenses
- Aquatic property allows use in underwater sections

Level Progression:
- Levels 1-2: Standard mist cloud size
- Level 3: Cloud size increased by approximately 25%
- Level 4: Maintains increased size from level 3
- Level 5: Cloud size further increased by additional 25% (50% total increase)
- Level 6: Maintains maximum size from level 5

The mist persists for its full duration, making it excellent for area denial and damaging stationary or slow-moving enemies.`
  },

  usageTips: [
    'Excellent for area denial and controlling enemy movement',
    'Use against enemies that are stationary or have limited mobility',
    'Effective in choke points and narrow corridors',
    'The unblockable damage works well against shielded enemies',
    'Place on enemy spawn points or patrol routes',
    'Aquatic property makes it useful in underwater combat sections',
    'Combine with other area control spirits for maximum coverage'
  ],

  dialogues: {
    battle: [
      'I was so close to seeing her again...',
      'The Coven... just a little further...',
      'My love... I never made it back...',
      'These fungal growths... they consumed me...'
    ],
    ambient: [
      'The knowledge I gained... wasted...',
      'She waits... and I cannot reach her...',
      'Foreign lands taught me much... but not how to survive this...'
    ]
  },

  backstory: {
    name: 'Melville (revealed through in-game letters)',
    travels: 'Journeyed beyond Land\'s End to gain magical knowledge',
    love: 'Has a lover waiting at the Coven (who becomes Floral Sorceress)',
    tragedy: 'Transformed just short of completing his return journey',
    irony: 'Gained great knowledge but couldn\'t avoid his fate'
  },

  relationships: {
    floralSorceress: 'His lover who awaited him at the Coven',
    coven: 'The magical organization he was returning to join'
  },

  strategicValue: {
    areaDenial: 'Excellent for controlling space and enemy positioning',
    unblockableDamage: 'Bypasses enemy defenses and blocks',
    persistentEffect: 'Continues dealing damage after placement',
    versatility: 'Works on land and in aquatic environments'
  },

  specialProperties: {
    damageType: 'Damage over time that cannot be blocked',
    duration: 'Multiple hits over the mist\'s lifetime',
    scaling: 'Size increases at levels 3 and 5 provide better coverage'
  },

  trivia: `His real name Melville is revealed through in-game letters to his lover.
His story represents the theme of missed connections and tragic timing.
His lover eventually becomes the Floral Sorceress found elsewhere in the game.
One of the few spirits with unblockable damage properties.
The size increases at higher levels significantly improve his area control.
His aquatic property makes him valuable in underwater sections.`
},

's2132': {
  id: 's2132',
  name: 'Floral Sorceress',
  type: '',
  description: 'A charming sorceress who waited amongst flowers for her lover\'s return, unaware he was seeking a cure for her grave illness.',
  image: 'assets/spirits/Floral_Sorceress_Icon.webp',
  icon: '🌺',
  location: 'Witch\'s Hermitage - 1 location down, through right door and lifts',
  isCollected: false,
  
  lore: `The charming sorceress, beset by grave illness, spent her days alone. Amongst flowers, she waited patiently for her lover's return. He left to seek a cure for her, but she only wished to be with him for what little time was left. Her eternal wait continues, surrounded by the flowers they both loved.`,

  acquisition: {
    location: 'One location down from Witch\'s Hermitage\'s respite',
    directions: 'Take the right door from there, then take a lift down on the left, then another lift on the right',
    area: 'Coven or floral-themed magical areas'
  },

  combat: {
    style: 'Ethereal spellcaster with wind and vortex abilities',
    behavior: [
      'Uses slow-moving homing projectiles',
      'Creates damaging vortices at strategic positions',
      'Maintains distance while controlling the battlefield'
    ],
    attacks: {
      homingProjectile: 'Creates large, slow-moving homing projectile',
      selfVortex: 'Creates damaging vortex centered on herself',
      targetVortex: 'Creates damaging vortex at Lily\'s position (with ground hint)'
    },
    ngPlus: [
      'Releases 3 projectiles simultaneously instead of 1',
      'Creates two vortices to her sides when targeting herself',
      'Increased vortex size and duration'
    ]
  },

  abilities: {
    name: 'Floral Sorceress',
    type: 'Subskill',
    uses: '12',
    cooldown: '4',
    aquatic: true,
    description: 'Harnesses the wind to blow away enemies before you.',
    flavorText: 'The charming sorceress, beset by grave illness, spent her days alone. Amongst flowers, she waited patiently for her lover\'s return. He left to seek a cure for her, but she only wished to be with him for what little time was left.',
    details: `As a spirit, Floral Sorceress appears in front of Lily and creates a vortex that combines damage with crowd control.

Vortex Properties:
- Damages enemies over multiple hits
- Pushes enemies away from the vortex center
- Deals high poise damage to break enemy posture
- Aquatic property allows use in underwater environments

Damage progression by level:
- Levels 1-3: 6 damage instances × 15.714% = 94.284% total damage
- Levels 4-5: 8 damage instances × 14.375% = 115% total damage  
- Level 6: 11 damage instances × 13% = 143% total damage

The vortex persists for its duration, making it excellent for area control and creating defensive space.`
  },

  usageTips: [
    'Excellent for crowd control and creating breathing room',
    'Use to push enemies away when surrounded',
    'Effective against enemies with high poise - can break their posture',
    'Place between yourself and approaching enemies for defense',
    'Aquatic property makes it useful in underwater combat',
    'Combine with other area control spirits for layered defense',
    'Use to interrupt enemy attacks and create openings'
  ],

  dialogues: {
    battle: [
      'Melville... Where are you?',
      'The flowers bloom... but you are not here...',
      'My illness... it matters not... I just wanted you here...',
      'Your search was in vain... all I wanted was your company...'
    ],
    ambient: [
      'He promised to return... before the flowers wilted...',
      'The cure... I never wanted it... I wanted him...',
      'These floral scents... they remind me of him...'
    ]
  },

  backstory: {
    condition: 'Suffers from grave, likely terminal illness',
    relationship: 'Lover of Melville (the Fungal Sorcerer)',
    waiting: 'Spent her days waiting amongst flowers for his return',
    tragedy: 'He left to find a cure, but she only wanted his presence',
    irony: 'His well-intentioned journey prevented their final moments together'
  },

  relationships: {
    fungalSorcerer: 'Her lover Melville, who became the Fungal Sorcerer',
    coven: 'Likely a member or associate of the magical Coven'
  },

  strategicValue: {
    crowdControl: 'Excellent for pushing enemies away and creating space',
    poiseDamage: 'High posture damage can stagger tough enemies',
    areaDenial: 'Creates temporary safe zones and controls enemy movement',
    versatility: 'Works as both offensive and defensive tool'
  },

  specialProperties: {
    knockback: 'Pushes enemies away from vortex center',
    postureDamage: 'High poise damage for breaking enemy defenses',
    persistence: 'Continues affecting area for duration',
    scaling: 'More hits at higher levels improve overall effectiveness'
  },

  trivia: `Her lover is Melville, the Fungal Sorcerer found elsewhere.
Represents the theme of misunderstood intentions and tragic timing.
Her story shows that sometimes presence is more important than solutions.
One of the few spirits with significant knockback properties.
The inverse damage scaling (lower per-hit but more hits) is unique.
Her aquatic property adds to her versatility in different environments.`
},

's2162': {
  id: 's2162',
  name: 'Elder Crypt Keeper',
  type: '',
  description: 'An ancient guardian who spent his life protecting the catacombs, now resting eternally under the watch of his apprentice son.',
  image: 'assets/spirits/Elder_Crypt_Keeper_Icon.webp',
  icon: '⚰️',
  location: 'Bottom of the Well - 2 locations down (break pustulant ground)',
  isCollected: false,
  
  lore: `After a lifetime spent guarding the catacombs, the elder crypt keeper had earned eternal rest. His dying wish was to be interred under the watchful eye of his son, the apprentice. His dedication to duty transcended even death, continuing his vigil in spiritual form.`,

  acquisition: {
    location: 'Two locations down from Bottom of the Well\'s respite',
    directions: 'Break the pustulant ground on 1st location to access the second one, and go all the way to the left',
    requirement: 'Requires ability to break pustulant ground (likely Giant\'s Hammer from Gerrod)'
  },

  combat: {
    style: 'Ancient guardian with paralyzing magic',
    behavior: [
      'Uses close-range claw attacks',
      'Employs area damage through ground slams',
      'Utilizes paralyzing projectiles for crowd control'
    ],
    attacks: {
      clawSlash: 'Slashes claws at Lily when in close range',
      groundSlam: 'Jumps into air and slams down, dealing area damage',
      paralyzingProjectiles: 'Fires arcing projectiles that freeze Lily in place (even in mid-air)'
    },
    characteristics: 'His projectiles deal low damage but have strong crowd control through paralysis'
  },

  abilities: {
    name: 'Elder Crypt Keeper',
    type: 'Subskill',
    uses: '13',
    cooldown: '5',
    aquatic: false,
    description: 'Fires arcane projectiles that damage and trap enemies for a short time.',
    flavorText: 'After a lifetime spend guarding the catacombs, the elder crypt keeper had earned eternal rest. His dying wish was to be interred under the watchful eye of his son, the apprentice.',
    details: `Upon being called for, the spirit appears above and slightly behind Lily and fires arcing projectiles that combine damage with crowd control.

Projectile Properties:
- Each hit deals damage and paralyzes enemies momentarily
- Paralysis duration refreshes with additional hits (does not stack)
- Projectiles arc in a spread pattern, making them unlikely to hit same target
- Excellent for crowd control against multiple enemies

Damage progression by level:
- Level 1: 5 projectiles (60%, 62%, 57%, 59%, 58%) = 296% total damage
- Level 3: 6 projectiles (51.875%, 52.813%, 55%, 55.938%, 50.938%, 53.75%) = 320.31% total damage
- Level 5: 8 projectiles (60%, 57.5%, 62.5%, 58.75%, 61.25%, 60%, 62.5%, 57.5%) = 480% total damage

The spread pattern makes this spirit ideal for dealing with groups rather than single targets.`
  },

  usageTips: [
    'Excellent for crowd control against multiple enemies',
    'Use to paralyze groups of enemies for easier targeting',
    'Effective in rooms with multiple enemies approaching from different angles',
    'The arcing projectiles can hit enemies on different elevation levels',
    'Use to create openings against aggressive enemy groups',
    'Combine with high-damage spirits to attack paralyzed enemies',
    'Less effective against single, large bosses due to spread pattern'
  ],

  dialogues: {
    battle: [
      'For the Priestess to be the last thing I see... I am truly blessed.',
      'My watch continues... even in death...',
      'The catacombs... must be protected...',
      'My son... he watches over me still...'
    ],
    ambient: [
      'A lifetime of service... now eternal vigilance...',
      'The dead rest peacefully... thanks to our watch...',
      'My apprentice... now my guardian...'
    ]
  },

  backstory: {
    profession: 'Elder crypt keeper - lifelong guardian of catacombs',
    retirement: 'Earned eternal rest after lifetime of service',
    family: 'His son served as his apprentice and now watches over his rest',
    legacy: 'Passed his duty and knowledge to the next generation',
    honor: 'Considered blessed to see the White Priestess in his final moments'
  },

  relationships: {
    son: 'His apprentice who now guards his rest, continuing the family tradition',
    priestess: 'Deep respect for the White Priestess, considers seeing her a blessing'
  },

  strategicValue: {
    crowdControl: 'Excellent paralysis effect for controlling multiple enemies',
    areaCoverage: 'Spread pattern covers wide area against groups',
    utility: 'More valuable for control than raw damage output',
    versatility: 'Effective in various combat scenarios against multiple foes'
  },

  specialProperties: {
    paralysis: 'Temporarily immobilizes enemies hit by projectiles',
    refreshMechanic: 'Additional hits refresh paralysis duration (no stacking)',
    arcTrajectory: 'Projectiles arc, allowing them to hit elevated enemies',
    spreadPattern: 'Natural spread makes it ideal for groups rather than single targets'
  },

  trivia: `The miniboss enemy is named "Ancient Crypt Keeper" in-game.
Represents themes of legacy, family duty, and peaceful passing.
One of the few spirits with reliable crowd control through paralysis.
His story shows a positive father-son relationship and successful succession.
The projectile spread makes him specialized for group combat.
His dialogue reveals deep reverence for the White Priestess.`
},

's2182': {
  id: 's2182',
  name: 'Dark Executioner',
  type: '',
  description: 'A nameless executioner who trained with Julius since childhood, forever denied knighthood due to the Sinner\'s blood in his veins.',
  image: 'assets/spirits/Dark_Executioner_img.jpg',
  icon: '🪓',
  location: 'Execution Grounds - room above respite (requires Executioner\'s Hook)',
  isCollected: false,
  
  lore: `The nameless Dark Executioner trained in fierce competition with Knight Captain Julius since their childhood. The blood of the Sinner coursing through his veins kept his dream of becoming a knight from ever coming into fruition. Despite his skill and dedication, his heritage forever barred him from the knighthood he coveted.`,

  acquisition: {
    location: 'Room above Execution Grounds\' respite',
    directions: 'Go left from respite, climb all the way up via Executioner\'s Hook action, then move right',
    requirement: 'Requires grappling ability obtained from defeating Hoenir',
    preparation: 'Most enemies in the room can be disposed of before engagement'
  },

  combat: {
    style: 'Aggressive teleporting executioner with fast attacks',
    behavior: [
      'Teleports frequently to close distance',
      'Uses mix of quick and delayed axe attacks',
      'More aggressive than common executioner enemies'
    ],
    attacks: {
      overheadSwing: 'Quickly swings axe overhead',
      horizontalSwing: 'Makes horizontal swing with longer delay',
      teleportAttack: 'Teleports to Lily with pre-swing during teleportation (faster than common executioners)'
    },
    environment: {
      companions: 'Not alone initially - one dog remains but can be weakened before fight',
      respawn: 'None of the accompanying enemies respawn during the fight'
    },
    differences: 'His teleport attack starts during teleportation rather than after arriving, leaving less reaction time'
  },

  abilities: {
    name: 'Dark Executioner',
    type: 'Subskill',
    uses: '40',
    cooldown: '2.2',
    aquatic: true,
    description: 'Phases behind an enemy in visible range and brings down their blade on the unsuspecting victim.',
    flavorText: 'The nameless Dark Executioner trained in fierce competition with Knight Captain Julius since their childhood. The blood of the Sinner coursing through his veins kept his dream of becoming a knight from ever coming into fruition.',
    details: `Upon being called for, the Dark Executioner phases behind the closest enemy in range and delivers a powerful downwards axe slash.

Base Properties:
- Deals 95% damage with single axe slash
- Can hit enemies in mid-air
- Has range limit - won't target enemies too far away
- If no enemies in range, appears beside Lily and wastes a use
- Aquatic property allows use in underwater environments

Cooldown Progression:
- Each level reduces cooldown by 0.2 seconds
- Maximum cooldown reduction: 1.2 seconds at level 6 (1.0 second cooldown)

This spirit excels at quickly eliminating priority targets or dealing burst damage to vulnerable enemies.`
  },

  usageTips: [
    'Excellent for quickly taking out isolated or weakened enemies',
    'Use against enemies with low health to finish them off',
    'Effective against ranged enemies who stay at distance',
    'Be mindful of range limitations to avoid wasting uses',
    'Aquatic property makes it useful in underwater combat',
    'The cooldown reduction at higher levels makes it very spammable',
    'Use to quickly eliminate enemy spellcasters or archers'
  ],

  dialogues: {
    battle: [
      'Don\'t worry about me! Hurry up and get out of here!',
      'This cursed blood... it defines my fate...',
      'Julius... he achieved what I never could...',
      'The knighthood... forever beyond my reach...'
    ],
    ambient: [
      'We trained together... but our paths diverged...',
      'Sinner\'s blood... my eternal curse...',
      'The execution grounds... my only domain...'
    ]
  },

  backstory: {
    identity: 'Nameless executioner (never given a proper name)',
    training: 'Trained fiercely with Julius since childhood',
    heritage: 'Carries Sinner\'s blood in his veins',
    discrimination: 'Denied knighthood despite skill due to his bloodline',
    tragedy: 'Watched his childhood friend achieve what was forever denied to him'
  },

  relationships: {
    julius: 'Childhood training partner who became Knight Captain',
    hoenir: 'Likely served under the head executioner',
    knights: 'Longed to join but was rejected due to heritage'
  },

  strategicValue: {
    targetElimination: 'Excellent for quickly removing specific threats',
    burstDamage: 'Reliable 95% damage against vulnerable targets',
    mobility: 'Phases behind enemies, useful for flanking',
    spammability: 'Low cooldown that improves with levels'
  },

  specialProperties: {
    teleportation: 'Phases behind closest enemy automatically',
    rangeLimit: 'Has maximum targeting range to prevent waste',
    aerialCapability: 'Can hit flying and jumping enemies',
    cooldownScaling: 'Consistent cooldown reduction with each level'
  },

  trivia: `Represents themes of discrimination and unattainable dreams.
One of the few characters explicitly denied something due to bloodline.
His dialogue suggests he may be protecting someone during his battle.
The only named Dark Executioner despite being "nameless" in lore.
His teleport attack is faster than common executioner variants.
His story parallels Julius\'s but with opposite outcomes.`
},

's2192': {
  id: 's2192',
  name: 'Fallen Sentinel',
  type: '',
  description: 'A soldier mutated into winged abomination after drinking suspicious elixirs during the Bastion defense, now forever trapped between forms.',
  image: 'assets/spirits/Fallen_Sentinel_img.jpg',
  icon: '🛡️',
  location: 'Bastion Gate - upper-left location, far left end',
  isCollected: false,
  
  lore: `After the Bastion defense, the heretic sorcerers gave suspicious elixirs to the soldiers of the Twin Spires. When the Rain fell, those who drank the brew mutated into winged abominations. Once proud defenders of the kingdom, they now exist as tragic hybrids of soldier and monster.`,

  acquisition: {
    location: 'Far left end of the location to the upper-left from Bastion Gate\'s respite',
    area: 'Bastion defense areas or Twin Spires region'
  },

  combat: {
    style: 'Mobile aerial fighter with teleportation abilities',
    behavior: [
      'Uses sword attacks in close range',
      'Employs teleportation and aerial dashes',
      'Adapts attacks based on positioning and distance'
    ],
    attacks: {
      swordSwing: 'Swings sword when in close range',
      spinAttack: 'Performs spinning attack that reaches above and behind when attacked from rear',
      dashingThrust: 'Dashes forward while thrusting sword (medium/long range)',
      teleportDash: 'Teleports to Lily\'s altitude before dashing and spinning (higher damage)'
    },
    ngPlus: [
      'Performs two consecutive sword swings instead of one',
      'Both dash attacks include spinning motion',
      'Teleports to lower position, making attacks unavoidable by crouching',
      'Increased aggression and attack frequency'
    ]
  },

  abilities: {
    name: 'Fallen Sentinel',
    type: 'Subskill',
    uses: '12',
    cooldown: '4',
    aquatic: false,
    description: 'Flies forward, piercing enemies in their path with their blade.',
    flavorText: 'After the Bastion defense, the heretic sorcerers gave suspicious elixirs to the soldiers of the Twin Spires. When the Rain fell, those who drank the brew mutated into winged abominations.',
    details: `Fallen Sentinel spirit flies far forward from Lily and deals damage to enemies in its path.

Damage progression by level:
- Levels 1-3: Deals 150% damage with single hit along flight path
- Levels 4-5: Spins while traveling, delivering 5 damage instances:
  * 1 hit of 130% damage
  * 4 hits of 10% damage each
  * Total: 170% damage
- Level 6: Enhanced spin delivering 8 damage instances:
  * 1 hit of 140% damage
  * 7 hits of 7.5% damage each
  * Total: 192.5% damage

The spirit travels a significant distance, making it excellent for clearing paths or hitting multiple enemies in a line.`
  },

  usageTips: [
    'Excellent for clearing corridors and narrow pathways',
    'Use against enemies lined up in a straight path',
    'Effective for hitting multiple enemies in succession',
    'The spinning attacks at higher levels work well against larger enemies',
    'Use to quickly traverse through groups of weaker enemies',
    'Less effective in open areas with scattered enemies',
    'Good for initiating combat from a distance'
  ],

  dialogues: {
    battle: [
      'I... can\'t go on...',
      'These wings... this cursed form...',
      'The elixir... it promised strength... but gave this...',
      'We were betrayed... by the sorcerers...'
    ],
    ambient: [
      'The Bastion... we defended it with our lives...',
      'Wings that cannot flee... weapons that cannot protect...',
      'The Twin Spires... our proud defense... now our prison...'
    ]
  },

  backstory: {
    origin: 'Soldier who defended the Bastion at Twin Spires',
    transformation: 'Drank suspicious elixir from heretic sorcerers',
    mutation: 'Became winged abomination when the Rain fell',
    tragedy: 'Well-intentioned defense led to monstrous transformation',
    betrayal: 'Victim of sorcerers\' unethical experiments'
  },

  transformation: {
    physical: 'Winged hybrid of human and monstrous features',
    psychological: 'Retains military training but trapped in alien body',
    irony: 'Gained wings but lost humanity and purpose',
    tragedy: 'Proud defender transformed into what he once fought against'
  },

  strategicValue: {
    pathClearing: 'Excellent for dealing with enemies in linear formations',
    multiHit: 'Spinning attacks at higher levels damage enemies multiple times',
    range: 'Travels long distance, useful for hitting distant targets',
    consistency: 'Reliable damage output that improves with levels'
  },

  specialProperties: {
    linearTravel: 'Flies straight forward through enemies',
    spinMechanic: 'Gains spinning multi-hit at level 4',
    damageEvolution: 'Transforms from single-hit to multi-hit specialist',
    pathing: 'Can hit multiple enemies in a straight line'
  },

  trivia: `Represents the theme of well-intentioned transformations gone wrong.
Victim of the same heretic sorcerers who created other abominations.
One of the few spirits that fundamentally changes attack pattern with levels.
His wings are a cruel irony - giving flight but no escape from his condition.
The multi-hit evolution makes him scale well into late game.
His story shows the human cost of unethical magical experiments.`
},

's2002': {
  id: 's2002',
  name: 'Headless Defender',
  type: '',
  description: 'A knight who admired Gerrod, beheaded after the Blight caused him to attack his comrades - now defending eternally without a head.',
  image: 'assets/spirits/Headless_Defender_img.jpg',
  icon: '🗡️',
  location: 'Collapsed Shack - 2 locations right, first building (climb right wall)',
  isCollected: false,
  
  lore: `A knight who followed in the footsteps of the hero, Gerrod. Suffering from the Blight upon becoming immortal took its toll. He was beheaded for attacking his fellow knights. His decapitation was both punishment and mercy for the madness that consumed him.`,

  acquisition: {
    location: 'Second location to the right from Collapsed Shack\'s respite',
    directions: 'Enter the first building on that location and climb over its right wall',
    area: 'Abandoned structures or former knight outposts'
  },

  combat: {
    style: 'Defensive knight with powerful area attacks',
    behavior: [
      'Uses traditional knight sword techniques',
      'Employs charging attacks for gap closing',
      'Has strong area denial capabilities'
    ],
    attacks: {
      swordSwing: 'Swings sword in close range',
      swordThrust: 'Thrusts sword forward in close range',
      dashAttack: 'Jumps back, charges, then dashes forward with extended reach flurry',
      groundSlam: 'Slams ground, releasing shockwave forwards and backwards (brief charge)'
    },
    ngPlus: [
      'Ground slam attack covers entire fighting area if used near center',
      'Increased aggression and faster charge times',
      'Larger shockwave areas on all attacks'
    ]
  },

  abilities: {
    name: 'Headless Defender',
    type: 'Subskill',
    uses: '12',
    cooldown: '4.5',
    aquatic: true,
    description: 'A knight with shield at the ready. Well-timed blocks will counter enemies, leaving them stunned and vulnerable.',
    flavorText: 'A knight who followed in the footsteps of the hero, Gerrod. Suffering from the Blight upon becoming immortal took its toll. He was beheaded for attacking his fellow knights.',
    details: `Upon being called for, the spirit appears near Lily and raises his shield defensively. This creates a timed counterattack opportunity.

Defensive Properties:
- Shields Lily for a short duration after activation
- Blocks attacks from any direction (even behind)
- Negates all effects of blocked attacks

Counterattack Mechanics:
- When an attack is blocked, spirit performs counter-swing
- Base counter deals 275% damage
- Level 4: Adds forward dash during counter (50% more range)
- Level 6: Counter hits 4 times (20%, 40%, 55%, 160% = 275% total) with doubled dash range

This spirit requires precise timing but offers powerful defensive utility and high-damage counterattacks.`
  },

  usageTips: [
    'Use against enemies with telegraphed, powerful attacks',
    'Excellent for countering bosses with predictable patterns',
    'Time activation just before enemy attacks land',
    'The aquatic property allows use in underwater combat',
    'Effective against aggressive enemies that constantly attack',
    'Use defensively when overwhelmed to create openings',
    'The level 6 multi-hit works well against larger enemies'
  ],

  dialogues: {
    battle: [
      'Given the choice, I\'d rather have lost my mind than this...',
      'My head... where is my head?',
      'Gerrod... I wanted to be like you...',
      'The Blight made me attack my brothers...'
    ],
    ambient: [
      'I can still feel where my head should be...',
      'A knight without a head... what mockery...',
      'My sword arm remembers... even if my mind doesn\'t...'
    ]
  },

  backstory: {
    inspiration: 'Admired and followed Gerrod\'s heroic example',
    transformation: 'Became immortal like his hero, but suffered Blight corruption',
    tragedy: 'Attacked his fellow knights while maddened by Blight',
    punishment: 'Beheaded for his actions - both penalty and release from madness',
    irony: 'Achieved immortality but lost his head and honor'
  },

  strategicValue: {
    defense: 'Unique blocking capability against all directions',
    counterDamage: 'Extremely high 275% counterattack damage',
    timingReward: 'High skill ceiling with significant payoff',
    versatility: 'Works in both land and aquatic environments'
  },

  specialProperties: {
    omnidirectionalBlock: 'Blocks attacks from any direction',
    counterTiming: 'Short window for activation requires precision',
    evolution: 'Gains mobility and multi-hit at higher levels',
    aquaticUtility: 'Maintains full functionality underwater'
  },

  trivia: `Represents the dark side of immortality and hero worship.
His decapitation was both punishment and mercy killing.
One of the few spirits with true counterattack mechanics.
His story shows how even admiration for heroes can lead to tragedy.
The multi-hit evolution at level 6 maintains total damage while adding utility.
His dialogue reveals deep regret about his condition and actions.`
},

's2052': {
  id: 's2052',
  name: 'Incompetent Sinner',
  type: '',
  description: 'A curious explorer sealed in the Subterranean Lab after venturing into the Verboten Domain, now a non-violent but trapped Blighted form.',
  image: 'assets/spirits/Incompetent_Sinner_img.jpg',
  icon: '😞',
  location: 'Subterranean Lab B4 - left location, down into water',
  isCollected: false,
  
  lore: `A Sinner sealed in the Subterranean Lab. Once a curious and bold man, he ventured into the Blighted and forbidden Verboten Domain. His Blighted form was found some time later, non-violent and lucid. His curiosity led to his transformation, but unlike others, he retained his peaceful nature despite the Blight.`,

  acquisition: {
    location: 'Location to the left from Subterranean Lab B4\'s respite',
    directions: 'After arriving from respite, head immediately down and to the left, jumping down into the water',
    environment: 'Entire battle takes place underwater in lab containment'
  },

  combat: {
    style: 'Aquatic mobility-focused combatant',
    behavior: [
      'Fights exclusively underwater in contained area',
      'Uses simple but effective movement-based attacks',
      'Maintains lucidity despite Blighted transformation'
    ],
    attacks: {
      dashAttack: 'Dashes at Lily when at same depth to deal damage',
      waterStream: 'Spits water stream when Lily is at long range'
    },
    battleConditions: {
      underwater: 'Entire fight occurs underwater - cannot leave until battle ends',
      containment: 'Fought in sealed laboratory environment',
      mobility: 'Relies on aquatic movement for attacks'
    },
    uniqueness: 'Non-violent and lucid despite Blighted state, unlike most other transformed beings'
  },

  abilities: {
    name: 'Incompetent Sinner',
    type: 'Subskill',
    uses: '16',
    cooldown: '3',
    aquatic: true,
    description: 'The Incompetent Sinner will grab hold of you and dart forward, propelling you both some distance.',
    flavorText: 'A Sinner sealed in the Subterranean Lab. Once a curious and bold man, he ventured into the Blighted and forbidden Verboten Domain. His Blighted form was found some time later, non-violent and lucid.',
    details: `Upon being called for, the Spirit appears beside Lily and moves forward, carrying her with him in a unique mobility-based attack.

Base Properties:
- Carries Lily forward while dealing 175% damage to enemies in path
- Functions as both attack and movement tool
- Aquatic property enhances underwater mobility
- Cooldown of 3 seconds allows frequent use

Level Progression:
- Levels 1-5: Standard traversal distance
- Level 6: Distance increased by 50% for enhanced mobility

This spirit serves dual purposes as both combat ability and exploration tool, effectively providing a double-dash mechanic.`
  },

  usageTips: [
    'Excellent for quick repositioning during combat',
    'Use to traverse through groups of enemies while dealing damage',
    'Valuable for reaching distant platforms or avoiding hazards',
    'The extended distance at level 6 greatly improves mobility',
    'Use underwater to enhance swimming speed and maneuverability',
    'Effective for closing distance against ranged enemies',
    'Can be used to quickly escape dangerous situations'
  ],

  dialogues: {
    battle: [
      'I just wanted to see... to understand...',
      'The Domain called to me... with its secrets...',
      'Curiosity... my blessing and my curse...',
      'They sealed me here... for my own safety...'
    ],
    ambient: [
      'The Verboten Domain... so many wonders...',
      'My research... incomplete...',
      'The Blight changed me... but not my mind...'
    ]
  },

  backstory: {
    personality: 'Curious, bold explorer and researcher',
    transgression: 'Ventured into forbidden Verboten Domain',
    transformation: 'Found later as Blighted form but remained lucid',
    containment: 'Sealed in Subterranean Lab for study and safety',
    uniqueness: 'Retained intelligence and non-violent nature post-transformation'
  },

  strategicValue: {
    mobility: 'Unique movement-based ability for positioning',
    versatility: 'Functions as both offensive and utility tool',
    exploration: 'Valuable for reaching hidden areas and platforms',
    frequency: 'Low cooldown allows regular use in combat and traversal'
  },

  specialProperties: {
    dualPurpose: 'Serves as both attack and movement ability',
    carryMechanic: 'Physically transports Lily during activation',
    distanceScaling: 'Significant mobility improvement at level 6',
    aquaticSpecialization: 'Enhanced functionality in underwater environments'
  },

  trivia: `One of the few Blighted beings that retained full lucidity.
His "incompetent" title may refer to his failed exploration or non-violence.
Represents the theme of scientific curiosity and its consequences.
Unique among spirits for providing significant mobility utility.
His containment suggests he was studied for his unusual Blighted state.
The water-based battle reflects his laboratory imprisonment.`
},

's2082': {
  id: 's2082',
  name: 'Castle Town Maiden',
  type: '',
  description: 'A gentle maiden forever united with her loyal dog, waiting peacefully in the rain for an end to her suffering.',
  image: 'assets/spirits/Castle_Town_Maiden_img.jpg',
  icon: '👰',
  location: 'Bridgehead - 3rd location right, upper path (requires Bloody Knight\'s Claws)',
  isCollected: false,
  
  lore: `The maiden was tending to her dog when the Rain came. The dog nuzzled up against her body in the rain, never again to leave her side. Their bond transcended death, creating a peaceful spirit that accepts its fate with grace and dignity.`,

  acquisition: {
    location: '3rd location to the right from Bridgehead\'s respite, upper path',
    requirement: 'Bloody Knight\'s Claws action is required to reach her',
    accessibility: 'Requires wall-climbing ability obtained from defeating Ulv'
  },

  combat: {
    style: 'Passive, non-combative spirit',
    behavior: [
      'Does not attack or defend herself',
      'Approaches Lily if too distant and sits peacefully',
      'Waits passively to be purified'
    ],
    uniqueness: 'One of the few completely passive minibosses in the game',
    atmosphere: 'Creates a poignant, emotional encounter rather than combat challenge'
  },

  abilities: {
    name: 'Castle Town Maiden',
    type: 'Subskill',
    uses: '60',
    cooldown: '0.5',
    aquatic: false,
    description: 'Summons the spirit of the Castle Town Maiden, who strikes enemies she finds on the ground with melee attacks.',
    flavorText: 'The maiden was tending to her dog when the Rain came. The dog nuzzled up against her body in the rain, never again to leave her side.',
    details: `UNIQUE PET MECHANIC: Castle Town Maiden is a persistent companion spirit with special rules.

Activation & Management:
- FREE to summon and dismiss (no use cost)
- Appears near Lily and follows her automatically
- Each attack attempt expends ONE use from the 60 total
- Very low 0.5 second cooldown allows frequent management

Combat Behavior:
- Attacks nearest enemy with melee bites
- Cannot jump - gets stuck on elevation changes
- May lung off edges during attacks (requires resummoning)
- Prioritizes nearest target even if unreachable (still consumes uses)

Damage progression by level:
- Levels 1-3: 80% damage per single bite
- Levels 4-5: 2 hits per attack (35% + 55% = 90% total), second hit has wider area
- Level 6: 3 hits per attack (20% + 35% + 45% = 100% total), third hit has widest area

The wider attack areas at higher levels help mitigate her mobility limitations.`
  },

  usageTips: [
    'Use in flat, open areas to maximize her effectiveness',
    'Avoid summoning in areas with platforms or elevation changes',
    'Dismiss and resummon if she gets stuck or falls off edges',
    'The high use count allows for extended companion duration',
    'Use against ground-based enemies for reliable damage',
    'Be mindful of her targeting flying enemies (wastes uses)',
    'The multi-hit at higher levels improves her crowd control'
  ],

  dialogues: {
    battle: [
      'It is most gracious.',
      'Lily...',
      'My faithful companion... we are together still...',
      'The rain was so cold... but his warmth remained...'
    ],
    ambient: [
      'We wait together... as we always have...',
      'His loyalty... stronger than death itself...',
      'The castle town... it was so beautiful before...'
    ]
  },

  backstory: {
    life: 'Gentle maiden of the castle town',
    companion: 'Had a deeply loyal dog she cared for',
    tragedy: 'Both perished together during the Rain of Death',
    bond: 'Their connection kept them united even after death',
    acceptance: 'Peacefully awaits purification without resistance'
  },

  strategicValue: {
    persistence: 'Continuous companion without summoning costs',
    automation: 'Attacks independently while you focus on other actions',
    resourceEfficiency: 'Only consumes uses when actually attacking',
    emotionalImpact: 'Provides unique narrative depth to gameplay'
  },

  specialProperties: {
    freeSummoning: 'No cost to summon or dismiss',
    mobilityLimitations: 'Cannot jump or navigate complex terrain',
    targetingAI: 'Automatic targeting with some pathfinding issues',
    evolution: 'Gains multi-hit and area improvements with levels'
  },

  trivia: `One of the most emotionally poignant encounters in the game.
Represents themes of loyalty, love, and peaceful acceptance.
Her passive nature makes her unique among combat encounters.
The dog's eternal loyalty is central to her story.
Her acquisition requires wall-climbing ability.
The multi-hit evolution helps compensate for her mobility challenges.`
},

's2172': {
  id: 's2172',
  name: 'Verboten Champion',
  type: '',
  description: 'A former knight who retained his humanity despite Blight, escaping imprisonment to seek answers in Faden\'s laboratory.',
  image: 'assets/spirits/Verboten_Champion_Icon.webp',
  icon: '🏆',
  location: 'Subterranean Lab B2 - 2 locations left, then upper path',
  isCollected: false,
  
  lore: `Despite being Blighted in battle, driven by some purpose, this former knight was able to cling to his humanity. Escaping the Stockade, he headed to the Verboten Quarter and entered Faden's lab. His determination to understand his condition led him to the very source of the experiments that created beings like him.`,

  acquisition: {
    location: 'Two locations to the left from Subterranean Lab B2\'s respite',
    directions: 'From there, head left location, then take upper path - further path is linear',
    requirement: 'Unlock action is required to access him',
    area: 'Verboten Domain research facilities'
  },

  combat: {
    style: 'Determined warrior with methodical attack patterns',
    behavior: [
      'Uses precise, single-swing claw attacks',
      'Employs surprise uppercuts without telegraphing',
      'Adapts attacks based on distance and positioning'
    ],
    attacks: {
      clawSwing: 'Swings claws once in melee range (does not immediately turn if dodged)',
      uppercut: 'Executes uppercut without warning (will turn to face target)',
      shockwave: 'Sends ground shockwave after delay at long range (repeatable if distance maintained)',
      leap: 'Leaps toward Lily to close distance when too far'
    },
    ngPlus: [
      'Gains roar and ground slam attack with wide area damage',
      'Increased aggression and faster attack recovery',
      'More frequent use of shockwave and leap attacks'
    ]
  },

  abilities: {
    name: 'Verboten Champion',
    type: 'Subskill',
    uses: '14',
    cooldown: '3',
    aquatic: false,
    description: 'Leap upward with the Verboten Champion shredding airborne enemies with his razor-sharp claws.',
    flavorText: 'Despite being Blighted in battle, driven by some purpose, this former knight was able to cling to his humanity. Escaping the Stockade, he headed to the Verboten Quarter and entered Faden\'s lab.',
    details: `Upon being called for, the spirit appears beside Lily and performs an uppercut move that combines combat utility with exploration enhancement.

Combat Properties:
- Damages enemies hit during the upward movement
- Carries Lily along with him during the ascent
- Excellent for hitting airborne enemies
- Cooldown of 3 seconds allows frequent use

Damage progression:
- Levels 1-5: Deals 200% damage with single hit
- Level 6: Splits damage into 7 instances of 38% each (266% total damage)

Exploration Utility:
- Functions as a triple-jump for reaching high platforms
- Extends vertical mobility beyond normal capabilities
- Can bypass certain environmental obstacles`
  },

  usageTips: [
    'Excellent for reaching high platforms and secret areas',
    'Use against flying enemies or enemies on elevated positions',
    'The upward carry can help avoid ground-based attacks',
    'Combine with other mobility spirits for extended traversal',
    'Use to quickly gain vertical advantage in combat',
    'The multi-hit at level 6 works well against larger enemies',
    'Effective for escaping surrounded situations'
  ],

  dialogues: {
    battle: [
      'Heehee...',
      'Heeeeee-heeeeee...',
      'The laboratory... holds answers...',
      'My humanity... I must understand...',
      'Faden\'s research... my only hope...'
    ],
    ambient: [
      'The Stockade could not hold me...',
      'This Blighted form... but my mind remains...',
      'The experiments... they must explain this...'
    ]
  },

  backstory: {
    origin: 'Former knight who became Blighted in battle',
    uniqueness: 'Retained humanity and consciousness despite transformation',
    escape: 'Broke out of the Stockade prison',
    quest: 'Sought answers in Faden\'s laboratory about his condition',
    determination: 'Driven by purpose to understand his Blighted state'
  },

  strategicValue: {
    verticalMobility: 'Provides significant exploration and platforming utility',
    aerialCombat: 'Excellent against flying and elevated enemies',
    combatMobility: 'Can reposition vertically during fights',
    damageScaling: 'Significant damage improvement at level 6'
  },

  specialProperties: {
    tripleJump: 'Functions as exploration tool for reaching high areas',
    carryMechanic: 'Lifts Lily during the upward movement',
    damageEvolution: 'Transforms from single-hit to multi-hit specialist',
    versatility: 'Serves both combat and exploration purposes'
  },

  trivia: `One of the few Blighted beings who fully retained their humanity.
His laughter suggests either madness or unique perspective on his condition.
Represents the theme of seeking understanding despite monstrous transformation.
His escape from the Stockade shows remarkable determination.
The triple-jump utility makes him valuable for sequence breaking.
His story continues the themes of Faden\'s experiments and their consequences.`
},

's2232': {
  id: 's2232',
  name: 'Forsaken Fellwyrm',
  type: '',
  description: 'A majestic dragon transformed into a toxic abomination, now questioning its own horrific transformation while haunting the skies.',
  image: 'assets/spirits/Forsaken_Fellwyrm_img.jpg',
  icon: '🐉',
  location: 'Monument of the Wind - right location (requires Piercing Spectral Lance)',
  isCollected: false,
  
  lore: `Many children denied a life within the castle walls were given refuge in the Twin Spires and trained as knights. Among the forsaken, many were orphans of battle or illegitimate children of royal blood. The Fellwyrm represents the ultimate fate of those cast aside by society - transformed into something both magnificent and monstrous.`,

  acquisition: {
    location: 'Location to the right from Monument of the Wind\'s respite',
    requirement: 'Piercing Spectral Lance action is required to reach it',
    accessibility: 'Requires specific combat ability to access its arena'
  },

  combat: {
    style: 'Aerial dragon with toxic and magical attacks',
    behavior: [
      'Primarily stays airborne during combat',
      'Uses ranged magical attacks and area denial',
      'Rarely engages in melee combat'
    ],
    attacks: {
      homingSpheres: 'Conjures slow-moving homing magical spheres',
      toxicBreath: 'Exhales toxic mist covering half the arena',
      wingSlash: 'Slash wings in melee range (rarely used due to aerial positioning)',
      horizontalDash: 'Executes horizontal dash at medium range and same altitude'
    },
    ngPlus: [
      'Spheres home more aggressively and accurately',
      'Melee attacks used much more frequently',
      'Wing-slash range increased and can one-shot at full health',
      'Dash attack used more often, especially when positioned above Lily'
    ],
    positioning: 'Constant flying makes melee attacks uncommon in normal playthrough'
  },

  abilities: {
    name: 'Forsaken Fellwyrm',
    type: 'Subskill',
    uses: '10',
    cooldown: '6.5',
    aquatic: false,
    description: 'Exhales a breath of toxic mist that spreads over a wide area. Enemies that make contact will lose health over time. Breath damage cannot be guarded.',
    flavorText: 'Many children denied a life within the castle walls were given refuge in the Twin Spires and trained as knights. Among the forsaken, many were orphans of battle or illegitimate children of royal blood.',
    details: `As a spirit, the Forsaken Fellwyrm appears beside Lily and exhales a cloud of toxic mist that provides exceptional area control.

Base Properties:
- Creates a wide toxic mist cloud that persists
- Delivers 8 hits of damage over time
- Each hit deals 35% damage (280% total damage)
- Damage cannot be blocked or guarded by enemies
- 6.5 second cooldown balances the powerful area denial

Area Progression:
- Levels 1-3: Standard mist coverage area
- Level 4: Area increased by approximately 15%
- Level 5: Maintains increased area from level 4
- Level 6: Area further increased by approximately 30% (45% total increase from base)

The unblockable damage makes this spirit particularly effective against shielded and defensive enemies.`
  },

  usageTips: [
    'Excellent for area denial and controlling enemy movement',
    'Use against shielded enemies who normally block attacks',
    'Effective in choke points and boss arenas with limited space',
    'Place on enemy spawn points or patrol routes',
    'Use to create safe zones by denying area to enemies',
    'The large area at level 6 can cover entire rooms',
    'Combine with other area control spirits for maximum coverage'
  ],

  dialogues: {
    battle: [
      'What happened...to my body? What\'s going on?',
      'This form... this wretched form...',
      'I was majestic once... before this corruption...',
      'The skies were mine to command... now I poison them...'
    ],
    ambient: [
      'My wings... they spread blight instead of grace...',
      'The children of the Spires... what became of them?',
      'Royal blood turned to toxic venom...'
    ]
  },

  backstory: {
    symbolism: 'Represents the forsaken children of the kingdom',
    transformation: 'Once majestic dragon now corrupted into toxic abomination',
    awareness: 'Fully conscious of its horrific transformation',
    tragedy: 'Questions its own body and what it has become',
    connection: 'Linked to the orphans and illegitimate children of royal blood'
  },

  strategicValue: {
    areaDenial: 'Exceptional for controlling large areas of the battlefield',
    unblockableDamage: 'Bypasses all enemy defenses and guards',
    persistentEffect: 'Continues dealing damage long after placement',
    crowdControl: 'Effective against groups and in confined spaces'
  },

  specialProperties: {
    damageType: 'Damage over time that cannot be blocked or guarded',
    duration: 'Multiple hits over the mist\'s lifetime',
    areaScaling: 'Significant area increases at levels 4 and 6',
    tacticalPlacement: 'Requires strategic positioning for maximum effect'
  },

  trivia: `Represents the theme of societal rejection and transformation.
One of the few dragon-like entities in the game.
His dialogue shows deep self-awareness about his corruption.
The Piercing Spectral Lance requirement suggests a specific weakness.
His toxic theme connects to the broader Blight corruption narrative.
The area increases at higher levels make him scale exceptionally well.`
},


    // يمكن إضافة المزيد من الأرواح هنا بنفس الهيكل
  };

  // محاكاة تأخير الشبكة (يمكن إزالته في الإنتاج)
  await new Promise(resolve => setTimeout(resolve, 100));

  const spiritData = spiritDetails[spiritId];
  
  if (!spiritData) {
    throw new Error(`Spirit with ID ${spiritId} not found`);
  }

  return spiritData;
}

// دالة لعرض شبكة الأرواح
function displaySpiritsGrid(spirits) {
  const spiritsGrid = document.getElementById('spirits-grid');
  
  if (!spiritsGrid) return;

  spiritsGrid.innerHTML = spirits.map(spirit => `
    <div class="spirit-card ${spirit.isCollected ? 'collected' : 'missing'}" data-spirit-id="${spirit.id}" data-type="${spirit.type}">
      <div class="spirit-header">
        <div class="spirit-icon ${spirit.isCollected ? '' : 'missing'}">
          ${spirit.icon && spirit.icon.includes('.') ? 
            `<img src="${spirit.icon}" alt="${spirit.name}" loading="lazy" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : 
            spirit.icon
          }
        </div>
        <div class="spirit-info">
          <div class="spirit-name">${spirit.name}</div>
          <div class="spirit-type">${spirit.type.toUpperCase()} SPIRIT</div>
        </div>
      </div>

      <div class="spirit-image">
        ${spirit.image ? 
          `<img src="${spirit.image}" alt="${spirit.name}" loading="lazy">` : 
          'Image not available'
        }
      </div>

      <div class="spirit-description">
        ${spirit.description}
      </div>

      <div class="spirit-status">
        <span class="status-badge ${spirit.isCollected ? 'collected' : 'missing'}">
          ${spirit.isCollected ? 'Collected' : 'Missing'}
        </span>
      </div>

      <div class="spirit-location">
        <div class="location-title">LOCATION</div>
        <div class="location-info">${spirit.location}</div>
      </div>
    </div>
  `).join('');

  // إضافة event listeners للبطاقات
  document.querySelectorAll('.spirit-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const spiritId = card.getAttribute('data-spirit-id');
      window.navigate('spirit-detail', { spiritId: spiritId });
    });
  });
}

// دالة لعرض تفاصيل الروح
// دالة لعرض تفاصيل الروح - النسخة الكاملة
function displaySpiritDetail(spiritData) {
  if (!spiritData) {
    document.getElementById('spirit-detail-content').innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <p>Spirit not found.</p>
        <button class="btn btn-primary" onclick="window.navigate('spirits-library')">Back to Library</button>
      </div>
    `;
    return;
  }

  document.getElementById('spirit-detail-name').textContent = spiritData.name;
  document.getElementById('spirit-detail-type').textContent = `${spiritData.type.toUpperCase()} SPIRIT`;

  const content = `
    <div class="spirit-detail-container">
      <div class="back-button">
        <button class="btn btn-secondary" onclick="window.navigate('spirits-library')">
          ← Back to Spirits Library
        </button>
      </div>

      <div class="spirit-detail-header">
        <div class="spirit-detail-image">
          ${spiritData.image ? 
            `<img src="${spiritData.image}" alt="${spiritData.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">` : 
            'Detailed image not available'
          }
        </div>
        <div class="spirit-detail-basic-info">
          <h1 class="spirit-detail-name">${spiritData.name}</h1>
          <div class="spirit-detail-type">${spiritData.type.toUpperCase()} SPIRIT</div>
          <div class="spirit-detail-description">${spiritData.description}</div>
          
          <div class="spirit-detail-stats">
            <div class="detail-stat-item">
              <div class="detail-stat-label">Location</div>
              <div class="detail-stat-value">${spiritData.location}</div>
            </div>
            <div class="detail-stat-item">
              <div class="detail-stat-label">Status</div>
              <div class="detail-stat-value" style="color: ${spiritData.isCollected ? 'var(--primary-color)' : 'var(--text-secondary)'}">
                ${spiritData.isCollected ? 'Collected' : 'Missing'}
              </div>
            </div>
          </div>
        </div>
      </div>

      ${spiritData.lore ? `
        <div class="spirit-detail-section lore-section">
          <h2 class="section-title">Lore</h2>
          <div class="section-content">${spiritData.lore.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}</div>
        </div>
      ` : ''}

      ${spiritData.history ? `
        <div class="spirit-detail-section history-section">
          <h2 class="section-title">History</h2>
          <div class="section-content">
            ${spiritData.history.background ? `
              <h3 class="subsection-title">Background</h3>
              <p>${spiritData.history.background}</p>
            ` : ''}
            ${spiritData.history.chapterOne ? `
              <h3 class="subsection-title">Chapter One</h3>
              <p>${spiritData.history.chapterOne}</p>
            ` : ''}
            ${spiritData.history.battle ? `
              <h3 class="subsection-title">Battle</h3>
              <p>${spiritData.history.battle}</p>
            ` : ''}
            ${spiritData.history.defeat ? `
              <h3 class="subsection-title">After Defeat</h3>
              <p>${spiritData.history.defeat}</p>
            ` : ''}
            ${spiritData.history.endingA ? `
              <h3 class="subsection-title">Ending A</h3>
              <p>${spiritData.history.endingA}</p>
            ` : ''}
            ${spiritData.history.endingB ? `
              <h3 class="subsection-title">Ending B</h3>
              <p>${spiritData.history.endingB}</p>
            ` : ''}
            ${spiritData.history.endingC ? `
              <h3 class="subsection-title">Ending C</h3>
              <p>${spiritData.history.endingC}</p>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${spiritData.appearance ? `
        <div class="spirit-detail-section appearance-section">
          <h2 class="section-title">Physical Appearance</h2>
          <div class="section-content">${spiritData.appearance.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}</div>
        </div>
      ` : ''}

      ${spiritData.personality ? `
        <div class="spirit-detail-section personality-section">
          <h2 class="section-title">Personality</h2>
          <div class="section-content">${spiritData.personality.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}</div>
        </div>
      ` : ''}

      ${spiritData.abilities ? `
        <div class="spirit-detail-section abilities-section">
          <h2 class="section-title">Spirit Abilities</h2>
          <div class="section-content">
            <h3 class="subsection-title">${spiritData.abilities.name}</h3>
            <div class="ability-stats">
              <div class="detail-stat-item">
                <div class="detail-stat-label">Type</div>
                <div class="detail-stat-value">${spiritData.abilities.type}</div>
              </div>
              <div class="detail-stat-item">
                <div class="detail-stat-label">Uses</div>
                <div class="detail-stat-value">${spiritData.abilities.uses}</div>
              </div>
              <div class="detail-stat-item">
                <div class="detail-stat-label">Cooldown</div>
                <div class="detail-stat-value">${spiritData.abilities.cooldown}</div>
              </div>
              ${spiritData.abilities.aquatic ? `
                <div class="detail-stat-item">
                  <div class="detail-stat-label">Aquatic</div>
                  <div class="detail-stat-value">Yes</div>
                </div>
              ` : ''}
            </div>
            <p><strong>Description:</strong> ${spiritData.abilities.description}</p>
            <p><em>${spiritData.abilities.flavorText}</em></p>
            <div class="ability-details">
              ${spiritData.abilities.details.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      ${spiritData.battlePhases ? `
        <div class="spirit-detail-section battle-section">
          <h2 class="section-title">Battle Phases</h2>
          <div class="section-content">
            ${spiritData.battlePhases.firstPhase ? `
              <h3 class="subsection-title">First Phase</h3>
              <ul style="list-style-type: none; padding-left: 0;">
                ${spiritData.battlePhases.firstPhase.map(attack => `
                  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <span style="color: var(--primary-color); margin-right: 0.5rem;">•</span>
                    ${attack}
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            ${spiritData.battlePhases.secondPhase ? `
              <h3 class="subsection-title">Second Phase</h3>
              <ul style="list-style-type: none; padding-left: 0;">
                ${spiritData.battlePhases.secondPhase.map(attack => `
                  <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <span style="color: var(--primary-color); margin-right: 0.5rem;">•</span>
                    ${attack}
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${spiritData.dialogues ? `
        <div class="spirit-detail-section dialogues-section">
          <h2 class="section-title">Related Dialogues</h2>
          <div class="section-content">
            ${spiritData.dialogues.beforeBattle ? `
              <h3 class="subsection-title">Before Battle</h3>
              <div class="dialogue-container">
                ${spiritData.dialogues.beforeBattle.map(dialogue => `
                  <div class="dialogue-item">
                    <div class="dialogue-text">${dialogue}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${spiritData.dialogues.afterDefeat ? `
              <h3 class="subsection-title">After Defeat</h3>
              <div class="dialogue-container">
                ${spiritData.dialogues.afterDefeat.map(dialogue => `
                  <div class="dialogue-item">
                    <div class="dialogue-text">${dialogue}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${spiritData.dialogues.cutscene ? `
              <h3 class="subsection-title">Cutscene</h3>
              <div class="dialogue-container">
                <div class="dialogue-item">
                  <div class="dialogue-text">${spiritData.dialogues.cutscene.split('\n').map(paragraph => `<p style="margin-bottom: 1rem;">${paragraph}</p>`).join('')}</div>
                </div>
              </div>
            ` : ''}
            ${spiritData.dialogues.afterCutscene ? `
              <h3 class="subsection-title">After Cutscene</h3>
              <div class="dialogue-container">
                <div class="dialogue-item">
                  <div class="dialogue-text">${spiritData.dialogues.afterCutscene.split('\n').map(paragraph => `<p style="margin-bottom: 1rem;">${paragraph}</p>`).join('')}</div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}

      ${spiritData.trivia ? `
        <div class="spirit-detail-section trivia-section">
          <h2 class="section-title">Trivia</h2>
          <div class="section-content">
            ${spiritData.trivia.split('\n').map(line => `
              <div class="trivia-item">
                <span style="color: var(--primary-color); margin-right: 0.5rem;">•</span>
                ${line}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>

    <style>
      .dialogue-container {
        background: rgba(74, 144, 226, 0.05);
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin: 1rem 0;
      }

      .dialogue-item {
        margin-bottom: 1rem;
        padding: 1rem;
        background: white;
        border-radius: var(--border-radius);
        border-left: 4px solid var(--primary-color);
      }

      .dialogue-item:last-child {
        margin-bottom: 0;
      }

      .dialogue-text {
        font-style: italic;
        color: var(--text-primary);
        line-height: 1.6;
      }

      .trivia-item {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        align-items: flex-start;
      }

      .trivia-item:last-child {
        border-bottom: none;
      }

      .ability-details {
        background: rgba(255, 255, 255, 0.5);
        padding: 1.5rem;
        border-radius: var(--border-radius);
        margin-top: 1rem;
        border: 1px solid var(--border-color);
      }

      .battle-section ul {
        margin: 0;
        padding: 0;
      }

      .battle-section li {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
        transition: var(--transition);
      }

      .battle-section li:hover {
        background: rgba(74, 144, 226, 0.05);
        padding-left: 0.5rem;
      }

      .battle-section li:last-child {
        border-bottom: none;
      }

      @media (max-width: 768px) {
        .dialogue-container {
          padding: 1rem;
        }

        .dialogue-item {
          padding: 0.75rem;
        }

        .ability-details {
          padding: 1rem;
        }
      }

      
    </style>
  `;

  document.getElementById('spirit-detail-content').innerHTML = content;
}

// دالة لتحديث الإحصائيات
function updateSpiritsStats(spirits) {
  const totalSpirits = spirits.length;
  const collectedSpirits = spirits.filter(spirit => spirit.isCollected).length;
  const completionRate = totalSpirits > 0 ? Math.round((collectedSpirits / totalSpirits) * 100) : 0;

  const totalElement = document.getElementById('total-spirits');
  const collectedElement = document.getElementById('collected-spirits');
  const completionElement = document.getElementById('completion-rate');

  if (totalElement) totalElement.textContent = totalSpirits;
  if (collectedElement) collectedElement.textContent = collectedSpirits;
  if (completionElement) completionElement.textContent = `${completionRate}%`;
}

// دالة لإعداد الفلاتر والبحث
function setupFilters(spirits) {
  const typeFilter = document.getElementById('spirit-type');
  const availabilityFilter = document.getElementById('spirit-availability');
  const searchInput = document.getElementById('spirit-search');

  if (typeFilter) {
    typeFilter.addEventListener('change', filterSpirits);
  }

  if (availabilityFilter) {
    availabilityFilter.addEventListener('change', filterSpirits);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterSpirits);
  }

  function filterSpirits() {
    const selectedType = typeFilter ? typeFilter.value : 'all';
    const selectedAvailability = availabilityFilter ? availabilityFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filteredSpirits = spirits.filter(spirit => {
      // فلترة حسب النوع
      if (selectedType !== 'all' && spirit.type !== selectedType) {
        return false;
      }

      // فلترة حسب التوفر
      if (selectedAvailability !== 'all') {
        if (selectedAvailability === 'collected' && !spirit.isCollected) {
          return false;
        }
        if (selectedAvailability === 'missing' && spirit.isCollected) {
          return false;
        }
      }

      // فلترة حسب البحث
      if (searchTerm && !spirit.name.toLowerCase().includes(searchTerm) && 
          !spirit.description.toLowerCase().includes(searchTerm)) {
        return false;
      }

      return true;
    });

    displaySpiritsGrid(filteredSpirits);
  }
}