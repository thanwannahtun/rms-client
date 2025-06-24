"use client"

import { BusIcon, Caravan, ChevronDown, MapPinned, Plus, UtensilsCrossed } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";

export function ConfigurationPageSwitcher() {

    const router = useRouter();
    const pathname = usePathname();

    const configPages = [
        {
            name: "Bus Brands",
            logo: BusIcon,
            slug: "bus-brands"
        },
        {
            name: "Bus Types",
            logo: Caravan,
            slug: "bus-types"
        },
        {
            name: "Bus Points",
            logo: MapPinned,
            slug: "bus-points"
        },
        {
            name: "Bus Amenities",
            logo: UtensilsCrossed,
            slug: "bus-amenities"
        },
    ];

    // 🔍 Dynamically find current active config based on pathname
    const activeConfiguration =
        configPages.find((item) => pathname === `/configurations/${item.slug}`) ??
        null;

    // const [activeConfiguration, setActiveConfiguration] = useState(configPages[0])

    // if (!activeConfiguration) {
    //     return null
    // }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">
                    {activeConfiguration.name}
                    <ChevronDown className="opacity-50" />
                </Button> */}
                <Button variant="outline">
                    {activeConfiguration?.name ?? "Configurations"}
                    <ChevronDown className="ml-1 size-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-64 rounded-lg mr-2"
                align="start"
                side="bottom"
                sideOffset={4}
            >
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                    Configurations
                </DropdownMenuLabel>

                {configPages.map((item) => (
                    <DropdownMenuItem
                        key={item.name}
                        onClick={() => {
                            router.push(`/configurations/${item.slug}`);
                        }}
                        className="gap-2 p-2"
                    >
                        <div className="flex size-6 items-center justify-center rounded-xs border">
                            <item.logo className="size-4 shrink-0" />
                        </div>
                        {item.name}
                    </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                        <Plus className="size-4" />
                    </div>
                    <div className="text-muted-foreground font-medium">Add Configuration</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
