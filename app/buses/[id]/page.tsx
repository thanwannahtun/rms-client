// app/buses/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUpdateBus } from "@/lib/store/selectors/useBuses";
import { safeGet } from "@/lib/api";
import { Bus } from "@/lib/types";
import BusForm from "../_components/BusForm";

export default function EditBusPage() {
    const { id } = useParams();
    const router = useRouter();
    const updateBus = useUpdateBus();
    const [bus, setBus] = useState<Bus | null>(null);

    useEffect(() => {
        safeGet(`/buses/${id}`).then((res) => res.success && setBus(res.data as Bus));
    }, [id]);

    const handleSubmit = async (data: Omit<Bus, "createdAt" | "updatedAt" | "busType" | "driver">) => {
        await updateBus(data);
        router.push("/buses");
    };

    if (!bus) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-xl space-y-6">
            <h1 className="text-2xl font-bold">Edit Bus</h1>
            <BusForm initialData={bus} onSubmit={handleSubmit} isEdit />
        </div>
    );
}
