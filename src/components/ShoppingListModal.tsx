import React, { useState } from 'react';
import { EquipmentType, PantrySettings } from '../types/coffee';
import { EQUIPMENT_DATA, NUT_OPTIONS, SWEETENER_OPTIONS } from '../data/recipes';
import { 
  X, 
  ShoppingCart, 
  Copy, 
  Check, 
  Coffee, 
  Milk, 
  Sparkles, 
  Wrench, 
  CheckSquare, 
  Square,
  Share2
} from 'lucide-react';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: EquipmentType;
  pantry: PantrySettings;
  servings: number;
}

interface GroceryItem {
  id: string;
  category: 'beans' | 'milks' | 'pantry' | 'equipment';
  name: string;
  quantity: string;
  notes: string;
  recommendedBrand?: string;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  equipment,
  pantry,
  servings,
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const config = EQUIPMENT_DATA[equipment];
  const nutInfo = NUT_OPTIONS.find((n) => n.id === pantry.nutType);
  const sweetenerInfo = SWEETENER_OPTIONS.find((s) => s.id === pantry.sweetener);

  // Generate tailored grocery list items based on the active recipe
  const items: GroceryItem[] = [
    // 1. BEANS
    {
      id: 'item-beans',
      category: 'beans',
      name: 'Fresh Dark Roast Whole Bean Coffee',
      quantity: '1 bag (250g–340g / 12 oz)',
      notes: 'Look for Vienna, French, or Italian dark roast with tasting notes of dark chocolate, toasted nuts, or caramel. Avoid light fruity roasts.',
      recommendedBrand: 'Specialty Roaster Dark Espresso or Organic French Roast',
    },

    // 2. MILKS
    {
      id: 'item-oat-milk',
      category: 'milks',
      name: 'Barista-Edition Oat Milk',
      quantity: '1 Carton (32 fl oz / 1 Liter)',
      notes: 'Must say "Barista Edition"—contains natural phosphate buffers that prevent curdling in hot coffee and steam into silky microfoam.',
      recommendedBrand: 'Oatly Barista Edition, Califia Farms Barista Blend, or Minor Figures',
    },

    // 3. PANTRY & SCIENCE
    {
      id: 'item-cacao',
      category: 'pantry',
      name: 'Dutch-Processed (Alkalized) Dark Cocoa Powder',
      quantity: `${pantry.cocoaLevel > 0 ? `${pantry.cocoaLevel * 3 * servings}g per cup (1 container)` : 'Optional'}`,
      notes: 'Alkalized cocoa has a neutral pH (7–8) which guarantees zero sour acidity and rich fudge sweetness.',
      recommendedBrand: 'Valrhona Pure Cocoa, Droste, or Guittard Dutch Dark',
    },
    {
      id: 'item-nut-extract',
      category: 'pantry',
      name: `Pure ${nutInfo?.name || 'Hazelnut'} Extract or Butter`,
      quantity: '1 Small Bottle or Jar',
      notes: `Delivers natural ${nutInfo?.notes.toLowerCase()} without artificial chemical aftertaste.`,
      recommendedBrand: 'Nielsen-Massey Hazelnut/Almond or 100% Roasted Nut Butter',
    },
    ...(pantry.sweetener !== 'unsweetened' ? [{
      id: 'item-sweetener',
      category: 'pantry' as const,
      name: sweetenerInfo?.name || 'Dark Maple Syrup',
      quantity: '1 Bottle',
      notes: 'Unrefined natural sweetness that enhances dark roast malt without cloying sugar bite.',
      recommendedBrand: 'Grade A Amber/Dark Maple or Organic Muscovado Sugar',
    }] : []),
    {
      id: 'item-salt',
      category: 'pantry',
      name: 'Fine Sea Salt or Saline Dropper',
      quantity: 'Small Pinch per Brew (~0.05g)',
      notes: 'The sodium ion hack: physically blocks bitter taste receptors on your tongue.',
      recommendedBrand: 'Maldon Fine Sea Salt or Pink Himalayan',
    },
    ...(pantry.spiceChoice !== 'none' ? [{
      id: 'item-spice',
      category: 'pantry' as const,
      name: `Ground Ceylon ${pantry.spiceChoice.charAt(0).toUpperCase() + pantry.spiceChoice.slice(1)}`,
      quantity: '1 Small Jar',
      notes: 'Delicate aromatic dusting over the warm oat microfoam.',
      recommendedBrand: 'Single-origin organic spice',
    }] : []),

    // 4. EQUIPMENT
    {
      id: 'item-apparatus',
      category: 'equipment',
      name: equipment === 'moka' 
        ? '3-Cup Stovetop Moka Pot (Bialetti style)' 
        : equipment === 'espresso'
        ? 'Espresso Machine with 58mm Portafilter & Steam Wand'
        : 'Pour-Over Cone (V60 or Chemex) + Unbleached Paper Filters',
      quantity: '1 Unit',
      notes: config.tagline,
    },
    {
      id: 'item-scale',
      category: 'equipment',
      name: 'Digital Kitchen Scale (0.1g Precision)',
      quantity: '1 Scale',
      notes: 'Essential for exact 18g bean dosing and stopping extraction at the sweet spot.',
    },
    {
      id: 'item-frother',
      category: 'equipment',
      name: equipment === 'espresso' ? 'Milk Pitcher (Stainless Steel 12oz)' : 'Handheld Electric Milk Frother or French Press',
      quantity: '1 Unit',
      notes: 'Used to pump 62°C oat milk into dense, silky microfoam without large air pockets.',
    },
    {
      id: 'item-glasses',
      category: 'equipment',
      name: '4.5 oz Heavy Faceted Cortado Tumblers (Gibraltar Glasses)',
      quantity: 'Set of 2 Glasses',
      notes: 'Classic thick-glass Spanish cortado tumblers that retain warmth and display the rich chocolate-oat layers.',
    },
  ];

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIds(next);
  };

  const handleSelectAll = () => {
    if (checkedIds.size === items.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(items.map((i) => i.id)));
    }
  };

  const handleCopyShoppingList = () => {
    const categories = [
      { key: 'beans', title: '☕ SPECIALTY BEANS' },
      { key: 'milks', title: '🥛 BARISTA MILKS' },
      { key: 'pantry', title: '🍫 PANTRY & ACCENTS' },
      { key: 'equipment', title: '⚙️ EQUIPMENT & GEAR' },
    ];

    let text = `🛒 VELVET ROAST: GROCERY & GEAR SHOPPING LIST\n`;
    text += `Recipe: Toasted Cacao & ${nutInfo?.name} Oat Cortado (${config.name})\n\n`;

    categories.forEach((cat) => {
      const catItems = items.filter((i) => i.category === cat.key);
      if (catItems.length > 0) {
        text += `${cat.title}\n`;
        catItems.forEach((item) => {
          const checkMark = checkedIds.has(item.id) ? '[x]' : '[ ]';
          text += `${checkMark} ${item.name} (${item.quantity})\n   Note: ${item.notes}\n`;
          if (item.recommendedBrand) {
            text += `   Recommended: ${item.recommendedBrand}\n`;
          }
        });
        text += `\n`;
      }
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white/98 dark:bg-gradient-to-br dark:from-[#11172E] dark:via-[#16122C] dark:to-[#1E0E2B] border border-[#E6D9C0] dark:border-[#35254A] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E6D9C0] dark:border-[#2D2146] flex items-center justify-between bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono-data font-semibold">
                Custom Recipe Provisioning
              </div>
              <h3 className="font-serif-display text-xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                Morning Grocery & Gear List
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close shopping list"
            className="p-2 text-[#7E766A] dark:text-[#8D88A3] hover:text-[#1A1924] dark:hover:text-white hover:bg-[#F2E8D5] dark:hover:bg-[#1E1735] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tailored Recipe Banner */}
        <div className="px-6 py-3 bg-[#F8F2E4] dark:bg-[#080D18] border-b border-[#E6D9C0] dark:border-[#2D2146] flex flex-wrap items-center justify-between text-xs text-[#7E766A] dark:text-[#9F96B2] transition-colors">
          <div className="flex items-center gap-2">
            <span>Tailored for:</span>
            <strong className="text-[#1A1924] dark:text-[#F7F6FC] font-medium">{config.name}</strong>
            <span>·</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold">{nutInfo?.name}</span>
          </div>
          <div className="flex items-center gap-3 pt-1 sm:pt-0">
            <button
              onClick={handleSelectAll}
              className="text-amber-700 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium transition-colors"
            >
              {checkedIds.size === items.length ? 'Uncheck All' : 'Check All'}
            </button>
            <span>({checkedIds.size} of {items.length} collected)</span>
          </div>
        </div>

        {/* Scrollable Item Categories */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Category: Beans */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 font-mono-data">
              <Coffee className="w-4 h-4" />
              <span>1. Specialty Beans & Roastery</span>
            </div>
            <div className="space-y-2.5">
              {items.filter((i) => i.category === 'beans').map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedIds.has(item.id)
                      ? 'bg-[#FAF5EB] dark:bg-[#0D1528] border-emerald-400/40 dark:border-emerald-800/40 opacity-70'
                      : 'bg-white dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] hover:border-amber-400 dark:hover:border-amber-500/50'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-amber-600 dark:text-amber-400">
                    {checkedIds.has(item.id) ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                      <span className={checkedIds.has(item.id) ? 'line-through text-[#7E766A] dark:text-[#8D88A3]' : ''}>
                        {item.name}
                      </span>
                      <span className="text-xs font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-[#7E766A] dark:text-[#9F96B2] mt-1 leading-relaxed">
                      {item.notes}
                    </p>
                    {item.recommendedBrand && (
                      <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-1">
                        Pick: <span className="text-[#4A4652] dark:text-[#CBD1E1] italic">{item.recommendedBrand}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Milks */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 font-mono-data">
              <Milk className="w-4 h-4" />
              <span>2. Barista Plant Milk</span>
            </div>
            <div className="space-y-2.5">
              {items.filter((i) => i.category === 'milks').map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedIds.has(item.id)
                      ? 'bg-[#FAF5EB] dark:bg-[#0D1528] border-emerald-400/40 dark:border-emerald-800/40 opacity-70'
                      : 'bg-white dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] hover:border-amber-400 dark:hover:border-amber-500/50'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-amber-600 dark:text-amber-400">
                    {checkedIds.has(item.id) ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                      <span className={checkedIds.has(item.id) ? 'line-through text-[#7E766A] dark:text-[#8D88A3]' : ''}>
                        {item.name}
                      </span>
                      <span className="text-xs font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-[#7E766A] dark:text-[#9F96B2] mt-1 leading-relaxed">
                      {item.notes}
                    </p>
                    {item.recommendedBrand && (
                      <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-1">
                        Pick: <span className="text-[#4A4652] dark:text-[#CBD1E1] italic">{item.recommendedBrand}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Pantry & Science */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 font-mono-data">
              <Sparkles className="w-4 h-4" />
              <span>3. Gourmet Pantry & Bitter-Blocking Minerals</span>
            </div>
            <div className="space-y-2.5">
              {items.filter((i) => i.category === 'pantry').map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedIds.has(item.id)
                      ? 'bg-[#FAF5EB] dark:bg-[#0D1528] border-emerald-400/40 dark:border-emerald-800/40 opacity-70'
                      : 'bg-white dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] hover:border-amber-400 dark:hover:border-amber-500/50'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-amber-600 dark:text-amber-400">
                    {checkedIds.has(item.id) ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                      <span className={checkedIds.has(item.id) ? 'line-through text-[#7E766A] dark:text-[#8D88A3]' : ''}>
                        {item.name}
                      </span>
                      <span className="text-xs font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-[#7E766A] dark:text-[#9F96B2] mt-1 leading-relaxed">
                      {item.notes}
                    </p>
                    {item.recommendedBrand && (
                      <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-1">
                        Pick: <span className="text-[#4A4652] dark:text-[#CBD1E1] italic">{item.recommendedBrand}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Equipment & Gear */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 font-mono-data">
              <Wrench className="w-4 h-4" />
              <span>4. Brewing Hardware & Kitchen Gear</span>
            </div>
            <div className="space-y-2.5">
              {items.filter((i) => i.category === 'equipment').map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    checkedIds.has(item.id)
                      ? 'bg-[#FAF5EB] dark:bg-[#0D1528] border-emerald-400/40 dark:border-emerald-800/40 opacity-70'
                      : 'bg-white dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] hover:border-amber-400 dark:hover:border-amber-500/50'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-amber-600 dark:text-amber-400">
                    {checkedIds.has(item.id) ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                      <span className={checkedIds.has(item.id) ? 'line-through text-[#7E766A] dark:text-[#8D88A3]' : ''}>
                        {item.name}
                      </span>
                      <span className="text-xs font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
                        {item.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-[#7E766A] dark:text-[#9F96B2] mt-1 leading-relaxed">
                      {item.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#0B101D] flex flex-wrap items-center justify-between gap-3 transition-colors">
          <button
            onClick={handleCopyShoppingList}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC] hover:bg-[#F2E8D5] dark:hover:bg-[#1E1735] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Copy Formatted Checklist</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-xs font-semibold uppercase tracking-wider text-white shadow transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
