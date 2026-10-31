# Toasted Cacao & Nut Oat Cortado — Artisanal Morning Brew Companion

A specialized brewing companion and interactive recipe utility engineered to create a super-strong, velvety morning drink with zero sourness and tamed bitterness, tailored for dark roast beans, oat milk, and Moka pot or espresso brewing.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your preferences, we designed the signature drink as a **Toasted Cacao & Hazelnut Oat Cortado** (a dense 1:1 coffee-to-textured-oat-milk ratio) engineered for maximum intensity without bitterness. Please review the confirmed specs and technical approach below.

- **Confirmed Equipment**: Dual-mode support for **Moka Pot** (stovetop low-heat cutoff technique) and **Espresso Machine** (dense ristretto 1:1.75 extraction) with instant recipe recalculation.
- **Confirmed Flavor Profile**: Pure deep cocoa, roasted nuts (hazelnut/pecan), caramel malt, zero fruit acidity, and suppressed bitterness via mineral science.
- **Confirmed Interactive Tools**: 
  1. Multi-phase live guided brew timer with acoustic chimes (Web Audio API) and visual progress cues.
  2. Pantry flavor customizer allowing fine-tuning of Dutch-processed cacao, roasted nut essences, sweetness, and warming spices with real-time flavor wheel updates.

***

## 1. Overview & Core Concept

### What It Does
An artisanal morning coffee companion that demystifies how to extract intense dark roast coffee with zero bitter bite. It pairs an exact extraction guide with oat milk texturing physics and a customizable pantry infuser, helping you brew the coziest, strongest morning cup right on your kitchen counter.

### Target Audience & Persona
Home coffee lovers who crave high caffeine and rich, dessert-adjacent body (chocolate, fudge, roasted nuts, velvety foam) but want to avoid the harsh charcoal astringency of over-extracted dark roasts and the sour sharpness of light third-wave roasts.

### Key Value
- **Zero-Bitterness Extraction Science**: Master the short extraction ratio (1:1.6 ristretto cut), sub-boiling water temp (88°C–90°C), and the microscopic mineral trick (pinch of salt) that blocks bitter tongue receptors.
- **Oat Milk Emulsification**: Specific temperature guidance (60°C–65°C) to prevent oat beta-glucan curdling and maximize natural oat sweetness.
- **Interactive Multi-Step Brew Timer**: Hands-free acoustic timer that guides dosing, pre-infusion, extraction cut-off, milk texturing, and assembly.

***

## 2. User Experience & Visual Design

### Key User Flows
1. **Equipment & Dose Selection**: Toggle between *Moka Pot* and *Espresso Machine*, select 1 or 2 servings, and view precise gram-level weights and water volumes.
2. **Pantry Infusion Customizer**: Dial in cocoa richness, nut profiles (Toasted Hazelnut, Roasted Pecan, or Almond Cream), sweetness level, and spice touches. See the live Sensory Profile chart update in real time.
3. **Guided Brew Mode**: Launch the step-by-step timer with auditory chimes:
   - *Phase 1: Dose & Salt Pinches* (Pre-infusion prep)
   - *Phase 2: The Sweet-Spot Extraction* (Active stopwatch with early cutoff prompt to eliminate bitter blonding)
   - *Phase 3: Oat Milk Microfoam Texturing* (Temperature guide & froth timer)
   - *Phase 4: Cacao Swirl & Cortado Pour* (Assembly instructions)
4. **Tasting Notes & Custom Save**: Save preferred pantry ratios into local presets for fast one-tap morning repeats.

### Visual Identity & Theme
- **Aesthetic Direction**: Artisanal Warm Minimalist Specialty Coffee Studio. High-contrast typography, warm dark roasted hues, tactile parchment paper surfaces, and crisp copper/amber focal accents.
- **Color Palette**:
  - Dominant Neutral (60%): Deep Espresso Roast Canvas (`#120F0D` in dark mode, warm cream `#FAF7F2` in light mode).
  - Structural Surfaces (30%): Warm toasted oat and milk chocolate containers (`#1D1714` / `#F0EAE1`, hairline dividers `#2C231E` / `#E2D9CC`).
  - High-Intent Accents (10%): Warm amber honey (`#D97706`), deep molten cacao (`#78350F`), and creamy foam white (`#FFFBEB`).
