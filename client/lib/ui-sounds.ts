// Kenney Interface Sounds, CC0.
const soundFiles = {
  click: "/sounds/click_002.ogg",
  error: "/sounds/error_003.ogg",
} as const;

type UiSound = keyof typeof soundFiles;
const tracks: Partial<Record<UiSound, HTMLAudioElement>> = {};

export function playUiSound(sound: UiSound) {
  const track = (tracks[sound] ??= new Audio(soundFiles[sound]));
  track.volume = sound === "click" ? 0.65 : 0.35;
  track.currentTime = 0;

  // Audio may be blocked by browser playback settings.
  void track.play().catch(() => {});
}
