import React, { useState } from 'react';
import { EquipmentType, PantrySettings } from '../types/coffee';
import { EQUIPMENT_DATA, NUT_OPTIONS, SWEETENER_OPTIONS } from '../data/recipes';
import { Copy, Check, BookmarkPlus, Sparkles, Scale, Coffee, ShoppingCart, Share2 } from 'lucide-react';
import { formatEmojiRecipe } from '../utils/formatRecipe';

interface RecipeCardProps {
  equipment: EquipmentType;
  pantry: PantrySettings;
  servings: number;
  onSaveRecipeModal: () => void;
  onStartBrewTimer: () => void;
  onOpenShoppingList: () => void;
  onShareRecipe: (formattedText: string) => void;
  onOpenVisualizeBrew?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  equipment,
  pantry,
  servings,
  onSaveRecipeModal,
  onStartBrewTimer,
  onOpenShoppingList,
  onShareRecipe,
  onOpenVisualizeBrew,
}) => {
  const [copied, setCopied] = useState(false);
  const config = EQUIPMENT_DATA[equipment];

  const scaledCoffee = config.doseGrams * servings;
  const scaledWater = config.waterAmountMl * servings;
  const scaledYield = config.yieldGrams * servings;
  const scaledOatMilk = config.yieldGrams * servings;
  const scaledCocoa = pantry.cocoaLevel * 3 * servings; // 3g per tsp
  const nutInfo = NUT_OPTIONS.find((n) => n.id === pantry.nutType);
  const sweetenerInfo = SWEETENER_OPTIONS.find((s) => s.id === pantry.sweetener);

  const handleCopyRecipe = () => {
    const text = formatEmojiRecipe(equipment, pantry, servings);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    onShareRecipe(text);
  };

  return (
    <section id="recipe" className="py-12 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <span>Kitchen Formulation</span>
              <span aria-hidden="true">·</span>
              <span>Accurate Measurements</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              Kitchen Dosing & Ingredient Card
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenVisualizeBrew && (
              <button
                onClick={onOpenVisualizeBrew}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-[#251535] text-xs font-semibold text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-[#321B45] transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Visualize Brew</span>
              </button>
            )}

            <button
              onClick={handleCopyRecipe}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Recipe</span>
                </>
              )}
            </button>

            <button
              onClick={onSaveRecipeModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white transition-colors"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>Save Preset</span>
            </button>

            <button
              onClick={onOpenShoppingList}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-300 dark:border-amber-600/40 bg-amber-50/60 dark:bg-[#16132D] text-xs font-medium text-amber-800 dark:text-amber-300 hover:bg-amber-100/70 dark:hover:bg-[#20183B] transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Shopping List</span>
            </button>

            <button
              onClick={onStartBrewTimer}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Start Brew Timer</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Ingredient Checklist + Coffee Bean Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ingredients Table */}
          <div className="lg:col-span-8 bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] p-6 space-y-6 shadow-xs transition-colors">
            
            <div className="flex items-center justify-between border-b border-[#E6D9C0] dark:border-[#2D2146] pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2]">
                  Formula For:
                </span>
                <h3 className="font-serif-display text-lg font-medium text-[#1A1924] dark:text-[#F7F6FC]">
                  {servings} {servings === 1 ? 'Cortado Cup (4.5 oz)' : 'Cortado Cups'}
                </h3>
              </div>
              <span className="text-xs font-mono-data text-amber-600 dark:text-amber-400 font-semibold">
                Method: {config.name}
              </span>
            </div>

            {/* List of Ingredients with exact gram/ml weights */}
            <div className="divide-y divide-[#E6D9C0] dark:divide-[#2D2146]">
              
              {/* Coffee Beans */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC] flex items-center gap-2">
                    <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Dark Roast Coffee Beans</span>
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    {config.grindSize}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-amber-600 dark:text-amber-400">
                    {scaledCoffee}g
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Freshly Ground</div>
                </div>
              </div>

              {/* Water */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Filtered Water
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    Preheated to {config.waterTemp}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-[#1A1924] dark:text-[#F7F6FC]">
                    {scaledWater}ml
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Yields ~{scaledYield}g extract</div>
                </div>
              </div>

              {/* Oat Milk */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Barista-Edition Oat Milk
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    Steamed/frothed gently to 62°C (silk microfoam)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-[#1A1924] dark:text-[#F7F6FC]">
                    {scaledOatMilk}ml
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Equal 1:1 ratio</div>
                </div>
              </div>

              {/* Dutch Cacao */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Dutch-Processed Dark Cacao Powder
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    Dissolved directly into the hot coffee extract
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-amber-600 dark:text-amber-400">
                    {pantry.cocoaLevel * servings} tsp ({scaledCocoa}g)
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Alkalized Cocoa</div>
                </div>
              </div>

              {/* Nut Profile */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    {nutInfo?.name} Extract or Butter
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    {nutInfo?.description}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-[#1A1924] dark:text-[#F7F6FC]">
                    Level {pantry.nutIntensity}/4
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">~{pantry.nutIntensity * 2.5 * servings}ml</div>
                </div>
              </div>

              {/* Salt Pinch */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Micro-Saline (Fine Sea Salt)
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    Added to dry grounds before brewing
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-emerald-600 dark:text-emerald-400">
                    {pantry.pinchOfSalt ? '1 Micro-Pinch' : 'None'}
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">~0.05g</div>
                </div>
              </div>

              {/* Sweetener & Spice */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Sweetener & Spice Finishing
                  </div>
                  <div className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                    {sweetenerInfo?.name} · {pantry.spiceChoice === 'none' ? 'No spice' : `Dash of ${pantry.spiceChoice}`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono-data text-[#1A1924] dark:text-[#F7F6FC]">
                    To Taste
                  </div>
                  <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Level {pantry.sweetnessLevel}/3</div>
                </div>
              </div>

            </div>

            {/* Golden Rule banner */}
            <div className="p-3.5 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-xl border border-amber-300 dark:border-amber-600/40 text-xs text-[#4A4652] dark:text-[#CBD1E1]">
              <strong className="text-amber-700 dark:text-amber-400 block mb-0.5 font-mono-data uppercase tracking-wider">
                Barista Golden Rule:
              </strong>
              {config.goldenRule}
            </div>

          </div>

          {/* Right Column: Dark Roast Bean Showcase */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="rounded-2xl overflow-hidden border border-[#E6D9C0] dark:border-[#35254A] bg-white/90 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 shadow-xs transition-colors">
              <img
                src="/src/assets/images/dark_roast_beans_macro_1793441179547.jpg"
                alt="Macro shot of freshly roasted dark roast beans and toasted hazelnut"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#7E766A] dark:text-[#9F96B2]">
                  <span className="uppercase tracking-wider font-semibold">Bean Character</span>
                  <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">French / Vienna Roast</span>
                </div>
                <p className="text-xs text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed">
                  Naturally caramelized bean oils glistening on the surface provide the deep chocolate base notes. By skipping long extraction, you avoid dissolving the astringent cellulose matrix.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/90 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 border border-[#E6D9C0] dark:border-[#35254A] space-y-2 text-xs text-[#7E766A] dark:text-[#9F96B2] shadow-xs transition-colors">
              <div className="text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Why Oat Milk Outperforms Dairy Here</span>
              </div>
              <p className="text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed">
                Cow's milk contains acidic lactates that can clash with high roast notes. Oat milk provides neutral grain lipids and sweet maltose, creating an emulsion that mimics melted dark chocolate ganache.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