- **Typography & Hierarchy**:
  - Display Font: `Fraunces` / `Playfair Display` for artisanal editorial headers.
  - Body Font: `Plus Jakarta Sans` for clean, high-legibility kitchen instructions.
  - Metrics / Ratios: Monospace tabular numerals (`font-mono tabular-nums`) for exact gram weights, temperatures, and timer seconds.
- **Design Restraint**: No generic badges or pill sandwiches; clean unboxed text metadata with `·` separators; WCAG AA compliant contrast throughout.

***

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Moka Pot & Espresso Logic**
  - *Chosen Approach*: Support both methods with distinct extraction physics rather than a generic "brew coffee" step. Moka pot uses boiling water in the reservoir + low flame + early water quench; Espresso uses 18g in $\to$ 28g out at 90°C.
  - *Why*: The user explicitly stated they have a Moka pot or espresso machine; adapting the guidance prevents over-extraction in both devices.
- **Decision 2: Synthesized Web Audio Sound Design**
  - *Chosen Approach*: Build custom chime tones using browser native Web Audio API (sine waves with exponential decay) for timer alerts.
  - *Why*: Eliminates dependencies on external audio files that could fail in restricted sandboxes, ensuring 100% reliable sound cues in the kitchen.
- **Decision 3: Built-in Bitterness Control Science Explainer**
  - *Chosen Approach*: An interactive "Bitterness Taming Lab" drawer detailing the chemistry: (1) why dark roasts require lower water temps, (2) how salt ions bind to bitter taste buds, and (3) why stopping extraction before blonding prevents harsh tannins.
  - *Why*: Gives the user actionable barista mastery to consistently brew their dream drink.

***

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (App.tsx)                              │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Top Bar: Artisanal Brand Mark · Unit Scaler (1x/2x) · Theme Switch │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Hero: "Toasted Cacao & Hazelnut Oat Cortado" Signature Formulation │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────┬────────────────────────────────────────────┐ │
│ │ Method & Recipe Card  │ Pantry Flavor Customizer & Sensory Radar   │ │
│ │ • Moka vs Espresso    │ • Cocoa Intensity (Dutch process)          │ │
│ │ • Grams & Ratio Math  │ • Nut Profile (Hazelnut / Almond / Pecan)  │ │
│ │ • Water Temp & Yield  │ • Sweetness & Warming Spice (Cinnamon)     │ │
│ └───────────────────────┴────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Interactive Brew Station: Multi-Phase Timer with Web Audio Chimes  │ │
│ │ • Phase 1: Dose Prep & Salt Ion Trick                              │ │
│ │ • Phase 2: Ristretto / Moka Cutoff Extraction Timer                │ │
│ │ • Phase 3: Oat Milk Microfoam Froth & Temp Watcher                 │ │
│ │ • Phase 4: Velvety Cacao Swirl & Glass Layering                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ Extraction Science & Bitterness Troubleshooting Drawer             │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping
- `equipment`: `'moka' | 'espresso'` — dynamically adjusts dose (15g Moka vs 18g Espresso), yield, grind size recommendation, and extraction phase instructions.
- `servings`: `1 | 2 | 4` — scales coffee beans, water, oat milk, cocoa powder, and nut syrup linearly with tabular precision.
- `pantryCustomizer`: `{ cocoaGrams, nutSyrupMl, nutType, sweetnessPercent, spiceLevel }` — drives dynamic recipe card and sensory radar metrics (Body, Chocolate, Nutty, Sweetness, Bitterness, Acidity).
- `brewState`: `{ currentStepIndex, isTimerRunning, timeRemaining, isComplete }` — controls the live brewing timer, audio cues, pause/resume, and step advancement.
- `savedPresets`: Custom recipes persisted to `localStorage` for rapid recall.

***

## 5. Verification Plan

- Compile validation via `compile_applet` to verify zero TypeScript or bundle errors.
- Visual inspection of Light & Dark modes to ensure rich, warm cafe atmosphere with strict WCAG AA contrast.
- Test interactive timer state machine, Web Audio chimes, and ratio scaling across both Moka pot and Espresso options.
