import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroCtaProps = {
  label: string;
  href?: string;
  variant?: "default" | "outline";
};

export function HeroCta({ label, href, variant = "default" }: HeroCtaProps) {
  const isResume = variant === "outline";
  const content = (
    <>
      {label}
      <svg
        className="size-[1.15em]"
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isResume
          ? <path d="M4 2h5l3 3v9H4zM9 2v3h3M6 8h4m-4 3h4" />
          : <path d="M3.5 12.5 12 4m-7 0h7v7" />}
      </svg>
    </>
  );

  return (
    <Button
      asChild={Boolean(href)}
      size="pill"
      variant={variant}
      className={cn(
        "disabled:pointer-events-auto disabled:opacity-100",
        isResume
          ? "shadow-none"
          : "border border-[#353535] bg-transparent bg-[linear-gradient(#242424,#171717_55%)] px-[1.28em] shadow-[0_.25rem_.65rem_#0004]",
      )}
      type={href ? undefined : "button"}
      disabled={!href}
    >
      {href ? (
        <a href={href}>{content}</a>
      ) : content}
    </Button>
  );
}
