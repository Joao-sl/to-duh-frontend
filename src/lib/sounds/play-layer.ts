import { getNoiseBuffer } from './noise-buffer';
import type { NoiseLayer, ToneLayer } from './types';

function playTone(
  ctx: AudioContext,
  layer: ToneLayer,
  start: number,
  master: GainNode,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = layer.waveform;
  osc.frequency.value = layer.frequency;

  if (layer.detune !== undefined) {
    osc.detune.value = layer.detune;
  }

  if (layer.glideTo !== undefined) {
    osc.frequency.setValueAtTime(layer.frequency, start);
    osc.frequency.exponentialRampToValueAtTime(
      layer.glideTo,
      start + (layer.glideTime ?? layer.attack + layer.decay),
    );
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(layer.peak, start + layer.attack);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    start + layer.attack + layer.decay,
  );

  osc.connect(gain);
  gain.connect(master);

  osc.start(start);
  osc.stop(start + layer.attack + layer.decay + 0.1);
}

function playNoise(
  ctx: AudioContext,
  layer: NoiseLayer,
  start: number,
  master: GainNode,
) {
  const source = ctx.createBufferSource();
  source.buffer = getNoiseBuffer(ctx);
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = layer.filterType;
  filter.frequency.value = layer.filterFrequency;
  if (layer.filterQ !== undefined) {
    filter.Q.value = layer.filterQ;
  }

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(layer.peak, start + layer.attack);
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    start + layer.attack + layer.decay,
  );

  source.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  source.start(start);
  source.stop(start + layer.attack + layer.decay + 0.1);
}

export function playLayer(
  ctx: AudioContext,
  layer: ToneLayer | NoiseLayer,
  start: number,
  master: GainNode,
) {
  if (layer.kind === 'tone') {
    playTone(ctx, layer, start, master);
  } else {
    playNoise(ctx, layer, start, master);
  }
}
