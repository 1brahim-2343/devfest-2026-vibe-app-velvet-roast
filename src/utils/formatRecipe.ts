import { EquipmentConfig, EquipmentType, PantrySettings } from '../types/coffee';
import { EQUIPMENT_DATA, NUT_OPTIONS, SWEETENER_OPTIONS } from '../data/recipes';

export function formatEmojiRecipe(
  equipment: EquipmentType,
  pantry: PantrySettings,
  servings: number
): string {
  const config = EQUIPMENT_DATA[equipment];
  const scaledCoffee = config.doseGrams * servings;
  const scaledWater = config.waterAmountMl * servings;
  const scaledYield = config.yieldGrams * servings;
  const scaledOatMilk = config.yieldGrams * servings;
  const scaledCocoa = pantry.cocoaLevel * 3 * servings;
  const nutInfo = NUT_OPTIONS.find((n) => n.id === pantry.nutType);
  const sweetenerInfo = SWEETENER_OPTIONS.find((s) => s.id === pantry.sweetener);

  return `☕ VELVET ROAST — TOASTED CACAO & ${nutInfo?.name.toUpperCase() || 'NUT'} OAT CORTADO 🍫✨

🔥 Profile: Ultra-Strong Kick · Zero Bitterness · Zero Sourness!
🥛 Texture: Spanish Cortado (1:1 Ratio of Dense Extract to 62°C Velvety Oat Foam)
⚙️ Method: ${config.name} (${servings} ${servings === 1 ? 'Cup' : 'Cups'})

📋 INGREDIENTS & EXACT DOSING:
• ☕ Dark Roast Beans: ${scaledCoffee}g (${config.grindSize})
• 💧 Brew Water: ${scaledWater}ml @ ${config.waterTemp}
• 🍫 Dutch Dark Cacao: ${pantry.cocoaLevel * servings} tsp (${scaledCocoa}g alkalized cocoa)
• 🌰 Nut Essence: ${nutInfo?.name} (Level ${pantry.nutIntensity}/4)
• 🍁 Sweetener: ${sweetenerInfo?.name} (Level ${pantry.sweetnessLevel}/3)
• 🧂 Science Secret: ${pantry.pinchOfSalt ? '1 microscopic pinch of sea salt (0.05g to block bitter tongue receptors!)' : 'None'}
• 🍂 Warming Spice: ${pantry.spiceChoice !== 'none' ? `Dusting of ground ${pantry.spiceChoice}` : 'Pure cocoa dusting'}
• 🥛 Barista Oat Milk: ${scaledOatMilk}ml (Warmed to exactly 62°C)

⚡ BARISTA EXTRACTION SECRETS:
1️⃣ ${config.goldenRule}
2️⃣ Dutch cacao is alkalized to pH 7–8, neutralizing all fruit sourness.
3️⃣ Sodium ions bind to TAS2R bitter taste receptors so rich hazelnut sweetness shines!

✨ Brewed with Velvet Roast Companion! ☕🤎`;
}
