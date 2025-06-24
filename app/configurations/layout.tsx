
import { ConfigurationPageSwitcher } from "@/components/configuration-page-switcher";
import { AutoSiteHeader } from "@/components/layout/auto-site-header";
import { HeaderProvider } from "@/lib/contexts/HeaderContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <HeaderProvider>
        <AutoSiteHeader trailing={
            <ConfigurationPageSwitcher />
        }>
            {children}
        </AutoSiteHeader>
        // </HeaderProvider>
    );
}
