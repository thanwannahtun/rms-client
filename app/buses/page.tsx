"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBusesData, useBusesError, useBusesLoading, useFetchBuses } from "@/lib/store/selectors/useBuses";

export default function BusListPage() {
    const buses = useBusesData();
    const fetchBuses = useFetchBuses();
    const isLoading = useBusesLoading();
    const error = useBusesError();

    useEffect(() => {
        fetchBuses();
    }, [fetchBuses]);

    return (

        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bus Management</h1>
                <Button asChild>
                    <Link href="/buses/create">+ Add New Bus</Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plate Number</TableHead>
                            <TableHead>Bus Type</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Assignment Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {buses.map((bus) => (
                            <TableRow key={bus.id}>
                                <TableCell>{bus.plateNumber}</TableCell>
                                <TableCell>{bus.busType?.name}</TableCell>
                                <TableCell>{bus.driver?.name}</TableCell>
                                <TableCell>{new Date(bus.assignmentDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/buses/${bus.id}/`} className="text-blue-500 hover:underline">
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {isLoading && <div className="p-4">Loading buses...</div>}
                {error && <div className="p-4 text-red-500">Error: {error}</div>}
                {!isLoading && buses.length === 0 && <div className="p-4 text-gray-500">No buses found.</div>}
            </div>
        </div>

    );
}
