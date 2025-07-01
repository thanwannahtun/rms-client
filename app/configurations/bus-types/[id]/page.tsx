"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAddBusType, useBusTypesData, useFetchBusTypes, useUpdateBusType } from "@/lib/store/selectors/useBusTypes";
import { useParams, useRouter } from "next/navigation";

// max 
const MAX_ROW_LIMITS = 25;

// Helpers
const parseLayout = (layout: string): number => {
    const parts = layout.split("-").map((part) => parseInt(part.trim()));
    return parts.reduce((sum, val) => sum + val, 0);
};

const generateSeats = (layout: string, totalRows: number) => {
    const [left, right] = layout.split("-").map(Number);
    const totalSeats = (left + right) * totalRows;
    let seats = [];

    for (let row = 0; row < totalRows; row++) {
        for (let seat = 0; seat < left + right; seat++) {
            const seatNumber = row * (left + right) + seat + 1;
            seats.push(seatNumber);
        }
    }

    return seats;
};

const seatLayouts = ["2-2", "2-3", "1-1", "1-2", "2-1", "3-2", "3-1"];

export default function CreateBusTypePage() {

    const { id } = useParams();

    const busType = useBusTypesData().find((bt) => bt.id === parseInt(id as string));

    const [name, setName] = useState(busType?.name ?? "");
    const [layout, setLayout] = useState(busType?.layout ?? "2-3");
    const [totalRows, setTotalRows] = useState(busType?.rows ?? 10);
    const [showLayout, setShowLayout] = useState(false);
    const updateBusType = useUpdateBusType();
    const router = useRouter();

    const maxSeatsInRow = parseLayout(layout);
    const seats = generateSeats(layout, totalRows);
    const [left, right] = layout.split("-").map(Number);

    const handleSave = async () => {
        if (!name || !layout || totalRows <= 0) {
            alert("All fields required.");
            return;
        }

        // Dispatch to zustand or call API
        await updateBusType({ id: busType?.id ?? null, name, layout, capacity: maxSeatsInRow * totalRows, rows: totalRows });
        router.back(); // go back to list
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Create New Bus Type (Fleet Type)</h2>
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => router.back()}>Discard</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>

            <Card>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-4">
                        <div>
                            <Label className="mb-2">Name</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Volvo, Express Type" />
                        </div>

                        <div>
                            <Label className="mb-2">Layout</Label>
                            <Select value={layout} onValueChange={setLayout}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Layout" />
                                </SelectTrigger>
                                <SelectContent>
                                    {seatLayouts.map((l) => (
                                        <SelectItem key={l} value={l}>{l}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-2">Total Rows</Label>
                            <Input
                                type="number"
                                value={totalRows > MAX_ROW_LIMITS ? MAX_ROW_LIMITS : totalRows}
                                onChange={(e) => setTotalRows(parseInt((e.target.value ?? 1) <= '0' ? '1' : e.target.value))}
                            />
                        </div>

                        <div>
                            <Label className="mb-2">Max Seat Number in Single Row ( auto computed )</Label>
                            <Input value={maxSeatsInRow} readOnly />
                        </div>

                        <Button onClick={() => setShowLayout(true)}>Check Layout</Button>
                    </div>

                    {showLayout && (
                        <div className="bg-muted border rounded-md p-4 shadow-inner">
                            <h3 className="font-semibold text-lg mb-4 text-center">Seat Layout Preview</h3>
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: totalRows }).map((_, rowIndex) => (
                                    <div key={rowIndex} className="flex gap-2 justify-center">
                                        {Array.from({ length: left }).map((_, seatIndex) => (
                                            <div key={`L-${rowIndex}-${seatIndex}`} className="w-8 h-8 bg-blue-500 text-white text-sm flex items-center justify-center rounded">
                                                {rowIndex * (left + right) + seatIndex + 1}
                                            </div>
                                        ))}
                                        <div className="w-4" /> {/* aisle */}
                                        {Array.from({ length: right }).map((_, seatIndex) => (
                                            <div key={`R-${rowIndex}-${seatIndex}`} className="w-8 h-8 bg-blue-500 text-white text-sm flex items-center justify-center rounded">
                                                {rowIndex * (left + right) + left + seatIndex + 1}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
