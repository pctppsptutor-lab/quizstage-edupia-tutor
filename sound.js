/**
 * GameSoundEngine - Pure Web Audio API synthesizer for Kahoot/Quizizz-style
 * game show SFX and optional upbeat background groove. Zero external files needed.
 */
class GameSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmEnabled = false;
    this._bgmTimer = null;
    this._bgmStep = 0;
  }

  _ensureCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setMuted(muted) {
    this.muted = !!muted;
    if (this.muted && this.bgmEnabled) {
      this._stopBgmLoop();
    } else if (!this.muted && this.bgmEnabled) {
      this._startBgmLoop();
    }
    return this.muted;
  }

  toggleMute() {
    return this.setMuted(!this.muted);
  }

  setBgm(enabled) {
    this.bgmEnabled = !!enabled;
    if (this.bgmEnabled && !this.muted) {
      this._ensureCtx();
      this._startBgmLoop();
    } else {
      this._stopBgmLoop();
    }
    return this.bgmEnabled;
  }

  toggleBgm() {
    return this.setBgm(!this.bgmEnabled);
  }

  _playTone({
    freq = 440,
    endFreq = null,
    type = 'sine',
    duration = 0.2,
    delay = 0,
    gain = 0.18,
    attack = 0.01,
  }) {
    if (this.muted) return;
    const ctx = this._ensureCtx();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(gain, now + attack);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playClick() {
    this._playTone({ freq: 680, endFreq: 880, type: 'triangle', duration: 0.06, gain: 0.09, attack: 0.004 });
  }

  playRevealOptions() {
    // Crisp ascending pop arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      this._playTone({
        freq: n,
        type: 'triangle',
        duration: 0.12,
        delay: i * 0.045,
        gain: 0.12,
      });
    });
  }

  playLockIn() {
    // "Final Answer?" suspense chord
    const chord = [261.63, 392.0, 493.88, 587.33]; // C4, G4, B4, D5 (Cmaj9 suspense)
    chord.forEach((f, idx) => {
      this._playTone({
        freq: f,
        type: idx === 0 ? 'triangle' : 'sine',
        duration: 0.42,
        delay: idx * 0.03,
        gain: 0.11,
        attack: 0.02,
      });
    });
  }

  playCorrect(streak = 1) {
    // Cheerful Kahoot/Quizizz victory chime
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      this._playTone({
        freq,
        type: 'triangle',
        duration: i === notes.length - 1 ? 0.42 : 0.16,
        delay: i * 0.075,
        gain: 0.18,
      });
    });
    // Sparkle overtone
    this._playTone({
      freq: 1318.5,
      type: 'sine',
      duration: 0.35,
      delay: 0.25,
      gain: 0.09,
    });

    if (streak >= 3) {
      this.playStreak(streak, 0.32);
    }
  }

  playStreak(streak = 3, baseDelay = 0) {
    const pitchBoost = Math.min(streak - 3, 5) * 35;
    const sweep = [587.33, 739.99, 880, 1174.66];
    sweep.forEach((f, i) => {
      this._playTone({
        freq: f + pitchBoost,
        type: 'sine',
        duration: 0.18,
        delay: baseDelay + i * 0.055,
        gain: 0.13,
      });
    });
  }

  playWrong() {
    // Friendly game-show descending buzzer
    this._playTone({
      freq: 220,
      endFreq: 165,
      type: 'sawtooth',
      duration: 0.22,
      delay: 0,
      gain: 0.11,
    });
    this._playTone({
      freq: 175,
      endFreq: 120,
      type: 'sawtooth',
      duration: 0.36,
      delay: 0.16,
      gain: 0.11,
    });
    this._playTone({
      freq: 110,
      type: 'triangle',
      duration: 0.38,
      delay: 0.16,
      gain: 0.14,
    });
  }

  playFiftyFifty() {
    // Filtered laser/whoosh + two crisp cut chimes
    this._playTone({
      freq: 980,
      endFreq: 320,
      type: 'sine',
      duration: 0.22,
      delay: 0,
      gain: 0.15,
    });
    this._playTone({
      freq: 660,
      type: 'triangle',
      duration: 0.14,
      delay: 0.12,
      gain: 0.12,
    });
    this._playTone({
      freq: 880,
      type: 'triangle',
      duration: 0.22,
      delay: 0.21,
      gain: 0.14,
    });
  }

  playTick(urgent = false) {
    this._playTone({
      freq: urgent ? 1050 : 720,
      endFreq: urgent ? 820 : 580,
      type: 'triangle',
      duration: 0.05,
      gain: urgent ? 0.14 : 0.07,
      attack: 0.002,
    });
  }

  playTimeUp() {
    const notes = [392, 349.23, 293.66, 220];
    notes.forEach((f, i) => {
      this._playTone({
        freq: f,
        type: 'triangle',
        duration: 0.28,
        delay: i * 0.1,
        gain: 0.15,
      });
    });
  }

  playVictory() {
    const fanfare = [
      { f: 523.25, d: 0.0, dur: 0.16 },
      { f: 659.25, d: 0.11, dur: 0.16 },
      { f: 783.99, d: 0.22, dur: 0.16 },
      { f: 1046.5, d: 0.34, dur: 0.32 },
      { f: 783.99, d: 0.56, dur: 0.14 },
      { f: 1046.5, d: 0.70, dur: 0.65 },
    ];
    fanfare.forEach((n) => {
      this._playTone({
        freq: n.f,
        type: 'triangle',
        duration: n.dur,
        delay: n.d,
        gain: 0.18,
      });
    });
    // Harmony pad
    [523.25, 659.25, 783.99].forEach((f) => {
      this._playTone({
        freq: f,
        type: 'sine',
        duration: 0.7,
        delay: 0.7,
        gain: 0.08,
      });
    });
  }

  playChestAppear() {
    // Magical twinkling arpeggio when 3 Mystery Chests appear
    const shimmer = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];
    shimmer.forEach((f, i) => {
      this._playTone({
        freq: f,
        type: 'sine',
        duration: 0.24,
        delay: i * 0.06,
        gain: 0.13,
      });
    });
  }

  playPowerUp() {
    // Exciting power-up activation chord & upward sweep
    this._playTone({ freq: 440, endFreq: 880, type: 'triangle', duration: 0.22, delay: 0, gain: 0.16 });
    const chord = [659.25, 830.61, 987.77, 1318.51];
    chord.forEach((f, i) => {
      this._playTone({
        freq: f,
        type: 'triangle',
        duration: 0.42,
        delay: 0.14 + i * 0.045,
        gain: 0.15,
      });
    });
  }

  playShieldBlock() {
    // Metallic energy deflect sound when Shield absorbs a wrong choice
    this._playTone({ freq: 720, endFreq: 420, type: 'triangle', duration: 0.18, delay: 0, gain: 0.18 });
    this._playTone({ freq: 540, endFreq: 920, type: 'sine', duration: 0.26, delay: 0.09, gain: 0.16 });
    this._playTone({ freq: 1046.5, type: 'sine', duration: 0.28, delay: 0.18, gain: 0.12 });
  }

  _startBgmLoop() {
    this._stopBgmLoop();
    // Upbeat quiz-show marimba-like plucks in C major pentatonic (120 BPM = 250ms per 8th note)
    const bassPattern = [130.81, 0, 196.0, 0, 164.81, 0, 196.0, 0, 146.83, 0, 220.0, 0, 196.0, 0, 164.81, 0];
    const leadPattern = [523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 0];
    this._bgmStep = 0;

    const tickStep = () => {
      if (!this.bgmEnabled || this.muted) return;
      const idx = this._bgmStep % bassPattern.length;
      const bass = bassPattern[idx];
      const lead = leadPattern[idx];

      if (bass > 0) {
        this._playTone({
          freq: bass,
          type: 'triangle',
          duration: 0.19,
          gain: 0.045,
          attack: 0.008,
        });
      }
      if (lead > 0) {
        this._playTone({
          freq: lead,
          type: 'sine',
          duration: 0.15,
          gain: 0.032,
          attack: 0.006,
        });
      }
      this._bgmStep++;
    };

    tickStep();
    this._bgmTimer = setInterval(tickStep, 260);
  }

  _stopBgmLoop() {
    if (this._bgmTimer) {
      clearInterval(this._bgmTimer);
      this._bgmTimer = null;
    }
  }
}

window.soundEngine = new GameSoundEngine();
