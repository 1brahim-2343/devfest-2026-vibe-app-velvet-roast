import { EquipmentConfig, EquipmentType, NutProfile, PantrySettings, SensoryProfile, SweetenerType } from '../types/coffee';

export const EQUIPMENT_DATA: Record<EquipmentType, EquipmentConfig> = {
  moka: {
    name: 'Artisan Moka Pot',
    tagline: 'Stovetop density with the early water-quench technique',
    doseGrams: 16,
    grindSize: 'Medium-Fine (like fine sea salt, slightly coarser than espresso)',
    waterAmountMl: 120,
    yieldGrams: 50,
    waterTemp: 'Pre-boiled 90°C (194°F) in bottom chamber',
    targetTimeSeconds: 150,
    ratio: '1:3.1 concentrated base',
    goldenRule: 'Quench under cold tap water the second the honey stream turns pale or bubbles sputter. The sputtering phase is 100% harsh ash and bitter polyphenols!',
    steps: [
      {
        id: 'moka-prep',
        phaseNumber: 1,
        title: 'Pour 1: Blooming & Prep (45s)',
        subtitle: 'Fill base with 90°C water, dry grounds in basket with micro-saline pinch',
        durationSeconds: 45,
        instructions: [
          'Preheat fresh filtered water to approx. 90°C (just off the boil) to avoid baking the grounds.',
          'Fill the Moka base chamber up to right below the safety release valve (~110-120ml).',
          'Add a microscopic pinch of sea salt (0.05g) directly to the ground dark roast beans in the basket to block bitter taste receptors.',
          'Fill the funnel basket with 16g dark roast coffee. Level gently with your finger—NEVER tamp down tightly in a Moka pot.',
        ],
        scienceTip: 'Pre-heated water prevents grounds from cooking on the dry burner, completely saving you from acrid burnt flavors.',
        targetMetric: '16g dose · 90°C water · Salt pinch',
      },
      {
        id: 'moka-brew',
        phaseNumber: 2,
        title: 'Pour 2: Main Extraction (1m 15s)',
        subtitle: 'Gentle low-heat flow watching for the dark hazelnut honey stream',
        durationSeconds: 75,
        instructions: [
          'Place assembled Moka pot over low-medium heat with the top lid open.',
          'Watch closely: around 45–60 seconds, a thick, dark hazelnut-colored syrup will begin oozing up the spout with zero sputtering.',
          'Keep flame low so the stream flows smoothly like warm melted chocolate.',
        ],
        scienceTip: 'The first 40–50ml carries 90% of the delicious lipids, chocolate aromatics, and caffeine. The tail end is mostly watery bitterness.',
        targetMetric: 'Thick hazelnut syrup stream',
      },
      {
        id: 'moka-cutoff',
        phaseNumber: 3,
        title: 'Pour 3: Critical Cutoff & Cold Quench (15s)',
        subtitle: 'Stop the brew before the sputtering phase starts',
        durationSeconds: 15,
        cutoffAlert: 'CUT HEAT NOW: Run bottom of Moka pot under cold tap water to freeze extraction instantly!',
        instructions: [
          'The instant the stream turns golden-blonde or makes the first tiny gurgling hiss, remove from the burner immediately.',
          'Run the bottom chamber under a trickle of cold tap water for 4 seconds to instantly halt internal pressure and prevent harsh steam from charring the grounds.',
          'Pour the 50ml dense coffee concentrate into your warm cortado glass.',
        ],
        scienceTip: 'The sputtering "volcano" sound is steam boiling the coffee bed. Freezing extraction locks in pure cacao and hazelnut goodness.',
        targetMetric: '~50ml dense extract',
      },
      {
        id: 'moka-milk',
        phaseNumber: 4,
        title: 'Pour 4: Oat Milk Velveting & Cacao Infusion (45s)',
        subtitle: 'Steam or whisk oat milk to 62°C and blend with dark cacao',
        durationSeconds: 45,
        instructions: [
          'In your warm cortado glass, stir the Dutch cacao powder and chosen nut syrup into the hot espresso base until glossy.',
          'Heat 50ml barista-edition oat milk to exactly 60°C–65°C (warm to touch, never steaming hot).',
          'Froth with an electric handheld wand, French press pump, or steam wand until a dense, glossy microfoam forms (no giant soapy bubbles).',
          'Pour slowly over the cacao-coffee base at a 1:1 ratio. Dust the foam with a sprinkle of extra cacao or cinnamon.',
        ],
        scienceTip: 'Oat milk proteins denature above 68°C, turning watery and astringent. At 62°C, oat maltose naturally caramelizes into liquid velvet.',
        targetMetric: '50ml oat milk at 62°C (1:1 ratio)',
      },
    ],
  },
  espresso: {
    name: 'Espresso Machine Ristretto',
    tagline: 'Dense 1:1.6 short-pull capturing pure cocoa heart',
    doseGrams: 18,
    grindSize: 'Fine Espresso (silky flour texture with light grit)',
    waterAmountMl: 90,
    yieldGrams: 28,
    waterTemp: '89°C (192°F) — 3° lower than medium roasts',
    targetTimeSeconds: 85,
    ratio: '1:1.55 Ristretto cut',
    goldenRule: 'Cut the shot early at 28g liquid. For dark roast, the last 8-10 seconds of a traditional shot contain chlorogenic ash that overwhelms delicate nutty undertones.',
    steps: [
      {
        id: 'esp-prep',
        phaseNumber: 1,
        title: 'Pour 1: Blooming & Puck Prep (25s)',
        subtitle: '18g dose with WDT needle de-clumping & micro-saline prep',
        durationSeconds: 25,
        instructions: [
          'Weigh 18.0g of dark roast beans and grind finely into your portafilter.',
          'De-clump the coffee bed with a needle distributor (WDT) to ensure even water saturation.',
          'Add a microscopic pinch of fine sea salt (or one drop 20% saline) to the top of the coffee bed.',
          'Tamp level with firm, even pressure (~25-30 lbs) until resistance pushes back.',
        ],
        scienceTip: 'Dark roasts are more brittle and extract 25% faster than light roasts. Even tamping prevents high-speed bitter channeling.',
        targetMetric: '18.0g dose · Level bed',
      },
      {
        id: 'esp-pull',
        phaseNumber: 2,
        title: 'Pour 2: Main Extraction (26s)',
        subtitle: 'Low temperature (89°C) short ristretto pull',
        durationSeconds: 26,
        instructions: [
          'Lock the portafilter into the group head and place your scale + cortado glass beneath.',
          'Start pump: first dark drops appear around 6–8 seconds.',
          'Watch the viscous tiger-striped crema flow down in a steady, thick stream.',
        ],
        scienceTip: 'Setting boiler temp to 89°C prevents scorched bean oils. The shorter 1:1.55 ratio leaves astringency behind in the puck.',
        targetMetric: 'Goal: 28g liquid in 24–28s',
      },
      {
        id: 'esp-cutoff',
        phaseNumber: 3,
        title: 'Pour 3: Critical Cutoff at 28g (10s)',
        subtitle: 'Kill pump at exactly 28 grams yield',
        durationSeconds: 10,
        cutoffAlert: 'STOP PUMP AT 28g: Cut the shot the instant the stream begins to yellow or thin out!',
        instructions: [
          'Stop the pump when your scale reads 27-28g.',
          'Swirl the rich espresso shot to integrate the tiger crema with the heavy chocolate solids below.',
        ],
        scienceTip: 'In dark roast extraction, the first 65% of the shot extracts 95% of aromatics and sugars. The final 35% is purely bitter.',
        targetMetric: '28g dense ristretto base',
      },
      {
        id: 'esp-milk',
        phaseNumber: 4,
        title: 'Pour 4: Oat Milk Microfoam & Cortado Pour (35s)',
        subtitle: 'Steam oat milk to silk paint consistency (62°C)',
        durationSeconds: 35,
        instructions: [
          'Dissolve your Dutch cacao powder and nut syrup directly into the warm espresso shot.',
          'Submerge steam wand just below oat milk surface. Aerate for only 3 seconds for tight microfoam, then tilt pitcher to create a vigorous vortex.',
          'Stop steaming when pitcher base feels pleasantly warm (60°C–65°C). Wipe and purge wand.',
          'Pour equal volume (~30–35ml) into the espresso for a balanced 1:1 Spanish cortado experience.',
        ],
        scienceTip: 'A 1:1 cortado ratio preserves the punchy strength of the coffee while oat fats envelop your palate in creamy chocolate warmth.',
        targetMetric: '30ml microfoam oat milk',
      },
    ],
  },
  pourover: {
    name: 'Artisan Pour-Over / Chemex',
    tagline: 'Precision bypass pour-over eliminating bitter sediment',
    doseGrams: 20,
    grindSize: 'Medium-Coarse (kosher salt texture)',
    waterAmountMl: 180,
    yieldGrams: 100,
    waterTemp: '89°C (192°F) — gentle thermal control',
    targetTimeSeconds: 180,
    ratio: '1:5 dense concentrate base',
    goldenRule: 'Pour in slow concentric circles and stop water delivery at 2 minutes to keep bitter fines from clogging the filter bed.',
    steps: [
      {
        id: 'pour-bloom',
        phaseNumber: 1,
        title: 'Pour 1: Blooming (45s)',
        subtitle: 'Saturate coffee bed with 50g water and let CO2 degas',
        durationSeconds: 45,
        instructions: [
          'Rinse your paper filter with hot water and discard the rinse water.',
          'Add 20g of freshly ground dark roast coffee with a micro-pinch of sea salt into the cone. Create a shallow well in the center.',
          'Gently pour 50g of 89°C water over the grounds in slow spiraling circles.',
          'Wait 45 seconds as the coffee bed balloons and releases trapped carbon dioxide without bitterness.',
        ],
        scienceTip: 'Fresh dark roast holds substantial CO2. A full 45s bloom ensures water penetrates evenly without channeling.',
        targetMetric: '50g water pour · 45s bloom',
      },
      {
        id: 'pour-main',
        phaseNumber: 2,
        title: 'Pour 2: Main Extraction (2m)',
        subtitle: 'Continuous slow pulse pour up to 180g total water',
        durationSeconds: 120,
        instructions: [
          'Begin pouring in gentle concentric circles, maintaining water level 1 inch above the grounds.',
          'Pour steadily until the scale reads 180g total water added (around the 1m 30s mark).',
          'Allow the water to draw down through the dark roast bed until the 2-minute mark.',
        ],
        scienceTip: 'A 2-minute main extraction pulls out dense caramelized chocolate oils while preventing bitter lignin extraction.',
        targetMetric: '180g total water · 2m drawdown',
      },
      {
        id: 'pour-cutoff',
        phaseNumber: 3,
        title: 'Pour 3: Drawdown & Cacao Infusion (30s)',
        subtitle: 'Remove cone before final drops to prevent bitter astringency',
        durationSeconds: 30,
        instructions: [
          'At 2 minutes, lift the pour-over cone off the server, even if a small pool remains on top.',
          'Add your Dutch cocoa powder and nut extract directly to the steaming dark brew and whisk vigorously until velvety.',
        ],
        scienceTip: 'The final 10% of pour-over drawdown is loaded with bitter micro-fines. Cutting it short preserves pure chocolate sweetness.',
        targetMetric: '~100ml concentrated brew',
      },
      {
        id: 'pour-milk',
        phaseNumber: 4,
        title: 'Pour 4: Oat Milk Microfoam & Cortado Pour (45s)',
        subtitle: 'Froth 62°C oat milk and gently layer over the cacao coffee',
        durationSeconds: 45,
        instructions: [
          'Warm 100ml barista oat milk to 62°C (hot to touch, but never steaming).',
          'Froth with a handheld whisk or French press pump for 20 seconds to create silky microfoam.',
          'Pour the frothed oat milk into the chocolate-coffee base and dust with cinnamon.',
        ],
        scienceTip: 'The 1:1 oat milk ratio creates a warm, comforting texture that balances the dense pour-over concentrate.',
        targetMetric: '100ml frothed oat milk',
      },
    ],
  },
};

