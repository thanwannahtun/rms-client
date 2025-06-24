"use client";

import {
    Button
} from "@/components/ui/button";
import {
    Input
} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

import {
    MoreHorizontal,
    Plus,
    Upload,
    Printer,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CreateBusBrandDialog } from "../components/CreateBusBrandDialog";

interface BusBrand {
    id: number;
    name: string;
    country: string;
}

const mockData: BusBrand[] = [
    { id: 1, name: "Mercedes-Benz", country: "Germany" },
    { id: 2, name: "Volvo", country: "Sweden" },
    { id: 3, name: "Scania", country: "Sweden" },
    { id: 4, name: "MAN", country: "Germany" },
    { id: 5, name: "Isuzu", country: "Japan" },
];

export default function BusBrandsPage() {

    const router = useRouter();
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isAllSelected = selected.length === mockData.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelected([]);
        } else {
            setSelected(mockData.map((item) => item.id));
        }
    };

    return (
        // <div className="space-y-6 p-6">
        /// avoid hardcode padding and margin
        <div className={cn(`p-[var(--padding)]`, "space-y-6")}>
            {/* Header Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Bus Brands</h1>
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* Show Large Dialog For BrandName Creat Form */}
                    {/* <Button>
                        <Plus className="mr-2 size-4" />
                        Create
                    </Button> */}
                    <CreateBusBrandDialog />
                    <Button variant="secondary">
                        <Upload className="mr-2 size-4" />
                        Import
                    </Button>
                    <Button variant="outline">
                        <Printer className="mr-2 size-4" />
                        Print
                    </Button>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <Input placeholder="Search brands..." className="w-full max-w-sm" />

                {/* Example: future filter dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filter</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Country: Germany</DropdownMenuItem>
                        <DropdownMenuItem>Country: Japan</DropdownMenuItem>
                        <DropdownMenuItem>Reset</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Input type="checkbox"
                                    className="w-3.5 h-3.5"
                                    checked={isAllSelected}
                                    onChange={toggleSelectAll}
                                />

                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockData.map((brand) => (
                            <TableRow key={brand.id}>
                                <TableCell>
                                    <Input type="checkbox"
                                        className="w-3.5 h-3.5"
                                        checked={selected.includes(brand.id)}
                                        onChange={() => toggleSelection(brand.id)}
                                    />
                                </TableCell>
                                <TableCell>{brand.name}</TableCell>
                                <TableCell>{brand.country}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => router.push(`/configurations/bus-brands/${encodeURIComponent(brand.name)}?id=${brand.id}&action=edit`)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push(`/configurations/bus-brands/${encodeURIComponent(brand.name)}?id=${brand.id}&action=delete`)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
