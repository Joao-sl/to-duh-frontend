import type { SoundRecipe } from './types';
import { getAudioContext } from './audio-context';
import { createShimmer } from './create-shimmer';
import { playLayer } from './play-layer';

export function playAudio(recipe: SoundRecipe) {
  const ctx = getAudioContext();

  const master = ctx.createGain();
  master.gain.value = recipe.masterGain;
  master.connect(ctx.destination);

  if (recipe.shimmer) {
    createShimmer(ctx, master, recipe.shimmer);
  }

  const now = ctx.currentTime;

  for (const layer of recipe.layers) {
    const start = now + (layer.offset ?? 0);
    playLayer(ctx, layer, start, master);
  }
}
