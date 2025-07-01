"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Printer } from "lucide-react";
import { SearchInput } from "@/components/shared/search-input";
import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { PaginationBar } from "@/components/shared/pagination-bar";
import { EntityCreateDialog } from "../components/EntityCreateDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import {
  useAddBusPoint,
  useBusPointsData,
  useBusPointsError,
  useBusPointsLoading,
  useFetchBusPoints,
  useUpdateBusPoint,
} from "@/lib/store/selectors/useBusPoints";

interface BusPoint {
  id: number;
  name: string;
  type: "pickup" | "dropoff" | "midpoint";
  location: string;
}

export default function BusPointsPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const fetchBusPoints = useFetchBusPoints();
  const busPoints = useBusPointsData() || [];
  const isLoading = useBusPointsLoading();
  const error = useBusPointsError();
  const addBusPoint = useAddBusPoint();
  const updateBusPoint = useUpdateBusPoint();

  // Filtering Logic
  const filteredPoints = useMemo(() => {
    return busPoints.filter((point) => {
      const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase());
    //   const matchesType = typeFilter ? point.type === typeFilter : true;
      return matchesSearch;
    });
  }, [busPoints, searchTerm, typeFilter]);

  const isAllSelected = selectedIds.length === filteredPoints.length;

  const handleToggleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : filteredPoints.map((point) => point.id ?? 0));
  };

  const handleToggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchBusPoints();
  }, [fetchBusPoints]);

  return (
    <div className={cn("p-[var(--padding)] space-y-6")}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Bus Points</h1>
        <div className="flex flex-wrap gap-2">
          <EntityCreateDialog
            triggerLabel="+ Create Bus Point"
            dialogTitle="Create Bus Point"
            fields={[{ name: "name", label: "Point Name" }]}
            onSubmit={async (data) => {
              await addBusPoint({ id: null, name: data.name });
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

      {/* Search & Filter */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search points..."
        />
        <FilterDropdown
          label={typeFilter ? `Type: ${typeFilter}` : "Filter"}
          filters={["pickup", "dropoff", "midpoint"]}
          onSelect={setTypeFilter}
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
                  onChange={handleToggleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPoints.map((point) => (
              <TableRow key={point.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(point.id ?? 0)}
                    onChange={() => handleToggleSelection(point.id ?? 0)}
                  />
                </TableCell>
                <TableCell>{point.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <EntityCreateDialog
                    triggerLabel="Edit"
                    dialogTitle="Edit Bus Point"
                    initialData={{ name: point.name }}
                    fields={[{ name: "name", label: "Point Name" }]}
                    onSubmit={async (data) => {
                      await updateBusPoint({ id: point.id, name: data.name });
                    }}
                  />
                  <EntityCreateDialog
                    triggerLabel="Delete"
                    dialogTitle="Delete Bus Point"
                    initialData={{ name: point.name }}
                    fields={[]}
                    onSubmit={async (data) => {
                    //   await updateBusPoint({ id: point.id, name: data.name });
                    }}
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
