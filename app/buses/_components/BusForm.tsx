"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bus } from "@/lib/types";
import { useBusTypesData, useFetchBusTypes } from "@/lib/store/selectors/useBusTypes";
import { useDriversData, useFetchDrivers } from "@/lib/store/selectors/useDrivers";

interface BusFormProps {
  initialData?: Partial<Bus>;
  onSubmit: (data: Omit<Bus, "createdAt" | "updatedAt" | "busType" | "driver">) => void;
  isEdit?: boolean;
}

export default function BusForm({ initialData = {}, onSubmit, isEdit = false }: BusFormProps) {
  const [plateNumber, setPlateNumber] = useState(initialData.plateNumber ?? "");
  const [busTypeId, setBusTypeId] = useState(initialData.busTypeId ?? 0);
  const [driverId, setDriverId] = useState(initialData.driverId ?? 0);
  const [assignmentDate, setAssignmentDate] = useState(
    initialData.assignmentDate ? initialData.assignmentDate.slice(0, 10) : ""
  );

  const busTypes = useBusTypesData();
  const fetchBusTypes = useFetchBusTypes();
  const drivers = useDriversData();
  const fetchDrivers = useFetchDrivers();

  useEffect(() => {
    fetchBusTypes();
    fetchDrivers();
  }, [fetchBusTypes, fetchDrivers]);

  const handleSubmit = () => {
    if (!plateNumber || !busTypeId || !driverId || !assignmentDate) return;

    onSubmit({
      plateNumber,
      busTypeId,
      driverId,
      assignmentDate,
      id: initialData.id ?? null,
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Plate Number"
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
      />

      <select
        value={busTypeId}
        onChange={(e) => setBusTypeId(Number(e.target.value))}
        className="w-full border rounded p-2"
      >
        <option value="">Select Bus Type</option>
        {busTypes.map((type) => (
          <option key={type.id} value={type.id ?? 0}>
            {type.name}
          </option>
        ))}
      </select>

      <select
        value={driverId}
        onChange={(e) => setDriverId(Number(e.target.value))}
        className="w-full border rounded p-2"
      >
        <option value="">Select Driver</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id ?? 0}>
            {driver.name}
          </option>
        ))}
      </select>

      <Input
        type="date"
        value={assignmentDate}
        onChange={(e) => setAssignmentDate(e.target.value)}
      />

      <Button onClick={handleSubmit}>
        {isEdit ? "Update Bus" : "Create Bus"}
      </Button>
    </div>
  );
}
