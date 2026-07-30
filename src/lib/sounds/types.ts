export type BaseLayer = {
  offset?: number;
  attack: number;
  decay: number;
  peak: number;
};

export type ToneLayer = BaseLayer & {
  kind: 'tone';
  waveform: OscillatorType;
  frequency: number;
  detune?: number;
  glideTo?: number;
  glideTime?: number;
};

export type NoiseLayer = BaseLayer & {
  kind: 'noise';
  filterType: BiquadFilterType;
  filterFrequency: number;
  filterQ?: number;
};

export type SoundLayer = ToneLayer | NoiseLayer;

export type Shimmer = {
  delay: number;
  feedback: number;
  wet: number;
  lowpass: number;
};

export type SoundRecipe = {
  masterGain: number;
  layers: SoundLayer[];
  shimmer?: Shimmer;
};
