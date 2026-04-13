import React from 'react';

// Core dictionary containing all translations
export const dict = {
  // Stages
  stages: {
    RECIPE: { en: 'Select Recipe', zh: '选择配方' },
    MATERIALS: { en: 'Gather Materials', zh: '选择材料' },
    SMELT: { en: 'Smelt Materials', zh: '熔炼材料' },
    SHAPE: { en: 'Infuse Energy and Shape', zh: '灌注能量并塑形' },
    DEMON_CORE: { en: 'Enhance Materials / Upgrade', zh: '强化材料/升级' },
    SPIRIT_ESSENCE: { en: 'Enhance Materials / Upgrade', zh: '强化材料/升级' },
    HARMONIZATION: { en: 'Repair / Harmonize', zh: '修复' },
    RUNE_INSCRIPTION: { en: 'Rune Inscription', zh: '符文铭刻' },
    TEMPERING: { en: 'Final Tempering', zh: '成器祭炼' },
  },

  // Base Forms
  coreForms: {
    'Sword': { en: 'Sword', zh: '剑' },
    'Blade': { en: 'Blade', zh: '刃' },
    'Shield': { en: 'Shield', zh: '盾' },
    'Aegis': { en: 'Aegis', zh: '盾' },
    'Cauldron': { en: 'Cauldron', zh: '鼎' },
    'Bell': { en: 'Bell', zh: '钟' },
    'Orb': { en: 'Orb / Pearl', zh: '珠' },
    'Fan': { en: 'Fan', zh: '扇' },
    'Ring': { en: 'Ring', zh: '环' },
    'Banner': { en: 'Banner / Flag', zh: '旗' },
    'Mirror': { en: 'Mirror', zh: '镜' },
    'Pagoda': { en: 'Pagoda', zh: '塔' },
    'Seal': { en: 'Seal', zh: '印' },
    'Gourd': { en: 'Gourd', zh: '葫芦' },
    'Whisk': { en: 'Whisk', zh: '拂尘' },
  },

  // Roots
  roots: {
    'Physical Root': { en: 'Physical Root', zh: '体修灵根' },
    'Spiritual Root': { en: 'Spiritual Root', zh: '灵修灵根' },
    'Demonic Root': { en: 'Demonic Root', zh: '魔修灵根' },
    'Divine Root': { en: 'Divine Root', zh: '神修灵根' },
    'Neutral Root': { en: 'Neutral Root', zh: '无灵根' },
    'Water Root': { en: 'Water Root', zh: '水灵根' },
    'Lightning Root': { en: 'Lightning Root', zh: '雷灵根' },
    'Fire Root': { en: 'Fire Root', zh: '火灵根' },
    'Metal Root': { en: 'Metal Root', zh: '金灵根' },
  },

  materialTypes: {
    'Matrix Material': { en: 'Matrix', zh: '基质' },
    'Source Material': { en: 'Source Essence', zh: '源质' },
    'Demon Core': { en: 'Demon Core', zh: '妖丹' },
    'Spirit Essence': { en: 'Spirit Essence', zh: '精魂' },
    'Harmonization Item': { en: 'Harmonization Item', zh: '修复之物' },
  },

  ui: {
    confirm: { en: 'Confirm', zh: '确认' },
    inventory: { en: 'Spatial Ring Inventory', zh: '储物戒指' },
    slotsUsed: { en: 'Slots Used', zh: '已用空间' },
    playersMaterials: { en: "Player's Materials", zh: '修士的材料' },
    qty: { en: 'Qty', zh: '数量' },
    backToRecipes: { en: 'Back to Recipes', zh: '返回配方' },
    currentPhase: { en: 'Current Phase', zh: '当前阶段' },
    celestialForge: { en: 'Celestial Forge', zh: '造化玄炉' },

    // Select Recipe
    materialScanComplete: { en: 'Material Scan complete. You have (4) Recipes available to craft.', zh: '材料扫描完毕。当前可炼制(4)种配方。' },
    componentsNeeded: { en: 'Components Needed', zh: '所需材料' },

    // Gather Materials
    confirmIngredients: { en: 'Confirm the required ingredients to begin.', zh: '确认所需材料以开始炼制。' },
    calculatedRoot: { en: 'Calculated Elemental Root', zh: '推演灵根属性' },
    totalCost: { en: 'Total Spirit Stone Cost', zh: '灵石总消耗' },
    consumeAndConfirm: { en: 'Consume Materials & Confirm', zh: '消耗材料并确认' },

    // General Actions
    smeltMaterialsAction: { en: 'Smelt Materials', zh: '熔炼材料' },
    fuseToFabing: { en: 'Fuse into FaBing Base', zh: '融合成法兵粗胚' },
    fuseToLingqi: { en: 'Embed Core (Upgrade to LingQi)', zh: '镶嵌妖丹 (升阶灵器)' },
    fuseToFabao: { en: 'Infuse Essence (Upgrade to FaBao)', zh: '注入精魂 (升阶法宝)' },
    repairFlaws: { en: 'Repair Selected Flaws', zh: '修复选中瑕疵' },
    completeHarmonization: { en: 'Complete Harmonization (FaBing)', zh: '完成修复 (法兵)' },
    completeHarmonizationLingQi: { en: 'Complete Harmonization (LingQi)', zh: '完成修复 (灵器)' },
    completeHarmonizationFaBao: { en: 'Complete Harmonization (FaBao)', zh: '完成修复 (法宝)' },
    finishInscription: { en: 'Finish Inscription & Proceed', zh: '完成铭刻并继续' },
    igniteForge: { en: 'Ignite the Forging Fire', zh: '点燃灵火祭炼' },
    startNewArtifact: { en: 'Start New Artifact', zh: '炼制新法宝' },

    // Stats
    statCategories: {
      'Attack': { en: 'Attack', zh: '攻击' },
      'Defense': { en: 'Defense', zh: '防御' },
      'Durability': { en: 'Durability', zh: '耐久' },
      'Utility': { en: 'Utility', zh: '妙用' },
      'Spirit Cost': { en: 'Spirit Cost', zh: '法力消耗' },
      'Resonance': { en: 'Resonance', zh: '共鸣度' },
    },
    // Other headers
    artifactStats: { en: 'Artifact Stats', zh: '法宝属性' },
    statsAtGlance: { en: 'Stats at a Glance', zh: '属性一览' },
    currentTier: { en: 'Current Tier', zh: '当前品阶' },

    // Smelt text
    smeltWarning: { en: 'Incinerate and refine the raw materials into their pure elemental form.', zh: '将原始材料焚烧并提炼成纯粹的元素形态。' },
    stabilizingMatrix: { en: 'Stabilizing Matrix Structure', zh: '稳固基质结构' },
    extractingSource: { en: 'Extracting Source Power', zh: '提取源泉之力' },
    purificationSub: { en: 'Purification prevents elemental rejection.', zh: '提纯可以防止属性排斥。' },

    // Shape Material text
    shapeDesc: { en: 'Mould the liquified elements into a base physical form.', zh: '将液化元素塑造成基础形体。' },
    baseFormShape: { en: 'Base Form', zh: '基础外形' },
    baseFormDesc: { en: 'Physical damage and weight parameters determined.', zh: '确立物理伤害与重量参数。' },
    manaConductivity: { en: 'Mana Conductivity', zh: '法力传导率' },
    manaConductDesc: { en: 'Determines efficiency of future augmentations.', zh: '决定未来强化的灵力运转效率。' },

    // Final Tempering
    temperingDesc: { en: 'Your artifact is fully formed. Behold its final properties.', zh: '法宝已成。请观其最终属性。' },

    // Placeholder
    runeInscriptionDesc: { en: "Inscribe runes to enhance your artifact's final power.", zh: '铭刻符文以提升法宝最终威能。' },
    runeInscriptionPlaceholder: { en: '[ Rune Inscription Content Placeholder ]', zh: '[ 符文铭刻内容占位符 ]' },
  },

  // Data-driven translations: recipe names, material names, stat names, flaws, resolutions.
  // Same { en, zh } shape as everything else in dict.
  data: {
    // ── Recipe names ──────────────────────────────────────────────────────────
    'Tide-Severing Sword':        { en: 'Tide-Severing Sword',        zh: '断潮剑' },
    'Crimson Storm Feather-Fan':  { en: 'Crimson Storm Feather-Fan',  zh: '赤暴羽扇' },
    'Scorched Shell Aegis':       { en: 'Scorched Shell Aegis',       zh: '焦壳之盾' },
    'Void Star Blade':            { en: 'Void Star Blade',            zh: '虚空星刃' },

    // ── Materials ─────────────────────────────────────────────────────────────
    'Deep Sea Iron':              { en: 'Deep Sea Iron',              zh: '深海玄铁' },
    'Thunder Bamboo':             { en: 'Thunder Bamboo',             zh: '雷击竹' },
    'Magma Turtle Shell':         { en: 'Magma Turtle Shell',         zh: '熔岩灵龟壳' },
    'Netherflame Crystal':        { en: 'Netherflame Crystal',        zh: '幽冥火晶' },
    'Razoredge Obsidian':         { en: 'Razoredge Obsidian',        zh: '裂刃黑曜石' },
    'Demon Heart':                { en: 'Demon Heart',                zh: '大妖之心' },
    'Heavenly Starfall Iron':     { en: 'Heavenly Starfall Iron',     zh: '天外陨铁' },
    'Spirit Wolf Soul':           { en: 'Spirit Wolf Soul',           zh: '啸月狼魂' },

    // ── Stat names ────────────────────────────────────────────────────────────
    'Global Damage':                          { en: 'Global Damage',                          zh: '全局伤害' },
    'Attack Damage':                          { en: 'Attack Damage',                          zh: '攻击伤害' },
    'Spell Damage':                           { en: 'Spell Damage',                           zh: '神通伤害' },
    'Physical Damage':                        { en: 'Physical Damage',                        zh: '物理伤害' },
    'Mental Damage':                          { en: 'Mental Damage',                          zh: '神识伤害' },
    'Elemental Damage':                       { en: 'Elemental Damage',                       zh: '五行伤害' },
    'Poise Damage Force':                     { en: 'Poise Damage Force',                     zh: '削韧力' },
    'Barrier Penetration':                    { en: 'Barrier Penetration',                    zh: '破盾穿透' },
    'Crit Chance':                            { en: 'Crit Chance',                            zh: '暴击率' },
    'Crit Multiplier':                        { en: 'Crit Multiplier',                        zh: '暴击倍率' },
    'Spirit Sense Injury':                    { en: 'Spirit Sense Injury',                    zh: '神识创伤' },
    'Spirit Sense Damage Strength':           { en: 'Spirit Sense Damage Strength',           zh: '神识伤害强度' },
    'Spirit Sense Penetration':               { en: 'Spirit Sense Penetration',               zh: '神识穿透' },
    'Spirit Sense Interference Strength':     { en: 'Spirit Sense Interference Strength',     zh: '神识干扰强度' },
    'Elemental Damage Resist':                { en: 'Elemental Damage Resist',                zh: '五行伤害抗性' },
    'Mental Damage Resist':                   { en: 'Mental Damage Resist',                   zh: '精神伤害抗性' },
    'Rebound':                                { en: 'Rebound',                                zh: '反伤' },
    'Poise Damage Resist':                    { en: 'Poise Damage Resist',                    zh: '削韧抗性' },
    'Crit Resist':                            { en: 'Crit Resist',                            zh: '暴击抗性' },
    'Spirit Sense Resist Strength':           { en: 'Spirit Sense Resist Strength',           zh: '神识抗性强度' },
    'Spirit Sense Interference Resist Strength': { en: 'Spirit Sense Interference Resist Strength', zh: '神识干扰抵抗' },
    'Skill Cooldown':                         { en: 'Skill Cooldown',                         zh: '法术冷却' },
    'Spirit Sense Reserve':                   { en: 'Spirit Sense Reserve',                   zh: '神识储备' },
    'Fabao Amplification':                    { en: 'Fabao Amplification',                    zh: '法宝增幅' },
    'Control Distance Increase':              { en: 'Control Distance Increase',              zh: '御物距离提升' },
    'Max Speed':                              { en: 'Max Speed',                              zh: '最高速度' },
    'Acceleration':                           { en: 'Acceleration',                           zh: '加速度' },
    'Maneuverability':                        { en: 'Maneuverability',                        zh: '机动性' },
    'Artifact Flight Mana Cost':              { en: 'Artifact Flight Mana Cost',              zh: '飞行灵力消耗' },

    // ── Flaws (impurity / seal titles) ───────────────────────────────────────
    'Dormant Core':               { en: 'Dormant Core',               zh: '核心休眠' },
    'Suppressed Aura':            { en: 'Suppressed Aura',            zh: '气息压制' },
    'Sealed Might':               { en: 'Sealed Might',               zh: '威能封印' },
    'Unsharpened Qi':             { en: 'Unsharpened Qi',             zh: '气刃未开' },
    'Bound Strike':               { en: 'Bound Strike',               zh: '束缚之击' },
    'Dull Edge':                  { en: 'Dull Edge',                  zh: '锋刃迟钝' },
    'Faded Rune':                 { en: 'Faded Rune',                 zh: '符文暗淡' },
    'Muted Incantation':          { en: 'Muted Incantation',          zh: '咒语消音' },
    'Dimmed Array':               { en: 'Dimmed Array',               zh: '阵图无光' },
    'Blunt Mass':                 { en: 'Blunt Mass',                 zh: '重物生钝' },
    'Softened Alloy':             { en: 'Softened Alloy',             zh: '合金软化' },
    'Weakened Impact':            { en: 'Weakened Impact',            zh: '冲击疲软' },
    'Clouded Intent':             { en: 'Clouded Intent',             zh: '意念蒙尘' },
    'Fractured Will':             { en: 'Fractured Will',             zh: '意志碎裂' },
    'Murky Mindscape':            { en: 'Murky Mindscape',            zh: '识海混浊' },
    'Stifled Spark':              { en: 'Stifled Spark',              zh: '灵火窒息' },
    'Ashen Core':                 { en: 'Ashen Core',                 zh: '灰烬核心' },
    'Frozen Meridian':            { en: 'Frozen Meridian',            zh: '经脉冻结' },
    'Faltering Momentum':         { en: 'Faltering Momentum',         zh: '后继无力' },
    'Hollow Force':               { en: 'Hollow Force',               zh: '虚浮之力' },
    'Featherweight Strike':       { en: 'Featherweight Strike',       zh: '软绵之击' },
    'Blunt Qi Needle':            { en: 'Blunt Qi Needle',            zh: '气针粗钝' },
    'Shallow Pierce':             { en: 'Shallow Pierce',             zh: '浅表穿刺' },
    'Deflected Intent':           { en: 'Deflected Intent',           zh: '意图偏移' },
    'Misaligned Stars':           { en: 'Misaligned Stars',           zh: '星象错位' },
    'Blurred Focus':              { en: 'Blurred Focus',              zh: '焦点模糊' },
    'Wavering Strike':            { en: 'Wavering Strike',            zh: '飘忽之击' },
    'Restrained Ferocity':        { en: 'Restrained Ferocity',        zh: '凶性内敛' },
    'Capped Limits':              { en: 'Capped Limits',              zh: '境界桎梏' },
    'Suppressed Burst':           { en: 'Suppressed Burst',           zh: '爆发压制' },
    'Shallow Soul-Bite':          { en: 'Shallow Soul-Bite',          zh: '噬魂无力' },
    'Dull Spiritual Edge':        { en: 'Dull Spiritual Edge',        zh: '灵刃迟钝' },
    'Weakened Mind-Rend':         { en: 'Weakened Mind-Rend',         zh: '心神撕裂微弱' },
    'Fraying Thread':             { en: 'Fraying Thread',             zh: '神识丝线磨损' },
    'Diluted Soul-Poison':        { en: 'Diluted Soul-Poison',        zh: '魂毒稀释' },
    'Dispersed Intent':           { en: 'Dispersed Intent',           zh: '意念涣散' },
    'Blocked Mind-Eye':           { en: 'Blocked Mind-Eye',           zh: '心眼蒙蔽' },
    'Tangled Sense-Weave':        { en: 'Tangled Sense-Weave',        zh: '感知乱结' },
    'Obstructed Gaze':            { en: 'Obstructed Gaze',            zh: '视线受阻' },
    'Feeble Illusion':            { en: 'Feeble Illusion',            zh: '幻象微弱' },
    'Weakened Static':            { en: 'Weakened Static',            zh: '干扰减弱' },
    'Faltering Disruption':       { en: 'Faltering Disruption',       zh: '破坏乏力' },
    'Porous Coating':             { en: 'Porous Coating',             zh: '涂层多孔' },
    'Tarnished Glaze':            { en: 'Tarnished Glaze',            zh: '釉面暗淡' },
    'Leaking Qi':                 { en: 'Leaking Qi',                 zh: '灵气外泄' },
    'Brittle Mind-Wall':          { en: 'Brittle Mind-Wall',          zh: '心墙脆弱' },
    'Open Consciousness':         { en: 'Open Consciousness',         zh: '识海敞开' },
    'Fragile Soul-Barrier':       { en: 'Fragile Soul-Barrier',       zh: '魂障薄弱' },
    'Absorbing Matrix':           { en: 'Absorbing Matrix',           zh: '基阵吸纳' },
    'Dull Reflection':            { en: 'Dull Reflection',            zh: '反射迟钝' },
    'Shattered Mirror-Rune':      { en: 'Shattered Mirror-Rune',      zh: '镜文碎裂' },
    'Brittle Stance':             { en: 'Brittle Stance',             zh: '身法僵硬' },
    'Unrooted Core':              { en: 'Unrooted Core',              zh: '无根之源' },
    'Faltering Anchor':           { en: 'Faltering Anchor',           zh: '锚定失效' },
    'Exposed Weakness':           { en: 'Exposed Weakness',           zh: '弱点暴露' },
    'Unveiled Core':              { en: 'Unveiled Core',              zh: '核心裸露' },
    'Fractured Aegis':            { en: 'Fractured Aegis',            zh: '盾御碎裂' },
    'Thin Spiritual Veil':        { en: 'Thin Spiritual Veil',        zh: '灵幕稀薄' },
    'Torn Sense-Net':             { en: 'Torn Sense-Net',             zh: '感知网破' },
    'Fading Mind-Ward':           { en: 'Fading Mind-Ward',           zh: '心防衰退' },
    'Susceptible Qi':             { en: 'Susceptible Qi',             zh: '灵气易感' },
    'Clouded Receptors':          { en: 'Clouded Receptors',          zh: '感知蒙尘' },
    'Unstable Mind-Focus':        { en: 'Unstable Mind-Focus',        zh: '注意力涣散' },
    'Sluggish Arrays':            { en: 'Sluggish Arrays',            zh: '阵法运转迟缓' },
    'Tangled Meridians':          { en: 'Tangled Meridians',          zh: '经脉凝滞' },
    'Stagnant Qi Flow':           { en: 'Stagnant Qi Flow',           zh: '气血郁结' },
    'Heavy Core':                 { en: 'Heavy Core',                 zh: '核心沉重' },
    'Bloated Energy':             { en: 'Bloated Energy',             zh: '灵力臃肿' },
    'Inefficient Tether':         { en: 'Inefficient Tether',         zh: '维系低效' },
    'Muted Resonance':            { en: 'Muted Resonance',            zh: '共鸣微弱' },
    'Disconnected Soul-Link':     { en: 'Disconnected Soul-Link',     zh: '魂链断裂' },
    'Faded Synchronization':      { en: 'Faded Synchronization',      zh: '同步衰退' },
    'Shortened Tether':           { en: 'Shortened Tether',           zh: '羁绊受限' },
    'Fraying Connection':         { en: 'Fraying Connection',         zh: '连结脆弱' },
    'Nearsighted Array':          { en: 'Nearsighted Array',          zh: '阵势短浅' },
    'Dragging Anchor':            { en: 'Dragging Anchor',            zh: '拖拽沉滞' },
    'Lead-Lined Chassis':         { en: 'Lead-Lined Chassis',         zh: '躯壳沉重' },
    'Air-Bound Friction':         { en: 'Air-Bound Friction',         zh: '穿空受阻' },
    'Hesitant Start':             { en: 'Hesitant Start',             zh: '启动迟疑' },
    'Sputtering Engine-Core':     { en: 'Sputtering Engine-Core',     zh: '引擎异响' },
    'Delayed Thrust':             { en: 'Delayed Thrust',             zh: '推进延迟' },
    'Stiff Joints':               { en: 'Stiff Joints',               zh: '关节僵硬' },
    'Rigid Flight-Path':          { en: 'Rigid Flight-Path',          zh: '轨迹死板' },
    'Unbalanced Weight':          { en: 'Unbalanced Weight',          zh: '重心失衡' },
    'Leaking Reserve':            { en: 'Leaking Reserve',            zh: '储备外泄' },
    'Gluttonous Core':            { en: 'Gluttonous Core',            zh: '核心贪婪' },
    'Inefficient Qi-Burn':        { en: 'Inefficient Qi-Burn',        zh: '燃气低效' },

    // ── Resolutions ───────────────────────────────────────────────────────────
    'Core-Kindling Spirit Spark':         { en: 'Core-Kindling Spirit Spark',         zh: '核心燃灵火花' },
    'Celestial Aura Unfettering':         { en: 'Celestial Aura Unfettering',         zh: '天道气息解绑' },
    'Primordial Might Seal-Breaker':      { en: 'Primordial Might Seal-Breaker',      zh: '太古威能破封' },
    'Qi-Edge Sharpening Mantra':          { en: 'Qi-Edge Sharpening Mantra',          zh: '气刃开锋诀' },
    'Unbound Horizon Strike':             { en: 'Unbound Horizon Strike',             zh: '无距地平之击' },
    'Void-Severing Edge Polish':          { en: 'Void-Severing Edge Polish',          zh: '裂空锋刃淬炼' },
    'Rune-Etching Celestial Ink':         { en: 'Rune-Etching Celestial Ink',         zh: '仙墨刻印符文' },
    'Incantation Resonance Tuning':       { en: 'Incantation Resonance Tuning',       zh: '咒语共鸣调律' },
    'Array-Enlightening Zenith Script':   { en: 'Array-Enlightening Zenith Script',   zh: '阵图点化真言' },
    'Star-Forged Iron Tempering':         { en: 'Star-Forged Iron Tempering',         zh: '星铸寒铁回火' },
    'Alloy-Hardening Essence':            { en: 'Alloy-Hardening Essence',            zh: '合金硬化精华' },
    'Impact-Reinforcing Soul-Weight':     { en: 'Impact-Reinforcing Soul-Weight',     zh: '冲击强化魂重' },
    'Intent-Stabilizing Clear Mind':      { en: 'Intent-Stabilizing Clear Mind',      zh: '稳固意念明心' },
    'Will-Forging Spirit Hammer':         { en: 'Will-Forging Spirit Hammer',         zh: '意志锻造灵锤' },
    'Mindscape-Clarifying Pond':          { en: 'Mindscape-Clarifying Pond',          zh: '识海澄清神池' },
    'Spark-Igniting Sun Essence':         { en: 'Spark-Igniting Sun Essence',         zh: '日精引燃火花' },
    'Ashen Core Re-Kindling':             { en: 'Ashen Core Re-Kindling',             zh: '灰烬核心重燃' },
    'Meridian-Thawing Solar Breath':      { en: 'Meridian-Thawing Solar Breath',      zh: '融脉太阳吐息' },
    'Momentum-Gathering Inner Flow':      { en: 'Momentum-Gathering Inner Flow',      zh: '聚势内息循环' },
    'Hollow Force Infusion':              { en: 'Hollow Force Infusion',              zh: '虚力充盈注入' },
    'Weight-Increasing Gravity Script':   { en: 'Weight-Increasing Gravity Script',   zh: '引力阵纹增重' },
    'Qi-Needle Point Sharpening':         { en: 'Qi-Needle Point Sharpening',         zh: '气针磨砺锋芒' },
    'Deep-Pierce Spiritual Drill':        { en: 'Deep-Pierce Spiritual Drill',        zh: '灵能深钻穿刺' },
    'Barrier-Shattering Intent':          { en: 'Barrier-Shattering Intent',          zh: '碎盾穿甲意念' },
    'Star-Alignment Zenith Ritual':       { en: 'Star-Alignment Zenith Ritual',       zh: '星象归位之仪' },
    'Focus-Locking Eagle Gaze':           { en: 'Focus-Locking Eagle Gaze',           zh: '凝神聚锁鹰眼' },
    'Strike-Guiding Destiny Thread':      { en: 'Strike-Guiding Destiny Thread',      zh: '命运动量指引' },
    'Ferocity-Unleashing Blood Tide':     { en: 'Ferocity-Unleashing Blood Tide',     zh: '凶性尽释血潮' },
    'Limit-Breaking Essence Surge':       { en: 'Limit-Breaking Essence Surge',       zh: '破限精华爆发' },
    'Burst-Amplifying Dragon Breath':     { en: 'Burst-Amplifying Dragon Breath',     zh: '爆裂龙息增幅' },
    'Soul-Bite Serrated Edge':            { en: 'Soul-Bite Serrated Edge',            zh: '噬魂锯齿利刃' },
    'Spiritual Edge Essence Grinding':    { en: 'Spiritual Edge Essence Grinding',    zh: '灵刃精华打磨' },
    'Mind-Rend Psychic Resonance':        { en: 'Mind-Rend Psychic Resonance',        zh: '撕裂心神共鸣' },
    'Thread-Binding Soul Knot':           { en: 'Thread-Binding Soul Knot',           zh: '紧缚缚魂死结' },
    'Soul-Poison Distillation':           { en: 'Soul-Poison Distillation',           zh: '魂毒提纯' },
    'Intent-Compressing Core':            { en: 'Intent-Compressing Core',            zh: '意念压缩核心' },
    'Mind-Eye Opening Incense':           { en: 'Mind-Eye Opening Incense',           zh: '开心眼定神香' },
    'Sense-Weave Untangling Rite':        { en: 'Sense-Weave Untangling Rite',        zh: '感知解结仪' },
    'Truth-Seeking Divine Gaze':          { en: 'Truth-Seeking Divine Gaze',          zh: '寻真神圣凝视' },
    'Mirage-Shattering Clarity':          { en: 'Mirage-Shattering Clarity',          zh: '破幻澄澈之心' },
    'Static-Clearing Spirit Hum':         { en: 'Static-Clearing Spirit Hum',         zh: '净灵之音扫除' },
    'Disruption-Dampening Array':         { en: 'Disruption-Dampening Array',         zh: '扰乱抑制阵法' },
    'Porous-Sealing Glazed Armor':        { en: 'Porous-Sealing Glazed Armor',        zh: '填隙琉璃宝甲' },
    'Tarnished-Restoring Jewel Polish':   { en: 'Tarnished-Restoring Jewel Polish',   zh: '复原玉石抛光' },
    'Qi-Leaking Void Seal':               { en: 'Qi-Leaking Void Seal',               zh: '灵气封锁真印' },
    'Mind-Wall Adamantine Bastion':       { en: 'Mind-Wall Adamantine Bastion',       zh: '金刚心墙堡垒' },
    'Consciousness-Shielding Lotus':      { en: 'Consciousness-Shielding Lotus',      zh: '护识清心莲花' },
    'Soul-Barrier Spectral Guard':        { en: 'Soul-Barrier Spectral Guard',        zh: '护魂英灵守卫' },
    'Mirror-Array Surface Polishing':     { en: 'Mirror-Array Surface Polishing',     zh: '镜阵表面抛光' },
    'Reflection-Amplifying Jade':         { en: 'Reflection-Amplifying Jade',         zh: '反射增幅白玉' },
    'Rune-Restoring Mirror Script':       { en: 'Rune-Restoring Mirror Script',       zh: '鉴水回复阵纹' },
    'Stance-Fixing Mountain Root':        { en: 'Stance-Fixing Mountain Root',        zh: '镇山固态根基' },
    'Unrooted-Securing Iron Anchor':      { en: 'Unrooted-Securing Iron Anchor',      zh: '玄铁强锚定基' },
    'Anchor-Forging Earth Spirit':        { en: 'Anchor-Forging Earth Spirit',        zh: '地灵铸锚固本' },
    'Weakness-Veiling Shadow Silk':       { en: 'Weakness-Veiling Shadow Silk',       zh: '掩瑕隐影灵丝' },
    'Core-Shielding Turtle Shell':        { en: 'Core-Shielding Turtle Shell',        zh: '护核玄龟甲胄' },
    'Aegis-Mending Celestial Solder':     { en: 'Aegis-Mending Celestial Solder',     zh: '补天修盾焊结' },
    'Spiritual-Veil Weaving Ritual':      { en: 'Spiritual-Veil Weaving Ritual',      zh: '灵幕编织秘仪' },
    'Sense-Net Repairing Incense':        { en: 'Sense-Net Repairing Incense',        zh: '补网宁神香' },
    'Mind-Ward Strengthening Charm':      { en: 'Mind-Ward Strengthening Charm',      zh: '护心神固金符' },
    'Qi-Stabilizing Breath':             { en: 'Qi-Stabilizing Breath',             zh: '灵气稳固吐纳' },
    'Receptor-Cleansing Dew':            { en: 'Receptor-Cleansing Dew',            zh: '洗髓净魂露' },
    'Mind-Focus Anchor':                 { en: 'Mind-Focus Anchor',                 zh: '摄心定神锚' },
    'Sluggish-Accelerating Array Sync':  { en: 'Sluggish-Accelerating Array Sync',  zh: '迟缓加速阵列' },
    'Meridian-Untangling Surge':         { en: 'Meridian-Untangling Surge',         zh: '经脉疏通爆发' },
    'Flow-Restoring Jade Water':         { en: 'Flow-Restoring Jade Water',         zh: '活血化瘀玉液' },
    'Heavy-Core Essence Reduction':      { en: 'Heavy-Core Essence Reduction',      zh: '沉核精髓提炼' },
    'Energy-Refining Compaction':        { en: 'Energy-Refining Compaction',        zh: '气海提纯压缩' },
    'Tether-Extending Spirit Silk':      { en: 'Tether-Extending Spirit Silk',      zh: '羁绊延长灵丝' },
    'Resonance-Harmonizing Tuning':      { en: 'Resonance-Harmonizing Tuning',      zh: '共鸣调音和弦' },
    'Soul-Link Deepening':               { en: 'Soul-Link Deepening',               zh: '魂链深化连结' },
    'Sync-Restoring Zenith Rite':        { en: 'Sync-Restoring Zenith Rite',        zh: '同步恢复极仪' },
    'Tether-Lengthening Soul Thread':    { en: 'Tether-Lengthening Soul Thread',    zh: '羁绊延长魂线' },
    'Connection-Strengthening Aura':     { en: 'Connection-Strengthening Aura',     zh: '连接强化灵环' },
    'Array-Range Expansion':             { en: 'Array-Range Expansion',             zh: '阵图范围扩张' },
    'Anchor-Severing Freedom':           { en: 'Anchor-Severing Freedom',           zh: '斩锚解脱之翼' },
    'Chassis-Refining Wind Essence':     { en: 'Chassis-Refining Wind Essence',     zh: '躯体轻质化风晶' },
    'Friction-Eliminating Aero-Script':  { en: 'Friction-Eliminating Aero-Script',  zh: '减阻破空阵纹' },
    'Hesitant-Igniting Spark':           { en: 'Hesitant-Igniting Spark',           zh: '迟疑点燃火花' },
    'Engine-Refining Core Burst':        { en: 'Engine-Refining Core Burst',        zh: '引擎精炼核心' },
    'Thrust-Amplifying Celestial Air':   { en: 'Thrust-Amplifying Celestial Air',   zh: '推力增幅天罡' },
    'Joint-Softening Celestial Dew':     { en: 'Joint-Softening Celestial Dew',     zh: '化形仙露软骨' },
    'Flight-Path Aligning Wind':         { en: 'Flight-Path Aligning Wind',         zh: '轨线校准灵风' },
    'Weight-Balancing Earth Stone':      { en: 'Weight-Balancing Earth Stone',      zh: '重心平稳定岩' },
    'Reserve-Sealing Soul Cork':         { en: 'Reserve-Sealing Soul Cork',         zh: '聚气封锁魂塞' },
    'Core-Efficiency Refining':          { en: 'Core-Efficiency Refining',          zh: '核心能效精炼' },
    'Qi-Burn Optimizing Script':         { en: 'Qi-Burn Optimizing Script',         zh: '灵气燃烧优化' },
    'Harmonization Applied':             { en: 'Harmonization Applied',             zh: '修复应用' },
  },
} as const;

