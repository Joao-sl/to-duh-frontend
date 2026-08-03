import { droplet } from './droplet';
import { sparkle } from './sparkle';
import type { SoundRecipe } from '../types';

export const SOUNDS = {
  droplet,
  sparkle,
} as const satisfies Record<string, SoundRecipe>;

export type SoundName = keyof typeof SOUNDS;
