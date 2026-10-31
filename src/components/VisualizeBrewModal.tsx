import React, { useState, useEffect } from 'react';
import { EquipmentType, PantrySettings } from '../types/coffee';
import { EQUIPMENT_DATA, NUT_OPTIONS } from '../data/recipes';
import { Sparkles, X, RefreshCw, Download, Coffee, Layers, Check, Wand2 } from 'lucide-react';

interface VisualizeBrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: EquipmentType;
  pantry: PantrySettings;
  servings: number;
}

export type CupType = 'gibraltar_glass' | 'ceramic_tumbler' | 'double_walled_glass' | 'copper_mug';

interface CupOption {
  id: CupType;
  name: string;
  subtitle: string;
  description: string;
  idealFor: string;
}

const CUP_OPTIONS: CupOption[] = [
  {
    id: 'gibraltar_glass',
    name: 'Gibraltar Faceted Glass',
    subtitle: 'Classic Cortado Standard (4.5 oz)',
    description: 'Heavy faceted clear glass that highlights the layered espresso and velvety oat microfoam demarcation.',
    idealFor: 'Authentic San Francisco Cortado presentation'
  },
  {
    id: 'ceramic_tumbler',
    name: 'Matte Ceramic Tumbler',
    subtitle: 'Dark Charcoal Stoneware',
    description: 'Handcrafted Japanese-inspired pottery with a tactile raw clay rim that retains 62°C drinking heat.',
    idealFor: 'Cozy, earthy morning rituals'
  },
  {
    id: 'double_walled_glass',
    name: 'Double-Walled Glass Mug',
    subtitle: 'Thermal Floating Liquid',
    description: 'Ultra-clear borosilicate glass giving the illusion of a floating dark cocoa oat emulsion with zero condensation.',
    idealFor: 'Modern minimalists'
  },
  {
    id: 'copper_mug',
    name: 'Vintage Copper Cup',
    subtitle: 'Artisanal Warm Cafe Tone',
    description: 'Brushed copper vessel reflecting golden morning rays with dark chocolate dusting on the foam crest.',
    idealFor: 'Antique warmth & character'
  }
];

