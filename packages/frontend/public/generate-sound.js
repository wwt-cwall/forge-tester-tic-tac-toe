// Changed by Forge v0.1.0
// Simple script to generate a click sound
const fs = require('fs');

// Generate a simple click sound (short beep)
function generateClickSound() {
  const sampleRate = 44100;
  const duration = 0.1; // 100ms
  const frequency = 800; // Hz
  const numSamples = Math.floor(sampleRate * duration);
  
  // WAV file header
  const header = Buffer.alloc(44);
  
  // "RIFF" chunk descriptor
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + numSamples * 2, 4); // File size - 8
  header.write('WAVE', 8);
  
  // "fmt " sub-chunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  header.writeUInt16LE(1, 22); // NumChannels (1 for mono)
  header.writeUInt32LE(sampleRate, 24); // SampleRate
  header.writeUInt32LE(sampleRate * 2, 28); // ByteRate
  header.writeUInt16LE(2, 32); // BlockAlign
  header.writeUInt16LE(16, 34); // BitsPerSample
  
  // "data" sub-chunk
  header.write('data', 36);
  header.writeUInt32LE(numSamples * 2, 40); // Subchunk2Size
  
  // Generate audio samples (simple sine wave with envelope)
  const samples = Buffer.alloc(numSamples * 2);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 20); // Exponential decay
    const value = Math.sin(2 * Math.PI * frequency * t) * envelope;
    const sample = Math.floor(value * 32767 * 0.3); // 30% volume
    samples.writeInt16LE(sample, i * 2);
  }
  
  return Buffer.concat([header, samples]);
}

const soundData = generateClickSound();
fs.writeFileSync('click-sound.wav', soundData);
console.log('Generated click-sound.wav');
