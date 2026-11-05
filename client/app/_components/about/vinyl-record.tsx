import Image from "next/image";

export function VinylRecord({ imageUrl, spinning }: { imageUrl?: string; spinning: boolean }) {
  return (
    <div aria-hidden="true" className="relative isolate grid place-items-center py-[clamp(1.75rem,3.4vw,3rem)]">
      <div className="relative grid aspect-square w-[74%] max-w-[23rem] place-items-center">
        <span className="absolute -inset-[7%] rounded-full border border-black/15" />
        <span className="absolute top-[1%] right-[13%] size-1.5 rotate-45 bg-primary" />
        <span
          data-vinyl
          className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,#161616_0_3px,#262626_4px,#171717_6px)] shadow-[0_.85rem_1.65rem_#0004,inset_0_0_0_1px_#414141] data-[spinning=true]:site-motion:animate-vinyl-spin"
          data-spinning={spinning}
        >
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_28deg,transparent_8%,#ffffff24_17%,transparent_28%,transparent_58%,#ffffff19_67%,transparent_79%)]" />
          <span className="absolute inset-[7%] rounded-full border border-white/15" />
          <span className="absolute top-[9%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white/75" />
        </span>

        {imageUrl ? (
          <Image src={imageUrl} alt="" width={320} height={320} unoptimized className="relative h-auto w-[52%] rounded-sm object-contain sm:rounded-lg" />
        ) : (
          <span className="relative grid aspect-square w-[52%] place-items-center rounded-lg border border-white/15 bg-[#292929] text-white/85">
            <svg viewBox="0 0 24 24" className="size-[35%]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13M9 9l12-2" />
              <ellipse cx="6" cy="18" rx="3" ry="2" />
              <ellipse cx="18" cy="16" rx="3" ry="2" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
