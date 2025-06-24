"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Printer } from "lucide-react";

import { SearchInput } from "@/components/shared/search-input";
import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { PaginationBar } from "@/components/shared/pagination-bar";
import { TableActionsMenu } from "@/components/shared/table-actions-menu";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EntityCreateDialog } from "../components/EntityCreateDialog";

interface BusPoint {
    id: number;
    name: string;
    type: "pickup" | "dropoff" | "midpoint";
    location: string;
}

const mockBusPoints: BusPoint[] = [
    { id: 1, name: "Yangon Main Terminal", type: "pickup", location: "Yangon" },
    { id: 2, name: "Mandalay Stop", type: "dropoff", location: "Mandalay" },
    { id: 3, name: "Bago Rest Station", type: "midpoint", location: "Bago" },
    { id: 4, name: "Naypyidaw Pickup Zone", type: "pickup", location: "Naypyidaw" },
    { id: 5, name: "Myitkyina Drop-off", type: "dropoff", location: "Myitkyina" },
];

export default function BusPointsPage() {
    const [selected, setSelected] = useState<number[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string | null>(null);

    const filteredData = mockBusPoints.filter((point) => {
        const matchesSearch = point.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter ? point.type === filter : true;
        return matchesSearch && matchesFilter;
    });

    const toggleSelection = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const isAllSelected = selected.length === filteredData.length;

    const toggleSelectAll = () => {
        if (isAllSelected) setSelected([]);
        else setSelected(filteredData.map((item) => item.id));
    };

    return (
        <div className={cn(`p-[var(--padding)]`, "space-y-6")}>
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold">Bus Points</h1>
                <div className="flex flex-wrap gap-2">
                    {/* <Button>
                        <Plus className="mr-2 size-4" />
                        Create
                    </Button> */}
                    <EntityCreateDialog
                        triggerLabel="+ Create Bus Point"
                        dialogTitle="Create Bus Point"
                        fields={[
                            { name: "name", label: "Point Name" },
                            { name: "location", label: "Location" },
                        ]}
                        onSubmit={async (data) => {
                            // await fetch("/api/bus-points", { method: "POST", body: JSON.stringify(data) });
                        }}
                    />

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

            {/* Search + Filter */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <SearchInput value={search} onChange={setSearch} placeholder="Search points..." />
                <FilterDropdown
                    label={filter ? `Type: ${filter}` : "Filter"}
                    filters={["pickup", "dropoff", "midpoint"]}
                    onSelect={(val) => setFilter(val)}
                />
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((point) => (
                            <TableRow key={point.id}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(point.id)}
                                        onChange={() => toggleSelection(point.id)}
                                    />
                                </TableCell>
                                <TableCell>{point.name}</TableCell>
                                <TableCell className="capitalize">{point.type}</TableCell>
                                <TableCell>{point.location}</TableCell>
                                <TableCell className="text-right">
                                    <TableActionsMenu
                                        onEdit={() => alert(`Edit ${point.name}`)}
                                        onDelete={() => alert(`Delete ${point.name}`)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <PaginationBar
                onPrevious={() => alert("Previous page")}
                onNext={() => alert("Next page")}
            />
        </div>
    );
}
