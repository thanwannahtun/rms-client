"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Printer } from "lucide-react";

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

import {
  useAddAmenity,
  useAmenitiesData,
  useAmenitiesError,
  useAmenitiesLoading,
  useFetchAmenities,
  useUpdateAmenity,
} from "@/lib/store/selectors/useAmenities";

export default function BusAmenitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const fetchAmenities = useFetchAmenities();
  const amenities = useAmenitiesData();
  const isLoading = useAmenitiesLoading();
  const error = useAmenitiesError();
  const addAmenity = useAddAmenity();
  const updateAmenity = useUpdateAmenity();

  // Filter + Search Logic
  const filteredAmenities = useMemo(() => {
    return amenities.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  }, [amenities, search]);

  const isAllSelected = selected.length === filteredAmenities.length;

  const toggleSelectAll = () => {
    setSelected(isAllSelected ? [] : filteredAmenities.map((a) => a.id!));
  };

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  return (
    <div className={cn("p-[var(--padding)] space-y-6")}>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Bus Amenities</h1>
        <div className="flex flex-wrap gap-2">
          <EntityCreateDialog
            triggerLabel="+ Create Amenity"
            dialogTitle="Create Bus Amenity"
            fields={[{ name: "name", label: "Amenity Name" }]}
            onSubmit={async (data) => {
              await addAmenity({ id: null, name: data.name });
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
        <FilterDropdown
          label={typeFilter ? `Type: ${typeFilter}` : "Amenity Type"}
          filters={["comfort", "entertainment", "safety"]}
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
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAmenities.map((amenity) => (
              <TableRow key={amenity.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selected.includes(amenity.id!)}
                    onChange={() => toggleSelection(amenity.id!)}
                  />
                </TableCell>
                <TableCell>{amenity.name}</TableCell>
                <TableCell className="text-right">
                  <EntityCreateDialog
                    triggerLabel="Edit"
                    dialogTitle="Edit Bus Amenity"
                    initialData={{ name: amenity.name }}
                    fields={[{ name: "name", label: "Amenity Name" }]}
                    onSubmit={async (data) => {
                      await updateAmenity({ id: amenity.id, name: data.name });
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <div className="p-4 text-muted">Loading amenities...</div>}
        {error && <div className="p-4 text-red-600">Error: {error}</div>}
        {!isLoading && filteredAmenities.length === 0 && (
          <div className="p-4 text-muted">No amenities found.</div>
        )}
      </div>

      {/* Pagination (to be implemented) */}
      <PaginationBar
        onPrevious={() => alert("Previous")}
        onNext={() => alert("Next")}
      />
    </div>
  );
}
