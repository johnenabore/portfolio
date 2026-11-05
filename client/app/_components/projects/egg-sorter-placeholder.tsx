import { useId } from "react";

export function EggSorterPlaceholder() {
  const grid = useId();

  return (
    <svg aria-hidden="true" viewBox="0 0 480 340" preserveAspectRatio="xMidYMid slice" className="size-full bg-[#18211c]">
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#d1e4c7" strokeOpacity=".14" />
        </pattern>
      </defs>
      <rect width="480" height="340" fill={`url(#${grid})`} />
      <g fontFamily="monospace" fontSize="10" letterSpacing="1.15" fill="#d1e4c7">
        <text x="26" y="36">FIELD SYSTEM / 01</text>
        <text x="26" y="315">SMART EGG SORTER</text>
      </g>
      <rect x="26" y="58" width="283" height="226" rx="8" fill="#202e25" stroke="#8da686" strokeOpacity=".6" />
      <rect x="41" y="73" width="253" height="196" rx="4" fill={`url(#${grid})`} />
      <g fill="none" stroke="#a7bd9b" strokeWidth="1.4">
        <path d="M57 109V89h20m196 20V89h-20M57 234v20h20m196-20v20h-20" />
        <circle cx="165" cy="171" r="65" strokeOpacity=".36" />
        <circle cx="165" cy="171" r="79" strokeOpacity=".28" strokeDasharray="3 5" />
      </g>
      <path d="M165 105c-28 0-55 43-55 74 0 30 24 51 55 51s55-21 55-51c0-31-27-74-55-74Z" fill="#deead4" />
      <path d="M53 173h228" stroke="#94b68a" strokeWidth="2" />
      <circle cx="165" cy="173" r="5" fill="#293b2c" stroke="#e3efdb" strokeWidth="2" />
      <rect x="325" y="58" width="129" height="226" rx="8" fill="#e6ecdf" />
      <g fontFamily="monospace" fontSize="9" letterSpacing=".4" fill="#314737">
        <text x="339" y="80" fontWeight="700">WORKFLOW CONCEPT</text>
        <text x="348" y="118">DETECT</text>
        <text x="348" y="166">CLASSIFY</text>
        <text x="348" y="214">REVIEW</text>
        <text x="339" y="263">OFFLINE-FIRST</text>
      </g>
      <g stroke="#83937b" strokeOpacity=".65">
        <path d="M339 91h100m-100 42h100m-100 48h100m-100 48h100" />
      </g>
      <g fill="#507653">
        <circle cx="340" cy="115" r="2.5" />
        <circle cx="340" cy="163" r="2.5" />
        <circle cx="340" cy="211" r="2.5" />
      </g>
    </svg>
  );
}
