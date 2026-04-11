export const MATERIAL_DATA: Record<string, { desc: string, category: string }> = {
  "Deep Sea Iron": { desc: "A dense, cold iron harvested from the abyssal trenches. Excellent for conducting icy qi.", category: "Matrix Material" },
  "Thunder Bamboo": { desc: "Bamboo stalks that grow only where lightning strikes the earth. They pulse with dormant electricity.", category: "Matrix Material" },
  "Magma Turtle Shell": { desc: "The hardened carapace of a beast that bathes in volcanic craters.", category: "Matrix Material" },
  "Heavenly Starfall Iron": { desc: "Meteoritic metal that fell from the celestial vault, carrying profound cosmic weight.", category: "Matrix Material" },
  "Netherflame Crystal": { desc: "A semi-translucent gem that burns with a ghostly fire. Infuses chaotic traits into structures.", category: "Source Material" },
  "Razoredge Obsidian": { desc: "Volcanic glass honed naturally by spiritual winds into a blade-like sharpness.", category: "Source Material" },
  "Demon Heart": { desc: "The still-beating core of a slaughtered fiend. Corrupts the weak but heavily amplifies physical force.", category: "Demon Core" },
  "Spirit Wolf Soul": { desc: "The ethereal remains of an alpha spirit wolf. Confers agility, instinct, and independent thought.", category: "Spirit Essence" }
};

export const getMaterialMetadata = (name: string) => {
  return MATERIAL_DATA[name] || { desc: "A mysterious material with unknown properties.", category: "Unknown" };
};
