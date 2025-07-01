import { AutoSiteHeader } from "@/components/layout/auto-site-header";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AutoSiteHeader>
            {children}
        </AutoSiteHeader>
    );
}