export const NUT_OPTIONS: { id: NutProfile; name: string; description: string; notes: string }[] = [
  {
    id: 'hazelnut',
    name: 'Toasted Hazelnut',
    description: 'Classic roasted gianduja chocolate notes, nutty warmth, velvety aroma',
    notes: 'Praline · Nutella warmth · Brown butter',
  },
  {
    id: 'pecan',
    name: 'Roasted Pecan',
    description: 'Deep caramelized maple notes with buttery, sweet autumn crust',
    notes: 'Brown butter · Toffee · Pecan pie',
  },
  {
    id: 'almond',
    name: 'Marzipan & Toasted Almond',
    description: 'Sweet floral nuttiness with pastry-shop warmth and creamy body',
    notes: 'Sweet almond · Marzipan · Biscotti',
  },
  {
    id: 'walnut',
    name: 'Spiced Black Walnut',
    description: 'Rich, earthy timber nut notes that pair dramatically with dark cocoa',
    notes: 'Earthy · Deep cocoa · Walnut fudge',
  },
];

export const SWEETENER_OPTIONS: { id: SweetenerType; name: string; measure: string }[] = [
  { id: 'maple', name: 'Grade A Dark Maple Syrup', measure: '1 tsp per serving' },
  { id: 'brown_sugar', name: 'Dark Muscovado / Demerara', measure: '1 tsp raw cane' },
  { id: 'honey', name: 'Raw Clover or Orange Honey', measure: '3/4 tsp' },
  { id: 'unsweetened', name: 'Zero Added Sugar (Oat Milk Natural Sweetness)', measure: '0g sugar' },
];

export function calculateSensoryProfile(pantry: PantrySettings, equipment: EquipmentType): SensoryProfile {
  let chocolate = 75 + pantry.cocoaLevel * 7;
  let nutty = 65 + pantry.nutIntensity * 8;
  let body = 85 + (pantry.cocoaLevel > 0 ? 6 : 0) + (equipment === 'espresso' ? 5 : equipment === 'moka' ? 2 : 0);
  let sweetness = pantry.sweetener === 'unsweetened' ? 25 : 40 + pantry.sweetnessLevel * 18;
  
  let bitterness = 35;
  if (pantry.pinchOfSalt) bitterness -= 18;
  if (pantry.cocoaLevel >= 2) bitterness += 4;
  if (pantry.sweetener !== 'unsweetened') bitterness -= pantry.sweetnessLevel * 3;

  const acidity = 4;

  return {
    chocolate: Math.min(100, Math.max(10, chocolate)),
    nutty: Math.min(100, Math.max(10, nutty)),
    body: Math.min(100, Math.max(10, body)),
    sweetness: Math.min(100, Math.max(5, sweetness)),
    bitterness: Math.min(100, Math.max(5, bitterness)),
    acidity: Math.min(100, Math.max(2, acidity)),
  };
}
