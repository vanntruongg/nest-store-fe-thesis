"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { cn } from "~/lib/utils";
import MaxWidthWrapper from "./max-width-wrapper";
import { Home } from "lucide-react";
import { Breadrumb } from "~/common/model/base.model";

interface BreadrumbsProps {
  breadrumbs?: Breadrumb[];
  options?: string;
  optionPage?: boolean;
  className?: string;
  context: "page" | "category";
}

const Breadrumbs = ({
  breadrumbs,
  options,
  optionPage,
  className,
  context,
}: BreadrumbsProps) => {
  const pathname = usePathname();

  return (
    <div
      className={cn("bg-white flex items-center", className, {
        "h-10": !className,
      })}
    >
      <MaxWidthWrapper>
        <Breadcrumb>
          <BreadcrumbList>
            {context === "page" && (
              <>
                <BreadcrumbLink asChild>
                  <Link href={"/"} className="flex items-center gap-1">
                    <Home strokeWidth={2} className="size-4 -mt-1" />
                    <span>Home</span>
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
            {breadrumbs &&
              breadrumbs.map(({ name, href }, idx) => {
                return (
                  <div key={href} className="flex items-center gap-2">
                    <BreadcrumbItem>
                      {href === pathname ? (
                        <BreadcrumbPage>{name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={href}>{name}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {idx !== breadrumbs.length - 1 || options ? (
                      <BreadcrumbSeparator />
                    ) : null}
                  </div>
                );
              })}
            {options &&
              (optionPage ? (
                <BreadcrumbPage>{options}</BreadcrumbPage>
              ) : (
                <BreadcrumbItem>{options}</BreadcrumbItem>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthWrapper>
    </div>
  );
};

export default Breadrumbs;
