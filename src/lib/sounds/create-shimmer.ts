import type { Shimmer } from './types';

export function createShimmer(
  ctx: AudioContext,
  source: AudioNode,
  shimmer: Shimmer,
) {
  const delay = ctx.createDelay(1);
  delay.delayTime.value = shimmer.delay;

  const feedbackFilter = ctx.createBiquadFilter();
  feedbackFilter.type = 'lowpass';
  feedbackFilter.frequency.value = shimmer.lowpass;

  const feedbackGain = ctx.createGain();
  feedbackGain.gain.value = shimmer.feedback;

  const wetGain = ctx.createGain();
  wetGain.gain.value = shimmer.wet;

  source.connect(delay);

  delay.connect(feedbackFilter);

  feedbackFilter.connect(feedbackGain);
  feedbackGain.connect(delay);

  feedbackFilter.connect(wetGain);
  wetGain.connect(ctx.destination);
}
