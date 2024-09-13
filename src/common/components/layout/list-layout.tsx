import { ReactNode } from "react";

export interface IListLayoutProps {
  children: ReactNode;
}

export function ListLayout({ children }: IListLayoutProps) {
  return <div className="grid grid-cols-1 gap-8">{children}</div>;
}
