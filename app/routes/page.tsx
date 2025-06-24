"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Printer } from "lucide-react";
import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
} from "@/components/ui/table";
import { SearchInput } from "@/components/shared/search-input";
import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { PaginationBar } from "@/components/shared/pagination-bar";
import { TableActionsMenu } from "@/components/shared/table-actions-menu";

import {
    useBusRoutes,
    useFetchBusRoutes,
    useAddBusRoute,
    useBusRoutesLoading,
    useBusRoutesError
} from "@/lib/store/selectors/useBusRoutes";
import { cn } from "@/lib/utils";

export default function RoutesManagementPage() {
    const routes = useBusRoutes();
    const fetchRoutes = useFetchBusRoutes();
    const addRoute = useAddBusRoute();
    const loading = useBusRoutesLoading();
    const error = useBusRoutesError();

    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        fetchRoutes();
    }, [fetchRoutes]);

    const filtered = routes.filter((r) => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchActive =
            activeFilter === null ? true :
                activeFilter === "active" ? r.active :
                    !r.active;

        return matchSearch && matchActive;
    });

    const toggleAll = () =>
        setSelected(
            selected.length === filtered.length ? [] : filtered.map((r) => r.id)
        );

    const toggleOne = (id: number) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );

    return (
        <div className={cn(`p-[var(--padding)]` , "space-y-6")}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Bus Routes</h1>
                <div className="flex gap-2">
                    <Button onClick={() => addRoute({
                        id: 0,
                        name: "New Route",
                        from: "A",
                        to: "B",
                        distanceKm: 100,
                        active: true
                    })}>
                        <Plus className="mr-2" />
                        Create
                    </Button>
                    <Button variant="secondary">
                        <Upload className="mr-2" />
                        Import
                    </Button>
                    <Button variant="outline">
                        <Printer className="mr-2" />
                        Print
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center gap-4">
                <SearchInput value={search} onChange={setSearch} placeholder="Search route name..." />
                <FilterDropdown
                    label={activeFilter ? `Status: ${activeFilter}` : "Filter Status"}
                    filters={["active", "inactive"]}
                    onSelect={setActiveFilter}
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">
                                        <input
                                            type="checkbox"
                                            checked={selected.length === filtered.length}
                                            onChange={toggleAll}
                                        />
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Distance (km)</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(r.id)}
                                                onChange={() => toggleOne(r.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{r.name}</TableCell>
                                        <TableCell>{r.from}</TableCell>
                                        <TableCell>{r.to}</TableCell>
                                        <TableCell>{r.distanceKm}</TableCell>
                                        <TableCell>{r.active ? "Active" : "Inactive"}</TableCell>
                                        <TableCell className="text-right">
                                            <TableActionsMenu
                                                onEdit={() => alert(`Edit route ${r.id}`)}
                                                onDelete={() => alert(`Delete route ${r.id}`)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <PaginationBar onPrevious={() => { }} onNext={() => { }} />
                </>
            )}
        </div>
    );
}
