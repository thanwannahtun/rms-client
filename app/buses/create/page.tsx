// app/buses/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAddBus } from "@/lib/store/selectors/useBuses";
import { Bus } from "@/lib/types";
import BusForm from "../_components/BusForm";

export default function CreateBusPage() {
    const addBus = useAddBus();
    const router = useRouter();

    const handleSubmit = async (data: Omit<Bus, "id" | "createdAt" | "updatedAt" | "busType" | "driver">) => {
        await addBus(data);
        router.push("/buses");
    };

    return (
        <div className="p-6 max-w-xl space-y-6">
            <h1 className="text-2xl font-bold">Create Bus</h1>
            <BusForm onSubmit={handleSubmit} />
        </div>
    );
}
