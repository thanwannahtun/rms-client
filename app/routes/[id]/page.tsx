// app/routes/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { safeGet } from "@/lib/api";
import { useUpdateRoute } from "@/lib/store/selectors/useRoutes";
import { RouteForm } from "../_components/RouteForm";

export default function EditRoutePage() {
  const { id } = useParams();
  const router = useRouter();
  const [route, setRoute] = useState<any>(null);
  const updateRoute = useUpdateRoute();

  useEffect(() => {
    safeGet(`/routes/${id}?include_origin=true&include_destination=true`).then((res) => {
      if (res.success) setRoute(res.data);
    });
  }, [id]);

  const handleSubmit = async (data: any) => {
    await updateRoute(data);
    router.push("/routes");
  };

  if (!route) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Bus Route</h1>
      <RouteForm initialData={route} onSubmit={handleSubmit} isEdit />
    </div>
  );
}
