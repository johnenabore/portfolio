import Image from "next/image";

export type ClipCoverDetails = {
  label: string;
  duration: string;
  crop: string;
};

export function ClipCover({
  cover,
  src,
  index,
  showPlay,
}: {
  cover: ClipCoverDetails;
  src: string;
  index: number;
  showPlay: boolean;
}) {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-[clamp(.25rem,1vw,.65rem)] overflow-hidden bg-[#212522] p-[clamp(.38rem,1.3vw,.95rem)] text-[#f0f1eb]">
      <div className="flex items-baseline gap-[clamp(.24rem,.65vw,.55rem)] whitespace-nowrap">
        <span className="font-mono text-[clamp(.52rem,.9vw,.72rem)] font-medium text-[#adc2a8]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[clamp(.52rem,1.12vw,.9rem)] leading-none font-semibold tracking-[.08em] uppercase">
          {cover.label}
        </span>
      </div>
      <div className="relative isolate overflow-hidden bg-[#363c36]">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 640px) 30vw, 220px"
          style={{ objectPosition: cover.crop }}
          className="object-cover contrast-[.88] grayscale"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#536a52]/28 mix-blend-color" />
      </div>
      <div className="flex min-h-[clamp(1rem,2.35vw,1.7rem)] items-center justify-between">
        <span className="font-mono text-[clamp(.52rem,.85vw,.7rem)] tabular-nums text-[#c0c6bd]">{cover.duration}</span>
        {showPlay && (
          <span className="grid size-[clamp(1rem,2.35vw,1.7rem)] place-items-center rounded-full bg-[#e9ede4] text-[#212522] group-hover/card:bg-white">
            <svg viewBox="0 0 16 16" className="size-1/2" fill="currentColor">
              <path d="M6 3.5 13 8l-7 4.5z" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
