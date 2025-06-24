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

interface BusAmenity {
  id: number;
  name: string;
  type: "comfort" | "entertainment" | "safety";
  status: "enabled" | "disabled";
}

const mockAmenities: BusAmenity[] = [
  { id: 1, name: "Air Conditioning", type: "comfort", status: "enabled" },
  { id: 2, name: "Wi-Fi", type: "entertainment", status: "enabled" },
  { id: 3, name: "Reclining Seats", type: "comfort", status: "enabled" },
  { id: 4, name: "USB Charging", type: "comfort", status: "disabled" },
  { id: 5, name: "CCTV", type: "safety", status: "enabled" },
  { id: 6, name: "TV Screens", type: "entertainment", status: "disabled" },
  { id: 7, name: "Fire Extinguisher", type: "safety", status: "enabled" },
  { id: 8, name: "Toilet", type: "comfort", status: "enabled" },
  { id: 9, name: "Live GPS Tracking", type: "safety", status: "disabled" },
];

export default function BusAmenitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const filteredData = mockAmenities.filter((amenity) => {
    const matchesSearch = amenity.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? amenity.type === typeFilter : true;
    const matchesStatus = statusFilter ? amenity.status === statusFilter : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  const isAllSelected = selected.length === filteredData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(filteredData.map((a) => a.id));
    }
  };

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn(`p-[var(--padding)]`, "space-y-6")}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Bus Amenities</h1>
        <div className="flex flex-wrap gap-2">
          {/* <Button>
            <Plus className="mr-2 size-4" />
            Create
          </Button> */}
          <EntityCreateDialog
            triggerLabel="+ Create Amenity"
            dialogTitle="Create Bus Amenity"
            fields={[
              { name: "name", label: "Amenity Name" },
            ]}
            onSubmit={async (data) => {
              // await fetch("/api/bus-amenities", { method: "POST", body: JSON.stringify(data) });
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchInput
          placeholder="Search amenities..."
          value={search}
          onChange={setSearch}
        />
        <div className="flex gap-2">
          <FilterDropdown
            label={typeFilter ? `Type: ${typeFilter}` : "Amenity Type"}
            filters={["comfort", "entertainment", "safety"]}
            onSelect={(val) => setTypeFilter(val)}
          />
          <FilterDropdown
            label={statusFilter ? `Status: ${statusFilter}` : "Availability"}
            filters={["enabled", "disabled"]}
            onSelect={(val) => setStatusFilter(val)}
          />
        </div>
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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((amenity) => (
              <TableRow key={amenity.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selected.includes(amenity.id)}
                    onChange={() => toggleSelection(amenity.id)}
                  />
                </TableCell>
                <TableCell>{amenity.name}</TableCell>
                <TableCell className="capitalize">{amenity.type}</TableCell>
                <TableCell className="capitalize">{amenity.status}</TableCell>
                <TableCell className="text-right">
                  <TableActionsMenu
                    onEdit={() => alert(`Edit ${amenity.name}`)}
                    onDelete={() => alert(`Delete ${amenity.name}`)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <PaginationBar
        onPrevious={() => alert("Previous")}
        onNext={() => alert("Next")}
      />
    </div>
  );
}
