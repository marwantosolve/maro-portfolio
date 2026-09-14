import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  index: string;
  title: string;
  className?: string;
};

export function SectionHeader({ index, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      <span className="font-mono text-xs text-accent-text">{index}</span>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {title}
      </h2>
      <span className="h-px flex-1 translate-y-[-3px] bg-border" aria-hidden />
    </div>
  );
}