/**
 * Translate an English string by looking it up in dict.data.
 * Falls back to the original string if no translation is found.
 * Also handles comma-separated lists (e.g. flaw titles).
 */
export function t(enStr: string): string {
  if (!enStr) return '';
  const entry = (dict.data as Record<string, { en: string; zh: string }>)[enStr];
  if (entry) return entry.zh;
  // Handle comma-separated compound strings (flaw title lists)
  if (enStr.includes(', ')) {
    return enStr
      .split(', ')
      .map(part => (dict.data as Record<string, { en: string; zh: string }>)[part]?.zh ?? part)
      .join(', ');
  }
  return enStr;
}

/**
 * A handy translation helper to get exactly (zh), (en), or mixed.
 */
export const DualText = ({ en, zh, style, className }: { en: string; zh: string; style?: React.CSSProperties; className?: string }) => (
  <div className={`dual-text ${className || ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit', lineHeight: '1.2', ...style }}>
    <span>{en}</span>
    <span style={{ fontSize: '0.85em', opacity: 0.85 }}>{zh}</span>
  </div>
);

export const DualInline = ({ en, zh, style, className }: { en: string; zh: string; style?: React.CSSProperties; className?: string }) => (
  <span className={`dual-inline ${className || ''}`} style={{ ...style }}>
    {en} <span style={{ opacity: 0.75, fontSize: '0.9em' }}>| {zh}</span>
  </span>
);

export const parseRecipeName = (fullName: string) => {
  // e.g., "Scorched Shell Aegis (Fire Root)"
  const regex = /^(.*?)\s*\((.*?)\)$/;
  const match = fullName.match(regex);
  if (!match) return { baseEn: fullName, baseZh: t(fullName), rootEn: '', rootZh: '' };

  const [, baseName, rootText] = match;

  // Look up the full recipe name first, then fall back to core-form substitution
  const baseZh = t(baseName) !== baseName
    ? t(baseName)
    : (() => {
        let zh = baseName;
        Object.keys(dict.coreForms).forEach(k => {
          if (baseName.includes(k)) zh = baseName.replace(k, (dict.coreForms as any)[k].zh);
        });
        return zh;
      })();

  const rootZh = dict.roots[rootText as keyof typeof dict.roots]?.zh ?? rootText;

  return { baseEn: baseName, baseZh, rootEn: rootText, rootZh };
};



