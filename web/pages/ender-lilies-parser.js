// ender-lilies-parser.js
export function parseEnderLiliesSaveData(fileContent) {
  try {
    // التحقق من أن الملف يحتوي على JSON صالح
    if (!fileContent.trim().startsWith('{')) {
      throw new Error('File does not contain valid JSON data');
    }

    const saveData = JSON.parse(fileContent);
    
    // التحقق من البنية الأساسية للملف
    if (!saveData.root || !saveData.root.properties) {
      throw new Error('Save file missing required structure (root.properties)');
    }

    const playerData = saveData.root.properties.Player_0?.Struct?.Struct;
    const gameModeData = saveData.root.properties.GameMode_0?.Struct?.Struct;
    
    if (!playerData) {
      throw new Error('Player data not found in save file');
    }

    if (!gameModeData) {
      throw new Error('Game mode data not found in save file');
    }
    
    // استخراج المعلومات الأساسية مع التحقق من وجودها
    const parameters = playerData.Parameters_0?.Struct?.Struct;
    const level = parameters?.Level_0?.Int || 1;
    const exp = parameters?.ExpPoint_0?.Int || 0;
    
    const heals = playerData.Heals_0?.Struct?.Struct;
    const healPower = heals?.HealPowerLevel_0?.Int || 1;
    const currentHeals = heals?.CurrHealCount_0?.Int || 0;
    
    // العملات
    const inventory = playerData.Inventory_0?.Struct?.Struct;
    const currencies = inventory?.Currencies_0?.Map || [];
    const spiritLv1 = currencies.find(c => c.key.Enum === 'ECurrencyType::Spirit_Lv1')?.value.Int || 0;
    const spiritLv2 = currencies.find(c => c.key.Enum === 'ECurrencyType::Spirit_Lv2')?.value.Int || 0;
    const spiritLv3 = currencies.find(c => c.key.Enum === 'ECurrencyType::Spirit_Lv3')?.value.Int || 0;
    
    // الأرواح المجمعة
    const spirits = inventory?.ItemSpirits_0?.Array?.Base?.Name || [];
    const spiritLevels = inventory?.ItemSpiritLevels_0?.Map || [];
    
    // المهارات السلبية
    const passives = inventory?.ItemPassives_0?.Array?.Base?.Name || [];
    
    // المناطق المفتوحة
    const openedAreas = playerData.OpenedAreaIDs_0?.Array?.Base?.Name || [];
    
    // الإنجازات
    const achievementsData = saveData.root.properties.GameAchievements_0?.Struct?.Struct;
    const achievements = achievementsData?.Achievements_0?.Array?.Base?.Enum || [];
    
    // وقت اللعب (بالثواني)
    const gameStats = gameModeData.GameStats_0?.Struct?.Struct;
    const playTimeSeconds = gameStats?.PlayTime_0?.Float || 0;
    const playTimeHours = (playTimeSeconds / 3600).toFixed(1);
    
    // حساب نسبة الإكمال التقريبية
    const completion = calculateCompletion(spirits, passives, openedAreas, achievements);
    
    // نقطة البداية
    const respawnPoint = playerData.RespawnPoint_0?.Struct?.Struct;
    
    return {
      level,
      exp,
      healPower,
      currentHeals,
      currencies: {
        spiritLv1,
        spiritLv2,
        spiritLv3
      },
      spirits: spirits.map(spiritId => ({
        id: spiritId,
        name: getSpiritName(spiritId),
        level: spiritLevels.find(sl => sl.key.Name === spiritId)?.value.Int || 1
      })),
      passives: passives.map(passiveId => ({
        id: passiveId,
        name: getPassiveName(passiveId)
      })),
      openedAreas: openedAreas.map(areaId => ({
        id: areaId,
        name: getAreaName(areaId)
      })),
      achievements: achievements.map(achievementId => ({
        id: achievementId,
        name: getAchievementName(achievementId)
      })),
      playTime: playTimeHours,
      completion,
      gameVersion: saveData.root.properties.ValidGameVersion_0?.Str || 'Unknown',
      respawnPoint: {
        map: respawnPoint?.GameMapID_0?.Name || 'Unknown',
        point: respawnPoint?.PlayerStartTag_0?.Name || 'Unknown'
      },
      fileStructure: 'valid'
    };
  } catch (error) {
    console.error('Error parsing Ender Lilies save file:', error);
    
    // تقديم معلومات أكثر تفصيلاً عن الخطأ
    if (error.message.includes('JSON')) {
      throw new Error('Invalid JSON format: ' + error.message);
    } else if (error.message.includes('structure')) {
      throw new Error('Invalid save file structure: ' + error.message);
    } else {
      throw new Error('Failed to parse save file: ' + error.message);
    }
  }
}

function calculateCompletion(spirits, passives, openedAreas, achievements) {
  // تحديث القيم لتعكس المحتوى الحقيقي
  const totalSpirits = 26; // تم تحديث العدد من 24 إلى 26
  const totalPassives = 16;
  const totalAreas = 21;
  const totalAchievements = 24;
  
  const spiritCompletion = (spirits.length / totalSpirits) * 30;
  const passiveCompletion = (passives.length / totalPassives) * 25;
  const areaCompletion = (openedAreas.length / totalAreas) * 30;
  const achievementCompletion = (achievements.length / totalAchievements) * 15;
  
  return Math.min(Math.round(spiritCompletion + passiveCompletion + areaCompletion + achievementCompletion), 100);
}

