import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderProvider } from "@/lib/contexts/HeaderContext";
import { AutoSiteHeader } from "@/components/layout/auto-site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Route Management System (RMS)",
  description: "Route Management System (RMS) - Developed by JLP-Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>

          <AppSidebar />

          <SidebarInset>

            {/* Provider for the header context to pass the rightContent or trailingContent to the header */}
            {/* <HeaderProvider> */}
            {/* This is the header of the page */}
            {/* <AutoSiteHeader> */}
            {/* This is the main content of the page */}
            {children}

            {/* </AutoSiteHeader> */}
            {/* </HeaderProvider> */}
          </SidebarInset>

        </SidebarProvider>

      </body>
    </html>
  );
}


