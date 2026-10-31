import React from 'react';
import { EquipmentType } from '../types/coffee';
import { EQUIPMENT_DATA } from '../data/recipes';
import { Sparkles, Flame, ShieldCheck, Scale, Droplet, ShoppingCart, Copy } from 'lucide-react';

interface HeroDrinkProps {
  equipment: EquipmentType;
  onSelectEquipment: (eq: EquipmentType) => void;
  servings: number;
  onSelectServings: (s: number) => void;
  onStartBrew: () => void;
  onOpenShoppingList?: () => void;
  onCopyRecipe?: () => void;
  onOpenVisualizeBrew?: () => void;
}

export const HeroDrink: React.FC<HeroDrinkProps> = ({
  equipment,
  onSelectEquipment,
  servings,
  onSelectServings,
  onStartBrew,
  onOpenShoppingList,
  onCopyRecipe,
  onOpenVisualizeBrew,
}) => {
  const currentConfig = EQUIPMENT_DATA[equipment];
  const scaledCoffee = currentConfig.doseGrams * servings;
  const scaledYield = currentConfig.yieldGrams * servings;
  const scaledOatMilk = currentConfig.yieldGrams * servings; // 1:1 cortado ratio

  return (
    <section className="relative pt-6 pb-12 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Subtitle & Lead-in */}
        <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-amber-600 dark:text-amber-400 font-semibold mb-3">
          <span>Artisanal Morning Formulation</span>
          <span aria-hidden="true">·</span>
          <span>Dark Roast & Oat Emulsion</span>
          <span aria-hidden="true">·</span>
          <span>Zero Acid Guarantee</span>
        </div>

        {/* 2-Column Split: Drink Showcase & Dynamic Prep Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Visual Showcase & Identity */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1A1924] dark:text-[#F7F6FC] leading-[1.15] text-balance">
                Toasted Cacao & Nut Oat Cortado
              </h1>
              
              <p className="mt-4 text-base sm:text-lg text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed max-w-xl">
                An ultra-dense 1:1 morning drink engineered for concentrated caffeine strength without the bitter sting or sour bite. Rich Dutch cacao and warm roasted hazelnut embrace a velvety microfoamed oat milk bed.
              </p>

              {/* Clean unboxed sensory guarantees */}
              <div className="mt-6 pt-5 border-t border-[#E6D9C0] dark:border-[#2D2146] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7E766A] dark:text-[#9088A5]">
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <Flame className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[#1A1924] dark:text-[#F7F6FC]">Super Strong Kick</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[#1A1924] dark:text-[#F7F6FC]">Zero Sour Notes</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-semibold text-[#1A1924] dark:text-[#F7F6FC]">Tamed Bitterness via Minerals</span>
                </div>
              </div>
            </div>

            {/* Interactive Equipment Toggle */}
            <div className="bg-white/90 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-4 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] font-medium">
                  Select Brewing Apparatus
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-mono-data font-semibold">
                  {currentConfig.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-lg border border-[#E6D9C0] dark:border-[#2E2145]">
                <button
                  type="button"
                  onClick={() => onSelectEquipment('moka')}
                  className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center ${
                    equipment === 'moka'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm font-semibold'
                      : 'text-[#5A5348] dark:text-[#B6B0C8] hover:text-[#1A1924] dark:hover:text-white'
                  }`}
                >
                  Moka Pot
                </button>
                <button
                  type="button"
                  onClick={() => onSelectEquipment('espresso')}
                  className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center ${
                    equipment === 'espresso'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm font-semibold'
                      : 'text-[#5A5348] dark:text-[#B6B0C8] hover:text-[#1A1924] dark:hover:text-white'
                  }`}
                >
                  Espresso
                </button>
                <button
                  type="button"
                  onClick={() => onSelectEquipment('pourover')}
                  className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center ${
                    equipment === 'pourover'
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm font-semibold'
                      : 'text-[#5A5348] dark:text-[#B6B0C8] hover:text-[#1A1924] dark:hover:text-white'
                  }`}
                >
                  Pour-Over
                </button>
              </div>

              <p className="text-xs text-[#7E766A] dark:text-[#8D88A3] italic leading-snug">
                {currentConfig.tagline}
              </p>
            </div>

            {/* Serving Scaler */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2]">Servings:</span>
                <div className="flex items-center gap-1 bg-white dark:bg-[#12172D] p-1 rounded-lg border border-[#E6D9C0] dark:border-[#2D2146]">
                  {[1, 2, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => onSelectServings(s)}
                      className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                        servings === s
                          ? 'bg-amber-100 dark:bg-[#2B1B3C] text-amber-800 dark:text-amber-300 font-bold border border-amber-400 dark:border-amber-500/50'
                          : 'text-[#7E766A] dark:text-[#8D88A3] hover:text-[#1A1924] dark:hover:text-white'
                      }`}
                    >
                      {s} {s === 1 ? 'Cup' : 'Cups'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                {onOpenVisualizeBrew && (
                  <button
                    onClick={onOpenVisualizeBrew}
                    className="flex-1 sm:flex-initial px-4 py-3 text-xs tracking-wider uppercase font-semibold text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-500/50 bg-gradient-to-r from-amber-50 to-[#FCF4E6] dark:from-[#251433] dark:to-[#171933] hover:from-amber-100 dark:hover:from-[#311A42] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Visualize Brew</span>
                  </button>
                )}

                {onCopyRecipe && (
                  <button
                    onClick={onCopyRecipe}
                    className="flex-1 sm:flex-initial px-4 py-3 text-xs tracking-wider uppercase font-medium text-[#1A1924] dark:text-[#F7F6FC] border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] hover:bg-[#FAF5EB] dark:hover:bg-[#1D1735] rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Copy Recipe</span>
                  </button>
                )}

                {onOpenShoppingList && (
                  <button
                    onClick={onOpenShoppingList}
                    className="flex-1 sm:flex-initial px-4 py-3 text-xs tracking-wider uppercase font-medium text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40 bg-amber-50/60 dark:bg-[#16132D] hover:bg-amber-100/70 dark:hover:bg-[#20183B] rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Shopping List</span>
                  </button>
                )}

                <button
                  onClick={onStartBrew}
                  className="flex-1 sm:flex-initial px-6 py-3 text-xs tracking-wider uppercase font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center justify-center gap-2"
                >
                  <span>Start Brew Timer</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset + Tabular Dosage Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* High-Fidelity Hero Image Frame */}
            <div 
              onClick={onOpenVisualizeBrew}
              className={`relative rounded-2xl overflow-hidden border border-[#E6D9C0] dark:border-[#35254A] bg-[#FAF5EB] dark:bg-[#12172D] aspect-[4/3] group ${onOpenVisualizeBrew ? 'cursor-pointer' : ''}`}
              title="Click to visualize in custom matching glassware"
            >
              <img
                src="/src/assets/images/hero_cacao_oat_cortado_1793441179727.jpg"
                alt="Artisanal dark cocoa oat cortado in heavy glass with microfoam and cacao powder"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {onOpenVisualizeBrew && (
                <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-data tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Visualize Brew</span>
                  </span>
                </div>
              )}
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[11px] font-mono-data tracking-wider uppercase text-amber-300/90 font-semibold">
                  Signature 1:1 Ratio
                </div>
                <div className="text-sm font-serif-display font-medium">
                  {scaledYield}g Coffee Extract + {scaledOatMilk}ml Textured Oat
                </div>
              </div>
            </div>

            {/* Real-Time Scaled Dosing Metrics */}
            <div className="bg-white/90 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-4 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] grid grid-cols-3 gap-3 text-center transition-colors">
              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#7E766A] dark:text-[#9F96B2] uppercase mb-1">
                  <Scale className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Coffee</span>
                </div>
                <div className="text-base font-bold font-mono-data text-[#1A1924] dark:text-[#F7F6FC]">
                  {scaledCoffee}g
                </div>
                <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Dark Roast Beans</div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#7E766A] dark:text-[#9F96B2] uppercase mb-1">
                  <Droplet className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                  <span>Extract</span>
                </div>
                <div className="text-base font-bold font-mono-data text-amber-600 dark:text-amber-400">
                  {scaledYield}g
                </div>
                <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Early Cutoff Yield</div>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1 text-[11px] text-[#7E766A] dark:text-[#9F96B2] uppercase mb-1">
                  <Flame className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Oat Milk</span>
                </div>
                <div className="text-base font-bold font-mono-data text-[#1A1924] dark:text-[#F7F6FC]">
                  {scaledOatMilk}ml
                </div>
                <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3]">Velvet at 62°C</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