function getSpiritName(spiritId) {
  const spiritNames = {
    's5000': 'Umbral Knight',
    's5010': 'Guardian Siegrid',
    's5020': 'Guardian Silva',
    's5030': 'Knight Captain Julius',
    's5040': 'Dark Witch Eleine',
    's5050': 'Gerrod, the Elder Warrior',
    's5060': 'Hoenir, Keeper of the Abyss',
    's5070': 'Ulv, The Mad Knight',
    's5080': 'Faden, the Heretic',
    's2002': 'Headless Defender',
    's2012': 'Cliffside Hamlet Youth',
    's2022': 'Fallen Archer',
    's2032': 'One-Eyed Royal Aegis',
    's2052': 'Incompetent Sinner',
    's2072': 'Hidden Test Subject',
    's2082': 'Castle Town Maiden',
    's2092': 'Chief Guardian',
    's2102': 'Western Merchant',
    's2112': 'Cliffside Hamlet Elder',
    's2122': 'Fungal Sorcerer',
    's2132': 'Floral Sorceress',
    's2162': 'Elder Crypt Keeper',
    's2172': 'Verboten Champion',
    's2182': 'Dark Executioner',
    's2192': 'Fallen Sentinel',
    's2232': 'Forsaken Fellwyrm'
  };
  
  return spiritNames[spiritId] || spiritId;
}

function getPassiveName(passiveId) {
  const passiveNames = {
    'i_passive_maxhpup_LV1': 'Max HP Up Lv1',
    'i_passive_maxhpup_LV2': 'Max HP Up Lv2',
    'i_passive_dmgcut_LV1': 'Damage Cut Lv1',
    'i_passive_dmgup': 'Damage Up',
    'i_passive_dmgup_grounded': 'Grounded Damage Up',
    'i_passive_dmgup_airborne': 'Airborne Damage Up',
    'i_passive_dmgup_maxhp': 'Max HP Damage Up',
    'i_passive_stunstamina_damage_up': 'Stun Damage Up',
    'i_passive_regenHP_attack': 'HP Regen on Attack',
    'i_passive_spirit_maxcast_count_up_LV2': 'Spirit Cast Count Up Lv2',
    'i_passive_recast_time_cut_LV1': 'Recast Time Cut Lv1',
    'i_passive_heal_power_up': 'Heal Power Up',
    'i_passive_shortheal': 'Short Heal',
    'i_passive_move_speed_up': 'Move Speed Up',
    'i_passive_expup_2': 'EXP Up',
    'i_passive_parry': 'Parry'
  };
  
  return passiveNames[passiveId] || passiveId;
}

function getAreaName(areaId) {
  const areaNames = {
    'area_church': 'Cathedral',
    'area_church_2': 'Cathedral Cloister',
    'area_village': 'Witchs Haven',
    'area_forest': 'Verboten Forest',
    'area_cave': 'Subterranean Lab',
    'area_oubliette': 'The Depths',
    'area_fort': 'Twin Spires',
    'area_swamp': 'Stockade of Sulfur',
    'area_castle': 'Royal Garden',
    'area_abyss': 'Abyss',
    'area_outside': 'Outside'
  };
  
  return areaNames[areaId] || areaId;
}

function getAchievementName(achievementId) {
  const achievementNames = {
    'EZenithAchievement::SpiritGet_S5010': 'First Spirit',
    'EZenithAchievement::PlayerLevel_10': 'Level 10',
    'EZenithAchievement::SpiritGet_Count_5': '5 Spirits',
    'EZenithAchievement::SpiritGet_S5050': 'Hoenir Defeated',
    'EZenithAchievement::SpiritGet_S5040': 'Julius Defeated',
    'EZenithAchievement::RestPoint_Count_10': '10 Rest Points',
    'EZenithAchievement::SpiritGet_S5020': 'Eleine Defeated',
    'EZenithAchievement::SpiritGet_Count_10': '10 Spirits',
    'EZenithAchievement::PlayerLevel_50': 'Level 50',
    'EZenithAchievement::PlayerLevel_100': 'Level 100',
    'EZenithAchievement::SpiritGet_S5060': 'Ulv Defeated',
    'EZenithAchievement::SpiritGet_Count_15': '15 Spirits',
    'EZenithAchievement::Ending_A': 'Ending A',
    'EZenithAchievement::SpiritGet_S5030': 'Gerrod Defeated',
    'EZenithAchievement::SpiritGet_S5080': 'The Silent One Defeated',
    'EZenithAchievement::SpiritGet_S5070': 'The Fallen Archer Defeated',
    'EZenithAchievement::SpiritGet_AllBosses': 'All Bosses Defeated',
    'EZenithAchievement::RestPoint_Count_ALL': 'All Rest Points',
    'EZenithAchievement::Ending_A': 'Ending A',
    'EZenithAchievement::Ending_B': 'Ending B',
    'EZenithAchievement::Ending_C': 'Ending C'
  };
  
  return achievementNames[achievementId] || achievementId.replace('EZenithAchievement::', '');
}