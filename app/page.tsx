"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { safeGet } from "@/lib/api";
import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AutoSiteHeader } from "@/components/layout/auto-site-header";

interface Option {
  id: number;
  name: string;
}

export default function Home() {
  const router = useRouter();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [busTypeId, setBusTypeId] = useState("");

  const [points, setPoints] = useState<Option[]>([]);
  const [busTypes, setBusTypes] = useState<Option[]>([]);

  useEffect(() => {
    safeGet("/bus_points").then((res) => {
      if (res.success) setPoints(res.data as Option[]);
    });
    safeGet("/bus_types").then((res) => {
      if (res.success) setBusTypes(res.data as Option[]);
    });
  }, []);

  const handleSearch = () => {
    if (!origin || !destination || !date) return;

    const query = new URLSearchParams({
      origin,
      destination,
      date,
      ...(busTypeId && { busTypeId }), // optional
    });

    router.push(`/search?${query.toString()}`);
  };

  return (
    <AutoSiteHeader>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-xl">
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Route Management System (RMS)
          </h1>

          <div className="w-full space-y-4">
            <select
              className="w-full border p-2 rounded"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="">Select Origin</option>
              {points.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              className="w-full border p-2 rounded"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select Destination</option>
              {points.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <select
              className="w-full border p-2 rounded"
              value={busTypeId}
              onChange={(e) => setBusTypeId(e.target.value)}
            >
              <option value="">Optional Bus Type</option>
              {busTypes.map((bt) => (
                <option key={bt.id} value={bt.id}>
                  {bt.name}
                </option>
              ))}
            </select>

            <Button className="w-full" onClick={handleSearch}>
              Search Buses
            </Button>
          </div>
        </main>
      </div>
    </AutoSiteHeader>

  );
}
