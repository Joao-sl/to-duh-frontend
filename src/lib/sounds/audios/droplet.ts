import type { SoundRecipe } from '../types';

export const droplet: SoundRecipe = {
  masterGain: 0.55,
  layers: [
    {
      kind: 'tone',
      waveform: 'sine',
      frequency: 1200,
      glideTo: 550,
      glideTime: 0.14,
      attack: 0.004,
      decay: 0.2,
      peak: 0.075,
    },
  ],
  shimmer: { delay: 0.09, feedback: 0.2, wet: 0.15, lowpass: 3000 },
};
