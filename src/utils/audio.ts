/**
 * Synthesizes acoustic cafe timer bells and chimes using the native Web Audio API.
 * No external audio files required; works reliably offline and in hermetic sandboxes.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Warm acoustic bell chime (fundamental + harmonic overtone with exponential decay)
 */
export function playChime(type: 'start' | 'step' | 'cutoff' | 'complete' = 'step', soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'start') {
      // Warm rising dual chime: C5 (523Hz) -> G5 (784Hz)
      playTone(ctx, 523.25, now, 0.45, 0.15);
      playTone(ctx, 783.99, now + 0.12, 0.6, 0.15);
    } else if (type === 'cutoff') {
      // Urgent, clear double ping (warns to cut off extraction before bitter blonding)
      playTone(ctx, 880, now, 0.35, 0.22);
      playTone(ctx, 880, now + 0.18, 0.45, 0.22);
      playTone(ctx, 1174.66, now + 0.36, 0.6, 0.25);
    } else if (type === 'complete') {
      // Cozy chord fanfare: E5 (659Hz) -> G#5 (830Hz) -> B5 (987Hz) -> E6 (1318Hz)
      playTone(ctx, 659.25, now, 0.6, 0.12);
      playTone(ctx, 830.61, now + 0.14, 0.7, 0.14);
      playTone(ctx, 987.77, now + 0.28, 0.8, 0.16);
      playTone(ctx, 1318.51, now + 0.42, 1.2, 0.2);
    } else {
      // Single gentle copper kitchen chime (A5 - 880Hz)
      playTone(ctx, 880, now, 0.5, 0.18);
    }
  } catch (e) {
    console.warn('Audio chime playback muted:', e);
  }
}

function playTone(ctx: AudioContext, frequency: number, startTime: number, duration: number, peakGain: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Gentle warm sine/triangle blend
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, startTime);

  // Soft attack to avoid clicks, followed by natural exponential decay
  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}
