"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { formatBreadcrumb } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import React from "react";
import { useHeader } from "@/lib/contexts/HeaderContext";

interface AutoSiteHeaderProps {
  /**
   * **Map path segments to custom names**
   * 
   * @example
   * ```tsx
   *   breadcrumbDict={{
   *     team: "Team Management",
   *     members: "Team Members",
   *     "new-member": "New Member",
   *   }}
   * ```
   */
  breadcrumbDict?: Record<string, string>;
  /**
   * **Content to be displayed on the right side of the header**
   */
  trailing?: ReactNode;
  /**
   * **Content to be displayed in the body of the header**
   */
  children?: ReactNode;
}

/**
 * 
 * **Component for rendering SiteHeader - NavigationHeader of the Current Page**
 * @example
 * ```tsx
 * <AutoSiteHeader>
 *  {children} // body content goes here!
 * </AutoSiteHeader>
 * 
 * ```
 */
export function AutoSiteHeader({
  breadcrumbDict = {},
  trailing,
  children,
}: AutoSiteHeaderProps) {

  // const { headerRightContent } = useHeader();

  const pathname = usePathname();

  const pathSegments = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = breadcrumbDict[segment] || formatBreadcrumb(segment);
      return { href, label };
    });
  }, [pathname, breadcrumbDict]);

  return (
    <div>
      {/* <header className="flex h-12 items-center border-b px-4 lg:px-6"> */}
      <header className="sticky top-0 z-40 flex h-12 items-center border-b bg-background px-4 lg:px-6">

        <SidebarTrigger className="-ml-1 mr-2" />
        <Separator orientation="vertical" className="mx-2 h-4" />

        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((item, index) => {
              const isLast = index === pathSegments.length - 1;
              return (
                <React.Fragment key={item.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto">{trailing}</div>
        {/* <div className="ml-auto">{headerRightContent ?? trailing}</div> */}
      </header>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
