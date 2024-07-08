import { ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface IGridLayoutProps {
  children: ReactNode;
}

export function GridLayout({ children }: IGridLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8")}>
      <>{children}</>
    </div>
  );
}
