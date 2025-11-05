// hollow-knight-parser.js
export function parseHollowKnightSaveData(fileContent) {
    try {
        console.log('Starting Hollow Knight save file parsing...');
        
        if (!fileContent || !fileContent.trim().startsWith('{')) {
            throw new Error('File does not contain valid JSON data');
        }

        const saveData = JSON.parse(fileContent);
        const playerData = saveData.playerData;

        if (!playerData) {
            throw new Error('Player data not found in save file');
        }

        console.log('Player data found, starting analysis...');

        // --- Helper Function ---
        const getValue = (key, defaultValue = null) => {
            const value = playerData[key];
            return value !== undefined && value !== null ? value : defaultValue;
        };
        
        // --- Game Stats & Resources ---
        const stats = {
            "Profile ID": getValue("profileID", 0),
            "Play Time (seconds)": getValue("playTime", 0),
            "Completion Percentage (%)": getValue("completionPercent", 0),
            "Current Geo": getValue("geo", 0),
            "Pale Ore": getValue("ore", 0),
            "Rancid Eggs": getValue("rancidEggs", 0),
            "Simple Keys": getValue("simpleKeys", 0),
            "Lifeblood Health": getValue("healthBlue", 0),
            "Max Health (Masks)": getValue("maxHealth", 5),
            "Current Health": getValue("health", 0),
            "Vessel Fragments Collected": getValue("vesselFragments", 0),
            "Essence (Dream Orbs)": getValue("dreamOrbs", 0),
            "Nail Damage": getValue("nailDamage", 5),
            "Mask Shards": getValue("heartPieces", 0)
        };

        // --- Core Abilities ---
        const abilities = {
            "Dash": getValue("canDash", false),
            "Wall Jump": getValue("canWallJump", false),
            "Super Dash": getValue("hasSuperDash", false),
            "Shadow Dash": getValue("canShadowDash", false),
            "Double Jump": getValue("hasDoubleJump", false),
            "Acid Immunity": getValue("hasAcidArmour", false),
            "Cyclone Slash": getValue("hasCyclone", false),
            "Dash Slash": getValue("hasDashSlash", false),
            "Great Slash": getValue("hasUpwardSlash", false),
            "Dream Nail": getValue("hasDreamNail", false),
            "Dream Gate": getValue("hasDreamGate", false),
            "King's Brand": getValue("hasKingsBrand", false),
            "Lantern": getValue("hasLantern", false),
            "Tram Pass": getValue("hasTramPass", false)
        };

        // --- Bosses ---
    
const bosses = {
    "False Knight Defeated": getValue("falseKnightDefeated", false) || getValue("unlockedBossScenes", []).includes("False Knight Boss Scene"),
    "Mantis Lords Defeated": getValue("killedMantisLord", false) || getValue("unlockedBossScenes", []).includes("Mantis Lords Boss Scene"),
    "Soul Master Defeated": getValue("mageLordDefeated", false) || getValue("unlockedBossScenes", []).includes("Soul Master Boss Scene"),
    "Dung Defender Defeated": getValue("killedDungDefender", false) || getValue("unlockedBossScenes", []).includes("Dung Defender Boss Scene"),
    "Broken Vessel Defeated": getValue("brokenVesselDefeated", false) || getValue("unlockedBossScenes", []).includes("Broken Vessel Boss Scene"),
    "Watcher Knights Defeated": getValue("watcherKnightDefeated", false) || getValue("unlockedBossScenes", []).includes("Watcher Knights Boss Scene"),
    "Uumuu Defeated": getValue("uumuuDefeated", false) || getValue("unlockedBossScenes", []).includes("Uumuu Boss Scene"),
    "Hornet 1 (Greenpath) Defeated": getValue("hornet1Defeated", false) || getValue("unlockedBossScenes", []).includes("Hornet 1 Boss Scene"),
    "Hornet 2 (Kingdom's Edge) Defeated": getValue("hornetOutskirtsDefeated", false) || getValue("unlockedBossScenes", []).includes("Hornet 2 Boss Scene"),
    "Hive Knight Defeated": getValue("hiveKnightDefeated", false) || getValue("unlockedBossScenes", []).includes("Hive Knight Boss Scene"),
    "Gruz Mother Defeated": getValue("GruzMotherDefeated", false) || getValue("unlockedBossScenes", []).includes("Gruz Boss Scene"),
    "The Collector Defeated": getValue("killedJarCollector", false),
    "Hollow Knight Boss Defeated": getValue("killedHollowKnight", false),
    "Radiance Boss Defeated": getValue("killedFinalBoss", false),
    "Flukemarm Defeated": getValue("flukeMotherDefeated", false),
    "Mawlek (Brooding) Defeated": getValue("killedMawlek", false) || getValue("unlockedBossScenes", []).includes("Brooding Mawlek Boss Scene"),
    "Dreamers Defeated Count": [
        getValue("lurienDefeated", false),
        getValue("hegemolDefeated", false),
        getValue("monomonDefeated", false)
    ].filter(Boolean).length,
    "Colosseum Trial 1 (Bronze) Completed": getValue("colosseumBronzeCompleted", false),
    "Colosseum Trial 2 (Silver) Completed": getValue("colosseumSilverCompleted", false),
    "Colosseum Trial 3 (Gold) Completed": getValue("colosseumGoldCompleted", false),
    "Grey Prince Zote Defeated": getValue("killedZote", false),
    "White Defender Defeated": getValue("killedWhiteDefender", false),
    "Failed Champion Defeated": getValue("killedFalseKnightDream", false),
    "Lost Kin Defeated": getValue("killedInfectedKnightDream", false),
    "Soul Tyrant Defeated": getValue("killedMageLordDream", false),
    
};

// --- Dream Warriors ---
const dreamWarriors = {
    "Dream Warrior Gorb Defeated": getValue("killedGhostGorb", false) || getValue("unlockedBossScenes", []).includes("Gorb Boss Scene"),
    "Dream Warrior Elder Hu Defeated": getValue("killedGhostHu", false),
    "Dream Warrior Marmu Defeated": getValue("killedGhostMarmu", false),
    "Dream Warrior No Eyes Defeated": getValue("killedGhostNoEyes", false),
    "Dream Warrior Markoth Defeated": getValue("killedGhostMarkoth", false),
    "Dream Warrior Galien Defeated": getValue("killedGhostGalien", false),
    "Dream Warrior Xero Defeated": getValue("killedGhostXero", false) || getValue("unlockedBossScenes", []).includes("Xero Boss Scene")
};

        // --- Charms ---
        const charmsList = [];
        const charmNames = {
            1: "Wayward Compass", 2: "Gathering Swarm", 3: "Stalwart Shell", 4: "Soul Catcher", 5: "Shaman Stone", 
            6: "Soul Eater", 7: "Dashmaster", 8: "Thorns of Agony", 9: "Fury of the Fallen", 10: "Spell Twister", 
            11: "Longnail", 12: "Steady Body", 13: "Heavy Blow", 14: "Quick Slash", 15: "Grubberfly's Elegy", 
            16: "Fragile Heart", 17: "Fragile Greed", 18: "Fragile Strength", 19: "Quick Focus", 20: "Deep Focus",
            21: "Lifeblood Heart", 22: "Lifeblood Core", 23: "Joni's Blessing", 24: "Grubsong", 25: "Weaversong", 
            26: "Dream Wielder", 27: "Dreamshield", 28: "Shape of Unn", 29: "Nailmaster's Glory", 30: "Great/Glowing Womb",
            31: "Flukenest", 32: "Defender's Crest", 33: "Glowing Womb", 34: "Sharp Shadow", 35: "Kingsoul", 
            36: "Void Heart", 37: "Grimmchild", 38: "Carefree Melody", 39: "Grimmchild (Pre-Evolution)", 40: "Carefree Melody (Pre-Evolution)"
        };

        for (let i = 1; i <= 40; i++) {
            if (getValue(`gotCharm_${i}`, false)) {
                charmsList.push({
                    id: i,
                    name: charmNames[i] || `Charm ${i}`,
                    cost: getValue(`charmCost_${i}`, 1),
                    got: true,
                    equipped: getValue("equippedCharms", []).includes(i)
                });
            }
        }

        const charms = {
            "Total Charms Found": charmsList.length,
            "Charm Slots Unlocked": getValue("charmSlots", 3),
            "List of Charms": charmsList,
            "All Charms Collected": charmsList.length >= 40,
            "Equipped Charms": getValue("equippedCharms", [])
        };

        // --- Collectibles ---
        const collectibles = {
            "Grub Count": getValue("grubsCollected", 0),
            "Relic Count": getValue("trinket1", 0) + getValue("trinket2", 0) + getValue("trinket3", 0) + getValue("trinket4", 0),
            "Map Pins": getValue("mapMarkers", 0),
            "Whispering Roots": getValue("rootCompleted", false)
        };

        // --- Quest Status ---
        const questStatus = {
            "Nailsmith Upgrades": getValue("nailSmithUpgrades", 0),
            "Stations Opened": getValue("stationsOpened", 0),
            "Journal Entries Completed": getValue("journalEntriesCompleted", 0),
            "Nailsmith Status": getValue("nailsmithKilled") ? "Killed" : (getValue("nailsmithSpared") ? "Spared" : "Alive"),
            "Sly Rescued": getValue("slyRescued", false),
            "Bretta Rescued": getValue("brettaRescued", false),
            "Zote Rescued": getValue("zoteRescuedBuzzer", false)
        };

        // --- Journal ---
        const journalEntries = {
            "Total Entries": getValue("journalEntriesTotal", 0),
            "Completed Entries": getValue("journalEntriesCompleted", 0),
            "Notes Completed": getValue("journalNotesCompleted", 0),
            "Hunter's Mark": getValue("hasHuntersMark", false)
        };

        // --- NPC & World State ---
        const worldState = {
            "Banker Balance": getValue("bankerBalance", 0),
            "Banker Robbed": getValue("bankerTheft", false),
            "Jiji Met": getValue("jijiMet", false),
            "All Believer Tablets Destroyed": getValue("allBelieverTabletsDestroyed", false),
            "Mr. Mushroom State": getValue("mrMushroomState", 0)
        };

        // تجميع كل البيانات في كائن واحد
        const analysisData = {
            stats: stats,
            abilities: abilities,
            charms: charms,
            bosses: { ...bosses, ...dreamWarriors },
            collectibles: collectibles,
            questStatus: questStatus,
            journalEntries: journalEntries,
            worldState: worldState
        };

        // حساب نسبة الإنجاز
        const completion = Math.min(Math.max(getValue("completionPercent", 0), 0), 100);
        
        console.log('Parsing completed successfully');
        console.log('Completion:', completion);
        console.log('Analysis data keys:', Object.keys(analysisData));

        return {
            analysisData: analysisData,
            completion: completion > 0 ? `${completion}%` : "0%"
        };

    } catch (error) {
        console.error('Hollow Knight parsing error:', error);
        console.error('Error stack:', error.stack);
        
        // إرجاع بيانات أساسية في حالة الخطأ
        const fallbackData = {
            analysisData: {
                stats: {
                    "Game Version": "Unknown",
                    "Play Time (seconds)": 0,
                    "Completion Percentage (%)": 0,
                    "Current Geo": 0,
                    "Current Health": 0,
                    "Max Health (Masks)": 0
                },
                abilities: {},
                charms: {
                    "Total Charms Found": 0,
                    "List of Charms": []
                },
                bosses: {},
                collectibles: {},
                questStatus: {},
                journalEntries: {},
                worldState: {}
            },
            completion: "0% (Error)"
        };
        
        return fallbackData;
    }
}

// دالة مساعدة لتنظيف البيانات قبل الحفظ في Firebase
export function cleanHollowKnightData(data) {
    const cleanData = (obj) => {
        if (obj === null || obj === undefined) {
            return null;
        }
        
        if (Array.isArray(obj)) {
            return obj.map(item => cleanData(item));
        }
        
        if (typeof obj === 'object') {
            const cleaned = {};
            for (const [key, value] of Object.entries(obj)) {
                const cleanedValue = cleanData(value);
                if (cleanedValue !== undefined) {
                    cleaned[key] = cleanedValue;
                }
            }
            return cleaned;
        }
        
        return obj;
    };
    
    return cleanData(data);
}