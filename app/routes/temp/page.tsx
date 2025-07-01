
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Printer } from "lucide-react";

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
    useAddRoute,
    useUpdateRoute,
} from "@/lib/store/selectors/useRoutes";
import { EntityCreateDialog } from "@/app/configurations/components/EntityCreateDialog";

export default function BusRoutesPage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(5);

    const routes = useRoutesData();
    const loading = useRoutesLoading();

    const fetchRoutes = useFetchRoutes();
    const addRoute = useAddRoute();
    const updateRoute = useUpdateRoute();

    useEffect(() => {
        fetchRoutes({ search, page, limit, include_origin: true, include_destination: true });
    }, [search, page]);

    const handleCreate = async (data: any) => {
        await addRoute(data);
        await fetchRoutes({ search, page, limit });
    };

    const handleUpdate = async (id: number, data: any) => {
        await updateRoute({ ...data, id });
        await fetchRoutes({ search, page, limit });
    };

    return (
        <div className={cn("p-[var(--padding)]", "space-y-6")}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-semibold">Bus Routes</h1>
                <div className="flex flex-wrap gap-2">
                    <EntityCreateDialog
                        triggerLabel="+ Create Route"
                        dialogTitle="Create Route"
                        fields={[
                            { name: "referenceNo", label: "Reference No" },
                            { name: "busId", label: "Bus ID" },
                            { name: "startingPoint", label: "Origin Point ID" },
                            { name: "dropingPoint", label: "Destination Point ID" },
                            { name: "scheduleDate", label: "Schedule Date" },
                            { name: "startTime", label: "Start Time" },
                            { name: "endTime", label: "End Time" },
                        ]}
                        onSubmit={handleCreate}
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

            <SearchInput
                placeholder="Search routes..."
                value={search}
                onChange={setSearch}
            />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ref No</TableHead>
                            <TableHead>Origin</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Schedule</TableHead>
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
                                <TableCell className="text-right">
                                    <TableActionsMenu
                                        onEdit={() =>
                                            handleUpdate(route.id, {
                                                referenceNo: route.referenceNo,
                                                busId: route.busId,
                                                startingPoint: route.startingPoint,
                                                dropingPoint: route.dropingPoint,
                                                scheduleDate: route.scheduleDate,
                                                startTime: route.startTime,
                                                endTime: route.endTime,
                                            })
                                        }
                                        onDelete={() => alert("Delete functionality not implemented")}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginationBar
                onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setPage((prev) => prev + 1)}
            // page={page || 1}

            // total={1}
            // limit={limit}
            />
        </div>
    );
}
