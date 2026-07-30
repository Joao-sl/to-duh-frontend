let noiseBuffer: AudioBuffer | null = null;

export function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const duration = 1;
    const frameCount = ctx.sampleRate * duration;
    noiseBuffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);

    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  return noiseBuffer;
}
