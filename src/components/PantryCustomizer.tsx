import React from 'react';
import { PantrySettings, NutProfile, SweetenerType, EquipmentType } from '../types/coffee';
import { NUT_OPTIONS, SWEETENER_OPTIONS, calculateSensoryProfile } from '../data/recipes';
import { Sliders, Sparkles, Check, Info } from 'lucide-react';

interface PantryCustomizerProps {
  pantry: PantrySettings;
  onChangePantry: (newPantry: PantrySettings) => void;
  equipment: EquipmentType;
  onOpenVisualizeBrew?: () => void;
}

export const PantryCustomizer: React.FC<PantryCustomizerProps> = ({
  pantry,
  onChangePantry,
  equipment,
  onOpenVisualizeBrew,
}) => {
  const sensory = calculateSensoryProfile(pantry, equipment);

  const update = <K extends keyof PantrySettings>(key: K, value: PantrySettings[K]) => {
    onChangePantry({
      ...pantry,
      [key]: value,
    });
  };

  return (
    <section id="customizer" className="py-12 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <span>Flavor Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Pantry Dial</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              Cocoa & Toasted Nut Customizer
            </h2>
          </div>
          <p className="text-sm text-[#7E766A] dark:text-[#CBD1E1] max-w-md">
            Fine-tune the balance of dark alkalized cacao, roasted nutty fats, and warming pantry spices to craft your ideal cozy cup.
          </p>
        </div>

        {/* 2-Column Layout: Controls on Left, Live Sensory Profile on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Dutch-Processed Cacao Powder */}
            <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-5 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Dutch-Processed Dark Cacao
                  </h3>
                  <p className="text-xs text-[#7E766A] dark:text-[#8D88A3]">
                    Alkalized cocoa eliminates sharp berry acidity and delivers deep chocolate fudge.
                  </p>
                </div>
                <span className="text-xs font-mono-data text-amber-600 dark:text-amber-400 font-semibold px-2.5 py-1 bg-[#FAF5EB] dark:bg-[#0B101D] rounded border border-[#E6D9C0] dark:border-[#2D2146]">
                  {pantry.cocoaLevel === 0 ? 'None' : `${pantry.cocoaLevel} tsp (${pantry.cocoaLevel * 3}g)`}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={pantry.cocoaLevel}
                onChange={(e) => update('cocoaLevel', Number(e.target.value))}
                className="w-full h-1.5 bg-[#E6D9C0] dark:bg-[#2D2146] rounded-lg appearance-none cursor-pointer accent-amber-600"
              />

              <div className="flex justify-between text-[11px] text-[#7E766A] dark:text-[#8D88A3] font-mono-data">
                <span>0 (Pure Coffee)</span>
                <span>1 (Warm Dusting)</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">2 (Rich Fudge)</span>
                <span>3 (Ultra Ganache)</span>
              </div>
            </div>

            {/* 2. Roasted Nut Profile Selector & Intensity */}
            <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-5 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    Toasted Nut Profile
                  </h3>
                  <p className="text-xs text-[#7E766A] dark:text-[#8D88A3]">
                    Natural nut extracts or nut butter dissolve effortlessly in hot oat milk.
                  </p>
                </div>
                <span className="text-xs font-mono-data text-amber-600 dark:text-amber-400 font-semibold px-2.5 py-1 bg-[#FAF5EB] dark:bg-[#0B101D] rounded border border-[#E6D9C0] dark:border-[#2D2146]">
                  Level {pantry.nutIntensity}/4
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {NUT_OPTIONS.map((nut) => (
                  <button
                    key={nut.id}
                    type="button"
                    onClick={() => update('nutType', nut.id as NutProfile)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      pantry.nutType === nut.id
                        ? 'bg-amber-100/80 dark:bg-[#2B1B3C] border-amber-500 text-amber-950 dark:text-white shadow-xs'
                        : 'bg-[#FAF5EB] dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] text-[#554E43] dark:text-[#CBD1E1] hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC]">{nut.name}</span>
                      {pantry.nutType === nut.id && (
                        <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-[#7E766A] dark:text-[#8D88A3] mt-1 line-clamp-1">{nut.notes}</p>
                  </button>
                ))}
              </div>

              {/* Nut Intensity Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-[#7E766A] dark:text-[#9F96B2] mb-1.5">
                  <span>Nut Essence Intensity</span>
                  <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">
                    {pantry.nutIntensity === 1 && 'Subtle (1/4 tsp)'}
                    {pantry.nutIntensity === 2 && 'Balanced (1/2 tsp)'}
                    {pantry.nutIntensity === 3 && 'Distinct Toasted (3/4 tsp)'}
                    {pantry.nutIntensity === 4 && 'Heavy Nutella Body (1 tsp)'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={1}
                  value={pantry.nutIntensity}
                  onChange={(e) => update('nutIntensity', Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E6D9C0] dark:bg-[#2D2146] rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
            </div>

            {/* 3. Sweetener Touch & Level */}
            <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-5 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-4 transition-colors">
              <div>
                <h3 className="text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                  Sweetener Accent
                </h3>
                <p className="text-xs text-[#7E766A] dark:text-[#8D88A3]">
                  Unrefined sugars accent dark chocolate without masking bold roast intensity.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SWEETENER_OPTIONS.map((sw) => (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => update('sweetener', sw.id as SweetenerType)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                      pantry.sweetener === sw.id
                        ? 'bg-amber-100/80 dark:bg-[#2B1B3C] border-amber-500 text-amber-950 dark:text-white font-medium shadow-xs'
                        : 'bg-[#FAF5EB] dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] text-[#7E766A] dark:text-[#9F96B2] hover:border-amber-400'
                    }`}
                  >
                    <div className="truncate font-semibold text-[#1A1924] dark:text-[#F7F6FC]">{sw.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-[#7E766A] dark:text-[#8D88A3] truncate">{sw.measure}</div>
                  </button>
                ))}
              </div>

              {pantry.sweetener !== 'unsweetened' && (
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs text-[#7E766A] dark:text-[#9F96B2] mb-1.5">
                    <span>Sweetness Level</span>
                    <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">Level {pantry.sweetnessLevel}/3</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={pantry.sweetnessLevel}
                    onChange={(e) => update('sweetnessLevel', Number(e.target.value))}
                    className="w-full h-1.5 bg-[#E6D9C0] dark:bg-[#2D2146] rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>
              )}
            </div>

            {/* 4. The Micro-Saline Secret (Pinch of Salt) & Spice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Salt Toggle */}
              <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-4 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                      Micro-Saline Science
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono-data font-semibold">Sodium Ion Hack</span>
                  </div>
                  <p className="text-xs text-[#7E766A] dark:text-[#8D88A3] mt-1.5">
                    A single grain of sea salt neutralizes bitter taste receptor activation without making the drink taste salty.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E6D9C0] dark:border-[#2D2146] flex items-center justify-between">
                  <span className="text-xs text-[#4A4652] dark:text-[#CBD1E1]">Pinch of Sea Salt</span>
                  <button
                    type="button"
                    onClick={() => update('pinchOfSalt', !pantry.pinchOfSalt)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      pantry.pinchOfSalt ? 'bg-amber-600' : 'bg-[#D8CBB2] dark:bg-[#2D2146]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        pantry.pinchOfSalt ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Spice Dash */}
              <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-4 rounded-xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-2 transition-colors">
                <span className="text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                  Warming Spice Dusting
                </span>
                <p className="text-xs text-[#7E766A] dark:text-[#8D88A3]">
                  Gently dusted on the warm oat microfoam to awaken the nose.
                </p>

                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  {(['cinnamon', 'nutmeg', 'cardamom', 'none'] as const).map((spice) => (
                    <button
                      key={spice}
                      type="button"
                      onClick={() => update('spiceChoice', spice)}
                      className={`py-1.5 px-2 text-[11px] rounded border text-center capitalize transition-colors ${
                        pantry.spiceChoice === spice
                          ? 'bg-amber-100 dark:bg-[#2B1B3C] border-amber-500 text-amber-950 dark:text-white font-medium shadow-xs'
                          : 'bg-[#FAF5EB] dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] text-[#7E766A] dark:text-[#8D88A3] hover:text-[#1A1924] dark:hover:text-[#F7F6FC]'
                      }`}
                    >
                      {spice === 'none' ? 'No Spice' : spice}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Sensory Dial & Scientific Breakdown */}
          <div className="lg:col-span-5 sticky top-24 space-y-5">
            
            <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-6 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-6 transition-colors">
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2]">
                    Live Sensory Profile
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono-data font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Zero Sour Notes
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-medium text-[#1A1924] dark:text-[#F7F6FC]">
                  Cup Balance Preview
                </h3>
              </div>

              {/* Dynamic Sensory Sliders */}
              <div className="space-y-4">
                
                {/* Chocolate */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#4A4652] dark:text-[#CBD1E1] font-medium">Dark Chocolate & Cacao</span>
                    <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">{sensory.chocolate}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-full overflow-hidden border border-[#E6D9C0] dark:border-[#2D2146]">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300 rounded-full"
                      style={{ width: `${sensory.chocolate}%` }}
                    />
                  </div>
                </div>

                {/* Nutty */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#4A4652] dark:text-[#CBD1E1] font-medium">Toasted Nut Depth</span>
                    <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">{sensory.nutty}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-full overflow-hidden border border-[#E6D9C0] dark:border-[#2D2146]">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
                      style={{ width: `${sensory.nutty}%` }}
                    />
                  </div>
                </div>

                {/* Body / Velvet */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#4A4652] dark:text-[#CBD1E1] font-medium">Velvet Body & Mouthfeel</span>
                    <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">{sensory.body}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-full overflow-hidden border border-[#E6D9C0] dark:border-[#2D2146]">
                    <div
                      className="h-full bg-amber-600 transition-all duration-300 rounded-full"
                      style={{ width: `${sensory.body}%` }}
                    />
                  </div>
                </div>

                {/* Bitterness */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#4A4652] dark:text-[#CBD1E1] font-medium">Perceived Bitterness</span>
                    <span className={`font-mono-data font-semibold ${sensory.bitterness <= 20 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {sensory.bitterness}% {sensory.bitterness <= 20 && '(Ultra Low)'}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-full overflow-hidden border border-[#E6D9C0] dark:border-[#2D2146]">
                    <div
                      className="h-full bg-slate-400 dark:bg-slate-500 transition-all duration-300 rounded-full"
                      style={{ width: `${sensory.bitterness}%` }}
                    />
                  </div>
                </div>

                {/* Acidity / Sourness */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#4A4652] dark:text-[#CBD1E1] font-medium">Fruit / Sour Acidity</span>
                    <span className="font-mono-data text-emerald-600 dark:text-emerald-400 font-semibold">
                      {sensory.acidity}% (Subdued)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-full overflow-hidden border border-[#E6D9C0] dark:border-[#2D2146]">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${sensory.acidity}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Summary description box */}
              <div className="p-3.5 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-lg border border-[#E6D9C0] dark:border-[#2D2146] text-xs text-[#4A4652] dark:text-[#CBD1E1] space-y-1.5 leading-relaxed">
                <div className="font-semibold text-[#1A1924] dark:text-[#F7F6FC] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Taste Profile Expectation</span>
                </div>
                <p>
                  Full, comforting mouthfeel reminiscent of molten Gianduja hazelnut chocolate. Dark roast boldness cuts cleanly through sweet oat cream with crisp finish and zero cheek-puckering sourness.
                </p>
              </div>

              {onOpenVisualizeBrew && (
                <button
                  type="button"
                  onClick={onOpenVisualizeBrew}
                  className="w-full py-2.5 px-4 rounded-xl border border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-[#251535] hover:bg-amber-100 dark:hover:bg-[#321B45] text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-200 transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Visualize Brew in Glassware</span>
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
