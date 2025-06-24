"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams, useParams } from "next/navigation";

export default function BusBrandDetailPage() {

    const params = useParams();
    const searchParams = useSearchParams();
    const brandName = params.brandName;
    const id = searchParams.get("id");
    const action = searchParams.get("action");

    return (
        <div>
            <h1>{brandName} (ID: {id})</h1>
            <p>Action: {action}</p>
            {action === "edit" && <EditBusBrandPage />}
            {action === "delete" && <DeleteBusBrandPage />}
        </div>
    );
}


function EditBusBrandPage() {
    return (
        <div className="flex gap-2">
            <Button>Save</Button>
            <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
        </div>
    );
}

function DeleteBusBrandPage() {
    return (
        <div className="flex gap-2">
            <Button>Confirm Delete</Button>
            <Button variant="outline" onClick={() => window.history.back()}> Cancel</Button>
        </div >
    );
}