export const VisualizeBrewModal: React.FC<VisualizeBrewModalProps> = ({
  isOpen,
  onClose,
  equipment,
  pantry,
  servings
}) => {
  const [selectedCup, setSelectedCup] = useState<CupType>('gibraltar_glass');
  const [milkStyle, setMilkStyle] = useState<'velvet_microfoam' | 'thick_crema' | 'cacao_latte_art'>('velvet_microfoam');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visualData, setVisualData] = useState<{
    imageUrl: string;
    promptUsed: string;
    source: string;
    cupType: string;
  } | null>(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const nutInfo = NUT_OPTIONS.find((n) => n.id === pantry.nutType);
  const equipmentConfig = EQUIPMENT_DATA[equipment];

  const loadingSteps = [
    'Analyzing recipe ratios & dark roast bean extract...',
    `Emulsifying ${nutInfo?.name || 'toasted hazelnut'} & Dutch cacao...`,
    'Frothing barista oat milk to 62°C velvety microfoam...',
    `Pouring into artisanal ${CUP_OPTIONS.find(c => c.id === selectedCup)?.name}...`,
    'Polishing 8K morning cafe lighting and foam dusting...'
  ];

  const generateVisualization = async (cupOverride?: CupType) => {
    const cup = cupOverride || selectedCup;
    setIsLoading(true);
    setLoadingStepIndex(0);

    const stepInterval = setInterval(() => {
      setLoadingStepIndex(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/visualize-brew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apparatus: equipment,
          cupType: cup,
          nutProfile: nutInfo?.name || pantry.nutType,
          cocoaLevel: pantry.cocoaLevel,
          milkStyle: milkStyle === 'velvet_microfoam' ? '62°C velvety oat microfoam' : milkStyle === 'thick_crema' ? 'thick golden crema with oat cream' : 'cacao dusted oat foam art',
          spice: pantry.spiceChoice,
          servings
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setVisualData(data);
    } catch (err) {
      console.warn('Image visualization API error, loading local high-res visual:', err);
      // Fallback
      setVisualData({
        imageUrl: cup === 'ceramic_tumbler' 
          ? '/src/assets/images/ceramic_espresso_cortado_1793442807109.jpg'
          : cup === 'double_walled_glass'
          ? '/src/assets/images/pourover_glass_mug_1793442806710.jpg'
          : '/src/assets/images/moka_cortado_glass_1793442806967.jpg',
        promptUsed: `A delicious artisanal ${nutInfo?.name || 'hazelnut'} and dark chocolate oat cortado served in ${CUP_OPTIONS.find(c => c.id === cup)?.name}.`,
        source: 'curated_highres',
        cupType: cup
      });
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  // Trigger visualization automatically when modal first opens or when cup changes
  useEffect(() => {
    if (isOpen) {
      generateVisualization(selectedCup);
    }
  }, [isOpen]);

  const handleSelectCup = (cupId: CupType) => {
    setSelectedCup(cupId);
    generateVisualization(cupId);
  };

  const handleDownload = () => {
    if (!visualData?.imageUrl) return;
    const a = document.createElement('a');
    a.href = visualData.imageUrl;
    a.download = `velvet-roast-${selectedCup}-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white/98 dark:bg-gradient-to-br dark:from-[#11172E] dark:via-[#16122C] dark:to-[#1E0E2B] border border-[#E6D9C0] dark:border-[#35254A] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-colors"
        role="dialog"
        aria-labelledby="visualize-modal-title"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-[#2B1B3C] border border-amber-300 dark:border-amber-600/40 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="visualize-modal-title" className="font-serif-display text-lg sm:text-xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                  Visualize Brew
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-mono-data px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-semibold">
                  AI Studio Visualizer
                </span>
              </div>
              <p className="text-xs text-[#7E766A] dark:text-[#8D88A3] mt-0.5">
                Rendering {nutInfo?.name || 'Hazelnut'} & Dutch Cacao Oat Cortado in tailored glassware
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7E766A] dark:text-[#8D88A3] hover:text-[#1A1924] dark:hover:text-white hover:bg-[#F2E8D5] dark:hover:bg-[#1E1735] transition-colors"
            aria-label="Close visualization modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns (Interactive Controls on Left, Rendered Visual on Right) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Glassware & Milk Styling Configurator */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Cup Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] font-semibold mb-2">
                Select Matching Cup or Glassware
              </label>
              <div className="space-y-2">
                {CUP_OPTIONS.map((cup) => {
                  const isSelected = selectedCup === cup.id;
                  return (
                    <button
                      key={cup.id}
                      type="button"
                      onClick={() => handleSelectCup(cup.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-100/70 dark:bg-[#2B1B3C] text-[#1A1924] dark:text-[#F7F6FC] shadow-xs'
                          : 'border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#0B101D] text-[#554E43] dark:text-[#CBD1E1] hover:border-amber-400'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-[#C8B89E] dark:border-[#4A3B58]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#1A1924] dark:text-[#F7F6FC]">{cup.name}</span>
                          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono-data font-semibold">{cup.subtitle.split(' ')[0]}</span>
                        </div>
                        <p className="text-[11px] text-[#7E766A] dark:text-[#8D88A3] mt-0.5 leading-snug">{cup.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Milk Microfoam Texture */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] font-semibold mb-2">
                Oat Milk Texture & Microfoam
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'velvet_microfoam', label: 'Silky 62°C', note: 'Standard Cortado' },
                  { id: 'cacao_latte_art', label: 'Dust & Art', note: 'Cocoa Rosetta' },
                  { id: 'thick_crema', label: 'Deep Crema', note: 'Ristretto Head' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMilkStyle(item.id as any);
                      generateVisualization();
                    }}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      milkStyle === item.id
                        ? 'border-amber-500 bg-amber-100/80 dark:bg-[#2B1B3C] text-amber-950 dark:text-amber-200 font-semibold shadow-xs'
                        : 'border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#0B101D] text-[#7E766A] dark:text-[#9F96B2] hover:text-[#1A1924] dark:hover:text-white'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[9px] text-[#7E766A] dark:text-[#8D88A3]">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Recipe Specs Summary Box */}
            <div className="p-3.5 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] space-y-2 text-xs transition-colors">
              <div className="flex items-center justify-between text-[#7E766A] dark:text-[#9F96B2] font-mono-data uppercase text-[11px]">
                <span>Apparatus: {equipmentConfig.name}</span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold">{servings} Servings</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#1E1735] text-[#554E43] dark:text-[#CBD1E1] border border-[#E6D9C0] dark:border-[#35254A] text-[10px]">
                  ☕ {equipmentConfig.doseGrams * servings}g Dark Roast
                </span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#1E1735] text-[#554E43] dark:text-[#CBD1E1] border border-[#E6D9C0] dark:border-[#35254A] text-[10px]">
                  🍫 {pantry.cocoaLevel} tsp Dutch Cacao
                </span>
                <span className="px-2 py-0.5 rounded bg-white dark:bg-[#1E1735] text-[#554E43] dark:text-[#CBD1E1] border border-[#E6D9C0] dark:border-[#35254A] text-[10px]">
                  🌰 {nutInfo?.name} (Lvl {pantry.nutIntensity})
                </span>
                {pantry.spiceChoice !== 'none' && (
                  <span className="px-2 py-0.5 rounded bg-white dark:bg-[#1E1735] text-[#554E43] dark:text-[#CBD1E1] border border-[#E6D9C0] dark:border-[#35254A] text-[10px]">
                    ✨ Dash of {pantry.spiceChoice}
                  </span>
                )}
              </div>
            </div>

            {/* Action Button: Re-generate Visualization */}
            <button
              type="button"
              onClick={() => generateVisualization()}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Rendering Visual...' : 'Re-Generate Visual'}</span>
            </button>

          </div>

          {/* Right Column: Visual Render Display with Studio Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#E6D9C0] dark:border-[#35254A] bg-[#FAF5EB] dark:bg-[#080D18] aspect-[4/3] flex items-center justify-center shadow-inner group transition-colors">
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
                    <Coffee className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-serif-display text-base font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                      Rendering Photorealistic Brew
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 font-mono-data animate-pulse">
                      {loadingSteps[loadingStepIndex]}
                    </p>
                  </div>
                  <div className="w-48 h-1 bg-[#E6D9C0] dark:bg-[#251D3A] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-700"
                      style={{ width: `${((loadingStepIndex + 1) / loadingSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              ) : visualData?.imageUrl ? (
                <>
                  <img
                    src={visualData.imageUrl}
                    alt={`Photorealistic visualization of ${nutInfo?.name} cacao oat cortado in ${CUP_OPTIONS.find(c => c.id === selectedCup)?.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-data tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {CUP_OPTIONS.find(c => c.id === selectedCup)?.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-data bg-black/60 backdrop-blur-md text-[#C4B5A5] border border-white/20">
                      {visualData.source === 'gemini_generated' ? 'Gemini 3.1 Studio AI' : '8K Studio Photography'}
                    </span>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase font-mono-data tracking-wider text-amber-400">
                        Formula Render
                      </div>
                      <div className="font-serif-display text-sm font-medium text-white">
                        Toasted {nutInfo?.name || 'Hazelnut'} & Cacao Cortado (1:1 Ratio)
                      </div>
                      <p className="text-[10px] text-white/80 line-clamp-1 mt-0.5">
                        {CUP_OPTIONS.find(c => c.id === selectedCup)?.idealFor}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-xs text-white border border-white/30 flex items-center gap-1.5 backdrop-blur-md shrink-0 transition-colors"
                      title="Download Render"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px]">Save</span>
                    </button>
                  </div>
                </>
              ) : null}

            </div>

            {/* Prompt Transparency & Sensory Notes */}
            <div className="p-3.5 rounded-xl bg-[#FAF5EB] dark:bg-[#0B101D] border border-[#E6D9C0] dark:border-[#2D2146] space-y-1.5 transition-colors">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                <Wand2 className="w-3.5 h-3.5" />
                <span>Render Formulation Grounding</span>
              </div>
              <p className="text-[11px] text-[#7E766A] dark:text-[#9F96B2] leading-relaxed font-mono-data italic">
                "{visualData?.promptUsed || `Artisanal dark chocolate & ${nutInfo?.name} oat cortado in ${CUP_OPTIONS.find(c => c.id === selectedCup)?.name} with 62°C velvety microfoam.`}"
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#E6D9C0] dark:border-[#2D2146] bg-[#FAF5EB] dark:bg-[#0B101D] transition-colors">
          <span className="text-xs text-[#7E766A] dark:text-[#8D88A3]">
            Matching 1:1 espresso extract to textured oat milk
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1A1924] dark:text-[#F7F6FC] bg-white dark:bg-[#1E1735] hover:bg-[#F2E8D5] dark:hover:bg-[#281F45] rounded-lg transition-colors border border-[#E6D9C0] dark:border-[#35254A]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
