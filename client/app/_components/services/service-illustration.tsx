import type { CSSProperties, ReactNode } from "react";

export type ServiceIllustrationKind = "web" | "machine-learning" | "mobile" | "hardware";

// Strokes draw themselves when the service row opens (pathLength=1 + dash offset), staggered by `delay`.
const draw = "site-motion:[stroke-dasharray:1] site-motion:[stroke-dashoffset:1] site-motion:transition-[stroke-dashoffset] site-motion:duration-[650ms] site-motion:ease-hero-intro site-motion:group-data-expanded/service:[stroke-dashoffset:0]";
// Filled details fade in after their outlines.
const fade = "site-motion:opacity-0 site-motion:transition-opacity site-motion:duration-300 site-motion:group-data-expanded/service:opacity-100";
// A short dash that runs along a path forever while the row is open; hidden when motion is reduced.
const travel = "opacity-0 [stroke-dasharray:.07_.93] site-motion:group-data-expanded/service:opacity-100 site-motion:group-data-expanded/service:animate-svc-travel";
const pulse = "site-motion:group-data-expanded/service:animate-svc-pulse";
const spin = "[transform-box:fill-box] origin-center site-motion:group-data-expanded/service:animate-svc-spin";

const wait = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms`, animationDelay: `${ms}ms` });

function Path({ d, delay = 0, className = "" }: { d: string; delay?: number; className?: string }) {
  return <path d={d} pathLength={1} className={`${draw} ${className}`} style={wait(delay)} />;
}

function Box({ x, y, width, height, rx = 3, delay = 0 }: { x: number; y: number; width: number; height: number; rx?: number; delay?: number }) {
  return <rect x={x} y={y} width={width} height={height} rx={rx} pathLength={1} className={draw} style={wait(delay)} />;
}

function Ring({ cx, cy, r, delay = 0 }: { cx: number; cy: number; r: number; delay?: number }) {
  return <circle cx={cx} cy={cy} r={r} pathLength={1} className={draw} style={wait(delay)} />;
}

function Dot({ cx, cy, r = 2, delay = 0, className = "" }: { cx: number; cy: number; r?: number; delay?: number; className?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" className={`${fade} ${className}`} style={wait(delay)} />;
}

function Web() {
  return (
    <>
      <Box x={8} y={10} width={144} height={100} rx={6} />
      <Path d="M8 26H152" delay={80} />
      {[17, 24, 31].map((cx, index) => <Dot key={cx} cx={cx} cy={18} r={1.8} delay={160 + index * 40} />)}
      <Box x={46} y={14} width={68} height={7} rx={3.5} delay={140} />
      <Path d="M18 37H40M108 37H122M128 37H142" delay={220} />
      <Path d="M18 52H90" delay={280} />
      <Path d="M18 60H72" delay={320} />
      <Box x={18} y={68} width={26} height={8} rx={4} delay={360} />
      <Box x={100} y={46} width={42} height={30} delay={400} />
      <Box x={18} y={86} width={58} height={16} delay={440} />
      <Box x={84} y={86} width={58} height={16} delay={480} />
      {/* The cursor glides to the card and clicks, on a loop. */}
      <circle cx={121} cy={61} r={8} fill="currentColor" stroke="none" className="[transform-box:fill-box] origin-center opacity-0 site-motion:group-data-expanded/service:animate-svc-ripple" style={wait(700)} />
      <g className={`${fade} site-motion:group-data-expanded/service:animate-svc-cursor`} style={wait(700)}>
        <path d="M131 95v13l3.4-3.3 3 6.3 2.4-1.1-3-6.2h4.8Z" fill="currentColor" stroke="none" />
      </g>
    </>
  );
}

const layers = [
  { x: 30, ys: [30, 60, 90] },
  { x: 80, ys: [22, 47, 73, 98] },
  { x: 130, ys: [45, 75] },
];

function MachineLearning() {
  const links: ReactNode[] = [];
  layers.slice(0, -1).forEach((layer, index) => {
    const next = layers[index + 1];
    layer.ys.forEach((y1) => next.ys.forEach((y2) => {
      links.push(<Path key={`${layer.x}-${y1}-${y2}`} d={`M${layer.x + 6} ${y1}L${next.x - 6} ${y2}`} delay={index * 160 + links.length * 12} />);
    }));
  });

  return (
    <>
      <g className="opacity-60">{links}</g>
      {layers.map((layer, column) => layer.ys.map((y) => (
        <g key={`${layer.x}-${y}`}>
          <Ring cx={layer.x} cy={y} r={6} delay={column * 140} />
          {/* Each layer lights up in turn, like a signal moving through the network. */}
          <Dot cx={layer.x} cy={y} r={3} delay={420 + column * 300} className={pulse} />
        </g>
      )))}
    </>
  );
}

function Mobile() {
  return (
    <>
      <Box x={20} y={8} width={56} height={104} rx={10} />
      <Path d="M40 16H56" delay={100} />
      <Box x={29} y={26} width={38} height={22} delay={180} />
      <Path d="M29 57H67" delay={240} />
      <Path d="M29 65H59" delay={280} />
      <Path d="M29 73H64" delay={320} />
      <Path d="M42 103H54" delay={360} />
      <Path d="M101 55H138a9 9 0 0 0-.6-18 13 13 0 0 0-25-3.5A10 10 0 0 0 101 55Z" delay={260} />
      {/* The phone syncs with the cloud: a dash runs along the link while the arrows turn. */}
      <Path d="M77 70C92 70 96 62 104 56" delay={420} />
      <path d="M77 70C92 70 96 62 104 56" pathLength={1} strokeWidth={3} className={travel} style={wait(800)} />
      <g className={spin} style={wait(800)}>
        <Path d="M128 80a10 10 0 0 0-17.3-4.5M108 88a10 10 0 0 0 17.3 4.5" delay={480} />
        <Path d="M110 70v6h6M126 98v-6h-6" delay={560} />
      </g>
      <Dot cx={70} cy={20} r={2.2} delay={600} className={pulse} />
    </>
  );
}

function Hardware() {
  return (
    <>
      <Box x={58} y={38} width={44} height={44} rx={4} />
      <Box x={68} y={48} width={24} height={24} rx={2} delay={120} />
      <Path d="M50 46H58M50 54H58M50 62H58M50 70H58M102 46H110M102 54H110M102 62H110M102 70H110M66 30V38M76 30V38M84 30V38M94 30V38M66 82V90M76 82V90M84 82V90M94 82V90" delay={200} />
      {/* Sensor on the left, LED on top right, motor on the bottom right. */}
      <Path d="M50 54H42V30H36" delay={300} />
      <Ring cx={28} cy={30} r={8} delay={360} />
      <Path d="M16 23a10 10 0 0 0 0 14" delay={420} className={pulse} />
      <Path d="M11 19a15 15 0 0 0 0 22" delay={460} className={pulse} />
      <Path d="M110 46H138V31" delay={340} />
      <Ring cx={138} cy={25} r={5} delay={400} />
      <Dot cx={138} cy={25} r={2.5} delay={700} className={pulse} />
      <Path d="M110 70H124V92H130" delay={380} />
      <g className={spin} style={wait(800)}>
        <Ring cx={140} cy={92} r={9} delay={440} />
        <Ring cx={140} cy={92} r={3} delay={500} />
        <Path d="M140 79V83M140 101V105M127 92H131M149 92H153M131 83l3 3M146 98l3 3M149 83l-3 3M134 98l-3 3" delay={540} />
      </g>
      {/* Signals travel along the traces. */}
      <path d="M50 54H42V30H36" pathLength={1} strokeWidth={3} className={travel} style={wait(800)} />
      <path d="M110 46H138V31" pathLength={1} strokeWidth={3} className={travel} style={wait(1100)} />
      <path d="M110 70H124V92H130" pathLength={1} strokeWidth={3} className={travel} style={wait(950)} />
    </>
  );
}

const illustrations: Record<ServiceIllustrationKind, () => ReactNode> = {
  web: Web,
  "machine-learning": MachineLearning,
  mobile: Mobile,
  hardware: Hardware,
};

// Decorative line art for a service. It draws itself when the row opens and keeps a small loop running while open.
export function ServiceIllustration({ kind, className }: { kind: ServiceIllustrationKind; className?: string }) {
  const Illustration = illustrations[kind];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <Illustration />
    </svg>
  );
}
