"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Printer } from "lucide-react";
import { SearchInput } from "@/components/shared/search-input";
import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { PaginationBar } from "@/components/shared/pagination-bar";

import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
} from "@/components/ui/table";

import {
    useBusTypesData,
    useBusTypesLoading,
    useBusTypesError,
    useFetchBusTypes,
    useAddBusType,
} from "@/lib/store/selectors/useBusTypes";
import { useRouter } from "next/navigation";
import { DetailButton } from "@/components/shared/detail-button";

export default function BusTypesPage() {



    const router = useRouter();

    const busTypes = useBusTypesData() || [];
    const loading = useBusTypesLoading();
    const error = useBusTypesError();
    const fetchBusTypes = useFetchBusTypes();

    const [search, setSearch] = useState("");
    const [capacityFilter, setCapacityFilter] = useState<string | null>(null);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        fetchBusTypes();
    }, [fetchBusTypes]);

    const filtered = busTypes.filter((bt) => {
        const matchSearch = bt.name.toLowerCase().includes(search.toLowerCase());
        const matchCap = capacityFilter
            ? (capacityFilter === "small" && bt.capacity <= 30) ||
            (capacityFilter === "large" && bt.capacity > 30)
            : true;
        return matchSearch && matchCap;
    });

    const isAll = selected.length === filtered.length;
    const toggleAll = () => {
        setSelected(isAll ? [] : filtered.map((bt) => bt.id ?? 0));
    };
    const toggleOne = (id: number) => {
        setSelected((s) =>
            s.includes(id) ? s.filter((i) => i !== id) : [...s, id]
        );
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Bus Types</h1>
                <div className="flex gap-2">
                    <Button onClick={() => router.push("/configurations/bus-types/new-bus-type")}>
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
                <SearchInput placeholder="Search types..." value={search} onChange={setSearch} />
                <FilterDropdown
                    label={capacityFilter ? `Capacity: ${capacityFilter}` : "Filter by size"}
                    filters={["small", "large"]}
                    onSelect={setCapacityFilter}
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <input checked={isAll} onChange={toggleAll} type="checkbox" />
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Rows</TableHead>
                                <TableHead>Layout</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((bt) => (
                                <TableRow key={bt.id}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(bt.id!)}
                                            onChange={() => toggleOne(bt.id!)}
                                        />
                                    </TableCell>
                                    <TableCell>{bt.name}</TableCell>
                                    <TableCell>{bt.capacity}</TableCell>
                                    <TableCell>{bt.rows}</TableCell>
                                    <TableCell>{bt.layout}</TableCell>
                                    <TableCell className="text-right">
                                        <DetailButton onDetail={() => router.push(`/configurations/bus-types/${bt.id}`)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <PaginationBar onPrevious={() => { }} onNext={() => { }} />
                </div>
            )}
        </div>
    );
}


