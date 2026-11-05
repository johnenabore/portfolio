import { useId } from "react";
import type { ProjectArtwork } from "@/data/projects";
import { EggSorterPlaceholder } from "./egg-sorter-placeholder";

const backgrounds = {
  web: "bg-[radial-gradient(ellipse_at_50%_85%,#78345f_0%,#392635_60%,#211d21_100%)]",
  editorial: "bg-[#e7e5df]",
  dashboard: "bg-[#151818]",
  mobile: "bg-[#e7e9e8]",
};

export function ProjectPlaceholder({ artwork = "web" }: { artwork?: ProjectArtwork }) {
  const gradient = useId();
  if (artwork === "egg-sorter") return <EggSorterPlaceholder />;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 340"
      preserveAspectRatio="xMidYMid slice"
      className={`size-full ${backgrounds[artwork]}`}
    >
      {artwork === "web" && (
        <>
          <defs>
            <radialGradient id={gradient}>
              <stop stopColor="#ffdcf3" />
              <stop offset=".24" stopColor="#eb71b6" stopOpacity=".9" />
              <stop offset="1" stopColor="#c04b92" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="18" y="9" width="444" height="331" rx="5" fill="#171519" />
          <rect x="299" y="22" width="94" height="15" rx="7.5" fill="#373036" />
          <text x="310" y="32" fill="#d7c9d3" fontSize="5" letterSpacing=".45">OVERVIEW　 FEATURES</text>
          <rect x="399" y="22" width="47" height="15" rx="7.5" fill="#aa4d82" />
          <text x="422" y="32" textAnchor="middle" fill="#fff" fontSize="5">GET STARTED</text>
          <rect x="201" y="59" width="78" height="12" rx="6" fill="#4d2b42" />
          <text x="240" y="67" textAnchor="middle" fill="#e4bfd6" fontSize="5" letterSpacing=".5">A PRODUCT PREVIEW</text>
          <text x="240" y="93" textAnchor="middle" fill="#f6edf3" fontSize="20" fontWeight="600">A better way to work</text>
          <text x="240" y="119" textAnchor="middle" fill="#e286bd" fontSize="20" fontWeight="600">from one place.</text>
          <text x="240" y="139" textAnchor="middle" fill="#b4a4b0" fontSize="6">Bring your tools and tasks together in a workspace that feels simple.</text>
          <rect x="191" y="157" width="48" height="15" rx="7.5" fill="#af5389" />
          <rect x="243" y="157" width="47" height="15" rx="7.5" fill="#342a33" />
          <text x="215" y="167" textAnchor="middle" fill="#fff" fontSize="5">EXPLORE</text>
          <text x="266" y="167" textAnchor="middle" fill="#dac9d4" fontSize="5">LEARN MORE</text>
          <ellipse cx="240" cy="270" rx="229" ry="24" fill={`url(#${gradient})`} />
          <ellipse cx="240" cy="270" rx="69" ry="96" fill={`url(#${gradient})`} />
          <rect x="189" y="194" width="102" height="186" rx="18" fill="#211a20" stroke="#d49dbf" strokeWidth="2" />
          <rect x="194" y="199" width="92" height="168" rx="14" fill="#eee6ec" />
          <rect x="224" y="204" width="32" height="5" rx="2.5" fill="#171519" />
          <text x="203" y="230" fill="#362b34" fontSize="6" fontWeight="600">MY WORKSPACE</text>
          <rect x="201" y="239" width="78" height="99" rx="7" fill="#3a2c38" />
          <text x="208" y="253" fill="#f0d9e9" fontSize="6" fontWeight="600">Today&apos;s overview</text>
          <rect x="207" y="263" width="30" height="28" rx="4" fill="#715368" />
          <rect x="241" y="263" width="30" height="28" rx="4" fill="#5a4756" />
          <path d="M208 307h61m-61 9h49m-49 9h54" stroke="#d6a7c6" strokeWidth="3" opacity=".48" />
        </>
      )}
      {artwork === "editorial" && (
        <>
          <defs>
            <radialGradient id={gradient} cx=".4" cy=".35" r=".65">
              <stop stopColor="#748780" />
              <stop offset=".5" stopColor="#374845" />
              <stop offset="1" stopColor="#111b1a" />
            </radialGradient>
          </defs>
          <rect x="5" y="5" width="470" height="335" fill="#f9f8f5" />
          <rect x="7" y="15" width="293" height="233" rx="2" fill={`url(#${gradient})`} />
          <text x="153" y="29" textAnchor="middle" fill="#e2ddd0" fontSize="7" fontFamily="Georgia">Form &amp; Field</text>
          <path d="M23 38h260" stroke="#e0d5c4" strokeOpacity=".24" />
          <ellipse cx="200" cy="193" rx="59" ry="16" fill="#080e0d" opacity=".6" />
          <rect x="170" y="92" width="56" height="94" rx="6" fill="#17201d" stroke="#5e6c60" />
          <rect x="183" y="78" width="30" height="17" rx="3" fill="#2e3028" />
          <rect x="179" y="127" width="38" height="30" fill="#b4a48a" opacity=".8" />
          <text x="198" y="145" textAnchor="middle" fill="#272923" fontSize="6" fontFamily="Georgia">FORM</text>
          <text x="28" y="132" fill="#f3eee4" fontSize="13" fontFamily="Georgia">Considered</text>
          <text x="28" y="147" fill="#f3eee4" fontSize="13" fontFamily="Georgia">by design.</text>
          <path d="M28 158h91m-91 7h67" stroke="#c7c2b4" strokeWidth="2" opacity=".57" />
          <rect x="28" y="179" width="48" height="11" fill="#a78f69" />
          <text x="52" y="187" textAnchor="middle" fill="#fff" fontSize="5">DISCOVER</text>
          <rect x="24" y="265" width="91" height="65" fill="#99836a" />
          <path d="m24 321 24-42 19 30 24-32 24 45v8H24z" fill="#695944" />
          <text x="132" y="291" fill="#30372e" fontSize="10" fontFamily="Georgia">Made with intention.</text>
          <path d="M132 305h147m-147 8h98" stroke="#7d7b70" strokeWidth="2" opacity=".5" />
          <text x="321" y="22" fill="#33372f" fontSize="9" fontFamily="Georgia">The collection</text>
          <rect x="321" y="32" width="67" height="54" fill="#9d9a88" />
          <rect x="394" y="32" width="66" height="54" fill="#c3b8a6" />
          <path d="M321 100h139m-139 8h91m-91 8h110" stroke="#77776b" strokeWidth="2" opacity=".6" />
          <text x="390" y="146" textAnchor="middle" fill="#33372f" fontSize="9" fontFamily="Georgia">Everyday essentials</text>
          <path d="M335 160h111m-96 7h81" stroke="#77776b" strokeWidth="2" opacity=".55" />
          <rect x="321" y="186" width="139" height="72" fill="#4d5046" />
          <path d="m321 252 42-49 39 38 25-27 33 33v11H321z" fill="#868772" />
          <rect x="321" y="269" width="139" height="61" fill="#26312e" />
          <text x="390" y="301" textAnchor="middle" fill="#ece5d5" fontSize="8" fontFamily="Georgia">Explore the details</text>
        </>
      )}
      {artwork === "dashboard" && (
        <>
          <path d="M76 0v340m0-292h404" stroke="#383f3e" />
          <path d="M20 69h32m-32 27h26m-26 27h32m-32 27h18m-18 27h28" stroke="#69736e" strokeWidth="5" strokeLinecap="round" />
          <text x="102" y="29" fill="#c8d1cd" fontSize="10" fontWeight="600">Market overview</text>
          {[["INDEX", "24,810"], ["VOLUME", "6.2M"], ["CHANGE", "+4.8%"]].map(([label, value], index) => (
            <g key={label} transform={`translate(${102 + 119 * index} 61)`}>
              <rect width="110" height="44" rx="6" fill="#222927" />
              <text x="10" y="16" fill="#a3aca7" fontSize="6" letterSpacing=".7">{label}</text>
              <text x="10" y="33" fill="#b5d7c5" fontSize="12" fontWeight="600">{value}</text>
            </g>
          ))}
          <path d="M104 119h347m-347 47h347m-347 47h347m-347 47h347m-347 47h347" stroke="#353d3b" />
          {[263, 251, 254, 226, 239, 205, 219, 169, 184, 174, 187, 145, 155, 143, 150, 126].map((y, index, values) => {
            const x = 111 + index * 22;
            const color = y > values[index - 1] ? "#bb6e6b" : "#70ad92";
            return (
              <g key={x}>
                <path d={`M${x} ${y - 12}v29`} stroke={color} />
                <rect x={x - 3} y={y - 5} width="6" height="14" rx="1" fill={color} />
                <rect x={x - 4} y={305 - index % 4 * 4} width="8" height={12 + index % 4 * 4} fill="#2c3b35" />
              </g>
            );
          })}
        </>
      )}
      {artwork === "mobile" && [0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${41 + 137 * index} ${88 - 24 * index})`}>
          <rect width="124" height="244" rx="19" fill="#252b2a" />
          <rect x="6" y="7" width="112" height="230" rx="14" fill="#354340" />
          <path d="M47 16h30" stroke="#222827" strokeWidth="5" strokeLinecap="round" />
          <text x="18" y="49" fill="#c7d5cd" fontSize="7">AVAILABLE BALANCE</text>
          <text x="18" y="75" fill="#bbd7c6" fontSize="17" fontWeight="600">$2,450.00</text>
          <path d="M22 92h74m-74 12h51" stroke="#adc4ba" strokeWidth="3" strokeLinecap="round" opacity=".56" />
          <rect x="18" y="117" width="88" height="49" rx="9" fill="#586e65" />
          <path d="M22 190h67m-67 15h48" stroke="#a5bcb1" strokeWidth="4" strokeLinecap="round" opacity=".6" />
        </g>
      ))}
    </svg>
  );
}
