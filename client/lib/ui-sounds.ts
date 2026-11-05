const sounds = {
  // Kenney Interface Sounds, CC0.
  click: { src: "/sounds/click_002.ogg", volume: 0.65 },
  error: { src: "/sounds/error_003.ogg", volume: 0.35 },
  projectSweep: { src: "/sounds/soft-fade.wav", volume: 1 },
} as const;

type UiSound = keyof typeof sounds;
const tracks: Partial<Record<UiSound, HTMLAudioElement>> = {};
let soundsEnabled = true;

export function setUiSoundsEnabled(enabled: boolean) {
  soundsEnabled = enabled;
  if (!enabled) Object.values(tracks).forEach((track) => track.pause());
}

export function playUiSound(sound: UiSound) {
  if (!soundsEnabled) return;

  const { src, volume } = sounds[sound];
  const track = (tracks[sound] ??= new Audio(src));
  track.volume = volume;
  track.currentTime = 0;

  // Audio may be blocked by browser playback settings.
  void track.play().catch(() => {});
}
