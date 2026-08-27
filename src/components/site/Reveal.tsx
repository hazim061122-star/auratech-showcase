import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: TagProp = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = TagProp as "div";
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
