import React, { useState, useEffect, useRef } from 'react';
import { EquipmentType, PantrySettings } from '../types/coffee';
import { EQUIPMENT_DATA } from '../data/recipes';
import { playChime } from '../utils/audio';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  ArrowRight,
  Flame,
  Sparkles,
  Timer as TimerIcon,
  Clock,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface BrewAssistantProps {
  equipment: EquipmentType;
  pantry: PantrySettings;
  servings: number;
  triggerStartCount?: number;
}

export const BrewAssistant: React.FC<BrewAssistantProps> = ({
  equipment,
  pantry,
  servings,
  triggerStartCount = 0,
}) => {
  const config = EQUIPMENT_DATA[equipment];
  const steps = config.steps;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(steps[0].durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isBrewComplete, setIsBrewComplete] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timerRef = useRef<number | null>(null);

  const activeStep = steps[currentStepIndex];

  // Total time of all steps combined
  const totalRecipeSeconds = steps.reduce((acc, s) => acc + s.durationSeconds, 0);

  // Total remaining seconds across all remaining steps
  const totalSecondsLeft = steps
    .slice(currentStepIndex + 1)
    .reduce((acc, s) => acc + s.durationSeconds, secondsRemaining);

  // Auto-start when triggerStartCount changes (>0)
  useEffect(() => {
    if (triggerStartCount > 0) {
      if (isBrewComplete) {
        setIsBrewComplete(false);
        setCurrentStepIndex(0);
        setSecondsRemaining(steps[0].durationSeconds);
      }
      setIsRunning(true);
      playChime('start', soundEnabled);
    }
  }, [triggerStartCount]);

  // Reset timer on equipment change
  useEffect(() => {
    setIsRunning(false);
    setCurrentStepIndex(0);
    setSecondsRemaining(steps[0].durationSeconds);
    setIsBrewComplete(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [equipment]);

  // Main countdown loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleStepCompletion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentStepIndex]);

  const handleStepCompletion = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);

    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStep = steps[nextIndex];
      
      // If entering a cutoff alert phase, play cutoff warning
      if (nextStep.cutoffAlert) {
        playChime('cutoff', soundEnabled);
      } else {
        playChime('step', soundEnabled);
      }
      
      setCurrentStepIndex(nextIndex);
      setSecondsRemaining(nextStep.durationSeconds);
      setIsRunning(true); // Continuous step-by-step auto-flow
    } else {
      setIsBrewComplete(true);
      playChime('complete', soundEnabled);
    }
  };

  const handleToggleTimer = () => {
    if (isBrewComplete) {
      handleReset();
      setIsRunning(true);
      playChime('start', soundEnabled);
      return;
    }

    if (!isRunning) {
      playChime('start', soundEnabled);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setCurrentStepIndex(0);
    setSecondsRemaining(steps[0].durationSeconds);
    setIsBrewComplete(false);
  };

  const handleGoToStep = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setCurrentStepIndex(index);
    setSecondsRemaining(steps[index].durationSeconds);
    setIsBrewComplete(false);
    playChime('step', soundEnabled);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const stepProgress = Math.max(
    0,
    Math.min(
      100,
      ((activeStep.durationSeconds - secondsRemaining) / activeStep.durationSeconds) * 100
    )
  );

  // Circular progress SVG values
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stepProgress / 100) * circumference;

  return (
    <section id="timer" className={`py-12 border-b border-[#E6D9C0] dark:border-[#2D2146] transition-all ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-white to-[#F5ECD8] dark:from-[#080D18] dark:to-[#1C0D26] p-6 sm:p-12' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1">
              <TimerIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Tailored Barista Countdown</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-data text-amber-600 dark:text-amber-400 font-semibold">{config.name}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
              Interactive Brew Timer & Step Progress
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Primary Action Button requested by user */}
            <button
              onClick={handleToggleTimer}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-md hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{secondsRemaining === activeStep.durationSeconds && currentStepIndex === 0 ? 'Start Brew Timer' : 'Resume Timer'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label={soundEnabled ? 'Mute acoustic chimes' : 'Enable acoustic chimes'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">Chimes</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#7E766A] dark:text-[#8D88A3]" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen kitchen mode'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white transition-colors"
              title="Toggle Kitchen Counter Focus Mode"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Close' : 'Focus'}</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Step-by-Step Progress Visualizer (Requested format: Pour 1: Blooming (45s), Pour 2: Main Extraction (2m)) */}
        <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 rounded-2xl border border-[#E6D9C0] dark:border-[#35254A] p-4 sm:p-6 mb-8 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-xs text-[#7E766A] dark:text-[#9F96B2] mb-3">
            <span className="uppercase tracking-wider font-semibold">
              Recipe Timeline ({steps.length} Steps)
            </span>
            <div className="flex items-center gap-1.5 font-mono-data text-amber-600 dark:text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Total Remaining: {formatTime(totalSecondsLeft)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step, idx) => {
              const isCurrent = idx === currentStepIndex && !isBrewComplete;
              const isDone = idx < currentStepIndex || isBrewComplete;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleGoToStep(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                    isCurrent
                      ? 'bg-amber-100/90 dark:bg-[#2B1B3C] border-amber-500 shadow-md ring-1 ring-amber-500/50'
                      : isDone
                      ? 'bg-[#FAF5EB] dark:bg-[#0D1528] border-emerald-400/50 dark:border-emerald-700/50 opacity-90'
                      : 'bg-[#FAF5EB] dark:bg-[#0B101D] border-[#E6D9C0] dark:border-[#2D2146] text-[#7E766A] dark:text-[#8D88A3] hover:border-amber-400'
                  }`}
                >
                  {/* Subtle live step progress fill in current tab */}
                  {isCurrent && (
                    <div
                      className="absolute bottom-0 left-0 top-0 bg-amber-500/10 pointer-events-none transition-all duration-300"
                      style={{ width: `${stepProgress}%` }}
                    />
                  )}

                  <div className="flex items-center justify-between text-xs mb-1.5 relative z-10">
                    <span className="font-mono-data font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                      Step {idx + 1}
                    </span>
                    {isDone ? (
                      <span className="text-[10px] font-mono-data text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[10px] font-mono-data text-amber-700 dark:text-amber-300 flex items-center gap-1 font-bold animate-pulse">
                        <TimerIcon className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono-data text-[#7E766A] dark:text-[#8D88A3]">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-[#1A1924] dark:text-[#F7F6FC] truncate relative z-10">
                    {step.title}
                  </div>

                  <p className="text-[11px] text-[#7E766A] dark:text-[#9F96B2] line-clamp-1 mt-1 relative z-10">
                    {step.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Visual Countdown Station */}
        {!isBrewComplete ? (
          <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 rounded-3xl border border-[#E6D9C0] dark:border-[#35254A] p-6 sm:p-10 shadow-xl transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Radial SVG Countdown Ring */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#FAF5EB] dark:bg-[#0B101D] rounded-2xl border border-[#E6D9C0] dark:border-[#2D2146] text-center relative transition-colors">
                
                {/* Visual Radial Progress Dial */}
                <div className="relative w-56 h-56 flex items-center justify-center my-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                    {/* Background track circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-[#E6D9C0] dark:text-[#251D3A]"
                      fill="transparent"
                    />
                    {/* Active glowing progress circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r={radius}
                      stroke="url(#timerGradient)"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-500 ease-linear"
                    />
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Centered Large Digits */}
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="font-mono-data text-5xl sm:text-6xl font-bold tracking-tight text-[#1A1924] dark:text-[#F7F6FC]">
                      {formatTime(secondsRemaining)}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-mono-data text-[#7E766A] dark:text-[#8D88A3] mt-1 font-semibold">
                      {isRunning ? 'Extracting...' : 'Paused'}
                    </span>
                    {activeStep.targetMetric && (
                      <span className="text-[10px] font-mono-data text-amber-600 dark:text-amber-400 mt-1 max-w-[140px] truncate font-semibold">
                        {activeStep.targetMetric}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Action Button inside dial */}
                <div className="flex items-center gap-3 w-full justify-center mt-4">
                  <button
                    onClick={handleToggleTimer}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isRunning
                        ? 'bg-[#E6D9C0] dark:bg-[#2B1B3C] hover:bg-[#DBCBB0] text-[#1A1924] dark:text-[#F7F6FC]'
                        : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white'
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Start Brew Timer</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleStepCompletion}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#E6D9C0] dark:border-[#2D2146] bg-white dark:bg-[#13192E] text-xs text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white transition-colors"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Column: Step Instructions, Cutoff Warning & Barista Tips */}
              <div className="lg:col-span-7 space-y-5">
                
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-data uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-1">
                    <span>Phase 0{currentStepIndex + 1} of 0{steps.length}</span>
                    <span aria-hidden="true">·</span>
                    <span>Target: {activeStep.durationSeconds}s</span>
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                    {activeStep.title}
                  </h3>
                  <p className="text-sm text-[#4A4652] dark:text-[#CBD1E1] mt-1 leading-relaxed">
                    {activeStep.subtitle}
                  </p>
                </div>

                {/* Cutoff Warning Callout if present */}
                {activeStep.cutoffAlert && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-[#2E1528] border border-amber-400 dark:border-amber-600/80 text-amber-900 dark:text-amber-200 flex items-start gap-3 animate-pulse shadow-xs">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-[#1A1924] dark:text-white block mb-0.5">Critical Early Cutoff:</span>
                      {activeStep.cutoffAlert}
                    </div>
                  </div>
                )}

                {/* Numbered Instruction Checklist */}
                <div className="space-y-2.5">
                  {activeStep.instructions.map((inst, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF5EB] dark:bg-[#0B101D] border border-[#E6D9C0] dark:border-[#2D2146] text-xs sm:text-sm text-[#1A1924] dark:text-[#F7F6FC] leading-relaxed transition-colors"
                    >
                      <span className="font-mono-data text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        0{i + 1}.
                      </span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>

                {/* Barista Science Note */}
                <div className="p-4 rounded-xl bg-[#FAF5EB] dark:bg-[#15122B] border border-[#E6D9C0] dark:border-[#2D2146] text-xs text-[#7E766A] dark:text-[#9F96B2] space-y-1 transition-colors">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Barista Flavor Science</span>
                  </div>
                  <p className="leading-relaxed text-[#4A4652] dark:text-[#CBD1E1]">
                    {activeStep.scienceTip}
                  </p>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* Brew Completed Celebration State */
          <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#11172E]/90 dark:via-[#16122C]/90 dark:to-[#1E0E2B]/90 rounded-3xl border border-amber-300 dark:border-amber-600/50 p-8 sm:p-12 text-center space-y-6 shadow-2xl transition-colors">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-[#2B1B3C] border border-amber-400 dark:border-amber-500/50 mx-auto flex items-center justify-center text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono-data uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                Brew Complete · 100% Zero-Bitterness Extraction
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1A1924] dark:text-[#F7F6FC] mt-1">
                Your Velvet Cortado is Ready!
              </h3>
              <p className="text-base text-[#4A4652] dark:text-[#CBD1E1] max-w-lg mx-auto mt-2 leading-relaxed">
                Notice the dense crema and the rich aroma of toasted hazelnuts and Dutch cacao. The salt ions have blocked bitter receptor activation on your tongue, leaving a silky, chocolate-bar finish.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  handleReset();
                  handleToggleTimer();
                }}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Brew Timer Again</span>
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3 text-xs font-medium tracking-wider uppercase text-[#554E43] dark:text-[#CBD1E1] hover:text-[#1A1924] dark:hover:text-white border border-[#E6D9C0] dark:border-[#2D2146] rounded-xl transition-colors"
              >
                Back to Preparation
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
