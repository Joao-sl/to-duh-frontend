import type { SoundRecipe } from '../types';

export const sparkle: SoundRecipe = {
  masterGain: 0.5,
  layers: [
    {
      kind: 'tone',
      waveform: 'sine',
      frequency: 1760,
      offset: 0,
      attack: 0.003,
      decay: 0.09,
      peak: 0.045,
    },
    {
      kind: 'tone',
      waveform: 'sine',
      frequency: 2217,
      offset: 0.045,
      attack: 0.003,
      decay: 0.09,
      peak: 0.04,
    },
    {
      kind: 'tone',
      waveform: 'sine',
      frequency: 2637,
      offset: 0.09,
      attack: 0.003,
      decay: 0.1,
      peak: 0.038,
    },
    {
      kind: 'tone',
      waveform: 'sine',
      frequency: 3520,
      offset: 0.135,
      attack: 0.003,
      decay: 0.12,
      peak: 0.032,
    },
  ],
  shimmer: { delay: 0.07, feedback: 0.35, wet: 0.22, lowpass: 6000 },
};
