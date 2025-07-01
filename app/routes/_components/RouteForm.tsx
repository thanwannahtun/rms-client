"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { safeGet } from "@/lib/api";

interface RouteLine {
  id?: number;
  fromPointId: number;
  toPointId: number;
  startTime: string;
  endTime: string;
  price: number;
}

interface RouteFormProps {
  initialData?: Partial<any>;
  onSubmit: (data: any) => void;
  isEdit?: boolean;
}

export function RouteForm({ initialData = {}, onSubmit, isEdit = false }: RouteFormProps) {
  const [busId, setBusId] = useState(initialData.busId ?? "");
  const [startingPoint, setStartingPoint] = useState(initialData.startingPoint ?? "");
  const [dropingPoint, setDropingPoint] = useState(initialData.dropingPoint ?? "");
  const [scheduleDate, setScheduleDate] = useState(initialData.scheduleDate ?? "");
  
  const [startTime, setStartTime] = useState(initialData.startTime?.slice(11, 16) ?? "");
  const [endTime, setEndTime] = useState(initialData.endTime?.slice(11, 16) ?? "");

  const [routeLines, setRouteLines] = useState<RouteLine[]>( (initialData.routeLines || []).map((line: any) => ({
    ...line,
    startTime: line.startTime?.slice(11, 16) || "", // extract "HH:mm"
    endTime: line.endTime?.slice(11, 16) || "",
  })));

  const [buses, setBuses] = useState([]);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    safeGet("/buses").then((res) => res.success && setBuses(res.data as any));
    safeGet("/bus_points").then((res) => res.success && setPoints(res.data as any));
  }, []);

  const handleAddLine = () => {
    setRouteLines([...routeLines, {
      fromPointId: 0,
      toPointId: 0,
      startTime: "00:00:00",
      endTime: "00:00:00",
      price: 0,
    }]);
  };

  const handleRemoveLine = (index: number) => {
    setRouteLines(routeLines.filter((_, i) => i !== index));
  };

  const updateLine = (index: number, key: keyof RouteLine, value: any) => {
    const updated = [...routeLines];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setRouteLines(updated);
  };

  const handleSubmit = () => {
    if (!busId || !startingPoint || !dropingPoint || !scheduleDate || !startTime || !endTime) return;

    const startDateTime = `${scheduleDate} ${startTime}:00`;
    const endDateTime = `${scheduleDate} ${endTime}:00`;

    onSubmit({
      ...initialData,
      busId,
      startingPoint,
      dropingPoint,
      scheduleDate,
      startTime: startDateTime,
      endTime: endDateTime,
      routeLines: routeLines.map((line) => ({
        ...line,
        startTime: `${scheduleDate}T${line.startTime}:00`,
        endTime: `${scheduleDate}T${line.endTime}:00`,
      })),
    });
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <h2 className="text-lg font-semibold">Route Info</h2>

      {/* Route Fields */}
      <select className="w-full border rounded p-2" value={busId} onChange={(e) => setBusId(Number(e.target.value))}>
        <option value="">Select Bus</option>
        {buses.map((bus: any) => (
          <option key={bus.id} value={bus.id}>
            {bus.plateNumber}
          </option>
        ))}
      </select>

      <select
        className="w-full border rounded p-2"
        value={startingPoint}
        onChange={(e) => setStartingPoint(Number(e.target.value))}
      >
        <option value="">Select Origin</option>
        {points.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        className="w-full border rounded p-2"
        value={dropingPoint}
        onChange={(e) => setDropingPoint(Number(e.target.value))}
      >
        <option value="">Select Destination</option>
        {points.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
      <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

      {/* RouteLines Section */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Route Lines</h2>
        {routeLines.map((line, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 items-center border rounded p-2">
            <select
              className="col-span-1"
              value={line.fromPointId}
              onChange={(e) => updateLine(index, "fromPointId", Number(e.target.value))}
            >
              <option value="">From</option>
              {points.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              className="col-span-1"
              value={line.toPointId}
              onChange={(e) => updateLine(index, "toPointId", Number(e.target.value))}
            >
              <option value="">To</option>
              {points.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <Input
              className="col-span-1"
              type="time"
              value={line.startTime}
              onChange={(e) => updateLine(index, "startTime", e.target.value)}
            />
            <Input
              className="col-span-1"
              type="time"
              value={line.endTime}
              onChange={(e) => updateLine(index, "endTime", e.target.value)}
            />
            <Input
              className="col-span-1"
              type="number"
              placeholder="Price"
              value={line.price}
              onChange={(e) => updateLine(index, "price", Number(e.target.value))}
            />
            <Button variant="destructive" onClick={() => handleRemoveLine(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddLine}>+ Add Route Line</Button>
      </div>

      <Button className="mt-4" onClick={handleSubmit}>
        {isEdit ? "Update Route" : "Create Route"}
      </Button>
    </div>
  );
}



// // components/RouteForm.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { safeGet } from "@/lib/api";

// interface RouteFormProps {
//   initialData?: Partial<any>;
//   onSubmit: (data: any) => void;
//   isEdit?: boolean;
// }

// export function RouteForm({ initialData = {}, onSubmit, isEdit = false }: RouteFormProps) {
//   const [busId, setBusId] = useState(initialData.busId ?? "");
//   const [startingPoint, setStartingPoint] = useState(initialData.startingPoint ?? "");
//   const [dropingPoint, setDropingPoint] = useState(initialData.dropingPoint ?? "");
//   const [scheduleDate, setScheduleDate] = useState(initialData.scheduleDate ?? "");
//   const [startTime, setStartTime] = useState(initialData.startTime ?? "");
//   const [endTime, setEndTime] = useState(initialData.endTime ?? "");

//   const [buses, setBuses] = useState([]);
//   const [points, setPoints] = useState([]);

//   useEffect(() => {
//     safeGet("/buses").then((res) => res.success && setBuses(res.data as any));
//     safeGet("/bus_points").then((res) => res.success && setPoints(res.data as any));
//   }, []);

//   const handleSubmit = () => {
    
//     if (!busId || !startingPoint || !dropingPoint || !scheduleDate || !startTime || !endTime) return;

//     /// convert date and time to datetime
//     const startDateTime = `${scheduleDate} ${startTime}:00`;
//     const endDateTime = `${scheduleDate} ${endTime}:00`;

//     onSubmit({
//       ...initialData,
//       busId,
//       startingPoint,
//       dropingPoint,
//       scheduleDate,
//       startTime: startDateTime,
//       endTime: endDateTime,
//     });
//   };

//   return (
//     <div className="space-y-4 max-w-2xl">
//       <select className="w-full border rounded p-2" value={busId} onChange={(e) => setBusId(Number(e.target.value))}>
//         <option value="">Select Bus</option>
//         {buses.map((bus: any) => (
//           <option key={bus.id} value={bus.id}>
//             {bus.plateNumber}
//           </option>
//         ))}
//       </select>

//       <select
//         className="w-full border rounded p-2"
//         value={startingPoint}
//         onChange={(e) => setStartingPoint(Number(e.target.value))}
//       >
//         <option value="">Select Origin</option>
//         {points.map((p: any) => (
//           <option key={p.id} value={p.id}>
//             {p.name}
//           </option>
//         ))}
//       </select>

//       <select
//         className="w-full border rounded p-2"
//         value={dropingPoint}
//         onChange={(e) => setDropingPoint(Number(e.target.value))}
//       >
//         <option value="">Select Destination</option>
//         {points.map((p: any) => (
//           <option key={p.id} value={p.id}>
//             {p.name}
//           </option>
//         ))}
//       </select>

//       <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
//       <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
//       <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

//       <Button onClick={handleSubmit}>
//         {isEdit ? "Update Route" : "Create Route"}
//       </Button>
//     </div>
//   );
// }
