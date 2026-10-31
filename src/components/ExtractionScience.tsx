import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Thermometer, 
  Sparkles, 
  Milk, 
  HelpCircle, 
  Flame, 
  Check, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const ExtractionScience: React.FC = () => {
  const [activeTroubleshoot, setActiveTroubleshoot] = useState<string | null>(null);

  const toggleTroubleshoot = (id: string) => {
    setActiveTroubleshoot(activeTroubleshoot === id ? null : id);
  };

  return (
    <section id="science" className="py-12 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <span>Extraction Physics</span>
              <span aria-hidden="true">·</span>
              <span>Flavor Chemistry</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              The Zero-Bitterness Formula
            </h2>
          </div>
          <p className="text-sm text-[#7E766A] dark:text-[#CBD1E1] max-w-md">
            Why this recipe tastes like liquid fudge rather than charcoal ash. Four scientific principles engineered specifically for dark roasts.
          </p>
        </div>

        {/* 4 Science Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: Early Cutoff */}
          <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-6 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              1. The Ristretto & Cold-Quench Cutoff
            </h3>
            <p className="text-xs text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed">
              Coffee extracts in phases: <strong className="text-amber-700 dark:text-amber-300">fats and chocolate aromatics</strong> come first, followed by <strong className="text-amber-700 dark:text-amber-300">sugars</strong>, and finally <strong className="text-red-500 dark:text-red-400">tannins and ash</strong>. By cutting the extraction early (stopping Moka pot right before sputtering, or pulling a 1:1.6 espresso), you capture 95% of the coffee strength while leaving 100% of the bitter tail behind.
            </p>
            <div className="pt-2 text-[11px] font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
              Rule: Quench under cold water the second sputtering starts.
            </div>
          </div>

          {/* Card 2: Temperature Control */}
          <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-6 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              2. Sub-Boiling Water (88°C–90°C)
            </h3>
            <p className="text-xs text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed">
              Dark roast coffee has an open, porous cellular structure because the beans roasted longer. If you hit dark roast with boiling water (96°C–100°C), you dissolve astringent chlorogenic acid breakdown products. Dropping temperature to 89°C protects the natural caramelized sucrose and roasted hazelnut oils.
            </p>
            <div className="pt-2 text-[11px] font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
              Rule: Use water that has rested 1 minute off the boil.
            </div>
          </div>

          {/* Card 3: Micro-Saline */}
          <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-6 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              3. The Micro-Saline Receptor Hack
            </h3>
            <p className="text-xs text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed">
              Biochemically, sodium ions ($Na^+$) act as competitive antagonists against bitter taste receptors (TAS2Rs) on the tongue. A microscopic pinch of salt doesn't make your morning cup taste salty—it selectively inhibits bitter signal transmission to your brain, allowing the nutty, malty sweetness to shine through.
            </p>
            <div className="pt-2 text-[11px] font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
              Rule: 1 tiny pinch (~0.05g) added directly to ground beans.
            </div>
          </div>

          {/* Card 4: Oat Milk 62°C */}
          <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 p-6 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] shadow-xs space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Milk className="w-5 h-5" />
            </div>
            <h3 className="font-serif-display text-lg font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              4. Oat Milk Beta-Glucan Sweet Spot
            </h3>
            <p className="text-xs text-[#4A4652] dark:text-[#CBD1E1] leading-relaxed">
              Oat milk contains soluble fibers called beta-glucans and maltose sugars. When heated to 60°C–65°C, beta-glucans form a stable, silky suspension that mimics heavy cream. If you overheat past 70°C, the proteins curdle and collapse, creating a watery, burnt porridge flavor.
            </p>
            <div className="pt-2 text-[11px] font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
              Rule: Warm until hot to palm, but never steaming or bubbling.
            </div>
          </div>

        </div>

        {/* Interactive Barista Diagnostic Lab */}
        <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] p-6 sm:p-8 shadow-xs transition-colors">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Troubleshooting</span>
          </div>
          <h3 className="font-serif-display text-xl font-semibold text-[#1A1924] dark:text-[#F7F6FC] mb-6">
            Morning Dial-In Diagnostics
          </h3>

          <div className="space-y-3">
            
            {/* Issue 1 */}
            <div className="border border-[#E6D9C0] dark:border-[#2D2146] rounded-xl overflow-hidden bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
              <button
                type="button"
                onClick={() => toggleTroubleshoot('bitter')}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC] hover:bg-[#F4E9D5] dark:hover:bg-[#18132C] transition-colors"
              >
                <span>"My cup still feels a bit too harsh or astringent on the tongue"</span>
                {activeTroubleshoot === 'bitter' ? (
                  <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                )}
              </button>

              {activeTroubleshoot === 'bitter' && (
                <div className="p-4 pt-1 border-t border-[#E6D9C0] dark:border-[#2D2146] text-xs text-[#4A4652] dark:text-[#CBD1E1] space-y-2 bg-white/70 dark:bg-[#15122B]">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Cut your extraction 5 seconds earlier. In a Moka pot, quench the base under the tap the very moment bubbles appear.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Grind slightly coarser: over-fine particles over-extract and clog the filter.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Make sure you added the pinch of salt—it immediately tames bitter tongue perception.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Issue 2 */}
            <div className="border border-[#E6D9C0] dark:border-[#2D2146] rounded-xl overflow-hidden bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
              <button
                type="button"
                onClick={() => toggleTroubleshoot('sour')}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC] hover:bg-[#F4E9D5] dark:hover:bg-[#18132C] transition-colors"
              >
                <span>"I hate sour or citrus notes—how is this recipe 100% sour-free?"</span>
                {activeTroubleshoot === 'sour' ? (
                  <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                )}
              </button>

              {activeTroubleshoot === 'sour' && (
                <div className="p-4 pt-1 border-t border-[#E6D9C0] dark:border-[#2D2146] text-xs text-[#4A4652] dark:text-[#CBD1E1] space-y-2 bg-white/70 dark:bg-[#15122B]">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dark roasting degrades citric and malic acids completely into pleasant nutty aromatic compounds.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dutch-processed cacao is alkalized to a neutral pH 7-8, completely neutralizing any natural cocoa acidity.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Issue 3 */}
            <div className="border border-[#E6D9C0] dark:border-[#2D2146] rounded-xl overflow-hidden bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
              <button
                type="button"
                onClick={() => toggleTroubleshoot('milk')}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC] hover:bg-[#F4E9D5] dark:hover:bg-[#18132C] transition-colors"
              >
                <span>"My oat milk isn't foaming into rich microfoam"</span>
                {activeTroubleshoot === 'milk' ? (
                  <ChevronUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#7E766A] dark:text-[#8D88A3]" />
                )}
              </button>

              {activeTroubleshoot === 'milk' && (
                <div className="p-4 pt-1 border-t border-[#E6D9C0] dark:border-[#2D2146] text-xs text-[#4A4652] dark:text-[#CBD1E1] space-y-2 bg-white/70 dark:bg-[#15122B]">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>Always choose "Barista Edition" oat milk (e.g. Oatly Barista or Minor Figures) which contains dipotassium phosphate to prevent curdling in hot coffee.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>If using a French press to foam: warm the milk to 62°C, pour into clean French press, and pump the plunger vigorously for 20 seconds. It creates velvety microfoam identical to commercial steam wands!</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
