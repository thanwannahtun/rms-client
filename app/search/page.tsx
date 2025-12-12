

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, Printer, Plus } from "lucide-react";

import { SearchInput } from "@/components/shared/search-input";
import { PaginationBar } from "@/components/shared/pagination-bar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TableActionsMenu } from "@/components/shared/table-actions-menu";
import {
    useRoutesData,
    useRoutesLoading,
    useFetchRoutes,
} from "@/lib/store/selectors/useRoutes";

export default function BusRoutesPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(5);

    const routes = useRoutesData();
    const loading = useRoutesLoading();

    const fetchRoutes = useFetchRoutes();

    useEffect(() => {
        fetchRoutes({ search, page, limit, include_origin: true, include_destination: true });
    }, [search, page]);

    return (
        <div className={cn("p-[var(--padding)]", "space-y-6")}>
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold">Bus Routes</h1>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={() => router.push("/routes/new-route")}>
                        <Plus className="mr-2 size-4" />
                        Create Route
                    </Button>
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

            {/* Search Bar */}
            <SearchInput
                placeholder="Search routes..."
                value={search}
                onChange={setSearch}
            />

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ref No</TableHead>
                            <TableHead>Origin</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {routes.map((route) => (
                            <TableRow key={route.id}>
                                <TableCell>{route.referenceNo}</TableCell>
                                <TableCell>{route.origin?.name}</TableCell>
                                <TableCell>{route.destination?.name}</TableCell>
                                <TableCell>{route.scheduleDate}</TableCell>
                                <TableCell>{formatTime(route.startTime)}</TableCell>
                                <TableCell>{formatTime(route.endTime)}</TableCell>
                                <TableCell className="text-right">
                                    <TableActionsMenu
                                        onEdit={() => router.push(`/routes/${route.id}`)}
                                        onDelete={() => alert("Delete functionality not implemented")}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <PaginationBar
                onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setPage((prev) => prev + 1)}
            // page={page}
            // total={total}
            // limit={limit}
            />
        </div>
    );
}


/// 2025-07-01T04:17:00.000Z to 04:17
function formatTime(time: string) {
    const [hours, minutes] = time.split("T")[1].split(":");
    return `${hours}:${minutes}`;
}