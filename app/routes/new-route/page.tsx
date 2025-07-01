"use client";

import { useRouter } from "next/navigation";
import { useAddRoute } from "@/lib/store/selectors/useRoutes";
import { RouteForm } from "../_components/RouteForm";

export default function CreateRoutePage() {
  const router = useRouter();
  const addRoute = useAddRoute();

  const handleSubmit = async (data: any) => {
    await addRoute(data);
    router.push("/routes");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Bus Route</h1>
      <RouteForm onSubmit={handleSubmit} />
    </div>
  );
}
